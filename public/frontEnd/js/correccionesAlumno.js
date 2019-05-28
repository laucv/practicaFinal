function imprimir() {
    getPropuestaSoluciones();
    getPropuestaRazonamientos();
    getSoluciones();
    getCuestiones();

    imprimirPSoluciones();
    imprimirPRazonamientos();
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

function getSolucion(idSolucion) {

    let soluciones = JSON.parse(window.sessionStorage.getItem("soluciones"));

    for (let r = 0; r < soluciones.soluciones.length; r++){
        if(soluciones.soluciones[r].solucion.idSolucion === idSolucion){
            return soluciones.soluciones[r];
        }
    }
}

function getCuestion(idCuestion) {

    let cuestiones = JSON.parse(window.sessionStorage.getItem("cuestiones"));

    for (let r = 0; r < cuestiones.cuestiones.length; r++){
        if(cuestiones.cuestiones[r].cuestion.idCuestion === idCuestion){
            return cuestiones.cuestiones[r];
        }
    }
}

function imprimirPSoluciones() {
    let propuestaSoluciones = JSON.parse(window.sessionStorage.getItem("propuestas_solucion"));
    let propuesta;
    var body = document.body;

    if (propuestaSoluciones !== null) {
        for (propuesta of propuestaSoluciones.propuestaSoluciones) {

            if (propuesta.propuestaSolucion.corregida === true) {

                var div = document.createElement("div");
                div.setAttribute("id", "pSolucion-" + propuesta.propuestaSolucion.idPropuestaSolucion);
                body.appendChild(div);

                var h3 = document.createElement("h3");
                h3.innerText = "Propuesta de solución";
                div.appendChild(h3);

                var h5 = document.createElement("h5");
                let cuestion = getCuestion(propuesta.propuestaSolucion.cuestion);
                h5.setAttribute("class", "enunciadoDescripcion");
                h5.innerText = cuestion.cuestion.enunciadoDescripcion;
                div.appendChild(h5);

                var p = document.createElement("p");
                p.innerText = propuesta.propuestaSolucion.textoPropuestaSolucion;
                div.appendChild(p);

                var correccion = document.createElement("p");
                if (propuesta.propuestaSolucion.propuestaSolucionCorrecta === true) {
                    correccion.innerText = "Propuesta correcta";
                    correccion.setAttribute("class", "correcta");
                } else {
                    correccion.innerText = "Propuesta incorrecta";
                    correccion.setAttribute("class", "incorrecta");
                }
                div.appendChild(correccion);

                var hr = document.createElement("hr");
                div.appendChild(hr);
            }
        }
    }
}

function imprimirPRazonamientos() {
    let propuestaRazonamientos = JSON.parse(window.sessionStorage.getItem("propuestas_razonamiento"));
    let propuesta;
    var body = document.body;
    for (propuesta of propuestaRazonamientos.propuestaRazonamientos) {

        if (propuesta.propuestaRazonamiento.corregida === true) {

            var div = document.createElement("div");
            div.setAttribute("id", "pRazonamiento-" + propuesta.propuestaRazonamiento.idPropuestaRazonamiento);
            body.appendChild(div);

            var h3 = document.createElement("h3");
            h3.innerText = "Propuesta de razonamiento";
            div.appendChild(h3);

            var h5 = document.createElement("h5");
            let solucion = getSolucion(propuesta.propuestaRazonamiento.solucion);
            h5.setAttribute("class", "textoSolucion");
            h5.innerText = solucion.solucion.textoSolucion;
            div.appendChild(h5);

            var p = document.createElement("p");
            p.innerText = propuesta.propuestaRazonamiento.textoPropuestaRazonamiento;
            div.appendChild(p);

            var correccion = document.createElement("p");
            if (propuesta.propuestaRazonamiento.propuestaRazonamientoJustificado === true) {
                correccion.innerText = "Propuesta correcta";
                correccion.setAttribute("class", "correcta");
            } else {
                correccion.innerText = "Propuesta incorrecta";
                correccion.setAttribute("class", "incorrecta");
            }
            div.appendChild(correccion);

            var hr = document.createElement("hr");
            div.appendChild(hr);
        }
    }
}

function getPropuestaSoluciones() {
    'use strict';

    function trataRespuesta() {
        var respuesta;
        if (request.status == 200) {
            respuesta = request.response;
            let string_propuestas = JSON.stringify(respuesta);
            window.sessionStorage.setItem("propuestas_solucion", string_propuestas);
        } else {
            alert("No se han encontrado propuestas de solucion");
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

function getPropuestaRazonamientos() {
    'use strict';

    function trataRespuesta() {
        var respuesta;
        if (request.status == 200) {
            respuesta = request.response;
            let string_propuestas = JSON.stringify(respuesta);
            window.sessionStorage.setItem("propuestas_razonamiento", string_propuestas);
        } else {
            alert("No se han encontrado propuestas de razonamiento");
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