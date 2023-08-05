const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.MAILJETHOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAILJETAPI,
        pass: process.env.MAILJETSECRET,
    },
  });

  const mailOptions = {
    from: "Manik Aggarwal <manik.3216403220@ipu.ac.in>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;