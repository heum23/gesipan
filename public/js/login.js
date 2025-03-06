const login = () => {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const message = document.querySelector("#message");

  axios({
    method: "post",
    url: "/user/login",
    data: { email, password },
  }).then((res) => {
    if (res.data.message) {
      alert(res.data.message);
    }
    if (res.data.token) {
      window.location.href = "/";
    }
  });
};
const idFind = (type) => {
  window.location.href = `/find?${type}`;
};
const signup = () => {
  window.location.href = "/signup";
};
