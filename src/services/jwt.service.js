const jwt = require("jsonwebtoken");

exports.sign = (payload, options) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    ...options,
  });
  return token;
};

exports.verify = (token) => {
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  return decodedData;
};
