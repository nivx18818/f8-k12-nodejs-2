const postService = require("@/services/post.service");
const asyncHandler = require("@/utils/async-handler");

exports.getList = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const posts = await postService.getAll(page, limit);
  return res.success(200, posts);
});

exports.getByTopicId = asyncHandler(async (req, res) => {
  const posts = await postService.getByTopicId(req.topic.id);
  return res.success(200, posts);
});

exports.getById = (req, res) => res.success(200, req.post);

exports.create = asyncHandler(async (req, res) => {
  const newPost = await postService.create(req.body);
  return res.success(201, newPost);
});

exports.update = asyncHandler(async (req, res) => {
  const updatedPost = await postService.update(req.post.id, req.body);
  return res.success(200, updatedPost);
});

exports.delete = asyncHandler(async (req, res) => {
  await postService.delete(req.params.id);
  return res.success(204);
});
