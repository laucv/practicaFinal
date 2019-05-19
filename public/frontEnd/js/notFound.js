function redireccion() {
    var isMaestro = window.sessionStorage.getItem("isMaestro");
    var body = document.body;

    var enlace = document.createElement("a");
    enlace.setAttribute("title", "Error 404 Not Found");
    if (isMaestro === true){
        enlace.setAttribute("href", "http://localhost:8000/frontend/cuestionesMaestro.html");
    } else{
        enlace.setAttribute("href", "http://localhost:8000/frontend/cuestionesAprendiz.html");
    }
    body.appendChild(enlace);

    var imagen = document.createElement("img");
    imagen.setAttribute("alt", "Error 404 Not Found");
    imagen.setAttribute("src", "https://colorlib.com/wp/wp-content/uploads/sites/2/404-error-template-10.png");
    enlace.appendChild(imagen);
}

