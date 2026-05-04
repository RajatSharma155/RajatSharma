/* portfolio.js — renders all content from data/portfolio.json */
(function () {
  'use strict';

  /* ── safe text escape ───────────────────────────────────── */
  var _esc = document.createElement('div');
  function e(s) { _esc.textContent = String(s); return _esc.innerHTML; }

  /* ── category → slug map ────────────────────────────────── */
  var CAT_SLUG = {
    'Computer Architecture':                     'arch',
    'Computer Architecture / Microarchitecture': 'arch',
    'RTL / ASIC / VLSI':                         'vlsi',
    'VLSI Design / RTL / ASIC':                  'vlsi',
    'Verification':                              'verif',
    'Robotics / Embedded':                       'robot'
  };
  var CAT_LABEL = {
    'Computer Architecture':                     'Computer Architecture',
    'Computer Architecture / Microarchitecture': 'Computer Architecture',
    'RTL / ASIC / VLSI':                         'RTL / ASIC / VLSI',
    'VLSI Design / RTL / ASIC':                  'VLSI / RTL / ASIC',
    'Verification':                              'Verification',
    'Robotics / Embedded':                       'Robotics'
  };

  /* ── helpers ─────────────────────────────────────────────── */
  function el(id)  { return document.getElementById(id); }
  function qs(sel) { return document.querySelector(sel); }
  function qsa(sel){ return document.querySelectorAll(sel); }

  /* ── boot ────────────────────────────────────────────────── */
  initThemeToggle();
  var d = PORTFOLIO_DATA;
  renderHero(d.personal);
  wireResumeBtn(d.personal.resumeFile);
  initCounters();
  initDarkBackground();
  renderSkills(d.skills);
  renderExperience(d.experience);
  renderProjects(d.projects);
  renderEducation(d.education);
  renderContact(d.personal);
  renderFooter(d.personal);
  initNav();
  initScrollReveal();
  initTyping(d.personal.taglines || [d.personal.tagline]);
  initContactForm(d.personal.formEndpoint);
  el('footer-year').textContent = new Date().getFullYear();

  /* ============================================================
     HERO
  ============================================================ */
  function renderHero(p) {
    el('hero-name').textContent  = p.name;
    el('hero-bio').textContent   = p.objective;
    el('hero-photo').src         = p.photo;
    el('hero-photo').alt         = p.name;

    el('hero-stats').innerHTML = (p.stats || []).map(function(s){
      return '<div class="hero-stat">' +
        '<span class="hero-stat-value">' + e(s.value) + '</span>' +
        '<span class="hero-stat-label">' + e(s.label) + '</span>' +
        '</div>';
    }).join('');
  }

  /* ============================================================
     THEME TOGGLE — dark ↔ light, persisted in localStorage
  ============================================================ */
  function initThemeToggle() {
    var btn  = el('theme-toggle');
    var icon = el('theme-icon');
    if (!btn) return;

    function apply(light) {
      document.documentElement.classList.toggle('light', light);
      icon.className = light ? 'fas fa-moon' : 'fas fa-sun';
      initDarkBackground();
      initLightBackground();
    }

    /* restore saved preference (anti-FOUC already ran in <head>) */
    apply(localStorage.getItem('rs-theme') === 'light');

    btn.addEventListener('click', function() {
      var isLight = !document.documentElement.classList.contains('light');
      apply(isLight);
      try { localStorage.setItem('rs-theme', isLight ? 'light' : 'dark'); } catch(e) {}
    });
  }

  /* ============================================================
     LIGHT BACKGROUND — full-page animated canvas (light mode only)
  ============================================================ */
  var _lightBgRaf = null;
  function initLightBackground() {
    var root   = document.documentElement;
    var cvs    = document.getElementById('light-bg-canvas');

    /* dark mode: remove canvas and stop loop */
    if (!root.classList.contains('light')) {
      if (cvs) cvs.remove();
      _lightBgRaf = null;
      return;
    }
    /* already running */
    if (cvs && _lightBgRaf) return;
    if (cvs) cvs.remove();

    var canvas = document.createElement('canvas');
    canvas.id  = 'light-bg-canvas';
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;';
    document.body.insertBefore(canvas, document.body.firstChild);

    var ctx = canvas.getContext('2d');
    var W = 0, H = 0, frame = 0;

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    /* orbs: x,y as fractions, r as fraction of max dimension */
    var orbs = [
      { x:0.12, y:0.10, r:0.48, vx:0.00016, vy:0.00014, c:'99,102,241',  a:0.20 },
      { x:0.88, y:0.82, r:0.44, vx:-0.00013, vy:0.00018, c:'14,165,233', a:0.16 },
      { x:0.55, y:0.42, r:0.36, vx:0.00018, vy:-0.00015, c:'236,72,153', a:0.13 },
      { x:0.78, y:0.15, r:0.30, vx:-0.00020, vy:0.00014, c:'16,185,129', a:0.10 },
      { x:0.18, y:0.78, r:0.32, vx:0.00015, vy:-0.00018, c:'245,158,11', a:0.09 },
      { x:0.45, y:0.90, r:0.26, vx:-0.00014, vy:0.00016, c:'99,102,241', a:0.08 }
    ];

    function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

    function draw(ts) {
      if (!root.classList.contains('light')) { _lightBgRaf = null; return; }
      _lightBgRaf = requestAnimationFrame(draw);
      frame++;

      /* base fill */
      ctx.fillStyle = '#f5f7ff';
      ctx.fillRect(0, 0, W, H);

      /* animated orbs (blurred circles) */
      orbs.forEach(function(o) {
        o.x = clamp(o.x + o.vx, 0.05, 0.95);
        o.y = clamp(o.y + o.vy, 0.05, 0.95);
        if (o.x <= 0.05 || o.x >= 0.95) o.vx *= -1;
        if (o.y <= 0.05 || o.y >= 0.95) o.vy *= -1;

        var cx  = o.x * W;
        var cy  = o.y * H;
        var rad = o.r * Math.max(W, H);
        var g   = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0,   'rgba(' + o.c + ',' + o.a + ')');
        g.addColorStop(0.55,'rgba(' + o.c + ',' + (o.a * 0.35) + ')');
        g.addColorStop(1,   'rgba(' + o.c + ',0)');

        ctx.save();
        ctx.filter = 'blur(48px)';
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
        ctx.restore();
      });

      /* subtle animated wave across the bottom third */
      ctx.save();
      ctx.globalAlpha = 0.04;
      ctx.fillStyle = '#6366f1';
      var waveBase = H * 0.78;
      ctx.beginPath();
      ctx.moveTo(0, H);
      for (var i = 0; i <= W; i += 4) {
        var wy = waveBase +
          Math.sin((i / W * 3 + frame * 0.006) * Math.PI) * 28 +
          Math.sin((i / W * 7 - frame * 0.003) * Math.PI) * 14;
        ctx.lineTo(i, wy);
      }
      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      /* second wave (pink) */
      ctx.save();
      ctx.globalAlpha = 0.03;
      ctx.fillStyle = '#ec4899';
      var waveBase2 = H * 0.85;
      ctx.beginPath();
      ctx.moveTo(0, H);
      for (var j = 0; j <= W; j += 4) {
        var wy2 = waveBase2 +
          Math.sin((j / W * 5 - frame * 0.004) * Math.PI) * 22 +
          Math.sin((j / W * 9 + frame * 0.007) * Math.PI) * 10;
        ctx.lineTo(j, wy2);
      }
      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      /* grid */
      ctx.strokeStyle = 'rgba(99,102,241,0.055)';
      ctx.lineWidth   = 0.8;
      var gs = 60;
      ctx.beginPath();
      for (var xi = 0; xi <= W; xi += gs) { ctx.moveTo(xi,0); ctx.lineTo(xi,H); }
      for (var yi = 0; yi <= H; yi += gs) { ctx.moveTo(0,yi); ctx.lineTo(W,yi); }
      ctx.stroke();
    }
    requestAnimationFrame(draw);
  }

  /* ============================================================
     DARK BACKGROUND — full-page animated canvas (dark mode only)
     aurora orbs + flowing waves + twinkling pixel grid
  ============================================================ */
  var _darkBgRaf = null;
  function initDarkBackground() {
    var root = document.documentElement;
    var cvs  = document.getElementById('dark-bg-canvas');

    if (root.classList.contains('light')) {
      if (cvs) cvs.remove();
      _darkBgRaf = null;
      return;
    }
    if (cvs && _darkBgRaf) return;
    if (cvs) cvs.remove();

    var canvas = document.createElement('canvas');
    canvas.id  = 'dark-bg-canvas';
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;';
    document.body.insertBefore(canvas, document.body.firstChild);

    var ctx = canvas.getContext('2d');
    var W = 0, H = 0, frame = 0;
    var GRID = 60;
    var pixels = [];

    var orbs = [
      { x:0.14, y:0.22, r:0.62, vx:0.00013, vy:0.00010, c:'99,102,241',  a:0.24 },
      { x:0.86, y:0.68, r:0.54, vx:-0.00010, vy:0.00015, c:'14,165,233', a:0.18 },
      { x:0.50, y:0.50, r:0.44, vx:0.00015, vy:-0.00012, c:'236,72,153', a:0.14 },
      { x:0.76, y:0.10, r:0.36, vx:-0.00018, vy:0.00010, c:'16,185,129', a:0.11 },
      { x:0.22, y:0.82, r:0.40, vx:0.00012, vy:-0.00014, c:'99,102,241', a:0.12 }
    ];

    var WAVES = [
      { base:0.72, alpha:0.09, color:'#6366f1', f1:3,  s1: 0.006,  a1:34, f2:7, s2: 0.003,  a2:17 },
      { base:0.81, alpha:0.07, color:'#0ea5e9', f1:5,  s1:-0.004,  a1:26, f2:9, s2: 0.007,  a2:12 },
      { base:0.89, alpha:0.06, color:'#ec4899', f1:4,  s1: 0.005,  a1:20, f2:6, s2:-0.005,  a2:10 }
    ];

    var PCOLS = ['99,102,241','14,165,233','236,72,153'];

    function buildPixels() {
      pixels = [];
      for (var xi = GRID; xi < W; xi += GRID) {
        for (var yi = GRID; yi < H; yi += GRID) {
          pixels.push({
            x: xi, y: yi,
            phase: Math.random() * Math.PI * 2,
            speed: 0.007 + Math.random() * 0.013,
            maxA:  0.12 + Math.random() * 0.22,
            c: PCOLS[Math.floor(Math.random() * PCOLS.length)]
          });
        }
      }
    }

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      buildPixels();
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

    function draw() {
      if (root.classList.contains('light')) { _darkBgRaf = null; return; }
      _darkBgRaf = requestAnimationFrame(draw);
      frame++;

      /* base fill */
      ctx.fillStyle = '#010108';
      ctx.fillRect(0, 0, W, H);

      /* aurora orbs */
      ctx.save();
      ctx.filter = 'blur(72px)';
      orbs.forEach(function(o) {
        o.x = clamp(o.x + o.vx, 0.05, 0.95);
        o.y = clamp(o.y + o.vy, 0.05, 0.95);
        if (o.x <= 0.05 || o.x >= 0.95) o.vx *= -1;
        if (o.y <= 0.05 || o.y >= 0.95) o.vy *= -1;
        var cx = o.x * W, cy = o.y * H;
        var rad = o.r * Math.max(W, H);
        var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0,    'rgba(' + o.c + ',' + o.a + ')');
        g.addColorStop(0.45, 'rgba(' + o.c + ',' + (o.a * 0.28) + ')');
        g.addColorStop(1,    'rgba(' + o.c + ',0)');
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });
      ctx.restore();

      /* flowing waves */
      WAVES.forEach(function(w) {
        ctx.save();
        ctx.globalAlpha = w.alpha;
        ctx.fillStyle   = w.color;
        ctx.beginPath();
        ctx.moveTo(0, H);
        for (var i = 0; i <= W; i += 4) {
          var wy = w.base * H +
            Math.sin((i / W * w.f1 + frame * w.s1) * Math.PI) * w.a1 +
            Math.sin((i / W * w.f2 - frame * w.s2) * Math.PI) * w.a2;
          ctx.lineTo(i, wy);
        }
        ctx.lineTo(W, H);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });

      /* twinkling pixel dots at grid intersections */
      pixels.forEach(function(p) {
        var a = (Math.sin(frame * p.speed + p.phase) * 0.5 + 0.5) * p.maxA;
        if (a < 0.015) return;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + p.c + ',' + a + ')';
        ctx.fill();
      });

      /* subtle grid */
      ctx.strokeStyle = 'rgba(99,102,241,0.045)';
      ctx.lineWidth   = 0.7;
      ctx.beginPath();
      for (var xi = 0; xi <= W; xi += GRID) { ctx.moveTo(xi, 0); ctx.lineTo(xi, H); }
      for (var yi = 0; yi <= H; yi += GRID) { ctx.moveTo(0, yi); ctx.lineTo(W, yi); }
      ctx.stroke();
    }
    requestAnimationFrame(draw);
  }

  /* ============================================================
     PARTICLES — hero dots (dark mode, kept for hero depth)
  ============================================================ */
  function initParticles() {
    if (document.documentElement.classList.contains('light')) return;
    var section = el('hero');
    if (!section) return;
    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;';
    section.insertBefore(canvas, section.firstChild);

    var ctx = canvas.getContext('2d');
    var W, H, pts = [];
    var COLORS = ['#818cf8','#38bdf8','#f472b6','#10b981'];
    var COUNT  = 70;

    function resize() {
      W = canvas.width  = section.offsetWidth;
      H = canvas.height = section.offsetHeight;
    }
    function mkPt() {
      return {
        x:  Math.random() * W,
        y:  Math.random() * H,
        r:  Math.random() * 1.4 + 0.4,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        a:  Math.random() * 0.45 + 0.1,
        c:  COLORS[Math.floor(Math.random() * COLORS.length)]
      };
    }
    resize();
    for (var i = 0; i < COUNT; i++) pts.push(mkPt());
    window.addEventListener('resize', resize, { passive: true });

    function draw() {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(function(p) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10 || p.x > W + 10 || p.y < -10 || p.y > H + 10) { Object.assign(p, mkPt()); }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.globalAlpha = p.a;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  }

  /* ============================================================
     STAT COUNTERS — animated number count-up on load
  ============================================================ */
  function initCounters() {
    var container = el('hero-stats');
    if (!container) return;
    var done = false;

    /* read original values BEFORE touching DOM — no "0" flash until in-view */
    var items = [];
    qsa('.hero-stat-value').forEach(function(node) {
      var raw   = node.textContent.trim();
      var match = raw.match(/^(\d+(?:\.\d+)?)(.*)/);
      if (!match) return;
      items.push({ node: node, target: parseFloat(match[1]), suffix: match[2], decimal: raw.indexOf('.') !== -1 });
    });

    var io = new IntersectionObserver(function(entries) {
      if (done || !entries[0].isIntersecting) return;
      done = true;
      io.disconnect();
      var start = null, dur = 1200;
      items.forEach(function(it) {
        it.node.textContent = (it.decimal ? '0.0' : '0') + it.suffix;
      });
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var ease = 1 - Math.pow(1 - p, 3);
        items.forEach(function(it) {
          var n = it.target * ease;
          it.node.textContent = (it.decimal ? n.toFixed(1) : Math.floor(n)) + it.suffix;
        });
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }, { threshold: 0.6 });

    io.observe(container);
  }

  /* ============================================================
     RESUME BUTTON
  ============================================================ */
  function wireResumeBtn(file) {
    var btn = el('resume-btn');
    if (!btn) return;
    if (file) { btn.href = file; }
    else { btn.style.display = 'none'; }
  }

  /* ============================================================
     TYPING ANIMATION
  ============================================================ */
  function initTyping(lines) {
    var container = el('typed-text');
    if (!container || !lines.length) return;

    var i = 0, ci = 0, deleting = false;
    var WAIT = 2400, REST = 380, SPD_T = 55, SPD_D = 28;

    function tick() {
      var line = lines[i];
      if (!deleting) {
        ci++;
        container.textContent = line.slice(0, ci);
        if (ci === line.length) { deleting = true; setTimeout(tick, WAIT); return; }
        setTimeout(tick, SPD_T);
      } else {
        ci--;
        container.textContent = line.slice(0, ci);
        if (ci === 0) {
          deleting = false;
          i = (i + 1) % lines.length;
          setTimeout(tick, REST);
          return;
        }
        setTimeout(tick, SPD_D);
      }
    }
    setTimeout(tick, 900);
  }

  /* ============================================================
     SKILLS
  ============================================================ */
  function renderSkills(skills) {
    var cols = [[], [], []];
    skills.forEach(function(s){ cols[s.column].push(s); });

    el('skills-grid').innerHTML = cols.map(function(col, ci){
      return col.map(function(g, gi){
        return '<div class="skill-group col-' + ci + ' reveal" style="transition-delay:' + (ci * 0.08) + 's">' +
          '<div class="skill-group-name">' + e(g.category) + '</div>' +
          '<div class="skill-tags">' +
          g.items.map(function(t, ti){ return '<span class="skill-tag" style="--tag-delay:' + (ti * 0.04) + 's">' + e(t) + '</span>'; }).join('') +
          '</div></div>';
      }).join('');
    }).join('');
  }

  /* ============================================================
     EXPERIENCE
  ============================================================ */
  function renderExperience(exp) {
    el('timeline').innerHTML = exp.map(function(x){
      return '<div class="tl-item reveal">' +
        '<div class="tl-dot"></div>' +
        '<div class="tl-header">' +
          '<div><div class="tl-role">' + e(x.title) + '</div>' +
          '<div class="tl-company">' + e(x.company) + '</div></div>' +
          '<span class="tl-period">' + e(x.period) + '</span>' +
        '</div>' +
        '<ul class="tl-bullets">' +
        x.bullets.map(function(b){ return '<li>' + e(b) + '</li>'; }).join('') +
        '</ul></div>';
    }).join('');
  }

  /* ============================================================
     PROJECTS + FILTER
  ============================================================ */
  function renderProjects(projects) {
    /* filter tabs */
    var tabsHtml = '<button class="filter-btn active" data-filter="all">All</button>' +
      projects.map(function(c){
        return '<button class="filter-btn" data-filter="' + e(c.category) + '">' +
          e(CAT_LABEL[c.category] || c.category) + '</button>';
      }).join('');
    el('filter-tabs').innerHTML = tabsHtml;

    /* project cards */
    var cardsHtml = '';
    projects.forEach(function(cat){
      var slug = CAT_SLUG[cat.category] || 'other';
      cat.items.forEach(function(p){
        cardsHtml +=
          '<div class="proj-card reveal" data-cat="' + slug + '" data-category="' + e(cat.category) + '">' +
          '<span class="proj-badge">' + e(CAT_LABEL[cat.category] || cat.category) + '</span>' +
          '<div class="proj-title">' + e(p.title) + '</div>' +
          '<div class="proj-period">' + e(p.period) + '</div>' +
          '<ul class="proj-bullets">' +
          p.bullets.map(function(b){ return '<li>' + e(b) + '</li>'; }).join('') +
          '</ul></div>';
      });
    });
    el('projects-grid').innerHTML = cardsHtml;

    /* wire filter */
    el('filter-tabs').addEventListener('click', function(ev){
      var btn = ev.target.closest('.filter-btn');
      if (!btn) return;
      qsa('.filter-btn').forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.dataset.filter;
      qsa('.proj-card').forEach(function(card){
        var show = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !show);
      });
    });
  }

  /* ============================================================
     EDUCATION
  ============================================================ */
  function renderEducation(edu) {
    el('edu-grid').innerHTML = edu.academics.map(function(a){
      var gpaHtml = a.gpa ? '<span class="edu-gpa">' + e(a.gpa) + ' GPA</span>' : '';
      var locHtml = a.location ? '<span class="edu-loc"><i class="fas fa-map-marker-alt"></i> ' + e(a.location) + '</span>' : '';
      return '<div class="edu-card reveal">' +
        '<div class="edu-card-header">' +
          '<div>' +
            '<div class="edu-degree">' + e(a.degree) + '</div>' +
            '<div class="edu-field">' + e(a.field) + '</div>' +
          '</div>' +
          (gpaHtml ? '<div class="edu-gpa-wrap">' + gpaHtml + '</div>' : '') +
        '</div>' +
        '<div class="edu-meta">' +
          '<span class="edu-period">' + e(a.period) + '</span>' +
          locHtml +
        '</div>' +
        '<a href="' + e(a.url) + '" class="edu-inst" target="_blank" rel="noopener"><i class="fas fa-graduation-cap"></i> ' + e(a.institution) + ' <i class="fas fa-external-link-alt"></i></a>' +
        '<div class="edu-courses-label">Relevant Courses</div>' +
        '<ul class="edu-courses-list">' +
        a.courses.map(function(c){ return '<li>' + e(c) + '</li>'; }).join('') +
        '</ul></div>';
    }).join('');

    el('cert-grid').innerHTML = edu.certifications.map(function(cat){
      return cat.items.map(function(cert){
        var inner = '<div class="cert-cat-label">' + e(cat.category) + '</div>';
        if (cert.url) {
          inner += '<a href="' + e(cert.url) + '" class="cert-link" target="_blank" rel="noopener">' + e(cert.title) + '</a>';
        } else {
          inner += '<div class="cert-name">' + e(cert.title) + '</div>';
          inner += '<div class="cert-meta">' + e(cert.issuer);
          if (cert.period) inner += ' &nbsp;·&nbsp; ' + e(cert.period);
          if (cert.provider) inner += ' &nbsp;·&nbsp; ' + e(cert.provider);
          if (cert.instructor) inner += '<br><em>' + e(cert.instructor) + '</em>';
          inner += '</div>';
          if (cert.modules && cert.modules.length) {
            inner += '<ul class="cert-modules">' +
              cert.modules.map(function(m){ return '<li>' + e(m) + '</li>'; }).join('') +
              '</ul>';
          }
        }
        return '<div class="cert-card reveal">' + inner + '</div>';
      }).join('');
    }).join('');
  }

  /* ============================================================
     CONTACT
  ============================================================ */
  function renderContact(p) {
    el('contact-info').innerHTML =
      '<div class="contact-info-title">Let\'s Connect</div>' +
      '<p class="contact-info-sub">I\'m actively looking for internship opportunities in Computer Architecture, VLSI Design, and Verification. Feel free to reach out!</p>' +
      '<div class="contact-detail">' +
        '<div class="cd-icon"><i class="fas fa-map-marker-alt"></i></div>' +
        '<div class="cd-text">' + e(p.location || 'Austin, TX') + '</div>' +
      '</div>' +
      '<div class="contact-detail">' +
        '<div class="cd-icon"><i class="fas fa-envelope"></i></div>' +
        '<div class="cd-text">' +
        p.emails.map(function(em){
          return '<a href="mailto:' + e(em) + '">' + e(em) + '</a>';
        }).join('<br>') +
        '</div>' +
      '</div>' +
      '<div class="contact-social">' +
      p.social.map(function(s){
        return '<a href="' + e(s.url) + '" class="soc-btn" target="_blank" rel="noopener" aria-label="' + e(s.platform) + '">' +
          '<i class="fab ' + e(s.icon) + '"></i></a>';
      }).join('') +
      '</div>';
  }

  /* ============================================================
     FOOTER
  ============================================================ */
  function renderFooter(p) {
    el('footer-social').innerHTML = p.social.map(function(s){
      return '<li><a href="' + e(s.url) + '" class="soc-btn" target="_blank" rel="noopener" aria-label="' + e(s.platform) + '">' +
        '<i class="fab ' + e(s.icon) + '"></i></a></li>';
    }).join('');
  }

  /* ============================================================
     CONTACT FORM — Formspree AJAX
  ============================================================ */
  function initContactForm(endpoint) {
    var form    = el('contact-form');
    var msgEl   = el('form-msg');
    var submitBtn = el('submit-btn');
    if (!form) return;

    form.addEventListener('submit', function(ev){
      ev.preventDefault();

      if (!endpoint || endpoint.includes('YOUR_FORM_ID')) {
        msgEl.className = 'error';
        msgEl.textContent = 'Form not configured. Please set formEndpoint in data/portfolio.json (get a free ID at formspree.io).';
        msgEl.style.display = 'block';
        return;
      }

      msgEl.className = '';
      msgEl.style.display = 'none';
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending…';

      var data = new FormData(form);

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: data
      })
      .then(function(r){ return r.json().then(function(j){ return { ok: r.ok, body: j }; }); })
      .then(function(res){
        if (res.ok) {
          msgEl.className = 'success';
          msgEl.textContent = 'Message sent! I\'ll get back to you soon.';
          form.reset();
        } else {
          throw new Error((res.body && res.body.error) || 'Submission failed');
        }
      })
      .catch(function(err){
        msgEl.className = 'error';
        msgEl.textContent = err.message || 'Something went wrong. Please email me directly.';
      })
      .finally(function(){
        msgEl.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      });
    });
  }

  /* ============================================================
     NAVBAR — scroll + active section highlight
  ============================================================ */
  function initNav() {
    var navbar  = el('navbar');
    var links   = qsa('.nav-link');
    var burger  = el('hamburger');
    var navList = el('nav-links');

    /* scroll: solid bg + active link */
    var sections = qsa('section[id]');
    var ticking  = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(function(){
          navbar.classList.toggle('scrolled', window.scrollY > 40);

          var curr = '';
          sections.forEach(function(s){
            if (window.scrollY >= s.offsetTop - 120) curr = s.id;
          });
          links.forEach(function(l){
            l.classList.toggle('active', l.getAttribute('href') === '#' + curr);
          });
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    /* hamburger */
    burger.addEventListener('click', function(){
      burger.classList.toggle('open');
      navList.classList.toggle('open');
    });
    navList.addEventListener('click', function(ev){
      if (ev.target.classList.contains('nav-link')) {
        burger.classList.remove('open');
        navList.classList.remove('open');
      }
    });
  }

  /* ============================================================
     SCROLL REVEAL — IntersectionObserver
  ============================================================ */
  function initScrollReveal() {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    /* observe all .reveal elements — includes ones injected by render fns */
    function observe() {
      qsa('.reveal').forEach(function(el){ io.observe(el); });
    }
    /* run once now, then again after a tick to catch dynamically injected nodes */
    observe();
    setTimeout(observe, 100);
  }

})();
