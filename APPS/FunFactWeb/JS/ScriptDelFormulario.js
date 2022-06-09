const scriptURL = 'https://script.google.com/macros/s/AKfycby93EaSZUuMdAmcxJW97OJWWm47rsDTTDI4Z9yZrjPRJxJyOZoV3-7Xo6q45dKiVq8k/exec'
  const form = document.forms['ColaborarFF']

const Respuesta = document.getElementById("FormRespuesta")

  form.addEventListener('submit', e => {
    Respuesta.innerHTML="Enviando tu dato...";
    document.getElementById("EnviarDatoSugeridob").setAttribute("disabled","");
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => Exito())
      .catch(error => Fallo())
  })
function Fallo(){
  Respuesta.innerHTML="¡Oh no! Algo salió mal, verifica tu conexión e inténtalo de nuevo.";
  document.getElementById("EnviarDatoSugeridob").removeAttribute("disabled");
  setTimeout(Borrar, 10000);
  console.error("Dato no enviado");
  // alert("¡Oh no!\n\nAlgo salió mal, inténtalo de nuevo.")
}

function Exito(){
  form.reset();
  console.log("Dato enviado");
  // alert("¡Gracias!\n\nTu colaboración ha sido enviada a evaluar\nSi es aprobada, pronto podrás encontrarla en la página.\n¡Sigue explorando datos curiosos!")
  Respuesta.innerHTML="¡Gracias por colaborar! Tu dato se ha enviado a evaluar.";
  document.getElementById("EnviarDatoSugeridob").removeAttribute("disabled");
  setTimeout(Borrar, 10000);
}

function Borrar(){
  Respuesta.innerHTML="";
}

function ConexionFormulario() {
  if (window.navigator.onLine == true) {
    document.getElementById("EnviarDatoSugeridob").removeAttribute("disabled");
    Borrar();
    console.log("Conexión a Internet establecida");
  } else {
    Respuesta.innerHTML="Conéctate a Internet para enviar tus propios datos.";
    document.getElementById("EnviarDatoSugeridob").setAttribute("disabled","");
    console.warn("Conexión a Internet perdida");
  }
}

window.addEventListener('online', ConexionFormulario);
window.addEventListener('offline', ConexionFormulario);
window.onload = ConexionFormulario;

// document.querySelector("#EnviarDatoSugerido").addEventListener("click", Aviso);
// function Aviso() {
//     alert("¡Gracias por querer colaborar!\n\nEl formulario de colaboración estará listo próximamente, ¡Espéralo pronto!")
// }