let dadosVereadores = [];

async function carregarDadosVereadores() {
    const response = await fetch('/static/javascript/infoGraficos.json');
    dadosVereadores = await response.json();
}

function criarGrafico(data, label, descricao) {
    const ctx = document.getElementById("meuGrafico").getContext("2d");

    if (window.meuGrafico instanceof Chart) {
        window.meuGrafico.destroy();
    }

    window.meuGrafico = new Chart(ctx, {
        type: "bar",
        data: {
            labels: [
                "Amélia Naomi", "Dr. Elton", "Dr. José Claudio", "Dulce Rita", 
                "Fabião Zagueiro", "Fernando Petiti", "Juliana Fraga", 
                "Júnior da Farmácia",
                 "Juvenil Silvério", "Lino Bispo", "Marcão da Academia", 
                 "Rafael Pascucci", "Renato Santiago", "Robertinho da Padaria", 
                 "Roberto Chagas", "Rogério da ACASEM", 
                 "Walter Hayashi", "Roberto do Eleven", "Milton Vieira Filho", 
                 "Marcelo Garcia", 
                 "Zé Luis", "Thomaz Henrique"
            ],
            datasets: [{
                label: label,
                data: data,
                backgroundColor: "#2f4fac",
                borderColor: "#1e3a8a",
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                x: {
                    barPercentage: 0.5,
                    categoryPercentage: 0.5
                },
                y: {
                    beginAtZero: true,
                }
            }
        },
        responsive: true
    });

    const descricaoElemento = document.getElementById("descricao");
    if (descricaoElemento && typeof descricao === "string") {
        descricaoElemento.innerText = descricao;
    } else {
        descricaoElemento.innerText = "";
    }
}

function mostrarGraficoFrequencia() {
    const dadosFrequencia = dadosVereadores.map(vereador => {
        const presenca = vereador.frequencia.find(f => f.frequenciaSituacaoNome === "Presente");
        return presenca.frequenciaSituacaoAnos.find(a => a.ano === getAnoFiltro())?.quantidade;
    });
    const descricao = "Este gráfico ilustra o percentual de presenças ao longo do período analisado.";
    criarGrafico(dadosFrequencia, "Frequência", descricao);
}

function mostrarGraficoFaltasJustificadas() {
    const dadosFaltasJustificadas = dadosVereadores.map(vereador => {
        const faltaJustificada = vereador.frequencia.find(f => f.frequenciaSituacaoNome === "Falta Justificada");
        return faltaJustificada.frequenciaSituacaoAnos.find(a => a.ano === getAnoFiltro())?.quantidade;
    });
    const descricao = "Este gráfico ilustra as faltas justificadas ao longo do período.";
    criarGrafico(dadosFaltasJustificadas, "Faltas Justificadas", descricao);
}

function mostrarGraficoFaltasNaoJustificadas() {
    const dadosFaltasNaoJustificadas = dadosVereadores.map(vereador => {
        const faltaNaoJustificada = vereador.frequencia.find(f => f.frequenciaSituacaoNome === "Falta");
        return faltaNaoJustificada.frequenciaSituacaoAnos.find(a => a.ano === getAnoFiltro())?.quantidade;
    });
    const descricao = "Este gráfico ilustra as faltas não justificadas ao longo do período.";
    criarGrafico(dadosFaltasNaoJustificadas, "Faltas Não Justificadas", descricao);
}

function mostrarGraficoProjetodeLeis() {
    const dadosprojetosdeleis = dadosVereadores.map(vereador => {
        const projetosdeleis = vereador.proposicoesApresentadas.find(p => p.tipo === "Projeto de Lei");
        return projetosdeleis?.quantidade;
    });
    const descricao = "Este gráfico ilustra a quantidade de projetos de lei propostos ao longo do mandato.";
    criarGrafico(dadosprojetosdeleis, "Projetos de Lei", descricao);
}

function mostrarGraficoIndicacao() {
    const dadosindicacao = dadosVereadores.map(vereador => {
        const indicacao = vereador.proposicoesApresentadas.find(p => p.tipo === "Indicação");
        return indicacao?.quantidade;
    });
    const descricao = "Este gráfico ilustra as indicações propostas ao longo do mandato.";
    criarGrafico(dadosindicacao, "Indicações", descricao);
}

function mostrarGraficoMocoes() {
    const dadosMocoes = dadosVereadores.map(vereador => {
        const mocoes = vereador.proposicoesApresentadas.find(p => p.tipo === "Moção");
        return mocoes?.quantidade;
    });
    const descricao = "Este gráfico ilustra as moções propostas durante o mandato.";
    criarGrafico(dadosMocoes, "Moções", descricao);
}

function mostrarGraficoEmendas() {
    const dadosEmendas = dadosVereadores.map(vereador => {
        const emendas = vereador.proposicoesApresentadas.find(p => p.tipo === "Emenda");
        return emendas.quantidade;
    });
    const descricao = "Este gráfico ilustra as emendas propostas ao longo do mandato.";
    criarGrafico(dadosEmendas, "Emendas", descricao);
}

function mostrarGraficoRequerimento() {
    const dadosrequerimento = dadosVereadores.map(vereador => {
        const requerimentos = vereador.proposicoesApresentadas.find(p => p.tipo === "Requerimento");
        return requerimentos.quantidade;
    });
    const descricao = "Este gráfico ilustra os requetimentos propostos ao longo do mandato.";
    criarGrafico(dadosrequerimento, "Requerimentos", descricao);
}

function mostrarGraficoDecretolegislativo() {
    const dadosDecretolegislativo = dadosVereadores.map(vereador => {
        const Decretolegislativo = vereador.normasApresentadas.find(n => n.tipo === "Decreto Legislativo");
        return Decretolegislativo?.quantidade;
    });
    const descricao = "Este gráfico ilustra os decretos legislativo aprovados ao longo do mandato.";
    criarGrafico(dadosDecretolegislativo, "Decreto Legislativo", descricao);
}

function mostrarGraficoLeiorganica() {
    const dadosLeiorganica = dadosVereadores.map(vereador => {
        const Leiorganica = vereador.normasApresentadas.find(n => n.tipo === "Emenda à Lei Orgânica");
        return Leiorganica?.quantidade;
    });
    const descricao = "Este gráfico ilustra as emendas à lei orgânica aprovadas ao longo do mandato.";
    criarGrafico(dadosLeiorganica, "Emenda à Lei Orgânica", descricao);
}

function mostrarGraficoLeiordinaria() {
    const dadosLeiordinaria = dadosVereadores.map(vereador => {
        const Leiordinaria = vereador.normasApresentadas.find(n => n.tipo === "Lei Ordinária");
        return Leiordinaria?.quantidade;
    });
    const descricao = "Este gráfico ilustra as leis ordinárias ao longo do mandato.";
    criarGrafico(dadosLeiordinaria, "Lei Ordinária", descricao);
}

function mostrarGraficoResolucao() {
    const dadosResolucao = dadosVereadores.map(vereador => {
        const Resolucao = vereador.normasApresentadas.find(n => n.tipo === "Resolução");
        return Resolucao?.quantidade;
    });
    const descricao = "Este gráfico ilustra as Resoluções aprovados ao longo do mandato.";
    criarGrafico(dadosResolucao, "Resolução", descricao);
}

function getAnoFiltro() {
    const inicio = document.getElementById("anoSelect").value;
    const anoInicio = parseInt(inicio);
    const out = anoInicio;
    console.log(out);
    return out;
}

document.addEventListener("DOMContentLoaded", async function () {
    await carregarDadosVereadores();
    const menuLinks = document.querySelectorAll(".dropdown-menu a");

    menuLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            const textoLink = this.textContent;

            switch (textoLink) {
                case "Percentual de presença":
                    mostrarGraficoFrequencia();
                    break;
                case "Faltas justificadas":
                    mostrarGraficoFaltasJustificadas();
                    break;
                case "Faltas não justificadas":
                    mostrarGraficoFaltasNaoJustificadas();
                    break;
                case "Projetos de Lei":
                    mostrarGraficoProjetodeLeis();
                    break;
                case "Indicação":
                    mostrarGraficoIndicacao();
                    break;
                case "Moções":
                    mostrarGraficoMocoes();
                    break;
                case "Emendas":
                    mostrarGraficoEmendas();
                    break;
                case "Requerimento":
                    mostrarGraficoRequerimento();
                    break;
                case "Decreto Legislativo":
                    mostrarGraficoDecretolegislativo();
                    break;
                case "Emenda à Lei Orgânica":
                    mostrarGraficoLeiorganica();
                    break;
                case "Lei Ordinária":
                    mostrarGraficoLeiordinaria();
                    break;
                case "Resolução":
                    mostrarGraficoResolucao();
                    break;
                default:
                    console.log("Gráfico não encontrado para: " + textoLink);
            }
        });
    });
});

function toggleOptions() {
    var options = document.getElementById("sorting-options");
    if (options.style.display === "block") {
        options.style.display = "none";
    } else {
        options.style.display = "block";
    }
}