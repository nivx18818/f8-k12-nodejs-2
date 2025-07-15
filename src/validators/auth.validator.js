const createValidator = require("@/utils/create-validator.util");

const loginSchema = {
  email: {
    notEmpty: "Email is required",
    isEmail: "Email must be a valid email address",
  },
  password: {
    notEmpty: "Password is required",
    isLength: {
      options: { min: 8, max: 100 },
      errorMessage: "Password must be at least 8 characters long",
    }
  },
};

const registerSchema = {
  name: {
    notEmpty: "Name is required",
    isLength: {
      options: { max: 100 },
      errorMessage: "Name must be at most 100 characters long",
    },
  },
  username: {
    notEmpty: "Username is required",
    isLength: {
      options: { max: 50 },
      errorMessage: "Username must be at most 50 characters long",
    },
  },
  email: {
    notEmpty: "Email is required",
    isEmail: "Email must be a valid email address",
  },
  password: {
    notEmpty: "Password is required",
    isLength: {
      options: { min: 8, max: 100 },
      errorMessage: "Password must be at least 8 characters long",
    },
  },
};

const refreshTokenSchema = {
  refreshToken: {
    notEmpty: "Refresh token is required",
    isJWT: "Refresh token must be a valid JWT token",
  },
};

const forgotPasswordSchema = {
  email: {
    notEmpty: "Email is required",
    isEmail: "Email must be a valid email address",
  },
};

const resetPasswordSchema = {
  token: {
    notEmpty: "Reset token is required",
  },
  password: {
    notEmpty: "Password is required",
    isLength: {
      options: { min: 8, max: 100 },
      errorMessage: "Password must be at least 8 characters long",
    },
  },
};

const verifyEmailSchema = {
  token: {
    notEmpty: "Verification token is required",
  },
};

const changePasswordSchema = {
  currentPassword: {
    notEmpty: "Current password is required",
  },
  newPassword: {
    notEmpty: "New password is required",
    isLength: {
      options: { min: 8, max: 100 },
      errorMessage: "New password must be at least 8 characters long",
    },
  },
};

module.exports = {
  login: createValidator(loginSchema),
  register: createValidator(registerSchema),
  refreshToken: createValidator(refreshTokenSchema),
  forgotPassword: createValidator(forgotPasswordSchema),
  resetPassword: createValidator(resetPasswordSchema),
  verifyEmail: createValidator(verifyEmailSchema),
  changePassword: createValidator(changePasswordSchema),
};
