const createValidator = require("@/utils/create-validator.util");

const topicSchema = {
  name: {
    isLength: {
      options: { min: 1, max: 100 },
      errorMessage: "Name must be between 1 and 100 characters",
    },
  },
  description: {
    isLength: {
      options: { max: 500 },
      errorMessage: "Description must be at most 500 characters long",
    },
  },
};

module.exports = {
  create: createValidator(topicSchema, { required: ["name"] }),
  update: createValidator(topicSchema),
};
