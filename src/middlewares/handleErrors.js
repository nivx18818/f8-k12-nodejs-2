const handleErrors = (error, req, res, next) => {
  res.error(500, error.message, error);
};

module.exports = handleErrors;
