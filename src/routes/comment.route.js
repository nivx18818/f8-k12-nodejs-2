const express = require("express");
const router = express.Router();

const commentController = require("@/controllers/comment.controller");
const commentValidator = require("@/validators/comment.validator");
const authGuard = require("@/middlewares/auth-guard.middleware");

router.get("/", commentController.getList);
router.post("/", commentValidator.create, commentController.create);
router.get("/:id", commentController.getById);
router.put("/:id", commentValidator.update, commentController.update);
router.patch("/:id", commentValidator.update, commentController.update);
router.delete("/:id", commentController.delete);

router.post("/:id/like", authGuard, commentController.like);
router.post("/:id/unlike", authGuard, commentController.unlike);

module.exports = { subRouter: router };
