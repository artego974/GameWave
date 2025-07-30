document.addEventListener('DOMContentLoaded', () => {
    const botaoCriar = document.querySelector('#buttom-quest button');
    const botaoEscolher = document.getElementById("arquivo");

    botaoCriar.addEventListener('click', async () => {
        const inputs = document.querySelectorAll('.input-quest');
        const link = document.getElementById("link").value.trim();
        const titulo = document.getElementById("titulo").value.trim();
        const subtitulo = document.getElementById("subtitulo").value.trim();
        const imagem = document.getElementById('arquivo').files[0];

        if (!link || !titulo || !subtitulo || !imagem) {
            alert('Preencha todos os campos e selecione uma imagem.');
            return;
        }

        if (!validarURL(link)) {
            alert('Por favor, insira um link válido (deve começar com http:// ou https://).');
            return;
        }

        try {
            const resposta = await fetch("http://localhost:3000/live", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ link, titulo, subtitulo }),
                credentials: "include"
            });
        
            const respostaTexto = await resposta.text(); // <-- Adicionado para debug
        
            if (resposta.ok) {
                alert('Live criada com sucesso!');
                inputs.forEach(input => input.value = '');
                document.getElementById('arquivo').value = '';
                previewImagem(); // resetar imagem
            } else {
                console.error("Erro do servidor:", resposta.status, respostaTexto);
                alert('Erro ao enviar os dados. Verifique os campos e tente novamente.\n\n' + respostaTexto);
            }
        } catch (erro) {
            console.error('Erro de conexão:', erro);
            alert('Erro ao conectar com o servidor.');
        }
        
    });

    // Função para mostrar o preview da imagem
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

    // Validar URL
    function validarURL(urlString) {
        try {
            const link = new URL(urlString);
            return link.protocol === 'http:' || link.protocol === 'https:';
        } catch (e) {
            return false;
        }
    }

    // Ouvir mudança no input de arquivo
    botaoEscolher.addEventListener("change", previewImagem);
});
