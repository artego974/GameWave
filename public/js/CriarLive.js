

// Ao clicar no botão "Criar"
document.addEventListener('DOMContentLoaded', () => {
    const botaoCriar = document.querySelector('#buttom-quest button');

    botaoCriar.addEventListener('click', async () => {
        const inputs = document.querySelectorAll('.input-quest');
        const link = inputs[0].value.trim();
        const titulo = inputs[1].value.trim();
        const subtitulo = inputs[2].value.trim();
        const imagem = document.getElementById('arquivo').files[0];

        // Verificação dos campos obrigatórios
        if (!link || !titulo || !subtitulo || !imagem) {
            alert('Preencha todos os campos e selecione uma imagem.');
            return;
        }

        // Verificação do formato do link
        if (!validarURL(link)) {
            alert('Por favor, insira um link válido (deve começar com http:// ou https://).');
            return;
        }

        // Envio usando FormData
        const formData = new FormData();
        formData.append('link', link);
        formData.append('titulo', titulo);
        formData.append('subtitulo', subtitulo);
        formData.append('imagem', imagem);

        try {
            const resposta = await fetch('', {
                method: 'POST',
                body: formData
            });

            if (resposta.ok) {
                alert('Live criada com sucesso!');
                // Limpa os campos
                inputs.forEach(input => input.value = '');
                document.getElementById('arquivo').value = '';
                previewImagem(); // resetar imagem
            } else {
                alert('Erro ao enviar os dados. Verifique os campos e tente novamente.');
            }
        } catch (erro) {
            console.error('Erro:', erro);
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

    // Função para validar o link
    function validarURL(url) {
        try {
            const link = new URL(url);
            return link.protocol === 'http:' || link.protocol === 'https:';
        } catch (e) {
            return false;
        }
    }
});