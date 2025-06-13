document.addEventListener('DOMContentLoaded', function () {
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

  sideMenu.addEventListener('click', function (e) {
    e.stopPropagation();
  });
});
