module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define(
    "Topic",
    {
      slug: {
        type: DataTypes.STRING(45),
        unique: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
    },
    {
      tableName: "topics",
      indexes: [
        {
          fields: ["slug"],
          unique: true,
        },
      ],
    }
  );

  Topic.associate = (models) => {
    Topic.belongsToMany(models.Post, {
      through: "topic_post",
      foreignKey: {
        name: "topic_id",
        allowNull: false,
      },
    });
  };

  return Topic;
};
