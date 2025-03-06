const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // 환경 변수 로드

const SECRET = process.env.SECRET; // 환경 변수 가져오기

console.log(SECRET); // 테스트 출력

// 회원가입 유저 등록
const postUser = async (req, res) => {
  let { email, password, name, address, age, number, gender } = req.body; // 회원가입 폼 데이터
  const salt = await bcrypt.genSalt(10); // 솔트 생성
  const hashPw = await bcrypt.hash(password, salt); // 비밀번호 암호화
  try {
    // 데이터 저장
    const newUser = await User.create({
      email,
      password: hashPw,
      name,
      address,
      age,
      number,
      gender,
    });
    console.log("성공");
    res.json({
      message: "회원가입 성공!", //성공 시 메시지
    });
  } catch (e) {
    console.error("회원가입 오류:", e); // 실패 시 서버 콘솔
    res.json({ message: "서버 오류 발생" }); // 실패 메시지
  }
};
// id 중복확인
let findEmail = async (req, res) => {
  let { email } = req.body;
  try {
    const emailFind = await User.findOne({
      where: { email },
    });
    if (emailFind) {
      res.json({ data: "중복된 아이디입니다." });
    } else {
      res.json({ message: "사용가능한 아이디입니다." });
    }
  } catch (e) {
    console.log("error", e);
  }
};

//로그인
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const loginId = await User.findOne({
      where: { email },
    });
    if (!loginId) {
      return res.json({ message: "아이디가 존재하지 않습니다." });
    }
    const isMatch = await bcrypt.compare(password, loginId.password);
    if (!isMatch) {
      return res.json({ message: "비밀번호가 올바르지 않습니다." });
    }
    const token = jwt.sign({ id: loginId.email }, SECRET);
    res.cookie("token", token, {
      httpOnly: false, // 클라이언트에서 JavaScript로 쿠키에 접근하지 못하게 설정
      secure: false,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1시간 동안 유효한 쿠키
    });
    return res.json({ token: token });
  } catch (e) {
    console.log(e, "error");
  }
};

//id 찾기
let idFind = async (req, res) => {
  let { number } = req.body; //휴대폰 전화번호
  console.log(req.body);
  try {
    const findId = await User.findOne({
      where: { number }, // number 필드로 검색
      attributes: ["email", "name"], // 검색 조건 중 email만 가져오기
    });
    if (!findId) {
      res.json({ message: "가입된 아이디가 없습니다" });
    } else {
      res.json({ name: findId.name, email: findId.email });
    }
  } catch (e) {
    console.log("서버 오류", e);
    res.json({ message: "서버 오류 발생" });
  }
};

//비밀번호 초기화
const pwFind = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      where: { email }, // 이메일로 찾기
    });

    if (!user) {
      return res.json({ message: "해당 이메일을 찾을 수 없습니다." });
    }

    res.json({ data: "성공", id: user.id });
  } catch (e) {
    console.log(e);
    res.json({ message: "서버 오류" });
  }
};
const updatePw = async (req, res) => {
  try {
    const { id, pw } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPw = await bcrypt.hash(pw, salt);
    await User.update({ password: hashPw }, { where: { id } });

    res.json({ message: "성공" });
  } catch (e) {
    console.log(e, "error");
  }
};

const tokenCheck = async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  const token1 = jwt.verify(token, SECRET);
  const userFind = await User.findOne({
    where: { email: token1.id },
  });
  if (!userFind) {
    res.json({ message: "로그인 X" });
  } else {
    res.json({ message: "로그인 O", user: userFind });
  }
};
module.exports = {
  postUser,
  idFind,
  pwFind,
  findEmail,
  login,
  updatePw,
  tokenCheck,
};
