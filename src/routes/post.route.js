const express = require("express");
const router = express.Router();

const generateUpload = require("@/utils/generate-upload");
const { Comment, User, Profile } = require("@/models");

const postController = require("@/controllers/post.controller");
const commentController = require("@/controllers/comment.controller");
const authGuard = require("@/middlewares/auth-guard.middleware");
const processContent = require("@/middlewares/process-content.middleware");
const cleanupUploadedImages = require("@/middlewares/cleanup-uploaded-files");
const postValidator = require("@/validators/post.validator");

const upload = generateUpload("posts");

const generateCommonMiddlewares = (type) => [
  authGuard,
  upload.array("image"),
  postValidator[type],
  processContent,
  cleanupUploadedImages,
];

router.get("/", postController.getList);
router.post("/", generateCommonMiddlewares("create"), postController.create);
router.get("/:id", postController.getById);
router.put("/:id", generateCommonMiddlewares("update"), postController.update);
router.patch("/:id", generateCommonMiddlewares("update"), postController.update);
router.delete("/:id", authGuard, postController.delete);

router.post("/:id/comments", authGuard, commentController.createByPostId);
router.post("/:id/like", authGuard, postController.like);
router.post("/:id/unlike", authGuard, postController.unlike);

module.exports = {
  subRouter: router,
  include: [
    {
      model: User,
      as: "user",
      attributes: ["name", "username"],
      include: {
        model: Profile,
        as: "profile",
        attributes: ["avatar"],
      },
    },
    {
      model: User,
      as: "likes",
      attributes: ["id"],
    },
    {
      model: Comment,
      as: "comments",
      required: false,
      attributes: ["content", "createdAt"],
      where: {
        parentId: null,
        status: "visible",
      },
      include: [
        {
          model: Comment,
          as: "replies",
          required: false,
          attributes: ["content"],
          where: { status: "visible" },
          include: {
            model: User,
            as: "user",
            attributes: ["name", "username"],
            include: {
              model: Profile,
              as: "profile",
              attributes: ["avatar"],
            },
          },
        },
        {
          model: User,
          as: "user",
          attributes: ["name", "username"],
          include: {
            model: Profile,
            as: "profile",
            attributes: ["avatar"],
          },
        },
      ],
    },
  ],
};
