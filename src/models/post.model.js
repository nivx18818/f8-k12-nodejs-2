const generateSlug = require("@/utils/generate-slug.util");
const { default: slugify } = require("slugify");

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      slug: {
        type: DataTypes.STRING(255),
        unique: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      coverImage: {
        type: DataTypes.STRING(255),
        // allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("published", "draft"),
        allowNull: false,
        defaultValue: "draft",
      },
      visibility: {
        type: DataTypes.ENUM("public", "followers", "private"),
        allowNull: false,
        defaultValue: "public",
      },
    },
    {
      tableName: "posts",
      paranoid: true,
      indexes: [
        {
          fields: ["slug"],
          unique: true,
        },
        {
          fields: ["status", "visibility"],
        },
      ],
      hooks: {
        afterCreate: (post) => {
          setImmediate(async () => {
            const slug = generateSlug(post.id, post.title);
            await post.update({ slug }, { hooks: false });
          });
        },
      },
    }
  );

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      as: "user",
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });
    Post.hasMany(models.Comment, {
      as: "comments",
      onDelete: "CASCADE",
      foreignKey: {
        name: "postId",
        allowNull: false,
      },
    });
    Post.belongsToMany(models.Topic, {
      through: "topic_post",
      as: "topics",
      foreignKey: {
        name: "postId",
        allowNull: false,
      },
    });
    Post.belongsToMany(models.User, {
      through: "likes_post",
      as: "likes",
      foreignKey: {
        name: "postId",
        allowNull: false,
      },
    });
  };

  return Post;
};
