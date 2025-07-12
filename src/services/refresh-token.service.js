const { RefreshToken } = require("@/models");

exports.getAll = async () => {
  const refreshTokens = await RefreshToken.findAll();
  return refreshTokens;
};

exports.getByUserId = async (userId) => {
  const refreshTokens = await RefreshToken.findAll({
    where: { userId },
  });
  return refreshTokens;
};

exports.getByToken = async (token) => {
  const refreshToken = await RefreshToken.findOne({ where: { token } });
  return refreshToken;
};

exports.create = async (data) => {
  const newRefreshToken = await RefreshToken.create(data);
  return newRefreshToken;
};

exports.update = async (token, data) => {
  const updatedRows = await RefreshToken.update(data, {
    where: { token },
  });

  if (!updatedRows) return null;

  const updatedRefreshToken = await this.getById(id);
  return updatedRefreshToken;
};

exports.revoke = async (token) => {
  const updatedRows = await RefreshToken.update(
    { revoked: true },
    {
      where: { token },
    }
  );

  return updatedRows > 0;
};
