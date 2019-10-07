<?php
require_once "../inc/config.php";

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    header("Content-Type: application/json");
    $array_devolver=[];
    $claveuser = $_POST['claveuser'];
    $contrasena = $_POST['contrasena'];
    $tipo=$_POST['tipo'];

    // comprobar si el user existe 
    $buscar_user = $con->prepare("SELECT * FROM usuario WHERE CLAVEUSER= '$claveuser' LIMIT 1");
    $buscar_user->bindParam(':claveuser', $claveuser, PDO::PARAM_STR);
    $buscar_user->execute();

    if($buscar_user->rowCount() == 1){
        // Existe
        $user = $buscar_user->fetch(PDO::FETCH_ASSOC);
        $clave = (int) $user['CLAVEUSER'];
        $password = $user['CONTRASENA'];
        $tipoUsuario=$user['TIPO'];
        if($contrasena==$password && $tipoUsuario=='Alumno'){
            $array_devolver['redirect'] ='../InicioSesion/openBike/user.html';
        }else{
            $array_devolver['error']="Los datos no son validos.";
        }

    }else{
      $array_devolver['error']="No tienes cuenta. <a href=../InicioSesion '>Nuevo cuenta</a>";
    }

    echo json_encode($array_devolver);

}else{
    exit("Fuera de aquí");
}


?>