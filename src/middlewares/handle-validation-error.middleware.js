const { validationResult } = require("express-validator");

const handleValidationError = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const validationErrors = errors.array().map((error) => ({
    field: error.path,
    message: error.msg,
  }));

  res.error(400, "Validation failed", validationErrors);
};

module.exports = handleValidationError;
