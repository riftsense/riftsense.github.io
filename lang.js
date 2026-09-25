// Lingua della pagina: quella scelta l'ultima volta, altrimenti quella del browser
(function () {
  var KEY = 'riftsense.site.lang';
  var saved = null;
  try {
    saved = localStorage.getItem(KEY);
  } catch (e) {
    saved = null;
  }
  var browser = (navigator.language || '').toLowerCase().indexOf('it') === 0 ? 'it' : 'en';

  function apply(lang) {
    document.body.dataset.lang = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-switch button').forEach(function (button) {
      button.classList.toggle('active', button.dataset.lang === lang);
    });
  }

  apply(saved === 'it' || saved === 'en' ? saved : browser);

  document.querySelectorAll('.lang-switch button').forEach(function (button) {
    button.addEventListener('click', function () {
      apply(button.dataset.lang);
      try {
        localStorage.setItem(KEY, button.dataset.lang);
      } catch (e) {
        // Senza localStorage la scelta vale solo per questa pagina
      }
    });
  });
})();
