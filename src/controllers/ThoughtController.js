const { StatusCodes } = require("http-status-codes");
const Thought = require("../models/Thought");

class ThoughtController {
  static async getAllThoughts(request, response) {
    const thoughts = await Thought.findAll({ raw: true });
    return response.status(StatusCodes.OK).render("thought/home", { thoughts });
  }

  static async dashboard(request, response) {
    return response.status(StatusCodes.OK).render("thought/dashboard");
  }

  static createThoughtView(request, response) {
    return response.status(StatusCodes.OK).render("thought/create");
  }

  static async createThought(request, response) {
    const { title } = request.body;
    const uuid = request.session.userid;

    if (!title) {
      request.flash("message", "Please, write what you are thinking.");
      return response.status(StatusCodes.BAD_REQUEST).render("thought/create");
    }

    const newThought = { title, UserUuid: uuid };

    await Thought.create({ ...newThought })
      .then((t) => console.log(t))
      .catch((error) => console.log(error));

    request.flash("message", "Your thought was shared.");

    request.session.save(() => {
      return response
        .status(StatusCodes.CREATED)
        .redirect("/thoughts/dashboard");
    });
  }
}

module.exports = ThoughtController;
