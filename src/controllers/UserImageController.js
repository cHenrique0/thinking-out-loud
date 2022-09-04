const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const UserImage = require("../models/UserImage");

class UserImageController {
  static async uploadImage(request, response) {
    const userUUID = request.session.userid;

    const imageData = request.file;
    if (!imageData) {
      request.flash("warning", "You must choose a profile image!");

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

    await UserImage.create({ ...image }).catch((error) => console.log(error));

    request.flash(
      "success",
      "Your profile picture has been successfully updated."
    );
    request.session.userImage = image.name;

    request.session.save(() => {
      return response
        .status(StatusCodes.CREATED)
        .redirect(`/user/edit/${userUUID}`);
    });
  }

  static async getImagesByUserId(uuid) {
    const image = await UserImage.findAll({
      where: { UserUuid: uuid },
      raw: true,
    });
    return image;
  }
}

module.exports = UserImageController;
