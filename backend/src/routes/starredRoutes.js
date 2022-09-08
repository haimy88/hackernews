const express = require("express");
const router = express.Router();
const { Starred } = require("../data/schemas");
const {
  addArticle,
  deleteArticle,
  getStarredArticles,
  sendStarredArticlesEmail,
} = require("../controllers/starredController");

router.post("/email", sendStarredArticlesEmail);
router.post("/add/:id", addArticle);
router.get("/", getStarredArticles);
router.delete("/:id", deleteArticle);

module.exports = router;
