function cargarDatos() {
    let user_id = JSON.parse(window.sessionStorage.getItem("user_id"));
    getUsuario(user_id);
    let usuario =  JSON.parse(window.sessionStorage.getItem("usuario"));

    let username = document.getElementById("username");
    let name = document.getElementById("name");
    let surname = document.getElementById("surname");
    let phoneNumber = document.getElementById("phoneNumber");
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    username.innerText = usuario.usuario.username;
    name.innerText = usuario.usuario.name;
    surname.innerText = usuario.usuario.surname;
    phoneNumber.innerText = usuario.usuario.phoneNumber;
    email.innerText = usuario.usuario.email;
    password.innerText = usuario.usuario.password;
}

function actualizarPerfil() {
    'use strict';
    function trataRespuesta() {
        var respuesta;
        if (request.status == 209) {
            respuesta = request.response;
            let string_usuario = JSON.stringify(respuesta);
            let usuario = JSON.parse(string_usuario);
            window.sessionStorage.setItem("usuario", JSON.stringify(usuario));
            location.href = "/frontend/perfil.html"
        } else {
            alert("No se ha encontrado el usuario");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    let user_id = JSON.parse(window.sessionStorage.getItem("user_id"));
    let url = 'http://localhost:8000/api/v1/users/' + user_id;
    request.open('PUT', url, true);
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    let datos = datos_personales_put_usuario();
    request.send(datos);
}

function datos_personales_put_usuario() {
    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let phoneNumber = document.getElementById("phoneNumber").value;

    let datos ={
        "name": name,
        "surname": surname,
        "phoneNumber": phoneNumber
    }

    return JSON.stringify(datos);
}

function redirigir() {
    let isMaestro = JSON.parse(window.sessionStorage.getItem("isMaestro"));

    if(isMaestro){
        location.href = "/frontend/cuestionesMaestro.html";
    } else {
        location.href = "/frontend/cuestionesAprendiz.html";
    }
}

function getUsuario(user_id) {
    'use strict';
    function trataRespuesta() {
        var respuesta;
        if (request.status == 200) {
            respuesta = request.response;
            let string_usuario = JSON.stringify(respuesta);
            let usuario = JSON.parse(string_usuario);
            window.sessionStorage.setItem("usuario", JSON.stringify(usuario));
        } else {
            alert("No se ha encontrado el usuario");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    let url = 'http://localhost:8000/api/v1/users/' + user_id;
    request.open('GET', url, true);
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    request.send();
}

function actualizarPassword() {
    'use strict';
    function trataRespuesta() {
        var respuesta;
        if (request.status == 209) {
            respuesta = request.response;
            let string_usuario = JSON.stringify(respuesta);
            let usuario = JSON.parse(string_usuario);
            window.sessionStorage.setItem("usuario", JSON.stringify(usuario));
            location.href = "/frontend/perfil.html"
        } else {
            alert("No se ha encontrado el usuario");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    let user_id = JSON.parse(window.sessionStorage.getItem("user_id"));
    let url = 'http://localhost:8000/api/v1/users/' + user_id;
    request.open('PUT', url, true);
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    let datos = datos_password_put_usuario();
    request.send(datos);
}

function actualizarUser() {
    'use strict';
    function trataRespuesta() {
        var respuesta;
        if (request.status == 209) {
            respuesta = request.response;
            let string_usuario = JSON.stringify(respuesta);
            let usuario = JSON.parse(string_usuario);
            window.sessionStorage.setItem("usuario", JSON.stringify(usuario));
            location.href = "/frontend/perfil.html"
        } else {
            alert("No se ha encontrado el usuario");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    let user_id = JSON.parse(window.sessionStorage.getItem("user_id"));
    let url = 'http://localhost:8000/api/v1/users/' + user_id;
    request.open('PUT', url, true);
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    let datos = datos_user_put_usuario();
    request.send(datos);
}

function datos_user_put_usuario() {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;

    let datos ={
        "username": username,
        "email": email
    }

    return JSON.stringify(datos);
}

function datos_password_put_usuario() {
    let password = document.getElementById("password").value;

    let datos ={
        "password": password
    }

    return JSON.stringify(datos);
}