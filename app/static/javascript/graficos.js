function criarGrafico(data, label) {
    const ctx = document.getElementById('meuGrafico').getContext('2d');
    if (window.meuGrafico instanceof Chart) {
        window.meuGrafico.destroy();
    }
    window.meuGrafico = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set',  'Out', 'Nov', 'Dez'],
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

function mostrarGrafico(tipo) {
    let dados = [];
    let label = '';

    if (tipo === 'proposicoes') {
        dados = proposicoes = [15, 12, 18, 10, 20, 25, 30, 22, 17, 19, 24, 28];
        label = 'Proposições';
    } else if (tipo === 'faltas') {
        dados = [5, 8, 3, 6, 9, 4, 7, 2, 10, 6, 3, 8];
        label = 'Faltas';
    } else if (tipo === 'emendas') {
        dados = [5, 4, 11, 20, 11, 6, 1, 5, 4, 18, 9, 17]
        label = 'Emendas';
    }
    criarGrafico(dados, label);
}
function toggleActive(element) {
    var buttons = document.querySelectorAll('.aba');
    buttons.forEach(function(btn) {
        btn.classList.remove('active');
    });
    element.classList.add('active');
}
window.onload = function() {
    mostrarGrafico('proposicoes');
}
