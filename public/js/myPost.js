showText = (detail, maxLength) => {
  const originalText = detail.innerText;

  if (originalText.length > maxLength) {
    const showText = originalText.substring(0, maxLength) + "...";
    detail.innerText = showText;
  }
};
const main = document.querySelector(".main");
const myData = () => {
  let cookies = document.cookie.split(";");
  const tokenCookie = cookies.find((item) => item.trim().startsWith("token="));
  if (tokenCookie) {
    const token = tokenCookie.split("token=")[1];

    axios({
      method: "post",
      url: "/free/token",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.data.post) {
          res.data.post.map((item) => {
            const newDate = new Date(item.updatedAt)
              .toISOString()
              .split("T")[0];
            main.innerHTML += `<div onclick='postDetail(${item.id})' class="table">
            <div class='imgDiv'><img class='img' src="${item.img}"></div>
            <div>
              <div class='name text'> ${res.data.name}</div>
            <div class='title'>${item.title}</div>
            <div class="date text">수정한 날짜 :${newDate}</div>
            <div class='detail text'>${item.detail}</div></div></div><hr>`;
          });
          const postDetails = document.querySelectorAll(".detail");
          postDetails.forEach((detail) => {
            showText(detail, 150); // 200자로 제한
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
myData();

const postDetail = (id) => {
  axios({
    method: "get",
    url: `/free/detail/${id}`,
  })
    .then((res) => {
      // console.log(res.data.post);
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
