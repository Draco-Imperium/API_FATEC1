// Função para criar o gráfico
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

// Funções para mostrar os gráficos
function mostrarGraficoPresenca() {
    const dadosPresenca = [75, 15, 10]; // Presença, Faltas Justificadas, Faltas Não Justificadas
    criarGrafico(dadosPresenca, 'Percentual de Presença');
}

function mostrarGraficoFaltasJustificadas() {
    const dadosFaltasJustificadas = [20, 80]; // Exemplo de dados
    criarGrafico(dadosFaltasJustificadas, 'Faltas Justificadas');
}

function mostrarGraficoFaltasNaoJustificadas() {
    const dadosFaltasNaoJustificadas = [10, 90]; // Exemplo de dados
    criarGrafico(dadosFaltasNaoJustificadas, 'Faltas Não Justificadas');
}

function mostrarGraficoLeis() {
    const dadosLeis = [30, 20, 25, 15]; // Exemplo de dados
    criarGrafico(dadosLeis, 'Leis');
}

function mostrarGraficoResolucao() {
    const dadosResolucao = [10, 30, 20, 40]; // Exemplo de dados
    criarGrafico(dadosResolucao, 'Resoluções');
}

function mostrarGraficoMocoes() {
    const dadosMocoes = [15, 25, 35, 25]; // Exemplo de dados
    criarGrafico(dadosMocoes, 'Moções');
}

function mostrarGraficoEmendas() {
    const dadosEmendas = [5, 15, 25, 55]; // Exemplo de dados
    criarGrafico(dadosEmendas, 'Emendas');
}

function mostrarGraficoComissoesEspeciais() {
    const dadosComissoesEspeciais = [10, 5]; // Exemplo de dados
    criarGrafico(dadosComissoesEspeciais, 'Comissões Especiais');
}

function mostrarGraficoComissoesPermanentes() {
    const dadosComissoesPermanentes = [8, 12]; // Exemplo de dados
    criarGrafico(dadosComissoesPermanentes, 'Comissões Permanentes');
}
function mostrarGraficoEducacao() {
    const dadosEducacao = [25, 35, 40]; // Exemplo de dados
    criarGrafico(dadosEducacao, 'Educação e Promoção Social');
}

// Adiciona eventos de clique aos itens do menu
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os links do menu suspenso
    const menuLinks = document.querySelectorAll('.dropdown-menu a');

    // Adiciona um evento de clique a cada link
    menuLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Previne o comportamento padrão do link

            // Verifica qual link foi clicado e chama a função correspondente
            const textoLink = this.textContent;

            switch (textoLink) {
                case 'Percentual de presença':
                    mostrarGraficoPresenca();
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
