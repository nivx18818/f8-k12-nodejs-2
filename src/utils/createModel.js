const createModel = (configFn) => {
  return (sequelize, DataTypes) => {
    const { modelName, tableName, ...attributes } = configFn(DataTypes);
    const Model = sequelize.define(modelName, attributes, {
      tableName: tableName,
      timestamps: true,
      underscored: true,
      charset: "utf8",
      engine: "InnoDB",
      collate: "utf8_general_ci",
      createdAt: "created_at",
      updatedAt: "updated_at",
    });
    return Model;
  };
};

module.exports = createModel;
