const { User, free, like } = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // 환경 변수 로드
const SECRET = process.env.SECRET; // 환경 변수 가져오기

//하트 누른 게시글인지 체크
const heartCheck = async (req, res) => {
  const { postId, userId } = req.query;
  const posts = await like.findAll({
    where: { postId: postId, userId: userId },
  });
  if (posts.length < 1) {
    res.json({ message: "X" });
  } else {
    res.json({ message: "O" });
  }
};
//좋아요 버튼
const postHeart = async (req, res) => {
  const { postId, userId } = req.body;
  const already = await like.findOne({
    where: { userId: userId, postId: postId },
  });
  if (already) {
    await already.destroy();
    await free.increment("likecnt", {
      by: -1, // 1 감소
      where: { id: postId },
    });
    res.json({ message: "이미 좋아요를 누르신 게시물입니다" });
  } else {
    await like.create({
      postId,
      userId,
    });
    await free.increment("likecnt", {
      by: 1, // 1 증가
      where: { id: postId },
    });
    res.json({ data: "dsadsdsa" });
  }
};

const tokenCheck = async (req, res) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const token1 = jwt.verify(token, SECRET);
    const userFind = await User.findOne({
      where: { email: token1.id },
    }); // 토큰 복호화

    const myHeart = await like.findAll({
      where: { userId: userFind.id },
    }); // 작성한 게시글 찾아오기
    if (myHeart.length < 1) {
      return res.json({ message: "좋아한 게시글이 없습니다." });
    } // 작성한 게시글 없을 때
    res.json({ data: myHeart }); //있을 때
  } catch (e) {
    console.log(e);
  }
};

const heartPost = async (req, res) => {
  const postId = req.body.id;

  const post = await free.findOne({
    where: { id: postId },
  });
  console.log(post);
  if (post) {
    res.json({ post: post });
  }
};
module.exports = {
  heartCheck,
  postHeart,
  tokenCheck,
  heartPost,
};
