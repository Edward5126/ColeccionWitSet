//Se importan los json de las comidas y las bebidas y se dejan disponibles en una variable cada una.
// import ListaComidas from ".././API/RecetasComidas.json" assert { type: "json" };
// console.log(ListaComidas);
// import ListaBebidas from ".././API/RecetasBebidas.json" assert { type: "json" };
// console.log(ListaBebidas);

var ListaComidas = [];
var ListaBebidas = [];
var Estado = false;

var Dia = new Date();
var DiaActual = Dia.getDay();

if (localStorage.getItem("ArrayComidasP") !== undefined && localStorage.getItem("ArrayComidasP")) {
  SetUpRecetasP();
} else {
  SetUpRecetas();
};

function SetUpRecetasP() {
  ListaComidas = JSON.parse(localStorage.getItem("ArrayComidasP"));
  ListaBebidas = JSON.parse(localStorage.getItem("ArrayBebidasP"));
  console.log("Recetarios de comidas y bebidas personalizados alcanzados");
  CargarListas();
  setTimeout(() => {CambiarDia(DiaActual)}, 5);
}

function SetUpRecetas() {
  fetch("API/RecetasComidas.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (ListaRecibida) {
      ListaComidas = ListaRecibida;
      console.log("Recetario de Comidas alcanzado.");
    })
    .catch(function (error) {
      alert(
        "Algo parece andar mal, pero pronto estará arreglado. Intenta de nuevo más tarde o notifica este error. (Extracción Fallida)"
      );
      console.error("Fetch fallido");
    });
  fetch("API/RecetasBebidas.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (ListaRecibida2) {
      ListaBebidas = ListaRecibida2;
      console.log("Recetario de Bebidas alcanzado.");
      CargarListas();
      CambiarDia(DiaActual);
    })
    .catch(function (error) {
      alert(
        "Algo parece andar mal, pero pronto estará arreglado. Intenta de nuevo más tarde o notifica este error. (Extracción Fallida)"
      );
      console.error("Fetch fallido");
    });
}

var ArrayMarcas = [];
var ComidaClickeada;
var ComidasElegidas = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];
var BebidasElegidas = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];

const NombresComidas = [
  "NombreDesayuno",
  "NombreColacion1",
  "NombreAlmuerzo",
  "NombreColacion2",
  "NombreCena",
];
const NombresBebidas = [
  "BebidaDesayuno",
  "BebidaColacion1",
  "BebidaAlmuerzo",
  "BebidaColacion2",
  "BebidaCena",
];
const Tiempos = ["Tiempo1", "Tiempo2", "Tiempo3", "Tiempo4", "Tiempo5"];
const NosIngredientes = [
  "NoIngredientes1",
  "NoIngredientes2",
  "NoIngredientes3",
  "NoIngredientes4",
  "NoIngredientes5",
];
const IDDificultades = [
  "Dificultad1",
  "Dificultad2",
  "Dificultad3",
  "Dificultad4",
  "Dificultad5",
];

//Función para mostrar la interfaz vacía
function AbrirInterfaz() {
  document.querySelector(".InterfazEditar").classList.toggle("Mostrar");
  document.querySelector(".Ediciones").classList.remove("Mostrar");
  document.querySelector(".Ediciones").style.display = "none";
  document.querySelector(".Receta").classList.remove("Mostrar");
  document.querySelector(".Receta").style.display = "none";
  document.querySelector(".EditarNuevo").classList.remove("Mostrar");
  document.querySelector(".EditarNuevo").style.display = "none";
  document.querySelector(".AvisoSinElecciones").classList.remove("Mostrar");
  document.querySelector(".AvisoSinElecciones").style.display = "none";

  document.querySelector("html").classList.toggle("htmlquieto");
}

const BotonesInterfazables = document.querySelectorAll(".Interfaz");

BotonesInterfazables.forEach((element) => {
  element.addEventListener("click", (e) => {
    ComidaClickeada = e.target.getAttribute("id");
    AbrirInterfaz();
    // console.log("Se ha clickeado " + ComidaClickeada);
  });
});

//A los botones de edición se les asigna su función
function MostrarEditar() {
  document.querySelector(".Ediciones").classList.add("Mostrar");
  document.querySelector(".Ediciones").style.display = "block";
}

const BotonEditar = document.querySelectorAll(".Editar");
BotonEditar.forEach((element) => {
  element.addEventListener("click", MostrarEditar);
});

//A los botones de edición del panel se les asigna su función
function MostrarEditarNuevo() {
  document.querySelector(".EditarNuevo").classList.add("Mostrar");
  document.querySelector(".EditarNuevo").style.display = "block";
}

//A los títulos se les asigna su función
function MostrarReceta() {
  let NumeroABuscar;

  switch (DiaActual) {
    case 0:
      NumeroABuscar = ComidaClickeada - 1;
      break;

    case 1:
      NumeroABuscar = ComidaClickeada - 1 + 5;
      break;

    case 2:
      NumeroABuscar = ComidaClickeada - 1 + 10;
      break;

    case 3:
      NumeroABuscar = ComidaClickeada - 1 + 15;
      break;
    case 4:
      NumeroABuscar = ComidaClickeada - 1 + 20;
      break;

    case 5:
      NumeroABuscar = ComidaClickeada - 1 + 25;
      break;

    case 6:
      NumeroABuscar = ComidaClickeada - 1 + 30;
      break;

    default:
      break;
  }

  if (ComidasElegidas[NumeroABuscar] != null) {
    document.querySelector(".Receta").classList.add("Mostrar");
    document.querySelector(".Receta").style.display = "block";

    document.querySelector(".NombreRecetaComida").innerHTML =
      ListaComidas[ComidasElegidas[NumeroABuscar]].nombre;
      let Dificults = ["Fácil", "Intermedio", "Difícil"]
      document.getElementById("Info").innerHTML = `
  <li><i class="icon icon-tiempo icondetalle"></i>${ListaComidas[ComidasElegidas[NumeroABuscar]].tiempo} minutos</li>
  <li><i class="icon icon-ingredientes icondetalle"></i>${ListaComidas[ComidasElegidas[NumeroABuscar]].ingredientes.length} ingredientes</li>
  <li><i class="icon icon-info icondetalle"></i>${Dificults[ListaComidas[ComidasElegidas[NumeroABuscar]].dificultad-1]}</li>`;
    document.getElementById("ListaIngredientes").innerHTML = "";
    ListaComidas[ComidasElegidas[NumeroABuscar]].ingredientes.forEach(
      (element) => {
        document.getElementById(
          "ListaIngredientes"
        ).innerHTML += `<li>${element}</li>`;
      }
    );
    document.getElementById("ListaPasos").innerHTML = "";
    ListaComidas[ComidasElegidas[NumeroABuscar]].receta.forEach((element) => {
      document.getElementById("ListaPasos").innerHTML += `<li>${element}</li>`;
    });

    document.querySelector(".NombreRecetaBebida").innerHTML =
      ListaBebidas[BebidasElegidas[NumeroABuscar]].nombre;
    document.getElementById("ListaIngredientes2").innerHTML = "";
    document.getElementById("Info2").innerHTML = `
  <li><i class="icon icon-tiempo icondetalle"></i>${ListaBebidas[BebidasElegidas[NumeroABuscar]].tiempo} minutos</li>
  <li><i class="icon icon-ingredientes icondetalle"></i>${ListaBebidas[BebidasElegidas[NumeroABuscar]].ingredientes.length} ingredientes</li>
  <li><i class="icon icon-info icondetalle"></i>${Dificults[ListaBebidas[BebidasElegidas[NumeroABuscar]].dificultad-1]}</li>`;
    ListaBebidas[BebidasElegidas[NumeroABuscar]].ingredientes.forEach(
      (element) => {
        document.getElementById(
          "ListaIngredientes2"
        ).innerHTML += `<li>${element}</li>`;
      }
    );
    document.getElementById("ListaPasos2").innerHTML = "";
    ListaBebidas[BebidasElegidas[NumeroABuscar]].receta.forEach((element) => {
      document.getElementById("ListaPasos2").innerHTML += `<li>${element}</li>`;
    });
  } else {
    document.querySelector(".AvisoSinElecciones").classList.add("Mostrar");
    document.querySelector(".AvisoSinElecciones").style.display = "block";
  }
}

const TitulosRecetas = document.querySelectorAll(".AbrirReceta");
TitulosRecetas.forEach((element) => {
  element.addEventListener("click", MostrarReceta);
});

//Se cargan todas las recetas en la lista
function CargarListas() {
  document.getElementById("ComidasAElegir").innerHTML = '<option value="-1" selected hidden>Comida</option>';
  ListaComidas.forEach((element) => {
    document.getElementById("ComidasAElegir").innerHTML +=
      "<option value=" + element.id + ">" + element.nombre + "</option>";
  });
  document.getElementById("BebidasAElegir").innerHTML = '<option value="-1" selected hidden>Bebida</option>';
  ListaBebidas.forEach((element) => {
    document.getElementById("BebidasAElegir").innerHTML +=
      "<option value=" + element.id + ">" + element.nombre + "</option>";
  });
  console.log("Se han enlistado todas las opciones disponibles.");
}

function RegistrarDia() {
  AbrirInterfaz();
  var ComidaElegida = document.getElementById("ComidasAElegir").value;
  var BebidaElegida = document.getElementById("BebidasAElegir").value;
  console.group("Registro de comida");
  console.log("Comida: " + ComidaElegida + " Bebida: " + BebidaElegida);
  console.log("Día: " + ComidaClickeada);

  document.getElementById(NombresComidas[ComidaClickeada - 1]).innerHTML =
    ListaComidas[ComidaElegida].nombre;
  document.getElementById(NombresBebidas[ComidaClickeada - 1]).innerHTML =
    ListaBebidas[BebidaElegida].nombre;
  document.getElementById(Tiempos[ComidaClickeada - 1]).innerHTML =
    ListaComidas[ComidaElegida].tiempo + ListaBebidas[BebidaElegida].tiempo;
  document.getElementById(NosIngredientes[ComidaClickeada - 1]).innerHTML =
    ListaComidas[ComidaElegida].ingredientes.length +
    ListaBebidas[BebidaElegida].ingredientes.length;
  document.getElementById(IDDificultades[ComidaClickeada - 1]).innerHTML =
    ElegirDificultad(
      ListaComidas[ComidaElegida].dificultad,
      ListaBebidas[BebidaElegida].dificultad
    );

  switch (DiaActual) {
    case 0: //Domingo
      ComidasElegidas[ComidaClickeada - 1] = ComidaElegida;
      BebidasElegidas[ComidaClickeada - 1] = BebidaElegida;
      break;

    case 1: //Lunes
      ComidasElegidas[ComidaClickeada - 1 + 5] = ComidaElegida;
      BebidasElegidas[ComidaClickeada - 1 + 5] = BebidaElegida;
      break;

    case 2: //Martes
      ComidasElegidas[ComidaClickeada - 1 + 10] = ComidaElegida;
      BebidasElegidas[ComidaClickeada - 1 + 10] = BebidaElegida;
      break;

    case 3: //Miércoles
      ComidasElegidas[ComidaClickeada - 1 + 15] = ComidaElegida;
      BebidasElegidas[ComidaClickeada - 1 + 15] = BebidaElegida;
      break;

    case 4: //Jueves
      ComidasElegidas[ComidaClickeada - 1 + 20] = ComidaElegida;
      BebidasElegidas[ComidaClickeada - 1 + 20] = BebidaElegida;
      break;

    case 5: //Viernes
      ComidasElegidas[ComidaClickeada - 1 + 25] = ComidaElegida;
      BebidasElegidas[ComidaClickeada - 1 + 25] = BebidaElegida;
      break;

    case 6: //Sábado
      ComidasElegidas[ComidaClickeada - 1 + 30] = ComidaElegida;
      BebidasElegidas[ComidaClickeada - 1 + 30] = BebidaElegida;
      break;

    default:
      break;
  }

  document.querySelectorAll(".CajaDia")[ComidaClickeada - 1].style.color =
    "var(--Texto-Principal)";
  console.log(ComidasElegidas);
  console.log(BebidasElegidas);
  console.log("Se han guardado la comida y la bebida elegida.");
  console.groupEnd();
  GuardarCache();
  CargarListadeCompra();
}

function ElegirDificultad(a, b) {
  let Dificultades = ["Fácil", "Laborioso", "Difícil"];

  if ((a + b) / 2 <= 1) {
    return Dificultades[0];
  } else if ((a + b) / 2 <= 2 && (a + b) / 2 > 1) {
    return Dificultades[1];
  } else if ((a + b) / 2 <= 3 && (a + b) / 2 > 2) {
    return Dificultades[2];
  }
}

function Seleccionadas() {
  if (
    document.getElementById("ComidasAElegir").value != -1 &&
    document.getElementById("BebidasAElegir").value != -1
  ) {
    document.getElementById("RegistrarElecciones").removeAttribute("disabled");
  } else {
    document.getElementById("RegistrarElecciones").setAttribute("disabled", "");
  }
}

document
  .getElementById("ComidasAElegir")
  .addEventListener("change", Seleccionadas);
document
  .getElementById("BebidasAElegir")
  .addEventListener("change", Seleccionadas);

document
  .getElementById("RegistrarElecciones")
  .addEventListener("click", RegistrarDia);

function RevisarSemana() {
  if (DiaActual < 0) {
    DiaActual = 6;
  } else if (DiaActual > 6) {
    DiaActual = 0;
  }
}

function CambiarDia(x) {
  CargarCache();

  let Semana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];

  document.getElementById("DiaActual").innerHTML = Semana[x];

  CargarDia();
}

//window.onload = CambiarDia(DiaActual); // <-- el problema se origina aquí a

document.querySelector(".RetrocederDia").addEventListener("click", () => {
  DiaActual = DiaActual - 1;
  RevisarSemana();
  CambiarDia(DiaActual);
});
document.querySelector(".AvanzarDia").addEventListener("click", (e) => {
  DiaActual = DiaActual + 1;
  RevisarSemana();
  CambiarDia(DiaActual);
});

function CargarDia() {
  let HoraComida = [1, 2, 3, 4, 5];
  let NombreHoraComida = [
    "Desayuno",
    "Colación",
    "Almuerzo",
    "Colación",
    "Cena",
  ];

  HoraComida.forEach((element) => {
    let NumeroABuscar2;

    switch (DiaActual) {
      case 0:
        NumeroABuscar2 = element - 1;
        break;

      case 1:
        NumeroABuscar2 = element - 1 + 5;
        break;

      case 2:
        NumeroABuscar2 = element - 1 + 10;
        break;

      case 3:
        NumeroABuscar2 = element - 1 + 15;
        break;
      case 4:
        NumeroABuscar2 = element - 1 + 20;
        break;

      case 5:
        NumeroABuscar2 = element - 1 + 25;
        break;

      case 6:
        NumeroABuscar2 = element - 1 + 30;
        break;

      default:
        break;
    }

    if (ComidasElegidas[NumeroABuscar2] != null) {
      document.querySelectorAll(".CajaDia")[element - 1].style.color =
        "var(--Texto-Principal)";
      document.getElementById(NombresComidas[element - 1]).innerHTML =
        ListaComidas[ComidasElegidas[NumeroABuscar2]].nombre;
      document.getElementById(NombresBebidas[element - 1]).innerHTML =
        ListaBebidas[BebidasElegidas[NumeroABuscar2]].nombre;
      document.getElementById(Tiempos[element - 1]).innerHTML =
        ListaComidas[ComidasElegidas[NumeroABuscar2]].tiempo +
        ListaBebidas[BebidasElegidas[NumeroABuscar2]].tiempo;
      document.getElementById(NosIngredientes[element - 1]).innerHTML =
        ListaComidas[ComidasElegidas[NumeroABuscar2]].ingredientes.length +
        ListaBebidas[BebidasElegidas[NumeroABuscar2]].ingredientes.length;
      document.getElementById(IDDificultades[element - 1]).innerHTML =
        ElegirDificultad(
          ListaComidas[ComidasElegidas[NumeroABuscar2]].dificultad,
          ListaBebidas[BebidasElegidas[NumeroABuscar2]].dificultad
        );
    } else {
      document.querySelectorAll(".CajaDia")[element - 1].style.color =
        "var(--Texto-Nota)";
      document.getElementById(NombresComidas[element - 1]).innerHTML =
        NombreHoraComida[element - 1];
      document.getElementById(NombresBebidas[element - 1]).innerHTML = "Bebida";
      document.getElementById(Tiempos[element - 1]).innerHTML = ``;
      document.getElementById(NosIngredientes[element - 1]).innerHTML = ``;
      document.getElementById(
        IDDificultades[element - 1]
      ).innerHTML = `Dificultad`;
    }
  });

  CargarListadeCompra();
}

function GuardarCache() {
  if (localStorage.getItem("ArrayComida") !== undefined && localStorage.getItem("ArrayComida")) {
    localStorage.removeItem("ArrayComida");
    localStorage.removeItem("ArrayBebida");
    localStorage.removeItem("ArrayMarcas");
  }

  localStorage.setItem("ArrayComida", JSON.stringify(ComidasElegidas));
  localStorage.setItem("ArrayBebida", JSON.stringify(BebidasElegidas));
  localStorage.setItem("ArrayMarca", JSON.stringify(ArrayMarcas));

  console.log(
    "Selecciones de comidas, bebidas y marcas de lista guardadas en la memoria caché."
  );
}

function CargarCache() {
  if (
    localStorage.getItem("ArrayComida") !== undefined &&
    localStorage.getItem("ArrayComida")
  ) {
    ComidasElegidas = JSON.parse(localStorage.getItem("ArrayComida"));
    BebidasElegidas = JSON.parse(localStorage.getItem("ArrayBebida"));
    ArrayMarcas = JSON.parse(localStorage.getItem("ArrayMarca"));
    console.log(
      "Selecciones de comidas, bebidas y marcas de lista extraídas de la memoria caché."
    );
  } else {
    console.log(
      "Sin registros previos en la memoria caché, uno nuevo ha sido creado."
    );
  }
}

document.getElementById("Borrar").addEventListener("click", (e) => {
  e.preventDefault();

  if (
    confirm(
      "Esta acción reestablecerá tu plan semanal y borrará todas tus elecciones, ¿deseas continuar? \n\n (Tu recetario no se modificará)"
    )
  ) {
    let i = 0;
    ComidasElegidas.forEach((element) => {
      ComidasElegidas[i] = null;
      BebidasElegidas[i] = null;
      i++;
    });

    ArrayMarcas = [];

    CargarDia();
    GuardarCache();
    AvisarSinCompras();
  }
});

function AvisarSinCompras() {
  document.querySelector("#AvisoCompra").classList.add("Mostrar");
  document.querySelector("#AvisoCompra").style.display = "block";

  document.getElementById("CuerpoTablaCompras").innerHTML = "";
}

var ListaCompras = [];

function CargarListadeCompra() {
  ListaCompras = [];

  ComidasElegidas.forEach((element) => {
    if (element != null) {
      ListaComidas[element].ingredientes.forEach((element2) => {
        ListaCompras.push(element2);
      });
    }
  });

  BebidasElegidas.forEach((element3) => {
    if (element3 != null) {
      ListaBebidas[element3].ingredientes.forEach((element4) => {
        ListaCompras.push(element4);
      });
    }
  });

  ListaCompras.sort();

  let ArrayUnico = [];
  let ArrayRepeticiones = [];
  let Cont = 1;

  for (let i = 0; i < ListaCompras.length; i++) {
    const element = ListaCompras[i];

    if (ListaCompras[i] == ListaCompras[i + 1]) {
      // console.log("Se repite el ingrediente " + element);
      Cont++;
    } else {
      ArrayUnico.push(ListaCompras[i]);
      ArrayRepeticiones.push(Cont);
      Cont = 1;
    }
  }

  document.getElementById("CuerpoTablaCompras").innerHTML = `<tr>
  <th></th>
  <th>Ingrediente</th>
  <th>Usos</th>
</tr>`;

  for (let k = 0; k < ArrayUnico.length; k++) {
    const element = ArrayUnico[k];
    document.getElementById(
      "CuerpoTablaCompras"
    ).innerHTML += `<tr class="Lineaxd">
    <td><label class="CheckButton"><input type="checkbox" id="IngredienteCompra${k}" class="CheckCompra"><span class="CheckCheck"></span></label></td>
    <td>${ArrayUnico[k]}</td>
    <td>${ArrayRepeticiones[k]}</td>
  </tr>`;
  }

  document.querySelectorAll(".CheckCompra").forEach((element) => {
    element.addEventListener("click", (e) => {
      // alert("Una marca ha sido puesta en " + e.target.getAttribute("id").slice(17));
      ArrayMarcas[e.target.getAttribute("id").slice(17)] =
        !ArrayMarcas[e.target.getAttribute("id").slice(17)];

      if (ArrayMarcas[e.target.getAttribute("id").slice(17)] == true) {
        document
          .querySelectorAll(".Lineaxd")
          [e.target.getAttribute("id").slice(17)].classList.add("Conseguido");
      } else {
        document
          .querySelectorAll(".Lineaxd")
          [e.target.getAttribute("id").slice(17)].classList.remove(
            "Conseguido"
          );
      }
      GuardarCache();
    });
  });

  for (let i = 0; i < ArrayMarcas.length; i++) {
    const element = ArrayMarcas[i];

    let d = "IngredienteCompra" + i;

    if (element == true) {
      document.getElementById(d).checked = true;
      document.querySelectorAll(".Lineaxd")[i].classList.add("Conseguido");
    }
  }

  if (ListaCompras.length > 0) {
    document.querySelector("#AvisoCompra").classList.remove("Mostrar");
    document.querySelector("#AvisoCompra").style.display = "none";
  } else {
    AvisarSinCompras();
  }
}

var p = 0;
var u = 0;

function AgregarIng() {
  let Ing = prompt("Ingrediente nuevo:")
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase());
  if (Ing != "" && Ing != null) {
    document.getElementById(
      "IngredientesListaRec"
    ).innerHTML += `<li class="IngreNuevo Item" id="NuevIng${p}">${Ing}</li>`;
    document.querySelectorAll(".Item").forEach((element) => {
      element.addEventListener("click", (e) => {
        t = e.target.getAttribute("id");
        AbrirInterfaz();
        MostrarEditarNuevo();
        document.getElementById("EditarNuevoCampo").value =
          document.getElementById(t).innerHTML;
      });
    });
    p++;
  }
}

function NewAgregarIng(e) {
  e.preventDefault();
  let Ing = document
    .getElementById("IngAgred")
    .value.trim()
    .replace(/^\w/, (c) => c.toUpperCase());
  if (Ing != "" && Ing != null) {
    document.getElementById(
      "IngredientesListaRec"
    ).innerHTML += `<li class="IngreNuevo Item" id="NuevIng${p}">${Ing}</li>`;
    document.querySelectorAll(".Item").forEach((element) => {
      element.addEventListener("click", (e) => {
        t = e.target.getAttribute("id");
        AbrirInterfaz();
        MostrarEditarNuevo();
        document.getElementById("EditarNuevoCampo").value =
          document.getElementById(t).innerHTML;
      });
    });
    p++;
    document.getElementById("IngAgred").value = "";
    document.getElementById("BotonAdd").setAttribute("disabled", "");
  }
}

function ActivarBotonAgregar() {
  if (document.getElementById("IngAgred").value != "") {
    document.getElementById("BotonAdd").removeAttribute("disabled");
  } else {
    document.getElementById("BotonAdd").setAttribute("disabled", "");
  }
}

function AgregarPaso() {
  if (document.getElementById("TipoRec").value != "0") {
    let Paso = prompt("Paso nuevo:").trim().replace(/^\w/, (c) => c.toUpperCase());
  if (Paso != "" && Paso != null) {
    document.getElementById("PasosListaRec").innerHTML += `<li class="PasoNuevo Item" id="NuevoPaso${u}">${Paso}</li>`;
    document.querySelectorAll(".Item").forEach((element) => {
      element.addEventListener("click", (e) => {
        t = e.target.getAttribute("id");
        AbrirInterfaz();
        MostrarEditarNuevo();
        document.getElementById("EditarNuevoCampo").value =
          document.getElementById(t).innerHTML;
      });
    });
    u++;
  }
  }
}

function HabilitarBoton() {
  document.getElementById("RegistrarCambio").removeAttribute("disabled");
}

document.getElementById("RegistrarCambio").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById(t).innerHTML = document
    .getElementById("EditarNuevoCampo")
    .value.trim()
    .replace(/^\w/, (c) => c.toUpperCase());
  AbrirInterfaz();
});

document.getElementById("EliminarNuevo").addEventListener("click", (e) => {
  if (
    confirm(
      "¿Eliminar " + document.getElementById(t).textContent + " de la lista?"
    )
  ) {
    document.getElementById(t).remove();
    AbrirInterfaz();
  }
});

// document.getElementById("AgIng").addEventListener("click", AgregarIng);
document.getElementById("AgPaso").addEventListener("click", AgregarPaso);

function MaxLength() {
  if (document.getElementById("TipoRec").value == "Comida") {
    document
      .getElementById("NumeroRec")
      .setAttribute("max", ListaComidas.length);
  }
  if (document.getElementById("TipoRec").value == "Bebida") {
    document
      .getElementById("NumeroRec")
      .setAttribute("max", ListaBebidas.length);
  }
};

function Reevaluar() {
  // document.getElementById("ObtenerDetallesDelDato").removeAttribute("disabled");
  document.getElementById("NumeroRec").removeAttribute("disabled");
  document.getElementById("NombreRec").removeAttribute("disabled");
  document.getElementById("IngAgred").removeAttribute("disabled");
  document.getElementById("TiempoRec").removeAttribute("disabled");
  document.getElementById("DificultadRec").removeAttribute("disabled");
  document.getElementById("NuevaEntrada").removeAttribute("disabled");
  document.getElementById("Borrador").removeAttribute("disabled");
  document.getElementById("ProbarRec").removeAttribute("disabled");
  document.getElementById("NumeroRec").focus();
  MaxLength();
}

function RevNuevo(){
  if (document.getElementById("NumeroRec").value == parseInt(document.getElementById("NumeroRec").attributes.max.value)){
    document.getElementById("LabelNumero").innerHTML = "Número (Nueva entrada)";
    document.getElementById("ObtenerDetallesDelDato").setAttribute("disabled", "");
    document.getElementById("QuitarRec").setAttribute("disabled", "");
    document.getElementById("AgregarRec").removeAttribute("disabled");
  } else {
    document.getElementById("LabelNumero").innerHTML = "Número";
    document.getElementById("ObtenerDetallesDelDato").removeAttribute("disabled");
    document.getElementById("QuitarRec").removeAttribute("disabled");
    document.getElementById("AgregarRec").setAttribute("disabled", "");
  };
  if (document.getElementById("NumeroRec").value == "" || document.getElementById("NumeroRec").value == parseInt(document.getElementById("NumeroRec").attributes.max.value)){
    document.getElementById("ObtenerDetallesDelDato").setAttribute("disabled", "");
    document.getElementById("QuitarRec").setAttribute("disabled", "");
  } else {
    document.getElementById("ObtenerDetallesDelDato").removeAttribute("disabled");
    document.getElementById("QuitarRec").removeAttribute("disabled");
  }
}

var Tipo;
var No;
const Dificultades = ["Fácil", "Intermedio", "Difícil"];

function Obtener(e) {
  e.preventDefault();
if (document.getElementById("NombreRec").value != "" || document.getElementById("IngredientesListaRec").innerHTML != '\n                        ' || document.getElementById("PasosListaRec").innerHTML != '\n                        ' || document.getElementById("TiempoRec").value != "") {
  if(confirm("Si obtienes una receta existente, se perderán los datos que hayas escrito. ¿Continuar?")) {
    ObtenerSi();
    Previsualizar();
  }
} else {
  ObtenerSi();
  Previsualizar();
}
}

function ObtenerSi() {
  p = 0;
  u = 0;
  Tipo = document.getElementById("TipoRec").value;
  No = document.getElementById("NumeroRec").value;
  switch (Tipo) {
    case "Comida":
      document.getElementById("NombreRec").value = ListaComidas[No].nombre;
      document.getElementById("IngredientesListaRec").innerHTML = "";
      ListaComidas[No].ingredientes.forEach((element) => {
        document.getElementById("IngredientesListaRec").innerHTML += `<li class="IngreNuevo Item" id="NuevIng${p}">${element}</li>`;
        document.querySelectorAll(".Item").forEach((element) => {
          element.addEventListener("click", (e) => {
            t = e.target.getAttribute("id");
            AbrirInterfaz();
            MostrarEditarNuevo();
            document.getElementById("EditarNuevoCampo").value =
              document.getElementById(t).innerHTML;
          });
        });
        p++;
      });
      document.getElementById("PasosListaRec").innerHTML = "";
      ListaComidas[No].receta.forEach((element) => {
        document.getElementById("PasosListaRec").innerHTML += `<li class="PasoNuevo Item" id="NuevoPaso${u}">${element}</li>`;
    document.querySelectorAll(".Item").forEach((element) => {
      element.addEventListener("click", (e) => {
        t = e.target.getAttribute("id");
        AbrirInterfaz();
        MostrarEditarNuevo();
        document.getElementById("EditarNuevoCampo").value =
          document.getElementById(t).innerHTML;
      });
    });
    u++;
      });

      document.getElementById("TiempoRec").value = ListaComidas[No].tiempo;
      document.getElementById("DificultadRec").value =
        Dificultades[ListaComidas[No].dificultad - 1];
      break;

    case "Bebida":
      document.getElementById("NombreRec").value = ListaBebidas[No].nombre;
      document.getElementById("IngredientesListaRec").innerHTML = "";
      ListaBebidas[No].ingredientes.forEach((element) => {
        document.getElementById("IngredientesListaRec").innerHTML += `<li class="IngreNuevo Item" id="NuevIng${p}">${element}</li>`;
        document.querySelectorAll(".Item").forEach((element) => {
          element.addEventListener("click", (e) => {
            t = e.target.getAttribute("id");
            AbrirInterfaz();
            MostrarEditarNuevo();
            document.getElementById("EditarNuevoCampo").value =
              document.getElementById(t).innerHTML;
          });
        });
        p++;
      });
      document.getElementById("PasosListaRec").innerHTML = "";
      ListaBebidas[No].receta.forEach((element) => {
        document.getElementById("PasosListaRec").innerHTML += `<li class="PasoNuevo Item" id="NuevoPaso${u}">${element}</li>`;
    document.querySelectorAll(".Item").forEach((element) => {
      element.addEventListener("click", (e) => {
        t = e.target.getAttribute("id");
        AbrirInterfaz();
        MostrarEditarNuevo();
        document.getElementById("EditarNuevoCampo").value =
          document.getElementById(t).innerHTML;
      });
    });
    u++;
      });

      document.getElementById("TiempoRec").value = ListaBebidas[No].tiempo;
      document.getElementById("DificultadRec").value =
        Dificultades[ListaBebidas[No].dificultad - 1];
      break;

    default:
      break;
  }
}

function ConfNuevo(e) {
  e.preventDefault();
  document.getElementById("NumeroRec").focus();
  document.getElementById("NumeroRec").value = parseInt(document.getElementById("NumeroRec").attributes.max.value);
  document.getElementById("LabelNumero").innerHTML = "Número (Nueva entrada)";
  document.getElementById("AgregarRec").removeAttribute("disabled");
};

function Borrar(e){
  e.preventDefault();
  if (document.getElementById("NombreRec").value != "" || document.getElementById("IngredientesListaRec").innerHTML != '\n                        ' || document.getElementById("PasosListaRec").innerHTML != '\n                        ' || document.getElementById("TiempoRec").value != "") {
    if (confirm("Se borrarán todos los datos introducidos, ¿continuar?")) {
      
  document.getElementById("TipoRec").value = "0";
  document.getElementById("NumeroRec").value = "";
  document.getElementById("LabelNumero").innerHTML = "Número";
  document.getElementById("NombreRec").value = "";
  document.getElementById("IngAgred").value = "";
  document.getElementById("IngredientesListaRec").innerHTML = "";
  p = 0;
  document.getElementById("PasosListaRec").innerHTML = "";
  u = 0;
  document.getElementById("TiempoRec").value = "";
  document.getElementById("DificultadRec").value = "0";

  document.getElementById("NumeroRec").setAttribute("disabled", "");
  document.getElementById("NombreRec").setAttribute("disabled", "");
  document.getElementById("IngAgred").setAttribute("disabled", "");
  document.getElementById("TiempoRec").setAttribute("disabled", "");
  document.getElementById("DificultadRec").setAttribute("disabled", "");
  document.getElementById("TipoRec").focus();

  document.getElementById("ObtenerDetallesDelDato").setAttribute("disabled", "");
  document.getElementById("Borrador").setAttribute("disabled", "");
  document.getElementById("NuevaEntrada").setAttribute("disabled", "");
  document.getElementById("ProbarRec").setAttribute("disabled", "");
  document.getElementById("AgregarRec").setAttribute("disabled", "");
  document.getElementById("QuitarRec").setAttribute("disabled", "");
    }
  } else {
    document.getElementById("TipoRec").value = "0";
    document.getElementById("NumeroRec").value = "";
    document.getElementById("LabelNumero").innerHTML = "Número";
    
    document.getElementById("ObtenerDetallesDelDato").setAttribute("disabled", "");
    document.getElementById("Borrador").setAttribute("disabled", "");
    document.getElementById("NuevaEntrada").setAttribute("disabled", "");
    document.getElementById("ProbarRec").setAttribute("disabled", "");
    document.getElementById("AgregarRec").setAttribute("disabled", "");
    document.getElementById("QuitarRec").setAttribute("disabled", "");
  }
}

function Previsualizar() {
  document.getElementById("PrevNom").innerHTML = document.getElementById("NombreRec").value;
  document.getElementById("PrevReceta").style.display = "contents";

  document.getElementById("PrevListaIngredientes").innerHTML = "";
  document.querySelectorAll(".IngreNuevo").forEach(element => {
    document.getElementById("PrevListaIngredientes").innerHTML += `<li>${element.innerHTML}</li>`;
  });

  document.getElementById("PrevListaPasos").innerHTML = "";
  document.querySelectorAll(".PasoNuevo").forEach(element => {
    document.getElementById("PrevListaPasos").innerHTML += `<li>${element.innerHTML}</li>`;
  });

  document.getElementById("PrevInfo").innerHTML = `
  <li><i class="icon icon-tiempo icondetalle"></i>${document.getElementById("TiempoRec").value} minutos</li>
  <li><i class="icon icon-ingredientes icondetalle"></i>${document.querySelectorAll(".IngreNuevo").length} ingredientes</li>
  <li><i class="icon icon-info icondetalle"></i>${document.getElementById("DificultadRec").value}</li>`;
}

function Probar(e){
  e.preventDefault();
  Previsualizar();
}

function Agregar(e){
  e.preventDefault();

  if (document.getElementById("NumeroRec").value != "" && document.getElementById("NombreRec").value != "" && document.getElementById("IngredientesListaRec").innerHTML != '\n                        ' && document.getElementById("PasosListaRec").innerHTML != '\n                        ' && document.getElementById("TiempoRec").value != "" && document.getElementById("DificultadRec").value != "0") {
    let NuevaReceta = new Object();

  NuevaReceta.id = parseInt(document.getElementById("NumeroRec").value);
  NuevaReceta.nombre = document.getElementById("NombreRec").value;
  let ArrayIngreds = [];
  document.querySelectorAll(".IngreNuevo").forEach(element => {
    ArrayIngreds.push(element.innerHTML);
  });
  NuevaReceta.ingredientes = ArrayIngreds;
  NuevaReceta.tiempo = parseInt(document.getElementById("TiempoRec").value);
  switch (document.getElementById("DificultadRec").value) {
    case "Fácil":
      NuevaReceta.dificultad = 1;
      break;
  
    case "Intermedio":
      NuevaReceta.dificultad = 2;
      break;
  
    case "Difícil":
      NuevaReceta.dificultad = 3;
      break;
  
    default:
      break;
  };

  let ArrayPasos = [];
  document.querySelectorAll(".PasoNuevo").forEach(element => {
    ArrayPasos.push(element.innerHTML);
  });
  NuevaReceta.receta = ArrayPasos;

  if (document.getElementById("TipoRec").value == "Comida") {
    ListaComidas.push(NuevaReceta);
  } else {
    ListaBebidas.push(NuevaReceta);
  }
  GuardarCustom();
  RespuestaForm("¡Receta añadida a tu recetario!");
  MaxLength();

  document.getElementById("LabelNumero").innerHTML = "Número";
  document.getElementById("QuitarRec").removeAttribute("disabled");
  } else {
    RespuestaForm("Debes completar todos los campos para agregar una receta nueva");
  };
};

function Quitar(e){
  e.preventDefault();
  let Dic = true;
  
  if (document.getElementById("TipoRec").value == "Comida") {
    let g = parseInt(document.getElementById('NumeroRec').value);
    ComidasElegidas.forEach(element => {
      if (element == g) {
        Dic = false;
      };
    });
    if (Dic == true) {
      if (confirm('¿Eliminar permanentemente "' + ListaComidas[g].nombre + '" de la lista de comidas? Esta acción no se puede deshacer.')) {
        ListaComidas.splice(g, 1);
        RespuestaForm("Receta eliminada de tu recetario");
      }
    } else {
      RespuestaForm("Elimina esta receta de tu planeación semanal para quitarla de tu recetario")
    }
  } else {
    let g = parseInt(document.getElementById('NumeroRec').value);
    BebidasElegidas.forEach(element => {
      if (element == g) {
        Dic = false;
      };
    });
    if (Dic == true) {
      if (confirm('¿Eliminar permanentemente "' + ListaBebidas[g].nombre + '" de la lista de bebidas? Esta acción no se puede deshacer.')) {
        ListaBebidas.splice(g, 1);
        RespuestaForm("Receta eliminada de tu recetario");
      }
    } else {
      RespuestaForm("Elimina esta receta de tu planeación semanal para quitarla de tu recetario")
    };
  }
  GuardarCustom();
  MaxLength();
};

function GuardarCustom() {
  
    if(localStorage.getItem("ArrayComidasP") !== undefined && localStorage.getItem("ArrayComidasP")){
      localStorage.removeItem("ArrayComidasP");
    }
    localStorage.setItem("ArrayComidasP", JSON.stringify(ListaComidas));
  
    if(localStorage.getItem("ArrayBebidasP") !== undefined && localStorage.getItem("ArrayBebidasP")){
    localStorage.removeItem("ArrayBebidasP");
    }
    localStorage.setItem("ArrayBebidasP", JSON.stringify(ListaBebidas));

  CargarListas();
};

function RespuestaForm(respuesta) {
  document.getElementById("FormRespuesta").innerHTML = respuesta;
  document.getElementById("FormRespuesta").focus();
  setTimeout(() => {
    document.getElementById("FormRespuesta").innerHTML = "";
  }, 10000);
}