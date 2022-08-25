const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const checkEmailAndPassword = async (request, response, next) => {
  const { email, password } = request.body;

  const user = await User.findOne({ where: { email }, raw: true });

  if (!user) {
    request.flash("message", "Sorry, we didn't recognize that email.");
    return response.status(StatusCodes.NOT_FOUND).render("auth/login");
  }

  const passwordsMatch = bcrypt.compareSync(password, user.password);

  if (!passwordsMatch) {
    request.flash("message", "Incorrect password. Try again.");
    return response.status(StatusCodes.FORBIDDEN).render("auth/login");
  }

  request.user = user.uuid;

  return next();
};

const checkUserLogged = async (request, response, next) => {
  const user = request.session.userid;

  if (!user) {
    return response.status(StatusCodes.FORBIDDEN).redirect("/login");
  }

  return next();
};

module.exports = { checkEmailAndPassword, checkUserLogged };
