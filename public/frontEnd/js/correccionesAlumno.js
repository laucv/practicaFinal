function imprimir() {
    getPropuestaSoluciones();
    getPropuestaRazonamientos();

    imprimirPSoluciones();
    imprimirPRazonamientos();
}

function imprimirPSoluciones() {
    let propuestaSoluciones = JSON.parse(window.sessionStorage.getItem("propuestas_solucion"));
    let propuesta;
    var body = document.body;
    for (propuesta of propuestaSoluciones.propuestaSoluciones){

        if (propuesta.propuestaSolucion.corregida === true){

            var div = document.createElement("div");
            div.setAttribute("id", "pSolucion-" + propuesta.propuestaSolucion.idPropuestaSolucion);
            body.appendChild(div);

            var h2 = document.createElement("h3");
            h2.innerText = "Propuesta de solucion";
            div.appendChild(h2);

            var p = document.createElement("p");
            p.innerText = propuesta.propuestaSolucion.textoPropuestaSolucion;
            div.appendChild(p);

            var correccion = document.createElement("p");
            if (propuesta.propuestaSolucion.propuestaSolucionCorrecta === true){
                correccion.innerText = "Propuesta correcta";
                div.setAttribute("class", "correcta");
            } else {
                correccion.innerText = "Propuesta incorrecta";
                div.setAttribute("class", "incorrecta");
            }
            div.appendChild(correccion);

            var hr = document.createElement("hr");
            div.appendChild(hr);
        }
    }
}

function imprimirPRazonamientos() {
    let propuestaRazonamientos = JSON.parse(window.sessionStorage.getItem("propuestas_razonamiento"));
    let propuesta;
    var body = document.body;
    for (propuesta of propuestaRazonamientos.propuestaRazonamientos){

        if (propuesta.propuestaRazonamiento.corregida === true){

            var div = document.createElement("div");
            div.setAttribute("id", "pRazonamiento-" + propuesta.propuestaRazonamiento.idPropuestaRazonamiento);
            body.appendChild(div);

            var h2 = document.createElement("h3");
            h2.innerText = "Propuesta de razonamiento";
            div.appendChild(h2);

            var p = document.createElement("p");
            p.innerText = propuesta.propuestaRazonamiento.textoPropuestaRazonamiento;
            div.appendChild(p);

            var correccion = document.createElement("p");
            if (propuesta.propuestaRazonamiento.propuestaRazonamientoJustificado === true){
                correccion.innerText = "Propuesta correcta";
                div.setAttribute("class", "correcta");
            } else {
                correccion.innerText = "Propuesta incorrecta";
                div.setAttribute("class", "incorrecta");
            }
            div.appendChild(correccion);

            var hr = document.createElement("hr");
            div.appendChild(hr);
        }
    }
}

function getPropuestaSoluciones() {
    'use strict';
    function trataRespuesta () {
        var respuesta;
        if(request.status==200){
            respuesta = request.response;
            let string_propuestas = JSON.stringify(respuesta);
            window.sessionStorage.setItem("propuestas_solucion", string_propuestas);
        }
        else{
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
    function trataRespuesta () {
        var respuesta;
        if(request.status==200){
            respuesta = request.response;
            let string_propuestas = JSON.stringify(respuesta);
            window.sessionStorage.setItem("propuestas_razonamiento", string_propuestas);
        }
        else{
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