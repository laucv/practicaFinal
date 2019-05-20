function getIdCuestion() {
  'use strict';
  var cuestion;
  var url = window.location.href.split("=");
  var idCuestion = parseInt(url[url.length - 1]);
  var datos = JSON.parse(window.sessionStorage.getItem("cuestiones"));
  for (cuestion of datos.cuestiones) {
    if (cuestion.cuestion.idCuestion === idCuestion) {
      return idCuestion;
    }
  }
  alert("No existe dicha cuestión");
  location.href = 'http://localhost:8000/frontend/notFound.html';
  return null;
}

function getCuestion() {
  'use strict';
  function trataRespuesta () {
    var respuesta;
    if(request.status==200){
      respuesta = request.response;
      let string_cuestion = JSON.stringify(respuesta);
      let cuestion = JSON.parse(string_cuestion);
      window.sessionStorage.setItem("cuestion", JSON.stringify(cuestion));
      abrirCuestion(cuestion);
    }
    else{
      alert("No existe la cuestion");
    }
  }
  var request = new XMLHttpRequest();
  let token = window.sessionStorage.getItem("token");
  let url = 'http://localhost:8000/api/v1/questions/' + getIdCuestion();
  request.open('GET', url, true);
  request.setRequestHeader("Authorization", "Bearer " + token);
  request.responseType = 'json';
  request.onload = trataRespuesta;
  request.send();
}

function abrirCuestion(cuestion) {
  'use strict';
  var body = document.body;

  var h1 = document.createElement("h1");
  h1.innerHTML = "Pregunta";
  body.appendChild(h1);

  var divPregunta = document.createElement("div");
  divPregunta.setAttribute("id", "divPregunta-" + cuestion.cuestion.idCuestion);
  body.appendChild(divPregunta);

  var h2 = document.createElement("h2");
  h2.innerHTML = cuestion.cuestion.enunciadoDescripcion;
  divPregunta.appendChild(h2);

  var inputD = document.createElement("input");
  inputD.setAttribute("type", "checkbox");
  inputD.setAttribute("id", "disponible-" + cuestion.cuestion.idCuestion);
  inputD.checked = cuestion.cuestion.enunciadoDisponible;
  divPregunta.appendChild(inputD);

  var labelD = document.createElement("label");
  labelD.setAttribute("for", "disponible-" + cuestion.cuestion.idCuestion);
  labelD.innerHTML = "Pregunta disponible";
  divPregunta.appendChild(labelD);

  var hr = document.createElement("hr");
  body.appendChild(hr);

  getSoluciones();

  var divBoton = document.createElement("div");
  divBoton.setAttribute("class", "botones");
  body.appendChild(divBoton);

  var boton = document.createElement("a");
  boton.setAttribute("href", "cuestionesMaestro.html");
  boton.setAttribute("class", "btn btn-info");
  boton.innerHTML = "Volver";
  divBoton.appendChild(boton);
}

function getSoluciones() {
  'use strict';
  function trataRespuesta () {
    var respuesta;
    if(request.status==200){
      respuesta = request.response;
      let string_soluciones = JSON.stringify(respuesta);
      let soluciones = JSON.parse(string_soluciones);
      window.sessionStorage.setItem("soluciones", JSON.stringify(soluciones));
      imprimirSoluciones();
    }
    else{
      alert("No se han encontrado soluciones");
    }
  }
  var request = new XMLHttpRequest();
  let token = window.sessionStorage.getItem("token");
  request.open('GET', 'http://localhost:8000/api/v1/solutions', true);
  request.setRequestHeader("Authorization", "Bearer " + token);
  request.responseType = 'json';
  request.onload = trataRespuesta;
  request.send();

}

function imprimirSoluciones() {
  var body = document.body;
  var soluciones = JSON.parse(window.sessionStorage.getItem("soluciones"));

  for (let i = 0; i<soluciones.soluciones.length; i++) {

    var divRespuesta = document.createElement("div");
    divRespuesta.setAttribute("class", "respuesta-" + i);
    divRespuesta.setAttribute("id", "respuesta-" + i);
    body.appendChild(divRespuesta);

    var h3 = document.createElement("h3");
    h3.innerHTML = "Solución";
    divRespuesta.appendChild(h3);
    var pS = document.createElement("p");
    pS.innerHTML = soluciones.soluciones[i].solucion.textoSolucion;

    divRespuesta.appendChild(pS);

    var inputS = document.createElement("input");
    inputS.setAttribute("type", "checkbox");
    inputS.setAttribute("id", "correcta-" + i);
    inputS.checked = soluciones.soluciones[i].solucion.solucionCorrecta;
    divRespuesta.appendChild(inputS);

    var labelS = document.createElement("label");
    labelS.setAttribute("for", "correcta-" + i);
    labelS.innerHTML = "Solución correcta";
    divRespuesta.appendChild(labelS);

    let idSolucion = soluciones.soluciones[i].solucion.idSolucion;
    getSolucion(idSolucion);
    let solucion = JSON.parse(window.sessionStorage.getItem("solucion"));
    imprimirRazonamientos(i);

    i++;
    var hr1 = document.createElement("hr");
    body.appendChild(hr1);
  }
}

function imprimirRazonamientos(divElemento) {
    getRazonamientos();
    let razonamientos = JSON.parse(window.sessionStorage.getItem("razonamientos"));
    let divRespuesta = document.getElementById("respuesta-" + divElemento);

    for (let j = 0; j < razonamientos.razonamientos.length; j++) {

      var divJustificacion = document.createElement("div");
      divJustificacion.setAttribute("class", "justificacion-" + j);
      divRespuesta.appendChild(divJustificacion);

      var h4 = document.createElement("h4");
      h4.innerHTML = "Razonamiento";
      divJustificacion.appendChild(h4);

      var pJ = document.createElement("p");
      pJ.innerHTML = razonamientos.razonamientos[j].razonamiento.textoRazonamiento;
      divJustificacion.appendChild(pJ);

      var inputR = document.createElement("input");
      inputR.setAttribute("type", "checkbox");
      inputR.setAttribute("id", "justificado-" + j);
      inputR.checked = razonamientos.razonamientos[j].razonamiento.razonamientoJustificado;
      divJustificacion.appendChild(inputR);

      var labelR = document.createElement("label");
      labelR.setAttribute("for", "correcta-" + j);
      labelR.innerHTML = "Razonamiento justificado";
      divJustificacion.appendChild(labelR);

      if (razonamientos.razonamientos[j].razonamiento.textoError !== undefined) {

        var error = document.createElement("div");
        error.setAttribute("id", "error-" + j);
        divJustificacion.appendChild(error);

        var h5 = document.createElement("h4");
        h5.innerHTML = "Error";
        error.appendChild(h5);


        var pE = document.createElement("p");
        pE.innerHTML = razonamientos.razonamientos[j].razonamiento.textoError;
        error.appendChild(pE);

      }
      j++;

    }
}

function getSolucion(idSolucion) {
  'use strict';
  function trataRespuesta () {
    var respuesta;
    if(request.status==200){
      respuesta = request.response;
      let string_solucion = JSON.stringify(respuesta);
      let solucion = JSON.parse(string_solucion);
      window.sessionStorage.setItem("solucion", JSON.stringify(solucion));
    }
    else{
      console.log("No existen soluciones");
    }
  }
  var request = new XMLHttpRequest();
  let token = window.sessionStorage.getItem("token");
  let url = 'http://localhost:8000/api/v1/solutions/' + idSolucion;
  request.open('GET', url, true);
  request.setRequestHeader("Authorization", "Bearer " + token);
  request.responseType = 'json';
  request.onload = trataRespuesta;
  request.send();
}

function getRazonamientos() {
  'use strict';
  function trataRespuesta () {
    var respuesta;
    if(request.status==200){
      respuesta = request.response;
      let string_razonamientos = JSON.stringify(respuesta);
      let razonamientos = JSON.parse(string_razonamientos);
      window.sessionStorage.setItem("razonamientos", JSON.stringify(razonamientos));
    }
    else{
      console.log("No existen razonamientos");
    }
  }
  var request = new XMLHttpRequest();
  let token = window.sessionStorage.getItem("token");
  let url = 'http://localhost:8000/api/v1/reasons';
  request.open('GET', url, true);
  request.setRequestHeader("Authorization", "Bearer " + token);
  request.responseType = 'json';
  request.onload = trataRespuesta;
  request.send();
}