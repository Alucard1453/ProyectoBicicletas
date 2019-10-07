<?php

session_start();
$user='201648713';

    //$imagen = $_FILES['archivo']['tmp_name'];

    $imagen=addslashes(file_get_contents($_FILES['archivo']['tmp_name']));

    //echo $imagen; UPDATE usuario SET FOTO=LOAD_FILE('".$imagen."') WHERE CLAVEUSER='201624306'
    
    try {
        $mbd = new PDO("mysql:host=localhost;dbname=sistemabicis", 'root', '');

        $gsent = $mbd->prepare("UPDATE usuario SET FOTO='".$imagen."' WHERE CLAVEUSER='".$user."' ");
        $gsent->execute();
                        
    }
    catch(PDOException $e){
    echo $e->getMessage();
    }  
    header("Location: ./user.html");
?>