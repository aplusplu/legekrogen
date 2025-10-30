const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = path.join(
  __dirname,
  "../../sites/www/legekrogen/public/users"
);

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const userStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    }
})
