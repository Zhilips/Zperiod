import {
  EMPIRICAL_PRESETS,
  balanceEquationModal,
  calculateMolarMassModal,
  calculateEmpiricalModal,
  validateEmpiricalInputs,
  normalizeSymbol,
  formatFormulaHTML,
  atomicMasses,
} from "./chemistryTools.js";
import { predictReaction } from "./reactionPredictor.js";
import { t } from "./langController.js";

const TOOL_LISTENER_MAP = {
  balancer: attachBalancerListeners,
  "molar-mass": attachMolarMassListeners,
  "virtual-lab": attachVirtualLabListeners,
  empirical: attachEmpiricalListeners,
  solubility: attachSolubilityListeners,
};

export function attachToolEventListeners(toolType) {
  TOOL_LISTENER_MAP[toolType]?.();
}

function attachBalancerListeners() {
  const reactantsInput = document.getElementById("reactants-input");
  const productsInput = document.getElementById("products-input");
  const autoBalanceBtn = document.getElementById("auto-balance-btn");
  const clearBtn = document.getElementById("clear-balancer-btn");
  const feedback = document.getElementById("balance-feedback");
  const leftAtomCount = document.getElementById("left-atom-count");
  const rightAtomCount = document.getElementById("right-atom-count");
  // Physics scale elements
  const physicsBeam = document.getElementById("physics-beam-assembly");
  const physicsHangerLeft = document.getElementById("physics-hanger-left");
  const physicsHangerRight = document.getElementById("physics-hanger-right");

  const physicsNeedle = document.getElementById("physics-needle");
  const physicsPanLabelLeft = document.getElementById("physics-pan-label-left");
  const physicsPanLabelRight = document.getElementById(
    "physics-pan-label-right",
  );

  // Physics state
  const physicsState = {
    leftWeight: 0,
    rightWeight: 0,
    currentAngle: 0,
    targetAngle: 0,
    velocity: 0,
  };

  const PHYSICS = {
    maxAngle: 20,
    sensitivity: 2.5,
    stiffness: 0.015,
    damping: 0.92,
  };

  let animationRunning = false;

  // Predictor and Mode Switch Elements
  const modeBalanceBtn = document.getElementById("mode-balance-btn");
  const modePredictBtn = document.getElementById("mode-predict-btn");
  const balancerPanel = document.getElementById("balancer-panel");
  const predictorPanel = document.getElementById("predictor-panel");

  const predictorReactantsInput = document.getElementById("predictor-reactants-input");
  const predictorTypeCards = document.querySelectorAll(".predictor-type-card");
  const predictBtn = document.getElementById("predict-btn");
  const clearPredictorBtn = document.getElementById("clear-predictor-btn");
  const resultArea = document.getElementById("predictor-result-area");
  const productsCard = document.getElementById("predictor-products-card");
  const balancedCard = document.getElementById("predictor-balanced-card");
  const productsLabel = document.getElementById("predictor-products-label");
  const productsText = document.getElementById("predictor-products-text");
  const balancedLabel = document.getElementById("predictor-balanced-label");
  const balancedText = document.getElementById("predictor-balanced-text");
  const explanation = document.getElementById("predictor-explanation");
  const explanationText = document.getElementById("predictor-explanation-text");

  let selectedReactionType = null;

  // Parse formula into atom counts (supports both space and + as separators)
  function parseFormula(formula) {
    if (!formula.trim()) return {};
    const atoms = {};
    // Split by space or + and filter empty strings
    const compounds = formula
      .split(/[\s+]+/)
      .map((s) => s.trim())
      .filter((s) => s);

    compounds.forEach((compound) => {
      // Extract coefficient
      const match = compound.match(/^(\d*)/);
      const coef = match && match[1] ? parseInt(match[1]) : 1;
      const formulaPart = compound.replace(/^\d*/, "");

      // Parse elements with better handling for parentheses
      let expandedFormula = formulaPart;

      // Handle parentheses like (OH)2
      const parenRegex = /\(([^)]+)\)(\d*)/g;
      let parenMatch;
      while ((parenMatch = parenRegex.exec(formulaPart)) !== null) {
        const innerFormula = parenMatch[1];
        const multiplier = parenMatch[2] ? parseInt(parenMatch[2]) : 1;

        const innerRegex = /([A-Z][a-z]?)(\d*)/g;
        let innerMatch;
        while ((innerMatch = innerRegex.exec(innerFormula)) !== null) {
          const element = innerMatch[1];
          const count = innerMatch[2] ? parseInt(innerMatch[2]) : 1;
          atoms[element] = (atoms[element] || 0) + count * multiplier * coef;
        }
      }

      // Remove parentheses parts and parse the rest
      expandedFormula = formulaPart.replace(/\([^)]+\)\d*/g, "");

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

  // Format atom counts for display with styled tags
  function formatAtomCountsHTML(atoms, side) {
    if (Object.keys(atoms).length === 0) {
      return `<span style="color: #94a3b8; font-size: 12px;">—</span>`;
    }
    return Object.entries(atoms)
      .map(
        ([el, count]) =>
          `<span class="atom-tag ${side}">${el}<sub>${count}</sub></span>`,
      )
      .join("");
  }

  // Physics animation loop
  function animatePhysics() {
    if (!physicsBeam) return;

    const force =
      (physicsState.targetAngle - physicsState.currentAngle) *
      PHYSICS.stiffness;
    physicsState.velocity = (physicsState.velocity + force) * PHYSICS.damping;
    physicsState.currentAngle += physicsState.velocity;

    if (
      Math.abs(physicsState.velocity) < 0.001 &&
      Math.abs(physicsState.currentAngle - physicsState.targetAngle) < 0.001
    ) {
      physicsState.currentAngle = physicsState.targetAngle;
      physicsState.velocity = 0;
    }

    // Rotate the beam
    physicsBeam.style.transform = `rotate(${physicsState.currentAngle}deg)`;

    // Counter-rotate hangers to keep them vertical
    if (physicsHangerLeft) {
      physicsHangerLeft.style.transform = `translateX(-50%) rotate(${-physicsState.currentAngle}deg)`;
    }
    if (physicsHangerRight) {
      physicsHangerRight.style.transform = `translateX(50%) rotate(${-physicsState.currentAngle}deg)`;
    }

    // Rotate the needle to show the tilt
    if (physicsNeedle) {
      physicsNeedle.style.transform = `translate(-50%, 0) rotate(${physicsState.currentAngle}deg)`;
    }

    if (animationRunning) {
      requestAnimationFrame(animatePhysics);
    }
  }

  // Start animation with optional impulse
  function startAnimation(withImpulse = false) {
    if (!animationRunning) {
      animationRunning = true;
      if (withImpulse) {
        physicsState.velocity = 2.5;
      }
      animatePhysics();
    }
  }

  // Normalize formula display: convert spaces to + separators
  function normalizeFormulaDisplay(formula) {
    if (!formula) return "";
    return formula
      .split(/[\s+]+/)
      .filter((s) => s.trim())
      .join(" + ");
  }

  function getSpacedCompoundMessage(...segments) {
    for (const segment of segments) {
      const match = String(segment || "").match(/\b([A-Z][a-z]?)\s+(\d+[A-Z][a-z]?(?:\d*[A-Z][a-z]?|\d*)*)\b/);
      if (match) {
        return `Use ${match[1]}${match[2]} instead of ${match[1]} ${match[2]}`;
      }
    }
    return "";
  }

  // Update pan labels on the scale
  function updatePanLabels(reactants, products) {
    if (physicsPanLabelLeft) {
      physicsPanLabelLeft.textContent =
        normalizeFormulaDisplay(reactants) || "";
      physicsPanLabelLeft.classList.toggle("has-content", !!reactants);
    }
    if (physicsPanLabelRight) {
      physicsPanLabelRight.textContent =
        normalizeFormulaDisplay(products) || "";
      physicsPanLabelRight.classList.toggle("has-content", !!products);
    }
  }

  // Calculate imbalance and update scale
  function updateScale() {
    const reactantsFormula = reactantsInput ? reactantsInput.value.trim() : "";
    const productsFormula = productsInput ? productsInput.value.trim() : "";

    // Update pan labels on scale
    updatePanLabels(reactantsFormula, productsFormula);

    if (
      reactantsFormula.includes("→") ||
      reactantsFormula.includes("->") ||
      reactantsFormula.includes("=")
    ) {
      const normalized = reactantsFormula
        .replace(/->/g, "→")
        .replace(/=/g, "→");
      const parts = normalized.split("→");
      if (reactantsInput) reactantsInput.value = parts[0].trim();
      if (parts[1] && productsInput) {
        productsInput.value = parts[1].trim();
        productsInput.focus();
      }
      return updateScale();
    }

    const leftAtoms = parseFormula(reactantsFormula);
    const rightAtoms = parseFormula(productsFormula);

    // Display atom counts with styled HTML
    if (leftAtomCount)
      leftAtomCount.innerHTML = formatAtomCountsHTML(leftAtoms, "left");
    if (rightAtomCount)
      rightAtomCount.innerHTML = formatAtomCountsHTML(rightAtoms, "right");

    // Calculate total imbalance
    const allElements = new Set([
      ...Object.keys(leftAtoms),
      ...Object.keys(rightAtoms),
    ]);
    let leftTotal = 0;
    let rightTotal = 0;
    let imbalancedElement = null;
    let imbalanceAmount = 0;

    allElements.forEach((el) => {
      const left = leftAtoms[el] || 0;
      const right = rightAtoms[el] || 0;
      leftTotal += left;
      rightTotal += right;
      if (left !== right && !imbalancedElement) {
        imbalancedElement = el;
        imbalanceAmount = Math.abs(left - right);
      }
    });

    // Update physics state
    physicsState.leftWeight = leftTotal;
    physicsState.rightWeight = rightTotal;

    // Calculate target angle based on imbalance
    const diff = rightTotal - leftTotal;
    let angle = diff * PHYSICS.sensitivity;
    if (angle > PHYSICS.maxAngle) angle = PHYSICS.maxAngle;
    if (angle < -PHYSICS.maxAngle) angle = -PHYSICS.maxAngle;
    physicsState.targetAngle = angle;

    // Start animation
    startAnimation();

    // Update feedback status bar
    if (feedback) {
      feedback.classList.remove("balanced", "unbalanced");

      // Restore Auto Balance button icon when user edits
      if (autoBalanceBtn) {
        const svg = autoBalanceBtn.querySelector("svg");
        if (svg) svg.style.display = "";
      }

      // Reset copy state
      feedback.style.cursor = "";
      feedback.title = "";
      feedback._balancedText = null;

      if (!reactantsFormula && !productsFormula) {
        feedback.innerHTML = `${t("balancer.enterEquation")}`;
      } else if (!productsFormula) {
        feedback.classList.add("unbalanced");
        feedback.innerHTML = `<span class="status-icon">⚠</span>${t("balancer.addProducts")}`;
      } else if (!reactantsFormula) {
        feedback.classList.add("unbalanced");
        feedback.innerHTML = `<span class="status-icon">⚠</span>${t("balancer.addReactants")}`;
      } else {
        // Check if actually balanced (element by element)
        let isBalanced = true;
        allElements.forEach((el) => {
          if ((leftAtoms[el] || 0) !== (rightAtoms[el] || 0))
            isBalanced = false;
        });

        if (isBalanced && allElements.size > 0) {
          feedback.classList.add("balanced");
          feedback.innerHTML = `<span class="status-icon">✓</span>${t("balancer.balanced")}`;

          // Auto-run AutoBalance after 1.5 seconds to show the final equation
          setTimeout(() => {
            autoBalance();
          }, 1500);
        } else if (imbalancedElement) {
          feedback.classList.add("unbalanced");
          const leftC = leftAtoms[imbalancedElement] || 0;
          const rightC = rightAtoms[imbalancedElement] || 0;
          const hint = leftC > rightC
            ? `${imbalancedElement}: ${leftC} ${t("balancer.left")} vs ${rightC} ${t("balancer.right")}`
            : `${imbalancedElement}: ${leftC} ${t("balancer.left")} vs ${rightC} ${t("balancer.right")}`;
          feedback.innerHTML = `<span class="status-icon">⚠</span>${t("balancer.notBalanced")} — ${hint}`;
        }
      }
    }

    return { leftAtoms, rightAtoms, allElements };
  }

  // Auto-balance function
  function autoBalance() {
    const reactantsFormula = reactantsInput ? reactantsInput.value.trim() : "";
    const productsFormula = productsInput ? productsInput.value.trim() : "";

    if (!reactantsFormula || !productsFormula) {
      return;
    }

    try {
      const equation = `${reactantsFormula} → ${productsFormula}`;
      const result = balanceEquationModal(equation);

      if (!result?.solved) {
        throw new Error(
          result?.message ||
            getSpacedCompoundMessage(reactantsFormula, productsFormula) ||
            t("balancer.couldNotBalance"),
        );
      }

      // Animate scale to balanced position (don't modify user inputs)
      physicsState.targetAngle = 0;
      physicsState.velocity = 2;
      startAnimation();

      // Show balanced result in status bar (clickable to copy)
      if (feedback) {
        feedback.classList.remove("unbalanced");
        feedback.classList.add("balanced");
        feedback.innerHTML = `<span>${formatChemicalEquation(result.balanced)}</span>`;
        feedback.style.cursor = "pointer";
        feedback.title = t("balancer.clickToCopy");
        feedback._balancedText = result.balanced;
      }

      // Hide Auto Balance button icon to save space
      if (autoBalanceBtn) {
        const svg = autoBalanceBtn.querySelector("svg");
        if (svg) svg.style.display = "none";
      }
    } catch (error) {
      if (feedback) {
        feedback.classList.remove("balanced");
        feedback.classList.add("unbalanced");
        // Show specific error message if available
        const errorMsg = error.message || "";
        if (errorMsg) {
          feedback.innerHTML = `<span class="status-icon">✕</span>${errorMsg}`;
        } else {
          feedback.innerHTML = `<span class="status-icon">✕</span>${t("balancer.couldNotBalance")}`;
        }
      }
    }
  }

  // Clear function
  function clearInputs() {
    if (reactantsInput) reactantsInput.value = "";
    if (productsInput) productsInput.value = "";

    // Reset physics
    physicsState.targetAngle = 0;
    physicsState.velocity = 1.5; // Small impulse for visual feedback

    updateScale();
  }

  // Event listeners for inputs
  if (reactantsInput) {
    reactantsInput.addEventListener("input", updateScale);
  }
  if (productsInput) {
    productsInput.addEventListener("input", updateScale);
  }
  if (autoBalanceBtn) {
    autoBalanceBtn.addEventListener("click", autoBalance);
  }
  if (clearBtn) {
    clearBtn.addEventListener("click", clearInputs);
  }

  // Click status bar to copy balanced equation
  if (feedback) {
    feedback.addEventListener("click", () => {
      if (feedback._balancedText) {
        navigator.clipboard.writeText(feedback._balancedText).then(() => {
          const prev = feedback.innerHTML;
          feedback.innerHTML = `<span>${t("balancer.copied")}</span>`;
          setTimeout(() => {
            feedback.innerHTML = prev;
          }, 1000);
        });
      }
    });
  }

  if (reactantsInput) {
    reactantsInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (productsInput) productsInput.focus();
      }
    });
  }
  if (productsInput) {
    productsInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        autoBalance();
      }
    });
  }

  // ===== Mode Switch Logic =====
  const modeSlider = document.getElementById("balancer-mode-slider");
  
  function setMode(mode) {
    if (mode === "balance") {
      modeBalanceBtn?.classList.add("active");
      modePredictBtn?.classList.remove("active");
      balancerPanel?.classList.add("active");
      predictorPanel?.classList.remove("active");
      if (modeSlider) modeSlider.style.transform = "translateX(0px)";
      startAnimation(true);
    } else {
      modeBalanceBtn?.classList.remove("active");
      modePredictBtn?.classList.add("active");
      balancerPanel?.classList.remove("active");
      predictorPanel?.classList.add("active");
      // Translate precisely 138px to mirror the 4px exact physical padding bounding box
      if (modeSlider) modeSlider.style.transform = "translateX(138px)";

      // Trigger interactive tutorial for predict mode on first entrance
      import("./tutorialController.js").then((m) => m.initPredictorTutorial(false));
    }
  }

  modeBalanceBtn?.addEventListener("click", () => setMode("balance"));
  modePredictBtn?.addEventListener("click", () => setMode("predict"));

  // ===== Predictor Logic =====
  predictorTypeCards.forEach(card => {
    card.addEventListener("click", () => {
      predictorTypeCards.forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      selectedReactionType = card.dataset.type;
    });
  });

  function clearPredictor() {
    if (predictorReactantsInput) predictorReactantsInput.value = "";
    predictorTypeCards.forEach(c => c.classList.remove("selected"));
    selectedReactionType = null;
    if (resultArea) resultArea.classList.remove("show");
  }

  function handlePredict() {
    if (!predictorReactantsInput || !resultArea) return;
    const input = predictorReactantsInput.value.trim();
    if (!input) return;
    
    if (!selectedReactionType) {
      if (productsCard) {
        resultArea.classList.add("show");
        productsCard.className = "predictor-result-card error";
        productsLabel.textContent = t("predictor.error") || "Error";
        productsText.textContent = t("predictor.selectType") || "Please select a reaction type.";
        balancedCard.style.display = "none";
        explanation.style.display = "none";
      }
      return;
    }

    const res = predictReaction(input, selectedReactionType);
    
    resultArea.classList.add("show");
    
    productsCard.className = "predictor-result-card";
    balancedCard.className = "predictor-result-card";
    balancedCard.style.display = "none";
    explanation.style.display = "flex";

    if (!res.success) {
      productsCard.classList.add(res.noReaction ? "no-reaction" : "error");
      productsLabel.textContent = res.noReaction ? (t("predictor.noReaction") || "No Reaction") : (t("predictor.error") || "Error");
      productsText.textContent = res.error || (res.noReaction ? (t("predictor.noProducts") || "No products formed.") : (t("predictor.unknownError") || "Unknown error."));
      explanationText.textContent = res.explanation || (t("predictor.checkInputAgain") || "Please check your input and try again.");
      if (!res.explanation) explanation.style.display = "none";
      return;
    }

    productsLabel.textContent = t("predictor.predictedProducts") || "Predicted Products";
    productsText.innerHTML = formatChemicalEquation(res.products.join(" + "));
    
    if (res.balancedEquation) {
      balancedCard.style.display = "block";
      balancedLabel.textContent = t("predictor.balancedEquation") || "Balanced Equation";
      balancedText.innerHTML = formatChemicalEquation(res.balancedEquation);
    } else if (res.unbalancedEquation) {
      balancedCard.style.display = "block";
      balancedCard.classList.add("error");
      balancedLabel.textContent = t("predictor.unbalancedReaction") || "Unbalanced Reaction";
      balancedText.innerHTML = formatChemicalEquation(res.unbalancedEquation);
      if (res.balancingError) {
        explanationText.textContent = res.explanation ? res.explanation + " (" + res.balancingError + ")" : res.balancingError;
      }
    } else {
      balancedCard.style.display = "none";
    }

    if (!res.balancingError) {
      explanationText.textContent = res.explanation || (t("predictor.reactionCompleted") || "Reaction completed successfully.");
    }
  }

  if (predictBtn) predictBtn.addEventListener("click", handlePredict);
  if (clearPredictorBtn) clearPredictorBtn.addEventListener("click", clearPredictor);
  
  if (predictorReactantsInput) {
    predictorReactantsInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handlePredict();
      }
    });
  }

  // Start initial animation with impulse
  startAnimation(true);
}

// Helper to format chemical equations with subscripts
function formatChemicalEquation(eq) {
  return eq.replace(/(\d+)/g, (match, p1, offset, str) => {
    const before = str[offset - 1];
    if (!before || before === " " || before === "+" || before === "→") {
      return match; // Keep coefficients as is
    }
    return `<sub>${match}</sub>`;
  });
}


function attachMolarMassListeners() {
  const input = document.getElementById("modal-formula-input");
  const previewDisplay = document.getElementById("preview-formula-display");
  const suggestionBox = document.getElementById("formula-suggestion");
  const suggestionText = document.getElementById("suggestion-text");
  
  // New buttons
  const exactToggleBtn = document.getElementById("modal-exact-toggle-btn");
  const clearBtn = document.getElementById("clear-molar-btn");
  const printBtn = document.getElementById("print-ticket-btn");

  let ignoredSuspicious = null;

  // Handle Yes/No clicks on the suggestion box
  if (suggestionBox) {
    suggestionBox.onclick = (e) => {
      const yesBtn = e.target.closest(".suspicious-yes-btn");
      const noBtn = e.target.closest(".suspicious-no-btn");
      if (yesBtn) {
        input.value = yesBtn.dataset.formula;
        input.dispatchEvent(new Event("input"));
        input.focus();
      } else if (noBtn) {
        ignoredSuspicious = input.value;
        input.dispatchEvent(new Event("input"));
        input.focus();
      }
    };
  }

  const runCalculation = (formulaOverride) => {
    const formula = formulaOverride || input.value.trim();
    const isExact = exactToggleBtn ? exactToggleBtn.dataset.exact === "true" : false;
    if (!formula) {
      updateRealtimeScale(null);
      return null;
    }
    try {
      const result = calculateMolarMassModal(formula, isExact);
      updateRealtimeScale(result);
      return null;
    } catch (e) {
      console.error("Molar mass calculation error:", e);
      updateRealtimeScale(null);
      return e.message;
    }
  };

  const updateRealtimeScale = (result) => {
    const scaleDisplay = document.getElementById("scale-display-value");
    const blocksArea = document.getElementById("scale-blocks-area");
    const platform = document.querySelector(".scale-platform-top");
    discardReceipt();
    if (result) {
      if (scaleDisplay) scaleDisplay.textContent = result.total;
      if (platform) platform.classList.add("has-weight");
      displayMolarMassResult(result);
    } else {
      if (scaleDisplay) scaleDisplay.textContent = "0.00";
      if (blocksArea) blocksArea.innerHTML = "";
      if (platform) platform.classList.remove("has-weight");
    }
  };

  if (exactToggleBtn) {
    exactToggleBtn.addEventListener("click", () => {
      const isCurrentlyExact = exactToggleBtn.dataset.exact === "true";
      exactToggleBtn.dataset.exact = isCurrentlyExact ? "false" : "true";
      exactToggleBtn.classList.toggle("active", !isCurrentlyExact);
      
      const val = input.value;
      const parsed = smartParseFormula(val);
      if (!parsed.hasError && parsed.cleanFormula) {
        runCalculation(parsed.cleanFormula);
      }
    });
  }

  // Quick Insert Chips
  const quickChips = document.querySelectorAll('.molar-example-chip');
  if (quickChips) {
    quickChips.forEach(chip => {
      chip.addEventListener('click', () => {
        quickChips.forEach((btn) => btn.classList.remove('active'));
        chip.classList.add('active');
        input.value = chip.dataset.formula;
        ignoredSuspicious = input.value; // Prevent suggestion for example formulas
        input.dispatchEvent(new Event('input', { bubbles: true }));
        const parsed = smartParseFormula(input.value);
        if (!parsed.hasError && parsed.cleanFormula) {
          runCalculation(parsed.cleanFormula);
        }
      });
    });
  }

  if (clearBtn && input) {
    clearBtn.addEventListener("click", () => {
      input.value = "";
      ignoredSuspicious = null;
      input.dispatchEvent(new Event("input"));
      input.focus();
    });
  }

  if (printBtn && input) {
    printBtn.addEventListener("click", () => {
      const parsed = smartParseFormula(input.value);
      if (!parsed.hasError && parsed.cleanFormula) {
        const result = calculateMolarMassModal(
          parsed.cleanFormula,
          exactToggleBtn ? exactToggleBtn.dataset.exact === "true" : false,
        );
        if (result) printReceipt(result);
      }
    });
  }

  if (input) {
    input.addEventListener("input", (e) => {
      const matchingChip = Array.from(quickChips).find((chip) => chip.dataset.formula === input.value.trim());
      quickChips.forEach((chip) => chip.classList.toggle('active', chip === matchingChip));
      const val = input.value;
      const parsed = smartParseFormula(val);

      // Update live preview
      if (previewDisplay) {
        if (!val.trim()) {
          previewDisplay.innerHTML = "—";
        } else {
          previewDisplay.innerHTML = parsed.displayHtml;
        }
      }

      let calcError = null;
      // Only run calculation if no syntax errors
      if (!parsed.hasError && parsed.cleanFormula) {
        calcError = runCalculation(parsed.cleanFormula);
      } else {
        updateRealtimeScale(null);
      }

      // Show/hide suggestion content (box stays visible)
      if (suggestionBox && suggestionText) {
        if (parsed.hasError) {
          suggestionText.innerHTML = t("molarMass.invalidFormula");
          suggestionBox.classList.add("has-message", "has-error");
        } else if (calcError) {
          suggestionText.innerHTML = calcError;
          suggestionBox.classList.add("has-message", "has-error");
        } else if (parsed.suspicious && val !== ignoredSuspicious) {
          suggestionText.innerHTML =
            `<div class="suspicious-suggestion">
               <div class="suspicious-text">${t("molarMass.didYouMean").replace("{formula}", `<strong>${parsed.suspicious}</strong>`)}</div>
               <div class="suspicious-actions">
                 <button class="suspicious-yes-btn" data-formula="${parsed.suspicious}">${t("molarMass.yes")}</button>
                 <button class="suspicious-no-btn">${t("molarMass.no")}</button>
               </div>
             </div>`;
          suggestionBox.classList.add("has-message");
          suggestionBox.classList.remove("has-error");
        } else {
          suggestionText.textContent = val.trim()
            ? t("molarMass.looksGood")
            : t("molarMass.enterFormula");
          suggestionBox.classList.remove("has-message", "has-error");
        }
      }
    });
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const parsed = smartParseFormula(input.value);
        if (!parsed.hasError && parsed.cleanFormula) {
          const result = calculateMolarMassModal(
            parsed.cleanFormula,
            exactToggleBtn ? exactToggleBtn.dataset.exact === "true" : false,
          );
          if (result) printReceipt(result);
        }
      }
    });
    input.dispatchEvent(new Event("input"));
  }
}

function getVirtualLabExperiments() {
  return {
    "acid-metal": {
      title: t("virtualLab.acidMetalTitle", "Acid + Metal"),
      reaction: "Zn + 2HCl → ZnCl₂ + H₂",
      cardNote: t(
        "virtualLab.acidMetalCard",
        "Watch hydrogen bubbles appear as zinc reacts with acid.",
      ),
      observation: t(
        "virtualLab.acidMetalObserve",
        "Hydrogen bubbles rise from the zinc strip while the metal slowly wears away.",
      ),
      explanation: t(
        "virtualLab.acidMetalExplain",
        "Hydrochloric acid reacts with zinc to form dissolved zinc chloride and hydrogen gas.",
      ),
      type: t("virtualLab.typeGasEvolution", "Gas evolution"),
      actionLabel: t("virtualLab.actionStart", "Start Reaction"),
      scene: renderVirtualLabAcidMetalScene(),
    },
    neutralization: {
      title: t("virtualLab.neutralizationTitle", "Neutralization"),
      reaction: "HCl + NaOH → NaCl + H₂O",
      cardNote: t(
        "virtualLab.neutralizationCard",
        "Mix acid and base, then watch the indicator settle near neutral.",
      ),
      observation: t(
        "virtualLab.neutralizationObserve",
        "The indicator shifts toward green as the mixed solution settles near neutral.",
      ),
      explanation: t(
        "virtualLab.neutralizationExplain",
        "Hydrogen ions and hydroxide ions combine to form water, leaving dissolved salt behind.",
      ),
      type: t("virtualLab.typeNeutralization", "Acid-base neutralization"),
      actionLabel: t("virtualLab.actionMix", "Mix Solutions"),
      scene: renderVirtualLabNeutralizationScene(),
    },
    precipitation: {
      title: t("virtualLab.precipitationTitle", "Precipitation"),
      reaction: "AgNO₃ + NaCl → AgCl↓ + NaNO₃",
      cardNote: t(
        "virtualLab.precipitationCard",
        "Two clear liquids combine and a solid precipitate appears.",
      ),
      observation: t(
        "virtualLab.precipitationObserve",
        "A white solid forms and settles at the bottom while the remaining solution stays clear.",
      ),
      explanation: t(
        "virtualLab.precipitationExplain",
        "Silver ions and chloride ions form insoluble silver chloride, so the solid drops out of solution.",
      ),
      type: t("virtualLab.typePrecipitation", "Precipitation reaction"),
      actionLabel: t("virtualLab.actionMix", "Mix Solutions"),
      scene: renderVirtualLabPrecipitationScene(),
    },
    combustion: {
      title: t("virtualLab.combustionTitle", "Combustion"),
      reaction: "CH₄ + 2O₂ → CO₂ + 2H₂O",
      cardNote: t(
        "virtualLab.combustionCard",
        "Ignite methane and track the hot products released.",
      ),
      observation: t(
        "virtualLab.combustionObserve",
        "A bright flame appears and hot gases rise as methane burns in oxygen.",
      ),
      explanation: t(
        "virtualLab.combustionExplain",
        "Combustion is an exothermic reaction in which methane reacts with oxygen to produce carbon dioxide, water, light, and heat.",
      ),
      type: t("virtualLab.typeCombustion", "Combustion"),
      actionLabel: t("virtualLab.actionIgnite", "Ignite"),
      scene: renderVirtualLabCombustionScene(),
    },
    decomposition: {
      title: t("virtualLab.decompositionTitle", "Thermal Decomposition"),
      reaction: "CaCO₃ → CaO + CO₂",
      cardNote: t(
        "virtualLab.decompositionCard",
        "Heat a solid sample and watch gas release with residue left behind.",
      ),
      observation: t(
        "virtualLab.decompositionObserve",
        "Heating releases carbon dioxide gas and leaves calcium oxide as a solid residue.",
      ),
      explanation: t(
        "virtualLab.decompositionExplain",
        "Thermal energy breaks calcium carbonate apart into calcium oxide and carbon dioxide.",
      ),
      type: t("virtualLab.typeDecomposition", "Thermal decomposition"),
      actionLabel: t("virtualLab.actionHeat", "Heat Sample"),
      scene: renderVirtualLabDecompositionScene(),
    },
  };
}

function renderVirtualLabAcidMetalScene() {
  return `
    <div class="virtual-lab-beaker">
      <div class="virtual-lab-liquid acid"></div>
      <div class="virtual-lab-metal-strip"></div>
      <span class="virtual-lab-bubble" style="left:48px; bottom:80px; width:10px; height:10px; animation-delay:0s;"></span>
      <span class="virtual-lab-bubble" style="left:78px; bottom:98px; width:14px; height:14px; animation-delay:0.35s;"></span>
      <span class="virtual-lab-bubble" style="left:96px; bottom:72px; width:8px; height:8px; animation-delay:0.7s;"></span>
      <span class="virtual-lab-bubble" style="left:68px; bottom:120px; width:12px; height:12px; animation-delay:1.05s;"></span>
    </div>
    <div class="virtual-lab-gas-label">${t("virtualLab.acidMetalCloud", "H₂ gas released")}</div>
    <div class="virtual-lab-tag">${t("virtualLab.acidMetalTag", "Zinc in acid")}</div>
  `;
}

function renderVirtualLabNeutralizationScene() {
  return `
    <div class="virtual-lab-beaker">
      <div class="virtual-lab-liquid acid"></div>
      <div class="virtual-lab-liquid base" style="height: 36%;"></div>
      <div class="virtual-lab-liquid neutral" style="opacity: 0.08;"></div>
    </div>
    <div class="virtual-lab-testtube" style="width: 92px; height: 190px; transform: rotate(11deg);">
      <div class="virtual-lab-liquid base" style="height: 46%;"></div>
    </div>
    <div class="virtual-lab-ph-strip">
      <div class="virtual-lab-ph-dot" style="top: 86px;"></div>
    </div>
    <div class="virtual-lab-cloud">${t("virtualLab.neutralizationCloud", "Neutralized")}</div>
    <div class="virtual-lab-tag">${t("virtualLab.neutralizationTag", "Indicator shift")}</div>
  `;
}

function renderVirtualLabPrecipitationScene() {
  return `
    <div class="virtual-lab-beaker">
      <div class="virtual-lab-liquid clear"></div>
      <div class="virtual-lab-sediment"></div>
      <span class="virtual-lab-precip-dot" style="left:54px; bottom:118px; width:12px; height:12px; animation-delay:0.1s;"></span>
      <span class="virtual-lab-precip-dot" style="left:84px; bottom:138px; width:10px; height:10px; animation-delay:0.45s;"></span>
      <span class="virtual-lab-precip-dot" style="left:106px; bottom:104px; width:14px; height:14px; animation-delay:0.8s;"></span>
      <span class="virtual-lab-precip-dot" style="left:72px; bottom:160px; width:8px; height:8px; animation-delay:1.15s;"></span>
    </div>
    <div class="virtual-lab-testtube" style="width: 92px; height: 190px; transform: rotate(10deg);">
      <div class="virtual-lab-liquid clear" style="height: 50%;"></div>
    </div>
    <div class="virtual-lab-cloud">${t("virtualLab.precipitationCloud", "AgCl precipitate")}</div>
    <div class="virtual-lab-tag">${t("virtualLab.precipitationTag", "White solid forms")}</div>
  `;
}

function renderVirtualLabCombustionScene() {
  return `
    <div class="virtual-lab-testtube" style="width: 126px; height: 226px; transform: rotate(0deg);">
      <div class="virtual-lab-liquid glow" style="height: 34%; opacity: 0.88;"></div>
      <span class="virtual-lab-gas-dot" style="left:40px; bottom:154px; width:12px; height:12px; animation-delay:0.05s;"></span>
      <span class="virtual-lab-gas-dot" style="left:62px; bottom:142px; width:9px; height:9px; animation-delay:0.45s;"></span>
      <span class="virtual-lab-gas-dot" style="left:78px; bottom:164px; width:14px; height:14px; animation-delay:0.9s;"></span>
    </div>
    <div class="virtual-lab-burner"></div>
    <div class="virtual-lab-flame"></div>
    <div class="virtual-lab-heat-rings"></div>
    <div class="virtual-lab-cloud">${t("virtualLab.combustionCloud", "CO₂ + H₂O")}</div>
    <div class="virtual-lab-tag">${t("virtualLab.combustionTag", "Heat and light")}</div>
  `;
}

function renderVirtualLabDecompositionScene() {
  return `
    <div class="virtual-lab-testtube" style="width: 120px; height: 232px; transform: rotate(-6deg);">
      <div class="virtual-lab-residue"></div>
      <span class="virtual-lab-gas-dot" style="left:42px; bottom:146px; width:12px; height:12px; animation-delay:0.1s;"></span>
      <span class="virtual-lab-gas-dot" style="left:68px; bottom:136px; width:10px; height:10px; animation-delay:0.55s;"></span>
      <span class="virtual-lab-gas-dot" style="left:54px; bottom:176px; width:14px; height:14px; animation-delay:1s;"></span>
    </div>
    <div class="virtual-lab-burner"></div>
    <div class="virtual-lab-flame"></div>
    <div class="virtual-lab-heat-rings"></div>
    <div class="virtual-lab-cloud">${t("virtualLab.decompositionCloud", "CO₂ released")}</div>
    <div class="virtual-lab-tag">${t("virtualLab.decompositionTag", "CaO remains")}</div>
  `;
}

function attachVirtualLabListeners() {
  const cards = Array.from(
    document.querySelectorAll(".virtual-lab-card[data-experiment]"),
  );
  const scene = document.getElementById("virtual-lab-scene");
  const actionBtn = document.getElementById("virtual-lab-action-btn");
  const resetBtn = document.getElementById("virtual-lab-reset-btn");
  const status = document.getElementById("virtual-lab-status");
  const title = document.getElementById("virtual-lab-title");
  const reaction = document.getElementById("virtual-lab-reaction");
  const type = document.getElementById("virtual-lab-type");
  const observation = document.getElementById("virtual-lab-observation");
  const explanation = document.getElementById("virtual-lab-explanation");

  if (
    !cards.length ||
    !scene ||
    !actionBtn ||
    !resetBtn ||
    !status ||
    !title ||
    !reaction ||
    !type ||
    !observation ||
    !explanation
  ) {
    return;
  }

  let currentId =
    cards.find((card) => card.classList.contains("active"))?.dataset
      .experiment || cards[0].dataset.experiment;
  let isReacting = false;

  const getExperiment = () => getVirtualLabExperiments()[currentId];

  const updateMeta = () => {
    const experiment = getExperiment();
    if (!experiment) return;

    title.textContent = experiment.title;
    reaction.textContent = experiment.reaction;
    type.textContent = experiment.type;
    explanation.textContent = experiment.explanation;
    observation.textContent = isReacting
      ? experiment.observation
      : experiment.cardNote;
    actionBtn.textContent = isReacting
      ? t("virtualLab.actionReplay", "Run Again")
      : experiment.actionLabel;
    status.textContent = isReacting
      ? t("virtualLab.statusRunning", "Reaction running")
      : t("virtualLab.statusReady", "Ready to run");
    status.classList.toggle("is-reacting", isReacting);
  };

  const renderScene = () => {
    const experiment = getExperiment();
    if (!experiment) return;

    scene.classList.remove("is-reacting");
    scene.innerHTML = experiment.scene;
    if (isReacting) {
      requestAnimationFrame(() => {
        scene.classList.add("is-reacting");
      });
    }
  };

  const selectExperiment = (nextId) => {
    currentId = nextId;
    isReacting = false;
    cards.forEach((card) => {
      card.classList.toggle("active", card.dataset.experiment === currentId);
    });
    updateMeta();
    renderScene();
  };

  const startReaction = () => {
    const experiment = getExperiment();
    if (!experiment) return;

    isReacting = true;
    updateMeta();
    scene.classList.remove("is-reacting");
    void scene.offsetWidth;
    scene.classList.add("is-reacting");
  };

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!card.dataset.experiment || card.dataset.experiment === currentId) {
        if (card.dataset.experiment === currentId && isReacting) {
          startReaction();
        }
        return;
      }
      selectExperiment(card.dataset.experiment);
    });
  });

  actionBtn.addEventListener("click", startReaction);
  resetBtn.addEventListener("click", () => {
    isReacting = false;
    updateMeta();
    renderScene();
  });

  selectExperiment(currentId);
}

let empiricalElementCount = 3; // Track number of element rows

/* ---- Supported element-color CSS classes ---- */
const EMP_COLORED = ['C', 'H', 'O', 'N', 'S', 'P', 'Cl', 'Na', 'K', 'Ca', 'Fe', 'Mg', 'Br', 'F', 'I', 'Cu', 'Zn'];
function empColorClass(sym) {
  return EMP_COLORED.includes(sym) ? `el-${sym}` : sym ? 'has-value' : '';
}

/* ---- Live validation helper — runs on every input change ---- */
function empLiveValidate() {
  // Build elements array with UI-row tracking for mapping errors back
  const validationElements = [];
  const rowMap = []; // validationElements[idx] → UI row number (1-based)

  for (let i = 1; i <= empiricalElementCount; i++) {
    const symInput = document.getElementById(`modal-elem${i}-symbol`);
    const valInput = document.getElementById(`modal-elem${i}-value`);
    if (!symInput || !valInput) continue;

    const rawSym = symInput.value.trim();
    const rawVal = valInput.value.trim();

    // Include row if user typed anything in either field
    if (rawSym || rawVal) {
      const symbol = normalizeSymbol(rawSym) || rawSym;
      validationElements.push({ symbol, percent: parseFloat(rawVal) }); // NaN is fine — validator catches it
      rowMap.push(i);
    }
  }

  const molecularMass = parseFloat(document.getElementById('modal-mol-mass')?.value);
  const { ok, errors } = validateEmpiricalInputs(validationElements, isNaN(molecularMass) ? null : molecularMass);

  const btn = document.getElementById('modal-calc-formula-btn');
  const globalErr = document.getElementById('emp-global-error');
  const globalText = document.getElementById('emp-global-error-text');

  // Sort errors into per-row and global buckets
  const rowMsgs = {};   // uiRow → message
  const rowFields = {}; // uiRow → 'symbol' | 'value'
  let globalMsg = '';
  const hasContent = validationElements.length > 0;

  errors.forEach(e => {
    if (e.field === 'symbol' || e.field === 'value') {
      const uiRow = rowMap[e.row];
      if (uiRow && !rowMsgs[uiRow]) {
        rowMsgs[uiRow] = e.message;
        rowFields[uiRow] = e.field;
      }
    } else {
      // global / sum / molMass
      if (!globalMsg) globalMsg = e.message;
    }
  });

  // Update per-row error hints
  for (let i = 1; i <= empiricalElementCount; i++) {
    const hint = document.getElementById(`emp-row-error-${i}`);
    const symEl = document.getElementById(`modal-elem${i}-symbol`);
    const valEl = document.getElementById(`modal-elem${i}-value`);
    const msg = rowMsgs[i] || '';
    const field = rowFields[i] || '';

    if (hint) { hint.textContent = msg; hint.classList.toggle('visible', !!msg); }
    if (symEl) symEl.classList.toggle('emp-invalid', field === 'symbol');
    if (valEl) valEl.classList.toggle('emp-invalid', field === 'value');
  }

  // Global error banner — hide when form is fresh (no content)
  if (globalErr) {
    const showGlobal = hasContent && !!globalMsg;
    globalErr.classList.toggle('visible', showGlobal);
    if (globalText) globalText.textContent = showGlobal ? globalMsg : '';
  }

  if (btn) btn.disabled = !ok;
  return ok;
}

function getEmpiricalDetailsElements() {
  return {
    detailsWrapper: document.querySelector('.emp-steps-wrapper'),
    detailsBar: document.querySelector('.emp-steps-bar'),
    detailsToggle: document.getElementById('calc-details-toggle'),
    detailsContent: document.getElementById('calc-details-content'),
    grid: document.querySelector('.emp-grid'),
  };
}

function resetEmpiricalDetailsPanel({ hideToggle = true } = {}) {
  const {
    detailsWrapper,
    detailsBar,
    detailsToggle,
    detailsContent,
    grid,
  } = getEmpiricalDetailsElements();

  if (detailsContent) {
    detailsContent.classList.remove('visible');
    detailsContent.innerHTML = '';
  }
  if (detailsToggle) {
    detailsToggle.classList.remove('open');
    const btnText = detailsToggle.querySelector('span');
    if (btnText) btnText.textContent = t("empirical.showSteps");
  }
  if (detailsWrapper) detailsWrapper.style.display = hideToggle ? 'none' : '';
  if (detailsBar) detailsBar.style.display = hideToggle ? 'none' : '';
  if (grid) {
    grid.style.height = '';
    grid.style.flex = '';
  }
}

function revealEmpiricalDetailsPanel(explanation) {
  const { detailsWrapper, detailsBar, detailsContent } = getEmpiricalDetailsElements();
  resetEmpiricalDetailsPanel({ hideToggle: false });
  if (detailsContent) detailsContent.innerHTML = explanation || '';
  if (detailsWrapper) detailsWrapper.style.display = '';
  if (detailsBar) detailsBar.style.display = '';
}

function attachEmpiricalListeners() {
  const methodSelect = document.getElementById('modal-formula-method');
  const btn = document.getElementById('modal-calc-formula-btn');
  const detailsToggle = document.getElementById('calc-details-toggle');
  const detailsContent = document.getElementById('calc-details-content');
  const addElementBtn = document.getElementById('emp-add-element-btn');
  const removeElementBtn = document.getElementById('emp-remove-element-btn');
  const resetBtn = document.getElementById('emp-reset-btn');
  const randomFillBtn = document.getElementById('emp-random-fill-btn');

  empiricalElementCount = 3;
  renderEmpiricalInputs();
  updateElementButtons();
  resetEmpiricalDetailsPanel();

  if (methodSelect) methodSelect.addEventListener('change', () => renderEmpiricalInputs());

  if (addElementBtn) {
    addElementBtn.addEventListener('click', () => {
      empiricalElementCount++;
      renderEmpiricalInputs();
      updateElementButtons();
    });
  }
  if (removeElementBtn) {
    removeElementBtn.addEventListener('click', () => {
      if (empiricalElementCount > 2) {
        empiricalElementCount--;
        renderEmpiricalInputs();
        updateElementButtons();
      }
    });
  }
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      empiricalElementCount = 3;
      renderEmpiricalInputs();
      updateElementButtons();
      const molMassInput = document.getElementById('modal-mol-mass');
      if (molMassInput) molMassInput.value = '';
      // Clear results
      const emptyState = document.getElementById('lego-empty');
      const resultContent = document.getElementById('lego-blocks-area');
      const detailsCont = document.getElementById('calc-details-content');
      if (emptyState) {
        emptyState.innerHTML = `
          <div class="emp-floating-atoms">
            <div class="emp-atom a1">C</div>
            <div class="emp-atom a2">H</div>
            <div class="emp-atom a3">O</div>
            <div class="emp-atom a4">N</div>
          </div>
          <p class="emp-empty-text">${t("empirical.enterPercent")}</p>`;
        emptyState.style.display = 'flex';
      }
      if (resultContent) resultContent.classList.remove('visible');
      if (detailsCont) detailsCont.classList.remove('visible');
      resetEmpiricalDetailsPanel();
      empLiveValidate();
    });
  }
  if (randomFillBtn) {
    randomFillBtn.addEventListener('click', () => {
      // Pick a random preset, adjusting row count to match
      const preset = EMPIRICAL_PRESETS[Math.floor(Math.random() * EMPIRICAL_PRESETS.length)];
      empiricalElementCount = Math.max(preset.elements.length, 2);
      updateElementButtons();
      fillEmpiricalPreset(preset);
    });
  }

  if (detailsToggle && detailsContent) {
    detailsToggle.addEventListener('click', () => {
      const isExpanded = detailsContent.classList.contains('visible');
      const grid = document.querySelector('.emp-grid');
      if (!isExpanded && grid) { grid.style.height = grid.offsetHeight + 'px'; grid.style.flex = 'none'; }
      if (isExpanded && grid) { grid.style.height = ''; grid.style.flex = ''; }
      detailsContent.classList.toggle('visible', !isExpanded);
      detailsToggle.classList.toggle('open', !isExpanded);
      const btnText = detailsToggle.querySelector('span');
      if (btnText) btnText.textContent = isExpanded ? t("empirical.showSteps") : t("empirical.hideSteps");
      if (!isExpanded) {
        setTimeout(() => {
          const modalBody = document.querySelector('.feature-modal-body');
          if (modalBody) modalBody.scrollTo({ top: modalBody.scrollHeight, behavior: 'smooth' });
        }, 150);
      }
    });
  }

  if (btn) {
    btn.addEventListener('click', () => {
      if (!empLiveValidate()) return;
      try {
        const method = methodSelect?.value || 'percent';
        const data = getEmpiricalData(method);
        const result = calculateEmpiricalModal(data);
        displayEmpiricalResultNew(result);
        const tips = document.getElementById('empirical-tips');
        if (tips) tips.style.display = 'none';
      } catch (error) {
        showEmpiricalError(error.message);
      }
    });
  }
}

function updateElementButtons() {
  const addBtn = document.getElementById('emp-add-element-btn');
  const removeBtn = document.getElementById('emp-remove-element-btn');
  if (addBtn) addBtn.disabled = empiricalElementCount >= 6;
  if (removeBtn) removeBtn.disabled = empiricalElementCount <= 2;
}

function renderEmpiricalInputs(presetSymbols = null) {
  const inputsContainer = document.getElementById('modal-element-inputs');
  if (!inputsContainer) return;

  const method = document.getElementById('modal-formula-method')?.value || 'percent';
  const placeholder = method === 'percent' ? '40.0' : '2.5';

  let html = '';
  for (let i = 0; i < empiricalElementCount; i++) {
    const symbol = presetSymbols ? (presetSymbols[i] || '') : '';
    const colorClass = empColorClass(symbol);
    const isOptional = i >= 2;

    html += `
      <div class="emp-input-row">
        <input type="text"
          id="modal-elem${i + 1}-symbol"
          class="emp-el-input ${colorClass}"
          placeholder="?"
          maxlength="2"
          value="${symbol}"
          data-row="${i + 1}"
          autocomplete="off"
          spellcheck="false">
        <div class="emp-value-col">
          <div class="emp-value-wrapper">
            <input type="text" inputmode="decimal"
              id="modal-elem${i + 1}-value"
              class="emp-input-field"
              placeholder="${isOptional ? t("empirical.optionalInputPlaceholder") : placeholder}"
              autocomplete="off">
            <span class="emp-unit">%</span>
          </div>
          <div class="emp-row-error" id="emp-row-error-${i + 1}"></div>
        </div>
      </div>`;
  }
  inputsContainer.innerHTML = html;

  // Attach per-row listeners
  for (let i = 1; i <= empiricalElementCount; i++) {
    const symInput = document.getElementById(`modal-elem${i}-symbol`);
    const valInput = document.getElementById(`modal-elem${i}-value`);

    if (symInput) {
      // Auto-format on blur
      symInput.addEventListener('blur', () => {
        const raw = symInput.value.trim();
        if (!raw) return;
        const norm = normalizeSymbol(raw);
        if (norm) {
          symInput.value = norm;
          symInput.className = `emp-el-input ${empColorClass(norm)}`;
        } else {
          // Keep what user typed but mark red
          symInput.className = 'emp-el-input emp-invalid';
        }
        empLiveValidate();
      });
      // Live color update while typing
      symInput.addEventListener('input', () => {
        const val = symInput.value.trim();
        const norm = normalizeSymbol(val);
        if (norm) {
          symInput.className = `emp-el-input ${empColorClass(norm)}`;
        } else if (val) {
          symInput.className = 'emp-el-input has-value';
        } else {
          symInput.className = 'emp-el-input';
        }
        empLiveValidate();
      });
    }
    if (valInput) {
      valInput.addEventListener('input', () => empLiveValidate());
      valInput.addEventListener('blur', () => empLiveValidate());
    }
  }

  // Also listen to molecular mass changes
  const molInput = document.getElementById('modal-mol-mass');
  if (molInput) {
    molInput.addEventListener('input', () => empLiveValidate());
    molInput.addEventListener('blur', () => empLiveValidate());
  }

  empLiveValidate();
}

function fillEmpiricalPreset(preset) {
  const symbols = preset.elements.slice(0, empiricalElementCount).map(e => e.s);
  while (symbols.length < empiricalElementCount) symbols.push('');
  renderEmpiricalInputs(symbols);

  preset.elements.slice(0, empiricalElementCount).forEach((elem, i) => {
    const valueInput = document.getElementById(`modal-elem${i + 1}-value`);
    if (valueInput) valueInput.value = elem.v;
  });

  const molMassInput = document.getElementById('modal-mol-mass');
  if (molMassInput) molMassInput.value = preset.molMass || '';

  empLiveValidate();
}

function showEmpiricalError(message) {
  const emptyState = document.getElementById('lego-empty');
  const resultContent = document.getElementById('lego-blocks-area');
  resetEmpiricalDetailsPanel();

  if (emptyState) {
    emptyState.innerHTML = `
      <div style="color: #ef4444; font-size: 14px; padding: 20px; text-align: center;">
        <svg style="width: 40px; height: 40px; margin-bottom: 12px; opacity: 0.7;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <div style="font-weight: 600; margin-bottom: 8px;">${message}</div>
        <div style="font-size: 12px; color: #86868b;">${t("empirical.checkInputAgain")}</div>
      </div>`;
    emptyState.style.display = 'flex';
  }
  if (resultContent) resultContent.classList.remove('visible');
}

function displayEmpiricalResultNew(result) {
  const emptyState = document.getElementById('lego-empty');
  const resultContent = document.getElementById('lego-blocks-area');
  const empiricalDisplay = document.getElementById('empirical-formula-display');
  const molecularCard = document.getElementById('molecular-result-card');
  const molecularDisplay = document.getElementById('molecular-formula-display');
  const massDisplay = document.getElementById('result-mass-display');
  const blocksVisual = document.getElementById('lego-blocks-visual');
  const normTag = document.getElementById('emp-normalised-tag');
  const molMassWarn = document.getElementById('emp-molmass-warning');

  // Hide empty state, show result
  if (emptyState) emptyState.style.display = 'none';
  if (resultContent) resultContent.classList.add('visible');
  revealEmpiricalDetailsPanel(result.explanation);

  // Normalised tag
  if (normTag) normTag.classList.toggle('visible', !!result.normalised);

  // Empirical formula pill
  if (empiricalDisplay) empiricalDisplay.textContent = result.empiricalFormula;

  // Molecular formula — only show when we actually computed one
  if (molecularCard && molecularDisplay) {
    if (result.molecularFormula) {
      molecularCard.style.display = 'flex';
      molecularDisplay.innerHTML = formatFormulaHTML(result.molecularFormula);
      if (massDisplay) {
        massDisplay.textContent = result.molecularMass ? `${result.molecularMass} g/mol` : '';
      }
    } else {
      // No molecular formula — show empirical as hero
      molecularCard.style.display = 'flex';
      molecularDisplay.innerHTML = formatFormulaHTML(result.empiricalFormula);
      if (massDisplay) {
        massDisplay.textContent = `${result.empiricalMass.toFixed(2)} g/mol (empirical)`;
      }
    }
  }

  // Molar mass warning
  if (molMassWarn) {
    if (result.molMassError) {
      molMassWarn.textContent = result.molMassError;
      molMassWarn.classList.add('visible');
    } else {
      molMassWarn.textContent = '';
      molMassWarn.classList.remove('visible');
    }
  }

  // Atom chips
  if (blocksVisual) {
    const displayElements = result.molecularFormula && result.multiplier > 1
      ? result.empirical.map(e => ({ ...e, count: e.count * result.multiplier }))
      : result.empirical;

    let atomsHTML = '';
    displayElements.forEach(elem => {
      const colorClass = EMP_COLORED.includes(elem.symbol) ? `el-${elem.symbol}` : 'el-default';
      atomsHTML += `
        <div class="emp-atom-chip">
          <div class="emp-atom-circle ${colorClass}">${elem.symbol}</div>
          <span class="emp-atom-count">&times;${elem.count}</span>
        </div>`;
    });
    blocksVisual.innerHTML = atomsHTML;
  }

}

function getEmpiricalData(method) {
  const elements = [];

  for (let i = 1; i <= 6; i++) {
    const symbolInput = document.getElementById(`modal-elem${i}-symbol`);
    const valueInput = document.getElementById(`modal-elem${i}-value`);
    if (!symbolInput || !valueInput) continue;

    const raw = symbolInput.value.trim();
    const symbol = normalizeSymbol(raw) || raw; // keep raw for validation to flag
    const value = parseFloat(valueInput.value);

    // Include row only if user typed something in either field
    if (raw || valueInput.value.trim()) {
      if (method === 'percent') {
        elements.push({ symbol, percent: isNaN(value) ? 0 : value });
      } else {
        elements.push({ symbol, mass: isNaN(value) ? 0 : value });
      }
    }
  }

  const molecularMass = parseFloat(document.getElementById('modal-mol-mass')?.value);
  return {
    elements,
    molecularMass: isNaN(molecularMass) ? null : molecularMass,
  };
}


// ==========================================
// Reference Tool Generators
// ==========================================

function generateSolubilityToolContent() {
  return `
        <style>
            /* ===== Solubility Table - Apple Style Layout ===== */
            .sol-calc-wrapper {
                --glass-bg: rgba(255, 255, 255, 0.72);
                --glass-border: rgba(255, 255, 255, 0.6);
                --glass-shadow: 0 2px 8px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8);
                --text-primary: #1d1d1f;
                --text-secondary: #86868b;
                --accent-green: #10b981;

                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
                display: flex;
                flex-direction: column;
                flex: 1;
                width: 100%;
                min-height: 0;
            }

            /* ===== Two Column Grid ===== */
            .sol-grid {
                display: grid;
                grid-template-columns: 300px 1fr;
                gap: 24px;
                margin: 0;
                flex: 1 1 auto;
                min-height: 0;
            }

            /* ===== Left Column: Input Controls ===== */
            .sol-controls {
                display: flex;
                flex-direction: column;
                gap: 16px;
                align-self: start;
            }

            .sol-glass-card {
                background: var(--glass-bg);
                backdrop-filter: blur(20px) saturate(180%);
                -webkit-backdrop-filter: blur(20px) saturate(180%);
                border: 1px solid var(--glass-border);
                border-radius: 16px;
                padding: 20px;
                box-shadow: var(--glass-shadow);
            }

            .sol-section-label {
                font-size: clamp(10px, 1.6vh, 13px);
                font-weight: 600;
                color: var(--text-secondary);
                text-transform: uppercase;
                letter-spacing: 0.06em;
                margin-bottom: 12px;
            }

            .sol-input-stack {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .sol-input-field {
                width: 100%;
                height: 48px;
                padding: 0 16px;
                background: rgba(255, 255, 255, 0.9);
                border: 1.5px solid rgba(0, 0, 0, 0.08);
                border-radius: 12px;
                font-family: 'SF Mono', 'Roboto Mono', monospace;
                font-size: 1.1rem;
                font-weight: 500;
                color: var(--text-primary);
                outline: none;
                transition: all 0.2s ease;
                box-sizing: border-box;
            }

            .sol-input-field:focus {
                border-color: var(--accent-green);
                box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
                background: #fff;
            }

            .sol-input-field::placeholder {
                color: #aeaeb2;
                font-weight: 400;
            }

            .sol-check-btn {
                width: 100%;
                height: 48px;
                background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
                border: none;
                border-radius: 12px;
                color: white;
                font-size: 0.95rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
            }

            .sol-check-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(16, 185, 129, 0.45);
            }

            .sol-check-btn:active {
                transform: translateY(0);
            }

            /* Result Card */
            .sol-result-card {
                border-radius: 16px;
                padding: 20px;
                display: none;
                flex-direction: column;
                justify-content: center;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }

            .sol-result-card.active {
                display: flex;
            }

            .sol-result-card.soluble {
                background: linear-gradient(135deg, rgba(52, 211, 153, 0.15) 0%, rgba(16, 185, 129, 0.25) 100%);
                border: 1.5px solid rgba(52, 211, 153, 0.4);
            }

            .sol-result-card.insoluble {
                background: linear-gradient(135deg, rgba(248, 113, 113, 0.15) 0%, rgba(220, 38, 38, 0.2) 100%);
                border: 1.5px solid rgba(248, 113, 113, 0.4);
            }

            .sol-result-card.unknown {
                background: linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(217, 119, 6, 0.2) 100%);
                border: 1.5px solid rgba(251, 191, 36, 0.4);
            }

            .sol-result-title {
                font-size: clamp(1rem, 2.5vh, 1.4rem);
                font-weight: 700;
                margin-bottom: 4px;
            }

            .sol-result-card.soluble .sol-result-title { color: #047857; }
            .sol-result-card.insoluble .sol-result-title { color: #b91c1c; }
            .sol-result-card.unknown .sol-result-title { color: #b45309; }

            .sol-result-subtitle {
                font-size: clamp(0.78rem, 2vh, 1rem);
                opacity: 0.85;
            }

            .sol-result-card.soluble .sol-result-subtitle { color: #065f46; }
            .sol-result-card.insoluble .sol-result-subtitle { color: #991b1b; }
            .sol-result-card.unknown .sol-result-subtitle { color: #92400e; }

            /* Thinking state */
            .sol-thinking {
                display: flex;
                align-items: center;
                gap: 8px;
                color: #6b7280;
                font-size: clamp(0.78rem, 2vh, 1rem);
            }

            .sol-thinking-dots {
                display: flex;
                gap: 4px;
            }

            .sol-thinking-dots span {
                width: 5px;
                height: 5px;
                background: #9ca3af;
                border-radius: 50%;
                animation: sol-bounce 1.4s ease-in-out infinite;
            }

            .sol-thinking-dots span:nth-child(2) { animation-delay: 0.2s; }
            .sol-thinking-dots span:nth-child(3) { animation-delay: 0.4s; }

            @keyframes sol-bounce {
                0%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-5px); }
            }

            /* ===== Right Column: Reference Table ===== */
            .sol-table-panel {
                background: var(--glass-bg);
                backdrop-filter: blur(20px) saturate(180%);
                -webkit-backdrop-filter: blur(20px) saturate(180%);
                border: 1px solid var(--glass-border);
                border-radius: 16px;
                padding: 24px;
                box-shadow: var(--glass-shadow);
                overflow: auto;
                display: flex;
                flex-direction: column;
                min-height: 0;
            }

            .sol-table-title {
                font-size: clamp(11px, 2vh, 15px);
                font-weight: 600;
                color: var(--text-secondary);
                text-transform: uppercase;
                letter-spacing: 0.06em;
                margin-bottom: 0;
                padding-bottom: clamp(8px, 2vh, 14px);
                border-bottom: 1px solid rgba(0, 0, 0, 0.06);
            }

            .sol-glass-table {
                width: 100%;
                border-collapse: separate;
                border-spacing: 0;
                font-size: clamp(0.85rem, 2.4vh, 1.1rem);
            }

            .sol-glass-table th {
                padding: clamp(8px, 2.2vh, 16px) 16px;
                text-align: left;
                font-weight: 600;
                color: #374151;
                font-size: clamp(0.7rem, 1.8vh, 0.9rem);
                text-transform: uppercase;
                letter-spacing: 0.5px;
                background: rgba(0, 0, 0, 0.02);
                border-bottom: 1px solid rgba(0, 0, 0, 0.06);
            }

            .sol-glass-table th:first-child { border-radius: 10px 0 0 0; }
            .sol-glass-table th:last-child { border-radius: 0 10px 0 0; }

            .sol-glass-table td {
                padding: clamp(8px, 2.2vh, 16px) 16px;
                color: #374151;
                border-bottom: 1px solid rgba(0, 0, 0, 0.04);
                vertical-align: middle;
            }

            .sol-glass-table tbody tr {
                transition: background 0.15s ease;
            }

            .sol-glass-table tbody tr:hover {
                background: rgba(0, 0, 0, 0.02);
            }

            .sol-glass-table tbody tr:last-child td {
                border-bottom: none;
            }

            .sol-anion-name {
                font-family: 'SF Mono', 'Roboto Mono', monospace;
                font-weight: 600;
                color: #1a1a1a;
                font-size: clamp(0.9rem, 2.4vh, 1.15rem);
                display: inline;
                white-space: nowrap;
            }

            /* Ion formula with aligned sub/superscripts */
            .sol-ion {
                display: inline-flex;
                align-items: baseline;
            }

            .sol-ion-base {
                font-family: 'SF Mono', 'Roboto Mono', monospace;
                font-weight: 600;
            }

            .sol-ion-scripts {
                display: inline-flex;
                flex-direction: column;
                align-items: flex-start;
                font-size: 0.7em;
                line-height: 1;
                vertical-align: middle;
                margin-left: 1px;
                transform: translateY(-8px);
            }

            .sol-ion-scripts .sup {
                transform: translateY(0px);
            }

            .sol-ion-scripts .sub {
                transform: translateY(0px);
            }

            /* Higher superscript for single-script ions */
            .sol-sup-high {
                vertical-align: super;
                font-size: 0.75em;
                position: relative;
                top: -0.4em;
            }

            .sol-anion-label {
                font-size: clamp(0.78rem, 2vh, 0.95rem);
                color: #6b7280;
                margin-left: 8px;
                font-weight: 400;
            }

            /* Pill badges */
            .sol-pill {
                display: inline-flex;
                align-items: center;
                padding: clamp(3px, 1vh, 6px) 12px;
                border-radius: 6px;
                font-size: clamp(0.7rem, 1.7vh, 0.85rem);
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.3px;
            }

            .sol-pill-soluble {
                background: rgba(52, 211, 153, 0.2);
                color: #047857;
            }

            .sol-pill-insoluble {
                background: rgba(248, 113, 113, 0.2);
                color: #b91c1c;
            }

            .sol-exception-text {
                font-size: clamp(0.85rem, 2.2vh, 1.05rem);
                color: #4b5563;
                line-height: 1.6;
            }

            .sol-exception-text .sol-pill {
                padding: clamp(2px, 0.6vh, 4px) 8px;
                font-size: clamp(0.65rem, 1.6vh, 0.78rem);
                margin-left: 6px;
                vertical-align: middle;
            }
        </style>

        <div class="tool-padding-label">Solubility Table</div>
        <div class="sol-calc-wrapper">

            <!-- Two Column Grid -->
            <div class="sol-grid">
                <!-- Left: Input Controls -->
                <div class="sol-controls">
                    <div class="sol-glass-card">
                        <div class="sol-section-label">Enter Chemical Formula</div>
                        <div class="sol-input-stack">
                            <input type="text" id="solubility-input" class="sol-input-field" placeholder="${t("solubility.inputPlaceholder")}" autocomplete="off">
                            <button id="check-solubility-btn" class="sol-check-btn">Check Solubility</button>
                        </div>
                    </div>

                    <div id="solubility-result" class="sol-result-card">
                        <div class="sol-result-title"></div>
                        <div class="sol-result-subtitle"></div>
                    </div>
                </div>

                <!-- Right: Reference Table -->
                <div class="sol-table-panel">
                    <table class="sol-glass-table">
                        <tbody>
                            <tr>
                                <td><span class="sol-anion-name"><span class="sol-ion"><span class="sol-ion-base">NO</span><span class="sol-ion-scripts"><span class="sup">−</span><span class="sub">3</span></span></span></span><span class="sol-anion-label">Nitrate</span></td>
                                <td><span class="sol-pill sol-pill-soluble">Soluble</span></td>
                                <td class="sol-exception-text">None — always soluble</td>
                            </tr>
                            <tr>
                                <td><span class="sol-anion-name">CH<sub>3</sub>COO<sup class="sol-sup-high">−</sup></span><span class="sol-anion-label">Acetate</span></td>
                                <td><span class="sol-pill sol-pill-soluble">Soluble</span></td>
                                <td class="sol-exception-text">None — always soluble</td>
                            </tr>
                            <tr>
                                <td><span class="sol-anion-name">Cl<sup class="sol-sup-high">−</sup>, Br<sup class="sol-sup-high">−</sup>, I<sup class="sol-sup-high">−</sup></span><span class="sol-anion-label">Halides</span></td>
                                <td><span class="sol-pill sol-pill-soluble">Soluble</span></td>
                                <td class="sol-exception-text">Ag<sup>+</sup>, Pb<sup>2+</sup>, <span class="sol-ion"><span class="sol-ion-base">Hg</span><span class="sol-ion-scripts"><span class="sup">2+</span><span class="sub">2</span></span></span> <span class="sol-pill sol-pill-insoluble">Insol.</span></td>
                            </tr>
                            <tr>
                                <td><span class="sol-anion-name"><span class="sol-ion"><span class="sol-ion-base">SO</span><span class="sol-ion-scripts"><span class="sup">2−</span><span class="sub">4</span></span></span></span><span class="sol-anion-label">Sulfate</span></td>
                                <td><span class="sol-pill sol-pill-soluble">Soluble</span></td>
                                <td class="sol-exception-text">Ba<sup>2+</sup>, Pb<sup>2+</sup>, Ca<sup>2+</sup>, Sr<sup>2+</sup> <span class="sol-pill sol-pill-insoluble">Insol.</span></td>
                            </tr>
                            <tr>
                                <td><span class="sol-anion-name">OH<sup class="sol-sup-high">−</sup></span><span class="sol-anion-label">Hydroxide</span></td>
                                <td><span class="sol-pill sol-pill-insoluble">Insol.</span></td>
                                <td class="sol-exception-text">Group 1, <span class="sol-ion"><span class="sol-ion-base">NH</span><span class="sol-ion-scripts"><span class="sup">+</span><span class="sub">4</span></span></span> <span class="sol-pill sol-pill-soluble">Sol.</span> Ca<sup>2+</sup>, Ba<sup>2+</sup>, Sr<sup>2+</sup> slightly</td>
                            </tr>
                            <tr>
                                <td><span class="sol-anion-name"><span class="sol-ion"><span class="sol-ion-base">CO</span><span class="sol-ion-scripts"><span class="sup">2−</span><span class="sub">3</span></span></span></span><span class="sol-anion-label">Carbonate</span></td>
                                <td><span class="sol-pill sol-pill-insoluble">Insol.</span></td>
                                <td class="sol-exception-text">Group 1, <span class="sol-ion"><span class="sol-ion-base">NH</span><span class="sol-ion-scripts"><span class="sup">+</sup><span class="sub">4</span></span></span> <span class="sol-pill sol-pill-soluble">Soluble</span></td>
                            </tr>
                            <tr>
                                <td><span class="sol-anion-name"><span class="sol-ion"><span class="sol-ion-base">PO</span><span class="sol-ion-scripts"><span class="sup">3−</span><span class="sub">4</span></span></span></span><span class="sol-anion-label">Phosphate</span></td>
                                <td><span class="sol-pill sol-pill-insoluble">Insol.</span></td>
                                <td class="sol-exception-text">Group 1, <span class="sol-ion"><span class="sol-ion-base">NH</span><span class="sol-ion-scripts"><span class="sup">+</span><span class="sub">4</span></span></span> <span class="sol-pill sol-pill-soluble">Soluble</span></td>
                            </tr>
                            <tr>
                                <td><span class="sol-anion-name">S<sup class="sol-sup-high">2−</sup></span><span class="sol-anion-label">Sulfide</span></td>
                                <td><span class="sol-pill sol-pill-insoluble">Insol.</span></td>
                                <td class="sol-exception-text">Group 1, Group 2, <span class="sol-ion"><span class="sol-ion-base">NH</span><span class="sol-ion-scripts"><span class="sup">+</span><span class="sub">4</span></span></span> <span class="sol-pill sol-pill-soluble">Sol.</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function attachSolubilityListeners() {
  const input = document.getElementById("solubility-input");
  const btn = document.getElementById("check-solubility-btn");
  const resultCard = document.getElementById("solubility-result");

  if (!input || !btn || !resultCard) return;

  const runCheck = () => {
    const val = input.value.trim();
    if (!val) return;

    // Reset classes
    resultCard.className = "sol-result-card active";
    resultCard.innerHTML = `
            <div class="sol-thinking">
                <div class="sol-thinking-dots">
                    <span></span><span></span><span></span>
                </div>
                ${t("solubility.analyzing")}
            </div>
        `;

    setTimeout(() => {
      const res = calculateSolubility(val);
      const titleEl = document.createElement("div");
      titleEl.className = "sol-result-title";
      const subtitleEl = document.createElement("div");
      subtitleEl.className = "sol-result-subtitle";

      if (res.soluble) {
        resultCard.className = "sol-result-card active soluble";
        titleEl.textContent = t("solubility.likelySoluble");
        subtitleEl.textContent = res.reason;
      } else if (res.insoluble) {
        resultCard.className = "sol-result-card active insoluble";
        titleEl.textContent = t("solubility.likelyInsoluble");
        subtitleEl.textContent = res.reason;
      } else {
        resultCard.className = "sol-result-card active unknown";
        titleEl.textContent = t("solubility.unknown");
        subtitleEl.textContent = t("solubility.unknownSubtitle");
      }

      resultCard.innerHTML = "";
      resultCard.appendChild(titleEl);
      resultCard.appendChild(subtitleEl);
    }, 300);
  };

  btn.onclick = runCheck;
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") runCheck();
  });
  setTimeout(() => input.focus(), 100);
}

function calculateSolubility(formula) {
  const f = formula.trim();
  // 1. Group 1 & Ammonium (Rule 1: Always Soluble)
  // Matches Li, Na, K, Rb, Cs, NH4. Ensure not inside other words (like NaCl matches Na)
  if (/(Li|Na|K|Rb|Cs)(?![a-z])/.test(f) || /NH4/.test(f)) {
    return {
      soluble: true,
      reason: t("solubility.reasonGroup1"),
    };
  }
  // 2. Nitrates & Acetates (Rule 2: Always Soluble)
  if (/NO3/.test(f) || /CH3COO/.test(f) || /C2H3O2/.test(f)) {
    return {
      soluble: true,
      reason: t("solubility.reasonNitrateAcetate"),
    };
  }
  // 3. Halides (Cl, Br, I)
  // Matches Cl, Br, I. not ClO, BrO.
  if (/(Cl|Br|I)(?![a-z])(?!O)/.test(f)) {
    // Exceptions: Ag, Pb, Hg
    if (/(Ag|Pb|Hg)/.test(f)) {
      return {
        insoluble: true,
        reason: t("solubility.reasonHalideException"),
      };
    }
    return {
      soluble: true,
      reason: t("solubility.reasonHalideGeneral"),
    };
  }
  // 4. Sulfates (SO4)
  if (/SO4/.test(f)) {
    // Exceptions: Ca, Sr, Ba, Pb
    if (/(Ca|Sr|Ba|Pb)/.test(f)) {
      return {
        insoluble: true,
        reason: t("solubility.reasonSulfateException"),
      };
    }
    return {
      soluble: true,
      reason: t("solubility.reasonSulfateGeneral"),
    };
  }
  // 5. Hydroxides (OH)
  if (/(OH|\(OH\))/.test(f)) {
    // Exceptions: Ca, Sr, Ba (Slightly Soluble -> Treat as Soluble for typical context or specify)
    if (/(Ca|Sr|Ba)/.test(f)) {
      // Often considered slightly soluble. Let's say Soluble.
      return {
        soluble: true,
        reason: t("solubility.reasonHydroxideGroup2"),
      };
    }
    return {
      insoluble: true,
      reason: t("solubility.reasonHydroxideGeneral"),
    };
  }
  // 6. Carbonates, Phosphates, Sulfides (Insoluble)
  // Matches CO3, PO4, S not SO4.
  if (/CO3/.test(f) || /PO4/.test(f) || /S(?![a-zO])/.test(f)) {
    return {
      insoluble: true,
      reason: t("solubility.reasonCarbonatePhosphateSulfide"),
    };
  }

  return { unknown: true };
}

function smartParseFormula(input) {
  if (!input)
    return {
      displayHtml: "—",
      cleanFormula: "",
      isValid: false,
      suspicious: null,
      hasError: false,
    };

  let processed = input
    .trim()
    .replace(/\s+/g, "")
    .replace(/[*+。·]+/g, ".")
    .replace(/\.+/g, ".")
    .replace(/[^A-Za-z0-9().[\]]/g, "");

  let suspicious = null;

  // Flag when a letter is followed by a 0 (e.g. C02 -> CO2, Na0H -> NaOH)
  // But valid formulas like C6H12O6 or C8H10N4O2 should NOT trigger.
  if (/([A-Za-z])0/.test(processed)) {
    suspicious = processed.replace(/([A-Za-z])0/g, "$1O");
  }


  const tokens = [];
  let hasError = false;
  let i = 0;
  while (i < processed.length) {
    const char = processed[i];

    if (/[A-Z]/.test(char)) {
      let element = char;
      i++;
      if (i < processed.length && /[a-z]/.test(processed[i])) {
        element += processed[i];
        i++;
      }
      if (atomicMasses && !atomicMasses[element]) {
        hasError = true;
        tokens.push({ type: "error", value: element, valid: false });
      } else {
        tokens.push({ type: "element", value: element, valid: true });
      }
    } else if (/[a-z]/.test(char)) {
      hasError = true;
      tokens.push({ type: "error", value: char, valid: false });
      i++;
    } else if (/[0-9]/.test(char)) {
      let num = "";
      while (i < processed.length && /[0-9]/.test(processed[i])) {
        num += processed[i];
        i++;
      }
      tokens.push({ type: "number", value: num, valid: true });
    } else if ("()[].".includes(char)) {
      tokens.push({ type: "symbol", value: char, valid: true });
      i++;
    } else {
      i++;
    }
  }

  let displayHtml = "";
  let cleanFormula = "";

  for (let idx = 0; idx < tokens.length; idx++) {
    const token = tokens[idx];
    const val = token.value;

    if (token.type === "number") {
      const subs = val
        .split("")
        .map((d) => "₀₁₂₃₄₅₆₇₈₉"[parseInt(d)])
        .join("");

      const prevToken = idx > 0 ? tokens[idx - 1] : null;
      const prevIsLetter =
        prevToken &&
        (prevToken.type === "element" || prevToken.type === "error");
      const prevIsParen =
        prevToken && prevToken.type === "symbol" && prevToken.value === ")";

      if (prevIsLetter || prevIsParen) {
        displayHtml += `<sub>${subs}</sub>`;
      } else {
        displayHtml += `<span style="margin-right: 2px;">${val}</span>`;
      }
      cleanFormula += val;
    } else if (token.type === "symbol") {
      if (val === ".") {
        displayHtml += '<span style="margin: 0 2px;">·</span>';
        cleanFormula += ".";
      } else if (val === "(" || val === "[") {
        displayHtml += val;
        cleanFormula += "(";
      } else if (val === ")" || val === "]") {
        displayHtml += val;
        cleanFormula += ")";
      }
    } else if (token.type === "element") {
      displayHtml += val;
      cleanFormula += val;
    } else if (token.type === "error") {
      displayHtml += `<span style="color: #ef4444; text-decoration: underline wavy;" title="${t("molarMass.invalidElementTitle")}">${val}</span>`;
    }
  }

  return {
    displayHtml,
    cleanFormula,
    isValid: cleanFormula.length > 0 && !hasError,
    suspicious,
    hasError,
  };
}

function displayMolarMassResult(result) {
  const blocksArea = document.getElementById("scale-blocks-area");
  if (blocksArea) {
    blocksArea.innerHTML = "";
    const totalMass = parseFloat(result.total);
    result.breakdown.forEach((item) => {
      const subtotalVal = parseFloat(item.subtotal);
      const percent =
        totalMass > 0 ? ((subtotalVal / totalMass) * 100).toFixed(1) : 0;
      const block = document.createElement("div");
      block.className = "element-block";
      block.textContent = item.element;
      const size = 50 + percent * 0.8;
      block.style.width = `${Math.min(size, 100)}px`;
      block.style.height = `${Math.min(size, 100)}px`;
      const hue =
        (item.element.charCodeAt(0) * 20 + item.element.length * 10) % 360;
      block.style.background = `linear-gradient(135deg, hsl(${hue}, 70%, 60%), hsl(${hue}, 70%, 40%))`;
      const tooltip = document.createElement("div");
      tooltip.className = "block-tooltip";
      tooltip.innerHTML = `<strong>${item.element}</strong><br>${percent}%`;
      block.appendChild(tooltip);
      blocksArea.appendChild(block);
    });
  }
}

let discardTimeout = null;

function discardReceipt() {
  const wrapper = document.getElementById("receipt-wrapper");
  if (wrapper) {
    if (discardTimeout) clearTimeout(discardTimeout);
    wrapper.classList.remove("printing");
    wrapper.classList.add("discarding");
    discardTimeout = setTimeout(() => {
      wrapper.classList.add("reset-position");
      wrapper.classList.remove("discarding");
      void wrapper.offsetWidth;
      wrapper.classList.remove("reset-position");
      discardTimeout = null;
    }, 450);
  }
}

function printReceipt(result) {
  const wrapper = document.getElementById("receipt-wrapper");
  const items = document.getElementById("receipt-items");
  const total = document.getElementById("receipt-total-value");
  const date = document.getElementById("receipt-date");
  if (wrapper && items) {
    if (discardTimeout) {
      clearTimeout(discardTimeout);
      discardTimeout = null;
    }
    wrapper.classList.remove("discarding", "printing", "reset-position");
    wrapper.style.transition = "none";
    wrapper.style.transform = "translateY(-300px)";
    wrapper.style.opacity = "0";
    void wrapper.offsetWidth;
    wrapper.style.transition = "";
    wrapper.style.transform = "";
    wrapper.style.opacity = "";
    const now = new Date();
    const timeStr = now.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    date.textContent = timeStr;
    requestAnimationFrame(() => {
      wrapper.classList.add("printing");
    });
    let html = "";
    result.breakdown.forEach((item) => {
      html += `<div class="receipt-item-row"><div class="receipt-item-name"><strong>${item.element}</strong> x${item.count}</div><div>${item.subtotal}</div></div>`;
    });
    items.innerHTML = html;
    total.textContent = result.total + " g/mol";
  }
}
