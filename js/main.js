/* ═══════════════════════════════════════════
   TUCKER DANE HOWARD — main.js
═══════════════════════════════════════════ */

(function() {
  'use strict';

  // ── THEME TOGGLE ────────────────────────
  const themeToggle = document.getElementById('themeToggle');

  // Restore saved preference (defaults to dark if never set)
  const savedTheme = localStorage.getItem('tdh-theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light');
      const isLight = document.body.classList.contains('light');
      localStorage.setItem('tdh-theme', isLight ? 'light' : 'dark');
    });
  }

  // ── CURSOR ──────────────────────────────
  const cursor     = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  // Smooth ring follow
  function animateRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover / click states
  const interactables = 'a, button, .wi-item, .fp-card, .as-disc';
  document.querySelectorAll(interactables).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
  document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
  document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity     = '0';
    cursorRing.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity     = '1';
    cursorRing.style.opacity = '1';
  });

  // ── PRELOADER ───────────────────────────
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('preloader').classList.add('hidden');
      // Trigger hero title animation after preloader
      animateHeroTitle();
    }, 1500);
  });

  // Fallback if load event already fired
  if (document.readyState === 'complete') {
    setTimeout(() => {
      document.getElementById('preloader').classList.add('hidden');
      animateHeroTitle();
    }, 800);
  }

  // ── HERO TITLE ──────────────────────────
  function animateHeroTitle() {
    const lines = document.querySelectorAll('.hero-line');
    lines.forEach((line, i) => {
      // Wrap content in inner span for clip animation
      const text = line.innerHTML;
      line.innerHTML = `<span class="hero-line-inner">${text}</span>`;
      const inner = line.querySelector('.hero-line-inner');
      const delay = parseInt(line.dataset.delay || 0);
      setTimeout(() => {
        inner.classList.add('visible');
      }, 400 + delay);
    });
  }

  // ── HERO IMAGE ──────────────────────────
  const heroImg = document.getElementById('heroImg');
  if (heroImg) {
    if (heroImg.complete && heroImg.naturalWidth) {
      heroImg.classList.add('loaded');
    } else {
      heroImg.addEventListener('load', () => heroImg.classList.add('loaded'));
      heroImg.addEventListener('error', () => {
        // Image not found — that's fine, CSS fallback handles it
        heroImg.style.display = 'none';
      });
    }
  }

  // Same for Visual Reverb image
  const vrImg = document.getElementById('vrImg');
  if (vrImg) {
    vrImg.addEventListener('error', () => {
      // Fallback: dark gradient background
      vrImg.parentElement.style.background = 
        'linear-gradient(135deg, #1a1208 0%, #0d0c0a 50%, #120d06 100%)';
      vrImg.style.display = 'none';
    });
  }

  // ── NAV SCROLL ──────────────────────────
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  // ── MENU TOGGLE ─────────────────────────
  const menuBtn     = document.getElementById('menuBtn');
  const menuOverlay = document.getElementById('menuOverlay');

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      document.body.classList.toggle('menu-open');
    });
  }

  // Close menu on link click
  document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('menu-open');
    });
  });

  // Close menu on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') document.body.classList.remove('menu-open');
  });

  // ── SCROLL REVEAL ───────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -48px 0px'
  });
  revealEls.forEach(el => revealObserver.observe(el));

  // ── STATEMENT PARALLAX WORDS ─────────────
  const statText = document.getElementById('statementText');
  if (statText) {
    const spans = statText.querySelectorAll('span');
    spans.forEach((span, i) => {
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      span.style.transition = `opacity .7s ease ${i * .12}s, transform .7s ease ${i * .12}s`;
    });

    const stObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          spans.forEach(span => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
          });
          stObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });
    stObserver.observe(statText);
  }

  // ── SUBTLE PARALLAX ON HERO IMG ──────────
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const heroHeight = document.querySelector('.hero').offsetHeight;
      if (scrolled < heroHeight) {
        const pct = scrolled / heroHeight;
        heroBg.style.transform = `translateY(${pct * 80}px)`;
      }
    }, { passive: true });
  }

  // ── SMOOTH ANCHOR SCROLL ────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── WORK INDEX HOVER IMAGES — removed in favour of CSS accent line ──

  // ── TICKER PAUSE ON HOVER ────────────────
  const tickerTrack = document.getElementById('ticker');
  if (tickerTrack) {
    tickerTrack.parentElement.addEventListener('mouseenter', () => {
      tickerTrack.style.animationPlayState = 'paused';
    });
    tickerTrack.parentElement.addEventListener('mouseleave', () => {
      tickerTrack.style.animationPlayState = 'running';
    });
  }

  // ── FP CARD IMAGE PLACEHOLDER ────────────
  // If Visual Reverb image missing, create a fallback visual
  const fpImg = document.querySelector('.fp-img');
  if (fpImg) {
    fpImg.addEventListener('error', () => {
      const parent = fpImg.closest('.fp-image-wrap');
      parent.style.background = `
        radial-gradient(ellipse 60% 80% at 50% 50%, rgba(200,169,110,.06) 0%, transparent 70%),
        repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(242,239,232,.03) 39px, rgba(242,239,232,.03) 40px),
        repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(242,239,232,.02) 79px, rgba(242,239,232,.02) 80px),
        #0f0f0d
      `;
      fpImg.style.display = 'none';

      // Add waveform as visual placeholder
      const waveDiv = document.createElement('div');
      waveDiv.style.cssText = `
        position: absolute; bottom: 20%; left: 5%; right: 5%;
        height: 35%; display: flex; align-items: center; gap: 3px;
      `;
      for (let i = 0; i < 60; i++) {
        const bar = document.createElement('div');
        const h = 10 + Math.sin(i * 0.35) * 40 + Math.random() * 25;
        bar.style.cssText = `
          flex: 1; background: #C8A96E; opacity: .25; border-radius: 1px;
          height: ${h}%; animation: waveAnim ${.8 + Math.random() * 1.2}s ease-in-out ${Math.random() * -2}s infinite alternate;
          transform-origin: bottom;
        `;
        waveDiv.appendChild(bar);
      }
      // Inject keyframes
      if (!document.getElementById('waveKF')) {
        const style = document.createElement('style');
        style.id = 'waveKF';
        style.textContent = '@keyframes waveAnim { from { transform: scaleY(.1); } to { transform: scaleY(1); } }';
        document.head.appendChild(style);
      }
      parent.appendChild(waveDiv);
    });
  }

  // ── PAGE TRANSITION OUT ──────────────────
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    // Only internal links, not anchors or external
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;

    link.addEventListener('click', e => {
      e.preventDefault();
      const pt = document.createElement('div');
      pt.className = 'page-transition enter';
      document.body.appendChild(pt);
      setTimeout(() => {
        window.location.href = href;
      }, 580);
    });
  });

})();
