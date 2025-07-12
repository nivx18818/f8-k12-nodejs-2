module.exports = (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define(
    "RefreshToken",
    {
      token: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      ipAddress: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      userAgent: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      revoked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "refresh_tokens",
      updatedAt: false,
      indexes: [
        {
          fields: ["token"],
          unique: true,
        },
      ],
    }
  );

  RefreshToken.associate = (models) => {
    RefreshToken.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });
  };

  return RefreshToken;
};
