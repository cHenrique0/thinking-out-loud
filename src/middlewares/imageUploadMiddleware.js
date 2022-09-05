const multer = require("multer");
const mime = require("mime-types");
const path = require("path");
const util = require("util");

const maxImageSize = 1024 * 1024 * 5;

const imageFilter = (request, file, callback) => {
  const type = mime.extension(file.mimetype);
  const conditions = ["png", "jpg", "jpeg"];

  if (conditions.includes(type)) {
    callback(null, true);
  }
  callback(null, false);
};

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    file.path = path.resolve("src/public/uploads/users/pictures");
    callback(null, file.path);
  },
  filename: (request, file, callback) => {
    const userUUID = request.session.userid;
    const [, extension] = file.originalname.split(".");
    file.filename = `${userUUID}.${extension}`;
    callback(null, file.filename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: maxImageSize },
  fileFilter: imageFilter,
}).single("profileImage");

const imageUpload = util.promisify(upload);

module.exports = imageUpload;
