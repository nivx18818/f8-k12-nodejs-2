const express = require("express");
const router = express.Router();

const authController = require("@/controllers/auth.controller");
const authGuard = require("@/middlewares/auth-guard");

router.get("/me", authGuard, authController.me);
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/refresh-token", authController.refresh);

module.exports = { subRouter: router };
