const { Router } = require("express");
const UserController = require("../controllers/UserController");
const { checkUserLogged } = require("../middlewares/loginMiddlewares");

const userRouter = Router();

userRouter.get("/user/:uuid", checkUserLogged, UserController.findUserById);

module.exports = userRouter;
