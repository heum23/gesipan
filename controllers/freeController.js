const { name } = require("ejs");
const { User, free } = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // 환경 변수 로드
const SECRET = process.env.SECRET; // 환경 변수 가져오기

// 글쓰기 등록
const writeData = async (req, res) => {
  let { title, detail, userId, likecnt, categoryId } = req.body;
  const img = req.file ? `/uploads/${req.file.filename}` : null;

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

const tokenCheck = async (req, res) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const token1 = jwt.verify(token, SECRET);
    const userFind = await User.findOne({
      where: { email: token1.id },
    }); // 토큰 복호화
    const myPost = await free.findAll({
      where: { userId: userFind.id },
    }); // 작성한 게시글 찾아오기
    if (!myPost) {
      return res.json({ message: "작성한 게시글이 없습니다." });
    } // 작성한 게시글 없을 때
    res.json({ post: myPost, name: userFind.name }); //있을 때
  } catch (e) {
    console.log(e);
  }
};

// 메인페이지 모든 게시글 보기
const postData = async (req, res) => {
  try {
    const posts = await free.findAll({});

    if (posts.length === 0) {
      return res.json({ message: "게시글이 없습니다." });
    }

    res.json({ post: posts });
  } catch (e) {
    console.error("DB 조회 오류:", e);
    res.status(500).json({ message: "서버 오류" });
  }
};

// 상세페이지 보기
const postOne = async (req, res) => {
  // return;
  try {
    const post = await free.findOne({ where: { id: req.params.id } });

    if (!post) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    res.render("detail", { post });
  } catch (err) {
    console.error("게시글을 가져오는 데 오류가 발생했습니다:", err);
    res.status(500).send("서버 내부 오류");
  }
};

module.exports = { writeData, tokenCheck, postData, postOne };
