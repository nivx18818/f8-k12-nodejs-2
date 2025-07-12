module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    "Profile",
    {
      title: DataTypes.STRING(100),
      bio: DataTypes.TEXT,
      avatar: DataTypes.STRING(255),
      coverImage: DataTypes.STRING(255),
      location: DataTypes.TEXT,
      xTwitter: DataTypes.STRING(255),
      github: DataTypes.STRING(255),
      linkedin: DataTypes.STRING(255),
      facebook: DataTypes.STRING(255),
      website: DataTypes.STRING(255),
    },
    {
      tableName: "profiles",
    }
  );

  Profile.associate = (models) => {
    Profile.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });
  };

  return Profile;
};
