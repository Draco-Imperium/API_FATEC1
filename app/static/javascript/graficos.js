function criarGrafico(data, label, descricao) {
    const ctx = document.getElementById("meuGrafico").getContext("2d");
  
    if (window.meuGrafico instanceof Chart) {
      window.meuGrafico.destroy();
    }
  
    window.meuGrafico = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"
        ],
        datasets: [{
          label: label,
          data: data,
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      }
    });
  
    const descricaoElemento = document.getElementById("descricao");
    if (descricaoElemento && typeof descricao === "string") {
      descricaoElemento.innerText = descricao;
    } else {
      descricaoElemento.innerText = "";
    }
  }
  
  function mostrarGraficoFrequencia() {
    const dadosFrequencia = [70, 75, 80, 85, 90, 95, 100, 85, 80, 75, 70, 65];
    const descricao = "Este gráfico ilustra o percentual de presenças, destacando a participação em eventos ao longo do período analisado.";
    criarGrafico(dadosFrequencia, "Frequência", descricao);
  }
  
  function mostrarGraficoFaltasJustificadas() {
    const dadosFaltasJustificadas = [5, 10, 8, 6, 4, 3, 2, 5, 7, 8, 9, 10];
    const descricao = "Este gráfico mostra as faltas justificadas ao longo do período.";
    criarGrafico(dadosFaltasJustificadas, "Faltas Justificadas", descricao);
  }
  
  function mostrarGraficoFaltasNaoJustificadas() {
    const dadosFaltasNaoJustificadas = [2, 3, 5, 4, 6, 7, 8, 5, 4, 3, 2, 1];
    const descricao = "Este gráfico mostra as faltas não justificadas ao longo do período.";
    criarGrafico(dadosFaltasNaoJustificadas, "Faltas Não Justificadas", descricao);
  }
  
  function mostrarGraficoLeis() {
    const dadosLeis = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65];
    const descricao = "Este gráfico mostra a quantidade de leis aprovadas ao longo do ano.";
    criarGrafico(dadosLeis, "Leis", descricao);
  }
  
  function mostrarGraficoResolucao() {
    const dadosResolucao = [5, 10, 15, 20, 25, 30, 35, 30, 25, 20, 15, 10];
    const descricao = "Este gráfico apresenta as resoluções aprovadas ao longo do ano.";
    criarGrafico(dadosResolucao, "Resoluções", descricao);
  }
  
  function mostrarGraficoMocoes() {
    const dadosMocoes = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];
    const descricao = "Este gráfico exibe as moções propostas durante o período.";
    criarGrafico(dadosMocoes, "Moções", descricao);
  }
  
  function mostrarGraficoEmendas() {
    const dadosEmendas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const descricao = "Este gráfico mostra as emendas feitas ao longo do ano.";
    criarGrafico(dadosEmendas, "Emendas", descricao);
  }
  
  function mostrarGraficoComissoesEspeciais() {
    const dadosComissoesEspeciais = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
    const descricao = "Este gráfico mostra a participação nas comissões especiais.";
    criarGrafico(dadosComissoesEspeciais, "Comissões Especiais", descricao);
  }
  
  function mostrarGraficoComissoesPermanentes() {
    const dadosComissoesPermanentes = [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48];
    const descricao = "Este gráfico apresenta a atividade das comissões permanentes.";
    criarGrafico(dadosComissoesPermanentes, "Comissões Permanentes", descricao);
  }
  
  function mostrarGraficoJustica() {
    const dadosJustica = [5, 10, 15, 20, 25, 30, 35, 30, 25, 20, 15, 10];
    const descricao = "Este gráfico ilustra a atividade de Justiça, Redação e Direitos Humanos.";
    criarGrafico(dadosJustica, "Justiça, Redação e Direitos Humanos", descricao);
  }
  
  function mostrarGraficoEtica() {
    const dadosEtica = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
    const descricao = "Este gráfico mostra a atividade da Comissão de Ética.";
    criarGrafico(dadosEtica, "Ética", descricao);
  }
  
  function mostrarGraficoPlanejamento() {
    const dadosPlanejamento = [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48];
    const descricao = "Este gráfico apresenta a atividade no planejamento urbano, obras e transportes.";
    criarGrafico(dadosPlanejamento, "Planejamento urbano, Obras e Transportes", descricao);
  }
  
  function mostrarGraficoMeioAmbiente() {
    const dadosMeioAmbiente = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];
    const descricao = "Este gráfico mostra a participação em questões ambientais.";
    criarGrafico(dadosMeioAmbiente, "Meio ambiente", descricao);
  }
  
  function mostrarGraficoEconomia() {
    const dadosEconomia = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23];
    const descricao = "Este gráfico mostra as atividades econômicas e financeiras.";
    criarGrafico(dadosEconomia, "Economia, Finanças e Orçamento", descricao);
  }
  
  function mostrarGraficoEducacao() {
    const dadosEducacao = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65];
    const descricao = "Este gráfico exibe a atividade na área de Educação e Promoção Social.";
    criarGrafico(dadosEducacao, "Educação e Promoção Social", descricao);
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const menuLinks = document.querySelectorAll(".dropdown-menu a");
  
    menuLinks.forEach((link) => {
      link.addEventListener("click", function (event) {
        event.preventDefault();
  
        const textoLink = this.textContent;
  
        switch (textoLink) {
          case "Percentual de presença":
            mostrarGraficoFrequencia();
            break;
          case "Faltas justificadas":
            mostrarGraficoFaltasJustificadas();
            break;
          case "Faltas não justificadas":
            mostrarGraficoFaltasNaoJustificadas();
            break;
          case "Leis":
            mostrarGraficoLeis();
            break;
          case "Resoluções":
            mostrarGraficoResolucao();
            break;
          case "Moções":
            mostrarGraficoMocoes();
            break;
          case "Emendas":
            mostrarGraficoEmendas();
            break;
          case "Especiais":
            mostrarGraficoComissoesEspeciais();
            break;
          case "Permanentes":
            mostrarGraficoComissoesPermanentes();
            break;
          case "Justiça, Redação e Direitos Humanos":
            mostrarGraficoJustica();
            break;
          case "Ética":
            mostrarGraficoEtica();
            break;
          case "Planejamento urbano, Obras e Tranportes":
            mostrarGraficoPlanejamento();
            break;
          case "Meio ambiente":
            mostrarGraficoMeioAmbiente();
            break;
          case "Economia, Finanças e Orçamento":
            mostrarGraficoEconomia();
            break;
          case "Educação e Promoção social":
            mostrarGraficoEducacao();
            break;
  
          default:
            console.log("Gráfico não encontrado para: " + textoLink);
        }
      });
    });
  });
  
  function toggleOptions() {
    var options = document.getElementById("sorting-options");
    if (options.style.display === "block") {
      options.style.display = "none";
    } else {
      options.style.display = "block";
    }
  }