const express = require("express");
const router = express.Router();

const commentController = require("@/controllers/comment.controller");
const commentValidator = require("@/validators/comment.validator");

router.get("/", commentController.getList);
router.post("/", commentValidator.create, commentController.create);
router.get("/:id", commentController.getById);
router.put("/:id", commentValidator.update, commentController.update);
router.patch("/:id", commentValidator.update, commentController.update);
router.delete("/:id", commentController.delete);

module.exports = { subRouter: router };
