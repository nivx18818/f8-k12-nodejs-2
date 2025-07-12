const express = require("express");
const router = express.Router();

const authController = require("@/controllers/auth.controller");
const authGuard = require("@/middlewares/auth-guard");

router.get("/me", authGuard, authController.me);
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/refresh-token", authController.refreshToken);
router.post("/forgot-password", authController.forgotPassword);
router.post("/verify-email", authController.verifyEmail);

module.exports = { subRouter: router };
