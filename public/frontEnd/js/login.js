function login() {
  'use strict';
    function trataRespuesta () {
        var respuesta;
        if(request.status==200){
            respuesta = request.response;
            let token = respuesta.token;
            window.sessionStorage.setItem("token", token);
            let datos_token = decodeToken(token);
            let stringToken = JSON.stringify(datos_token);
            let jsonToken = JSON.parse(stringToken);
            let isAdmin = jsonToken.isAdmin;
            let isMaestro = jsonToken.isMaestro;
            window.sessionStorage.setItem("isAdmin", isAdmin);
            window.sessionStorage.setItem("isMaestro", isMaestro);
            if(isMaestro){
                location.href = 'http://localhost:8000/frontend/cuestionesMaestro.html';
            } else {
                location.href = 'http://localhost:8000/frontend/cuestionesAprendiz.html';
            }
        }
        else{
            alert("No se ha encontrado el usuario o la contraseña es incorrecta");
        }
    }
  var request = new XMLHttpRequest();
  request.open('POST', 'http://localhost:8000/api/v1/login', true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.responseType = 'json';
  request.onload = trataRespuesta;
  let datos = codifica_query_string();
  request.send(datos);
}
function codifica_query_string() {
    var username = document.getElementById("username").value;
    var pwd = document.getElementById("password").value;
    var username_codif = encodeURIComponent(username);
    var pwd_codif = encodeURIComponent(pwd);

    return "_username=" + username_codif + "&_password=" + pwd_codif;
}

function decodeToken (token) {
    var base64Url = token.split('.')[1];
    var base64 = decodeURIComponent(atob(base64Url).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(base64);
};