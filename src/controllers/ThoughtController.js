const { StatusCodes } = require("http-status-codes");
const Thought = require("../models/Thought");
const User = require("../models/User");

class ThoughtController {
  static async getAllThoughts(request, response) {
    const thoughts = await Thought.findAll({ raw: true });
    return response.status(StatusCodes.OK).render("thought/home", { thoughts });
  }

  static async dashboard(request, response) {
    const uuid = request.session.userid;
    const user = await User.findByPk(uuid, {
      // raw: true,
      include: Thought,
    });

    if (!user) {
      return response.status(StatusCodes.UNAUTHORIZED).redirect("/login");
    }

    const userThoughts = user.Thoughts.map((thoughts) => thoughts.dataValues);

    return response
      .status(StatusCodes.OK)
      .render("thought/dashboard", { thoughts: userThoughts });
  }

  static createThoughtView(request, response) {
    return response.status(StatusCodes.OK).render("thought/create");
  }

  static async createThought(request, response) {
    const { title } = request.body;
    const uuid = request.session.userid;

    const user = await User.findByPk(uuid, { raw: true });

    if (!user) {
      return response.status(StatusCodes.UNAUTHORIZED).redirect("/login");
    }

    if (!title) {
      request.flash("message", "Please, write what you are thinking.");
      return response.status(StatusCodes.BAD_REQUEST).render("thought/create");
    }

    const newThought = { title, UserUuid: uuid };

    await Thought.create({ ...newThought }).catch((error) =>
      console.log(error)
    );

    request.flash("message", "Your thought was shared.");

    request.session.save(() => {
      return response
        .status(StatusCodes.CREATED)
        .redirect("/thoughts/dashboard");
    });
  }
}

module.exports = ThoughtController;
