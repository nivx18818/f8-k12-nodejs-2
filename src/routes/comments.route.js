const express = require("express");
const router = express.Router();

const commentsController = require("@/controllers/comments.controller");

router.get("/", commentsController.getList);
router.post("/", commentsController.create);
router.get("/:id", commentsController.getById);
router.put("/:id", commentsController.update);
router.patch("/:id", commentsController.update);
router.delete("/:id", commentsController.delete);

module.exports = router;
