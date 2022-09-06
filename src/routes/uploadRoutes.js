const { Router } = require("express");
const { checkUserLogged } = require("../middlewares/loginMiddlewares");
const pictureUpload = require("../middlewares/pictureUploadMiddleware");
const UserPictureController = require("../controllers/UserPictureController");

const uploadRouter = Router();

uploadRouter.post(
  "/upload",
  [checkUserLogged, pictureUpload],
  UserPictureController.uploadPicture
);

uploadRouter.post(
  "/delete/:uuid",
  checkUserLogged,
  UserPictureController.deletePicture
);

module.exports = uploadRouter;
