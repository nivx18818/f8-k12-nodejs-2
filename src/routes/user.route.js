const express = require("express");
const router = express.Router();

const userController = require("@/controllers/user.controller");
const userValidator = require("@/validators/user.validator");

router.get("/", userController.getAll);
router.post("/", userValidator.create, userController.create);
router.get("/:id", userController.getById);
router.put("/:id", userValidator.update, userController.update);
router.patch("/:id", userValidator.update, userController.update);
router.delete("/:id", userController.delete);

module.exports = {
  subRouter: router,
  include: ["Profile", "Skills"],
};
