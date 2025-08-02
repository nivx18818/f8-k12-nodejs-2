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

  return res.token(...tokens);
});

exports.register = asyncHandler(async (req, res) => {
  await authService.register(req.body);
  return res.success(204);
});

exports.refreshToken = asyncHandler(async (req, res) => {
  if (!req.cookies.refreshToken) {
    return res.error(401, "Refresh token is required");
  }

  const newTokens = await authService.refreshToken(req.cookies.refreshToken, {
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
  });

  if (!newTokens) {
    return res.error(401, "Invalid or expired refresh token");
  }

  return res.token(...newTokens);
});

exports.logout = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;
  const isSuccessful = await authService.logout(token);

  if (!isSuccessful) {
    return res.error(400, "Failed to log out");
  }

  return res.clearCookies();
});

exports.forgotPassword = asyncHandler(async (req, res) => {
  await authService.forgotPassword(req.body.email, {
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
  });
  return res.success(204);
});

exports.resetPassword = asyncHandler(async (req, res) => {
  const isSuccessful = await authService.resetPassword(req.body.token, {
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
    newPassword: req.body.newPassword,
  });

  if (!isSuccessful) {
    return res.error(400, "Invalid or expired reset token");
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
