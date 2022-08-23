const { Router } = require("express");
const AuthController = require("../controllers/AuthController");
const {
  checkEmailExists,
  confirmPassword,
} = require("../middlewares/signupMiddlewares");

const auhtRouter = Router();

auhtRouter.get("/login", AuthController.login);
auhtRouter.get("/signup", AuthController.signupView);
auhtRouter.post(
  "/signup",
  [checkEmailExists, confirmPassword],
  AuthController.signup
);

module.exports = auhtRouter;
