const { StatusCodes } = require("http-status-codes");
const Thought = require("../models/Thought");
const User = require("../models/User");

class UserController {
  static async publicProfile(request, response) {
    const userSessionUUID = request.session.userid;
    const userProfileUUID = request.params.uuid;
    if (userProfileUUID === userSessionUUID) {
      return response.status(StatusCodes.OK).redirect("/user/profile");
    }

    const userData = await User.findByPk(userProfileUUID, {
      include: Thought,
    });

    const user = {
      uuid: userData.get("uuid"),
      name: userData.get("name"),
      email: userData.get("email"),
      // about: userData.get("about"),
      // facebook: userData.get("facebook"),
      // twitter: userData.get("twitter"),
    };

    const userThoughts = userData.Thoughts.map(
      (thoughts) => thoughts.dataValues
    );

    const userNoThoughts = userThoughts.length === 0 ? true : false;

    return response
      .status(StatusCodes.OK)
      .render("user/publicProfile", { user, userThoughts, userNoThoughts });
  }

  static async profile(request, response) {
    const userSessionUUID = request.session.userid;

    const userData = await User.findByPk(userSessionUUID, {
      include: Thought,
    });

    if (!userData) {
      return response.status(StatusCodes.UNAUTHORIZED).redirect("/login");
    }

    const user = {
      uuid: userData.get("uuid"),
      name: userData.get("name"),
      email: userData.get("email"),
      // about: userData.get("about"),
      // facebook: userData.get("facebook"),
      // twitter: userData.get("twitter"),
    };

    const userThoughts = userData.Thoughts.map(
      (thoughts) => thoughts.dataValues
    );

    const userNoThoughts = userThoughts.length === 0 ? true : false;

    return response
      .status(StatusCodes.OK)
      .render("user/profile", { user, userThoughts, userNoThoughts });
  }

  static async updateUserView(request, response) {
    const { uuid } = request.params;

    const user = await User.findByPk(uuid, { raw: true });

    return response.status(StatusCodes.OK).render("user/edit", { user });
  }

  static async updateUser(request, response) {
    const { uuid } = request.params;
    const { title } = request.body;
    const updatedThought = { title };

    await Thought.update({ ...updatedThought }, { where: { uuid } });

    request.flash("success", "Your profile has been updated.");

    request.session.save(() => {
      return response.status(StatusCodes.OK).redirect("/user/profile");
    });
  }
}

module.exports = UserController;
