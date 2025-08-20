document.addEventListener("DOMContentLoaded", () => {
  const btnEntrar = document.getElementById("entrar-btn");
  const campData = JSON.parse(localStorage.getItem("campData"));
  const userId = localStorage.getItem("userId");

  if (userId == null) {
    alert("Você precisa estar logado para entrar nesta página!");
    window.location.href = "../pages/singIN.html";
  }

  if (!campData) {
    window.location.href = "campeonatos.html";
    return;
  }

  // Preenche as informações
  document.querySelector(".info-title").textContent = campData.name;
  document.querySelector(".info-desc").textContent =
    campData.description && campData.description.trim() !== ""
      ? `Descrição: ${campData.description}`
      : "Sem descrição disponível";
  document.querySelector(".info-jogadores").textContent = `Jogadores: ${campData.numberOfPlayers}`;
  document.querySelector(".info-data").textContent = `Data: ${new Date(
    campData.date
  ).toLocaleDateString()}`;
  document.querySelector(".info-hora").textContent = `Hora: ${campData.time}`;

  // Exibe imagem (com fallback)
  const imagemPreview = document.querySelector("#imagem-preview");
  if (campData.fotoCampeonato && imagemPreview) {
    imagemPreview.src = campData.fotoCampeonato;
  }

  // Entrar no campeonato
  btnEntrar.addEventListener("click", async () => {
    try {
      const response = await fetch("http://localhost:3000/participantes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          CampId: campData.id,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert("Erro: " + error.message);
        return;
      }

      const data = await response.json();
      console.log("Participante cadastrado:", data);
      alert("Você entrou no campeonato com sucesso!");
    } catch (err) {
      console.error("Erro na requisição:", err);
      alert("Erro ao entrar no campeonato. Tente novamente.");
    }
  });
});
