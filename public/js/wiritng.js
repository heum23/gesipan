let myId = "";

let cookies = document.cookie.split(";");
const tokenCookie = cookies.find((item) => item.trim().startsWith("token="));
const token = tokenCookie.split("token=")[1];

axios({
  method: "post",
  url: "/user/token",
  headers: {
    Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 담아서 전송
  },
}).then((res) => {
  myId = res.data.user.id;
});

// 토스에디터 설정
const editor = new toastui.Editor({
  el: document.querySelector("#detail"), // 에디터를 적용할 요소 (컨테이너)
  height: "300px", // 에디터 영역의 높이 값 (OOOpx || auto)
  initialEditType: "wysiwyg", // 최초로 보여줄 에디터 타입 (markdown || wysiwyg)
  initialValue: "내용을 입력해 주세요.", // 내용의 초기 값으로, 반드시 마크다운 문자열 형태여야 함
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

// 등록 버튼
const createData = () => {
  const fileInput = document.getElementById("imgFile");
  const img = fileInput.files[0];

  const title = document.getElementById("title").value;
  const detail = editor.getMarkdown();
  const userId = myId;

  const category = document.getElementById("category").value;
  const categoryId = Number(category);

  const formData = new FormData();

  formData.append("title", title);
  formData.append("detail", detail);
  formData.append("userId", userId);
  formData.append("categoryId", categoryId);

  if (img) {
    formData.append("img", img);
  }

  // FormData의 내용을 확인하기 위해 forEach 사용
  formData.forEach((value, key) => {
    console.log(key, value);
  });

  axios({
    method: "post",
    url: "/free/writing",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((res) => {
      console.log("ddddddd");
      alert(res.data.message);
      window.location.href = "/";
    })
    .catch((e) => {
      console.error(e);
      alert("error");
    });
};
