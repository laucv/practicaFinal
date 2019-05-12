function imprimirCuestion(cuestion) {
  'use strict';
  var lista = document.getElementById("listaCuestiones");
  var elementoLista = document.createElement("li");
  elementoLista.setAttribute("id", "cuestion-" + cuestion.clave);
  lista.appendChild(elementoLista);

  var div = document.createElement("div");
  div.setAttribute("class", "botones");
  elementoLista.appendChild(div);

  var pregunta = document.createElement("p");
  pregunta.setAttribute("id", "pregunta-" + cuestion.clave);
  elementoLista.appendChild(pregunta);

  var enlace = document.createElement("a");
  enlace.setAttribute("href", "responderPregunta.html?clave=" + cuestion.clave);
  enlace.innerHTML = cuestion.pregunta;
  pregunta.appendChild(enlace);
}

function listarPreguntas() {
  'use strict';
  var datos = JSON.parse(window.localStorage.getItem("datos"));
  var cuestion;
  for (cuestion of datos.cuestiones) {
    if (cuestion.disponible) {
      imprimirCuestion(cuestion);

    }
  }
}
