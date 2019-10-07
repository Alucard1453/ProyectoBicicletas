<?php 
    require_once "./inc/config.php";
?>
<!DOCTYPE html>
<html lang="en" >
<?php include_once 'inc/head.php'; ?>
<body>
<!-- partial:index.partial.html -->
<div class="cont">
<form action="POST" class="form_login">
  <div class="form sign-in">
    <h2>Bienvenido</h2>
    <label>
      <span>Usuario</span>
      <input type="text"  id="claveuser" name="clave" require/>
    </label>
    <label>
      <span>Contraseña</span>
      <input type="password" id="contrasena" name="contra" require />
    </label>    
    <select name="tipo" id="tipo" class="custom-select sources" placeholder="Source Type">
            <option value="Estudiante">Estudiante</option>
            <option value="Trabajador">Trabajador</option>
            <option value="Visitante">Visitante</option>
          </select>
    <button type="submit" class="submit">Sign In</button>   
    <div id="msg_error" class="alert alert-danger" role="alert" style="display: none"></div>
  </form>
  </div>


  <div class="sub-cont">
    <div class="img">
      <div class="img__text m--up">
        <h2>Eres Nuevo?</h2>
        <p>¡Regístrate y descubre una gran cantidad de nuevas oportunidades!</p>
      </div>
      <div class="img__text m--in">
        <h2>¿Uno de nosotros?</h2>
        <p>Si ya tienes una cuenta, solo inicia sesión. ¡Te hemos extrañado!</p>
      </div>
      <div class="img__btn">
        <span class="m--up">Sign Up</span>
        <span class="m--in">Sign In</span>
      </div>
    </div>
    <form action="POST" class="form_registro">
    <div class="form sign-up">
      <label>
        <span>Nombre</span>
        <input type="text" id="nombre" name="nombre"/>
      </label>
     
      <label>
        <span>Apellido Paterno</span>
        <input type="text" id="APaterno" name="APaterno" />
      </label>
     
      <label>
         <span>Apellido Materno</span>
         <input type="text" id="AMaterno" name="AMaterno" />
      </label>
      
      <label>
        <span>Usuario</span>
        <input type="number" id="claveuser" name="claveuser" />
      </label>
     
      <label>
        <span>Password</span>
        <input type="password" id="contrasena" name="contrasena" />
     </label>
     <select name="tipo" id="tipo" class="custom-select sources" placeholder="Source Type">
     <option value="">Tipo de Usuario</option> 
     <option value="Alumno">Estudiante</option>
      <option value="Visitante">Visitante</option>
    </select>
      <button type="submit" class="submit">Sign Up</button>
      </form>
      <div id="msg_error" class="alert alert-danger" role="alert" style="display: none"></div>
    </div>
  </div>
</div>

<!-- partial -->
  <script  src="./script.js"></script>
  <?php include_once 'inc/footer.php'; ?>
</body>
</html>