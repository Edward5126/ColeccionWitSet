class GlobalApp {
    constructor() {
        // Configuración y Estado
        this.modoOscuro = true; // Valor por defecto
        
        // Referencias DOM principales
        this.dom = {
            navList: document.querySelector(".NavList"),
            enlacesMenu: document.querySelectorAll(".linkAncla"),
            navbar: document.getElementById("EnlacesNav"),
            toggleMode: document.getElementById("ToggleMode"),
            btnCopiarEnlace: document.getElementById("copiarEnlaceCompartir"),
            linkEstaPagina: document.getElementById("linkDeEstaPagina"),
            respuestaCopiado: document.getElementById("RespuestaCopiado"),
            botonCompartirNativo: document.getElementById("BotonListaCompartir"),
            html: document.querySelector("html")
        };

        // Estado para scroll
        this.ultimoScrollY = window.scrollY;

        this.inicializar();
    }

    inicializar() {
        this.configurarMenuMovil();
        this.configurarNavbarDinamica();
        this.configurarCompartir();
        this.configurarTema();
    }

    // --- 1. MENÚ MÓVIL ---
    configurarMenuMovil() {
        this.dom.enlacesMenu.forEach(enlace => {
            enlace.addEventListener("click", () => this.alternarMenuMovil());
        });
    }

    alternarMenuMovil() {
        this.dom.navList.classList.toggle("MenuAbierto");
        this.dom.html.classList.toggle("htmlquieto");
    }

    // --- 2. NAVBAR DINÁMICA ---
    configurarNavbarDinamica() {
        window.addEventListener("scroll", () => this.gestionarScrollNavbar());
        document.addEventListener("mousemove", (e) => this.gestionarMouseNavbar(e));
    }

    gestionarScrollNavbar() {
        if (window.innerWidth <= 800) return; // Solo para escritorio

        const desplazamientoActual = window.scrollY;
        if (this.ultimoScrollY >= desplazamientoActual) {
            this.dom.navbar.style.top = "0"; // Mostrar al subir
        } else {
            this.dom.navbar.style.top = "-100px"; // Ocultar al bajar
        }
        this.ultimoScrollY = desplazamientoActual;
    }

    gestionarMouseNavbar(e) {
        if (window.innerWidth <= 800) return;

        if (e.clientY < 25) {
            this.dom.navbar.style.top = "0"; // Mostrar si mouse está cerca del borde superior
        } else if (e.clientY > 100 && this.dom.navbar.style.top === "0") {
             // Opcional: Ocultar si el mouse se aleja mucho y no se ha hecho scroll hacia arriba
             // Tu código original usaba un click listener extraño aquí, esto es más limpio:
             // Si quieres que se oculte al hacer click fuera, podrías añadir ese listener específico.
             // Por ahora, lo dejamos simple basado en scroll principalmente.
        }
    }

    // --- 3. COMPARTIR ---
    configurarCompartir() {
        // Establecer URL actual al cargar
        if (this.dom.linkEstaPagina) {
             this.dom.linkEstaPagina.textContent = window.location.href;
        }

        if (this.dom.btnCopiarEnlace) {
            this.dom.btnCopiarEnlace.addEventListener("click", (e) => {
                e.preventDefault();
                this.copiarEnlaceAlPortapapeles();
            });
        }

        if (this.dom.botonCompartirNativo && navigator.share) {
            this.dom.botonCompartirNativo.addEventListener("click", (e) => {
                e.preventDefault();
                navigator.share({
                    title: document.title,
                    url: window.location.href
                }).catch(err => console.log("Error al compartir:", err));
            });
        } else if (this.dom.botonCompartirNativo) {
             // Opcional: Ocultar si no es compatible, o dejar que funcione como 'details' normal
             // this.dom.botonCompartirNativo.style.display = 'none'; 
        }
    }

    async copiarEnlaceAlPortapapeles() {
        try {
            await navigator.clipboard.writeText(window.location.href);
            this.mostrarFeedbackCopiado();
        } catch (err) {
            // Fallback para navegadores antiguos si navigator.clipboard falla
            this.copiarFallback();
        }
    }

    copiarFallback() {
        const rango = document.createRange();
        const seleccion = window.getSelection();
        seleccion.removeAllRanges();
        rango.selectNodeContents(this.dom.linkEstaPagina);
        seleccion.addRange(rango);
        document.execCommand('copy');
        seleccion.removeAllRanges();
        this.mostrarFeedbackCopiado();
    }

    mostrarFeedbackCopiado() {
        this.dom.respuestaCopiado.innerHTML = "<b>Enlace copiado</b>";
        const iconoOriginal = this.dom.btnCopiarEnlace.innerHTML;
        this.dom.btnCopiarEnlace.innerHTML = '<i class="icon icon-portapapeles-ok logoRedSocial"></i>';

        setTimeout(() => {
            this.dom.respuestaCopiado.innerHTML = "";
            this.dom.btnCopiarEnlace.innerHTML = '<i class="icon icon-portapapeles logoRedSocial"></i>';
        }, 5000);
    }

    // --- 4. TEMA (DARK/LIGHT MODE) ---
    configurarTema() {
        if (this.dom.toggleMode) {
            this.dom.toggleMode.addEventListener('click', (e) => {
                e.preventDefault();
                this.alternarTema();
            });
        }
        this.cargarTemaGuardado();
    }

    cargarTemaGuardado() {
        const temaGuardado = localStorage.getItem('Estilo');
        if (temaGuardado === 'false') { // 'false' era light mode en tu código original
            this.establecerTema(false);
        } else {
            this.establecerTema(true); // Por defecto oscuro
        }
    }

    alternarTema() {
        this.establecerTema(!this.modoOscuro);
    }

    establecerTema(esOscuro) {
        this.modoOscuro = esOscuro;
        localStorage.setItem('Estilo', esOscuro);

        // Exponer globalmente para compatibilidad con otros scripts (como FunFactApp)
        window.Modo = esOscuro; 

        console.log("Estilo:", esOscuro ? "Oscuro" : "Claro");

        // Actualizar Hojas de Estilo y Logos Globales
        // Asumiendo que ImagenesRecursos está definida globalmente en Script.js (o aquí si prefieres moverla)
        if (typeof ImagenesRecursos !== 'undefined') {
            const hrefEstilo = esOscuro ? ImagenesRecursos[0] : ImagenesRecursos[1];
            const logoSrc = esOscuro ? ImagenesRecursos[2] : ImagenesRecursos[3];

            document.querySelector("#HojadeEstilo").href = hrefEstilo;
            const logoCabecera = document.querySelector("#LogoDeCabecera");
            if (logoCabecera) logoCabecera.src = logoSrc;

            // Actualizar imágenes específicas de la página que no tengan la clase de exclusión
            const imagenesPagina = document.querySelectorAll(".IlustracionPrincipalDeLaPagina");
            imagenesPagina.forEach(img => {
                if (!img.classList.contains("ImgNoToggleMode")) {
                     // Aquí tu lógica original era un poco específica a índices fijos en ImagenesRecursos [4] y [5]
                     // Si todas las apps usan las mismas 2 imagenes de fondo, ok. Si no, esto podría necesitar ser más dinámico.
                     img.src = esOscuro ? ImagenesRecursos[4] : ImagenesRecursos[5];
                }
            });
        }
    }
}

// Inicializar GlobalApp cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.globalApp = new GlobalApp();
});