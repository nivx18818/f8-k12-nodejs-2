module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      slug: {
        type: DataTypes.STRING(45),
        unique: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("published", "draft"),
        defaultValue: "draft",
      },
      visibility: {
        type: DataTypes.ENUM("public", "followers", "private"),
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
    }
  );

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
    });
    Post.hasMany(models.Comment, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "post_id",
        allowNull: false,
      },
    });
    Post.belongsToMany(models.Topic, {
      through: "topic_post",
      foreignKey: {
        name: "post_id",
        allowNull: false,
      },
    });
    Post.belongsToMany(models.User, {
      through: "likes",
      foreignKey: {
        name: "post_id",
        allowNull: false,
      },
    });
  };

  return Post;
};
