const postData = document.getElementById("postData").textContent;

// JSON.parse로 데이터를 JavaScript 객체로 변환
const post = JSON.parse(postData);

// 이제 'post' 객체를 JS에서 사용할 수 있습니다.

let myId = post.userId; // 로그인한 사용자의 id(INTEGER)
let cookies = document.cookie.split(";");
const tokenCookie = cookies.find((item) => item.trim().startsWith("token="));

if (!tokenCookie) {
  Swal.fire("로그인 후 이용해주세요.", "", "warning");
  window.location.href = "/login";
} else {
  const token = tokenCookie.split("token=")[1];

  axios({
    method: "post",
    url: "/user/token",
    headers: {
      Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 담아서 전송
    },
  }).then((res) => {
    // myId = res.data.user.id;
    if (res.data.message === "로그인 X") {
      Swal.fire(res.data.message, "", "warning");
    }
  });
}

// 토스에디터 설정
const editor = new toastui.Editor({
  el: document.querySelector("#detail"), // 에디터를 적용할 요소 (컨테이너)
  height: "300px", // 에디터 영역의 높이 값 (OOOpx || auto)
  initialEditType: "wysiwyg", // 최초로 보여줄 에디터 타입 (markdown || wysiwyg)
  initialValue: post.detail.replace(/<\/?[^>]+(>|$)/g, ""), // HTML 태그를 제거
  previewStyle: "vertical", // 마크다운 프리뷰 스타일 (tab || vertical)
});

// 이미지 미리보기
const inputPrevImg = () => {
  document.getElementById("imgFile").click();
};

// 파일을 선택했을 때 미리보기 이미지를 업데이트
const fileInput = (event) => {
  const file = event.target.files[0]; // 선택된 파일
  const prevImg = document.getElementById("prevImg");
  const placeholder = document.getElementById("placeholder");

  if (file) {
    // 사용자가 파일을 선택한 경우에만 실행됨
    const reader = new FileReader();
    reader.onload = function (e) {
      prevImg.src = e.target.result;
      prevImg.style.display = "block";
      placeholder.style.display = "none";
    };
    // 파일을 데이터 URL 형식으로 읽음 (이미지 파일을 base64 인코딩 형태로 변환)
    reader.readAsDataURL(file);
  }
};

const updateData = (id) => {
  const fileInput = document.getElementById("imgFile");
  const img = fileInput.files[0];
  const title = document.getElementById("title").value;
  const detail = editor.getMarkdown();
  const userId = myId;
  const category = document.getElementById("category").value;
  // const category = `<%= post.categoryId %>`;
  let originalImg = "";
  const categoryId = Number(category);
  if (post.img === null) {
    originalImg = "";
  } else {
    originalImg = post.img;
  }
  console.log(originalImg);
  const formData = new FormData();

  if (img) {
    formData.append("img", img);
  } else {
    formData.append("img", originalImg);
  }

  formData.append("title", title);
  formData.append("detail", detail);
  formData.append("userId", userId);
  formData.append("categoryId", categoryId);

  axios({
    method: "put",
    url: `/free/update/${id}`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data", // 파일 전송을 위한 설정
    },
  })
    .then((res) => {
      if (!res.data.success) {
        // 백엔드에서 성공이 아니면 SweetAlert 띄우기
        Swal.fire(res.data.message, "", "warning");
        return;
      }

      // 업데이트 성공
      Swal.fire(res.data.message, "", "success").then(() => {
        // 사용자가 확인을 누르면 페이지 이동
        window.location.href = `/free/detail/${id}`;
      });
    })
    .catch((e) => {
      console.log(e, "e");
      Swal.fire(res.data.message, "", "warning");
    });
};
