const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // 환경 변수 로드
const axios = require("axios");
const { where } = require("sequelize");
const SECRET = process.env.SECRET; // 환경 변수 가져오기

// 회원가입 유저 등록
const postUser = async (req, res) => {
  let { email, password, name, address, age, number, gender } = req.body; // 회원가입 폼 데이터
  let hashPw = "";
  let loginType = "";
  if (password) {
    const salt = await bcrypt.genSalt(10); // 솔트 생성
    hashPw = await bcrypt.hash(password, salt); // 비밀번호 암호화
    loginType = "local";
  } else {
    loginType = "naver";
  }
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
      loginType,
    });

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
    if (password) {
      const isMatch = await bcrypt.compare(password, loginId.password);
      if (!isMatch) {
        return res.json({ message: "비밀번호가 올바르지 않습니다." });
      }
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
const updateAdress = (req, res) => {
  try {
    const { id, addressV, detailAddress } = req.body;

    const address = addressV + " " + detailAddress;

    User.update({ address: address }, { where: { id } });

    res.json({ message: "성공" });
  } catch (e) {
    console.log(e);
  }
};
const tokenCheck = async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  console.log(token);
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
const kakaoToken = (req, res) => {
  const { code } = req.body;

  // 카카오 REST API 키 및 리다이렉트 URI
  const clientId = "49deb31dffc0b3dd248d2bdcee1a9984"; // 카카오 REST API 키
  const redirectUri = "http://localhost:3000/kakaocheck"; // 리다이렉트 URI

  // 카카오 액세스 토큰 요청
  axios
    .post("https://kauth.kakao.com/oauth/token", null, {
      params: {
        grant_type: "authorization_code",
        client_id: clientId,
        redirect_uri: redirectUri,
        code: code,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((response) => {
      const accessToken = response.data.access_token;
      axios
        .get("https://kapi.kakao.com/v2/user/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(async (userInfo) => {
          const name = userInfo.data.kakao_account.profile.nickname;
          const email = userInfo.data.kakao_account.email;
          const findId = await User.findOne({
            where: { email: email }, // number 필드로 검색
          });
          if (findId !== null) {
            const token = jwt.sign({ id: email }, SECRET);
            res.cookie("token", token, {
              httpOnly: false, // 클라이언트에서 JavaScript로 쿠키에 접근하지 못하게 설정
              secure: false,
              sameSite: "strict",
              maxAge: 60 * 60 * 1000, // 1시간 동안 유효한 쿠키
            });
            res.json({
              email: email,
            });
          } else {
            res.json({
              message: "등록되지 않은 아이디입니다.",
              email: email,
              name: name,
            });
          }
        })
        .catch((err) => {
          console.error("사용자 정보 요청 실패:", err);
          res.status(500).send("사용자 정보 요청 실패"); // 상태 코드 500과 함께 에러 메시지 반환
        });
    })
    .catch((error) => {
      console.error("엑세스 토큰 요청 실패:", error);
      res.status(500).send("엑세스 토큰 요청 실패"); // 상태 코드 500과 함께 에러 메시지 반환
    });
};

const checkToken = async (req, res) => {
  if (req.body) {
    try {
      const access_token = req.body.accessToken;
      const response = await axios.get(`https://openapi.naver.com/v1/nid/me`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const findId = await User.findOne({
        where: { email: response.data.response.email }, // number 필드로 검색
      });
      if (findId !== null) {
        const token = jwt.sign({ id: response.data.response.email }, SECRET);
        res.cookie("token", token, {
          httpOnly: false, // 클라이언트에서 JavaScript로 쿠키에 접근하지 못하게 설정
          secure: false,
          sameSite: "strict",
          maxAge: 60 * 60 * 1000, // 1시간 동안 유효한 쿠키
        });
        res.json({
          email: response.data.response.email,
          name: response.data.response.name,
          gender: response.data.response.gender,
          number: response.data.response.mobile,
          birthday: response.data.response.birthday,
          birthyear: response.data.response.birthyear,
        });
      } else {
        res.json({
          message: "등록되지 않은 아이디입니다.",
          email: response.data.response.email,
          name: response.data.response.name,
          gender: response.data.response.gender,
          number: response.data.response.mobile,
          birthday: response.data.response.birthday,
          birthyear: response.data.response.birthyear,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
};

const del = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await User.destroy({ where: { id } });
    res.json({ message: "탈퇴성공" });
  } catch (e) {
    console.log(e);
  }
};
const updateMine = async (req, res) => {
  try {
    const { id, name, number } = req.body;
    console.log(id, name, number);
    const result = await User.update(
      { name, number }, // 업데이트할 값
      { where: { id } } // 조건
    );
    res.json({ message: "성공" });
  } catch (e) {
    console.log(e);
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
  checkToken,
  kakaoToken,
  updateAdress,
  del,
  updateMine,
};
