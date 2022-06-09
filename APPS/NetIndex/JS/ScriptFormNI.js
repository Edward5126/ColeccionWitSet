const scriptURL = 'https://script.google.com/macros/s/AKfycbxKMmaBjFlbuAmWkWc_Ut9AoBw2Vtl-UKoj-kyCWumgL5VnHcrGY_sahRNm_OMY9KsR/exec'
  const form = document.forms['ColaborarNI']

const Respuesta = document.getElementById("FormRespuesta")

  form.addEventListener('submit', e => {
    e.preventDefault();
    Respuesta.innerHTML="Enviando tu sitio web...";
    document.getElementById("EnviarSitioSugeridob").setAttribute("disabled","");
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => Exito())
      .catch(error => Fallo())
  })

function Fallo(){
  Respuesta.innerHTML="¡Oh no! Algo salió mal, verifica tu conexión e inténtalo de nuevo.";
  document.getElementById("EnviarSitioSugeridob").removeAttribute("disabled");
  setTimeout(Borrar, 10000);
  console.error("Sitio no enviado");
  // alert("¡Oh no!\n\nAlgo salió mal, inténtalo de nuevo.")
}

function Exito(){
  form.reset();
  console.log("Sitio enviado");
  // alert("¡Gracias!\n\nTu colaboración ha sido enviada a evaluar\nSi es aprobada, pronto podrás encontrarla en la página.\n¡Sigue explorando datos curiosos!")
  Respuesta.innerHTML="¡Gracias por colaborar! Tu sitio web se ha enviado a evaluar.";
  document.getElementById("EnviarSitioSugeridob").removeAttribute("disabled");
  setTimeout(Borrar, 10000);
}

function Borrar(){
  Respuesta.innerHTML="";
}

function ConexionFormulario() {
  if (window.navigator.onLine == true) {
    document.getElementById("EnviarSitioSugeridob").removeAttribute("disabled");
    Borrar();
    console.log("Conexión a Internet establecida");
  } else {
    Respuesta.innerHTML="Conéctate a Internet para enviar tus sitios web.";
    document.getElementById("EnviarSitioSugeridob").setAttribute("disabled","");
    console.warn("Conexión a Internet perdida");
  }
}

window.addEventListener('online', ConexionFormulario);
window.addEventListener('offline', ConexionFormulario);
window.onload = ConexionFormulario;
