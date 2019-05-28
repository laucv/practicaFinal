function crearUsuario() {
    'use strict';
    function trataRespuesta() {
        var respuesta;
        if (request.status == 201) {
            alert("Usuario creado");
            location.href = "/frontend/administracion.html"
        } else {
            alert("No se ha podido crear el usuario");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    let user_id = JSON.parse(window.sessionStorage.getItem("user_id"));
    let url = 'http://localhost:8000/api/v1/users';
    request.open('POST', url, true);
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    let datos = datos_post_usuario();
    request.send(datos);
}

function datos_post_usuario() {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let phone = document.getElementById("phoneNumber").value;
    let password = document.getElementById("password").value;
    let enabled = document.getElementById("enabled").checked;
    let isMaestro = document.getElementById("isMaestro").checked;
    let isAdmin = document.getElementById("isAdmin").checked;

    let datos =
    {
        "username": username,
        "name": name,
        "surname": surname,
        "phoneNumber": phone,
        "email": email,
        "password": password,
        "enabled": enabled,
        "isMaestro": isMaestro,
        "isAdmin": isAdmin
    }

    return JSON.stringify(datos);
}

function imprimirUsuarios() {
    getUsuarios();
    let usuarios = JSON.parse(window.sessionStorage.getItem("usuarios"));
    let usuario;
    var lista = document.getElementById("zonaUsuario");

    for (usuario of usuarios.usuarios){

        var elementoLista = document.createElement("li");
        elementoLista.setAttribute("id", "usuario-" + usuario.usuario.id);
        lista.appendChild(elementoLista);

        var div = document.createElement("div");
        div.setAttribute("class", "botones");
        elementoLista.appendChild(div);

        var abrir = document.createElement("a");
        abrir.setAttribute("href", "modificarUsuario.html?id=" +usuario.usuario.id);
        abrir.setAttribute("class", "btn btn-info");
        abrir.setAttribute("role", "button");
        abrir.innerHTML = "Modificar usuario";
        div.appendChild(abrir);

        var eliminar = document.createElement("button");
        eliminar.setAttribute("class", "btn btn-danger");
        eliminar.setAttribute("type", "button");
        eliminar.setAttribute("onclick", "deleteUsuario(" + usuario.usuario.id + ");");
        eliminar.innerHTML = "Eliminar usuario";
        div.appendChild(eliminar);

        var pregunta = document.createElement("p");
        pregunta.setAttribute("id", "usuario-" + usuario.id);
        elementoLista.appendChild(pregunta);


        var enlace = document.createElement("a");
        enlace.innerHTML = usuario.usuario.username;
        pregunta.appendChild(enlace);
    }

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

function deleteUsuario(user_id) {
    'use strict';
    function trataRespuesta() {
        var respuesta;
        if (request.status == 204) {
            alert("Usuario eliminado");
            location.href = "administracion.html";
        } else {
            alert("No se ha podido eliminar al usuario");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    let url = 'http://localhost:8000/api/v1/users/' + user_id;
    request.open('DELETE', url, true);
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    request.send();
}