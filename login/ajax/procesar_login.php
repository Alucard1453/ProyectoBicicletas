<?php
require_once "../inc/config.php";
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    header("Content-Type: application/json");
    $array_devolver=[];
    $claveuser = $_POST['claveuser'];
    $contrasena = $_POST['contrasena'];
    $tipo=$_POST['tipo'];

    if(empty($claveuser))
    {
        $array_devolver['sin']="Usuario Requerido";
    }

  if(empty($contrasena))
    {
        $array_devolver['con']="Contraseña Requerida";
    }

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
        if($contrasena==$password && $tipoUsuario ==$tipo){
            $_SESSION['CLAVEUSER']=$clave;
            $array_devolver['inicio'] =$user;
            $array_devolver['status'] ='ok';
        }
        else{
            if($contrasena!=$password){
                $array_devolver['error']="Verificar tu Usuario o Contraseña";
                $array_devolver['status'] ='error';
            }
        }
    }
    else{
        $array_devolver['error']="El Usuario No Existe";
    }
    
    echo json_encode($array_devolver);

}else{
    exit("Fuera de aquí");
}

?>