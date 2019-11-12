<?php
$servername = "localhost";
$usuario = "alucard";
$contrasena = "spider1453";
$dbname = "sistemabicis";

$username=$_GET['Usuario'];
$pass=$_GET['Password'];
$acceso=$_GET['Acceso'];

session_start();

//Creamos la clase trabajador
class Trabajador{
    private $clave;
    private $contra;
    
    public function __construct($clav, $cont) {
        $this -> clave = $clav;
        $this -> contra = $cont;
    }

    public function getClave(){
        return $this -> clave;
    }

    public function getPass(){
        return $this -> contra;
    }
}

try {
    $mdb = new PDO("mysql:host=$servername;dbname=$dbname", $usuario, $contrasena);

    // set the PDO error mode to exception
    $mdb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = $mdb->prepare("SELECT * FROM trabajador");
    $sql->execute();
    // use exec() because no results are returned
    $contador=0;
    while($resultado = $sql->fetch(PDO::FETCH_OBJ)){
        $clav = $resultado->CLAVETRAB;
        $cont = $resultado->CONTRASENA;
        $Trabajadores[$contador] = new Trabajador($clav,$cont);
        $contador++;
    }
    $mdb = null;
}
catch(PDOException $e){
    echo "<br>" . $e->getMessage();
}

$band = 0;
for($i=0;$i<$contador;$i++){
    if($Trabajadores[$i]->getClave() == $username && $Trabajadores[$i]->getPass() == $pass){
        $_SESSION['usuario']=$Trabajadores[$i]->getClave();
        $_SESSION['acceso']=$acceso;
        $band=3;
    }
}

echo $band;

?>