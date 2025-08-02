const createValidator = require("@/utils/create-validator.util");

const authSchema = {
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
  token: {},
  currentPassword: {
    isLength: {
      options: { min: 8, max: 100 },
      errorMessage: "Password must be at least 8 characters long",
    },
  },
  newPassword: {
    isLength: {
      options: { min: 8, max: 100 },
      errorMessage: "New password must be at least 8 characters long",
    },
  },
};

module.exports = {
  login: createValidator(authSchema, {
    includes: ["email", "password"],
    required: "all",
  }),
  register: createValidator(authSchema, {
    excludes: ["token", "currentPassword", "newPassword"],
    required: "all",
  }),
  forgotPassword: createValidator(authSchema, {
    includes: ["email"],
    required: "all",
  }),
  resetPassword: createValidator(authSchema, {
    includes: ["newPassword", "token"],
    required: "all",
  }),
  verifyEmail: createValidator(authSchema, {
    includes: ["token"],
    required: "all",
  }),
  changePassword: createValidator(authSchema, {
    includes: ["currentPassword", "newPassword"],
    required: "all",
  }),
};
