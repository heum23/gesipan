let emailDC = false; // 이메일 중복 검사 유효성 변수
// 이메일 중복 검사
const emailCheck = () => {
  const emailInput = document.querySelector("#email");
  const email = emailInput.value;
  const emailMessage = document.querySelector("#emailMessage");
  axios({
    method: "post",
    url: "/user/emailCheck",
    data: { email },
  })
    .then((res) => {
      if (res.data.message) {
        emailMessage.innerHTML = `${res.data.message}`;
        emailDC = true;
        disabledCheck(); // 비활성화 체크
        emailInput.readOnly = true; // 중복되지 않으면 읽기 전용으로 설정
      } else {
        emailMessage.innerHTML = `${res.data.data}`;
        emailDC = false;
        disabledCheck(); // 비활성화 체크
      }
    })
    .catch((e) => e);
};

const signupBtn = document.querySelector("#signupBtn");

// 이메일 실시간 검증
let emailD = false; // 이메일 유효성 변수
const emailInput = document.querySelector("#email");
const emailMessage = document.querySelector("#emailMessage");

emailInput.addEventListener("input", function () {
  const emailValue = emailInput.value;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (emailValue === "") {
    emailMessage.textContent = "이메일을 입력해 주세요.";
    emailD = false;
  } else if (!emailRegex.test(emailValue)) {
    emailMessage.textContent = "유효한 이메일 주소를 입력해 주세요.";
    emailD = false;
  } else {
    emailMessage.textContent === "사용가능한 아이디입니다.";
    emailD = true;
  }
  disabledCheck(); // 비활성화 체크
});

// 비밀번호 실시간 검증

// 이름 실시간 검증
let nameD = false; //이름 유효성 변수
const nameInput = document.querySelector("#name");
const nameMessage = document.querySelector("#nameMessage");
nameInput.addEventListener("input", function () {
  const nameValue = nameInput.value;
  if (nameValue.trim() === "") {
    nameMessage.textContent = "이름을 입력해 주세요.";
    nameD = false;
  } else {
    nameMessage.textContent = "";
    nameD = true;
  }
  disabledCheck(); // 비활성화 체크
});

// 휴대폰 실시간 검증
let phoneD1 = false;
let phoneD2 = false;
let phoneD3 = false;
const phone1 = document.getElementById("phone1");
const phone2 = document.getElementById("phone2");
const phone3 = document.getElementById("phone3");
const phoneMessage = document.getElementById("phoneMessage");

// 각 입력 필드에 이벤트 리스너 추가
phone1.addEventListener("input", function () {
  const phone1Value = phone1.value.trim();
  // phone1은 반드시 0으로 시작해야 한다는 조건 추가
  if (phone1Value === "") {
    phoneMessage.textContent = "첫번째 번호를 입력해 주세요.";
    phoneD1 = false;
    disabledCheck(); // 비활성화 체크
  } else if (!phone1Value.startsWith("0")) {
    phoneMessage.textContent = "휴대폰 번호는 0으로 시작해야 합니다.";
    phoneD1 = false;
    disabledCheck(); // 비활성화 체크
  } else {
    phoneMessage.textContent = "";
    phoneD1 = true;
    disabledCheck(); // 비활성화 체크
  }
  onlyNumbers(event);
});
phone2.addEventListener("input", function () {
  const phone2Value = phone2.value.trim();

  // phone1이 올바르면 phone2 검증
  if (phone2Value === "") {
    phoneMessage.textContent = "두 번째 번호를 입력해 주세요.";
    phoneD2 = false;
    disabledCheck(); // 비활성화 체크
  } else {
    phoneMessage.textContent = "";
    phoneD2 = true;
    disabledCheck(); // 비활성화 체크
  }
  onlyNumbers(event);
});
phone3.addEventListener("input", function () {
  const phone3Value = phone3.value.trim();

  // phone2가 올바르면 phone3 검증
  if (phone3Value === "") {
    phoneMessage.textContent = "세 번째 번호를 입력해 주세요.";
    phoneD3 = false;
    disabledCheck(); // 비활성화 체크
  } else {
    phoneMessage.textContent = "";
    phoneD3 = true;
    disabledCheck(); // 비활성화 체크
  }
  onlyNumbers(event);
});

// 숫자만 입력하도록 설정
function onlyNumbers(event) {
  // 입력된 값이 숫자가 아니면 삭제
  if (/\D/.test(event.target.value)) {
    event.target.value = event.target.value.replace(/\D/g, "");
  }
}

// 폼 유효성 체크 함수
function disabledCheck() {
  // 이메일, 비밀번호, 비밀번호 확인, 이름, 전화번호, 생일이 모두 유효할 때만 버튼 활성화
  if (emailD && nameD && phoneD1 && phoneD2 && phoneD3 && emailDC) {
    signupBtn.disabled = false; // 모든 조건이 충족되면 버튼 활성화
  } else {
    signupBtn.disabled = true; // 하나라도 충족되지 않으면 버튼 비활성화
  }
}

// 회원가입 버튼 클릭 시
const signup = () => {
  const email = document.querySelector("#email").value;
  const name = document.querySelector("#name").value;
  const gender = document.querySelector('input[name="gender"]:checked')?.value; // 성별 라디오 버튼에서 선택된 값
  const year = document.querySelector("#year").value;
  const month = document.querySelector("#month").value;
  const day = document.querySelector("#day").value;
  const phone1 = document.querySelector("#phone1").value;
  const phone2 = document.querySelector("#phone2").value;
  const phone3 = document.querySelector("#phone3").value;

  const data = {
    email: email,
    password: "",
    name: name,
    gender: gender,
    age: `${year}-${month}-${day}`,
    number: `${phone1}-${phone2}-${phone3}`,
    address: "",
    loginType: "local",
  };

  console.log(data, "---");

  // axios로 서버에 데이터 보내기
  axios({
    method: "post",
    url: "/user/signup",
    data: data,
  })
    .then((res) => {
      console.log("회원가입 성공");
      window.location.href = "/login";
    })
    .catch((e) => {
      console.error("회원가입 실패", e);
    });
};

// 생년월일 동적 생성
const yearSelect = document.getElementById("year");
const monthSelect = document.getElementById("month");
const daySelect = document.getElementById("day");

// 연도 생성 (현재 연도부터 과거 100년까지)
const currentYear = new Date().getFullYear();
for (let year = currentYear; year >= currentYear - 100; year--) {
  const option = document.createElement("option");
  option.value = year;
  option.textContent = year;
  yearSelect.appendChild(option);
}

// 월 생성
for (let month = 1; month <= 12; month++) {
  const option = document.createElement("option");
  option.value = month;
  option.textContent = String(month).padStart(2, "0"); // 1을 01로 표시
  monthSelect.appendChild(option);
}

// 일 생성 (기본적으로 31일로 설정)
const updateDays = () => {
  const daySelect = document.getElementById("day");
  const yearSelect = document.getElementById("year");
  const monthSelect = document.getElementById("month");
  console.log(monthSelect.value);
  daySelect.innerHTML = ""; // 기존의 옵션을 삭제

  const selectedYear = parseInt(yearSelect.value);
  const selectedMonth = parseInt(monthSelect.value);

  // 2월은 윤년을 고려
  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();

  // "선택" 옵션 추가
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "DD";
  daySelect.appendChild(defaultOption);

  // 1일부터 daysInMonth일까지 옵션 추가
  for (let day = 1; day <= daysInMonth; day++) {
    const option = document.createElement("option");
    option.value = String(day).padStart(2, "0"); // 두 자릿수로 표시
    option.textContent = String(day).padStart(2, "0");
    daySelect.appendChild(option);
  }
};
// 연도 또는 월이 변경될 때마다 일 수를 업데이트
yearSelect.addEventListener("change", updateDays);
monthSelect.addEventListener("change", updateDays);

// 초기 상태에서 날짜 업데이트
updateDays();

function getAccessToken() {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const token = params.get("access_token");
  axios.post("/user/checktoken", { accessToken: token }).then((res) => {
    if (!res.data.message) {
      window.location.href = "/";
    } else {
      document.querySelector("body").classList.remove("none");
      Swal.fire(res.data.message, "", "warning");
      let emailNaver = document.getElementById("email");
      let nameNaver = document.getElementById("name");
      emailNaver.value = res.data.email;
      nameNaver.value = res.data.name;
      emailNaver.setAttribute("readonly", true);
      nameNaver.setAttribute("readonly", true);
      if (res.data.gender === "F") {
        document.querySelector(
          'input[name="gender"][value="female"]'
        ).checked = true;
      } else if (res.data.gender === "M") {
        document.querySelector(
          'input[name="gender"][value="male"]'
        ).checked = true;
      }
      if (res.data.birthyear) {
        document.getElementById("year").value = res.data.birthyear; // 출생연도 설정
        document.getElementById("year").setAttribute("readonly", true); // 읽기 전용 설정
      }

      if (res.data.birthday) {
        let [month, day] = res.data.birthday.split("-");
        document.getElementById("month").value = String(parseInt(month)); // 월 설정
        updateDays();
        document.getElementById("day").value = String(parseInt(day));
        document.getElementById("month").setAttribute("readonly", true); // 읽기 전용 설정
        document.getElementById("day").setAttribute("readonly", true); // 읽기 전용 설정
      }
      const phoneNumber = res.data.number; // res.data.number 값을 받아야 함
      const [first, second, third] = phoneNumber.split("-");

      document.getElementById("phone1").value = first;
      document.getElementById("phone2").value = second;
      document.getElementById("phone3").value = third;
      (emailD = true),
        (nameD = true),
        (phoneD1 = true),
        (phoneD2 = true),
        (phoneD3 = true);
      document.getElementById("phone1").setAttribute("readonly", true);
      document.getElementById("phone2").setAttribute("readonly", true);
      document.getElementById("phone3").setAttribute("readonly", true);
    }
  });
}

getAccessToken();
