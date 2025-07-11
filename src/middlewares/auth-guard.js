const jwtService = require("@/services/jwt.service");
const { User } = require("@/models");

const authGuard = (req, res, next) => {
  const token = req.headers?.authorization?.slice(7); // Remove "Bearer " prefix
  const payload = jwtService.verify(token);

  const user = User.findOne({
    attributes: { exclude: ["password"] },
    where: { id: payload.userId },
  });

  req.user = user;

  next();
};

module.exports = authGuard;
