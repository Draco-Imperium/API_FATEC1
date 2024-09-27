const ctx = document.getElementById('BarChart').getContext('2d');
const BarChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
      datasets: [{
        label: 'Presença em Plenário',
        data: [76, 79, 89, 90, 86, 83, 80, 50],
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