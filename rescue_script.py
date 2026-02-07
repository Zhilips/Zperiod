
import re

path = "/Users/zhilips/Desktop/_Projects/Zperiod local 没有混淆/script.js"

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# --- Defines ---

# 1. New Balancer UI
new_balancer_ui = """function generateBalancerToolContent() {
    return `
        <div class="molar-tool-layout">
            <div class="molar-input-panel">
                <div style="background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 20px; padding: 24px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02); margin-bottom: 24px;">
                    <div style="margin-bottom: 12px;">
                        <label for="reactants-input" style="font-size: 0.8rem; font-weight: 700; color: #86868b; margin-bottom: 8px; display: block; letter-spacing: 0.05em; text-transform: uppercase;">
                            ${t('Reactants', '反应物')}
                        </label>
                        <input type="text" id="reactants-input" placeholder="Fe + O2" autocomplete="off" spellcheck="false"
                               style="width: 100%; padding: 16px 16px; font-size: 1.2rem; font-family: 'SF Pro Display', system-ui, sans-serif; font-weight: 500; border: 1px solid rgba(0,0,0,0.1); border-radius: 12px; background: #fafafa; color: #1d1d1f; box-shadow: inset 0 1px 2px rgba(0,0,0,0.02); transition: all 0.2s;">
                    </div>
                    <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 12px; opacity: 0.3;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                    </div>
                    <div style="margin-bottom: 24px;">
                        <label for="products-input" style="font-size: 0.8rem; font-weight: 700; color: #86868b; margin-bottom: 8px; display: block; letter-spacing: 0.05em; text-transform: uppercase;">
                            ${t('Products', '生成物')}
                        </label>
                        <input type="text" id="products-input" placeholder="Fe2O3" autocomplete="off" spellcheck="false"
                               style="width: 100%; padding: 16px 16px; font-size: 1.2rem; font-family: 'SF Pro Display', system-ui, sans-serif; font-weight: 500; border: 1px solid rgba(0,0,0,0.1); border-radius: 12px; background: #fafafa; color: #1d1d1f; box-shadow: inset 0 1px 2px rgba(0,0,0,0.02); transition: all 0.2s;">
                    </div>
                    <button id="auto-balance-btn" style="width: 100%; padding: 16px; background: #007aff; color: white; border: none; border-radius: 14px; font-size: 1.05rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 12px rgba(0,122,255,0.25); transition: transform 0.1s;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 3v1m0 16v1m-9-9h1m16 0h1m-2.64-6.36l-.7.7m-12.02 12.02l-.7.7m0-12.72l.7.7m12.02 12.02l.7.7"/>
                        </svg>
                        ${t('Balance Equation', '配平方程式')}
                    </button>
                    <div class="balancer-status-bar" id="balance-feedback" style="margin-top: 20px; text-align: center; font-size: 0.9rem; color: #64748b; min-height: 24px;">
                        ${t('Enter equation to balance', '输入方程式以进行配平')}
                    </div>
                </div>
                <div class="balancer-result-box" id="balanced-result" style="display: none; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 20px; padding: 24px; text-align: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);">
                    <div class="balancer-result-label" style="color: #166534; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">${t('Result', '配平结果')}</div>
                    <div class="balancer-result-equation" id="balanced-equation-text" style="font-size: 1.6rem; font-weight: 600; color: #15803d; font-family: 'SF Pro Display', sans-serif;"></div>
                </div>
            </div>
            <div class="molar-scale-stage">
                <div class="physics-scale-container" style="height: 100%; min-height: 520px; background: #fff; border-radius: 24px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; border: 1px solid rgba(0,0,0,0.04); box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05);">
                    <div style="position: absolute; bottom: 15px; display: flex; flex-direction: column; align-items: center; z-index: 0; pointer-events: none;">
                        <div class="physics-stand-metallic" style="width: 14px; height: 210px; border-radius: 7px 7px 0 0; background: linear-gradient(90deg, #e5e7eb, #d1d5db, #e5e7eb);"></div>
                        <div class="physics-base-metallic" style="width: 140px; height: 22px; border-radius: 9999px; margin-top: -4px; border-top: 1px solid #9ca3af; background: linear-gradient(180deg, #d1d5db, #f3f4f6);"></div>
                    </div>
                    <div id="physics-pivot" style="position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%); margin-top: -50px; z-index: 30; display: flex; align-items: center; justify-content: center; pointer-events: none;">
                        <div style="width: 44px; height: 44px; background: linear-gradient(145deg, #f3f4f6, #d1d5db); border-radius: 9999px; box-shadow: 0 4px 15px rgba(0,0,0,0.15); display: flex; align-items: center; justify-content: center; border: 3px solid #e5e7eb; position: relative; z-index: 40;">
                            <div id="physics-needle" class="physics-needle" style="width: 4px; height: 40px; background: #ef4444; position: absolute; bottom: 50%; left: 50%; margin-left: -2px; transform-origin: bottom center; z-index: 60; border-radius: 2px;"></div>
                            <div style="width: 16px; height: 16px; background: linear-gradient(145deg, #6b7280, #374151); border-radius: 9999px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.4); position: absolute; z-index: 50;"></div>
                        </div>
                    </div>
                    <div id="physics-beam-assembly" class="physics-beam-metallic" style="position: absolute; top: 40%; left: 50%; width: 340px; height: 14px; border-radius: 9999px; margin-top: -50px; margin-left: -170px; display: flex; justify-content: space-between; align-items: center; z-index: 20; background: linear-gradient(180deg, #e5e7eb, #9ca3af);">
                        <div class="physics-beam-ruler"></div>
                        <div id="physics-hanger-left" style="position: absolute; left: 20px; top: 7px; width: 24px; display: flex; flex-direction: column; align-items: center; transform-origin: top center; transform: translateX(-50%); transition: transform 0.1s linear;">
                            <div class="physics-support-rod" style="pointer-events: none; width: 2px; height: 60px; background: #9ca3af; margin-bottom:-2px;">
                                <div class="physics-joint-ring physics-joint-top" style="width: 8px; height: 8px; background: #6b7280; border-radius: 50%; margin-left: -3px; margin-top: -4px;"></div>
                            </div>
                            <div class="physics-pan-metallic" style="width: 90px; height: 12px; border-radius: 2px 2px 14px 14px; position: relative; border-top: 1px solid #6b7280; background: linear-gradient(90deg, #d1d5db, #f3f4f6, #d1d5db); box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                                <div id="physics-pan-label-left" class="physics-pan-label" style="font-size: 0.85rem; font-weight: 700; color: #ef4444; position: absolute; bottom: -24px; width: 100%; text-align: center;"></div>
                            </div>
                            <div id="left-atom-count" style="position: absolute; top: 20px; width: 120px; display: flex; flex-wrap: wrap; justify-content: center; gap: 4px; pointer-events: none;"></div>
                        </div>
                        <div id="physics-hanger-right" style="position: absolute; right: 20px; top: 7px; width: 24px; display: flex; flex-direction: column; align-items: center; transform-origin: top center; transform: translateX(50%); transition: transform 0.1s linear;">
                            <div class="physics-support-rod" style="pointer-events: none; width: 2px; height: 60px; background: #9ca3af; margin-bottom:-2px;">
                                <div class="physics-joint-ring physics-joint-top" style="width: 8px; height: 8px; background: #6b7280; border-radius: 50%; margin-left: -3px; margin-top: -4px;"></div>
                            </div>
                            <div class="physics-pan-metallic" style="width: 90px; height: 12px; border-radius: 2px 2px 14px 14px; position: relative; border-top: 1px solid #6b7280; background: linear-gradient(90deg, #d1d5db, #f3f4f6, #d1d5db); box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                                <div id="physics-pan-label-right" class="physics-pan-label" style="font-size: 0.85rem; font-weight: 700; color: #007aff; position: absolute; bottom: -24px; width: 100%; text-align: center;"></div>
                            </div>
                            <div id="right-atom-count" style="position: absolute; top: 20px; width: 120px; display: flex; flex-wrap: wrap; justify-content: center; gap: 4px; pointer-events: none;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="physics-card-left" style="display:none;"></div>
        <div id="physics-card-right" style="display:none;"></div>
    `;
}"""

# 2. New Balancer Logic
new_balancer_logic = """function attachBalancerListeners() {
    const reactantsInput = document.getElementById('reactants-input');
    const productsInput = document.getElementById('products-input');
    const autoBalanceBtn = document.getElementById('auto-balance-btn');
    const feedback = document.getElementById('balance-feedback');
    const leftAtomCount = document.getElementById('left-atom-count');
    const rightAtomCount = document.getElementById('right-atom-count');
    const balancedResult = document.getElementById('balanced-result');
    const balancedText = document.getElementById('balanced-equation-text');

    const physicsBeam = document.getElementById('physics-beam-assembly');
    const physicsHangerLeft = document.getElementById('physics-hanger-left');
    const physicsHangerRight = document.getElementById('physics-hanger-right');
    const physicsNeedle = document.getElementById('physics-needle');
    const physicsPanLabelLeft = document.getElementById('physics-pan-label-left');
    const physicsPanLabelRight = document.getElementById('physics-pan-label-right');

    const physicsState = { leftWeight: 0, rightWeight: 0, currentAngle: 0, targetAngle: 0, velocity: 0 };
    const PHYSICS = { maxAngle: 20, sensitivity: 2.5, stiffness: 0.015, damping: 0.92 };
    let animationRunning = false;

    function parseFormula(formula) {
        if (!formula.trim()) return {};
        const atoms = {};
        const compounds = formula.split('+').map(s => s.trim());
        compounds.forEach(compound => {
            const match = compound.match(/^(\d*)/);
            const coef = match && match[1] ? parseInt(match[1]) : 1;
            const formulaPart = compound.replace(/^\d*/, '');
            let expandedFormula = formulaPart.replace(/\([^)]+\)\d*/g, ''); 
            const elementRegex = /([A-Z][a-z]?)(\d*)/g;
            let elemMatch;
            while ((elemMatch = elementRegex.exec(expandedFormula)) !== null) {
                const element = elemMatch[1];
                const count = elemMatch[2] ? parseInt(elemMatch[2]) : 1;
                atoms[element] = (atoms[element] || 0) + count * coef;
            }
        });
        return atoms;
    }
    
    function formatAtomCountsHTML(atoms, side) {
        if (Object.keys(atoms).length === 0) return `<span style="color: #94a3b8; font-size: 12px;">—</span>`;
        return Object.entries(atoms).map(([el, count]) => `<span class="atom-tag ${side}">${el}<sub>${count}</sub></span>`).join('');
    }

    function animatePhysics() {
        if (!physicsBeam) return;
        const force = (physicsState.targetAngle - physicsState.currentAngle) * PHYSICS.stiffness;
        physicsState.velocity = (physicsState.velocity + force) * PHYSICS.damping;
        physicsState.currentAngle += physicsState.velocity;
        physicsBeam.style.transform = `rotate(${physicsState.currentAngle}deg)`;
        if (physicsHangerLeft) physicsHangerLeft.style.transform = `translateX(-50%) rotate(${-physicsState.currentAngle}deg)`;
        if (physicsHangerRight) physicsHangerRight.style.transform = `translateX(50%) rotate(${-physicsState.currentAngle}deg)`;
        if (physicsNeedle) physicsNeedle.style.transform = `translate(-50%, 0) rotate(${physicsState.currentAngle}deg)`;
        if (Math.abs(physicsState.velocity) > 0.001 || Math.abs(physicsState.currentAngle - physicsState.targetAngle) > 0.001) {
            requestAnimationFrame(animatePhysics);
        } else { animationRunning = false; }
    }
    
    function startAnimation(impulse = false) {
        if (impulse) physicsState.velocity += 2.0;
        if (!animationRunning) { animationRunning = true; animatePhysics(); }
    }

    function updateScale() {
        const rVal = reactantsInput ? reactantsInput.value.trim() : '';
        const pVal = productsInput ? productsInput.value.trim() : '';
        if (physicsPanLabelLeft) { physicsPanLabelLeft.textContent = rVal; physicsPanLabelLeft.classList.toggle('has-content', !!rVal); }
        if (physicsPanLabelRight) { physicsPanLabelRight.textContent = pVal; physicsPanLabelRight.classList.toggle('has-content', !!pVal); }
        const leftAtoms = parseFormula(rVal);
        const rightAtoms = parseFormula(pVal);
        if (leftAtomCount) leftAtomCount.innerHTML = formatAtomCountsHTML(leftAtoms, 'left');
        if (rightAtomCount) rightAtomCount.innerHTML = formatAtomCountsHTML(rightAtoms, 'right');
        const allElements = new Set([...Object.keys(leftAtoms), ...Object.keys(rightAtoms)]);
        let leftTotal = 0; let rightTotal = 0;
        allElements.forEach(el => { leftTotal += (leftAtoms[el]||0); rightTotal += (rightAtoms[el]||0); });
        physicsState.targetAngle = Math.max(Math.min((rightTotal - leftTotal) * PHYSICS.sensitivity, PHYSICS.maxAngle), -PHYSICS.maxAngle);
        startAnimation();
        if (feedback) {
             feedback.classList.remove('balanced', 'unbalanced');
             if (rVal && pVal && leftTotal === rightTotal && leftTotal > 0) {
                 feedback.classList.add('balanced');
                 feedback.innerHTML = `<span class="status-icon">✓</span> Balanced!`;
             } else if (rVal || pVal) {
                 feedback.classList.add('unbalanced');
                 feedback.innerHTML = `<span class="status-icon">⚠</span> Not balanced`;
             } else {
                 feedback.innerHTML = 'Enter equation';
             }
        }
    }

    function autoBalance() {
        try {
            const equation = (reactantsInput.value || '') + " → " + (productsInput.value || '');
            const result = balanceEquationModal(equation);
            const parts = result.balanced.split('→');
            reactantsInput.value = parts[0].trim();
            productsInput.value = parts[1].trim();
            updateScale();
            if (balancedResult) {
                balancedResult.style.display = 'block';
                balancedText.innerHTML = formatChemicalEquation(result.balanced);
            }
        } catch (e) {}
    }

    if (reactantsInput) reactantsInput.addEventListener('input', updateScale);
    if (productsInput) productsInput.addEventListener('input', updateScale);
    if (autoBalanceBtn) autoBalanceBtn.addEventListener('click', autoBalance);
    startAnimation(true);
}"""

# 3. New Molar Mass UI
new_molar_ui = """function generateMolarMassToolContent() {
    return `
        <div class="molar-tool-layout">
            <div class="molar-input-panel">
                <div style="background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 20px; padding: 24px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02); margin-bottom: 24px;">
                    <div class="tool-input-section">
                        <label for="modal-formula-input" style="font-size: 0.85rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 12px; display: block; letter-spacing: 0.05em; text-transform: uppercase;">${t('Chemical Formula', '化学式')}</label>
                        <div style="position: relative; margin-bottom: 24px;">
                            <input type="text" id="modal-formula-input" placeholder="e.g. H2O" class="tool-input" autocomplete="off" spellcheck="false"
                                   style="width: 100%; padding: 18px 20px; font-size: 1.4rem; font-family: 'SF Pro Display', system-ui, sans-serif; font-weight: 500; border: 1px solid rgba(0,0,0,0.1); border-radius: 16px; background: #fafafa; color: #1d1d1f; box-shadow: inset 0 2px 4px rgba(0,0,0,0.03); transition: all 0.2s;">
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 12px;">
                            <div id="formatted-formula-display" style="min-height: 48px; display: flex; align-items: center; flex-wrap: wrap; gap: 2px; font-family: 'SF Pro Display', system-ui, sans-serif; font-size: 2rem; font-weight: 600; color: #1d1d1f; letter-spacing: 0.02em;">
                                <span style="opacity: 0.2; font-weight: 500;">H₂O</span>
                            </div>
                            <label style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 600; color: #86868b; cursor: pointer; padding-bottom: 8px; user-select: none;">
                                <input type="checkbox" id="modal-exact-toggle" style="width: 16px; height: 16px; accent-color: #007aff; border-radius: 4px; cursor: pointer;">
                                ${t('Exact Decimals', '精确小数')}
                            </label>
                        </div>
                        <div id="formula-error-msg" style="color: #ff3b30; font-size: 0.9rem; font-weight: 500; min-height: 24px;"></div>
                        <div id="scale-display-area" style="text-align: center; margin-top: 20px;">
                            <div id="scale-display-value" style="font-size: 4rem; font-weight: 700; background: -webkit-linear-gradient(45deg, #1d1d1f, #434344); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">0.00</div>
                            <div style="font-size: 1rem; color: #86868b; font-weight: 600; margin-top: -5px;">g/mol</div>
                        </div>
                    </div>
                </div>
                <div id="scale-blocks-area" style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; min-height: 100px;"></div>
            </div>
            <div class="molar-scale-stage" style="display: flex; justify-content: center; align-items: start; padding-top: 40px;">
                <div id="receipt-wrapper" class="receipt-wrapper">
                    <div class="receipt-paper">
                        <div class="receipt-content">
                            <div class="receipt-header">
                                <div class="receipt-logo">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                </div>
                                <div class="receipt-title">${t('MOLAR RECEIPT', '摩尔小票')}</div>
                                <div class="receipt-date" id="receipt-date"></div>
                            </div>
                            <div class="receipt-divider">--------------------------------</div>
                            <div id="receipt-items"></div>
                            <div class="receipt-divider">--------------------------------</div>
                            <div class="receipt-total-row">
                                <span>${t('TOTAL', '总计')}</span>
                                <span id="receipt-total-value">0.00</span>
                            </div>
                            <div class="receipt-footer">* ${t('THANK YOU', '谢谢惠顾')} *</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}"""

# 4. New Molar Logic
new_molar_logic = """function attachMolarMassListeners() {
    const input = document.getElementById('modal-formula-input');
    const formattedDisplay = document.getElementById('formatted-formula-display');
    const errorMsg = document.getElementById('formula-error-msg');
    const exactToggle = document.getElementById('modal-exact-toggle');

    const runCalculation = (formulaOverride) => {
        const formula = formulaOverride || input.value.trim();
        const isExact = exactToggle ? exactToggle.checked : false;
        if (!formula) { updateRealtimeScale(null); return; }
        try {
            const result = calculateMolarMassModal(formula, isExact);
            updateRealtimeScale(result);
            if (errorMsg) errorMsg.textContent = '';
        } catch (e) {
            updateRealtimeScale(null);
            if (errorMsg) errorMsg.textContent = t('Check Formula', '检查公式');
        }
    };

    const updateRealtimeScale = (result) => {
        const scaleDisplay = document.getElementById('scale-display-value');
        const blocksArea = document.getElementById('scale-blocks-area');
        discardReceipt();
        if (result) {
            scaleDisplay.textContent = result.total;
            if (typeof displayMolarMassResult === 'function') displayMolarMassResult(result);
        } else {
            scaleDisplay.textContent = "0.00";
            blocksArea.innerHTML = '';
        }
    };

    if (exactToggle) {
        exactToggle.addEventListener('change', () => {
            const val = input.value;
            const parsed = smartParseFormula(val);
            runCalculation(parsed.cleanFormula);
        });
    }

    if (input) {
        input.addEventListener('input', (e) => {
            const val = input.value;
            const parsed = smartParseFormula(val);
            if (formattedDisplay) {
                if (!val) formattedDisplay.innerHTML = '<span style="opacity:0.3; color:#cbd5e1;">H₂O</span>';
                else formattedDisplay.innerHTML = parsed.displayHtml;
            }
            if (errorMsg && parsed.suspicious) errorMsg.textContent = 'Did you mean ' + parsed.suspicious;
            runCalculation(parsed.cleanFormula);
        });
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const result = calculateMolarMassModal(smartParseFormula(input.value).cleanFormula, exactToggle ? exactToggle.checked : false);
                if (result) printReceipt(result); 
            }
        });
        input.dispatchEvent(new Event('input'));
    }
}"""

# 5. Missing Helpers
helpers = """
function smartParseFormula(input) {
    if (!input) return { displayHtml: '', cleanFormula: '', isValid: false };
    let processed = input.trim().replace(/[\\s\\*\\+\\。\\·]+/g, '.').replace(/\\.+/g, '.');
    const tokens = processed.match(/([A-Za-z]+|[0-9]+|[\\(\\)\\[\\]\\.])/g) || [];
    let displayHtml = ''; let cleanFormula = '';
    for (let i = 0; i < tokens.length; i++) {
        let t = tokens[i];
        if (/^[0-9]+$/.test(t)) {
             const subs = t.split('').map(d => '₀₁₂₃₄₅₆₇₈₉'[parseInt(d)]).join('');
             displayHtml += `<span style="font-size: 0.85em; opacity: 0.9;">${subs}</span>`;
             cleanFormula += t;
        } else if (t === '.') {
             displayHtml += '<span style="margin: 0 4px; font-weight: bold;">·</span>';
             cleanFormula += '.';
        } else {
             displayHtml += t; cleanFormula += t;
        }
    }
    return { displayHtml, cleanFormula, isValid: true };
}

function displayMolarMassResult(result) {
    const blocksArea = document.getElementById('scale-blocks-area');
    if(blocksArea) {
        blocksArea.innerHTML = '';
        const totalMass = parseFloat(result.total);
        result.breakdown.forEach(item => {
            const subtotalVal = parseFloat(item.subtotal);
            const percent = totalMass > 0 ? ((subtotalVal / totalMass) * 100).toFixed(1) : 0;
            const block = document.createElement('div');
            block.className = 'element-block';
            block.textContent = item.element;
            const size = 50 + (percent * 0.8);
            block.style.width = `${Math.min(size, 100)}px`;
            block.style.height = `${Math.min(size, 100)}px`;
            const hue = (item.element.charCodeAt(0) * 20 + item.element.length * 10) % 360;
            block.style.background = `linear-gradient(135deg, hsl(${hue}, 70%, 60%), hsl(${hue}, 70%, 40%))`;
            blocksArea.appendChild(block);
        });
    }
}

function discardReceipt() {
    const wrapper = document.getElementById('receipt-wrapper');
    if (wrapper) { wrapper.classList.remove('printing'); wrapper.classList.add('discarding'); setTimeout(() => wrapper.classList.remove('discarding'), 300); }
}

function printReceipt(result) {
    const wrapper = document.getElementById('receipt-wrapper');
    const items = document.getElementById('receipt-items');
    const total = document.getElementById('receipt-total-value');
    const date = document.getElementById('receipt-date');
    if (wrapper && items) {
        date.textContent = new Date().toLocaleString();
        wrapper.classList.remove('discarding');
        wrapper.classList.add('printing');
        let html = '';
        result.breakdown.forEach(item => {
            html += `<div class="receipt-item-row"><div class="receipt-item-name"><strong>${item.element}</strong> x${item.count}</div><div>${item.subtotal}</div></div>`;
        });
        items.innerHTML = html;
        total.textContent = result.total + ' g/mol';
    }
}
"""

def replace_function(content, func_name, new_code):
    pattern = re.compile(r'function\s+' + func_name + r'\s*\([^)]*\)\s*\{')
    match = pattern.search(content)
    if not match:
        print(f"Adding new function {func_name}")
        return content + "\\n" + new_code + "\\n"
    
    start = match.start()
    # Find end
    brace = 0
    started = False
    end = -1
    for i in range(start, len(content)):
        if content[i] == '{': brace+=1; started=True
        elif content[i] == '}': brace-=1
        if started and brace == 0:
            end = i + 1
            break
    if end != -1:
        print(f"Replacing {func_name}")
        return content[:start] + new_code + content[end:]
    return content

content = replace_function(content, "generateBalancerToolContent", new_balancer_ui)
content = replace_function(content, "attachBalancerListeners", new_balancer_logic)
content = replace_function(content, "generateMolarMassToolContent", new_molar_ui)
content = replace_function(content, "attachMolarMassListeners", new_molar_logic.replace("function attachMolarMassListeners", "function attachMolarMassListeners_New").replace("attachMolarMassListeners_New", "attachMolarMassListeners")) 
# Note: replace_function expects the new_code to have the same or similar declaration. 

content += helpers

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
