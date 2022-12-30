import { BASE_URL } from "./auth.js";
let token = JSON.parse(localStorage.getItem("authTokens"));
var user = JSON.parse(localStorage.getItem("user"));

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
        return data;
    } else {
      console.error("Error en traer un servicio.");
    }
  };

let PagosRealizados = async () => {
    let response = await fetch(BASE_URL + "api/v2/pagos/", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token.access
      },
    });
    let data = await response.json();
  
    if (response.status === 200) {
        let {results} = data;
        return results;
    } else {
      console.error("Error en traer un servicio.");
    }
  };

let pagos = await PagosRealizados();

if (pagos.length > 0) {
    let divPagos = document.getElementById('pagosrealizados');

    for (let i = 0; i < pagos.length; i++){
        if (pagos[i].user === user.email){
            let service = await servicesGetOne(pagos[i].service)
            pagos[i].service = service.name;
            pagos[i].logo = service.logo;
            let div = document.createElement('div')
            div.innerHTML = `<div class="card alert-success">
                                <div class="card-body">
                                    <div class="d-flex flex-row justify-content-between align-items-center">
                                        <div class="servicio">
                                            <img src="${ pagos[i].logo}" alt="Service"
                                                class="rounded-circle">
                                            <span class="ms-2">${pagos[i].service}</span>
                                        </div>
                                        <div class="">${pagos[i].fecha_pago}</div>
                                        <div class="">S/. ${pagos[i].monto}</div>
                                    </div>
                                </div>
                            </div>`
            divPagos.appendChild(div);
        }
    }
}

let PagosVencidos = async () => {
    let response = await fetch(BASE_URL + "api/v2/expired-payments/", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token.access
      },
    });
    let data = await response.json();
  
    if (response.status === 200) {
        let {results} = data;
        return results;
    } else {
      console.error("Error en traer un servicio.");
    }
  };


let PagoGetOne = async (id) => {
    let response = await fetch(BASE_URL + "api/v2/pagos/"+id+'/', {
        method: "GET",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token.access
        },
    });
    let data = await response.json();

    if (response.status === 200) {
        return data;
    } else {
        console.error("Error en traer un servicio.");
    }
    };

let pagosVencidos = await PagosVencidos();

if (pagosVencidos.length > 0) {
    let divPagos = document.getElementById('pagosvencidos');

    for (let i = 0; i < pagosVencidos.length; i++){
        let pagosData = await PagoGetOne(pagosVencidos[i].pago);
        pagosData.penalty = pagosVencidos[i].penalty_free_amount;
        if (pagosData.user === user.email){
            let service = await servicesGetOne(pagosData.service)
            pagosData.service = service.name;
            pagosData.logo = service.logo;
            let div = document.createElement('div')
            div.innerHTML = `<div class="card alert-danger">
                                <div class="card-body">
                                    <div class="d-flex flex-row justify-content-between align-items-center">
                                        <div class="servicio">
                                            <img src="${ pagosData.logo}" alt="Service"
                                                class="rounded-circle">
                                            <span class="ms-2">${pagosData.service}</span>
                                        </div>
                                        <div class="">${pagosData.fecha_pago}</div>
                                        <div class="">S/. ${pagosData.monto}</div>
                                        <div class="">S/. ${round(pagosData.penalty,2)}</div>
                                    </div>
                                </div>
                            </div>`

            divPagos.appendChild(div);
        }
    }
}


function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }