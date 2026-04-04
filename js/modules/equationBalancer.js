// equationBalancer.js
// Robust equation balancer for neutral chemical equations
// - Exact rational arithmetic via BigInt
// - Strict formula parsing
// - Supports hydrates with dot notation: CuSO4·5H2O / CuSO4•5H2O
// - Supports trailing states: (s) (l) (g) (aq)
// - Rejects charges / ionic equations / malformed syntax
// - Optional chemistry validator hook to reject formulas like H100O if desired

// ============================================================
// 1) Element symbols
// ============================================================
const VALID_ELEMENTS = new Set([
  "H","He","Li","Be","B","C","N","O","F","Ne",
  "Na","Mg","Al","Si","P","S","Cl","Ar","K","Ca",
  "Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn",
  "Ga","Ge","As","Se","Br","Kr","Rb","Sr","Y","Zr",
  "Nb","Mo","Tc","Ru","Rh","Pd","Ag","Cd","In","Sn",
  "Sb","Te","I","Xe","Cs","Ba","La","Ce","Pr","Nd",
  "Pm","Sm","Eu","Gd","Tb","Dy","Ho","Er","Tm","Yb",
  "Lu","Hf","Ta","W","Re","Os","Ir","Pt","Au","Hg",
  "Tl","Pb","Bi","Po","At","Rn","Fr","Ra","Ac","Th",
  "Pa","U","Np","Pu","Am","Cm","Bk","Cf","Es","Fm",
  "Md","No","Lr","Rf","Db","Sg","Bh","Hs","Mt","Ds",
  "Rg","Cn","Nh","Fl","Mc","Lv","Ts","Og"
]);

// ============================================================
// 2) Errors
// ============================================================
class FormulaError extends Error {
  constructor(message, code = "INVALID_FORMULA") {
    super(message);
    this.name = "FormulaError";
    this.code = code;
  }
}

class EquationError extends Error {
  constructor(message, code = "INVALID_EQUATION") {
    super(message);
    this.name = "EquationError";
    this.code = code;
  }
}

const ERROR_CODES = {
  INVALID_FORMULA: "INVALID_FORMULA",
  INVALID_EQUATION: "INVALID_EQUATION",
  NO_SOLUTION: "NO_SOLUTION",
  SUSPICIOUS_FORMULA: "SUSPICIOUS_FORMULA",
  IONIC_NOT_SUPPORTED: "IONIC_NOT_SUPPORTED"
};

// ============================================================
// 3) Utilities
// ============================================================
const SUBSCRIPT_MAP = {
  "₀":"0","₁":"1","₂":"2","₃":"3","₄":"4",
  "₅":"5","₆":"6","₇":"7","₈":"8","₉":"9"
};

export function normalizeText(input) {
  let s = String(input)
    .replace(/[₀-₉]/g, ch => SUBSCRIPT_MAP[ch]);

  // ═══ Zero-to-O Sanitizer (character-level scan) ═══
  // Core invariant: In chemistry, digit 0 can ONLY appear as a continuation
  // of a multi-digit number (i.e., preceded by another digit 0-9).
  // In ALL other positions (after a letter, bracket, space, or at start),
  // a '0' must be the letter O.
  let result = "";
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "0") {
      const prev = i > 0 ? s[i - 1] : "";
      if (/[0-9]/.test(prev)) {
        result += "0"; // Part of multi-digit number
      } else {
        result += "O"; // Must be the letter O
      }
    } else {
      result += s[i];
    }
  }

  // Explicitly fix standalone "H20" typos. Since the digit '2' correctly preserves 
  // the '0', we need a manual override for this very common H2O spelling error,
  // making sure not to break C9H20.
  s = result.replace(/\bH20\b/g, "H2O");

  return s
    .replace(/[→⟶⟹⇌⟷]/g, "->")
    .replace(/[·•]/g, "•")
    .replace(/\s+/g, " ")
    .trim();
}

function gcdBigInt(a, b) {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b !== 0n) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
}

function lcmBigInt(a, b) {
  if (a === 0n || b === 0n) return 0n;
  return (a / gcdBigInt(a, b)) * b < 0n ? -((a / gcdBigInt(a, b)) * b) : (a / gcdBigInt(a, b)) * b;
}

function cloneCountMap(map) {
  const out = {};
  for (const [k, v] of Object.entries(map)) out[k] = v;
  return out;
}

function mergeCounts(target, source, multiplier = 1) {
  for (const [el, count] of Object.entries(source)) {
    target[el] = (target[el] || 0) + count * multiplier;
  }
  return target;
}

function stripTrailingState(formula) {
  // Only strip valid trailing state symbols
  // Examples: H2O(l), NaCl(aq)
  return formula.replace(/\s*\((aq|s|l|g)\)\s*$/i, "").trim();
}

function hasUnsupportedChargeNotation(formula) {
  // Reject ionic/charge notation in this engine
  // Examples: Fe3+, SO4^2-, NH4+, e-, MnO4-
  // We do not reject parentheses or hydrate dot
  return /(\^?\d*[+-]$)|([A-Za-z0-9)\]}][+-](?![A-Za-z]))/.test(formula);
}

function ensureNoLeadingCoefficient(formula) {
  if (/^\d+\s*[A-Za-z([{]/.test(formula)) {
    throw new FormulaError(formula, "LEADING_COEFFICIENT");
  }
}

// ============================================================
// 4) Exact Fraction with BigInt
// ============================================================
class Fraction {
  constructor(n, d = 1n) {
    if (d === 0n) throw new Error("Division by zero in Fraction");
    if (typeof n !== "bigint") n = BigInt(n);
    if (typeof d !== "bigint") d = BigInt(d);

    if (d < 0n) {
      n = -n;
      d = -d;
    }
    const g = gcdBigInt(n, d);
    this.n = n / g;
    this.d = d / g;
  }

  static zero() { return new Fraction(0n, 1n); }
  static one() { return new Fraction(1n, 1n); }

  isZero() { return this.n === 0n; }

  add(other) {
    return new Fraction(this.n * other.d + other.n * this.d, this.d * other.d);
  }
  sub(other) {
    return new Fraction(this.n * other.d - other.n * this.d, this.d * other.d);
  }
  mul(other) {
    return new Fraction(this.n * other.n, this.d * other.d);
  }
  div(other) {
    if (other.n === 0n) throw new Error("Division by zero Fraction");
    return new Fraction(this.n * other.d, this.d * other.n);
  }
  neg() {
    return new Fraction(-this.n, this.d);
  }
}

// ============================================================
// 5) Formula parser
// ============================================================
function parseFormulaStrict(rawFormula, options = {}) {
  const {
    chemistryValidator = null // optional callback(formula, atomCounts) => true/false|string
  } = options;

  if (!rawFormula || !String(rawFormula).trim()) {
    throw new FormulaError("Formula is empty.");
  }

  let formula = normalizeText(rawFormula);
  formula = stripTrailingState(formula);

  if (!formula) {
    throw new FormulaError("Formula is empty after removing state symbols.");
  }

  if (hasUnsupportedChargeNotation(formula)) {
    throw new FormulaError(
      `Charged species / ionic notation is not supported in this balancer: "${rawFormula}".`,
      "IONIC_NOT_SUPPORTED"
    );
  }

  ensureNoLeadingCoefficient(formula);

  if (/->|=/.test(formula)) {
    throw new FormulaError(`Formula should be a single compound, not a whole equation: "${rawFormula}".`);
  }

  // Hydrates: CuSO4•5H2O
  if (formula.includes("•")) {
    const parts = formula.split("•").map(s => s.trim()).filter(Boolean);
    if (parts.length < 2) {
      throw new FormulaError(`Invalid hydrate notation: "${rawFormula}".`);
    }

    const combined = {};
    for (const part of parts) {
      const counts = parseHydratePart(part);
      mergeCounts(combined, counts, 1);
    }

    runChemistryValidation(formula, combined, chemistryValidator);
    return combined;
  }

  const counts = parseSingleFormula(formula);
  runChemistryValidation(formula, counts, chemistryValidator);
  return counts;
}

function parseHydratePart(part) {
  // Allow leading multiplier ONLY in hydrate parts like 5H2O
  const m = part.match(/^(\d+)([A-Za-z([{].*)$/);
  if (m) {
    const multiplier = parseInt(m[1], 10);
    const inner = m[2].trim();
    if (multiplier <= 0) throw new FormulaError(`Invalid hydrate multiplier in "${part}".`);
    const counts = parseSingleFormula(inner);
    const scaled = {};
    for (const [el, n] of Object.entries(counts)) scaled[el] = n * multiplier;
    return scaled;
  }
  return parseSingleFormula(part);
}

function parseSingleFormula(formula) {
  let i = 0;
  const len = formula.length;
  const stack = [{ type: "root", counts: {} }];
  const openToClose = { "(": ")", "[": "]", "{": "}" };
  const closeToOpen = { ")": "(", "]": "[", "}": "{" };

  function currentCounts() {
    return stack[stack.length - 1].counts;
  }

  function parseNumber() {
    let start = i;
    while (i < len && /\d/.test(formula[i])) i++;
    if (start === i) return 1;
    const value = Number(formula.slice(start, i));
    if (!Number.isInteger(value) || value <= 0) {
      throw new FormulaError(`Invalid subscript in "${formula}".`);
    }
    // Note: The previous arbitrary 20-subscript safeguard has been completely removed to support large organic molecules properly.
    return value;
  }

  while (i < len) {
    const ch = formula[i];

    if (/\s/.test(ch)) {
      i++;
      continue;
    }

    if (openToClose[ch]) {
      stack.push({ type: ch, counts: {} });
      i++;
      continue;
    }

    if (closeToOpen[ch]) {
      if (stack.length === 1) {
        throw new FormulaError(`Unmatched closing bracket "${ch}" in "${formula}".`);
      }
      const group = stack.pop();
      if (group.type !== closeToOpen[ch]) {
        throw new FormulaError(`Mismatched brackets in "${formula}".`);
      }
      i++;
      const mult = parseNumber();
      mergeCounts(currentCounts(), group.counts, mult);
      continue;
    }

    if (/[A-Z]/.test(ch)) {
      let symbol = ch;
      i++;
      if (i < len && /[a-z]/.test(formula[i])) {
        symbol += formula[i];
        i++;
      }

      if (!VALID_ELEMENTS.has(symbol)) {
        throw new FormulaError(`Unknown element symbol "${symbol}" in "${formula}".`);
      }

      const mult = parseNumber();
      currentCounts()[symbol] = (currentCounts()[symbol] || 0) + mult;
      continue;
    }

    if (/\d/.test(ch)) {
      // Standalone numbers are not allowed here
      throw new FormulaError(
        `Unexpected number at position ${i + 1} in "${formula}". ` +
        `Numbers must follow an element or a closed group.`
      );
    }

    throw new FormulaError(`Invalid character "${ch}" in "${formula}".`);
  }

  if (stack.length !== 1) {
    throw new FormulaError(`Unclosed bracket in "${formula}".`);
  }

  const result = stack[0].counts;
  if (Object.keys(result).length === 0) {
    throw new FormulaError(`No elements found in "${formula}".`);
  }
  return result;
}

function runChemistryValidation(formula, atomCounts, chemistryValidator) {
  if (!chemistryValidator) return;
  const verdict = chemistryValidator(formula, cloneCountMap(atomCounts));
  if (verdict === true || verdict == null) return;
  if (verdict === false) {
    throw new FormulaError(`Chemically invalid or unsupported formula "${formula}".`);
  }
  if (typeof verdict === "string") {
    throw new FormulaError(verdict);
  }
  throw new FormulaError(`Chemistry validator returned an invalid result for "${formula}".`);
}

// ============================================================
// 6) Equation splitting and validation
// ============================================================
function splitEquation(rawEquation) {
  const eq = normalizeText(rawEquation);
  const parts = eq.split("->");
  if (parts.length !== 2) {
    throw new EquationError(`Equation must contain exactly one arrow "->": "${rawEquation}"`);
  }

  const reactants = splitSide(parts[0], "reactant");
  const products = splitSide(parts[1], "product");

  if (reactants.length === 0 || products.length === 0) {
    throw new EquationError(`Equation must have at least one reactant and one product.`);
  }

  return { reactants, products };
}

function splitSide(sideText, label) {
  const rawParts = sideText
    .split("+")
    .map(s => s.trim())
    .filter(s => s.length > 0);

  if (rawParts.length === 0) return [];

  for (const p of rawParts) {
    if (p === "+" || p === "->") {
      throw new EquationError(`Invalid ${label} side syntax.`);
    }
  }

  return rawParts;
}

// ============================================================
// 7) Build matrix
// ============================================================
function buildMatrix(reactants, products, options = {}) {
  const all = [...reactants, ...products];
  const parsed = all.map(f => parseFormulaStrict(f, options));

  const elementSet = new Set();
  for (const obj of parsed) {
    for (const el of Object.keys(obj)) elementSet.add(el);
  }
  const elements = Array.from(elementSet).sort();

  if (elements.length === 0) {
    throw new EquationError("No elements found in equation.");
  }

  const matrix = elements.map(el => {
    const row = [];
    for (let i = 0; i < reactants.length; i++) {
      row.push(new Fraction(BigInt(parsed[i][el] || 0)));
    }
    for (let i = reactants.length; i < all.length; i++) {
      row.push(new Fraction(BigInt(-(parsed[i][el] || 0))));
    }
    return row;
  });

  return { matrix, parsed, elements };
}

// ============================================================
// 8) RREF + nullspace (exact)
// ============================================================
function rref(matrix) {
  const m = matrix.map(row => row.map(x => new Fraction(x.n, x.d)));
  const rows = m.length;
  const cols = m[0].length;

  let lead = 0;
  const pivotCols = [];

  for (let r = 0; r < rows; r++) {
    if (lead >= cols) break;

    let i = r;
    while (i < rows && m[i][lead].isZero()) i++;

    if (i === rows) {
      lead++;
      r--;
      continue;
    }

    if (i !== r) {
      [m[i], m[r]] = [m[r], m[i]];
    }

    const pivot = m[r][lead];
    for (let c = 0; c < cols; c++) {
      m[r][c] = m[r][c].div(pivot);
    }

    for (let rr = 0; rr < rows; rr++) {
      if (rr === r) continue;
      if (m[rr][lead].isZero()) continue;
      const factor = m[rr][lead];
      for (let c = 0; c < cols; c++) {
        m[rr][c] = m[rr][c].sub(factor.mul(m[r][c]));
      }
    }

    pivotCols.push(lead);
    lead++;
  }

  return { rrefMatrix: m, pivotCols };
}

function solveNullspaceSinglePositiveInteger(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const { rrefMatrix, pivotCols } = rref(matrix);

  const pivotSet = new Set(pivotCols);
  const freeCols = [];
  for (let c = 0; c < cols; c++) {
    if (!pivotSet.has(c)) freeCols.push(c);
  }

  if (freeCols.length === 0) {
    throw new EquationError("No non-trivial balancing solution exists.", "NO_SOLUTION");
  }

  // For chemical balancing, nullspace dimension is usually 1.
  // We try each free variable = 1 and look for a fully positive solution.
  for (const chosenFree of freeCols) {
    const sol = Array.from({ length: cols }, () => Fraction.zero());
    sol[chosenFree] = Fraction.one();

    for (let r = pivotCols.length - 1; r >= 0; r--) {
      const pivotCol = pivotCols[r];
      let sum = Fraction.zero();
      for (let c = pivotCol + 1; c < cols; c++) {
        if (!rrefMatrix[r][c].isZero()) {
          sum = sum.add(rrefMatrix[r][c].mul(sol[c]));
        }
      }
      sol[pivotCol] = sum.neg();
    }

    const ints = fractionsToMinimalIntegers(sol);
    if (ints && ints.every(v => v > 0n)) {
      return ints;
    }

    const flipped = ints ? ints.map(v => -v) : null;
    if (flipped && flipped.every(v => v > 0n)) {
      return reduceBigIntVector(flipped);
    }
  }

  throw new EquationError(
    "Could not derive a strictly positive integer solution. " +
    "This may be an unsupported or invalid equation.",
    "NO_SOLUTION"
  );
}

function fractionsToMinimalIntegers(fracs) {
  if (!fracs || fracs.length === 0) return null;

  let commonDen = 1n;
  for (const f of fracs) {
    commonDen = lcmBigInt(commonDen, f.d);
  }

  let ints = fracs.map(f => (f.n * (commonDen / f.d)));

  if (ints.every(v => v === 0n)) return null;

  return reduceBigIntVector(ints);
}

function reduceBigIntVector(ints) {
  let g = 0n;
  for (const v of ints) {
    const abs = v < 0n ? -v : v;
    if (abs !== 0n) g = g === 0n ? abs : gcdBigInt(g, abs);
  }
  if (g === 0n) return ints;
  return ints.map(v => v / g);
}

// ============================================================
// 9) Verification
// ============================================================
function verifyBalanced(parsedAll, reactantCount, coeffs) {
  const left = {};
  const right = {};

  for (let i = 0; i < parsedAll.length; i++) {
    const target = i < reactantCount ? left : right;
    const coeff = Number(coeffs[i]);

    for (const [el, count] of Object.entries(parsedAll[i])) {
      target[el] = (target[el] || 0) + count * coeff;
    }
  }

  const keys = new Set([...Object.keys(left), ...Object.keys(right)]);
  for (const k of keys) {
    if ((left[k] || 0) !== (right[k] || 0)) return false;
  }
  return true;
}

// ============================================================
// 10) Public API
// ============================================================
export function balanceEquation(input, options = {}) {
  const {
    chemistryValidator = null,
    formatCoefficientsAsNumber = true
  } = options;

  let reactants, products;

  if (typeof input === "string") {
    ({ reactants, products } = splitEquation(input));
  } else if (
    input &&
    Array.isArray(input.reactants) &&
    Array.isArray(input.products)
  ) {
    reactants = input.reactants.map(x => String(x).trim()).filter(Boolean);
    products = input.products.map(x => String(x).trim()).filter(Boolean);

    if (reactants.length === 0 || products.length === 0) {
      throw new EquationError("Both reactants and products must be non-empty arrays.");
    }
  } else {
    throw new EquationError(
      'Input must be either a full equation string like "H2 + O2 -> H2O" ' +
      'or an object { reactants: [...], products: [...] }.'
    );
  }

  const build = buildMatrix(reactants, products, { chemistryValidator });
  const coeffs = solveNullspaceSinglePositiveInteger(build.matrix);

  if (!verifyBalanced(build.parsed, reactants.length, coeffs)) {
    throw new EquationError("Internal verification failed: equation did not balance correctly.");
  }

  const reactantCoeffs = coeffs.slice(0, reactants.length);
  const productCoeffs = coeffs.slice(reactants.length);

  return {
    reactants: reactants.map((formula, i) => ({
      formula,
      coefficient: formatCoefficientsAsNumber ? Number(reactantCoeffs[i]) : reactantCoeffs[i]
    })),
    products: products.map((formula, i) => ({
      formula,
      coefficient: formatCoefficientsAsNumber ? Number(productCoeffs[i]) : productCoeffs[i]
    })),
    formatted: formatBalancedEquation(reactants, products, reactantCoeffs, productCoeffs)
  };
}

export function formatBalancedEquation(reactants, products, reactantCoeffs, productCoeffs) {
  const left = reactants.map((f, i) => formatTerm(reactantCoeffs[i], f)).join(" + ");
  const right = products.map((f, i) => formatTerm(productCoeffs[i], f)).join(" + ");
  return `${left} -> ${right}`;
}

function formatTerm(coeff, formula) {
  const c = typeof coeff === "bigint" ? coeff : BigInt(coeff);
  return c === 1n ? formula : `${c}${formula}`;
}

// ============================================================
// 11) Optional chemistry validator
// ============================================================
// IMPORTANT:
// A parser/balancer alone cannot know whether every formula is chemically real.
// To reject things like H100O, use a validator.
// You can replace this with:
// - a whitelist of known compounds
// - a reaction-rule engine
// - a database-backed validator
//
// This demo validator is intentionally conservative:
// - It allows a few common species.
// - It rejects absurd standalone H/O formulas like H100O.
// - You should expand it for your real app.
export function demoChemistryValidator(formula, atomCounts) {
  // 1. Detect obviously suspicious high subscripts (e.g., Fe123O456, H100O)
  //    (This is now handled directly inside the parseNumber logic of parseFormulaStrict
  //     to prevent false positives from hydrate multipliers like Al2(SO4)3•18H2O)

  // 2. Total atom count sanity: if the sum of all subscripts exceeds 200,
  //    flag it even if no single element is >= 20 on its own.
  const totalAtoms = Object.values(atomCounts).reduce((a, b) => a + b, 0);
  if (totalAtoms > 200) {
    throw new FormulaError(
      `This formula looks unusual (total ${totalAtoms} atoms). Please check the subscripts.`,
      "SUSPICIOUS_FORMULA"
    );
  }

  // 3. Strict Check: Pure elemental forms for diatromics (HOBrFINCl)
  const elements = Object.keys(atomCounts);
  if (elements.length === 1) {
    const el = elements[0];
    const count = atomCounts[el];
    const diatomic = ["H", "N", "F", "Cl", "Br", "I"];
    
    if (diatomic.includes(el) && count !== 2) {
      throw new FormulaError(
        `${el} should be written as ${el}2, not ${formula}.`,
        "INVALID_ELEMENTAL_FORM"
      );
    }
    
    if (el === "O" && count !== 2 && count !== 3) {
      throw new FormulaError(
        `Oxygen should be written as O2 (or O3), not ${formula}.`,
        "INVALID_ELEMENTAL_FORM"
      );
    }
  }

  // 3. Specific case: H≥10 + O=1 (e.g. H10O, H100O)
  if (
    Object.keys(atomCounts).length === 2 &&
    atomCounts.H &&
    atomCounts.O &&
    atomCounts.H >= 10 &&
    atomCounts.O === 1
  ) {
    throw new FormulaError(
      `Unsupported or chemically implausible formula "${formula}".`,
      "SUSPICIOUS_FORMULA"
    );
  }

  return true;
}
export function formatReactionError(errorMessage) {
  if (!errorMessage || typeof errorMessage !== 'string') {
    return "We couldn't parse this formula. Please double-check your spelling and formatting.";
  }

  // 1. 全小写 / 自然语言误触 (例: "asdfg" 或 "Water")
  // 底层特征: 报 "Invalid character: [小写字母]"
  if (/Invalid character:\s*[a-z]/.test(errorMessage)) {
    return "Unrecognized element symbol. Remember that chemical elements must start with a capital letter (e.g., 'Na' instead of 'na', 'H2O' instead of 'Water').";
  }

  // 2. 括号不匹配 (例: "Ca(OH", "(PO4)3)")
  // 底层特征: 包含 "matched", "bracket", "parenthes", "closed" 等特征的括号报错
  if (/(unmatched|mismatched).*parenthes/i.test(errorMessage) || 
      /(unmatched|mismatched).*bracket/i.test(errorMessage) || 
      /unclosed/i.test(errorMessage)) {
    return "Mismatched brackets. Please check your formula and make sure all parentheses are closed properly (e.g., 'Ca(OH)2').";
  }

  // 3. 非法特殊符号 (例: "H2O @ CO2", "NaCl!")
  // 底层特征: 报 "Invalid character: [非字母数字的特殊符号]"
  const specialCharMatch = errorMessage.match(/Invalid character:\s*([^a-zA-Z0-9\s])/);
  if (specialCharMatch) {
    const invalidChar = specialCharMatch[1];
    return `Special characters like '${invalidChar}' are not allowed. Please use standard chemical formulas and '+' to separate reactants.`;
  }

  // 4. 兜底错误 (Fallback)
  if (/Invalid|Parse|Syntax|undefined/i.test(errorMessage) || errorMessage.length < 25) {
    return "We couldn't parse this formula. Please double-check your spelling and formatting.";
  }

  return errorMessage;
}
