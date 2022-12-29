import { BASE_URL } from "./auth.js";

var token = JSON.parse(localStorage.getItem("authTokens"));

document.addEventListener("DOMContentLoaded", function (event) {
  const formPagos = document.getElementById("form");
  servicesGet();
  formPagos.addEventListener("submit", formValidation);
});

function agregarServicios(serviciosList) {
  const servicios = document.getElementById("servicios");
  serviciosList.forEach((service) => {
    const option = document.createElement("option");
    option.value = service.id;
    option.text = service.name;
    servicios.appendChild(option);
  });
}

let servicesGet = async () => {
  let response = await fetch(BASE_URL + "api/v2/services/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.access,
    },
  });
  let data = await response.json();
  if (response.status === 200) {
    let { results } = data;
    agregarServicios(results);
  } else {
    console.error("Error en la carga de servicios.");
  }
};

let formValidation = (event) => {
  event.preventDefault();
  let msg = document.getElementById("msg");
  let msg1 = document.getElementById("msg1");
  let msg2 = document.getElementById("msg2");
  msg.classList.add("d-none");
  msg1.classList.add("d-none");
  msg2.classList.add("d-none");
  let fecha = document.getElementById("fecha");
  let servicios = document.getElementById("servicios");
  let monto = document.getElementById("monto");

  if (fecha.value === "") {
    msg.classList.remove("d-none");
  }
  if (servicios.value === "-1") {
    msg1.classList.remove("d-none");
  }
  if (monto.value === "") {
    msg2.classList.remove("d-none");
  }
  if (fecha.value !== "" && servicios.value !== "-1" && monto.value !== "") {
    msg.classList.add("d-none");
    msg1.classList.add("d-none");
    msg2.classList.add("d-none");
    let user = JSON.parse(localStorage.getItem("user"));
    let data = {
      user: user.email,
      service: servicios.value,
      monto: monto.value,
      expiration_date: fecha.value,
    };
    agregarPago(data);
  }
};

let agregarPago = async (data) => {
  let response = await fetch(BASE_URL + "api/v2/pagos/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.access,
    },
    body: JSON.stringify(data),
  });
  //let dataResponse = await response.json();
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
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "¡Ocurrió un error!",
    });
  }
};
