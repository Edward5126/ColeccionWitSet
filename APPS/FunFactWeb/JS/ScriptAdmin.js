
    var JSONP;
    var ConteoImg = 1;
    var BotonCopiarJSON = document.getElementById("copiarJSONGenerado"),
    urlJSON = document.getElementById("ContenedorJSON");

    const busqueda = document.querySelector("#BusquedaPrincipal");
    const BotonBusqueda = document.querySelector("#BtnBuscar");
    const linkboton = document.querySelector("#ABtnBuscar");
    const Cajon = document.querySelector("#CajonApps");

    busqueda.oninput = desbloquearboton;

    function desbloquearboton() {
      if (busqueda.value.length > 0) {
          BotonBusqueda.removeAttribute("disabled");
          linkboton.classList.remove("Btndisabled");
      } else {
          BotonBusqueda.setAttribute("disabled", "");
          linkboton.classList.add("Btndisabled");
      }
  }

  window.onkeydown = () => {
    if (document.activeElement.id === "BusquedaPrincipal" && event.keyCode == 13 && document.getElementById("BtnBuscar").attributes.length == 1) {
        filtrar();
        document.getElementById("Buscar").scrollIntoView();
    }
}

const filtrar = ()=> {
    Cajon.innerHTML = "";

    var parametro = busqueda.value.toLowerCase();

    for (let Dato of ListaExterna) {
        let Clave = Dato.Claves;

        if (Clave.indexOf(parametro) !== -1) {
            Cajon.innerHTML += `
            <div class="item">
                <a href="#" onclick="FetchCambiarDato(${Dato.No})">
                    <div class="MasInfoItem">
                        <div class="MasInfoB">
                            <i class="icon icon-lupa"></i>
                        </div>
                        <img class="imgItem" src="${Dato.Imagenes[0].url}" alt="">
                    </div>
                </a>
                <div>
                    
                        <b class="NombreItem">${Dato.No}</b>
                        <br><br>
                        <div style="height: 3.5em; overflow: hidden;">
                        ${Dato.Info}
                        </div>
                </div>
            </div>
            `
        }
    }

    if (Cajon.innerHTML === "") {
        Cajon.innerHTML = '<p>No se encontraron resultados, intenta realizar una <a href="#">búsqueda</a> con palabras clave diferentes o revisa la ortografía de tus palabras</p>';
    }
}

BotonBusqueda.addEventListener("click", filtrar);

    var Categorias = ["Algas","Animales","Astronomía","Competencias","Condiciones","Educación","Fenómenos naturales","Generales","Lugares","Plantas"];
    
    CargarCategorías();

    setTimeout(e => {
        document.getElementById("NumeroDato").setAttribute('max', DatosTotales);
      }, 1000);
      
    
    BotonCopiarJSON.addEventListener("click", function() {
    //   var Rango = document.createRange(),
    //       Seleccion = window.getSelection();
    //       Seleccion.removeAllRanges();
    //       Rango.selectNodeContents(urlJSON);
    //       Seleccion.addRange(Rango);
        urlJSON.select();
          document.execCommand('copy');
        //   Seleccion.removeAllRanges();
          document.getElementById("copiarJSONGenerado").innerHTML='<i class="icon icon-portapapeles-ok logoRedSocial"></i>';
          setTimeout(function() {
            document.getElementById("copiarJSONGenerado").innerHTML='<i class="icon icon-portapapeles logoRedSocial"></i>';
          }, 5000);
    }, false);
        
    var NumeroDatoVar;

        document.getElementById("ObtenerDetallesDelDato").addEventListener('click',  e => {
        e.preventDefault();

        NumeroDatoVar = document.getElementById("NumeroDato").value;
        console.log(NumeroDatoVar);

        FetchCambiarDato(NumeroDatoVar);
        setTimeout(ObtenerDetalles, 100);

        DatoActual = parseInt(NumeroDatoVar);

        RevisarInicioFin();
        });

        document.getElementById("ProbarDetallesDelDato").addEventListener('click', e => {
            e.preventDefault();

            EnviarDetalles();
        })

        document.getElementById("NuevaEntrada").addEventListener('click', e => {
            e.preventDefault();
            document.getElementById("NuevaEntrada").toggleAttribute("disabled");
            document.getElementById("Formulario").reset();
            document.getElementById("ListaImagenes").innerHTML = `
            <div class="ConjuntoImg">
                                <div class="Pregunta">
                                    <input  id="ImagenSugerida1" name="Imagen" type="text" required placeholder="(URL a la imagen)">
                                    <label for="ImagenSugerida1">Imagen</label>
                                </div>
                                <div class="Pregunta">
                                    <input  id="URLCreditosImagen1" name="URLdeCreditosdeImagen" type="text" required placeholder="(URL a la página donde el fotógrafo publicó su imagen)">
                                    <label for="URLCreditosImagen1">URL de publicación</label>
                                </div>
                                <div class="Pregunta">
                                    <input  id="CreditosImagen1" name="CreditosdeImagen" type="text" required placeholder="(Nombre de la persona o institución)">
                                    <label for="CreditosImagen1">Nombre del fotógrafo</label>
                                </div>
                            </div>
            `
            ConteoImg = 1;

            document.getElementById("NumeroDato").value = document.getElementById("NumeroDato").max;
            document.getElementById("LabelNumero").innerHTML = "Número (Nueva entrada)";
            document.getElementById("ObtenerDetallesDelDato").setAttribute("disabled", "");
            document.getElementById("CajonEtiquetas").innerHTML = `
            <button id="AgregarEtiqueta" onclick="AgregarEt(event)">+</button>
            <span class="Etiqueta">*</span>
            `;
        })

        document.getElementById("Borrador").addEventListener('click', e => {
            e.preventDefault();

            document.getElementById("Formulario").reset();
            document.getElementById("ListaImagenes").innerHTML = `
            <div class="ConjuntoImg">
                                <div class="Pregunta">
                                    <input  id="ImagenSugerida1" name="Imagen" type="text" required placeholder="(URL a la imagen)">
                                    <label for="ImagenSugerida1">Imagen</label>
                                </div>
                                <div class="Pregunta">
                                    <input  id="URLCreditosImagen1" name="URLdeCreditosdeImagen" type="text" required placeholder="(URL a la página donde el fotógrafo publicó su imagen)">
                                    <label for="URLCreditosImagen1">URL de publicación</label>
                                </div>
                                <div class="Pregunta">
                                    <input  id="CreditosImagen1" name="CreditosdeImagen" type="text" required placeholder="(Nombre de la persona o institución)">
                                    <label for="CreditosImagen1">Nombre del fotógrafo</label>
                                </div>
                            </div>
            `
            document.getElementById("Borrador").setAttribute("disabled", "");
            document.getElementById("CajonEtiquetas").innerHTML = '<button id="AgregarEtiqueta" onclick="AgregarEt(event)">+</button>';
        })

        document.getElementById("AgregarDato").addEventListener('click', e => {
            e.preventDefault();

            document.getElementById("EstadoAgregador").checked = false;
            document.getElementById("AgregarDato").toggleAttribute("disabled");

            var MaximoNuevo =  parseInt(document.getElementById("NumeroDato").max) + 1;

            document.getElementById("NumeroDato").setAttribute('max', MaximoNuevo);

            JSONP = CrearObjetoPrueba();

            document.getElementById("ContenedorJSON").value += ", " + JSON.stringify(JSONP);

            // ListaExterna.push(JSONP);

            document.getElementById("LabelNumero").innerHTML = "Número (Nueva entrada agregada)";
        })

    function ObtenerDetalles(){
        // document.getElementById("ImagenSugerida").value = document.getElementById("ImagenDelDato").src;
        // document.getElementById("URLCreditosImagen").value = document.getElementById("URLCreditosTooltip").href;
        // document.getElementById("CreditosImagen").value = document.getElementById("URLCreditosTooltip").textContent;

        ConteoImg = 0;

        document.getElementById("ListaImagenes").innerHTML = ""; 
        ListaExterna[DatoActual].Imagenes.forEach(element => {
            // if(ConteoImg > 1) {
            // document.getElementById("QuitarImagen").removeAttribute("disabled");
            // }
            ConteoImg++; 
            if (ConteoImg == 1) {
                document.getElementById("QuitarImagen").setAttribute("disabled", "");
                document.getElementById("ListaImagenes").innerHTML += `
        <div class="ConjuntoImg" id="Img${ConteoImg}">
                            <div class="Pregunta">
                                <input  id="ImagenSugerida${ConteoImg}" name="Imagen" type="text" required placeholder="(URL a la imagen)" value="${element.url}">
                                <label for="ImagenSugerida${ConteoImg}">Imagen ${ConteoImg}</label>
                            </div>
                            <div class="Pregunta">
                                <input  id="URLCreditosImagen${ConteoImg}" name="URLdeCreditosdeImagen" type="text" required placeholder="(URL a la página donde el fotógrafo publicó su imagen)"  value="${element.urlOrig}">
                                <label for="URLCreditosImagen${ConteoImg}">URL de publicación ${ConteoImg}</label>
                            </div>
                            <div class="Pregunta">
                                <input  id="CreditosImagen${ConteoImg}" name="CreditosdeImagen" type="text" required placeholder="(Nombre de la persona o institución)" value="${element.Autor}">
                                <label for="CreditosImagen${ConteoImg}">Nombre del fotógrafo ${ConteoImg}</label>
                            </div>
                        </div>
        `
            } else if (ConteoImg > 1) {
                document.getElementById("QuitarImagen").removeAttribute("disabled");

                document.getElementById("ListaImagenes").innerHTML += `
        <div class="ConjuntoImg" id="Img${ConteoImg}">
            <hr>
                            <div class="Pregunta">
                                <input  id="ImagenSugerida${ConteoImg}" name="Imagen" type="text" required placeholder="(URL a la imagen)" value="${element.url}">
                                <label for="ImagenSugerida${ConteoImg}">Imagen ${ConteoImg}</label>
                            </div>
                            <div class="Pregunta">
                                <input  id="URLCreditosImagen${ConteoImg}" name="URLdeCreditosdeImagen" type="text" required placeholder="(URL a la página donde el fotógrafo publicó su imagen)"  value="${element.urlOrig}">
                                <label for="URLCreditosImagen${ConteoImg}">URL de publicación ${ConteoImg}</label>
                            </div>
                            <div class="Pregunta">
                                <input  id="CreditosImagen${ConteoImg}" name="CreditosdeImagen" type="text" required placeholder="(Nombre de la persona o institución)" value="${element.Autor}">
                                <label for="CreditosImagen${ConteoImg}">Nombre del fotógrafo ${ConteoImg}</label>
                            </div>
                        </div>
        `
            }
        });

        document.getElementById("DatoCuriosoSugerido").value = ListaExterna[DatoActual].Info;
        document.getElementById("FuenteDeDatoSugerido").value = ListaExterna[DatoActual].Fuente;
        document.getElementById("URLFuenteDeDatoSugerido").value = ListaExterna[DatoActual].URLFuente;
        document.getElementById("CreditoDelAporte").value = ListaExterna[DatoActual].Credito;
        document.getElementById("Categoria").value = ListaExterna[DatoActual].Categoría;

        document.getElementById("CajonEtiquetas").innerHTML = '<button id="AgregarEtiqueta" onclick="AgregarEt(event)">+</button>';
        ListaExterna[DatoActual].Claves.forEach(element => {
            document.getElementById("CajonEtiquetas").innerHTML += `
        <span class="Etiqueta">${element}</span>
        `;
        });
    }

    function EnviarDetalles(){

        JSONP = CrearObjetoPrueba();

        document.getElementById("ImagenDelDato").src =
    JSONP.Imagenes[0].url;
  document.getElementById("ImagenDelDato").classList.add("ImgNoToggleMode");
  document.getElementById("ImagenDelDato").alt =
    "Imagen ilustrativa del dato - Créditos a sus respectivos autores";

  document.getElementById("TituloTooltipxd").innerHTML = "Imagen: ";
  document.getElementById("URLCreditosTooltip").href =
    JSONP.Imagenes[0].urlOrig;
  document.getElementById("URLCreditosTooltip").innerHTML =
    JSONP.Imagenes[0].Autor;

  if (JSONP.Imagenes.length > 1) {
    document.getElementById("NavImg").classList.add("MasImg");

    ImgSubTotales = JSONP.Imagenes.length;

    ImgActual = 0;

    if (ImgActual == 0) {
      document.getElementById("CambiarIMGIzq").style.color =
        "var(--Texto-Nota)";
      document.getElementById("CambiarIMGIzq").style.pointerEvents = "none";
    }
  } else {
    document.getElementById("NavImg").classList.remove("MasImg");
  }

  document.getElementById("DatoPresentado").innerHTML =
    JSONP.Info;
  document.getElementById("FuentePresentada").href =
    JSONP.URLFuente;
  document.getElementById("FuentePresentada").innerHTML =
    JSONP.Fuente;
  document.getElementById("CreditosDelDato").innerHTML =
    JSONP.Credito;

  setTimeout(NarradorPlay, 50);
        


        // document.getElementById("ImagenDelDato").src = document.getElementById("ImagenSugerida").value;
        // document.getElementById("TituloTooltipxd").innerHTML = "Imagen: ";
        // document.getElementById("URLCreditosTooltip").href = document.getElementById("URLCreditosImagen").value;
        // document.getElementById("URLCreditosTooltip").innerHTML = document.getElementById("CreditosImagen").value;
        // document.getElementById("DatoPresentado").innerHTML = document.getElementById("DatoCuriosoSugerido").value;
        // document.getElementById("FuentePresentada").innerHTML = document.getElementById("FuenteDeDatoSugerido").value;
        // document.getElementById("FuentePresentada").href = document.getElementById("URLFuenteDeDatoSugerido").value;
        // document.getElementById("CreditosDelDato").innerHTML = document.getElementById("CreditoDelAporte").value;

    }

    function CrearObjetoPrueba() {
        var JSONNuevo = new Object();
        JSONNuevo.No = document.getElementById("NumeroDato").value;
        JSONNuevo.Imagenes = [];
        for (let i = 0; i < document.querySelectorAll(".ConjuntoImg").length; i++) {
            const element = document.querySelectorAll(".ConjuntoImg")[i];
            let Simg = "ImagenSugerida" + (i+1);
            let Surl = "URLCreditosImagen" + (i+1);
            let SAutor = "CreditosImagen" + (i+1);

            JSONNuevo.Imagenes[i] = {};
            JSONNuevo.Imagenes[i].url = document.getElementById(Simg).value;
            JSONNuevo.Imagenes[i].Autor = document.getElementById(SAutor).value;
            JSONNuevo.Imagenes[i].urlOrig = document.getElementById(Surl).value;
        }
        JSONNuevo.Info = document.getElementById("DatoCuriosoSugerido").value;
        JSONNuevo.Fuente = document.getElementById("FuenteDeDatoSugerido").value;
        JSONNuevo.URLFuente = document.getElementById("URLFuenteDeDatoSugerido").value;
        JSONNuevo.Credito = document.getElementById("CreditoDelAporte").value;
        JSONNuevo.Categoría = document.getElementById("Categoria").value;

        JSONNuevo.Claves = [];
        for (let i = 0; i < document.querySelectorAll(".Etiqueta").length; i++) {
            const element = document.querySelectorAll(".Etiqueta")[i];
            JSONNuevo.Claves.push(element.innerHTML);
        }
        
        console.log(JSONNuevo);
        console.log("," + JSON.stringify(JSONNuevo));

        return JSONNuevo;
    }

    function GenerarJson() {
        // var Numero = document.getElementById("NumeroDato").value;

        // var Imagen = document.getElementById("ImagenSugerida").value;
        // var URLImagen = document.getElementById("URLCreditosImagen").value;
        // var CreditoImagen = document.getElementById("CreditosImagen").value;

        // var Informacion = document.getElementById("DatoCuriosoSugerido").value;
        // var NombreFuente = document.getElementById("FuenteDeDatoSugerido").value;
        // var URLFuente = document.getElementById("URLFuenteDeDatoSugerido").value;
        // var CreditoDato = document.getElementById("CreditoDelAporte").value;
        // var Categoria = document.getElementById("Categoria").value;

        // var JSONString = '\t{\n\t\t"No": "' + Numero + '",\n\t\t "Imagen": "' + Imagen + '",\n\t\t "URLAutorImagen": "' + URLImagen + '",\n\t\t "AutorImagen":"' + CreditoImagen + '",\n\t\t "Info":"' + Informacion + '",\n\t\t "Fuente":"' + NombreFuente + '",\n\t\t "URLFuente":"' + URLFuente + '",\n\t\t "Credito": "' + CreditoDato + '"\n\t}';

        // // JSONNuevo = JSON.parse(JSONString);
        // console.log(JSONNuevo);
        // document.getElementById("ContenedorJSON").value += ",\n\n" + JSONString;
    }

    document.getElementById("NumeroDato").oninput = function() {
        if(document.getElementById("NumeroDato").value == document.getElementById("NumeroDato").max){
            document.getElementById("LabelNumero").innerHTML += " (Nueva entrada)";
            document.getElementById("ObtenerDetallesDelDato").setAttribute("disabled", "");
        } else {
            document.getElementById("LabelNumero").innerHTML = "Número";
            document.getElementById("ObtenerDetallesDelDato").removeAttribute("disabled");
        }
    };

    document.getElementById("EstadoBorrador").oninput = function() {
        document.getElementById("Borrador").toggleAttribute("disabled");
    };

    document.getElementById("EstadoAgregador").oninput = function() {
        document.getElementById("AgregarDato").toggleAttribute("disabled");
    }

    document.getElementById("EstadoNuevo").oninput = function() {
        document.getElementById("NuevaEntrada").toggleAttribute("disabled");
    }

    // document.querySelectorAll(".btnprn").forEach(element => {
    //     element.addEventListener("click", function() {
    //     document.getElementById("NumeroDato").value = DatoActual;
    // })
    // });

    function AgregarIMG(e) {
        e.preventDefault();

        document.getElementById("QuitarImagen").removeAttribute("disabled");
        
        ConteoImg++; 

        let Fragmento = document.createDocumentFragment();
        let DivSup = document.createElement("div");
        Fragmento.appendChild(DivSup);
        DivSup.setAttribute("class", "ConjuntoImg");
        DivSup.setAttribute("id", `Img${ConteoImg}`);

        let Salto = document.createElement("hr");
        DivSup.appendChild(Salto);

        let PregImg1 = document.createElement("div");
        PregImg1.setAttribute("class", "Pregunta");
        DivSup.appendChild(PregImg1);

        let Input1 = document.createElement("input");
        Input1.setAttribute("id", `ImagenSugerida${ConteoImg}`);
        Input1.setAttribute("name", "Imagen");
        Input1.setAttribute("type", "text");
        Input1.setAttribute("required", "");
        Input1.setAttribute("placeholder", "(URL a la imagen)");
        PregImg1.appendChild(Input1);

        let Label1 = document.createElement("label");
        Label1.setAttribute("for",`ImagenSugerida${ConteoImg}`);
        Label1.textContent = `Imagen ${ConteoImg}`;
        PregImg1.appendChild(Label1);

        let PregImg2 = document.createElement("div");
        PregImg2.setAttribute("class", "Pregunta");
        DivSup.appendChild(PregImg2);

        let Input2 = document.createElement("input");
        Input2.setAttribute("id", `URLCreditosImagen${ConteoImg}`);
        Input2.setAttribute("name", "URLdeCreditosdeImagen");
        Input2.setAttribute("type", "text");
        Input2.setAttribute("required", "");
        Input2.setAttribute("placeholder", "(URL a la página donde el fotógrafo publicó su imagen)");
        PregImg2.appendChild(Input2);

        let Label2 = document.createElement("label");
        Label2.setAttribute("for",`URLCreditosImagen${ConteoImg}`);
        Label2.textContent = `URL de publicación ${ConteoImg}`;
        PregImg2.appendChild(Label2);

        let PregImg3 = document.createElement("div");
        PregImg3.setAttribute("class", "Pregunta");
        DivSup.appendChild(PregImg3);

        let Input3 = document.createElement("input");
        Input3.setAttribute("id", `CreditosImagen${ConteoImg}`);
        Input3.setAttribute("name", "CreditosdeImagen");
        Input3.setAttribute("type", "text");
        Input3.setAttribute("required", "");
        Input3.setAttribute("placeholder", "(Nombre de la persona o institución)");
        PregImg3.appendChild(Input3);

        let Label3 = document.createElement("label");
        Label3.setAttribute("for",`CreditosImagen${ConteoImg}`);
        Label3.textContent = `Nombre del fotógrafo ${ConteoImg}`;
        PregImg3.appendChild(Label3);

        document.getElementById("ListaImagenes").appendChild(Fragmento);

        // document.getElementById("ListaImagenes").innerHTML += `
        // <div class="ConjuntoImg" id="Img${ConteoImg}">
        //     <hr>
        //                     <div class="Pregunta">
        //                         <input  id="ImagenSugerida${ConteoImg}" name="Imagen" type="text" required placeholder="(URL a la imagen)">
        //                         <label for="ImagenSugerida${ConteoImg}">Imagen ${ConteoImg}</label>
        //                     </div>
        //                     <div class="Pregunta">
        //                         <input  id="URLCreditosImagen${ConteoImg}" name="URLdeCreditosdeImagen" type="text" required placeholder="(URL a la página donde el fotógrafo publicó su imagen)">
        //                         <label for="URLCreditosImagen${ConteoImg}">URL de publicación ${ConteoImg}</label>
        //                     </div>
        //                     <div class="Pregunta">
        //                         <input  id="CreditosImagen${ConteoImg}" name="CreditosdeImagen" type="text" required placeholder="(Nombre de la persona o institución)">
        //                         <label for="CreditosImagen${ConteoImg}">Nombre del fotógrafo ${ConteoImg}</label>
        //                     </div>
        //                 </div>
        // `
    }

    function QuitarIMG(e) {
        e.preventDefault();

        if (confirm("¿Borrar última imagen?")){
        document.getElementById(`Img${ConteoImg}`).remove();
        ConteoImg--;
        }

        if(ConteoImg == 1) {
            document.getElementById("QuitarImagen").setAttribute("disabled","");
        }
    }

    document.querySelectorAll(".Etiqueta").forEach(element => {
        element.addEventListener("click", e => {
            if (confirm("¿Eliminar esta etiqueta?")) {
                element.remove();
            }
        })        
    });

    function AgregarEt(e) {
        e.preventDefault();

        let Et = prompt("Etiqueta a añadir:");
        if (Et != "" && Et != null) {
        document.getElementById("CajonEtiquetas").innerHTML += `
        <span class="Etiqueta">${Et}</span>
        `;

        document.querySelectorAll(".Etiqueta").forEach(element => {
        element.addEventListener("click", e => {
            if (confirm("¿Eliminar esta etiqueta?")) {
                element.remove();
            }
        })        
        });
        }
    }

    function PPrevIMG() {
  TransicionCarga();
  document.getElementById("CambiarIMGDer").style.color =
    "var(--Texto-Principal)";
  document.getElementById("CambiarIMGDer").style.pointerEvents = "all";

  document.getElementById("ImagenDelDato").src =
    JSONP.Imagenes[ImgActual - 1].url;
  document.getElementById("URLCreditosTooltip").href =
    JSONP.Imagenes[ImgActual - 1].urlOrig;
  document.getElementById("URLCreditosTooltip").innerHTML =
    JSONP.Imagenes[ImgActual - 1].Autor;

  ImgActual -= 1;

  if (ImgActual == 0) {
    document.getElementById("CambiarIMGIzq").style.color = "var(--Texto-Nota)";
    document.getElementById("CambiarIMGIzq").style.pointerEvents = "none";
  }
}

function PSigIMG() {
  TransicionCarga();
  document.getElementById("CambiarIMGIzq").style.color =
    "var(--Texto-Principal)";
  document.getElementById("CambiarIMGIzq").style.pointerEvents = "all";

  document.getElementById("ImagenDelDato").src =
    JSONP.Imagenes[ImgActual + 1].url;
  document.getElementById("URLCreditosTooltip").href =
    JSONP.Imagenes[ImgActual + 1].urlOrig;
  document.getElementById("URLCreditosTooltip").innerHTML =
    JSONP.Imagenes[ImgActual + 1].Autor;

  ImgActual += 1;

  if (ImgActual == ImgSubTotales - 1) {
    document.getElementById("CambiarIMGDer").style.color = "var(--Texto-Nota)";
    document.getElementById("CambiarIMGDer").style.pointerEvents = "none";
  }
}

function CargarCategorías() {
    document.getElementById("Categoria").innerHTML = `
    <option value="0" hidden>Categoria</option>
    <option value="+">[Agregar otra]</option>
    `;

    Categorias.forEach(element => {
        document.getElementById("Categoria").innerHTML += `
        <option value="${element}">${element}</option>`;
    });
}

document.getElementById("Categoria").oninput = function() {
    if (this.value == "+") {
        let nuevo = prompt("Nueva categoría a agregar:");
        Categorias.push(nuevo);
        CargarCategorías();
        this.value = nuevo;
    }
}

window.onload = function() {
            document.getElementById("Conteo").innerHTML = DatosTotales;
    }

setTimeout(() => {
    document.querySelector(".SaludoPrincipal").innerHTML = "¡<i>" + DatosTotales +"</i> datos curiosos disponibles actualmente!"
}, 250);