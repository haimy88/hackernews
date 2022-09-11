const express = require("express");
const router = express.Router();
const { Starred } = require("../data/schemas");
const { validateEmail } = require("../middleware/validateEmail");
const {
  addArticle,
  deleteArticle,
  getStarredArticles,
  sendStarredArticlesEmail,
} = require("../controllers/starredController");

router.post("/email", validateEmail, sendStarredArticlesEmail);
router.post("/add/:id", addArticle);
router.get("/", getStarredArticles);
router.delete("/:id", deleteArticle);

module.exports = router;
