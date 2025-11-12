// Definición global necesaria para ScriptGlobal.js
var ImagenesRecursos = [
  "../../CSS/styles.css",
  "../../CSS/stylesLight.css",
  "../../IMG/Horizontales/LogoHorizontalDM[FF].svg",
  "../../IMG/Horizontales/LogoHorizontalLM[FF].svg",
  "IMG/IllustracionporUnSplash.svg",
  "IMG/IllustracionporUnSplashLM.svg",
];

class FunFactApp {
    constructor() {
        // Estado de la aplicación
        this.datos = [];
        this.datoActivo = null; // Objeto del dato actualmente mostrado
        this.indiceActual = -1;
        this.indiceImagenActual = 0;
        this.totalDatos = 0;
        this.narradorActivo = false;
        this.speechSynthesisUtterance = new SpeechSynthesisUtterance();

        // Referencias al DOM (Caché)
        this.dom = {
            imagenDato: document.getElementById("ImagenDelDato"),
            tituloTooltip: document.getElementById("TituloTooltipxd"),
            urlCreditosTooltip: document.getElementById("URLCreditosTooltip"),
            navImg: document.getElementById("NavImg"),
            btnImgIzquierda: document.getElementById("CambiarIMGIzq"),
            btnImgDerecha: document.getElementById("CambiarIMGDer"),
            datoPresentado: document.getElementById("DatoPresentado"),
            fuentePresentada: document.getElementById("FuentePresentada"),
            fuentePresentadaB: document.getElementById("FuentePresentadaB"),
            creditosDato: document.getElementById("CreditosDelDato"),
            btnAnterior: document.getElementById("BotonAnterior"),
            linkAnterior: document.getElementById("DatoAnterior"),
            btnSiguiente: document.getElementById("BotonSiguiente"),
            linkSiguiente: document.getElementById("DatoSiguiente"),
            btnRandom: document.getElementById("BotonRandom"),
            contenedorCarga: document.getElementById("ContenedorCarga"),
            carga: document.getElementById("Carga"),
            linkEstaPagina: document.getElementById("linkDeEstaPagina"),
            toggleVoice: document.getElementById("ToggleVoice")
        };

        this.inicializar();
    }

    async inicializar() {
        try {
            const response = await fetch("API/Datos.json");
            this.datos = await response.json();
            this.totalDatos = Object.keys(this.datos).length;
            console.log(`FunFactApp: ${this.totalDatos} datos cargados.`);

            this.configurarNarrador();
            this.configurarEventos();
            this.revisarURLInicial();

            // Exponer instancia globalmente para extensiones (ej. ScriptAdmin.js)
            window.funFactApp = this;
            // Disparar evento personalizado por si otros scripts esperan la inicialización
            window.dispatchEvent(new CustomEvent('funFactAppReady', { detail: this }));

        } catch (error) {
            console.error("FunFactApp Error:", error);
            alert("No se pudieron cargar los datos curiosos. Verifica tu conexión y recarga.");
        }
    }

    configurarEventos() {
        this.dom.linkAnterior.addEventListener('click', (e) => { e.preventDefault(); this.navegar(-1); });
        this.dom.linkSiguiente.addEventListener('click', (e) => { e.preventDefault(); this.navegar(1); });
        
        // Manejo robusto del botón random (por si cambia la estructura HTML)
        const randomTarget = this.dom.btnRandom.closest('a') || this.dom.btnRandom;
        randomTarget.addEventListener('click', (e) => { e.preventDefault(); this.datoAleatorio(); });

        this.dom.btnImgIzquierda.addEventListener('click', () => this.cambiarImagen(-1));
        this.dom.btnImgDerecha.addEventListener('click', () => this.cambiarImagen(1));
        this.dom.toggleVoice.addEventListener('click', (e) => { e.preventDefault(); this.alternarNarrador(); });

        window.addEventListener('keydown', (e) => this.manejarTeclado(e));

        this.dom.imagenDato.addEventListener('load', () => this.finalizarTransicionCarga());
        this.dom.imagenDato.addEventListener('error', () => this.manejarErrorImagen());
    }

    configurarNarrador() {
        if ('speechSynthesis' in window) {
            this.speechSynthesisUtterance.lang = "es-MX";
            this.dom.toggleVoice.style.pointerEvents = "all";
            this.actualizarIconoNarrador();

            // Intentar cargar voz preferida cuando estén disponibles
            const cargarVoz = () => {
                const voces = window.speechSynthesis.getVoices();
                const vozMX = voces.find(v => v.lang === 'es-MX' && (v.name.includes('Mexico') || v.name.includes('Paulina')));
                if (vozMX) this.speechSynthesisUtterance.voice = vozMX;
            };
            
            if (speechSynthesis.onvoiceschanged !== undefined) {
                speechSynthesis.onvoiceschanged = cargarVoz;
            }
            cargarVoz(); // Intento inicial
        }
    }

    revisarURLInicial() {
        const urlParams = new URLSearchParams(window.location.search);
        const datoURL = parseInt(urlParams.get('dato'));

        if (!isNaN(datoURL) && datoURL >= 0 && datoURL < this.totalDatos) {
            this.mostrarDato(indice);
             // Limpiar URL para evitar inconsistencias al recargar
             window.history.replaceState({}, document.title, window.location.pathname);
        } else {
            this.actualizarEstadoBotones();
        }
    }

    mostrarDato(indice) {
        indice = parseInt(indice);
        if (isNaN(indice) || indice < 0 || indice >= this.totalDatos) return;

        this.indiceActual = indice;
        this.datoActivo = this.datos[this.indiceActual];
        this._actualizarVistaConDatoActivo();
    }

    // Método para uso administrativo (Vista Previa)
    mostrarDatoTemporal(datoObjeto) {
        this.indiceActual = -1; // -1 indica que no está en la lista principal
        this.datoActivo = datoObjeto;
        
        this._actualizarVistaConDatoActivo();

        // Forzar deshabilitado de navegación principal
        this.alternarBoton(this.dom.btnAnterior, this.dom.linkAnterior, true);
        this.alternarBoton(this.dom.btnSiguiente, this.dom.linkSiguiente, true);
    }

    _actualizarVistaConDatoActivo() {
        if (!this.datoActivo) return;

        this.indiceImagenActual = 0;
        this.iniciarTransicionCarga();

        // Actualizar textos
        this.dom.datoPresentado.innerHTML = this.datoActivo.Info;
        this.dom.creditosDato.innerHTML = this.datoActivo.Credito;
        this.actualizarFuente(this.datoActivo);

        // Actualizar imagen e interfaz
        this.actualizarImagen();
        if (this.indiceActual !== -1) this.actualizarEstadoBotones(); // Solo si es dato real
        this.actualizarEstadoNavegacionImagenes();
        this.actualizarLinkCompartir();

        this.reproducirNarracion();
    }

    actualizarFuente(dato) {
        const tieneURL = this.validarURL(dato.URLFuente);
        if (tieneURL) {
            this.dom.fuentePresentada.href = dato.URLFuente;
            this.dom.fuentePresentada.innerHTML = dato.Fuente;
            this.dom.fuentePresentadaB.innerHTML = "";
        } else {
            this.dom.fuentePresentada.removeAttribute("href");
            this.dom.fuentePresentada.innerHTML = "";
            this.dom.fuentePresentadaB.innerHTML = dato.URLFuente || dato.Fuente;
        }
    }

    actualizarImagen() {
        if (!this.datoActivo || !this.datoActivo.Imagenes) return;
        
        const imagen = this.datoActivo.Imagenes[this.indiceImagenActual];
        if (!imagen) return;

        this.dom.imagenDato.src = imagen.url;
        this.dom.imagenDato.classList.add("ImgNoToggleMode");
        this.dom.imagenDato.alt = "Imagen ilustrativa del dato";

        this.dom.tituloTooltip.innerHTML = "Imagen: ";
        this.dom.urlCreditosTooltip.href = imagen.urlOrig;
        this.dom.urlCreditosTooltip.innerHTML = imagen.Autor;
    }

    cambiarImagen(direccion) {
        if (!this.datoActivo || !this.datoActivo.Imagenes) return;

        const nuevoIndex = this.indiceImagenActual + direccion;
        if (nuevoIndex >= 0 && nuevoIndex < this.datoActivo.Imagenes.length) {
            this.iniciarTransicionCarga();
            this.indiceImagenActual = nuevoIndex;
            this.actualizarImagen();
            this.actualizarEstadoNavegacionImagenes();
        }
    }

    navegar(direccion) {
        this.mostrarDato(this.indiceActual + direccion);
    }

    datoAleatorio() {
        let nuevoIndice;
        do {
            nuevoIndice = Math.floor(Math.random() * this.totalDatos);
        } while (nuevoIndice === this.indiceActual && this.totalDatos > 1);
        this.mostrarDato(nuevoIndice);
        this.dom.btnRandom.focus();
    }

    actualizarEstadoBotones() {
        const esPrimero = this.indiceActual <= 0;
        const esUltimo = this.indiceActual >= this.totalDatos - 1;
        const ningunDato = this.indiceActual === -1;

        this.alternarBoton(this.dom.btnAnterior, this.dom.linkAnterior, esPrimero || ningunDato);
        this.alternarBoton(this.dom.btnSiguiente, this.dom.linkSiguiente, esUltimo);
    }

    alternarBoton(boton, link, deshabilitar) {
        if (deshabilitar) {
            boton.setAttribute("disabled", "");
            link.classList.add("Btndisabled");
        } else {
            boton.removeAttribute("disabled");
            link.classList.remove("Btndisabled");
        }
    }

    actualizarEstadoNavegacionImagenes() {
        const multiple = this.datoActivo && this.datoActivo.Imagenes.length > 1;

        if (multiple) {
            this.dom.navImg.classList.add("MasImg");
            this.habilitarNavImagen(this.dom.btnImgIzquierda, this.indiceImagenActual > 0);
            this.habilitarNavImagen(this.dom.btnImgDerecha, this.indiceImagenActual < this.datoActivo.Imagenes.length - 1);
        } else {
            this.dom.navImg.classList.remove("MasImg");
        }
    }

    habilitarNavImagen(boton, habilitar) {
        boton.style.color = habilitar ? "var(--Texto-Principal)" : "var(--Texto-Nota)";
        boton.style.pointerEvents = habilitar ? "all" : "none";
    }

    alternarNarrador() {
        this.narradorActivo = !this.narradorActivo;
        this.actualizarIconoNarrador();
        this.narradorActivo ? this.reproducirNarracion() : window.speechSynthesis.cancel();
    }

    actualizarIconoNarrador() {
        this.dom.toggleVoice.title = this.narradorActivo ? "Desactivar narración" : "Activar narración";
        this.dom.toggleVoice.innerHTML = `<i class="icon icon-narrador${this.narradorActivo ? 'on' : 'off'}"></i>`;
    }

    reproducirNarracion() {
        window.speechSynthesis.cancel();
        if (this.narradorActivo && this.dom.datoPresentado.textContent) {
            // Pequeño delay para asegurar renderizado del texto
            setTimeout(() => {
                this.speechSynthesisUtterance.text = this.dom.datoPresentado.innerText;
                window.speechSynthesis.speak(this.speechSynthesisUtterance);
            }, 100);
        }
    }

    iniciarTransicionCarga() {
        this.dom.contenedorCarga.style.opacity = "1";
        this.dom.carga.style.opacity = "1";
    }

    finalizarTransicionCarga() {
        this.dom.contenedorCarga.style.opacity = "0";
        this.dom.carga.style.opacity = "0";
    }

    manejarErrorImagen() {
        const modoOscuro = (typeof Modo !== 'undefined') ? Modo : true;
        this.dom.imagenDato.src = modoOscuro ? "IMG/IllustracionOnErrorPorUnDraw.svg" : "IMG/IllustracionOnErrorPorUnDrawLM.svg";
        this.dom.imagenDato.classList.remove("ImgNoToggleMode");
        this.dom.imagenDato.alt = "No se pudo cargar la imagen.";
        this.dom.tituloTooltip.innerHTML = "Imagen no disponible";
        this.dom.urlCreditosTooltip.removeAttribute("href");
        this.dom.urlCreditosTooltip.innerHTML = "";
        this.finalizarTransicionCarga();
    }

    actualizarLinkCompartir() {
        const baseUrl = window.location.href.split('?')[0];
        // Si es dato temporal (-1), no ponemos parámetro dato
        const param = this.indiceActual !== -1 ? `?dato=${this.indiceActual}` : '';
        this.dom.linkEstaPagina.innerHTML = `${baseUrl}${param}`;
    }

    manejarTeclado(e) {
        // Ignorar si el usuario está escribiendo en un formulario
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

        switch(e.key) {
            case 'ArrowLeft': if (this.indiceActual > 0) this.navegar(-1); break;
            case 'ArrowRight': if (this.indiceActual < this.totalDatos - 1) this.navegar(1); break;
            case 'Escape': this.datoAleatorio(); break;
        }
    }

    validarURL(str) {
        try { new URL(str); return true; } catch { return false; }
    }
}

// Iniciar App
document.addEventListener('DOMContentLoaded', () => new FunFactApp());