
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
            template = `<table>
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
            for(i=0;i<Object.keys(res).length;i++){
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
});

//Abrir el modal usando JQuery
$(document).ready(function(){
  $('.modal').modal();
});

//Para el select con materialize
$(document).ready(function(){
  $('select').formSelect();
});

function cargaAlumnos(){
  var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var res = JSON.parse(this.responseText);
          //console.log(res);

          template = `<table>
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
            for(i=0;i<Object.keys(res).length;i++){
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
  console.log(info.id);
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

          template = `<table>
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
            for(i=0;i<Object.keys(res).length;i++){
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
    //var nombre =  document.getElementById("nombreVisitante");
    var marca = document.getElementById("selectMarcaBiciVisitante");
    var color = document.getElementById("selectColorBiciVisitante");
    var tipo = document.getElementById("selectTipoBiciVisitante");
    var boton = document.getElementById("btnConfirmaAltaVisitante");
    
    if(marca.value!="" && color.value!="" && tipo.value!="")
      boton.removeAttribute("disabled");
  }

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modalVisitantes');
  var instances = M.Modal.init(elems);
});

function validarsesion(){
  localStorage.setItem("Logueado","1"); //1 = true // 0 = false
  localStorage.setItem("Usuario","201624306");
  if(localStorage.getItem("Logueado")){
      var logueado = parseInt(localStorage.getItem("Logueado"),10);
      if(logueado){
          console.log("Carga de datos");
          getMarcas();
          getUsuario(localStorage.getItem("Usuario"));
      }else{
          location.href ="/openbike/login.html";
      }
  } else{
      location.href ="/openbike/login.html";
  }
}

//Solicita un JSON con las bicicletas
function getMarcas(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var marcas = JSON.parse(this.responseText);
          //console.log(marcas);
          loadMarcas(marcas);
      }
  };
  xmlhttp.open("GET", "JSON_Marcas.php", true);
  xmlhttp.send();
}

//Recibe el JSON de la base y carga las marcas disponibles para que se muestren en los modals de alta y edicion
function loadMarcas(marcas){
  var elementos = new Array();
  elementos=marcas;
  var contenedor = document.getElementById("selectMarcaBiciVisitante");
  //console.log(elementos);
  for(var i=0; i<elementos.length;i++){
      var opcion = document.createElement("option");
      opcion.setAttribute("value",elementos[i].id);
      opcion.innerHTML=elementos[i].nombre;
      //console.log(elementos);
      contenedor.appendChild(opcion);

  }
}

//Recibe el JSON de las bicicletas
function getBicicletas(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var bicicletas = JSON.parse(this.responseText);
          //console.log(bicicletas);
          loadBicicletas(bicicletas);
      }
  };
  xmlhttp.open("GET", "JSON_Bicicletas.php", true);
  xmlhttp.send();
}

//Recibe el JSON de la base y carga las bicicletas disponibles en el DOM
function loadBicicletas(bicicletas){
  var elementos = new Array();
  elementos=bicicletas;
  var contenedor = document.getElementById("contenedor");
  //console.log(elementos);
  for(var i=0; i<elementos.length;i++){
      var tarjeta = document.createElement("div");
      tarjeta.setAttribute("id", "tarjeta"+elementos[i].id);
      tarjeta.setAttribute("class","card col s12 m6 l4");
      
      var divImagen = document.createElement("div");
      divImagen.setAttribute("class","card-image waves-effect waves-block waves-light");

      //CREACION DE ELEMENTO POR DOM
      var imagen = document.createElement("img");
      imagen.setAttribute("class","activator");
      imagen.setAttribute("src","data:image/jpg;base64,"+elementos[i].foto);
      imagen.setAttribute("style","max-height: 200px; min-height: 200px");
      //imagen.setAttribute("style","min-height: 300px");
      divImagen.appendChild(imagen);
      tarjeta.appendChild(divImagen);

      // Nombre de la bicicleta, boton ver mas
      var divContent = document.createElement("div");
      divContent.setAttribute("class","card-content");
      var span = document.createElement("span");
      span.setAttribute("class","card-title activator grey-text text-darken-4");
      span.setAttribute("style","white-space: nowrap; overflow:hidden; text-overflow: ellipsis;");
      span.innerText="Bicicleta "+elementos[i].marca;
      var icon = document.createElement("i");
      icon.setAttribute("class","material-icons right");
      icon.innerText="more_vert";
      span.appendChild(icon);
      divContent.appendChild(span);
      tarjeta.appendChild(divContent);

      // Al presionar el boton ver mas se abre esta informacion detallada
      var divReveal = document.createElement("div");
      divReveal.setAttribute("class","card-reveal");
      var span = document.createElement("span");
      span.setAttribute("class","card-title grey-text text-darken-4");
      span.innerText="Bicicleta "+elementos[i].marca;
      var icon = document.createElement("i");
      icon.setAttribute("class","material-icons right");
      icon.innerText="close";
      span.appendChild(icon);
      divReveal.appendChild(span);
      var contenido = document.createElement("p");
      contenido.innerHTML="<b>Clave del usuario: </b>"+elementos[i].claveuser+"<br>"+
      "<b>Clave bicicleta: </b>"+elementos[i].id+"<br>"+
      "<b>Marca: </b>"+elementos[i].marca+"<br>"+
      "<b>Color: </b>"+elementos[i].color+"<br>"+
      "<b>Tipo: </b>"+elementos[i].tipo+"<br>"+
      "<b>Estado: </b>"+elementos[i].estado+"<br>";
      divReveal.appendChild(contenido);
      tarjeta.appendChild(divReveal);

      // Action (card)
      var divAction = document.createElement("div");
      divAction.setAttribute("class","card-action");
      divAction.setAttribute("id","divAction");

      //Boton edicion
      var boton = document.createElement("button");
      boton.setAttribute("class","btn-floating btn waves-effect waves-light light-blue darken-4 left modal-trigger");
      boton.setAttribute("data-target","modalEdicion");
      boton.setAttribute("onclick","seleccionarBicicleta2('"+elementos[i].id+"','"+elementos[i].marca+"','"+ elementos[i].foto+"')");
      // boton.setAttribute( "data-dismiss", "modal" );
      // boton.setAttribute( "data-backdrop", "false");
      //Solo para uso de prueba, su funcionamiento debe abrir un modal con los datos
      //para la edicion de la bicicleta
      var icon = document.createElement("i");
      icon.setAttribute("class","material-icons right");
      icon.innerText="edit";
      boton.appendChild(icon);
      
      divAction.appendChild(boton);
      
      //Boton baja
      boton = document.createElement("button");
      boton.setAttribute("class","btn-floating btn waves-effect waves-light red darken-1 right modal-trigger");
      // boton.setAttribute("class","btn-floating btn waves-effect waves-light red darken-1 right modal-trigger");
      boton.setAttribute("data-target", "modalBaja");
      boton.setAttribute("onclick","seleccionarBicicleta1("+elementos[i].id+",'"+elementos[i].marca+"')");
      // boton.setAttribute( "data-dismiss", "modal" );
      // boton.setAttribute( "data-backdrop", "false");
      //Solo para uso de prueba, su funcionamiento debe abrir un modal preguntando
      //si en verdad quiere eliminar la bicicleta
      icon = document.createElement("i");
      icon.setAttribute("class","material-icons right");
      icon.innerText="delete";
      boton.appendChild(icon);
      
      divAction.appendChild(boton);
      
      var separador = document.createElement("br");
      divAction.appendChild(separador);
      tarjeta.appendChild(divAction);

      var separador = document.createElement("p");
      tarjeta.appendChild(separador);

      contenedor.appendChild(tarjeta);
  }
}

//Recibe los datos del alumno en formato JSON
function getUsuario(usuario){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var user = JSON.parse(this.responseText);
          //console.log(user);
          loadUsuario(user);
      }
  };
  xmlhttp.open("GET", "JSON_Usuario.php", true);
  xmlhttp.send();
}

function loadUsuario(user){
  // var objeto = document.getElementById("nombreUser");
  // if(user.tipo=="Alumno"){
  //   objeto.innerHTML= user.nombre+" "+user.paterno+" "+user.materno;
  //   objeto.setAttribute("class","subheader");
  // } else{
  //   objeto.innerHTML= "<i class='material-icons right'>edit</i>"+user.nombre+" "+user.paterno+" "+user.materno;
  //   objeto.setAttribute("class","waves-effect modal-trigger");
  // }
  // objeto = document.getElementById("idUser");
  // objeto.innerHTML=user.id;
  // objeto = document.getElementById("tipoUser");
  // objeto.innerText= user.tipo;
  // objeto = document.getElementById("fotoUser");
  // objeto.setAttribute("src","data:image/jpg;base64,"+user.foto);
  // objeto = document.getElementById("ImagenCambio");
  // objeto.setAttribute("src","data:image/jpg;base64,"+user.foto);
}

//Muestra imagen cargada en la alta
$(document).ready(function(){
  $(function() {
   $('#file-input').change(function(e) {
      addImage(e); 
    });
 
    function addImage(e){
      //console.log(e);
      if(e.target.files && e.target.files[0]){
        var file = e.target.files[0];
        imageType = /image.*/;
      
        if (!file.type.match(imageType))
        return;
    
        var reader = new FileReader();
        reader.onload = fileOnload;
        reader.readAsDataURL(file);
      }
    }
   
    function fileOnload(e) {
      var result=e.target.result;
      $('#imgSalida').attr("src",result);
    }
  });
});




//Funciones de edicion de perfil 
//p/e Editar foto, contrasena

$(document).ready(function() {
  // Escuchamos el evento 'change' del input donde cargamos el archivo
    $(document).on('change', 'input[type=file]', function(e) {
      //console.log(e.target);
        if(e.target.form != null && e.target.form.id == 'aux'){
                // Obtenemos la ruta temporal mediante el evento
            var TmpPath = URL.createObjectURL(e.target.files[0]);
            //console.log(TmpPath);
            var imagen = document.createElement("img");
            imagen.setAttribute("src",TmpPath);
            imagen.setAttribute("style","max-height: 600px; min-height: 600px");
    
            document.getElementById('ImagenCambio').src = TmpPath;
        }
    });
});

function validaCamposFoto(){
    var foto = document.getElementById("archivo"); 
    //console.log(foto);
    var button = document.getElementById("botonenviar");
    if(foto.value){
        button.removeAttribute("disabled");
    }
}

function activaCambioContra(){
  var oldpassword = document.getElementById("oldpassword");
  var newpassword = document.getElementById("newpassword");
  var newpassword2 = document.getElementById("newpassword2");
  var boton = document.getElementById("botonContra");
  var label = document.getElementById("newContraMal");
  label.style.display = "none";
  var label = document.getElementById("oldContraMal");
  label.style.display = "none";
  if(oldpassword.value != "" && newpassword.value!="" && newpassword2.value!="")
    boton.removeAttribute("disabled");
  else 
    boton.setAttribute("disabled","true");
}

function actualizaContra(oldpass, newpass, newpass2){
  //console.log(oldpass, newpass, newpass2);
  if(newpass != newpass2){
    var label = document.getElementById("newContraMal");
    label.style.display = "block";
  }else{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // var respuesta = this.responseText;
            // console.log(respuesta);
            var respuesta = parseInt(this.responseText,10);
            if(respuesta){
              var mensaje=document.getElementById("mensaje");
              mensaje.innerText="Contraseña actualizada correctamente.";
              var boton=document.getElementById("botonClose");
              boton.click();
              var boton=document.getElementById("botonExito");
              boton.click();
            }
            else{
              var div = document.getElementById("oldContraMal");
              div.style.display = "block";
            }
        }
    };
    xmlhttp.open("GET", "validaContra.php?oldPass="+oldpass+"&newPass="+newpass, true);
    xmlhttp.send();
  }
}

//BAJA DE BICICLETA
//Seleccion bicicleta para baja
function seleccionarBicicleta1(id, marca){
  //console.log(id,marca);
  localStorage.setItem("idBicicleta",id);
  localStorage.setItem("marcaBicicleta",marca);
  var objeto=document.getElementById("messageBaja");
  objeto.innerText="¿Estas seguro de querer eliminar la bicicleta "+marca+"?";
}

function eliminarBicicleta(){
  var idbicicleta = parseInt(localStorage.getItem("idBicicleta"),10);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        // var respuesta = this.responseText;
        // console.log(respuesta);
        var respuesta = parseInt(this.responseText,10);
        if(respuesta){
          var mensaje=document.getElementById("mensaje");
          mensaje.innerText="Baja de la bicicleta "+localStorage.getItem("marcaBicicleta")+" realizada correctamente.";
          var contenedor=document.getElementById("contenedor");
          var hijo=document.getElementById("tarjeta"+idbicicleta);
          contenedor.removeChild(hijo);
          var boton=document.getElementById("botonExito");
          boton.click();
        }
        else{
          console.log("Hubo un error en la eliminacion de la bicicleta "+idbicicleta);
        }
    }
};
xmlhttp.open("GET", "bajabike.php?idBicicleta="+idbicicleta, true);
xmlhttp.send();
}

//FUNCION EDICION BICICLETA
//Se selecciona la bicicleta para la edicion
function seleccionarBicicleta2(id, marca, foto){
  //console.log(id, marca, foto);
  localStorage.setItem("idBicicleta",id);
  localStorage.setItem("marcaBicicleta",marca);

  //Se llenan los campos del modal de edicion
  var foto_=document.getElementById("imgSalidaEdicion");
  foto_.setAttribute("src","data:image/jpg;base64,"+foto);
  var idBicicleta = document.getElementById("idBicicleta");
  idBicicleta.setAttribute("value",id);
}

//Se valida que todos los campos de MODIFICACION DE DATOS
function validaCamposM(){
  var marca = document.getElementById("selectMarcaEdicion");
  var color = document.getElementById("selectColorEdicion");
  var tipo = document.getElementById("selectTipoEdicion");
  var boton = document.getElementById("btnConfirmaEdicion");
  if(marca.value!="" && color.value!="" && tipo.value!="")
    boton.removeAttribute("disabled");
}


function altaVisitante(){
  // var idbicicleta = parseInt(localStorage.getItem("idBicicleta"),10);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        // var respuesta = this.responseText;
        // console.log(respuesta);
        var respuesta = parseInt(this.responseText,10);
        if(respuesta){
          var mensaje=document.getElementById("mensajeAltaVisitante");
          mensaje.innerText="Alta Confirmada";
          // mensaje.innerText="Baja de la bicicleta "+localStorage.getItem("marcaBicicleta")+" realizada correctamente.";
          // var contenedor=document.getElementById("contenedor");
          // var hijo=document.getElementById("tarjeta"+idbicicleta);
          // contenedor.removeChild(hijo);
          var boton=document.getElementById("exitoAltaVisitante");
          boton.click();
        }
        else{
          console.log("Hubo un error en la eliminacion de la bicicleta "+idbicicleta);
        }
    }
};
    
xmlhttp.open("POST", "altaVisitor.php?success", true);
xmlhttp.send();
}