document.addEventListener('DOMContentLoaded', function () {
  const API_URL = "http://localhost:3000/campeonato";
  const API_URL2 = "http://localhost:3000/live";
  // --- MENU RESPONSIVO (configurações) ---
  const openBtn = document.getElementById('menuButton');
  const sideMenu = document.getElementById('menuOverlay');

  // --- MENU PLUS (Criar Live / Camp) ---
  const plusBtn = document.getElementById('plusButton');
  const plusMenu = document.getElementById('plusOverlay');

  // --- Pesquisar ---
  const Pesquisar = document.getElementById('pesquisar-header')

  // const campLives = []
  // Pesquisar.addEventListener("submit", (e) => {
  //   let PesquisarValue = Pesquisar.value
  //   if (PesquisarValue) {
  //     let arrayPesquisados = []
  //     let pesquisarLimpo = PesquisarValue.toLowerCase().trim();
  //     informacoesJogos.forEach((i) => {
  //       if (i.nome.toLowerCase().trim().includes(pesquisarLimpo)) {
  //         arrayPesquisados.push(i)
  //         // console.log(arrayPesquisados)
  //       }
  //     })
  //     mostrarValores()

  //   } else {
  //     arrayFinal = informacoesJogos
  //     mostrarValores()

  //   }


  // })

  openBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    sideMenu.classList.toggle('show');
    sideMenu.classList.toggle('hide');
  });

  document.addEventListener('click', function (e) {
    if (!sideMenu.contains(e.target) && !openBtn.contains(e.target)) {
      sideMenu.classList.remove('show');
      sideMenu.classList.add('hide');
      openBtn.style.display = 'block';
    }
  });

  sideMenu.addEventListener('click', function (e) {
    e.stopPropagation();
    sideMenu.classList.remove('show');
    sideMenu.classList.add('hide');
    openBtn.style.display = 'block';
  });

  plusBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    plusMenu.classList.toggle('show');
    plusMenu.classList.toggle('hide');
  });

  document.addEventListener('click', function (e) {
    if (!plusMenu.contains(e.target) && !plusBtn.contains(e.target)) {
      plusMenu.classList.remove('show');
      plusMenu.classList.add('hide');
    }
  });

  plusMenu.addEventListener('click', function (e) {
    e.stopPropagation();
  });
});
