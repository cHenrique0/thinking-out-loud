const { Router } = require("express");
const { checkUserLogged } = require("../middlewares/loginMiddlewares");
const imageUpload = require("../middlewares/imageUploadMiddleware");
const UserImageController = require("../controllers/UserImageController");

const uploadRouter = Router();

uploadRouter.post(
  "/upload",
  [checkUserLogged, imageUpload],
  UserImageController.uploadImage
);

uploadRouter.post(
  "/delete/:uuid",
  checkUserLogged,
  UserImageController.deleteImage
);

module.exports = uploadRouter;
