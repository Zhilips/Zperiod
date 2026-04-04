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
import { formatReactionError } from "./equationBalancer.js";
import { predictReaction } from "./reactionPredictor.js";
import { t } from "./langController.js";

const TOOL_LISTENER_MAP = {
  balancer: attachBalancerListeners,
  "molar-mass": attachMolarMassListeners,
  "virtual-lab": attachVirtualLabListeners,
  empirical: attachEmpiricalListeners,
  solubility: attachSolubilityListeners,
};

let virtualLabCleanup = null;

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
        const errorMsg = formatReactionError(error.message || "");
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
      productsText.textContent = formatReactionError(res.error || (res.noReaction ? (t("predictor.noProducts") || "No products formed.") : (t("predictor.unknownError") || "Unknown error.")));
      explanationText.textContent = res.explanation || (t("predictor.checkInputAgain") || "Please check your input and try again.");
      if (!res.explanation) explanation.style.display = "none";
      return;
    }

    productsLabel.textContent = t("predictor.predictedProducts") || "Predicted Products";
    productsText.innerHTML = formatChemicalEquation(res.products.join(" + "));
    productsCard._copyText = res.products.join(" + ");
    
    if (res.balancedEquation) {
      balancedCard.style.display = "block";
      balancedLabel.textContent = t("predictor.balancedEquation") || "Balanced Equation";
      balancedText.innerHTML = formatChemicalEquation(res.balancedEquation);
      balancedCard._copyText = res.balancedEquation;
    } else if (res.unbalancedEquation) {
      balancedCard.style.display = "block";
      balancedCard.classList.add("error");
      balancedLabel.textContent = t("predictor.unbalancedReaction") || "Unbalanced Reaction";
      balancedText.innerHTML = formatChemicalEquation(res.unbalancedEquation);
      balancedCard._copyText = res.unbalancedEquation;
      if (res.balancingError) {
        explanationText.textContent = res.explanation ? res.explanation + " (" + res.balancingError + ")" : res.balancingError;
      }
    } else {
      balancedCard.style.display = "none";
      balancedCard._copyText = "";
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

  function setupPredictorCopy(card, textElement) {
    if (!card || !textElement) return;
    card.addEventListener("click", () => {
      if (card._copyText && !card.classList.contains("error") && !card.classList.contains("no-reaction")) {
        navigator.clipboard.writeText(card._copyText).then(() => {
          const prev = textElement.innerHTML;
          textElement.innerHTML = `<span>${t("balancer.copied") || "Copied!"}</span>`;
          setTimeout(() => {
            textElement.innerHTML = prev;
          }, 1000);
        });
      }
    });
    // Visual hint
    card.style.cursor = "pointer";
    card.title = t("balancer.clickToCopy") || "Click to copy";
  }

  setupPredictorCopy(productsCard, productsText);
  setupPredictorCopy(balancedCard, balancedText);

  // ===== Virtual Lab Interaction Logic =====

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

function attachVirtualLabListeners() {
  if (typeof virtualLabCleanup === "function") {
    virtualLabCleanup();
    virtualLabCleanup = null;
  }

  const scene = document.getElementById("virtual-lab-scene");
  const beakerWrap = document.getElementById("virtual-lab-beaker-wrap");
  const beakerBody = document.getElementById("virtual-lab-beaker-body");
  const fluidMask = beakerBody?.querySelector(".virtual-lab-fluid-mask");
  const fluidLayer = document.getElementById("virtual-lab-fluid-layer");
  const spillLayer = document.getElementById("virtual-lab-particle-layer");
  const addWaterBtn = document.getElementById("virtual-lab-add-water-btn");
  const clearWaterBtn = document.getElementById("virtual-lab-clear-water-btn");
  const changeElementBtn = document.getElementById("virtual-lab-change-element-btn");
  const metalCube = document.getElementById("virtual-lab-metal-cube");
  const elementPicker = document.getElementById("virtual-lab-element-picker");
  const thermoFill = document.getElementById("virtual-lab-thermo-fill");
  const thermoTemp = document.getElementById("virtual-lab-thermo-temp");
  const reactionInfoBadge = document.getElementById("virtual-lab-reaction-info");
  if (
    !scene ||
    !beakerWrap ||
    !beakerBody ||
    !fluidMask ||
    !fluidLayer ||
    !spillLayer ||
    !addWaterBtn ||
    !clearWaterBtn
  ) {
    return;
  }

  const controller = new AbortController();
  const { signal } = controller;
  const PARTICLE_SEED_COUNT = 44;
  const ADD_WATER_COUNT = 18;
  const SPILL_TILT_THRESHOLD = 18;
  const RENDER_HEADROOM = 200;

  const state = {
    x: 0,
    y: 0,
    rot: 0,
    dragging: false,
    pointerId: null,
    startPointerX: 0,
    startPointerY: 0,
    startX: 0,
    startY: 0,
    totalMove: 0,
    suppressClickUntil: 0,
    lastClientX: 0,
    lastClientY: 0,
    animationFrame: 0,
    particles: [],
    prevX: 0,
    prevY: 0,
    prevRot: 0,
    initialized: false,
  };

  // Metal cube state
  const cube = {
    x: 0, y: 0,
    vx: 0, vy: 0,
    angle: 0, // no rotation - keeps physics and visuals aligned
    w: 46, h: 46,
    dragging: false,
    insideBeaker: false, // tracks whether cube is inside beaker
    pointerId: null,
    dragOffsetX: 0, dragOffsetY: 0,
    totalDrag: 0,
  };

  // Metal elements data
  const METAL_ELEMENTS = [
    { group: "Alkali Metal", elements: [
      { sym: "Li", name: "Lithium", color: "#e85d5d" },
      { sym: "Na", name: "Sodium", color: "#e85d5d" },
      { sym: "K", name: "Potassium", color: "#e85d5d" },
      { sym: "Rb", name: "Rubidium", color: "#e85d5d" },
      { sym: "Cs", name: "Caesium", color: "#e85d5d" },
      { sym: "Fr", name: "Francium", color: "#e85d5d" },
    ]},
    { group: "Alkaline Earth Metal", elements: [
      { sym: "Be", name: "Beryllium", color: "#e8a14d" },
      { sym: "Mg", name: "Magnesium", color: "#e8a14d" },
      { sym: "Ca", name: "Calcium", color: "#e8a14d" },
      { sym: "Sr", name: "Strontium", color: "#e8a14d" },
      { sym: "Ba", name: "Barium", color: "#e8a14d" },
      { sym: "Ra", name: "Radium", color: "#e8a14d" },
    ]},
  ];

  let selectedElement = METAL_ELEMENTS[0].elements[1]; // Na by default

  // ===== Reaction Data: Metal + Water reactions =====
  // rate = fraction of cube consumed per frame (higher = faster reaction)
  // heat = max temperature rise (°C above 20)
  // bubbleRate = how many bubbles per frame on average
  // waterColor = final water tint color when fully reacted
  const REACTION_DATA = {
    // Alkali metals - vigorous reactions
    Li:  { rate: 0.00020, heat: 18, bubbleRate: 0.35, waterColor: 'rgba(220,225,235,0.35)', eq: '2Li + 2H₂O → 2LiOH + H₂↑' },
    Na:  { rate: 0.00055, heat: 45, bubbleRate: 0.65, waterColor: 'rgba(220,225,235,0.40)', eq: '2Na + 2H₂O → 2NaOH + H₂↑' },
    K:   { rate: 0.00090, heat: 70, bubbleRate: 0.90, waterColor: 'rgba(215,220,235,0.45)', eq: '2K + 2H₂O → 2KOH + H₂↑' },
    Rb:  { rate: 0.00130, heat: 85, bubbleRate: 1.20, waterColor: 'rgba(215,220,235,0.50)', eq: '2Rb + 2H₂O → 2RbOH + H₂↑' },
    Cs:  { rate: 0.00180, heat: 95, bubbleRate: 1.50, waterColor: 'rgba(210,215,230,0.55)', eq: '2Cs + 2H₂O → 2CsOH + H₂↑' },
    Fr:  { rate: 0.00200, heat: 99, bubbleRate: 1.80, waterColor: 'rgba(210,215,230,0.60)', eq: '2Fr + 2H₂O → 2FrOH + H₂↑' },
    // Alkaline earth metals - slower, gentler reactions
    Be:  { rate: 0, heat: 0, bubbleRate: 0, waterColor: null, eq: 'Be + H₂O → No Reaction' }, // Be doesn't react with water
    Mg:  { rate: 0.00005, heat: 5, bubbleRate: 0.08, waterColor: 'rgba(230,235,240,0.15)', eq: 'Mg + 2H₂O → Mg(OH)₂ + H₂↑' },
    Ca:  { rate: 0.00025, heat: 22, bubbleRate: 0.45, waterColor: 'rgba(235,235,230,0.50)', eq: 'Ca + 2H₂O → Ca(OH)₂ + H₂↑' },
    Sr:  { rate: 0.00040, heat: 35, bubbleRate: 0.55, waterColor: 'rgba(225,230,235,0.40)', eq: 'Sr + 2H₂O → Sr(OH)₂ + H₂↑' },
    Ba:  { rate: 0.00060, heat: 50, bubbleRate: 0.70, waterColor: 'rgba(220,225,235,0.45)', eq: 'Ba + 2H₂O → Ba(OH)₂ + H₂↑' },
    Ra:  { rate: 0.00080, heat: 60, bubbleRate: 0.80, waterColor: 'rgba(215,220,230,0.50)', eq: 'Ra + 2H₂O → Ra(OH)₂ + H₂↑' },
  };

  // Reaction state
  const rxn = {
    active: false,        // is reaction currently happening
    progress: 0,          // 0 → 1 (how much of the cube has reacted)
    temperature: 20,      // current temperature in °C
    waterTint: 0,         // 0 → 1 opacity of milky water overlay
    bubbles: [],          // active bubble DOM elements
    cubeScale: 1,         // current visual scale of the cube
    lastElement: null,    // last element that started a reaction
  };


  function updateCubeAppearance() {
    const cubeEl = document.getElementById('virtual-lab-metal-cube');
    if (!cubeEl) return;
    cubeEl.style.background = '#b0b5bc';
    cubeEl.style.border = '1px solid #9da3ab';
    cubeEl.style.color = 'white';
    cubeEl.style.display = 'flex';
    cubeEl.style.alignItems = 'center';
    cubeEl.style.justifyContent = 'center';
    cubeEl.style.fontSize = '17px';
    cubeEl.style.fontWeight = '800';
    cubeEl.style.fontFamily = "'Inter', sans-serif";
    cubeEl.style.textShadow = '0 1px 2px rgba(0,0,0,0.25)';
    cubeEl.innerHTML = `<span style="color:${selectedElement.color};text-shadow:none;font-size:17px;font-weight:800">${selectedElement.sym}</span>`;
  }

  // ===== Reaction System Functions =====

  /** Check if the cube center is actually submerged in water (below water surface level) */
  function isCubeSubmerged(metrics) {
    if (!cube.insideBeaker || state.particles.length === 0 || rxn.progress >= 1) return false;
    // Find the approximate water surface (lowest Y of inside-mode particles in fluid coords)
    const cubeLocal = worldToFluid(cube.x, cube.y, metrics);
    let waterTopY = metrics.height; // default: bottom
    for (const p of state.particles) {
      if (p.mode !== 'inside') continue;
      const pLocal = worldToFluid(p.x, p.y, metrics);
      if (pLocal.y < waterTopY) waterTopY = pLocal.y;
    }
    // Cube is "submerged" if its center is below the water surface level
    return cubeLocal.y > waterTopY - 10;
  }

  /** Spawn a single decorative H₂ bubble near the cube */
  function spawnBubble(metrics) {
    const size = 3 + Math.random() * 5;
    const el = document.createElement('span');
    el.className = 'virtual-lab-bubble';
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.left = '0';
    el.style.top = '0';
    // Position near the cube in world space (scene coords, NOT fluidLayer to avoid goo filter)
    const cubeLocal = worldToFluid(cube.x, cube.y, metrics);
    const bx = cubeLocal.x + (Math.random() - 0.5) * cube.w * rxn.cubeScale;
    const by = cubeLocal.y - cube.h / 2 * rxn.cubeScale + Math.random() * 6;
    // Convert to world for scene-level positioning
    const worldPos = fluidToWorld(bx, by, metrics);
    el.style.transform = `translate3d(${worldPos.x.toFixed(1)}px, ${worldPos.y.toFixed(1)}px, 0)`;
    el.style.opacity = '0.7';
    // Add to SCENE layer (not fluidLayer which has goo filter that merges them)
    scene.appendChild(el);
    const bubble = {
      el,
      worldX: worldPos.x,
      worldY: worldPos.y,
      vy: -(0.6 + Math.random() * 1.2),
      vx: (Math.random() - 0.5) * 0.4,
      life: 0,
      maxLife: 40 + Math.random() * 60,
      size,
    };
    rxn.bubbles.push(bubble);
  }



  /** Update all active bubbles — animate upward, wobble, fade out, remove dead ones */
  function tickBubbles(metrics) {
    for (let i = rxn.bubbles.length - 1; i >= 0; i--) {
      const b = rxn.bubbles[i];
      b.life++;
      b.worldY += b.vy;
      b.worldX += b.vx + Math.sin(b.life * 0.15) * 0.3;
      const fade = 1 - (b.life / b.maxLife);
      b.el.style.transform = `translate3d(${b.worldX.toFixed(1)}px, ${b.worldY.toFixed(1)}px, 0)`;
      b.el.style.opacity = (fade * 0.7).toFixed(2);
      if (b.life >= b.maxLife || b.worldY < 0) {
        b.el.remove();
        rxn.bubbles.splice(i, 1);
      }
    }
  }

  /** Main per-frame reaction tick */
  function tickReaction(metrics) {
    const data = REACTION_DATA[selectedElement.sym];
    if (!data || data.rate === 0) {
      // No reaction (e.g. Be) — cool down, clear state
      if (rxn.active) {
        rxn.active = false;
        updateReactionInfo(data);
      }
      rxn.temperature = Math.max(20, rxn.temperature - 0.15);
      updateThermometer();
      tickBubbles(metrics);
      return;
    }

    const submerged = isCubeSubmerged(metrics);

    if (submerged && rxn.progress < 1) {
      // ---- REACTION IS HAPPENING ----
      if (!rxn.active) {
        rxn.active = true;
        rxn.lastElement = selectedElement.sym;
        updateReactionInfo(data);
      }

      // Advance progress
      rxn.progress = Math.min(1, rxn.progress + data.rate);

      // Temperature rises toward target, capped at 100°C boiling point
      const targetTemp = 20 + data.heat * Math.min(rxn.progress * 3, 1);
      rxn.temperature = Math.min(100, rxn.temperature + Math.max(0, (targetTemp - rxn.temperature) * 0.04));

      // Boil off water molecules at 100°C
      if (rxn.temperature >= 99.5) {
        if (Math.random() < 0.25) { // 25% chance per frame to lose a molecule to evaporation
          const insideTokens = state.particles.filter(p => p.mode === 'inside');
          if (insideTokens.length > 0) {
            const pToBoil = insideTokens[Math.floor(Math.random() * insideTokens.length)];
            
            // visually convert to gas
            pToBoil.mode = 'vapor';
            pToBoil.el.style.background = 'rgba(255,255,255,0.4)';
            pToBoil.vy = -3 - Math.random() * 3;
            ensureParticleParent(pToBoil, scene); // escape Goo filter container
            
            // decouple from primary particle engine array
            state.particles.splice(state.particles.indexOf(pToBoil), 1);
            setTimeout(() => {
              if (pToBoil.el) pToBoil.el.remove();
            }, 600);
          }
        }
      }

      // Cube shrinks
      rxn.cubeScale = Math.max(0, 1 - rxn.progress);
      
      // Sync physics body scale
      const targetPhysScale = Math.max(0.1, 1 - rxn.progress);
      if (matterCubeBody && Math.abs(cube.physicsScale - targetPhysScale) > 0.005) {
        const factor = targetPhysScale / cube.physicsScale;
        MatterLib.Body.scale(matterCubeBody, factor, factor);
        cube.physicsScale = targetPhysScale;
      }

      // Spawn bubbles based on reaction vigor
      if (Math.random() < data.bubbleRate * (1 - rxn.progress * 0.7)) {
        spawnBubble(metrics);
      }



      // Apply visual changes
      applyCubeScale();

      // Slowly emit tint clouds into water near the cube
      if (data.waterColor) {
        const intensity = data.rate * 2.5; // Scale rate up so particles charge near cube
        state.particles.forEach(p => {
          if (p.mode === 'inside') {
            // Distance is invariant under rigid rotation, so we can use world coordinates directly
            const dist = Math.hypot(p.x - cube.x, p.y - cube.y);
            // Must be larger than cube width/2 (e.g. 23) + particle radius (e.g. 5) to ever hit, use 65 for a small halo
            if (dist < 65) {
              p.tint = Math.min(1.0, (p.tint || 0) + intensity);
            }
          }
        });
      }

      // If fully reacted, cube truly dissolves — remove from DOM
      if (rxn.progress >= 1) {
        rxn.cubeScale = 0;
        cube.dragging = false;
        cube.w = 0;
        cube.h = 0;
        const dissolvingCubeEl = document.getElementById('virtual-lab-metal-cube');
        if (dissolvingCubeEl && dissolvingCubeEl.parentElement) {
          dissolvingCubeEl.remove();
        }
        // Remove Matter.js body too
        if (matterCubeBody && matterEngine && MatterLib) {
          MatterLib.Composite.remove(matterEngine.world, matterCubeBody);
          matterCubeBody = null;
        }
      }
    } else if (!submerged && rxn.active && rxn.progress < 1) {
      // Cube pulled out of water mid-reaction — reaction pauses
      // Temperature slowly cools
      rxn.temperature = Math.max(20, rxn.temperature - 0.3);
    } else if (rxn.progress >= 1) {
      // Reaction complete — cool down
      rxn.temperature = Math.max(20, rxn.temperature - 0.15);
      if (rxn.temperature <= 20.5 && rxn.active) {
        rxn.active = false;
      }
    }

    updateThermometer();
    tickBubbles(metrics);
  }

  function applyCubeScale() {
    const currentCubeEl = document.getElementById('virtual-lab-metal-cube');
    if (!currentCubeEl) return;
    const s = rxn.cubeScale;
    currentCubeEl.style.width = (46 * s).toFixed(1) + 'px';
    currentCubeEl.style.height = (46 * s).toFixed(1) + 'px';
    
    // Hide text span when too small to fit text cleanly
    const textSpan = currentCubeEl.querySelector('span');
    if (textSpan) {
      if (s < 0.45) textSpan.style.opacity = '0';
      else textSpan.style.opacity = '1';
    }

    // Update cube physics state for collision matching
    cube.w = 46 * s;
    cube.h = 46 * s;

    // Synchronously reduce MatterJS physics collision box
    if (matterCubeBody && MatterLib) {
      if (!cube.physicsScale) cube.physicsScale = 1;
      const currentPhysicsScale = cube.physicsScale;
      // Safety bounds to prevent collision engine corruption on scale=0
      let safeS = Math.max(0.01, s);
      const ratio = safeS / currentPhysicsScale;
      
      if (Math.abs(ratio - 1) > 0.001) {
        // Matter.js scales relative to the body center
        const oldH = 46 * currentPhysicsScale;
        const newH = 46 * safeS;
        
        MatterLib.Body.scale(matterCubeBody, ratio, ratio);
        
        // Correct Y to keep the bottom in the same place (bottom-aligned shrinking)
        // Since it scales symmetrically, the bottom rises by (oldH - newH)/2
        const shiftY = (oldH - newH) / 2;
        MatterLib.Body.setPosition(matterCubeBody, {
          x: matterCubeBody.position.x,
          y: matterCubeBody.position.y + shiftY
        });
        
        cube.physicsScale = safeS;
      }
    }
  }
  function updateThermometer() {
    if (!thermoFill) return;
    const pct = Math.min(100, Math.max(5, ((rxn.temperature - 0) / 120) * 100));
    thermoFill.style.height = pct.toFixed(1) + '%';
    // Update temp text
    if (thermoTemp) {
      thermoTemp.textContent = Math.round(rxn.temperature) + '°';
    }
    // Color: blue→orange→red based on temp
    if (rxn.temperature < 30) {
      thermoFill.style.background = 'linear-gradient(180deg, #5cb3ff 0%, #2b7de9 100%)';
    } else if (rxn.temperature < 60) {
      thermoFill.style.background = 'linear-gradient(180deg, #ffb347 0%, #ff8c1a 100%)';
    } else {
      thermoFill.style.background = 'linear-gradient(180deg, #ff6b4a 0%, #e84040 100%)';
    }
  }

  function updateReactionInfo(data) {
    if (!reactionInfoBadge) return;
    if (data && data.rate > 0 && rxn.active) {
      reactionInfoBadge.innerHTML = `<span class="virtual-lab-reaction-eq">${data.eq}</span>`;
      reactionInfoBadge.classList.add('active');
    } else if (data && data.rate === 0) {
      reactionInfoBadge.innerHTML = `<span class="virtual-lab-reaction-eq">${data.eq}</span>`;
      reactionInfoBadge.classList.add('active');
      setTimeout(() => reactionInfoBadge.classList.remove('active'), 3000);
    } else {
      reactionInfoBadge.classList.remove('active');
    }
  }

  function resetReaction() {
    rxn.active = false;
    rxn.progress = 0;
    rxn.temperature = 20;
    rxn.waterTint = 0;
    rxn.cubeScale = 1;
    rxn.lastElement = null;
    // Remove all bubbles
    rxn.bubbles.forEach(b => b.el.remove());
    rxn.bubbles = [];
    // Remove any stray sparks
    scene.querySelectorAll('.virtual-lab-spark').forEach(el => el.remove());
    // If cube was removed from DOM, re-create it
    let cubeEl = document.getElementById('virtual-lab-metal-cube');
    if (!cubeEl) {
      cubeEl = document.createElement('div');
      cubeEl.className = 'virtual-lab-metal-cube';
      cubeEl.id = 'virtual-lab-metal-cube';
      scene.appendChild(cubeEl);
    }
    cubeEl.style.opacity = '1';
    cubeEl.style.width = '46px';
    cubeEl.style.height = '46px';
    cube.w = 46;
    cube.h = 46;
    cube.physicsScale = 1;
    cube.dragging = false;
    cube.insideBeaker = false;
    // Reset position
    const sw = scene.offsetWidth || 800;
    const sh = scene.offsetHeight || 540;
    const standTotalH = 30; // 14 board + 16 legs
    cube.x = sw * 0.82;
    cube.y = sh - standTotalH - cube.h / 2;
    cube.angle = 0;

    // Re-setup pointer events on the new cube element
    setupCubeDragEvents(cubeEl);
    updateCubeAppearance();

    // Re-create Matter.js body — ALWAYS recreate on reset to ensure 100% clean collision state
    if (matterEngine && MatterLib) {
      if (matterCubeBody) {
        MatterLib.Composite.remove(matterEngine.world, matterCubeBody);
      }
      matterCubeBody = MatterLib.Bodies.rectangle(cube.x, cube.y, cube.w, cube.h, {
        restitution: 0.35, friction: 0.4, frictionAir: 0.02, density: 0.008,
        chamfer: { radius: 8 }, label: 'metalCube',
      });
      MatterLib.Composite.add(matterEngine.world, matterCubeBody);
    }
    
    // Re-create Stand
    const standEl = document.getElementById('virtual-lab-wooden-stand');
    if (standEl) standEl.style.opacity = '1';
    if (matterEngine && MatterLib) {
      if (matterStandBody) {
        MatterLib.Composite.remove(matterEngine.world, matterStandBody);
        matterStandBody = null;
      }
      const standW = 66;
      const standRecreateH = 30; // 14 board + 16 legs
      matterStandBody = MatterLib.Bodies.rectangle(sw * 0.82, sh - standRecreateH / 2, standW, standRecreateH, { isStatic: true, restitution: 0.2, friction: 0.5, chamfer: { radius: 2 } });
      MatterLib.Composite.add(matterEngine.world, matterStandBody);
    }
    // Reset water particle color
    state.particles.forEach(p => {
      if (p.el) p.el.style.background = '#4da6ff';
    });
    // Reset thermometer
    updateThermometer();
      // Hide reaction badge
      if (reactionInfoBadge) reactionInfoBadge.classList.remove('active');
  }

  function buildPickerHTML() {
    if (!elementPicker) return;
    let html = '';
    METAL_ELEMENTS.forEach(group => {
      html += `<div class="virtual-lab-picker-group">${group.group}</div>`;
      group.elements.forEach(el => {
        const isActive = el.sym === selectedElement.sym ? ' active' : '';
        html += `<button class="virtual-lab-picker-item${isActive}" data-sym="${el.sym}">
          <span class="virtual-lab-picker-sym" style="background:${el.color}">${el.sym}</span>
          ${el.name}
        </button>`;
      });
    });
    elementPicker.innerHTML = html;
  }

  function openPicker() {
    if (!elementPicker || !changeElementBtn) return;
    buildPickerHTML();
    // Position above button relative to shell
    const btnRect = changeElementBtn.getBoundingClientRect();
    const shell = document.querySelector('.virtual-lab-shell');
    const shellRect = shell.getBoundingClientRect();
    
    // Center it relative to the button (picker is 160px wide)
    let left = btnRect.left - shellRect.left + (btnRect.width / 2) - 80;
    // Set 8px gap above the button's top edge
    let bottom = shellRect.bottom - btnRect.top + 8;
    
    // Keep within shell horizontally
    if (left < 10) left = 10;
    if (left + 160 > shellRect.width) left = shellRect.width - 170;
    
    elementPicker.style.top = 'auto';
    elementPicker.style.bottom = bottom + 'px';
    elementPicker.style.left = left + 'px';
    elementPicker.classList.add('open');

    // Handle selection
    elementPicker.querySelectorAll('.virtual-lab-picker-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sym = e.currentTarget.dataset.sym;
        const found = METAL_ELEMENTS.flatMap(g => g.elements).find(el => el.sym === sym);
        if (found) {
          selectedElement = found;
          resetReaction();
          updateCubeAppearance();
        }
        closePicker();
      });
    });
  }

  function closePicker() {
    if (elementPicker) elementPicker.classList.remove('open');
  }

  if (changeElementBtn) {
    changeElementBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openPicker();
    });
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function getWrapSize() {
    const rect = beakerWrap.getBoundingClientRect();
    return {
      width: beakerWrap.offsetWidth || rect.width || 168,
      height: beakerWrap.offsetHeight || rect.height || 236,
    };
  }

  function getBounds() {
    const rect = scene.getBoundingClientRect();
    const beaker = getWrapSize();
    const maxX = Math.max(0, (rect.width - beaker.width) / 2 - 18);
    const maxY = Math.max(0, (rect.height - beaker.height) / 2 - 18);

    return { maxX, maxY };
  }

  function updateView() {
    beakerWrap.style.setProperty("--vlab-x", `${state.x.toFixed(2)}px`);
    beakerWrap.style.setProperty("--vlab-y", `${state.y.toFixed(2)}px`);
    beakerWrap.style.setProperty("--vlab-rot", `${state.rot.toFixed(2)}deg`);
  }

  function createParticleElement(parent) {
    const el = document.createElement("span");
    el.className = "virtual-lab-particle";
    parent.appendChild(el);
    return el;
  }

  function ensureParticleParent(particle, parent) {
    if (particle.el.parentElement !== parent) {
      parent.appendChild(particle.el);
    }
  }

  function getCupMetrics() {
    // CRITICAL: use offset* properties, NOT getBoundingClientRect().
    // getBoundingClientRect returns the axis-aligned bounding box which
    // changes size when the element is rotated, breaking all collision math.
    const wrapW = beakerWrap.offsetWidth || 168;
    const wrapH = beakerWrap.offsetHeight || 236;
    const bodyW = beakerBody.offsetWidth || 132;
    const bodyH = beakerBody.offsetHeight || 206;
    const bodyLeft = beakerBody.offsetLeft || 18;
    const bodyTop = beakerBody.offsetTop || 20;

    const bodyStyle = window.getComputedStyle(beakerBody);
    const wallLeft = parseFloat(bodyStyle.borderLeftWidth) || 3;
    const wallRight = parseFloat(bodyStyle.borderRightWidth) || 3;
    const wallBottom = parseFloat(bodyStyle.borderBottomWidth) || 3;

    // Inner content area (the space particles live in)
    const width = bodyW - wallLeft - wallRight;
    const height = bodyH - wallBottom; // no top border

    // Origin of inner content area in wrap-center local coordinates
    const localOriginX = -wrapW / 2 + bodyLeft + wallLeft;
    const localOriginY = -wrapH / 2 + bodyTop; // no top border offset

    const cornerRadius = 27; // CSS border-radius(30) - border-width(3)
    const radius = clamp(Math.min(width, height) * 0.052, 7.8, 10.8);
    return {
      width,
      height,
      localOriginX,
      localOriginY,
      cornerRadius,
      radius,
      headroom: RENDER_HEADROOM,
    };
  }

  function getCupCenterWorld(offsetX = state.x, offsetY = state.y) {
    return {
      x: (scene.offsetWidth || scene.clientWidth) / 2 + offsetX,
      y: (scene.offsetHeight || scene.clientHeight) / 2 + offsetY,
    };
  }

  function localToWorld(lx, ly, offsetX = state.x, offsetY = state.y, rot = state.rot) {
    const center = getCupCenterWorld(offsetX, offsetY);
    const rad = (rot * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    return {
      x: center.x + lx * cos - ly * sin,
      y: center.y + lx * sin + ly * cos,
    };
  }

  function worldToLocal(wx, wy, offsetX = state.x, offsetY = state.y, rot = state.rot) {
    const center = getCupCenterWorld(offsetX, offsetY);
    const rad = (rot * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const dx = wx - center.x;
    const dy = wy - center.y;
    return {
      x: dx * cos + dy * sin,
      y: -dx * sin + dy * cos,
    };
  }

  function fluidToWorld(lx, ly, metrics, offsetX = state.x, offsetY = state.y, rot = state.rot) {
    return localToWorld(
      metrics.localOriginX + lx,
      metrics.localOriginY + ly,
      offsetX,
      offsetY,
      rot,
    );
  }

  function worldToFluid(wx, wy, metrics, offsetX = state.x, offsetY = state.y, rot = state.rot) {
    const local = worldToLocal(wx, wy, offsetX, offsetY, rot);
    return {
      x: local.x - metrics.localOriginX,
      y: local.y - metrics.localOriginY,
    };
  }

  function rotateLocalVector(nx, ny, rot = state.rot) {
    const rad = (rot * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    return {
      x: nx * cos - ny * sin,
      y: nx * sin + ny * cos,
    };
  }

  function reflectVelocity(particle, nx, ny, bounce = 0.22) {
    const dot = particle.vx * nx + particle.vy * ny;
    if (dot < 0) {
      particle.vx -= (1 + bounce) * dot * nx;
      particle.vy -= (1 + bounce) * dot * ny;
    }
  }

  function renderParticle(particle, metrics) {
    if (particle.mode === "inside") {
      ensureParticleParent(particle, fluidLayer);
      const local = worldToFluid(particle.x, particle.y, metrics);
      particle.el.style.transform = `translate3d(${(local.x - particle.r).toFixed(2)}px, ${(local.y + metrics.headroom - particle.r).toFixed(2)}px, 0)`;
    } else {
      ensureParticleParent(particle, spillLayer);
      particle.el.style.transform = `translate3d(${(particle.x - particle.r).toFixed(2)}px, ${(particle.y - particle.r).toFixed(2)}px, 0)`;
    }
    
    if (particle.mode !== "vapor") {
      const t = particle.tint || 0;
      if (t > 0.01) {
        // Blend from original blue (#4da6ff) toward milky color
        const r = Math.round(77 + (235 - 77) * t);
        const g = Math.round(166 + (235 - 166) * t);
        const b = Math.round(255 + (230 - 255) * t);
        const a = 1 - t * 0.2;
        particle.el.style.background = `rgba(${r},${g},${b},${a})`;
      } else {
        particle.el.style.background = '#4da6ff';
      }
    }
  }

  function spawnParticle(localX, localY, metrics, velocity = {}) {
    const world = fluidToWorld(localX, localY, metrics);
    const el = createParticleElement(fluidLayer);
    el.style.width = `${(metrics.radius * 2).toFixed(2)}px`;
    el.style.height = `${(metrics.radius * 2).toFixed(2)}px`;
    const particle = {
      mode: "inside",
      el,
      x: world.x,
      y: world.y,
      vx: velocity.vx ?? (Math.random() - 0.5) * 0.16,
      vy: velocity.vy ?? Math.random() * 0.08,
      r: metrics.radius,
      tint: 0,
    };
    state.particles.push(particle);
    renderParticle(particle, metrics);
  }

  function seedParticles() {
    fluidLayer.innerHTML = "";
    spillLayer.innerHTML = "";
    state.particles = [];

    const metrics = getCupMetrics();
    const cols = 5;
    const usableWidth = metrics.width - metrics.radius * 2 - 10;
    const xGap = usableWidth / Math.max(1, cols - 1);
    const yGap = metrics.radius * 1.85;
    const startX = metrics.radius + 5;
    const startY = metrics.height - metrics.radius - 8;

    for (let i = 0; i < PARTICLE_SEED_COUNT; i += 1) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const rowOffset = row % 2 ? xGap * 0.35 : 0;
      const lx = startX + xGap * col + rowOffset;
      const ly = startY - row * yGap;
      spawnParticle(lx, ly, metrics);
    }
  }

  function addWaterBurst() {
    const metrics = getCupMetrics();
    const count = ADD_WATER_COUNT;
    for (let i = 0; i < count; i += 1) {
      const spread = (i - (count - 1) / 2) * (metrics.radius * 1.45);
      const lx = clamp(
        metrics.width * 0.5 + spread + (Math.random() - 0.5) * metrics.radius,
        metrics.radius + 4,
        metrics.width - metrics.radius - 4,
      );
      const ly = clamp(
        metrics.radius + 12 + Math.random() * metrics.radius * 1.5,
        metrics.radius + 4,
        metrics.height - metrics.radius - 6,
      );
      spawnParticle(lx, ly, metrics, {
        vx: (Math.random() - 0.5) * 0.22,
        vy: Math.random() * 0.16,
      });
    }
  }

  function resolveInsideCollision(particle, metrics) {
    let local = worldToFluid(particle.x, particle.y, metrics);
    let corrected = false;
    let localNormal = null;
    const normalizedTilt = ((((state.rot % 360) + 540) % 360) - 180);
    const allowTiltSpill = Math.abs(normalizedTilt) >= SPILL_TILT_THRESHOLD;
    const pourRight = normalizedTilt >= 0;

    // ---- Spill over mouth: any particle above the rim escapes ----
    if (local.y < -particle.r * 0.5) {
      particle.mode = "spill";
      ensureParticleParent(particle, spillLayer);
      return;
    }

    // ---- Tilt pour zone: particles near the pour-side rim escape ----
    const mouthBandY = particle.r * 1.2;
    const inPourZone =
      local.y <= mouthBandY &&
      (pourRight ? local.x >= metrics.width * 0.45 : local.x <= metrics.width * 0.55);

    if (allowTiltSpill && inPourZone) {
      particle.mode = "spill";
      ensureParticleParent(particle, spillLayer);
      particle.vx += pourRight ? 0.4 : -0.4;
      return;
    }

    // ---- Wall collisions ----
    const sideMin = particle.r;
    const sideMax = metrics.width - particle.r;
    const cornerStartY = Math.max(0, metrics.height - metrics.cornerRadius);
    const bottomFlatY = metrics.height - particle.r;
    const leftWallOpen = allowTiltSpill && !pourRight && local.y <= particle.r * 1.5;
    const rightWallOpen = allowTiltSpill && pourRight && local.y <= particle.r * 1.5;

    if (local.x < sideMin && !leftWallOpen) {
      local.x = sideMin;
      corrected = true;
      localNormal = { x: 1, y: 0 };
    } else if (local.x > sideMax && !rightWallOpen) {
      local.x = sideMax;
      corrected = true;
      localNormal = { x: -1, y: 0 };
    }

    if (
      local.y > bottomFlatY &&
      local.x >= metrics.cornerRadius &&
      local.x <= metrics.width - metrics.cornerRadius
    ) {
      local.y = bottomFlatY;
      corrected = true;
      localNormal = { x: 0, y: -1 };
    }

    if (local.x < metrics.cornerRadius && local.y > cornerStartY) {
      const cx = metrics.cornerRadius;
      const cy = cornerStartY;
      const dx = local.x - cx;
      const dy = local.y - cy;
      const dist = Math.hypot(dx, dy) || 0.0001;
      const limit = Math.max(0.1, metrics.cornerRadius - particle.r);
      if (dist > limit) {
        const ux = dx / dist;
        const uy = dy / dist;
        local.x = cx + ux * limit;
        local.y = cy + uy * limit;
        corrected = true;
        localNormal = { x: -ux, y: -uy };
      }
    } else if (
      local.x > metrics.width - metrics.cornerRadius &&
      local.y > cornerStartY
    ) {
      const cx = metrics.width - metrics.cornerRadius;
      const cy = cornerStartY;
      const dx = local.x - cx;
      const dy = local.y - cy;
      const dist = Math.hypot(dx, dy) || 0.0001;
      const limit = Math.max(0.1, metrics.cornerRadius - particle.r);
      if (dist > limit) {
        const ux = dx / dist;
        const uy = dy / dist;
        local.x = cx + ux * limit;
        local.y = cy + uy * limit;
        corrected = true;
        localNormal = { x: -ux, y: -uy };
      }
    }

    if (corrected) {
      const world = fluidToWorld(local.x, local.y, metrics);
      particle.x = world.x;
      particle.y = world.y;
      if (localNormal) {
        const worldNormal = rotateLocalVector(localNormal.x, localNormal.y);
        reflectVelocity(particle, worldNormal.x, worldNormal.y, 0.03);
      }
    }
  }

  function solveParticleCollisions() {
    for (let i = 0; i < state.particles.length; i += 1) {
      for (let j = i + 1; j < state.particles.length; j += 1) {
        const a = state.particles[i];
        const b = state.particles[j];
        if (a.mode !== b.mode) continue; // only same-mode particles interact
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) || 0.0001;
        const minDist = a.r + b.r;
        
        if (dist < minDist) {
          // Soft overlap resolution (less jitter)
          const overlap = (minDist - dist) * 0.35;
          const nx = dx / dist;
          const ny = dy / dist;
          a.x -= nx * overlap;
          a.y -= ny * overlap;
          b.x += nx * overlap;
          b.y += ny * overlap;

          // Velocity exchange
          const rvx = b.vx - a.vx;
          const rvy = b.vy - a.vy;
          const rel = rvx * nx + rvy * ny;
          if (rel < 0) {
            const impulse = rel * 0.5;
            a.vx += impulse * nx;
            a.vy += impulse * ny;
            b.vx -= impulse * nx;
            b.vy -= impulse * ny;
          }
        } else if (dist < minDist * 2.4) {
          // Cohesion / surface tension — pull nearby particles together gently
          const pull = (dist - minDist) * 0.003;
          const nx = dx / dist;
          const ny = dy / dist;
          a.vx += nx * pull;
          a.vy += ny * pull;
          b.vx -= nx * pull;
          b.vy -= ny * pull;
          
          // Velocity alignment (viscosity)
          const rvx = b.vx - a.vx;
          const rvy = b.vy - a.vy;
          const align = 0.012;
          a.vx += rvx * align;
          a.vy += rvy * align;
          b.vx -= rvx * align;
          b.vy -= rvy * align;
          
          // Tint diffusion (mixing)
          const tA = a.tint || 0;
          const tB = b.tint || 0;
          if (Math.abs(tA - tB) > 0.005) {
            const diff = tB - tA;
            a.tint = tA + diff * 0.04;
            b.tint = tB - diff * 0.04;
          }
        }
      }
    }
  }

  function resolveSceneCollision(particle, sw, sh) {
    const minX = particle.r + 2;
    const maxX = sw - particle.r - 2;
    const minY = particle.r + 2;
    const maxY = sh - particle.r - 2;

    if (particle.x < minX) {
      particle.x = minX;
      reflectVelocity(particle, 1, 0, 0.2);
    } else if (particle.x > maxX) {
      particle.x = maxX;
      reflectVelocity(particle, -1, 0, 0.2);
    }

    if (particle.y < minY) {
      particle.y = minY;
      reflectVelocity(particle, 0, 1, 0.2);
    } else if (particle.y > maxY) {
      particle.y = maxY;
      reflectVelocity(particle, 0, -1, 0.18);
      particle.vx *= 0.985;
    }
  }

  function handleResize() {
    const { maxX, maxY } = getBounds();
    state.x = clamp(state.x, -maxX, maxX);
    state.y = clamp(state.y, -maxY, maxY);
    const metrics = getCupMetrics();
    
    // Reposition wooden stand
    const sw = scene.offsetWidth || 800;
    const sh = scene.offsetHeight || 540;
    const standEl = document.getElementById('virtual-lab-wooden-stand');
    if (standEl) {
        const standW = 66;
        const standTotalH = 30; // 14 board + 16 legs
        standEl.style.transform = `translate3d(${(sw * 0.82 - standW / 2).toFixed(1)}px, ${(sh - standTotalH).toFixed(1)}px, 0)`;
    }

    if (!state.initialized) {
      seedParticles();
      state.initialized = true;
    }
    state.prevX = state.x;
    state.prevY = state.y;
    state.prevRot = state.rot;
    updateView();
    state.particles.forEach((particle) => renderParticle(particle, metrics));
  }

  function beginDrag(clientX, clientY, pointerId = null, mode = "move") {
    state.dragging = true;
    state.pointerId = pointerId;
    state.dragMode = mode;
    state.startPointerX = clientX;
    state.startPointerY = clientY;
    state.lastClientX = clientX;
    state.lastClientY = clientY;
    state.startX = state.x;
    state.startY = state.y;
    state.startRot = state.rot;
    state.totalMove = 0;
    beakerWrap.classList.add("dragging");
  }

  function dragTo(clientX, clientY) {
    if (!state.dragging) return;
    const dx = clientX - state.startPointerX;
    const dy = clientY - state.startPointerY;
    const stepX = clientX - state.lastClientX;
    const stepY = clientY - state.lastClientY;

    if (state.dragMode === "rotate") {
        const sceneRect = scene.getBoundingClientRect();
        const center = getCupCenterWorld();
        const cx = sceneRect.left + center.x;
        const cy = sceneRect.top + center.y;
        
        const startRad = Math.atan2(state.startPointerY - cy, state.startPointerX - cx);
        const currentRad = Math.atan2(clientY - cy, clientX - cx);
        
        let diffRad = currentRad - startRad;
        while (diffRad > Math.PI) diffRad -= 2 * Math.PI;
        while (diffRad < -Math.PI) diffRad += 2 * Math.PI;

        state.rot = state.startRot + diffRad * (180 / Math.PI);
        state.lastClientX = clientX;
        state.lastClientY = clientY;
        updateView();
        return;
    }

    const { maxX, maxY } = getBounds();

    state.x = clamp(state.startX + dx, -maxX, maxX);
    state.y = clamp(state.startY + dy, -maxY, maxY);
    state.totalMove = Math.max(state.totalMove, Math.hypot(dx, dy));
    state.lastClientX = clientX;
    state.lastClientY = clientY;
    state.impulseX = clamp(stepX * 0.9, -18, 18);
    state.impulseY = clamp(stepY * 0.9, -18, 18);
    updateView();
  }

  function endDrag() {
    if (!state.dragging) return;
    beakerWrap.classList.remove("dragging");
    state.dragging = false;
    if (state.totalMove >= 8) {
      state.suppressClickUntil = performance.now() + 160;
    }
    state.pointerId = null;
    state.totalMove = 0;
    state.lastClientX = 0;
    state.lastClientY = 0;
    updateView();
  }

  // Beaker exterior collision for spilled particles
  function resolveBeakerExteriorCollision(particle, metrics) {
    const local = worldToFluid(particle.x, particle.y, metrics);
    if (local.x < -particle.r * 2 || local.x > metrics.width + particle.r * 2) return;
    if (local.y < -particle.r * 2 || local.y > metrics.height + particle.r * 2) return;
    
    // --- RECAPTURE: if particle enters purely through the open mouth, switch back to inside ---
    // Tightened the Y-bounds so water falling down the outside walls cannot magically teleport
    // through the glass and mix with the inside water.
    if (local.y > -20 && local.y < 20 &&
        local.x >= particle.r && local.x <= metrics.width - particle.r) {
      particle.mode = "inside";
      ensureParticleParent(particle, fluidLayer);
      return;
    }
    
    // --- PUSH OUT: if particle overlaps the glass walls from outside ---
    // Check proximity to vertical walls
    if (local.y >= 0 && local.y <= metrics.height) {
      if (local.x >= -particle.r && local.x <= metrics.width / 2) { // left half of the beaker
        // Force out to left wall
        const world = fluidToWorld(-particle.r, local.y, metrics);
        particle.x = world.x;
        particle.y = world.y;
        const wn = rotateLocalVector(-1, 0);
        reflectVelocity(particle, wn.x, wn.y, 0.1);
      } else if (local.x > metrics.width / 2 && local.x <= metrics.width + particle.r) { // right half
        // Force out to right wall
        const world = fluidToWorld(metrics.width + particle.r, local.y, metrics);
        particle.x = world.x;
        particle.y = world.y;
        const wn = rotateLocalVector(1, 0);
        reflectVelocity(particle, wn.x, wn.y, 0.1);
      }
    }
    // Check proximity to bottom
    if (local.x >= 0 && local.x <= metrics.width) {
      if (local.y > metrics.height - particle.r && local.y <= metrics.height + particle.r) {
        const world = fluidToWorld(local.x, metrics.height + particle.r, metrics);
        particle.x = world.x;
        particle.y = world.y;
        const wn = rotateLocalVector(0, 1);
        reflectVelocity(particle, wn.x, wn.y, 0.1);
      }
    }
  }

  const MatterLib = window.Matter;
  let matterEngine, matterCubeBody, matterStandBody;
  let matterSceneBodies = [];
  let matterBeakerBodies = [];
  const CUBE_HALF = 23;

  function initMatterPhysics() {
    if (!MatterLib || !metalCube) return;
    const sw = scene.offsetWidth || 800;
    const sh = scene.offsetHeight || 540;
    const wallT = 20;

    matterEngine = MatterLib.Engine.create({ gravity: { x: 0, y: 1.8 } });

    // Scene boundary walls
    // Nudge boundaries in by 2px to prevent visual overflow/clipping at edges
    const floor = MatterLib.Bodies.rectangle(sw / 2, sh + wallT / 2 - 2, sw + 40, wallT, { isStatic: true, restitution: 0.3, friction: 0.5 });
    const ceiling = MatterLib.Bodies.rectangle(sw / 2, -wallT / 2 + 2, sw + 40, wallT, { isStatic: true, restitution: 0.1 });
    const wallL = MatterLib.Bodies.rectangle(-wallT / 2 + 2, sh / 2, wallT, sh + 40, { isStatic: true, restitution: 0.3 });
    const wallR = MatterLib.Bodies.rectangle(sw + wallT / 2 - 2, sh / 2, wallT, sh + 40, { isStatic: true, restitution: 0.3 });

    // Wooden stand
    const standW = 66;
    const standTotalH = 30; // 14 board + 16 legs
    matterStandBody = MatterLib.Bodies.rectangle(sw * 0.82, sh - standTotalH / 2, standW, standTotalH, { isStatic: true, restitution: 0.2, friction: 0.5, chamfer: { radius: 2 } });

    matterSceneBodies = [floor, ceiling, wallL, wallR, matterStandBody];

    // Metal cube body
    matterCubeBody = MatterLib.Bodies.rectangle(sw * 0.82, sh - standTotalH - cube.h / 2, cube.w, cube.h, {      restitution: 0.35, friction: 0.4, frictionAir: 0.02, density: 0.008,
      chamfer: { radius: 8 }, label: 'metalCube',
    });

    MatterLib.Composite.add(matterEngine.world, [...matterSceneBodies, matterCubeBody]);
    rebuildBeakerBodies();
  }

  function rebuildBeakerBodies() {
    if (!matterEngine) return;
    const metrics = getCupMetrics();
    if (!metrics || !metrics.width) return;

    if (matterBeakerBodies.length > 0) {
      MatterLib.Composite.remove(matterEngine.world, matterBeakerBodies);
      matterBeakerBodies = [];
    }

    const wallT = 14;
    const cornerR = metrics.cornerRadius || 27;
    const w = metrics.width;
    const h = metrics.height;
    const rotRad = (state.rot * Math.PI) / 180;

    // Helper: convert beaker-local fluid coords to scene world coords
    function fw(lx, ly) {
      return fluidToWorld(lx, ly, metrics);
    }

    // Left wall (straight part, from top to where corner arc starts)
    const leftH = h - cornerR;
    const leftCenter = fw(-wallT / 2, leftH / 2);
    const leftWall = MatterLib.Bodies.rectangle(leftCenter.x, leftCenter.y, wallT, leftH, {
      isStatic: true, angle: rotRad, restitution: 0.2, friction: 0.3,
    });

    // Right wall
    const rightCenter = fw(w + wallT / 2, leftH / 2);
    const rightWall = MatterLib.Bodies.rectangle(rightCenter.x, rightCenter.y, wallT, leftH, {
      isStatic: true, angle: rotRad, restitution: 0.2, friction: 0.3,
    });

    // Bottom wall (flat center between corners)
    const bottomFlatW = w - cornerR * 2;
    const bottomCenter = fw(w / 2, h + wallT / 2);
    const bottomWall = MatterLib.Bodies.rectangle(bottomCenter.x, bottomCenter.y, bottomFlatW, wallT, {
      isStatic: true, angle: rotRad, restitution: 0.2, friction: 0.5,
    });

    // Corner arcs (approximated with segments)
    const cornerBodies = [];
    const segments = 8;

    // Bottom-left corner arc
    for (let i = 0; i < segments; i++) {
      const a1 = Math.PI / 2 + (Math.PI / 2) * (i / segments);
      const a2 = Math.PI / 2 + (Math.PI / 2) * ((i + 1) / segments);
      const aMid = (a1 + a2) / 2;
      // Corner circle center in fluid coords
      const ccx = cornerR;
      const ccy = h - cornerR;
      const segX = ccx + Math.cos(aMid) * (cornerR + wallT / 4);
      const segY = ccy + Math.sin(aMid) * (cornerR + wallT / 4);
      const segWorld = fw(segX, segY);
      const len = 2 * cornerR * Math.sin((a2 - a1) / 2) + 4;
      cornerBodies.push(MatterLib.Bodies.rectangle(segWorld.x, segWorld.y, len, wallT, {
        isStatic: true, angle: aMid + Math.PI / 2 + rotRad, restitution: 0.2, friction: 0.3,
      }));
    }

    // Bottom-right corner arc
    for (let i = 0; i < segments; i++) {
      const a1 = (Math.PI / 2) * (i / segments);
      const a2 = (Math.PI / 2) * ((i + 1) / segments);
      const aMid = (a1 + a2) / 2;
      const ccx = w - cornerR;
      const ccy = h - cornerR;
      const segX = ccx + Math.cos(aMid) * (cornerR + wallT / 4);
      const segY = ccy + Math.sin(aMid) * (cornerR + wallT / 4);
      const segWorld = fw(segX, segY);
      const len = 2 * cornerR * Math.sin((a2 - a1) / 2) + 4;
      cornerBodies.push(MatterLib.Bodies.rectangle(segWorld.x, segWorld.y, len, wallT, {
        isStatic: true, angle: aMid + Math.PI / 2 + rotRad, restitution: 0.2, friction: 0.3,
      }));
    }

    matterBeakerBodies = [leftWall, rightWall, bottomWall, ...cornerBodies];
    MatterLib.Composite.add(matterEngine.world, matterBeakerBodies);
  }

  // Check if cube center is inside the beaker's open interior (above bottom, between walls, below mouth)
  function isCubeInBeakerRegion(metrics) {
    const local = worldToFluid(cube.x, cube.y, metrics);
    return local.x > 0 && local.x < metrics.width && local.y > -30 && local.y < metrics.height;
  }

  // Beaker collision is now handled by Matter.js static bodies
  // Just keep the particle interaction function

  function resolveCubeParticleCollision(p) {
    if (!matterCubeBody) return;
    const cbx = matterCubeBody.position.x;
    const cby = matterCubeBody.position.y;
    const cbvx = matterCubeBody.velocity.x;
    const cbvy = matterCubeBody.velocity.y;
    
    // Shrink bounds organically alongside the cube visual & physics size
    const halfW = (cube.w || 46) / 2;
    const halfH = (cube.h || 46) / 2;
    const closestX = clamp(p.x, cbx - halfW, cbx + halfW);
    const closestY = clamp(p.y, cby - halfH, cby + halfH);
    const dx = p.x - closestX;
    const dy = p.y - closestY;
    const dist = Math.hypot(dx, dy) || 0.0001;
    if (dist < p.r + 2) {
      const overlap = p.r + 2 - dist;
      const nx = dx / dist;
      const ny = dy / dist;
      p.x += nx * overlap * 1.2;
      p.y += ny * overlap * 1.2;
      const relVx = p.vx - cbvx;
      const relVy = p.vy - cbvy;
      const relDot = relVx * nx + relVy * ny;
      if (relDot < 0) {
        p.vx -= relDot * nx * 1.2;
        p.vy -= relDot * ny * 1.2;
        // Apply force to Matter.js cube body
        MatterLib.Body.applyForce(matterCubeBody, matterCubeBody.position, {
          x: relDot * nx * 0.00008,
          y: relDot * ny * 0.00008,
        });
      }
      const cubeSpeed = Math.hypot(cbvx, cbvy);
      if (cubeSpeed > 1.5) {
        p.vx += nx * cubeSpeed * 0.4;
        p.vy += ny * cubeSpeed * 0.4;
      }
    }
  }

  function animate() {
    const metrics = getCupMetrics();
    const sceneW = scene.offsetWidth || scene.clientWidth;
    const sceneH = scene.offsetHeight || scene.clientHeight;

    // Dynamically fix physics bounds if the modal resizes!
    if (state.lastSceneW !== sceneW || state.lastSceneH !== sceneH) {
      state.lastSceneW = sceneW;
      state.lastSceneH = sceneH;
      if (matterEngine && matterSceneBodies.length === 4) {
         const wallT = 20;
         // sceneH - 3 ensures we are 3px above the extreme bottom boundary to avoid clipped borders and accounting for border-box
         MatterLib.Body.setPosition(matterSceneBodies[0], { x: sceneW / 2, y: sceneH - 3 + wallT / 2 });
         MatterLib.Body.setPosition(matterSceneBodies[1], { x: sceneW / 2, y: -wallT / 2 });
         MatterLib.Body.setPosition(matterSceneBodies[2], { x: -wallT / 2, y: sceneH / 2 });
         MatterLib.Body.setPosition(matterSceneBodies[3], { x: sceneW + wallT / 2, y: sceneH / 2 });
         if (matterCubeBody) MatterLib.Sleeping.set(matterCubeBody, false);
         rebuildBeakerBodies();
      }
    }

    const dxCup = state.x - state.prevX;
    const dyCup = state.y - state.prevY;
    const dRot = state.rot - state.prevRot;
    const gravity = 0.32;
    const maxSpeed = 10;
    const cupCenter = getCupCenterWorld();

    for (const p of state.particles) {
      if (p.mode === "inside") {
        const localPrev = worldToFluid(
          p.x,
          p.y,
          metrics,
          state.prevX,
          state.prevY,
          state.prevRot,
        );
        const wasInsideCup =
          localPrev.x > -p.r * 2 &&
          localPrev.x < metrics.width + p.r * 2 &&
          localPrev.y > -60 &&
          localPrev.y < metrics.height + 30;

        if (wasInsideCup) {
          const carried = fluidToWorld(
            localPrev.x,
            localPrev.y,
            metrics,
            state.x,
            state.y,
            state.rot,
          );
          const carryX = carried.x - p.x;
          const carryY = carried.y - p.y;
          // Smooth carry: move with the beaker but let residual become sloshing
          p.x += carryX * 0.9;
          p.y += carryY * 0.9;
          // Gentle inertia from dragging — clamped to prevent spikes
          const inertiaX = clamp(carryX * 0.12 - dxCup * 0.18, -5, 5);
          const inertiaY = clamp(carryY * 0.12 - dyCup * 0.18, -5, 5);
          p.vx += inertiaX;
          p.vy += inertiaY;

          // Rotation sloshing — also clamped
          const swirl = clamp(dRot * 0.008, -0.3, 0.3);
          const relX = p.x - cupCenter.x;
          const relY = p.y - cupCenter.y;
          p.vx += -relY * swirl;
          p.vy += relX * swirl;
        }
      }

      p.vy += gravity;

      // Reaction-based Jitter: adds tiny high-frequency noise when metal is reacting
      // Exponentially boost jitter for higher rates (like Fr) to feel more "violent"
      const reactionIntensity = (rxn.active && rxn.progress < 1) ? Math.pow(rxn.rate * 800, 1.2) : 0;
      if (reactionIntensity > 0.02) {
        const noise = (reactionIntensity * 1.4);
        p.vx += (Math.random() - 0.5) * noise;
        p.vy += (Math.random() - 0.5) * noise;
      }

      // Advanced Settling: reduce jitter when nearly resting to prevent "shaking" water
      const speedSq = p.vx * p.vx + p.vy * p.vy;
      const isResting = speedSq < 0.06 && Math.abs(dxCup) < 0.1 && Math.abs(dRot) < 0.1;
      
      if (isResting && reactionIntensity < 0.1) {
        p.vx *= 0.7; // Less aggressive damping than 0.55
        p.vy *= 0.7;
        if (speedSq < 0.001) { p.vx = 0; p.vy = 0; }
      } else {
        // Natural friction while moving or reacting - slightly more fluid (0.99 instead of 0.985)
        p.vx *= 0.99;
        p.vy *= 0.99;
      }

      // Velocity cap — prevents inconsistent high-speed launches
      const currentSpeed = Math.hypot(p.vx, p.vy);
      if (currentSpeed > maxSpeed) {
        const scale = maxSpeed / currentSpeed;
        p.vx *= scale;
        p.vy *= scale;
      }

      p.x += p.vx;
      p.y += p.vy;
      if (p.mode === "spill") {
        resolveSceneCollision(p, sceneW, sceneH);
      }
    }

    // --- Metal cube physics via Matter.js ---
    if (metalCube && matterEngine && matterCubeBody) {
      // Rebuild beaker collision bodies to follow the beaker's current position
      rebuildBeakerBodies();

      // Remember state BEFORE physics step
      const wasInside = cube.insideBeaker;

      // Handle dragging: use velocity toward target so collisions still work
      if (cube.dragging && cube.targetX !== undefined) {
        const dx = cube.targetX - matterCubeBody.position.x;
        const dy = cube.targetY - matterCubeBody.position.y;
        const stiffness = 0.35;
        let tvx = dx * stiffness;
        let tvy = dy * stiffness;
        // Strict cap: keep max drag velocity lower than the physical wall sizes (120px)
        const maxV = 20;
        const speed = Math.hypot(tvx, tvy);
        if (speed > maxV) {
            tvx = (tvx / speed) * maxV;
            tvy = (tvy / speed) * maxV;
        }
        MatterLib.Body.setVelocity(matterCubeBody, { x: tvx, y: tvy });
        MatterLib.Body.setAngularVelocity(matterCubeBody, matterCubeBody.angularVelocity * 0.5);
      }
      // Step the physics engine
      MatterLib.Engine.update(matterEngine, 1000 / 60);

      // Sync cube state from Matter.js body
      cube.x = matterCubeBody.position.x;
      cube.y = matterCubeBody.position.y;
      cube.vx = matterCubeBody.velocity.x;
      cube.vy = matterCubeBody.velocity.y;
      cube.angle = matterCubeBody.angle;

      // ===== CONTAINMENT ENFORCEMENT (rotation-aware) =====
      const hw = (cube.w || 46) / 2;
      const local = worldToFluid(cube.x, cube.y, metrics);
      const inH = local.x > hw && local.x < metrics.width - hw;

      // Calculate corner intersection logic
      const cr = metrics.cornerRadius || 27;
      let inCornerArc = false;
      if (local.x < cr && local.y > metrics.height - cr) {
         inCornerArc = Math.hypot(cr - local.x, local.y - (metrics.height - cr)) > cr - hw;
      } else if (local.x > metrics.width - cr && local.y > metrics.height - cr) {
         inCornerArc = Math.hypot(local.x - (metrics.width - cr), local.y - (metrics.height - cr)) > cr - hw;
      }

      const inV = local.y > -hw && local.y < metrics.height - hw && !inCornerArc;
      const isInside = inH && inV;
      const isInMouth = inH && local.y > -hw * 2 && local.y < hw * 3;

      if (!wasInside && isInside && !isInMouth) {
        // Illegally entered through wall — push back out
        let pushX = local.x < metrics.width / 2 ? -hw - 4 : metrics.width + hw + 4;
        const worldPos = fluidToWorld(pushX, local.y, metrics);
        cube.x = worldPos.x;
        cube.y = worldPos.y;
        MatterLib.Body.setPosition(matterCubeBody, { x: cube.x, y: cube.y });
        MatterLib.Body.setVelocity(matterCubeBody, { x: 0, y: cube.vy });
      } else if (wasInside && !isInside && !isInMouth) {
        // Illegally escaped through wall — push back in
        let clampedX = Math.max(hw, Math.min(metrics.width - hw, local.x));
        let clampedY = Math.min(metrics.height - hw, local.y);

        // Precise corner arc clamping
        if (clampedX < cr && clampedY > metrics.height - cr) {
           const dist = Math.hypot(cr - clampedX, clampedY - (metrics.height - cr));
           const maxD = cr - hw;
           if (dist > maxD && maxD >= 0) {
              clampedX = cr - maxD * ((cr - clampedX) / dist);
              clampedY = (metrics.height - cr) + maxD * ((clampedY - (metrics.height - cr)) / dist);
           }
        } else if (clampedX > metrics.width - cr && clampedY > metrics.height - cr) {
           const cxRight = metrics.width - cr;
           const dist = Math.hypot(clampedX - cxRight, clampedY - (metrics.height - cr));
           const maxD = cr - hw;
           if (dist > maxD && maxD >= 0) {
              clampedX = cxRight + maxD * ((clampedX - cxRight) / dist);
              clampedY = (metrics.height - cr) + maxD * ((clampedY - (metrics.height - cr)) / dist);
           }
        }

        const worldPos = fluidToWorld(clampedX, clampedY, metrics);
        cube.x = worldPos.x;
        cube.y = worldPos.y;
        MatterLib.Body.setPosition(matterCubeBody, { x: cube.x, y: cube.y });
        MatterLib.Body.setVelocity(matterCubeBody, { x: 0, y: 0 });
      }

      // Update inside/outside state — only transition through mouth
      if (wasInside) {
        if (local.y < -hw - 5) cube.insideBeaker = false;
      } else {
        if (isInMouth && local.y > 0 && local.y < hw * 3) cube.insideBeaker = true;
      }
    }

    for (let i = 0; i < 3; i += 1) {
      solveParticleCollisions();
      for (const p of state.particles) {
        if (p.mode === "inside") {
          resolveInsideCollision(p, metrics);
        } else {
          resolveSceneCollision(p, sceneW, sceneH);
          resolveBeakerExteriorCollision(p, metrics);
        }
        // Cube-particle collision for ALL particles
        const currentCubeEl = document.getElementById('virtual-lab-metal-cube');
        if (currentCubeEl && cube.w > 0) resolveCubeParticleCollision(p);
      }
    }

    // Hard clamp ALL particles to scene boundaries (prevent flying off-screen)
    for (const p of state.particles) {
      const r = p.r || 5;
      if (p.x < r) { p.x = r; p.vx = Math.abs(p.vx) * 0.3; }
      if (p.x > sceneW - r) { p.x = sceneW - r; p.vx = -Math.abs(p.vx) * 0.3; }
      if (p.y < r) { p.y = r; p.vy = Math.abs(p.vy) * 0.3; }
      if (p.y > sceneH - r) { p.y = sceneH - r; p.vy = -Math.abs(p.vy) * 0.3; }
    }

    // ===== Chemical Reaction tick =====
    tickReaction(metrics);

    // Render cube position
    const renderCubeEl = document.getElementById("virtual-lab-metal-cube");
    if (renderCubeEl) {
      renderCubeEl.style.transform = `translate3d(${(cube.x - cube.w / 2).toFixed(1)}px, ${(cube.y - cube.h / 2).toFixed(1)}px, 0) rotate(${cube.angle.toFixed(3)}rad)`;
    }



    state.particles.forEach((p) => {
      renderParticle(p, metrics);
    });

    state.prevX = state.x;
    state.prevY = state.y;
    state.prevRot = state.rot;
    updateView();
    state.animationFrame = window.requestAnimationFrame(animate);
  }

  const checkTopHalf = (clientX, clientY) => {
    const sceneRect = scene.getBoundingClientRect();
    const sceneX = clientX - sceneRect.left;
    const sceneY = clientY - sceneRect.top;
    return worldToLocal(sceneX, sceneY).y < 0; // negative local Y means upper half (mouth) regardless of rotation
  };

  beakerWrap.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    const isTopHalf = checkTopHalf(event.clientX, event.clientY);
    beginDrag(event.clientX, event.clientY, event.pointerId, isTopHalf ? "rotate" : "move");
    beakerWrap.style.cursor = isTopHalf ? "alias" : "grabbing";
    if (typeof beakerWrap.setPointerCapture === "function") {
      beakerWrap.setPointerCapture(event.pointerId);
    }
    event.preventDefault();
  }, { signal });

  window.addEventListener("pointermove", (event) => {
    if (state.dragging && state.pointerId === event.pointerId) {
      dragTo(event.clientX, event.clientY);
    }
  }, { signal });

  beakerWrap.addEventListener("pointermove", (event) => {
    if (!state.dragging) {
      const isTopHalf = checkTopHalf(event.clientX, event.clientY);
      beakerWrap.style.cursor = isTopHalf ? "alias" : "grab";
    }
  }, { signal });

  window.addEventListener("pointerup", (event) => {
    if (state.pointerId !== event.pointerId) return;
    if (typeof beakerWrap.hasPointerCapture === "function" && beakerWrap.hasPointerCapture(event.pointerId)) {
      beakerWrap.releasePointerCapture(event.pointerId);
    }
    endDrag();
  }, { signal });

  window.addEventListener("pointercancel", (event) => {
    if (state.pointerId !== event.pointerId) return;
    endDrag();
  }, { signal });

  beakerWrap.addEventListener("mousedown", (event) => {
    if (event.button !== 0) return;
    if (state.dragging) return;
    const isTopHalf = checkTopHalf(event.clientX, event.clientY);
    beginDrag(event.clientX, event.clientY, "mouse", isTopHalf ? "rotate" : "move");
    beakerWrap.style.cursor = isTopHalf ? "alias" : "grabbing";
    event.preventDefault();
  }, { signal });

  window.addEventListener("mousemove", (event) => {
    if (state.pointerId === "mouse" && state.dragging) {
      dragTo(event.clientX, event.clientY);
    }
  }, { signal });

  window.addEventListener("mouseup", () => {
    if (state.pointerId !== "mouse") return;
    endDrag();
  }, { signal });

  // The rotate handle logic has been removed.

  addWaterBtn.addEventListener("click", () => {
    addWaterBurst();
  }, { signal });

  clearWaterBtn.addEventListener("click", () => {
    // Full page reset
    state.particles.forEach((particle) => particle.el.remove());
    state.particles = [];
    fluidLayer.innerHTML = "";
    spillLayer.innerHTML = "";
    // Reset beaker position
    state.x = 0;
    state.y = 0;
    state.rot = 0;
    state.prevX = 0;
    state.prevY = 0;
    state.prevRot = 0;
    updateView();
    resetReaction();
  }, { signal });

  window.addEventListener("resize", handleResize, { signal });

  // --- Metal cube drag handlers ---
  function setupCubeDragEvents(cubeElement) {
    if (!cubeElement) return;
    cubeElement.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      if (rxn.progress >= 1) return; // cube dissolved, no drag
      e.preventDefault();
      e.stopPropagation();
      cube.dragging = true;
      cube.pointerId = e.pointerId;
      cube.totalDrag = 0;
      closePicker();

      // Hide and remove stand when clicked
      const standEl = document.getElementById('virtual-lab-wooden-stand');
      if (standEl) standEl.style.opacity = '0';
      if (matterStandBody && matterEngine && MatterLib) {
          MatterLib.Composite.remove(matterEngine.world, matterStandBody);
          matterStandBody = null;
      }

      const sceneRect = scene.getBoundingClientRect();
      cube.dragOffsetX = e.clientX - sceneRect.left - cube.x;
      cube.dragOffsetY = e.clientY - sceneRect.top - cube.y;
      cube.targetX = cube.x;
      cube.targetY = cube.y;
      if (typeof cubeElement.setPointerCapture === "function") {
        cubeElement.setPointerCapture(e.pointerId);
      }
    });
  }

  if (metalCube) {
    setupCubeDragEvents(metalCube);

    window.addEventListener("pointermove", (e) => {
      if (!cube.dragging || cube.pointerId !== e.pointerId) return;
      const sceneRect = scene.getBoundingClientRect();
      const sw = scene.offsetWidth || 800;
      const sh = scene.offsetHeight || 540;
      // Only store target — animate() will move the cube in sub-steps
      const tx = e.clientX - sceneRect.left - cube.dragOffsetX;
      const ty = e.clientY - sceneRect.top - cube.dragOffsetY;
      // Clamp target to scene boundaries to prevent flying off
      cube.targetX = Math.max(parseFloat(cube.w)/2 + 2, Math.min(sw - parseFloat(cube.w)/2 - 2, tx));
      cube.targetY = Math.max(parseFloat(cube.h)/2 + 2, Math.min(sh - parseFloat(cube.h)/2 - 2, ty));
      cube.totalDrag += Math.abs(e.movementX || 0) + Math.abs(e.movementY || 0);
    }, { signal });

    const endCubeDrag = (e) => {
      cube.dragging = false;
      cube.pointerId = null;
      cube.totalDrag = 0;
    };
    window.addEventListener("pointerup", endCubeDrag, { signal });
    window.addEventListener("pointercancel", endCubeDrag, { signal });

    // Close picker when clicking outside
    document.addEventListener("pointerdown", (e) => {
      const cubeEl = document.getElementById('virtual-lab-metal-cube');
      if (elementPicker && elementPicker.classList.contains('open') &&
          !elementPicker.contains(e.target) && (!cubeEl || !cubeEl.contains(e.target))) {
        closePicker();
      }
    }, { signal });

    // Initialize cube position and appearance
    const initCube = () => {
      const sw = scene.offsetWidth || scene.clientWidth || 800;
      const sh = scene.offsetHeight || scene.clientHeight || 540;
      const standW = 66;
      const standTotalH = 30; // 14 board + 16 legs

      const standEl = document.getElementById('virtual-lab-wooden-stand');
      if (standEl) {
          standEl.style.transform = `translate3d(${(sw * 0.82 - standW / 2).toFixed(1)}px, ${(sh - standTotalH).toFixed(1)}px, 0)`;
      }

      cube.x = sw * 0.82;
      cube.y = sh - standTotalH - cube.h / 2;
    };    initCube();
    updateCubeAppearance();

    // Initialize Matter.js physics engine
    initMatterPhysics();
    updateCubeAppearance();
    updateThermometer();
  }

  handleResize();
  state.animationFrame = window.requestAnimationFrame(animate);

  virtualLabCleanup = () => {
    controller.abort();
    if (state.animationFrame) {
      window.cancelAnimationFrame(state.animationFrame);
    }
    // Clean up Matter.js
    if (matterEngine && MatterLib) {
      MatterLib.Engine.clear(matterEngine);
      matterEngine = null;
      matterCubeBody = null;
      matterBeakerBodies = [];
    }
    const styleEl = document.getElementById("vlab-debug-style");
    if (styleEl) styleEl.remove();
    beakerWrap.classList.remove("dragging");
    // Clean up reaction bubbles
    rxn.bubbles.forEach(b => b.el.remove());
    rxn.bubbles = [];
    fluidLayer.innerHTML = "";
    spillLayer.innerHTML = "";
  };
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
