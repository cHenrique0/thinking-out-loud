const { StatusCodes } = require("http-status-codes");
const ThoughtController = require("./ThoughtController");

class IndexController {
  static async getHomePage(request, response) {
    return ThoughtController.getAllThoughts(request, response);
  }

  static async redirectToHomePage(request, response) {
    return response.status(StatusCodes.OK).redirect("/home");
  }
}

module.exports = IndexController;
