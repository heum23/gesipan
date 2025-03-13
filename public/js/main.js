// 메인페이지로 이동 (전체 게시글 보기)
const goHome = () => {
  window.location.href = "/";
};

// 메인페이지 모든 게시글 보기
const sortSelect = document.querySelector("#sort"); // 정렬 가져오기

const postAll = () => {
  const postWrap = document.querySelector(".postWrap");

  // 선택된 값 가져오기
  const type = sortSelect.value;

  axios({
    method: "post",
    url: "/free/posting",
    data: { type },
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

sortSelect.addEventListener("change", postAll);

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
const heartMove = () => {
  let cookies = document.cookie.split(";");
  const tokenCookie = cookies.find((item) => item.includes("token="));
  if (!tokenCookie) {
    alert("로그인 후 이용가능합니다.");
    window.location.href = "/login";
  } else {
    window.location.href = "/myheart";
  }
};
const checkLoginStatus = () => {
  let cookies = document.cookie.split(";");
  const tokenCookie = cookies.find((item) => item.includes("token="));

  if (!tokenCookie) {
    return;
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

const menuIcon = document.getElementById("menuIcon");
const sideMenu = document.getElementById("sideMenu");
const closeBtn = document.getElementById("closeBtn");

// 메뉴 버튼 클릭 시 사이드 메뉴 열기/닫기
menuIcon.addEventListener("click", () => {
  sideMenu.classList.toggle("open"); // 메뉴가 열리고 닫힘
});

// 닫기 버튼 클릭 시 사이드 메뉴 닫기
closeBtn.addEventListener("click", () => {
  sideMenu.classList.remove("open"); // 사이드 메뉴 닫기
});

// 로그인, 회원가입, 좋아요한 글 클릭 시 페이지 이동
const loginMenu = document.getElementById("loginMenu");
const signupMenu = document.getElementById("signupMenu");
const myLikesMenu = document.getElementById("myLikesMenu");

// 로그인 메뉴 클릭 시 로그인 페이지로 이동
loginMenu.addEventListener("click", () => {
  window.location.href = "/login";
});

// 회원가입 메뉴 클릭 시 회원가입 페이지로 이동
signupMenu.addEventListener("click", () => {
  window.location.href = "/signup";
});

// 좋아요한 글 메뉴 클릭 시 좋아요한 글 페이지로 이동
myLikesMenu.addEventListener("click", () => {
  window.location.href = "/myheart"; // 내가 좋아요한 글 페이지
});

const create = () => {
  window.location.href = "/writing";
};

// 검색 기능
const search = () => {
  const query = document.querySelector("#query").value;

  axios({
    method: "post",
    url: "/free/search",
    data: { keyword: query },
  })
    .then((res) => {
      const posts = res.data.result; // 응답 데이터에서 게시글을 받아옵니다.

      const postWrap = document.querySelector(".postWrap");

      if (!posts || posts.length === 0) {
        postWrap.innerHTML = "<div class='notPost'>검색 결과가 없습니다.</div>";
        return;
      }

      postWrap.innerHTML = posts
        .map((post) => {
          const highlightedTitle = highlightText(post.title, query);

          return `
            <div class="post" id="post_${post.id}" onclick="postDetail(${
            post.id
          })">
              <div><img class="postImg" src="${
                post.img || "/public/img/heartFull.png"
              }" alt="image" /></div>
              <div class="postText">
                <div>${post.userName}</div>
                <h3>${highlightedTitle}</h3>
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
        .join("");

      // 검색 결과 글자 수 제한 적용
      const postDetails = document.querySelectorAll(".detail");
      postDetails.forEach((detail) => {
        showText(detail, 200);
      });
    })
    .catch((e) => {
      console.error("검색 중 오류 발생:", e);
      alert("검색하는 동안 오류가 발생했습니다.");
    });
};

// 검색어를 하이라이트하는 함수
const highlightText = (text, keyword) => {
  if (!keyword) return text;

  // 한글과 영어를 포함하여 모든 문자에서 검색어를 찾아 하이라이트합니다.
  const regex = new RegExp(`(${keyword})`, "gi"); // 대소문자 구분 없이 검색어를 찾아냄
  return text.replace(regex, '<span class="highlight">$1</span>'); // 검색어를 <span>으로 감싸서 하이라이트
};

// 엔터 키 눌렀을 때 검색 실행 (input 박스에 대한 이벤트 리스너)
const inputElement = document.querySelector("#query");
inputElement.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    search(); // 엔터 키 눌렀을 때 search 함수 실행
  }
});
