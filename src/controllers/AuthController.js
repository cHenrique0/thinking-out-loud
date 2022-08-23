const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

class AuthController {
  static login(request, response) {
    return response.status(StatusCodes.OK).render("auth/login");
  }

  static signupView(request, response) {
    return response.status(StatusCodes.OK).render("auth/signup");
  }

  static async signup(request, response) {
    const { name, email, password } = request.body;

    const newUser = {
      name,
      email,
      password: bcrypt.hashSync(password, 10),
    };

    await User.create({ ...newUser });

    return response.status(StatusCodes.CREATED).redirect("/login");
  }
}

module.exports = AuthController;
