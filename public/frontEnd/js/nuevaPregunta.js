var claveSolucion = 0;

function nextQuestionValue() {
  var datos = JSON.parse(window.localStorage.getItem("datos"));
  if (datos.cuestiones.length === 0) {
    return 0;
  } else {
    return datos.cuestiones.slice(-1)[0].clave + 1;
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
    botonPregunta.setAttribute("onclick", "addQuestion();");
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

function addQuestion() {
  var datos = JSON.parse(window.localStorage.getItem("datos"));
  var clave = nextQuestionValue();
  var pregunta = document.getElementById("pregunta-" + clave).value;
  var disponible = document.getElementById("disponible-" + clave).checked;

  if (pregunta === "") {
    alert("El campo de la pregunta no puede estar vacío");
  } else {
    datos.cuestiones.push({
      clave: clave,
      pregunta: pregunta,
      propuestaSolucion: [],
      disponible: disponible,
      soluciones: [{
        clave: -1
    }]

    });
    datos.cuestiones[clave].soluciones.pop();
    window.localStorage.setItem("datos", JSON.stringify(datos));

    addSolutionData(clave);
    location.replace("modificarPregunta.html?clave=" + clave);
    alert("Por favor, rellene los campos de razonamiento y error si es necesario");
  }
}

function addSolutionData(clave) {
  var datos = JSON.parse(window.localStorage.getItem("datos"));
  var i;

  for (i = 0; i < claveSolucion; i++) {
    var solucion = document.getElementById("solucion-" + i).value;
    var correcta = document.getElementById("correcta-" + i).checked;

    datos.cuestiones[clave].soluciones.push({
      clave: i,
      solucion: solucion,
      propuestaRazonamiento: [],
      correcta: correcta,
      razonamientos: [{
        clave: -1
      }]
    });
  }
  window.localStorage.setItem("datos", JSON.stringify(datos));

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
