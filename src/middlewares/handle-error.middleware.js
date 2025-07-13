const handleError = (error, req, res, next) => {
  res.error(500, error.toString(), error);
};

module.exports = handleError;
