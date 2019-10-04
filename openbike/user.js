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
  localStorage.setItem("Usuario","201648713");
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
      var imagen = document.createElement("img");
      imagen.setAttribute("class","activator");
      imagen.setAttribute("src","data:image/jpg;base64,"+elementos[i].foto);
      imagen.setAttribute("style","max-height: 200px; min-height: 200px");
      //imagen.setAttribute("style","min-height: 300px");
      divImagen.appendChild(imagen);
      tarjeta.appendChild(divImagen);

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

      var divAction = document.createElement("div");
      divAction.setAttribute("class","card-action");
      //Boton edicion
      var boton = document.createElement("button");
      boton.setAttribute("class","btn-floating btn waves-effect waves-light light-blue darken-4 left");
      //boton.setAttribute("onclick","editarBicicleta("+elementos[i].id+")");
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
      //boton.setAttribute("onclick","eliminarBicicleta("+elementos[i].id+")");
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