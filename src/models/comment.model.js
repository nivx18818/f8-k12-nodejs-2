module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("visible", "hidden", "pending", "deleted"),
        allowNull: false,
        defaultValue: "visible",
      },
    },
    {
      tableName: "comments",
    }
  );

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      as: "user",
      foreignKey: "userId",
    });
    Comment.belongsTo(models.Post, {
      foreignKey: {
        name: "postId",
        allowNull: false,
      },
    });
    Comment.belongsToMany(models.User, {
      through: "likes_comment",
      as: "likes",
      foreignKey: {
        name: "commentId",
        allowNull: false,
      },
    });
    Comment.hasMany(models.Comment, {
      as: "replies",
      foreignKey: "parentId",
    });
    Comment.belongsTo(models.Comment, {
      as: "parent",
      foreignKey: "parentId",
    });
  };

  return Comment;
};
