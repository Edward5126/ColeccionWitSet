// Script para el menú de navegación móvil
const NavList = document.querySelector(".NavList");
const BtnMenu = document.querySelector(".btnmenu");
const BtnMenu2 = document.getElementById("CerrarMenu");
const Enlace1 = document.getElementById("Enlace1");
const Enlace2 = document.getElementById("Enlace2");
const Enlace3 = document.getElementById("Enlace3");
const Enlace4 = document.getElementById("Enlace4");

function MenuMovil() {
  NavList.classList.toggle("MenuAbierto");
}

BtnMenu.addEventListener("click", MenuMovil);
BtnMenu2.addEventListener("click", MenuMovil);
Enlace1.addEventListener("click", MenuMovil);
Enlace2.addEventListener("click", MenuMovil);
Enlace3.addEventListener("click", MenuMovil);
Enlace4.addEventListener("click", MenuMovil);

// Para el cambio de estilos
// false = light
// true = dark
const CambiarEstilo = document.getElementById("ToggleMode");
const StyleSheet = document.getElementById("HojadeEstilo");
const LogoPrincipal = document.getElementById("LogoDeCabecera");
const Ilustracion = document.getElementById("ImagenDelDato");
var Modo = true;
var ModoGuardado;

CargarEstilo();

CambiarEstilo.addEventListener('click', e => {
  e.preventDefault();
  Modo = !Modo;

  if(Modo == false && localStorage.getItem('Estilo') == 'true'){
  ActivarEstiloLight();
  AlmacenarEstilo('false');
  } else {
    ActivarEstiloDark();
    AlmacenarEstilo('true');
  }
})

function CargarEstilo() {
  const EstiloActual = localStorage.getItem('Estilo')

  if(EstiloActual == 'false') {
    AlmacenarEstilo('false');
    ActivarEstiloLight();
  }
}

function AlmacenarEstilo(valor) {
  localStorage.setItem('Estilo', valor);
}
var ModoActual = "Oscuro";

function ActivarEstiloLight() {
  StyleSheet.href = "CSS/stylesLight.css";
  LogoPrincipal.src = "../../IMG/Horizontales/LogoHorizontalLM[FF].svg";
  LogoPrincipal.alt = "Logo de FunFact en modo claro";
  if(Ilustracion.alt == "") {
    Ilustracion.src = "IMG/IllustracionporUnSplashLM.svg";
  }
  if(Ilustracion.alt == "Conéctate a Internet para mostrar imágenes de los datos") {
    Ilustracion.src = "IMG/IllustracionOnErrorPorUnDrawLM.svg";
  }
}

function ActivarEstiloDark() {
  StyleSheet.href = "CSS/styles.css";
  LogoPrincipal.src = "../../IMG/Horizontales/LogoHorizontalDM[FF].svg";
  LogoPrincipal.alt = "Logo de FunFact en modo oscuro";
  if(Ilustracion.alt == "") {
    Ilustracion.src = "IMG/IllustracionporUnSplash.svg";
  }
  if(Ilustracion.alt == "Conéctate a Internet para mostrar imágenes de los datos") {
    Ilustracion.src = "IMG/IllustracionOnErrorPorUnDraw.svg";
  }
}

var BotonCopiarEnlace = document.getElementById("copiarEnlaceCompartir"),
    url = document.getElementById("linkDeEstaPagina");

    BotonCopiarEnlace.addEventListener("click", function() {

      var Rango = document.createRange(),
          Seleccion = window.getSelection();

          Seleccion.removeAllRanges();

          Rango.selectNodeContents(url);

          Seleccion.addRange(Rango);

          document.execCommand('copy');

          Seleccion.removeAllRanges();

          document.getElementById("RespuestaCopiado").innerHTML="<b>Enlace copiado</b>";

          document.getElementById("copiarEnlaceCompartir").innerHTML='<i class="icon icon-portapapeles-ok logoRedSocial"></i>';

          setTimeout(function() {
            document.getElementById("RespuestaCopiado").innerHTML="";
            document.getElementById("copiarEnlaceCompartir").innerHTML='<i class="icon icon-portapapeles logoRedSocial"></i>';
          }, 5000);
    }, false);

    document.getElementById("BotonListaCompartir").addEventListener("click", e => {
      if (navigator.share) {
        e.preventDefault();

        navigator.share({
          url: document.getElementById("linkDeEstaPagina").textContent,
          title: document.title
        })
      }
    });