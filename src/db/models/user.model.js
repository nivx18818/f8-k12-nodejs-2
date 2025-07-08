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
    }
  );

  User.associate = (models) => {
    User.hasOne(models.Profile, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
    });
    User.hasMany(models.Post, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
    });
    User.hasMany(models.Comment, {
      foreignKey: "user_id",
    });
    User.belongsToMany(models.Post, {
      through: "likes_post",
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
    });
    User.belongsToMany(models.Comment, {
      through: "likes_comment",
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
    });
    User.belongsToMany(models.Skill, {
      through: "user_skill",
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
    });
    User.belongsToMany(models.User, {
      as: "following",
      through: "user_follower",
      foreignKey: {
        name: "follower_id",
        allowNull: false,
      },
      otherKey: {
        name: "followed_id",
        allowNull: false,
      },
    });
    User.belongsToMany(models.User, {
      as: "followers",
      through: "user_follower",
      foreignKey: {
        name: "followed_id",
        allowNull: false,
      },
      otherKey: {
        name: "follower_id",
        allowNull: false,
      },
    });
  };

  return User;
};
