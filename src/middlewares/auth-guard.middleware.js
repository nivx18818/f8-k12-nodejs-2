const jwtService = require("@/services/jwt.service");
const userService = require("@/services/user.service");

const authGuard = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.error(401, "Access token is required");
  }

  const { userId } = jwtService.verify(token);
  const user = await userService.getById(userId);

  if (!user) {
    return res.error(401, "Invalid access token");
  }

  req.user = user;

  next();
};

module.exports = authGuard;
