document.addEventListener("DOMContentLoaded", () => {
  

  const salvarNameBtn = document.getElementById("btnAlterarNomeNick");
  const salvarNovaSenha = document.getElementById("btnAlterarSenha");
  const excluirBtn = document.getElementById("excluirConta");
  const userId = localStorage.getItem("userId");

  const API_URL = "http://localhost:3000";

  salvarNovaSenha.addEventListener("click", async () => {
    const senhaAtualInput = document.getElementById("senhaAtual").value.trim();
    const novaSenhaInput = document.getElementById("novaSenha").value.trim();

    if (!senhaAtualInput || !novaSenhaInput) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/user/updatePassword/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          password: senhaAtualInput,
          newPassword: novaSenhaInput
        })
      });

      if (response.ok) {
        alert("Senha alterada com sucesso!");
        console.log("Senha alterada");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Erro ao alterar senha!");
      }
    } catch (err) {
      alert("Erro de conexão ao alterar senha!");
      console.error("Erro:", err);
    }
  });

  salvarNameBtn.addEventListener("click", async () => {
    const nicknameValue = document.getElementById("nickname").value.trim();
    const nomeValue = document.getElementById("nome").value.trim();
  
    if (!nomeValue || !nicknameValue) {
      alert("Preencha todos os campos!");
      return;
    }
  
    try {
      const response = await fetch(`${API_URL}/user/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: nomeValue,
          nickName: nicknameValue
        })
      });
  
      if (response.ok) {
        alert("Nome e nickname alterados com sucesso!");
        console.log("Dados atualizados com sucesso!");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Erro ao alterar dados!");
      }
    } catch (err) {
      alert("Erro de conexão ao alterar os dados!");
      console.error("Erro:", err);
    }
  });

  
  excluirBtn.addEventListener("click", async () => {
    const confirmar = confirm("Tem certeza que deseja excluir sua conta?");
    if (!confirmar) return;
    try {

      

      const resDeletuser = await fetch(`${API_URL}/user/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      if (resDeletuser.ok) {
        alert("Conta excluída com sucesso.");
        localStorage.clear();
        window.location.href = "../index.html";
      } else {
        let errorMessage = "Erro ao excluir conta!";
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch {} 
        alert(errorMessage);
      }
    } catch (err) {
      alert("Erro de conexão ao excluir conta!");
      console.error("Erro:", err);
    }
  });
  
});
