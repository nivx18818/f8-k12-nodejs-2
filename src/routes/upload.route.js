const authGuard = require("@/middlewares/auth-guard.middleware");
const express = require("express");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const imageController = require("@/controllers/upload.controller");

const postStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/posts"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + uuidv4() + path.extname(file.originalname)),
});

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/avatars"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + uuidv4() + path.extname(file.originalname)),
});

const uploadPost = multer({ storage: postStorage });
const uploadAvatar = multer({ storage: avatarStorage });

router.post("/posts", authGuard, uploadPost.single("image"), imageController.uploadPost);
router.post("/avatars", authGuard, uploadAvatar.single("image"), imageController.uploadAvatar);

module.exports = {
  subRouter: router,
};
