document.addEventListener("DOMContentLoaded", () => {
    // Recupera os dados do campeonato do localStorage
    const campData = JSON.parse(localStorage.getItem("campData"));
  
    // Se não houver dados no localStorage, redireciona de volta para a página anterior
    if (!campData) {
      window.location.href = "campeonatos.html"; // Ou qualquer outra página de sua escolha
      return;
    }
  
    // Preenche as informações na página
    document.querySelector(".info-title").textContent = campData.name;
    document.querySelector(".info-jogo").textContent = `Jogo: ${campData.nameGame};`
    document.querySelector(".info-desc").textContent = `descrição: ${campData.description}` || "Sem descrição disponível";
    document.querySelector(".info-jogadores").textContent = `Jogadores: ${campData.numberOfPlayers};`
    document.querySelector(".info-data").textContent =`Data: ${new Date(campData.date).toLocaleDateString()};` 
    document.querySelector(".info-hora").textContent = `Hora: ${campData.time};`
  
    // Exemplo de como exibir a foto do campeonato se existir
    const imagemPreview = document.getElementById("imagem-preview");
    imagemPreview.src = campData.fotoCampeonato || "https://via.placeholder.com/150";
  
    
  });
