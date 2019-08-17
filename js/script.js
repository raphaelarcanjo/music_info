var $dados = [];
var endpointMusicas = 'https://0o7qeyq4of.execute-api.us-east-2.amazonaws.com/dev/radiocidade/teste-front';
var endpointCapas = 'https://0o7qeyq4of.execute-api.us-east-2.amazonaws.com/dev/radiocidade/capas';
var loaded = 0;

$(document).ready(function() {
    getDados();
});

function getDados() {
    $.ajax({
        type: 'GET',
        url: endpointMusicas,
        dataType: 'json',
        success: function(resposta) {
            $dados = resposta.body;
        }
    }).done(getCapas);
}

function getCapas() {
   $.each($dados, function(indice, elemento) {
       $.ajax({
           type: 'POST',
           url: endpointCapas,
           contentType: 'application/json',
           data: '{"musica":'+elemento.musica+',"artista":'+elemento.artista+'}',
           dataType: 'json',
           success: function(resposta) {
               elemento.capa = resposta.capa;
               loaded++;
               if(loaded == $dados.length) {
                   $("#loading").fadeOut(1000,function() {
                       montarLista();
                   });
                }
            }
        });
   });
}

function montarLista() {
    $.each($dados, function(indice, elemento) {
        let $li = $("<li class='col-12 col-md-6 col-lg-3 my-2'></li>");
        let $card = $("<div class='card'></div>");
        let $capa = $("<img src='"+elemento.capa+"' class='w-100 rounded'>");
        let $body = $("<div class='card-body'></div>");
        let $title = $("<h5 class='card-title'>"+elemento.artista+"</h5>");
        let $musica = $("<p class='card-text'>"+elemento.musica+"</p>");

        $body.append($title,$musica);
        $card.append($capa,$body);
        $li.append($card);

        $("#lista").append($li);
    })
}