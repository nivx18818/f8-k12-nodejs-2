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
        allowNull: false,
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
        beforeCreate: (post) => {
          if (post.title && post.changed("title")) {
            post.slug = generateSlug(post.id, post.title);
          }
        },
      },
    }
  );

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });
    Post.hasMany(models.Comment, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "postId",
        allowNull: false,
      },
    });
    Post.belongsToMany(models.Topic, {
      through: "topic_post",
      foreignKey: {
        name: "postId",
        allowNull: false,
      },
    });
    Post.belongsToMany(models.User, {
      through: "likes_post",
      as: "Likes",
      foreignKey: {
        name: "postId",
        allowNull: false,
      },
    });
  };

  return Post;
};
