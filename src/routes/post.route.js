const express = require("express");
const router = express.Router();

const postController = require("@/controllers/post.controller");
const postValidator = require("@/validators/post.validator");
const commentController = require("@/controllers/comment.controller");
const { Comment } = require("@/models");

router.get("/", postController.getList);
router.post("/", postValidator.create, postController.create);
router.get("/:id", postController.getById);
router.put("/:id", postValidator.update, postController.update);
router.patch("/:id", postValidator.update, postController.update);
router.delete("/:id", postController.delete);

router.post("/:id/comments", commentController.createByPostId);

module.exports = {
  subRouter: router,
  include: {
    model: Comment,
    as: "Comments",
    where: { parentId: null },
    include: "Replies",
  },
};
