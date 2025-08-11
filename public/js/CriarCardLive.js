document.addEventListener('DOMContentLoaded', () => {
  const LIVE_API_URL = "http://localhost:3000/live";
  document.addEventListener("DOMContentLoaded", () => {
    carregarlive(); // ou carregarlive()
  });
  const rowLive = document.querySelector("#container-lives .rowLive");
  
  // Função para gerar o card de cada live
  function criarCard(live) {
    const col = document.createElement("div");
    col.className = "col";
  
    col.innerHTML = `
      <div class="card shadow-sm">
        <img class="card-img-top" src="${
          live.img || "https://via.placeholder.com/150"
        }"alt="Thumbnail">
          <h5 class="card-title">${live.titulo}</h5>
          <p class="card-text">${live.subtitulo}</p>
          <div class="d-flex justify-content-between align-items-center w-75">
            <div class="btn-group">
              <a href="${
                live.link
              }" target="_blank" class="btn btn-sm btn-outline-secondary">Ver</a>
            </div>
            <small class="text-body-secondary">${
              live.timeDate
                ? new Date(live.timeDate).toLocaleDateString()
                : "Sem data"
            }</small>
          </div>
        </div>
      </div>
    `;
  
    rowLive.appendChild(col);
  }
  
  // Carregar dados reais da API
  async function carregarlive() {
    try {
      const response = await fetch(LIVE_API_URL);
      const lives = await response.json();
      console.log("Lives recebidas:", lives);
  
      rowLive.innerHTML = "";
  
      lives.forEach((live) => criarCard(live));
    } catch (err) {
      console.error("Erro ao carregar lives", err);
      alert("Erro ao carregar lives.");
    }
  }
  
  // Chama a função ao carregar a página
  carregarlive();
})