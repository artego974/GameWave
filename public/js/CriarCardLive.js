const API_URL = "http://localhost:3000/live";

const row = document.querySelector(".container-cards .row");

// Função para gerar o card de cada live
function criarCard(live) {
  const col = document.createElement("div");
  col.className = "col";

  col.innerHTML = `
    <div class="card shadow-sm">
      <img class="card-img-top" src="${live.imagem}" alt="Thumbnail">
      <div class="card-body">
        <h5 class="card-title">${live.titulo}</h5>
        <p class="card-text">${live.descricao}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button type="button" class="btn btn-sm btn-outline-secondary">Ver</button>
            <button type="button" class="btn btn-sm btn-outline-secondary">Editar</button>
          </div>
          <small class="text-body-secondary">${live.tempo || '0 min'}</small>
        </div>
      </div>
    </div>
  `;

  row.appendChild(col);
}

// Carregar dados reais da API
async function carregarlive() {
  try {
    const response = await fetch(API_URL);
    const live = await response.json();

    // Limpa os cards antigos, se necessário
    row.innerHTML = "";

    live.forEach(live => criarCard(live));

  } catch (err) {
    console.error("Erro ao carregar live", err);
    alert("Erro ao carregar live.");
  }
}

// Chama a função ao carregar a página
carregarlive();
