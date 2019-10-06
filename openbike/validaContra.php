<?php

session_start();

$ContraActual=$_POST['contra1'];
$ContraNueva=$_POST['contra2'];

    try {
        $mbd = new PDO("mysql:host=localhost;dbname=sistemabicis", 'root', '');
        
        $usuario = 201624306;

        $gsent = $mbd->prepare("SELECT CLAVEUSER, APATERNO, AMATERNO, NOMBRE,CONTRASENA, TIPO, ESTADO, FOTO from usuario where CLAVEUSER= '$usuario'");
        $gsent->execute();
        while($result3 = $gsent->fetch(PDO::FETCH_OBJ)){
            $id = $result3->CLAVEUSER;
            $paterno = $result3->APATERNO;       // Es una propiedad. Accesible desde el objeto
            $materno = $result3->AMATERNO;        // Es una propiedad. Accesible desde el objeto
            $nombre = $result3->NOMBRE;
            $contrasena = $result3->CONTRASENA;
            $tipo = $result3->TIPO;
            $estado = $result3->ESTADO;        // Es una propiedad. Accesible desde el objeto
            $foto = $result3->FOTO;    
                                    
        }                  
    }
        catch(PDOException $e){
        echo $e->getMessage();
    }

    if($contrasena == $ContraActual){

        try {
            $mbd = new PDO("mysql:host=localhost;dbname=sistemabicis", 'root', '');
            
    
            $gsent = $mbd->prepare("UPDATE usuario SET CONTRASENA='".$ContraNueva."' WHERE CLAVEUSER='201624306'");
            $gsent->execute();
                        
        }
            catch(PDOException $e){
            echo $e->getMessage();
        }
        /*echo'<script type="text/javascript">
        alert("Tarea Guardada");
        window.location.href="index.php";
        </script>';*/
    }
    header("Location: ./user.php");

?>