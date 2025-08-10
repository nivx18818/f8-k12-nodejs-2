const { Topic, Post } = require("@/models");

exports.getAll = async () => {
  const topics = await Topic.findAll({
    include: {
      model: Post,
      as: "posts",
      attributes: ["id"],
    },
  });
  return topics;
};

exports.getById = async (id) => {
  const topic = await Topic.findOne({ where: { id } });
  return topic;
};

exports.create = async (data) => {
  const newTopic = await Topic.create(data);
  return newTopic;
};

exports.update = async (id, data) => {
  const updatedRows = await Topic.update(data, {
    where: { id },
  });

  if (!updatedRows) return null;

  const updatedTopic = await this.getById(id);
  return updatedTopic;
};

exports.delete = async (id) => {
  const deletedRows = await Topic.destroy({ where: { id } });
  return deletedRows > 0;
};
