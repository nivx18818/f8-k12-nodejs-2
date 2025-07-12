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

  res.token = (accessToken, refreshToken) => {
    return res.success(200, {
      tokenType: "Bearer",
      accessToken,
      refreshToken,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    });
  };

  res.error = (status, message, err) => {
    if (err) console.error(err.stack);

    return res.status(status ?? 500).json({
      success: false,
      message: message ?? err?.toString(),
    });
  };

  res.error404 = (message = "Resource not found", err) => {
    res.error(404, message, err);
  };

  next();
};

module.exports = response;
