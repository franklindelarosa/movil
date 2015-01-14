Lungo.init({
    name: 'FutbolCracks'
});
Lungo.ready(function() {
    Lungo.Notification.show();
    Lungo.Service.Settings.async = true;
    Lungo.Service.Settings.error = function(type, xhr){
        if(type === "QuoJS.ajax: Timeout exceeded"){
            mostrarError();
        }
        console.log(type); /*------------------------------------------------------------------------------------*/
    };
    Lungo.Service.Settings.headers["Content-Type"] = "application/json";
    Lungo.Service.Settings.crossDomain = false;
    Lungo.Service.Settings.timeout = 10000;
    var url = "http://elecsis.com.co/fcracks/futbolcracksapi/web/v1/usuario/listar-canchas";
    // var url = "http://localhost/futbolcracksapi/web/v1/usuario/listar-canchas";
    // var url = "https://futbolcracksapi.herokuapp.com/web/v1/usuario/listar-canchas";
    Lungo.Service.post(url, "id=1", imprimirCanchas, "json");

});

$$('#listado-canchas ul').on('singleTap', 'li', function(event) {
	cancha = {
		id : $$(this).attr('data-fc-id'),
		nombre : $$(this).find("strong").html(),
		cupo_max : $$(this).attr('data-fc-cupo'),
		direccion : $$(this).find("small").html(),
        telefono : $$(this).attr('data-fc-tel'),
        logo : $$(this).attr('data-fc-logo'),
		imagen : $$(this).attr('data-fc-image'),
	};
    $$('article#cancha img').attr('src', 'http://elecsis.com.co/fcracks/web/images/canchas/'+cancha.imagen);
    $$('article#cancha h2').html(cancha.nombre);
    $$('#label-telefono').html("Tel: "+cancha.telefono);
    $$('#label-cupo').html("Cupo: "+cancha.cupo_max);
    $$('#label-direccion').html("Dirección: "+cancha.direccion);
    Lungo.Notification.show();
    setTimeout(function(){Lungo.Router.article("main", "cancha"); Lungo.Notification.hide()}, 500);
    
});

$$('#seleccionar-cancha').on('singleTap', function(event) {
    Lungo.Notification.show();
    var url = "http://elecsis.com.co/fcracks/futbolcracksapi/web/v1/usuario/cancha-dias";
    Lungo.Service.post(url, {cancha:cancha.id}, imprimirDias, "json");
});

$$('#listado-dias ul').on('singleTap', 'li', function(event) {
    var url = "http://elecsis.com.co/fcracks/futbolcracksapi/web/v1/usuario/cancha-horas";
    Lungo.Notification.show();
	fecha = $$(this).attr('data-fc-fecha');
	Lungo.Service.post(url, {cancha: cancha.id, fecha: fecha}, imprimirHoras, "json");
});

$$('#listado-horas ul').on('singleTap', 'li', function(event) {
    var url = "http://elecsis.com.co/fcracks/futbolcracksapi/web/v1/usuario/cancha-horas";
    Lungo.Notification.show();
	fecha = $$(this).attr('data-fc-fecha');
	Lungo.Service.post(url, {cancha: cancha.id, fecha: fecha}, imprimirHoras, "json");
});

var mensajes = ["Anímate", "No lo pienses más", "Esta es la hora perfecta", "Qué estás esperando?"];

function mostrarError(){
    var html_error = '<h1>Error</h1><p class="centrar"><img src="images/error.png"/></p><p class="centrar">Problemas con el servidor, intenta mas tarde</p>';
    Lungo.Notification.html(html_error, "Cerrar");
}

// este método imprime el listado de las canchas en la primera vista
var imprimirCanchas = function (result){
    // console.log(result);
    $$('#canchas').empty();
    if(result.status === "ok"){
        $$.each(result['data'], function(index, val) {
            $$('#canchas').append('<li class="thumb selectable arrow" data-fc-id="'+
                val.id_cancha+'" data-fc-cupo="'+val.cupo_max+'" data-fc-tel="'+val.telefono+'" data-fc-logo="'+val.imagen_logo+'" data-fc-image="'+val.imagen_cancha+
                '"> <img src="http://elecsis.com.co/fcracks/web/images/logos/'+val.imagen_logo+'"/><div><strong>'+val.nombre+
                '</strong><small>'+val.direccion+'</small></div></li>');
        });
        Lungo.Notification.hide();
    }else{
        mostrarError();
    }
}

// este método imprime el listado de los días disponibles de la cancha seleccionada
var imprimirDias = function (result){
    // console.log(result);
    $$('#dias').empty();
    if(result.status === "ok"){
        $$.each(result['data'], function(index, val) {
            $$('#dias').append('<li class="thumb selectable arrow" data-fc-fecha="'+
                val.fecha+'"><img src="http://elecsis.com.co/fcracks/web/images/logos/'+cancha.logo+'"/><div><strong>'+val.label+
                '</strong><small>'+val.fecha+'</small></div></li>');
        });
        Lungo.Router.article("main", "listado-dias");
        Lungo.Notification.hide();
    }else{
        mostrarError();
    }
}

// este método imprime el listado de las horas disponibles de la cancha seleccionada
//en el día seleccionado
var imprimirHoras = function (result){
    console.log(result);
    $$('#horas').empty();
    if(result[0].status === "ok"){
        $$.each(result[0]['data'], function(index, val) {
            $$('#horas').append('<li class="thumb selectable arrow" data-fc-hora="'+
                val.hora+' data-fc-blancos="'+val.blancos+'" data-fc-negros="'+val.negros+'"><img src="http://elecsis.com.co/fcracks/web/images/logos/'+cancha.logo+'"/><div><strong>'+val.label+
                '</strong><small>'+mensajes[Math.floor((Math.random() * mensajes.length))]+'</small></div></li>');
        });
        Lungo.Router.article("main", "listado-horas");
        Lungo.Notification.hide();
    }else{
        mostrarError();
    }
}




