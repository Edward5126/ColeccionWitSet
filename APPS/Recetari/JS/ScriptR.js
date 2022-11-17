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

SetUpRecetas();

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
    alert ("Algo parece andar mal, pero pronto estará arreglado. Intenta de nuevo más tarde o notifica este error. (Extracción Fallida)");
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
    alert ("Algo parece andar mal, pero pronto estará arreglado. Intenta de nuevo más tarde o notifica este error. (Extracción Fallida)");
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
  document.querySelector(".AvisoSinElecciones").classList.remove("Mostrar");
  document.querySelector(".AvisoSinElecciones").style.display = "none";

  document.querySelector("html").classList.toggle("htmlquieto");
}

const BotonesInterfazables = document.querySelectorAll(".Interfaz");

BotonesInterfazables.forEach((element) => {
  element.addEventListener("click", (e) => {
    ComidaClickeada = e.target.getAttribute("id");
    AbrirInterfaz();
    console.log("Se ha clickeado " + ComidaClickeada);
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
  ListaComidas.forEach((element) => {
    document.getElementById("ComidasAElegir").innerHTML +=
      "<option value=" + element.id + ">" + element.nombre + "</option>";
  });
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
  };

  document.querySelectorAll(".CajaDia")[ComidaClickeada - 1].style.color =
    "var(--Texto-Principal)";
  console.log(ComidasElegidas);
  console.log(BebidasElegidas);
  console.log("Se han guardado la comida y la bebida elegida.");
  console.groupEnd();
  GuardarCache();
  CargarListadeCompra()
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
    document.getElementById("RegistrarElecciones").setAttribute("disabled");
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
    };

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
    if (
      localStorage.getItem('ArrayComida') !== undefined &&
      localStorage.getItem('ArrayComida')
    ) {
      localStorage.removeItem('ArrayComida');
      localStorage.removeItem('ArrayBebida');
      localStorage.removeItem('ArrayMarcas');
    }

    localStorage.setItem('ArrayComida', JSON.stringify(ComidasElegidas));
    localStorage.setItem('ArrayBebida', JSON.stringify(BebidasElegidas));
    localStorage.setItem('ArrayMarca', JSON.stringify(ArrayMarcas));

    console.log(
      "Selecciones de comidas, bebidas y marcas de lista guardadas en la memoria caché."
    );
}

function CargarCache() {
  if (
    localStorage.getItem('ArrayComida') !== undefined &&
    localStorage.getItem('ArrayComida')
  ) {
  ComidasElegidas = JSON.parse(localStorage.getItem('ArrayComida'));
  BebidasElegidas = JSON.parse(localStorage.getItem('ArrayBebida'));
  ArrayMarcas = JSON.parse(localStorage.getItem('ArrayMarca'));
  console.log("Selecciones de comidas, bebidas y marcas de lista extraídas de la memoria caché.");
  } else {
    console.log("Sin registros previos en la memoria caché, uno nuevo ha sido creado.");
  } 
}

document.getElementById("Borrar").addEventListener("click", (e) => {
  e.preventDefault();

  if (
    confirm(
      "Esta acción reestablecerá tu plan semanal y borrará todas tus elecciones, ¿deseas continuar?"
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

  ComidasElegidas.forEach(element => {
    if (element != null) {
      ListaComidas[element].ingredientes.forEach(element2 => {
        ListaCompras.push(element2);
      });
    }
  });

  BebidasElegidas.forEach(element3 => {
    if (element3 != null) {
      ListaBebidas[element3].ingredientes.forEach(element4 => {
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
    
    if (ListaCompras[i] == ListaCompras[i+1]) {
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
    document.getElementById("CuerpoTablaCompras").innerHTML += `<tr class="Lineaxd">
    <td><label class="CheckButton"><input type="checkbox" id="IngredienteCompra${k}" class="CheckCompra"><span class="CheckCheck"></span></label></td>
    <td>${ArrayUnico[k]}</td>
    <td>${ArrayRepeticiones[k]}</td>
  </tr>`;
  }

  document.querySelectorAll(".CheckCompra").forEach(element => {
    element.addEventListener("click", e=> {
      // alert("Una marca ha sido puesta en " + e.target.getAttribute("id").slice(17));
      ArrayMarcas[e.target.getAttribute("id").slice(17)] = !ArrayMarcas[e.target.getAttribute("id").slice(17)];

      if (ArrayMarcas[e.target.getAttribute("id").slice(17)] == true) {
        document.querySelectorAll(".Lineaxd")[e.target.getAttribute("id").slice(17)].classList.add("Conseguido");
      } else {
        document.querySelectorAll(".Lineaxd")[e.target.getAttribute("id").slice(17)].classList.remove("Conseguido");
      }
      GuardarCache();
    })
  });

  for (let i = 0; i < ArrayMarcas.length; i++) {
    const element = ArrayMarcas[i];
    
    let d = "IngredienteCompra" + i;

    if (element == true) {
      document.getElementById(d).checked = true;
      document.querySelectorAll(".Lineaxd")[i].classList.add("Conseguido");
    }
  }

  if (ListaCompras.length>0){
    document.querySelector("#AvisoCompra").classList.remove("Mostrar");
  document.querySelector("#AvisoCompra").style.display = "none";
  } else {
    AvisarSinCompras();
  }
};