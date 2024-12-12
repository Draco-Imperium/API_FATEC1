let flag_init = true;
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

    const isSmallScreen = window.innerWidth <= 768;

    const options = {
        type: "bar",
        data: {
            labels: [
                "Amélia Naomi", "Dr. Elton", "Dr. José Claudio", "Dulce Rita",
                "Fabião Zagueiro", "Fernando Petiti", "Juliana Fraga",
                "Júnior da Farmácia", "Juvenil Silvério", "Lino Bispo", "Marcão da Academia",
                "Rafael Pascucci", "Renato Santiago", "Robertinho da Padaria",
                "Roberto Chagas", "Rogério da ACASEM",
                "Walter Hayashi", "Roberto do Eleven", "Milton Vieira Filho",
                "Marcelo Garcia", "Zé Luis", "Thomaz Henrique"
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
            indexAxis: isSmallScreen ? 'y' : 'x', 
            scales: {
                x: {
                    beginAtZero: true,
                },
                y: {
                    display: isSmallScreen ? false : true,
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    };

    window.meuGrafico = new Chart(ctx, options);

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
    flag_init = false;
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
        return emendas?.quantidade;
    });
    const descricao = "Este gráfico ilustra as emendas propostas ao longo do mandato.";
    criarGrafico(dadosEmendas, "Emendas", descricao);
}

function mostrarGraficoRequerimento() {
    const dadosrequerimento = dadosVereadores.map(vereador => {
        const requerimentos = vereador.proposicoesApresentadas.find(p => p.tipo === "Requerimento");
        return requerimentos?.quantidade;
    });
    const descricao = "Este gráfico ilustra os requerimentos propostos ao longo do mandato.";
    criarGrafico(dadosrequerimento, "Requerimentos", descricao);
}

function mostrarGraficoDecretolegislativo() {
    const dadosDecretolegislativo = dadosVereadores.map(vereador => {
        const Decretolegislativo = vereador.normasApresentadas.find(n => n.tipo === "Decreto Legislativo");
        return Decretolegislativo?.quantidade;
    });
    const descricao = "Este gráfico ilustra os decretos legislativos aprovados ao longo do mandato.";
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
    const descricao = "Este gráfico ilustra as resoluções aprovadas ao longo do mandato.";
    criarGrafico(dadosResolucao, "Resolução", descricao);
}

function getAnoFiltro() {
    const inicio = document.getElementById("anoSelect").value;
    return parseInt(inicio);
}

document.addEventListener("DOMContentLoaded", async function () {
    await carregarDadosVereadores();
    mostrarGraficoFrequencia();

    const dateFilterSection = document.querySelector(".date-filter-section");

    document.getElementById("anoSelect").addEventListener("change", function() {
        const opcaoAtiva = document.querySelector(".dropdown-menu .active").textContent.trim();
        switch (opcaoAtiva) {
            case "Percentual de presença":
                mostrarGraficoFrequencia();
                break;
            case "Faltas justificadas":
                mostrarGraficoFaltasJustificadas();
                break;
            case "Faltas não justificadas":
                mostrarGraficoFaltasNaoJustificadas();
                break;
        }
    });

    const menuLinks = document.querySelectorAll(".dropdown-menu a");
    menuLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const textoLink = this.textContent.trim();

            menuLinks.forEach((link) => link.classList.remove("active"));
            this.classList.add("active");

            switch (textoLink) {
                case "Percentual de presença":
                    mostrarGraficoFrequencia();
                    dateFilterSection.style.display = "flex";
                    break;
                case "Faltas justificadas":
                    mostrarGraficoFaltasJustificadas();
                    dateFilterSection.style.display = "flex";
                    break;
                case "Faltas não justificadas":
                    mostrarGraficoFaltasNaoJustificadas();
                    dateFilterSection.style.display = "flex";
                    break;
                case "Projetos de Lei":
                    mostrarGraficoProjetodeLeis();
                    dateFilterSection.style.display = "none";
                    break;
                case "Indicação":
                    mostrarGraficoIndicacao();
                    dateFilterSection.style.display = "none";
                    break;
                case "Moções":
                    mostrarGraficoMocoes();
                    dateFilterSection.style.display = "none";
                    break;
                case "Emendas":
                    mostrarGraficoEmendas();
                    dateFilterSection.style.display = "none";
                    break;
                case "Requerimento":
                    mostrarGraficoRequerimento();
                    dateFilterSection.style.display = "none";
                    break;
                case "Decreto Legislativo":
                    mostrarGraficoDecretolegislativo();
                    dateFilterSection.style.display = "none";
                    break;
                case "Emenda à Lei Orgânica":
                    mostrarGraficoLeiorganica();
                    dateFilterSection.style.display = "none";
                    break;
                case "Lei Ordinária":
                    mostrarGraficoLeiordinaria();
                    dateFilterSection.style.display = "none";
                    break;
                case "Resolução":
                    mostrarGraficoResolucao();
                    dateFilterSection.style.display = "none";
                    break;
                default:
                    console.error("Gráfico não definido para esta opção.");
                    dateFilterSection.style.display = "none";
                    break;
            }
        });
    });
});