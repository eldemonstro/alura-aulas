$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria(event) {

    $("#spinner").toggle();

    $.get("http://localhost:3000/frases/", (data) => {
            var frase = $(".frase");
            var aleatorio = Math.floor(Math.random() * data.length);
            frase.text(data[aleatorio].texto);
            atualizaTamanhoFrase();
            atualizaTempoInicial(data[aleatorio].tempo);
        })
        .fail(() => {
            $("#erro").show();
            setTimeout(() => {
                $("#erro").fadeOut(500);
            }, 2000);
        })
        .always(function () { //sempre escondendo o spinner
            $("#spinner").toggle();
        });
};

function buscaFrase() {

    $("#spinner").toggle();
    var fraseId = $("#frase-id").val();

    var dados = {
        id: fraseId
    }; //criacao do objeto JS que guarda a id

    //passando objecto como segundo parametro
    $.get("http://localhost:3000/frases", dados, (data) => {
            console.log(data);

            var frase = $(".frase");
            frase.text(data.texto); //cuidado, texto com "o" no final 
            atualizaTamanhoFrase();
            atualizaTempoInicial(data.tempo);
        })
        .fail(function () {
            $("#erro").toggle();
            setTimeout(function () {
                $("#erro").toggle();
            }, 2000);
        })
        .always(function () {
            $("#spinner").toggle();
        });
}