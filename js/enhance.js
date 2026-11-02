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
`,
        train: `
<div style="line-height: 1.6; font-family: var(--font-mono); font-size: 0.8rem;">
  <span style="color: #F59E0B; font-weight: 700;">[TRAINING PIPELINE]</span> Initializing PyTorch DataLoader (batch_size=64, optimizer=AdamW, lr=3e-4)...<br>
  <span style="color: #8B5CF6;">Epoch 1/5:</span> [████████████] loss: 0.4320 · val_acc: 87.2% · time: 1.2s<br>
  <span style="color: #8B5CF6;">Epoch 2/5:</span> [████████████] loss: 0.2185 · val_acc: 92.4% · time: 1.1s<br>
  <span style="color: #8B5CF6;">Epoch 3/5:</span> [████████████] loss: 0.0892 · val_acc: 95.8% · time: 1.1s<br>
  <span style="color: #8B5CF6;">Epoch 4/5:</span> [████████████] loss: 0.0415 · val_acc: 97.6% · time: 1.2s<br>
  <span style="color: #10B981;">Epoch 5/5:</span> [████████████] loss: 0.0241 · val_acc: <strong style="color: #10B981;">98.4%</strong> · <strong style="color:#00F5A0;">CONVERGED!</strong><br>
  <span style="color: var(--cyan);">✓ Model checkpoint serialized:</span> <span style="color: #FFF;">weights_best_v2.pt (TensorRT engine optimized)</span>
</div>
`,
        predict: `
<div style="line-height: 1.6; font-family: var(--font-mono); font-size: 0.8rem;">
  <span style="color: var(--cyan); font-weight: 700;">[INFERENCE ENGINE]</span> Loading input tensor shape: <span style="color:#FCD34D;">[1, 3, 224, 224]</span><br>
  • Preprocessing: Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])<br>
  • Forward pass runtime: <strong style="color: #10B981;">7.8ms</strong> (NVIDIA CUDA FP16)<br>
  • Softmax Distribution:<br>
    &nbsp;&nbsp;[0] Class 'Positive / Joy'    : <span style="color:#00F5A0; font-weight:700;">98.42%</span> [███████████████████░]<br>
    &nbsp;&nbsp;[1] Class 'Neutral Focus'     : <span style="color:#94A3B8;">1.28%</span>  [░░░░░░░░░░░░░░░░░░░░]<br>
    &nbsp;&nbsp;[2] Class 'Negative / Strain' : <span style="color:#94A3B8;">0.30%</span>  [░░░░░░░░░░░░░░░░░░░░]<br>
  <span style="color: #10B981; font-weight:700;">✓ Top Prediction: Positive / High Confidence (98.4%)</span>
</div>
`,
        architecture: `
<div style="line-height: 1.5; font-family: var(--font-mono); font-size: 0.78rem; color: #CBD5E1;">
  <span style="color: #6366F1; font-weight: 700;">[PRODUCTION AI ARCHITECTURE]</span><br>
  [Client App: Web/Camera] <br>
      │ (HTTP REST / WebSocket)<br>
      ▼<br>
  [FastAPI / Flask Microservice] ──▶ [Preprocess: OpenCV (Resize, CLAHE, Augment)]<br>
      │<br>
      ▼<br>
  [PyTorch / TensorRT Engine] ─────▶ [Backbone: CNN / Multi-Head Transformer]<br>
      │                             [Latent Dim: 512 · GELU Activation]<br>
      ▼<br>
  [Softmax Head] ──────────────────▶ [Calibrated Probabilities & JSON Telemetry]<br>
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

    /* ============================================================
       7. INTERACTIVE NEURAL ARCHITECTURE SIMULATOR
       ============================================================ */
    const labModalityBtns = document.querySelectorAll('.lab-mode-btn');
    const runInferenceBtn = document.getElementById('runInferenceBtn');
    const inputDim = document.getElementById('inputDim');
    const hidden1Label = document.getElementById('hidden1Label');
    const hidden2Label = document.getElementById('hidden2Label');
    const outLabel1 = document.getElementById('outLabel1');
    const outPct1 = document.getElementById('outPct1');
    const outBar1 = document.getElementById('outBar1');
    const outLabel2 = document.getElementById('outLabel2');
    const outPct2 = document.getElementById('outPct2');
    const outBar2 = document.getElementById('outBar2');
    const labLatency = document.getElementById('labLatency');
    const labLoss = document.getElementById('labLoss');
    const labBackbone = document.getElementById('labBackbone');

    const modalities = {
        vision: {
            dim: '[1, 3, 224, 224]',
            h1: 'CONV2D + BN<br><span class="col-dim">[64 @ 3x3]</span>',
            h2: 'DENSE + GELU<br><span class="col-dim">[256 Embeddings]</span>',
            l1: 'Emotion: Joy / Confident',
            p1: '98.4%',
            l2: 'Neutral / Focused',
            p2: '1.4%',
            backbone: 'ResNet50 + MultiHeadAttn',
            latency: '8.4 ms',
            loss: '0.0241 (Converged)'
        },
        nlp: {
            dim: '[1, 512 Tokens]',
            h1: 'MULTI-HEAD ATTN<br><span class="col-dim">[12 Heads, d=64]</span>',
            h2: 'FEED-FORWARD<br><span class="col-dim">[768 Hidden Dim]</span>',
            l1: 'Sentiment: Highly Positive',
            p1: '99.2%',
            l2: 'Informational / Neutral',
            p2: '0.7%',
            backbone: 'DistilBERT + BiGRU Head',
            latency: '11.2 ms',
            loss: '0.0194 (Optimal)'
        },
        audio: {
            dim: '[1, 128 Mel-Bands]',
            h1: 'SPEC-CONV2D<br><span class="col-dim">[32 Filters, k=5]</span>',
            h2: 'BILSTM TEMPORAL<br><span class="col-dim">[128 Bi-directional]</span>',
            l1: 'Voice: Confident Speaker',
            p1: '97.8%',
            l2: 'Hesitant / Low Energy',
            p2: '2.0%',
            backbone: 'CNN-BiLSTM Spectrogram',
            latency: '9.6 ms',
            loss: '0.0312 (Converged)'
        }
    };

    let currentModality = 'vision';

    labModalityBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            labModalityBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const modKey = btn.getAttribute('data-modality');
            if (modalities[modKey]) {
                currentModality = modKey;
                const d = modalities[modKey];
                if (inputDim) inputDim.textContent = d.dim;
                if (hidden1Label) hidden1Label.innerHTML = d.h1;
                if (hidden2Label) hidden2Label.innerHTML = d.h2;
                if (outLabel1) outLabel1.textContent = d.l1;
                if (outPct1) outPct1.textContent = d.p1;
                if (outBar1) outBar1.style.width = d.p1;
                if (outLabel2) outLabel2.textContent = d.l2;
                if (outPct2) outPct2.textContent = d.p2;
                if (outBar2) outBar2.style.width = d.p2;
                if (labBackbone) labBackbone.textContent = d.backbone;
                if (labLatency) labLatency.textContent = d.latency;
                if (labLoss) labLoss.textContent = d.loss;
                triggerForwardPassAnimation();
            }
        });
    });

    if (runInferenceBtn) {
        runInferenceBtn.addEventListener('click', () => {
            triggerForwardPassAnimation();
        });
    }

    function triggerForwardPassAnimation() {
        const lab = document.getElementById('neuralLab');
        if (!lab) return;

        lab.classList.remove('running');
        void lab.offsetWidth;
        lab.classList.add('running');

        const layers = ['#layerInput', '#layerHidden1', '#layerHidden2', '#layerOutput'];
        layers.forEach((sel, idx) => {
            setTimeout(() => {
                const el = lab.querySelector(sel);
                if (el) {
                    el.classList.add('pulse-active');
                    setTimeout(() => el.classList.remove('pulse-active'), 500);
                }
            }, idx * 130);
        });

        if (labLatency) {
            const base = parseFloat(modalities[currentModality].latency);
            const variant = (base + (Math.random() * 0.8 - 0.4)).toFixed(1);
            labLatency.textContent = `${variant} ms`;
        }
    }

    /* ============================================================
       8. LIVE NEURAL TELEMETRY HUD JITTER
       ============================================================ */
    const hudLatency = document.getElementById('hudLatency');
    const hudLoss = document.getElementById('hudLoss');
    const hudModel = document.getElementById('hudModel');

    const modelsCycle = ['VisionTransformer-v2', 'ResNet50-FER', 'DistilBERT-Sentiment', 'YOLOv8-Small'];
    let mIdx = 0;

    setInterval(() => {
        if (hudLatency) {
            const lat = (10.5 + Math.random() * 2.5).toFixed(1);
            hudLatency.textContent = `${lat}ms`;
        }
        if (hudLoss) {
            const l = (0.024 + Math.random() * 0.008).toFixed(4);
            hudLoss.textContent = l;
        }
    }, 2800);

    setInterval(() => {
        mIdx = (mIdx + 1) % modelsCycle.length;
        if (hudModel) {
            hudModel.textContent = modelsCycle[mIdx];
        }
    }, 9000);

});
