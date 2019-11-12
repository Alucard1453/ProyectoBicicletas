<?php

$servername = "localhost";
$usuario = "alucard";
$contrasena = "spider1453";
$dbname = "sistemabicis";

session_start();
$user=$_SESSION['usuario'];

    $imagen=addslashes(file_get_contents($_FILES['archivo']['tmp_name']));

    try {
        $mbd = new PDO("mysql:host=$servername;dbname=$dbname", $usuario, $contrasena);

        $gsent = $mbd->prepare("UPDATE usuario SET FOTO='".$imagen."' WHERE CLAVEUSER='".$user."' ");
        $gsent->execute();
                        
    }
    catch(PDOException $e){
    echo $e->getMessage();
    }  
    header("Location: ./user.html");
?>