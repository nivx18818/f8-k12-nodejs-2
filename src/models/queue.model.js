module.exports = (sequelize, DataTypes) => {
  const Queue = sequelize.define(
    "Queue",
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      payload: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "processing", "done", "failed"),
        allowNull: false,
        defaultValue: "pending",
      },
      retryCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      maxRetries: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5,
      },
    },
    {
      tableName: "queue",
      indexes: [{ fields: ["status"] }],
    }
  );

  return Queue;
};
