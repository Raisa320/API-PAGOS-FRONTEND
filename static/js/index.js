import { validarAuth, updateTokenInterval, logoutUser } from "./auth.js";
updateTokenInterval();


window.onload = function () {
    var spinner = document.getElementById('load').style;
    var fadeEffect = setInterval(function () {
        spinner.opacity=0
        spinner.display="none"
        clearInterval(fadeEffect);
    }, 1000);
    validarAuth("login.html");
    
    let user=JSON.parse(localStorage.getItem("user"));
    document.getElementById("username").innerHTML=user.username.toUpperCase();
    if (!user.isAdmin){
        let servicio = document.getElementById('serviceHeader')
        servicio.outerHTML = ''
    }

    const logoutBtn = document.getElementById("logout");
    logoutBtn.addEventListener("click", logoutUser);
};
