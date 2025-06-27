const express = require("express");
const router = express.Router();

const postsController = require("@/controllers/posts.controller");
const commentsController = require("@/controllers/comments.controller");

router.get("/", postsController.getList);
router.post("/", postsController.create);

router.get("/:id", postsController.getById);
router.put("/:id", postsController.update);
router.patch("/:id", postsController.update);
router.delete("/:id", postsController.delete);

router.get("/:id/comments", commentsController.getByPostId);
router.post("/:id/comments", commentsController.createByPostId);

module.exports = router;
