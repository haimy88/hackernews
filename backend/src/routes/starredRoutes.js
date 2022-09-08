const express = require("express");
const router = express.Router();
const { Starred } = require("../data/schemas");
const {
  addArticle,
  deleteArticle,
  getStarredArticles,
} = require("../controllers/starredController");

router.post("/:id", addArticle);
router.get("/", getStarredArticles);
router.delete("/:id", deleteArticle);

module.exports = router;
