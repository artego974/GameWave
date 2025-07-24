const API_URL = "http://localhost:3000/user";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastroForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("nomeEscolhido").value.trim();
    const nickname = document.getElementById("nickNameEscolhido").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;
    const idadeConfirmada = document.getElementById("checkBox").checked;

    // Validações simples
    if (!name || !nickname || !email || !password || !confirmarSenha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (password !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    if (!idadeConfirmada) {
      alert("Você deve ter 16 anos ou mais para se cadastrar.");
      return;
    }
    const nickName = nickname
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          nickName,
          password
        })
      });

      const resultado = await response.json();

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        window.location.href = "./singIN.html";
      } else {
        alert(`Erro ao cadastrar: ${resultado.message || "Erro desconhecido"}`);
      }
    } catch (erro) {
      console.error("Erro na requisição:", erro);
      alert("Erro ao conectar com o servidor.");
    }
  });
});
