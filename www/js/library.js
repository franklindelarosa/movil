var imprimirCanchas = function (result){
	console.log(result);
	$$('#canchas').empty();
    $$.each(result['data'], function(index, val) {
        $$('#canchas').append('<li><a href="#" data-fc-id="'+val.id_cancha+'" data-title="'+val.nombre+'" data-view-article="cancha">'+val.nombre+'</a></li>');
    });
}