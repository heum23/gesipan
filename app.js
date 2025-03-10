const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
const userRouter = require("./routers/userRouter");
const freeRouter = require("./routers/freeRouter");
const multer = require("multer");
// 세부설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // 원본 파일명에서 확장자 추출
    const ext = path.extname(file.originalname); // 파일 확장자
    const originalName = path.parse(file.originalname).name; // 원본 파일 이름 (확장자 제외)

    // 현재 날짜 구하기 (YYYY_MMDD 형식)
    const today = new Date();
    const dateString =
      today.getFullYear() +
      "_" +
      String(today.getMonth() + 1).padStart(2, "0") +
      String(today.getDate()).padStart(2, "0");

    // 새로운 파일 이름 생성 (날짜_원본파일명.확장자)
    const newFilename = `${dateString}_${originalName}${ext}`;

    // 파일 이름 설정
    cb(null, newFilename);
  },
});
// Multer 미들웨어 생성
const upload = multer({ storage });

var corOptions = {
  origin: "http://localhost:3000",
};

app.use(cookieParser());
app.use(cors(corOptions));
app.use(express.json()); // JSON 요청 본문 처리
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
app.use("/uploads", express.static("uploads"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/user", userRouter);
app.use("/free", freeRouter);
require("./models/index");

app.get("/", (req, res) => {
  res.render("main");
});
//로그인 페이지
app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/writing", (req, res) => {
  res.render("writing");
});
//회원가입
app.get("/signup", (req, res) => {
  res.render("signup");
});
//id/pw 찾기
app.get("/find", (req, res) => {
  res.render("find");
});
//내정보란
app.get("/mine", (req, res) => {
  res.render("mine");
});

app.get("/myPost", (req, res) => {
  res.render("mypost");
});
app.get("/check", (req, res) => {
  res.render("check");
});
app.get("/kakaocheck", (req, res) => {
  res.render("kakaocheck");
});

app.listen(port, () => {
  console.log(port, "번 포트에서 대기 중");
});
