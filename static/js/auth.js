var BASE_URL="http://127.0.0.1:8000/"
var loading=true

function validarAuth(archivoRedirect) {
  let token = localStorage.getItem("authTokens");
  if (!token) {
    window.location.href = archivoRedirect;
  }
}

function validarToken(archivoRedirect) {
  let token = localStorage.getItem("authTokens");
  if (token) {
    window.location.href = archivoRedirect;
  }
}

function updateTokenInterval() {
 
    if (loading) {
      updateToken();
    }
    let fifteenMinutes=1000*60*15 //15 minutos 
    let interval = setInterval(() => {
        updateToken();
      }, fifteenMinutes);
      return () => clearInterval(interval);
}

let updateToken = async () => {
  console.log("UPDATE TOKEN CALLED");
  let authTokens = JSON.parse(localStorage.getItem("authTokens"));

  let response = await fetch(BASE_URL+"api/v1/jwt/refresh/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: authTokens?.refresh }),
  });
  let data = await response.json();
  if (response.status === 200) {
    authTokens.access=data.access
    localStorage.setItem("authTokens", JSON.stringify(authTokens));
  } else {
    logoutUser();
  }
  if (loading) {
    loading=false;
  }
};

let logoutUser = () => {
  localStorage.removeItem("authTokens");
  localStorage.removeItem("user");
  window.location.replace("./login.html");
};

export { validarAuth, validarToken, updateTokenInterval,logoutUser, BASE_URL };
