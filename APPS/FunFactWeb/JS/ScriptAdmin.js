class FunFactAdmin {
    constructor(appInstance) {
        this.app = appInstance;
        this.conteoImg = 1;
        this.categorias = [
            "Alimentos", "Algas", "Animales", "Astronomía", "Competencias",
            "Condiciones", "Educación", "Fenómenos naturales", "Gastronomía",
            "Generales", "Geografía", "Lugares", "Plantas", "Salud"
        ];

        // Referencias DOM Admin
        this.dom = {
            busqueda: document.querySelector("#BusquedaPrincipal"),
            botonBusqueda: document.querySelector("#BtnBuscar"),
            linkBotonBusqueda: document.querySelector("#ABtnBuscar"),
            cajonResultados: document.querySelector("#CajonApps"),
            numeroDato: document.getElementById("NumeroDato"),
            labelNumero: document.getElementById("LabelNumero"),
            btnObtener: document.getElementById("ObtenerDetallesDelDato"),
            btnProbar: document.getElementById("ProbarDetallesDelDato"),
            btnNuevo: document.getElementById("NuevaEntrada"),
            btnBorrador: document.getElementById("Borrador"),
            btnAgregarDato: document.getElementById("AgregarDato"),
            formulario: document.getElementById("Formulario"),
            listaImagenes: document.getElementById("ListaImagenes"),
            btnAgregarImg: document.getElementById("AgregarImagen"),
            btnQuitarImg: document.getElementById("QuitarImagen"),
            cajonEtiquetas: document.getElementById("CajonEtiquetas"),
            btnAgregarEtiqueta: document.getElementById("AgregarEtiqueta"),
            selectCategoria: document.getElementById("Categoria"),
            contenedorJSON: document.getElementById("ContenedorJSON"),
            btnCopiarJSON: document.getElementById("copiarJSONGenerado"),
            checkBorrador: document.getElementById("EstadoBorrador"),
            checkAgregador: document.getElementById("EstadoAgregador"),
            checkNuevo: document.getElementById("EstadoNuevo")
        };

        this.inicializar();
    }

    inicializar() {
        this.actualizarTitulo();
        this.configurarInputNumero();
        this.cargarCategorias();
        this.configurarEventos();
        console.log("FunFactAdmin inicializado y conectado a FunFactApp.");
    }

    actualizarTitulo() {
        document.querySelector("title").innerHTML = `[${this.app.totalDatos}] Panel de Administración | Fun Fact`;
    }

    configurarInputNumero() {
        this.dom.numeroDato.setAttribute("max", this.app.totalDatos - 1);
        this.dom.numeroDato.value = 0; // Opcional: iniciar en 0
    }

    configurarEventos() {
        // Búsqueda
        this.dom.busqueda.addEventListener("input", () => this.manejarInputBusqueda());
        this.dom.botonBusqueda.addEventListener("click", (e) => {
             e.preventDefault();
             this.filtrarResultados();
        });
        this.dom.busqueda.addEventListener("keydown", (e) => {
            if (e.key === 'Enter' && !this.dom.botonBusqueda.disabled) {
                this.filtrarResultados();
                document.getElementById("Buscar").scrollIntoView();
            }
        });

        // Gestión de Datos
        this.dom.btnObtener.addEventListener("click", (e) => { e.preventDefault(); this.obtenerDetalles(); });
        this.dom.btnProbar.addEventListener("click", (e) => { e.preventDefault(); this.probarDetalles(); });
        this.dom.btnNuevo.addEventListener("click", (e) => { e.preventDefault(); this.prepararNuevaEntrada(); });
        this.dom.btnBorrador.addEventListener("click", (e) => { e.preventDefault(); this.limpiarBorrador(); });
        this.dom.btnAgregarDato.addEventListener("click", (e) => { e.preventDefault(); this.generarJSONFinal(); });

        // Gestión de Imágenes y Etiquetas en Formulario
        this.dom.btnAgregarImg.addEventListener("click", (e) => { e.preventDefault(); this.agregarCampoImagen(); });
        this.dom.btnQuitarImg.addEventListener("click", (e) => { e.preventDefault(); this.quitarCampoImagen(); });
        // Delegación de eventos para etiquetas dinámicas
        this.dom.cajonEtiquetas.addEventListener("click", (e) => {
            if (e.target.id === "AgregarEtiqueta") {
                e.preventDefault();
                this.agregarEtiqueta();
            } else if (e.target.classList.contains("Etiqueta")) {
                if (confirm("¿Eliminar esta etiqueta?")) e.target.remove();
            }
        });

        // Utilidades
        this.dom.selectCategoria.addEventListener("input", (e) => this.manejarNuevaCategoria(e));
        this.dom.btnCopiarJSON.addEventListener("click", (e) => { e.preventDefault(); this.copiarJSON(); });
        this.dom.numeroDato.addEventListener("input", () => this.validarNumeroDato());

        // Checkboxes de estado
        this.dom.checkBorrador.addEventListener("change", () => this.dom.btnBorrador.toggleAttribute("disabled"));
        this.dom.checkAgregador.addEventListener("change", () => this.dom.btnAgregarDato.toggleAttribute("disabled"));
        this.dom.checkNuevo.addEventListener("change", () => this.dom.btnNuevo.toggleAttribute("disabled"));
    }

    // --- MÉTODOS DE BÚSQUEDA ---
    manejarInputBusqueda() {
        const tieneTexto = this.dom.busqueda.value.length > 0;
        if (tieneTexto) {
            this.dom.botonBusqueda.removeAttribute("disabled");
            this.dom.linkBotonBusqueda.classList.remove("Btndisabled");
        } else {
            this.dom.botonBusqueda.setAttribute("disabled", "");
            this.dom.linkBotonBusqueda.classList.add("Btndisabled");
        }
    }

    filtrarResultados() {
        this.dom.cajonResultados.innerHTML = "";
        const parametro = this.dom.busqueda.value.toLowerCase();

        // Usamos this.app.datos directamente
        const resultados = this.app.datos.filter(dato => 
            dato.Claves.some(clave => clave.toLowerCase().includes(parametro))
        );

        resultados.forEach(dato => {
            this.dom.cajonResultados.innerHTML += this.crearHTMLResultado(dato);
        });

        if (resultados.length === 0) {
            this.dom.cajonResultados.innerHTML = '<p>No se encontraron resultados.</p>';
        }
    }

    crearHTMLResultado(dato) {
        // Nota: Usamos window.funFactApp.mostrarDato en el onclick para que funcione desde el HTML generado
        return `
            <div class="item">
                <a href="#" onclick="event.preventDefault(); window.funFactApp.mostrarDato(${dato.No}); document.querySelector('main').scrollIntoView();">
                    <div class="MasInfoItem">
                        <div class="MasInfoB"><i class="icon icon-lupa"></i></div>
                        <img class="imgItem" src="${dato.Imagenes[0].url}" alt="">
                    </div>
                </a>
                <div>
                    <b class="NombreItem">${dato.No}</b><br><br>
                    <div style="height: 3.5em; overflow: hidden;">${dato.Info}</div>
                </div>
            </div>`;
    }

    // --- MÉTODOS DE FORMULARIO ---
    obtenerDetalles() {
        const indice = parseInt(this.dom.numeroDato.value);
        if (isNaN(indice) || !this.app.datos[indice]) return;

        const dato = this.app.datos[indice];
        this.app.mostrarDato(indice); // Mostrar vista previa también

        // Llenar formulario
        this.conteoImg = 0;
        this.dom.listaImagenes.innerHTML = "";
        dato.Imagenes.forEach(img => this.agregarCampoImagen(img));

        document.getElementById("DatoCuriosoSugerido").value = dato.Info;
        document.getElementById("FuenteDeDatoSugerido").value = dato.Fuente;
        document.getElementById("URLFuenteDeDatoSugerido").value = dato.URLFuente;
        document.getElementById("CreditoDelAporte").value = dato.Credito;
        this.dom.selectCategoria.value = dato.Categoría;

        // Llenar etiquetas
        this.renderizarEtiquetas(dato.Claves);
    }

    probarDetalles() {
        const datoTemporal = this.crearObjetoDesdeFormulario();
        this.app.mostrarDatoTemporal(datoTemporal);
        document.querySelector('main').scrollIntoView();
    }

    crearObjetoDesdeFormulario() {
        const nuevoDato = {
            No: this.dom.numeroDato.value,
            Imagenes: [],
            Info: document.getElementById("DatoCuriosoSugerido").value,
            Fuente: document.getElementById("FuenteDeDatoSugerido").value,
            URLFuente: document.getElementById("URLFuenteDeDatoSugerido").value,
            Credito: document.getElementById("CreditoDelAporte").value,
            Categoría: this.dom.selectCategoria.value,
            Claves: []
        };

        // Recolectar imágenes
        const conjuntosImg = this.dom.listaImagenes.querySelectorAll(".ConjuntoImg");
        conjuntosImg.forEach((conjunto, i) => {
            const inputs = conjunto.querySelectorAll("input");
            // Asumiendo orden: [0]=URL, [1]=URLOrig, [2]=Autor según tu estructura original
            nuevoDato.Imagenes.push({
                url: inputs[0].value,
                urlOrig: inputs[1].value,
                Autor: inputs[2].value
            });
        });

        // Recolectar etiquetas
        this.dom.cajonEtiquetas.querySelectorAll(".Etiqueta").forEach(et => {
            if (et.textContent !== "*") nuevoDato.Claves.push(et.textContent);
        });

        return nuevoDato;
    }

    prepararNuevaEntrada() {
        this.dom.formulario.reset();
        this.dom.listaImagenes.innerHTML = "";
        this.conteoImg = 0;
        this.agregarCampoImagen(); // Una imagen vacía por defecto

        const nuevoMax = this.app.totalDatos;
        this.dom.numeroDato.setAttribute("max", nuevoMax);
        this.dom.numeroDato.value = nuevoMax;
        this.validarNumeroDato();
        
        this.dom.cajonEtiquetas.innerHTML = '<button id="AgregarEtiqueta">+</button><span class="Etiqueta">*</span>';
        this.dom.btnNuevo.setAttribute("disabled", ""); // Auto-desactivar para evitar doble click
    }

    limpiarBorrador() {
        this.dom.formulario.reset();
        this.dom.listaImagenes.innerHTML = "";
        this.conteoImg = 0;
        this.agregarCampoImagen();
        this.dom.cajonEtiquetas.innerHTML = '<button id="AgregarEtiqueta">+</button>';
        this.dom.btnBorrador.setAttribute("disabled", "");
    }

    generarJSONFinal() {
        const dato = this.crearObjetoDesdeFormulario();
        const jsonString = JSON.stringify(dato, null, 4); // Indentación para lectura fácil
        this.dom.contenedorJSON.value += (this.dom.contenedorJSON.value ? ",\n" : "") + jsonString;
        
        this.dom.btnAgregarDato.setAttribute("disabled", "");
        this.dom.labelNumero.innerHTML = "Número (Agregado al JSON)";
        
        // Opcional: Incrementar automáticamente para la siguiente entrada
        // this.prepararNuevaEntrada();
    }

    // --- GESTIÓN DE IMÁGENES DINÁMICAS ---
    agregarCampoImagen(datosPrellenados = null) {
        this.conteoImg++;
        const id = this.conteoImg;
        const div = document.createElement("div");
        div.className = "ConjuntoImg";
        div.id = `Img${id}`;
        if (id > 1) div.appendChild(document.createElement("hr"));

        div.innerHTML += `
            <div class="Pregunta">
                <input id="ImagenSugerida${id}" type="text" required placeholder="(URL a la imagen)" value="${datosPrellenados ? datosPrellenados.url : ''}">
                <label for="ImagenSugerida${id}">Imagen ${id}</label>
            </div>
            <div class="Pregunta">
                <input id="URLCreditosImagen${id}" type="text" required placeholder="(URL publicación)" value="${datosPrellenados ? datosPrellenados.urlOrig : ''}">
                <label for="URLCreditosImagen${id}">URL publicación ${id}</label>
            </div>
            <div class="Pregunta">
                <input id="CreditosImagen${id}" type="text" required placeholder="(Nombre fotógrafo)" value="${datosPrellenados ? datosPrellenados.Autor : ''}">
                <label for="CreditosImagen${id}">Fotógrafo ${id}</label>
            </div>
        `;
        this.dom.listaImagenes.appendChild(div);
        this.actualizarEstadoBotonQuitarImg();
    }

    quitarCampoImagen() {
        if (this.conteoImg > 1 && confirm("¿Borrar última imagen?")) {
            document.getElementById(`Img${this.conteoImg}`).remove();
            this.conteoImg--;
            this.actualizarEstadoBotonQuitarImg();
        }
    }

    actualizarEstadoBotonQuitarImg() {
        if (this.conteoImg <= 1) {
            this.dom.btnQuitarImg.setAttribute("disabled", "");
        } else {
            this.dom.btnQuitarImg.removeAttribute("disabled");
        }
    }

    // --- UTILIDADES ---
    renderizarEtiquetas(claves) {
        this.dom.cajonEtiquetas.innerHTML = '<button id="AgregarEtiqueta">+</button>';
        claves.forEach(clave => {
            this.dom.cajonEtiquetas.innerHTML += `<span class="Etiqueta">${clave}</span>`;
        });
    }

    agregarEtiqueta() {
        const tag = prompt("Etiqueta a añadir:");
        if (tag) {
            this.dom.cajonEtiquetas.innerHTML += `<span class="Etiqueta">${tag}</span>`;
        }
    }

    cargarCategorias() {
        let html = '<option value="0" hidden>Categoria</option><option value="+">[Agregar otra]</option>';
        this.categorias.forEach(cat => html += `<option value="${cat}">${cat}</option>`);
        this.dom.selectCategoria.innerHTML = html;
    }

    manejarNuevaCategoria(e) {
        if (e.target.value === "+") {
            const nueva = prompt("Nueva categoría:");
            if (nueva) {
                this.categorias.push(nueva);
                this.categorias.sort(); // Opcional: mantener ordenado
                this.cargarCategorias();
                this.dom.selectCategoria.value = nueva;
            } else {
                this.dom.selectCategoria.value = "0";
            }
        }
    }

    validarNumeroDato() {
        const esNuevo = this.dom.numeroDato.value >= this.app.totalDatos;
        if (esNuevo) {
            this.dom.labelNumero.innerHTML = "Número (Nueva entrada)";
            this.dom.btnObtener.setAttribute("disabled", "");
        } else {
            this.dom.labelNumero.innerHTML = "Número";
            this.dom.btnObtener.removeAttribute("disabled");
        }
    }

    copiarJSON() {
        this.dom.contenedorJSON.select();
        document.execCommand("copy");
        const originalHTML = this.dom.btnCopiarJSON.innerHTML;
        this.dom.btnCopiarJSON.innerHTML = '<i class="icon icon-portapapeles-ok logoRedSocial"></i> <span>¡Copiado!</span>';
        setTimeout(() => this.dom.btnCopiarJSON.innerHTML = originalHTML, 3000);
    }
}

// Inicialización: Esperar a que FunFactApp esté lista
if (window.funFactApp && window.funFactApp.totalDatos > 0) {
    new FunFactAdmin(window.funFactApp);
} else {
    window.addEventListener('funFactAppReady', (e) => {
        new FunFactAdmin(e.detail);
    });
}