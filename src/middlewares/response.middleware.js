const response = (req, res, next) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    path: "/",
  };

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
    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIRATION, 10) || 3600000,
    });
    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRATION, 10) || 3369600000,
    });
    return res.success(204);
  };

  res.clearCookies = () => {
    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);
    return res.success(204);
  };

  res.error = (status, message, details, err) => {
    if (err && process.env.NODE_ENV === "development") {
      console.error(err);
    }

    const response = {
      success: false,
      message: message ?? err?.toString(),
    };

    if (details) {
      response.details = details;
    }

    return res.status(status ?? 500).json(response);
  };

  next();
};

module.exports = response;
