const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const UserPicture = require("../models/UserPicture");

class AuthController {
  static loginView(request, response) {
    const uuid = request.session.userid;
    if (!uuid) {
      return response.status(StatusCodes.UNAUTHORIZED).render("auth/login");
    }
    return response.status(StatusCodes.OK).redirect("/user/profile");
  }

  static async login(request, response) {
    const { uuid, name } = request.user;
    const user = await User.findByPk(uuid, { include: UserPicture });
    const userPicture = user.UserPicture ? user.UserPicture.dataValues : false;

    request.session.userid = uuid;
    request.session.username = name;
    request.session.userPicture = userPicture.name;

    return request.session.save(() => {
      response.status(StatusCodes.OK).redirect("/home");
    });
  }

  static logout(request, response) {
    request.session.destroy();
    return response.status(StatusCodes.OK).redirect("/login");
  }

  static signupView(request, response) {
    const uuid = request.session.userid;
    if (!uuid) {
      return response.status(StatusCodes.UNAUTHORIZED).render("auth/signup");
    }
    return response.status(StatusCodes.OK).redirect("/user/profile");
  }

  static async signup(request, response) {
    const { name, lastname, email, password } = request.body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = {
      name,
      lastname,
      email,
      password: hashedPassword,
    };

    await User.create({ ...newUser })
      .then((user) => {
        request.flash("success", "Successfully registration!");
      })
      .catch((error) => console.log(error));

    return response.status(StatusCodes.CREATED).render("auth/login");
  }
}

module.exports = AuthController;
