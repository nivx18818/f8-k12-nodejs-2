module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define(
    "Topic",
    {
      slug: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
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
        beforeValidate: (topic) => {
          if (topic.name && topic.changed("name")) {
            topic.slug = slugify(topic.name, { lower: true, strict: true });
          }
        },
      },
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
