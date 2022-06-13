<?php
$App = $_POST['App'];
$Asunto = $_POST['Asunto'];
$eMail = $_POST['email'];
$Mensaje = $_POST['mensaje'];

$Correo = 'e-mail: ' . $eMail . '\r\n Asunto: ' . $Asunto . '\r\n App relacionada: ' . $App . 'Mensaje: ' . $Mensaje;

$Destinatario = 'Eduardochan_cach@hotmail.com';
$AsuntoPrincipal = 'Mensaje de contacto de ' . $App;

mail($Destinatario, $AsuntoPrincipal, utf8_decode($Mensaje), $header);

header('<Location:Contacto.html');
?>