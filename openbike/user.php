<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!--Import Google Icon Font-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!--Import materialize.css-->
    <link type="text/css" rel="stylesheet" href="materialize/css/materialize.min.css"  media="screen,projection"/>
    <!--Let browser know website is optimized for mobile-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

    <!--Import bootstrap-->
    <!-- <link href="bootstrap/dist/css/bootstrap.min.css" rel="stylesheet"/> -->

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script> -->
    
    <title>Open Bike - Administración de bicicletas</title>

    <!--Importacion de fuentes locales-->
    <link rel="stylesheet" href="user.css" type="text/css" media="all" />
    <script type="text/javascript" src="user.js"></script>
    <script type="text/javascript">validarsesion();</script>
</head>
<body>
    <nav> <!-- navbar content here  --> 
        <div class="nav-wrapper light-blue darken-4">
            <a href="#" class="brand-logo center">Logo</a>
            <ul id="nav-mobile" class="left">
                <li><a href="#" data-target="slide-out" class=" button-collapse sidenav-trigger show-on-large"><i class="material-icons">menu</i></a></li>
            </ul>
        </div>
    </nav>


    <?php
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
        ?>


    <ul id="slide-out" class="sidenav">
        <li>
            <div class="user-view">
                <div class="background">
                    <img src="resources/fondo.jpg">
                </div>
            <a href="#user"><img class="circle" src="data:image/jpg;base64,<?php echo base64_encode($foto); ?>"></a>
            <a href="#name"><span class="white-text name"><?php echo $nombre.' '.$paterno.' '.$materno?></span></a>
            <a href="#matricula"><span class="white-text matricula"><?php echo $id ?></span></a>
            </div>
        </li>
        <li><a class="subheader"><?php echo $tipo ?></a></li>
        <li><div class="divider"></div></li>
        <li><a class="subheader"><?php echo $estado ?></a></li>
        <li><div class="divider"></div></li>
        
        <?php 

        if($tipo == 'Alumno'){
            echo '<li><a href="#modal1" class="btn modal-trigger blue"><i class="material-icons">cloud</i><p style="font-size: 12px;">Cambiar foto</p></a></li>
                <li><div class="divider"></div></li>
                <li><a href="#modal2" class="btn modal-trigger blue"><i class="material-icons">cloud</i><p style="font-size: 12px;">Cambiar contraseña</p></a></li>';
        }else{
            echo '<li><a href="#modal3" class="btn modal-trigger blue"><i class="material-icons">cloud</i><p style="font-size: 12px;">Cambiar Nombre</p></a></li>
                <li><div class="divider"></div></li>
                <li><a href="#modal1" class="btn modal-trigger blue"><i class="material-icons">cloud</i><p style="font-size: 12px;">Cambiar foto</p></a></li>
                <li><div class="divider"></div></li>
                <li><a href="#modal2" class="btn modal-trigger blue"><i class="material-icons">cloud</i><p style="font-size: 12px;">Cambiar contraseña</p></a></li>';
        }
        
        ?>
    </ul>

<!-- MODAL1 foto MATERIALIZE -->
    
    <div id="modal1" class="modal">
        <div class="modal-content">
            <div class="row">
                <form action="validaFoto.php" method="POST" enctype="multipart/form-data" class="col s12" id="aux">
                    <div class="row">
                        <p><h5><center>Modificar foto de perfil</center></h5></p>
                        <div class="divider"></div>
                        <center><br><img id="ImagenCambio" class="imagenPersona" height="200px" src="data:image/jpg;base64,<?php echo base64_encode($foto); ?>" /></center><br> 
                        <center><input type="file" id="archivo" name="archivo" onchange="validaCamposFoto()"/><br><br></center>

                        <center><button id="botonenviar" type="submit" class="btn modal-trigger blue" disabled>Guardar</button></center>
                    </div>
                </form>
            </div>
        </div>

        <div class="modal-footer">
            
        </div>
    </div>

    <!-- MODAL2 contraseña MATERIALIZE -->
    
    <div id="modal2" class="modal">
        <div class="modal-content">
            <div class="row">
                <form action="validaContra.php" method="POST" enctype="multipart/form-data" class="col s12">
                    <div class="row">
                        <p><h5><center>Cambiar contraseña</center></h5></p>
                        <div class="divider"></div>
                        <label for="password">Contraseña actual</label>
                        <input id="password" placeholder="Coloca la contraseña actual" name="contra1" type="password" class="validate">
                        <label for="password">Nueva contraseña</label>
                        <input id="newPassword" placeholder="Coloca la nueva contraseña" name="contra2" type="password" class="validate">
                        <center><button id="botonContra" type="submit" class="btn modal-trigger blue" disabled>Guardar</button></center>
                    </div>
                </form>
            </div>
        </div>

        <div class="modal-footer">
            
        </div>
    </div>

    <!-- MODAL3 nombre MATERIALIZE -->
    
    <div id="modal3" class="modal">
        <div class="modal-content">
            <div class="row">
                <form action="validaContra.php" method="POST" enctype="multipart/form-data" class="col s12">
                    <div class="row">
                        
                    </div>
                </form>
            </div>
        </div>

        <div class="modal-footer">
            
        </div>
    </div>

    <div class="separador"></div>
    <div class="container">
        <h4>Administración de bicicletas</h4>
        <!-- <h1 class="display-4">Administración de bicicletas</h1> -->
        <div class="divider"></div>
        <div class="separador"></div>
        <div class="row" id="contenedor">
            <div class="fixed-action-btn">
                <a class="btn-floating btn-large waves-effect waves-light light-blue darken-4 modal-trigger right" data-target="modalAlta">
                    <i class="large material-icons">add</i>
                </a>
            </div>
            <!-- SE COMENTO DEBIDO A QUE SE CONSTRUIRA EL DOM USANDO AJAX -->
            <!-- <div class="card col s12 m6 l4">
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src="images/office.jpg">
                </div>
                <div class="card-content">
                    <div class="card-title activator grey-text text-darken-4">Card Title<i class="material-icons right">more_vert</i></div> -->
                    <!-- ESTE NO SE PONDRA <p><a href="#">This is a link</a></p> -->
                <!-- </div>
                <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
                    <p>Here is some more information about this product that is only revealed once clicked on.</p>
                </div>
                <div class="card-action"> -->
                    <!-- Aqui van los botones para editar y eliminar -->
                <!-- </div>
            </div> -->
        </div>
        
        <!-- Aqui el boton permanecia hasta abajo, se cambio para hacerlo flotante -->
        <!-- <div class="row"> -->
            <!-- Modal Trigger -->
            <!-- <button class="btn-floating btn-large waves-effect waves-light light-blue darken-4 modal-trigger right" 
            data-target="modalAlta">
                <i class="material-icons">add</i>
            </button>
        </div> -->

        <!-- - - - - - - - - - - - - - - - - - - - - - Modal Structure Edicion de  bicicletas- - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
        <div class="modal"  id="modalEdita" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-content" role="document" id="modalEditar" >

                </div>
        </div> 
        
        <!--  - - - - - - - - - - - - - - - - - - - - - Modal para CONFIRMAR la baja de la bicicleta - - - - - - - - - - - - - - - - - - - - - -->
        <div class="modal" role="dialog" id="modalBaja" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document" id="modalConfirmacionEliminar" >
                <!--  -->
            </div>
        </div>
          
        <!-- Modal Structure Alta bicicletas-->
        <div id="modalAlta" class="modal">
            <div class="modal-content">
                <h4>Alta de bicicletas</h4>
                <div class="divider"></div>
                <div style="height: 1em;"></div>
                <div class="row">
                    <form class="col s12" action="altabike.php" method="POST" enctype="multipart/form-data">
                        <div class="row">
                            <div class="col s12 m6 l6">
                                <img id="imgSalida" width="100%" height="100%" src="./resources/bikedefault.png"/>
                            </div>
                            <div class="file-field input-field col s12 m6 l6">
                                <div class="btn waves-effect waves-light light-blue darken-4">
                                    <i class="material-icons">image</i> Seleccionar Imagen
                                    <input id="file-input" name="file-input" type="file" accept="image/*" onchange="validaCampos()"/>
                                </div>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text">
                                </div>
                            </div>
                            <div class="input-field col s12 m6 l6">
                                <select id="selectMarca" name="selectMarca" onchange="validaCampos()">
                                    <option value="" disabled selected>Elige la marca</option>
                                </select>
                                <label>Marca</label>
                            </div>
                            <div class="input-field col s12 m6 l6">
                                <select id="selectColor" name="selectColor" onchange="validaCampos()">
                                    <option value="" disabled selected>Elige el color</option>
                                    <option value="Negro">Negro</option>
                                    <option value="Verde">Verde</option>
                                    <option value="Amarillo">Amarillo</option>
                                    <option value="Naranja">Naranja</option>
                                    <option value="Rojo">Rojo</option>
                                    <option value="Morado">Morado</option>
                                    <option value="Azul">Azul</option>
                                    <option value="Blanco">Blanco</option>
                                </select>
                                <label>Color</label>
                            </div>
                            <div class="input-field col s12 m6 l6">
                                <select id="selectTipo" name="selectTipo" onchange="validaCampos()">
                                    <option value="" disabled selected>Selecciona el tipo</option>
                                    <option value="Ciudad">Ciudad</option>
                                    <option value="Montana">Montaña</option>
                                    <option value="Carreras">Carreras</option>
                                    <option value="Turismo">Turismo</option>
                                    <option value="Plegable">Plegable</option>
                                    <option value="Hibrida">Híbrida</option>
                                    <option value="Playera">Playera</option>
                                    <option value="BMX">BMX</option>
                                </select>
                                <label>Tipo de Bicicleta</label>
                            </div>
                            <div class="col s12 m6 l6"></div>
                            <div class="input-field col s12 m6 l6">
                                <button id="btnConfirmaAlta" class="modal-close waves-effect waves-light light-blue darken-4 btn" disabled>
                                    <i class="material-icons right">send</i>Continuar
                                </button>
                            </div>
                        </div>
                        <div class="col s12 m6 l6"></div>
                        
                    </form>
                </div>
            </div>
        </div>
    </div>
    
    <!--JavaScript at end of body for optimized loading-->
    <script type="text/javascript" src="materialize/js/materialize.min.js"></script>
</body>
</html>

<script>
    
    $(document).ready(function() {
        
    // Escuchamos el evento 'change' del input donde cargamos el archivo
        $(document).on('change', 'input[type=file]', function(e) {
            if(e.target.form.id == 'aux'){
                    // Obtenemos la ruta temporal mediante el evento
                var TmpPath = URL.createObjectURL(e.target.files[0]);
                //console.log(TmpPath);
                var imagen = document.createElement("img");
                imagen.setAttribute("src",TmpPath);
                imagen.setAttribute("style","max-height: 200px; min-height: 200px");
        
                document.getElementById('ImagenCambio').src = TmpPath;
            }
        });
    });
    
    $("#password").on("change",function(){
        // aqui va el codigo que requieres hacer cuando se genere algun cambio....
        //console.log("bien");
        var contra = document.getElementById('password').value;
        var contra2 = document.getElementById('newPassword').value;

        var button = document.getElementById("botonContra");
        if(contra != "" && contra2!= ""){
            button.removeAttribute("disabled");
        }else{
            button.setAttribute("disabled", "");
        }
    });

    $("#newPassword").on("change",function(){
        // aqui va el codigo que requieres hacer cuando se genere algun cambio....
        //console.log("bien");
        var contra = document.getElementById('password').value;
        var contra2 = document.getElementById('newPassword').value;
        
        var button = document.getElementById("botonContra");
        if(contra != "" && contra2!= ""){
            button.removeAttribute("disabled");
        }else{
            button.setAttribute("disabled", "");
        }
    });

    function validaCamposFoto(){
        var foto = document.getElementById("archivo"); 
        //console.log(foto);
        var button = document.getElementById("botonenviar");
        if(foto.value){
            button.removeAttribute("disabled");
        }
            
    }

</script>