<?php
$servername = "localhost";
$usuario = "alucard";
$contrasena = "spider1453";
$dbname = "sistemabicis";

session_start();

if(isset($_GET['Trabajadores'])){
    try {
        $mdb = new PDO("mysql:host=$servername;dbname=$dbname", $usuario, $contrasena);
        $mdb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = $mdb->prepare("SELECT * FROM trabajador WHERE CLAVETRAB = '".$_SESSION['usuario']."' ");
        $sql->execute();
        while($resultado = $sql->fetch(PDO::FETCH_OBJ)){
            $Trabajador = new stdClass();
            $Trabajador->id=$resultado->CLAVETRAB;
            $Trabajador->paterno=$resultado->APATERNO;
            $Trabajador->materno=$resultado->AMATERNO;
            $Trabajador->nombre=$resultado->NOMBRE;
            $Trabajador->foto=base64_encode($resultado->FOTO);
        }
        $sql = $mdb->prepare("SELECT * FROM acceso WHERE CLAVEACCESO = '".$_SESSION['acceso']."' ");
        $sql->execute();
        while($resultado = $sql->fetch(PDO::FETCH_OBJ)){
            $Trabajador->acceso=$resultado->DESCRIPCION;
        }
        $mdb = null;
    }
    catch(PDOException $e){
        echo "<br>" . $e->getMessage();
    }
    
    $myJSON = json_encode($Trabajador);
    
    echo $myJSON;
}

if(isset($_GET['Usuario'])){
    $user=$_GET['Usuario'];
    try {
        $mdb = new PDO("mysql:host=$servername;dbname=$dbname", $usuario, $contrasena);
        // set the PDO error mode to exception
        $mdb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = $mdb->prepare("SELECT * FROM usuario WHERE CLAVEUSER='".$user."' ");
        $sql->execute();
        // use exec() because no results are returned
        while($resultado = $sql->fetch(PDO::FETCH_OBJ)){
            $Usuario = new stdClass();
            $Usuario->id=$resultado->CLAVEUSER;
            $Usuario->paterno=$resultado->APATERNO;
            $Usuario->materno=$resultado->AMATERNO;
            $Usuario->nombre=$resultado->NOMBRE;
            $Usuario->tipo=$resultado->TIPO;
            $Usuario->estado=$resultado->ESTADO;
            $Usuario->foto=base64_encode($resultado->FOTO);
        }
        $mdb = null;
    }
    catch(PDOException $e){
        echo "<br>" . $e->getMessage();
    }
    
    $myJSON = json_encode($Usuario);
    
    echo $myJSON;
}

if(isset($_GET['Bicicletas'])){
    $user=$_GET['Bicicletas'];
    try {
        $mdb = new PDO("mysql:host=$servername;dbname=$dbname", $usuario, $contrasena);
        // set the PDO error mode to exception
        $mdb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = $mdb->prepare("SELECT * FROM bicicleta AS b INNER JOIN marca AS m ON b.IDMARCA=m.IDMARCA WHERE ESTADO = 'Activo' AND CLAVEUSER='".$user."'");
        $sql->execute();
        // use exec() because no results are returned
        $contador=0;
        while($resultado = $sql->fetch(PDO::FETCH_OBJ)){
            $Bicicletas[$contador] = new stdClass();
            $Bicicletas[$contador]->id=$resultado->CLAVEBIC;
            $Bicicletas[$contador]->claveuser=$resultado->CLAVEUSER;
            $Bicicletas[$contador]->color=$resultado->COLOR;
            $Bicicletas[$contador]->foto=base64_encode($resultado->FOTO);
            $Bicicletas[$contador]->estado=$resultado->ESTADO;
            $Bicicletas[$contador]->tipo=$resultado->TIPO;
            $Bicicletas[$contador]->idmarca=$resultado->IDMARCA;
            $Bicicletas[$contador]->marca=$resultado->NMARCA;
            $contador++;
        }
        $mdb = null;
    }
    catch(PDOException $e){
        echo "<br>" . $e->getMessage();
    }
    
    $myJSON = json_encode($Bicicletas);
    
    echo $myJSON;
}

if(isset($_GET['Estatus'])){
    $user=$_GET['Estatus'];
    try {
        $mdb = new PDO("mysql:host=$servername;dbname=$dbname", $usuario, $contrasena);
        // set the PDO error mode to exception
        $mdb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = $mdb->prepare("SELECT * FROM historial h INNER JOIN bicicleta b ON h.CLAVEBIC=b.CLAVEBIC WHERE b.CLAVEUSER= '".$user."' AND h.HSALIDA IS NULL");

        $sql->execute();
        // use exec() because no results are returned
        $resultado = $sql->fetch(PDO::FETCH_OBJ);
        if($resultado!=null){
            $Historial = new stdClass();
            $Historial->entrada=$resultado->ACCESOENT;
            $Historial->autorizoent=$resultado->AUTORIZAENT;
            $Historial->bici=$resultado->CLAVEBIC;
            $Historial->fecha=$resultado->FECHA;
            $Historial->hentrada=$resultado->HENTRADA;

            $myJSON = json_encode($Historial);
    
            echo $myJSON;
        }
        else{
            echo "null";
        }
        $mdb = null;
    }
    catch(PDOException $e){
        echo "<br>" . $e->getMessage();
    }
}

if(isset($_GET['Acceso'])){
    $fecha=$_GET['Fecha'];
    $hora=$_GET['Hora'];
    $acceso=$_GET['Acceso'];
    $idBicicleta=$_GET['idBici'];

    try {
        $mdb = new PDO("mysql:host=$servername;dbname=$dbname", $usuario, $contrasena);
        // set the PDO error mode to exception
        $mdb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = "INSERT INTO historial(CLAVEBIC,AUTORIZAENT,FECHA,HENTRADA,ACCESOENT) VALUES('".$idBicicleta."', '".$_SESSION['usuario']."', '".$fecha."', '".$hora."', '".$_SESSION['acceso']."') ";
        // use exec() because no results are returned
        $mdb->exec($sql);
        $mdb = null;
    }
    catch(PDOException $e){
        echo "<br>" . $e->getMessage();
    }
}

if(isset($_GET['Historial'])){
    $user=$_GET['Historial'];
    try {
        $mdb = new PDO("mysql:host=$servername;dbname=$dbname", $usuario, $contrasena);
        // set the PDO error mode to exception
        $mdb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = $mdb->prepare("SELECT h.CLAVEBIC, b.CLAVEUSER, m.NMARCA, b.FOTO, b.COLOR, b.TIPO, b.ESTADO, h.FECHA, h.HENTRADA, a.DESCRIPCION, t.NOMBRE, t.APATERNO, t.AMATERNO, t.FOTO as fotoTraba FROM historial h INNER JOIN bicicleta b ON h.CLAVEBIC=b.CLAVEBIC INNER JOIN trabajador t ON t.CLAVETRAB=h.AUTORIZAENT INNER JOIN acceso a ON a.CLAVEACCESO=h.ACCESOENT INNER JOIN marca m ON m.IDMARCA=b.IDMARCA WHERE b.CLAVEUSER='".$user."' AND h.HSALIDA IS NULL");
        
        $sql->execute();
        // use exec() because no results are returned

        while($resultado = $sql->fetch(PDO::FETCH_OBJ)){
            $Historial = new stdClass();
            $Historial->idBici=$resultado->CLAVEBIC;
            $Historial->iduser=$resultado->CLAVEUSER;
            $Historial->nMarca=$resultado->NMARCA;
            $Historial->foto=base64_encode($resultado->FOTO);
            $Historial->color=$resultado->COLOR;
            $Historial->tipo=$resultado->TIPO;
            $Historial->estado=$resultado->ESTADO;
            $Historial->fecha=$resultado->FECHA;
            $Historial->horaEntrada=$resultado->HENTRADA;
            $Historial->accesoEntrada=$resultado->DESCRIPCION;
            $Historial->entAutorizacion=$resultado->NOMBRE." ".$resultado->APATERNO." ".$resultado->AMATERNO;
            $Historial->fotoTrab=base64_encode($resultado->fotoTraba);
        }
        $mdb = null;

        $myJSON = json_encode($Historial);
    
        echo $myJSON;
    }
    catch(PDOException $e){
        echo "<br>" . $e->getMessage();
    }
}

if(isset($_GET['Salida'])){
    $hora=$_GET['Hora'];
    $acceso=$_GET['Salida'];
    $idBicicleta=$_GET['idBici'];

    try {
        $mdb = new PDO("mysql:host=$servername;dbname=$dbname", $usuario, $contrasena);
        // set the PDO error mode to exception
        $mdb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = "UPDATE historial SET AUTORIZASAL= '".$_SESSION['usuario']."', HSALIDA= '".$hora."', ACCESOSAL= '".$_SESSION['acceso']."' WHERE CLAVEBIC='".$idBicicleta."' AND HSALIDA IS NULL";
        // use exec() because no results are returned
        $mdb->exec($sql);
        $mdb = null;
    }
    catch(PDOException $e){
        echo "<br>" . $e->getMessage();
    }
}
?>