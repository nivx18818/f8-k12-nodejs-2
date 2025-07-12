const { Comment } = require("@/db/models");

exports.getAll = async (page = 1, limit = 10) => {
  const comments = await Comment.findAll({ limit, offset: (page - 1) * limit });
  return comments;
};

exports.getById = async (id) => {
  const comment = await Comment.findOne({ where: { id } });
  return comment;
};

exports.create = async (data) => {
  const newComment = await Comment.create(data);
  return newComment;
};

exports.update = async (id, data) => {
  const updatedRows = await Comment.update(data, {
    where: { id },
  });

  if (!updatedRows) return null;

  const updatedComment = await this.getById(id);
  return updatedComment;
};

exports.delete = async (id) => {
  const deletedRows = await Comment.destroy({ where: { id } });
  return deletedRows > 0;
};
