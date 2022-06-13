const scriptURL = 'https://script.google.com/macros/s/AKfycbw2UZ5D-XmzDfMQ4B9VXGJrU4NkNZB0MZENeZDNr8DMcrOkLE-AouainL3BPfDYahuouQ/exec'
  const form = document.forms['ContactoWS']

const Respuesta = document.getElementById("FormRespuesta")

  form.addEventListener('submit', e => {
    e.preventDefault();
    Respuesta.innerHTML="Enviando tus comentarios...";
    document.getElementById("EnviarMensajeb").setAttribute("disabled","");
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => Exito())
      .catch(error => Fallo())
  })

function Fallo(){
  Respuesta.innerHTML="¡Oh no! Algo salió mal, verifica tu conexión e inténtalo de nuevo.";
  document.getElementById("EnviarMensajeb").removeAttribute("disabled");
  setTimeout(Borrar, 10000);
  console.error("Mensaje no enviado");
  // alert("¡Oh no!\n\nAlgo salió mal, inténtalo de nuevo.")
}

function Exito(){
  form.reset();
  console.log("Mensaje enviado");
  // alert("¡Gracias!\n\nTu colaboración ha sido enviada a evaluar\nSi es aprobada, pronto podrás encontrarla en la página.\n¡Sigue explorando datos curiosos!")
  Respuesta.innerHTML="Mensaje enviado";
  document.getElementById("EnviarMensajeb").removeAttribute("disabled");
  setTimeout(Borrar, 10000);
}

function Borrar(){
  Respuesta.innerHTML="";
}

function ConexionFormulario() {
  if (window.navigator.onLine == true) {
    document.getElementById("EnviarMensajeb").removeAttribute("disabled");
    Borrar();
    console.log("Conexión a Internet establecida");
  } else {
    Respuesta.innerHTML="Conéctate a Internet para enviar comentarios.";
    document.getElementById("EnviarMensajeb").setAttribute("disabled","");
    console.warn("Conexión a Internet perdida");
  }
}

window.addEventListener('online', ConexionFormulario);
window.addEventListener('offline', ConexionFormulario);
window.onload = ConexionFormulario;
