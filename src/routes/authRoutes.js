const { Router } = require("express");
const AuthController = require("../controllers/AuthController");

const auhtRouter = Router();

auhtRouter.get("/login", AuthController.login);
auhtRouter.get("/signup", AuthController.signup);

module.exports = auhtRouter;
