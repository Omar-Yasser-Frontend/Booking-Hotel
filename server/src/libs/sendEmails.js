const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",

  port: process.env.NODE_ENV === "production" ? 465 : 587,
  secure: process.env.NODE_ENV === "production",
  cc: process.env.CC_GMAIL,
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.GMAIL_SMTP_PASSWORD,
  },
});

module.exports = async function (to, subject, html) {
  return await transporter.sendMail({
    from: process.env.GMAIL_ACCOUNT,
    to,
    subject,
    html,
  });
};
