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
    const nickNameWelcome = document.getElementById("nickNameWelcome");
    if (nickNameWelcome) {
      nickNameWelcome.textContent = user.nickName;
    }
  } catch (error) {
    console.error("Erro ao carregar perfil:", error);
    alert("Erro ao carregar dados do perfil.");
  }


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
