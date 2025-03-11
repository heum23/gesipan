// 스크롤 시 헤더 변화
window.addEventListener("scroll", function () {
  const header = document.getElementById("header");
  const leftLogo = this.document.querySelector(".leftLogo");
  const centerLogo = this.document.querySelector(".centerLogo");

  if (window.scrollY > 50) {
    // 50px 이상 스크롤 내리면
    header.classList.add("scroll");
    leftLogo.style.opacity = "0";
    centerLogo.style.opacity = "1";
  } else {
    header.classList.remove("scroll");
    leftLogo.style.opacity = "1";
    centerLogo.style.opacity = "0";
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

      // 만약 데이터가 없다면 '게시글이 없습니다' 메시지 표시
      if (!posts) {
        postWrap.innerHTML = `<div class="notPost">게시글이 없습니다.</div>`;
        return;
      }

      postWrap.innerHTML = posts
        .map((post) => {
          // const newDate = new Date(post.updatedAt).toISOString().split("T")[0];
          return `<div class="post" id="post_${post.id}" onclick="postDetail(${
            post.id
          })">
                <div><img class="postImg" src="${
                  post.img || "/public/img/heartFull.png"
                }" alt="image" /></div>
                <div class="postText">
                  <div>${post.userName}</div>
                  <h3>${post.title}</h3>
                  <div>${timeForToday(post.updatedAt)}</div>
                  <div class="detail">${post.detail}</div>
                  <div class="likeCount">
                    <div class="likeImg"><img src="/public/img/heartFull.png" alt="좋아요" /></div>
                    <div>${post.likecnt}</div>
                  </div>
                </div>

              </div>
            `;
        })
        .join(""); // 배열을 문자열로 결합

      // 메인게시글 내용 글자 수 제한
      const postDetails = document.querySelectorAll(".detail");
      postDetails.forEach((detail) => {
        showText(detail, 200); // 200자로 제한
      });
    })
    .catch((e) => {
      console.error("게시글을 가져오는 데 실패했습니다:", e);
    });
};

postAll();

// 수정한 날짜를 나타내는 형식
function timeForToday(value) {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return "방금전";
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 1) {
    return `${betweenTimeDay}일전`;
  }

  return timeValue.toLocaleDateString(); // new Date 형식으로 날짜 표시
}

// 메인게시글 내용 글자 수 제한(...으로 축약)
showText = (detail, maxLength) => {
  const originalText = detail.innerText;

  if (originalText.length > maxLength) {
    const showText = originalText.substring(0, maxLength) + "...";
    detail.innerText = showText;
  }
};

// 카테고리 별 게시글 보기
const categoryType = (categoryId) => {
  const postWrap = document.querySelector(".postWrap");

  axios({
    method: "get",
    url: `/free/category/${categoryId}`,
  })
    .then((res) => {
      const posts = res.data.post;

      // 만약 데이터가 없다면 '게시글이 없습니다' 메시지 표시
      if (!posts) {
        postWrap.innerHTML = `<div class="notPost">게시글이 없습니다.</div>`;
        return;
      }

      postWrap.innerHTML = posts
        .map((post) => {
          const newDate = new Date(post.updatedAt).toISOString().split("T")[0];
          return `<div class="post" id="post_${post.id}" onclick="postDetail(${
            post.id
          })">
              <div class="postImgBox">
                <img class="postImg" src="${
                  post.img || "/public/img/heartFull.png"
                }" alt="image" />
                </div>
              <div class="postText">
                <div>${post.userName}</div>
                <h3>${post.title}</h3>
                <div>${newDate}</div>
                <div class="detail">${post.detail}</div>
              </div>
            </div>
          `;
        })
        .join(""); // 배열을 문자열로 결합

      // 메인게시글 내용 글자 수 제한
      const postDetails = document.querySelectorAll(".detail");
      postDetails.forEach((detail) => {
        showText(detail, 200); // 200자로 제한
      });
    })
    .catch((e) => {
      console.error("카테고리 별 게시글을 가져오지 못했습니다", e);
    });
};

// 토큰 유무에 따른 헤더 버튼 변경
// 로그인 <--> 로그아웃 / 회원가입 <--> 내정보
loginBtn.addEventListener("click", () => {
  if (loginBtn.textContent === "login") {
    // 마이페이지로 이동 (로그아웃 상태에서)
    window.location.href = "/login"; // 로그인 페이지로 이동
  } else {
    // 메인페이지로 이동 (로그인 상태에서)
    window.location.reload();
  }
});

// 회원가입 버튼 클릭 시 페이지 이동
signupBtn.addEventListener("click", () => {
  if (signupBtn.textContent === "mypage") {
    // 마이페이지로 이동 (로그인 상태에서)
    window.location.href = "/mine"; // 마이페이지로 이동
  } else {
    // 회원가입 페이지로 이동 (비로그인 상태에서)
    window.location.href = "/signup"; // 회원가입 페이지로 이동
  }
});
const checkLoginStatus = () => {
  let cookies = document.cookie.split(";");

  const naverCookie = cookies.find((item) => item.includes("naverToken="));
  const tokenCookie = cookies.find((item) => item.includes("token="));

  if (!tokenCookie && !naverCookie) {
    return;
  }

  if (naverCookie) {
    loginBtn.textContent = "logout";
    signupBtn.textContent = "mypage";

    loginBtn.replaceWith(loginBtn.cloneNode(true)); // 이벤트 중복 방지

    loginBtn.addEventListener("click", () => {
      document.cookie = "naverToken=; max-age=0; path=/"; // path 설정 추가
      window.location.reload();
      checkLoginStatus();
    });
  }

  if (tokenCookie) {
    const token = tokenCookie.split("token=")[1];

    axios({
      method: "post",
      url: "/user/token",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        loginBtn.textContent = "logout";
        signupBtn.textContent = "mypage";

        loginBtn.replaceWith(loginBtn.cloneNode(true)); // 이벤트 중복 방지
        loginBtn.addEventListener("click", () => {
          document.cookie = "token=; max-age=0; path=/";
          window.location.reload();
        });
      })
      .catch((err) => {
        console.error("토큰 검증 실패:", err);
        loginBtn.textContent = "login";
        signupBtn.textContent = "signup";
      });
  }
};

checkLoginStatus();

const postDetail = (id) => {
  const post = document.querySelector(".post");

  axios({
    method: "get",
    url: `/free/detail/${id}`,
  })
    .then((res) => {
      window.location.href = `/free/detail/${id}`;
    })
    .catch((e) => {
      if (e.response && e.response.status === 404) {
        // 게시글을 찾을 수 없는 경우
        alert("게시글을 찾을 수 없습니다.");
      } else {
        // 서버 에러나 다른 오류 처리
        console.error("Failed to fetch post details:", e);
        alert("게시글을 가져오는 데 문제가 발생했습니다.");
      }
    });
};
