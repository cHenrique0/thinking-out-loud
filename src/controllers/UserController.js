const { StatusCodes } = require("http-status-codes");
const Thought = require("../models/Thought");
const User = require("../models/User");
const UserPicture = require("../models/UserPicture");

class UserController {
  static async publicProfile(request, response) {
    const userSessionUUID = request.session.userid;
    const userProfileUUID = request.params.uuid;
    if (userProfileUUID === userSessionUUID) {
      return response.status(StatusCodes.OK).redirect("/user/profile");
    }

    const userData = await User.findByPk(userProfileUUID, {
      include: [Thought, UserPicture],
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

    const userPicture = userData.UserPicture
      ? userData.UserPicture.dataValues
      : false;

    const userThoughts = userData.Thoughts.map(
      (thoughts) => thoughts.dataValues
    );

    const userNoThoughts = userThoughts.length === 0 ? true : false;

    return response.status(StatusCodes.OK).render("user/publicProfile", {
      user,
      userThoughts,
      userPicture,
      userNoThoughts,
    });
  }

  static async profile(request, response) {
    const userSessionUUID = request.session.userid;

    const userData = await User.findByPk(userSessionUUID, {
      include: [Thought, UserPicture],
    });

    if (!userData) {
      return response.status(StatusCodes.UNAUTHORIZED).redirect("/login");
    }

    const userPicture = userData.UserPicture
      ? userData.UserPicture.dataValues
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
      userPicture,
      userNoThoughts,
    });
  }

  static async updateUserView(request, response) {
    const { uuid } = request.params;

    const userData = await User.findAll({
      where: { uuid },
      include: UserPicture,
    });
    const [user] = userData.map((data) => data.get({ plain: true }));

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
