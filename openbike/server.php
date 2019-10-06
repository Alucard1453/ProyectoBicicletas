<?php

    //session_start();
    $servername = "localhost";
    $usuario = "root";
    $contrasena = "";
    $dbname = "sistemabicis";

    $idBici = "";





    try {
        $mdb = new PDO("mysql:host=$servername;dbname=$dbname", $usuario, $contrasena);
        // set the PDO error mode to exception
        $mdb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch(PDOException $e){
        echo "<br>" . $e->getMessage();
    }


    //Esta variable deberia ser sesion una vez que se genere el login
    //se declara aqui de manera temporal
    $user='201648713';


    // 'funcion' que se ejecutara cuando una bici sea dada de baja (puesta en estado inactivo)
    if (isset($_POST['bajaBike'])) {
        
        $estado = "Inactivo";
        $idBici = $_POST['id'];
        //echo $idBici;

        //Se \ctualiza el estado de la bici a inactivo
        $sql = "UPDATE bicicleta SET ESTADO = '$estado' WHERE CLAVEBIC = '$idBici'";
        // use exec() because no results are returned
        $mdb->exec($sql);
        $mdb = null;

    
        
        header("location: ./user.html");

    }

    // 'funcion' que se ejecutara cuando una bici sea dada de baja (puesta en estado inactivo)
    if (isset($_POST['getDatosBici'])) {
        
        $idBici = $_POST['id'];
        //echo $idBici;

        //Se \ctualiza el estado de la bici a inactivo
        $sql = "SELECT * FROM bicicleta WHERE CLAVEBIC = '$idBici'";
        // use exec() because no results are returned
        $mdb->exec($sql);
        $mdb = null;
        
        header("location: ./user.html");

    }

    // 'funcion' que se ejecutara cuando una bici sea dada de baja (puesta en estado inactivo)
    if (isset($_POST['modificaBike'])) {

        
    $imagen=addslashes(file_get_contents($_FILES['file-inputM']['tmp_name']));
    $marca=$_POST['selectMarcaM'];
    $color=$_POST['selectColorM'];
    $tipo=$_POST['selectTipoM'];
        
        $estado = "Inactivo";
        $idBici = $_POST['id'];
        //echo $idBici;

        //Se \ctualiza el estado de la bici a inactivo
        $sql = "UPDATE bicicleta SET COLOR = '$color', FOTO = '$imagen', TIPO = '$tipo', IDMARCA = '$marca' WHERE CLAVEBIC = '$idBici'";
        // use exec() because no results are returned
        $mdb->exec($sql);
        $mdb = null;
        
        header("location: ./user.html");

    }


?>