function imprimirCuestion(cuestion) {
  'use strict';
  var lista = document.getElementById("listaCuestiones");
  var elementoLista = document.createElement("li");
  elementoLista.setAttribute("id", "cuestion-" + cuestion.cuestion.idCuestion);
  lista.appendChild(elementoLista);

  var div = document.createElement("div");
  div.setAttribute("class", "boton");
  elementoLista.appendChild(div);

  var pregunta = document.createElement("p");
  pregunta.setAttribute("id", "pregunta-" + cuestion.cuestion.idCuestion);
  elementoLista.appendChild(pregunta);

  var enlace = document.createElement("a");
  enlace.setAttribute("href", "responderPregunta.html?clave=" + cuestion.cuestion.idCuestion);
  enlace.innerHTML = cuestion.cuestion.enunciadoDescripcion;
  pregunta.appendChild(enlace);
}

function listarPreguntas() {
  'use strict';
  var datos = JSON.parse(window.sessionStorage.getItem("cuestiones"));
  window.sessionStorage.removeItem("propuestas_razonamiento");
  window.sessionStorage.removeItem("propuestas_solucion");

  var cuestion;
  for (cuestion of datos.cuestiones) {
    if (cuestion.cuestion.enunciadoDisponible) {
      imprimirCuestion(cuestion);

    }
  }
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