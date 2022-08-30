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
}

module.exports = UserController;
