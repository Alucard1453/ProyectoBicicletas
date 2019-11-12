<?php
$servername = "localhost";
$usuario = "alucard";
$contrasena = "spider1453";
$dbname = "sistemabicis";

try {
    $mdb = new PDO("mysql:host=$servername;dbname=$dbname", $usuario, $contrasena);
    // set the PDO error mode to exception
    $mdb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = $mdb->prepare("SELECT * FROM acceso ");
    $sql->execute();
    // use exec() because no results are returned
    $contador=0;
    while($resultado = $sql->fetch(PDO::FETCH_OBJ)){
        $Accesos[$contador] = new stdClass();
        $Accesos[$contador]->id=$resultado->CLAVEACCESO;
        $Accesos[$contador]->descripcion=$resultado->DESCRIPCION;
        $contador++;
    }
    $mdb = null;
}
catch(PDOException $e){
    echo "<br>" . $e->getMessage();
}

$myJSON = json_encode($Accesos);

echo $myJSON;

?>