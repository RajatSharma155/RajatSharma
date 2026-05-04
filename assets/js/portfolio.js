(function () {
    'use strict';

    /* ── safe HTML escape ─────────────────────────────────── */
    var _escDiv = document.createElement('div');
    function esc(str) {
        _escDiv.textContent = String(str);
        return _escDiv.innerHTML;
    }

    /* ── fetch data then render everything ───────────────── */
    fetch('data/portfolio.json')
        .then(function (r) { return r.json(); })
        .then(function (data) {
            renderHeader(data.personal);
            renderIntro(data.personal, data.skills);
            renderExperience(data.experience);
            renderProjects(data.projects);
            renderEducation(data.education);
            renderContact(data.personal);
            initContactForm();
            startTypingAnimation(data.personal.taglines);
        })
        .catch(function (err) {
            console.error('portfolio.js: failed to load data', err);
        });

    /* ============================================================
       HEADER — typing animation cycling through taglines
       ============================================================ */
    function startTypingAnimation(taglines) {
        var el = document.querySelector('#header .inner p');
        if (!el || !taglines || !taglines.length) return;

        var index   = 0;
        var charIdx = 0;
        var deleting = false;
        var PAUSE_FULL   = 2200;
        var PAUSE_EMPTY  = 400;
        var SPEED_TYPE   = 55;
        var SPEED_DELETE = 30;

        el.innerHTML = '<span class="typed-text"></span><span class="typed-cursor"></span>';
        var textEl = el.querySelector('.typed-text');

        function tick() {
            var current = taglines[index];
            if (!deleting) {
                charIdx++;
                textEl.textContent = current.slice(0, charIdx);
                if (charIdx === current.length) {
                    deleting = true;
                    setTimeout(tick, PAUSE_FULL);
                    return;
                }
                setTimeout(tick, SPEED_TYPE);
            } else {
                charIdx--;
                textEl.textContent = current.slice(0, charIdx);
                if (charIdx === 0) {
                    deleting = false;
                    index = (index + 1) % taglines.length;
                    setTimeout(tick, PAUSE_EMPTY);
                    return;
                }
                setTimeout(tick, SPEED_DELETE);
            }
        }
        setTimeout(tick, 800);
    }

    /* ============================================================
       INTRO
       ============================================================ */
    function renderIntro(personal, skills) {
        var article = document.querySelector('#intro');

        /* profile photo */
        var img = article.querySelector('.profile-photo');
        img.src = personal.photo;
        img.alt = personal.name;

        /* objective */
        article.querySelector('.objective').textContent = personal.objective;

        /* stats bar */
        if (personal.stats) {
            article.querySelector('.stats-bar').innerHTML =
                personal.stats.map(function (s) {
                    return '<div class="stat-item">' +
                        '<span class="stat-value">' + esc(s.value) + '</span>' +
                        '<span class="stat-label">' + esc(s.label) + '</span>' +
                        '</div>';
                }).join('');
        }

        /* skills — group by column */
        var columns = [[], [], []];
        skills.forEach(function (s) { columns[s.column].push(s); });

        article.querySelector('.skills-grid').innerHTML =
            columns.map(function (col, ci) {
                return '<div class="skills-column skills-col-' + ci + '">' +
                    col.map(function (skill) {
                        return '<div class="skills-section">' +
                            '<div class="skills-category-label">' + esc(skill.category) + '</div>' +
                            '<div class="skill-tags">' +
                            skill.items.map(function (item) {
                                return '<span class="skill-tag">' + esc(item) + '</span>';
                            }).join('') +
                            '</div></div>';
                    }).join('') +
                    '</div>';
            }).join('');
    }

    /* ============================================================
       EXPERIENCE — timeline
       ============================================================ */
    function renderExperience(experience) {
        document.querySelector('#experience .timeline').innerHTML =
            experience.map(function (exp) {
                return '<div class="timeline-item animate-item">' +
                    '<div class="timeline-dot"></div>' +
                    '<div class="timeline-meta">' +
                    '<div class="timeline-title">' +
                    esc(exp.title) + ' &mdash; ' + esc(exp.company) +
                    '</div>' +
                    '<span class="timeline-period">' + esc(exp.period) + '</span>' +
                    '</div>' +
                    '<ul class="timeline-bullets">' +
                    exp.bullets.map(function (b) {
                        return '<li>' + esc(b) + '</li>';
                    }).join('') +
                    '</ul></div>';
            }).join('');
    }

    /* ============================================================
       PROJECTS — filter tabs + cards
       ============================================================ */
    function renderProjects(projects) {
        var container = document.querySelector('#work .projects-container');

        /* collect unique categories */
        var categories = projects.map(function (p) { return p.category; });

        /* filter tabs */
        var tabsHtml = '<div class="filter-tabs animate-item">' +
            '<button class="filter-tab is-active" data-filter="all">All</button>' +
            categories.map(function (cat) {
                return '<button class="filter-tab" data-filter="' + esc(cat) + '">' +
                    esc(cat) + '</button>';
            }).join('') +
            '</div>';

        /* project cards — all categories flattened */
        var cardsHtml = '<div class="projects-grid">';
        projects.forEach(function (cat) {
            cat.items.forEach(function (proj) {
                cardsHtml +=
                    '<div class="project-card animate-item" data-category="' + esc(cat.category) + '">' +
                    '<div class="project-card-meta">' +
                    '<h4 class="project-card-title">' + esc(proj.title) + '</h4>' +
                    '<span class="project-card-period">' + esc(proj.period) + '</span>' +
                    '</div>' +
                    '<ul class="project-card-bullets">' +
                    proj.bullets.map(function (b) {
                        return '<li>' + esc(b) + '</li>';
                    }).join('') +
                    '</ul></div>';
            });
        });
        cardsHtml += '</div>';

        container.innerHTML = tabsHtml + cardsHtml;

        /* wire up filter tabs */
        container.querySelectorAll('.filter-tab').forEach(function (btn) {
            btn.addEventListener('click', function () {
                container.querySelectorAll('.filter-tab').forEach(function (b) {
                    b.classList.remove('is-active');
                });
                btn.classList.add('is-active');

                var filter = btn.dataset.filter;
                container.querySelectorAll('.project-card').forEach(function (card) {
                    var show = filter === 'all' || card.dataset.category === filter;
                    card.classList.toggle('is-hidden', !show);
                });
            });
        });
    }

    /* ============================================================
       EDUCATION — academics + certifications
       ============================================================ */
    function renderEducation(education) {
        var article = document.querySelector('#about');

        article.querySelector('.edu-image').src = education.image;

        /* academics grid */
        article.querySelector('.academics-grid').innerHTML =
            education.academics.map(function (edu) {
                return '<div class="edu-card animate-item">' +
                    '<span class="edu-degree">' + esc(edu.degree) + '</span>' +
                    '<span class="edu-field">' + esc(edu.field) + ' (' + esc(edu.period) + ')</span>' +
                    '<a href="' + esc(edu.url) + '" class="edu-link" target="_blank" rel="noopener">' +
                    esc(edu.institution) + '</a>' +
                    '<div class="edu-courses">' +
                    '<div class="edu-courses-label">Courses</div>' +
                    '<ul>' +
                    edu.courses.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') +
                    '</ul></div></div>';
            }).join('');

        /* certifications */
        article.querySelector('.certifications-list').innerHTML =
            education.certifications.map(function (cat) {
                var itemsHtml = cat.items.map(function (cert) {
                    var inner = '';
                    if (cert.url) {
                        inner = '<a href="' + esc(cert.url) + '" class="cert-link" target="_blank" rel="noopener">' +
                            esc(cert.title) + '</a>';
                    } else {
                        inner = '<span class="cert-title">' + esc(cert.title) + '</span>' +
                            '<div class="cert-meta">' + esc(cert.issuer) +
                            (cert.period ? ' &nbsp;·&nbsp; ' + esc(cert.period) : '') +
                            (cert.provider ? ' &nbsp;·&nbsp; ' + esc(cert.provider) : '') +
                            (cert.instructor ? ' &nbsp;·&nbsp; <em>' + esc(cert.instructor) + '</em>' : '') +
                            '</div>';
                        if (cert.modules && cert.modules.length) {
                            inner += '<ul class="cert-modules">' +
                                cert.modules.map(function (m) {
                                    return '<li>' + esc(m) + '</li>';
                                }).join('') +
                                '</ul>';
                        }
                    }
                    return '<div class="cert-item animate-item">' + inner + '</div>';
                }).join('');

                return '<div class="cert-section">' +
                    '<div class="cert-category-label">' + esc(cat.category) + '</div>' +
                    itemsHtml + '</div>';
            }).join('');
    }

    /* ============================================================
       CONTACT — social icons + contact info
       ============================================================ */
    function renderContact(personal) {
        document.querySelector('#contact .icons').innerHTML =
            personal.social.map(function (s) {
                return '<li><a href="' + esc(s.url) + '" class="icon brands ' + esc(s.icon) +
                    '" target="_blank" rel="noopener"><span class="label">' +
                    esc(s.platform) + '</span></a></li>';
            }).join('');

        document.querySelector('#contact .contact-info').innerHTML =
            'Phone: ' + esc(personal.phone) + '<br>Email:&nbsp;' +
            personal.emails.map(function (e) {
                return '<a href="mailto:' + esc(e) + '">' + esc(e) + '</a>';
            }).join(' &nbsp;/&nbsp; ');
    }

    /* ============================================================
       CONTACT — AJAX form submission
       ============================================================ */
    function initContactForm() {
        var form    = document.querySelector('#contact form');
        var msgEl   = document.querySelector('#contact .form-message');
        var submitBtn = form ? form.querySelector('[type="submit"]') : null;
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            msgEl.className = 'form-message';
            msgEl.textContent = '';
            submitBtn.disabled = true;
            submitBtn.value = 'Sending…';

            var data = new FormData(form);

            fetch('phpman.php', {
                method: 'POST',
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
                body: data
            })
            .then(function (r) { return r.json(); })
            .then(function (res) {
                if (res.success) {
                    msgEl.textContent = res.message || 'Message sent! I will get back to you soon.';
                    msgEl.classList.add('is-success');
                    form.reset();
                } else {
                    throw new Error(res.message || 'Unknown error');
                }
            })
            .catch(function (err) {
                msgEl.textContent = err.message || 'Failed to send message. Please try emailing directly.';
                msgEl.classList.add('is-error');
            })
            .finally(function () {
                submitBtn.disabled = false;
                submitBtn.value = 'Send Message';
            });
        });
    }

})();
