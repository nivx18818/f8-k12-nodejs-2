const express = require("express");
const router = express.Router();

const postController = require("@/controllers/post.controller");
const postValidator = require("@/validators/post.validator");
const commentController = require("@/controllers/comment.controller");
const { Comment, User, Profile } = require("@/models");

router.get("/", postController.getList);
router.post("/", postValidator.create, postController.create);
router.get("/:id", postController.getById);
router.put("/:id", postValidator.update, postController.update);
router.patch("/:id", postValidator.update, postController.update);
router.delete("/:id", postController.delete);

router.post("/:id/comments", commentController.createByPostId);
router.post("/:id/like", postController.like);
router.post("/:id/unlike", postController.unlike);

module.exports = {
  subRouter: router,
  include: [
    {
      model: User,
      as: "User",
      attributes: ["name", "username"],
      include: {
        model: Profile,
        as: "Profile",
        attributes: ["avatar"],
      },
    },
    {
      model: User,
      as: "Likes",
      attributes: ["id"],
    },
    {
      model: Comment,
      as: "Comments",
      attributes: ["content", "createdAt"],
      where: {
        parentId: null,
        status: "visible",
      },
      include: [
        {
          model: Comment,
          as: "Replies",
          required: false,
          attributes: ["content"],
          where: { status: "visible" },
          include: {
            model: User,
            as: "User",
            attributes: ["name", "username"],
            include: {
              model: Profile,
              as: "Profile",
              attributes: ["avatar"],
            },
          },
        },
        {
          model: User,
          as: "User",
          attributes: ["name", "username"],
          include: {
            model: Profile,
            as: "Profile",
            attributes: ["avatar"],
          },
        },
      ],
    },
  ],
};
