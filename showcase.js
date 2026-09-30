// Vetrina delle funzioni: un pulsante per funzione, frecce e tasti ← → per scorrerle
(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.showcase-tab'));
  var slides = Array.prototype.slice.call(document.querySelectorAll('.showcase-slide'));
  if (!tabs.length) return;
  var current = 0;

  function show(index) {
    current = (index + slides.length) % slides.length;
    tabs.forEach(function (tab, i) {
      tab.classList.toggle('active', i === current);
      tab.setAttribute('aria-selected', String(i === current));
    });
    slides.forEach(function (slide, i) {
      slide.hidden = i !== current;
    });
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () {
      show(i);
    });
  });
  document.querySelector('.showcase-arrow.prev').addEventListener('click', function () {
    show(current - 1);
  });
  document.querySelector('.showcase-arrow.next').addEventListener('click', function () {
    show(current + 1);
  });
  // Un link come riftsense.github.io/#history apre direttamente quella funzione
  var linked = slides.findIndex(function (slide) {
    return slide.id === 'slide-' + location.hash.slice(1);
  });
  if (linked >= 0) show(linked);

  // Frecce della tastiera quando si è su un pulsante della vetrina
  document.querySelector('.showcase-tabs').addEventListener('keydown', function (event) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    show(current + (event.key === 'ArrowRight' ? 1 : -1));
    tabs[current].focus();
  });
})();
