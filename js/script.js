/* ============================================================
   AJAY SHIRKE PORTFOLIO — NEURAL NEBULA 2.0 — PREMIUM JS
   ============================================================ */
'use strict';

/* ============================================================
   1. LOADER
   ============================================================ */
const loader      = document.getElementById('loader');
const loaderFill  = document.getElementById('loaderFill');
const loaderStat  = document.getElementById('loaderStatus');

const loadSteps = [
    'Booting Neural Interface',
    'Loading AI Modules',
    'Initialising Tensor Cores',
    'Calibrating Visual Engine',
    'System Ready'
];

let progress  = 0;
let stepIndex = 0;

const loaderInterval = setInterval(() => {
    progress += Math.random() * 15 + 5;

    // Advance status text at intervals
    const newStep = Math.floor((progress / 100) * (loadSteps.length - 1));
    if (newStep !== stepIndex) {
        stepIndex = newStep;
        if (loaderStat) loaderStat.innerHTML = loadSteps[stepIndex] + '<span class="blink-dots">_</span>';
    }

    if (progress >= 100) {
        progress = 100;
        clearInterval(loaderInterval);
        if (loaderFill) loaderFill.style.width = '100%';
        setTimeout(hideLoader, 500);
    }
    if (loaderFill) loaderFill.style.width = progress + '%';
}, 80);

function hideLoader() {
    if (!loader) return;
    loader.classList.add('out');
    setTimeout(() => {
        loader.style.display = 'none';
        initAOS();
        initCounters();
    }, 800);
}

/* ============================================================
   2. PARTICLE CANVAS — NEURAL NETWORK BACKGROUND
   ============================================================ */
(function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx    = canvas.getContext('2d');
    let W        = canvas.width  = window.innerWidth;
    let H        = canvas.height = window.innerHeight;
    let mouse    = { x: W / 2, y: H / 2 };

    const isMobile   = W < 768;
    const count      = isMobile ? 50 : 110;
    const maxDist    = isMobile ? 120 : 150;

    const COLORS = ['rgba(245,158,11,', 'rgba(139,92,246,', 'rgba(6,182,212,'];

    const dots = Array.from({ length: count }, () => ({
        x   : Math.random() * W,
        y   : Math.random() * H,
        vx  : (Math.random() - 0.5) * 0.5,
        vy  : (Math.random() - 0.5) * 0.5,
        r   : Math.random() * 2 + 1,
        c   : COLORS[Math.floor(Math.random() * COLORS.length)],
        a   : Math.random() * 0.6 + 0.2
    }));

    document.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('resize', () => {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    });

    function draw() {
        ctx.clearRect(0, 0, W, H);

        // Update + draw dots
        dots.forEach(d => {
            d.x += d.vx;
            d.y += d.vy;

            // Mouse attraction (subtle)
            const dx = mouse.x - d.x;
            const dy = mouse.y - d.y;
            const md = Math.sqrt(dx * dx + dy * dy);
            if (md < 200) {
                d.vx += dx * 0.0001;
                d.vy += dy * 0.0001;
            }

            // Speed limit
            const spd = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
            if (spd > 1.2) { d.vx *= 0.98; d.vy *= 0.98; }

            // Bounce
            if (d.x < 0 || d.x > W) d.vx *= -1;
            if (d.y < 0 || d.y > H) d.vy *= -1;

            ctx.beginPath();
            ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
            ctx.fillStyle = d.c + d.a + ')';
            ctx.fill();

            // Glow effect
            ctx.beginPath();
            ctx.arc(d.x, d.y, d.r * 3, 0, Math.PI * 2);
            ctx.fillStyle = d.c + (d.a * 0.12) + ')';
            ctx.fill();
        });

        // Draw connections
        for (let i = 0; i < dots.length; i++) {
            for (let j = i + 1; j < dots.length; j++) {
                const dx = dots[i].x - dots[j].x;
                const dy = dots[i].y - dots[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < maxDist) {
                    const alpha = (1 - dist / maxDist) * 0.18;
                    ctx.beginPath();
                    ctx.moveTo(dots[i].x, dots[i].y);
                    ctx.lineTo(dots[j].x, dots[j].y);
                    ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(draw);
    }

    draw();
})();

/* ============================================================
   3. HEX GRID BACKGROUND
   ============================================================ */
(function buildHexGrid() {
    const container = document.getElementById('hexGrid');
    if (!container) return;

    const size    = 36;
    const cols    = Math.ceil(window.innerWidth  / (size * 1.8)) + 1;
    const rows    = Math.ceil(window.innerHeight / (size * 1.6)) + 2;
    const svg     = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width',  '100%');
    svg.setAttribute('height', '100%');
    svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';

    const hexPath = (cx, cy, s) => {
        const pts = [];
        for (let i = 0; i < 6; i++) {
            const a = (Math.PI / 3) * i - Math.PI / 6;
            pts.push((cx + s * Math.cos(a)).toFixed(2) + ',' + (cy + s * Math.sin(a)).toFixed(2));
        }
        return pts.join(' ');
    };

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cx = c * size * 1.75 + (r % 2) * size * 0.875;
            const cy = r * size * 1.5;
            const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            polygon.setAttribute('points', hexPath(cx, cy, size - 2));
            const opacity = (Math.random() * 0.4 + 0.05).toFixed(2);
            polygon.setAttribute('fill', 'none');
            polygon.setAttribute('stroke', `rgba(139,92,246,${opacity})`);
            polygon.setAttribute('stroke-width', '0.5');
            svg.appendChild(polygon);
        }
    }

    container.appendChild(svg);
})();

/* ============================================================
   4. CUSTOM CURSOR
   ============================================================ */
const cursorDot      = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

let curX = 0, curY = 0, folX = 0, folY = 0;

document.addEventListener('mousemove', e => {
    curX = e.clientX;
    curY = e.clientY;
    if (cursorDot) {
        cursorDot.style.left = curX + 'px';
        cursorDot.style.top  = curY + 'px';
    }
});

(function animateCursor() {
    folX += (curX - folX) * 0.1;
    folY += (curY - folY) * 0.1;
    if (cursorFollower) {
        cursorFollower.style.left = folX + 'px';
        cursorFollower.style.top  = folY + 'px';
    }
    requestAnimationFrame(animateCursor);
})();

document.querySelectorAll('a, button, .pf-btn, .proj-card, .svc-card, .ach-card, .holo-card, .stag').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot      && cursorDot.classList.add('enlarged');
        cursorFollower && cursorFollower.classList.add('enlarged');
    });
    el.addEventListener('mouseleave', () => {
        cursorDot      && cursorDot.classList.remove('enlarged');
        cursorFollower && cursorFollower.classList.remove('enlarged');
    });
});

document.addEventListener('mouseleave', () => {
    if (cursorDot)      cursorDot.style.opacity      = '0';
    if (cursorFollower) cursorFollower.style.opacity  = '0';
});
document.addEventListener('mouseenter', () => {
    if (cursorDot)      cursorDot.style.opacity      = '1';
    if (cursorFollower) cursorFollower.style.opacity  = '1';
});

/* ============================================================
   5. NAVIGATION
   ============================================================ */
const navbar     = document.getElementById('navbar');
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    if (navbar) {
        navbar.classList.toggle('sticky', window.scrollY > 50);
    }
    updateActiveNav();
});

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
    });
}

document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks)  navLinks.classList.remove('open');
        if (hamburger) hamburger.classList.remove('open');
    });
});

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 76, behavior: 'smooth' });
        }
    });
});

function updateActiveNav() {
    const scrollY    = window.pageYOffset;
    const sections   = document.querySelectorAll('section[id]');
    const navItems   = document.querySelectorAll('.nav-item');

    sections.forEach(sec => {
        const top    = sec.offsetTop - 120;
        const bottom = top + sec.offsetHeight;
        if (scrollY >= top && scrollY < bottom) {
            navItems.forEach(l => l.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-item[href="#${sec.id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}

/* ============================================================
   6. ROLE PILLS CYCLER
   ============================================================ */
const rolePills = document.querySelectorAll('.role-pill');
let roleCurrent = 0;

if (rolePills.length > 0) {
    setInterval(() => {
        rolePills[roleCurrent].classList.remove('active');
        roleCurrent = (roleCurrent + 1) % rolePills.length;
        rolePills[roleCurrent].classList.add('active');
    }, 2500);
}

/* ============================================================
   7. COUNTER ANIMATION
   ============================================================ */
function initCounters() {
    const counters = document.querySelectorAll('.count-up');
    if (!counters.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el     = entry.target;
            const target = parseInt(el.dataset.target);
            const start  = performance.now();
            const dur    = 1800;

            (function update(now) {
                const elapsed  = now - start;
                const progress = Math.min(elapsed / dur, 1);
                const eased    = 1 - Math.pow(1 - progress, 4);
                el.textContent = Math.round(eased * target);
                if (progress < 1) requestAnimationFrame(update);
                else el.textContent = target;
            })(start);

            observer.unobserve(el);
        });
    }, { threshold: 0.4 });

    counters.forEach(el => observer.observe(el));
}

/* ============================================================
   8. AOS — SCROLL REVEAL
   ============================================================ */
function initAOS() {
    const els = document.querySelectorAll('[data-aos]');
    if (!els.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const delay = parseInt(entry.target.dataset.aosDelay) || 0;
            setTimeout(() => entry.target.classList.add('aos-animate'), delay);
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

    els.forEach(el => observer.observe(el));
}

/* ============================================================
   9. PROJECT FILTERS
   ============================================================ */
const pfBtns    = document.querySelectorAll('.pf-btn');
const projCards = document.querySelectorAll('.proj-card');

pfBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        pfBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.dataset.f;

        projCards.forEach(card => {
            const show = filter === 'all' || card.dataset.cat === filter;
            if (show) {
                card.classList.remove('hide');
                card.style.animation = 'filterIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards';
            } else {
                card.style.animation = 'filterOut 0.3s ease forwards';
                setTimeout(() => card.classList.add('hide'), 300);
            }
        });
    });
});

/* ============================================================
   10. CARD MOUSE-GLOW
   ============================================================ */
document.querySelectorAll('.svc-card, .proj-card, .ach-card, .holo-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
        const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
        card.style.setProperty('--mouse-x', x + '%');
        card.style.setProperty('--mouse-y', y + '%');
    });
});

/* ============================================================
   11. PARALLAX ORBS
   ============================================================ */
const orbGold   = document.querySelector('.orb-gold');
const orbViolet = document.querySelector('.orb-violet');
const orbRose   = document.querySelector('.orb-rose');

window.addEventListener('scroll', () => {
    const s = window.pageYOffset;
    if (orbGold)   orbGold.style.transform   = `translateY(${s * 0.12}px)`;
    if (orbViolet) orbViolet.style.transform  = `translateY(${s * -0.08}px)`;
    if (orbRose)   orbRose.style.transform    = `translateY(${s * 0.06}px) translateX(${s * 0.03}px)`;
}, { passive: true });

/* ============================================================
   12. INJECT CSS KEYFRAMES
   ============================================================ */
const dynStyle = document.createElement('style');
dynStyle.textContent = `
    @keyframes filterIn {
        from { opacity: 0; transform: translateY(24px) scale(0.94); }
        to   { opacity: 1; transform: translateY(0)    scale(1); }
    }
    @keyframes filterOut {
        from { opacity: 1; transform: translateY(0)    scale(1); }
        to   { opacity: 0; transform: translateY(24px) scale(0.94); }
    }
    @keyframes shimmer {
        0%   { background-position: -200% 0; }
        100% { background-position:  200% 0; }
    }
`;
document.head.appendChild(dynStyle);

/* ============================================================
   13. INIT CALLS
   ============================================================ */
updateActiveNav();

/* ============================================================
   14. CONSOLE ART
   ============================================================ */
console.log(
    '%c\n' +
    '  ╔═══════════════════════════╗\n' +
    '  ║   AJAY SHIRKE · AI/ML     ║\n' +
    '  ║   Neural Nebula v2.0      ║\n' +
    '  ╚═══════════════════════════╝\n',
    'color:#06B6D4;font-family:monospace;font-weight:bold'
);
console.log('%c👋 Hi Developer! Built with passion & AI ♥', 'color:#F59E0B;font-size:14px;font-weight:bold');
console.log('%c📧 ajayshirke1075@gmail.com', 'color:#8888AA;font-size:12px');
