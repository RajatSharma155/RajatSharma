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
  var d = PORTFOLIO_DATA;
  renderHero(d.personal);
  wireResumeBtn(d.personal.resumeFile);
  initCounters();
  initParticles();
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
     PARTICLES — canvas floating dots in hero
  ============================================================ */
  function initParticles() {
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
    qsa('.hero-stat-value').forEach(function(node) {
      var raw     = node.textContent.trim();
      var match   = raw.match(/^(\d+(?:\.\d+)?)(.*)/);
      if (!match) return;
      var target  = parseFloat(match[1]);
      var suffix  = match[2];
      var decimal = raw.indexOf('.') !== -1;
      var dur     = 1100;
      var start   = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var v = target * (1 - Math.pow(1 - p, 3));
        node.textContent = (decimal ? v.toFixed(1) : Math.floor(v)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      node.textContent = (decimal ? '0.0' : '0') + suffix;
      setTimeout(function() { requestAnimationFrame(step); }, 400);
    });
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
      return col.map(function(g){
        return '<div class="skill-group col-' + ci + ' reveal">' +
          '<div class="skill-group-name">' + e(g.category) + '</div>' +
          '<div class="skill-tags">' +
          g.items.map(function(t){ return '<span class="skill-tag">' + e(t) + '</span>'; }).join('') +
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
