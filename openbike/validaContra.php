<?php

$servername = "localhost";
$usuario = "root";
$contrasena = "";
$dbname = "sistemabicis";

session_start();
$user='201648713';

$ContraActual=$_GET['oldPass'];
$ContraNueva=$_GET['newPass'];

$band = 0; //bandera es false;

try {
    $mdb = new PDO("mysql:host=$servername;dbname=$dbname", $usuario, $contrasena);
    // set the PDO error mode to exception
    $mdb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = $mdb->prepare("SELECT CONTRASENA FROM usuario WHERE CLAVEUSER='".$user."' ");
    $sql->execute();
    // use exec() because no results are returned
    while($resultado = $sql->fetch(PDO::FETCH_OBJ)){
        $contra = $resultado->CONTRASENA;
    }

    if($contra == $ContraActual){
        $band=1;
        $sql = $mdb->prepare("UPDATE usuario SET CONTRASENA = '".$ContraNueva."' ");
        $sql->execute();
    }

    $mdb = null;
}
catch(PDOException $e){
    echo "<br>" . $e->getMessage();
}

echo $band;

?>