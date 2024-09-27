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

function mostrarGraficoEconomia() {
    const dadosEconomia = [20, 30, 50]; // Exemplo de dados
    criarGrafico(dadosEconomia, 'Economia');
}

function mostrarGraficoSaude() {
    const dadosSaude = [15, 25, 60]; // Exemplo de dados
    criarGrafico(dadosSaude, 'Saúde');
}

function mostrarGraficoEducacao() {
    const dadosEducacao = [25, 35, 40]; // Exemplo de dados
    criarGrafico(dadosEducacao, 'Educação');
}

function mostrarGraficoSeguranca() {
    const dadosSeguranca = [30, 20, 50]; // Exemplo de dados
    criarGrafico(dadosSeguranca, 'Segurança');
}

function mostrarGraficoMeioAmbiente() {
    const dadosMeioAmbiente = [10, 20, 70]; // Exemplo de dados
    criarGrafico(dadosMeioAmbiente, 'Meio Ambiente');
}

// Adiciona eventos de clique aos itens do menu
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.query
})

{/* <div class="button-container">
    <h3>Frequência</h3>
    <button onclick="mostrarGraficoPresenca()">Percentual de Presença</button>
    <button onclick="mostrarGraficoFaltasJustificadas()">Faltas Justificadas</button>
    <button onclick="mostrarGraficoFaltasNaoJustificadas()">Faltas Não Justificadas</button>

    <h3>Proposições</h3>
    <button onclick="mostrarGraficoLeis()">Leis</button>
    <button onclick="mostrarGraficoResolucao()">Resoluções</button>
    <button onclick="mostrarGraficoMocoes()">Moções</button>
    <button onclick="mostrarGraficoEmendas()">Emendas</button>

    <h3>Comissões</h3>
    <button onclick="mostrarGraficoComissoesEspeciais()">Comissões Especiais</button>
    <button onclick="mostrarGraficoComissoesPermanentes()">Comissões Permanentes</button>

    <h3>Pautas</h3>
    <button onclick="mostrarGraficoEconomia()">Economia</button>
    <button onclick="mostrarGraficoSaude()">Saúde</button>
    <button onclick="mostrarGraficoEducacao()">Educação</button>
    <button onclick="mostrarGraficoSeguranca()">Segurança</button>
    <button onclick="mostrarGraficoMeioAmbiente()">Meio Ambiente</button>
</div> */}
