const authService = require("@/services/auth.service");
const asyncHandler = require("@/utils/async-handler.util");

exports.me = asyncHandler(async (req, res) => res.success(200, req.user));

exports.login = asyncHandler(async (req, res) => {
  const tokens = await authService.login({
    ...req.body,
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
  });
  res.token(200, ...tokens);
});

exports.register = asyncHandler(async (req, res) => {
  await authService.register(req.body);
  return res.success(204);
});

exports.refreshToken = asyncHandler(async (req, res) => {
  const newTokens = await authService.refreshToken(req.body.refreshToken);
  res.token(200, ...newTokens);
});

exports.forgotPassword = async () => {};

exports.verifyEmail = async () => {};
