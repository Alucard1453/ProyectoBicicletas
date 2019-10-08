<?php
require_once "../inc/config.php";

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    header("Content-Type: application/json");
    $array_devolver=[];
    $claveuser = $_POST['claveuser'];

    // comprobar si el user existe 
    $buscar_user = $con->prepare("SELECT * FROM usuario WHERE CLAVEUSER = '$claveuser' LIMIT 1");
    $buscar_user->bindParam(':claveuser', $claveuser, PDO::PARAM_STR);
    $buscar_user->execute();

    if($buscar_user->rowCount() == 1){
  
        $array_devolver['error'] = "Este Usuario ya existe";
        $array_devolver['is_login']= false;
        
    }else{
        $contrasena = $_POST['contrasena'];
        $nombre = $_POST['nombre'];
        $APaterno=$_POST['APaterno'];
        $AMaterno=$_POST['AMaterno'];
        $tipo=$_POST['tipo'];
        
        $nuevo_user = $con->prepare("INSERT INTO usuario (CLAVEUSER, CONTRASENA,NOMBRE,APATERNO,AMATERNO,TIPO,ESTADO) VALUES(:claveuser, :contrasena,:nombre,:APaterno,:AMaterno,:tipo,'Activo')");
        $nuevo_user->bindParam(':claveuser', $claveuser, PDO::PARAM_STR);
        $nuevo_user->bindParam(':contrasena', $contrasena, PDO::PARAM_STR);
        $nuevo_user->bindParam(':nombre', $nombre, PDO::PARAM_STR);
        $nuevo_user->bindParam(':APaterno', $APaterno, PDO::PARAM_STR);
        $nuevo_user->bindParam(':AMaterno', $AMaterno, PDO::PARAM_STR);
        $nuevo_user->bindParam(':tipo', $tipo, PDO::PARAM_STR);
        $nuevo_user->execute();

       
        //$array_devolver['redirect']= '../admin.php'; 
        $array_devolver['is_login']= true;
        $array_devolver['redirect']='http://localhost:8080/InicioSesion/';
    }

    echo json_encode($array_devolver);

}else{
    exit("Fuera de aquí");
}


?>