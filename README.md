# 🎮 GameWave

Plataforma web para organizar, criar e visualizar campeonatos e lives de jogos online, com integração total entre front-end dinâmico e back-end via API REST.

---

## ✅ Objetivo

Oferecer um ambiente centralizado para formalizar, divulgar e acompanhar campeonatos e transmissões ao vivo de jogos online.  
O GameWave proporciona uma interface moderna, responsiva e integrada, permitindo que os dados sejam consumidos diretamente do banco via API.

---


---

## 🌐 Front-end

- **Tecnologias:** HTML5, CSS3, JavaScript, Bootstrap 5.3.6
- **Funcionalidades:**
  - Carrossel de boas-vindas
  - Cards dinâmicos de campeonatos (`CriarCardCamp.js`)
  - Cards dinâmicos de lives (`CriarCardLive.js`)
  - Página de criação de lives com upload de imagem (`criarLive.js`)
  - Menu responsivo com botão “plus” para criação
  - Páginas de autenticação (login e cadastro)
  - Página de configurações com integração back-end

---

## 🧠 Back-end

- **Tecnologias:** Node.js, Express, TypeORM, Multer, JWT
- **Banco de Dados:** Integração com entidade de campeonatos e lives
- **Funcionalidades:**
  - API REST com rotas protegidas e abertas
  - Upload de imagens para lives e campeonatos
  - Autenticação via JWT

### Endpoints principais:

- `GET  http://localhost:3000/campeonato` — Lista campeonatos
- `GET  http://localhost:3000/live` — Lista lives
- `POST http://localhost:3000/live` — Cria nova live (com upload)
- `POST http://localhost:3000/auth/login` — Autenticação de usuário

---

## 🛠️ Status Atual

### Funciona:
- Listagem dinâmica de campeonatos e lives consumindo API
- Upload de imagem ao criar lives
- Alternância responsiva do menu
- Integração das páginas de configurações com backend

### Melhorias futuras:
- Validação avançada nos formulários
- Tratamento de erros visuais para requisições falhas
- Otimização de carregamento de imagens

---

## 🚀 Como executar

**Pré-requisitos:**
- Node.js 20+
- Banco de dados configurado no TypeORM
- Dependências instaladas:  
  ```bash
  npm install
  ```

**Passos:**
1. Inicie o servidor back-end:  
   ```bash
   npm start
   ```
2. Abra o `index.html` no navegador ou use um servidor local como Live Server.

---

## ✅ Checklist

- [x] Cards dinâmicos conectados ao banco
- [x] Upload de arquivos via Multer
- [x] Menu responsivo e botão de criação
- [x] Autenticação JWT
- [ ] Implementar pesquisa com filtro dinâmico em campeonatos/lives
- [ ] Adicionar testes automatizados no back-end
```

Se quiser, já posso incluir **prints das telas** e um **guia de instalação passo a passo** nesse mesmo código para deixar o README mais profissional.
