const addressMove = () => {
  window.location.href = "/address";
};
const heartMove = () => {
  window.location.href = "/myheart";
};

let main = document.querySelector(".main");
let modal = document.querySelector(".changePw");
let modal2 = document.querySelector(".changeAddress");
let overlay = document.querySelector(".overlay");
const password = document.getElementById("password");
const checkPw = document.getElementById("checkPw");
let userId = "";
const myData = () => {
  let cookies = document.cookie.split(";");

  const tokenCookie = cookies.find((item) => item.trim().startsWith("token="));
  if (!tokenCookie) {
    main.innerHTML = `로그인 후 이용가능합니다`;
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
      let addressHTML =
        user.address && user.address.trim() !== ""
          ? `<div class='text2'><div>주소 : ${user.address} </div><div> <button class='exit-btn edit' onclick="changePw(2)">수정</button> </div></div>`
          : `<div class='text2'><div>주소 :</div> <div><button class='exit-btn edit' onclick="changePw(2)">주소 등록</button></div> </div>`;

      if (user.loginType === "local") {
        main.innerHTML += `
     <div class='container'>
           <div class='text_L'>email(ID)</div>
         <div class="inputDiv">
         <input type="text" value="${user.email}" class='input_text' readonly>
        </div>
         <div class='text_L'>비밀번호</div>
     
         <div class='btnDiv2'> <button class="exit-btn " onclick="changePw(1)">
            변경하기
          </button></div>
        <br>
        <div class='text_L'>전화번호</div>
        <div class="inputDiv">
         <input type="text" value="${user.number}" class='input_text' readonly>
        </div>
        <div class='text_L'>이름</div>
        <div class="inputDiv">
         <input type="text" value="${user.name}" class='input_text' readonly>
        </div>
         <div class='text_L'>주소</div>
         <div class='text'> ${addressHTML}</div> 
         <div class='text_L'>탈퇴하기</div>
          <div class="btnDiv2">
      <button class="exit-btn" onclick="exit(${user.id})">
           탈퇴하기
       </button>
        </div>
        </div>;
      `;

        document.querySelector(
          ".btnDiv"
        ).innerHTML = `<button onclick="changeNewPw(${user.id})" class="btn" id="changePwBtn" disabled>
        비밀번호 변경
      </button>`;
      } else if (user.loginType === "naver") {
        main.innerHTML += `<div class='container'>
           <div class='text_L'>email(ID)</div>
        <div class="inputDiv">
         <input type="text" value="${user.email}" class='input_text' readonly>
        </div>
        <div class='text_L'>전화번호</div>
        <div class="inputDiv">
         <input type="text" value="${user.number}" class='input_text' readonly>
        </div>
        <div class='text_L'>이름</div>
        <div class="inputDiv">
         <input type="text" value="${user.name}" class='input_text' readonly>
        </div>
        <div class='text_L'>주소 </div>
         <div class='text'> ${addressHTML}</div> 
         <div class='text_L'>탈퇴하기</div>
        <div class="btnDiv2">
      <button class="exit-btn" onclick="exit(${user.id})">
           탈퇴하기
       </button>
          </div>

      `;
      }
    });
  }
};
myData();
//탈퇴
const exit = (id) => {
  if (confirm("정말 탈퇴하시겠습니까?")) {
    axios({
      method: "delete",
      url: "/user/del",
      data: { id },
    }).then((res) => {
      if (res.data.message) {
        document.cookie = "token=; max-age=0; path=/";
        window.location.href = "/";
      }
    });
  }
};
// ✅ 모달 열기
const changePw = (id) => {
  if (id === 1) {
    modal.classList.remove("none");
    overlay.classList.remove("none");
  }
  if (id === 2) {
    modal2.classList.remove("none");
    overlay.classList.remove("none");
  }
};

// ✅ 모달 닫기
const closeModal = (id) => {
  if (id === 1) {
    modal.classList.add("none");
    overlay.classList.add("none");
  }
  if (id === 2) {
    modal2.classList.add("none");
    overlay.classList.add("none");
  }
};

const updatePw = () => {
  const pwValue = password.value;
  const checkValue = checkPw.value;
  const btn = document.getElementById("changePwBtn");

  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'.,<>?/-]).{8,}$/;

  if (pwValue === "") {
    document.querySelector(".text1").innerHTML = "비밀번호를 입력해 주세요.";
  } else if (!passRegex.test(pwValue)) {
    document.querySelector(".text1").innerHTML =
      "비밀번호는 최소 8자 이상, 대소문자, 숫자, 특수문자를 포함해야 합니다.";
  } else {
    document.querySelector(".text1").innerHTML = "";
  }

  if (pwValue !== checkValue) {
    document.querySelector(".text").innerHTML = "비밀번호와 똑같이 입력하세요";
  } else {
    document.querySelector(".text").innerHTML = "";
  }

  if (
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

password.addEventListener("input", updatePw);
checkPw.addEventListener("input", updatePw);

const changeNewPw = (id) => {
  const pwValue = password.value;
  axios({
    method: "post",
    url: "/user/updatePw",
    data: { pw: pwValue, id: id },
  }).then((res) => {
    alert("비밀번호 변경 완료");
    window.location.reload();
  });
};

const myPost = () => {
  window.location.href = "/myPost";
};
const updateAddress = () => {
  const address = document.querySelector("#address").value; // 주소
  const detailAddress = document.querySelector("#detailAddress").value; // 상세주소
  const data = {
    address: address + " " + detailAddress,
  };
  axios({
    method: "post",
    url: "/user/updateAdress",
    data: { id: userId, address: address },
  }).then((res) => {
    window.location.reload();
  });
};
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
