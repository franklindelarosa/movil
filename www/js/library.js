Lungo.ready(function() {
    Lungo.Notification.show();
    Lungo.Service.Settings.async = true;
    Lungo.Service.Settings.error = function(type, xhr){
        alert("type: "+type+" xhr: "+xhr); /*----------------------------------------------------*/
    };
    Lungo.Service.Settings.headers["Content-Type"] = "application/json";
    Lungo.Service.Settings.crossDomain = false;
    Lungo.Service.Settings.timeout = 5000;
    var url = "http://localhost/futbolcracksapi/web/v1/usuario/listar-canchas";
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
    	};
        console.log(cancha);
        Lungo.Router.article("main", "cancha");
    });

var imprimirCanchas = function (result){
	console.log(result);
	$$('#canchas').empty();
    $$.each(result['data'], function(index, val) {
        $$('#canchas').append('<li class="thumb big selectable arrow" data-fc-id="'+
        	val.id_cancha+'" data-fc-cupo="'+val.cupo_max+'" data-fc-tel="'+val.telefono+
        	'"> <img src="http://localhost/futbolcracks/web/images/thumb.png"/><div><strong>'+val.nombre+
        	'</strong><small>'+val.direccion+'</small></div></li>');
    });
    Lungo.Notification.hide();
}