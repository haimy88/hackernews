const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "Outlook",
  auth: {
    user: "testhaimdev@outlook.com",
    pass: "joshisaDEITY123",
  },
});

module.exports = {
  transporter,
};
