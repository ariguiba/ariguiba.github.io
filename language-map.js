// ==========================================================
//  Language map: settings
//  This is the only part you need to edit.
// ==========================================================
//
//  Each language I speak:
//    name      shown on the page
//    level     shown on the page
//    variety   the variety I actually speak (optional, shown on the page)
//    codes     ISO 639-3 codes that count as this language. Look them up in
//              assets/map/countries.js (e.g. German also has "gsw" for Swiss
//              German and "bar" for Austro-Bavarian).
//    home      ISO3 country codes of the variety I speak (mode 1)
//    dialects  true:  one of my main languages; all its countries join in mode 2
//              false: a language I can get by in; its countries join in mode 3
//    goal      true:  a language I want to learn; its countries join in mode 4
//
//  To add a language, add a line like:
//    { name: 'Turkish', level: 'Can get by', codes: ['tur'], home: [], dialects: false },
//
var LANGUAGE_MAP = {
  languages: [
    { name: 'Arabic',     level: 'Native',   variety: 'Tunisian',  codes: ['ara'],               home: ['TUN'], dialects: true },
    { name: 'French',     level: 'Native',                         codes: ['fra'],               home: ['FRA'], dialects: true },
    { name: 'German',     level: 'Fluent',                         codes: ['deu', 'gsw', 'bar'], home: ['DEU'], dialects: true },
    { name: 'English',    level: 'Fluent',   variety: 'American',  codes: ['eng'],               home: ['USA'], dialects: true },
    { name: 'Portuguese', level: 'Beginner', variety: 'Brazilian', codes: ['por'],               home: ['BRA'], dialects: true },
    // Languages I can get by in: no home country, so they only appear in mode 3
    { name: 'Spanish',    level: 'Can get by',                     codes: ['spa'],               home: [],      dialects: false },
    { name: 'Italian',    level: 'Can get by',                     codes: ['ita'],               home: [],      dialects: false },
    { name: 'Dutch',      level: 'Can get by',                     codes: ['nld'],               home: [],      dialects: false },
    // Languages I want to learn: goal: true keeps them out of modes 1-3, they only appear in mode 4
    { name: 'Turkish',    level: 'Goal',                           codes: ['tur'],               home: [],      goal: true },
    { name: 'Greek',      level: 'Goal',                           codes: ['ell'],               home: [],      goal: true },
    // Persian: fas = Iran, prs = Dari (Afghanistan), tgk = Tajik (Tajikistan)
    { name: 'Persian',    level: 'Goal',                           codes: ['fas', 'prs', 'tgk'], home: [],      goal: true }
  ],

  // Countries where a main language is official but NOT what most people
  // speak day to day. They move from mode 2 to mode 3 ("can get by").
  notMain: {
    Arabic: [
      'COM', // Comoros: Comorian
      'DJI', // Djibouti: Somali, Afar
      'ERI', // Eritrea: Tigrinya
      'ISR', // Israel: Hebrew
      'SOM'  // Somalia: Somali
    ],
    French: [
      'BDI', // Burundi: Kirundi
      'BEN', // Benin: Fon
      'BFA', // Burkina Faso: Mooré
      'CAF', // Central African Republic: Sango
      'COD', // DR Congo: Lingala, Swahili
      'COG', // Republic of the Congo: Kituba, Lingala
      'COM', // Comoros: Comorian
      'DJI', // Djibouti: Somali, Afar
      'GIN', // Guinea: Pular, Maninka
      'GNQ', // Equatorial Guinea: Spanish
      'HTI', // Haiti: Haitian Creole
      'LBN', // Lebanon: Arabic
      'MDG', // Madagascar: Malagasy
      'MLI', // Mali: Bambara
      'MUS', // Mauritius: Mauritian Creole
      'NER', // Niger: Hausa
      'RWA', // Rwanda: Kinyarwanda
      'SEN', // Senegal: Wolof
      'SYC', // Seychelles: Seychellois Creole
      'TCD', // Chad: Chadian Arabic
      'TGO', // Togo: Ewe
      'VUT'  // Vanuatu: Bislama
    ],
    German: [
      'NAM'  // Namibia: Oshiwambo, English
    ],
    English: [
      'BWA', 'CMR', 'ERI', 'FJI', 'FSM', 'GHA', 'GMB', 'IND', 'KEN', 'KIR',
      'LSO', 'MHL', 'MLT', 'MUS', 'MWI', 'MYS', 'NAM', 'NGA', 'NRU', 'PAK',
      'PHL', 'PLW', 'PNG', 'RWA', 'SDN', 'SLB', 'SLE', 'SSD', 'SWZ', 'SYC',
      'TON', 'TUV', 'TZA', 'UGA', 'VUT', 'WSM', 'ZAF', 'ZMB', 'ZWE'
      // e.g. India: Hindi, Kenya: Swahili, Nigeria: Hausa/Yoruba/Igbo, Malta: Maltese,
      // South Africa: Zulu/Xhosa, Philippines: Filipino, Pacific islands: local languages
    ],
    Portuguese: [
      'CPV', // Cape Verde: Cape Verdean Creole
      'GNB', // Guinea-Bissau: Guinea-Bissau Creole
      'GNQ', // Equatorial Guinea: Spanish
      'TLS'  // Timor-Leste: Tetum
    ]
  },

  // Also count dependent territories (Guam, Réunion, Bermuda, ...)?
  includeTerritories: false,

  // Hand corrections to the official-language data, per language name.
  // e.g. extra: { English: ['ISR'] }, exclude: { Arabic: ['ISR'] }
  extra: {},
  exclude: {}
};

// The modes build on each other: each mode keeps everything from the modes
// before it and adds the countries returned here.
//   lang      one language from the list above
//   official  the countries where that language is official
//   short     button text; label is used in the colour key
var LANGUAGE_MAP_MODES = [
  {
    short: 'Speak',
    label: 'Languages I speak',
    blurb: function () { return 'Where the variety I actually speak comes from.'; },
    adds: function (lang, official) { return lang.goal ? [] : lang.home; }
  },
  {
    short: 'Understand',
    label: 'Dialects I understand',
    blurb: function (langs) { return 'Plus every country whose main language is ' + listText(names(langs, 'main'), 'or') + '.'; },
    adds: function (lang, official) {
      var notMain = LANGUAGE_MAP.notMain[lang.name] || [];
      if (!lang.dialects || lang.goal) return [];
      return official.filter(function (iso3) { return notMain.indexOf(iso3) === -1; });
    }
  },
  {
    short: 'Get by',
    label: 'Where I could get by',
    blurb: function (langs) { return 'Plus ' + listText(names(langs, 'getby'), 'and') + ' countries, and where my languages are official but not the main one.'; },
    adds: function (lang, official) { return lang.goal ? [] : official; }
  },
  {
    short: 'Goal',
    label: 'My current goal',
    blurb: function (langs) { return 'Plus, in orange, where I could go once I learn ' + listText(names(langs, 'goal'), 'and') + '.'; },
    adds: function (lang, official) { return lang.goal ? official : []; }
  }
];

// ==========================================================
//  Everything below draws the map. No need to edit.
// ==========================================================
function names(langs, kind) {
  return langs.filter(function (l) {
    if (kind === 'goal') return l.goal;
    if (kind === 'main') return !l.goal && l.dialects;
    return !l.goal && !l.dialects;                    // 'getby'
  }).map(function (l) { return l.name; });
}

function listText(items, word) {
  if (items.length < 2) return items.join('');
  return items.slice(0, -1).join(', ') + ' ' + word + ' ' + items[items.length - 1];
}

(function () {
  var root = document.querySelector('[data-lang-map]');
  if (!root) return;
  if (!window.d3 || !window.topojson || !window.WORLD_110M || !window.COUNTRY_LANGUAGES) {
    root.querySelector('.lang-map-figure').textContent = 'The map could not load.';
    return;
  }

  var SVG = 'http://www.w3.org/2000/svg';
  var W = 960, H = 440;
  var cfg = LANGUAGE_MAP;
  var data = window.COUNTRY_LANGUAGES;            // ISO3 -> [name, numeric, independent, [lat, lng], codes]
  var byNumeric = {};
  Object.keys(data).forEach(function (iso3) { byNumeric[data[iso3][1]] = iso3; });

  // Countries where a language is official, after settings and hand corrections
  function officialIn(lang) {
    var out = Object.keys(data).filter(function (iso3) {
      var c = data[iso3];
      if (!cfg.includeTerritories && !c[2]) return false;
      return c[4].some(function (code) { return lang.codes.indexOf(code) !== -1; });
    });
    out = out.concat(cfg.extra[lang.name] || []);
    var ex = cfg.exclude[lang.name] || [];
    return out.filter(function (iso3) { return ex.indexOf(iso3) === -1; });
  }

  // For a mode: ISO3 -> list of my language indices spoken there,
  // counting this mode and every mode before it.
  // firstStep[ISO3] = the mode (1, 2, ...) where the country first appears; it sets the shade.
  var firstStep = {};
  function compute(modeIndex) {
    var result = {};
    firstStep = {};
    LANGUAGE_MAP_MODES.slice(0, modeIndex + 1).forEach(function (mode, step) {
      cfg.languages.forEach(function (lang, i) {
        mode.adds(lang, officialIn(lang)).forEach(function (iso3) {
          if (!data[iso3]) return;
          result[iso3] = result[iso3] || [];
          if (result[iso3].indexOf(i) === -1) result[iso3].push(i);
          if (!firstStep[iso3]) firstStep[iso3] = step + 1;
        });
      });
    });
    return result;
  }

  // ---------- Build the map once ----------
  var world = window.WORLD_110M;
  var geo = topojson.feature(world, world.objects.countries).features
    .filter(function (f) { return f.id !== '010'; });          // drop Antarctica
  var projection = d3.geoEqualEarth().fitExtent([[4, 4], [W - 4, H - 4]], { type: 'FeatureCollection', features: geo });
  var path = d3.geoPath(projection);

  var svg = document.createElementNS(SVG, 'svg');
  svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'World map of the countries where my languages are spoken. The full list is below the map.');

  var shapes = {};                                              // ISO3 -> element
  geo.forEach(function (f) {
    var el = document.createElementNS(SVG, 'path');
    el.setAttribute('d', path(f));
    el.setAttribute('class', 'lm-land');
    var iso3 = byNumeric[f.id];
    el.dataset.iso = iso3 || '';
    el.dataset.name = iso3 ? data[iso3][0] : f.properties.name;
    svg.appendChild(el);
    if (iso3) shapes[iso3] = el;
  });

  // Small countries the map is too coarse to draw become dots
  var dotLayer = document.createElementNS(SVG, 'g');
  svg.appendChild(dotLayer);
  Object.keys(data).forEach(function (iso3) {
    if (shapes[iso3]) return;
    var p = projection([data[iso3][3][1], data[iso3][3][0]]);
    if (!p) return;
    var g = document.createElementNS(SVG, 'g');
    g.setAttribute('class', 'lm-dot');
    g.dataset.iso = iso3;
    g.dataset.name = data[iso3][0];
    var hit = document.createElementNS(SVG, 'circle');
    hit.setAttribute('cx', p[0]); hit.setAttribute('cy', p[1]); hit.setAttribute('r', 9);
    hit.setAttribute('class', 'lm-hit');
    var dot = document.createElementNS(SVG, 'circle');
    dot.setAttribute('cx', p[0]); dot.setAttribute('cy', p[1]); dot.setAttribute('r', 4);
    g.appendChild(hit); g.appendChild(dot);
    dotLayer.appendChild(g);
    shapes[iso3] = g;
  });

  var figure = root.querySelector('.lang-map-figure');
  figure.appendChild(svg);
  var tip = document.createElement('div');
  tip.className = 'lm-tip';
  tip.hidden = true;
  figure.appendChild(tip);

  // ---------- Controls ----------
  var modeBar = root.querySelector('.lang-map-modes');
  var chipBar = root.querySelector('.lang-map-chips');
  var blurb = root.querySelector('.lang-map-blurb');
  var key = root.querySelector('.lang-map-key');
  var listTitle = root.querySelector('.lang-map-list summary');
  var listBody = root.querySelector('.lang-map-list p');

  var state = { mode: 0, focus: null, current: {} };

  LANGUAGE_MAP_MODES.forEach(function (m, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = (i + 1) + '. ' + (m.short || m.label);
    b.addEventListener('click', function () { state.mode = i; render(); });
    modeBar.appendChild(b);
  });

  cfg.languages.forEach(function (lang, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.innerHTML = '<span></span><small></small>';
    b.firstChild.textContent = lang.name;
    b.lastChild.textContent = lang.variety ? lang.variety + ' · ' + lang.level : lang.level;
    if (lang.goal) b.dataset.goal = '';
    b.addEventListener('click', function () { state.focus = state.focus === i ? null : i; render(); });
    chipBar.appendChild(b);
  });

  function langLabel(i) {
    var l = cfg.languages[i];
    return l.name + (l.variety ? ' (' + l.variety + ')' : '');
  }

  // ---------- Draw the current mode ----------
  function render() {
    var mode = LANGUAGE_MAP_MODES[state.mode];
    var all = compute(state.mode);
    var shown = {};
    Object.keys(all).forEach(function (iso3) {
      if (state.focus === null || all[iso3].indexOf(state.focus) !== -1) shown[iso3] = all[iso3];
    });
    state.current = all;

    Array.prototype.forEach.call(modeBar.children, function (b, i) { b.setAttribute('aria-pressed', String(i === state.mode)); });
    Array.prototype.forEach.call(chipBar.children, function (b, i) { b.setAttribute('aria-pressed', String(i === state.focus)); });
    blurb.textContent = mode.blurb(cfg.languages);

    // Shade = the step where the country first appears
    Object.keys(shapes).forEach(function (iso3) {
      shapes[iso3].dataset.n = shown[iso3] ? firstStep[iso3] : 0;
    });

    // Key: one swatch per step shown so far
    key.innerHTML = '';
    if (state.mode > 0) {
      LANGUAGE_MAP_MODES.slice(0, state.mode + 1).forEach(function (m, step) {
        var item = document.createElement('span');
        item.innerHTML = '<i data-n="' + (step + 1) + '"></i>';
        item.appendChild(document.createTextNode(m.label));
        key.appendChild(item);
      });
    }

    var names = Object.keys(shown).map(function (iso3) { return data[iso3][0]; }).sort();
    listTitle.textContent = names.length + (names.length === 1 ? ' country' : ' countries') + (state.focus !== null ? ' for ' + cfg.languages[state.focus].name : '');
    listBody.textContent = names.join(', ');
  }

  // ---------- Hover / tap tooltip ----------
  function showTip(e) {
    var el = e.target.closest('[data-iso]');
    if (!el || !el.dataset.name) { tip.hidden = true; return; }
    var langs = state.current[el.dataset.iso] || [];
    tip.innerHTML = '<strong></strong><span></span>';
    tip.firstChild.textContent = el.dataset.name;
    tip.lastChild.textContent = langs.length ? langs.map(langLabel).join(', ') : 'None of my languages (in this mode)';
    var box = figure.getBoundingClientRect();
    var x = e.clientX - box.left, y = e.clientY - box.top;
    tip.hidden = false;
    var left = Math.min(Math.max(x + 14, 0), box.width - tip.offsetWidth);
    var top = y - tip.offsetHeight - 12;
    if (top < 0) top = y + 18;
    tip.style.transform = 'translate(' + left + 'px,' + top + 'px)';
  }
  svg.addEventListener('pointermove', showTip);
  svg.addEventListener('pointerdown', showTip);
  svg.addEventListener('pointerleave', function () { tip.hidden = true; });

  render();
})();
