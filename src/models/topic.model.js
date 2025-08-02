const generateSlug = require("@/utils/generate-slug.util");

module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define(
    "Topic",
    {
      slug: {
        type: DataTypes.STRING(255),
        unique: true,
      },
      name: {
        type: DataTypes.STRING(100),
        unique: true,
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
      hooks: {
        beforeCreate: (topic) => {
          if (topic.name && topic.changed("name")) {
            topic.slug = generateSlug(topic.id, topic.name);
          }
        },
      },
    }
  );

  Topic.associate = (models) => {
    Topic.belongsToMany(models.Post, {
      through: "topic_post",
      as: "posts",
      foreignKey: {
        name: "topicId",
        allowNull: false,
      },
    });
  };

  return Topic;
};
