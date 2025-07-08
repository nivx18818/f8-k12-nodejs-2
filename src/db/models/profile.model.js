module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    "Profile",
    {
      title: DataTypes.STRING,
      bio: DataTypes.TEXT,
      avatar: DataTypes.STRING,
      coverImage: DataTypes.STRING,
      location: DataTypes.TEXT,
      xTwitter: DataTypes.STRING,
      github: DataTypes.STRING,
      linkedin: DataTypes.STRING,
      facebook: DataTypes.STRING,
      website: DataTypes.STRING,
    },
    {
      tableName: "profiles",
    }
  );

  Profile.associate = (models) => {
    Profile.belongsTo(models.User, {
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
    });
  };

  return Profile;
};
