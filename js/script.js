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
/* ============================================================
   2. SYNAPTIC NEURAL NETWORK CANVAS (Action Potentials & Synapses)
   ============================================================ */
(function initSynapticNetwork() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let mouse = { x: -1000, y: -1000, radius: 180 };

    const isMobile = W < 768;
    const count = isMobile ? 45 : 95;
    const maxDist = isMobile ? 120 : 155;

    // AI/ML Synaptic Colors: Synaptic Cyan, Tensor Violet, Matrix Jade
    const NEURON_COLORS = [
        { r: 0, g: 242, b: 254 },   // Synaptic Cyan
        { r: 139, g: 92, b: 246 },  // Tensor Violet
        { r: 0, g: 245, b: 160 }    // Matrix Jade
    ];

    // Neurons
    const neurons = Array.from({ length: count }, () => {
        const col = NEURON_COLORS[Math.floor(Math.random() * NEURON_COLORS.length)];
        return {
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.45,
            vy: (Math.random() - 0.5) * 0.45,
            baseRadius: Math.random() * 2 + 1.2,
            radius: Math.random() * 2 + 1.2,
            col: col,
            potential: Math.random() * 0.5,
            targetPotential: 0,
            pulseTimer: Math.random() * 200
        };
    });

    // Action Potential Pulses (impulses traveling along synapses)
    const impulses = [];

    document.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
        mouse.x = -1000;
        mouse.y = -1000;
    });

    window.addEventListener('resize', () => {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    });

    function fireSynapse(fromIdx, toIdx) {
        if (impulses.length > 35) return;
        impulses.push({
            from: fromIdx,
            to: toIdx,
            progress: 0,
            speed: 0.018 + Math.random() * 0.015,
            color: neurons[fromIdx].col
        });
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        // Update and draw neurons
        for (let i = 0; i < neurons.length; i++) {
            const n = neurons[i];

            n.x += n.vx;
            n.y += n.vy;

            // Bounce on edges
            if (n.x < 0 || n.x > W) n.vx *= -1;
            if (n.y < 0 || n.y > H) n.vy *= -1;

            // Mouse excitation (synaptic stimulus)
            const dx = mouse.x - n.x;
            const dy = mouse.y - n.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius) {
                const force = (1 - dist / mouse.radius);
                n.potential = Math.min(1.0, n.potential + force * 0.08);
                n.radius = n.baseRadius * (1 + force * 1.2);
            } else {
                n.potential = Math.max(0.1, n.potential * 0.985);
                n.radius = n.baseRadius * (1 + n.potential * 0.4);
            }

            // Periodic firing of action potentials
            n.pulseTimer++;
            if (n.pulseTimer > 240 + Math.random() * 120) {
                n.pulseTimer = 0;
                n.potential = 0.9;
                // Find closest neighbor and fire
                let closest = -1;
                let minDist = maxDist;
                for (let j = 0; j < neurons.length; j++) {
                    if (i === j) continue;
                    const d = Math.hypot(neurons[j].x - n.x, neurons[j].y - n.y);
                    if (d < minDist) {
                        minDist = d;
                        closest = j;
                    }
                }
                if (closest !== -1) fireSynapse(i, closest);
            }

            // Draw neuron halo (activation aura)
            const alpha = 0.3 + n.potential * 0.6;
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.radius * 3.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${n.col.r}, ${n.col.g}, ${n.col.b}, ${alpha * 0.18})`;
            ctx.fill();

            // Draw neuron nucleus
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${n.col.r}, ${n.col.g}, ${n.col.b}, ${alpha})`;
            ctx.fill();
        }

        // Draw synaptic connections (axons)
        for (let i = 0; i < neurons.length; i++) {
            for (let j = i + 1; j < neurons.length; j++) {
                const dx = neurons[i].x - neurons[j].x;
                const dy = neurons[i].y - neurons[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDist) {
                    const norm = 1 - dist / maxDist;
                    const axonAlpha = norm * 0.16 + (neurons[i].potential + neurons[j].potential) * 0.12;

                    ctx.beginPath();
                    ctx.moveTo(neurons[i].x, neurons[i].y);
                    ctx.lineTo(neurons[j].x, neurons[j].y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${Math.min(0.5, axonAlpha)})`;
                    ctx.lineWidth = norm > 0.6 ? 0.9 : 0.5;
                    ctx.stroke();

                    // Chance of firing action potential if both excited
                    if (Math.random() < 0.002 && neurons[i].potential > 0.4) {
                        fireSynapse(i, j);
                    }
                }
            }
        }

        // Draw and update active action potential pulses
        for (let k = impulses.length - 1; k >= 0; k--) {
            const imp = impulses[k];
            imp.progress += imp.speed;

            if (imp.progress >= 1) {
                // Stimulate target neuron upon arrival
                if (neurons[imp.to]) {
                    neurons[imp.to].potential = Math.min(1.0, neurons[imp.to].potential + 0.35);
                }
                impulses.splice(k, 1);
                continue;
            }

            const nFrom = neurons[imp.from];
            const nTo = neurons[imp.to];
            if (!nFrom || !nTo) {
                impulses.splice(k, 1);
                continue;
            }

            const currX = nFrom.x + (nTo.x - nFrom.x) * imp.progress;
            const currY = nFrom.y + (nTo.y - nFrom.y) * imp.progress;

            // Draw electrical spark packet
            ctx.beginPath();
            ctx.arc(currX, currY, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${imp.color.r}, ${imp.color.g}, ${imp.color.b}, 0.95)`;
            ctx.shadowColor = `rgba(${imp.color.r}, ${imp.color.g}, ${imp.color.b}, 0.8)`;
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0; // reset
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
        document.body.classList.toggle('no-scroll');
    });
}

document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks)  navLinks.classList.remove('open');
        if (hamburger) hamburger.classList.remove('open');
        document.body.classList.remove('no-scroll');
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
