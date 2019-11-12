<?php
$servername = "localhost";
$usuario = "alucard";
$contrasena = "spider1453";
$dbname = "sistemabicis";

session_start();
//Esta variable deberia ser sesion una vez que se genere el login
//se declara aqui de manera temporal

$idBicicleta=$_GET['idBicicleta'];


//Se da de baja la bicicleta a la base de datos
$band = 0;

try {
    $mdb = new PDO("mysql:host=$servername;dbname=$dbname", $usuario, $contrasena);
    // set the PDO error mode to exception
    $mdb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "UPDATE bicicleta SET ESTADO = 'Inactivo' WHERE CLAVEBIC = '".$idBicicleta."' ";
    // use exec() because no results are returned
    $mdb->exec($sql);
    $mdb = null;
    $band=1;
}
catch(PDOException $e){
    echo "<br>" . $e->getMessage();
}
echo $band;
?>