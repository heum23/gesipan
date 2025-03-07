// 스크롤 시 헤더 변화
window.addEventListener("scroll", function () {
  const header = document.getElementById("header");
  console.log(header);

  if (window.scrollY > 50) {
    // 50px 이상 스크롤 내리면
    header.classList.add("scroll");
  } else {
    header.classList.remove("scroll");
  }
});
// 메인페이지 모든 게시글 보기
const postAll = () => {
  const postWrap = document.querySelector(".postWrap");

  axios({
    method: "post",
    url: "/free/posting",
  })
    .then((res) => {
      const posts = res.data.post;
      console.log(posts, "------------");

      // 만약 데이터가 없다면 '게시글이 없습니다' 메시지 표시
      if (posts.length === 0) {
        postWrap.innerHTML = "<p>게시글이 없습니다.</p>";
        return;
      }

      postWrap.innerHTML = posts
        .map((post) => {
          const newDate = new Date(post.updatedAt).toISOString().split("T")[0];
          return `<div class="post">
                <div><img class="postImg" src="${
                  post.img || "/public/img/heartFull.png"
                }" alt="image" /></div>
                <div class="postText">
                  <h3>${post.title}</h3>
                  <p>${newDate}</p>
                  <p>${post.detail}</p>
                </div>
              </div>
            `;
        })
        .join(""); // 배열을 문자열로 결합
    })
    .catch((e) => {
      console.error("게시글을 가져오는 데 실패했습니다:", e);
    });
};
postAll();

// 토큰 유무에 따른 헤더 버튼 변경
// 로그인 <--> 로그아웃 / 회원가입 <--> 내정보
const checkLoginStatus = () => {
  let cookies = document.cookie.split(";");
  const tokenCookie = cookies.find((item) => item.trim().startsWith("token="));
  if (!tokenCookie) {
    // main.innerHTML = `로그인 후 이용가능합니다`;
    // alert("로그아웃 되셨습니다");
    return;
  }
  const token = tokenCookie.split("token=")[1];
  if (token) {
    // 토큰이 존재하면 서버에 토큰을 검증 요청
    axios({
      method: "post",
      url: "/user/token",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        // 토큰이 유효한 경우
        loginBtn.textContent = "logout"; // 로그인 -> 로그아웃
        signupBtn.textContent = "mypage"; // 회원가입 -> 마이페이지

        // 로그아웃 처리
        loginBtn.addEventListener("click", () => {
          document.cookie = "token=; max-age=0"; // 쿠키에서 토큰 삭제
          loginBtn.textContent = "login"; // 로그아웃 후 로그인 버튼 텍스트로 변경
          signupBtn.textContent = "signup"; // 회원가입 버튼 텍스트로 변경
          checkLoginStatus(); // 로그인 상태 확인 후 UI 업데이트
        });
      })
      .catch((err) => {
        // 토큰이 유효하지 않거나 에러 발생 시
        console.error("토큰 검증 실패:", err);
        loginBtn.textContent = "login"; // 로그인 버튼
        signupBtn.textContent = "signup"; // 회원가입 버튼
      });
  } else {
    // 토큰이 없으면 비로그인 상태
    loginBtn.textContent = "login"; // 로그인 버튼
    signupBtn.textContent = "signup"; // 회원가입 버튼
    // 로그인 버튼 클릭 시 토큰 저장 후 로그인 상태 확인
    loginBtn.addEventListener("click", () => {
      // 로그인 후 토큰을 쿠키에 저장하는 로직을 추가하세요

      checkLoginStatus(); // 로그인 후 상태 확인
    });
  }
};

// 로그인 버튼 클릭 시 페이지 이동
loginBtn.addEventListener("click", () => {
  if (loginBtn.textContent === "login") {
    // 마이페이지로 이동 (로그아웃 상태에서)
    window.location.href = "/login"; // 예시로 마이페이지로 이동
  } else {
    // 메인페이지로 이동 (로그인 상태에서)
    window.location.reload();
  }
});

// 회원가입 버튼 클릭 시 페이지 이동
signupBtn.addEventListener("click", () => {
  if (signupBtn.textContent === "mypage") {
    // 마이페이지로 이동 (로그인 상태에서)
    window.location.href = "/mine"; // 예시로 마이페이지로 이동
  } else {
    // 회원가입 페이지로 이동 (비로그인 상태에서)
    window.location.href = "/signup"; // 예시로 회원가입 페이지로 이동
  }
});

checkLoginStatus();
