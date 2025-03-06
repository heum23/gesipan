const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
const userRouter = require("./routers/userRouter");

var corOptions = {
  origin: "http://localhost:3000",
};

app.use(cookieParser());
app.use(cors(corOptions));
app.use(express.json()); // JSON 요청 본문 처리
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/user", userRouter);
require("./models/index");

app.get("/", (req, res) => {
  res.render("main");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/find", (req, res) => {
  res.render("find");
});
app.get("/mine", (req, res) => {
  res.render("mine");
});
app.listen(port, () => {
  console.log(port, "번 포트에서 대기 중");
});
