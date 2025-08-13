document.addEventListener("DOMContentLoaded", function () {
    const API_URL = "http://localhost:3000";
    const hostId = localStorage.getItem("userId");
    const botaoCriar = document.querySelector("#buttom-quest button");
    const arquivoInput = document.getElementById("arquivo");
    const imagemPreview = document.getElementById("imagem-preview");
    const svgPlaceholder = document.querySelector('.card-img-wrapper svg');

    // Pré-visualizar imagem
    arquivoInput.addEventListener("change", function () {
        const arquivo = arquivoInput.files[0];
        if (arquivo) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imagemPreview.src = e.target.result;
                imagemPreview.style.display = 'block';
                if (svgPlaceholder) svgPlaceholder.style.display = 'none';
            };
            reader.readAsDataURL(arquivo);
        } else {
            imagemPreview.src = '#';
            imagemPreview.style.display = 'none';
            if (svgPlaceholder) svgPlaceholder.style.display = 'block';
        }
    });

    botaoCriar.addEventListener("click", async function (event) {
        event.preventDefault();

        const titulo = document.getElementById("titulo").value.trim();
        const descricao = document.getElementById("descricao").value.trim();
        const jogo = document.getElementById("jogo").value.trim();
        const jogadores = document.getElementById("numJogadores").value.trim();
        const data = document.getElementById("data").value.trim();
        const hora = document.getElementById("hora").value.trim();

        if (!titulo || !descricao || !jogo || !jogadores || !data || !hora) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        try {
            // Primeiro cria o campeonato
            const respCriar = await fetch(`${API_URL}/campeonato`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: titulo,
                    description: descricao,
                    nameGame: jogo,
                    numberOfPlayers: Number(jogadores),
                    time: hora,
                    date: data,
                    hostId: hostId
                }),
                credentials: 'include'
            });

            if (!respCriar.ok) {
                const erroTexto = await respCriar.text();
                console.error("Erro do servidor:", erroTexto);
                throw new Error("Erro ao criar campeonato.");
            }

            const campeonato = await respCriar.json();
            console.log("Campeonato criado:", campeonato);

            // Depois envia o banner (se houver)
            const file = arquivoInput.files[0];
            if (file) {
                const formData = new FormData();
                formData.append("file", file);

                const respUpload = await fetch(`${API_URL}/campeonato/upload/banner/${campeonato.id}`, {
                    method: "PUT",
                    body: formData,
                    credentials: "include"
                });

                if (!respUpload.ok) {
                    const erroUpload = await respUpload.text();
                    console.error("Erro upload:", erroUpload);
                    throw new Error("Erro ao enviar banner.");
                }

                const uploadData = await respUpload.json();
                console.log("Banner enviado:", uploadData);
            }

            alert("Campeonato criado com sucesso!");
        } catch (erro) {
            console.error("Erro:", erro);
            alert("Ocorreu um erro ao criar o campeonato.");
        }
    });
});