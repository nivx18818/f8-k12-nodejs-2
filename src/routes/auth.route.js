const express = require("express");
const router = express.Router();

const authController = require("@/controllers/auth.controller");
const authGuard = require("@/middlewares/auth-guard.middleware");
const authValidator = require("@/validators/auth.validator");

router.get("/me", authGuard, authController.me);
router.post("/login", authValidator.login, authController.login);
router.post("/register", authValidator.register, authController.register);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);
router.post("/forgot-password", authValidator.forgotPassword, authController.forgotPassword);
router.post("/reset-password", authValidator.resetPassword, authController.resetPassword);
router.post("/verify-email", authValidator.verifyEmail, authController.verifyEmail);

router.post("/resend-verification", authController.resendVerification);
router.post("/resend-reset", authController.resendReset);

module.exports = { subRouter: router };
