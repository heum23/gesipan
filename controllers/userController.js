const { where } = require("sequelize");
const { User } = require("../models");
const bcrypt = require("bcrypt");

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
  const { id, pw } = req.body;
  try {
    const loginId = await User.findOne({
      where: { id },
    });
    if (!loginId) {
      return res.json({ message: "아이디가 존재하지 않습니다." });
    }
    if (loginId.password !== pw) {
      return res.json({ message: "비밀번호가 올바르지 않습니다." });
    }
    return res.json({ message: "login 성공" });
  } catch (e) {
    console.log(e, "error");
  }
};

//id 찾기
let idFind = async (req, res) => {
  let { number } = req.body; //휴대폰 전화번호
  try {
    const findId = await User.findOne({
      where: { number }, // number 필드로 검색
      attributes: ["email"], // 검색 조건 중 email만 가져오기
    });
    if (!findId) {
      res.json({ message: "가입된 아이디가 없습니다" });
    } else {
      res.json({ email: findId });
    }
  } catch (e) {
    console.log("서버 오류", e);
    res.json({ message: "서버 오류 발생" });
  }
};

//비밀번호 초기화
const pwFind = async (req, res) => {
  try {
    const { email, pw } = req.body;
    const user = await User.findOne({
      where: { email }, // 이메일로 찾기
    });

    if (!user) {
      return res.json({ message: "해당 이메일을 찾을 수 없습니다." });
    }
    const hashPw = await bcrypt.hash(pw, 10);

    await User.update({ password: hashPw }, { where: { email } });

    res.json({ message: "비밀번호가 성공적으로 업데이트되었습니다." });
  } catch (e) {
    console.log(e);
    res.json({ message: "서버 오류" });
  }
};

module.exports = { postUser, idFind, pwFind, findEmail, login };
