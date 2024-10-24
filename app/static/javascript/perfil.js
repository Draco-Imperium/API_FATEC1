let flag_init = true

const labelsMap = {
  frequencia: {
    label1: "Presença",
    label2: "Faltas",
    label3: "Faltas Justificadas"
  },
  proposicoes: {
    label1: "Proposições",
    label2: "Indicação",
    label3: "Requerimentos"
  },
  leis: {
    label1: "Leis",
    label2: "Leis Aprovadas",
    label3: "Leis Não-Aprovadas"
  },
};

const colorsMap = {
  frequencia: {
    color1: "#4CAF50",
    color2: "#F44336",
    color3: "#FFEB3B"
  },
  proposicoes: {
    color1: "#2196F3",
    color2: "#FF9800",
    color3: "#9C27B0"
  },
  leis: {
    color1: "#3F51B5",
    color2: "#4CAF50",
    color3: "#FF5722"
  },
};

function criarGrafico(dataIn, labelCategory) {
  const ctx = document.getElementById('GraficoPerfil').getContext('2d');

  if (window.GraficoPerfil instanceof Chart) {
    window.GraficoPerfil.destroy();
  }

  const labels = labelsMap[labelCategory];
  const colors = colorsMap[labelCategory];

  window.GraficoPerfil = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2021', '2022', '2023', '2024'],
      datasets: [
        {
          label: labels.label1,
          data: dataIn,
          backgroundColor: colors.color1,
          borderColor: colors.color1,
          borderWidth: 1,
        },
        {
          label: labels.label2,
          data: dataIn,
          backgroundColor: colors.color2,
          borderColor: colors.color2,
          borderWidth: 1,
        },
        {
          label: labels.label3,
          data: dataIn,
          backgroundColor: colors.color3,
          borderColor: colors.color3,
          borderWidth: 1,
        }
      ]
    },
    options: {
      indexAxis: 'y',
      scales: {
        y: {
          beginAtZero: true,
        }
      }
    }
  });
}


function mostrarGraficoFrequencia() {
  const GraficoPresenca = [76, 33, 44, 98];
  criarGrafico(GraficoPresenca, 'frequencia');
  flag_init = false;

}

function mostrarGraficoProposicoes() {
  const GraficoProposicoes = [90, 80, 75, 60];
  criarGrafico(GraficoProposicoes, 'proposicoes');
}

function mostrarGraficoLeis() {
  const dadosLeis = [60, 70, 40, 45];
  criarGrafico(dadosLeis, 'leis');
}

function atualizarGrafico() {
  const select = document.querySelector('.select');
  const textoLink = select.options[select.selectedIndex].text;

  switch (textoLink) {
    case "Frequência em Plenário":
      mostrarGraficoFrequencia();
      break;
    case "Proposições Apresentadas":
      mostrarGraficoProposicoes();
      break;
    case "Leis de sua Autoria":
      mostrarGraficoLeis();
      break;
    default:
      console.log("Gráfico não encontrado para: " + textoLink);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  mostrarGraficoFrequencia();
  const select = document.querySelector('.select');
  select.addEventListener('change', atualizarGrafico);
});
