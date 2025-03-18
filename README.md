# TALKTALK

<br>

## 🔗 목차

1. [기술스택](#-기술-스택)
2. [기획의도](#-기획-의도)
3. [ERD](#-erd)
4. [주요 기능](#-주요-기능들)

   <br>
   <br>

## 🛠 기술 스택

<br>
<br>

<div style="display: flex; gap: 30px; align-items: center;">
  <img src="https://img.shields.io/badge/html5-E34F26?&style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/css3-1572B6?&style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/javascript-F7DF1E?&style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/mysql-4479A1?&style=for-the-badge&logo=mysql&logoColor=white" />
    <img src="https://img.shields.io/badge/node.js-5FA04E?&style=for-the-badge&logo=nodedotjs&logoColor=white" />
</div>

<br>
<br>

## 📚 기획 의도

<br>
<br>

<div>게시판 기능을 구현해보고자 시작하게 되었습니다</div>

<br>
<br>

## 📐 ERD

<br>
<br>

![Image](https://github.com/user-attachments/assets/e598d74e-ea66-4868-b740-d98dd958026a)

<

<br>

## 💡 주요 기능들

<br>

### 🧡회원가입

- 회원가입 시 아이디 및 정보 유효성 검사 
- 유효성 검사 후 회원가입시 회원 데이터가 DB에 저장

<br>

![Image](https://github.com/user-attachments/assets/5cc19262-b857-49fb-8af8-b51ae2d93afc)

<br>

### 🧡로그인

- 입력받은 값 DB와 비교후 
- 등록된 회원일 시 로그인
- ID나 PW 틀릴 시 무엇이 틀렸는지 알려줌

<br>

![Image](https://github.com/user-attachments/assets/52ae8c08-2a44-417e-a1f4-51d69f636530)

<br>

### 💚소셜 로그인 

- 네이버 로그인 API구현
- 카카오 로그인 API구현

<br>

<div style="display: flex; gap: 30px; align-items: center;">

 ![Image](https://github.com/user-attachments/assets/6d0fff01-0017-466a-b5b9-f3ec29917540)

![Image](https://github.com/user-attachments/assets/e82d7d6b-dc5d-4f00-8879-99c19b1ac8a7)

</div>
<br>

### 💙소셜 회원가입

- 소셜 로그인 시 등록되 회원이 아니면 회원가입 페이지로 이동
- API에서 받아오는 정보 value값으로 삽입

<br>


![Image](https://github.com/user-attachments/assets/03b8409a-a4a4-454d-aeec-ad8653cb32b1)

<br>

### 💙ID 찾기

- 가입 시 입력한 전화번호로 ID찾기 

<br>

![Image](https://github.com/user-attachments/assets/44ae53c4-4eac-4bbd-9538-b13170d31ca9)

<br>

### 💙PW 찾기

-  ID로 본인 인증 후 비밀번호 초기화
-  초기화 시 DB에도 UPDATE

<br>

![Image](https://github.com/user-attachments/assets/aadf9fdf-1101-4c6b-bad8-9e9d69a6348f)

<br>

### 🧡 내 정보창 이동

- 로그아웃 시에는 sign up block
- 로그인 시에만 내정보창으로 이동가능한 배너 block

<br>

![Image](https://github.com/user-attachments/assets/181eb1d6-c488-46fb-a558-b9504a0c22aa)

<br>

### 🧡내 정보 수정 

- 가입 시 입력한 정보 수정 가능
- 수정 시 DB에eh UPDATE

<br>

![Image](https://github.com/user-attachments/assets/233b6af8-b43b-4f7e-acd9-07299022ea08)

<br>

### 🧡내 주소 등록 및 변경

- 카카오 주소 API 사용
- 주소 미 등록 시 등록 버튼 block
- 주소 등록 시 주소를 보여주고 수정 버튼 block

<br>

![Image](https://github.com/user-attachments/assets/233b6af8-b43b-4f7e-acd9-07299022ea08)

<br>
