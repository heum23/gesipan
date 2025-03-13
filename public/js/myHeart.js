const main = document.querySelector(".main");

// 글 내용이 너무 길 경우 줄여서 표시하는 함수
const showText = (detail, maxLength) => {
  const originalText = detail.innerText;
  if (originalText.length > maxLength) {
    detail.innerText = originalText.substring(0, maxLength) + "...";
  }
};

// 데이터 로딩 및 표시 함수
const myData = () => {
  let cookies = document.cookie.split(";");
  const tokenCookie = cookies.find((item) => item.trim().startsWith("token="));

  if (tokenCookie) {
    const token = tokenCookie.split("token=")[1];

    axios({
      method: "post",
      url: "/like/token", // token을 사용하여 인증된 데이터 가져오기
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.data.data) {
          res.data.data.map((item) => {
            axios({
              method: "post",
              url: "/like/post", // 각 게시글의 데이터를 가져오기
              data: { id: item.postId },
            }).then((res) => {
              main.innerHTML += `<div class="table" onclick='postDetail(${
                res.data.post.id
              })'>
                <div class='imgDiv'><img class='img' src="${
                  res.data.post.img
                }" alt="${res.data.post.title}"></div>
                <div>
                  <div class='name text'>${res.data.post.title}</div>
                  <div class="date text">수정한 날짜 : ${
                    new Date(res.data.post.updatedAt)
                      .toISOString()
                      .split("T")[0]
                  }</div>
                  <div class='detail text'>${res.data.post.detail}</div>
                </div>
              </div><hr>`;

              // 150자까지 글 내용 제한
              const postDetails = document.querySelectorAll(".detail");
              postDetails.forEach((detail) => {
                showText(detail, 150); // 150자로 제한
              });
            });
          });
        } else {
          main.innerHTML = `${res.data.message}`;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
};

// 게시글 상세보기 함수
const postDetail = (id) => {
  axios({
    method: "get",
    url: `/free/detail/${id}`,
  })
    .then((res) => {
      window.location.href = `/free/detail/${id}`; // 클릭한 게시글의 상세페이지로 이동
    })
    .catch((e) => {
      if (e.response && e.response.status === 404) {
        alert("게시글을 찾을 수 없습니다.");
      } else {
        console.error("게시글을 가져오는 데 문제가 발생했습니다.", e);
        alert("게시글을 가져오는 데 문제가 발생했습니다.");
      }
    });
};

// 데이터 로딩
myData();
