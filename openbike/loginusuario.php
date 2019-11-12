<?php
$servername = "localhost";
$usuario = "alucard";
$contrasena = "spider1453";
$dbname = "sistemabicis";

$username=$_GET['Usuario'];
$pass=$_GET['Password'];

session_start();

//Creamos la clase usuario
class Usuario{
    private $clave;
    private $contra;
    private $tipo;
    
    public function __construct($clav, $cont, $tip) {
        $this -> clave = $clav;
        $this -> contra = $cont;
        $this -> tipo = $tip;
    }

    public function getClave(){
        return $this -> clave;
    }

    public function getPass(){
        return $this -> contra;
    }

    public function getTipo(){
        return $this -> tipo;
    }
}

try {
    $mdb = new PDO("mysql:host=$servername;dbname=$dbname", $usuario, $contrasena);

    // set the PDO error mode to exception
    $mdb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = $mdb->prepare("SELECT * FROM usuario");
    $sql->execute();
    // use exec() because no results are returned
    $contador=0;
    while($resultado = $sql->fetch(PDO::FETCH_OBJ)){
        $clav = $resultado->CLAVEUSER;
        $cont = $resultado->CONTRASENA;
        $tip = $resultado->TIPO;
        $Usuarios[$contador] = new Usuario($clav,$cont,$tip);
        $contador++;
    }
    $mdb = null;
}
catch(PDOException $e){
    echo "<br>" . $e->getMessage();
}

$band = 0;
for($i=0;$i<$contador;$i++){
    if($Usuarios[$i]->getClave() == $username && $Usuarios[$i]->getPass() == $pass){
        $_SESSION['usuario']=$Usuarios[$i]->getClave();
        if($Usuarios[$i]->getTipo() == "Alumno"){
            $band=1;
        }else{
            $band=2;
        }
    }
}

echo $band;

?>