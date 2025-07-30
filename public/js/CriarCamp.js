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

        const inputs = document.querySelectorAll(".input-quest");

        const dados = {
            titulo: inputs[0].value,
            descricao: inputs[1].value,
            jogo: inputs[2].value,
            jogadores: parseInt(inputs[3].value),
            data: inputs[4].value,
            hora: inputs[5].value,
        };

        try {
            const formData = new FormData();
            formData.append("titulo", dados.titulo);
            formData.append("descricao", dados.descricao);
            formData.append("jogo", dados.jogo);
            formData.append("jogadores", dados.jogadores);
            formData.append("data", dados.data);
            formData.append("hora", dados.hora);

            if (arquivoInput.files.length > 0) {
                formData.append("arquivo", arquivoInput.files[0]);
            }

            // 🔴 Substitua pela URL real da sua API
            const resposta = await fetch("http://localhost:3000/campeonato", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: formData,
                credentials: 'include'
            });

            if (!resposta.ok) throw new Error("Erro ao enviar os dados");

            const resultado = await resposta.json();
            console.log("Sucesso:", resultado);
            alert("Campeonato criado com sucesso!");
        } catch (erro) {
            console.error("Erro:", erro);
            alert("Erro ao criar campeonato.");
        }
    });
});
