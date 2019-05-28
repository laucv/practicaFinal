var claveSolucion = 0;
getCuestiones();

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

function nextQuestionValue() {
  var datos = JSON.parse(window.sessionStorage.getItem("cuestiones"));
  if (datos === null) {
    return 0;
  } else {
    return datos.cuestiones.length;
  }
}

function nuevaPregunta() {
  var body = document.body;

  var h1 = document.createElement("h1");
  h1.innerHTML = "Nueva pregunta";
  body.appendChild(h1);

  var divPregunta = document.createElement("div");
  divPregunta.setAttribute("id", "divPregunta-" + nextQuestionValue());
  body.appendChild(divPregunta);

  var labelPregunta = document.createElement("label");
  labelPregunta.setAttribute("for", "pregunta-" + nextQuestionValue());
  labelPregunta.innerHTML = "Pregunta";
  divPregunta.appendChild(labelPregunta);

  var inputPregunta = document.createElement("input");
  inputPregunta.setAttribute("id", "pregunta-" + nextQuestionValue());
  inputPregunta.setAttribute("type", "text");
  inputPregunta.setAttribute("class", "form-control");
  inputPregunta.setAttribute("placeholder", "Pregunta");
  divPregunta.appendChild(inputPregunta);

  var checkboxPregunta = document.createElement("input");
  checkboxPregunta.setAttribute("type", "checkbox");
  checkboxPregunta.setAttribute("id", "disponible-" + nextQuestionValue());
  divPregunta.appendChild(checkboxPregunta);

  var labelCheckboxPregunta = document.createElement("label");
  labelCheckboxPregunta.setAttribute("for", "disponible-" + nextQuestionValue());
  labelCheckboxPregunta.innerHTML = "Pregunta disponible";
  divPregunta.appendChild(labelCheckboxPregunta);

  var divBotonSolucion = document.createElement("div");
  divBotonSolucion.setAttribute("id", "divBotonSolucion");
  body.appendChild(divBotonSolucion);

  var botonSolucion = document.createElement("button");
  botonSolucion.setAttribute("id", "botonSolucion");
  botonSolucion.setAttribute("class", "btn btn-normal");
  botonSolucion.setAttribute("onclick", "addSolution();");
  botonSolucion.innerHTML = "Añadir solución";
  divBotonSolucion.appendChild(botonSolucion);

  var divBotonPregunta = document.createElement("div");
  divBotonPregunta.setAttribute("id", "divBotonPregunta");
  body.appendChild(divBotonPregunta);

  var botonSalir = document.createElement("a");
  botonSalir.setAttribute("class", "btn btn-danger");
  botonSalir.setAttribute("href", "cuestionesMaestro.html");
  botonSalir.innerHTML = "Volver";
  divBotonPregunta.appendChild(botonSalir);

}

function addSolution() {

  if (claveSolucion === 0) {
    var divBotonPregunta = document.getElementById("divBotonPregunta");
    var botonPregunta = document.createElement("button");
    botonPregunta.setAttribute("id", "botonPregunta");
    botonPregunta.setAttribute("class", "btn btn-info");
    botonPregunta.setAttribute("onclick", "  postCuestion();");
    botonPregunta.innerHTML = "Añadir pregunta";
    botonPregunta.innerHTML = "Añadir pregunta";
    divBotonPregunta.appendChild(botonPregunta);
  }

  var divSolucionCero = document.getElementById("divPregunta-" + nextQuestionValue());

  var div = document.createElement("div");
  div.setAttribute("id", "divSolucion-" + claveSolucion);
  divSolucionCero.appendChild(div);

  var labelSolucion = document.createElement("label");
  labelSolucion.setAttribute("for", "solucion-" + claveSolucion);
  labelSolucion.innerHTML = "Solucion";
  div.appendChild(labelSolucion);

  var inputSolucion = document.createElement("input");
  inputSolucion.setAttribute("id", "solucion-" + claveSolucion);
  inputSolucion.setAttribute("type", "text");
  inputSolucion.setAttribute("class", "form-control");
  inputSolucion.setAttribute("placeholder", "Solución");
  div.appendChild(inputSolucion);

  var checkboxSolucion = document.createElement("input");
  checkboxSolucion.setAttribute("type", "checkbox");
  checkboxSolucion.setAttribute("id", "correcta-" + claveSolucion);
  div.appendChild(checkboxSolucion);

  var labelCheckboxSolucion = document.createElement("label");
  labelCheckboxSolucion.setAttribute("for", "correcta-" + claveSolucion);
  labelCheckboxSolucion.innerHTML = "Solución correcta";
  div.appendChild(labelCheckboxSolucion);

  var br = document.createElement("br");
  div.appendChild(br);

  var botonEliminar = document.createElement("button");
  botonEliminar.setAttribute("id", "botonEliminar-" + claveSolucion);
  botonEliminar.setAttribute("class", "btn btn-danger");
  botonEliminar.setAttribute("onclick", "deleteSolution(" + claveSolucion + ");");
  botonEliminar.innerHTML = "Eliminar solución";
  div.appendChild(botonEliminar);

  claveSolucion++;
}

function deleteSolution(clave) {
  var claveSol = claveSolucion - 1;
  if (clave === claveSol) {
    var divSolucion = document.getElementById("divSolucion-" + clave);
    var divPregunta = divSolucion.parentElement;
    divPregunta.removeChild(divSolucion);
    claveSolucion--;
  } else {
    alert("Se tiene que eliminar la última solución para poder eliminar esa");
  }

  if (claveSol === 0) {
    var divBotonPregunta = document.getElementById("divBotonPregunta");
    var boton = document.getElementById("botonPregunta");
    divBotonPregunta.removeChild(boton);
  }
}

function postCuestion() {
  'use strict';
  function trataRespuesta () {
    var respuesta;
    if(request.status==201){
      respuesta = request.response;
      let idCuestion = respuesta.cuestion.idCuestion;
      postSolucion(idCuestion);
    }
    else{
      alert("No se ha podido añadir la pregunta");
    }
  }
  var request = new XMLHttpRequest();
  let token = window.sessionStorage.getItem("token");
  request.open('POST', 'http://localhost:8000/api/v1/questions', true);
  request.setRequestHeader("Authorization", "Bearer " + token);
  request.responseType = 'json';
  request.onload = trataRespuesta;
  request.setRequestHeader("Content-Type", "application/json");
  let datos = codifica_query_string_cuestion();
  request.send(datos);
}

function codifica_query_string_cuestion() {
  var enunciadoDescripcion = document.getElementById("pregunta-" + nextQuestionValue()).value;
  var enunciadoDisponible = document.getElementById("disponible-" + nextQuestionValue()).checked;
  var creador = parseInt(window.sessionStorage.getItem("user_id"));

  let datos = {
    "enunciadoDescripcion": enunciadoDescripcion,
    "enunciadoDisponible": enunciadoDisponible,
    "creador": creador
  };

  return JSON.stringify(datos);
}
function codifica_query_string_solucion(idCuestion) {
  let valorSolucion = 0;

  var textoSolucion = document.getElementById("solucion-" + valorSolucion).value;
  var solucionCorrecta = document.getElementById("correcta-" + valorSolucion).checked;
  var cuestion = idCuestion;

  let datos = {
    "textoSolucion": textoSolucion,
    "solucionCorrecta": solucionCorrecta,
    "cuestion": cuestion
  }

  return JSON.stringify(datos);

}

function postSolucion(idCuestion) {
  'use strict';
  function trataRespuesta () {
    var respuesta;
    if(request.status==201){
      alert("Pregunta añadida")
      location.href = 'http://localhost:8000/frontend/cuestionesMaestro.html';
    }
    else{
      alert("No se ha podido añadir la pregunta");
    }
  }
  var request = new XMLHttpRequest();
  let token = window.sessionStorage.getItem("token");
  request.open('POST', 'http://localhost:8000/api/v1/solutions', true);
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("Authorization", "Bearer " + token);
  request.responseType = 'json';
  request.onload = trataRespuesta;
  let datos = codifica_query_string_solucion(idCuestion);
  request.send(datos);
}