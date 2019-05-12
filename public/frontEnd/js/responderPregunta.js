var i = 0;
var j = 0;
var propuestaSolucion = 0;
var propuestaRazonamiento = 0;

function getCuestion() {
  'use strict';
  var cuestion;
  var url = window.location.href.split("=");
  var clave = parseInt(url[url.length - 1]);
  var datos = JSON.parse(window.localStorage.getItem("datos"));
  for (cuestion of datos.cuestiones) {
    if (cuestion.clave === clave) {
      return cuestion;
    }
  }
  return null;
}

function responderCuestion() {
  'use strict';

  var cuestion = getCuestion();
  var usuarioRegistrado = JSON.parse(window.localStorage.getItem("usuarioRegistrado"));
  var claveUsuario = usuarioRegistrado.clave;

  var body = document.body;

  var h1 = document.createElement("h1");
  h1.innerHTML = "Pregunta";
  body.appendChild(h1);

  var divPregunta = document.createElement("div");
  divPregunta.setAttribute("id", "divPregunta-" + cuestion.clave);
  body.appendChild(divPregunta);

  var h2 = document.createElement("h2");
  h2.innerHTML = cuestion.pregunta;
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
  botonSolucion.setAttribute("onclick", "  saveSolution();");
  botonSolucion.innerHTML = "Proponer solución";
  divSolucionAlumno.appendChild(botonSolucion);

  propuestaSolucion++;

}

function saveSolution() {
  var inutilizar = document.getElementById("botonPropuestaSolucion");
  inutilizar.removeAttribute("onclick");

  var solucion = document.getElementById("propuestaSolucion").value;
  var datos = JSON.parse(window.localStorage.getItem("datos"));
  var cuestion = getCuestion();

  datos.cuestiones[cuestion.clave].propuestaSolucion.push({
    clavePropuesta: propuestaSolucion,
    solucion: solucion
  })

  window.localStorage.setItem("datos", JSON.stringify(datos));
  generateSolution();
}

function generateSolution() {
  'use strict';

  var cuestion = getCuestion();
  var numeroSoluciones = cuestion.soluciones.length;

  if (i < numeroSoluciones) {
    imprimirSolucion(i);
    i++;
  }
}

function imprimirSolucion(claveS) {
  'use strict';

  var cuestion = getCuestion();
  var solucion = cuestion.soluciones[claveS];

  var body = document.body;

  var div = document.createElement("div");
  div.setAttribute("id", "divSolucion-" + claveS);
  body.appendChild(div);

  var h2 = document.createElement("h2");
  h2.innerHTML = "Solucion";
  div.appendChild(h2);

  var inputSolucion = document.createElement("p");
  inputSolucion.setAttribute("id", "solucion-" + claveS);
  inputSolucion.innerHTML = solucion.solucion;
  div.appendChild(inputSolucion);

  var checkboxSolucion = document.createElement("input");
  checkboxSolucion.setAttribute("type", "checkbox");
  checkboxSolucion.setAttribute("id", "correcta-" + claveS);
  div.appendChild(checkboxSolucion);

  var labelCheckboxSolucion = document.createElement("label");
  labelCheckboxSolucion.setAttribute("for", "correcta-" + claveS);
  labelCheckboxSolucion.innerHTML = "Solución correcta";
  div.appendChild(labelCheckboxSolucion);

  var botonSolucion = document.createElement("button");
  botonSolucion.setAttribute("id", "botonCorregirSolucion-" + claveS);
  botonSolucion.setAttribute("class", "btn btn-success");
  botonSolucion.setAttribute("onclick", "corregirSolucion(" + cuestion.clave + ", " + claveS + ");");
  botonSolucion.innerHTML = "Corregir solución";
  div.appendChild(botonSolucion);

}

function corregirSolucion(claveCuestion, claveS) {
  'use strict';
  var inutilizar = document.getElementById("botonCorregirSolucion-" + claveS);
  inutilizar.removeAttribute("onclick");

  var correctaAlumno = document.getElementById("correcta-" + claveS).checked;
  var datos = JSON.parse(window.localStorage.getItem("datos"));
  var correctaProfesor = datos.cuestiones[claveCuestion].soluciones[claveS].correcta;

  if (correctaAlumno === correctaProfesor) {
    alert("¡Acierto :)");
  } else {
    alert("Fallo :(");
  }

  if (datos.cuestiones[claveCuestion].soluciones[claveS].correcta === false) {
    propuestaRazonamientoAlumno(claveS);
  }
}

function propuestaRazonamientoAlumno(claveS) {
  var divPropuestaSolución = document.getElementById("divSolucion-" + claveS);

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
  botonSolucion.setAttribute("onclick", "saveJustification(" + claveS + ");");
  botonSolucion.innerHTML = "Proponer razonamiento";
  divSolucionAlumno.appendChild(botonSolucion);

  propuestaRazonamiento++;

}

function saveJustification(claveS) {
  var inutilizar = document.getElementById("botonPropuestaRazonamiento");
  inutilizar.removeAttribute("onclick");

  var razonamiento = document.getElementById("propuestaRazonamiento").value;
  var datos = JSON.parse(window.localStorage.getItem("datos"));
  var cuestion = getCuestion();


  datos.cuestiones[cuestion.clave].soluciones[claveS].propuestaRazonamiento.push({
    clavePropuesta: propuestaRazonamiento,
    razonamiento: razonamiento
  })

  window.localStorage.setItem("datos", JSON.stringify(datos));
  generateJustifications(claveS);
}

function generateJustifications(claveS) {
  'use strict';
  var cuestion = getCuestion();
  if (cuestion.soluciones[claveS].razonamientos[0].clave !== -1) {
    var numeroRazonamientos = cuestion.soluciones[claveS].razonamientos.length;
    if (j < numeroRazonamientos) {
      imprimirRazonamiento(claveS, j);
      j++;
    }
  }

}

function imprimirRazonamiento(claveS, claveR) {
  'use strict';

  var divSolucion = document.getElementById("divSolucion-" + claveS);
  var razonamiento = getCuestion().soluciones[claveS].razonamientos[claveR];

  var div = document.createElement("div");
  div.setAttribute("id", "divRazonamiento-" + claveS + "-" + claveR);
  divSolucion.appendChild(div);

  var h3 = document.createElement("h3");
  h3.innerHTML = "Razonamiento";
  div.appendChild(h3);

  var inputSolucion = document.createElement("p");
  inputSolucion.setAttribute("id", "razonamiento-" + claveS + "-" + claveR);
  inputSolucion.innerHTML = razonamiento.razonamiento;
  div.appendChild(inputSolucion);

  var checkboxSolucion = document.createElement("input");
  checkboxSolucion.setAttribute("type", "checkbox");
  checkboxSolucion.setAttribute("id", "justificado-" + claveS + "-" + claveR);
  div.appendChild(checkboxSolucion);

  var labelCheckboxSolucion = document.createElement("label");
  labelCheckboxSolucion.setAttribute("for", "justificado-" + claveS + "-" + claveR);
  labelCheckboxSolucion.innerHTML = "Razonamiento justificado";
  div.appendChild(labelCheckboxSolucion);

  var botonSolucion = document.createElement("button");
  botonSolucion.setAttribute("id", "botonCorregirRazonamiento-" + claveS + "-" + claveR);
  botonSolucion.setAttribute("class", "btn btn-success");
  botonSolucion.setAttribute("onclick", "corregirJustificacion(" + getCuestion().clave + ", " + claveS + ", " + claveR + ");");
  botonSolucion.innerHTML = "Corregir justificación";
  div.appendChild(botonSolucion);

}

function corregirJustificacion(claveCuestion, claveS, claveR) {
  'use strict';
  var inutilizar = document.getElementById("botonCorregirRazonamiento-" + claveS + "-" + claveR);
  inutilizar.removeAttribute("onclick");

  var justificadoAlumno = document.getElementById("justificado-" + claveS + "-" + claveR).checked;
  var datos = JSON.parse(window.localStorage.getItem("datos"));
  var justificadoProfesor = datos.cuestiones[claveCuestion].soluciones[claveS].razonamientos[claveR].justificado;

  if (justificadoAlumno === justificadoProfesor) {
    alert("¡Acierto :)");
  } else {
    alert("Fallo :(");
  }

  if (justificadoProfesor === false) {
    var divRazonamiento = document.getElementById("divRazonamiento-" + claveS + "-" + claveR);

    var divError = document.createElement("div");
    divError.setAttribute("id", "divError-" + claveS + "-" + claveR);
    divRazonamiento.appendChild(divError);

    var h3 = document.createElement("h3");
    h3.innerHTML = "Error";
    divError.appendChild(h3);

    var pError = document.createElement("p");
    pError.setAttribute("id", "error-" + claveS + "-" + claveR);
    pError.innerHTML = datos.cuestiones[claveCuestion].soluciones[claveS].razonamientos[claveR].error;
    divError.appendChild(pError);
  }


  if (datos.cuestiones[claveCuestion].soluciones[claveS].razonamientos.length === j) {
    var body = document.body;
    var hr1 = document.createElement("hr");
    body.appendChild(hr1);
    generateSolution();
  }
  generateJustifications(claveS);

  if (datos.cuestiones[claveCuestion].soluciones[claveS].razonamientos.length === j) {
    j = 0;
  }

}
