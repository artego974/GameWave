
document.addEventListener("DOMContentLoaded", function () {
    const botaoCriar = document.querySelector("#buttom-quest button");

    botaoCriar.addEventListener("click", async function (event) {
        event.preventDefault();

        // Pega os inputs pela classe input-quest
        const inputs = document.querySelectorAll(".input-quest");

        // Captura dados do form
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

            // Pega arquivo da imagem
            const arquivoInput = document.getElementById("arquivo");
            if (arquivoInput.files.length > 0) {
                formData.append("arquivo", arquivoInput.files[0]);
            }

            const resposta = await fetch("", {
                method: "POST",
                body: formData,
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
    //função para pegar imagem dos arquivos do usuario 
    function previewImagem() {
        const arquivo = document.getElementById('arquivo').files[0];
        const preview = document.getElementById('imagem-preview');
        const svgPlaceholder = document.querySelector('.card-img-wrapper svg');

        if (arquivo) {
            const reader = new FileReader();

            reader.onload = function (e) {
                preview.src = e.target.result;
                preview.style.display = 'block';
                if (svgPlaceholder) svgPlaceholder.style.display = 'none';
            };

            reader.readAsDataURL(arquivo);
        } else {
            preview.src = '#';
            preview.style.display = 'none';
            if (svgPlaceholder) svgPlaceholder.style.display = 'block';
        }
    }

});