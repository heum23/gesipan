# TALKTALK

<br>

## 🔗 목차

1. [기술스택](#-기술-스택)
2. [기획의도](#-기획-의도)
3. [기능정의서](#-기능-정의서)
4. [ERD](#-erd)
5. [주요 기능](#-주요-기능들)

   <br>
   <br>

## 🛠 기술 스택

<h4>기술 스택</h4>
 <div style="display: flex; gap: 20px;">
 <img src="https://img.shields.io/badge/html5-E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white" alt="HTML5 Badge" />
 <img src="https://img.shields.io/badge/css3-1572B6.svg?&style=for-the-badge&logo=css3&logoColor=white" alt="CSS Badge" />
 <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
   <img src="https://img.shields.io/badge/mysql-4479A1?&style=for-the-badge&logo=mysql&logoColor=white" />
    <img src="https://img.shields.io/badge/node.js-5FA04E?&style=for-the-badge&logo=nodedotjs&logoColor=white" />
 
 <br/>
 <h4>개발 환경</h4>
 <img src="https://img.shields.io/badge/visual%20studio%20code-%23007ACC.svg?&style=for-the-badge&logo=visual%20studio%20code&logoColor=white" />
 <img src="https://img.shields.io/badge/git-%23F05032.svg?&style=for-the-badge&logo=git&logoColor=white" />
 <img src="https://img.shields.io/badge/github-%23181717.svg?&style=for-the-badge&logo=github&logoColor=white" />
 </div>
 
<h4>API 서비스</h4>

네이버 API
<br>
카카오 API

<br>
<br>

## 📚 기획 의도

<div>이 프로젝트는 Node.js와 MySQL, Sequelize를 사용하여 블로그 형식의 게시글 웹사이트를 개발한 것입니다.
<br>
MVC 패턴을 적용하여, 게시글 작성, 조회, 수정, 삭제 기능을 구현했습니다. Sequelize의 Migration을 활용해 데이터베이스 구조를 관리하며, 효율적이고 확장 가능한 구조를 만들었습니다.</div>

<br>
<br>

 ## 👥 팀원 소개
 *  **박소현** ([rmfnxm23](https://github.com/rmfnxm23))
 *  **진순흠** ([heum23](https://github.com/heum23))
 
 </br>
 </br>
 
## 🗒️ 기능 정의서

[게시글 프로젝트_기능정의서_2025_0316.pdf](https://github.com/user-attachments/files/19323677/_._2025_0316.pdf)

<br>
<br>

## 📐 ERD

![Image](https://github.com/user-attachments/assets/e598d74e-ea66-4868-b740-d98dd958026a)

<br>
<br>

## 💡 주요 기능들

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

### 🖤메인 페이지
 - 데이터베이스에 저장된 모든 게시글 표시
 - 각 게시글의 좋아요 개수 표시
 - top 버튼 클릭 시 상단 이동
 - 페이지네이션 적용 ( 한페이지당 10개의 게시글)
 - 카테고리 클릭시 해당 카테고리 게시글만 필터링
 - 정렬(sort)기능을 추가 해당 순으로 게시글 정렬
<br>

 ![Image](https://github.com/user-attachments/assets/6a8e901b-9280-43d3-a3cc-cb5eec4273d4)

<br>

 - 검색 기능 제공 (제목에 키워드가 포함된 게시글 출력)

 ![Image](https://github.com/user-attachments/assets/41179351-0e49-43dd-9b7a-7843326b52a2)


### 🖤상세 페이지 
 - 데이터 베이스에서 해당 게시글 표시 
 - 게시글의 작성자만 수정 / 삭제 가능
 - 로그인한 사용자만 공감 버튼 사용 가능
<br>
 
![Image](https://github.com/user-attachments/assets/131ff44c-245a-4617-ab83-1e12cbbda075)

<br>
 
 ### 🖤글쓰기 페이지
 - 로그인한 사용자만 글쓰기 허용
<br>
 
![Image](https://github.com/user-attachments/assets/6eb7ebb8-1b24-4ca3-a578-59f3740e63ce)
 
<br>
 
 ### 🖤수정 페이지 ####
 - 해당 페이지의 데이터를 수정
<br>

![Image](https://github.com/user-attachments/assets/9fe19422-7b16-473c-86b0-1ae66de04366)

<br>

 ### 🧡내가 작성한 글
<br>

![Image](https://github.com/user-attachments/assets/542f7c6d-ad04-4261-87aa-8a2347d93c25)

<br>

### 🧡내가 좋아한 글
<br>

![Image](https://github.com/user-attachments/assets/b43281fd-fcf8-4d34-971c-790f517b2292)

<br>
