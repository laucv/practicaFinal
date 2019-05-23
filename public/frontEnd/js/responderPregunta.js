var i = 0;
var j = 0;
var datos = JSON.parse(window.sessionStorage.getItem("cuestiones"));
var soluciones = JSON.parse(window.sessionStorage.getItem("soluciones"));
var razonamientos = JSON.parse(window.sessionStorage.getItem("razonamientos"));
var propuestaSolucion = 0;
var propuestaRazonamiento = 0;

getCuestiones();
getSoluciones();
getRazonamientos();

function getIdCuestion() {
  'use strict';
  var cuestion;
  var url = window.location.href.split("=");
  var idCuestion = parseInt(url[url.length - 1]);
  for (cuestion of datos.cuestiones) {
    if (cuestion.cuestion.idCuestion === idCuestion) {
      window.sessionStorage.setItem("cuestion", JSON.stringify(cuestion));
      return idCuestion;
    }
  }
  alert("No existe dicha cuestión");
  location.href = 'http://localhost:8000/frontend/notFound.html';
  return null;
}

function responderCuestion() {
  'use strict';

  var idCuestion = getIdCuestion();
  var cuestion = JSON.parse(window.sessionStorage.getItem("cuestion"));

  var body = document.body;

  var h1 = document.createElement("h1");
  h1.innerHTML = "Pregunta";
  body.appendChild(h1);

  var divPregunta = document.createElement("div");
  divPregunta.setAttribute("id", "divPregunta-" + idCuestion);
  body.appendChild(divPregunta);

  var h2 = document.createElement("h2");
  h2.innerHTML = cuestion.cuestion.enunciadoDescripcion;
  divPregunta.appendChild(h2);

  var div = document.createElement("div");
  div.setAttribute("id", "divBoton");
  body.appendChild(div);

  var botonSalir = document.createElement("a");
  botonSalir.setAttribute("class", "btn btn-danger");
  botonSalir.setAttribute("href", "cuestionesAprendiz.html");
  botonSalir.innerHTML = "Volver";
  div.appendChild(botonSalir);

  propuestaSolucionAlumno();
}

function propuestaSolucionAlumno() {
  var body = document.body;

  var divSolucionAlumno = document.createElement("div");
  divSolucionAlumno.setAttribute("id", "divPropuestaSolucion");
  body.appendChild(divSolucionAlumno);

  var labelRespuestaAlumno = document.createElement("label");
  labelRespuestaAlumno.innerHTML = "Solución propuesta";
  labelRespuestaAlumno.setAttribute("for", "propuestaSolucion");
  divSolucionAlumno.appendChild(labelRespuestaAlumno);

  var respuestaAlumno = document.createElement("input");
  respuestaAlumno.setAttribute("id", "propuestaSolucion");
  respuestaAlumno.setAttribute("class", "form-control");
  respuestaAlumno.setAttribute("type", "text");
  divSolucionAlumno.appendChild(respuestaAlumno);

  var botonSolucion = document.createElement("button");
  botonSolucion.setAttribute("id", "botonPropuestaSolucion");
  botonSolucion.setAttribute("class", "btn btn-success");
  botonSolucion.setAttribute("onclick", "  guardarPropuestaSolucion();");
  botonSolucion.innerHTML = "Proponer solución";
  divSolucionAlumno.appendChild(botonSolucion);

  propuestaSolucion++;

}

function guardarPropuestaSolucion() {
  var inutilizar = document.getElementById("botonPropuestaSolucion");
  inutilizar.removeAttribute("onclick");

  var propuestaSolucion = document.getElementById("propuestaSolucion").value;

  postPropuestaSolucion(propuestaSolucion);

  window.localStorage.setItem("datos", JSON.stringify(datos));
  generateSolution();
}

function postPropuestaSolucion(textoPropuestaSolucion) {
  'use strict';

  function trataRespuesta() {
    if (request.status == 201) {
      alert("Propuesta de solucion guardada");
    } else {
      alert("No se ha podido guardar la propuesta solucion");
    }
  }

  var request = new XMLHttpRequest();
  let token = window.sessionStorage.getItem("token");
  let url = 'http://localhost:8000/api/v1/solutionsProposal';
  request.open('POST', url, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("Authorization", "Bearer " + token);
  request.responseType = 'json';
  request.onload = trataRespuesta;
  let datos = datos_post_propuesta_solucion(textoPropuestaSolucion);
  request.send(datos);

}

function datos_post_propuesta_solucion(textoPropuestaSolucion) {
  var cuestion = getIdCuestion();
  var user_id = JSON.parse(window.sessionStorage.getItem("user_id"));


  let datos = {
    "textoPropuestaSolucion": textoPropuestaSolucion,
    "propuestaSolucionCorrecta": false,
    "cuestion": cuestion,
    "user" : user_id
  }

  return JSON.stringify(datos);
}

function postPropuestaRazonamiento(idSolucion, textoPropuestaRazonamiento) {
  'use strict';

  function trataRespuesta() {
    if (request.status == 201) {
      alert("Razonamiento guardado");
    } else {
      alert("No se ha podido guardar la propuesta solucion");
    }
  }

  var request = new XMLHttpRequest();
  let token = window.sessionStorage.getItem("token");
  let url = 'http://localhost:8000/api/v1/reasonsProposal';
  request.open('POST', url, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("Authorization", "Bearer " + token);
  request.responseType = 'json';
  request.onload = trataRespuesta;
  let datos = datos_post_propuesta_razonamiento(idSolucion, textoPropuestaRazonamiento);
  request.send(datos);

}

function datos_post_propuesta_razonamiento(idSolucion, textoPropuestaRazonamiento) {
  var user_id = JSON.parse(window.sessionStorage.getItem("user_id"));


  let datos = {
    "textoPropuestaRazonamiento": textoPropuestaRazonamiento,
    "propuestaRazonamientoJustificado": false,
    "solucion": idSolucion,
    "user" : user_id
  }

  return JSON.stringify(datos);
}

function generateSolution() {
  'use strict';

  var cuestion = JSON.parse(window.sessionStorage.getItem("cuestion"));
  var numeroSoluciones = cuestion.cuestion.soluciones.length;

  //for (let s = 0; s< soluciones.soluciones.length; j++) {
    //if(cuestion.cuestion.soluciones[i] === soluciones.soluciones[s].solucion.idSolucion){
      if (i < numeroSoluciones) {
        imprimirSolucion(i);
        i++;
      }
    //}
  //}
}

function imprimirSolucion(claveS) {
  'use strict';
  var cuestion = JSON.parse(window.sessionStorage.getItem("cuestion"));
  var solucion = soluciones.soluciones[claveS];
  var idSolucion = soluciones.soluciones[claveS].solucion.idSolucion;

  var body = document.body;

  var div = document.createElement("div");
  div.setAttribute("id", "divSolucion-" + idSolucion);
  body.appendChild(div);

  var h2 = document.createElement("h2");
  h2.innerHTML = "Solucion";
  div.appendChild(h2);

  var inputSolucion = document.createElement("p");
  inputSolucion.setAttribute("id", "solucion-" + idSolucion);
  inputSolucion.innerHTML = solucion.solucion.textoSolucion;
  div.appendChild(inputSolucion);

  var checkboxSolucion = document.createElement("input");
  checkboxSolucion.setAttribute("type", "checkbox");
  checkboxSolucion.setAttribute("id", "correcta-" + idSolucion);
  div.appendChild(checkboxSolucion);

  var labelCheckboxSolucion = document.createElement("label");
  labelCheckboxSolucion.setAttribute("for", "correcta-" + idSolucion);
  labelCheckboxSolucion.innerHTML = "Solución correcta";
  div.appendChild(labelCheckboxSolucion);

  var botonSolucion = document.createElement("button");
  botonSolucion.setAttribute("id", "botonCorregirSolucion-" + idSolucion);
  botonSolucion.setAttribute("class", "btn btn-success");
  botonSolucion.setAttribute("onclick", "corregirSolucion(" + idSolucion + ");");
  botonSolucion.innerHTML = "Corregir solución";
  div.appendChild(botonSolucion);

}

function corregirSolucion(idSolucion) {
  'use strict';
  var inutilizar = document.getElementById("botonCorregirSolucion-" + idSolucion);
  inutilizar.removeAttribute("onclick");
  var claveS = idSolucion - 1;

  var correctaAlumno = document.getElementById("correcta-" + idSolucion).checked;
  var correctaProfesor = soluciones.soluciones[claveS].solucion.solucionCorrecta;

  if (correctaAlumno === correctaProfesor) {
    alert("¡Acierto :)");
  } else {
    alert("Fallo :(");
  }

  if (correctaProfesor === false) {
    propuestaRazonamientoAlumno(idSolucion);
  }
}

function propuestaRazonamientoAlumno(idSolucion) {
  var divPropuestaSolución = document.getElementById("divSolucion-" + idSolucion);

  var divSolucionAlumno = document.createElement("div");
  divSolucionAlumno.setAttribute("id", "divPropuestaRazonamiento");
  divPropuestaSolución.appendChild(divSolucionAlumno);

  var labelRespuestaAlumno = document.createElement("label");
  labelRespuestaAlumno.innerHTML = "Razonamiento propuesto";
  labelRespuestaAlumno.setAttribute("for", "propuestaRazonamiento");
  divSolucionAlumno.appendChild(labelRespuestaAlumno);

  var respuestaAlumno = document.createElement("input");
  respuestaAlumno.setAttribute("id", "propuestaRazonamiento");
  respuestaAlumno.setAttribute("class", "form-control");
  respuestaAlumno.setAttribute("type", "text");
  divSolucionAlumno.appendChild(respuestaAlumno);

  var botonSolucion = document.createElement("button");
  botonSolucion.setAttribute("id", "botonPropuestaRazonamiento");
  botonSolucion.setAttribute("class", "btn btn-success");
  botonSolucion.setAttribute("onclick", "guardarPropuestaRazonamiento(" + idSolucion + ");");
  botonSolucion.innerHTML = "Proponer razonamiento";
  divSolucionAlumno.appendChild(botonSolucion);

  propuestaRazonamiento++;

}

function guardarPropuestaRazonamiento(idSolucion) {
  var inutilizar = document.getElementById("botonPropuestaRazonamiento");
  inutilizar.removeAttribute("onclick");

  var razonamiento = document.getElementById("propuestaRazonamiento").value;
  var solucion = idSolucion;

  postPropuestaRazonamiento(solucion, razonamiento);

  generateJustifications(idSolucion);
}

function generateJustifications(idSolucion) {
  'use strict';
    var solucion = getSolucion(idSolucion);
    var numeroRazonamientos = solucion.solucion.razonamientos.length;


    if (j < numeroRazonamientos) {
      imprimirRazonamiento(solucion, j);
      j++;
    }

}

function getRazonamiento(idRazonamiento) {

  for (let r = 0; r < razonamientos.razonamientos.length; r++){
    if(razonamientos.razonamientos[r].razonamiento.idRazonamiento === idRazonamiento){
      return razonamientos.razonamientos[r];
    }
  }
}

function getSolucion(idSolucion) {

  for (let r = 0; r < soluciones.soluciones.length; r++){
    if(soluciones.soluciones[r].solucion.idSolucion === idSolucion){
      return soluciones.soluciones[r];
    }
  }
}

function imprimirRazonamiento(solucion, claveR) {
  'use strict';
  var idSolucion = solucion.solucion.idSolucion;
  var divSolucion = document.getElementById("divSolucion-" + idSolucion);
  var idRazonamiento = solucion.solucion.razonamientos[claveR];
  var razonamiento = getRazonamiento(idRazonamiento);
  var idRazonamiento = razonamiento.razonamiento.idRazonamiento;
  var justificadoProfesor = razonamiento.razonamiento.razonamientoJustificado;

  var div = document.createElement("div");
  div.setAttribute("id", "divRazonamiento-" + idSolucion + "-" + idRazonamiento);
  divSolucion.appendChild(div);

  var h3 = document.createElement("h3");
  h3.innerHTML = "Razonamiento";
  div.appendChild(h3);

  var inputSolucion = document.createElement("p");
  inputSolucion.setAttribute("id", "razonamiento-" + idSolucion + "-" + idRazonamiento);
  inputSolucion.innerHTML = razonamiento.razonamiento.textoRazonamiento;
  div.appendChild(inputSolucion);

  var checkboxSolucion = document.createElement("input");
  checkboxSolucion.setAttribute("type", "checkbox");
  checkboxSolucion.setAttribute("id", "justificado-" + idSolucion + "-" + idRazonamiento);
  div.appendChild(checkboxSolucion);

  var labelCheckboxSolucion = document.createElement("label");
  labelCheckboxSolucion.setAttribute("for", "justificado-" + idSolucion + "-" + idRazonamiento);
  labelCheckboxSolucion.innerHTML = "Razonamiento justificado";
  div.appendChild(labelCheckboxSolucion);

  var botonSolucion = document.createElement("button");
  botonSolucion.setAttribute("id", "botonCorregirRazonamiento-" + idSolucion + "-" + idRazonamiento);
  botonSolucion.setAttribute("class", "btn btn-success");
  botonSolucion.setAttribute("onclick", "corregirJustificacion(" +  idSolucion + ", " + idRazonamiento + ", " + justificadoProfesor + ");");
  botonSolucion.innerHTML = "Corregir justificación";
  div.appendChild(botonSolucion);

}

function corregirJustificacion (idSolucion, idRazonamiento, justificadoProfesor) {
  'use strict';
  var inutilizar = document.getElementById("botonCorregirRazonamiento-" + idSolucion + "-" + idRazonamiento);
  inutilizar.removeAttribute("onclick");

  var justificadoAlumno = document.getElementById("justificado-" + idSolucion + "-" + idRazonamiento).checked;

  if (justificadoAlumno === justificadoProfesor) {
    alert("¡Acierto :)");
  } else {
    alert("Fallo :(");
  }

  if (justificadoProfesor === false) {
    var divRazonamiento = document.getElementById("divRazonamiento-" + idSolucion + "-" + idRazonamiento);

    var divError = document.createElement("div");
    divError.setAttribute("id", "divError-" + idSolucion + "-" + idRazonamiento);
    divRazonamiento.appendChild(divError);

    var h3 = document.createElement("h3");
    h3.innerHTML = "Error";
    divError.appendChild(h3);

    let razonamiento = getRazonamiento(idRazonamiento);
    var pError = document.createElement("p");
    pError.setAttribute("id", "error-" + idSolucion + "-" + idRazonamiento);
    pError.innerHTML = razonamiento.razonamiento.textoError;
    divError.appendChild(pError);
  }

  console.log("if raro que tengo al final");
  let solucion = getSolucion(idSolucion);
  console.log(solucion.solucion.razonamientos.length)


  if (solucion.solucion.razonamientos.length === j) {
    var body = document.body;
    var hr1 = document.createElement("hr");
    body.appendChild(hr1);
    generateSolution();
  }
  generateJustifications(idSolucion);

  if (solucion.solucion.razonamientos.length === j) {
    j = 0;
  }

}

function getCuestiones() {
  'use strict';

  function trataRespuesta() {
    var respuesta;
    if (request.status == 200) {
      respuesta = request.response;
      let string_cuestiones = JSON.stringify(respuesta);
      let cuestiones = JSON.parse(string_cuestiones);
      window.sessionStorage.setItem("cuestiones", JSON.stringify(cuestiones));
    } else {
      console.log("No se han encontrado cuestiones");
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

function getSoluciones() {
  'use strict';

  function trataRespuesta() {
    var respuesta;
    if (request.status == 200) {
      respuesta = request.response;
      let string_soluciones = JSON.stringify(respuesta);
      let soluciones = JSON.parse(string_soluciones);
      window.sessionStorage.setItem("soluciones", JSON.stringify(soluciones));
    } else {
      console.log("No se han encontrado soluciones");
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

function getRazonamientos() {
  'use strict';

  function trataRespuesta() {
    var respuesta;
    if (request.status == 200) {
      respuesta = request.response;
      let string_razonamiento = JSON.stringify(respuesta);
      let razonamiento = JSON.parse(string_razonamiento);
      window.sessionStorage.setItem("razonamientos", JSON.stringify(razonamiento));
    } else {
      console.log("No se han encontrado razonamientos");
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