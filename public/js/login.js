const login = () => {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const message = document.querySelector("#message");

  axios({
    method: "post",
    url: "/user/login",
    data: { email, password },
  }).then((res) => {
    if (res.data.message) {
      message.innerHTML = `${res.data.message}`;
    }
    if (res.data.token) {
      window.location.href = "/";
    }
  });
};
const idFind = (type) => {
  window.location.href = `/find?${type}`;
};
const signup = () => {
  window.location.href = "/signup";
};
//네이버
const naverLogin = new naver.LoginWithNaverId({
  clientId: "r2e3fx9D8K59Ki8e_0U8",
  callbackUrl: "http://localhost:3000/check",
  loginButton: { color: "green", type: 2, height: 40 },
});
naverLogin.init(); // 로그인 설정
//카카오

Kakao.init("d0dd311168368be5e1739ca82f4edf68");

function loginWithKakao() {
  const REST_API_KEY = "d0dd311168368be5e1739ca82f4edf68"; // 카카오 REST API 키
  const REDIRECT_URI = "http://localhost:3000/kakaocheck"; // 리디렉트 URI

  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  window.location.href = kakaoLoginUrl; // 로그인 페이지로 이동
}
