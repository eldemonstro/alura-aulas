$("#botao-placar").click(mostraPlacar);
$(".botao-remover").click(removeLinha);

function inserePlacar() {
    var tabela = $(".placar").find("tbody");
    var usuario = "Glauber";
    var numPalavras = $("#contador-palavras").text();
    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    tabela.append(linha);
    $(".placar").slideDown(500);
    scrollPlacar();
}

function scrollPlacar() {
    var posPlacar = $(".placar").offset().top;
    $("body").animate({
        scrollTop: posPlacar + "px"
    }, 1000);
}

function novaLinha(usuario, numPalavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(numPalavras);
    var colunaRemover = $("<td>");
    var link = $("<a>").addClass('botao-remover').attr('href', '#');
    var icone = $("<i>").addClass('small').addClass('material-icons').text('delete');
    link.append(icone);
    colunaRemover.append(link);
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha(event) {
    event.preventDefault();
    var linha = $(this).parent().parent();
    linha.fadeOut(1000);
    setTimeout(() => {
        linha.remove();
    }, 990);
}

function mostraPlacar() {
    $(".placar").stop().slideToggle(500);
}