// =============================================================================
// Chemistry Tools - Pure Logic Module
// Extracted from script.js: algorithms, parsers, calculators (zero DOM access)
// =============================================================================

import { t } from "./langController.js";
import { balanceEquation, demoChemistryValidator } from "./equationBalancer.js";

export function ct(key, fallback, values = {}) {
  let text = t(key);
  if (text === key) text = fallback;
  Object.entries(values).forEach(([k, v]) => {
    text = text.replace(`{${k}}`, String(v));
  });
  return text;
}

// ===== Atomic Masses (common elements for Grade 9-11) =====
export const atomicMasses = {
  // Period 1
  H: 1.008,
  He: 4.003,
  // Period 2
  Li: 6.941,
  Be: 9.012,
  B: 10.81,
  C: 12.01,
  N: 14.01,
  O: 16.0,
  F: 19.0,
  Ne: 20.18,
  // Period 3
  Na: 22.99,
  Mg: 24.31,
  Al: 26.98,
  Si: 28.09,
  P: 30.97,
  S: 32.07,
  Cl: 35.45,
  Ar: 39.95,
  // Period 4
  K: 39.1,
  Ca: 40.08,
  Sc: 44.96,
  Ti: 47.87,
  V: 50.94,
  Cr: 52.0,
  Mn: 54.94,
  Fe: 55.85,
  Co: 58.93,
  Ni: 58.69,
  Cu: 63.55,
  Zn: 65.38,
  Ga: 69.72,
  Ge: 72.63,
  As: 74.92,
  Se: 78.97,
  Br: 79.9,
  Kr: 83.8,
  // Period 5
  Rb: 85.47,
  Sr: 87.62,
  Y: 88.91,
  Zr: 91.22,
  Nb: 92.91,
  Mo: 95.95,
  Tc: 98.0,
  Ru: 101.1,
  Rh: 102.9,
  Pd: 106.4,
  Ag: 107.9,
  Cd: 112.4,
  In: 114.8,
  Sn: 118.7,
  Sb: 121.8,
  Te: 127.6,
  I: 126.9,
  Xe: 131.3,
  // Period 6
  Cs: 132.9,
  Ba: 137.3,
  La: 138.9,
  Ce: 140.1,
  Pr: 140.9,
  Nd: 144.2,
  Pm: 145.0,
  Sm: 150.4,
  Eu: 152.0,
  Gd: 157.3,
  Tb: 158.9,
  Dy: 162.5,
  Ho: 164.9,
  Er: 167.3,
  Tm: 168.9,
  Yb: 173.0,
  Lu: 175.0,
  Hf: 178.5,
  Ta: 180.9,
  W: 183.8,
  Re: 186.2,
  Os: 190.2,
  Ir: 192.2,
  Pt: 195.1,
  Au: 197.0,
  Hg: 200.6,
  Tl: 204.4,
  Pb: 207.2,
  Bi: 209.0,
  Po: 209.0,
  At: 210.0,
  Rn: 222.0,
  // Period 7
  Fr: 223.0,
  Ra: 226.0,
  Ac: 227.0,
  Th: 232.0,
  Pa: 231.0,
  U: 238.0,
  Np: 237.0,
  Pu: 244.0,
  Am: 243.0,
  Cm: 247.0,
  Bk: 247.0,
  Cf: 251.0,
  Es: 252.0,
  Fm: 257.0,
  Md: 258.0,
  No: 259.0,
  Lr: 262.0,
  Rf: 267.0,
  Db: 270.0,
  Sg: 271.0,
  Bh: 270.0,
  Hs: 277.0,
  Mt: 276.0,
  Ds: 281.0,
  Rg: 282.0,
  Cn: 285.0,
  Nh: 286.0,
  Fl: 289.0,
  Mc: 290.0,
  Lv: 293.0,
  Ts: 294.0,
  Og: 294.0,
};

// ===== Parse chemical formula (Strict Rules) =====
export function parseFormulaStrict(formula) {
  if (!formula) return {};

  // Strip trailing state symbols: (s), (l), (g), (aq)
  formula = String(formula).replace(/\s*\((aq|s|l|g)\)\s*$/i, "").trim();

  // Normalize Subscripts
  const subMap = {
    "₀": "0",
    "₁": "1",
    "₂": "2",
    "₃": "3",
    "₄": "4",
    "₅": "5",
    "₆": "6",
    "₇": "7",
    "₈": "8",
    "₉": "9",
  };
  formula = formula.replace(/[₀-₉]/g, (c) => subMap[c]);

  // Normalize Dots to •
  formula = formula.replace(/[.*·]/g, "•");

  // Handle Hydrates (Recursive)
  if (formula.includes("•")) {
    const parts = formula.split("•");
    const finalCounts = {};
    parts.forEach((part) => {
      const partCounts = parseFormulaStrict(part.trim());
      for (const [el, num] of Object.entries(partCounts)) {
        finalCounts[el] = (finalCounts[el] || 0) + num;
      }
    });
    return finalCounts;
  }

  formula = formula.trim();
  if (!formula) return {};

  // 1. Extract Global Coefficient
  let globalMultiplier = 1;
  const coeffMatch = formula.match(/^(\d+)/);
  if (coeffMatch) {
    globalMultiplier = parseInt(coeffMatch[1]);
    formula = formula.substring(coeffMatch[1].length);
  }

  const stack = [{}]; // Root layer
  let i = 0;
  const len = formula.length;

  while (i < len) {
    const char = formula[i];

    if (char === "(" || char === "[" || char === "{") {
      stack.push({});
      i++;
    } else if (char === ")" || char === "]" || char === "}") {
      if (stack.length < 2) throw new Error(ct("chemTools.unmatchedParentheses", "Unmatched parentheses"));
      i++;

      // Subscript after parenthesis
      let count = 1;
      const numMatch = formula.slice(i).match(/^(\d+)/);
      if (numMatch) {
        count = parseInt(numMatch[1]);
        i += numMatch[1].length;
      }

      const popped = stack.pop();
      const current = stack[stack.length - 1];

      // Merge popped * count into current
      for (const [el, num] of Object.entries(popped)) {
        current[el] = (current[el] || 0) + num * count;
      }
    } else if (/[A-Z]/.test(char)) {
      // Read Element
      let element = char;
      i++;
      if (i < len && /[a-z]/.test(formula[i])) {
        element += formula[i];
        i++;
      }

      // Read Subscript
      let count = 1;
      const numMatch = formula.slice(i).match(/^(\d+)/);
      if (numMatch) {
        count = parseInt(numMatch[1]);
        i += numMatch[1].length;
      }

      const current = stack[stack.length - 1];
      current[element] = (current[element] || 0) + count;
    } else {
      // Ignore whitespace, reject others
      if (/\s/.test(char)) {
        i++;
      } else {
        throw new Error(ct("chemTools.invalidCharacter", "Invalid character: {char}", { char }));
      }
    }
  }

  if (stack.length > 1) throw new Error(ct("chemTools.unclosedParentheses", "Unclosed parentheses"));

  const result = stack[0];

  // Apply Global Coefficient
  if (globalMultiplier !== 1) {
    for (const k in result) result[k] *= globalMultiplier;
  }
  return result;
}

// =============================================================================
// GAUSSIAN ELIMINATION EQUATION BALANCER
// Implements matrix-based chemical equation balancing using RREF
// =============================================================================

/**
 * Parse a chemical formula into element counts
 * Handles parentheses, nested groups, and coefficients
 * Examples: "H2O" -> {H:2, O:1}, "Ca(OH)2" -> {Ca:1, O:2, H:2}, "Al2(SO4)3" -> {Al:2, S:3, O:12}
 */
function parseChemicalFormula(formula) {
  const normalizedFormula = normalizeBalancingFormula(formula);
  return parseFormulaStrict(normalizedFormula);
}

function normalizeBalancingFormula(formula) {
  if (!formula) return "";
  const subscriptMap = {
    "₀": "0",
    "₁": "1",
    "₂": "2",
    "₃": "3",
    "₄": "4",
    "₅": "5",
    "₆": "6",
    "₇": "7",
    "₈": "8",
    "₉": "9",
  };

  return String(formula)
    .replace(/[₀-₉]/g, (char) => subscriptMap[char] || char)
    .replace(/[·.]/g, "•")
    .trim();
}

function normalizeBalancingEquation(equation) {
  return normalizeBalancingFormula(equation)
    .replace(/\s*(?:->|=>|=|⇌|⟶|⟹)\s*/g, " → ")
    .replace(/\s*→\s*/g, " → ");
}

function splitBalancingCompounds(segment) {
  return String(segment || "")
    .split(/[\s+]+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function sanitizeBalancingCompounds(tokens) {
  // Normalize unicode but do NOT strip leading coefficients.
  // The new engine's ensureNoLeadingCoefficient will catch & warn about them.
  return tokens
    .map((token) => normalizeBalancingFormula(token).trim())
    .filter(Boolean);
}

function isRecoverableMergedFormula(left, right) {
  const compact = `${left}${right}`;
  try {
    parseFormulaStrict(compact);
    return true;
  } catch {
    return false;
  }
}

function findRecoverableSpacingHint(rawReactants, rawProducts) {
  const scanSide = (tokens, side) => {
    if (tokens.length < 2) return null;

    for (let i = 0; i < tokens.length - 1; i++) {
      const left = tokens[i];
      const right = tokens[i + 1];

      // Only hint when the space is likely inside one formula, not between compounds.
      if (!/^\d/.test(right) && !/\d$/.test(left)) continue;
      if (!isRecoverableMergedFormula(left, right)) continue;

      const mergedTokens = [...tokens];
      const compact = `${left}${right}`;
      mergedTokens.splice(i, 2, compact);

      const testReactants = sanitizeBalancingCompounds(
        side === "reactants" ? mergedTokens : rawReactants,
      );
      const testProducts = sanitizeBalancingCompounds(
        side === "products" ? mergedTokens : rawProducts,
      );

      if (balanceEquationGaussian(testReactants, testProducts)) {
        return {
          side,
          spaced: `${left} ${right}`,
          compact,
        };
      }
    }

    return null;
  };

  return (
    scanSide(rawReactants, "reactants") ||
    scanSide(rawProducts, "products")
  );
}

/**
 * Calculate GCD of two numbers
 */
function gcd(a, b) {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

/**
 * Calculate LCM of two numbers
 */
function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

/**
 * Calculate LCM of an array of numbers
 */
function lcmArray(arr) {
  return arr.reduce((a, b) => lcm(a, b), 1);
}

/**
 * Calculate GCD of an array of numbers
 */
function gcdArray(arr) {
  return arr.reduce((a, b) => gcd(a, b));
}

/**
 * Gaussian Elimination to solve the system (find null space)
 * Returns coefficients for balancing, or null if no solution
 */
function gaussianElimination(matrix, numCompounds) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  // Create a copy of the matrix with floating point
  const m = matrix.map((row) => row.map((v) => v));

  let pivotRow = 0;
  const pivotCols = [];

  // Forward elimination
  for (let col = 0; col < cols && pivotRow < rows; col++) {
    // Find the maximum element in this column for numerical stability
    let maxRow = pivotRow;
    let maxVal = Math.abs(m[pivotRow][col]);
    for (let row = pivotRow + 1; row < rows; row++) {
      if (Math.abs(m[row][col]) > maxVal) {
        maxVal = Math.abs(m[row][col]);
        maxRow = row;
      }
    }

    if (maxVal < 1e-10) continue; // Skip this column (no pivot)

    // Swap rows
    [m[pivotRow], m[maxRow]] = [m[maxRow], m[pivotRow]];

    pivotCols.push(col);

    // Scale pivot row
    const pivot = m[pivotRow][col];
    for (let j = 0; j < cols; j++) {
      m[pivotRow][j] /= pivot;
    }

    // Eliminate other rows
    for (let row = 0; row < rows; row++) {
      if (row !== pivotRow && Math.abs(m[row][col]) > 1e-10) {
        const factor = m[row][col];
        for (let j = 0; j < cols; j++) {
          m[row][j] -= factor * m[pivotRow][j];
        }
      }
    }

    pivotRow++;
  }

  // Find free variables (columns without pivots)
  const freeVars = [];
  for (let col = 0; col < cols; col++) {
    if (!pivotCols.includes(col)) {
      freeVars.push(col);
    }
  }

  if (freeVars.length === 0) {
    return null; // No solution (system is overdetermined)
  }

  // Use the last free variable as the parameter (set to 1)
  const freeVar = freeVars[freeVars.length - 1];
  const solution = new Array(cols).fill(0);
  solution[freeVar] = 1;

  // Back substitute to find other values
  for (let i = pivotCols.length - 1; i >= 0; i--) {
    const pivotCol = pivotCols[i];
    let sum = 0;
    for (let j = pivotCol + 1; j < cols; j++) {
      sum += m[i][j] * solution[j];
    }
    solution[pivotCol] = -sum;
  }

  return solution;
}

/**
 * Convert floating point solution to minimal integer coefficients
 */
function toIntegerCoefficients(solution) {
  // Filter out very small values (numerical errors)
  const cleaned = solution.map((v) => (Math.abs(v) < 1e-10 ? 0 : v));

  // Find denominators (convert to fractions)
  const denominators = [];
  for (const val of cleaned) {
    if (val !== 0) {
      // Find denominator by checking common fractions
      for (let d = 1; d <= 1000; d++) {
        if (Math.abs(val * d - Math.round(val * d)) < 1e-9) {
          denominators.push(d);
          break;
        }
      }
    }
  }

  if (denominators.length === 0) return null;

  // Multiply by LCM of denominators
  const multiplier = lcmArray(denominators);
  let intSolution = cleaned.map((v) => Math.round(v * multiplier));

  // Make all positive (if all negative, flip signs)
  const allNegative = intSolution.every((v) => v <= 0);
  const allPositive = intSolution.every((v) => v >= 0);

  if (allNegative) {
    intSolution = intSolution.map((v) => -v);
  } else if (!allPositive) {
    // Mixed signs - try to make positive
    intSolution = intSolution.map((v) => Math.abs(v));
  }

  // Reduce by GCD
  const nonZero = intSolution.filter((v) => v !== 0);
  if (nonZero.length === 0) return null;

  const g = gcdArray(nonZero);
  intSolution = intSolution.map((v) => v / g);

  // Validate: all should be positive integers
  if (intSolution.some((v) => v <= 0)) {
    return null;
  }

  return intSolution;
}

/**
 * Main equation balancing function using Gaussian Elimination
 */
function balanceEquationGaussian(reactants, products) {
  // Parse all compounds
  const allCompounds = [...reactants, ...products];
  const numReactants = reactants.length;
  const numProducts = products.length;
  const numCompounds = allCompounds.length;

  // Parse each compound to get atom counts
  const compoundAtoms = allCompounds.map((c) => parseChemicalFormula(c));

  // Get all unique elements
  const elements = new Set();
  compoundAtoms.forEach((atoms) => {
    Object.keys(atoms).forEach((el) => elements.add(el));
  });
  const elementList = Array.from(elements);

  // Build the matrix
  // Rows = elements, Columns = compounds
  // Reactants get positive coefficients, products get negative
  const matrix = [];
  for (const element of elementList) {
    const row = [];
    for (let i = 0; i < numCompounds; i++) {
      const count = compoundAtoms[i][element] || 0;
      // Products have negative sign (moving to right side of equation)
      row.push(i < numReactants ? count : -count);
    }
    matrix.push(row);
  }

  // Solve using Gaussian elimination
  const solution = gaussianElimination(matrix, numCompounds);

  if (!solution) return null;

  // Convert to integer coefficients
  const coefficients = toIntegerCoefficients(solution);

  if (!coefficients) return null;

  // Verify the solution
  for (const element of elementList) {
    let leftSum = 0,
      rightSum = 0;
    for (let i = 0; i < numReactants; i++) {
      leftSum += (compoundAtoms[i][element] || 0) * coefficients[i];
    }
    for (let i = numReactants; i < numCompounds; i++) {
      rightSum += (compoundAtoms[i][element] || 0) * coefficients[i];
    }
    if (Math.abs(leftSum - rightSum) > 0.001) {
      return null; // Verification failed
    }
  }

  return {
    reactants: coefficients.slice(0, numReactants),
    products: coefficients.slice(numReactants),
  };
}

export function balanceEquationModal(equation) {
  const normalizedEquation = normalizeBalancingEquation(equation);
  const parts = normalizedEquation.split("→").map((s) => s.trim());
  if (parts.length !== 2) {
    throw new Error(ct("chemTools.equationMustContainArrow", "Equation must contain → (arrow)"));
  }

  const rawReactants = splitBalancingCompounds(parts[0]);
  const rawProducts = splitBalancingCompounds(parts[1]);

  // Declare result state up front so there is no temporal dead zone
  let result = null;
  let message = "";
  let check = "";

  // ===== Pre-flight: Detect zero-for-O typos =====
  // Runs on raw tokens before any normalization.
  for (const token of [...rawReactants, ...rawProducts]) {
    const tk = token.trim();
    if (!tk) continue;

    // Case 1: all-digit token like "02" → probably "O2"
    if (/^\d+$/.test(tk)) {
      if (/^0/.test(tk)) {
        const suggestion = tk.replace(/^0/, "O");
        throw new Error(
          ct("chemTools.zeroAsFormula",
            `"${tk}" is not a valid formula — did you type 0 (zero) instead of O (oxygen)? Try "${suggestion}".`,
            { formula: tk, suggestion }),
        );
      } else {
        throw new Error(
          ct("chemTools.bareCoefficient",
            `"${tk}" is not a valid compound formula. Write formulas starting with an element symbol, e.g. "H2O".`,
            { formula: tk }),
        );
      }
    }

    // Case 2: Zero embedded where O (oxygen) was likely intended.
    // Only triggers for tokens like "Fe204", "H20", "C02" where the entire
    // token after the element symbol is digits (no second element letter).
    // Does NOT trigger on "H100O" which has an uppercase O — those go through
    // the suspicious-formula validator instead.
    const elemAndDigits = tk.match(/^([A-Z][a-z]?)(\d+)$/);
    if (elemAndDigits) {
      const [, elem, digits] = elemAndDigits;
      if (digits.includes("0")) {
        const suggestion = elem + digits.replace(/0/g, "O");
        throw new Error(
          ct("chemTools.zeroInSubscript",
            `Did you type 0 (zero) instead of O (oxygen) in "${tk}"? Did you mean "${suggestion}"?`,
            { formula: tk, suggestion }),
        );
      }
    }
  }

  const reactants = sanitizeBalancingCompounds(rawReactants);
  const products = sanitizeBalancingCompounds(rawProducts);

  if (reactants.length === 0 || products.length === 0) {
    throw new Error(ct("chemTools.missingReactantsOrProducts", "Missing reactants or products"));
  }

  // ===== NO legacy pre-flight element-consistency check here =====
  // The new robust engine handles all validation:
  // - unknown elements → FormulaError(INVALID_FORMULA)
  // - state symbols (aq),(s),(l),(g) → stripped automatically
  // - charge notation (+/-) → FormulaError(IONIC_NOT_SUPPORTED)
  // - leading coefficients → FormulaError(INVALID_FORMULA)
  // - suspicious subscripts → FormulaError(SUSPICIOUS_FORMULA)
  // - no balancing solution → EquationError(NO_SOLUTION)

  // Build explanation steps
  const steps = [];
  steps.push(`<h4>${ct("chemTools.stepByStepTitle", "Step-by-step balancing:")}</h4>`);
  steps.push("<ol>");
  steps.push(
    `<li><strong>${ct("chemTools.stepIdentify", "Identify elements:")}</strong> ${ct("chemTools.stepIdentifyDesc", "List all elements on both sides")}</li>`,
  );
  steps.push(
    `<li><strong>${ct("chemTools.stepCount", "Count atoms:")}</strong> ${ct("chemTools.stepCountDesc", "Count atoms of each element")}</li>`,
  );
  steps.push(
    `<li><strong>${ct("chemTools.stepBuild", "Build matrix:")}</strong> ${ct("chemTools.stepBuildDesc", "Create element × compound matrix")}</li>`,
  );
  steps.push(
    `<li><strong>${ct("chemTools.stepGaussian", "Gaussian elimination:")}</strong> ${ct("chemTools.stepGaussianDesc", "Solve the linear system")}</li>`,
  );
  steps.push(
    `<li><strong>${ct("chemTools.stepNormalize", "Normalize:")}</strong> ${ct("chemTools.stepNormalizeDesc", "Convert to smallest integer coefficients")}</li>`,
  );
  steps.push("</ol>");
  steps.push(
    `<div class="warning-box"><strong>${ct("chemTools.important", "Important:")}</strong> ${ct("chemTools.importantDesc", "Never change subscripts, only coefficients!")}</div>`,
  );

  // ===== Balance using the NEW robust engine (single source of truth) =====
  try {
    const bal = balanceEquation({ reactants, products }, { chemistryValidator: demoChemistryValidator });

    // Convert to format expected by the UI builder
    result = {
      reactants: bal.reactants.map(r => r.coefficient),
      products: bal.products.map(p => p.coefficient)
    };
  } catch (err) {
    console.warn("Balancer error:", err.name, err.code, err.message);

    // Map error codes to user-friendly messages
    if (err.code === "INVALID_FORMULA") {
      message = ct("balancer.invalidFormulaEx", `Invalid chemical formula: ${err.message}`, { msg: err.message });
    } else if (err.code === "IONIC_NOT_SUPPORTED") {
      message = ct("balancer.invalidFormulaEx", `Charged species / ionic notation is not supported.`, { msg: err.message });
    } else if (err.code === "SUSPICIOUS_FORMULA") {
      message = ct("balancer.suspiciousFormula", "This formula looks unusual. Please check the subscripts.");
    } else if (err.code === "NO_SOLUTION") {
      // Determine if elements match on both sides for a better message
      try {
        const getEls = (compounds) => {
          const elSet = new Set();
          compounds.forEach((c) => {
            // Use the NEW engine's parser which already handles states/hydrates
            const normalized = normalizeBalancingFormula(c);
            const atoms = parseFormulaStrict(normalized);
            Object.keys(atoms).forEach((el) => elSet.add(el));
          });
          return elSet;
        };
        const rEls = getEls(reactants);
        const pEls = getEls(products);
        const sameElements = rEls.size === pEls.size && [...rEls].every(el => pEls.has(el));

        if (sameElements) {
          message = ct("balancer.noSolutionConserve", "The formulas are valid, but these compounds alone do not conserve atoms. Try adding a missing reactant or product.");
        } else {
          message = ct("balancer.noSolutionGeneral", "This equation cannot be balanced as entered. You may be missing a reactant or product.");
        }
      } catch (_) {
        // If even the element-check parse fails, use generic message
        message = ct("balancer.noSolutionGeneral", "This equation cannot be balanced as entered. You may be missing a reactant or product.");
      }
    } else {
      // Unknown error from new engine — try legacy fallback
      try {
        result = balanceEquationGaussian(reactants, products);
      } catch (_) {
        // Both engines failed
        message = ct("chemTools.couldNotAutoBalanceLong", "Could not auto-balance this equation. Check that each chemical formula is complete and that spaces only separate different compounds.");
      }
    }
  }

  let balancedEq = normalizedEquation;

  if (result) {
    // Build balanced equation string
    const balancedReactants = reactants
      .map((r, i) => {
        const coef = result.reactants[i];
        return coef === 1 ? r : coef + r;
      })
      .join(" + ");

    const balancedProducts = products
      .map((p, i) => {
        const coef = result.products[i];
        return coef === 1 ? p : coef + p;
      })
      .join(" + ");

    balancedEq = balancedReactants + " → " + balancedProducts;
    check = generateAtomCheckModal(balancedEq);
  } else {
    // No result — try spacing hint only if we don't already have a specific message
    if (!message) {
      const spacingHint = findRecoverableSpacingHint(rawReactants, rawProducts);
      message = spacingHint
        ? ct("chemTools.spacingInline", "It looks like {spaced} was split by a space. Write {compact} instead. Use spaces or + only between different compounds.", { spaced: spacingHint.spaced, compact: spacingHint.compact })
        : ct("chemTools.couldNotAutoBalanceLong", "Could not auto-balance this equation. Check that each chemical formula is complete and that spaces only separate different compounds.");
      const hintHtml = spacingHint
        ? `<p class="note-text"><strong>${ct("chemTools.spacingIssue", "Spacing issue:")}</strong> <code>${spacingHint.spaced}</code> ${ct("chemTools.spacingReadAs", "is being read as separate pieces.")}</p><p class="note-text">${ct("chemTools.spacingWrite", "Write")} <strong>${spacingHint.compact}</strong> ${ct("chemTools.spacingUseBetween", "instead, and use spaces or")} <strong>+</strong> ${ct("chemTools.spacingUseBetweenTail", "only between different compounds.")}</p>`
        : "";
      check = `<p class="note-text">${message}</p>${hintHtml}`;
    } else {
      // We have a specific error message from the engine — show it directly
      check = `<p class="note-text">${message}</p>`;
    }
  }

  // Create a plain text version for updating inputs (without Unicode subscripts)
  const balancedPlain = balancedEq
    .replace(/₂/g, "2")
    .replace(/₃/g, "3")
    .replace(/₄/g, "4")
    .replace(/₅/g, "5")
    .replace(/₆/g, "6");

  return {
    equation: balancedEq,
    balanced: balancedPlain,
    explanation: steps.join(""),
    check: check,
    solved: !!result,
    message,
  };
}

export function generateAtomCheckModal(equation) {
  // Normalize subscripts for counting
  const normalized = equation
    .replace(/₂/g, "2")
    .replace(/₃/g, "3")
    .replace(/₄/g, "4")
    .replace(/₅/g, "5")
    .replace(/₆/g, "6");

  const parts = normalized.split("→");
  const left = parts[0].trim();
  const right = parts[1].trim();

  const leftAtoms = countAtomsModal(left);
  const rightAtoms = countAtomsModal(right);

  let html = "<h4>Atom Count Check:</h4>";
  html += '<table class="check-table">';
  html +=
    "<tr><th>Element</th><th>Left Side</th><th>Right Side</th><th>Match</th></tr>";

  const allElements = new Set([
    ...Object.keys(leftAtoms),
    ...Object.keys(rightAtoms),
  ]);
  let allMatch = true;

  allElements.forEach((element) => {
    const leftCount = leftAtoms[element] || 0;
    const rightCount = rightAtoms[element] || 0;
    const match = leftCount === rightCount;
    if (!match) allMatch = false;
    const matchIcon = match ? "✓" : "✗";
    const matchClass = match ? "match-yes" : "match-no";
    html += `<tr><td>${element}</td><td>${leftCount}</td><td>${rightCount}</td><td class="${matchClass}">${matchIcon}</td></tr>`;
  });

  html += "</table>";
  html += `<div class="balance-status ${allMatch ? "balanced" : "unbalanced"}">
        <strong>Conservation of matter:</strong> ${allMatch ? "✓ Balanced!" : "✗ Not balanced"}
    </div>`;

  return html;
}

export function countAtomsModal(side) {
  const atoms = {};
  const compounds = side.split("+").map((s) => s.trim());

  compounds.forEach((compound) => {
    const match = compound.match(/^(\d*)(.+)$/);
    const coefficient = match[1] ? parseInt(match[1]) : 1;
    const formula = match[2];
    const elements = parseFormulaStrict(formula);

    Object.keys(elements).forEach((element) => {
      atoms[element] = (atoms[element] || 0) + elements[element] * coefficient;
    });
  });

  return atoms;
}

// ===== Molar Mass Calculator (Modal version) =====
export function calculateMolarMassModal(formula, exact) {
  const elements = parseFormulaStrict(formula);
  let total = 0;
  const breakdown = [];

  Object.keys(elements).forEach((element) => {
    const count = elements[element];
    const atomicMass = atomicMasses[element];

    if (!atomicMass) {
      throw new Error(`Unknown element: ${element}`);
    }

    const subtotal = atomicMass * count;
    total += subtotal;

    breakdown.push({
      element,
      atomicMass: exact ? atomicMass.toFixed(3) : Math.round(atomicMass),
      count,
      subtotal: exact ? subtotal.toFixed(3) : Math.round(subtotal),
    });
  });

  return {
    total: exact ? total.toFixed(3) : Math.round(total),
    breakdown,
    exact,
  };
}

// ===== Empirical Tool: Preset Compounds =====
export const EMPIRICAL_PRESETS = [
  // 2个元素
  {
    name: "Methane (甲烷)",
    elements: [
      { s: "C", v: 75.0 },
      { s: "H", v: 25.0 },
    ],
    molMass: 16,
  },
  {
    name: "Water (水)",
    elements: [
      { s: "H", v: 11.2 },
      { s: "O", v: 88.8 },
    ],
    molMass: 18,
  },
  {
    name: "Ammonia (氨)",
    elements: [
      { s: "N", v: 82.4 },
      { s: "H", v: 17.6 },
    ],
    molMass: 17,
  },
  {
    name: "Benzene (苯)",
    elements: [
      { s: "C", v: 92.3 },
      { s: "H", v: 7.7 },
    ],
    molMass: 78,
  },
  {
    name: "Carbon Dioxide (二氧化碳)",
    elements: [
      { s: "C", v: 27.3 },
      { s: "O", v: 72.7 },
    ],
    molMass: 44,
  },
  // 3个元素
  {
    name: "Glucose (葡萄糖)",
    elements: [
      { s: "C", v: 40.0 },
      { s: "H", v: 6.7 },
      { s: "O", v: 53.3 },
    ],
    molMass: 180,
  },
  {
    name: "Aspirin (阿司匹林)",
    elements: [
      { s: "C", v: 60.0 },
      { s: "H", v: 4.5 },
      { s: "O", v: 35.5 },
    ],
    molMass: 180,
  },
  {
    name: "Ethanol (乙醇)",
    elements: [
      { s: "C", v: 52.2 },
      { s: "H", v: 13.0 },
      { s: "O", v: 34.8 },
    ],
    molMass: 46,
  },
  {
    name: "Acetic Acid (乙酸)",
    elements: [
      { s: "C", v: 40.0 },
      { s: "H", v: 6.7 },
      { s: "O", v: 53.3 },
    ],
    molMass: 60,
  },
  {
    name: "Vitamin C (维生素C)",
    elements: [
      { s: "C", v: 40.9 },
      { s: "H", v: 4.6 },
      { s: "O", v: 54.5 },
    ],
    molMass: 176,
  },
  // 4个元素
  {
    name: "Caffeine (咖啡因)",
    elements: [
      { s: "C", v: 49.5 },
      { s: "H", v: 5.2 },
      { s: "N", v: 28.9 },
      { s: "O", v: 16.5 },
    ],
    molMass: 194,
  },
  {
    name: "Urea (尿素)",
    elements: [
      { s: "C", v: 20.0 },
      { s: "H", v: 6.7 },
      { s: "N", v: 46.7 },
      { s: "O", v: 26.7 },
    ],
    molMass: 60,
  },
  {
    name: "Glycine (甘氨酸)",
    elements: [
      { s: "C", v: 32.0 },
      { s: "H", v: 6.7 },
      { s: "N", v: 18.7 },
      { s: "O", v: 42.6 },
    ],
    molMass: 75,
  },
  {
    name: "Alanine (丙氨酸)",
    elements: [
      { s: "C", v: 40.4 },
      { s: "H", v: 7.9 },
      { s: "N", v: 15.7 },
      { s: "O", v: 36.0 },
    ],
    molMass: 89,
  },
  // 5个元素
  {
    name: "Cysteine (半胱氨酸)",
    elements: [
      { s: "C", v: 29.8 },
      { s: "H", v: 5.8 },
      { s: "N", v: 11.6 },
      { s: "O", v: 26.4 },
      { s: "S", v: 26.4 },
    ],
    molMass: 121,
  },
  {
    name: "Methionine (蛋氨酸)",
    elements: [
      { s: "C", v: 40.3 },
      { s: "H", v: 7.4 },
      { s: "N", v: 9.4 },
      { s: "O", v: 21.5 },
      { s: "S", v: 21.5 },
    ],
    molMass: 149,
  },
  {
    name: "Thiamine (维生素B1)",
    elements: [
      { s: "C", v: 42.7 },
      { s: "H", v: 5.4 },
      { s: "N", v: 16.6 },
      { s: "O", v: 4.7 },
      { s: "S", v: 9.5 },
    ],
    molMass: 337,
  },
];

// ===== Helper: Convert formula with subscripts to HTML =====
export function formatFormulaHTML(formula) {
  if (!formula) return "";
  // Replace subscript unicode with <sub> tags
  return formula.replace(/[₀₁₂₃₄₅₆₇₈₉]+/g, (match) => {
    const nums = match
      .split("")
      .map((c) => {
        const subscripts = "₀₁₂₃₄₅₆₇₈₉";
        return subscripts.indexOf(c);
      })
      .join("");
    return `<sub>${nums}</sub>`;
  });
}

// ===== Empirical Formula Calculator =====

// Metal symbols list (for formula ordering: metals before nonmetals)
const METALS = new Set([
  'Li','Be','Na','Mg','Al','K','Ca','Sc','Ti','V','Cr','Mn','Fe','Co','Ni','Cu','Zn',
  'Ga','Rb','Sr','Y','Zr','Nb','Mo','Tc','Ru','Rh','Pd','Ag','Cd','In','Sn',
  'Cs','Ba','La','Ce','Pr','Nd','Pm','Sm','Eu','Gd','Tb','Dy','Ho','Er','Tm','Yb','Lu',
  'Hf','Ta','W','Re','Os','Ir','Pt','Au','Hg','Tl','Pb','Bi','Po',
  'Fr','Ra','Ac','Th','Pa','U','Np','Pu','Am','Cm','Bk','Cf','Es','Fm','Md','No','Lr',
  'Rf','Db','Sg','Bh','Hs','Mt','Ds','Rg','Cn','Nh','Fl','Mc','Lv','Ts','Og'
]);

/**
 * Normalise an element symbol: first letter upper, rest lower.
 * Returns null if the symbol is not in the atomicMasses table.
 */
export function normalizeSymbol(raw) {
  if (!raw) return null;
  const s = raw.trim();
  if (s.length === 0 || s.length > 2) return null;
  const norm = s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  return atomicMasses[norm] !== undefined ? norm : null;
}

/**
 * Validate all inputs, returning an object { ok, errors[] }
 * Each error: { row, field, message }
 */
export function validateEmpiricalInputs(elements, molecularMass) {
  const errors = [];

  if (elements.length < 2) {
    errors.push({ row: -1, field: 'global', message: ct('chemTools.enterAtLeast2Elements', 'Enter at least 2 elements.') });
  }

  const seenSymbols = new Set();
  let percentSum = 0;

  elements.forEach((el, i) => {
    // Symbol check
    if (!el.symbol || el.symbol.trim() === '') {
      errors.push({ row: i, field: 'symbol', message: ct('chemTools.enterElementSymbol', 'Enter an element symbol') });
    } else {
      const norm = normalizeSymbol(el.symbol);
      if (!norm) {
        errors.push({ row: i, field: 'symbol', message: ct('chemTools.invalidElementSymbol', '"{symbol}" is not a valid element', { symbol: el.symbol }) });
      } else if (seenSymbols.has(norm)) {
        errors.push({ row: i, field: 'symbol', message: ct('chemTools.duplicateElement', 'Duplicate element: {symbol}', { symbol: norm }) });
      } else {
        seenSymbols.add(norm);
      }
    }

    // Percent check
    if (el.percent === undefined || el.percent === null || el.percent === '' || isNaN(Number(el.percent))) {
      errors.push({ row: i, field: 'value', message: ct('chemTools.enterNumber', 'Enter a number') });
    } else {
      const v = Number(el.percent);
      if (v <= 0 || v > 100) {
        errors.push({ row: i, field: 'value', message: ct('chemTools.range0To100', 'Must be 0–100 %') });
      } else {
        percentSum += v;
      }
    }
  });

  // Percent sum check (strict: must be within ±1%)
  if (errors.filter(e => e.field === 'value').length === 0 && elements.length >= 2) {
    if (Math.abs(percentSum - 100) > 1.0) {
      errors.push({
        row: -1, field: 'sum',
        message: ct('chemTools.percentagesSum', 'Percentages sum to {sum}%, expected ~100%', { sum: percentSum.toFixed(1) })
      });
    }
  }

  // Molecular mass check
  if (molecularMass !== null && molecularMass !== undefined && molecularMass !== '') {
    const mm = Number(molecularMass);
    if (isNaN(mm) || mm <= 0) {
      errors.push({ row: -1, field: 'molMass', message: ct('chemTools.molarMassPositive', 'Molar mass must be a positive number') });
    }
  }

  return { ok: errors.length === 0, errors };
}

/**
 * GCD of two positive integers
 */
function gcdTwo(a, b) {
  a = Math.round(Math.abs(a));
  b = Math.round(Math.abs(b));
  while (b) { [a, b] = [b, a % b]; }
  return a;
}

/**
 * GCD of an integer array
 */
function gcdArr(arr) {
  return arr.reduce((g, v) => gcdTwo(g, v));
}

/**
 * Simplify mole ratios to smallest whole-number subscripts.
 * Algorithm:
 *  1. Divide all by min → raw ratios
 *  2. Try multipliers 1‒8; accept if all values are within ±0.08 of an integer.
 *  3. Reduce result by GCD.
 *  4. Fail if no multiplier works.
 */
function simplifyRatiosModal(ratios) {
  const TOL = 0.08;
  const MAX_MULT = 8;

  for (let mult = 1; mult <= MAX_MULT; mult++) {
    const scaled = ratios.map(r => r.ratio * mult);
    const allInt = scaled.every(v => Math.abs(v - Math.round(v)) < TOL);
    if (allInt) {
      let counts = scaled.map(v => Math.round(v) || 1);
      // GCD reduce
      const g = gcdArr(counts);
      counts = counts.map(c => c / g);
      return ratios.map((r, i) => ({ symbol: r.symbol, count: counts[i] }));
    }
  }

  // Fallback: round to nearest, warn
  return null;
}

/**
 * Order elements for formula display:
 *  - If mix of metals + nonmetals → metals first (by periodic table order), then nonmetals.
 *  - Otherwise, Hill system: C first, H second, rest alphabetical.
 */
function orderElements(elements) {
  const hasMetal = elements.some(e => METALS.has(e.symbol));
  const hasNonMetal = elements.some(e => !METALS.has(e.symbol));

  if (hasMetal && hasNonMetal) {
    // Metals first, then nonmetals (alphabetical within each group)
    const metals = elements.filter(e => METALS.has(e.symbol)).sort((a, b) => a.symbol.localeCompare(b.symbol));
    const nonmetals = elements.filter(e => !METALS.has(e.symbol)).sort((a, b) => a.symbol.localeCompare(b.symbol));
    return [...metals, ...nonmetals];
  }

  // Hill system: C first, H second, rest alphabetical
  const sorted = [...elements].sort((a, b) => {
    if (a.symbol === 'C') return -1;
    if (b.symbol === 'C') return 1;
    if (a.symbol === 'H') return -1;
    if (b.symbol === 'H') return 1;
    return a.symbol.localeCompare(b.symbol);
  });
  return sorted;
}

export function calculateEmpiricalModal(data) {
  const { elements, molecularMass } = data;

  if (!elements || elements.length < 2) {
    throw new Error(ct("chemTools.enterAtLeast2Valid", "Please enter at least 2 elements with valid data."));
  }

  // — Normalize percentages to exactly 100 —
  const rawSum = elements.reduce((s, e) => s + e.percent, 0);
  const normalised = (Math.abs(rawSum - 100) > 0.01);
  const scaleFactor = 100 / rawSum;
  const elems = elements.map(e => ({
    symbol: e.symbol,
    percent: e.percent * scaleFactor,
  }));

  // — Step 1: Convert to moles (assume 100 g sample) —
  const moles = elems.map(elem => {
    const aw = atomicMasses[elem.symbol];
    const molesVal = elem.percent / aw;
    return {
      symbol: elem.symbol,
      grams: elem.percent,
      atomicWeight: aw,
      moles: molesVal,
      originalPercent: elements.find(e => e.symbol === elem.symbol).percent,
    };
  });

  // — Step 2: Divide by smallest —
  const minMoles = Math.min(...moles.map(m => m.moles));
  const ratios = moles.map(m => ({
    symbol: m.symbol,
    moles: m.moles,
    ratio: m.moles / minMoles,
    grams: m.grams,
    atomicWeight: m.atomicWeight,
    originalPercent: m.originalPercent,
  }));

  // — Step 3: Simplify to integers —
  const simplified = simplifyRatiosModal(ratios);
  if (!simplified) {
    throw new Error(ct("chemTools.cannotDetermineEmpirical", "Cannot determine empirical formula — ratios are too far from whole numbers. Check your data."));
  }

  // — Order for display —
  const ordered = orderElements(simplified);

  // Build formula string
  const empiricalFormula = ordered
    .map(r => r.symbol + (r.count > 1 ? subscript(r.count) : ''))
    .join('');

  // Empirical mass
  let empiricalMass = 0;
  ordered.forEach(elem => {
    empiricalMass += atomicMasses[elem.symbol] * elem.count;
  });

  // ===== Build detailed explanation =====
  let explanation = "<h4>Calculation Steps</h4><ol>";
  explanation += "<li><strong>Assume 100 g sample</strong> — each % becomes grams directly.</li>";
  if (normalised) {
    explanation += `<li><strong>Note:</strong> Percentages summed to ${rawSum.toFixed(1)}%; values normalised to 100%.</li>`;
  }
  explanation += "<li><strong>Convert grams → moles</strong> (g ÷ atomic mass):</li><ul>";
  moles.forEach(m => {
    explanation += `<li>${m.symbol}: ${m.grams.toFixed(2)} g ÷ ${m.atomicWeight} g/mol = <strong>${m.moles.toFixed(4)} mol</strong></li>`;
  });
  explanation += "</ul>";
  explanation += `<li><strong>Divide all by smallest</strong> (${minMoles.toFixed(4)} mol):</li><ul>`;
  ratios.forEach(r => {
    explanation += `<li>${r.symbol}: ${r.moles.toFixed(4)} ÷ ${minMoles.toFixed(4)} = <strong>${r.ratio.toFixed(3)}</strong></li>`;
  });
  explanation += "</ul>";
  explanation += "<li><strong>Round to whole-number ratio:</strong></li><ul>";
  ordered.forEach(r => {
    explanation += `<li>${r.symbol} → <strong>${r.count}</strong></li>`;
  });
  explanation += "</ul>";
  explanation += `<li><strong>Empirical formula:</strong> <strong>${empiricalFormula}</strong> (${empiricalMass.toFixed(2)} g/mol)</li>`;
  explanation += "</ol>";

  // ===== Molecular formula (only if molar mass provided) =====
  let molecularFormula = null;
  let multiplier = 1;
  let molMassError = null;

  if (molecularMass !== null && molecularMass !== undefined && Number(molecularMass) > 0) {
    const mm = Number(molecularMass);
    const rawN = mm / empiricalMass;
    const n = Math.round(rawN);

    if (n < 1 || Math.abs(rawN - n) > 0.1) {
      molMassError = `Molar mass ${mm} g/mol does not match empirical formula mass ${empiricalMass.toFixed(2)} g/mol (ratio = ${rawN.toFixed(2)}, not close to an integer).`;
    } else {
      multiplier = n;
      molecularFormula = ordered
        .map(r => r.symbol + (r.count * n > 1 ? subscript(r.count * n) : ''))
        .join('');

      explanation += "<hr><h4>Molecular Formula</h4>";
      explanation += `<p>Given molar mass: <strong>${mm} g/mol</strong></p>`;
      explanation += `<p>n = ${mm} ÷ ${empiricalMass.toFixed(2)} = <strong>${rawN.toFixed(2)} ≈ ${n}</strong></p>`;
      explanation += `<p>Molecular formula = empirical × ${n} = <strong>${molecularFormula}</strong></p>`;
    }
  }

  return {
    empiricalFormula,
    molecularFormula,
    explanation,
    empiricalMass,
    molecularMass: molecularMass ? Number(molecularMass) : null,
    empirical: ordered,
    multiplier,
    molMassError,
    normalised,
  };
}

function subscript(num) {
  const subscripts = {
    0: "₀",
    1: "₁",
    2: "₂",
    3: "₃",
    4: "₄",
    5: "₅",
    6: "₆",
    7: "₇",
    8: "₈",
    9: "₉",
  };
  return String(num)
    .split("")
    .map((d) => subscripts[d] || d)
    .join("");
}
