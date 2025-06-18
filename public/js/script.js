document.addEventListener('DOMContentLoaded', function () {
  const openBtn = document.getElementById('menuButton');
  const sideMenu = document.getElementById('menuOverlay');

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
});
