const multer = require("multer");
const mime = require("mime-types");
const path = require("path");
const util = require("util");
const fs = require("fs");

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
    const picturePath = path.resolve("src/public/uploads/users/pictures");
    const existsPath = fs.existsSync(picturePath);
    if (!existsPath) {
      fs.mkdirSync(picturePath, { recursive: true }, (err) => console.log(err));
    }
    file.path = picturePath;
    callback(null, file.path);
  },
  filename: (request, file, callback) => {
    const filename = file.originalname.replaceAll(" ", "_");
    file.filename = `${Date.now()}-${filename}`;
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
