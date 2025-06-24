const createModel = require("@/utils/createModel");

module.exports = createModel((DataTypes) => ({
  modelName: "Topic",
  tableName: "topics",
  slug: {
    type: DataTypes.STRING(45),
    unique: true,
  },
  title: {
    type: DataTypes.STRING(191),
    allowNull: false,
  },
  description: DataTypes.TEXT,
}));
