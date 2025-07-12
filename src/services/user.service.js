const { User } = require("@/models");
const { Op } = require("sequelize");

exports.getAll = async () => {
  const users = await User.findAll();
  return users;
};

exports.getById = async (id) => {
  const user = await User.findOne({ where: { id } });
  return user;
};

exports.getByUsername = async (username) => {
  const user = await User.findOne({ where: { username } });
  return user;
};

exports.getByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

exports.getByUsernameOrEmail = async (value) => {
  const user = await User.findOne({
    where: {
      [Op.or]: [{ email: value }, { username: value }],
    },
  });
  return user;
};

exports.create = async (data) => {
  const newUser = await User.create(data);
  return newUser;
};

exports.update = async (id, data) => {
  const updatedRows = await User.update(data, {
    where: { id },
  });

  if (!updatedRows) return null;

  const updatedUser = await this.getById(id);
  return updatedUser;
};

exports.delete = async (id) => {
  const deletedRows = await User.destroy({ where: { id } });
  return deletedRows > 0;
};
