const { StatusCodes } = require("http-status-codes");
const Thought = require("../models/Thought");
const User = require("../models/User");

class UserController {
  static async findUserById(request, response) {
    const { uuid } = request.params;
    if (uuid === request.session.userid) {
      return response.status(StatusCodes.OK).redirect("/thoughts/dashboard");
    }
    const user = await User.findByPk(uuid, { include: Thought });

    const userThoughts = user.Thoughts.map((thoughts) => thoughts.dataValues);

    const userNoThoughts = userThoughts.length === 0 ? true : false;

    return response.status(StatusCodes.OK).render("user/profile", {
      username: user.name,
      userThoughts,
      userNoThoughts,
    });
  }

  static async profile(request, response) {
    const uuid = request.session.userid;
    const userData = await User.findByPk(uuid, {
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
}

module.exports = UserController;
