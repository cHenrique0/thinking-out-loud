const { StatusCodes } = require("http-status-codes");
const UserImage = require("../models/UserImage");
const fs = require("fs");
const path = require("path");

class UserImageController {
  static async uploadImage(request, response) {
    const userUUID = request.session.userid;

    const oldImage = await UserImage.findOne({
      where: { UserUuid: userUUID },
    });
    const imageData = request.file;

    if (!imageData) {
      request.flash(
        "warning",
        "You must choose a profile image! Please upload only PNG, JPG or JPEG images."
      );

      return request.session.save(() => {
        response
          .status(StatusCodes.BAD_REQUEST)
          .redirect(`/user/edit/${userUUID}`);
      });
    }

    const { destination, filename, mimetype } = imageData;
    const image = {
      path: destination,
      name: filename,
      ext: mimetype,
      UserUuid: userUUID,
    };

    if (oldImage) {
      UserImageController.deleteImageFromDirectory(
        path.resolve(oldImage.path, oldImage.name)
      );

      await UserImage.update({ ...image }, { where: { UserUuid: userUUID } });
      request.flash(
        "success",
        "Your profile picture has been successfully updated."
      );
      request.session.userImage = image.name;

      return request.session.save(() => {
        response
          .status(StatusCodes.CREATED)
          .redirect(`/user/profile/${userUUID}`);
      });
    }

    await UserImage.create({ ...image }).catch((error) => console.log(error));

    request.flash(
      "success",
      "Your profile picture has been successfully updated."
    );
    request.session.userImage = image.name;

    return request.session.save(() => {
      response.status(StatusCodes.CREATED).redirect(`/user/edit/${userUUID}`);
    });
  }

  static async deleteImage(request, response) {
    const uuid = request.session.userid; // user uuid
    const image = await UserImage.findOne({ where: { UserUuid: uuid } });
    if (image) {
      UserImageController.deleteImageFromDirectory(imagePath);

      // const imagePath = path.join(image.path, image.name);
      // const existsImage = fs.existsSync(imagePath);

      /* if (existsImage) {
        // Reading the profile pictures directory
        fs.readdir(image.path, (err, images) => {
          if (err) {
            console.log(err);
          }
          images.forEach((e) => {
            // Checking if the user profile picture is in the directory
            let imageMatch = e.includes(image.name);
            if (imageMatch) {
              // Deleting the user profile picture from directory
              fs.rm(imagePath, (err) => {
                if (err) {
                  console.log(err);
                }
              });
            }
          });
        });
      } */

      // Deleting the user profile picture from database
      await UserImage.destroy({ where: { uuid: image.uuid } });

      request.flash("success", "Your profile picture has been deleted.");
      request.session.userImage = null;

      return request.session.save();
    }
  }

  static async deleteImageFromDirectory(imagePath) {
    const existsImage = fs.existsSync(imagePath);
    if (existsImage) {
      fs.rmSync(imagePath);
    }
  }

  static async getImagesByUserId(uuid) {
    // If uuid is a list of user uuids, the return will be a list of userImage
    const image = await UserImage.findAll({
      where: { UserUuid: uuid },
      raw: true,
    });
    return image;
  }
}

module.exports = UserImageController;

/* static async deleteImage(request, response) {
    const uuid = request.session.userid; // user uuid
    const image = await UserImage.findOne({ where: { UserUuid: uuid } });
    if (image) {
      const imagePath = path.join(image.path, image.name);
      const existsImage = fs.existsSync(imagePath);

      if (existsImage) {
        // Reading the profile pictures directory
        fs.readdir(image.path, (err, images) => {
          if (err) {
            console.log(err);
          }
          images.forEach((e) => {
            // Checking if the user profile picture is in the directory
            let imageMatch = e.includes(image.name);
            if (imageMatch) {
              // Deleting the user profile picture from directory
              fs.rm(imagePath, (err) => {
                if (err) {
                  console.log(err);
                }
              });
            }
          });
        });
      }

      // Deleting the user profile picture from database
      await UserImage.destroy({ where: { uuid: image.uuid } });

      request.flash("success", "Your profile picture has been deleted.");
      request.session.userImage = null;

      return request.session.save(() => {
        // response.status(StatusCodes.OK).redirect(`/user/edit/${uuid}`);
      });
    }
  } */
