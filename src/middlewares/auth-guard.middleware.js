const jwtService = require("@/services/jwt.service");
const { User } = require("@/models");

const authGuard = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.error(401, "Access token is required");
  }

  const payload = jwtService.verify(token);

  const user = User.findOne({
    attributes: { exclude: ["password"] },
    where: { id: payload.userId },
  });

  if (!user) {
    return res.error(401, "Invalid access token");
  }

  req.user = user;

  next();
};

module.exports = authGuard;
