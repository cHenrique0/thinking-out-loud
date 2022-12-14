const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

const checkEmailExists = async (request, response, next) => {
  const { email } = request.body;

  const emailExists = await User.findOne({ where: { email }, raw: true });
  if (emailExists) {
    request.flash(
      "danger",
      "Email already registered. Please, choose another."
    );
    return response.status(StatusCodes.FORBIDDEN).render("auth/signup");
  }

  return next();
};

const confirmPassword = (request, response, next) => {
  const { password, confirmPassword } = request.body;

  if (password !== confirmPassword) {
    request.flash("danger", "Passwords don't match. Try again.");
    return response.status(StatusCodes.FORBIDDEN).render("auth/signup");
  }
  return next();
};

module.exports = { checkEmailExists, confirmPassword };
