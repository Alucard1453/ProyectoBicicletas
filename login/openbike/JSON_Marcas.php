<?php
$servername = "localhost";
$usuario = "root";
$contrasena = "";
$dbname = "sistemabicis";

try {
    $mdb = new PDO("mysql:host=$servername;dbname=$dbname", $usuario, $contrasena);
    // set the PDO error mode to exception
    $mdb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = $mdb->prepare("SELECT * FROM marca");
    $sql->execute();
    // use exec() because no results are returned
    $contador=0;
    //$Temas = array();
    while($resultado = $sql->fetch(PDO::FETCH_OBJ)){
        $Marcas[$contador] = new stdClass();
        $Marcas[$contador]->id=$resultado->IDMARCA;
        $Marcas[$contador]->nombre=$resultado->NMARCA;
        $contador++;
    }
    $mdb = null;
}
catch(PDOException $e){
    echo $sql . "<br>" . $e->getMessage();
}

$myJSON = json_encode($Marcas);

echo $myJSON;
    
?>