const createModel = require("@/utils/createModel");

const Post = createModel(
  (DataTypes) => ({
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
  }),
  (models) => {
    models.Post.hasMany(models.Comment);
    models.Post.belongsToMany(models.Topic, {
      through: "topic_post",
      foreignKey: "post_id",
    });
  }
);

module.exports = Post;
