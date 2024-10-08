const mongoose = require("mongoose");

const starredSchema = new mongoose.Schema({
  article: Object,
  user_ip: String,
  created: { type: Date, default: Date.now() },
});

const Star = mongoose.model("Star", starredSchema);

module.exports = { Star };
