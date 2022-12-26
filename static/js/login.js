import { validarToken,BASE_URL } from "./auth.js";
import validate from "./validations.js";

validarToken("index.html");
const formLogin = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");

let loginUser = async (event) => {
  event.preventDefault();
  let validated = validate([email.value, password.value]);
  if (validated) {
    let response = await fetch(BASE_URL+"api/v2/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      console.log(data);
      let {tokens,data:user}=data
      localStorage.setItem("authTokens", JSON.stringify(tokens));
      localStorage.setItem("user", JSON.stringify(user));
      window.location.replace("./index.html");
      //localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡Correo o contraseña no válidos!",
      });
    }
  }
};

formLogin.addEventListener("submit", loginUser);

// window.location.replace("./index.html");
