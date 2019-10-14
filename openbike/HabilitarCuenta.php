<?php
$servername = "localhost";
$usuario = "root";
$contrasena = "";
$dbname = "sistemabicis";

$idAlumno = $_GET['matricula'];
$auxEstado = "";

$band = 0; //bandera es false;

try {
    $mdb = new PDO("mysql:host=$servername;dbname=$dbname", $usuario, $contrasena);
    // set the PDO error mode to exception
    $mdb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = $mdb->prepare("SELECT ESTADO FROM usuario WHERE CLAVEUSER='".$idAlumno."' ");
    $sql->execute();
    // use exec() because no results are returned
    while($resultado = $sql->fetch(PDO::FETCH_OBJ)){
        $auxEstado = $resultado->ESTADO;
    }

    if($auxEstado == 'Activo'){
        $sql = $mdb->prepare("UPDATE usuario SET ESTADO = 'Inactivo' WHERE CLAVEUSER='".$idAlumno."'");
        $sql->execute();
        $band=1;
    }else{
        $sql = $mdb->prepare("UPDATE usuario SET ESTADO = 'Activo' WHERE CLAVEUSER='".$idAlumno."'");
        $sql->execute();
        $band=2;
    }

    $mdb = null;
}
catch(PDOException $e){
    echo "<br>" . $e->getMessage();
}

echo $band;

?>