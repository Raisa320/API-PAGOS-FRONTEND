import { validarAuth, updateTokenInterval, logoutUser } from "./auth.js";
updateTokenInterval();
const logoutBtn = document.getElementById("logout");

logoutBtn.addEventListener("click", logoutUser);

window.onload = function () {
    var spinner = document.getElementById('load').style;
    var fadeEffect = setInterval(function () {
       spinner.opacity=0
       spinner.display="none"
       clearInterval(fadeEffect);
    }, 1000);
    validarAuth("login.html");
};
