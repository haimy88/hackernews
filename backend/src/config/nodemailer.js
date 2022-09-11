const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "Outlook",
  auth: {
    user: "jmhdevtesting@outlook.com",
    pass: "joshisaDEITY123",
  },
});

module.exports = {
  transporter,
};
