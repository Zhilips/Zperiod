// =============================================================================
// Reaction Predictor — Rule-based product prediction for school chemistry
// Predicts products based on reactant formulas + reaction type
// Then hands off to the robust balancer for coefficient determination
// =============================================================================

import { balanceEquation, demoChemistryValidator, normalizeText } from "./equationBalancer.js";
import { parseFormulaStrict, ct } from "./chemistryTools.js";

// ============================================================
// 1) Chemistry Data
// ============================================================

/** Common ion charges for metals (most common oxidation state in school chemistry) */
const METAL_CHARGES = {
  Li: 1, Na: 1, K: 1, Rb: 1, Cs: 1, Fr: 1,             // Group 1
  Be: 2, Mg: 2, Ca: 2, Sr: 2, Ba: 2, Ra: 2,             // Group 2
  Al: 3, Ga: 3,                                           // Group 13
  Zn: 2, Cd: 2,                                           // Always +2
  Ag: 1,                                                   // Almost always +1
  // Transition metals with common charges
  Fe: 3, Cu: 2, Ni: 2, Co: 2, Mn: 2, Cr: 3,
  Sn: 2, Pb: 2, Ti: 4,
};

/** Variable-charge metals with their most common states */
const VARIABLE_CHARGE_METALS = {
  Fe: [2, 3], Cu: [1, 2], Sn: [2, 4], Pb: [2, 4],
  Mn: [2, 4, 7], Cr: [2, 3, 6], Co: [2, 3], Ni: [2, 3],
};

/** Simple nonmetal charges when forming binary ionic compounds */
const NONMETAL_CHARGES = {
  F: -1, Cl: -1, Br: -1, I: -1,     // Halogens
  O: -2, S: -2, Se: -2, Te: -2,     // Group 16
  N: -3, P: -3,                     // Group 15
};

/** Metals set (elements that are metals in school chemistry) */
const METALS = new Set([
  "Li","Na","K","Rb","Cs","Fr",
  "Be","Mg","Ca","Sr","Ba","Ra",
  "Al","Ga","In","Tl",
  "Sn","Pb","Bi",
  "Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn",
  "Y","Zr","Nb","Mo","Tc","Ru","Rh","Pd","Ag","Cd",
  "La","Ce","Hf","Ta","W","Re","Os","Ir","Pt","Au","Hg",
]);

/** Halogens (for halogen displacement) */
const HALOGENS = ["F", "Cl", "Br", "I"];
const HALOGEN_SET = new Set(HALOGENS);

/** Nonmetals that form diatomic molecules */
const DIATOMIC_ELEMENTS = new Set(["H", "N", "O", "F", "Cl", "Br", "I"]);

/** Activity series: metals ordered from most reactive to least */
const ACTIVITY_SERIES = [
  "K", "Ba", "Ca", "Na", "Mg", "Al", "Zn", "Fe", "Ni", "Sn", "Pb",
  "H",  // hydrogen reference point
  "Cu", "Hg", "Ag", "Pt", "Au",
];

/** Halogen reactivity: more reactive halogens displace less reactive ones */
const HALOGEN_ACTIVITY = ["F", "Cl", "Br", "I"]; // F most reactive

/** Common polyatomic ions: name → { formula, charge } */
const POLYATOMIC_IONS = {
  "SO4":  { formula: "SO4",   charge: -2, display: "SO₄²⁻" },
  "NO3":  { formula: "NO3",   charge: -1, display: "NO₃⁻" },
  "CO3":  { formula: "CO3",   charge: -2, display: "CO₃²⁻" },
  "HCO3": { formula: "HCO3",  charge: -1, display: "HCO₃⁻" },
  "PO4":  { formula: "PO4",   charge: -3, display: "PO₄³⁻" },
  "OH":   { formula: "OH",    charge: -1, display: "OH⁻" },
  "ClO3": { formula: "ClO3",  charge: -1, display: "ClO₃⁻" },
  "ClO4": { formula: "ClO4",  charge: -1, display: "ClO₄⁻" },
  "CrO4": { formula: "CrO4",  charge: -2, display: "CrO₄²⁻" },
  "Cr2O7":{ formula: "Cr2O7", charge: -2, display: "Cr₂O₇²⁻" },
  "MnO4": { formula: "MnO4",  charge: -1, display: "MnO₄⁻" },
  "C2H3O2":{ formula: "C2H3O2", charge: -1, display: "C₂H₃O₂⁻" },
  "NH4":  { formula: "NH4",   charge: 1,  display: "NH₄⁺" },
  "SO3":  { formula: "SO3",   charge: -2, display: "SO₃²⁻" },
  "HSO4": { formula: "HSO4",  charge: -1, display: "HSO₄⁻" },
  "HPO4": { formula: "HPO4",  charge: -2, display: "HPO₄²⁻" },
  "H2PO4":{ formula: "H2PO4", charge: -1, display: "H₂PO₄⁻" },
  "CN":   { formula: "CN",    charge: -1, display: "CN⁻" },
  "SCN":  { formula: "SCN",   charge: -1, display: "SCN⁻" },
  "S2O3": { formula: "S2O3",  charge: -2, display: "S₂O₃²⁻" },
};

/** Solubility rules for school chemistry (returns true if soluble) */
function isSoluble(cation, anion) {
  const anionF = anion.formula || anion;
  const cat = cation.symbol || cation;

  // Rule 1: All Group 1 and NH4+ salts are soluble
  if (["Li","Na","K","Rb","Cs","Fr"].includes(cat) || cat === "NH4") return true;

  // Rule 2: All nitrates are soluble
  if (anionF === "NO3") return true;

  // Rule 3: Most chlorides, bromides, iodides are soluble
  if (["Cl","Br","I"].includes(anionF)) {
    // Exceptions: Ag, Pb, Hg
    if (["Ag","Pb","Hg"].includes(cat)) return false;
    return true;
  }

  // Rule 4: Most sulfates are soluble
  if (anionF === "SO4") {
    // Exceptions: Ba, Pb, Ca (slightly), Ag
    if (["Ba","Pb","Ag"].includes(cat)) return false;
    if (cat === "Ca") return false; // slightly soluble → treat as insoluble for reaction prediction
    return true;
  }

  // Rule 5: Most hydroxides are insoluble
  if (anionF === "OH") {
    if (["Li","Na","K","Rb","Cs","Fr","Ba","Ca","Sr"].includes(cat)) return true;
    return false;
  }

  // Rule 6: Most carbonates are insoluble (except Group 1, NH4)
  if (anionF === "CO3") return false;

  // Rule 7: Most phosphates are insoluble (except Group 1, NH4)
  if (anionF === "PO4") return false;

  // Rule 8: Most sulfides are insoluble
  if (anionF === "S") {
    if (["Li","Na","K","Rb","Cs","Fr","Ba","Ca","Sr","NH4"].includes(cat)) return true;
    return false;
  }

  // Rule 9: Most sulfites are insoluble
  if (anionF === "SO3") return false;

  // Default: assume soluble
  return true;
}

// ============================================================
// 2) Formula Helpers
// ============================================================

/** Check if an element is a metal */
function isMetal(symbol) { return METALS.has(symbol); }

/** Check if an element is a halogen */
function isHalogen(symbol) { return HALOGEN_SET.has(symbol); }

/** Get metal charge (default most common) */
function getMetalCharge(symbol) { return METAL_CHARGES[symbol] || null; }

/** Get nonmetal charge */
function getNonmetalCharge(symbol) { return NONMETAL_CHARGES[symbol] || null; }

/** Get element formula (diatomic or monatomic) */
function elementFormula(symbol) {
  return DIATOMIC_ELEMENTS.has(symbol) ? symbol + "2" : symbol;
}

/** Build ionic formula from cation and anion info.
 *  cation: { symbol, charge } e.g. { symbol: "Na", charge: 1 }
 *  anion:  { formula, charge } e.g. { formula: "Cl", charge: -1 }
 *         or { formula: "SO4", charge: -2 }
 */
function buildIonicFormula(cation, anion) {
  // Special case: H+ + OH- = H2O
  if (cation.symbol === "H" && anion.formula === "OH" && Math.abs(cation.charge) === 1 && Math.abs(anion.charge) === 1) {
    return "H2O";
  }

  const cCharge = Math.abs(cation.charge);
  const aCharge = Math.abs(anion.charge);

  // Find subscripts using cross-multiplication, then reduce
  const g = gcd(cCharge, aCharge);
  let cSub = aCharge / g;
  let aSub = cCharge / g;

  const cSymbol = cation.formula || cation.symbol;
  const aFormula = anion.formula;
  const aIsPolyatomic = aFormula.length > 2 || /[A-Z].*[A-Z]/.test(aFormula) ||
                         Object.keys(POLYATOMIC_IONS).includes(aFormula);
  const cIsPolyatomic = cSymbol === "NH4";

  let result = "";

  // Cation part
  if (cSub === 1) {
    // Do not wrap polyatomic cation in parenthesis if there's only 1 (e.g. NH4NO3 instead of (NH4)NO3)
    result += cSymbol;
  } else {
    result += cIsPolyatomic ? `(${cSymbol})${cSub}` : cSymbol + (cSub > 1 ? cSub : "");
  }

  // Anion part: only wrap in parentheses if subscript > 1
  if (aSub === 1) {
    result += aFormula;
  } else {
    result += aIsPolyatomic ? `(${aFormula})${aSub}` : aFormula + aSub;
  }

  return result;
}

function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

/** Check if element is higher in activity series than another */
function isMoreReactive(a, b) {
  const aIdx = ACTIVITY_SERIES.indexOf(a);
  const bIdx = ACTIVITY_SERIES.indexOf(b);
  if (aIdx === -1 || bIdx === -1) return null; // unknown
  return aIdx < bIdx; // lower index = more reactive
}

/** Check if halogen is more reactive than another */
function isHalogenMoreReactive(a, b) {
  const aIdx = HALOGEN_ACTIVITY.indexOf(a);
  const bIdx = HALOGEN_ACTIVITY.indexOf(b);
  if (aIdx === -1 || bIdx === -1) return null;
  return aIdx < bIdx;
}

// ============================================================
// 3) Compound Classification
// ============================================================

/** Parse a formula into atom counts. Uses the existing strict parser. */
function parseFormula(formula) {
  try {
    return parseFormulaStrict(formula);
  } catch {
    return null;
  }
}

/** Classify a compound into a chemistry category */
function classifyCompound(formula) {
  const atoms = parseFormula(formula);
  if (!atoms) return { type: "unknown", formula };

  const elements = Object.keys(atoms);

  // Pure element
  if (elements.length === 1) {
    const el = elements[0];
    return {
      type: "element",
      formula,
      symbol: el,
      isMetal: isMetal(el),
      isHalogen: isHalogen(el),
      atoms,
    };
  }

  // Water
  if (formula === "H2O" || (atoms.H === 2 && atoms.O === 1 && elements.length === 2)) {
    return { type: "water", formula, atoms };
  }

  // Metal oxide: MxOy — check BEFORE ion detection to avoid CaO being classified as ionic
  if (elements.length === 2 && atoms.O) {
    const otherEl = elements.find(e => e !== "O");
    if (isMetal(otherEl) && !atoms.H) {
      return {
        type: "metal_oxide",
        formula, atoms,
        metal: otherEl,
        cation: { symbol: otherEl, charge: getMetalCharge(otherEl) || 2 },
      };
    }
    // Nonmetal oxide: CO2, SO2, SO3, NO2, P2O5, etc.
    if (!isMetal(otherEl) && !atoms.H) {
      return {
        type: "nonmetal_oxide",
        formula, atoms,
        nonmetal: otherEl,
      };
    }
  }

  // Check for polyatomic ions (order matters — check longer patterns first)
  const ionDetection = detectIons(formula, atoms);
  
  // Dynamic Valence Extraction (Module 2 Fix)
  // Calculate the actual charge of the cation by counter-balancing the anion.
  if (ionDetection.cation && ionDetection.anion) {
    let anionCharge = POLYATOMIC_IONS[ionDetection.anion]?.charge || getNonmetalCharge(ionDetection.anion) || -1;
    const cationSym = ionDetection.cation.symbol;
    
    // Reverse-engineer exact charges from atom counts for metals
    if (cationSym && cationSym !== "H" && cationSym !== "NH4") {
      const catCount = atoms[cationSym] || 1;
      const anFormula = ionDetection.anion;
      let anCount = 1;
      
      if (POLYATOMIC_IONS[anFormula]) {
        const polyAtoms = parseFormula(anFormula);
        if (polyAtoms) {
          const firstEl = Object.keys(polyAtoms)[0];
          anCount = Math.floor((atoms[firstEl] || 0) / polyAtoms[firstEl]);
        }
      } else {
        anCount = atoms[anFormula] || 1;
      }
      
      if (anCount > 0 && catCount > 0) {
        const calculatedCharge = Math.abs((anCount * Math.abs(anionCharge)) / catCount);
        if (Number.isInteger(calculatedCharge) && calculatedCharge > 0) {
          ionDetection.cation.charge = calculatedCharge;
        }
      }
    }
  }

  // Metal hydroxide: M(OH)n
  if (ionDetection.anion === "OH" && ionDetection.cation) {
    return {
      type: "hydroxide",
      formula, atoms,
      cation: ionDetection.cation,
      anion: { formula: "OH", charge: -1 },
    };
  }

  // Metal carbonate: MCO3
  if (ionDetection.anion === "CO3" && ionDetection.cation) {
    return {
      type: "carbonate",
      formula, atoms,
      cation: ionDetection.cation,
      anion: { formula: "CO3", charge: -2 },
    };
  }

  // Metal hydrogen carbonate: MHCO3
  if (ionDetection.anion === "HCO3" && ionDetection.cation) {
    return {
      type: "hydrogen_carbonate",
      formula, atoms,
      cation: ionDetection.cation,
      anion: { formula: "HCO3", charge: -1 },
    };
  }

  // Acid: starts with H + nonmetal/polyatomic anion
  // Protect NH4+ compounds from being misclassified as acids just because they contain H
  const isAmmonium = ionDetection.cation && ionDetection.cation.symbol === "NH4";
  if (atoms.H && elements.length >= 2 && !isAmmonium) {
    // Binary acid: HCl, HBr, HI, HF
    if (elements.length === 2 && HALOGEN_SET.has(elements.find(e => e !== "H"))) {
      const halogen = elements.find(e => e !== "H");
      return {
        type: "acid",
        subtype: "binary_acid",
        formula, atoms,
        cation: { symbol: "H", charge: 1 },
        anion: { formula: halogen, charge: getNonmetalCharge(halogen) },
      };
    }
    // Oxyacid: H2SO4, HNO3, H3PO4, H2CO3, etc.
    if (atoms.O && ionDetection.anion) {
      return {
        type: "acid",
        subtype: "oxyacid",
        formula, atoms,
        cation: { symbol: "H", charge: 1 },
        anion: { formula: ionDetection.anion, charge: POLYATOMIC_IONS[ionDetection.anion]?.charge || 0 },
      };
    }
  }

  // Ionic compound with recognized ions
  if (ionDetection.cation && ionDetection.anion) {
    return {
      type: "ionic",
      formula, atoms,
      cation: ionDetection.cation,
      anion: { formula: ionDetection.anion, charge: POLYATOMIC_IONS[ionDetection.anion]?.charge || getNonmetalCharge(ionDetection.anion) || -1 },
    };
  }

  // (metal_oxide and nonmetal_oxide are now checked earlier, before ion detection)

  // Binary ionic compound: metal + nonmetal (no oxygen polyatomic)
  if (elements.length === 2) {
    const metal = elements.find(e => isMetal(e));
    const nonmetal = elements.find(e => !isMetal(e));
    if (metal && nonmetal) {
      return {
        type: "ionic",
        subtype: "binary",
        formula, atoms,
        cation: { symbol: metal, charge: getMetalCharge(metal) || 2 },
        anion: { formula: nonmetal, charge: getNonmetalCharge(nonmetal) || -1 },
      };
    }
  }

  // Hydrocarbon: contains only C and H
  if (elements.length === 2 && atoms.C && atoms.H && !atoms.O) {
    return { type: "hydrocarbon", formula, atoms };
  }

  // Organic compound with oxygen: C, H, O
  if (atoms.C && atoms.H) {
    return { type: "organic", formula, atoms };
  }

  return { type: "unknown", formula, atoms };
}

/** Detect cation and anion in a formula */
function detectIons(formula, atoms) {
  const elements = Object.keys(atoms);
  let cation = null;
  let anion = null;

  // Find the cation (metal or NH4+)
  if (formula.includes("NH4")) {
    cation = { symbol: "NH4", charge: 1 };
  } else {
    for (const el of elements) {
      if (isMetal(el)) {
        cation = { symbol: el, charge: getMetalCharge(el) || 2 };
        break;
      }
    }
    // H as cation for acids
    if (!cation && atoms.H) {
      cation = { symbol: "H", charge: 1 };
    }
  }

  // Find the anion — try polyatomic ions first (longest match)
  const sortedPolyIons = Object.keys(POLYATOMIC_IONS)
    .sort((a, b) => b.length - a.length);

  for (const ionKey of sortedPolyIons) {
    const ionAtoms = parseFormula(ionKey);
    if (!ionAtoms) continue;

    // Check if all ion atoms are present
    const cationSymbol = cation?.symbol || "";
    const remaining = { ...atoms };
    // Remove cation atoms
    if (cationSymbol && cationSymbol !== "NH4" && remaining[cationSymbol]) {
      delete remaining[cationSymbol];
    }
    if (cationSymbol === "NH4") {
      // NH4+ is a cation, separate from anion detection
    }
    if (cationSymbol === "H") {
      // Don't remove H entirely — some may be in anion (like HCO3, HSO4)
    }

    // Check if the anion matches
    const ionElements = Object.keys(ionAtoms);
    let matches = true;
    for (const el of ionElements) {
      if (!atoms[el]) { matches = false; break; }
    }
    if (matches && ionKey !== "OH" || (ionKey === "OH" && atoms.O && atoms.H)) {
      // Verify the anion makes stoichiometric sense
      if (formula.includes(`(${ionKey})`) || formulaContainsIon(formula, ionKey)) {
        anion = ionKey;
        break;
      }
    }
  }

  // If no polyatomic ion found, try simple monatomic anions
  if (!anion) {
    for (const el of elements) {
      if (!isMetal(el) && el !== "H" && el !== "O") {
        if (HALOGEN_SET.has(el) || getNonmetalCharge(el)) {
          anion = el;
          break;
        }
      }
    }
    // Special: just O could mean oxide
    if (!anion && atoms.O && elements.length === 2) {
      anion = "O";
    }
  }

  return { cation, anion };
}

/** Check if a formula contains a specific polyatomic ion */
function formulaContainsIon(formula, ionFormula) {
  // Direct substring (for simple cases like NaNO3 → NO3)
  if (formula.includes(ionFormula)) return true;
  // In parentheses: Ca(OH)2
  if (formula.includes(`(${ionFormula})`)) return true;
  return false;
}

// ============================================================
// 4) Nonmetal oxide → oxyacid mapping for synthesis
// ============================================================
const NONMETAL_OXIDE_TO_ACID = {
  "SO3":  "H2SO4",
  "SO2":  "H2SO3",
  "CO2":  "H2CO3",
  "N2O5": "HNO3",
  "N2O3": "HNO2",
  "P2O5": "H3PO4",
  "Cl2O7":"HClO4",
};

// ============================================================
// 5) Reaction Predictors
// ============================================================

/**
 * Predict synthesis products.
 * @param {string[]} reactants - Array of formula strings
 * @returns {{ products: string[], explanation: string } | { error: string }}
 */
function predictSynthesis(reactants) {
  if (reactants.length < 2) {
    return { error: "Synthesis requires at least two reactants." };
  }

  const classified = reactants.map(classifyCompound);

  // Pattern 1: Metal + Nonmetal → Binary ionic compound
  if (classified.length === 2) {
    const metal = classified.find(c => c.type === "element" && c.isMetal);
    const nonmetal = classified.find(c => c.type === "element" && !c.isMetal);

    if (metal && nonmetal) {
      const mCharge = getMetalCharge(metal.symbol);
      const nmCharge = getNonmetalCharge(nonmetal.symbol);

      if (mCharge && nmCharge) {
        const product = buildIonicFormula(
          { symbol: metal.symbol, charge: mCharge },
          { formula: nonmetal.symbol, charge: nmCharge },
        );
        return {
          products: [product],
          explanation: ct("predictor.reasonSynthesisBinary", `Metal (${metal.symbol}) + nonmetal (${nonmetal.symbol}) combine to form an ionic compound.`, { m: metal.symbol, nm: nonmetal.symbol }),
        };
      }
    }

    // Pattern 2: Metal oxide + H2O → Metal hydroxide
    const metalOxide = classified.find(c => c.type === "metal_oxide");
    const water = classified.find(c => c.type === "water");

    if (metalOxide && water) {
      const charge = getMetalCharge(metalOxide.metal) || 2;
      const product = buildIonicFormula(
        { symbol: metalOxide.metal, charge },
        { formula: "OH", charge: -1 },
      );
      return {
        products: [product],
        explanation: `Metal oxide (${metalOxide.formula}) + water → metal hydroxide.`,
      };
    }

    // Pattern 3: Nonmetal oxide + H2O → Oxyacid
    const nmOxide = classified.find(c => c.type === "nonmetal_oxide");
    if (nmOxide && water) {
      const acidFormula = NONMETAL_OXIDE_TO_ACID[nmOxide.formula];
      if (acidFormula) {
        return {
          products: [acidFormula],
          explanation: `Nonmetal oxide (${nmOxide.formula}) + water → oxyacid.`,
        };
      }
      return { error: `Unsupported nonmetal oxide synthesis: ${nmOxide.formula} + H₂O.` };
    }

    // Pattern 4: Nonmetal + Nonmetal Synthesis (Specific common cases)
    const nm1 = classified[0];
    const nm2 = classified[1];
    
    if (nm1.type === "element" && nm2.type === "element" && !nm1.isMetal && !nm2.isMetal) {
      const sym1 = nm1.symbol;
      const sym2 = nm2.symbol;
      const set = new Set([sym1, sym2]);

      // H2 + O2 -> H2O
      if (set.has("H") && set.has("O")) {
        return { products: ["H2O"], explanation: ct("predictor.reasonSynthesisWater", "Hydrogen and oxygen combust/synthesize to form water.") || "Hydrogen and oxygen synthesize to form water." };
      }
      // H2 + Halogen -> HX
      const halogen = (isHalogen(sym1) && sym1) || (isHalogen(sym2) && sym2);
      if (set.has("H") && halogen) {
        return { products: ["H" + halogen], explanation: ct("predictor.reasonSynthesisAcid", `Hydrogen and a halogen (${halogen}) synthesize to form hydrogen halide.`, { halogen }) || `Hydrogen and halogen synthesize to form a hydrogen halide.` };
      }
      // H2 + N2 -> NH3
      if (set.has("H") && set.has("N")) {
        return { products: ["NH3"], explanation: ct("predictor.reasonSynthesisAmmonia", "Hydrogen and nitrogen synthesize to form ammonia.") || "Hydrogen and nitrogen synthesize to form ammonia." };
      }
      // Nonmetal + Oxygen -> Oxide (Combustion-like synthesis)
      if (set.has("O")) {
        const otherNm = sym1 === "O" ? sym2 : sym1;
        const oxideMap = { "C": "CO2", "S": "SO2", "P": "P2O5", "N": "NO2" };
        if (oxideMap[otherNm]) {
          return { products: [oxideMap[otherNm]], explanation: ct("predictor.reasonSynthesisOxide", `${otherNm} synthesizes with oxygen to form ${oxideMap[otherNm]}`) || "Nonmetal synthesizes with oxygen to form a nonmetal oxide." };
        }
      }
    }
  }

  return { error: "These reactants do not match a supported synthesis pattern." };
}

/**
 * Predict decomposition products.
 * @param {string[]} reactants
 */
function predictDecomposition(reactants) {
  if (reactants.length !== 1) {
    return { error: "Decomposition requires exactly one reactant." };
  }

  const c = classifyCompound(reactants[0]);

  // Pattern 1: Water → H2 + O2
  if (c.type === "water") {
    return {
      products: ["H2", "O2"],
      explanation: "Water decomposes into hydrogen gas and oxygen gas.",
    };
  }

  // Pattern 2: Metal carbonate → Metal oxide + CO2
  if (c.type === "carbonate" && c.cation) {
    const charge = c.cation.charge || getMetalCharge(c.cation.symbol) || 2;
    const oxide = buildIonicFormula(
      { symbol: c.cation.symbol, charge },
      { formula: "O", charge: -2 },
    );
    return {
      products: [oxide, "CO2"],
      explanation: `Metal carbonate (${c.formula}) decomposes into a metal oxide and carbon dioxide.`,
    };
  }

  // Pattern 3: Metal hydrogen carbonate → Metal carbonate + H2O + CO2
  if (c.type === "hydrogen_carbonate" && c.cation) {
    const charge = c.cation.charge || getMetalCharge(c.cation.symbol) || 1;
    const carbonate = buildIonicFormula(
      { symbol: c.cation.symbol, charge },
      { formula: "CO3", charge: -2 },
    );
    return {
      products: [carbonate, "H2O", "CO2"],
      explanation: `Metal hydrogen carbonate (${c.formula}) decomposes into a metal carbonate, water, and carbon dioxide.`,
    };
  }

  // Pattern 4: Metal hydroxide → Metal oxide + H2O
  if (c.type === "hydroxide" && c.cation) {
    const charge = c.cation.charge || getMetalCharge(c.cation.symbol) || 2;
    const oxide = buildIonicFormula(
      { symbol: c.cation.symbol, charge },
      { formula: "O", charge: -2 },
    );
    return {
      products: [oxide, "H2O"],
      explanation: `Metal hydroxide (${c.formula}) decomposes into a metal oxide and water.`,
    };
  }

  // Pattern 5: Binary compound → elements
  if (c.type === "ionic" && c.cation && c.anion) {
    const elements = Object.keys(c.atoms);
    if (elements.length === 2) {
      const products = elements.map(elementFormula);
      return {
        products,
        explanation: `Binary compound (${c.formula}) decomposes into its constituent elements.`,
      };
    }
  }

  // Pattern 6: Metal oxide → metal + O2
  if (c.type === "metal_oxide") {
    return {
      products: [c.metal, "O2"],
      explanation: `Metal oxide (${c.formula}) decomposes into the metal and oxygen gas.`,
    };
  }

  return { error: `Unsupported decomposition pattern for ${c.formula}. Cannot determine products.` };
}

/**
 * Predict single displacement products.
 * @param {string[]} reactants - Should be [element, compound] or [compound, element]
 */
function predictSingleDisplacement(reactants) {
  if (reactants.length !== 2) {
    return { error: "Single displacement requires exactly two reactants: an element and a compound." };
  }

  const classified = reactants.map(classifyCompound);
  const element = classified.find(c => c.type === "element");
  const compound = classified.find(c => c.type !== "element");

  if (!element || !compound) {
    return { error: "Single displacement requires one element and one compound." };
  }

  // === Metal displacing metal from ionic compound or acid ===
  if (element.isMetal) {
    // Case A: Metal + Acid → Salt + H2
    if (compound.type === "acid") {
      const metalSym = element.symbol;
      const reactivity = isMoreReactive(metalSym, "H");

      if (reactivity === false) {
        return { noReaction: true, explanation: `${metalSym} is less reactive than hydrogen in the activity series. No reaction occurs.` };
      }
      if (reactivity === null) {
        return { error: `Cannot determine reactivity of ${metalSym} — not in the supported activity series.` };
      }

      const charge = getMetalCharge(metalSym) || 2;
      const salt = buildIonicFormula(
        { symbol: metalSym, charge },
        compound.anion,
      );
      return {
        products: [salt, "H2"],
        explanation: `${metalSym} is more reactive than hydrogen, so it displaces H₂ from the acid.`,
      };
    }

    // Case B: Metal + Ionic compound → new compound + displaced metal
    if (compound.type === "ionic" || compound.type === "carbonate" || compound.type === "hydroxide") {
      const compoundCation = compound.cation;
      if (!compoundCation) {
        return { error: `Cannot identify the cation in ${compound.formula}.` };
      }
      const metalSym = element.symbol;
      const displacedMetal = compoundCation.symbol;

      const reactivity = isMoreReactive(metalSym, displacedMetal);
      if (reactivity === false) {
        return { noReaction: true, explanation: `${metalSym} is less reactive than ${displacedMetal} in the activity series. No reaction occurs.` };
      }
      if (reactivity === null) {
        return { error: `Cannot determine reactivity between ${metalSym} and ${displacedMetal}.` };
      }

      // Prefer the replacing metal's natural charge for accurate valid cross (e.g., Al is always +3)
      // fallback to the displaced cation's charge, then 2.
      const charge = getMetalCharge(metalSym) || compoundCation.charge || 2;
      const newCompound = buildIonicFormula(
        { symbol: metalSym, charge },
        compound.anion,
      );
      const displacedSpecies = elementFormula(displacedMetal);
      return {
        products: [newCompound, displacedSpecies],
        explanation: `${metalSym} is more reactive than ${displacedMetal}, so it displaces ${displacedMetal} from the compound.`,
      };
    }
  }

  // === Halogen displacing halogen from halide salt ===
  if (element.isHalogen) {
    if (compound.type === "ionic" && compound.anion && HALOGEN_SET.has(compound.anion.formula)) {
      const incoming = element.symbol;
      const existing = compound.anion.formula;

      const reactivity = isHalogenMoreReactive(incoming, existing);
      if (reactivity === false) {
        return { noReaction: true, explanation: `${incoming} is less reactive than ${existing}. No displacement occurs.` };
      }
      if (reactivity === null) {
        return { error: `Cannot determine halogen reactivity between ${incoming} and ${existing}.` };
      }

      const newSalt = buildIonicFormula(
        compound.cation,
        { formula: incoming, charge: -1 },
      );
      const displacedHalogen = elementFormula(existing);
      return {
        products: [newSalt, displacedHalogen],
        explanation: `${incoming} is more reactive than ${existing}, so it displaces ${existing} from the salt.`,
      };
    }
  }

  return { error: "These reactants do not match a supported single displacement pattern." };
}

/**
 * Predict double displacement products.
 * @param {string[]} reactants - Should be two ionic compounds (or acid/base)
 */
function predictDoubleDisplacement(reactants) {
  if (reactants.length !== 2) {
    return { error: "Double displacement requires exactly two reactants." };
  }

  const classified = reactants.map(classifyCompound);

  // Both must have cation + anion info
  const c1 = classified[0];
  const c2 = classified[1];

  if (!c1.cation || !c1.anion || !c2.cation || !c2.anion) {
    return { error: "Double displacement requires two ionic compounds or an acid and a base." };
  }

  // Swap partners: c1's cation + c2's anion, c2's cation + c1's anion
  const cat1 = c1.cation;
  const an1 = c1.anion;
  const cat2 = c2.cation;
  const an2 = c2.anion;

  // Build new compounds
  const product1Formula = buildIonicFormula(cat1, an2);
  const product2Formula = buildIonicFormula(cat2, an1);

  // Check for reaction drivers
  const products = [];
  const extras = [];
  let hasDriver = false;

  // Check if H + OH → H2O (neutralization)
  if ((cat1.symbol === "H" && an2.formula === "OH") || (cat2.symbol === "H" && an1.formula === "OH")) {
    hasDriver = true;
  }

  // Check if product decomposes: H2CO3 → H2O + CO2
  const p1Class = classifyCompound(product1Formula);
  const p2Class = classifyCompound(product2Formula);

  let finalProducts = [];

  // Check for unstable acids that decompose
  for (const [pFormula, pClass] of [[product1Formula, p1Class], [product2Formula, p2Class]]) {
    if (pFormula === "H2CO3" || (pClass.type === "acid" && pClass.atoms?.C && pClass.atoms?.O)) {
      // H2CO3 → H2O + CO2
      if (pFormula === "H2CO3") {
        finalProducts.push("H2O", "CO2");
        hasDriver = true;
        continue;
      }
    }
    if (pFormula === "H2SO3") {
      // H2SO3 → H2O + SO2
      finalProducts.push("H2O", "SO2");
      hasDriver = true;
      continue;
    }
    // NH4OH → NH3 + H2O (ammonium hydroxide decomposes)
    if (pFormula === "NH4OH" || pFormula === "(NH4)(OH)" || pFormula === "(NH4)OH") {
      finalProducts.push("NH3", "H2O");
      hasDriver = true;
      continue;
    }
    // H2O is a product — that's a driver
    if (pFormula === "H2O" || pFormula === "HOH") {
      finalProducts.push("H2O");
      hasDriver = true;
      continue;
    }
    finalProducts.push(pFormula);
  }

  // Check for precipitate formation
  if (!hasDriver) {
    const p1Soluble = isSoluble(cat1.symbol, an2);
    const p2Soluble = isSoluble(cat2.symbol, an1);
    if (!p1Soluble || !p2Soluble) {
      hasDriver = true; // precipitate forms
    }
  }

  if (!hasDriver) {
    return {
      noReaction: true,
      explanation: "No driving force: both products remain soluble, and no gas, water, or precipitate is formed.",
    };
  }

  // Deduplicate products (in case H2O appears twice)
  const seen = new Set();
  const dedupedProducts = [];
  for (const p of finalProducts) {
    if (!seen.has(p)) {
      seen.add(p);
      dedupedProducts.push(p);
    }
  }

  return {
    products: dedupedProducts,
    explanation: `The cations and anions swap partners in a double displacement reaction.`,
  };
}

/**
 * Predict combustion products.
 * @param {string[]} reactants
 */
function predictCombustion(reactants) {
  // Find the fuel and ensure O2 is present
  const classified = reactants.map(classifyCompound);
  const o2 = classified.find(c => c.type === "element" && c.symbol === "O");
  const fuel = classified.find(c => c.type !== "element" || c.symbol !== "O");

  if (!fuel) {
    return { error: "Combustion requires a fuel compound." };
  }

  // If O2 is not explicitly provided, auto-add it
  let needsO2Added = false;
  if (!o2) {
    needsO2Added = true;
  }

  const fuelAtoms = fuel.atoms;
  if (!fuelAtoms) {
    return { error: `Cannot parse the fuel formula "${fuel.formula}".` };
  }

  // Must contain carbon and/or hydrogen to be a school-level combustion
  if (!fuelAtoms.C && !fuelAtoms.H) {
    return { error: `These reactants do not match a supported combustion pattern. Combustion of hydrocarbons requires a compound containing carbon and/or hydrogen.` };
  }

  const products = [];
  if (fuelAtoms.C) products.push("CO2");
  if (fuelAtoms.H) products.push("H2O");

  // If fuel has other elements (like S, N), we don't handle those in school scope
  const otherElements = Object.keys(fuelAtoms).filter(e => !["C", "H", "O"].includes(e));
  if (otherElements.length > 0) {
    return { error: `Combustion of compounds containing ${otherElements.join(", ")} is not supported in school-level prediction.` };
  }

  return {
    products,
    explanation: fuelAtoms.C && fuelAtoms.H
      ? `A hydrocarbon (${fuel.formula}) combusts completely in oxygen to produce CO₂ and H₂O.`
      : `Combustion produces ${products.join(" and ")}.`,
    autoAddO2: needsO2Added,
  };
}

// ============================================================
// 6) Main Prediction API
// ============================================================

const REACTION_HANDLERS = {
  synthesis: predictSynthesis,
  decomposition: predictDecomposition,
  single_displacement: predictSingleDisplacement,
  double_displacement: predictDoubleDisplacement,
  combustion: predictCombustion,
};

/**
 * Main entry point for reaction prediction.
 * @param {string} reactantInput - Raw reactant string, e.g. "Na + Cl2"
 * @param {string} reactionType - One of: synthesis, decomposition, single_displacement, double_displacement, combustion
 * @returns {{ success, balancedEquation, products, explanation, error, noReaction }}
 */
export function predictReaction(reactantInput, reactionType) {
  if (!reactantInput || !reactantInput.trim()) {
    return { success: false, error: "Please enter reactant formulas." };
  }

  const handler = REACTION_HANDLERS[reactionType];
  if (!handler) {
    return { success: false, error: `Unknown reaction type: "${reactionType}".` };
  }

  // Parse reactant input: normalize first (Zero-to-O sanitizer, etc.) then split by +
  const normalizedInput = normalizeText(reactantInput);
  const reactants = normalizedInput
    .replace(/[·.]/g, "•")                    // normalize hydrate dots
    .split(/\s*\+\s*/)                         // split on +
    .map(s => s.trim())
    .filter(Boolean);

  if (reactants.length === 0) {
    return { success: false, error: "No valid reactant formulas found." };
  }

  // Validate each reactant formula can be parsed
  for (const r of reactants) {
    try {
      parseFormulaStrict(r);
    } catch (e) {
      return { success: false, error: `Invalid formula "${r}": ${e.message}` };
    }
  }

  // Run the reaction-type-specific predictor
  const prediction = handler(reactants);

  // Handle errors and no-reaction
  if (prediction.error) {
    return { success: false, error: prediction.error };
  }
  if (prediction.noReaction) {
    return { success: false, noReaction: true, explanation: prediction.explanation };
  }

  // Build the full equation
  let fullReactants = [...reactants];
  if (prediction.autoAddO2 && !reactants.some(r => r === "O2")) {
    fullReactants.push("O2");
  }
  const productFormulas = prediction.products;

  // Validate product formulas
  for (const p of productFormulas) {
    try {
      parseFormulaStrict(p);
    } catch (e) {
      return {
        success: false,
        error: `Internal prediction error: generated invalid product formula "${p}". ${e.message}`,
      };
    }
  }

  // Hand off to the robust balancer
  try {
    const balResult = balanceEquation(
      { reactants: fullReactants, products: productFormulas },
      { chemistryValidator: demoChemistryValidator },
    );

    const balancedStr = balResult.formatted
      .replace(/->/g, "→");

    return {
      success: true,
      reactants: fullReactants,
      products: productFormulas,
      balancedEquation: balancedStr,
      balancedResult: balResult,
      explanation: prediction.explanation,
    };
  } catch (balErr) {
    // If balancing fails, the prediction rule might have an issue
    // Still show the products but indicate balancing failed
    const unbalanced = fullReactants.join(" + ") + " → " + productFormulas.join(" + ");
    return {
      success: true,
      reactants: fullReactants,
      products: productFormulas,
      balancedEquation: null,
      unbalancedEquation: unbalanced,
      explanation: prediction.explanation,
      balancingError: `Prediction succeeded but auto-balancing failed: ${balErr.message}`,
    };
  }
}

/** Get supported reaction types with display info */
export function getReactionTypes() {
  return [
    {
      id: "synthesis",
      label: "Synthesis",
      icon: "⊕",
      description: "Two or more substances combine to form one product.",
      example: "Na + Cl₂ → NaCl",
    },
    {
      id: "decomposition",
      label: "Decomposition",
      icon: "⊖",
      description: "One compound breaks down into simpler substances.",
      example: "CaCO₃ → CaO + CO₂",
    },
    {
      id: "single_displacement",
      label: "Single Displacement",
      icon: "⇄",
      description: "An element replaces another in a compound.",
      example: "Zn + HCl → ZnCl₂ + H₂",
    },
    {
      id: "double_displacement",
      label: "Double Displacement",
      icon: "⇆",
      description: "Two compounds exchange ions to form new products.",
      example: "AgNO₃ + NaCl → AgCl + NaNO₃",
    },
    {
      id: "combustion",
      label: "Combustion",
      icon: "🔥",
      description: "A fuel reacts with oxygen to produce CO₂ and H₂O.",
      example: "CH₄ + O₂ → CO₂ + H₂O",
    },
  ];
}
