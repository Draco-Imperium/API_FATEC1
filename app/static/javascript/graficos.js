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

function mostrarGrafico() {
    let dados = [15, 12, 18, 10, 20, 25, 30, 22, 17, 19, 24, 28];
    let label = 'Proposições';
    criarGrafico(dados, label);
}

document.addEventListener('DOMContentLoaded', function() {
    mostrarGrafico();
});
