const asyncHandler = require("@/utils/async-handler.util");

exports.uploadPost = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.success(200, {
    src: `${process.env.APP_ORIGIN}/uploads/posts/${req.file.filename}`,
  });
});

exports.uploadAvatar = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.success(200, {
    src: `${process.env.APP_ORIGIN}/uploads/avatars/${req.file.filename}`,
  });
});
