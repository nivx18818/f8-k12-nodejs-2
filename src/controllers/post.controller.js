const asyncHandler = require("@/utils/async-handler.util");
const postService = require("@/services/post.service");
const jwtService = require("@/services/jwt.service");

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

exports.like = asyncHandler(async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const { userId } = jwtService.verify(accessToken);

  const liked = await postService.like(req.post, userId);
  if (liked) return res.success(204);
  return res.error(400, "Failed to like the post");
});

exports.unlike = asyncHandler(async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const { userId } = jwtService.verify(accessToken);

  const unliked = await postService.unlike(req.post, userId);
  if (unliked) return res.success(204);
  return res.error(400, "Failed to unlike the post");
});
