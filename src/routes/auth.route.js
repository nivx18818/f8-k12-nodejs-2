const express = require("express");
const router = express.Router();

const authController = require("@/controllers/auth.controller");
const authGuard = require("@/middlewares/auth-guard");

router.get("/me", authGuard, authController.me);
router.get("/login", authController.login);
router.get("/register", authController.register);
router.get("/refresh-token", authController.refreshToken);

module.exports = { subRouter: router };
