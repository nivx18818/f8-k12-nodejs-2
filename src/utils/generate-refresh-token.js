const refreshTokenService = require("@/services/refresh-token.service");

const generateToken = (length = 32) => {
  const dateString = Date.now().toString(16);
  const randomKey = require("crypto")
    .randomBytes(Math.abs(length - dateString.length))
    .toString("hex");
  return randomKey + dateString;
};

const generateRefreshToken = async (req, userId, length = 32) => {
  let randomToken = generateToken(length);

  while (await refreshTokenService.getByToken(randomToken)) {
    randomToken = generateToken(length);
  }

  const exp = new Date(Date.now() + parseInt(process.env.REFRESH_TOKEN_EXPIRATION) * 1000);

  const refreshToken = await refreshTokenService.create({
    userId: userId,
    token: randomToken,
    expiresAt: exp,
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
  });

  return refreshToken.token;
};

module.exports = generateRefreshToken;
