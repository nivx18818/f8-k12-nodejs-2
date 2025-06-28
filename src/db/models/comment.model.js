const createModel = require("@/utils/createModel");

const Comment = createModel(
  (DataTypes) => ({
    modelName: "Comment",
    tableName: "comments",
    postId: {
      type: DataTypes.INTEGER({ unsigned: true }),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }),
  (models) => {
    models.Comment.belongsTo(models.Post);
  }
);

module.exports = Comment;
