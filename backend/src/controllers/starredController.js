const { Star } = require("../data/schemas");
const { transporter } = require("../config/nodemailer");

const addArticle = async (req, res) => {
  try {
    const newStar = new Star({
      user_ip: req.ip,
      article_id: req.params.id,
    });
    newStar.save();
    res.status(200).send("article saved successfully");
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteArticle = async (req, res) => {
  try {
    let star = await Star.find({ article_id: req.params.id });
    await star[0].remove();
    res.status(200).send("article removed from favorites");
  } catch (err) {
    res.status(400).send(err);
  }
};

const getStarredArticles = async (req, res) => {
  try {
    let articles = await Star.find({ user_ip: req.ip });
    console.log(articles);
    res.status(200).send(articles);
  } catch (err) {
    res.status(400).send(err);
  }
};

const sendStarredArticlesEmail = (req, res) => {
  console.log(req.body);
  let mailOptions = {
    from: "testhaimdev@outlook.com",
    to: `${req.body.email}`,
    subject: "Your Favorite Articles",
    text: `Here are your favorite articles!`,
    // html: { path: `backend/src/views/StarredArticlesEmail.html` },
  };

  try {
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        res.send(err);
      } else {
        console.log("email sent");
      }
    });

    res.status(200);
  } catch (err) {
    res.status(400).send("Error sending email with link");
  }
};

module.exports = {
  addArticle,
  deleteArticle,
  getStarredArticles,
  sendStarredArticlesEmail,
};
