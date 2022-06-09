const busqueda = document.querySelector("#BusquedaPrincipal");
const BotonBusqueda = document.querySelector("#BtnBuscar");
const linkboton = document.querySelector("#ABtnBuscar");
const Cajon = document.querySelector("#CajonApps");

var Lista = [];

busqueda.oninput = desbloquearboton;

SetUpPaginas();

function SetUpPaginas() {
    fetch("API/Paginas.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (ListaPaginas) {
            console.log("Lista de páginas cargada.");
            Lista = ListaPaginas;
        })
        .catch(function(error) {
            console.error("Fetch fallido");
        })
}

function desbloquearboton() {
    if (busqueda.value.length > 0) {
        BotonBusqueda.removeAttribute("disabled");
        linkboton.classList.remove("Btndisabled");
    } else {
        BotonBusqueda.setAttribute("disabled", "");
        linkboton.classList.add("Btndisabled");
    }
}

const filtrar = ()=> {
    Cajon.innerHTML = "";

    var parametro = busqueda.value.toLowerCase();

    for (let Pagina of Lista) {
        let Clave = Pagina.claves;

        if (Clave.indexOf(parametro) !== -1) {
            Cajon.innerHTML += `
            <div class="item">
            <img class="imgItem" src="${Pagina.img}" alt="">
            <div> <a href="${Pagina.url}" target="_blank">
                <p><b class="NombreItem">${Pagina.nombre}</b><br><br>
                ${Pagina.info}</p>
            </a></div>
            </div>
            `
        }
    }

    if (Cajon.innerHTML === "") {
        Cajon.innerHTML = '<p>No se encontraron resultados, intenta realizar una <a href="#">búsqueda</a> con palabras clave diferentes o revisa la ortografía de tus palabras</p>';
    }
}

BotonBusqueda.addEventListener("click", filtrar);