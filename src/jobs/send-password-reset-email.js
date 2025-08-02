const emailService = require("@/emails/email-service");
const jwtService = require("@/services/jwt.service");
const userService = require("@/services/user.service");

const sendPasswordResetEmail = async (job) => {
  const { userId } = job.payload;
  const user = await userService.getById(userId);

  const token = jwtService.sign(userId, { expiresIn: 10 * 60 * 1000 }); // 15 minutes expiration
  const resetUrl = `${process.env.APP_ORIGIN}/reset-password?token=${token}`;

  await emailService.sendMail("reset-password", "Password Reset Request", user, { resetUrl });
};

module.exports = sendPasswordResetEmail;
