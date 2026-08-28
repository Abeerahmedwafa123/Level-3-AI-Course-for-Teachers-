/* ============================================================
   Edulixa 360 — Level 3 · shared behaviour
   1. EN/AR language toggle (full page, RTL mirroring, persisted)
   2. Language-aware files (href / src swap)
   3. Copy-to-clipboard for prompt boxes, and reset
   4. Rail step lamps (scroll to a block, remember what you lit)
   5. Popup cards
   6. Optional images — hide a figure whose file is not present yet
   ============================================================ */
(function () {
  'use strict';

  var KEY = 'edulixa-l3-lang';
  var LIT = 'edulixa-l3-lit:' + (location.pathname.split('/').pop() || 'index.html');

  /* ---------- 1. Language ---------- */

  /* Translate one subtree. A module that injects markup after the page has
     loaded MUST call EdulixaLang.translate(itsRoot), or its labels stay in
     English on a page that opened in Arabic. */
  function translate(root, isAr) {
    if (isAr === undefined) isAr = current() === 'ar';
    var scope = root || document;
    scope.querySelectorAll('[data-en]').forEach(function (el) {
      if (el.hasAttribute('data-lang-toggle') && !el.hasAttribute('data-lang-keep')) return;
      var v = isAr ? el.getAttribute('data-ar') : el.getAttribute('data-en');
      if (v !== null) el.textContent = v;
    });
    scope.querySelectorAll('[data-en-html]').forEach(function (el) {
      var v = isAr ? el.getAttribute('data-ar-html') : el.getAttribute('data-en-html');
      if (v !== null) el.innerHTML = v;
    });
    scope.querySelectorAll('[data-en-ph]').forEach(function (el) {
      var v = isAr ? el.getAttribute('data-ar-ph') : el.getAttribute('data-en-ph');
      if (v !== null) el.setAttribute('placeholder', v);
    });
    scope.querySelectorAll('[data-en-label]').forEach(function (el) {
      var v = isAr ? el.getAttribute('data-ar-label') : el.getAttribute('data-en-label');
      if (v !== null) el.setAttribute('aria-label', v);
    });
    scope.querySelectorAll('[data-en-href]').forEach(function (el) {
      var v = isAr ? el.getAttribute('data-ar-href') : el.getAttribute('data-en-href');
      if (v !== null) el.setAttribute('href', v);
    });
    scope.querySelectorAll('[data-en-src]').forEach(function (el) {
      var v = isAr ? el.getAttribute('data-ar-src') : el.getAttribute('data-en-src');
      if (v !== null && el.getAttribute('src') !== v) el.setAttribute('src', v);
    });
  }

  function apply(lang) {
    var isAr = lang === 'ar';
    var root = document.documentElement;
    root.setAttribute('lang', isAr ? 'ar' : 'en');
    root.setAttribute('dir', isAr ? 'rtl' : 'ltr');

    // Plain text nodes
    document.querySelectorAll('[data-en]').forEach(function (el) {
      var v = isAr ? el.getAttribute('data-ar') : el.getAttribute('data-en');
      if (v !== null) el.textContent = v;
    });
    // Rich (HTML) nodes
    document.querySelectorAll('[data-en-html]').forEach(function (el) {
      var v = isAr ? el.getAttribute('data-ar-html') : el.getAttribute('data-en-html');
      if (v !== null) el.innerHTML = v;
    });
    // Placeholders
    document.querySelectorAll('[data-en-ph]').forEach(function (el) {
      var v = isAr ? el.getAttribute('data-ar-ph') : el.getAttribute('data-en-ph');
      if (v !== null) el.setAttribute('placeholder', v);
    });
    // Accessible labels
    document.querySelectorAll('[data-en-label]').forEach(function (el) {
      var v = isAr ? el.getAttribute('data-ar-label') : el.getAttribute('data-en-label');
      if (v !== null) el.setAttribute('aria-label', v);
    });

    /* ---------- 2. Language-aware files ---------- */
    document.querySelectorAll('[data-en-href]').forEach(function (el) {
      var v = isAr ? el.getAttribute('data-ar-href') : el.getAttribute('data-en-href');
      if (v !== null) el.setAttribute('href', v);
    });
    document.querySelectorAll('[data-en-src]').forEach(function (el) {
      var v = isAr ? el.getAttribute('data-ar-src') : el.getAttribute('data-en-src');
      if (v !== null && el.getAttribute('src') !== v) el.setAttribute('src', v);
    });

    // Document title
    var t = document.querySelector('title');
    if (t && t.getAttribute('data-ar')) {
      document.title = isAr ? t.getAttribute('data-ar') : t.getAttribute('data-en');
    }
    // Toggle buttons show the language you can switch TO, unless they write their own
    document.querySelectorAll('[data-lang-toggle]').forEach(function (b) {
      if (b.hasAttribute('data-lang-keep')) return;
      b.textContent = isAr ? 'English' : 'العربية';
      b.setAttribute('aria-label', isAr ? 'Switch to English' : 'التبديل إلى العربية');
      b.setAttribute('lang', isAr ? 'en' : 'ar');
    });

    // A popup holds a COPY of text in the old language — close it on a flip
    var pop = document.getElementById('pop');
    if (pop && pop.open) pop.close();

    try { localStorage.setItem(KEY, lang); } catch (e) {}

    /* An embedded app is its own document, so it has to be told. This is what
       makes one button translate the page AND everything embedded in it. */
    document.querySelectorAll('iframe').forEach(function (f) {
      try { f.contentWindow.postMessage({ edulixaLang: lang }, '*'); } catch (e) {}
    });
    /* and the other way, so the toggle inside an embedded app flips the page
       around it too. The dir check in the listener stops this looping. */
    if (window.parent && window.parent !== window) {
      try { window.parent.postMessage({ edulixaLang: lang }, '*'); } catch (e) {}
    }

    window.dispatchEvent(new CustomEvent('edulixa:lang', { detail: { lang: lang } }));
  }

  function current() {
    try { return localStorage.getItem(KEY) === 'ar' ? 'ar' : 'en'; } catch (e) { return 'en'; }
  }

  /* Available to every module on the page from the moment this file parses. */
  window.EdulixaLang = {
    apply: function (lang) { apply(lang || current()); },
    translate: translate,
    current: current
  };

  /* ---------- The language bridge between a page and what it embeds ---------- */
  window.addEventListener('message', function (e) {
    var d = e.data;
    if (!d || typeof d !== 'object') return;
    // an embedded page has just loaded and is asking which language to use
    if (d.edulixaLangAsk && e.source) {
      try { e.source.postMessage({ edulixaLang: current() }, '*'); } catch (err) {}
      return;
    }
    // the page that embeds us has changed language. Compare against what is
    // actually rendered, not against localStorage: file:// pages share one
    // storage bucket, so the stored value is already the new one here.
    if (d.edulixaLang === 'ar' || d.edulixaLang === 'en') {
      var shown = document.documentElement.getAttribute('dir') === 'rtl' ? 'ar' : 'en';
      if (d.edulixaLang !== shown) apply(d.edulixaLang);
    }
  });

  function init() {
    apply(current());
    if (window.parent && window.parent !== window) {
      try { window.parent.postMessage({ edulixaLangAsk: true }, '*'); } catch (e) {}
    }
    document.querySelectorAll('[data-lang-toggle]').forEach(function (b) {
      b.addEventListener('click', function () {
        apply(current() === 'ar' ? 'en' : 'ar');
      });
    });

    /* ---------- 3. Copy buttons ---------- */
    /* A prompt box is either a <textarea> or a contenteditable div (the latter so the
       [FIELDS] a teacher must replace can be highlighted). Both are handled here. */
    var isEditable = function (box) { return box.tagName !== 'TEXTAREA'; };
    var readBox = function (box) { return isEditable(box) ? box.innerText : box.value; };

    /* file:// is not a secure context, so the course is normally opened with the
       async Clipboard API unavailable. The hidden-textarea path is the one that
       actually runs offline — keep it. */
    function copyText(text, done) {
      var legacy = function () {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:fixed;top:-1000px;left:0;opacity:0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta);
        done();
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, legacy);
      } else { legacy(); }
    }

    document.querySelectorAll('[data-copy]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var box = document.getElementById(btn.getAttribute('data-copy'));
        if (!box) return;
        copyText(readBox(box), function () {
          var note = btn.parentNode.querySelector('.copied');
          if (!note) return;
          note.textContent = document.documentElement.getAttribute('dir') === 'rtl'
            ? '✓ تم النسخ' : '✓ Copied';
          setTimeout(function () { note.textContent = ''; }, 2400);
        });
      });
    });

    /* Reset an edited prompt back to its original text */
    document.querySelectorAll('.prompt-box').forEach(function (box) {
      box.dataset.original = isEditable(box) ? box.innerHTML : box.value;
    });
    document.querySelectorAll('[data-reset]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var box = document.getElementById(btn.getAttribute('data-reset'));
        if (!box || box.dataset.original === undefined) return;
        if (isEditable(box)) box.innerHTML = box.dataset.original;
        else box.value = box.dataset.original;
      });
    });

    /* Click a highlighted field to select the whole thing, so typing replaces it */
    document.querySelectorAll('.prompt-box .ph').forEach(function (ph) {
      ph.addEventListener('click', function () {
        var r = document.createRange();
        r.selectNodeContents(ph);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(r);
      });
    });

    /* ---------- 4. Rail step lamps ---------- */
    var lit = {};
    try { lit = JSON.parse(localStorage.getItem(LIT) || '{}') || {}; } catch (e) { lit = {}; }
    document.querySelectorAll('.rail ol li[data-go]').forEach(function (li, i) {
      li.setAttribute('role', 'button');
      li.setAttribute('tabindex', '0');
      if (lit[i]) { li.classList.add('is-lit'); li.setAttribute('aria-pressed', 'true'); }
      else li.setAttribute('aria-pressed', 'false');

      var go = function () {
        li.classList.add('is-lit');
        li.setAttribute('aria-pressed', 'true');
        lit[i] = 1;
        try { localStorage.setItem(LIT, JSON.stringify(lit)); } catch (e) {}
        var target = document.getElementById(li.getAttribute('data-go'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      li.addEventListener('click', go);
      li.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
      });
    });

    /* ---------- 5. Popup cards ---------- */
    var pop = document.getElementById('pop');
    if (pop) {
      var lastTrigger = null;
      document.querySelectorAll('[data-pop]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var src = document.getElementById(btn.getAttribute('data-pop'));
          if (!src) return;
          var body = pop.querySelector('.pop-body');
          if (body) body.innerHTML = src.innerHTML;
          lastTrigger = btn;
          btn.classList.add('is-seen');
          if (typeof pop.showModal === 'function') pop.showModal();
          else pop.setAttribute('open', '');
        });
      });
      pop.addEventListener('click', function (e) {
        if (e.target === pop) pop.close();
      });
      pop.querySelectorAll('[data-pop-close]').forEach(function (b) {
        b.addEventListener('click', function () { pop.close(); });
      });
      pop.addEventListener('close', function () {
        if (lastTrigger) lastTrigger.focus();
      });
    }

    /* ---------- 6. Optional images ---------- */
    /* A figure whose screenshot has not been dropped into assets/ yet hides itself
       instead of showing a broken-image icon. Add the file and it appears. */
    document.querySelectorAll('img[data-optional]').forEach(function (img) {
      var hide = function () {
        var f = img.closest('figure');
        if (f) f.hidden = true;
      };
      img.addEventListener('error', hide);
      if (img.complete && img.naturalWidth === 0) hide();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
