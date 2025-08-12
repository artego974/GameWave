document.addEventListener("DOMContentLoaded", async () => {
  const API_URL = "http://localhost:3000";
  const userId = localStorage.getItem("userId"); // Substitua pelo ID real do usuário, se necessário
  console.log(userId);
  const user = localStorage.getItem("user")
  const avatarInput = document.getElementById("input-perfil");
  const bannerInput = document.getElementById("input-banner");
  const botaoCamera = document.getElementById("botao-camera");
  const changeBannerButton = document.getElementById("change-banner-button");

  const nickName = document.getElementById("nickName")

  // 1. Buscar dados do usuário ao carregar a página
  try {
    const response = await fetch(`${API_URL}/user/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) throw new Error("Erro ao buscar perfil");

    const user = await response.json();
    console.log(user);
    // Preencher dados no HTML
    document.getElementById("img-perfil").src = `${user.fotoPerfil}`;
    document.getElementById("img-banner").src = `${user.banerPerfil}`;
    document.getElementById("nickName").textContent = `${user.nickName}`;

  } catch (error) {
    console.error("Erro ao carregar perfil:", error);
    alert("Erro ao carregar dados do perfil.");
  }

  // 2. Abrir seletor de avatar
  botaoCamera.addEventListener("click", (e) => {
    e.preventDefault();
    avatarInput.click();
  });

  // 3. Abrir seletor de banner
  changeBannerButton.addEventListener("click", (e) => {
    e.preventDefault();
    bannerInput.click();
  });

  // 4. Upload do avatar
  avatarInput.addEventListener("change", async () => {
    const file = avatarInput.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_URL}/user/upload/avatar/${userId}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      document.getElementById("img-perfil").src = `${API_URL}${data.fotoPerfil}`;
      alert("Foto de perfil atualizada!");
    } catch (error) {
      console.error("Erro ao enviar avatar:", error);
      alert("Erro ao enviar avatar.");
    }
  });

  // 5. Upload do banner
  bannerInput.addEventListener("change", async () => {
    const file = bannerInput.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_URL}/user/upload/banner/${userId}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();
      document.getElementById("img-banner").src = `${API_URL}${data.banerPerfil}`;
      alert("Banner atualizado!");
    } catch (error) {
      console.error("Erro ao enviar banner:", error);
      alert("Erro ao enviar banner.");
    }
  });
});
