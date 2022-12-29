import { BASE_URL } from "./auth.js";

let token = JSON.parse(localStorage.getItem("authTokens"));
let servicesGet = async () => {
  let response = await fetch(BASE_URL + "api/v2/services/", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token.access
    },
  });
  console.log(response);
  // let data = await response.json();
  // if (response.status === 200) {
  //   let { results } = data;
  //   agregarServicios(results);
  // } else {
  //   console.error("Error en la carga de servicios.");
  // }
};

servicesGet();



// // Put de Servicios
// const formEdit = document.getElementById('form_edit');
// const servicio = document.getElementById('servicio');
// const nombre = document.getElementById('nombre_edit');
// const prefijo = document.getElementById('prefijo_edit');
// const urlLogo = document.getElementById('urlLogo_edit');
// let msg = document.getElementById("msg");
// let msg1 = document.getElementById("msg1");
// let msg2 = document.getElementById("msg2");

// addEventListener('change', (event) =>{
// });

// formAdd.addEventListener('submit', (event) => {
//     event.preventDefault();
//     formValidation();
// });


// let formValidation = () => {

//   msg.classList.add("d-none");
//   msg1.classList.add("d-none");
//   msg2.classList.add("d-none");
  
//   if (nombre.value === "") {
//     msg.classList.remove("d-none");
//   }
//   if(prefijo.value === ""){
//     msg1.classList.remove("d-none");
//   }
//   if(urlLogo.value === ""){
//     msg2.classList.remove("d-none");
//   }

//   if (nombre.value !== "" && prefijo.value !== "" && urlLogo.value !== ""){
//     msg.classList.add("d-none");
//     msg1.classList.add("d-none");
//     msg2.classList.add("d-none");
//     acceptData();
//   }
// };

// async function acceptData(){
//     const data = {
//         name: nombre.value,
//         description: prefijo.value,
//         logo: urlLogo.value,
//     }
//     let token = JSON.parse(localStorage.getItem("authTokens"));
//     console.log(token.access);
//     await fetch(BASE_URL+"api/v2/services/", {
//         method: "PUT",
//         mode: "cors",
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': "Bearer "+token.access
//           },
//         body: JSON.stringify(data)
//     }).then((response)=>{
//         if (response.ok){
//             Swal.fire(
//                 '¡Actualizado!',
//                 'Los datos se guardaron correctamente',
//                 'success'
//               ).then((result) => {
//                 if (result.isConfirmed) {
//                     returnTodo();
//                 }
//             }) 
//         }
//         else{
//             Swal.fire({
//                 icon:"error",
//                 title: 'Oops...',
//                 text: "¡Ocurrió un error!"
//             })           
//         }
//     })
// }

// async function setData(){
//     try {
//         const response = await fetch(BASE_URL+"api/v2/services/");
//         const data = await response.json();
//         title.value = data.title;
//         body.value = data.body;
//         statusTodo.value = data.status;
//       } catch (error) {
//         console.log(error);
//       }
// }

// function returnTodo(){
//     window.location.replace(`./detail.html?id=${id}`);
// }

// setData();