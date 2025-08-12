document.addEventListener('DOMContentLoaded', () => {
  const API_URL = "http://localhost:3000/campeonato";

  const rowC = document.querySelector("#container-campeonatos .rowCamp");

  if (!rowC) {
    console.error("card não encontrado")
  }
  // Função para gerar o card de cada campeonato
  function criarCard(camp) {
    const col = document.createElement("div");
    col.className = "col";

    col.innerHTML = `
      <div class="card shadow-sm">
        <img id="imgCamp" class="card-img-top" src="${camp.fotoCampeonato || "https://via.placeholder.com/150"
      }" alt="Thumbnail">
        <div class="card-body">
          <h5 class="card-title">${camp.name}</h5>
          <p class="card-text">${camp.description}</p>
          <div class="d-flex justify-content-between align-items-center ">
            <div class="btn-group">
              <a type="button" id=${camp.id} class="btn btn-sm btn-outline-secondary">Ver</a>
            </div>
            <small class="text-body-secondary">${camp.timeDate
        ? new Date(camp.timeDate).toLocaleDateString()
        : "Sem data"
      }</small>
          </div>
        </div>
      </div>
    `;

    rowC.appendChild(col);
  }

  // Carregar dados reais da API
  async function carregarCamp() {
    try {
      const response = await fetch(API_URL);
      const campeonatos = await response.json();

      campeonatos.forEach((camp) => criarCard(camp));
    } catch (err) {
      console.error("Erro ao carregar campeonatos", err);
      alert("Erro ao carregar campeonatos.", err);
    }
  }

  // Chama a função ao carregar a página
  carregarCamp();
})