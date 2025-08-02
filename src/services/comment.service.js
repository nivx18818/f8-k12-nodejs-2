const { Comment, User, Profile } = require("@/models");

exports.getAll = async () => {
  const comments = await Comment.findAll();
  return comments;
};

exports.getById = async (id) => {
  const comment = await Comment.findOne({
    where: { id },
    include: {
      model: User,
      as: "user",
      attributes: ["name", "username"],
      include: {
        model: Profile,
        as: "profile",
        attributes: ["avatar"],
      },
    },
  });
  return comment;
};

exports.create = async (data) => {
  const newComment = await Comment.create(data);
  const comment = this.getById(newComment.id);
  return comment;
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
