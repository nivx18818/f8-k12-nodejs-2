const topicService = require("@/services/topic.service");
const asyncHandler = require("@/utils/async-handler");

exports.getAll = asyncHandler(async (req, res) => {
  const topics = await topicService.getAll();
  return res.success(200, topics);
});

exports.getById = (req, res) => res.success(200, req.topic);

exports.create = asyncHandler(async (req, res) => {
  const newTopic = await topicService.create(req.body);
  return res.success(201, newTopic);
});

exports.update = asyncHandler(async (req, res) => {
  const updatedTopic = await topicService.update(req.params.id, req.body);
  return res.success(200, updatedTopic);
});

exports.delete = asyncHandler(async (req, res) => {
  await topicService.delete(req.params.id);
  return res.success(204);
});
