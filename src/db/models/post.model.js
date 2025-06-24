const createModel = require("@/utils/createModel");

module.exports = createModel((DataTypes) => ({
  modelName: "Post",
  tableName: "posts",
  slug: {
    type: DataTypes.STRING(45),
    unique: true,
  },
  title: {
    type: DataTypes.STRING(191),
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}));
