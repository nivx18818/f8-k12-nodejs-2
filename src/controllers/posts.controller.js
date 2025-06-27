const postsService = require("@/services/posts.service");
const asyncHandler = require("@/utils/asyncHandler");

exports.getList = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const posts = await postsService.getAll(page, limit);
  return res.success(200, posts);
});

exports.getById = asyncHandler(async (req, res) => {
  return res.success(200, req.post);
});

exports.create = asyncHandler(async (req, res) => {
  const newPost = await postsService.create(req.body);
  return res.success(201, newPost);
});

exports.update = asyncHandler(async (req, res) => {
  const updatedPost = await postsService.update(req.params.id, req.body);
  return res.success(200, updatedPost);
});

exports.delete = asyncHandler(async (req, res) => {
  await postsService.delete(req.params.id);
  return res.success(204);
});
