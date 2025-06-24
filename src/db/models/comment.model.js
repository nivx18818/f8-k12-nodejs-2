const createModel = require("@/utils/createModel");

module.exports = createModel((DataTypes) => ({
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
}));
