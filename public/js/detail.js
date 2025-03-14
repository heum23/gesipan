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
