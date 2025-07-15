const createValidator = require("@/utils/create-validator.util");

const loginSchema = {
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

const registerSchema = {
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
};

const refreshTokenSchema = {
  refreshToken: {
    isJWT: "Refresh token must be a valid JWT token",
  },
};

const forgotPasswordSchema = {
  email: {
    isEmail: "Email must be a valid email address",
  },
};

const resetPasswordSchema = {
  token: {},
  password: {
    isLength: {
      options: { min: 8, max: 100 },
      errorMessage: "Password must be at least 8 characters long",
    },
  },
};

const verifyEmailSchema = {
  token: {},
};

const changePasswordSchema = {
  currentPassword: {},
  newPassword: {
    isLength: {
      options: { min: 8, max: 100 },
      errorMessage: "New password must be at least 8 characters long",
    },
  },
};

module.exports = {
  login: createValidator(loginSchema, { required: "all" }),
  register: createValidator(registerSchema, { required: "all" }),
  refreshToken: createValidator(refreshTokenSchema, { required: "all" }),
  forgotPassword: createValidator(forgotPasswordSchema, { required: "all" }),
  resetPassword: createValidator(resetPasswordSchema, { required: "all" }),
  verifyEmail: createValidator(verifyEmailSchema, { required: "all" }),
  changePassword: createValidator(changePasswordSchema, { required: "all" }),
};
