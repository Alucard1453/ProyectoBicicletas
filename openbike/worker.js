//Navbar declarado con Jquery
$(document).ready(function(){
  $('.sidenav').sidenav(
  // El contenido no se uso
  //   {
  //   menuWidth: 50, // Default is 240
  //   edge: 'right', // Choose the horizontal origin
  //   closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
  // }
  );
  $('.modal').modal();
  $('select').formSelect();
  $('#search').keyup(function(e){
    let search = $('#search').val();
    //console.log(search);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

          var res = JSON.parse(this.responseText);
          //console.log(res);
          if(search==""){
            cargaAlumnos();
          }else{
            let template = `<table>
            <thead>
              <tr>
                  <th>Matricula</th>
                  <th>Nombre</th>
                  <th>Paterno</th>
                  <th>Materno</th>
                  <th>Cambiar estado</th>
              </tr>
            </thead>
            <tbody>`;
            for(let i=0;i<Object.keys(res).length;i++){
              template += `
              <tr>
                <td>${res[i].claveuser}</td>
                <td>${res[i].nombre}</td>
                <td>${res[i].paterno}</td>
                <td>${res[i].materno}</td>`;
                if(res[i].estado == 'Activo'){
                  template += `<td><button id="${res[i].claveuser}" class="modal-close waves-light light-red darken-4 btn" onclick="CambiarEstado(this)">${res[i].estado}</button></td>`;    
                }else{
                  template += `<td><button id="${res[i].claveuser}" class="modal-close waves-light light-blue darken-4 btn" onclick="CambiarEstado(this)">${res[i].estado}</button></td>`;
                }
            }
            template += `</tr>`;
            template += `
            </tbody>
            </table>
            `;
            $('#ActualizaTabla').html(template);
          }
          

        }
    };
    xmlhttp.open("GET", "BuscaNombre.php?busca="+search, true);
    xmlhttp.send(); 
  });

  $('#busquedaUsuario').keyup(function(e){
    let search = $('#busquedaUsuario').val();
    //console.log(search);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

          var res = JSON.parse(this.responseText);
          //console.log(res);
          if(search==""){
            cargaUsuarios();
          }else{
            let template = `<table>
            <thead>
              <tr>
                  <th>Matricula</th>
                  <th>Nombre</th>
                  <th>Paterno</th>
                  <th>Materno</th>
                  <th></th>
              </tr>
            </thead>
            <tbody>`;
            for(let i=0;i<Object.keys(res).length;i++){
              template += `
              <tr>
                <td>${res[i].claveuser}</td>
                <td>${res[i].nombre}</td>
                <td>${res[i].paterno}</td>
                <td>${res[i].materno}</td>`;
                if(res[i].estado == 'Activo'){
                  template += `<td><button id="${res[i].claveuser}" class="modal-close waves-light light-red darken-4 btn" onclick="seleccionarUsuario(this)">Seleccionar</button></td>`;    
                }
            }
            template += `</tr>`;
            template += `
            </tbody>
            </table>
            `;
            $('#ActualizaTablaUsuarios').html(template);
          }
          

        }
    };
    xmlhttp.open("GET", "BuscaNombre.php?busca="+search, true);
    xmlhttp.send(); 
  });
});

// -----------------------------------------------------------------------------------------------------------
function validarsesion(){
  // localStorage.setItem("Logueado","1"); //1 = true // 0 = false
  // localStorage.setItem("Usuario","201624306");
  if(localStorage.getItem("Logueado")){
      var logueado = parseInt(localStorage.getItem("Logueado"),10);
      if(logueado){
          // console.log("Carga de datos");
          getMarcas();
          getUsuario(localStorage.getItem("Usuario"));
      }else{
          location.href ="./index.html";
      }
  } else{
      location.href ="./index.html";
  }
}

//Recibe los datos del trabajador en formato JSON
function getUsuario(usuario){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var user = JSON.parse(this.responseText);
          // console.log(user);
          loadUsuario(user);
      }
  };
  xmlhttp.open("GET", "worker.php?Trabajadores=1", true);
  xmlhttp.send();
}

function loadUsuario(user){
  var objeto = document.getElementById("nombreUser");
  objeto.innerHTML= user.nombre+" "+user.paterno+" "+user.materno;
  objeto.setAttribute("class","subheader");
  objeto = document.getElementById("idUser");
  objeto.innerHTML=user.id;
  objeto = document.getElementById("fotoUser");
  objeto.setAttribute("src","data:image/jpg;base64,"+user.foto);
  objeto = document.getElementById("nombreAcceso");
  objeto.innerHTML=user.acceso;
}

function cerrarSesion(){
  localStorage.clear();
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          // var respuesta = this.responseText;
          // console.log(respuesta);
          location.href ="./index.html";
      }
  };
  xmlhttp.open("GET", "logout.php", true);
  xmlhttp.send();
}

// -----------------------------------------------------------------------------------------------------------

function cargaAlumnos(){
  var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var res = JSON.parse(this.responseText);
          //console.log(res);

          let template = `<table>
            <thead>
              <tr>
                <th>Matricula</th>
                <th>Nombre</th>
                <th>Paterno</th>
                <th>Materno</th>
                <th>Cambiar estado</th>
              </tr>
            </thead>
            <tbody>`;
            for(let i=0;i<Object.keys(res).length;i++){
              template += `
              <tr>
                <td>${res[i].claveuser}</td>
                <td>${res[i].nombre}</td>
                <td>${res[i].paterno}</td>
                <td>${res[i].materno}</td>`;
                if(res[i].estado == 'Activo'){
                  template += `<td><button id="${res[i].claveuser}" class="modal-close waves-light light-red darken-4 btn" onclick="CambiarEstado(this)">${res[i].estado}</button></td>`;    
                }else{
                  template += `<td><button id="${res[i].claveuser}" class="modal-close waves-light light-blue darken-4 btn" onclick="CambiarEstado(this)">${res[i].estado}</button></td>`;
                } 
            }
            template += `</tr>`;
            template += `
            </tbody>
            </table>
            `;
          $('#ActualizaTabla').html(template);
        }
      }
      xmlhttp.open("GET", "CargaAlumnos.php", true);
      xmlhttp.send(); 
}

function CambiarEstado(info){
  // console.log(info.id);
  var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        if(this.responseText == 1){
          document.getElementById("TextoEstado").innerHTML = "Se ha cambiado el estado del alumno";
          document.getElementById("cuerpoModal").innerHTML = "El alumno con la matricula "+info.id+ " fue inabilitado en el sistema";
        }else{
          document.getElementById("TextoEstado").innerHTML = "Se ha cambiado el estado del alumno";
          document.getElementById("cuerpoModal").innerHTML = "El alumno con la matricula "+info.id+ " fue habilitado en el sistema";
        }
        

        $("#bottonOculto").click();
        cargaAlumnos();
      }
    }
    xmlhttp.open("GET", "HabilitarCuenta.php?matricula="+info.id, true);
    xmlhttp.send(); 
}

function BorraTexto(){
  //console.log("evento");
  document.getElementById('search').value = "";
  var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var res = JSON.parse(this.responseText);
          //console.log(res);

          let template = `<table>
            <thead>
              <tr>
                <th>Matricula</th>
                <th>Nombre</th>
                <th>Paterno</th>
                <th>Materno</th>
                <th>Cambiar estado</th>
              </tr>
            </thead>
    
            <tbody>`;
            for(let i=0;i<Object.keys(res).length;i++){
              template += `
              <tr>
                <td>${res[i].claveuser}</td>
                <td>${res[i].nombre}</td>
                <td>${res[i].paterno}</td>
                <td>${res[i].materno}</td>`;
                if(res[i].estado == 'Activo'){
                  template += `<td><button id="${res[i].claveuser}" class="modal-close waves-light light-red darken-4 btn" onclick="CambiarEstado(this)">${res[i].estado}</button></td>`;    
                }else{
                  template += `<td><button id="${res[i].claveuser}" class="modal-close waves-light light-blue darken-4 btn" onclick="CambiarEstado(this)">${res[i].estado}</button></td>`;
                }
            }
            template += `</tr>`;
            template += `
            </tbody>
            </table>`;
          $('#ActualizaTabla').html(template);
        }
      }
      xmlhttp.open("GET", "CargaAlumnos.php", true);
      xmlhttp.send(); 
}

// Se valida que todos los campos de la alta de visitantes
function validaCamposVisitante(){
  var nombre =  document.getElementById("nombreVisitante");
  var paterno =  document.getElementById("apellidoPatVisitante");
  var materno =  document.getElementById("apellidoMatVisitante");
  // var contra =  document.getElementById("contraseniaVisitante");
  var marca = document.getElementById("selectMarcaBiciVisitante");
  var color = document.getElementById("selectColorBiciVisitante");
  var tipo = document.getElementById("selectTipoBiciVisitante");
  var boton = document.getElementById("btnConfirmaAltaVisitante");
    
  if(marca.value!="" && color.value!="" && tipo.value!="" && nombre.value!="" && paterno.value!="" && materno.value!="")
    boton.removeAttribute("disabled");
  else
    boton.setAttribute("disabled","true");
}

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modalVisitantes');
  var instances = M.Modal.init(elems);
});

// -----------------------------------------------------------------------------------------------------------

//Solicita un JSON con las bicicletas
function getMarcas(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var marcas = JSON.parse(this.responseText);
          // console.log(marcas);
          loadMarcas(marcas);
      }
  };
  xmlhttp.open("GET", "JSON_Marcas.php", true);
  xmlhttp.send();
}

//Recibe el JSON de la base y carga las marcas disponibles para que se muestren en los modals de alta y edicion
function loadMarcas(marcas){
  var elementos=marcas;
  var contenedor = document.getElementById("selectMarcaBiciVisitante");
  //console.log(elementos);
  for(var i=0; i<elementos.length;i++){
      var opcion = document.createElement("option");
      opcion.setAttribute("value",elementos[i].id);
      opcion.innerHTML=elementos[i].nombre;
      // console.log(opcion);
      contenedor.appendChild(opcion);
  }
}



function altaVisitante(){
  var nombre = document.getElementById("nombreVisitante").value;
  var apellidoP = document.getElementById("apellidoPatVisitante").value;
  var apellidoM = document.getElementById("apellidoMatVisitante").value;
  // var contrasenia = document.getElementById("contraseniaVisitante").value;

  var marca = document.getElementById("selectMarcaBiciVisitante").value;
  var color = document.getElementById("selectColorBiciVisitante").value;
  var tipo = document.getElementById("selectTipoBiciVisitante").value;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {

      console.log(this.responseText);
      var mensaje=document.getElementById("mensajeAltaVisitante");
      mensaje.innerHTML="Alta Confirmada, la clave del usuario es <b>"+this.responseText+"</b> <br> Recuerda indicarle"+
      " al usuario que su contraseña es la misma clave.";
      var boton=document.getElementById("cancelarRegistro");
      boton.click();
      var boton2=document.getElementById("exitoAltaVisitante");
      boton2.click();
      

  };
  xmlhttp.open("GET","altaVisitor.php?nombreVisitante="+nombre+"&apellidoPatVisitante="+apellidoP+"&apellidoMatVisitante="+apellidoM+"&selectMarcaBiciVisitante="+marca+"&selectColorBiciVisitante="+color+"&selectTipoBiciVisitante="+tipo, true);
  xmlhttp.send();
}

function limpiarCampos(){

  var campos = document.getElementById("nombreVisitante");
  campos.value = "";
  campos = document.getElementById("apellidoPatVisitante");
  campos.value = "";
  campos = document.getElementById("apellidoMatVisitante");
  campos.value = "";
  // campos = document.getElementById("contraseniaVisitante");
  // campos.value = "";
  var boton = document.getElementById("btnConfirmaAltaVisitante");
  boton.setAttribute("disabled", "");

}

// -----------------------------------------------------------------------------------------------------------



function cargaUsuarios(){
  var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var res = JSON.parse(this.responseText);
          //console.log(res);

          let template = `<table>
            <thead>
              <tr>
                <th>Matricula</th>
                <th>Nombre</th>
                <th>Paterno</th>
                <th>Materno</th>
                <th>Cambiar estado</th>
              </tr>
            </thead>
            <tbody>`;
            for(let i=0;i<Object.keys(res).length;i++){
              template += `
              <tr>
                <td>${res[i].claveuser}</td>
                <td>${res[i].nombre}</td>
                <td>${res[i].paterno}</td>
                <td>${res[i].materno}</td>`;
                if(res[i].estado == 'Activo'){
                  template += `<td><button id="${res[i].claveuser}" class="modal-close waves-light light-red darken-4 btn" onclick="CambiarEstado(this)">${res[i].estado}</button></td>`;    
                }else{
                  template += `<td><button id="${res[i].claveuser}" class="modal-close waves-light light-blue darken-4 btn" onclick="CambiarEstado(this)">${res[i].estado}</button></td>`;
                } 
            }
            template += `</tr>`;
            template += `
            </tbody>
            </table>
            `;
          $('#ActualizaTablaUsuarios').html(template);
        }
      }
      xmlhttp.open("GET", "CargaAlumnos.php", true);
      xmlhttp.send(); 
}

function seleccionarUsuario(info){
  // console.log(info.id);
  localStorage.removeItem("usuarioSeleccionado");
  localStorage.setItem("usuarioSeleccionado",info.id);
  // console.log(localStorage.getItem("usuarioSeleccionado"));
  location.href="./gestionAccesos.html";
}

function BorraTextoUsuario(){
  //console.log("evento");
  document.getElementById('busquedaUsuario').value = "";
  var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var res = JSON.parse(this.responseText);
          //console.log(res);

          let template = `<table>
            <thead>
              <tr>
                <th>Matricula</th>
                <th>Nombre</th>
                <th>Paterno</th>
                <th>Materno</th>
                <th></th>
              </tr>
            </thead>
    
            <tbody>`;
            for(let i=0;i<Object.keys(res).length;i++){
              template += `
              <tr>
                <td>${res[i].claveuser}</td>
                <td>${res[i].nombre}</td>
                <td>${res[i].paterno}</td>
                <td>${res[i].materno}</td>`;
                if(res[i].estado == 'Activo'){
                  template += `<td><button id="${res[i].claveuser}" class="modal-close waves-light light-red darken-4 btn" onclick="BorraTextoUsuario(this)">Seleccionar</button></td>`;    
            }
            template += `</tr>`;
            template += `
            </tbody>
            </table>`;
          $('#ActualizaTablaUsuarios').html(template);
        }
      }
      xmlhttp.open("GET", "CargaAlumnos.php", true);
      xmlhttp.send(); 
    }
}