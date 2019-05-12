var datos = JSON.parse(window.localStorage.getItem("datos"));
var claveRazonamiento = 0;
var claveSolucion;

function getCuestion() {
  'use strict';
  var cuestion;
  var url = window.location.href.split("=");
  var clave = url[url.length - 1];
  for (cuestion of datos.cuestiones) {
    if (cuestion.clave == clave) {
      return cuestion;
    }
  }
  return null;
}

function modificarCuestion() {
  'use strict';
  var cuestion = getCuestion();
  var claveSolucion = nextSolutionValue(cuestion.clave);
  var body = document.body;

  var h1 = document.createElement("h1");
  h1.innerHTML = "Pregunta";
  body.appendChild(h1);

  var divPregunta = document.createElement("div");
  divPregunta.setAttribute("id", "divPregunta-" + cuestion.clave);
  body.appendChild(divPregunta);

  var pregunta = document.createElement("textarea");
  pregunta.setAttribute("cols", "45");
  pregunta.innerHTML = cuestion.pregunta;
  pregunta.setAttribute("id", "pregunta-" + cuestion.clave)
  divPregunta.appendChild(pregunta);

  var br = document.createElement("br");
  divPregunta.appendChild(br);

  var inputD = document.createElement("input");
  inputD.setAttribute("type", "checkbox");
  inputD.setAttribute("id", "disponible-" + cuestion.clave);
  inputD.setAttribute("onchange", "modificarDisponible(" + cuestion.clave + ");");
  inputD.checked = cuestion.disponible;
  divPregunta.appendChild(inputD);

  var labelD = document.createElement("label");
  labelD.setAttribute("for", "disponible-" + cuestion.clave);
  labelD.innerHTML = "Pregunta disponible";
  divPregunta.appendChild(labelD);

  var sal = document.createElement("br");
  divPregunta.appendChild(sal);

  var editarEnunciado = document.createElement("button");
  editarEnunciado.setAttribute("class", "btn btn-normal");
  editarEnunciado.setAttribute("onclick", "modificarEnunciado(" + cuestion.clave + ");");
  editarEnunciado.innerHTML = "Editar enunciado";
  divPregunta.appendChild(editarEnunciado);

  var hr = document.createElement("hr");
  body.appendChild(hr);

  var salto = document.createElement("br");
  divPregunta.appendChild(salto);
  var salt = document.createElement("br");
  divPregunta.appendChild(salt);

  var botonAdd = document.createElement("button");
  botonAdd.setAttribute("id", "botonAñadir-" + claveSolucion);
  botonAdd.setAttribute("class", "btn btn-success");
  botonAdd.setAttribute("onclick", "addSolution(" + cuestion.clave + ", " + claveSolucion + ");");
  botonAdd.innerHTML = "Añadir solución";
  divPregunta.appendChild(botonAdd);

  var sol;
  var i = 0;
  for (sol of cuestion.soluciones) {

    var divRespuesta = document.createElement("div");
    divRespuesta.setAttribute("id", "divSolucion-" + i);
    divRespuesta.setAttribute("class", "respuesta-" + i);
    body.appendChild(divRespuesta);

    var h3 = document.createElement("h3");
    h3.innerHTML = "Solución";
    divRespuesta.appendChild(h3);

    var editarSolucion = document.createElement("button");
    editarSolucion.setAttribute("class", "btn btn-normal");
    editarSolucion.setAttribute("onclick", "modificarSolucion(" + cuestion.clave + ", " + i + ");");
    editarSolucion.innerHTML = "Editar solución";
    divRespuesta.appendChild(editarSolucion);

    var eliminarSolucion = document.createElement("button");
    eliminarSolucion.setAttribute("class", "btn btn-danger");
    eliminarSolucion.setAttribute("onclick", "deleteSolucionData(" + cuestion.clave + ", " + i + ");");
    eliminarSolucion.innerHTML = "Eliminar solución";
    divRespuesta.appendChild(eliminarSolucion);

    var pS = document.createElement("div");
    pS.setAttribute("id", "pSolucion-" + i);
    divRespuesta.appendChild(pS);

    var spanS = document.createElement("textarea");
    spanS.setAttribute("cols", "45");
    spanS.setAttribute("id", "sSolucion-" + i);
    spanS.innerHTML = sol.solucion;
    pS.appendChild(spanS);

    var inputS = document.createElement("input");
    inputS.setAttribute("type", "checkbox");
    inputS.setAttribute("id", "correcta-" + i);
    inputS.setAttribute("onchange", "modificarCorrecta(" + cuestion.clave + ", " + i + ");");
    inputS.checked = sol.correcta;
    divRespuesta.appendChild(inputS);

    var labelS = document.createElement("label");
    labelS.setAttribute("for", "correcta-" + i);
    labelS.innerHTML = "Solución correcta";
    divRespuesta.appendChild(labelS);

    var br = document.createElement("br");
    divRespuesta.appendChild(br);

    if (sol.correcta === false) {
      var botonRazonamiento = document.createElement("button");
      botonRazonamiento.setAttribute("id", "botonRazonamiento-" + i);
      botonRazonamiento.setAttribute("class", "btn btn-info");
      botonRazonamiento.setAttribute("onclick", "addJustification(" + cuestion.clave + ", " + i + ");");
      botonRazonamiento.innerHTML = "Añadir razonamiento";
      divRespuesta.appendChild(botonRazonamiento);
    }

    var jus;
    var j = 0;

    if (sol.razonamientos !== undefined) {

      for (jus of sol.razonamientos) {

        if (jus.clave >= 0) {
          var divJustificacion = document.createElement("div");
          divJustificacion.setAttribute("id", "divJustificacion-" + i + "-" + j);
          divRespuesta.appendChild(divJustificacion);

          var h4 = document.createElement("h4");
          h4.innerHTML = "Razonamiento";
          divJustificacion.appendChild(h4);

          var editarRazonamiento = document.createElement("button");
          editarRazonamiento.setAttribute("class", "btn btn-normal");
          editarRazonamiento.setAttribute("onclick", "modificarJustificacion(" + cuestion.clave + ", " + i + ", " + j + ");");
          editarRazonamiento.innerHTML = "Editar razonamiento";
          divJustificacion.appendChild(editarRazonamiento);

          var eliminarRazonamiento = document.createElement("button");
          eliminarRazonamiento.setAttribute("class", "btn btn-danger");
          eliminarRazonamiento.setAttribute("onclick", "deleteJustificationData(" + cuestion.clave + ", " + i + ", " + j + ");");
          eliminarRazonamiento.innerHTML = "Eliminar razonamiento";
          divJustificacion.appendChild(eliminarRazonamiento);

          var pJ = document.createElement("div");
          pJ.setAttribute("id", "pJustificacion-" + i + "-" + j);
          divJustificacion.appendChild(pJ);

          var spanJ = document.createElement("textarea");
          spanJ.setAttribute("cols", "45");
          spanJ.setAttribute("id", "sJustificacion-" + i + "-" + j);
          spanJ.innerHTML = jus.razonamiento;
          pJ.appendChild(spanJ);

          var inputR = document.createElement("input");
          inputR.setAttribute("type", "checkbox");
          inputR.setAttribute("id", "justificado-" + +i + "-" + j);
          inputR.setAttribute("onchange", "modificarJustificada(" + cuestion.clave + ", " + i + ", " + j + ");");
          inputR.checked = jus.justificado;
          divJustificacion.appendChild(inputR);

          var labelR = document.createElement("label");
          labelR.setAttribute("for", "justificado-" + i + "-" + j);
          labelR.innerHTML = "Razonamiento justificado";
          divJustificacion.appendChild(labelR);

          claveRazonamiento++;

          if (jus.justificado === false) {

            if (jus.error !== "") {

              var error = document.createElement("div");
              error.setAttribute("id", "error-" + i + "-" + j);
              divJustificacion.appendChild(error);

              var h5 = document.createElement("h4");
              h5.innerHTML = "Error";
              error.appendChild(h5);

              var editarError = document.createElement("button");
              editarError.setAttribute("class", "btn btn-normal");
              editarError.setAttribute("onclick", "modificarError(" + cuestion.clave + ", " + i + ", " + j + ");");
              editarError.innerHTML = "Editar error";
              error.appendChild(editarError);

              var eliminarError = document.createElement("button");
              eliminarError.setAttribute("class", "btn btn-danger");
              eliminarError.setAttribute("onclick", "deleteErrorData(" + cuestion.clave + ", " + i + ", " + j + ");");
              eliminarError.innerHTML = "Eliminar error";
              error.appendChild(eliminarError);

              var pE = document.createElement("div");
              pE.setAttribute("id", "pError-" + i + "-" + j);
              error.appendChild(pE);

              var spanE = document.createElement("textarea");
              spanE.setAttribute("id", "sError-" + i + "-" + j);
              spanE.setAttribute("cols", "45");
              spanE.innerHTML = jus.error;
              pE.appendChild(spanE);

            } else {

              var estilo = document.createElement("br");
              divJustificacion.appendChild(estilo);

              var botonError = document.createElement("button");
              botonError.setAttribute("id", "botonError-" + i + "-" + j);
              botonError.setAttribute("class", "btn btn-info");
              botonError.setAttribute("onclick", "addError(" + cuestion.clave + ", " + i + ", " + j + ");");
              botonError.innerHTML = "Añadir error";
              divJustificacion.appendChild(botonError);

            }
          }
          j++;
        }
      }

    }
    imprimirPropuestaRazonamientos(i);
    i++;
    var hr1 = document.createElement("hr");
    body.appendChild(hr1);
    claveSolucion++;
  }
  var divBoton = document.createElement("div");
  divBoton.setAttribute("class", "botones");
  body.appendChild(divBoton);

  var botonGuardar = document.createElement("button");
  botonGuardar.setAttribute("class", "btn btn-success");
  botonGuardar.setAttribute("onclick", "comprobarPregunta()");
  botonGuardar.innerHTML = "Actualizar pregunta";
  divBoton.appendChild(botonGuardar);

  var botonSalir = document.createElement("button");
  botonSalir.setAttribute("class", "btn btn-danger");
  botonSalir.setAttribute("onclick", "comprobarPregunta()");
  botonSalir.innerHTML = "Cerrar pregunta";
  divBoton.appendChild(botonSalir);

  imprimirPropuestaSoluciones();
}

function getCuestionClave(datos, clave) {
  'use strict';
  var cuestion;
  for (cuestion of datos.cuestiones) {
    if (cuestion.clave == clave) {
      return cuestion;
    }
  }
  return null;
}

function modificarSolucion(claveCuestion, claveS) {
  var cuestion = getCuestionClave(datos, claveCuestion);

  var nuevaSolucion = document.getElementById("sSolucion-" + claveS).value;

  cuestion.soluciones[claveS].solucion = nuevaSolucion;

  window.localStorage.setItem("datos", JSON.stringify(datos));
  location.reload();
}

function modificarJustificacion(claveCuestion, claveS, claveJ) {
  var cuestion = getCuestionClave(datos, claveCuestion);

  var nuevaJustificacion = document.getElementById("sJustificacion-" + claveS + "-" + claveJ).value;

  cuestion.soluciones[claveS].razonamientos[claveJ].razonamiento = nuevaJustificacion;

  window.localStorage.setItem("datos", JSON.stringify(datos));
  location.reload();
}

function modificarError(claveCuestion, claveS, claveJ) {
  var cuestion = getCuestionClave(datos, claveCuestion);

  var nuevoError = document.getElementById("sError-" + claveS + "-" + claveJ).value;

  cuestion.soluciones[claveS].razonamientos[claveJ].error = nuevoError;

  window.localStorage.setItem("datos", JSON.stringify(datos));
  location.reload();
}

function modificarDisponible(clave) {
  var cuestion = getCuestionClave(datos, clave);

  var nuevoDisponible = document.getElementById("disponible-" + clave).checked;

  cuestion.disponible = nuevoDisponible;

  window.localStorage.setItem("datos", JSON.stringify(datos));
  location.reload();
}

function modificarCorrecta(claveCuestion, claveS) {
  var cuestion = getCuestionClave(datos, claveCuestion);

  var nuevoCorrecto = document.getElementById("correcta-" + claveS).checked;

  cuestion.soluciones[claveS].correcta = nuevoCorrecto;

  window.localStorage.setItem("datos", JSON.stringify(datos));
  location.reload();
}

function modificarJustificada(claveCuestion, claveS, claveJ) {
  var cuestion = getCuestionClave(datos, claveCuestion);

  var nuevoJustificado = document.getElementById("justificado-" + claveS + "-" + claveJ).checked;

  cuestion.soluciones[claveS].razonamientos[claveJ].justificado = nuevoJustificado;

  window.localStorage.setItem("datos", JSON.stringify(datos));

  location.reload();

}

function addJustification(claveCuestion, claveS) {

  var divSolucionCero = document.getElementById("divSolucion-" + claveS);

  var div = document.createElement("div");
  div.setAttribute("id", "divRazonamiento-" + claveS + "-" + claveRazonamiento);
  divSolucionCero.appendChild(div);

  var labelRazonamiento = document.createElement("label");
  labelRazonamiento.setAttribute("for", "razonamiento-" + claveS + "-" + claveRazonamiento);
  labelRazonamiento.innerHTML = "Razonamiento";
  div.appendChild(labelRazonamiento);

  var inputSolucion = document.createElement("input");
  inputSolucion.setAttribute("id", "razonamiento-" + claveS + "-" + claveRazonamiento);
  inputSolucion.setAttribute("type", "text");
  inputSolucion.setAttribute("class", "form-control");
  inputSolucion.setAttribute("placeholder", "Solución");
  div.appendChild(inputSolucion);

  var checkboxSolucion = document.createElement("input");
  checkboxSolucion.setAttribute("type", "checkbox");
  checkboxSolucion.setAttribute("id", "justificado-" + claveS + "-" + claveRazonamiento);
  div.appendChild(checkboxSolucion);

  var labelCheckboxSolucion = document.createElement("label");
  labelCheckboxSolucion.setAttribute("for", "justificado-" + claveS + "-" + claveRazonamiento);
  labelCheckboxSolucion.innerHTML = "Razonamiento justificado";
  div.appendChild(labelCheckboxSolucion);

  var saltar = document.createElement("br");
  div.appendChild(saltar);

  var botonRazonamiento = document.createElement("button");
  botonRazonamiento.setAttribute("id", "botonRazonamientoGuardar");
  botonRazonamiento.setAttribute("class", "btn btn-success");
  botonRazonamiento.setAttribute("onclick", "saveJustification(" + claveCuestion + ", " + claveS + ");");
  botonRazonamiento.innerHTML = "Guardar razonamiento";
  div.appendChild(botonRazonamiento);

  claveRazonamiento++;
}

function saveJustification(claveCuestion, claveS) {
  var datos = JSON.parse(window.localStorage.getItem("datos"));
  var claveJustificacion = nextJustificationValue(claveCuestion, claveS);
  var clave = claveRazonamiento - 1;

  if (datos.cuestiones[claveCuestion].soluciones[claveS].razonamientos[0].clave == -1) {
    datos.cuestiones[claveCuestion].soluciones[claveS].razonamientos.pop();
  }

  var razonamiento = document.getElementById("razonamiento-" + claveS + "-" + clave).value;
  var justificado = document.getElementById("justificado-" + claveS + "-" + clave).checked;


  datos.cuestiones[claveCuestion].soluciones[claveS].razonamientos.push({
    clave: claveJustificacion,
    razonamiento: razonamiento,
    justificado: justificado,
    error: ""
  });


  window.localStorage.setItem("datos", JSON.stringify(datos));
  location.reload();

}

function nextSolutionValue(claveCuestion) {
  var datos = JSON.parse(window.localStorage.getItem("datos"));
  if (datos.cuestiones[claveCuestion].soluciones.length == 0) {
    return 0;
  } else {
    return datos.cuestiones[claveCuestion].soluciones.slice(-1)[0].clave + 1;
  }
}

function nextJustificationValue(claveCuestion, claveS) {
  var datos = JSON.parse(window.localStorage.getItem("datos"));
  if (datos.cuestiones[claveCuestion].soluciones[claveS].razonamientos.length == 0) {
    return 0;
  } else {
    return datos.cuestiones[claveCuestion].soluciones[claveS].razonamientos.slice(-1)[0].clave + 1;
  }
}

function saveSolution(claveCuestion) {
  var datos = JSON.parse(window.localStorage.getItem("datos"));
  var i = nextSolutionValue(claveCuestion);

  if (datos.cuestiones[claveCuestion].soluciones[0].clave == -1) {
    datos.cuestiones[claveCuestion].soluciones.pop();
  }


  var solucion = document.getElementById("sSolucion-" + i).value;
  var correcta = document.getElementById("correcta-" + i).checked;

  datos.cuestiones[claveCuestion].soluciones.push({
    clave: i,
    solucion: solucion,
    propuestaSolucion: [],
    correcta: correcta,
    razonamientos: [{
      clave: -1
      }]
  });


  window.localStorage.setItem("datos", JSON.stringify(datos));
  location.reload();

}

function addSolution(claveCuestion, claveSol) {
  var divSolucionCero = document.getElementById("divPregunta-" + claveCuestion);

  var div = document.createElement("div");
  div.setAttribute("id", "divSolucion-" + claveSol);
  divSolucionCero.appendChild(div);

  var labelSolucion = document.createElement("label");
  labelSolucion.setAttribute("for", "solucion-" + claveSol);
  labelSolucion.innerHTML = "Solucion";
  div.appendChild(labelSolucion);

  var inputSolucion = document.createElement("input");
  inputSolucion.setAttribute("id", "solucion-" + claveSol);
  inputSolucion.setAttribute("type", "text");
  inputSolucion.setAttribute("class", "form-control");
  inputSolucion.setAttribute("placeholder", "Solución");
  div.appendChild(inputSolucion);

  var checkboxSolucion = document.createElement("input");
  checkboxSolucion.setAttribute("type", "checkbox");
  checkboxSolucion.setAttribute("id", "correcta-" + claveSol);
  div.appendChild(checkboxSolucion);

  var labelCheckboxSolucion = document.createElement("label");
  labelCheckboxSolucion.setAttribute("for", "correcta-" + claveSol);
  labelCheckboxSolucion.innerHTML = "Solución correcta";
  div.appendChild(labelCheckboxSolucion);

  var br = document.createElement("br");
  div.appendChild(br);

  var botonData = document.createElement("button");
  botonData.setAttribute("id", "botonAddDataSolution-" + claveSol);
  botonData.setAttribute("class", "btn btn-success");
  botonData.setAttribute("onclick", "addSolutionData(" + claveCuestion + ", " + nextSolutionValue(claveCuestion) + ");");
  botonData.innerHTML = "Añadir solución";
  div.appendChild(botonData);

  var botonEliminar = document.createElement("button");
  botonEliminar.setAttribute("id", "botonEliminar-" + claveSol);
  botonEliminar.setAttribute("class", "btn btn-danger");
  botonEliminar.setAttribute("onclick", "deleteSolution(" + claveSol + ");");
  botonEliminar.innerHTML = "Eliminar solución";
  div.appendChild(botonEliminar);

  claveSolucion++;

  var boton = document.getElementById("botonAñadir-" + claveSol);
  divSolucionCero.removeChild(boton);
}

function addSolutionData(claveCuestion, claveSol) {
  var datos = JSON.parse(window.localStorage.getItem("datos"));
  var solucion = document.getElementById("solucion-" + claveSol).value;
  var correcta = document.getElementById("correcta-" + claveSol).checked;

  datos.cuestiones[claveCuestion].soluciones.push({
    clave: claveSol,
    solucion: solucion,
    propuestaRazonamiento: [],
    correcta: correcta,
    razonamientos: [{
      clave: -1
      }]
  });


  window.localStorage.setItem("datos", JSON.stringify(datos));
  location.reload();
}

function deleteSolution(clave) {

  var divSolucion = document.getElementById("divSolucion-" + clave);
  var divPregunta = divSolucion.parentElement;
  divPregunta.removeChild(divSolucion);
  claveSolucion--;
  location.reload();

}

function deleteSolucionData(claveCuestion, claveSol) {
  var datos = JSON.parse(window.localStorage.getItem("datos"));

  for (var i = 0; i < datos.cuestiones[claveCuestion].soluciones.length; i++) {

    if (datos.cuestiones[claveCuestion].soluciones[i].clave == claveSol) {
      datos.cuestiones[claveCuestion].soluciones.splice(i, 1);
      for (var j = i; j < datos.cuestiones[claveCuestion].soluciones.length; j++) {
        datos.cuestiones[claveCuestion].soluciones[j].clave = datos.cuestiones[claveCuestion].soluciones[j].clave - 1;
      }
    }
  }
  window.localStorage.setItem("datos", JSON.stringify(datos));
  claveSolucion--;
  location.reload();

}

function deleteJustificationData(claveCuestion, claveSol, claveJus) {
  var datos = JSON.parse(window.localStorage.getItem("datos"));

  for (var i = 0; i < datos.cuestiones[claveCuestion].soluciones[claveSol].razonamientos.length; i++) {

    if (datos.cuestiones[claveCuestion].soluciones[claveSol].razonamientos[i].clave == claveJus) {
      datos.cuestiones[claveCuestion].soluciones[claveSol].razonamientos.splice(i, 1);
      for (var j = i; j < datos.cuestiones[claveCuestion].soluciones[claveSol].razonamientos.length; j++) {
        datos.cuestiones[claveCuestion].soluciones[claveSol].razonamientos[j].clave = datos.cuestiones[claveCuestion].soluciones[claveSol].razonamientos[j].clave - 1;
      }
    }
  }

  if (datos.cuestiones[claveCuestion].soluciones[claveSol].razonamientos.length == 0) {
    datos.cuestiones[claveCuestion].soluciones[claveSol].razonamientos.push({
      clave: -1
    });
  }
  window.localStorage.setItem("datos", JSON.stringify(datos));
  claveRazonamiento--;
  location.reload();
}

function deleteErrorData(claveCuestion, claveSol, claveJustificacion) {
  var datos = JSON.parse(window.localStorage.getItem("datos"));
  datos.cuestiones[claveCuestion].soluciones[claveSol].razonamientos[claveJustificacion].error = "";
  window.localStorage.setItem("datos", JSON.stringify(datos));
  location.reload();
}

function addError(claveCuestion, claveSol, claveJus) {

  var divSolucionCero = document.getElementById("divJustificacion-" + claveSol + "-" + claveJus);

  var div = document.createElement("div");
  div.setAttribute("id", "divError-" + claveSol + "-" + claveJus);
  divSolucionCero.appendChild(div);

  var labelRazonamiento = document.createElement("label");
  labelRazonamiento.setAttribute("for", "error-" + claveSol + "-" + claveJus);
  labelRazonamiento.innerHTML = "Error";
  div.appendChild(labelRazonamiento);

  var inputSolucion = document.createElement("input");
  inputSolucion.setAttribute("id", "error-" + claveSol + "-" + claveJus);
  inputSolucion.setAttribute("type", "text");
  inputSolucion.setAttribute("class", "form-control");
  inputSolucion.setAttribute("placeholder", "Error");
  div.appendChild(inputSolucion);

  var saltar = document.createElement("br");
  div.appendChild(saltar);

  var botonRazonamiento = document.createElement("button");
  botonRazonamiento.setAttribute("id", "botonEliminarGuardar");
  botonRazonamiento.setAttribute("class", "btn btn-success");
  botonRazonamiento.setAttribute("onclick", "saveError(" + claveCuestion + ", " + claveSol + ", " + claveJus + ");");
  botonRazonamiento.innerHTML = "Guardar error";
  div.appendChild(botonRazonamiento);

}

function saveError(claveCuestion, claveSol, claveJus) {
  var datos = JSON.parse(window.localStorage.getItem("datos"));
  var error = document.getElementById("error-" + claveSol + "-" + claveJus).value;

  datos.cuestiones[claveCuestion].soluciones[claveSol].razonamientos[claveJus].error = error;

  window.localStorage.setItem("datos", JSON.stringify(datos));
  location.reload();
}

function comprobarPregunta() {
  var href = "cuestionesMaestro.html";
  var cuestion = getCuestion();
  var nSoluciones;

  if (cuestion.disponible === true && cuestion.soluciones.length === 0) {
    alert("Para que la pregunta esté disponible tiene que existir al menos una solución");
    href = "modificarPregunta.html?clave=" + cuestion.clave;
  }
  if (cuestion.soluciones.length !== 0) {
    for (nSoluciones = 0; nSoluciones < cuestion.soluciones.length; nSoluciones++) {
      comprobarSolucion(nSoluciones);
    }
  } else {
    location.href = href;

  }
}

function comprobarSolucion(claveS) {
  var nJustificaciones;
  var href = "cuestionesMaestro.html";
  var cuestion = getCuestion();

  if (cuestion.soluciones[claveS].correcta === false && cuestion.soluciones[claveS].razonamientos[0].clave === -1) {
    alert("Si una solución es incorrecta necesita tener un razonamiento, por favor revise la solución '" + cuestion.soluciones[claveS].solucion + "'");
    href = "modificarPregunta.html?clave=" + cuestion.clave;
  }

  if (cuestion.soluciones[claveS].razonamientos[0].clave !== -1) {
    for (nJustificaciones = 0; nJustificaciones < cuestion.soluciones[claveS].razonamientos.length; nJustificaciones++) {
      comprobarRazonamiento(claveS, nJustificaciones);
    }
  } else {
    location.href = href;
  }
}

function comprobarRazonamiento(claveS, claveR) {
  var href = "cuestionesMaestro.html";
  var cuestion = getCuestion();

  if (cuestion.soluciones[claveS].razonamientos[claveR].justificado === false && cuestion.soluciones[claveS].razonamientos[claveR].error === "") {
    alert("Si un razonamiento es injustificado necesita tener un error, por favor revise el razonamiento '" + cuestion.soluciones[claveS].razonamientos[claveR].razonamiento + "'");
    href = "modificarPregunta.html?clave=" + cuestion.clave;
  }
  location.href = href;
}

function modificarEnunciado(claveCuestion) {
  var pregunta = document.getElementById("pregunta-" + claveCuestion).value;
  var datos = JSON.parse(window.localStorage.getItem("datos"));

  datos.cuestiones[claveCuestion].pregunta = pregunta;

  window.localStorage.setItem("datos", JSON.stringify(datos));
  location.reload();

}

function imprimirPropuestaSoluciones() {
  var claveCuestion = getCuestion().clave;
  var propuestaSolucion = datos.cuestiones[claveCuestion].propuestaSolucion;
  var i;

  for (i = 0; i < propuestaSolucion.length; i++) {
    var divPregunta = document.getElementById("divPregunta-" + claveCuestion);

    var divPropuestaSolucion = document.createElement("div");
    divPropuestaSolucion.setAttribute("id", "divPropuestaSolucion-" + i);
    divPregunta.appendChild(divPropuestaSolucion);

    var h4 = document.createElement("h4");
    h4.innerHTML = "Propuesta solución";
    divPropuestaSolucion.appendChild(h4);

    var pPropuestaSolucion = document.createElement("p");
    pPropuestaSolucion.setAttribute("id", "propuestaSolucion-" + i);
    pPropuestaSolucion.innerHTML = propuestaSolucion[i].solucion;
    divPropuestaSolucion.appendChild(pPropuestaSolucion);

    var inputS = document.createElement("input");
    inputS.setAttribute("type", "checkbox");
    inputS.setAttribute("id", "propuestaCorrecta-" + i);
    divPropuestaSolucion.appendChild(inputS);

    var labelS = document.createElement("label");
    labelS.setAttribute("for", "propuestaCorrecta-" + i);
    labelS.innerHTML = "Solución correcta";
    divPropuestaSolucion.appendChild(labelS);

    var divBoton = document.createElement("div");
    divBoton.setAttribute("class", "botones");
    divPropuestaSolucion.appendChild(divBoton);

    var boton = document.createElement("button");
    boton.setAttribute("onclick", "corregirSolucion(" + i + ");");
    boton.setAttribute("class", "btn btn-success");
    boton.innerHTML = "Corregir solución";
    divBoton.appendChild(boton);
  }
}

function corregirSolucion(claveS) {
  var claveCuestion = getCuestion().clave;
  var propuestaSolucion = datos.cuestiones[claveCuestion].propuestaSolucion[claveS];
  var correcta = document.getElementById("propuestaCorrecta-" + claveS).checked;
  var claveSol = nextSolutionValue(claveCuestion);
  var clavePropuesta = propuestaSolucion.clavePropuesta;

  datos.cuestiones[claveCuestion].soluciones.push({
    clave: claveSol,
    solucion: propuestaSolucion.solucion,
    propuestaRazonamiento: [],
    correcta: correcta,
    razonamientos: [{
      clave: -1
      }]
  });

  for (var i = 0; i < datos.cuestiones[claveCuestion].propuestaSolucion.length; i++) {
    if (datos.cuestiones[claveCuestion].propuestaSolucion[i].clavePropuesta == clavePropuesta) {
      datos.cuestiones[claveCuestion].propuestaSolucion.splice(i, 1);
      for (var j = i; j < datos.cuestiones[claveCuestion].propuestaSolucion.length; j++) {
        datos.cuestiones[claveCuestion].propuestaSolucion[j].clave = datos.cuestiones[claveCuestion].propuestaSolucion[j].clave - 1;
      }
    }
  }

  window.localStorage.setItem("datos", JSON.stringify(datos));
  location.reload();
}

function imprimirPropuestaRazonamientos(claveS) {
  var claveCuestion = getCuestion().clave;
  var propuestaRazonamiento = datos.cuestiones[claveCuestion].soluciones[claveS].propuestaRazonamiento;
  var i;

  for (i = 0; i < propuestaRazonamiento.length; i++) {
    var divPregunta = document.getElementById("divSolucion-" + claveS);

    var divPropuestaSolucion = document.createElement("div");
    divPropuestaSolucion.setAttribute("id", "divPropuestaRazonamiento-" + claveS + "-" + i);
    divPregunta.appendChild(divPropuestaSolucion);

    var h4 = document.createElement("h4");
    h4.innerHTML = "Propuesta razonamiento";
    divPropuestaSolucion.appendChild(h4);

    var pPropuestaSolucion = document.createElement("p");
    pPropuestaSolucion.setAttribute("id", "propuestaRazonamiento-" + claveS + "-" + i);
    pPropuestaSolucion.innerHTML = propuestaRazonamiento[i].razonamiento;
    divPropuestaSolucion.appendChild(pPropuestaSolucion);

    var inputS = document.createElement("input");
    inputS.setAttribute("type", "checkbox");
    inputS.setAttribute("id", "propuestaJustificado-" + claveS + "-" + i);
    divPropuestaSolucion.appendChild(inputS);

    var labelS = document.createElement("label");
    labelS.setAttribute("for", "propuestaJustificado-" + claveS + "-" + i);
    labelS.innerHTML = "Razonamiento justificado";
    divPropuestaSolucion.appendChild(labelS);

    var divBoton = document.createElement("div");
    divBoton.setAttribute("class", "botones");
    divPropuestaSolucion.appendChild(divBoton);

    var boton = document.createElement("button");
    boton.setAttribute("onclick", "corregirRazonamiento(" + claveS + ", " + i + ");");
    boton.setAttribute("class", "btn btn-success");
    boton.innerHTML = "Corregir razonamiento";
    divBoton.appendChild(boton);
  }
}

function corregirRazonamiento(claveS, claveR) {
  var claveCuestion = getCuestion().clave;
  var claveJustificacion = nextJustificationValue(claveCuestion, claveS);
  var propuestaRazonamiento = datos.cuestiones[claveCuestion].soluciones[claveS].propuestaRazonamiento[claveR];
  var justificado = document.getElementById("propuestaJustificado-" + claveS + "-" + claveR).checked;
  var clavePropuesta = propuestaRazonamiento.clavePropuesta;

  datos.cuestiones[claveCuestion].soluciones[claveS].razonamientos.push({
    clave: claveJustificacion,
    razonamiento: propuestaRazonamiento.razonamiento,
    justificado: justificado,
    error: "",
    razonamientos: [{
      clave: -1
      }]
  });

  for (var i = 0; i < datos.cuestiones[claveCuestion].soluciones[claveS].propuestaRazonamiento.length; i++) {
    if (datos.cuestiones[claveCuestion].soluciones[claveS].propuestaRazonamiento[i].clavePropuesta == clavePropuesta) {
      datos.cuestiones[claveCuestion].soluciones[claveS].propuestaRazonamiento.splice(i, 1);
      for (var j = i; j < datos.cuestiones[claveCuestion].soluciones[claveS].propuestaRazonamiento.length; j++) {
        datos.cuestiones[claveCuestion].soluciones[claveS].propuestaRazonamiento[j].clave = datos.cuestiones[claveCuestion].soluciones[claveS].propuestaRazonamiento[j].clave - 1;
      }
    }
  }

  window.localStorage.setItem("datos", JSON.stringify(datos));
  location.reload();
}
