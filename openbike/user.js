// Navbar declarado con javascript
// document.addEventListener('DOMContentLoaded', function() {
//   var elems = document.querySelectorAll('.sidenav');
//   var instances = M.Sidenav.init(elems, closeOnClick= true, preventScrolling=true, {
//     onOpenStart: function () {
//       console.log("I trigger as soon as the page is loaded");
//     },
//     onCloseEnd: function () {
//         console.log("same");
//     }
//   })
// });


document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal1');
  var instances = M.Modal.init(elems);
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal2');
  var instances = M.Modal.init(elems);
});

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
});

//Abrir el modal usando JQuery
$(document).ready(function(){
  $('.modal').modal();
});

//Pata el select con materialize
$(document).ready(function(){
  $('select').formSelect();
});

function validarsesion(){
  // Temporal mientras no se tiene el login
  localStorage.setItem("Logueado","1"); //1 = true // 0 = false
  localStorage.setItem("Usuario","201624306");
  if(localStorage.getItem("Logueado")){
      var logueado = parseInt(localStorage.getItem("Logueado"),10);
      if(logueado){
          getMarcas();
          getBicicletas();
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

//Recibe el JSON de la base y carga los temas disponibles en el DOM
function loadMarcas(marcas){
  var elementos = new Array();
  elementos=marcas;
  var contenedor = document.getElementById("selectMarca");
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
          console.log(bicicletas);
          loadBicicletas(bicicletas);
      }
  };
  xmlhttp.open("GET", "JSON_Bicicletas.php", true);
  xmlhttp.send();
}

function editarBicicleta(id){
  
  console.log( "Funcion editarBicicleta!!!" );
  var modal_content = document.getElementById( "modalEditar" );

  // Titulo
  var modal_title = document.createElement( "h4" );
  modal_title.innerText = "Modificacion de bicicletas";
  modal_content.appendChild(modal_title);

  // Formulario
  var formulario = document.createElement ( "form" );
  formulario.setAttribute( "class", "col s12" );
  formulario.setAttribute( "action", "server.php" );
  formulario.setAttribute( "method", "POST" );
  formulario.setAttribute( "enctype", "multipart/form-data" );

    var primeraParte = document.createElement( "div" );
    primeraParte.setAttribute( "class", "row" );

      var separador = document.createElement( "div");
      separador.setAttribute( "class", "col s12 m6 l6")
        var imagen = document.createElement( "img" );
        imagen.setAttribute( "id", "imgSalida" );
        imagen.setAttribute( "width", "100%" );
        imagen.setAttribute( "height", "100%" );
        imagen.setAttribute( "src", "./resources/bikedefault.png" );
      separador.appendChild( imagen );
    primeraParte.appendChild( separador );

      var separador = document.createElement( "div" );
      separador.setAttribute( "class", "file-field input-field col s12 m6 l6" );
        var boton = document.createElement( "div" );
        boton.setAttribute( "class", "btn waves-effect waves-light light-blue darken-4" );
          var icono = document.createElement( "i" );
          icono.setAttribute( "class", "material-icons" );
          icono.innerText = "image";
          boton.innerHTML = "Seleccionar imagen ";
          boton.appendChild( icono );
          /// Parte de cargar imagen
          var cargaImagen = document.createElement( "input" );
          cargaImagen.setAttribute( "id", "file-inputM" );
          cargaImagen.setAttribute( "name", "file-inputM" );
          cargaImagen.setAttribute( "type", "file" );
          cargaImagen.setAttribute( "accept", "image/*" );
          cargaImagen.setAttribute( "onchange", "validaCamposM()" );
          
        boton.appendChild( cargaImagen );
      separador.appendChild( boton );

        var direccion = document.createElement( "div" );
        direccion.setAttribute( "class", "file-path validate" );
        direccion.setAttribute( "type", "text" );
      
      separador.appendChild ( direccion );
    primeraParte.appendChild( separador );

      var separador = document.createElement( "div" );
      separador.setAttribute( "class", "form-group col-md-4" );

        var etiqueta = document.createElement( "label" );
        etiqueta.setAttribute( "for", "selectMarcaM")
        etiqueta.innerHTML = "Marca";

        var seleccion = document.createElement( "select" );
        seleccion.setAttribute( "class", "form-control" );
        seleccion.setAttribute( "id", "selectMarcaM" );
        seleccion.setAttribute( "name", "selectMarcaM" );
        //seleccion.setAttribute( "required", "" );
        //seleccion.setAttribute( "onchange", "validaCamposM()" );
          var opcion = document.createElement( "option" );
          opcion.text = "Gabriela";
          opcion.setAttribute( "id", "marcaSeleccionada" );
          opcion.setAttribute( "selected", "" );
          opcion.setAttribute( "value", "Primera Marca" );
          opcion.setAttribute( "label", "Primera Marca" );
        seleccion.options.add(opcion, 0);
        seleccion.appendChild( opcion );
        var opcion = document.createElement( "option" );
          opcion.text = "Gabriela2";
          //opcion.setAttribute( "id", "" );
          //opcion.setAttribute( "selected", "" );
          opcion.setAttribute( "value", "Segunda Marca" );
          opcion.setAttribute( "label", "Segunda Marca" );
        seleccion.options.add(opcion, 1);
        seleccion.appendChild( opcion );
        console.log(seleccion.options);
      separador.appendChild(seleccion);
      separador.appendChild( etiqueta );
      separador.insertBefore ( seleccion, etiqueta );

        

    primeraParte.appendChild( separador );




      
  formulario.appendChild(primeraParte);


  modal_content.appendChild( formulario );

  // var frase = document.getElementById("tipoSeleccionado");
  // frase.innerText = "Hello World!";

  // document.getElementById("tipoSeleccionado3").innerHTML = "Opcion1";
  // document.getElementById("tipoSeleccionado3").innerText = "Opcion1";
  // document.getElementById("tipoSeleccionado3").setAttribute("value", "Opcion1");

  // var modifica = document.getElementById("idM");
  // modifica.setAttribute("value", id);

  console.log( "Finaliza Edicion" );
}



/// <!--- - - - - - - - - - - - - - - - - - - - - - - - - - - -   - - - - - - - - - - - - - - - - - - - - - -->
// Funcion que lanza una confirmacion y posteriormente elimina la bicicleta
function eliminarBicicleta ( id ) {

  console.log( "Funcion eliminarBicicleta" );

  /// "Content" es donde estaran todas las partes del modal (header, body y footer)
  var modal_content = document.getElementById( "modalConfirmacionEliminar" );
  modal_content.setAttribute("class", "modal-content");

    /// Dentro de "Header" estara el titulo y el //Boton de cerrar principal
    var modal_header = document.createElement( "div" );
    modal_header.setAttribute( "class", "modal-header" );

      /// Titulo del modal
      var modal_title = document.createElement( "h5" );
      modal_title.setAttribute( "class", "modal-title");
      modal_title.innerText = "Eliminar Bicicleta";
      console.log(id);

    
    /// Agregamos el titulo y el icono al "header"
    modal_header.appendChild( modal_title );
    
  /// Body
  var modal_body = document.createElement( "div" );
  modal_body.setAttribute( "class", "modal-body" );

    var modal_paragraph = document.createElement( "p" );
    modal_paragraph.innerHTML = "Estas seguro de querer eliminar esta bicicleta?";

  modal_body.appendChild( modal_paragraph );
  modal_content.appendChild ( modal_body );
  
  // Footer
  var modal_footer = document.createElement( "div" );
  modal_footer.setAttribute( "class", "modal-footer" );

  //class="col s12" action="altabike.php" method="POST" enctype="multipart/form-data"
  var formulario = document.createElement ( "form" );
  formulario.setAttribute( "class", "col s12" );
  formulario.setAttribute( "action", "server.php" );
  formulario.setAttribute( "method", "POST" );
  formulario.setAttribute( "enctype", "multipart/form-data" );

    var identificador = document.createElement ("input");
    identificador.setAttribute( "type", "hidden");
    identificador.setAttribute( "name", "id");
    identificador.setAttribute( "value", id);

    var botonConfirmar = document.createElement ( "button" );
    botonConfirmar.setAttribute( "class", "btn modal-close waves-effect waves-light light-blue darken-4" );
    botonConfirmar.setAttribute( "type", "submit" );
    botonConfirmar.setAttribute( "style","margin: 10px" );
    botonConfirmar.setAttribute( "name", "bajaBike" );
    botonConfirmar.innerText = "Confirmar";

    var botonCancelar = document.createElement( "button" );
    botonCancelar.setAttribute("class", "btn modal-close waves-effect waves-light light-blue darken-4");
    botonCancelar.setAttribute( "type", "button" );
    botonCancelar.setAttribute( "data-dismiss", "modal" );
    botonCancelar.setAttribute( "data-backdrop", "false");
    botonCancelar.innerText = "Cancelar";
  
    formulario.appendChild( identificador );
    formulario.appendChild( botonConfirmar );
    formulario.appendChild( botonCancelar );

  modal_footer.appendChild(formulario);

  /// Agregamos el "header" y los demas componentes al contenedor principal
  modal_content.appendChild( modal_header );
  modal_content.appendChild( modal_body );
  modal_content.appendChild( modal_footer);
      
  //console.log("Finaliza Eliminacion");

}

//Recibe el JSON de la base y carga las bicicletas disponibles en el DOM
function loadBicicletas(bicicletas){
  var elementos = new Array();
  elementos=bicicletas;
  var contenedor = document.getElementById("contenedor");
  //console.log(elementos);
  for(var i=0; i<elementos.length;i++){
      var tarjeta = document.createElement("div");
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
      boton.setAttribute("class","btn-floating btn waves-effect waves-light light-blue darken-4 left");
      boton.setAttribute("data-target","modalEdita");
      boton.setAttribute("onclick","editarBicicleta("+elementos[i].id+")");
      boton.setAttribute( "data-dismiss", "modal" );
      boton.setAttribute( "data-backdrop", "false");
      //Solo para uso de prueba, su funcionamiento debe abrir un modal con los datos
      //para la edicion de la bicicleta
      var icon = document.createElement("i");
      icon.setAttribute("class","material-icons right");
      icon.innerText="edit";
      boton.appendChild(icon);
      
      divAction.appendChild(boton);
      
      //Boton baja
      boton = document.createElement("button");
      boton.setAttribute("class","btn-floating btn waves-effect waves-light red darken-1 right");
      boton.setAttribute("class","btn-floating btn waves-effect waves-light red darken-1 right modal-trigger");
      boton.setAttribute("id", "idBaja");
      boton.setAttribute("data-target", "modalBaja");
      boton.setAttribute("onclick","eliminarBicicleta("+elementos[i].id+")");
      boton.setAttribute( "data-dismiss", "modal" );
      boton.setAttribute( "data-backdrop", "false");
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

//Muestra imagen cargada en la alta
$(document).ready(function(){
  $(function() {
   $('#file-input').change(function(e) {
      addImage(e); 
    });
 
    function addImage(e){
      console.log(e);
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

//Se inicializa el select de tipo input
$(document).ready(function() {
  $('input#input_text, textarea#textarea2').characterCounter();
});

//Se valida que todos los campos del formulario tengan un valor
function validaCampos(){
  var imagen = document.getElementById("file-input");
  var marca = document.getElementById("selectMarca");
  var color = document.getElementById("selectColor");
  var tipo = document.getElementById("selectTipo");
  var boton = document.getElementById("btnConfirmaAlta");
  if(imagen.value && marca.value!="" && color.value!="" && tipo.value!="")
    boton.removeAttribute("disabled");
}

//Se valida que todos los campos de MODIFICACION DE DATOS
function validaCamposM(){
  var imagen = document.getElementById("file-inputM");
  var marca = document.getElementById("selectMarcaM");
  var color = document.getElementById("selectColorM");
  var tipo = document.getElementById("selectTipoM");
  var boton = document.getElementById("btnConfirmaModificacion");
  if(imagen.value && marca.value!="" && color.value!="" && tipo.value!="")
    boton.removeAttribute("disabled");
}