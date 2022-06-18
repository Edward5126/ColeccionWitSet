// PARA EL MENÚ DE NAVEGACIÓN MÓVIL
const NavList = document.querySelector(".NavList");

const Enlaces = document.querySelectorAll(".linkAncla");

function MenuMovil() {
  NavList.classList.toggle("MenuAbierto");
}

Enlaces.forEach((element) => {
  element.addEventListener("click", MenuMovil);
});

// PARA LA FUNCIÓN DE COMPARTIR
var BotonCopiarEnlace = document.getElementById("copiarEnlaceCompartir"),
    url = document.getElementById("linkDeEstaPagina");

    BotonCopiarEnlace.addEventListener("click", function() {

      url.innerHTML = window.location;

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
        url.innerHTML = window.location;

        navigator.share({
          url: document.getElementById("linkDeEstaPagina").textContent,
          title: document.title
        })
      }
    });

// PARA OCULTAR Y MOSTRAR NAVBAR
let UbicacionPrincipal = window.scrollY;

window.onscroll = function () {
  if (screen.width > 800) {
    let Desplazamiento = window.scrollY;
    if (UbicacionPrincipal >= Desplazamiento) {
      document.getElementById("EnlacesNav").style.top = "0";
    } else {
      document.getElementById("EnlacesNav").style.top = "-100px";
    }

    UbicacionPrincipal = Desplazamiento;
  }
};

document.addEventListener("mousemove", function (e) {
  if (screen.width > 800) {
    var y = e.clientY;

    if (y < 25) {
      document.getElementById("EnlacesNav").style.top = "0";
    } else if (y > 25) {
      document.addEventListener("click", () => {
        document.getElementById("EnlacesNav").style.top = "-100px";
      });
    }
  }
});

// PARA DARK&LIGHTMODE
// false = light
// true = dark

// Selectores
const css = 0,
LogoCabecera = 1,
IlustracionPrin = 2;

// Recursos
const cssDM = 0,
cssLM = 1,
LogoHorizontalDM = 2, 
LogoHorizontalLM = 3,
IlustracionPrinDM = 4,
IlustracionPrinLM = 5;

var ImagenesSelectores = ["#HojadeEstilo", "#LogoDeCabecera", ".IlustracionPrincipalDeLaPagina"];
var ImagenesRecursos;

const CambiarEstilo = document.getElementById("ToggleMode");
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

function ActivarEstiloLight() {
    console.log("Estilo Claro");

    let i = 0;
    for (let Selector of ImagenesSelectores){
            if (Selector == "#HojadeEstilo") {
                document.querySelector(Selector).href = ImagenesRecursos[1];
            } else {
              if (!document.querySelector(Selector).classList.contains("ImgNoToggleMode")) {
                document.querySelector(Selector).src = ImagenesRecursos[i*2+1];
              }
            }
        i++;
    };
}

function ActivarEstiloDark() {
    console.log("Estilo Oscuro");

    let i = 0;
    for (let Selector of ImagenesSelectores){
            if (Selector == "#HojadeEstilo") {
                document.querySelector(Selector).href = ImagenesRecursos[0];
            } else {
              if (!document.querySelector(Selector).classList.contains("ImgNoToggleMode")) {
                document.querySelector(Selector).src = ImagenesRecursos[i*2];
            }
          }
        i++;
    };
}