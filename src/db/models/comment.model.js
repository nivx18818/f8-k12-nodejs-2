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
        defaultValue: "visible",
      },
    },
    {
      tableName: "comments",
    }
  );

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: "user_id",
    });
    Comment.belongsTo(models.Post, {
      foreignKey: {
        name: "post_id",
        allowNull: false,
      },
    });
    Comment.belongsToMany(models.User, {
      through: "likes_comment",
      foreignKey: {
        name: "comment_id",
        allowNull: false,
      },
    });
    Comment.hasMany(models.Comment, {
      as: "Replies",
      foreignKey: "parent_id",
    });
    Comment.belongsTo(models.Comment, {
      as: "Parent",
      foreignKey: "parent_id",
    });
  };

  return Comment;
};
