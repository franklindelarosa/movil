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
    // localStorage.prueba = {nombre: "Hello", twitter: "twitter"};
    // var x = localStorage.getItem("_chrome-rel-back");
    // console.log(localStorage["_chrome-rel-back"]);
    
    Lungo.Service.Settings.headers["Content-Type"] = "application/json";
    // Lungo.Service.Settings.headers["Access-Control-Allow-Origin"] = "*";
    Lungo.Service.Settings.crossDomain = false;
    Lungo.Service.Settings.timeout = 10000;
    var url = "http://elecsis.com.co/fcracks/futbolcracksapi/web/v1/site/listar-canchas";
    // var url = "http://localhost/futbolcracksapi/web/v1/site/listar-canchas";
    // var url = "https://futbolcracksapi.herokuapp.com/web/v1/site/listar-canchas";
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
    $$('#label-cupo').html("Cupo: "+cancha.cupo_max+" jugadores");
    $$('#label-direccion').html("Dirección: "+cancha.direccion);
    Lungo.Notification.show();
    setTimeout(function(){Lungo.Router.article("main", "cancha"); Lungo.Notification.hide()}, 500);
    
});

$$('#seleccionar-cancha').on('singleTap', function(event) {
    Lungo.Notification.show();
    // var url = "http://localhost/futbolcracksapi/web/v1/site/cancha-dias";
    var url = "http://elecsis.com.co/fcracks/futbolcracksapi/web/v1/site/cancha-dias";
    Lungo.Service.post(url, {cancha:cancha.id}, imprimirDias, "json");
});

$$('#listado-dias ul').on('singleTap', 'li', function(event) {
    // var url = "http://localhost/futbolcracksapi/web/v1/site/cancha-horas";
    var url = "http://elecsis.com.co/fcracks/futbolcracksapi/web/v1/site/cancha-horas";
    Lungo.Notification.show();
	fecha = $$(this).attr('data-fc-fecha');
	Lungo.Service.post(url, {cancha: cancha.id, fecha: fecha}, imprimirHoras, "json");
});

$$('#listado-horas ul').on('singleTap', 'li', function(event) {
    // var url = "http://localhost/futbolcracksapi/web/v1/site/equipos";
    var url = "http://elecsis.com.co/fcracks/futbolcracksapi/web/v1/site/equipos";
    Lungo.Notification.show();
	hora = $$(this).attr('data-fc-hora');
	Lungo.Service.post(url, {cancha: cancha.id, fecha: fecha, hora: hora}, imprimirEquipos, "json");
});

$$('#unirse-blanco').on('singleTap', function(event) {
    equipo = "blancos"; //se envía en plurarl porque la Api la necesita así.
    if(sessionStorage["lanzadoDesdeHome"]){
        sessionStorage.removeItem("lanzadoDesdeHome");
    }
    if(localStorage["_chrome-rel-back"]){
        adicionarJugador("usuario");
    }else{
        Lungo.Router.section("login");
    }
});

$$('#unirse-negro').on('singleTap', function(event) {
    equipo = "negros"; //se envía en plurarl porque la Api la necesita así.
    if(sessionStorage["lanzadoDesdeHome"]){
        sessionStorage.removeItem("lanzadoDesdeHome");
    }
    if(localStorage["_chrome-rel-back"]){
        adicionarJugador("usuario");
    }else{
        Lungo.Router.section("login");
    }
});

$$('#iniciar-sesion').on('singleTap', function(event) {
    // var url = "http://localhost/futbolcracksapi/web/v1/site/login";
    var url = "http://elecsis.com.co/fcracks/futbolcracksapi/web/v1/site/login";
    Lungo.Notification.show();
    var correo = $$('#correo').val();
    var contrasena = $$('#contrasena').val();
    if(correo === "" || contrasena === ""){
        Lungo.Notification.error("Error", "Todos los campos son obligatorios", "remove", function(){return});
    }else{
        Lungo.Service.post(url, {correo: correo, contrasena: contrasena}, verificarLogin, "json");
    }
});