const createValidator = require("@/utils/create-validator.util");

const userSchema = {
  name: {
    isLength: {
      options: { max: 100 },
      errorMessage: "Name must be at most 100 characters long",
    },
  },
  username: {
    isLength: {
      options: { max: 50 },
      errorMessage: "Username must be at most 50 characters long",
    },
    matches: {
      options: [/^[a-zA-Z0-9_]+$/],
      errorMessage: "Username can only contain letters, numbers, and underscores",
    },
  },
  email: {
    isEmail: "Email must be a valid email address",
  },
  password: {
    isLength: {
      options: { min: 8, max: 100 },
      errorMessage: "Password must be at least 8 characters long",
    },
  },
};

module.exports = {
  create: createValidator(userSchema, { required: "all" }),
  update: createValidator(userSchema, { excludes: ["password"] }),
};
