$(document).on("submit", ".form_registro", function(event){
    event.preventDefault();
    var $form = $(this);
   
    var data_form = {
        claveuser: $("#claveuser").val(),
        contrasena: $("#contrasena").val(), 
        nombre: $("#nombre").val(),
        APaterno:$("#APaterno").val(),
        AMaterno: $("#AMaterno").val(),
        tipo: $("#tipo").val(),
    }
    if(data_form.contrasena.length < 6){
        $("#msg_error").text("Tu password debe ser minimo de 8 caracteres.").show();
        return false;   
    }
    $("#msg_error").hide();
    var url_php = '../InicioSesion/ajax/procesar_registro.php';

    $.ajax({
        type:'POST',
        url: url_php,
        data: data_form,
        dataType: 'json',
        async: true,
    })
    .done(function ajaxDone(res){
       console.log(res); 
       if(res.error !== undefined){
            $("#msg_error").text(res.error).show();
            return false;
       } 

       if(res.redirect !== undefined){
        window.location = res.redirect;
    }
    })
    .fail(function ajaxError(e){
        console.log(e);
    })
    .always(function ajaxSiempre(){
        console.log('Final de la llamada ajax.');
    })
    return false;
});



$(document).on("submit", ".form_login", function(event){
    event.preventDefault();
    var $form = $(this);
   
    var data_form = {
        claveuser: $("#claveuser").val(),
        contrasena: $("#contrasena").val(), 
        tipo: $("#tipo").val(),
    }
    if(data_form.contrasena.length < 6 ){
        $("#msg_error").text("Tu password debe ser minimo de 6 caracteres.").show();
        return false;   
    }
    $("#msg_error").hide();
    var url_php = '../InicioSesion/ajax/procesar_login.php';

    $.ajax({
        type:'POST',
        url: url_php,
        data: data_form,
        dataType: 'json',
        async: true,
    })
    .done(function ajaxDone(res){
       console.log(res); 
       if(res.error !== undefined){
            $("#msg_error").html(res.error).show();
            return false;
       } 
       if(res.redirect !== undefined){
           window.location = res.redirect;
       }
    })
    .fail(function ajaxError(e){
        console.log(e);
    })
    .always(function ajaxSiempre(){
        console.log('Final de la llamada ajax.');
    })
    return false;
});

