const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const starredRoutes = require("./routes/starredRoutes");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

mongoose.connect(
  process.env.MONGO_URI ||
    "mongodb+srv://haimy88:testing123@cluster0.htuniwl.mongodb.net/starredDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("/images"));

app.use("/", starredRoutes);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
