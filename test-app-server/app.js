const express = require("express");
const path = require("path");

//Requiring mongoose for DB connection
const mongoose = require("mongoose");

//Requiring middlewares
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const expressValidator = require("express-validator");

const app = express();

//.env file for DB_URL and port
require("dotenv/config");

//Connect to DB
mongoose.connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  },
  () => console.log("Connected to DB!")
);

//Using middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

//Public folder will be used for public uploads
app.use(express.static(path.join(__dirname, "public")));

// app.use(express.static(__dirname, { dotfiles: "allow" }));

const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const videosRoute = require("./routes/videos");

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/videos", videosRoute);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
