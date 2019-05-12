function getUsuario(datos, username, password) {
  "use strict";
  var usuario;
  for (usuario of datos.usuarios) {
    if (usuario.username === username && usuario.password === password) {
      return usuario;
    }
  }
  return null;
}

function cargar() {
  "use strict";
  var datos = {
    usuarios: [
      {
        clave: 1,
        username: "m",
        password: "m",
        tipo: "maestro"
            },
      {
        clave: 2,
        username: "a",
        password: "a",
        tipo: "aprendiz"
            },
      {
        clave: 3,
        username: "b",
        password: "b",
        tipo: "aprendiz"
            },
      {
        clave: 4,
        username: "c",
        password: "c",
        tipo: "aprendiz"
            }
        ],
    cuestiones: [
      {
        clave: 0,
        pregunta: "¿Qué es el software?",
        propuestaSolucion: [],
        disponible: true,
        soluciones: [
          {
            clave: 0,
            solucion: "El software es la parte lógica de un sistema informático, o sea sin contemplar el hardware",
            propuestaRazonamiento: [],
            correcta: false,
            razonamientos: [
              {
                clave: 0,
                razonamiento: "La definición es demasiado permisiva porque incluye firmware que no es software",
                justificado: false,
                error: "El firmware sí es software pero con la característica de ser muy acoplado a algún dispositivo hardware"
                            },
              {
                clave: 1,
                razonamiento: "La definición es demasiado permisiva porque los datos de usuario (todos los ficheros generados por el software), no son hardware ni son software y están siendo incluidos en el software",
                justificado: true,
                            }
                        ]
                    }
                ]
            },
      {
        clave: 1,
        pregunta: "¿Cómo muere Lord Voldemort?",
        propuestaSolucion: [],
        disponible: true,
        soluciones: [
          {
            clave: 0,
            solucion: "Explota por un hechizo",
            propuestaRazonamiento: [],
            correcta: false,
            razonamientos: [
              {
                clave: 0,
                razonamiento: "El hechizo Avadda Kedavra que él lanza le rebota ya que la varita de sauco no le pertenecía",
                justificado: true
                            }
                        ]
                    }
                ]
            },
      {
        clave: 2,
        pregunta: "¿De qué tipo es Pikachu?",
        disponible: true,
        propuestaSolucion: [],
        soluciones: [
          {
            clave: 0,
            solucion: "Es de tipo eléctrico",
            propuestaRazonamiento: [],
            correcta: true,
            razonamientos: [
              {
                clave: -1
              }
                        ]
                    },
          {
            clave: 1,
            solucion: "Es de tipo acero",
            propuestaRazonamiento: [],
            correcta: false,
            razonamientos: [
              {
                clave: 0,
                razonamiento: "Porque es de color amarillo que es como se representa la electricidad",
                justificado: false,
                error: "La pokedex dice que Pikachu es de tipo eléctrico y además puede aprender ataques de ese tipo"
              },
              {
                clave: 1,
                razonamiento: "Pikachu es de tipo eléctrico porque puede aprender ataques de ese tipo (además de otros de otros tipos). La pokédex también justifica que ese es el tipo de Pikachu",
                justificado: true,
                            }
            ]
                    }
                ]
            },
      {
        clave: 3,
        pregunta: "¿Qué es la recursividad?",
        propuestaSolucion: [],
        disponible: true,
        soluciones: [
          {
            clave: 0,
            solucion: "La característica de una función que se llama a sí misma",
            propuestaRazonamiento: [],
            correcta: false,
            razonamientos: [
              {
                clave: 0,
                razonamiento: "La definición es demasiado restrictiva porque no contempla recursividad mutua",
                justificado: true,
              }
                        ]
                    },
          {
            clave: 1,
            solucion: "La característica de una función que se llama a sí misma, directa o indirectamente a través de otras",
            correcta: false,
            propuestaRazonamiento: [],
            razonamientos: [
              {
                clave: 0,
                razonamiento: "La definición es demasiado restrictiva porque no contempla recursividad de datos (para la definición de un árbol, grafo, …), de imágenes (fractales, …), …",
                justificado: true
                            }
            ]
                    },
          {
            clave: 2,
            solucion: "La característica de algo que se define sobre sí mismo, directa o indirectamente.",
            propuestaRazonamiento: [],
            correcta: true,
            razonamientos: [
              {
                clave: -1
                            }
            ]
                    }
                ]
            }
        ]
  };
  window.localStorage.setItem("datos", JSON.stringify(datos));
  alert("Datos cargados");
  location.href = "login.html";
}

function login() {
  'use strict';
  var datos = JSON.parse(window.localStorage.getItem("datos"));
  var username = document.getElementById("username").value;
  var pwd = document.getElementById("password").value;
  var user = getUsuario(datos, username, pwd);
  var iniciar = document.getElementById("iniciar");

  if (user === null) {
    alert("sin usuario");
    username.value = "";
    pwd.value = "";
    iniciar.action = "./login.html";
  } else {
    window.localStorage.setItem("usuarioRegistrado", JSON.stringify(user));

    if (user.tipo === "maestro") {
      iniciar.action = "./cuestionesMaestro.html";

    } else {
      iniciar.action = "./cuestionesAprendiz.html";
    }
  }
  return user !== null;
}
