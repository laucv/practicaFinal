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

function abrirCuestion() {
  'use strict';
  var cuestion = getCuestion();

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

  var inputD = document.createElement("input");
  inputD.setAttribute("type", "checkbox");
  inputD.setAttribute("id", "disponible-" + cuestion.clave);
  inputD.checked = cuestion.disponible;
  divPregunta.appendChild(inputD);

  var labelD = document.createElement("label");
  labelD.setAttribute("for", "disponible-" + cuestion.clave);
  labelD.innerHTML = "Pregunta disponible";
  divPregunta.appendChild(labelD);

  var hr = document.createElement("hr");
  body.appendChild(hr);

  var sol;
  var i = 0;
  for (sol of cuestion.soluciones) {

    var divRespuesta = document.createElement("div");
    divRespuesta.setAttribute("class", "respuesta-" + i);
    body.appendChild(divRespuesta);

    var h3 = document.createElement("h3");
    h3.innerHTML = "Solución";
    divRespuesta.appendChild(h3);
    var pS = document.createElement("p");
    pS.innerHTML = sol.solucion;

    divRespuesta.appendChild(pS);

    var inputS = document.createElement("input");
    inputS.setAttribute("type", "checkbox");
    inputS.setAttribute("id", "correcta-" + i);
    inputS.checked = sol.correcta;
    divRespuesta.appendChild(inputS);

    var labelS = document.createElement("label");
    labelS.setAttribute("for", "correcta-" + i);
    labelS.innerHTML = "Solución correcta";
    divRespuesta.appendChild(labelS);

    var jus;
    var j = 0;

    if (sol.razonamientos !== undefined) {

      for (jus of sol.razonamientos) {

        if (jus.clave !== -1) {
          var divJustificacion = document.createElement("div");
          divJustificacion.setAttribute("class", "justificacion-" + j);
          divRespuesta.appendChild(divJustificacion);

          var h4 = document.createElement("h4");
          h4.innerHTML = "Razonamiento";
          divJustificacion.appendChild(h4);

          var pJ = document.createElement("p");
          pJ.innerHTML = jus.razonamiento;
          divJustificacion.appendChild(pJ);

          var inputR = document.createElement("input");
          inputR.setAttribute("type", "checkbox");
          inputR.setAttribute("id", "justificado-" + j);
          inputR.checked = jus.justificado;
          divJustificacion.appendChild(inputR);

          var labelR = document.createElement("label");
          labelR.setAttribute("for", "correcta-" + j);
          labelR.innerHTML = "Razonamiento justificado";
          divJustificacion.appendChild(labelR);

          if (jus.error !== undefined) {

            var error = document.createElement("div");
            error.setAttribute("id", "error-" + j);
            divJustificacion.appendChild(error);

            var h5 = document.createElement("h4");
            h5.innerHTML = "Error";
            error.appendChild(h5);


            var pE = document.createElement("p");
            pE.innerHTML = jus.error;
            error.appendChild(pE);

          }
          j++;
        }
      }

    }
    i++;
    var hr1 = document.createElement("hr");
    body.appendChild(hr1);
  }
  var divBoton = document.createElement("div");
  divBoton.setAttribute("class", "botones");
  body.appendChild(divBoton);

  var boton = document.createElement("a");
  boton.setAttribute("href", "cuestionesMaestro.html");
  boton.setAttribute("class", "btn btn-info");
  boton.innerHTML = "Volver";
  divBoton.appendChild(boton);

}
