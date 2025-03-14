// 메인페이지로 이동 (전체 게시글 보기)
const goHome = () => {
  window.location.href = "/";
};

// 좋아요 누른 글 이동
const heartMove = () => {
  window.location.href = "/myheart";
};

// 글쓰기 버튼 클릭 시
const create = () => {
  let cookies = document.cookie.split(";");
  const tokenCookie = cookies.find((item) => item.trim().startsWith("token="));

  if (tokenCookie) {
    const token = tokenCookie.split("token=")[1];
    console.log(token, "token");

    axios({
      method: "post",
      url: "/user/token",
      headers: {
        Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 담아서 전송
      },
    }).then((res) => {
      console.log(res.data.user);
      console.log(res.data.message);

      window.location.href = "/writing";
    });
  } else {
    Swal.fire("로그인이 필요합니다", "", "warning");
    window.location.href = "/login";
  }
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

// 토큰 검증 후 수정 삭제 버튼 활성화/비활성화
let myId = "";
const tokenCheck = () => {
  let cookies = document.cookie.split(";");
  const tokenCookie = cookies.find((item) => item.trim().startsWith("token="));

  if (tokenCookie) {
    const token = tokenCookie.split("token=")[1];

    axios({
      method: "post",
      url: "/user/token",
      headers: {
        Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 담아서 전송
      },
    })
      .then((res) => {
        myId = res.data.user.id;

        // 현재 게시글의 userId를 HTML에서 가져오기
        const postElement = document.querySelector(".mainWrap");
        const postUserId = postElement.getAttribute("data-user-id");

        // myId와 postUserId를 비교하여 삭제 버튼을 보이게 함
        if (myId === Number(postUserId)) {
          document.getElementById("editBtn").style.display = "block"; // 수정 버튼 보이기
          document.getElementById("deleteBtn").style.display = "block"; // 삭제 버튼 보이기
        }
      })
      .catch((err) => {
        console.error("토큰 확인 오류:", err);
      });
  }
};
tokenCheck();

// 삭제 버튼
const deletePost = (id) => {
  if (confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
    axios({
      method: "delete",
      url: `/free/delete/${id}`,
    })
      .then((res) => {
        Swal.fire(res.data.message, "", "warning");
        window.location.href = "/";
      })
      .catch((e) => {
        console.error(e);
      });
  }
};

// 수정페이지 이동
const editPost = (id) => {
  window.location.href = `/free/updatePage/${id}`;
};

const heart = () => {
  const img = document.querySelector(".heartimg");
  const postId = img.getAttribute("data-id"); // post.id 가져오기
  axios({
    method: "get",
    url: "/like/heart",
    params: { postId: Number(postId), userId: userId },
  }).then((res) => {
    if (res.data.message === "X") {
      document.querySelector(".heartimg").src = "/public/img/heartEmpty.png";
    } else {
      document.querySelector(".heartimg").src = "/public/img/heartFull.png";
    }
  });
};
let userId = "";
const myData = () => {
  let cookies = document.cookie.split(";");

  const tokenCookie = cookies.find((item) => item.trim().startsWith("token="));
  if (!tokenCookie) {
    return;
  }

  if (tokenCookie) {
    const token = tokenCookie.split("token=")[1];

    axios({
      method: "post",
      url: "/user/token",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      let user = res.data.user;
      userId = user.id;
      heart();
    });
  }
};
myData();
const clickHeart = (id) => {
  let cookies = document.cookie.split(";");

  const tokenCookie = cookies.find((item) => item.trim().startsWith("token="));
  if (!tokenCookie) {
    Swal.fire("로그인 후 가능합니다.", "", "warning");
    return;
  }
  axios({
    method: "post",
    url: "/like/postHeart",
    data: { postId: id, userId: userId },
  }).then((res) => {
    console.log(res);
    heart();
  });
};
