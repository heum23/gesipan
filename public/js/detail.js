// 메인페이지로 이동 (전체 게시글 보기)
const goHome = () => {
  window.location.href = "/";
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
  // let cookies = document.cookie.split(";");
  // const tokenCookie = cookies.find((item) =>
  //   item.trim().startsWith("token=")
  // );
  // // if (!tokenCookie) {
  // //   alert("삭제 권한이 없습니다. 로그인이 필요합니다.");
  // //   window.location.href = "/login";
  // //   return;
  // // }
  // const token = tokenCookie.split("token=")[1];

  // const postUserId = document
  //   .querySelector(`#post_<%= post.id %>`)
  //   .getAttribute("data-user-id");

  // if (myId !== Number(postUserId)) {
  //   alert("삭제 권한이 없습니다.");
  //   return;
  // }

  if (confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
    axios({
      method: "delete",
      url: `/free/delete/${id}`,
    })
      .then((res) => {
        alert(res.data.message);
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
