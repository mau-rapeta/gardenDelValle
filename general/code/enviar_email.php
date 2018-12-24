<?php
require_once("phpmailer/PHPMailerAutoload.php");

date_default_timezone_set('America/Mexico_City');
$fecha=date("Y-m-d H:i:s");

$mail=new PHPMailer();
$mail->IsSMTP();
$mail->SMTPAuth=true;
$mail->Host="localhost";
$mail->Port=26;
$mail->Username="noresponder@inteda.com.mx";
$mail->Password="Inteda_2006";

$mail->SetFrom("noresponder@inteda.com.mx", "Contacto Inteda");
$mail->Subject=utf8_decode("Mensaje de: ".$_POST['nombre']);

if($_POST['nombre']!="" and $_POST['email']!="" and $_POST['empresa']!=""){
	$mensaje = 'La siguiente persona ha solicitado contactar desde inteda.com.mx';
	$mensaje.=  '<p>Nombre: '.$_POST['nombre'].
                '<br>E-mail: '.$_POST['email'].
                '<br>Empresa: '.$_POST['empresa'].
                '<br>Teléfono: '.$_POST['telefono'].
                '<br>Mensaje:<br>'.$_POST['mensaje'].'</p>';

	//$body = file_get_contents('contents.html');
	$body = $mensaje;

    $mail->AddAddress('contacto@inteda.com.mx');
	$mail->CharSet = 'UTF-8';
	$mail->AltBody    = "Para ver este mensaje, use un lector de correo compatible con HTML"; // optional, comment out and test
	$mail->MsgHTML($body);

	if(!$mail->Send()) {
	  echo "Mailer Error: " . $mail->ErrorInfo;
	} else {
	  echo "true";
	}

    // clear addresses of all types
    $mail->ClearAddresses();  // each AddAddress add to list
    $mail->ClearCCs();
    $mail->ClearBCCs();
}
?>