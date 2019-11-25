
//Valida si hay una sesion iniciada para redireccionar
function validarsesion(){
    if(localStorage.getItem("Logueado")){
        var logueado = parseInt(localStorage.getItem("Logueado"),10);
        if(logueado==1 || logueado==2)
            location.href ="./user.html";
        else
            if(logueado == 3)
                location.href ="./worker.html";
    }
}

$(document).ready(function() { 
    cerrarSesion();
    getAccesos();
});

function cerrarSesion(){
    localStorage.clear();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var respuesta = this.responseText;
            console.log(respuesta);
            // location.href ="./index.html";
        }
    };
    xmlhttp.open("GET", "logout.php", true);
    xmlhttp.send();
}


//Solicita un JSON con los accesos
function getAccesos(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var accesos = JSON.parse(this.responseText);
            //var accesos = this.responseText;
            // console.log(accesos);
            loadAccesos(accesos);
        }
    };
    xmlhttp.open("GET", "JSON_Accesos.php", true);
    xmlhttp.send();
}

//Recibe el JSON de la base y carga las Accesos disponibles para que se muestren en los modals de alta y edicion
function loadAccesos(accesos){
    // var elementos = new Array();
    var elementos=accesos;
    var contenedor = document.getElementById("selectAcceso");
    for(var i=0; i<elementos.length;i++){
        var opcion = document.createElement("option");
        opcion.setAttribute("value",elementos[i].id);
        opcion.innerHTML=elementos[i].descripcion;

        contenedor.appendChild(opcion);
        // console.log(opcion);
    }
}

//Funcion para deshabilitar el scroll en el login
$('html, body').css({
    'overflow': 'hidden',
    'height': '100%'
});


//Funciones usuario
function escribeuseru() {
    var div = document.getElementById("nouseru");
    div.style.display = "none";
    div = document.getElementById("invalidu");
    div.style.display = "none";
}

function escribepassu() {
    let div = document.getElementById("nopassu");
    div.style.display = "none";
    div = document.getElementById("invalidu");
    div.style.display = "none";
}

function validarFormularioU(user,pass){
    if(user==""){
        let div = document.getElementById("nouseru");
        div.style.display = "block";
    }

    if(pass==""){
        let div = document.getElementById("nopassu");
        div.style.display = "block";
    }

    if(user!="" && pass!="")
        return true;
    else
        return false;
}

//Apartado trabajador
function escribeusert() {
    var div = document.getElementById("nousert");
    div.style.display = "none";
    div = document.getElementById("invalidt");
    div.style.display = "none";
}

function escribepasst() {
    var div = document.getElementById("nopasst");
    div.style.display = "none";
    div = document.getElementById("invalidt");
    div.style.display = "none";
}

function eligeAcceso(){
    var div = document.getElementById("noaccest");
    div.style.display = "none";
}

function validarFormularioT(user,pass,acceso){
    if(user==""){
        var div = document.getElementById("nousert");
        div.style.display = "block";
    }

    if(pass==""){
        let div = document.getElementById("nopasst");
        div.style.display = "block";
    }

    if(acceso==""){
        let div = document.getElementById("noaccest");
        div.style.display = "block";
    }

    if(user!="" && pass!="" && acceso!="")
        return true;
    else
        return false;
}

//Secciones de ingreso primero usuario y despues trabajador
function ingresarUsuario(user,pass) {
    if(validarFormularioU(user,pass)){
        validarAccesoUsuario(user,pass);
    }
}

function ingresarTrabajador(user,pass,acceso) {
    if(validarFormularioT(user,pass,acceso)){
        validarAccesoTrabajador(user,pass,acceso);
    }
}

function validarAccesoUsuario(user,pass){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var respuesta = parseInt(this.responseText,10);
            //var respuesta = this.responseText;
            if(respuesta){
                localStorage.setItem("Usuario",user);
                localStorage.setItem("Logueado",respuesta); //El tipo 1 sera para estudiante
                                                      //El tipo 2 sera para visitante
                                                      //El tipo 3 sera para trabajador
                if(respuesta==1 || respuesta==2)
                    location.href ="./user.html";
            }
            else{
                var div = document.getElementById("invalidu");
                div.style.display = "block";
            }
        }
    };
    xmlhttp.open("GET", "loginusuario.php?Usuario="+user+"&Password="+pass, true);
    xmlhttp.send();
}

function validarAccesoTrabajador(user, pass, acceso){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var respuesta = parseInt(this.responseText,10);
            //var respuesta = this.responseText;
            if(respuesta){
                localStorage.setItem("Usuario",user);
                localStorage.setItem("Logueado",respuesta); //El tipo 1 sera para estudiante
                                                      //El tipo 2 sera para visitante
                                                      //El tipo 3 sera para trabajador
                localStorage.setItem("Acceso",acceso);
                console.log(localStorage);
                // alert("alto");
                if(respuesta==3)
                    location.href ="./worker.html";
            }
            else{
                var div = document.getElementById("invalidt");
                div.style.display = "block";
            }
        }
    };
    xmlhttp.open("GET", "logintrabajador.php?Usuario="+user+"&Password="+pass+"&Acceso="+acceso, true);
    xmlhttp.send();
}

// Se inicializa el parallax y las tabs
$(document).ready(function(){
    $('.parallax').parallax();
    $('.tabs').tabs();
    $('select').formSelect();
});

//Se indica como trabajaran las tabs
$(document).ready(function(){
    $('ul.tabs').tabs({
        swipeable : true,
        responsiveThreshold : 1920
    });
});
