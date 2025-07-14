const createValidator = require("@/utils/create-validator.util");

const baseSchema = {
  content: {
    isLength: {
      options: { min: 1, max: 1000 },
      errorMessage: "Content must be between 1 and 1000 characters",
    },
  },
  parentId: {
    isInt: {
      options: { min: 1 },
      errorMessage: "Parent ID must be a positive integer",
    },
  },
  status: {
    isIn: {
      options: [["visible", "hidden", "pending", "deleted"]],
      errorMessage: "Status must be one of: visible, hidden, pending, deleted",
    },
  },
};

module.exports = {
  create: createValidator(baseSchema, { excludes: ["status"], required: "all" }),
  update: createValidator(baseSchema, { excludes: ["parentId"] }),
};
