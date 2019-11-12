$(document).ready(function(){
    $('.sidenav').sidenav();
    $('.modal').modal();
    $('select').formSelect();
    $('.datepicker').datepicker();
    $('.timepicker').timepicker();
  });
  
  // -----------------------------------------------------------------------------------------------------------
  function validarsesion(){
    // localStorage.setItem("Logueado","1"); //1 = true // 0 = false
    // localStorage.setItem("Usuario","201624306");
    if(localStorage.getItem("Logueado")){
        var logueado = parseInt(localStorage.getItem("Logueado"),10);
        if(logueado){
            // console.log("Carga de datos");
            getTrabajador(localStorage.getItem("Usuario"));
            getUsuario(localStorage.getItem("usuarioSeleccionado"));
            getStatus(localStorage.getItem("usuarioSeleccionado"));
            // getBicicletas(localStorage.getItem("usuarioSeleccionado"));
        }else{
            location.href ="./index.html";
        }
    } else{
        location.href ="./index.html";
    }
  }
  
  //Recibe los datos del trabajador en formato JSON
  function getTrabajador(usuario){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var user = JSON.parse(this.responseText);
            // console.log(user);
            loadTrabajador(user);
        }
    };
    xmlhttp.open("GET", "worker.php?Trabajadores=1", true);
    xmlhttp.send();
  }
  
  function loadTrabajador(user){
    var objeto = document.getElementById("nombreUser");
    objeto.innerHTML= user.nombre+" "+user.paterno+" "+user.materno;
    objeto.setAttribute("class","subheader");
    objeto = document.getElementById("idUser");
    objeto.innerHTML=user.id;
    objeto = document.getElementById("fotoUser");
    objeto.setAttribute("src","data:image/jpg;base64,"+user.foto);
    objeto = document.getElementById("nombreAcceso");
    objeto.innerHTML=user.acceso;

    document.getElementById("accesoentra").innerHTML=user.acceso;
    document.getElementById("autorizaentrada").innerHTML=user.nombre+" "+user.paterno+" "+user.materno;

    document.getElementById("accesosale").innerHTML=user.acceso;
    document.getElementById("autorizasalida").innerHTML=user.nombre+" "+user.paterno+" "+user.materno;
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

  function getUsuario(usuario){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var user = JSON.parse(this.responseText);
            // console.log(user);
            // loadUsuario(user);
            var objeto = document.getElementById("fotoAlumno");
            objeto.setAttribute("src","data:image/jpg;base64,"+user.foto);
            objeto = document.getElementById("nombreAlumno");
            objeto.innerHTML="<b>"+user.nombre+" "+user.paterno+" "+user.materno+"</b>";
            objeto = document.getElementById("contenido");
            objeto.innerHTML="<b>Clave de usuario: </b>"+user.id+"<br>"+
            "<b>Tipo: </b>"+user.tipo+"<br>"+
            "<b>Estado: </b>"+user.estado;
        }
    };
    xmlhttp.open("GET", "worker.php?Usuario="+usuario, true);
    xmlhttp.send();
  }

  function getStatus(usuario){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          // console.log(this.responseText);
          localStorage.removeItem("nuevo");
          if(this.responseText=="null"){
            document.getElementById("contenedor").removeChild(document.getElementById("hijo"));
            getBicicletas(localStorage.getItem("usuarioSeleccionado"));
            localStorage.setItem("nuevo","true");
          }else{
            localStorage.setItem("nuevo","false");
            getHistorial(localStorage.getItem("usuarioSeleccionado"));
            // var elementos = JSON.parse(this.responseText);
            // console.log(elementos);
          }
        }
    };
    xmlhttp.open("GET", "worker.php?Estatus="+usuario, true);
    xmlhttp.send();
  }

  function getBicicletas(usuario){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var elementos = JSON.parse(this.responseText);
            // console.log(elementos);
            // loadUsuario(user);
            loadBicicletas(elementos);
        }
    };
    xmlhttp.open("GET", "worker.php?Bicicletas="+usuario, true);
    xmlhttp.send();
  }

  function loadBicicletas(elementos){
    var contenedor = document.getElementById("contenedor");
    for(var i=0; i<elementos.length;i++){
      var tarjeta = document.createElement("div");
      tarjeta.setAttribute("id", "tarjeta"+elementos[i].id);
      tarjeta.setAttribute("class","card col s12 m4");
      
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

      span = document.createElement("span");
      span.setAttribute("class","card-title grey-text text-darken-4");
      span.innerText="Bicicleta "+elementos[i].marca;

      icon = document.createElement("i");
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

      //Boton acceso
      if(localStorage.getItem("nuevo")=="true"){
        var boton = document.createElement("button");
        boton.setAttribute("class"," btn waves-effect waves-light light-blue darken-4 right modal-trigger");
        boton.setAttribute("data-target","modalAcceso");
        boton.setAttribute("onclick","seleccionarBicicleta('"+elementos[i].id+"')");
        boton.innerHTML="Acceso";
        icon = document.createElement("i");
        icon.setAttribute("class","material-icons right");
        icon.innerText="exit_to_app";
        boton.appendChild(icon);
        
        divAction.appendChild(boton);
      }

      //Boton salida
      if(localStorage.getItem("nuevo")=="false"){
        boton = document.createElement("button");
        boton.setAttribute("class"," btn waves-effect waves-light red darken-1 right modal-trigger");
        boton.setAttribute("data-target", "modalBaja");
        boton.setAttribute("onclick","seleccionarBicicleta1("+elementos[i].id+",'"+elementos[i].marca+"')");
        icon = document.createElement("i");
        icon.setAttribute("class","material-icons right");
        icon.innerText="delete";
        boton.appendChild(icon);
        
        divAction.appendChild(boton);
      }
      
      var separador = document.createElement("br");
      divAction.appendChild(separador);
      tarjeta.appendChild(divAction);

      separador = document.createElement("p");
      tarjeta.appendChild(separador);

      contenedor.appendChild(tarjeta);
    }
  }

  function seleccionarBicicleta(id){
    // console.log(id);
    // localStorage.setItem("idBicicleta",id);
    // document.getElementById('fecha').value="";
    // document.getElementById('hora').value="";
    // document.getElementById('fecha1').value="";
    // document.getElementById('hora1').value="";
    // validaAcceso();
    // document.getElementById('btnexitoingreso').click();
    var fechaactual = new Date();
    var fecha=('0'+fechaactual.getDate()).slice(-2)+"/"+('0'+(fechaactual.getMonth()+1)).slice(-2)+"/"+('0'+fechaactual.getFullYear()).slice(-2);
    var hora=('0'+fechaactual.getHours()).slice(-2)+":"+('0'+fechaactual.getMinutes()).slice(-2)+":"+('0'+fechaactual.getSeconds()).slice(-2);
    // console.log(fecha,hora);
    localStorage.setItem("idBicicleta",id);
    localStorage.setItem("fechaEntrada",fecha);
    localStorage.setItem("horaEntrada",hora);
    document.getElementById('fechaActual').innerHTML=fecha;
    document.getElementById('horaActual').innerHTML=hora+" hrs.";
  }

  function seleccionarBicicletaSalida(id){
    var fechaactual = new Date();
    var fecha=('0'+fechaactual.getDate()).slice(-2)+"/"+('0'+(fechaactual.getMonth()+1)).slice(-2)+"/"+('0'+fechaactual.getFullYear()).slice(-2);
    var hora=('0'+fechaactual.getHours()).slice(-2)+":"+('0'+fechaactual.getMinutes()).slice(-2)+":"+('0'+fechaactual.getSeconds()).slice(-2);
    localStorage.setItem("idBicicleta",id);
    localStorage.setItem("fechaSalida",fecha);
    localStorage.setItem("horaSalida",hora);
    document.getElementById('fechaSalida').innerHTML=fecha;
    document.getElementById('horaSalida').innerHTML=hora+" hrs.";
  }

  // function validaAcceso(){
  //   let fecha = document.getElementById('fecha');
  //   fecha.value=document.getElementById('fecha1').value;
  //   let hora = document.getElementById('hora');
  //   hora.value=document.getElementById('hora1').value;
  //   if(fecha.value != "" && hora.value != ""){
  //     document.getElementById('btnConfirmaAcceso').removeAttribute("disabled");
  //   }else{
  //     document.getElementById('btnConfirmaAcceso').setAttribute("disabled","true");
  //   }

  //   var fechaactual = new Date();
  //   console.log("Día: "+fechaactual.getDate()+"\nMes: "+(fechaactual.getMonth()+1)+"\nAño: "+fechaactual.getFullYear());
  //   console.log("Hora: "+fechaactual.getHours()+"\nMinuto: "+fechaactual.getMinutes()+"\nSegundo: "+fechaactual.getSeconds()+"\nMilisegundo: "+fechaactual.getMilliseconds());
  // }

  // function igualaValores(){
  //   let fecha = document.getElementById('fecha1');
  //   fecha.value=document.getElementById('fecha').value;
  //   let hora = document.getElementById('hora1');
  //   hora.value=document.getElementById('hora').value;
  //   validaAcceso();
  // }

  function registraAcceso(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // var elementos = JSON.parse(this.responseText);
            var elementos = this.responseText;
            console.log(elementos);
            // loadUsuario(user);
            // loadBicicletas(elementos);
            document.getElementById('btnexitoingreso').click();
        }
    };
    xmlhttp.open("GET", "worker.php?Acceso="+localStorage.getItem("Acceso")+"&Fecha="+localStorage.getItem("fechaEntrada")+"&Hora="+localStorage.getItem("horaEntrada")+"&idBici="+localStorage.getItem("idBicicleta"), true);
    xmlhttp.send();
  }

  function registraSalida(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          // var elementos = JSON.parse(this.responseText);
          var elementos = this.responseText;
          console.log(elementos);
          // loadUsuario(user);
          // loadBicicletas(elementos);
          document.getElementById('btnexitosalida').click();
        }
    };
    xmlhttp.open("GET", "worker.php?Salida="+localStorage.getItem("Acceso")+"&Hora="+localStorage.getItem("horaSalida")+"&idBici="+localStorage.getItem("idBicicleta"), true);
    xmlhttp.send();
  }

  function getHistorial(usuario){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // var elementos = this.responseText;
            // console.log(elementos);
            // var elementos = this.responseText;
            var historial = JSON.parse(this.responseText);
            // var elementos = this.responseText;
            console.log(historial);
            document.getElementById("imgExit").removeAttribute("src");
            document.getElementById("imgExit").setAttribute("src","data:image/jpg;base64,"+historial.foto);
            document.getElementById("tituloExit").innerHTML=historial.nMarca+" <i class='material-icons right'>more_vert</i>";
            document.getElementById("tituloExit2").innerHTML=historial.nMarca+" <i class='material-icons right'>close</i>";
            document.getElementById("contenidoExit").innerHTML="<b>Clave del usuario: </b>"+historial.iduser+"<br>"+
            "<b>Clave bicicleta: </b>"+historial.idBici+"<br>"+
            "<b>Marca: </b>"+historial.nMarca+"<br>"+
            "<b>Color: </b>"+historial.color+"<br>"+
            "<b>Tipo: </b>"+historial.tipo+"<br>"+
            "<b>Estado: </b>"+historial.estado+"<br>";
            document.getElementById("dtsEntrada").innerHTML="<img width=200px; class='circle' src=data:image/jpg;base64,"+historial.fotoTrab+"></img><br>"+
            "<b>Autorizó entrada:</b> "+historial.entAutorizacion+"<br>"+
            "<b>Acceso: </b>"+historial.accesoEntrada+"<br>"+
            "<b>Fecha: </b>"+historial.fecha+"<br>"+
            "<b>Hora: </b>"+historial.horaEntrada+"<br>";
            document.getElementById("btnSalida").setAttribute("onclick","seleccionarBicicletaSalida("+historial.idBici+")");
            
        }
    };
    xmlhttp.open("GET", "worker.php?Historial="+usuario, true);
    xmlhttp.send();
  }