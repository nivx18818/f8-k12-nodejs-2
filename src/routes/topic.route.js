const express = require("express");
const router = express.Router();

const topicController = require("@/controllers/topic.controller");
const topicValidator = require("@/validators/topic.validator");
const postController = require("@/controllers/post.controller");

router.get("/", topicController.getAll);
router.post("/", topicValidator.create, topicController.create);
router.get("/:id", topicController.getById);
router.put("/:id", topicValidator.update, topicController.update);
router.patch("/:id", topicValidator.update, topicController.update);
router.delete("/:id", topicController.delete);

router.get("/:id/posts", postController.getByTopicId);

module.exports = {
  subRouter: router,
  include: "Posts",
};
