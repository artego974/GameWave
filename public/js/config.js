document.addEventListener("DOMContentLoaded", () => {
    const nicknameInput = document.getElementById("nickname");
    const nomeInput = document.getElementById("nome");
    const bannerInput = document.getElementById("banner");
    const fotoPerfilInput = document.getElementById("fotoPerfil");
    const temaSelect = document.getElementById("tema");
    const senhaAtualInput = document.getElementById("senhaAtual");
    const novaSenhaInput = document.getElementById("novaSenha");
    const salvarBtn = document.getElementById("salvar");
    const excluirContaBtn = document.getElementById("excluirConta");
  
    const userId = localStorage.getItem("userId");
  
    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo) {
      aplicarTema(temaSalvo);
      temaSelect.value = temaSalvo;
    }
  
    temaSelect.addEventListener("change", () => {
      const temaEscolhido = temaSelect.value;
      aplicarTema(temaEscolhido);
      localStorage.setItem("tema", temaEscolhido);
    });
  
    function aplicarTema(tema) {
      if (tema === "claro") {
        document.body.style.backgroundColor = "#ffffff";
        document.body.style.color = "#000000";
        document.querySelectorAll("input, select").forEach(el => {
          el.style.backgroundColor = "#f0f0f0";
          el.style.color = "#000000";
          el.style.border = "1px solid #ccc";
        });
        document.querySelector("p").style.color = "#333";
      } else {
        document.body.style.backgroundColor = "#0d1117";
        document.body.style.color = "#ffffff";
        document.querySelectorAll("input, select").forEach(el => {
          el.style.backgroundColor = "#161b22";
          el.style.color = "#c9d1d9";
          el.style.border = "1px solid #30363d";
        });
        document.querySelector("p").style.color = "#8b949e";
      }
    }
  
    salvarBtn.addEventListener("click", async () => {
      if (!userId) {
        alert("Usuário não autenticado.");
        return;
      }
  
      const formData = new FormData();
      formData.append("nickname", nicknameInput.value);
      formData.append("nome", nomeInput.value);
      formData.append("tema", temaSelect.value);
  
      if (bannerInput.files.length > 0) {
        formData.append("banner", bannerInput.files[0]);
      }
  
      if (fotoPerfilInput.files.length > 0) {
        formData.append("fotoPerfil", fotoPerfilInput.files[0]);
      }
  
      const senhaAtual = senhaAtualInput.value;
      const novaSenha = novaSenhaInput.value;
      if (senhaAtual && novaSenha) {
        formData.append("senhaAtual", senhaAtual);
        formData.append("novaSenha", novaSenha);
      }
  
      try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
          method: "PUT",
          body: formData,
        });
  
        if (response.ok) {
          alert("Perfil atualizado com sucesso!");
          window.location.href = "./perfil.html";
        } else {
          const erro = await response.json();
          alert("Erro ao atualizar perfil: " + erro.message);
        }
      } catch (error) {
        console.error("Erro ao conectar com o servidor:", error);
        alert("Erro ao conectar com o servidor.");
      }
    });
  
    excluirContaBtn.addEventListener("click", async () => {
      if (!userId) {
        alert("Usuário não autenticado.");
        return;
      }
  
      const confirmar = confirm("Tem certeza que deseja excluir sua conta? Esta ação não poderá ser desfeita.");
      if (!confirmar) return;
  
      try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
          method: "DELETE"
        });
  
        if (response.ok) {
          alert("Conta excluída com sucesso.");
          localStorage.clear();
          window.location.href = "./login.html";
        } else {
          const erro = await response.json();
          alert("Erro ao excluir conta: " + erro.message);
        }
      } catch (error) {
        console.error("Erro ao excluir conta:", error);
        alert("Erro ao conectar com o servidor.");
      }
    });
  });
  