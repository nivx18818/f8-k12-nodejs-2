const transporter = require("@/config/mailer");
const emailService = require("@/emails/emailService");
const jwtService = require("@/services/jwt.service");
const userService = require("@/services/user.service");

const sendPasswordResetEmail = async (job) => {
  const { userId } = job.payload;
  const user = await userService.getById(userId);

  const token = jwtService.sign(userId);
  const resetUrl = `${process.env.APP_URL}/reset-password?token=${token}`;

  const emailTemplate = await emailService.loadEmail("reset-password", {
    user,
    resetUrl,
  });

  await transporter.sendMail({
    from: process.env.MAIL_SENDER,
    to: process.env.MAIL_RECEIVER_SAMPLE, // user.email
    subject: "Password Reset Request",
    html: emailTemplate,
  });
};

module.exports = sendPasswordResetEmail;
