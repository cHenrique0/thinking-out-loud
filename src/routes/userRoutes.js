const { Router } = require("express");
const UserController = require("../controllers/UserController");
const { checkUserLogged } = require("../middlewares/loginMiddlewares");

const userRouter = Router();

userRouter.get("/profile", checkUserLogged, UserController.profile);

userRouter.get("/edit/:uuid", checkUserLogged, UserController.updateUserView);

userRouter.post("/edit/:uuid", checkUserLogged, UserController.updateUser);

userRouter.get("/:uuid", checkUserLogged, UserController.findUserById);

module.exports = userRouter;
