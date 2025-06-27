const createModel = (configFn) => {
  return (sequelize, DataTypes) => {
    const {
      modelName,
      tableName,
      options,
      ...attributes
    } = configFn(DataTypes);

    const Model = sequelize.define(modelName, attributes ?? {}, {
      tableName: tableName,
      timestamps: true,
      underscored: true,
      ...options,
    });
    return Model;
  };
};

module.exports = createModel;
