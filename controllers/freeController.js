const { Op } = require("sequelize");
const { User, free } = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // 환경 변수 로드
const SECRET = process.env.SECRET; // 환경 변수 가져오기

// 글쓰기 등록
const writeData = async (req, res) => {
  let { title, detail, userId, categoryId } = req.body;
  const img = req.file ? `/uploads/${req.file.filename}` : null;

  let likecnt = 0;

  try {
    const upData = await free.create({
      img,
      title,
      detail,
      userId,
      categoryId,
      likecnt,
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
    const orderOptions = [];

    let { type, id, categoryId } = req.body;
    // categoryId가 존재하면 해당 categoryId로 필터링
    console.log(req.body);
    const whereCondition = {};
    if (categoryId) {
      whereCondition.categoryId = categoryId; // categoryId가 있을 경우에만 추가
    }
    if (type === "newest") {
      orderOptions.push(["updatedAt", "DESC"]); // 기본 내림차순
    } else if (type === "oldest") {
      orderOptions.push(["updatedAt", "ASC"]); // 기본 내림차순
    } else if (type === "like-high") {
      orderOptions.push(["likecnt", "DESC"]);
    } else if (type === "like-low") {
      orderOptions.push(["likecnt", "ASC"]);
    } else {
      orderOptions.push(["updatedAt", "DESC"]); // 기본값으로 최신순
    }
    const page = id || 1; // id가 없으면 기본적으로 첫 번째 페이지
    const limit = 10; // 한 페이지에 보여줄 게시글 개수
    const offset = (page - 1) * limit; // id가 1이면 0부터, 2이면 10부터 시작
    const totalPosts = await free.count({
      where: Object.keys(whereCondition).length ? whereCondition : undefined,
    });

    // DB에서 게시글 가져오기
    const posts = await free.findAll({
      where: Object.keys(whereCondition).length ? whereCondition : undefined, // where 조건이 없으면 undefined 처리
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name"],
        },
      ],
      order: orderOptions,
      limit, // 가져올 게시글 개수
      offset, // 시작 위치
    });

    if (posts.length === 0) {
      return res.json({ message: "게시글이 없습니다.", totalPosts });
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

    res.json({ post: responseData, totalPosts });
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
    const newDate = new Date(post.updatedAt)
      .toISOString()
      .replace("T", " ")
      .split(".")[0];

    const responseData = {
      id: post.id,
      img: post.img,
      title: post.title,
      detail: post.detail,
      likecnt: post.likecnt,
      userId: post.userId,
      userName: post.user.name,
      createdAt: post.createdAt,
      updatedAt: newDate,
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
      where: { id: req.params.id },
    });

    // 게시글이 없다면 오류 처리
    if (!post) {
      return res.status(404).send("게시글을 찾을 수 없습니다.");
    }
    // 수정할 폼에 표시할 데이터를 전달합니다.
    res.render("update", { post });
  } catch (e) {
    console.error("서버 오류:", e);
    res.status(500).send("서버 오류");
  }
};

// 수정한 글 업데이트
const updateData = async (req, res) => {
  const { title, detail, userId, categoryId } = req.body;

  let img; // 이미지 변수

  // 파일을 업로드 되었을 경우
  if (req.file) {
    img = `/uploads/${req.file.filename}`;
  } else {
    // 파일을 바꾸지 않을 경우
    img = req.body.img; // 기존 이미지 경로 사용
  }

  try {
    const post = await free.update(
      { img, title, detail, userId, categoryId },
      {
        where: { id: req.params.id },
      }
    );

    res.json({ message: "수정 완료되었습니다" });
  } catch (e) {
    console.log(e, "error error error");
    res.json({ message: "수정에 문제가 생겼습니다" });
  }
};

// 키워드(단어) 검색
const searchKeyword = async (req, res) => {
  const { keyword } = req.body;

  try {
    // 'title'과 'detail'에 keyword가 포함된 게시글을 찾음
    const posts = await free.findAll({
      where: {
        [Op.or]: [
          // title과 detail 중 하나라도 keyword가 포함된 게시글을 찾음
          { title: { [Op.like]: `%${keyword}%` } },
          // { detail: { [Op.like]: `%${keyword}%` } },
        ],
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name"],
        },
      ],
    });

    if (posts.length === 0) {
      return res.json({ result: [] }); // 검색 결과가 없을 때
    }

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

    res.json({ result: responseData });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "서버에서 오류가 발생했습니다." });
  }
};

module.exports = {
  writeData,
  tokenCheck,
  postData,
  postOne,
  deleteData,
  moveUpdate,
  updateData,
  searchKeyword,
};
