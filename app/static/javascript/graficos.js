function criarGrafico(data, label, descricao) {
    const ctx = document.getElementById("meuGrafico").getContext("2d");
  
    if (window.meuGrafico instanceof Chart) {
      window.meuGrafico.destroy();
    }
  
    window.meuGrafico = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Amélia Naomi", "Dr. José Claudio", "Dulce Rita", "Fabião Zagueiro", "Fernando Petiti", "Juliana Fraga", "Juvenil Silvério", "Júnior da Farmácia", "Lino Bispo", "Marcão da Academia", "Marcelo Garcia", "Milton Vieira Filho", "Rafael Pascucci", "Renato Santiago", "Robertinho da Padaria", "Roberto Chagas", "Roberto do Eleven", "Rogério da Acasem", "Thomaz Henrique", "Walter Hayashi", "Zé Luís"
        ],
        datasets: [{
          label: label,
          data: data,
          backgroundColor: "#2f4fac",
          borderColor: "#1e3a8a",
          borderWidth: 1,
        }]
      },
      options: {
        scales: {
          x: {
            barPercentage: 0.5,
            categoryPercentage: 0.5
          },
          y: {
            beginAtZero: true,
          }
        }
      },
      responsive: true
    });
  
    const descricaoElemento = document.getElementById("descricao");
    if (descricaoElemento && typeof descricao === "string") {
      descricaoElemento.innerText = descricao;
    } else {
      descricaoElemento.innerText = "";
    }
  }
  
  function mostrarGraficoFrequencia() {
    const dadosFrequencia = [70, 75, 80, 85, 90, 95, 100, 85, 80, 75, 70, 65, 85, 70, 60, 100, 90, 80, 75, 60, 100];
    const descricao = "Este gráfico ilustra o percentual de presenças ao longo do período analisado.";
    criarGrafico(dadosFrequencia, "Frequência", descricao);
  }
  
  function mostrarGraficoFaltasJustificadas() {
    const dadosFaltasJustificadas = [5, 10, 8, 6, 4, 3, 2, 5, 7, 8, 9, 10, 1, 2, 1, 5, 3, 4, 1, 1, 3];
    const descricao = "Este gráfico ilustra as faltas justificadas ao longo do período.";
    criarGrafico(dadosFaltasJustificadas, "Faltas Justificadas", descricao);
  }
  
  function mostrarGraficoFaltasNaoJustificadas() {
    const dadosFaltasNaoJustificadas = [2, 3, 5, 4, 6, 7, 8, 5, 4, 3, 2, 1, 0, 0, 2, 3, 1, 4, 2, 1, 4];
    const descricao = "Este gráfico ilustra as faltas não justificadas ao longo do período.";
    criarGrafico(dadosFaltasNaoJustificadas, "Faltas Não Justificadas", descricao);
  }
  
  function mostrarGraficoLeis() {
    const dadosLeis = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 50, 45, 30, 40, 50, 60, 65, 40, 45];
    const descricao = "Este gráfico ilustra a quantidade de leis aprovadas ao longo do ano.";
    criarGrafico(dadosLeis, "Leis", descricao);
  }
  
  function mostrarGraficoResolucao() {
    const dadosResolucao = [5, 10, 15, 20, 25, 30, 35, 30, 25, 20, 15, 10, 15, 20, 30, 25, 40, 20, 20, 15, 35];
    const descricao = "Este gráfico ilustra as resoluções aprovadas ao longo do ano.";
    criarGrafico(dadosResolucao, "Resoluções", descricao);
  }
  
  function mostrarGraficoMocoes() {
    const dadosMocoes = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 4, 8, 10, 12, 15, 20, 18, 5, 10];
    const descricao = "Este gráfico ilustra as moções propostas durante o período.";
    criarGrafico(dadosMocoes, "Moções", descricao);
  }
  
  function mostrarGraficoEmendas() {
    const dadosEmendas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 2, 8, 10, 4, 4, 6, 8, 9, 1];
    const descricao = "Este gráfico ilustra as emendas feitas ao longo do ano.";
    criarGrafico(dadosEmendas, "Emendas", descricao);
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