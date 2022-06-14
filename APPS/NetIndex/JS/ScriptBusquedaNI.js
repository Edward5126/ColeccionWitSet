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
                <a href="#Resultados" onclick="VerPreview(${Pagina.id})">
                    <div class="MasInfoItem">
                        <div class="MasInfoB">
                            <i class="icon icon-lupa"></i>
                        </div>
                        <img class="imgItem" src="${Pagina.img}" alt="">
                    </div>
                </a>
                <a href="${Pagina.url}" target="_blank" rel="noopener noreferrer">
                <div>
                    <p>
                        <b class="NombreItem">${Pagina.nombre}</b>
                        <br><br>
                        ${Pagina.info}.
                    </p>
                </div>
                </a>
            </div>
            `
        }
    }

    if (Cajon.innerHTML === "") {
        Cajon.innerHTML = '<p>No se encontraron resultados, intenta realizar una <a href="#">búsqueda</a> con palabras clave diferentes o revisa la ortografía de tus palabras</p>';
    }
}

BotonBusqueda.addEventListener("click", filtrar);

function VerPreview(Sitio) {
    document.getElementById("Preview").innerHTML = `
    <div class="CuadroDeTexto" id="CajonPreview">
        <div class="DetallesPreview">
            <div id="InfoPreview">
                <img src="${Lista[Sitio].img}" alt="" class="ImgPreview">        
                <div>
                    <h3 class="TituloPreview">${Lista[Sitio].nombre}</h3>
                    <p>${Lista[Sitio].info}</p>
                </div>
            </div>
            <div class="ListaDetalles">
                <div><span class="PiezaDetallePreview">URL: <br></span><a href="${Lista[Sitio].url}" target="_blank" rel="noopener noreferrer">${Lista[Sitio].url}</a> <br></div>
                <div><span class="PiezaDetallePreview">Última revisión: <br></span> ${Lista[Sitio].revision} <br></div>
                <div><span class="PiezaDetallePreview">Disponible en español: <br></span> ${Lista[Sitio].spanish} <br> </div>
                <div><span class="PiezaDetallePreview">Compartido por: <br></span> ${Lista[Sitio].colaborador} <br></div>
            </div>
        </div>
    </div>
    `   
}

window.onkeydown = () => {
    if (document.activeElement.id === "BusquedaPrincipal" && event.keyCode == 13 && document.getElementById("BtnBuscar").attributes.length == 1) {
        filtrar();
        document.getElementById("Resultados").scrollIntoView();
    }
}