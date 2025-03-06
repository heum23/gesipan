const { free } = require("../models");

require("dotenv").config(); // 환경 변수 로드

// 글쓰기 등록
const writeData = async (req, res) => {
  let { title, detail, userId, likecnt, categoryId } = req.body;
  console.log(req.body, "qweqweqwe");
  const img = req.file ? `/uploads/${req.file.filename}` : null;

  // 필수 항목 체크: 빈 값이면 반환
  if (!title || !detail) {
    return;
  }
  if (!likecnt) {
    likecnt = 0;
  }
  try {
    const upData = await free.create({
      img,
      title,
      detail,
      userId,
      likecnt,
      categoryId,
    });

    res.json({
      message: "글쓰기 등록이 완료되었습니다.",
    });
  } catch (e) {
    console.log(e, "e");
  }
};

const postAll = async (req, res) => {
  try {
    const allPost = await free.findall();
    res.json({ allPost });
  } catch {
    console.log("erroer");
  }
};

module.exports = { writeData, postAll };
