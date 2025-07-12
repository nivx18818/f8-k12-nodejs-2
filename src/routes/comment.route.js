const express = require("express");
const router = express.Router();

const commentController = require("@/controllers/comment.controller");

router.get("/", commentController.getList);
router.post("/", commentController.create);
router.get("/:id", commentController.getById);
router.put("/:id", commentController.update);
router.patch("/:id", commentController.update);
router.delete("/:id", commentController.delete);

module.exports = { subRouter: router };
