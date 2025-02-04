// script.js

document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://jogosnatv.com.br/api.php"; // URL da API externa

  const dateSelector = document.getElementById("date-selector");
  const tableBody = document.querySelector("#football-table tbody");

  // Função para buscar e exibir os dados da API
  async function fetchFootballData() {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Erro ao carregar os dados da API.");
      }
      const jsonData = await response.json();

      // Preencher o seletor de datas
      populateDateSelector(jsonData);

      // Exibir os jogos da primeira data automaticamente
      const firstDate = Object.keys(jsonData).filter(date => date !== "")[0];
      if (firstDate) {
        populateTable(jsonData[firstDate]);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar os jogos. Tente novamente mais tarde.");
    }
  }

  // Função para preencher o seletor de datas
  function populateDateSelector(data) {
    const dates = Object.keys(data).filter(date => date !== ""); // Ignorar datas vazias
    dates.forEach(date => {
      const option = document.createElement("option");
      option.value = date;
      option.textContent = date;
      dateSelector.appendChild(option);
    });
  }

  // Função para preencher a tabela
  function populateTable(matches) {
    tableBody.innerHTML = ""; // Limpar conteúdo anterior

    matches.forEach(match => {
      const row = document.createElement("tr");

      // Hora
      const timeCell = document.createElement("td");
      timeCell.textContent = match.hora;
      row.appendChild(timeCell);

      // Jogo
      const matchCell = document.createElement("td");
      matchCell.textContent = `${match.time1} x ${match.time2}`;
      row.appendChild(matchCell);

      // Competição
      const competitionCell = document.createElement("td");
      competitionCell.textContent = match.titulo;
      row.appendChild(competitionCell);

      // Onde Assistir
      const channelCell = document.createElement("td");
      channelCell.textContent = match.emissoras.join(", ");
      row.appendChild(channelCell);

      // Adicionar linha à tabela
      tableBody.appendChild(row);
    });
  }

  // Evento para mudar a data selecionada
  dateSelector.addEventListener("change", function () {
    const selectedDate = dateSelector.value;

    // Buscar os dados da API novamente para garantir consistência
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        populateTable(data[selectedDate] || []);
      })
      .catch(error => {
        console.error(error);
        alert("Erro ao carregar os jogos. Tente novamente mais tarde.");
      });
  });

  // Iniciar a busca dos dados
  fetchFootballData();
});