let main = document.querySelector(".main");
showText = (detail, maxLength) => {
  const originalText = detail.innerText;

  if (originalText.length > maxLength) {
    const showText = originalText.substring(0, maxLength) + "...";
    detail.innerText = showText;
  }
};

const postDetail = (id) => {
  axios({
    method: "get",
    url: `/free/detail/${id}`,
  })
    .then((res) => {
      window.location.href = `/free/detail/${id}`;
    })
    .catch((e) => {
      if (e.response && e.response.status === 404) {
        // 게시글을 찾을 수 없는 경우
        Swal.fire("게시글을 찾을 수 없습니다.", "", "warning");
      } else {
        // 서버 에러나 다른 오류 처리
        console.error("Failed to fetch post details:", e);
        Swal.fire("게시글을 가져오는 데 문제가 발생했습니다.", "", "warning");
      }
    });
};

const myPost = () => {
  myData1();
  document.querySelector(".mypost").classList.add("blue");
  document.querySelector(".myheart").classList.remove("blue");
  document.querySelector(".myinfo").classList.remove("blue");
};

const heartMove = () => {
  myData2();
  document.querySelector(".mypost").classList.remove("blue");
  document.querySelector(".myheart").classList.add("blue");
  document.querySelector(".myinfo").classList.remove("blue");
};

// 내가 좋아한 게시글 토큰 검증
const myData2 = () => {
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
          main.innerHTML = `<div class="text_xl left">내가 좋아한 게시글</div>`;
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
                 res.data.post.img !== null
                   ? res.data.post.img
                   : "/public/img/heartEmpty.png"
               }" alt="${res.data.post.title}"></div>
     		<div class='textDiv'>
                  <div class='name text'>${res.data.post.title}</div>
                  
                  <div class="date text">수정한 날짜 : ${
                    new Date(res.data.post.updatedAt)
                      .toISOString()
                      .split("T")[0]
                  }</div>
                  <div class='detail text'>${res.data.post.detail}</div>
                </div>
              </div>`;

              // 150자까지 글 내용 제한
              const postDetails = document.querySelectorAll(".detail");
              postDetails.forEach((detail) => {
                showText(detail, 150); // 150자로 제한
              });
            });
          });
        } else {
          main.innerHTML = `<div class="notPost">${res.data.message}</div>`;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
};

// 내가 작성한 게시글 토큰 검증
const myData1 = () => {
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
          main.innerHTML = `<div class="text_xl left">내가 작성한 게시글</div>`;
          res.data.post.map((item) => {
            const newDate = new Date(item.updatedAt)
              .toISOString()
              .split("T")[0];
            main.innerHTML += ` <div onclick='postDetail(${
              item.id
            })' class="table">
          <div class='imgDiv'>
	  <img class='img' src="${
      item.img !== null ? item.img : "/public/img/heartEmpty.png"
    }" alt="${res.data.post.title}">
            </div>
             <div class='textDiv'>
            <div class='name text'>${item.title}</div>
           
            <div class="date text">수정한 날짜 :${newDate}</div>
            <div class='detail text'>${item.detail}</div>
	    </div>
	    </div>`;
          });
          const postDetails = document.querySelectorAll(".detail");
          postDetails.forEach((detail) => {
            showText(detail, 150); // 150자 제한
          });
        } else {
          main.innerHTML = `<div class="notPost">${res.data.message}</div>`;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
};

let modal = document.querySelector(".changePw");
let modal2 = document.querySelector(".changeAddress");
let overlay = document.querySelector(".overlay");
const password = document.getElementById("password");
const checkPw = document.getElementById("checkPw");
let userId = "";
let userNumber = "";
let userName = "";
const myData = () => {
  let cookies = document.cookie.split(";");

  const tokenCookie = cookies.find((item) => item.trim().startsWith("token="));
  if (!tokenCookie) {
    main.innerHTML = `<div class="notPost">로그인 후 이용 가능합니다.</div>`;
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
      userNumber = user.number;
      userName = user.name;
      let addressHTML =
        user.address && user.address.trim() !== ""
          ? `<div class='text_add'><div>${user.address} </div><div> <button class='exit-btn edit' onclick="changePw(2)">수정</button> </div></div>`
          : `<div class='text_add'><div></div> <div><button class='exit-btn edit' onclick="changePw(2)">주소 등록</button></div> </div>`;

      if (user.loginType === "local") {
        main.innerHTML += `
        <div class="text_xl left">내 정보</div>
        <div class='container'>
 <div class='infoBox'>
          <div class='text_L'>아이디</div>
          <div class="inputDiv">
            <input type="text" value="${user.email}" class='input_text' readonly>
          </div>
 </div>  
                <div class='infoBox'>
          <div class='text_L'>비밀번호</div>
          <div class='btnDiv2 inputDiv'>
            <button class="exit-btn" onclick="changePw(1)">
              변경하기
            </button>
          </div>
</div>
                <div class='infoBox'>
          <div class='text_L'>전화번호</div>
          <div class="inputDiv">
            <input id="number" type="text" value="${user.number}" class='input_text'>
          </div>
</div>
                <div class='infoBox'>
          <div class='text_L'>이름</div>
          <div class="inputDiv">
            <input id="name" type="text" value="${user.name}" class='input_text'>
          </div>
</div>
                <div class='infoBox'>
          <div class='text_L'>주소</div>
          <div class='text'>${addressHTML}</div>
</div>
                <div class='infoBox'>    
          <div class='text_L'>정보 수정</div>
          <div class="btnDiv2 inputDiv">
            <button class="exit-btn" onclick="update(${user.id})">수정
            </button>
          </div>
                </div>
                <div class='infoBox'>
          <div class='text_L'>회원 탈퇴</div>
          <div class="btnDiv2 inputDiv">
            <button class="exit-btn" onclick="exit(${user.id})">탈퇴하기
            </button>
      </div>
          </div>
        </div>
      `;

        document.querySelector(
          ".btnDiv"
        ).innerHTML = `<button onclick="changeNewPw(${user.id})" class="btn" id="changePwBtn" disabled>
        비밀번호 변경
      </button>`;
      } else if (user.loginType === "naver") {
        main.innerHTML += ` 
        <div class="text_xl left">내 정보</div>
        <div class='container'>
          <div class='infoBox'>
            <div class='text_L'>아이디</div>
            <div class="inputDiv">
              <input  type="text" value="${user.email}" class='input_text' readonly>
            </div>
          </div>
          <div class='infoBox'>
            <div class='text_L'>전화번호</div>
            <div class="inputDiv">
              <input id="number" type="text" value="${user.number}" class='input_text' >
            </div>
          </div>
          <div class='infoBox'>
            <div class='text_L'>이름</div>
            <div class="inputDiv">
              <input id="name" type="text" value="${user.name}" class='input_text' >
            </div>
          </div>
          <div class='infoBox'>
            <div class='text_L'>주소 </div>
            <div class='text'> ${addressHTML}</div> 
          </div>
          <div class='infoBox'>
            <div class='text_L'>정보 수정</div>
            <div class="btnDiv2 inputDiv">
              <button class="exit-btn" onclick="update(${user.id})">
           수정
              </button>
            </div>
          </div>
          <div class='infoBox'>
            <div class='text_L'>회원 탈퇴</div>
            <div class="btnDiv2 inputDiv">
              <button class="exit-btn" onclick="exit(${user.id})">
            탈퇴하기
              </button>
            </div>
          </div>
      `;
      }

      const formatPhoneNumber = (number) => {
        number = number.replace(/\D/g, ""); // 숫자만 남기기
        if (number.length <= 3) {
          return number;
        } else if (number.length <= 7) {
          return `${number.slice(0, 3)}-${number.slice(3)}`;
        } else {
          return `${number.slice(0, 3)}-${number.slice(3, 7)}-${number.slice(
            7,
            11
          )}`;
        }
      };

      document.getElementById("number").addEventListener("input", (event) => {
        event.target.value = formatPhoneNumber(event.target.value);
      });
    });
  }
};
myData();

// 정보 수정
const update = (id) => {
  let number = document.getElementById("number").value;
  let name = document.getElementById("name").value;

  if (number === userNumber || number === "") {
    number = userNumber;
  }
  if (name === userName || name === "") {
    name = userName;
  }
  axios({
    method: "post",
    url: "/user/mine/update",
    data: { id, number, name },
  }).then((res) => {
    // console.log(res);
    window.location.reload();
  });
};
//탈퇴
const exit = (id) => {
  // if (confirm("정말 탈퇴하시겠습니까?")) {
  Swal.fire({
    title: "정말 탈퇴하시겠습니까?",
    text: "탈퇴하면 계정을 복구할 수 없습니다.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "탈퇴하기",
    cancelButtonText: "취소",
  }).then((result) => {
    if (result.isConfirmed) {
      axios({
        method: "delete",
        url: "/user/del",
        data: { id },
      })
        .then((res) => {
          if (res.data.message) {
            document.cookie = "token=; max-age=0; path=/";
            Swal.fire(
              "탈퇴되었습니다.",
              "이용해 주셔서 감사합니다.",
              "success"
            ).then(() => {
              window.location.href = "/";
            });
          }
        })
        .catch((error) => {
          console.error(error);
          Swal.fire("오류 발생", "잠시 후 다시 시도해주세요.", "error");
        });
    }
  });
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

  // 모달을 닫을 때 input 값을 비우기
  document.getElementById("password").value = "";
  document.getElementById("checkPw").value = "";
  document.querySelector(".text1").innerHTML = ""; // 비밀번호 유효성 검사 메시지 초기화
  document.querySelector(".text2").innerHTML = ""; // 비밀번호 확인 메시지 초기화
};

// ✅ 비밀번호 변경 시 유효성 검사
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
      "최소 8자 이상, 대소문자, 숫자, 특수문자를 포함해야 합니다.";
  } else {
    document.querySelector(".text1").innerHTML = "";
  }

  if (checkValue !== "" && pwValue !== checkValue) {
    document.querySelector(".text2").innerHTML =
      "비밀번호가 일치하지 않습니다.";
  } else {
    document.querySelector(".text2").innerHTML = "";
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
    Swal.fire("비밀번호 변경 완료", "", "success").then(() => {
      window.location.reload();
    });
  });
};

const updateAddress = () => {
  const address = document.querySelector("#address").value; // 주소
  const detailAddress = document.querySelector("#detailAddress").value; // 상세주소
  const data = {
    addressV: address,
    detailAddress: detailAddress,
  };

  axios({
    method: "post",
    url: "/user/updateAdress",
    data: { id: userId, addressV: address, detailAddress: detailAddress },
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

// 마이페이지
const showMine = () => {
  main.innerHTML = "";
  myData();
  document.querySelector(".mypost").classList.remove("blue");
  document.querySelector(".myheart").classList.remove("blue");
  document.querySelector(".myinfo").classList.add("blue");
};
