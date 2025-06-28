const createModel = require("@/utils/createModel");

const Topic = createModel(
  (DataTypes) => ({
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
  }),
  (models) => {
    models.Topic.belongsToMany(models.Post, {
      through: "topic_post",
      foreignKey: "topic_id",
    });
  }
);

module.exports = Topic;
