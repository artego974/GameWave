// Aguarda o carregamento completo do DOM antes de executar qualquer lógica
document.addEventListener("DOMContentLoaded", function () {

  // Obtém os elementos HTML usados na lógica de login/cadastro

  // voces tinham escrito const botao = dpppppcument.getElementById("nextSingIN")
  const botao = document.getElementById("nextSingIN")
  const formulario = document.getElementById("container");       // Container principal do formulário (pode conter login ou cadastro)

  /**
   * Função que processa o login do usuário.
   * Impede o envio tradicional do formulário, coleta os dados e envia uma requisição POST para a API.
   * Se o login for bem-sucedido, exibe mensagem e redireciona para a tela principal.
   */
  formulario.addEventListener("submit",async (e) => {
    e.preventDefault(); // Evita recarregar a página
    

    // Coleta os dados inseridos nos campos
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("senha").value;

    try {
      // Envia os dados para a API de login
      const res = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ email, password }), // Converte os dados para JSON
      });

      if (res.ok) {
        // Se o login foi bem-sucedido
        alert("Usuario logado")
        const data = await res.json();
        console.log(data.user);
        localStorage.setItem("userId", data.user.id)
        localStorage.setItem("user", data.user)
        formulario.style.display = "none";       // Esconde o formulário
        setTimeout(() => {
          window.location.href = "../index.html"; // Redireciona após 1.5s
        }, 1500);
      } else {
        // Se houve erro, exibe a mensagem da API (ou uma mensagem genérica)
        const data = await res.json();
        alert(data.message || "Erro ao fazer login");
      }
    } catch (error) {
      alert("Erro na requisição: " + error.message); // Erro de rede ou execução
    }
  })
});


