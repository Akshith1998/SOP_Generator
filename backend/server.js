const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const UserController = require("./User/Routes/User");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const routes = ["/sopDetails"];

app.use((req, res, next) => {
  if (routes.includes(req.url)) {
    next();
  } else {
  }
});

app.use("/sopDetails", UserController);

app.listen(
  process.env.Port || 3001,
  console.log(`server is running at port ${process.env.Port}`)
);
