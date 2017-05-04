$("#botao-placar").click(mostraPlacar);
$(".botao-remover").click(removeLinha);
$("#botao-sync").click(sincronizarPlacar);

function inserePlacar() {
    var tabela = $(".placar").find("tbody");
    var usuario = $('#usuarios').val();
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
        atualizaPlacar();
    }, 990);
}

function mostraPlacar() {
    $(".placar").stop().slideToggle(500);
}

function sincronizarPlacar() {
    var placar = [];
    var linhas = $("tbody>tr");

    linhas.each(function () {
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();

        var score = {
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score);

    });

    var dados = {
        placar: placar
    };

    $.post("http://localhost:3000/placar", dados, function () {
        console.log("Placar sincronizado com sucesso");
        $(".tooltip").tooltipster("open");
    })
    .fail(() => {
        $(".tooltip").tooltipster("open").tooltipster("content", "Falha na transmissão");
    })
    .always(() => {
        setTimeout(() => {
            $(".tooltip").tooltipster("close");
        }, 1000)
    });
}

function atualizaPlacar() {
    $.get("http://localhost:3000/placar", (data) => {
        var tabela = $(".placar").find("tbody");
        data.forEach(function (dados) {
            var linha = novaLinha(dados.usuario, dados.pontos);
            linha.find(".botao-remover").click(removeLinha);

            tabela.append(linha);
        });
    });
}