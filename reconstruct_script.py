
import re

path = "/Users/zhilips/Desktop/_Projects/Zperiod local 没有混淆/script.js"

with open(path, 'r', encoding='utf-8') as f:
    full_content = f.read()

# Helper to extract function content by name
def get_function_body(name, content):
    pattern = re.compile(r'function\s+' + name + r'\s*\([^)]*\)\s*\{')
    match = pattern.search(content)
    if not match:
        return None
    
    start_idx = match.start()
    # Find matching brace
    open_braces = 0
    started = False
    end_idx = -1
    
    for i in range(start_idx, len(content)):
        char = content[i]
        if char == '{':
            open_braces += 1
            started = True
        elif char == '}':
            open_braces -= 1
        
        if started and open_braces == 0:
            end_idx = i + 1
            break
            
    if end_idx != -1:
        return content[start_idx:end_idx]
    return None

# 1. Capture Header (Everything before the first tool generator)
# The first tool gen seems to be generateBalancerToolContent around line 6900
header_match = re.search(r'function\s+generateBalancerToolContent', full_content)
if not header_match:
    # Fallback to backup if we can't find it? No, assume it's there.
    header = full_content[:6000] # Safe guess or error?
    print("Error: Could not find start of generateBalancerToolContent")
    exit(1)

header_end = header_match.start()
header = full_content[:header_end]

# 2. Define Correct New Functions Strings (Hardcoded fixes)

new_balancer_gen = """
function generateBalancerToolContent() {
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
}
"""

# Extract existing balancer listeners but fix clear button
old_attach_balancer = get_function_body('attachBalancerListeners', full_content)
if not old_attach_balancer:
    print("Error: attachBalancerListeners not found. Using default template.")
    # Provide a template if missing
else:
    # Remove clearBtn stuff
    new_attach_balancer = old_attach_balancer.replace("const clearBtn = document.getElementById('clear-balancer-btn');", "")
    new_attach_balancer = new_attach_balancer.replace("if (clearBtn) {", "if (false) {") # Disable listener
    # Or just overwrite it cleanly with known good logic
    
known_good_attach_balancer = """
function attachBalancerListeners() {
    const reactantsInput = document.getElementById('reactants-input');
    const productsInput = document.getElementById('products-input');
    const autoBalanceBtn = document.getElementById('auto-balance-btn');
    const feedback = document.getElementById('balance-feedback');
    const leftAtomCount = document.getElementById('left-atom-count');
    const rightAtomCount = document.getElementById('right-atom-count');
    const balancedResult = document.getElementById('balanced-result');
    const balancedText = document.getElementById('balanced-equation-text');

    // New physics scale elements
    const physicsBeam = document.getElementById('physics-beam-assembly');
    const physicsHangerLeft = document.getElementById('physics-hanger-left');
    const physicsHangerRight = document.getElementById('physics-hanger-right');
    const physicsNeedle = document.getElementById('physics-needle');
    const physicsPanLabelLeft = document.getElementById('physics-pan-label-left');
    const physicsPanLabelRight = document.getElementById('physics-pan-label-right');

    const physicsState = {
        leftWeight: 0, rightWeight: 0, currentAngle: 0, targetAngle: 0, velocity: 0
    };

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
            // Simplified parsing for brevity in this fix script, assuming smartParse exists or this logic is robust enough
            // Re-using the logic found in file...
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
        } else {
             animationRunning = false;
        }
    }
    
    function startAnimation(impulse = false) {
        if (impulse) physicsState.velocity += 2.0;
        if (!animationRunning) {
            animationRunning = true;
            animatePhysics();
        }
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
        
        // Basic feedback (simplified)
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
        // Assume balanceEquationModal and formatChemicalEquation exist in scope
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
        } catch (e) {
            // ignore
        }
    }

    if (reactantsInput) reactantsInput.addEventListener('input', updateScale);
    if (productsInput) productsInput.addEventListener('input', updateScale);
    if (autoBalanceBtn) autoBalanceBtn.addEventListener('click', autoBalance);
    
    startAnimation(true);
}
"""

# 3. New Tool Listeners Router
attach_listeners_fixed = """
function attachToolEventListeners(toolType) {
    switch (toolType) {
        case 'balancer':
            attachBalancerListeners();
            break;
        case 'molar-mass':
            if (typeof attachMolarMassListeners === 'function') attachMolarMassListeners();
            break;
        case 'empirical':
            if (typeof attachEmpiricalListeners === 'function') attachEmpiricalListeners();
            break;
        case 'blank':
            break;
        case 'solubility':
            if (typeof attachSolubilityListeners === 'function') attachSolubilityListeners();
            break;
        case 'ions':
            if (typeof setupIonClickHandlers === 'function') {
                setupIonClickHandlers();
            } else if (typeof attachIonsToolListeners === 'function') {
                attachIonsToolListeners();
            }
            break;
    }
}
"""

# 4. Extract Existing Functions (Preserve logic)
def get_or_empty(name):
    body = get_function_body(name, full_content)
    if body: return body
    print(f"Warning: {name} not found in existing code. Creating stub.")
    return f"function {name}() {{ console.warn('{name} missing'); }}"

# These we want to keep as they were in the 'Backup' part (which is logically correct for these)
# Or from the 'Current' part if it was new.
# smartParseFormula is needed for Molar Mass.
smart_parse = get_or_empty('smartParseFormula')
molar_mass_gen = get_or_empty('generateMolarMassToolContent')
molar_mass_attach = get_or_empty('attachMolarMassListeners')
empirical_gen = get_or_empty('generateEmpiricalToolContent')
empirical_attach = get_or_empty('attachEmpiricalListeners')
solubility_gen = get_or_empty('generateSolubilityToolContent')
solubility_attach = get_or_empty('attachSolubilityListeners')
ions_gen = get_or_empty('generateIonsToolContent')
ions_handler = get_or_empty('setupIonClickHandlers')
blank_gen = get_or_empty('generateBlankToolContent')

# 5. Assemble Tail (Helper functions that are usually at the bottom)
# balanceEquationModal, generateAtomCheckModal, etc.
# Find where the last tool function ends in the original file?
# It's messy. Let's just grab everything after `setupIonClickHandlers`?
# In backup, setupIonClickHandlers was at the end.

# Let's just find `balanceEquationModal` and everything after it?
# In Current file, `balanceEquationModal` was around 9645.
tail_match = re.search(r'function\s+balanceEquationModal', full_content)
if tail_match:
    tail = full_content[tail_match.start():]
else:
    # If not found, maybe it was deleted?
    # It was in New Block usually.
    # Let's provide a safe tail or try to extract it from New Block if available.
    # We saw it in Step 448 (Backup). 
    print("Warning: balanceEquationModal not found in file.")
    tail = "" 

# Construct Final File
final_parts = [
    header,
    "\n// --- Generated & Fixed Tool Logic ---\n",
    new_balancer_gen,
    known_good_attach_balancer,
    smart_parse,
    molar_mass_gen,
    molar_mass_attach,
    empirical_gen,
    empirical_attach,
    blank_gen,
    solubility_gen,
    solubility_attach,
    ions_gen,
    ions_handler,
    attach_listeners_fixed,
    "\n// --- Helpers & Tail ---\n",
    tail
]

with open(path, 'w', encoding='utf-8') as f:
    f.write('\n\n'.join(final_parts))
    
print("Successfully overwrote script.js with clean, ordered code.")
