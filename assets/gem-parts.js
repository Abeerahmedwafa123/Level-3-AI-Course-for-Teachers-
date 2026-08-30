/* ============================================================
   Edulixa 360 — Level 3 · Session 2 behaviour
   Every component here operates a real example. Nothing is a picture.

   1. Same request, two destinations  (plain chat vs the Gem)
   2. The instruction block taken apart, seven parts
   3. The Gem screen — pressable hotspots
   4. The 31,000-character meter
   5. Symptom → the sentence you send back
   6. The live worksheet example (click to answer, real feedback, a score)
   7. The embedded builder — height bridge and full screen
   ============================================================ */
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function isAr() { return document.documentElement.getAttribute('dir') === 'rtl'; }

  /* A module that shows markup after load must translate it, or an Arabic page
     shows English. Always translate the subtree, never the whole document. */
  function tr(root) {
    if (window.EdulixaLang && root) window.EdulixaLang.translate(root, isAr());
  }

  /* ---------- a generic "press one, show its note" picker ----------
     chips:  [data-pick-go="key"]   inside a container [data-picker="NAME"]
     targets:[data-pick="key"]      anywhere on the page
     notes:  [data-pick-note="key"] inside [data-note-host="NAME"]         */
  function wirePickers() {
    document.querySelectorAll('[data-picker]').forEach(function (group) {
      var name = group.getAttribute('data-picker');
      var chips = group.querySelectorAll('[data-pick-go]');
      var host = document.querySelector('[data-note-host="' + name + '"]');
      var targets = document.querySelectorAll('[data-pick][data-pick-of="' + name + '"]');

      function show(key) {
        chips.forEach(function (c) {
          c.setAttribute('aria-pressed', String(c.getAttribute('data-pick-go') === key));
        });
        targets.forEach(function (t) {
          t.classList.toggle('is-lit', t.getAttribute('data-pick') === key);
        });
        if (host) {
          host.querySelectorAll('[data-pick-note]').forEach(function (n) {
            n.hidden = n.getAttribute('data-pick-note') !== key;
          });
          host.hidden = false;
        }
      }

      chips.forEach(function (c) {
        c.addEventListener('click', function () { show(c.getAttribute('data-pick-go')); });
      });
      /* the example itself is pressable too, not only its chip */
      targets.forEach(function (t) {
        if (t.tagName === 'BUTTON' || t.hasAttribute('data-pick-press')) {
          t.addEventListener('click', function () { show(t.getAttribute('data-pick')); });
        }
      });

      var first = chips[0];
      if (first) show(first.getAttribute('data-pick-go'));
    });
  }

  /* ---------- 1. Same request, two destinations ---------- */
  function wireTwoChats() {
    var run = document.getElementById('chat-run');
    if (!run) return;
    var msgs = [].slice.call(document.querySelectorAll('.chatlog .msg'));
    var timers = [];

    function clearTimers() { timers.forEach(clearTimeout); timers = []; }

    function play() {
      clearTimers();
      /* The exchange is on screen at rest — a component that starts empty
         reads as unfinished. Replaying hides it for one frame only. */
      msgs.forEach(function (m) { m.classList.remove('is-in'); m.classList.add('is-out'); });
      run.disabled = true;
      /* both columns advance together: a message with data-beat="2" in the left
         column appears at the same moment as data-beat="2" in the right one, so
         the two answers are always compared at the same stage. */
      var beats = {};
      msgs.forEach(function (m) {
        var b = parseInt(m.getAttribute('data-beat') || '1', 10);
        (beats[b] = beats[b] || []).push(m);
      });
      var keys = Object.keys(beats).sort(function (a, b) { return a - b; });
      keys.forEach(function (k, i) {
        var delay = reduce ? 0 : i * 620;
        timers.push(setTimeout(function () {
          beats[k].forEach(function (m) { m.classList.remove('is-out'); m.classList.add('is-in'); });
          if (i === keys.length - 1) run.disabled = false;
        }, delay));
      });
      if (reduce) run.disabled = false;
    }

    run.addEventListener('click', play);
  }

  /* ---------- 4. The character meter ----------
     CAP is where the paste is measured to stop; BUDGET is where we tell a
     teacher to stop, so there is margin for the browser and the paste method.
     Neither figure changes with the account's plan. */
  var CAP = 31000, BUDGET = 28000;
  function wireMeter() {
    var box = document.getElementById('cap-box');
    if (!box) return;
    var count = document.getElementById('cap-count');
    var bar = document.getElementById('cap-bar');
    var fill = bar.querySelector('i');
    var verdict = document.getElementById('cap-verdict');
    var kept = document.getElementById('cap-kept');
    var lost = document.getElementById('cap-lost');
    var lostWrap = document.getElementById('cap-lost-wrap');

    /* preload with the real Lesson Plan Architect text, so the meter says
       something true the moment the page opens */
    var seed = document.getElementById('gem-lesson-text');
    if (seed && !box.value) box.value = seed.value;

    function update() {
      var t = box.value || '';
      var n = t.length;
      count.textContent = n.toLocaleString('en-US');
      fill.style.width = Math.min(100, (n / 42000) * 100) + '%';
      bar.classList.remove('is-amber', 'is-red');
      verdict.classList.remove('is-red', 'is-amber');

      if (n > CAP) {
        bar.classList.add('is-red');
        verdict.classList.add('is-red');
        verdict.textContent = isAr()
          ? 'أطول من الحد بـ ' + (n - CAP).toLocaleString('en-US') + ' حرفًا. سيتوقف اللصق عند الحرف 31,000، بلا رسالة خطأ.'
          : 'Over the cut-off by ' + (n - CAP).toLocaleString('en-US') + ' characters. The paste stops at character 31,000, with no error message.';
        kept.textContent = t.slice(Math.max(0, CAP - 220), CAP);
        lost.textContent = t.slice(CAP, CAP + 320);
        lostWrap.hidden = false;
      } else if (n > BUDGET) {
        bar.classList.add('is-amber');
        verdict.classList.add('is-amber');
        verdict.textContent = isAr()
          ? 'يصل كاملًا، لكنه تجاوز حدّ الأمان 28,000. اختصره قبل أن تلصقه.'
          : 'It arrives, but it is past the safe budget of 28,000. Shorten it before you paste.';
        lostWrap.hidden = true;
      } else {
        verdict.textContent = isAr()
          ? 'يصل كاملًا، وداخل حدّ الأمان. باقٍ ' + (BUDGET - n).toLocaleString('en-US') + ' حرفًا.'
          : 'The whole block arrives, inside the safe budget. ' + (BUDGET - n).toLocaleString('en-US') + ' characters to spare.';
        lostWrap.hidden = true;
      }
    }

    box.addEventListener('input', update);
    window.addEventListener('edulixa:lang', update);
    document.querySelectorAll('[data-cap-load]').forEach(function (b) {
      b.addEventListener('click', function () {
        var src = document.getElementById(b.getAttribute('data-cap-load'));
        if (src) { box.value = src.value; update(); box.scrollTop = 0; }
      });
    });
    var dbl = document.getElementById('cap-double');
    if (dbl) dbl.addEventListener('click', function () {
      /* the honest way to show an over-cap block: take what is in the box and
         append the earlier draft's worth of extra rules to it */
      box.value = box.value + '\n\n' + box.value;
      update();
    });
    update();
  }

  /* ---------- 6. The live worksheet example ---------- */
  var PRAISE_EN = ['Well done!', 'Excellent!', 'That is right!', 'Great work!', 'Perfect!'];
  var PRAISE_AR = ['أحسنت!', 'ممتاز!', 'إجابة صحيحة!', 'عمل رائع!', 'رائع!'];
  function wireWorksheet() {
    var sheet = document.getElementById('ws-demo');
    if (!sheet) return;
    var S = { n: 0, ok: 0 };
    var chip = document.getElementById('ws-score');
    var cheer = document.getElementById('ws-cheer');
    var total = sheet.querySelectorAll('.wsopts').length;

    function tally() {
      if (chip) chip.textContent = (isAr() ? 'الدرجة ' : 'Score ') + S.ok + ' / ' + total;
      if (!cheer) return;
      if (S.n && S.n === total) {
        cheer.className = 'ws-cheer show' + (S.ok === total ? '' : ' part');
        cheer.textContent = S.ok === total
          ? (isAr() ? '🎉 الدرجة كاملة — ' + S.ok + ' من ' + total + '!' : '🎉 Full marks — ' + S.ok + ' out of ' + total + '!')
          : (isAr() ? 'حصلت على ' + S.ok + ' من ' + total + '. انظر الإجابات بالأحمر وحاول مرة أخرى.'
                    : 'You scored ' + S.ok + ' out of ' + total + '. Look at the answers in red and try those again.');
      }
    }

    sheet.querySelectorAll('.wsopt').forEach(function (el) {
      el.addEventListener('click', function () {
        var g = el.parentNode;
        if (g.dataset.done) return;
        g.dataset.done = '1';
        var ok = el.getAttribute('data-c') === '1';
        el.classList.add(ok ? 'ok' : 'no');
        if (!ok) {
          var right = g.querySelector('[data-c="1"]');
          if (right) right.classList.add('ok');
        }
        S.n++; if (ok) S.ok++;
        var fb = g.parentNode.querySelector('.wsfb');
        if (fb) {
          var praise = (isAr() ? PRAISE_AR : PRAISE_EN)[Math.floor(Math.random() * 5)];
          var wrong = isAr() ? g.getAttribute('data-fb-ar') : g.getAttribute('data-fb');
          fb.className = 'wsfb show ' + (ok ? 'good' : 'bad');
          fb.textContent = (ok ? '✅ ' : '❌ ') + (ok ? praise : (wrong || ''));
        }
        tally();
      });
    });

    var reset = document.getElementById('ws-reset');
    if (reset) reset.addEventListener('click', function () {
      S = { n: 0, ok: 0 };
      sheet.querySelectorAll('.wsopt').forEach(function (e) { e.classList.remove('ok', 'no'); });
      sheet.querySelectorAll('.wsopts').forEach(function (e) { delete e.dataset.done; });
      sheet.querySelectorAll('.wsfb').forEach(function (e) { e.className = 'wsfb'; e.textContent = ''; });
      if (cheer) { cheer.className = 'ws-cheer'; cheer.textContent = ''; }
      tally();
    });

    window.addEventListener('edulixa:lang', tally);
    tally();
  }

  /* ---------- download buttons for the two finished Gems ---------- */
  function wireDownloads() {
    document.querySelectorAll('[data-download]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var src = document.getElementById(btn.getAttribute('data-download'));
        if (!src) return;
        var b = new Blob([src.value], { type: 'text/markdown;charset=utf-8' });
        var u = URL.createObjectURL(b), a = document.createElement('a');
        a.href = u;
        a.download = (btn.getAttribute('data-filename') || 'gem-instructions') + '.md';
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(function () { URL.revokeObjectURL(u); }, 2000);
      });
    });
  }

  /* ---------- 7. The embedded builder ---------- */
  function wireLab() {
    var frame = document.getElementById('builder-frame');
    if (!frame) return;

    window.addEventListener('message', function (e) {
      if (!e.data || typeof e.data !== 'object') return;
      if (typeof e.data.edulixaLabHeight !== 'number') return;
      if (e.source !== frame.contentWindow) return;   /* only our own frame */
      var h = Math.max(520, Math.min(2600, e.data.edulixaLabHeight));
      frame.style.height = h + 'px';
    });

    var full = document.getElementById('builder-full');
    if (full) full.addEventListener('click', function () {
      var band = frame.closest('.lab-frame') || frame;
      if (band.requestFullscreen) band.requestFullscreen();
    });
  }

  function init() {
    wirePickers();
    wireTwoChats();
    wireMeter();
    wireWorksheet();
    wireDownloads();
    wireLab();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
