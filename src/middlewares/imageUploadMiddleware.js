const multer = require("multer");
const path = require("path");
const util = require("util");

const maxImageSize = 1024 * 1024 * 5;

const imageFilter = (request, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    return callback(null, true);
  }
  return callback("Please upload only images.", false);
};

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    file.path = path.resolve("src/public/img/users");
    callback(null, file.path);
  },
  filename: (request, file, callback) => {
    const [, extension] = file.originalname.split(".");
    file.filename = `${Date.now()}.${extension}`;
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
