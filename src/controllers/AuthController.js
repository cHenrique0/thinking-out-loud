const { StatusCodes } = require("http-status-codes");

class AuthController {
  static login(request, response) {
    return response.status(StatusCodes.OK).render("auth/login");
  }

  static signup(request, response) {
    return response.status(StatusCodes.OK).render("auth/signup");
  }
}

module.exports = AuthController;
