const openBtn = document.getElementById('menuButton');
  const sideMenu = document.getElementById('menuOverlay');

  openBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    sideMenu.classList.toggle('show');
  });

  document.addEventListener('click', function (e) {
    if (!sideMenu.contains(e.target) && !openBtn.contains(e.target)) {
      sideMenu.classList.remove('show');
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
  const btnConfig = document.getElementById("config-perfil");

  btnConfig.addEventListener("click", () => {
    window.location.href = "config.html"; 
  });
});

openBtn.addEventListener('click', function (e) {
  e.stopPropagation();
  sideMenu.classList.toggle('show');
});

document.addEventListener('click', function (e) {
  if (!sideMenu.contains(e.target) && !openBtn.contains(e.target)) {
    sideMenu.classList.remove('show');
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const btnConfig = document.getElementById("config-perfil");

  if (btnConfig) {
    btnConfig.addEventListener("click", () => {
      window.location.href = "config.html";
    });
  }

  const bannerInput = document.getElementById("input-banner");
  const bannerButton = document.getElementById("change-banner-button");
  const bannerImg = document.getElementById("img-banner");

  bannerButton.addEventListener("click", () => {
    bannerInput.click();
  });

  bannerInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      bannerImg.src = URL.createObjectURL(file);
    }
  });

  const perfilInput = document.getElementById("input-perfil");
  const perfilButton = document.getElementById("botao-camera");
  const perfilImg = document.getElementById("img-perfil");

  perfilButton.addEventListener("click", (e) => {
    e.preventDefault(); 
    perfilInput.click();
  });

  perfilInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      perfilImg.src = URL.createObjectURL(file);
    }
  });
});
