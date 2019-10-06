<?php

session_start();

    //$imagen = $_FILES['archivo']['tmp_name'];

    $imagen=addslashes(file_get_contents($_FILES['archivo']['tmp_name']));

    //echo $imagen; UPDATE usuario SET FOTO=LOAD_FILE('".$imagen."') WHERE CLAVEUSER='201624306'
    
        try {
            $mbd = new PDO("mysql:host=localhost;dbname=sistemabicis", 'root', '');
            
            $usuario = 201624306;

            $gsent = $mbd->prepare("UPDATE usuario SET FOTO='".$imagen."' WHERE CLAVEUSER='201624306'");
            $gsent->execute();
                           
        }
        catch(PDOException $e){
        echo $e->getMessage();
        }  
        header("Location: ./user.php");
        ?>