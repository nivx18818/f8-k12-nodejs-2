const authService = require("@/services/auth.service");
const asyncHandler = require("@/utils/async-handler.util");

exports.me = asyncHandler(async (req, res) => res.success(200, req.user));

exports.login = asyncHandler(async (req, res) => {
  const tokens = await authService.login({
    ...req.body,
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
  });

  if (!tokens) {
    return res.error(401, "Invalid email or password");
  }

  return res.token(200, ...tokens);
});

exports.register = asyncHandler(async (req, res) => {
  await authService.register(req.body);
  return res.success(204);
});

exports.refreshToken = asyncHandler(async (req, res) => {
  const newTokens = await authService.refreshToken(req.body.refreshToken, {
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
  });

  if (!newTokens) {
    return res.error(401, "Invalid or expired refresh token");
  }

  return res.token(200, ...newTokens);
});

exports.forgotPassword = asyncHandler(async (req, res) => {
  await authService.forgotPassword(req.body.email);
  return res.success(204);
});

exports.resetPassword = asyncHandler(async (req, res) => {
  const isSuccessful = await authService.resetPassword(req.body.token, req.body.password);

  if (!isSuccessful) {
    return res.error(400, "Invalid or expired password reset token");
  }

  return res.success(204);
});

exports.verifyEmail = asyncHandler(async (req, res) => {
  const isSuccessful = await authService.verifyEmail(req.body.token);

  if (!isSuccessful) {
    return res.error(400, "Invalid or expired verification token");
  }

  return res.success(204);
});
