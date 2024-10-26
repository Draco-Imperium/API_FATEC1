const labelsMap = {
    frequencia: {
      label1: "Presença",
      label2: "Faltas",
      label3: "Faltas Justificadas"
    },
    proposicoes: {
      label1: "Emenda",
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
    function getVereadorIdFromUrl() {
      const url = window.location.href;
      const parts = url.split('/');
      return parts[parts.length - 1];
    }
  
    async function getVereadorData() {
      try {
        const response = await fetch('/static/javascript/infoGraficos.json');
        return await response.json();
      } catch (error) {
        console.error("Erro ao carregar o JSON:", error);
      }
    }
  
    async function getVereadorInfoById(vereadorId) {
      const vereadoresData = await getVereadorData();
      return vereadoresData.find(v => v.parlamentarID == vereadorId);
    }
  
    function criarGrafico(dataIn, labelCategory) {
      const ctx = document.getElementById('GraficoPerfil').getContext('2d');
  
      if (window.GraficoPerfil instanceof Chart) {
        window.GraficoPerfil.destroy();
      }
  
      const labels = labelsMap[labelCategory];
      const colors = colorsMap[labelCategory];
  
      const datasets = Object.keys(labels).map((key, index) => ({
        label: labels[key],
        data: dataIn[index],
        backgroundColor: colors[`color${index + 1}`],
        borderColor: colors[`color${index + 1}`],
        borderWidth: 1,
      }));
  
      window.GraficoPerfil = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['2024', '2023', '2022', '2021'],
          datasets: datasets
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
      const emendas = proposicoes.filter(p => p.tipo === 'Emenda').map(p => p.quantidade);
      const projetosDeLei = proposicoes.filter(p => p.tipo === 'Projeto de Lei').map(p => p.quantidade);
      const indicacoes = proposicoes.filter(p => p.tipo === 'Indicação').map(p => p.quantidade);
      const mocao = proposicoes.filter(p => p.tipo === 'Moção').map(p => p.quantidade);
      const requerimento = proposicoes.filter(p => p.tipo === 'Requerimento').map(p => p.quantidade);
  
      criarGrafico([emendas, projetosDeLei, indicacoes, mocao, requerimento], 'proposicoes');
    }
  
    function mostrarGraficoLeis(vereador) {
      const normas = vereador.normasApresentadas;
      const decretosLegislativos = normas.filter(n => n.tipo === 'Decreto Legislativo').map(n => n.quantidade);
      const emendasLeiOrganica = normas.filter(n => n.tipo === 'Emenda à Lei Orgânica').map(n => n.quantidade);
      const leisOrdinarias = normas.filter(n => n.tipo === 'Lei Ordinária').map(n => n.quantidade);
      const resolucoes = normas.filter(n => n.tipo === 'Resolução').map(n => n.quantidade);
  
      criarGrafico([decretosLegislativos, emendasLeiOrganica, leisOrdinarias, resolucoes], 'leis');
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