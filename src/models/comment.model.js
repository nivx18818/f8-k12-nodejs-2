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
      foreignKey: {
        name: "commentId",
        allowNull: false,
      },
    });
    Comment.hasMany(models.Comment, {
      as: "Replies",
      foreignKey: "parentId",
    });
    Comment.belongsTo(models.Comment, {
      as: "Parent",
      foreignKey: "parentId",
    });
  };

  return Comment;
};
