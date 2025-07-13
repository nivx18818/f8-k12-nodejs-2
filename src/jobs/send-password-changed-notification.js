const transporter = require("@/config/mailer");
const emailService = require("@/emails/email-service");
const userService = require("@/services/user.service");

const sendPasswordChangedNotification = async (job) => {
  const { userId } = job.payload;
  const user = await userService.getById(userId);

  const loginUrl = `${process.env.APP_URL}/login`;

  const emailTemplate = await emailService.loadEmail("password-changed", {
    user,
    loginUrl,
  });

  await transporter.sendMail({
    from: process.env.MAIL_SENDER,
    to: user.email,
    subject: `Password Changed Notification for ${user.name}`,
    html: emailTemplate,
  });
};

module.exports = sendPasswordChangedNotification;
