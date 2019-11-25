<?php
    $servername = "localhost";
    $usuario = "alucard";
    $contrasena = "spider1453";
    $dbname = "sistemabicis";

    session_start();

    try {
        $mdb = new PDO("mysql:host=$servername;dbname=$dbname", $usuario, $contrasena);
        // set the PDO error mode to exception
        $mdb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        do {

            $folio = rand(1, 9999);

            $user_check_query = $mdb->query("SELECT CLAVEUSER FROM usuario WHERE CLAVEUSER = '$folio' ");
            $user = $user_check_query->fetch();

        } while ($user); // Si ya existe un username igual, volvera a buscar otro folio  
        

        // Datos personales visitante
        $apellidoP = $_GET['apellidoPatVisitante'];
        $apellidoM = $_GET['apellidoMatVisitante'];
        $nombre = $_GET['nombreVisitante'];
        // $contrasenia = $_GET['contraseniaVisitante'];
        $tipo = "Visitante";
        $estado = "Activo";

        // Datos =basicos= de la bicicleta
        $marca=$_GET['selectMarcaBiciVisitante'];
        $color=$_GET['selectColorBiciVisitante'];
        $tipoBici=$_GET['selectTipoBiciVisitante'];

        
        $sql = "INSERT INTO usuario (CLAVEUSER, APATERNO, AMATERNO, NOMBRE, CONTRASENA, TIPO, ESTADO) 
                VALUES ('".$folio."', '".$apellidoP."', '".$apellidoM."', '".$nombre."', '".$folio."', '".$tipo."', '".$estado."')";
        $mdb->exec($sql);

        $sql = "INSERT INTO bicicleta (CLAVEUSER, IDMARCA, COLOR, ESTADO, TIPO) 
                    VALUES ('".$folio."', '".$marca."', '".$color."', '".$estado."', '".$tipoBici."')";
        $mdb->exec($sql);

        $sql = "UPDATE usuario SET FOTO= '".$image."' WHERE CLAVEUSER= '".$folio."' ";
        $mdb->exec($sql);
        
        $mdb = null;

        echo $folio;
    }
    catch(PDOException $e){
        echo "<br>" . $e->getMessage();
    }
?>