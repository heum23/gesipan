const { users } = require("../models");

// 회원가입 유저 등록
const postUser = async (req, res) => {
  let { email, pw, name, address, age, number, gender } = req.body; // 회원가입 폼 데이터
  const salt = 10; // 솔트 생성
  const hashPw = await bcrypt.hash(pw, salt); // 비밀번호 암호화
  try {
    // 데이터 저장
    const newUser = await users.create({
      email,
      password: hashPw,
      name,
      address,
      age,
      number,
      gender,
    });
    res.status(200).json({
      message: "회원가입 성공!", //성공 시 메시지
      user: { id: newUser.id, email: newUser.email }, // 성공 시 데이터 넘김
    });
  } catch (e) {
    console.error("회원가입 오류:", e); // 실패 시 서버 콘솔
    res.status(500).json({ message: "서버 오류 발생" }); // 실패 메시지
  }
};

//id 찾기
let idFind = async (req, res) => {
  let { number } = req.body; //휴대폰 전화번호
  try {
    const findId = await users.findOne({
      where: { number }, // number 필드로 검색
      attributes: ["email"], // 검색 조건 중 email만 가져오기
    });
    if (!findId) {
      res.status(200).json({ message: "가입된 아이디가 없습니다" });
    } else {
      res.status(200).json({ email: findId });
    }
  } catch (e) {
    console.log("서버 오류", e);
    res.status(500).json({ message: "서버 오류 발생" });
  }
};

//비밀번호 초기화
const pwFind = async (req, res) => {
  try {
    const { email, pw } = req.body;
    const user = await users.findOne({
      where: { email }, // 이메일로 찾기
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "해당 이메일을 찾을 수 없습니다." });
    }
    const hashPw = await bcrypt.hash(pw, 10);

    await users.update({ password: hashPw }, { where: { email } });

    res
      .status(200)
      .json({ message: "비밀번호가 성공적으로 업데이트되었습니다." });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "서버 오류" });
  }
};

module.exports = { postUser, idFind, pwFind };
