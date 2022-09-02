const { Router } = require("express");
const { checkUserLogged } = require("../middlewares/loginMiddlewares");
const imageUpload = require("../middlewares/imageUploadMiddleware");
const UserImageController = require("../controllers/UserImageController");

const uploadRouter = Router();

uploadRouter.post(
  "/image",
  [checkUserLogged, imageUpload],
  UserImageController.uploadImage
);

module.exports = uploadRouter;
