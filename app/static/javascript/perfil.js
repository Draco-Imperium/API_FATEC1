const labelsMap = {
  frequencia: {
    label1: "Presença",
    label2: "Faltas",
    label3: "Faltas Justificadas"
  },
  proposicoes: {
    label1: "Proposições",
    label2: "Projeto de Lei",
    label3: "Indicação",
    label4: "Moção",
    label5: "Requerimento"
  },
  leis: {
    label1: "Decreto Legislativo",
    label2: "Emenda à Lei Orgânica",
    label3: "Lei Ordinária",
    label4: "Resolução"
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
    color3: "#9C27B0",
    color4: "#4CAF50",
    color5: "#FF5722"
  },
  leis: {
    color1: "#3F51B5",
    color2: "#4CAF50",
    color3: "#FF5722",
    color4: "#FF9800"
  }
};

document.addEventListener("DOMContentLoaded", async function () {
  const getVereadorIdFromUrl = () => {
    const urlParts = window.location.href.split('/');
    return urlParts[urlParts.length - 1];
  };

  const getVereadorData = async () => {
    try {
      const response = await fetch('/static/javascript/infoGraficos.json');
      return await response.json();
    } catch (error) {
      console.error("Erro ao carregar o JSON:", error);
    }
  };

  const getVereadorInfoById = async (vereadorId) => {
    const vereadoresData = await getVereadorData();
    return vereadoresData.find(v => v.parlamentarID === vereadorId);
  };

  const criarGrafico = (dataIn, labelCategory) => {
    const ctx = document.getElementById('GraficoPerfil').getContext('2d');

    if (typeof graficoPerfil !== 'undefined') {
      graficoPerfil.destroy();
    }

    const labels = Object.values(labelsMap[labelCategory]);
    const colors = colorsMap[labelCategory];

    const datasets = Object.keys(labels).map((key, index) => ({
      label: labels[index],
      data: dataIn[index] || [0],
      backgroundColor: colors[`color${index + 1}`],
      borderColor: colors[`color${index + 1}`],
      borderWidth: 1,
    }));

    graficoPerfil = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labelCategory === 'frequencia' ? ['2024', '2023', '2022', '2021'] : [labelCategory === 'proposicoes' ? 'Proposições' : 'Leis'],
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
          y: {
            beginAtZero: true,
          },
          x: {
            ticks: {
              autoSkip: false,
              maxRotation: 0,
              minRotation: 0,
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            enabled: true,
          }
        }
      }
    });
  };

  const mostrarGraficoFrequencia = (vereador) => {
    const { frequencia } = vereador;
    const presencas = frequencia[0]?.frequenciaSituacaoAnos.map(f => f.quantidade) || [];
    const faltas = frequencia[1]?.frequenciaSituacaoAnos.map(f => f.quantidade) || [];
    const faltasJustificadas = frequencia[2]?.frequenciaSituacaoAnos.map(f => f.quantidade) || [];

    criarGrafico([presencas, faltas, faltasJustificadas], 'frequencia');
  };

  const mostrarGraficoProposicoes = (vereador) => {
    const { proposicoesApresentadas } = vereador;
    const emendas = proposicoesApresentadas.filter(p => p.tipo === 'Emenda').map(p => p.quantidade);
    const projetosDeLei = proposicoesApresentadas.filter(p => p.tipo === 'Projeto de Lei').map(p => p.quantidade);
    const indicacoes = proposicoesApresentadas.filter(p => p.tipo === 'Indicação').map(p => p.quantidade);
    const mocao = proposicoesApresentadas.filter(p => p.tipo === 'Moção').map(p => p.quantidade);
    const requerimento = proposicoesApresentadas.filter(p => p.tipo === 'Requerimento').map(p => p.quantidade);

    criarGrafico([emendas, projetosDeLei, indicacoes, mocao, requerimento], 'proposicoes');
  };

  const mostrarGraficoLeis = (vereador) => {
    const { normasApresentadas } = vereador;
    const decretosLegislativos = normasApresentadas.filter(n => n.tipo === 'Decreto Legislativo').map(n => n.quantidade);
    const emendasLeiOrganica = normasApresentadas.filter(n => n.tipo === 'Emenda à Lei Orgânica').map(n => n.quantidade);
    const leisOrdinarias = normasApresentadas.filter(n => n.tipo === 'Lei Ordinária').map(n => n.quantidade);
    const resolucoes = normasApresentadas.filter(n => n.tipo === 'Resolução').map(n => n.quantidade);

    criarGrafico([decretosLegislativos, emendasLeiOrganica, leisOrdinarias, resolucoes], 'leis');
  };

  const atualizarGrafico = (vereador) => {
    const select = document.querySelector('.select');
    const selectedOption = select.options[select.selectedIndex].text;

    switch (selectedOption) {
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
        console.log("Gráfico não encontrado para: " + selectedOption);
    }
  };

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

document.getElementById("enviarComentario").addEventListener("click", function() {
  // Exibir o alerta ao clicar no botão
  const alertaComentario = document.getElementById("alertaComentario");
  alertaComentario.style.display = "block";

  // Opcional: Ocultar o alerta automaticamente após alguns segundos
  setTimeout(() => {
    alertaComentario.style.display = "none";
  }, 3000); // Alerta desaparece após 3 segundos
});