function criarGrafico(data, label) {
    const ctx = document.getElementById('meuGrafico').getContext('2d');

    if (window.meuGrafico instanceof Chart) {
        window.meuGrafico.destroy();
    }

    window.meuGrafico = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [{
                label: label,
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function mostrarGraficoFrequencia() {
    const dadosFrequencia = [70, 75, 80, 85, 90, 95, 100, 85, 80, 75, 70, 65];
    criarGrafico(dadosFrequencia, 'Frequência');
}

function mostrarGraficoFaltasJustificadas() {
    const dadosFaltasJustificadas = [5, 10, 8, 6, 4, 3, 2, 5, 7, 8, 9, 10];
    criarGrafico(dadosFaltasJustificadas, 'Faltas Justificadas');
}

function mostrarGraficoFaltasNaoJustificadas() {
    const dadosFaltasNaoJustificadas = [2, 3, 5, 4, 6, 7, 8, 5, 4, 3, 2, 1];
    criarGrafico(dadosFaltasNaoJustificadas, 'Faltas Não Justificadas');
}

function mostrarGraficoLeis() {
    const dadosLeis = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65];
    criarGrafico(dadosLeis, 'Leis');
}

function mostrarGraficoResolucao() {
    const dadosResolucao = [5, 10, 15, 20, 25, 30, 35, 30, 25, 20, 15, 10];
    criarGrafico(dadosResolucao, 'Resoluções');
}

function mostrarGraficoMocoes() {
    const dadosMocoes = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];
    criarGrafico(dadosMocoes, 'Moções');
}

function mostrarGraficoEmendas() {
    const dadosEmendas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    criarGrafico(dadosEmendas, 'Emendas');
}


function mostrarGraficoComissoesEspeciais() {
    const dadosComissoesEspeciais = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
    criarGrafico(dadosComissoesEspeciais, 'Comissões Especiais');
}

function mostrarGraficoComissoesPermanentes() {
    const dadosComissoesPermanentes = [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48];
    criarGrafico(dadosComissoesPermanentes, 'Comissões Permanentes');
}
function mostrarGraficoJustica() {
    const dadosJustica = [5, 10, 15, 20, 25, 30, 35, 30, 25, 20, 15, 10];
    criarGrafico(dadosJustica, 'Justiça, Redação e Direitos Humanos');
}

function mostrarGraficoEtica() {
    const dadosEtica = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
    criarGrafico(dadosEtica, 'Ética');
}

function mostrarGraficoPlanejamento() {
    const dadosPlanejamento = [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48];
    criarGrafico(dadosPlanejamento, 'Planejamento urbano, Obras e Transportes');
}

function mostrarGraficoMeioAmbiente() {
    const dadosMeioAmbiente = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];
    criarGrafico(dadosMeioAmbiente, 'Meio ambiente');
}

function mostrarGraficoEconomia() {
    const dadosEconomia = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23];
    criarGrafico(dadosEconomia, 'Economia, Finanças e Orçamento');
}

function mostrarGraficoEducacao() {
    const dadosEducacao = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65];
    criarGrafico(dadosEducacao, 'Educação e Promoção social');
}


document.addEventListener('DOMContentLoaded', function () {

    const menuLinks = document.querySelectorAll('.dropdown-menu a');


    menuLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const textoLink = this.textContent;

            switch (textoLink) {
                case 'Percentual de presença':
                    mostrarGraficoFrequencia();
                    break;
                case 'Faltas justificadas':
                    mostrarGraficoFaltasJustificadas();
                    break;
                case 'Faltas não justificadas':
                    mostrarGraficoFaltasNaoJustificadas();
                    break;
                case 'Leis':
                    mostrarGraficoLeis();
                    break;
                case 'Resoluções':
                    mostrarGraficoResolucao();
                    break;
                case 'Moções':
                    mostrarGraficoMocoes();
                    break;
                case 'Emendas':
                    mostrarGraficoEmendas();
                    break;
                case 'Especiais':
                    mostrarGraficoComissoesEspeciais();
                    break;
                case 'Permanentes':
                    mostrarGraficoComissoesPermanentes();
                    break;
                case 'Justiça, Redação e Direitos Humanos':
                    mostrarGraficoJustica();
                    break;
                case 'Ética':
                    mostrarGraficoEtica();
                    break;
                case 'Planejamento urbano, Obras e Tranportes':
                    mostrarGraficoPlanejamento();
                    break;
                case 'Meio ambiente':
                    mostrarGraficoMeioAmbiente();
                    break;
                case 'Economia, Finanças e Orçamento':
                    mostrarGraficoEconomia();
                    break;
                case 'Educação e Promoção social':
                    mostrarGraficoEducacao();
                    break;

                default:
                    console.log('Gráfico não encontrado para: ' + textoLink);
            }
        });
    });
});
