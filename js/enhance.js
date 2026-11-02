/* ============================================================
   AJAY SHIRKE — INTERACTIVE NEURAL ENGINE & SPOTLIGHT JS
   Modern AI Developer Interactions: AI Terminal, Spotlight,
   Project Filtering, Clipboard, and Responsive Micro-animations
   ============================================================ */
'use strict';

document.addEventListener('DOMContentLoaded', () => {

    /* ============================================================
       1. CARD SPOTLIGHT & 3D TILT EFFECT
       Tracks mouse position relative to card for dynamic glow
       ============================================================ */
    const spotlightCards = document.querySelectorAll('.holo-card, .svc-card, .proj-card, .ach-card, .fullscreen-photo-panel');
    
    spotlightCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Subtle 3D tilt for cards (excluding photo panel for stability)
            if (!card.classList.contains('fullscreen-photo-panel')) {
                const cx = rect.width / 2;
                const cy = rect.height / 2;
                const rotX = ((y - cy) / cy) * -4;
                const rotY = ((x - cx) / cx) * 4;
                card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-4px)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    /* ============================================================
       2. INTERACTIVE AI TERMINAL / COMMAND CENTER
       Full interactive terminal with rich command outputs
       ============================================================ */
    const terminalInput = document.getElementById('terminalInput');
    const terminalOutput = document.getElementById('terminalOutput');
    const terminalChips = document.querySelectorAll('.terminal-chip');

    const commands = {
        help: `
<div style="color: var(--cyan); font-weight: 600;">Available commands:</div>
  <span style="color: #F59E0B;">whoami</span>     - Professional summary & background
  <span style="color: #6366F1;">skills</span>     - AI/ML technical arsenal & tools
  <span style="color: #10B981;">projects</span>   - Top featured AI & software deployments
  <span style="color: #06B6D4;">metrics</span>    - Key statistics & model accuracies
  <span style="color: #EC4899;">contact</span>    - Direct links & contact information
  <span style="color: #94A3B8;">clear</span>      - Clear terminal screen
`,
        whoami: `
<div style="color: #F8FAFC; line-height: 1.6;">
  <span style="color: #10B981; font-weight:700;">● Ajay Shirke</span> — AI/ML Engineer & Python Developer<br>
  🎓 <strong style="color: #F8FAFC;">Degree:</strong> B.E. in Artificial Intelligence<br>
  📍 <strong style="color: #F8FAFC;">Location:</strong> Navi Mumbai, India (Remote-friendly)<br>
  ⚡ <strong style="color: #F8FAFC;">Core Focus:</strong> Deep Learning (CNNs), Computer Vision (OpenCV), NLP, and full-stack AI applications (Streamlit/Flask).<br>
  💼 <strong style="color: #F8FAFC;">Availability:</strong> Open to AI/ML internships, full-time engineering roles & freelance collaborations.
</div>
`,
        skills: `
<div style="line-height: 1.6;">
  <div style="color: #F59E0B; font-weight: 700;">// MACHINE LEARNING & DEEP LEARNING:</div>
  • Python, PyTorch, TensorFlow, Keras, OpenCV, Scikit-learn, HuggingFace<br>
  <div style="color: #6366F1; font-weight: 700; margin-top: 6px;">// DATA SCIENCE & VISUALIZATION:</div>
  • NumPy, Pandas, Matplotlib, Seaborn, Plotly, Jupyter<br>
  <div style="color: #06B6D4; font-weight: 700; margin-top: 6px;">// APPLICATION & DEPLOYMENT:</div>
  • Streamlit, Flask, PyWebIO, HTML5/CSS3/JavaScript, Git/GitHub, Docker
</div>
`,
        projects: `
<div style="line-height: 1.6;">
  <div style="color: #10B981; font-weight:700;">🚀 TOP PRODUCTION PROJECTS:</div>
  1. <strong style="color:#FFF;">Emotion Detection System</strong> — Multi-modal facial emotion classifier (CNN, 92% Acc)<br>
  2. <strong style="color:#FFF;">MNIST Digit Recognition</strong> — Interactive neural network with Streamlit drawboard (98% Acc)<br>
  3. <strong style="color:#FFF;">AI Career Advisor</strong> — Personalized skill matching engine for 5+ client use cases<br>
  4. <strong style="color:#FFF;">Toxicity & Sentiment Detector</strong> — NLP pipeline for real-time text moderation<br>
  5. <strong style="color:#FFF;">Interactive Analytics Dashboard</strong> — Forecasts & exploratory dashboards in Streamlit<br>
  <span style="color: var(--txt-muted);">Scroll to <a href="#projects" style="color: var(--cyan); text-decoration: underline;">#projects</a> to test live demos and view GitHub repositories.</span>
</div>
`,
        metrics: `
<div style="line-height: 1.6;">
  <span style="color: #F59E0B; font-weight:700;">📊 VERIFIED METRICS:</span><br>
  • <strong style="color:#FFF;">15+</strong> AI/ML Projects Developed &amp; Deployed<br>
  • <strong style="color:#FFF;">5+</strong> Freelance Clients Served with 100% Satisfaction<br>
  • <strong style="color:#FFF;">98.2%</strong> Highest Classification Accuracy on Test Datasets<br>
  • <strong style="color:#FFF;">3+</strong> Professional Certifications in Python &amp; Deep Learning
</div>
`,
        contact: `
<div style="line-height: 1.6;">
  <span style="color: #EC4899; font-weight:700;">📬 GET IN TOUCH:</span><br>
  • Email: <a href="mailto:ajayshirke1075@gmail.com" style="color: var(--cyan);">ajayshirke1075@gmail.com</a> (Click 'Copy Email' below)<br>
  • GitHub: <a href="https://github.com/AjayShirke1075" target="_blank" style="color: var(--cyan);">github.com/AjayShirke1075</a><br>
  • LinkedIn: <a href="https://www.linkedin.com/in/ajay-shirke-862334322/" target="_blank" style="color: var(--cyan);">linkedin.com/in/ajay-shirke-862334322/</a>
</div>
`
    };

    let cmdHistory = [];
    let historyIdx = -1;

    function runTerminalCommand(rawCmd) {
        if (!terminalOutput) return;
        const cmd = rawCmd.trim().toLowerCase();
        if (!cmd) return;

        cmdHistory.push(rawCmd);
        historyIdx = cmdHistory.length;

        // Command Prompt Line
        const promptLine = document.createElement('div');
        promptLine.style.cssText = 'color: var(--cyan); margin-top: 10px;';
        promptLine.innerHTML = `<span style="color: var(--indigo); font-weight:700;">ajay@ai-core:~$</span> ${escapeHTML(rawCmd)}`;
        terminalOutput.appendChild(promptLine);

        // Command Response
        const responseLine = document.createElement('div');
        responseLine.style.cssText = 'margin: 6px 0 14px; padding-left: 12px; border-left: 2px solid var(--indigo);';

        if (cmd === 'clear') {
            terminalOutput.innerHTML = '';
            return;
        } else if (commands[cmd]) {
            responseLine.innerHTML = commands[cmd];
        } else {
            responseLine.innerHTML = `
                <span style="color: #EF4444;">Command not found: '${escapeHTML(cmd)}'.</span><br>
                <span style="color: var(--txt-muted);">Type <strong style="color: var(--cyan); cursor:pointer;" onclick="runQuickCmd('help')">'help'</strong> to see available commands.</span>
            `;
        }

        terminalOutput.appendChild(responseLine);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    window.runQuickCmd = function(cmd) {
        if (terminalInput) terminalInput.value = cmd;
        runTerminalCommand(cmd);
        if (terminalInput) terminalInput.value = '';
    };

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = terminalInput.value;
                terminalInput.value = '';
                runTerminalCommand(cmd);
            } else if (e.key === 'ArrowUp') {
                if (historyIdx > 0) {
                    historyIdx--;
                    terminalInput.value = cmdHistory[historyIdx] || '';
                }
                e.preventDefault();
            } else if (e.key === 'ArrowDown') {
                if (historyIdx < cmdHistory.length - 1) {
                    historyIdx++;
                    terminalInput.value = cmdHistory[historyIdx] || '';
                } else {
                    historyIdx = cmdHistory.length;
                    terminalInput.value = '';
                }
                e.preventDefault();
            }
        });
    }

    terminalChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const cmd = chip.getAttribute('data-cmd');
            if (cmd) {
                runTerminalCommand(cmd);
            }
        });
    });

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    /* ============================================================
       3. INTERACTIVE PROJECT FILTERING WITH ANIMATIONS
       ============================================================ */
    const filterBtns = document.querySelectorAll('.pf-btn');
    const projCards = document.querySelectorAll('.proj-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-f') || 'all';

            projCards.forEach(card => {
                const cat = card.getAttribute('data-cat');
                if (filter === 'all' || cat === filter) {
                    card.style.display = '';
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95) translateY(10px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1) translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    /* ============================================================
       4. INTERACTIVE CLIPBOARD & TOAST NOTIFICATION
       ============================================================ */
    const toast = document.getElementById('toastNotification');
    const toastMsg = document.getElementById('toastMessage');

    function showToast(message) {
        if (!toast) return;
        if (toastMsg) toastMsg.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    const copyEmailBtn = document.getElementById('copyEmailBtn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = 'ajayshirke1075@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                showToast(`Copied ${email} to clipboard!`);
            }).catch(() => {
                showToast(`Email: ${email}`);
            });
        });
    }

    // Also trigger copy toast when clicking the email row in contact
    const emailLink = document.querySelector('a.c-link[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', (e) => {
            navigator.clipboard.writeText('ajayshirke1075@gmail.com').then(() => {
                showToast('Email address copied to clipboard!');
            }).catch(() => {});
        });
    }

    /* ============================================================
       5. INTERACTIVE ROLE PILLS (HERO SECTION)
       ============================================================ */
    const rolePills = document.querySelectorAll('.role-pill');
    rolePills.forEach(pill => {
        pill.addEventListener('click', () => {
            rolePills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            const roleName = pill.textContent.trim();
            showToast(`Filtering focus: ${roleName}`);
        });
    });

    /* ============================================================
       6. DYNAMIC LIVE HUD JITTER (Realistic AI Inferencing Look)
       ============================================================ */
    const accChipVal = document.querySelector('.hud-top-right .hud-chip-val');
    if (accChipVal) {
        let tick = 0;
        setInterval(() => {
            tick++;
            const jitter = (Math.sin(tick * 0.5) * 0.2 + (Math.random() * 0.1 - 0.05)).toFixed(1);
            const val = (98.2 + parseFloat(jitter)).toFixed(1);
            accChipVal.textContent = val + '%';
        }, 2400);
    }

});
