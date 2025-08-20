document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "http://localhost:3000/campeonato";
  const containerCards = document.querySelector("#container-campeonatos .rowCamp");
  const formPesquisa = document.getElementById("pesquisa-header");
  const inputPesquisa = formPesquisa.querySelector("input");

  let campeonatos = []; // armazenar todos para filtrar depois

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
              <button type="button" class="btn btn-sm btn-outline-secondary" data-camp-id="${camp.id}">Ver</button>
            </div>
            <small class="text-body-secondary">${camp.date ? new Date(camp.date).toLocaleDateString() : "Sem data"}</small>
          </div>
        </div>
      </div>
    `;

    const botaoVer = col.querySelector("button");
    botaoVer.addEventListener("click", () => {
      localStorage.setItem("campData", JSON.stringify(camp));
      window.location.href = "entraCamp.html";
    });
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

  // Função para carregar todos os campeonatos
  async function carregarTodos() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`Erro ao carregar campeonatos: ${response.status}`);
      campeonatos = await response.json();
      exibirCampeonatos(campeonatos);
    } catch (err) {
      console.error(err);
      containerCards.innerHTML = `<p class="text-center text-danger">Erro ao carregar campeonatos.</p>`;
    }
  }

  // Função para filtrar campeonatos
  function filtrarCampeonatos(termo) {
    const termoNormalizado = termo.toLowerCase().trim();
    if (termoNormalizado === "") {
      exibirCampeonatos(campeonatos); // mostra todos se vazio
    } else {
      const filtrados = campeonatos.filter(camp => 
        camp.name.toLowerCase().includes(termoNormalizado) || 
        (camp.description && camp.description.toLowerCase().includes(termoNormalizado))
      );
      exibirCampeonatos(filtrados);
    }
  }

  // Evento de pesquisa (ao enviar o form ou apertar Enter)
  formPesquisa.addEventListener("submit", (e) => {
    e.preventDefault();
    filtrarCampeonatos(inputPesquisa.value);
  });

  // Carrega os campeonatos ao abrir a página
  carregarTodos();
});
