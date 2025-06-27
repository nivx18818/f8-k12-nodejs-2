const topicsService = require("@/services/topics.service");
const asyncHandler = require("@/utils/asyncHandler");

exports.getAll = asyncHandler(async (req, res) => {
  const topics = await topicsService.getAll();
  return res.success(200, topics);
});

exports.getById = asyncHandler(async (req, res) => {
  return res.success(200, req.topic);
});

exports.create = asyncHandler(async (req, res) => {
  const newTopic = await topicsService.create(req.body);
  return res.success(201, newTopic);
});

exports.update = asyncHandler(async (req, res) => {
  const updatedTopic = await topicsService.update(req.params.id, req.body);
  return res.success(200, updatedTopic);
});

exports.delete = asyncHandler(async (req, res) => {
  await topicsService.delete(req.params.id);
  return res.success(204);
});
