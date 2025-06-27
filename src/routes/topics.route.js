const express = require("express");
const router = express.Router();

const topicsController = require("@/controllers/topics.controller");
const postsController = require("@/controllers/posts.controller");

router.get("/", topicsController.getAll);
router.post("/", topicsController.create);
router.get("/:id", topicsController.getById);
router.put("/:id", topicsController.update);
router.patch("/:id", topicsController.update);
router.delete("/:id", topicsController.delete);

router.get("/:id/posts", postsController.getByTopicId);

module.exports = router;
