import { BASE_URL, validarAdmin } from "./auth.js";
validarAdmin("index.html");

var token = JSON.parse(localStorage.getItem("authTokens"));

document.addEventListener("DOMContentLoaded", function (event) {
  const formUsers = document.getElementById("form");
  formUsers.addEventListener("submit", formValidation);
});

let formValidation = (event) => {
  event.preventDefault();
  let msg = document.getElementById("msg");
  let msg1 = document.getElementById("msg1");
  let msg2 = document.getElementById("msg2");
  msg.classList.add("d-none");
  msg1.classList.add("d-none");
  msg2.classList.add("d-none");
  let email = document.getElementById("email");
  let username = document.getElementById("usernameInput");
  let password = document.getElementById("password");
  if (email.value === "") {
    msg.classList.remove("d-none");
  }
  if (username.value === "") {
    msg1.classList.remove("d-none");
  }
  if (password.value === "") {
    msg2.classList.remove("d-none");
  }
  if (email.value !== "" && username.value !== "" && password.value !== "") {
    msg.classList.add("d-none");
    msg1.classList.add("d-none");
    msg2.classList.add("d-none");
    let data = {
      email: email.value,
      username: username.value,
      password: password.value,
    };
    agregarUsuario(data);
  }
};

let agregarUsuario = async (data) => {
  let response = await fetch(BASE_URL + "api/v2/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.access,
    },
    body: JSON.stringify(data),
  });
  let dataResponse = await response.json();
  if (response.status === 201) {
    Swal.fire(
      "¡Creado!",
      "Los datos se guardaron correctamente",
      "success"
    ).then((result) => {
      if (result.isConfirmed) {
        window.location.replace("./index.html");
      }
    });
  } else {
    let errores=[]
    let {non_field_errors}=dataResponse
    let {password}=dataResponse
    if(non_field_errors){
        errores.push(non_field_errors[0])
    }else if(password){
        errores.push("El password debe tener al menos 8 caracteres")
    }else{
        errores.push("Ha sucedido un error en el envio de datos")
    }
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errores[0],
    });
  }
};
