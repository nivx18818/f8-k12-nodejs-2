const transporter = require("@/config/mailer");
const emailService = require("@/emails/email-service");
const userService = require("@/services/user.service");

const sendPasswordChangedNotification = async (job) => {
  const user = await userService.getById(job.payload.userId);
  const loginUrl = `${process.env.APP_ORIGIN}/login`;

  await emailService.sendMail(
    "password-changed",
    `Password Changed Notification for ${user.name}`,
    user,
    { loginUrl }
  );
};

module.exports = sendPasswordChangedNotification;
