const express = require("express");
const router = express.Router();

const userController = require("@/controllers/user.controller");

router.get("/", userController.getAll);
router.post("/", userController.create);
router.get("/:id", userController.getById);
router.put("/:id", userController.update);
router.patch("/:id", userController.update);
router.delete("/:id", userController.delete);

module.exports = {
  subRouter: router,
  include: ["Profiles", "Skills"],
};
