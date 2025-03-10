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
    if (myPost.length === 0) {
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
    const posts = await free.findAll({
      include: [
        {
          model: User, // `User` 모델을 include
          as: "user", // `free` 모델에서 정의한 관계 이름
          attributes: ["name"], // `User`에서 가져올 필드는 'name'
        },
      ],
    });

    // `posts` 객체를 콘솔에 출력하여 확인
    console.log(posts);

    // JSON.stringify로 보기 좋은 형태로 출력
    console.log(JSON.stringify(posts, null, 2));

    if (posts.length === 0) {
      return res.json({ message: "게시글이 없습니다." });
    }

    // res.json({ post: posts });

    // posts 객체에서 'user' 정보와 'name'을 포함하여 응답
    const responseData = posts.map((post) => ({
      id: post.id,
      img: post.img,
      title: post.title,
      detail: post.detail,
      likecnt: post.likecnt,
      userName: post.user.name,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));

    res.json({ post: responseData });
  } catch (e) {
    console.error("DB 조회 오류:", e);

    res.status(500).json({ message: "서버 오류" });
  }
};

// 상세페이지 보기
const postOne = async (req, res) => {
  try {
    const post = await free.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: User, // `User` 모델을 include
          // as: "user", // `free` 모델에서 정의한 관계 이름
          attributes: ["name"], // `User`에서 가져올 필드는 'name'
        },
      ],
    });

    if (!post) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    const responseData = {
      id: post.id,
      img: post.img,
      title: post.title,
      detail: post.detail,
      likecnt: post.likecnt,
      userId: post.userId,
      userName: post.user.name,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };

    res.render("detail", { post: responseData });
  } catch (e) {
    console.error("게시글을 가져오는 데 오류가 발생했습니다:", e);
    res.status(500).send("서버 내부 오류");
  }
};

// 상세페이지에서 게시글 삭제
const deleteData = async (req, res) => {
  try {
    const post = await free.findOne({
      where: { id: req.params.id },
    });

    console.log(post);

    // 게시글 삭제
    await post.destroy();

    res.status(200).json({ message: "게시글이 삭제되었습니다." });
  } catch (err) {
    console.error("게시글 삭제 오류:", err);
    res.status(500).json({ message: "서버 오류" });
  }
};

// 상세페이지에서 수정하기 위해 글 작성 페이지로 이동
const moveUpdate = async (req, res) => {
  try {
    // 수정하려는 게시글의 데이터를 가져옵니다.
    const post = await free.findOne({
      where: { id: req.params.id }, // URL에서 id를 가져와 해당 게시글을 찾음
    });

    console.log(post);

    // 게시글이 없다면 오류 처리
    if (!post) {
      return res.status(404).send("게시글을 찾을 수 없습니다.");
    }
    // 수정할 폼에 표시할 데이터를 전달합니다.
    res.render("update", { post }); // 'writing' 템플릿에 post 데이터를 전달
  } catch (e) {
    console.error("서버 오류:", e);
    res.status(500).send("서버 오류");
  }
  // res.send("준비중...");
};

// 수정한 글 업데이트

module.exports = {
  writeData,
  tokenCheck,
  postData,
  postOne,
  deleteData,
  moveUpdate,
};
