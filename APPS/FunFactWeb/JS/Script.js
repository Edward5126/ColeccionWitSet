// Se declaran variables globales
var DatoActual = -1; //Se inicia en la posición de presentación. Ningún dato mostrado.
var DatosTotales; //Variable para contar cuántos datos existen.
var Texto = new SpeechSynthesisUtterance();
var Narrador;
var RunNav = true;
var VocesNarrador;

SetUpDatos(); // Se realiza el primer fetch para contar cuántos datos existen.

// Se escribe la función encargada de inicializar el conteo de datos y la revisión de la posición del dato actual.
function SetUpDatos() {
  fetch("API/Datos.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (ListaDatos) {
      console.log("Lista de datos cargada.");
      DatosTotales = Object.keys(ListaDatos).length;
    })
    .catch(function (error) {
      alert(
        "Algo parece andar mal... Te agradeceríamos si nos notificas que existe un error. :)"
      );
      console.error("Fetch fallido");
    });

  //FetchCambiarDato(25);

  document.getElementById("BotonRandom").focus();
  RevisarInicioFin();
  RevisarURLDato();
}

function RevisarURLDato() {
  var loc = document.location.href;

  if (loc.indexOf("?") > 0) {
    var getDatoURL = loc.split("=")[1];
    FetchCambiarDato(getDatoURL);

    DatoActual = getDatoURL;
    console.log("Dato encontrado en la URL: " + getDatoURL);

    history.replaceState(null, "", "index.html");
  }
}

function RevisarInicioFin() {
  if (DatoActual == -1 || DatoActual == 0) {
    document.getElementById("BotonAnterior").setAttribute("disabled", "");
    document
      .getElementById("DatoAnterior")
      .setAttribute("class", "Btndisabled");
  } else {
    document.getElementById("BotonAnterior").removeAttribute("disabled");
    document.getElementById("DatoAnterior").removeAttribute("class");
  }

  if (DatoActual == DatosTotales - 1) {
    document.getElementById("BotonSiguiente").setAttribute("disabled", "");
    document
      .getElementById("DatoSiguiente")
      .setAttribute("class", "Btndisabled");
  } else {
    document.getElementById("BotonSiguiente").removeAttribute("disabled");
    document.getElementById("DatoSiguiente").removeAttribute("class");
  }
  console.log("Dato Actual: " + DatoActual);
}

function TransicionCarga() {
  var ContenedorCargaxd = document.getElementById("ContenedorCarga");
  var Cargaxd = document.getElementById("Carga");
  var Imgxd = document.getElementById("ImagenDelDato");

  if (
    Imgxd.alt == "" ||
    Imgxd.alt == "Conéctate a Internet para mostrar imágenes de los datos"
  ) {
    Cargaxd.style.opacity = "1";
  } else {
    ContenedorCargaxd.style.opacity = "1";
    Cargaxd.style.opacity = "1";
  }

  Imgxd.onload = function () {
    ContenedorCargaxd.style.opacity = "0";
    Cargaxd.style.opacity = "0";
  };
}

function FetchCambiarDato(NumeroDato) {
  var NumeroDato;

  fetch("API/Datos.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (ListaDatos) {
      CambiarDatos(ListaDatos, NumeroDato);
      console.log("Fetch exitoso");
    })
    .catch(function (error) {
      alert("Algo parece andar mal, pero pronto estará arreglado. :)");
      console.error("Fetch fallido");
    });
}

function CambiarDatos(ListaDatos, NumeroDato) {
  document.getElementById("ImagenDelDato").src = ListaDatos[NumeroDato].Imagen;
  document.getElementById("ImagenDelDato").alt =
    "Imagen ilustrativa del dato - Créditos a sus respectivos autores";

  document.getElementById("TituloTooltipxd").innerHTML = "Imagen: ";
  document.getElementById("URLCreditosTooltip").href =
    ListaDatos[NumeroDato].URLAutorImagen;
  document.getElementById("URLCreditosTooltip").innerHTML =
    ListaDatos[NumeroDato].AutorImagen;

  document.getElementById("DatoPresentado").innerHTML =
    ListaDatos[NumeroDato].Info;
  document.getElementById("FuentePresentada").href =
    ListaDatos[NumeroDato].URLFuente;
  document.getElementById("FuentePresentada").innerHTML =
    ListaDatos[NumeroDato].Fuente;
  document.getElementById("CreditosDelDato").innerHTML =
    ListaDatos[NumeroDato].Credito;

  setTimeout(NarradorPlay, 50);
}

function RandomNum(Min, Max) {
  return Math.floor(Math.random() * (Max - Min + 1)) + Min;
}

function TraerAnterior() {
  DatoActual = DatoActual - 1;
  FetchCambiarDato(DatoActual);
  TransicionCarga();
  RevisarInicioFin();

  document.getElementById("linkDeEstaPagina").innerHTML =
    window.location + "?dato=" + DatoActual;
}

function TraerRandom() {
  do {
    var Random = RandomNum(0, DatosTotales - 1);
  } while (Random == DatoActual);
  DatoActual = Random;

  FetchCambiarDato(DatoActual);
  TransicionCarga();
  RevisarInicioFin();

  document.getElementById("linkDeEstaPagina").innerHTML =
  window.location + "?dato=" + DatoActual;
}

function TraerSiguiente() {
  DatoActual = DatoActual + 1;
  FetchCambiarDato(DatoActual);
  TransicionCarga();
  RevisarInicioFin();

  document.getElementById("linkDeEstaPagina").innerHTML =
  window.location + "?dato=" + DatoActual;
}

function NavTeclas() {
  if (document.activeElement.parentElement.className != "Pregunta") {
    TeclaPresionada = event.keyCode;
    if (RunNav == true) {
      RunNav = false;
      setTimeout(function() {
        RunNav = true;
      }, 250)
      if (TeclaPresionada == 37 && DatoActual != -1 && DatoActual != 0) {
        document.getElementById("BotonAnterior").focus();
        TraerAnterior();
      }

      if (TeclaPresionada == 27) {
        document.getElementById("BotonRandom").focus();
        TraerRandom();
      }

      if (TeclaPresionada == 39 && DatoActual != DatosTotales - 1) {
        document.getElementById("BotonSiguiente").focus();
        TraerSiguiente();
      }
    }
  }
}

window.onkeydown = NavTeclas;

function ErrorImagen() {
  const LogoDeCabecera = document.getElementById("LogoDeCabecera");

  if (LogoDeCabecera.alt == "Logo de FunFact en modo oscuro") {
    document.getElementById("ImagenDelDato").src =
      "IMG/IllustracionOnErrorPorUnDraw.svg";
  } else {
    document.getElementById("ImagenDelDato").src =
      "IMG/IllustracionOnErrorPorUnDrawLM.svg";
  }

  document.getElementById("TituloTooltipxd").innerHTML =
    "Conéctate a Internet para ver imágenes sobre los datos curiosos";
  document.getElementById("URLCreditosTooltip").innerHTML = "";
  document.getElementById("ImagenDelDato").alt =
    "Conéctate a Internet para mostrar imágenes de los datos";
}

function RevisarVoces() {
  if(typeof speechSynthesis === 'undefined') {
    return;
  }
  var Voces = speechSynthesis.getVoices();
  VocesNarrador = Voces.length;

  if (VocesNarrador > 0) {
    console.log("Voces disponibles encontradas");
  }
  NarradorSetUp();
}

RevisarVoces();
  if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = RevisarVoces;
  }

  

function NarradorSetUp() {
  if ("speechSynthesis" in window && VocesNarrador > 0) {
    document.getElementById("ToggleVoice").style.pointerEvents = "all";
    document.getElementById("ToggleVoice").title = "Activar narrador";
    document.getElementById("ToggleVoice").innerHTML = '<i class="icon icon-narradoroff"></i>';
  }

  Texto.lang = "es-Mx";
  Texto.voiceURI = "Microsoft Raul - Spanish (Mexico)";
  Narrador = false;
}

function NarradorPlay() {
  window.speechSynthesis.cancel();
  if (Narrador == true) {
    Texto.text = document.getElementById("DatoPresentado").innerHTML;
    window.speechSynthesis.speak(Texto);
  }
}

document.getElementById("ToggleVoice").addEventListener("click", (e) => {
  e.preventDefault();

  Narrador = !Narrador;

  if (Narrador == false) {
    document.getElementById("ToggleVoice").title = "Activar narración";
    document.getElementById("ToggleVoice").innerHTML = '<i class="icon icon-narradoroff"></i>';
    window.speechSynthesis.cancel();
  } else {
    document.getElementById("ToggleVoice").title = "Desactivar narración";
    document.getElementById("ToggleVoice").innerHTML = '<i class="icon icon-narradoron"></i>';
  }
});