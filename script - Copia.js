// script.js

document.addEventListener("DOMContentLoaded", function () {
  const jsonData = {
    // Aqui você coloca o JSON fornecido (dados da API)
    "04/02/2025": [
      {
        "hora": "15:00",
        "titulo": "Liga dos Campeões da Ásia Elite",
        "time1": "Al-Hilal",
        "time2": "Persepolis",
        "emissoras": ["ESPN4", "DISNEY+"]
      },
      // ... (restante dos dados do JSON)
    ],
    "05/02/2025": [
      {
        "hora": "16:45",
        "titulo": "Copa da Alemanha",
        "time1": "Bayer Leverkusen",
        "time2": "Colônia",
        "emissoras": ["DISNEY+"]
      },
      // ... (restante dos dados do JSON)
    ],
    "": [
      {
        "hora": "20:00",
        "titulo": "Copa dos Campeões",
        "time1": "São João do Jaguaribe",
        "time2": "Estrela do Norte",
        "emissoras": ["CBFS TV"]
      }
    ]
  };

  const dateSelector = document.getElementById("date-selector");
  const tableBody = document.querySelector("#football-table tbody");

  // Função para preencher o seletor de datas
  function populateDateSelector(data) {
    const dates = Object.keys(data).filter(date => date !== ""); // Ignorar datas vazias
    dates.forEach(date => {
      const option = document.createElement("option");
      option.value = date;
      option.textContent = date;
      dateSelector.appendChild(option);
    });

    // Exibir os jogos da primeira data automaticamente
    if (dates.length > 0) {
      populateTable(data[dates[0]]);
    }
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
    populateTable(jsonData[selectedDate]);
  });

  // Iniciar o preenchimento do seletor de datas
  populateDateSelector(jsonData);
});