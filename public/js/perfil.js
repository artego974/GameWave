document.addEventListener("DOMContentLoaded", async () => {
  const API_URL = "http://localhost:3000";
  const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("Você precisa estar logado para entrar nesta pagina!");
    window.location.href = "../pages/singIN.html";
    return;
  }

  const avatarInput = document.getElementById("input-perfil");
  const bannerInput = document.getElementById("input-banner");
  const botaoCamera = document.getElementById("botao-camera");
  const changeBannerButton = document.getElementById("change-banner-button");
  const nickName = document.getElementById("nickName"); 

  const containerCampeonatos = document.querySelector("#container-campeonatos .rowCamp");

  // --- Função para criar card ---
  function criarCard(camp) {
    const col = document.createElement("div");
    col.className = "col";

    col.innerHTML = `
      <div class="card shadow-sm">
        <img class="card-img-top" src="${camp.fotoCampeonato || 'https://via.placeholder.com/150'}" alt="Thumbnail">
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

  // --- Função para exibir campeonatos ---
  function exibirCampeonatos(lista) {
    containerCampeonatos.innerHTML = "";
    if (!lista || lista.length === 0) {
      containerCampeonatos.innerHTML = `<p class="text-center">Nenhum campeonato encontrado.</p>`;
      return;
    }
    
    lista.forEach(camp => containerCampeonatos.appendChild(criarCard(camp)));
  }

  // --- Buscar dados do usuário ---
  try {
    const response = await fetch(`${API_URL}/user/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!response.ok) throw new Error("Erro ao buscar perfil");

    const user = await response.json();
    document.getElementById("img-perfil").src = `${user.fotoPerfil}`;
    document.getElementById("img-banner").src = `${user.banerPerfil}`;
    nickName.textContent = `${user.nickName}`;
  } catch (error) {
    console.error("Erro ao carregar perfil:", error);
    alert("Erro ao carregar dados do perfil.");
  }

  // // --- Buscar campeonatos do usuário ---
  // try {
  //   const resCamp = await fetch(`${API_URL}/campeonato`);
  //   if (!resCamp.ok) throw new Error("Erro ao carregar campeonatos");
  //   const campeonatos = await resCamp.json();
  //   const meusCampeonatos = campeonatos.filter(c => c.hostId == userId); // apenas do usuário logado
  //   exibirCampeonatos(meusCampeonatos);
  // } catch (error) {
  //   console.error("Erro ao carregar campeonatos:", error);
  //   containerCampeonatos.innerHTML = `<p class="text-center text-danger">Erro ao carregar campeonatos.</p>`;
  // }

  // --- Eventos de avatar e banner ---
  botaoCamera.addEventListener("click", e => {
    e.preventDefault();
    avatarInput.click();
  });

  changeBannerButton.addEventListener("click", e => {
    e.preventDefault();
    bannerInput.click();
  });

  avatarInput.addEventListener("change", async () => {
    const file = avatarInput.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch(`${API_URL}/user/upload/avatar/${userId}`, { method: "PUT", body: formData });
      const data = await res.json();
      document.getElementById("img-perfil").src = `${API_URL}${data.fotoPerfil}`;
      alert("Foto de perfil atualizada!");
    } catch (error) {
      console.error("Erro ao enviar avatar:", error);
      alert("Erro ao enviar avatar.");
    }
  });

  bannerInput.addEventListener("change", async () => {
    const file = bannerInput.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch(`${API_URL}/user/upload/banner/${userId}`, { method: "PUT", body: formData });
      const data = await res.json();
      document.getElementById("img-banner").src = `${API_URL}${data.banerPerfil}`;
      alert("Banner atualizado!");
    } catch (error) {
      console.error("Erro ao enviar banner:", error);
      alert("Erro ao enviar banner.");
    }
  });
});
