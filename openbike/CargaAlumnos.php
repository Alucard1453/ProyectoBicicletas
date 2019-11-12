<?php
$servername = "localhost";
$usuario = "alucard";
$contrasena = "spider1453";
$dbname = "sistemabicis";

$band = false;

$Obtener = array();


try {
    $mdb = new PDO("mysql:host=$servername;dbname=$dbname", $usuario, $contrasena);
    // set the PDO error mode to exception
    $mdb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = $mdb->prepare("SELECT * FROM usuario WHERE TIPO = 'Alumno'");
    $sql->execute();
    // use exec() because no results are returned
    while($resultado = $sql->fetch(PDO::FETCH_OBJ)){
        $band = true;
        $Obtener[] = array(
            'claveuser' => $resultado->CLAVEUSER,
            'nombre' => $resultado->NOMBRE,
            'paterno' => $resultado->APATERNO,
            'materno' => $resultado->AMATERNO,
            'estado' => $resultado->ESTADO,
            'foto' => base64_encode($resultado->FOTO)
        );
    }
    $mdb = null;
}
catch(PDOException $e){
    echo $sql . "<br>" . $e->getMessage();
}



if(!$band){
    $json = array();
    $jsonstring = json_encode($json);
    echo $jsonstring;
}else{
    $myJSON = json_encode($Obtener);
    echo $myJSON;
}
    

?>