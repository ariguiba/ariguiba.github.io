// ---------- Light / dark toggle: Auto -> Light -> Dark ----------
(function () {
  var root = document.documentElement;
  var button = document.querySelector('.theme-toggle');
  var label = document.querySelector('.theme-label');
  var order = ['auto', 'light', 'dark'];
  var names = { auto: 'Auto', light: 'Light', dark: 'Dark' };

  function show() { label.textContent = names[root.dataset.theme] || 'Auto'; }
  show();

  button.addEventListener('click', function () {
    var next = order[(order.indexOf(root.dataset.theme) + 1) % order.length];
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    show();
  });
})();

// ---------- News: show the first 5, expand on click ----------
(function () {
  var list = document.querySelector('.news');
  var button = document.querySelector('.news-toggle');
  if (!list || !button) return;

  if (list.children.length <= 5) { button.hidden = true; return; }

  button.addEventListener('click', function () {
    var collapsed = list.dataset.collapsed === 'true';
    list.dataset.collapsed = collapsed ? 'false' : 'true';
    button.textContent = collapsed ? 'Show less' : 'Show all news';
    button.setAttribute('aria-expanded', String(collapsed));
  });
})();

// ---------- Side rails: reading progress + active section ----------
(function () {
  var fill = document.querySelector('.progress');
  var pct = document.querySelector('.progress-pct');
  var links = Array.prototype.slice.call(document.querySelectorAll('.index a'));
  var sections = links
    .map(function (a) { return document.getElementById(a.dataset.section); })
    .filter(Boolean);

  function update() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    fill.style.setProperty('--scroll', (p * 100).toFixed(1) + '%');
    pct.textContent = Math.round(p * 100) + '%';

    var probe = window.innerHeight * 0.35;
    var active = 'top';
    sections.forEach(function (s) {
      if (s.id !== 'top' && s.getBoundingClientRect().top <= probe) active = s.id;
    });
    if (p > 0.995 && sections.length) active = sections[sections.length - 1].id;

    links.forEach(function (a) {
      a.classList.toggle('is-active', a.dataset.section === active);
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
