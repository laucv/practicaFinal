function imprimirCuestion(cuestion) {
    'use strict';
    var lista = document.getElementById("listaCuestiones");
    var elementoLista = document.createElement("li");
    elementoLista.setAttribute("id", "cuestion-" + cuestion.cuestion.idCuestion);
    lista.appendChild(elementoLista);

    var div = document.createElement("div");
    div.setAttribute("class", "botones");
    elementoLista.appendChild(div);

    var abrir = document.createElement("a");
    abrir.setAttribute("href", "modificarPregunta.html?idCuestion=" +cuestion.cuestion.idCuestion);
    abrir.setAttribute("class", "btn btn-info");
    abrir.setAttribute("role", "button");
    abrir.innerHTML = "Abrir pregunta";
    div.appendChild(abrir);

    var eliminar = document.createElement("button");
    eliminar.setAttribute("class", "btn btn-danger");
    eliminar.setAttribute("type", "button");
    eliminar.setAttribute("onclick", "deleteQuestion(" + cuestion.cuestion.idCuestion + ");");
    eliminar.innerHTML = "Eliminar pregunta";
    div.appendChild(eliminar);

    var pregunta = document.createElement("p");
    pregunta.setAttribute("id", "pregunta-" + cuestion.cuestion.idCuestion);
    elementoLista.appendChild(pregunta);


    var enlace = document.createElement("a");
    enlace.setAttribute("href", "abrirPregunta.html?idCuestion=" +cuestion.cuestion.idCuestion);
    enlace.innerHTML = cuestion.cuestion.enunciadoDescripcion;
    pregunta.appendChild(enlace);
}

function listarPreguntas() {
    'use strict';
    var datos = JSON.parse(window.sessionStorage.getItem("cuestiones"));
    var cuestion;
    for (cuestion of datos.cuestiones) {
        imprimirCuestion(cuestion);
    }
}

function deleteQuestion(idCuestion){
    function trataRespuesta () {
        var respuesta;
        if(request.status==204){
            respuesta = request.response;
            let string_cuestion = JSON.stringify(respuesta);
            let cuestion = JSON.parse(string_cuestion);
            location.reload();
        }
        else{
            alert("No se ha encontrado la cuestion a eliminar");
        }
    }
    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    let url = 'http://localhost:8000/api/v1/questions/' + idCuestion;
    request.open('DELETE', url, true);
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    request.send();

}

function getCuestiones() {
    'use strict';
    function trataRespuesta () {
        var respuesta;
        if(request.status==200){
            respuesta = request.response;
            let string_cuestiones = JSON.stringify(respuesta);
            let cuestiones = JSON.parse(string_cuestiones);
            window.sessionStorage.setItem("cuestiones", JSON.stringify(cuestiones));
            listarPreguntas();
        }
        else{
            alert("No se han encontrado cuestiones");
        }
    }
    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    request.open('GET', 'http://localhost:8000/api/v1/questions', true);
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    request.send();

}
/*
function getCuestion(idCuestion) {
    'use strict';
    function trataRespuesta () {
        var respuesta;
        if(request.status==200){
            respuesta = request.response;
            let string_cuestion = JSON.stringify(respuesta);
            let cuestion = JSON.parse(string_cuestion);
            window.sessionStorage.setItem("cuestion", JSON.stringify(cuestion));
        }
        else{
            alert("No existe la cuestion");
        }
    }
    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    let url = 'http://localhost:8000/api/v1/questions/' + idCuestion;
    request.open('GET', url, true);
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    request.send();
}
*/