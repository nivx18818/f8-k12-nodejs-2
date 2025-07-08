module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define(
    "Skill",
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      tableName: "skills",
    }
  );

  Skill.associate = (models) => {
    Skill.belongsToMany(models.User, {
      through: "user_skill",
      foreignKey: {
        name: "skill_id",
        allowNull: false,
      },
    });
  };

  return Skill;
};
