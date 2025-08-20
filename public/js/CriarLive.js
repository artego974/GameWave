document.addEventListener('DOMContentLoaded', () => {
    const botaoCriar = document.querySelector('#buttom-quest button');
    const botaoEscolher = document.getElementById("arquivo");
    const API_URL = "http://localhost:3000";
    const hostId = localStorage.getItem("userId")
    if(hostId == null){
        alert("Você precisa estar logado para entrar nesta pagina!")
        window.location.href = "../pages/singIN.html"
      }
    

    botaoCriar.addEventListener('click', async () => {
        const inputs = document.querySelectorAll('.input-quest');
        const link = document.getElementById("link").value.trim();
        const titulo = document.getElementById("titulo").value.trim();
        const subtitulo = document.getElementById("subtitulo").value.trim();
        const arquivo = botaoEscolher.files[0]; // arquivo real

        // validações
        if (!link || !titulo || !subtitulo || !arquivo) {
            alert('Preencha todos os campos e selecione uma imagem.');
            return;
        }

        if (!validarURL(link)) {
            alert('Por favor, insira um link válido (deve começar com http:// ou https://).');
            return;
        }

        try {
            // cria a live
            const resposta = await fetch(`${API_URL}/live`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ link, titulo, subtitulo, hostId }),
                credentials: "include"
            });

            const respostaTexto = await resposta.text();
            let live;
            try { live = JSON.parse(respostaTexto); } catch { live = {}; }

            if (!resposta.ok || !live.id) {
                console.error("Erro do servidor:", resposta.status, respostaTexto);
                alert('Erro ao criar a live.');
                return;
            }

            // envia o banner
            const formData = new FormData();
            formData.append("file", arquivo);

            const respUpload = await fetch(`${API_URL}/live/upload/banner/${live.id}`, {
                method: "PUT",
                body: formData,
                credentials: "include"
            });

            if (!respUpload.ok) {
                const erroUpload = await respUpload.text();
                console.error("Erro upload:", erroUpload);
                throw new Error("Erro ao enviar banner.");
            }

            alert('Live criada com sucesso!');
            inputs.forEach(input => input.value = '');
            botaoEscolher.value = '';
            previewImagem(); // resetar preview

        } catch (erro) {
            console.error('Erro de conexão:', erro);
            alert('Erro ao conectar com o servidor.');
        }
    });

    // preview da imagem
    function previewImagem() {
        const arquivo = botaoEscolher.files[0];
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

    // validar URL
    function validarURL(urlString) {
        try {
            const link = new URL(urlString);
            return link.protocol === 'http:' || link.protocol === 'https:';
        } catch {
            return false;
        }
    }

    // mudança no input de arquivo
    botaoEscolher.addEventListener("change", previewImagem);
});