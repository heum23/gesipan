const findIdPw = document.querySelector(".findIdPw");
const findId = document.querySelector(".findId"); // id찾기 인풋
const showId = document.querySelector(".showId");
const num1 = document.getElementById("phone1");
const num2 = document.getElementById("phone2");
const num3 = document.getElementById("phone3");
const showPw = document.querySelector(".showPw");
const findPw = document.querySelector(".findPw"); //pw찾기 인풋
const pw = document.getElementById("email");
const newPw = document.querySelector(".newPw"); // 새비밀번호 인풋
const changePw = document.querySelector(".changePw");
//교환하는 비밀번호
const updateNewPw = document.getElementById("newPw");
const checkPw = document.getElementById("checkPw");
const change = document.querySelector(".changePage");
const changePage = (type) => {
  showId.innerHTML = "";
  newPw.classList.add("none");
  if (type === "id") {
    findIdPw.innerHTML = "ID 찾기";
    findId.classList.remove("none");
    findPw.classList.add("none");
  } else {
    findIdPw.innerHTML = "PW 찾기";
    findPw.classList.remove("none");
    findId.classList.add("none");
  }
};
window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("id")) {
    changePage("id");
  } else if (urlParams.has("pw")) {
    changePage("pw");
  }
};

const idFind = () => {
  const number = `${num1.value}-${num2.value}-${num3.value}`;
  axios({
    method: "post",
    url: "/user/findId",
    data: { number: number },
  }).then((res) => {
    if (!res.data.email) {
      showId.innerHTML = `<DIV class="text3">${res.data.message}</div>`;
    } else {
      findId.innerHTML = `<div class='text3'> ${res.data.name}님의 ID는</div><div class ='text3'>${res.data.email}입니다.</div>
      <br>
      <button onclick='login()'>로그인 페이지로 이동</button>`;
    }
  });
};

const pwFind = () => {
  const email = pw.value;
  axios({
    method: "post",
    url: "/user/findPw",
    data: { email: email },
  }).then((res) => {
    if (!res.data.data) {
      showPw.innerHTML = `${res.data.message}`;
      newPw.classList.add("none");
    } else {
      newPw.classList.remove("none");
      showPw.innerHTML = ``;
      changePw.innerHTML = `<button disabled class="btn" onclick="changeNewPw(${res.data.id})">비밀번호 변경</button>`;
    }
  });
};
let open1 = false;
let open2 = false;
const updatePw = () => {
  let open1 = false;
  let open2 = false;
  const pwValue = updateNewPw.value;
  const checkValue = checkPw.value;
  const btn = document.querySelector(".btn");

  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'.,<>?/-]).{8,}$/;

  if (pwValue === "") {
    document.querySelector(".text1").innerHTML = "비밀번호를 입력해 주세요.";
    open1 = false;
  } else if (!passRegex.test(pwValue)) {
    document.querySelector(".text1").innerHTML =
      "최소 8자 이상, 대소문자, 숫자, 특수문자를 포함해야 합니다.";
    open1 = false;
  } else {
    document.querySelector(".text1").innerHTML = "";
    open1 = true;
  }
  if (checkValue !== "" && pwValue !== checkValue) {
    document.querySelector(".text").innerHTML = "비밀번호가 일치하지 않습니다.";
    open2 = false;
  } else {
    document.querySelector(".text").innerHTML = "";
    open2 = true;
  }
  if (
    open1 &&
    open2 &&
    pwValue &&
    checkValue &&
    passRegex.test(pwValue) &&
    pwValue === checkValue
  ) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
};
updateNewPw.addEventListener("input", updatePw);
checkPw.addEventListener("input", updatePw);

const changeNewPw = (id) => {
  pwValue = updateNewPw.value;
  axios({
    method: "post",
    url: "/user/updatePw",
    data: { id: id, pw: pwValue },
  }).then((res) => {
    Swal.fire("비밀번호 변경 완료", "", "success").then(() => {
      window.location.href = "/login";
    });
  });
};
const login = () => {
  window.location.href = "/login";
};
function goBack() {
  window.location.href = "/login";
}
