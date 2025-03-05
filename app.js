const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");

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

require("./models/index");

// Sequelize 인스턴스 생성
// const sequelize = new Sequelize("gesipan", "root", "wlstnsgma1!", {
//   host: "localhost",
//   dialect: "mysql",
// });

// // 모델 정의
// const UserModel = User(sequelize, DataTypes);

// sequelize
//   .sync({ alter: true }) // 이미 테이블이 존재하면 수정 (테이블이 없으면 새로 생성)
//   .then(() => {
//     console.log("✅ 테이블이 성공적으로 생성/변경되었습니다.");
//   })
//   .catch((err) => {
//     console.error("❌ 테이블 생성/변경 실패:", err);
//   });

app.get("/", (req, res) => {
  res.render("signup");
});

app.listen(port, () => {
  console.log(port, "번 포트에서 대기 중");
});
