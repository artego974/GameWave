const API_URL = "http://localhost:3000/campeonatos";

const row = document.querySelector(".container-cards .row");

// Função para gerar o card de cada campeonato
function criarCard(camp) {
  const col = document.createElement("div");
  col.className = "col";

  col.innerHTML = `
    <div class="card shadow-sm">
      <img class="card-img-top" src="${camp.imagem}" alt="Thumbnail">
      <div class="card-body">
        <h5 class="card-title">${camp.name}</h5>
        <p class="card-text">${camp.description}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button type="button" class="btn btn-sm btn-outline-secondary">Ver</button>
          </div>
          <small class="text-body-secondary">${camp.tempo || '0 min'}</small>
        </div>
      </div>
    </div>
  `;

  row.appendChild(col);
}

// Carregar dados reais da API
async function carregarCamp() {
  try {
    const response = await fetch(API_URL);
    const campeonatos = await response.json();

    // Limpa os cards antigos, se necessário
    row.innerHTML = "";

    campeonatos.forEach(camp => criarCard(camp));

  } catch (err) {
    console.error("Erro ao carregar campeonatos", err);
    alert("Erro ao carregar campeonatos.");
  }
}

// Chama a função ao carregar a página
carregarCamp();
