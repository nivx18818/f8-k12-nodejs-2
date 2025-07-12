module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      verified_at: DataTypes.DATE,
    },
    {
      tableName: "users",
      indexes: [
        {
          fields: ["username"],
          unique: true,
        },
        {
          fields: ["email"],
          unique: true,
        },
      ],
      hooks: {
        afterDestroy: async (user, options) => {
          const { RefreshToken } = user.constructor.sequelize.models;
          await RefreshToken.destroy({
            where: { userId: user.id },
            transaction: options.transaction,
          });
        },
      },
    }
  );

  User.associate = (models) => {
    User.hasOne(models.Profile, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });
    User.hasMany(models.RefreshToken, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });
    User.hasMany(models.Post, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });
    User.hasMany(models.Comment, {
      foreignKey: "userId",
    });
    User.belongsToMany(models.Post, {
      through: "likes_post",
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });
    User.belongsToMany(models.Comment, {
      through: "likes_comment",
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });
    User.belongsToMany(models.Skill, {
      through: "user_skill",
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });
    User.belongsToMany(models.User, {
      as: "following",
      through: "user_follower",
      foreignKey: {
        name: "followerId",
        allowNull: false,
      },
      otherKey: {
        name: "followedId",
        allowNull: false,
      },
    });
    User.belongsToMany(models.User, {
      as: "followers",
      through: "user_follower",
      foreignKey: {
        name: "followedId",
        allowNull: false,
      },
      otherKey: {
        name: "followerId",
        allowNull: false,
      },
    });
  };

  return User;
};
