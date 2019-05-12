function imprimirCuestion(cuestion) {
    'use strict';
    var lista = document.getElementById("listaCuestiones");
    var elementoLista = document.createElement("li");
    elementoLista.setAttribute("id", "cuestion-" + cuestion.clave);
    lista.appendChild(elementoLista);

    var div = document.createElement("div");
    div.setAttribute("class", "botones");
    elementoLista.appendChild(div);

    var abrir = document.createElement("a");
    abrir.setAttribute("href", "modificarPregunta.html?clave=" +cuestion.clave);
    abrir.setAttribute("class", "btn btn-info");
    abrir.setAttribute("role", "button");
    abrir.innerHTML = "Abrir pregunta";
    div.appendChild(abrir);

    var eliminar = document.createElement("button");
    eliminar.setAttribute("class", "btn btn-danger");
    eliminar.setAttribute("type", "button");
    eliminar.setAttribute("onclick", "deleteQuestion(" + cuestion.clave + ");");
    eliminar.innerHTML = "Eliminar pregunta";
    div.appendChild(eliminar);

    var pregunta = document.createElement("p");
    pregunta.setAttribute("id", "pregunta-" + cuestion.clave);
    elementoLista.appendChild(pregunta);


    var enlace = document.createElement("a");
    enlace.setAttribute("href", "abrirPregunta.html?clave=" +cuestion.clave);
    enlace.innerHTML = cuestion.pregunta;
    pregunta.appendChild(enlace);
}

function listarPreguntas() {
    'use strict';
    var datos = JSON.parse(window.localStorage.getItem("datos"));
    var cuestion;
    for (cuestion of datos.cuestiones) {
        imprimirCuestion(cuestion);
    }
}

function deleteQuestion(clave){
  var datos = JSON.parse(window.localStorage.getItem("datos"));

  for( var i = 0; i < datos.cuestiones.length; i++){ 
    
   if ( datos.cuestiones[i].clave === clave) {
     datos.cuestiones.splice(i, 1); 
     for (var j=i; j<datos.cuestiones.length; j++){
       datos.cuestiones[j].clave = datos.cuestiones[j].clave - 1;
     }
   }
}  
  window.localStorage.setItem("datos", JSON.stringify(datos));
  location.reload();

}