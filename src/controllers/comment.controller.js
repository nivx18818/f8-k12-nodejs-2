const commentService = require("@/services/comment.service");
const asyncHandler = require("@/utils/async-handler");

exports.getList = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const comments = await commentService.getAll(page, limit);
  return res.success(200, comments);
});

exports.getById = (req, res) => res.success(200, req.comment);

exports.create = asyncHandler(async (req, res) => {
  const newComment = await commentService.create(req.body);
  return res.success(201, newComment);
});

exports.createByPostId = asyncHandler(async (req, res) => {
  const data = { ...req.body, postId: req.post.id };
  const newComment = await commentService.create(data);
  return res.success(201, newComment);
});

exports.update = asyncHandler(async (req, res) => {
  const updatedComment = await commentService.update(req.params.id, req.body);
  return res.success(200, updatedComment);
});

exports.delete = asyncHandler(async (req, res) => {
  await commentService.delete(req.params.id);
  return res.success(204);
});
