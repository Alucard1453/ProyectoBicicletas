<?php
$servername = "localhost";
$usuario = "root";
$contrasena = "";
$dbname = "sistemabicis";

//session_start();
//Esta variable deberia ser sesion una vez que se genere el login
//se declara aqui de manera temporal
//$user=$_SESSION['usuario'];

$search=$_GET['busca'];

$band = false;

$Obtener = array();

if(!empty($search)){
    try {
        $mdb = new PDO("mysql:host=$servername;dbname=$dbname", $usuario, $contrasena);
        // set the PDO error mode to exception
        $mdb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = $mdb->prepare("SELECT * FROM usuario WHERE TIPO = 'Alumno' AND NOMBRE LIKE '$search%' ");
        $sql->execute();
        // use exec() because no results are returned
        while($resultado = $sql->fetch(PDO::FETCH_OBJ)){
            /*$respuesta = new stdClass();
            $respuesta->id=$resultado->CLAVEUSER;
            $respuesta->paterno=$resultado->APATERNO;
            $respuesta->materno=$resultado->AMATERNO;
            $respuesta->nombre=$resultado->NOMBRE;
            $respuesta->tipo=$resultado->TIPO;
            $respuesta->foto=base64_encode($resultado->FOTO);*/
            $band = true;
            $Obtener[] = array(
                'claveuser' => $resultado->CLAVEUSER,
                'nombre' => $resultado->NOMBRE,
                'paterno' => $resultado->APATERNO,
                'materno' => $resultado->AMATERNO,
                'estado' => $resultado->ESTADO
            );
        }
        $mdb = null;
    }
    catch(PDOException $e){
        echo $sql . "<br>" . $e->getMessage();
    }

    

    if($band ==false){
        $json = array();
        //$json[] = array('resultado' => 'Sin resultados');
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }else{
        //$myJSON = array();
        $myJSON = json_encode($Obtener);
        echo $myJSON;
    }
    
}else{
    $json = array();
    //$json[] = array('resultado' => 'Sin resultados');
    $jsonstring = json_encode($json);
    echo $jsonstring;
}

//echo $search;
?>