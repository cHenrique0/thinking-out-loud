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
}

module.exports = ThoughtController;
