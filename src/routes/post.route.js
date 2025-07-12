const express = require("express");
const router = express.Router();

const postController = require("@/controllers/post.controller");
const commentController = require("@/controllers/comment.controller");
const { Comment } = require("@/db/models");

router.get("/", postController.getList);
router.post("/", postController.create);

router.get("/:id", postController.getById);
router.put("/:id", postController.update);
router.patch("/:id", postController.update);
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
