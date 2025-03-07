const express = require("express");
const router = express.Router();
const freeController = require("../controllers/freeController");
const path = require("path");
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

router.post("/writing", upload.single("img"), freeController.writeData);

router.post("/posting", freeController.postData);

router.post("/token", freeController.tokenCheck);

module.exports = router;
