document.addEventListener("DOMContentLoaded", () => {
  const nicknameInput = document.getElementById("nickname");
  const nomeInput = document.getElementById("nome");
  const bannerInput = document.getElementById("banner");
  const fotoPerfilInput = document.getElementById("fotoPerfil");
  const temaSelect = document.getElementById("tema");
  const senhaAtualInput = document.getElementById("senhaAtual");
  const novaSenhaInput = document.getElementById("novaSenha");

  const salvarBtn = document.getElementById("salvar");
  const excluirBtn = document.getElementById("excluirConta");

  const API_URL = "http://localhost:3000";

  // Buscar dados do usuário autenticado pelo token
  fetch(`${API_URL}/user/profile`, {
    credentials: "include"
  })
    .then(res => {
      if (!res.ok) throw new Error("Usuário não autenticado");
      return res.json();
    })
    .then(user => {
      const userId = user.id;

      nicknameInput.value = user.nickName || "";
      nomeInput.value = user.name || "";
      temaSelect.value = localStorage.getItem("tema") || "escuro";

      // Atualizar dados básicos
      salvarBtn.addEventListener("click", async () => {
        // Atualizar nome e nickname
        await fetch(`${API_URL}/user/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            name: nomeInput.value,
            nickName: nicknameInput.value
          })
        });

        // Atualizar senha (se fornecida)
        if (senhaAtualInput.value && novaSenhaInput.value) {
          await fetch(`${API_URL}/user/updatePassword/${userId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
              password: senhaAtualInput.value,
              newPassword: novaSenhaInput.value
            })
          });
        }

        // Upload de banner
        if (bannerInput.files.length > 0) {
          const formData = new FormData();
          formData.append("file", bannerInput.files[0]);

          await fetch(`${API_URL}/user/upload/banner/${userId}`, {
            method: "PUT",
            credentials: "include",
            body: formData
          });
        }

        // Upload de foto de perfil
        if (fotoPerfilInput.files.length > 0) {
          const formData = new FormData();
          formData.append("file", fotoPerfilInput.files[0]);

          await fetch(`${API_URL}/user/upload/avatar/${userId}`, {
            method: "PUT",
            credentials: "include",
            body: formData
          });
        }

        // Atualizar tema local
        localStorage.setItem("tema", temaSelect.value);

        alert("Configurações atualizadas com sucesso!");
      });

      // Excluir conta
      excluirBtn.addEventListener("click", async () => {
        const confirmar = confirm("Tem certeza que deseja excluir sua conta?");
        if (confirmar) {
          await fetch(`${API_URL}/user/${userId}`, {
            method: "DELETE",
            credentials: "include"
          });

          alert("Conta excluída com sucesso.");
          localStorage.clear();
          window.location.href = "../index.html";
        }
      });
    })
    .catch(err => {
      console.error(err);
      alert("Você precisa estar logado para acessar esta página.");
      window.location.href = "../pages/singIN.html";
    });
});
