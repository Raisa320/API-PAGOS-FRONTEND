import { BASE_URL } from "./auth.js";

// Post de Servicios
const formAdd = document.getElementById('form_add');
const nombre = document.getElementById('nombre');
const prefijo = document.getElementById('prefijo');
const urlLogo = document.getElementById('urlLogo');
let msg = document.getElementById("msg");
let msg1 = document.getElementById("msg1");
let msg2 = document.getElementById("msg2");

formAdd.addEventListener('submit', (event) => {
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
    await fetch(BASE_URL+"api/v2/services/", {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer "+token.access
          },
        body: JSON.stringify(data)
    }).then((response)=>{
        if (response.ok){
            Swal.fire(
                '¡Creado!',
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