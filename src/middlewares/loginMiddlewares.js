const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const checkEmailAndPassword = async (request, response, next) => {
  const { email, password } = request.body;

  const user = await User.findOne({ where: { email }, raw: true });

  if (!user) {
    request.flash("danger", "Sorry, we didn't recognize that email.");
    return response.status(StatusCodes.NOT_FOUND).render("auth/login");
  }

  const passwordsMatch = bcrypt.compareSync(password, user.password);

  if (!passwordsMatch) {
    request.flash("danger", "Incorrect password. Try again.");
    return response.status(StatusCodes.FORBIDDEN).render("auth/login");
  }

  request.user = {
    uuid: user.uuid,
    name: user.name,
  };

  return next();
};

const checkUserLogged = async (request, response, next) => {
  const uuid = request.session.userid;

  const user = await User.findByPk(uuid, { raw: true });

  if (!user) {
    return response.status(StatusCodes.FORBIDDEN).redirect("/login");
  }

  return next();
};

module.exports = { checkEmailAndPassword, checkUserLogged };
