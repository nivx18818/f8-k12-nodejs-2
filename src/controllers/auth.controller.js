const jwt = require("@/utils/jwt");
const bcrypt = require("@/utils/bcrypt");
const generateRefreshToken = require("@/utils/generate-refresh-token");
const refreshTokenService = require("@/services/refresh-token.service");
const userService = require("@/services/user.service");

exports.me = async (req, res) => {
  res.success(200, req.user);
};

exports.login = async (req, res) => {
  const user = await userService.getByUsernameOrEmail(req.body.email);
  const isValid = await bcrypt.compare(req.body.password, user?.password);

  if (!isValid) {
    return res.error(401, "Invalid email or password");
  }

  const accessToken = jwt.sign({ userId: user.id });
  const refreshToken = generateRefreshToken(req, user.id);

  return res.token(accessToken, refreshToken);
};

exports.register = async (req, res) => {
  await userService.create({
    email: req.body.email,
    password: await bcrypt.hash(req.body.password),
  });

  return res.success(204);
};

exports.refreshToken = async (req, res) => {
  const refreshToken = await refreshTokenService.getByToken(req.body.refreshToken);

  if (!refreshToken || refreshToken.revoked) {
    return res.error(401, "Invalid or expired refresh token");
  }

  const newAccessToken = jwt.sign({ userId: refreshToken.userId });
  await refreshTokenService.revoke(refreshToken.token);
  const newRefreshToken = generateRefreshToken(req, refreshToken.userId);

  return res.token(newAccessToken, newRefreshToken);
};
