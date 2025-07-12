const { Post, Topic, sequelize } = require("@/models");
const { Op } = require("sequelize");

exports.getAll = async (page = 1, limit = 10) => {
  const posts = await Post.findAll({ limit, offset: (page - 1) * limit });
  return posts;
};

exports.getByTopicId = async (topicId, page = 1, limit = 10) => {
  const posts = await Post.findAll({
    include: {
      model: Topic,
      where: { id: topicId },
    },
    limit,
    offset: (page - 1) * limit,
  });
  return posts;
};

exports.getById = async (id) => {
  const post = await Post.findOne({ where: { id } });
  return post;
};

exports.create = async (data) => {
  const { topicIds, ...postData } = data;

  const result = await sequelize.transaction(async (t) => {
    const newPost = await Post.create(postData, { transaction: t });

    if (topicIds && topicIds.length > 0) {
      await newPost.setTopics(topicIds, { transaction: t });
    }

    return newPost;
  });

  return Post.findByPk(result.id, { include: [Topic] });
};

exports.update = async (id, data) => {
  const updatedRows = await Post.update(data, {
    where: { id },
  });

  if (!updatedRows) return null;

  const updatedPost = await this.getById(id);
  return updatedPost;
};

exports.delete = async (id) => {
  const deletedRows = await Post.destroy({
    where: { [Op.or]: [{ id }, { slug: id }] },
  });
  return deletedRows > 0;
};
