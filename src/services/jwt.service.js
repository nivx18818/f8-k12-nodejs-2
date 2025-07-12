const jwtService = require("jsonwebtoken");

exports.sign = (userId, options) => {
  const token = jwtService.sign({ userId }, process.env.JWT_SECRET, {
    expiresAt: Date.now() + parseInt(process.env.ACCESS_TOKEN_EXPIRATION),
    ...options,
  });
  return token;
};

exports.verify = (token) => {
  const decodedData = jwtService.verify(token, process.env.JWT_SECRET);
  return decodedData;
};
