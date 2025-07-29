const jwtService = require("@/services/jwt.service");
const refreshTokenService = require("@/services/refresh-token.service");
const userService = require("@/services/user.service");
const queueService = require("@/services/queue.service");
const generateRefreshToken = require("@/utils/generate-refresh-token.util");
const bcrypt = require("@/utils/bcrypt.util");

exports.login = async ({ email, password, ...rest }) => {
  const user = await userService.getByUsernameOrEmail(email);
  const isValid = await bcrypt.compare(password, user?.password);

  if (!isValid) return null;

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

exports.refreshToken = async (token, data) => {
  const refreshToken = await refreshTokenService.getByToken(token);

  if (!refreshToken || refreshToken.revoked) {
    return null;
  }

  const newAccessToken = jwtService.sign(refreshToken.userId);

  const isSuccessful = await refreshTokenService.revoke(refreshToken.token);
  if (!isSuccessful) return null;

  const newRefreshToken = await generateRefreshToken({
    userId: refreshToken.userId,
    ...data,
  });

  return [newAccessToken, newRefreshToken];
};

exports.logout = async (token) => {
  const isSuccessful = await refreshTokenService.revoke(token);
  if (!isSuccessful) return false;
  return true;
};

exports.forgotPassword = async (email) => {
  const user = await userService.getByEmail(email);
  if (!user) return;
  queueService.dispatch("sendPasswordResetEmail", { userId: user.id });
};

exports.resetPassword = async (token, newPassword) => {
  const { userId } = jwtService.verify(token);
  const updatedUser = await userService.update(userId, { password: newPassword });
  if (!updatedUser) return false;
  queueService.dispatch("sendPasswordChangedNotification", { userId });
  return true;
};

exports.verifyEmail = async (token) => {
  const { userId } = jwtService.verify(token);
  const updatedUser = await userService.update(userId, { verifiedAt: new Date() });
  if (!updatedUser) return false;
  queueService.dispatch("sendVerificationEmail", { userId });
  return true;
};
