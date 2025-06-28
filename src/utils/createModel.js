const createModel = (configFn, associate) => {
  return (sequelize, DataTypes) => {
    const { modelName, tableName, options, ...attributes } =
      configFn(DataTypes);

    const Model = sequelize.define(modelName, attributes ?? {}, {
      tableName: tableName,
      timestamps: true,
      underscored: true,
      ...options,
    });

    if (associate) Model.associate = associate;

    return Model;
  };
};

module.exports = createModel;
