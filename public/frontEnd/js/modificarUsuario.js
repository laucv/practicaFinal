function cargarDatos() {
    getUsuarios();
    getUserId();
    let usuario =  JSON.parse(window.sessionStorage.getItem("usuario"));

    let username = document.getElementById("username");
    let name = document.getElementById("name");
    let surname = document.getElementById("surname");
    let phoneNumber = document.getElementById("phoneNumber");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let disponible = document.getElementById("enabled");
    let isMaestro = document.getElementById("isMaestro");
    let isAdmin = document.getElementById("isAdmin");

    username.innerText = usuario.usuario.username;
    name.innerText = usuario.usuario.name;
    surname.innerText = usuario.usuario.surname;
    phoneNumber.innerText = usuario.usuario.phoneNumber;
    email.innerText = usuario.usuario.email;
    password.innerText = usuario.usuario.password;

    console.log(usuario.usuario.enabled);
    if(usuario.usuario.enabled === true){
        disponible.cheked = true;
    } else {
        disponible.cheked = false;
    }

    isMaestro.checked = usuario.usuario.maestro;
    isAdmin.checked = usuario.usuario.admin;
}

function getUserId() {
    'use strict';
    var usuario;
    var url = window.location.href.split("=");
    var idUsuario = parseInt(url[url.length - 1]);
    let datos = JSON.parse(window.sessionStorage.getItem("usuarios"));

    for (usuario of datos.usuarios) {
        if (usuario.usuario.id === idUsuario) {
            window.sessionStorage.setItem("usuario", JSON.stringify(usuario));
            return idUsuario;
        }
    }
    alert("No existe dicho usuario");
    return null;
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
            location.href = "modificarUsuario.html?id=" + user_id;
        } else {
            alert("No se ha encontrado el usuario");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    let user = JSON.parse(window.sessionStorage.getItem("usuario"));
    let user_id = user.usuario.id;
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

function actualizarPassword() {
    'use strict';
    function trataRespuesta() {
        var respuesta;
        if (request.status == 209) {
            respuesta = request.response;
            let string_usuario = JSON.stringify(respuesta);
            let usuario = JSON.parse(string_usuario);
            window.sessionStorage.setItem("usuario", JSON.stringify(usuario));
            location.href = "modificarUsuario.html?id=" + user_id;
        } else {
            alert("No se ha encontrado el usuario");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    let user = JSON.parse(window.sessionStorage.getItem("usuario"));
    let user_id = user.usuario.id;
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
            location.href = "modificarUsuario.html?id=" + user_id;
        } else {
            alert("No se ha encontrado el usuario");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    let user = JSON.parse(window.sessionStorage.getItem("usuario"));
    let user_id = user.usuario.id;
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

function getUsuarios() {
    'use strict';
    function trataRespuesta() {
        var respuesta;
        if (request.status == 200) {
            respuesta = request.response;
            let string_respuesta =JSON.stringify(respuesta);
            window.sessionStorage.setItem("usuarios", string_respuesta);
        } else {
            alert("No se ha podido imprimir a todos los usuarios");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    let user_id = JSON.parse(window.sessionStorage.getItem("user_id"));
    let url = 'http://localhost:8000/api/v1/users';
    request.open('GET', url, true);
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    request.send();
}

function actualizarDisponible() {
    'use strict';
    function trataRespuesta() {
        var respuesta;
        if (request.status == 209) {
            respuesta = request.response;
            let string_usuario = JSON.stringify(respuesta);
            let usuario = JSON.parse(string_usuario);
            window.sessionStorage.setItem("usuario", JSON.stringify(usuario));
            location.href = "modificarUsuario.html?id=" + user_id;
        } else {
            alert("No se ha encontrado el usuario");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    let user = JSON.parse(window.sessionStorage.getItem("usuario"));
    let user_id = user.usuario.id;
    let url = 'http://localhost:8000/api/v1/users/' + user_id;
    request.open('PUT', url, true);
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    let datos = datos_disponible_put_usuario();
    request.send(datos);
}

function datos_disponible_put_usuario() {
    let enabled = document.getElementById("enabled").checked;
    let datos ={
        "enabled": enabled
    }

    return JSON.stringify(datos);
}

function actualizarMaestro() {
    'use strict';
    function trataRespuesta() {
        var respuesta;
        if (request.status == 209) {
            respuesta = request.response;
            let string_usuario = JSON.stringify(respuesta);
            let usuario = JSON.parse(string_usuario);
            window.sessionStorage.setItem("usuario", JSON.stringify(usuario));
            location.href = "modificarUsuario.html?id=" + user_id;
        } else {
            alert("No se ha encontrado el usuario");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    let user = JSON.parse(window.sessionStorage.getItem("usuario"));
    let user_id = user.usuario.id;
    let url = 'http://localhost:8000/api/v1/users/' + user_id;
    request.open('PUT', url, true);
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    let datos = datos_maestro_put_usuario();
    request.send(datos);
}

function datos_maestro_put_usuario() {
    let isMaestro = document.getElementById("isMaestro").checked;

    let datos ={
        "isMaestro": isMaestro
    }

    return JSON.stringify(datos);
}

function actualizarAdministrador() {
    'use strict';
    function trataRespuesta() {
        var respuesta;
        if (request.status == 209) {
            respuesta = request.response;
            let string_usuario = JSON.stringify(respuesta);
            let usuario = JSON.parse(string_usuario);
            window.sessionStorage.setItem("usuario", JSON.stringify(usuario));
            location.href = "modificarUsuario.html?id=" + user_id;
        } else {
            alert("No se ha encontrado el usuario");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    let user = JSON.parse(window.sessionStorage.getItem("usuario"));
    let user_id = user.usuario.id;
    let url = 'http://localhost:8000/api/v1/users/' + user_id;
    request.open('PUT', url, true);
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    let datos = datos_administrador_put_usuario();
    request.send(datos);
}

function datos_administrador_put_usuario() {
    let isAdmin = document.getElementById("isAdmin").checked;

    let datos ={
        "isAdmin": isAdmin
    }

    return JSON.stringify(datos);
}

