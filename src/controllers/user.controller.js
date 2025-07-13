const userService = require("@/services/user.service");
const asyncHandler = require("@/utils/async-handler.util");

exports.getAll = asyncHandler(async (req, res) => {
  const users = await userService.getAll();
  return res.success(200, users);
});

exports.getById = (req, res) => res.success(200, req.user);

exports.getByUsername = (req, res) => res.success(200, req.user);

exports.getByEmail = asyncHandler(async (req, res) => {
  const user = await userService.getByEmail(req.body.email);
  return user;
});

exports.create = asyncHandler(async (req, res) => {
  const newUser = await userService.create(req.body);
  return res.success(201, newUser);
});

exports.update = asyncHandler(async (req, res) => {
  const updatedUser = await userService.update(req.params.id, req.body);
  return res.success(200, updatedUser);
});

exports.delete = asyncHandler(async (req, res) => {
  await userService.delete(req.params.id);
  return res.success(204);
});
