getCuestiones();
getSoluciones();
getRazonamientos();

var datos = JSON.parse(window.sessionStorage.getItem("cuestiones"));
var soluciones = JSON.parse(window.sessionStorage.getItem("soluciones"));
var claveRazonamiento = 0;

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

function getSolucion(idSolucion) {

    for (let r = 0; r < soluciones.soluciones.length; r++) {
        if (soluciones.soluciones[r].solucion.idSolucion === idSolucion) {
            return soluciones.soluciones[r];
        }
    }
}

function modificarCuestion() {
    'use strict';
    var idCuestion = getIdCuestion();
    var cuestion = JSON.parse(window.sessionStorage.getItem("cuestion"));
    var claveSolucion = cuestion.cuestion.soluciones.length;

    var body = document.body;

    var h1 = document.createElement("h1");
    h1.innerHTML = "Pregunta";
    body.appendChild(h1);

    var divPregunta = document.createElement("div");
    divPregunta.setAttribute("id", "divPregunta-" + idCuestion);
    body.appendChild(divPregunta);

    var pregunta = document.createElement("textarea");
    pregunta.setAttribute("cols", "45");
    pregunta.innerHTML = cuestion.cuestion.enunciadoDescripcion;
    pregunta.setAttribute("id", "pregunta-" + idCuestion)
    divPregunta.appendChild(pregunta);

    var br = document.createElement("br");
    divPregunta.appendChild(br);

    var inputD = document.createElement("input");
    inputD.setAttribute("type", "checkbox");
    inputD.setAttribute("id", "disponible-" + idCuestion);
    inputD.checked = cuestion.cuestion.enunciadoDisponible;
    divPregunta.appendChild(inputD);

    var labelD = document.createElement("label");
    labelD.setAttribute("for", "disponible-" + idCuestion);
    labelD.innerHTML = "Pregunta disponible";
    divPregunta.appendChild(labelD);

    var sal = document.createElement("br");
    divPregunta.appendChild(sal);

    var hr = document.createElement("hr");
    body.appendChild(hr);

    var salto = document.createElement("br");
    divPregunta.appendChild(salto);
    var salt = document.createElement("br");
    divPregunta.appendChild(salt);

    var botonAdd = document.createElement("button");
    botonAdd.setAttribute("id", "botonAñadir-" + claveSolucion);
    botonAdd.setAttribute("class", "btn btn-success");
    botonAdd.setAttribute("onclick", "addSolution(" + idCuestion + ", " + claveSolucion + ");");
    botonAdd.innerHTML = "Añadir solución";
    divPregunta.appendChild(botonAdd);

    let sol;
    let idSolucion;

    for (let i = 0; i < cuestion.cuestion.soluciones.length; i++) {

        sol = getSolucion(cuestion.cuestion.soluciones[i]);
        idSolucion = sol.solucion.idSolucion;
        var divRespuesta = document.createElement("div");

        divRespuesta.setAttribute("id", "divSolucion-" + idSolucion);
        divRespuesta.setAttribute("class", "respuesta-" + idSolucion);
        body.appendChild(divRespuesta);

        var h3 = document.createElement("h3");
        h3.innerHTML = "Solución";
        divRespuesta.appendChild(h3);

        var editarSolucion = document.createElement("button");
        editarSolucion.setAttribute("class", "btn btn-normal");
        editarSolucion.setAttribute("onclick", "putSolucion(" + idSolucion + ");");
        editarSolucion.innerHTML = "Editar solución";
        divRespuesta.appendChild(editarSolucion);

        var eliminarSolucion = document.createElement("button");
        eliminarSolucion.setAttribute("class", "btn btn-danger");
        eliminarSolucion.setAttribute("onclick", "deleteSolucion(" + idSolucion + ");");
        eliminarSolucion.innerHTML = "Eliminar solución";
        divRespuesta.appendChild(eliminarSolucion);

        var pS = document.createElement("div");
        pS.setAttribute("id", "pSolucion-" + idSolucion);
        divRespuesta.appendChild(pS);

        var spanS = document.createElement("textarea");
        spanS.setAttribute("cols", "45");
        spanS.setAttribute("id", "sSolucion-" + idSolucion);
        spanS.innerHTML = sol.solucion.textoSolucion;
        pS.appendChild(spanS);

        var inputS = document.createElement("input");
        inputS.setAttribute("type", "checkbox");
        inputS.setAttribute("id", "correcta-" + idSolucion);
        inputS.checked = sol.solucion.solucionCorrecta;
        divRespuesta.appendChild(inputS);

        var labelS = document.createElement("label");
        labelS.setAttribute("for", "correcta-" + idSolucion);
        labelS.innerHTML = "Solución correcta";
        divRespuesta.appendChild(labelS);

        var br = document.createElement("br");
        divRespuesta.appendChild(br);

        if (sol.solucion.solucionCorrecta === false) {
            var botonRazonamiento = document.createElement("button");
            botonRazonamiento.setAttribute("id", "botonRazonamiento-" + idSolucion);
            botonRazonamiento.setAttribute("class", "btn btn-info");
            botonRazonamiento.setAttribute("onclick", "addJustification(" + idCuestion + ", " + idSolucion + ");");
            botonRazonamiento.innerHTML = "Añadir razonamiento";
            divRespuesta.appendChild(botonRazonamiento);
        }
        var razonamientos = JSON.parse(window.sessionStorage.getItem("razonamientos"));

        if (razonamientos !== null) {
            for (let j = 0; j < razonamientos.razonamientos.length; j++) {

                if (parseInt(razonamientos.razonamientos[j].razonamiento.solucion) === idSolucion) {

                    let idRazonamiento = razonamientos.razonamientos[j].razonamiento.idRazonamiento;
                    let jus = razonamientos.razonamientos[j];

                    var divJustificacion = document.createElement("div");
                    divJustificacion.setAttribute("id", "divJustificacion-" + idSolucion + "-" + idRazonamiento);
                    divRespuesta.appendChild(divJustificacion);

                    var h4 = document.createElement("h4");
                    h4.innerHTML = "Razonamiento";
                    divJustificacion.appendChild(h4);

                    var editarRazonamiento = document.createElement("button");
                    editarRazonamiento.setAttribute("class", "btn btn-normal");
                    editarRazonamiento.setAttribute("onclick", "putRazonamiento(" + idSolucion + ", " + idRazonamiento + ");");
                    editarRazonamiento.innerHTML = "Editar razonamiento";
                    divJustificacion.appendChild(editarRazonamiento);

                    var eliminarRazonamiento = document.createElement("button");
                    eliminarRazonamiento.setAttribute("class", "btn btn-danger");
                    eliminarRazonamiento.setAttribute("onclick", "deleteRazonamiento(" + idRazonamiento + ");");
                    eliminarRazonamiento.innerHTML = "Eliminar razonamiento";
                    divJustificacion.appendChild(eliminarRazonamiento);

                    var pJ = document.createElement("div");
                    pJ.setAttribute("id", "pJustificacion-" + idSolucion + "-" + idRazonamiento);
                    divJustificacion.appendChild(pJ);

                    var spanJ = document.createElement("textarea");
                    spanJ.setAttribute("cols", "45");
                    spanJ.setAttribute("id", "sJustificacion-" + idSolucion + "-" + idRazonamiento);
                    spanJ.innerHTML = jus.razonamiento.textoRazonamiento;
                    pJ.appendChild(spanJ);

                    var inputR = document.createElement("input");
                    inputR.setAttribute("type", "checkbox");
                    inputR.setAttribute("id", "justificado-" + idSolucion + "-" + idRazonamiento);
                    inputR.checked = jus.razonamiento.razonamientoJustificado;
                    divJustificacion.appendChild(inputR);

                    var labelR = document.createElement("label");
                    labelR.setAttribute("for", "justificado-" + idSolucion + "-" + idRazonamiento);
                    labelR.innerHTML = "Razonamiento justificado";
                    divJustificacion.appendChild(labelR);

                    claveRazonamiento++;

                    if (jus.razonamiento.razonamientoJustificado === false) {

                        if (jus.razonamiento.textoError !== "Error description") {

                            var error = document.createElement("div");
                            error.setAttribute("id", "error-" + idSolucion + "-" + idRazonamiento);
                            divJustificacion.appendChild(error);

                            var h5 = document.createElement("h4");
                            h5.innerHTML = "Error";
                            error.appendChild(h5);

                            var editarError = document.createElement("button");
                            editarError.setAttribute("class", "btn btn-normal");
                            editarError.setAttribute("onclick", "putError(" + idSolucion + ", " + idRazonamiento + ");");
                            editarError.innerHTML = "Editar error";
                            error.appendChild(editarError);

                            var eliminarError = document.createElement("button");
                            eliminarError.setAttribute("class", "btn btn-danger");
                            eliminarError.setAttribute("onclick", "deleteError(" + idSolucion + ", " + idRazonamiento + ");");
                            eliminarError.innerHTML = "Eliminar error";
                            error.appendChild(eliminarError);

                            var pE = document.createElement("div");
                            pE.setAttribute("id", "pError-" + idSolucion + "-" + idRazonamiento);
                            error.appendChild(pE);

                            var spanE = document.createElement("textarea");
                            spanE.setAttribute("id", "sError-" + idSolucion + "-" + idRazonamiento);
                            spanE.setAttribute("cols", "45");
                            spanE.innerHTML = jus.razonamiento.textoError;
                            pE.appendChild(spanE);

                        } else {

                            var estilo = document.createElement("br");
                            divJustificacion.appendChild(estilo);

                            var botonError = document.createElement("button");
                            botonError.setAttribute("id", "botonError-" + idSolucion + "-" + idRazonamiento);
                            botonError.setAttribute("class", "btn btn-info");
                            botonError.setAttribute("onclick", "addError(" + idCuestion + ", " + idSolucion + ", " + idRazonamiento + ");");
                            botonError.innerHTML = "Añadir error";
                            divJustificacion.appendChild(botonError);

                        }
                    }
                }
            }
        }
        imprimirPropuestaRazonamientos(idSolucion);
        var hr1 = document.createElement("hr");
        body.appendChild(hr1);
    }
    var divBoton = document.createElement("div");
    divBoton.setAttribute("class", "boton");
    body.appendChild(divBoton);

    var botonGuardar = document.createElement("button");
    botonGuardar.setAttribute("class", "btn btn-success");
    botonGuardar.setAttribute("onclick", "putCuestion()");
    botonGuardar.innerHTML = "Actualizar pregunta";
    divBoton.appendChild(botonGuardar);

    var botonSalir = document.createElement("a");
    botonSalir.setAttribute("class", "btn btn-danger");
    botonSalir.setAttribute("href", "http://localhost:8000/frontend/cuestionesMaestro.html");
    botonSalir.innerHTML = "Cerrar pregunta";
    divBoton.appendChild(botonSalir);

    imprimirPropuestaSoluciones();
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
    botonRazonamiento.setAttribute("onclick", "postRazonamiento(" + claveS + ", " + claveRazonamiento + ");");
    botonRazonamiento.innerHTML = "Guardar razonamiento";
    div.appendChild(botonRazonamiento);

    claveRazonamiento++;
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
    botonData.setAttribute("onclick", "postSolucion(" + claveCuestion + "," + claveSol + ");");
    botonData.innerHTML = "Añadir solución";
    div.appendChild(botonData);

    var botonEliminar = document.createElement("button");
    botonEliminar.setAttribute("id", "botonEliminar-" + claveSol);
    botonEliminar.setAttribute("class", "btn btn-danger");
    botonEliminar.setAttribute("onclick", "deleteSolution(" + claveSol + ");");
    botonEliminar.innerHTML = "Eliminar solución";
    div.appendChild(botonEliminar);

    var boton = document.getElementById("botonAñadir-" + claveSol);
    divSolucionCero.removeChild(boton);
}

function deleteSolution(clave) {

    var divSolucion = document.getElementById("divSolucion-" + clave);
    var divPregunta = divSolucion.parentElement;
    divPregunta.removeChild(divSolucion);
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
    botonRazonamiento.setAttribute("onclick", "postError(" + claveSol + ", " + claveJus + ");");
    botonRazonamiento.innerHTML = "Guardar error";
    div.appendChild(botonRazonamiento);

}

function imprimirPropuestaSoluciones() {
    var claveCuestion = getIdCuestion();
    getPropuestaSolucion();
    var propuestaSolucion = JSON.parse(window.sessionStorage.getItem("propuesta_soluciones"));
    var i;

    if (propuestaSolucion !== null) {

        for (i = 0; i < propuestaSolucion.propuestaSoluciones.length; i++) {

            if (propuestaSolucion.propuestaSoluciones[i].propuestaSolucion.corregida === false) {
                var divPregunta = document.getElementById("divPregunta-" + claveCuestion);
                var idPropuestaSolucion = propuestaSolucion.propuestaSoluciones[i].propuestaSolucion.idPropuestaSolucion;

                var divPropuestaSolucion = document.createElement("div");
                divPropuestaSolucion.setAttribute("id", "divPropuestaSolucion-" + idPropuestaSolucion);
                divPregunta.appendChild(divPropuestaSolucion);

                var h4 = document.createElement("h4");
                h4.innerHTML = "Propuesta solución";
                divPropuestaSolucion.appendChild(h4);

                var pPropuestaSolucion = document.createElement("p");
                divPropuestaSolucion.appendChild(pPropuestaSolucion);

                var textPropuestaSolucion = document.createElement("textarea");
                textPropuestaSolucion.setAttribute("id", "propuestaSolucion-" + idPropuestaSolucion);
                textPropuestaSolucion.innerHTML = propuestaSolucion.propuestaSoluciones[i].propuestaSolucion.textoPropuestaSolucion;
                pPropuestaSolucion.appendChild(textPropuestaSolucion);

                var inputS = document.createElement("input");
                inputS.setAttribute("type", "checkbox");
                inputS.setAttribute("id", "propuestaCorrecta-" + idPropuestaSolucion);
                divPropuestaSolucion.appendChild(inputS);

                var labelS = document.createElement("label");
                labelS.setAttribute("for", "propuestaCorrecta-" + idPropuestaSolucion);
                labelS.innerHTML = "Solución correcta";
                divPropuestaSolucion.appendChild(labelS);

                var divBoton = document.createElement("div");
                divBoton.setAttribute("class", "botones");
                divPropuestaSolucion.appendChild(divBoton);

                var boton = document.createElement("button");
                boton.setAttribute("onclick", "corregirPropuestaSolucion(" + idPropuestaSolucion + ");");
                boton.setAttribute("class", "btn btn-success");
                boton.innerHTML = "Corregir propuesta de solución";
                divBoton.appendChild(boton);

                var modificar = document.createElement("button");
                modificar.setAttribute("onclick", "modificarPropuestaSolucion(" + idPropuestaSolucion + ");");
                modificar.setAttribute("class", "btn btn-warning");
                modificar.innerHTML = "Modificar propuesta de solución";
                divBoton.appendChild(modificar);

                var eliminar = document.createElement("button");
                eliminar.setAttribute("onclick", "eliminarPropuestaSolucion(" + idPropuestaSolucion + ");");
                eliminar.setAttribute("class", "btn btn-danger");
                eliminar.innerHTML = "Eliminar propuesta de solución";
                divBoton.appendChild(eliminar);

                var hr = document.createElement("hr");
                divBoton.appendChild(hr);
            }
        }
    }
}

function modificarPropuestaSolucion(idPropuestaSolucion) {
    'use strict';

    function trataRespuesta() {
        if (request.status == 209) {
            alert("Propuesta de solucion modificada");
        } else {
            alert("No se ha podido modificar la propuesta solucion");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    let url = 'http://localhost:8000/api/v1/solutionsProposal/' + idPropuestaSolucion;
    request.open('PUT', url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    let datos = datos_enunciado_put_propuesta_solucion(idPropuestaSolucion);
    request.send(datos);
    location.reload();
}

function datos_enunciado_put_propuesta_solucion(idPropuestaSolucion) {
    let enunciado = document.getElementById("propuestaSolucion-" + idPropuestaSolucion).value;

    let datos = {
        "textoPropuestaSolucion": enunciado
    }

    return JSON.stringify(datos);
}

function modificarPropuestaRazonamiento(idSolucion, idPropuestaRazonamiento) {
    'use strict';

    function trataRespuesta() {
        if (request.status == 209) {
            alert("Propuesta de razonamiento modificada");
        } else {
            let enunciado = document.getElementById("propuestaRazonamiento-" + idSolucion + "-" + idPropuestaRazonamiento).value;
            alert("No se ha podido modificar la propuesta razonamiento");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    let url = 'http://localhost:8000/api/v1/reasonsProposal/' + idPropuestaRazonamiento;
    request.open('PUT', url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    let datos = datos_enunciado_put_propuesta_razonamiento(idSolucion, idPropuestaRazonamiento);
    request.send(datos);
    location.reload();
}

function datos_enunciado_put_propuesta_razonamiento(idSolucion, idPropuestaRazonamiento) {
    let enunciado = document.getElementById("propuestaRazonamiento-" + idSolucion + "-" + idPropuestaRazonamiento).value;
    let datos = {
        "textoPropuestaRazonamiento": enunciado
    }

    return JSON.stringify(datos);
}

function eliminarPropuestaRazonamiento(idPropuestaRazonamiento) {
    'use strict';

    function trataRespuesta() {
        if (request.status == 204) {
            alert("Propuesta de razonamiento eliminada");
            location.reload();
        } else {
            alert("No se ha podido eliminar la propuesta razonamiento");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    let url = 'http://localhost:8000/api/v1/solutionsProposal/' + idPropuestaSolucion;
    request.open('DELETE', url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    request.send();
    location.reload();

}

function eliminarPropuestaSolucion(idPropuestaSolucion) {
    'use strict';

    function trataRespuesta() {
        if (request.status == 204) {
            alert("Propuesta de solucion eliminada");
            location.reload();
        } else {
            alert("No se ha podido eliminar la propuesta solucion");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    let url = 'http://localhost:8000/api/v1/solutionsProposal/' + idPropuestaSolucion;
    request.open('DELETE', url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    request.send();
    location.reload();

}


function corregirPropuestaSolucion(claveS) {
    var textoSolucion = document.getElementById("propuestaSolucion-" + claveS).value;
    var correcta = document.getElementById("propuestaCorrecta-" + claveS).checked;
    putPropuestaSolucion(claveS, correcta);
    postSolucionPropuesta(textoSolucion, correcta);
}

function imprimirPropuestaRazonamientos(claveS) {
    getPropuestaRazonamiento();
    var propuestaRazonamiento = JSON.parse(window.sessionStorage.getItem("propuesta_razonamientos"));
    var i;

    if (propuestaRazonamiento !== null) {
        for (i = 0; i < propuestaRazonamiento.propuestaRazonamientos.length; i++) {

            if (propuestaRazonamiento.propuestaRazonamientos[i].propuestaRazonamiento.solucion === claveS) {

                if (propuestaRazonamiento.propuestaRazonamientos[i].propuestaRazonamiento.corregida === false) {

                    var idPropuestaRazonamiento = propuestaRazonamiento.propuestaRazonamientos[i].propuestaRazonamiento.idPropuestaRazonamiento;
                    var divPregunta = document.getElementById("divSolucion-" + claveS);

                    var divPropuestaSolucion = document.createElement("div");
                    divPropuestaSolucion.setAttribute("id", "divPropuestaRazonamiento-" + claveS + "-" + idPropuestaRazonamiento);
                    divPregunta.appendChild(divPropuestaSolucion);

                    var h4 = document.createElement("h4");
                    h4.innerHTML = "Propuesta razonamiento";
                    divPropuestaSolucion.appendChild(h4);

                    var pPropuestaSolucion = document.createElement("p");
                    divPropuestaSolucion.appendChild(pPropuestaSolucion);

                    var textPropuestaSolucion = document.createElement("textarea");
                    textPropuestaSolucion.setAttribute("id", "propuestaRazonamiento-" + claveS + "-" + idPropuestaRazonamiento);
                    textPropuestaSolucion.innerHTML = propuestaRazonamiento.propuestaRazonamientos[i].propuestaRazonamiento.textoPropuestaRazonamiento;
                    divPropuestaSolucion.appendChild(textPropuestaSolucion);

                    var inputS = document.createElement("input");
                    inputS.setAttribute("type", "checkbox");
                    inputS.setAttribute("id", "propuestaJustificado-" + claveS + "-" + idPropuestaRazonamiento);
                    divPropuestaSolucion.appendChild(inputS);

                    var labelS = document.createElement("label");
                    labelS.setAttribute("for", "propuestaJustificado-" + claveS + "-" + idPropuestaRazonamiento);
                    labelS.innerHTML = "Razonamiento justificado";
                    divPropuestaSolucion.appendChild(labelS);

                    var divBoton = document.createElement("div");
                    divBoton.setAttribute("class", "botones");
                    divPropuestaSolucion.appendChild(divBoton);

                    var boton = document.createElement("button");
                    boton.setAttribute("onclick", "corregirPropuestaRazonamiento(" + claveS + ", " + idPropuestaRazonamiento + ");");
                    boton.setAttribute("class", "btn btn-success");
                    boton.innerHTML = "Corregir propuesta de razonamiento";
                    divBoton.appendChild(boton);

                    var modificar = document.createElement("button");
                    modificar.setAttribute("onclick", "modificarPropuestaRazonamiento(" + claveS + ", " + idPropuestaRazonamiento + ");");
                    modificar.setAttribute("class", "btn btn-warning");
                    modificar.innerHTML = "Modificar propuesta de razonamiento";
                    divBoton.appendChild(modificar);

                    var eliminar = document.createElement("button");
                    eliminar.setAttribute("onclick", "eliminarPropuestaRazonamiento(" + idPropuestaRazonamiento + ");");
                    eliminar.setAttribute("class", "btn btn-danger");
                    eliminar.innerHTML = "Eliminar propuesta de razonamiento";
                    divBoton.appendChild(eliminar);

                    var hr = document.createElement("hr");
                    divBoton.appendChild(hr);
                }
            }
        }
    }
}

function corregirPropuestaRazonamiento(claveS, claveR) {
    var propuestaRazonamiento = document.getElementById("propuestaRazonamiento-" + claveS + "-" + claveR).value;
    var justificado = document.getElementById("propuestaJustificado-" + claveS + "-" + claveR).checked;

    putPropuestaRazonamiento(claveR, justificado);
    postPropuestaRazonamiento(claveS, propuestaRazonamiento, justificado);

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

function datos_post_solucion(idCuestion, idSolucion) {
    //Crear funcion para obtener el idCuestion
    let valorSolucion = 0;

    var textoSolucion = document.getElementById("solucion-" + idSolucion).value;
    var solucionCorrecta = document.getElementById("correcta-" + idSolucion).checked;
    //Crear una función que saque el idCuestion de la que se va introducir ahora
    var cuestion = idCuestion;

    let datos = {
        "textoSolucion": textoSolucion,
        "solucionCorrecta": solucionCorrecta,
        "cuestion": cuestion
    }

    return JSON.stringify(datos);
}

function postSolucion(idCuestion, idSolucion) {
    'use strict';

    function trataRespuesta() {
        var respuesta;
        if (request.status == 201) {
            alert("Solución añadida")
            location.reload();
            location.reload();
        } else {
            alert("No se ha podido añadir la respuesta");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    request.open('POST', 'http://localhost:8000/api/v1/solutions', true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    let datos = datos_post_solucion(idCuestion, idSolucion);
    request.send(datos);
}

function datos_post_razonamiento(idSolucion, idRazonamiento) {

    var textoRazonamiento = document.getElementById("razonamiento-" + idSolucion + "-" + idRazonamiento).value;
    var razonamientoJustificado = document.getElementById("justificado-" + idSolucion + "-" + idRazonamiento).checked;
    var solucion = idSolucion;

    let datos = {
        "textoRazonamiento": textoRazonamiento,
        "razonamientoJustificado": razonamientoJustificado,
        "solucion": solucion,
        "error": "Error description"
    }

    return JSON.stringify(datos);

}

function postRazonamiento(idCuestion, idSolucion) {
    'use strict';

    function trataRespuesta() {
        var respuesta;
        if (request.status == 201) {
            alert("Razonamiento añadido")
            location.reload();
            location.reload();
        } else {
            alert("No se ha podido añadir el razonamiento");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    request.open('POST', 'http://localhost:8000/api/v1/reasons', true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    let datos = datos_post_razonamiento(idCuestion, idSolucion);
    request.send(datos);
}

function postError(idSolucion, idRazonamiento) {
    'use strict';

    function trataRespuesta() {
        var respuesta;
        if (request.status == 209) {
            alert("Error añadido")
            location.reload();
        } else {
            alert("No se ha podido añadir el error");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    let url = 'http://localhost:8000/api/v1/reasons/' + idRazonamiento;
    request.open('PUT', url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    let datos = datos_post_error(idSolucion, idRazonamiento);
    request.send(datos);
}

function datos_post_error(idSolucion, idRazonamiento) {

    var textoError = document.getElementById("error-" + idSolucion + "-" + idRazonamiento).value;

    let datos = {
        "textoError": textoError
    }

    return JSON.stringify(datos);

}

function putCuestion() {
    'use strict';

    function trataRespuesta() {
        var respuesta;
        if (request.status == 209) {
            alert("Cuestion modificada");
            location.href = "http://localhost:8000/frontend/cuestionesMaestro.html";
        } else {
            alert("No se ha podido modificar la cuestion");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    let url = 'http://localhost:8000/api/v1/questions/' + getIdCuestion();
    request.open('PUT', url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    let datos = datos_put_cuestion();
    request.send(datos);
    location.reload();
}

function datos_put_cuestion() {
    var enunciadoDescripcion = document.getElementById("pregunta-" + getIdCuestion()).value;
    var enunciadoDisponible = document.getElementById("disponible-" + getIdCuestion()).checked;

    let datos = {
        "enunciadoDescripcion": enunciadoDescripcion,
        "enunciadoDisponible": enunciadoDisponible
    };
    return JSON.stringify(datos);
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

function putSolucion(idSolucion) {
    'use strict';

    function trataRespuesta() {
        if (request.status == 209) {
            alert("Solucion modificada");
            location.reload();
        } else {
            alert("No se ha podido modificar la solucion");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    let url = 'http://localhost:8000/api/v1/solutions/' + idSolucion;
    request.open('PUT', url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    let datos = datos_put_solucion(idSolucion);
    request.send(datos);
    location.reload();
}

function datos_put_solucion(idSolucion) {

    var textoSolucion = document.getElementById("sSolucion-" + idSolucion).value;
    var solucionCorrecta = document.getElementById("correcta-" + idSolucion).checked;

    let datos = {
        "textoSolucion": textoSolucion,
        "solucionCorrecta": solucionCorrecta
    };

    return JSON.stringify(datos);
}

function putRazonamiento(idSolucion, idRazonamiento) {
    'use strict';

    function trataRespuesta() {
        var respuesta;
        if (request.status == 209) {
            alert("Razonamiento modificado");
            location.reload();
        } else {
            alert("No se ha podido modificar el razonamiento");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    let url = 'http://localhost:8000/api/v1/reasons/' + idRazonamiento;
    request.open('PUT', url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    let datos = datos_put_razonamiento(idSolucion, idRazonamiento);
    request.send(datos);
    location.reload();
}

function datos_put_razonamiento(idSolucion, idRazonamiento) {
    var textoRazonamiento = document.getElementById("sJustificacion-" + idSolucion + "-" + idRazonamiento).value;
    var razonamientoJustificado = document.getElementById("justificado-" + idSolucion + "-" + idRazonamiento).checked;

    let datos = {
        "textoRazonamiento": textoRazonamiento,
        "razonamientoJustificado": razonamientoJustificado
    };

    return JSON.stringify(datos);
}

function putError(idSolucion, idRazonamiento) {
    'use strict';

    function trataRespuesta() {
        var respuesta;
        if (request.status == 209) {
            alert("Error modificado")
            location.reload();
        } else {
            alert("No se ha podido modificar el error");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    let url = 'http://localhost:8000/api/v1/reasons/' + idRazonamiento;
    request.open('PUT', url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    let datos = datos_put_error(idSolucion, idRazonamiento);
    request.send(datos);
}

function datos_put_error(idSolucion, idRazonamiento) {

    var textoError = document.getElementById("sError-" + idSolucion + "-" + idRazonamiento).value;

    let datos = {
        "textoError": textoError
    }

    return JSON.stringify(datos);

}

function deleteError(idSolucion, idRazonamiento) {
    'use strict';

    function trataRespuesta() {
        var respuesta;
        if (request.status == 209) {
            alert("Error eliminado")
            location.reload();
        } else {
            alert("No se ha podido eliminar el error");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    let url = 'http://localhost:8000/api/v1/reasons/' + idRazonamiento;
    request.open('PUT', url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    let datos = datos_delete_error(idSolucion, idRazonamiento);
    request.send(datos);
}

function datos_delete_error(idSolucion, idRazonamiento) {

    var textoError = document.getElementById("sError-" + idSolucion + "-" + idRazonamiento).value;

    let datos = {
        "textoError": "Error description"
    }

    return JSON.stringify(datos);

}

function deleteSolucion(idSolucion) {
    'use strict';

    function trataRespuesta() {
        if (request.status == 204) {
            alert("Solucion eliminada");
            location.reload();
        } else {
            alert("No se ha podido eliminar la solucion");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    let url = 'http://localhost:8000/api/v1/solutions/' + idSolucion;
    request.open('DELETE', url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    request.send();
    location.reload();
}

function deleteRazonamiento(idRazonamiento) {
    'use strict';

    function trataRespuesta() {
        if (request.status == 204) {
            alert("Razonamiento eliminado");
            location.reload();
        } else {
            alert("No se ha podido eliminar el razonamiento");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    let url = 'http://localhost:8000/api/v1/reasons/' + idRazonamiento;
    request.open('DELETE', url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    request.send();
    location.reload();
}

function getPropuestaSolucion() {
    'use strict';

    function trataRespuesta() {
        var respuesta;
        if (request.status == 200) {
            respuesta = request.response;
            let string_propuesta_soluciones = JSON.stringify(respuesta);
            let propuesta_soluciones = JSON.parse(string_propuesta_soluciones);
            window.sessionStorage.setItem("propuesta_soluciones", JSON.stringify(propuesta_soluciones));
        } else {
            console.log("No se han encontrado propuestas de solucion");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    request.open('GET', 'http://localhost:8000/api/v1/solutionsProposal', true);
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    request.send();
}

function getPropuestaRazonamiento() {
    'use strict';

    function trataRespuesta() {
        var respuesta;
        if (request.status == 200) {
            respuesta = request.response;
            let string_propuesta_razonamientos = JSON.stringify(respuesta);
            let propuesta_razonamientos = JSON.parse(string_propuesta_razonamientos);
            window.sessionStorage.setItem("propuesta_razonamientos", JSON.stringify(propuesta_razonamientos));
        } else {
            console.log("No se han encontrado propuestas de razonamiento");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    request.open('GET', 'http://localhost:8000/api/v1/reasonsProposal', true);
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    request.send();
}

function putPropuestaSolucion(idPropuestaSolucion, correcta) {
    'use strict';

    function trataRespuesta() {
        if (request.status == 209) {
            alert("Propuesta de solución modificada");
            location.reload();
        } else {
            alert("No se ha podido modificar la propuesta solucion");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    let url = 'http://localhost:8000/api/v1/solutionsProposal/' + idPropuestaSolucion;
    request.open('PUT', url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    let datos = datos_put_propuesta_solucion(correcta);
    request.send(datos);
    location.reload();
}

function datos_put_propuesta_solucion(solucionCorrecta) {

    let datos = {
        "propuestaSolucionCorrecta": solucionCorrecta,
        "corregida": true
    };

    return JSON.stringify(datos);
}

function postSolucionPropuesta(textoSolucion, correcta) {
    'use strict';

    function trataRespuesta() {
        var respuesta;
        if (request.status == 201) {
            alert("Nueva solución añadida");
            location.reload();
            location.reload();
        } else {
            alert("No se ha podido añadir la propuesta de solucion");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    request.open('POST', 'http://localhost:8000/api/v1/solutions', true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    let datos = datos_post_solucion_propuesta(textoSolucion, correcta);
    request.send(datos);
}

function datos_post_solucion_propuesta(textoSolucion, correcta) {
    var cuestion = getIdCuestion();

    let datos = {
        "textoSolucion": textoSolucion,
        "solucionCorrecta": correcta,
        "cuestion": cuestion
    }

    return JSON.stringify(datos);
}

function putPropuestaRazonamiento(idPropuestaRazonamiento, justificado) {
    'use strict';

    function trataRespuesta() {
        if (request.status == 209) {
            alert("Razonamiento modificada");
            location.reload();
        } else {
            alert("No se ha podido modificar la propuesta razonamiento");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    let url = 'http://localhost:8000/api/v1/reasonsProposal/' + idPropuestaRazonamiento;
    request.open('PUT', url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    let datos = datos_put_propuesta_razonamiento(justificado);
    request.send(datos);
    location.reload();
}

function datos_put_propuesta_razonamiento(razonamientoJustificado) {

    let datos = {
        "propuestaRazonamientoJustificado": razonamientoJustificado,
        "corregida": true
    };

    return JSON.stringify(datos);
}

function postPropuestaRazonamiento(idSolucion, textoRazonamiento, justificado) {
    'use strict';

    function trataRespuesta() {
        var respuesta;
        if (request.status == 201) {
            alert("Razonamiento añadido");
            location.reload();
            location.reload();
        } else {
            alert("No se ha podido añadir el razonamiento");
        }
    }

    var request = new XMLHttpRequest();
    let token = window.sessionStorage.getItem("token");
    request.open('POST', 'http://localhost:8000/api/v1/reasons', true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = 'json';
    request.onload = trataRespuesta;
    let datos = datos_post_razonamiento_propuesto(idSolucion, textoRazonamiento, justificado);
    request.send(datos);
}

function datos_post_razonamiento_propuesto(idSolucion, textoRazonamiento, justificado) {

    let datos = {
        "textoRazonamiento": textoRazonamiento,
        "razonamientoJustificado": justificado,
        "solucion": idSolucion,
        "error" : "Error description"
    }

    return JSON.stringify(datos);
}