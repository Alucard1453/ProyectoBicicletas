<?php
$servername = "localhost";
$usuario = "alucard";
$contrasena = "spider1453";
$dbname = "sistemabicis";

session_start();
//Esta variable deberia ser sesion una vez que se genere el login
//se declara aqui de manera temporal
$user=$_SESSION['usuario'];

try {
    $mdb = new PDO("mysql:host=$servername;dbname=$dbname", $usuario, $contrasena);
    // set the PDO error mode to exception
    $mdb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = $mdb->prepare("SELECT * FROM usuario WHERE ESTADO = 'Activo' AND CLAVEUSER='".$user."' ");
    $sql->execute();
    // use exec() because no results are returned
    while($resultado = $sql->fetch(PDO::FETCH_OBJ)){
        $Usuario = new stdClass();
        $Usuario->id=$resultado->CLAVEUSER;
        $Usuario->paterno=$resultado->APATERNO;
        $Usuario->materno=$resultado->AMATERNO;
        $Usuario->nombre=$resultado->NOMBRE;
        $Usuario->tipo=$resultado->TIPO;
        $Usuario->foto=base64_encode($resultado->FOTO);
    }
    $mdb = null;
}
catch(PDOException $e){
    echo $sql . "<br>" . $e->getMessage();
}

$myJSON = json_encode($Usuario);

echo $myJSON;
?>