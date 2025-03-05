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
    emailMessage.textContent = "";
    emailD = true;
  }
  disabledCheck(); // 비활성화 체크
});

// 비밀번호 실시간 검증
let passD = false;
const passInput = document.querySelector("#password");
const passMessage = document.querySelector("#passwordMessage");
passInput.addEventListener("input", function () {
  const passValue = passInput.value;
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'.,<>?/-]).{8,}$/;

  if (passValue === "") {
    passMessage.textContent = "비밀번호를 입력해 주세요.";
    passD = false;
  } else if (!passRegex.test(passValue)) {
    passMessage.textContent =
      "비밀번호는 최소 8자 이상, 대소문자, 숫자, 특수문자를 포함해야 합니다.";
    passD = false;
  } else {
    passMessage.textContent = "";
    passD = true;
  }
  disabledCheck(); // 비활성화 체크
});

// 비밀번호 확인 실시간 검증
let passCheckD = false; // 비번 유효성 변수
const passCheck = document.querySelector("#passwordCheck");
const passCheckMessage = document.querySelector("#passCheckMessage");
passCheck.addEventListener("input", function () {
  const passValue = passInput.value;
  const passCheckValue = passCheck.value;

  // 비밀번호 확인 필드가 비어있는 경우
  if (passCheckValue === "") {
    passCheckMessage.textContent = "비밀번호를 한번 더 입력해 주세요.";
    passCheckD = false;
  }
  // 비밀번호 확인 필드가 원래 비밀번호와 일치하지 않는 경우
  else if (passCheckValue !== passValue) {
    passCheckMessage.textContent = "비밀번호가 일치하지 않습니다";
    passCheckD = false;
  }
  // 비밀번호 확인 필드가 원래 비밀번호와 일치하는 경우
  else {
    passCheckMessage.textContent = "";
    passCheckD = true;
  }
  disabledCheck(); // 비활성화 체크
});

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
  if (emailD && passD && passCheckD && nameD && phoneD1 && phoneD2 && phoneD3) {
    signupBtn.disabled = false; // 모든 조건이 충족되면 버튼 활성화
  } else {
    signupBtn.disabled = true; // 하나라도 충족되지 않으면 버튼 비활성화
  }
}

// 회원가입 버튼 클릭 시
const signup = () => {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  // const passwordCheck = document.querySelector("#passwordCheck").value;
  const name = document.querySelector("#name").value;
  const gender = document.querySelector('input[name="gender"]:checked')?.value; // 성별 라디오 버튼에서 선택된 값
  const year = document.querySelector("#year").value;
  const month = document.querySelector("#month").value;
  const day = document.querySelector("#day").value;
  const phone1 = document.querySelector("#phone1").value;
  const phone2 = document.querySelector("#phone2").value;
  const phone3 = document.querySelector("#phone3").value;
  const address = document.querySelector("#address").value; // 주소
  const detailAddress = document.querySelector("#detailAddress").value; // 상세주소

  const data = {
    email: email,
    password: password,
    name: name,
    gender: gender,
    age: `${year}-${month}-${day}`,
    number: `${phone1}-${phone2}-${phone3}`,
    address: address + " " + detailAddress,
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
  option.textContent = month;
  monthSelect.appendChild(option);
}

// 일 생성 (기본적으로 31일로 설정)
const updateDays = () => {
  daySelect.innerHTML = ""; // 기존의 옵션을 삭제
  const selectedYear = parseInt(yearSelect.value);
  const selectedMonth = parseInt(monthSelect.value);

  // 2월은 윤년을 고려
  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();

  // "선택" 옵션 추가
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "선택";
  daySelect.appendChild(defaultOption);

  for (let day = 1; day <= daysInMonth; day++) {
    const option = document.createElement("option");
    option.value = day;
    option.textContent = day;
    daySelect.appendChild(option);
  }
};

// 연도 또는 월이 변경될 때마다 일 수를 업데이트
yearSelect.addEventListener("change", updateDays);
monthSelect.addEventListener("change", updateDays);

// 초기 상태에서 날짜 업데이트
updateDays();

// 주소 api 검색
execDaumPostcode = () => {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = ""; // 주소 변수
      var extraAddr = ""; // 참고항목 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === "R") {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === "R") {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
        // 조합된 참고항목을 해당 필드에 넣는다.
        document.getElementById("extraAddress").value = extraAddr;
      } else {
        document.getElementById("extraAddress").value = "";
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById("postcode").value = data.zonecode;
      document.getElementById("address").value = addr;
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById("detailAddress").focus();
    },
  }).open();
};
