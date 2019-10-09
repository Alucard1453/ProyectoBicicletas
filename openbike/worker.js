
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
  
  //Para el select con materialize
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
            getUsuario(localStorage.getItem("Usuario"));
        }else{
            location.href ="/openbike/login.html";
        }
    } else{
        location.href ="/openbike/login.html";
    }
  }


// Se valida que todos los campos de la alta de visitantes
function validaCamposVisitante(){
    var marca = document.getElementById("selectMarcaBiciVisitante");
    var color = document.getElementById("selectColorBiciVisitante");
    var boton = document.getElementById("btnConfirmaAltaVisitante");
    if(marca.value!="" && color.value!="")
      boton.removeAttribute("disabled");
  }