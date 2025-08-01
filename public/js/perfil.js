document.addEventListener("DOMContentLoaded", async () => {
    const API_URL = "http://localhost:3000";
  
    try {
      const response = await fetch(`${API_URL}/user/profile`, {
        credentials: "include" // envia cookies (token JWT)
      });
  
      if (!response.ok) {
        throw new Error("Falha ao buscar dados do usuário");
      }
  
      const user = await response.json();
  
      // Atualiza o nickName
      const nickNameEl = document.getElementById("nickName");
      nickNameEl.textContent = user.nickName || "Usuário";
  
      // Atualiza imagem de perfil (se existir)
      if (user.avatarUrl) {
        const imgPerfil = document.getElementById("img-perfil");
        imgPerfil.src = user.avatarUrl;
      }
  
      // Atualiza imagem de banner (se existir)
      if (user.bannerUrl) {
        const imgBanner = document.getElementById("img-banner");
        imgBanner.src = user.bannerUrl;
      }
  
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
      alert("Não foi possível carregar o perfil. Tente novamente.");
    }
  });