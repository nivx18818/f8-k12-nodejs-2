const jwtService = require("@/services/jwt.service");
const refreshTokenService = require("@/services/refresh-token.service");
const userService = require("@/services/user.service");
const queueService = require("@/services/queue.service");
const generateRefreshToken = require("@/utils/generate-refresh-token");
const bcrypt = require("@/utils/bcrypt");

exports.login = async ({ email, password, ...rest }) => {
  const user = await userService.getByUsernameOrEmail(email);
  const isValid = await bcrypt.compare(password, user?.password);

  if (!isValid) {
    return res.error(401, "Invalid email or password");
  }

  const accessToken = jwtService.sign(user.id);
  const refreshToken = await generateRefreshToken({ userId: user.id, ...rest });

  return [accessToken, refreshToken];
};

exports.register = async (data) => {
  const user = await userService.create({
    ...data,
    password: await bcrypt.hash(data.password),
  });

  queueService.dispatch("sendVerificationEmail", { userId: user.id });

  return user;
};

exports.refreshToken = async (token) => {
  const refreshToken = await refreshTokenService.getByToken(token);

  if (!refreshToken || refreshToken.revoked) {
    return res.error(401, "Invalid or expired refresh token");
  }

  const newAccessToken = jwtService.sign({ userId: refreshToken.userId });
  await refreshTokenService.revoke(refreshToken.token);
  const newRefreshToken = await generateRefreshToken(req, refreshToken.userId);

  return [newAccessToken, newRefreshToken];
};

exports.forgotPassword = async () => {};

exports.verifyEmail = async () => {};
