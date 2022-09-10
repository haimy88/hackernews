const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "Outlook",
  auth: {
    user: "jmhdevtest@outlook.com",
    pass: "joshisaDEITY123",
  },
});

module.exports = {
  transporter,
};
