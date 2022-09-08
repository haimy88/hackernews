const { Star } = require("../data/schemas");

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

module.exports = {
  addArticle,
  deleteArticle,
  getStarredArticles,
};
