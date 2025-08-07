const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const generateUpload = (folder) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.resolve("uploads", folder)),
    filename: (req, file, cb) =>
      cb(null, Date.now() + "-" + uuidv4() + path.extname(file.originalname)),
  });

  const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    fileFilter: (req, res, cb) => {
      const allowed = ["image/jpeg", "image/png", "image/webp"];
      if (allowed.includes(file.mimetype)) cb(null, true);
      else cb(new Error("Invalid file type"), false);
    },
  });
  return upload;
};

module.exports = generateUpload;
