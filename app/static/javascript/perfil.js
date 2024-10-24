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
  }
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
  }
};

document.addEventListener("DOMContentLoaded", async function () {
  function getVereadorIdFromUrl() {
    const url = window.location.href;
    const parts = url.split('/');
    const vereadorId = parts[parts.length - 1];
    return vereadorId;
  }

  async function getVereadorData() {
    try {
      const response = await fetch('/static/javascript/infoGraficos.json');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao carregar o JSON:", error);
    }
  }

  async function getVereadorInfoById(vereadorId) {
    const vereadoresData = await getVereadorData();
    const vereador = vereadoresData.find(v => v.parlamentarID == vereadorId);
    return vereador;
  }

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
        labels: ['2024', '2023', '2022', '2021'],
        datasets: [
          {
            label: labels.label1,
            data: dataIn[0],
            backgroundColor: colors.color1,
            borderColor: colors.color1,
            borderWidth: 1,
          },
          {
            label: labels.label2,
            data: dataIn[1],
            backgroundColor: colors.color2,
            borderColor: colors.color2,
            borderWidth: 1,
          },
          {
            label: labels.label3,
            data: dataIn[2],
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

  function mostrarGraficoFrequencia(vereador) {
    const frequencia = vereador.frequencia;
    const presencas = frequencia[0].frequenciaSituacaoAnos.map(f => f.quantidade);
    const faltas = frequencia[1].frequenciaSituacaoAnos.map(f => f.quantidade);
    const faltasJustificadas = frequencia[2].frequenciaSituacaoAnos.map(f => f.quantidade);

    criarGrafico([presencas, faltas, faltasJustificadas], 'frequencia');
  }

  function mostrarGraficoProposicoes(vereador) {
    const proposicoes = vereador.proposicoesApresentadas;
    const dadosProposicoes = proposicoes.map(p => p.quantidade);

    criarGrafico([dadosProposicoes], 'proposicoes');
  }

  function mostrarGraficoLeis(vereador) {
    const normas = vereador.normasApresentadas;
    const dadosNormas = normas.map(n => n.quantidade);

    criarGrafico([dadosNormas], 'leis');
  }

  function atualizarGrafico(vereador) {
    const select = document.querySelector('.select');
    const textoLink = select.options[select.selectedIndex].text;

    switch (textoLink) {
      case "Frequência em Plenário":
        mostrarGraficoFrequencia(vereador);
        break;
      case "Proposições Apresentadas":
        mostrarGraficoProposicoes(vereador);
        break;
      case "Leis de sua Autoria":
        mostrarGraficoLeis(vereador);
        break;
      default:
        console.log("Gráfico não encontrado para: " + textoLink);
    }
  }

  const vereadorId = getVereadorIdFromUrl();
  const vereador = await getVereadorInfoById(vereadorId);

  if (vereador) {
    mostrarGraficoFrequencia(vereador);
    
    const select = document.querySelector('.select');
    select.addEventListener('change', () => atualizarGrafico(vereador));
  } else {
    console.error("Vereador não encontrado.");
  }
});