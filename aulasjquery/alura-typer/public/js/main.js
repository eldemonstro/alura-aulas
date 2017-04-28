var tempoInicial = $('#tempo-digitacao').text();
var frase = $(".frase").text();

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numeroDePalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numeroDePalavras);
}

$(function () {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});

var campo = $(".campo-digitacao");

function inicializaContadores() {
    campo.on('input', function () {
        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        var qtdCaracteres = conteudo.length;
        $('#contador-palavras').text(qtdPalavras);
        $('#contador-caracteres').text(qtdCaracteres);
    });
}

function inicializaCronometro() {
    var tempoRestante = $('#tempo-digitacao').text();
    campo.one('focus', function () {
        var cronometroID = setInterval(function () {
            tempoRestante--;
            $('#tempo-digitacao').text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000);
        $("#botao-reiniciar").attr("disabled", true);
    });
}

function finalizaJogo() {
    inserePlacar();
    campo.attr("disabled", true);
    $("#botao-reiniciar").attr("disabled", false);
    campo.toggleClass('campo-desativado');
}

function inicializaMarcadores() {
    campo.on("input", function () {
        var digitado = campo.val();
        if (frase.startsWith(digitado)) {
            campo.addClass('borda-verde');
            campo.removeClass('borda-vermelha');
        } else {
            campo.addClass('borda-vermelha');
            campo.removeClass('borda-verde');
        }
    });
}

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $('#contador-palavras').text(0);
    $('#contador-caracteres').text(0);
    $('#tempo-digitacao').text(tempoInicial);
    campo.toggleClass('campo-desativado');
    inicializaCronometro();
    campo.removeClass('borda-verde');
    campo.removeClass('borda-vermelha');
}