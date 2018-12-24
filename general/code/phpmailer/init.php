<?php

    require_once('class.phpmailer.php');

    $mail=new PHPMailer();
    $mail->IsSMTP();
    $mail->SMTPAuth=true;
    $mail->Host="mail.cafegila.net";

    //Datos a cambiar
    $mail->Port=25;
    $mail->Username="nocontestar@cafegila.net";
    $mail->Password="sU)&3#QK7Twy";

?>