<?php
$servername = "localhost";
$usuario = "alucard";
$contrasena = "spider1453";
$dbname = "sistemabicis";

session_start();
//Esta variable deberia ser sesion una vez que se genere el login
//se declara aqui de manera temporal

$idBicicleta=$_POST['idBicicleta'];
if(!empty($_FILES['fileinputEdicion']['tmp_name']) && file_exists($_FILES['fileinputEdicion']['tmp_name'])){
    $fotoBicicleta=addslashes(file_get_contents($_FILES['fileinputEdicion']['tmp_name']));
}
$marcaBicicleta=$_POST['selectMarcaEdicion'];
$colorBicicleta=$_POST['selectColorEdicion'];
$tipoBicicleta=$_POST['selectTipoEdicion'];

//Se da de baja la bicicleta a la base de datos

try {
    $mdb = new PDO("mysql:host=$servername;dbname=$dbname", $usuario, $contrasena);
    // set the PDO error mode to exception
    $mdb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    if(isset($fotoBicicleta)){
        $sql = "UPDATE bicicleta SET FOTO = '".$fotoBicicleta."', IDMARCA = '".$marcaBicicleta."', COLOR = '".$colorBicicleta."', TIPO = '".$tipoBicicleta."' WHERE CLAVEBIC = '".$idBicicleta."' ";
        // use exec() because no results are returned
        $mdb->exec($sql);
        $mdb = null;
    }else{
        $sql = "UPDATE bicicleta SET IDMARCA = '".$marcaBicicleta."', COLOR = '".$colorBicicleta."', TIPO = '".$tipoBicicleta."' WHERE CLAVEBIC = '".$idBicicleta."' ";
        // use exec() because no results are returned
        $mdb->exec($sql);
        $mdb = null;
    }

    header("Location: ./user.html");
}
catch(PDOException $e){
    echo "<br>" . $e->getMessage();
}
?>