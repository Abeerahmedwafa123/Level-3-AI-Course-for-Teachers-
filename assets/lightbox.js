/* ============================================================
   Edulixa 360 — Level 3 · the full-screen picture viewer

   Opens any picture, or a set of pictures, big enough to read and to
   present from. Zoom, drag to pan, true full screen, and next/previous
   so the thirteen masterclass slides can be run as a slideshow.

   Use it from a page like this:
     EdulixaLightbox.open({ items:[{src:'…', label:'…'}], index:0 });

   Or declaratively — any element with data-lightbox opens the pictures
   named by the CSS selector in that attribute:
     <button data-lightbox="#deck-stage img">Full screen</button>

   Keyboard: ← → move, + − zoom, 0 fit, F full screen, Esc close.
   ============================================================ */
(function () {
  'use strict';

  var isAr = function () { return document.documentElement.getAttribute('dir') === 'rtl'; };
  var T = {
    close:   ['Close', 'إغلاق'],
    prev:    ['Previous', 'السابق'],
    next:    ['Next', 'التالي'],
    zin:     ['Zoom in', 'تكبير'],
    zout:    ['Zoom out', 'تصغير'],
    fit:     ['Fit to screen', 'ملاءمة الشاشة'],
    full:    ['Full screen', 'شاشة كاملة'],
    unfull:  ['Leave full screen', 'إنهاء الشاشة الكاملة'],
    hint:    ['Drag to move · + and − to zoom · arrows to change picture',
              'اسحب للتحريك · + و − للتكبير والتصغير · الأسهم لتغيير الصورة']
  };
  function label(el, key) {
    el.setAttribute('data-en-label', T[key][0]);
    el.setAttribute('data-ar-label', T[key][1]);
    el.setAttribute('aria-label', isAr() ? T[key][1] : T[key][0]);
    el.setAttribute('title', isAr() ? T[key][1] : T[key][0]);
  }
  function text(el, key) {
    el.setAttribute('data-en', T[key][0]);
    el.setAttribute('data-ar', T[key][1]);
    el.textContent = isAr() ? T[key][1] : T[key][0];
  }

  var box, stage, img, cap, count, btnPrev, btnNext, btnFull, hint;
  var items = [], at = 0, zoom = 1, ox = 0, oy = 0, dragging = false, sx = 0, sy = 0;

  function build() {
    if (box) return;
    box = document.createElement('dialog');
    box.id = 'lightbox';
    box.innerHTML =
      '<div class="lb-bar">' +
        '<div class="lb-left">' +
          '<button class="lb-btn" type="button" data-act="prev">‹</button>' +
          '<span class="lb-count"></span>' +
          '<button class="lb-btn" type="button" data-act="next">›</button>' +
        '</div>' +
        '<p class="lb-cap"></p>' +
        '<div class="lb-right">' +
          '<button class="lb-btn" type="button" data-act="zout">−</button>' +
          '<button class="lb-btn" type="button" data-act="fit">⤢</button>' +
          '<button class="lb-btn" type="button" data-act="zin">+</button>' +
          '<button class="lb-btn lb-full" type="button" data-act="full"></button>' +
          '<button class="lb-btn lb-close" type="button" data-act="close">×</button>' +
        '</div>' +
      '</div>' +
      '<div class="lb-stage"><img alt=""></div>' +
      '<p class="lb-hint"></p>';
    document.body.appendChild(box);
    if (window.EdulixaLang) window.EdulixaLang.translate(box);

    stage   = box.querySelector('.lb-stage');
    img     = box.querySelector('.lb-stage img');
    cap     = box.querySelector('.lb-cap');
    count   = box.querySelector('.lb-count');
    btnPrev = box.querySelector('[data-act="prev"]');
    btnNext = box.querySelector('[data-act="next"]');
    btnFull = box.querySelector('[data-act="full"]');
    hint    = box.querySelector('.lb-hint');

    label(btnPrev, 'prev');
    label(btnNext, 'next');
    label(box.querySelector('[data-act="zin"]'), 'zin');
    label(box.querySelector('[data-act="zout"]'), 'zout');
    label(box.querySelector('[data-act="fit"]'), 'fit');
    label(box.querySelector('[data-act="close"]'), 'close');
    text(hint, 'hint');

    box.addEventListener('click', function (e) {
      var b = e.target.closest('[data-act]');
      if (!b) { if (e.target === box || e.target === stage) close(); return; }
      var a = b.getAttribute('data-act');
      if (a === 'close') close();
      if (a === 'prev') go(at - 1);
      if (a === 'next') go(at + 1);
      if (a === 'zin') setZoom(zoom * 1.4);
      if (a === 'zout') setZoom(zoom / 1.4);
      if (a === 'fit') { setZoom(1); ox = oy = 0; paint(); }
      if (a === 'full') toggleFull();
    });

    box.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(isAr() ? at - 1 : at + 1); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); go(isAr() ? at + 1 : at - 1); }
      if (e.key === '+' || e.key === '=') { e.preventDefault(); setZoom(zoom * 1.4); }
      if (e.key === '-' || e.key === '_') { e.preventDefault(); setZoom(zoom / 1.4); }
      if (e.key === '0') { e.preventDefault(); setZoom(1); ox = oy = 0; paint(); }
      if (e.key === 'f' || e.key === 'F') { e.preventDefault(); toggleFull(); }
    });

    /* drag to pan, mouse and touch alike */
    stage.addEventListener('pointerdown', function (e) {
      if (zoom <= 1) return;
      dragging = true; sx = e.clientX - ox; sy = e.clientY - oy;
      stage.setPointerCapture(e.pointerId);
      stage.classList.add('is-dragging');
    });
    stage.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      ox = e.clientX - sx; oy = e.clientY - sy; paint();
    });
    var stop = function () { dragging = false; stage.classList.remove('is-dragging'); };
    stage.addEventListener('pointerup', stop);
    stage.addEventListener('pointercancel', stop);

    stage.addEventListener('dblclick', function () {
      if (zoom > 1) { setZoom(1); ox = oy = 0; paint(); } else setZoom(2.2);
    });

    document.addEventListener('fullscreenchange', paintFull);
    box.addEventListener('close', function () {
      if (document.fullscreenElement) { try { document.exitFullscreen(); } catch (e) {} }
    });
    window.addEventListener('edulixa:lang', function () {
      if (!box) return;
      label(btnPrev, 'prev'); label(btnNext, 'next');
      label(box.querySelector('[data-act="zin"]'), 'zin');
      label(box.querySelector('[data-act="zout"]'), 'zout');
      label(box.querySelector('[data-act="fit"]'), 'fit');
      label(box.querySelector('[data-act="close"]'), 'close');
      text(hint, 'hint');
      paintFull();
      paintCaption();
    });
  }

  function setZoom(z) {
    zoom = Math.min(6, Math.max(1, z));
    if (zoom === 1) { ox = oy = 0; }
    paint();
  }
  function paint() {
    img.style.transform = 'translate(' + ox + 'px,' + oy + 'px) scale(' + zoom + ')';
    stage.classList.toggle('is-zoomed', zoom > 1);
  }
  function paintFull() {
    if (!btnFull) return;
    var on = !!document.fullscreenElement;
    btnFull.textContent = on ? '⤡' : '⛶';
    label(btnFull, on ? 'unfull' : 'full');
  }
  function paintCaption() {
    var it = items[at];
    if (!it) return;
    cap.textContent = isAr() ? (it.labelAr || it.label || '') : (it.label || '');
    count.textContent = items.length > 1 ? (at + 1) + ' / ' + items.length : '';
    btnPrev.hidden = items.length < 2;
    btnNext.hidden = items.length < 2;
  }
  function go(i) {
    if (!items.length) return;
    at = (i + items.length) % items.length;
    img.setAttribute('src', items[at].src);
    img.setAttribute('alt', '');
    setZoom(1);
    paintCaption();
  }
  function toggleFull() {
    try {
      if (document.fullscreenElement) document.exitFullscreen();
      else if (box.requestFullscreen) box.requestFullscreen();
    } catch (e) {}
  }
  function close() { try { box.close(); } catch (e) { box.removeAttribute('open'); } }

  function open(opts) {
    build();
    items = (opts && opts.items) || [];
    if (!items.length) return;
    go(opts && opts.index ? opts.index : 0);
    paintFull();
    if (typeof box.showModal === 'function') box.showModal();
    else box.setAttribute('open', '');
    box.focus();
  }

  /* ---- declarative use: data-lightbox="<selector for the pictures>" ---- */
  function boot() {
    document.querySelectorAll('[data-lightbox]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var sel = btn.getAttribute('data-lightbox');
        var imgs = [].slice.call(document.querySelectorAll(sel));
        if (!imgs.length) return;
        var list = imgs.map(function (n) {
          return {
            src: n.getAttribute('src'),
            label: n.getAttribute('data-en-label') || n.getAttribute('alt') || '',
            labelAr: n.getAttribute('data-ar-label') || ''
          };
        });
        /* start on whichever picture is currently showing, if the page marks one */
        var start = imgs.findIndex(function (n) { return n.classList.contains('is-on'); });
        open({ items: list, index: start > -1 ? start : 0 });
      });
    });
  }

  window.EdulixaLightbox = { open: open };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
