const { StatusCodes } = require("http-status-codes");
const Thought = require("../models/Thought");
const User = require("../models/User");
const UserImage = require("../models/UserImage");

class UserController {
  static async publicProfile(request, response) {
    const userSessionUUID = request.session.userid;
    const userProfileUUID = request.params.uuid;
    if (userProfileUUID === userSessionUUID) {
      return response.status(StatusCodes.OK).redirect("/user/profile");
    }

    const userData = await User.findByPk(userProfileUUID, {
      include: [Thought, UserImage],
    });

    const user = {
      uuid: userData.get("uuid"),
      name: userData.get("name"),
      lastname: userData.get("lastname"),
      email: userData.get("email"),
      about: userData.get("about"),
      facebook: userData.get("facebook"),
      twitter: userData.get("twitter"),
    };

    const userImage = userData.UserImage
      ? userData.UserImage.dataValues
      : false;

    const userThoughts = userData.Thoughts.map(
      (thoughts) => thoughts.dataValues
    );

    const userNoThoughts = userThoughts.length === 0 ? true : false;

    return response.status(StatusCodes.OK).render("user/publicProfile", {
      user,
      userThoughts,
      userImage,
      userNoThoughts,
    });
  }

  static async profile(request, response) {
    const userSessionUUID = request.session.userid;

    const userData = await User.findByPk(userSessionUUID, {
      include: [Thought, UserImage],
    });

    if (!userData) {
      return response.status(StatusCodes.UNAUTHORIZED).redirect("/login");
    }

    const userImage = userData.UserImage
      ? userData.UserImage.dataValues
      : false;

    const user = {
      uuid: userData.get("uuid"),
      name: userData.get("name"),
      lastname: userData.get("lastname"),
      email: userData.get("email"),
      about: userData.get("about"),
      facebook: userData.get("facebook"),
      twitter: userData.get("twitter"),
    };

    const userThoughts = userData.Thoughts.map(
      (thoughts) => thoughts.dataValues
    );

    userThoughts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const userNoThoughts = userThoughts.length === 0 ? true : false;

    return response.status(StatusCodes.OK).render("user/profile", {
      user,
      userThoughts,
      userImage,
      userNoThoughts,
    });
  }

  static async updateUserView(request, response) {
    const { uuid } = request.params;

    const user = await User.findByPk(uuid, { raw: true });

    return response.status(StatusCodes.OK).render("user/edit", { user });
  }

  static async updateUser(request, response) {
    const { uuid } = request.params;
    const { name, lastname, email, about, facebook, twitter } = request.body;
    const updatedUser = {
      name,
      lastname,
      email,
      about,
      facebook,
      twitter,
    };

    await User.update({ ...updatedUser }, { where: { uuid } });

    request.flash("success", "Your profile has been updated.");
    request.session.username = name;

    request.session.save(() => {
      return response.status(StatusCodes.OK).redirect("/user/profile");
    });
  }
}

module.exports = UserController;
