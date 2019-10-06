<?php
$servername = "localhost";
$usuario = "root";
$contrasena = "";
$dbname = "sistemabicis";

try {
    $mdb = new PDO("mysql:host=$servername;dbname=$dbname", $usuario, $contrasena);
    // set the PDO error mode to exception
    $mdb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = $mdb->prepare("SELECT * FROM bicicleta AS b INNER JOIN marca AS m ON b.IDMARCA=m.IDMARCA WHERE ESTADO = 'Activo'");
    $sql->execute();
    // use exec() because no results are returned
    $contador=0;
    //$Temas = array();
    while($resultado = $sql->fetch(PDO::FETCH_OBJ)){
        $Bicicletas[$contador] = new stdClass();
        $Bicicletas[$contador]->id=$resultado->CLAVEBIC;
        $Bicicletas[$contador]->claveuser=$resultado->CLAVEUSER;
        $Bicicletas[$contador]->color=$resultado->COLOR;
        $Bicicletas[$contador]->foto=base64_encode($resultado->FOTO);
        $Bicicletas[$contador]->estado=$resultado->ESTADO;
        $Bicicletas[$contador]->tipo=$resultado->TIPO;
        $Bicicletas[$contador]->idmarca=$resultado->IDMARCA;
        $Bicicletas[$contador]->marca=$resultado->NMARCA;
        $contador++;
    }
    $mdb = null;
}
catch(PDOException $e){
    echo $sql . "<br>" . $e->getMessage();
}

$myJSON = json_encode($Bicicletas);

echo $myJSON;
    
?>