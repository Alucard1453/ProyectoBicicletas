<?php

    session_start();
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


    // 'funcion' que se ejecutara cuando un visitante quiera ser dado de alta
    if (isset($_GET['altaVisitor'])) {
        
        do {

        $folio = rand(1, 9999);

        $user_check_query = $mdb->query("SELECT CLAVEUSER FROM usuario WHERE CLAVEUSER = '$folio' ");
        $user = $user_check_query->fetch();

        } while ($user); // Si ya existe un username igual, volvera a buscar otro folio  
        

        // Datos personales visitante
        $apellidoP = $_GET['apellidoPatVisitante'];
        $apellidoM = $_GET['apellidoMatVisitante'];
        $nombre = $_GET['nombreVisitante'];
        $contrasenia = $_GET['contraseniaVisitante'];
        $tipo = "Visitante";
        $estado = "Activo";

        // Datos =basicos= de la bicicleta
        $marca=$_GET['selectMarcaBiciVisitante'];
        $color=$_GET['selectColorBiciVisitante'];
        $tipoBici=$_GET['selectTipoBiciVisitante'];

        
        $sql = "INSERT INTO usuario (CLAVEUSER, APATERNO, AMATERNO, NOMBRE, CONTRASENA, TIPO, ESTADO) 
                VALUES ('".$folio."', '".$apellidoP."', '".$apellidoM."', '".$nombre."', '".$contrasenia."', '".$tipo."', '".$estado."')";
        $mdb->exec($sql);

        $sqlBici = "INSERT INTO bicicleta (CLAVEUSER, IDMARCA, COLOR, ESTADO, TIPO) 
                    VALUES ('$folio', '$marca', '$color', '$estado', '".$tipoBici."')";
        $mdb->exec($sqlBici);

        echo "Holi";

        $mdb = null;    
    
        $_SESSION['success'] = "Has ingresado al sistema" + $folio;
        header("location: ./worker.html");
    }
?>