document.addEventListener("DOMContentLoaded", function () {
    const botaoCriar = document.querySelector("#buttom-quest button");
        const arquivoInput = document.getElementById("arquivo");
        const imagemPreview = document.getElementById("imagem-preview");
        const svgPlaceholder = document.querySelector('.card-img-wrapper svg');
    
        // Mostrar imagem ao selecionar o arquivo
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
        const data = document.getElementById("data").value.trim();  // ex: 2025-07-31
        const hora = document.getElementById("hora").value.trim();  // ex: 14:30

        if (!titulo || !descricao || !jogo || !jogadores || !data || !hora) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        // Criar string ISO datetime no formato "YYYY-MM-DDTHH:mm"
        const dateTime = `${data} ${hora}`;
        console.log(dateTime)

        try {
            const resposta = await fetch("http://localhost:3000/campeonato", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: titulo,
                    description: descricao,
                    nameGame: jogo,
                    numberOfPlayers: Number(jogadores), // mandar número como number
                    timedate: dateTime
                }),
                credentials: 'include' // só se precisar mesmo cookies
            });

            const texto = await resposta.text();

            if (!resposta.ok) {
                console.error("Erro do servidor:", texto);
                throw new Error("Erro ao enviar os dados.");
            }

            console.log("Sucesso:", texto);
            alert("Campeonato criado com sucesso!");
        } catch (erro) {
            console.error("Erro ao criar campeonato:", erro);
            alert("Erro ao criar campeonato.");
        }
    });
});
