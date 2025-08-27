document.addEventListener("DOMContentLoaded", () => {
  const LIVE_API_URL = "http://localhost:3000/live";
  const rowLive = document.querySelector("#container-lives .rowLive");
  const formPesquisa = document.getElementById("pesquisa-header");
  const inputPesquisa = formPesquisa.querySelector("input");

  let lives = []; // guarda todas para filtrar depois

  // Função para gerar o card de cada live
  function criarCard(live) {
    const col = document.createElement("div");
    col.className = "col";
    console.log(live);
    col.innerHTML = `
      <div class="card shadow-sm">
        <img class="card-img-top" src="${live.img || "https://via.placeholder.com/150"}" alt="Thumbnail">
        <div class="card-body">
          <h5 class="card-title">${live.titulo}</h5>
          <p class="card-text">${live.subtitulo || ""}</p>
          <div class="d-flex justify-content-between align-items-center w-75">
            <div class="btn-group">
              <a href="${live.link}" target="_blank" class="btn btn-sm btn-outline-secondary">Ver</a>
            </div>
          </div>
        </div>
      </div>
    `;

    rowLive.appendChild(col);
  }

  // Exibir lista de lives
  function exibirLives(lista) {
    rowLive.innerHTML = "";

    if (!lista || lista.length === 0) {
      rowLive.innerHTML = `<p class="text-center">Nenhuma live encontrada.</p>`;
      return;
    }

    lista.forEach((live) => criarCard(live));
  }

  // Carregar dados da API
  async function carregarLives() {
    try {
      const response = await fetch(LIVE_API_URL);
      if (!response.ok) throw new Error(`Erro ao carregar lives: ${response.status}`);
      lives = await response.json();
      exibirLives(lives);
    } catch (err) {
      console.error("Erro ao carregar lives", err);
      rowLive.innerHTML = `<p class="text-center text-danger">Erro ao carregar lives.</p>`;
    }
  }

  // Filtrar lives
  function filtrarLives(termo) {
    const termoNormalizado = termo.toLowerCase().trim();
    if (termoNormalizado === "") {
      exibirLives(lives);
    } else {
      const filtradas = lives.filter(live =>
        live.titulo.toLowerCase().includes(termoNormalizado) ||
        (live.subtitulo && live.subtitulo.toLowerCase().includes(termoNormalizado))
      );
      exibirLives(filtradas);
    }
  }

  // Reutilizando o mesmo form de pesquisa (Enter filtra tanto campeonatos quanto lives)
  formPesquisa.addEventListener("submit", (e) => {
    e.preventDefault();
    filtrarLives(inputPesquisa.value);
  });

  // Carrega lives ao abrir
  carregarLives();
});
