const response = (req, res, next) => {
  res.success = (status, data) => {
    if (status === 204) {
      return res.status(status).send();
    }

    return res.status(status ?? 200).json({
      success: true,
      data,
    });
  };

  res.error = (status, message, err) => {
    console.error(err.stack);

    return res.status(status ?? 500).json({
      success: false,
      message,
    });
  };

  res.error404 = (message = "Resource not found") => {
    res.error(404, message);
  };

  next();
};

module.exports = response;
