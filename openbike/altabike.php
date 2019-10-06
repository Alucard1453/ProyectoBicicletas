<?php
$servername = "localhost";
$usuario = "root";
$contrasena = "";
$dbname = "sistemabicis";

session_start();
//Esta variable deberia ser sesion una vez que se genere el login
//se declara aqui de manera temporal
$user='201648713';

$imagen=addslashes(file_get_contents($_FILES['file-input']['tmp_name']));
$marca=$_POST['selectMarca'];
$color=$_POST['selectColor'];
$tipo=$_POST['selectTipo'];


//Se guarda la bicicleta a la base de datos
try {
    $mdb = new PDO("mysql:host=$servername;dbname=$dbname", $usuario, $contrasena);
    // set the PDO error mode to exception
    $mdb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "INSERT INTO bicicleta (CLAVEUSER, IDMARCA, COLOR, FOTO, ESTADO, TIPO)
    VALUES ( '".$user."' , '".$marca."', '".$color."', '".$imagen."', 'Activo', '".$tipo."' )";
    // use exec() because no results are returned
    $mdb->exec($sql);
    $mdb = null;
}
catch(PDOException $e){
    echo "<br>" . $e->getMessage();
}
header("Location: ./user.php");
?>