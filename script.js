const preguntas = [
  {
    pregunta: "1. ¿Cuántos años tengo?",
    opciones: { A: "19 años", B: "21 años", C: "23 años" },
    correcta: "B"
  },
  {
    pregunta: "2. ¿Cuál es mi comida favorita?",
    opciones: { A: "Hamburguesa", B: "Pizza", C: "Salchipapa" },
    correcta: "C"
  },
  {
    pregunta: "3. ¿Cuál es mi color favorito?",
    opciones: { A: "Negro", B: "Azul", C: "Rojo" },
    correcta: "A"
  },
  {
    pregunta: "4. ¿Cuál es mi personaje favorito de Pokémon?",
    opciones: { A: "Ash", B: "N", C: "Leon" },
    correcta: "B"
  },
  {
    pregunta: "5. ¿Cuál es mi personaje femenino favorito del anime?",
    opciones: { A: "Nezuko", B: "Marin", C: "Mai Sakurajima" },
    correcta: "C"
  },
  {
    pregunta: "6. ¿Qué significa Pokémon GO para mí?",
    opciones: { A: "Competir y ganar", B: "Disfrutar y parchar", C: "Coleccionar Pokémon" },
    correcta: "B"
  },
  {
    pregunta: "7. ¿A qué país me gustaría viajar?",
    opciones: { A: "Japón", B: "Italia", C: "Estados Unidos" },
    correcta: "A"
  },
  {
    pregunta: "8. ¿Qué prefiero hacer los sábados?",
    opciones: { A: "Quedarme durmiendo", B: "Salir con mi novia", C: "Salir a jugar Pokémon GO" },
    correcta: "C"
  },
  {
    pregunta: "9. ¿Cuál es mi Pokémon favorito?",
    opciones: { A: "Gengar", B: "Mimikyu", C: "Lucario" },
    correcta: "B"
  },
  {
    pregunta: "10. ¿Cuál es mi carrera soñada?",
    opciones: { A: "Medicina", B: "Ingeniería de Sistemas", C: "Fotografía o cine y televisión" },
    correcta: "C"
  }
];

let indice = 0;
let puntos = 0;

// Elementos del DOM
const pantallaInicio = document.getElementById("inicio");
const pantallaQuiz = document.getElementById("quiz");
const pantallaResultados = document.getElementById("resultados");

const barra = document.getElementById("barra");
const contador = document.getElementById("contador");
const textoPregunta = document.getElementById("pregunta");
const contenedorOpciones = document.getElementById("opciones");
const feedback = document.getElementById("feedback");
const btnSiguiente = document.getElementById("btn-siguiente");
const spanPuntos = document.getElementById("puntos");
const mensaje = document.getElementById("mensaje");

function mostrarPantalla(pantalla) {
  [pantallaInicio, pantallaQuiz, pantallaResultados].forEach(function (p) {
    p.classList.remove("activa");
  });
  pantalla.classList.add("activa");
}

function mostrarPregunta() {
  const actual = preguntas[indice];

  contador.textContent = "Pregunta " + (indice + 1) + " de " + preguntas.length;
  barra.style.width = (indice / preguntas.length) * 100 + "%";
  textoPregunta.textContent = actual.pregunta;
  feedback.textContent = "";
  feedback.className = "feedback";
  btnSiguiente.classList.add("oculto");
  contenedorOpciones.innerHTML = "";

  Object.keys(actual.opciones).forEach(function (letra) {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "opcion";
    boton.dataset.letra = letra;

    const spanLetra = document.createElement("span");
    spanLetra.className = "letra";
    spanLetra.textContent = letra;

    const spanTexto = document.createElement("span");
    spanTexto.textContent = actual.opciones[letra];

    boton.appendChild(spanLetra);
    boton.appendChild(spanTexto);
    boton.addEventListener("click", function () {
      responder(letra);
    });

    contenedorOpciones.appendChild(boton);
  });
}

function responder(letra) {
  const actual = preguntas[indice];
  const botones = contenedorOpciones.querySelectorAll(".opcion");

  botones.forEach(function (b) {
    b.disabled = true;
    if (b.dataset.letra === actual.correcta) {
      b.classList.add("correcta");
    }
  });

  if (letra === actual.correcta) {
    puntos++;
    feedback.textContent = "¡Correcto!";
    feedback.classList.add("ok");
  } else {
    const seleccionado = contenedorOpciones.querySelector('[data-letra="' + letra + '"]');
    seleccionado.classList.add("incorrecta");
    feedback.textContent =
      "¡Incorrecto! La respuesta correcta era: " +
      actual.correcta + ". " + actual.opciones[actual.correcta];
    feedback.classList.add("mal");
  }

  btnSiguiente.textContent = indice === preguntas.length - 1 ? "Ver resultados" : "Siguiente";
  btnSiguiente.classList.remove("oculto");
  btnSiguiente.focus();
}

function mensajeFinal() {
  if (puntos === 10) return "SIN PALABRAS MI SANGRE! ME CONOCE RESTO LA BUENA.";
  if (puntos >= 7) return "¡RE BIEN! ME CONOCES RESTO PERO FALTA.";
  if (puntos >= 4) return "NOT BAD BRO, PERO LE FALTA CONOCERME.";
  return "JAJAJA, ¿SEGURO QUE ME CONOCE?";
}

function mostrarResultados() {
  barra.style.width = "100%";
  spanPuntos.textContent = puntos;
  mensaje.textContent = mensajeFinal();
  mostrarPantalla(pantallaResultados);
}

function empezar() {
  indice = 0;
  puntos = 0;
  mostrarPantalla(pantallaQuiz);
  mostrarPregunta();
}

document.getElementById("btn-empezar").addEventListener("click", empezar);
document.getElementById("btn-reiniciar").addEventListener("click", empezar);

btnSiguiente.addEventListener("click", function () {
  indice++;
  if (indice < preguntas.length) {
    mostrarPregunta();
  } else {
    mostrarResultados();
  }
});
