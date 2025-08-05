const commentService = require("@/services/comment.service");
const asyncHandler = require("@/utils/async-handler.util");

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

exports.like = asyncHandler(async (req, res) => {
  const liked = await comment.like(req.comment, req.user.id);
  if (liked) return res.success(204);
  return res.error(400, "Failed to like the comment");
});

exports.unlike = asyncHandler(async (req, res) => {
  const unliked = await comment.unlike(req.comment, req.user.id);
  if (unliked) return res.success(204);
  return res.error(400, "Failed to unlike the comment");
});
