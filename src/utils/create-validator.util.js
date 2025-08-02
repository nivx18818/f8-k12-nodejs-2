const { checkSchema } = require("express-validator");
const handleValidationError = require("@/middlewares/handle-validation-error.middleware");

const createValidator = (baseSchema, options = {}) => {
  const { includes = [], excludes = [], required = [], optional = [] } = options;

  let schemaFields = Object.keys(baseSchema);

  if (includes.length) {
    schemaFields = schemaFields.filter((key) => includes.includes(key));
  }

  const schema = schemaFields
    .filter((field) => !excludes.includes(field))
    .reduce((schema, field) => {
      schema[field] = baseSchema[field];

      const isRequired =
        (required === "all" || required.includes(field)) && !optional.includes(field);

      if (isRequired) {
        const words = field.split(/(?=[A-Z])/).join(" ");
        const fieldName = words.charAt(0).toUpperCase() + words.slice(1);
        schema[field].notEmpty = `${fieldName} is required`;
      } else {
        schema[field].optional = true;
      }

      return schema;
    }, {});

  return [checkSchema(schema), handleValidationError];
};

module.exports = createValidator;
