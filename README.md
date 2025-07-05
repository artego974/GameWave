# 🎮 GameWave

Plataforma web para organizar e visualizar campeonatos de jogos online, com integração entre front-end dinâmico e back-end via API REST.

---

## ✅ Objetivo

Formalizar e divulgar campeonatos de jogos online com interface moderna e responsiva. O site permite visualizar campeonatos recentes, lives e informações dos jogadores, com backend fornecendo os dados por meio de uma API.

---

## 📁 Estrutura Geral
````
GameWave/
│
├── index.html
├── /pages/
│ ├── campeonatos.html
│ ├── lives.html
│ ├── perfil.html
│ ├── config.html
│ ├── singIN.html
│ └── singUP.html
│
├── /js/
│ ├── CriarCardCamp.js
│ ├── CriarCardLive.js
│ └── script.js
│
├── /css/
│ ├── style.css
│ └── header.css
│
├── /assets/
│ ├── logo.jfif
│ ├── logo-sem-fundo.png
│ └── imagens do carrossel`
````

---

## 🌐 Front-end

- HTML5, CSS3, JS, Bootstrap 5.3.6
- Carrossel de boas-vindas
- Cards dinâmicos de campeonatos (CriarCardCamp.js)
- Cards dinâmicos de lives (CriarCardLive.js)

---

## 🧠 Back-end

- Node.js + Express + banco de dados
- API com rotas REST

### Endpoints esperados:

- `GET http://localhost:3000/campeonato`
- `GET http://localhost:3000/live`

---

## ⚠️ Problemas atuais

### Front-end

- `CriarCardCamp.js` não funciona no `index.html`
  - Caminho do script pode estar errado
  - Estrutura HTML pode estar com `<div>` quebrado
  - Seletor `#container-campeonatos .row2` pode não existir
  - Falha na requisição `fetch`

- Imagens das lives com erro 403
  - Solução: usar imagens locais ou links sem restrição de CORS

### Back-end

- Verificar se o servidor está rodando
- Testar a rota: `http://localhost:3000/campeonato`
- Verificar erros no console do terminal

---

## ✅ Checklist de correções

- [ ] Corrigir caminho do `CriarCardCamp.js` no `index.html`
- [ ] Verificar estrutura HTML do `index.html` (divs)
- [ ] Garantir que a API está rodando e liberando CORS
- [ ] Substituir imagens externas com erro por locais
- [ ] Adicionar logs para depurar carregamento de dados
