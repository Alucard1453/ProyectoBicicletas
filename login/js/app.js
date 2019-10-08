$(document).on("submit", ".form_login", function(event){
    event.preventDefault();
    var $form = $(this);
   
    var data_form = {
        claveuser: $("#claveuser").val(),
        contrasena: $("#contrasena").val(), 
        tipo: $("#tipo").val(),
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
            $("#msg_error2").html(res.con).show();
        $("#msg_error1").html(res.sin).show();
            return false;
       }
       else {
 
           if(res.status == 'ok'){
            localStorage.setItem('datos',JSON.stringify(res.inicio));
            var guardar=localStorage.getItem('datos');
            console.log('Obtenido: ', JSON.parse(guardar));
            return true;
           }

       }
        
    })
  

    .fail(function ajaxError(e){
        alert("Error");
    })
    .always(function ajaxSiempre(){   
        
        console.log('Final de la llamada ajax.');
    })
    return false;
});