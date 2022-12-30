import { BASE_URL,validarAdmin } from "./auth.js";
validarAdmin('index.html');
let token = JSON.parse(localStorage.getItem("authTokens"));

function agregarServicios(serviciosList) {
  const servicios = document.getElementById("servicio");
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
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token.access
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

servicesGet();

const selectedElement = document.getElementById('servicio');
selectedElement.addEventListener('change', (event) => {
  let id = event.target.value
  servicesGetOne(id);
});

let servicesGetOne = async (id) => {
  let response = await fetch(BASE_URL + "api/v2/services/"+id+'/', {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token.access
    },
  });
  let data = await response.json();

  if (response.status === 200) {
    document.getElementById('nombre_edit').value = data.name;
    document.getElementById('prefijo_edit').value = data.description;
    document.getElementById('urlLogo_edit').value = data.logo;
  } else {
    document.getElementById('nombre_edit').value = '';
    document.getElementById('prefijo_edit').value = '';
    document.getElementById('urlLogo_edit').value = '';
    console.error("Error en traer un servicio.");
  }
};

// Put de Servicios
const formEdit = document.getElementById('form_edit');
const servicio = document.getElementById('servicio');
const nombre = document.getElementById('nombre_edit');
const prefijo = document.getElementById('prefijo_edit');
const urlLogo = document.getElementById('urlLogo_edit');
let msg = document.getElementById("msg3");
let msg1 = document.getElementById("msg4");
let msg2 = document.getElementById("msg5");

formEdit.addEventListener('submit', (event) => {
    event.preventDefault();
    formValidation();
});

let formValidation = () => {

  msg.classList.add("d-none");
  msg1.classList.add("d-none");
  msg2.classList.add("d-none");
  
  if (nombre.value === "") {
    msg.classList.remove("d-none");
  }
  if(prefijo.value === ""){
    msg1.classList.remove("d-none");
  }
  if(urlLogo.value === ""){
    msg2.classList.remove("d-none");
  }

  if (nombre.value !== "" && prefijo.value !== "" && urlLogo.value !== ""){
    msg.classList.add("d-none");
    msg1.classList.add("d-none");
    msg2.classList.add("d-none");
    acceptData();
  }
};

async function acceptData(){
    const data = {
        name: nombre.value,
        description: prefijo.value,
        logo: urlLogo.value,
    }
    let token = JSON.parse(localStorage.getItem("authTokens"));
    console.log(token.access);
    let id = servicio.value
    await fetch(BASE_URL+"api/v2/services/"+id+'/', {
        method: "PUT",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer "+token.access
          },
        body: JSON.stringify(data)
    }).then((response)=>{
        if (response.ok){
            Swal.fire(
                '¡Actualizado!',
                'Los datos se guardaron correctamente',
                'success'
              ).then((result) => {
                if (result.isConfirmed) {
                  window.location.replace("./index.html");
                }
            }) 
        }
        else{
            Swal.fire({
                icon:"error",
                title: 'Oops...',
                text: "¡Ocurrió un error!"
            })           
        }
    })
}