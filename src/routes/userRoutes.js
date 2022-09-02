const { Router } = require("express");
const UserController = require("../controllers/UserController");
const { checkUserLogged } = require("../middlewares/loginMiddlewares");
const imageUpload = require("../middlewares/imageUploadMiddleware");

const userRouter = Router();

userRouter.get("/profile", checkUserLogged, UserController.profile);

userRouter.get("/edit/:uuid", checkUserLogged, UserController.updateUserView);

userRouter.post(
  "/edit/:uuid",
  [checkUserLogged, imageUpload],
  UserController.updateUser
);

userRouter.get("/profile/:uuid", checkUserLogged, UserController.publicProfile);

module.exports = userRouter;
