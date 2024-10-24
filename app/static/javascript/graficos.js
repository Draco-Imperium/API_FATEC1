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
                "Amélia Naomi", "Dr. José Claudio", "Dulce Rita", "Fabião Zagueiro", "Fernando Petiti", "Juliana Fraga", "Juvenil Silvério", "Júnior da Farmácia", "Lino Bispo", "Marcão da Academia", "Marcelo Garcia", "Milton Vieira Filho", "Rafael Pascucci", "Renato Santiago", "Robertinho da Padaria", "Roberto Chagas", "Roberto do Eleven", "Rogério da Acasem", "Thomaz Henrique", "Walter Hayashi", "Zé Luís"
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
        return presenca.frequenciaSituacaoAnos.find(a => a.ano === 2024).quantidade;
    });
    const descricao = "Este gráfico ilustra o percentual de presenças ao longo do período analisado.";
    criarGrafico(dadosFrequencia, "Frequência", descricao);
}

function mostrarGraficoFaltasJustificadas() {
    const dadosFaltasJustificadas = dadosVereadores.map(vereador => {
        const faltaJustificada = vereador.frequencia.find(f => f.frequenciaSituacaoNome === "Falta Justificada");
        return faltaJustificada.frequenciaSituacaoAnos.find(a => a.ano === 2024).quantidade;
    });
    const descricao = "Este gráfico ilustra as faltas justificadas ao longo do período.";
    criarGrafico(dadosFaltasJustificadas, "Faltas Justificadas", descricao);
}

function mostrarGraficoFaltasNaoJustificadas() {
    const dadosFaltasNaoJustificadas = dadosVereadores.map(vereador => {
        const faltaNaoJustificada = vereador.frequencia.find(f => f.frequenciaSituacaoNome === "Falta");
        return faltaNaoJustificada.frequenciaSituacaoAnos.find(a => a.ano === 2024).quantidade;
    });
    const descricao = "Este gráfico ilustra as faltas não justificadas ao longo do período.";
    criarGrafico(dadosFaltasNaoJustificadas, "Faltas Não Justificadas", descricao);
}

function mostrarGraficoLeis() {
    const dadosLeis = dadosVereadores.map(vereador => {
        const leis = vereador.normasApresentadas.find(n => n.tipo === "Lei Ordinária");
        return leis.quantidade;
    });
    const descricao = "Este gráfico ilustra a quantidade de leis aprovadas ao longo do ano.";
    criarGrafico(dadosLeis, "Leis", descricao);
}

function mostrarGraficoResolucao() {
    const dadosResolucao = dadosVereadores.map(vereador => {
        const resolucao = vereador.normasApresentadas.find(n => n.tipo === "Resolução");
        return resolucao.quantidade;
    });
    const descricao = "Este gráfico ilustra as resoluções aprovadas ao longo do ano.";
    criarGrafico(dadosResolucao, "Resoluções", descricao);
}

function mostrarGraficoMocoes() {
    const dadosMocoes = dadosVereadores.map(vereador => {
        const mocoes = vereador.proposicoesApresentadas.find(p => p.tipo === "Moção");
        return mocoes.quantidade;
    });
    const descricao = "Este gráfico ilustra as moções propostas durante o período.";
    criarGrafico(dadosMocoes, "Moções", descricao);
}

function mostrarGraficoEmendas() {
    const dadosEmendas = dadosVereadores.map(vereador => {
        const emendas = vereador.proposicoesApresentadas.find(p => p.tipo === "Emenda");
        return emendas.quantidade;
    });
    const descricao = "Este gráfico ilustra as emendas feitas ao longo do ano.";
    criarGrafico(dadosEmendas, "Emendas", descricao);
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
                case "Leis":
                    mostrarGraficoLeis();
                    break;
                case "Resoluções":
                    mostrarGraficoResolucao();
                    break;
                case "Moções":
                    mostrarGraficoMocoes();
                    break;
                case "Emendas":
                    mostrarGraficoEmendas();
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