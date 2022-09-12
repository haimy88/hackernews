const { Star } = require("../data/schemas");
const { transporter } = require("../config/nodemailer");
const mailerhbs = require("nodemailer-express-handlebars");
const path = require("path");

const addArticle = async (req, res) => {
  try {
    const newStar = new Star({
      user_ip: req.ip,
      article_id: req.params.id,
    });
    newStar.save();
    res.status(200).send("article saved successfully");
  } catch (err) {
    res.status(400).send("request failed");
  }
};

const deleteArticle = async (req, res) => {
  try {
    let star = await Star.find({ article_id: req.params.id });
    await star[0].remove();
    res.status(200).send("article removed from favorites");
  } catch (err) {
    res.status(400).send("request failed");
  }
};

const getStarredArticles = async (req, res) => {
  try {
    let articles = await Star.find({ user_ip: req.ip });
    res.status(200).send(articles);
  } catch (err) {
    res.status(400).send("Unable to retrieve your saved articles");
  }
};

const sendStarredArticlesEmail = (req, res) => {
  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./src/views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./src/views"),
    extName: ".handlebars",
  };
  const mailOptions = {
    from: "jmhdevtesting@outlook.com",
    to: `${req.body.email}`,
    subject: "test subject",
    template: "StarredArticlesEmail",
    context: {
      articles: req.body.articles,
    },
    attachments: [
      {
        filename: "logo.png",
        path: "./src/images/logo.png",
        cid: "logo",
      },
    ],
  };
  try {
    transporter.use("compile", mailerhbs(handlebarOptions));
    transporter.sendMail(mailOptions);
    res.status(200).send("Email Sent");
  } catch (err) {
    res.status(400).send("Error has occurred");
  }
};

module.exports = {
  addArticle,
  deleteArticle,
  getStarredArticles,
  sendStarredArticlesEmail,
};
