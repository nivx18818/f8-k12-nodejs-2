const commentsService = require("@/services/comments.service");
const asyncHandler = require("@/utils/asyncHandler");

exports.getList = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const comments = await commentsService.getAll(page, limit);
  return res.success(200, comments);
});

exports.getByPostId = asyncHandler(async (req, res) => {
  const comments = await commentsService.getByPostId(req.post.id);
  return comments;
});

exports.getById = asyncHandler(async (req, res) => {
  return res.success(200, req.comment);
});

exports.create = asyncHandler(async (req, res) => {
  const newComment = await commentsService.create(req.body);
  return res.success(201, newComment);
});

exports.createByPostId = asyncHandler(async (req, res) => {
  const data = { ...req.body, postId: req.post.id };
  const newComment = await commentsService.create(data);
  return res.success(201, newComment);
});

exports.update = asyncHandler(async (req, res) => {
  const updatedComment = await commentsService.update(req.params.id, req.body);
  return res.success(200, updatedComment);
});

exports.delete = asyncHandler(async (req, res) => {
  await commentsService.delete(req.params.id);
  return res.success(204);
});
