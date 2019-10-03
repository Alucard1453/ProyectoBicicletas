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

function getMarcas(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var marcas = JSON.parse(this.responseText);
          console.log(marcas);
          //loadMarcas(marcas);
      }
  };
  xmlhttp.open("GET", "JSON_Marcas.php", true);
  xmlhttp.send();
}