const { StatusCodes } = require("http-status-codes");
const UserPicture = require("../models/UserPicture");
const fs = require("fs");
const path = require("path");

class UserPictureController {
  static async uploadPicture(request, response) {
    const userUUID = request.session.userid;

    const oldPicture = await UserPicture.findOne({
      where: { UserUuid: userUUID },
    });
    const newPictureData = request.file;

    if (!newPictureData) {
      request.flash(
        "warning",
        "You must choose a profile picture! Please upload only PNG, JPG or JPEG images."
      );

      return request.session.save(() => {
        response
          .status(StatusCodes.BAD_REQUEST)
          .redirect(`/user/edit/${userUUID}`);
      });
    }

    const { destination, filename, mimetype } = newPictureData;
    const newPicture = {
      path: destination,
      name: filename,
      ext: mimetype,
      UserUuid: userUUID,
    };

    if (oldPicture) {
      UserPictureController.deletePictureFromDirectory(
        path.resolve(oldPicture.path, oldPicture.name)
      );

      await UserPicture.update(
        { ...newPicture },
        { where: { UserUuid: userUUID } }
      );
      request.flash(
        "success",
        "Your profile picture has been successfully updated."
      );
      request.session.userPicture = newPicture.name;

      return request.session.save(() => {
        response.status(StatusCodes.CREATED).redirect("/user/profile");
      });
    }

    await UserPicture.create({ ...newPicture }).catch((error) =>
      console.log(error)
    );

    request.flash(
      "success",
      "Your profile picture has been successfully updated."
    );
    request.session.userPicture = newPicture.name;

    return request.session.save(() => {
      response.status(StatusCodes.CREATED).redirect("/user/profile");
    });
  }

  static async deletePicture(request, response) {
    const uuid = request.session.userid; // user uuid
    const picture = await UserPicture.findOne({ where: { UserUuid: uuid } });

    if (picture) {
      const picturePath = path.join(picture.path, picture.name);
      const existsPicture = fs.existsSync(picturePath);
      if (existsPicture) {
        // Deleting the user profile picture from local directory
        UserPictureController.deletePictureFromDirectory(picturePath);
      }
    }

    // Deleting the user profile picture from database
    await UserPicture.destroy({ where: { uuid: picture.uuid } });

    request.flash("success", "Your profile picture has been deleted.");
    request.session.userPicture = null;

    return request.session.save(() => {
      response.status(StatusCodes.OK).redirect("/user/profile");
    });
  }

  static async deletePictureFromDirectory(picturePath) {
    const existsPicture = fs.existsSync(picturePath);
    if (existsPicture) {
      fs.rmSync(picturePath);
    }
  }

  static async getPicturesByUserId(uuid) {
    // If uuid is a list of user uuids, the return will be a list of UserPicture
    const picture = await UserPicture.findAll({
      where: { UserUuid: uuid },
      raw: true,
    });
    return picture;
  }
}

module.exports = UserPictureController;
