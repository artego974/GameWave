document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "http://localhost:3000/campeonato";
  const containerCards = document.querySelector("#container-campeonatos .rowCamp");
  const formPesquisa = document.getElementById("pesquisa-header");
  const inputPesquisa = formPesquisa.querySelector("input[name='pesquisa']");

  // if (!containerCards || !formPesquisa || !inputPesquisa) {
  //   console.error("Elementos necessários não encontrados no DOM.");
  //   return;
  // }

  // Função para criar um card de campeonato
  function criarCard(camp) {
    const col = document.createElement("div");
    col.className = "col";

    col.innerHTML = `
      <div class="card shadow-sm">
        <img class="card-img-top" src="${camp.fotoCampeonato || "https://via.placeholder.com/150"}" alt="Thumbnail">
        <div class="card-body">
          <h5 class="card-title">${camp.name}</h5>
          <p class="card-text">${camp.description || ""}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-secondary">Ver</button>
            </div>
            <small class="text-body-secondary">${camp.timeDate ? new Date(camp.timeDate).toLocaleDateString() : "Sem data"}</small>
          </div>
        </div>
      </div>
    `;

    return col;
  }

  // Função para exibir lista de campeonatos
  function exibirCampeonatos(lista) {
    containerCards.innerHTML = "";

    if (!lista || lista.length === 0) {
      containerCards.innerHTML = `<p class="text-center">Nenhum campeonato encontrado.</p>`;
      return;
    }

    lista.forEach(camp => {
      containerCards.appendChild(criarCard(camp));
    });
  }

  // Função para carregar todos os campeonatos (rota pública)
  async function carregarTodos() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`Erro ao carregar campeonatos: ${response.status}`);
      const data = await response.json();
      exibirCampeonatos(data);
    } catch (err) {
      console.error(err);
      containerCards.innerHTML = `<p class="text-center text-danger">Erro ao carregar campeonatos.</p>`;
    }
  }

  // Função para pesquisar campeonatos (rota pública, sem token)
  async function pesquisar(termo) {
    try {
      const response = await fetch(`${API_URL}/name?name=${encodeURIComponent(termo)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (!response.ok) throw new Error(`Erro na resposta da API: ${response.status}`);

      const data = await response.json();
      exibirCampeonatos(data);
    } catch (err) {
      console.error(err);
      containerCards.innerHTML = `<p class="text-center text-danger">Erro ao pesquisar campeonatos.</p>`;
    }
  }

  // Evento submit no formulário de pesquisa
  formPesquisa.addEventListener("submit", (e) => {
    e.preventDefault();

    const termo = inputPesquisa.value.trim();

    if (termo === "") {
      carregarTodos();
    } else {
      pesquisar(termo);
    }
  });

  // Carrega todos inicialmente
  carregarTodos();
});
