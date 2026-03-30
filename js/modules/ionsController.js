// =============================================================================
// Ions Controller - Ions Page Table & Modal
// Extracted from script.js: formatChem, formatCharge, initIonsTable
// =============================================================================

import { ionsData } from "../data/ionsData.js";
import { initCardSlider } from "./cardSliderController.js";
import {
  fetchIonLocale,
  getLang,
  ionLocales,
  onLangChange,
  t,
} from "./langController.js";

const ION_TABLE_SECTION_ORDER = ["basic", "core", "trans", "special"];
const ION_GROUPS_BY_SECTION = {
  basic: [
    "basic_cat1",
    "basic_cat2",
    "basic_cat3",
    "basic_an1",
    "basic_an2",
    "basic_an3",
  ],
  core: ["core_c", "core_n", "core_s", "core_p", "core_cl"],
  trans: ["trans_cu", "trans_fe", "trans_pb", "trans_mn", "trans_cr"],
  special: ["spec_pair", "spec_acid", "spec_org"],
};

const ION_GROUP_COLORS = {
  basic_cat1: "#FFCDD2",
  basic_cat2: "#FFCC80",
  basic_cat3: "#FFF59D",
  basic_an1: "#B2EBF2",
  basic_an2: "#BBDEFB",
  basic_an3: "#E1BEE7",
  core_c: "#CFD8DC",
  core_n: "#F8BBD0",
  core_s: "#DCEDC8",
  core_p: "#D1C4E9",
  core_cl: "#B9F6CA",
  trans_cu: "#FFAB91",
  trans_fe: "#BCAAA4",
  trans_pb: "#EEEEEE",
  trans_mn: "#E1BEE7",
  trans_cr: "#FFE082",
  spec_pair: "#B2DFDB",
  spec_acid: "#F0F4C3",
  spec_org: "#D7CCC8",
};

const IONS_BY_ID = new Map(ionsData.map((ion) => [ion.id, ion]));
let ionLangSyncBound = false;
let activeIonId = null;
let ionNameResizeBound = false;
let ionNameFitRaf = 0;

function containsCjkScript(text = "") {
  return /[\u3400-\u9fff\uf900-\ufaff]/.test(text);
}

function mergeIonCustomData(baseData = {}, localeData = {}) {
  if (!localeData) return baseData;
  const merged = structuredClone(baseData);

  ["level1", "level2", "level3", "level4"].forEach((levelKey) => {
    if (!localeData[levelKey]) return;
    merged[levelKey] = {
      ...(merged[levelKey] || {}),
      ...localeData[levelKey],
    };
  });

  return merged;
}

function getLocalizedIon(ion, langCode = getLang()) {
  const localeEntry = ionLocales[langCode]?.[ion.id];
  if (!localeEntry) return ion;

  return {
    ...ion,
    name: localeEntry.name || ion.name,
    headlineName: localeEntry.headlineName || localeEntry.name || ion.name,
    customData: mergeIonCustomData(ion.customData, localeEntry.customData),
  };
}

function parseKeyCompoundList(value) {
  if (Array.isArray(value)) return value;
  if (typeof value !== "string") return [];

  return value.split(", ").map((compound) => {
    const match = compound.match(/^(.+) \((.+)\)$/);
    if (match) {
      return { formula: match[1], name: match[2] };
    }
    return { formula: compound, name: "" };
  });
}

function parseInfoList(value) {
  if (Array.isArray(value)) {
    return value.map((item) => `${item}`.trim()).filter(Boolean);
  }
  if (typeof value !== "string") return [];
  return value
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean);
}

function ensureIonLangSync() {
  if (ionLangSyncBound) return;
  ionLangSyncBound = true;

  onLangChange((code) => {
    Promise.resolve(fetchIonLocale(code)).finally(() => {
      const container = document.getElementById("ions-table");
      if (container) {
        initIonsTable();
      }

      const modal = document.getElementById("ion-modal");
      if (modal?.classList.contains("active") && activeIonId) {
        const ion = IONS_BY_ID.get(activeIonId);
        if (ion) openIonModal(ion);
      }
    });
  });
}

// Helper to format chemical formulas from Unicode to HTML
function formatChem(str) {
  if (!str) return "";
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
  const supMap = {
    "⁺": "+",
    "⁻": "-",
    "⁰": "0",
    "¹": "1",
    "²": "2",
    "³": "3",
    "⁴": "4",
    "⁵": "5",
    "⁶": "6",
    "⁷": "7",
    "⁸": "8",
    "⁹": "9",
  };

  return str
    .split("")
    .map((char) => {
      if (subMap[char]) return `<sub>${subMap[char]}</sub>`;
      if (supMap[char]) return `<sup>${supMap[char]}</sup>`;
      return char;
    })
    .join("");
}

// Helper to format charge string (e.g. "2+") to superscript HTML
function formatCharge(str) {
  if (!str) return "";
  return `<sup>${str}</sup>`;
}

function bindIonTableInteractions(container) {
  if (!container || container.dataset.ionInteractionsBound === "true") return;

  container.addEventListener("click", (event) => {
    const cell = event.target.closest(".element[data-ion-id]");
    if (!cell || !container.contains(cell)) return;

    const ion = IONS_BY_ID.get(cell.dataset.ionId);
    if (ion) openIonModal(ion);
  });

  container.dataset.ionInteractionsBound = "true";
}

function fitTextToWidth(el, { minPx = 12 } = {}) {
  if (!el) return;

  el.style.whiteSpace = "nowrap";
  el.style.overflow = "hidden";
  el.style.fontSize = "";

  const maxWidth = el.clientWidth;
  if (!maxWidth) return;

  let low = minPx;
  let high = Math.max(
    Math.round(parseFloat(window.getComputedStyle(el).fontSize) || minPx),
    minPx,
  );
  let best = high;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    el.style.fontSize = `${mid}px`;

    if (el.scrollWidth <= maxWidth) {
      best = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  el.style.fontSize = `${best}px`;
}

function measureIonNameHeight(nameEl, fontPx, linePx) {
  const width = nameEl.clientWidth || nameEl.getBoundingClientRect().width;
  if (!width) return 0;

  const clone = nameEl.cloneNode(true);
  clone.style.position = "fixed";
  clone.style.left = "-9999px";
  clone.style.top = "-9999px";
  clone.style.display = "block";
  clone.style.width = `${width}px`;
  clone.style.height = "auto";
  clone.style.minHeight = "0";
  clone.style.maxHeight = "none";
  clone.style.overflow = "visible";
  clone.style.whiteSpace = "normal";
  clone.style.webkitLineClamp = "unset";
  clone.style.lineClamp = "unset";
  clone.style.webkitBoxOrient = "initial";
  clone.style.fontSize = `${fontPx}px`;
  clone.style.lineHeight = `${linePx}px`;

  document.body.appendChild(clone);
  const height = clone.getBoundingClientRect().height;
  clone.remove();
  return height;
}

function configureIonNameStyles(nameEl, { fontPx, linePx, lineLimit }) {
  nameEl.style.fontSize = `${fontPx.toFixed(2)}px`;
  nameEl.style.lineHeight = `${linePx.toFixed(2)}px`;
  nameEl.style.webkitLineClamp = `${lineLimit}`;
  nameEl.style.lineClamp = `${lineLimit}`;
  nameEl.style.maxHeight = `${(linePx * lineLimit + 1).toFixed(2)}px`;
}

function getMaxFittingIonSymbolScale(cell, symbolEl) {
  if (!cell || !symbolEl) return 1;

  const cellRect = cell.getBoundingClientRect();
  const cellStyle = window.getComputedStyle(cell);
  const paddingX =
    (parseFloat(cellStyle.paddingLeft) || 0) +
    (parseFloat(cellStyle.paddingRight) || 0);
  const maxAllowedWidth = Math.max(12, cellRect.width - paddingX - 2);

  let low = 0.52;
  let high = 1;
  let best = low;

  for (let i = 0; i < 12; i += 1) {
    const scale = (low + high) / 2;
    cell.style.setProperty("--ion-symbol-scale", `${scale}`);
    const symbolWidth = symbolEl.getBoundingClientRect().width;

    if (symbolWidth <= maxAllowedWidth + 0.5) {
      best = scale;
      low = scale + 0.01;
    } else {
      high = scale - 0.01;
    }
  }

  return Math.max(0.52, Math.min(1, best));
}

function ionNameFitsInCell(cell, nameEl) {
  const cellRect = cell.getBoundingClientRect();
  const nameRect = nameEl.getBoundingClientRect();
  const cellStyle = window.getComputedStyle(cell);
  const paddingBottom = parseFloat(cellStyle.paddingBottom) || 0;
  const paddingTop = parseFloat(cellStyle.paddingTop) || 0;
  const topFits = nameRect.top >= cellRect.top + paddingTop - 0.75;
  const bottomFits = nameRect.bottom <= cellRect.bottom - paddingBottom + 0.75;
  const contentFits = nameEl.scrollHeight <= nameEl.clientHeight + 1;
  const horizontalFits = nameEl.scrollWidth <= nameEl.clientWidth + 0.5;
  return topFits && bottomFits && contentFits && horizontalFits;
}

function getIonNameFitProfile(text, isCjk) {
  const length = text.length;
  const hasParenthetical = /[()（）]/.test(text);
  const hasWhitespace = /\s/.test(text);
  const isLongCjk = isCjk && length >= 4;
  const isLongLatin = !isCjk && (length >= 7 || hasParenthetical || hasWhitespace);

  if (isCjk) {
    return {
      lineOptions: isLongCjk ? [2] : [2],
      minSymbolScale: isLongCjk ? 0.7 : 0.88,
      minFontPx: isLongCjk ? 14 : 12,
      maxFontCap: isLongCjk ? 24 : 20,
      lineMultiplier: 1.04,
      widthFactorByLines: {
        2: isLongCjk ? 0.68 : 0.5,
      },
    };
  }

  // Latin text: always single line (nowrap), shrink font to fit
  return {
    lineOptions: [1],
    minSymbolScale: isLongLatin ? 0.6 : 0.82,
    minFontPx: isLongLatin ? 5 : 7,
    maxFontCap: isLongLatin ? 14.6 : 14,
    lineMultiplier: 1.1,
    widthFactorByLines: {
      1: isLongLatin ? 0.42 : 0.26,
      2: 0.22,
      3: 0.34,
    },
  };
}

function fitIonTableNames(container) {
  if (!container) return;

  container.querySelectorAll(".ion-table-cell .name").forEach((nameEl) => {
    nameEl.style.fontSize = "";
    nameEl.style.lineHeight = "";
    nameEl.style.webkitLineClamp = "";
    nameEl.style.lineClamp = "";
    nameEl.style.maxHeight = "";
    nameEl.style.whiteSpace = "normal";

    const cell = nameEl.closest(".ion-table-cell");
    if (!cell) return;

    const nameText = nameEl.textContent?.trim() || "";
    const isCjk = containsCjkScript(nameText);
    const length = nameText.length;

    // Chinese: 2 tiers + even wrapping
    if (isCjk) {
      cell.style.setProperty("--ion-symbol-scale", "1");
      if (length >= 4) {
        // Tier 2: slightly smaller for 4+ char names like 次氯酸根, 高锰酸根
        nameEl.style.fontSize = "clamp(0.62rem, 13cqi, 1rem)";
        // Force 2+2 split for exactly 4 chars
        if (length === 4) {
          const chars = [...nameText];
          nameEl.innerHTML = chars.slice(0, 2).join("") + "<br>" + chars.slice(2).join("");
        }
      } else {
        // Tier 1: normal size for short names (≤3 chars)
        nameEl.style.whiteSpace = "nowrap";
      }
      return;
    }

    // Non-CJK: 2 tiers — threshold at 10 chars to catch "Hypochlorite", "Дигидрофосфат" etc
    if (length >= 10) {
      nameEl.style.fontSize = "clamp(0.38rem, 11cqi, 0.74rem)";
      nameEl.style.lineHeight = "1.05";
      nameEl.style.whiteSpace = "normal";
      nameEl.style.wordBreak = "break-word";
      cell.style.setProperty("--ion-symbol-scale", "0.95");
    } else {
      nameEl.style.fontSize = "clamp(0.5rem, 14.5cqi, 1.1rem)";
      nameEl.style.lineHeight = "1.1";
      nameEl.style.whiteSpace = "nowrap";
      cell.style.setProperty("--ion-symbol-scale", "1");
    }
  });
}

function scheduleIonTableNameFit(container = document.getElementById("ions-table")) {
  if (!container) return;

  cancelAnimationFrame(ionNameFitRaf);
  Promise.resolve(document.fonts?.ready).finally(() => {
    ionNameFitRaf = requestAnimationFrame(() => fitIonTableNames(container));
  });
}

function ensureIonNameResizeSync() {
  if (ionNameResizeBound) return;
  ionNameResizeBound = true;

  window.addEventListener(
    "resize",
    () => {
      scheduleIonTableNameFit();
    },
    { passive: true },
  );
}

// Ion element sizing is now handled by CSS (5vw width + cqi units)

export async function initIonsTable() {
  const container = document.getElementById("ions-table");
  if (!container) return;
  ensureIonLangSync();
  ensureIonNameResizeSync();
  await fetchIonLocale(getLang());

  container.innerHTML = "";
  container.classList.add("ions-table-shell");
  bindIonTableInteractions(container);

  // Organize Data
  const sections = {};
  ionsData.forEach((ion) => {
    if (!sections[ion.section]) {
      sections[ion.section] = {
        name: ion.sectionName,
        groups: {},
      };
    }
    const sec = sections[ion.section];

    if (!sec.groups[ion.group]) {
      sec.groups[ion.group] = {
        name: ion.groupName,
        ions: [],
      };
    }
    sec.groups[ion.group].ions.push(ion);
  });

  // Render Sections in a fragment to avoid repeated live DOM work.
  const fragment = document.createDocumentFragment();

  ION_TABLE_SECTION_ORDER.forEach((secId) => {
    const secData = sections[secId];
    if (!secData) return;

    const sectionDiv = document.createElement("div");
    sectionDiv.className = "ion-table-section";

    // Section Header — use i18n key mapped from section id
    const SECTION_I18N = {
      basic: "ionSection.basicMonatomic",
      core: "ionSection.corePolyatomic",
      trans: "ionSection.transitionMetals",
      special: "ionSection.specialOrganic",
    };
    const secHeader = document.createElement("h3");
    secHeader.className = "ion-table-heading";
    secHeader.textContent = t(SECTION_I18N[secId]) || secData.name.replace(/^\d+\.\s*/, "");
    sectionDiv.appendChild(secHeader);

    // Single container for ALL ions in this section (Flattened)
    const sectionIonsContainer = document.createElement("div");
    sectionIonsContainer.className = "ion-table-grid";

    // Iterate through groups but render ions into the SAME container
    const groupList = ION_GROUPS_BY_SECTION[secId] || [];
    groupList.forEach((groupId) => {
      const groupData = secData.groups[groupId];
      if (!groupData) return;

      const groupDiv = document.createElement("div");
      groupDiv.className = "ion-table-group";

      const groupHeader = document.createElement("div");
      groupHeader.className = "ion-table-group-header";

      // Group Header — use i18n key mapped from group id
      const GROUP_I18N = {
        basic_cat1: "ionGroup.plus1Cations",
        basic_cat2: "ionGroup.plus2Cations",
        basic_cat3: "ionGroup.plus3Cations",
        basic_an1: "ionGroup.minus1Anions",
        basic_an2: "ionGroup.minus2Anions",
        basic_an3: "ionGroup.minus3Anions",
        core_c: "ionGroup.carbonPolyatomic",
        core_n: "ionGroup.nitrogenPolyatomic",
        core_s: "ionGroup.sulfurPolyatomic",
        core_p: "ionGroup.phosphorusPolyatomic",
        core_cl: "ionGroup.chlorinePolyatomic",
        trans_cu: "ionGroup.copperTransition",
        trans_fe: "ionGroup.ironTransition",
        trans_pb: "ionGroup.leadTransition",
        trans_mn: "ionGroup.manganeseTransition",
        trans_cr: "ionGroup.chromiumTransition",
        spec_pair: "ionGroup.commonPairs",
        spec_acid: "ionGroup.acidRelated",
        spec_org: "ionGroup.organic",
      };
      groupHeader.textContent = t(GROUP_I18N[groupId]) || groupData.name;
      groupDiv.appendChild(groupHeader);

      groupData.ions.forEach((ion) => {
        const localizedIon = getLocalizedIon(ion);
        const cell = document.createElement("div");
        cell.className = "element ion-table-cell";
        cell.dataset.ionId = ion.id;

        // apply Group-Specific Color (Overriding class-based colors)
        const bgColor = ION_GROUP_COLORS[groupId] || "#f0f0f0";
        cell.style.backgroundColor = bgColor;
        cell.style.borderColor = "rgba(0,0,0,0.1)";

        // Long formulas get a CSS class for smaller symbol text
        if (ion.id === "ch3coo_minus") {
          cell.classList.add("ion-long-formula");
        }

        // Build stacked notation: charge and subscript stacked vertically
        const chemHTML = formatChem(ion.symbol);
        const chargeHTML = formatCharge(ion.charge);

        // Match pattern: extract base symbol and LAST subscript
        const subMatch = chemHTML.match(/^(.+)<sub>([^<]+)<\/sub>$/);
        let symbolContent;

        if (subMatch) {
          // Has subscript - create stacked layout (charge on top, subscript on bottom)
          const baseSymbol = subMatch[1];
          const subText = subMatch[2];
          symbolContent = `
                            <span class="symbol-base">${baseSymbol}</span><span class="script-stack"><span class="script-sup">${chargeHTML}</span><span class="script-sub">${subText}</span></span>
                        `;
        } else {
          // No subscript - just symbol + superscript charge
          symbolContent = `${chemHTML}<sup class="ion-charge-sup">${chargeHTML}</sup>`;
        }

        const nameLen = Array.from(localizedIon.name).length;
        const nameClass = nameLen === 1 ? 'name name-single' : (nameLen === 2 ? 'name name-short' : 'name');
        cell.innerHTML = `
                        <span class="symbol">${symbolContent}</span>
                        <span class="${nameClass}">${localizedIon.name}</span>
                    `;

        sectionIonsContainer.appendChild(cell);
      });
    });

    sectionDiv.appendChild(sectionIonsContainer);
    fragment.appendChild(sectionDiv);
  });

  container.appendChild(fragment);
  scheduleIonTableNameFit(container);
}

// Ion slider shares the same global lock state as element slider for sync
// Uses: window.isLevelLocked, window.lockedLevelIndex (defined in element slider section)



function initIonSlider() {
  const slider = document.getElementById("ion-cards-slider");
  const dots = [...document.querySelectorAll("#ion-slider-dots .dot")];
  const slides = slider ? [...slider.querySelectorAll(".card-slide")] : [];
  const lockBtn = document.getElementById("ion-level-lock-btn");

  if (!slider || slides.length < 2) return;

  const maxIndex = Math.min(slides.length - 1, 3);

  initCardSlider({
    abortKey: "_ionSliderAbort",
    slider,
    dots,
    slides,
    lockButton: lockBtn,
    maxIndex,
    getInitialIndex: () => (
      window.isLevelLocked ? Math.min(window.lockedLevelIndex, maxIndex) : 0
    ),
    getLockState: () => ({
      locked: window.isLevelLocked,
      index: Math.min(window.lockedLevelIndex, maxIndex),
    }),
    setLockState: (locked, index) => {
      window.isLevelLocked = locked;
      window.lockedLevelIndex = index;
    },
    isModalActive: () => {
      const ionModal = document.getElementById("ion-modal");
      return !!ionModal?.classList.contains("active");
    },
    onIndexChange: (index) => {
    },
  });


}

function openIonModal(ion) {
  const modal = document.getElementById("ion-modal");
  if (!modal) return;
  activeIonId = ion.id;
  const localizedIon = getLocalizedIon(ion);

  // Reset Level 2 View to Standard (hide H+ grid if it was open)
  const standardL2 = document.getElementById("ion-l2-standard");
  const hPlusL2 = document.getElementById("ion-l2-h-plus");
  if (standardL2) standardL2.style.display = "block";
  if (hPlusL2) hPlusL2.style.display = "none";

  // Build the symbol with stacked notation (sub and sup aligned)
  // Check if symbol contains subscript characters
  const hasSubscript = /[₀₁₂₃₄₅₆₇₈₉]/.test(ion.symbol);

  let finalSymbol;
  if (ion.id === "ch3coo_minus") {
    // Special case for Acetate ion
    finalSymbol = 'CH<sub>3</sub>COO<sup class="ion-charge">-</sup>';
  } else if (hasSubscript) {
    // For ions with subscripts (like Cr₂O₇²⁻), use stacked notation
    // Extract the last subscript and stack it with charge
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

    // Find last subscript position
    let lastSubIdx = -1;
    let lastSubChars = "";
    for (let i = ion.symbol.length - 1; i >= 0; i--) {
      if (subMap[ion.symbol[i]]) {
        lastSubIdx = i;
        lastSubChars = subMap[ion.symbol[i]] + lastSubChars;
      } else if (lastSubIdx !== -1) {
        break;
      }
    }

    if (lastSubIdx !== -1) {
      // Get base part (before last subscript sequence)
      const basePart = ion.symbol.substring(
        0,
        lastSubIdx - lastSubChars.length + 1,
      );
      const baseHTML = formatChem(basePart);

      // Create stacked notation with charge on top, subscript on bottom
      finalSymbol =
        baseHTML +
        '<span class="chem-notation"><sup>' +
        ion.charge +
        "</sup><sub>" +
        lastSubChars +
        "</sub></span>";
    } else {
      finalSymbol =
        formatChem(ion.symbol) +
        '<sup class="ion-charge">' +
        ion.charge +
        "</sup>";
    }
  } else {
    // Simple ions without subscripts
    finalSymbol =
      formatChem(ion.symbol) +
      '<sup class="ion-charge">' +
      ion.charge +
      "</sup>";
  }

  const headlineSymbol = document.getElementById("ion-headline-symbol");
  headlineSymbol.innerHTML = finalSymbol;

  // Dynamic font size for symbol based on length
  const symbolLength = ion.id === "ch3coo_minus" ? 8 : ion.symbol.length;
  if (symbolLength > 5) {
    headlineSymbol.style.fontSize = "2.2rem";
    headlineSymbol.style.marginLeft = "-10px"; // Shift left for long symbols
  } else if (symbolLength > 3) {
    headlineSymbol.style.fontSize = "3.2rem";
    headlineSymbol.style.marginLeft = "-5px";
  } else {
    headlineSymbol.style.fontSize = "4.5rem";
    headlineSymbol.style.marginLeft = "0";
  }

  // Dynamic font size for headline name based on length
  const headlineName = document.getElementById("ion-headline-name");
  const baseHeadlineName = localizedIon.headlineName || localizedIon.name || ion.name;
  const fullName = baseHeadlineName;

  // Check if name is very long (like Dihydrogen Phosphate) - use scrolling effect
  if (fullName.length > 14) {
    headlineName.classList.add("scrolling-name");
    // Duplicate text for seamless loop
    headlineName.innerHTML = `<span class="scrolling-text"><span>${fullName}</span><span>${fullName}</span></span>`;
    headlineName.style.fontSize = "1.5rem";

    // Initialize animation after render
    setTimeout(() => {
      const textEl = headlineName.querySelector(".scrolling-text");
      if (!textEl) return;

      const halfWidth = textEl.scrollWidth / 2;
      const targetX = -halfWidth;
      const speed = halfWidth / 8000; // px/ms (Align with initial 8s duration)

      let player = textEl.animate(
        [
          { transform: "translateX(0)", offset: 0 },
          { transform: "translateX(0)", offset: 0.05 }, // Short wait (5%)
          { transform: `translateX(${targetX}px)`, offset: 0.95 },
          { transform: `translateX(${targetX}px)`, offset: 1 },
        ],
        {
          duration: 8000,
          easing: "ease-in-out",
          fill: "forwards",
          delay: 250, // Reduced delay
        },
      );

      headlineName.onmouseenter = () => {
        // Capture state BEFORE cancelling
        const style = window.getComputedStyle(textEl);
        const matrix = new DOMMatrix(style.transform);
        const currentX = matrix.m41;

        player.cancel();

        // Calculate remaining distance to target for smooth transition
        const dist = Math.abs(targetX - currentX);
        const duration = dist / speed;

        // Resume moving to target linearly
        player = textEl.animate(
          [
            { transform: `translateX(${currentX}px)` },
            { transform: `translateX(${targetX}px)` },
          ],
          {
            duration: duration > 0 ? duration : 0,
            easing: "linear",
          },
        );

        player.onfinish = () => {
          // Start infinite loop
          player = textEl.animate(
            [
              { transform: "translateX(0)" },
              { transform: `translateX(${targetX}px)` },
            ],
            {
              duration: 8000,
              easing: "linear",
              iterations: Infinity,
            },
          );
        };
      };

      headlineName.onmouseleave = () => {
        // Capture state BEFORE cancelling
        const style = window.getComputedStyle(textEl);
        const matrix = new DOMMatrix(style.transform);
        const currentX = matrix.m41;

        player.cancel();

        // Settle smoothly to target (start of second text) at normal speed
        const dist = Math.abs(targetX - currentX);
        // Use calculated duration based on constant speed
        const duration = dist / speed;

        player = textEl.animate(
          [
            { transform: `translateX(${currentX}px)` },
            { transform: `translateX(${targetX}px)` },
          ],
          {
            duration: duration > 0 ? duration : 0,
            easing: "linear", // Keep it steady
            fill: "forwards",
          },
        );
      };
    }, 50);
  } else {
    headlineName.classList.remove("scrolling-name");
    headlineName.textContent = fullName;
    headlineName.onmouseenter = null;
    headlineName.onmouseleave = null;

    // Adjust font size based on name length
    if (fullName.length > 10) {
      headlineName.style.fontSize = "1.8rem";
    } else {
      headlineName.style.fontSize = "2rem"; // Short names
    }
  }

  // Charge is now part of symbol, so we don't set separate charge text

  // Populate Info Card
  document.getElementById("ion-type").textContent =
    ion.type === "Cation" ? t("ionModal.cation") : t("ionModal.anion");
  document.getElementById("ion-category").textContent =
    ion.category === "Monatomic" ? t("ionModal.monatomic") : t("ionModal.polyatomic");
  document.getElementById("ion-charge-value").textContent = ion.charge;

  // Populate Additional Info
  const fromEl = document.getElementById("ion-from-element");
  if (fromEl) fromEl.textContent = ion.fromElement || "-";

  const formText = document.getElementById("ion-formation");
  if (formText) formText.innerHTML = formatChem(ion.formationEq) || "-";

  // ===== Custom Data Handling (H+, Li+, Na+, K+, Ag+, etc.) =====
  if (localizedIon.customData) {
    const cd = localizedIon.customData;

    // Level 1: Essentials - Auto-Fit Text
    const typeEl = document.getElementById("ion-type");
    const catEl = document.getElementById("ion-category");
    const phaseEl = document.getElementById("ion-phase");
    const chargeEl = document.getElementById("ion-charge-value");

    typeEl.textContent = cd.level1.type;
    catEl.textContent = cd.level1.source;
    if (phaseEl) phaseEl.textContent = cd.level1.phase;
    chargeEl.textContent = cd.level1.valence;

    // Apply fitting
    setTimeout(() => {
      fitTextToWidth(typeEl);
      fitTextToWidth(catEl);
      fitTextToWidth(phaseEl);
      fitTextToWidth(chargeEl);
    }, 0);

    // Key Compounds - Refactor to "Common Ions" style pills
    const formText = document.getElementById("ion-formation");
    if (formText) {
      const roleLabel = formText.parentElement.querySelector(".info-label");
      if (roleLabel) roleLabel.textContent = t("ionModal.keyCompounds");

      // Clear previous content
      formText.innerHTML = "";
      formText.style.background = "transparent";
      formText.style.padding = "0";
      formText.style.display = "flex";
      formText.style.flexDirection = "column";
      formText.style.gap = "8px";

      // Parse string: "HCl (Stomach Acid), H2SO4 (Battery Acid)"
      const compounds = parseKeyCompoundList(cd.level1.keyCompounds);
      compounds.forEach(({ formula, name }) => {

        const item = document.createElement("div");
        item.className = "ion-item";
        // Match common ions style exactly
        item.style.marginBottom = "0";
        item.style.width = "100%";
        item.style.boxSizing = "border-box";

        // Formatted Formula
        const fmtFormula = formatChem(formula);

        item.innerHTML = `
                        <span class="ion-symbol" style="font-size: 1.2rem;">${fmtFormula}</span>
                        <span class="ion-name" style="font-size: 0.95rem; opacity: 0.8;">${name}</span>
                    `;
        formText.appendChild(item);
      });
    }

    // Level 2: Identity & Visuals
    if (standardL2) standardL2.style.display = "none";
    if (hPlusL2) {
      hPlusL2.style.display = "flex";

      // Metrics
      if (document.getElementById("h-plus-molar-mass"))
        document.getElementById("h-plus-molar-mass").textContent =
          cd.level2.molarMass;

      // Parse "1 p+ | 0 e-"
      const subParts = cd.level2.subatomic.split("|");
      if (document.getElementById("h-plus-protons"))
        document.getElementById("h-plus-protons").textContent = subParts[0]
          ? subParts[0].trim()
          : "";
      if (document.getElementById("h-plus-electrons"))
        document.getElementById("h-plus-electrons").textContent =
          subParts[1] ? subParts[1].trim() : "";

      // Status Banner
      const waterStateLabel = document.querySelector(
        "#ion-l2-h-plus .h-plus-metric-row:last-child .h-plus-metric-label",
      );
      if (waterStateLabel) waterStateLabel.textContent = t("ionModal.status");
      if (document.getElementById("h-plus-water-state")) {
        const statusEl = document.getElementById("h-plus-water-state");
        statusEl.textContent = cd.level2.statusBanner;
        statusEl.style.color = "#B45309";
        statusEl.style.fontWeight = "700";
        // Auto-fit status text to prevent overflow
        setTimeout(() => fitTextToWidth(statusEl), 0);
      }

      // Visuals (Slot A & B)
      // Helper to update visual card with correct animation
      function updateVisualCard(cardId, dataSlot, slot) {
        const card = document.getElementById(cardId);
        if (!card) return;

        // Update Title
        const titleEl = card.querySelector(".visual-card-title");
        if (titleEl) titleEl.textContent = dataSlot.label;

        // Update Desc
        const descEl = card.querySelector(".visual-card-desc");
        if (descEl)
          descEl.innerHTML = `<b>${dataSlot.result}</b><br><span style='font-size:0.8em; opacity:0.8'>${dataSlot.desc}</span>`;


        // Remove old visual wrapper (both old and new system)
        // Remove ALL animation elements between title and desc - clean slate
        const titleEl2 = card.querySelector(".visual-card-title");
        const descEl2 = card.querySelector(".visual-card-desc");
        if (titleEl2 && descEl2) {
          // Remove everything between title and desc
          let nextEl = titleEl2.nextElementSibling;
          while (nextEl && nextEl !== descEl2) {
            const toRemove = nextEl;
            nextEl = nextEl.nextElementSibling;
            toRemove.remove();
          }
        }

        // Use new animation system
        if (typeof IonAnimations !== "undefined" && ion.id) {
          const animHTML = IonAnimations.getAnimation(ion.id, slot);
          if (animHTML && titleEl) {
            const wrapper = document.createElement("div");
            wrapper.innerHTML = animHTML;
            const animEl = wrapper.firstElementChild;
            if (animEl) titleEl.after(animEl);
          }
        }
      }

      // Update both slots dynamically
      updateVisualCard("litmus-visual-card", cd.level2.slotA, "slotA");
      updateVisualCard("reactivity-visual-card", cd.level2.slotB, "slotB");

      // Add fitting for slot descriptions
      const descA = document.querySelector(
        "#litmus-visual-card .visual-card-desc",
      );
      const descB = document.querySelector(
        "#reactivity-visual-card .visual-card-desc",
      );
      if (descA) setTimeout(() => fitTextToWidth(descA), 50);
      if (descB) setTimeout(() => fitTextToWidth(descB), 50);
    }

    // Level 3: Structure
    const l3Config = document.getElementById("ion-l3-config");
    if (l3Config) l3Config.textContent = cd.level3.config;

    // Ionic Radius (swapped from Electronegativity)
    const l3En = document.getElementById("ion-l3-en");
    if (l3En) {
      const label = l3En
        .closest(".l3-stat-item")
        .querySelector(".l3-stat-label");
      if (label) label.textContent = t("ionModal.ionicRadius");
      l3En.textContent = cd.level3.ionicRadius;
      const unit = l3En.nextElementSibling;
      if (unit) unit.textContent = "";
    }

    // Hydration Enthalpy (swapped from Ionization)
    const l3Ion = document.getElementById("ion-l3-ion");
    if (l3Ion) {
      const label = l3Ion
        .closest(".l3-stat-item")
        .querySelector(".l3-stat-label");
      if (label) label.textContent = t("ionModal.hydrationEnthalpy");
      l3Ion.textContent = cd.level3.hydrationEnthalpy;
    }

    // Oxidation State
    const l3Ox = document.getElementById("ion-l3-oxidation");
    if (l3Ox) {
      l3Ox.innerHTML = `<div class="ox-pill common">${cd.level3.oxidation}</div>`;
    }

    // Level 4 (Red Card) - History & STSE - Match Element Layout
    const l4Container = document.getElementById("ion-l4-container");
    const l4YearLabel = document.getElementById("ion-l4-year-label");
    const l4Year = document.getElementById("ion-l4-year");
    const l4Grid = document.getElementById("ion-l4-grid");
    const l4Uses = document.getElementById("ion-l4-uses");
    const l4Hazards = document.getElementById("ion-l4-hazards");

    // 1. History Section Top (Year, Discovery, Named By)
    if (l4YearLabel) l4YearLabel.textContent = t("ionModal.discoveryYear");
    if (l4Year) {
      l4Year.textContent = cd.level4.discoveryYear;
      l4Year.style.fontSize = "0.95rem";
    }

    // Inject "Discovered By" and "Named By" rows if they don't exist yet
    // Check if we already injected them (to avoid duplicates on re-open)
    let discoveredRow = l4Container.querySelector(".h-plus-discovered-row");

    if (!discoveredRow && l4Year && l4Year.parentElement) {
      // Create Discovered By Row
      discoveredRow = document.createElement("div");
      discoveredRow.className = "info-row h-plus-discovered-row";
      discoveredRow.style.marginBottom = "8px";
      discoveredRow.innerHTML = `
                    <span class="info-label">${t("ionModal.discoveredBy")}</span>
                    <span class="info-value" style="font-size: 0.95rem;">${cd.level4.discoveredBy}</span>
                `;
      l4Year.parentElement.after(discoveredRow);

      // Create Named By Row
      const namedRow = document.createElement("div");
      namedRow.className = "info-row h-plus-named-row";
      namedRow.style.marginBottom = "0";
      namedRow.innerHTML = `
                    <span class="info-label">${t("ionModal.namedBy")}</span>
                    <span class="info-value" style="font-size: 0.95rem;">${cd.level4.namedBy}</span>
                `;
      discoveredRow.after(namedRow);

      // Create Divider
      const divider = document.createElement("div");
      divider.className = "info-divider";
      divider.style.marginTop = "24px";
      divider.style.marginBottom = "24px";
      namedRow.after(divider);
    } else if (discoveredRow) {
      // Update content if rows exist
      discoveredRow.querySelector(".info-value").textContent =
        cd.level4.discoveredBy;
      discoveredRow.querySelector(".info-value").style.fontSize = "0.95rem";
      l4Year.style.fontSize = "0.95rem";

      const namedRow = l4Container.querySelector(".h-plus-named-row");
      if (namedRow) {
        namedRow.querySelector(".info-value").textContent =
          cd.level4.namedBy;
        namedRow.querySelector(".info-value").style.fontSize = "0.95rem";
      }
    }

    // 2. STSE Section (Top of Grid)
    if (l4Grid) {
      // Clean up old STSE if exists
      const oldStse = l4Grid.querySelector(".stse-card");
      if (oldStse) oldStse.remove();

      const stseCard = document.createElement("div");
      stseCard.className = "prop-cell full-width stse-card";
      // Element STSE style: Green background
      stseCard.style.cssText =
        "align-items: flex-start; justify-content: flex-start; flex-direction: column; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); padding: 10px 14px; height: auto; min-height: fit-content; gap: 6px;";

      const stseLines = parseInfoList(cd.level4.stse);
      const stseHtml = stseLines
        .map((line) => `<div>${line}</div>`)
        .join("");

      stseCard.innerHTML = `
                    <span class="prop-cell-label" style="color: #047857; margin: 0;">${t("ionModal.stseEnv")}</span>
                    <div class="stse-content" style="font-size: 0.9rem; font-weight: 600; line-height: 1.4; color: #064E3B; display: flex; flex-direction: column; gap: 2px;">
                        ${stseHtml}
                    </div>`;
      l4Grid.prepend(stseCard);
    }

    // 3. Uses & Hazards
    if (l4Uses) {
      l4Uses.innerHTML = parseInfoList(cd.level4.commonUses).join(" • ");
      l4Uses.style.fontSize = "0.95rem";
      l4Uses.style.fontWeight = "600";
      l4Uses.parentElement.style.alignItems = "flex-start";
      l4Uses.parentElement.style.flexDirection = "column";
    }

    if (l4Hazards) {
      l4Hazards.innerHTML = parseInfoList(cd.level4.hazards).join(" • ");
      l4Hazards.style.fontSize = "0.95rem";
      l4Hazards.style.fontWeight = "700";
      l4Hazards.style.color = "#991B1B";
      l4Hazards.parentElement.style.alignItems = "flex-start";
      l4Hazards.parentElement.style.flexDirection = "column";
    }
  } else if (ion.category === "Monatomic") {
    // ===== Standard Populate Level 2-4 for other Monatomic Ions =====
    const elemData = finallyData[ion.symbol];
    const elemInfo = elements.find((e) => e.symbol === ion.symbol);

    if (elemData && elemInfo) {
      const atomicNum = elemInfo.number;

      // Parse charge to calculate electrons
      let chargeValue = 0;
      const chargeStr = ion.charge;
      if (chargeStr.includes("+")) {
        chargeValue = parseInt(chargeStr.replace("+", "")) || 1;
      } else if (chargeStr.includes("-")) {
        chargeValue = -(parseInt(chargeStr.replace("-", "")) || 1);
      }
      const electronCount = atomicNum - chargeValue;

      // Level 2 (Yellow)
      const l2Mass = document.getElementById("ion-l2-mass");
      const l2Protons = document.getElementById("ion-l2-protons");
      const l2Electrons = document.getElementById("ion-l2-electrons");
      const l2Isotopes = document.getElementById("ion-l2-isotopes");

      if (l2Mass) l2Mass.textContent = elemData.avgAtomicMass || "--";
      if (l2Protons) l2Protons.textContent = atomicNum;
      if (l2Electrons) l2Electrons.textContent = electronCount;

      if (l2Isotopes && elemData.isotopes && elemData.isotopes.length > 0) {
        l2Isotopes.innerHTML = elemData.isotopes
          .slice(0, 3)
          .map(
            (iso) => `
                        <div class="ion-item">
                            <span class="ion-symbol"><sup>${iso.name.split("-")[1]}</sup>${ion.symbol}</span>
                            <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; line-height: 1;">
                                <span style="font-weight: 600; font-size: 0.95rem; margin-bottom: 2px;">${iso.neutron.replace("n", " n⁰")}</span>
                                <span style="font-size: 0.7rem; text-transform: uppercase; opacity: 0.6; font-weight: 700; letter-spacing: 0.5px; ${iso.percent === "Radioactive" ? "color: #B91C1C;" : ""}">${iso.percent}</span>
                            </div>
                        </div>
                    `,
          )
          .join("");
      }

      // Level 3 (Blue)
      const l3Config = document.getElementById("ion-l3-config");
      const l3En = document.getElementById("ion-l3-en");
      const l3Ion = document.getElementById("ion-l3-ion");
      const l3Oxidation = document.getElementById("ion-l3-oxidation");

      if (l3Config) l3Config.innerHTML = elemData.electronConfig || "--";
      if (l3En) l3En.textContent = elemData.electronegativity ?? "--";
      if (l3Ion) l3Ion.textContent = elemData.ionization || "--";

      if (l3Oxidation && elemData.oxidationStates) {
        let oxObj = elemData.oxidationStates;
        // Support both new {common, possible} and legacy flat array format
        if (Array.isArray(oxObj)) {
          oxObj = { common: oxObj.slice(0, 1), possible: oxObj.slice(1) };
        }
        const common = oxObj.common || [];
        const possible = oxObj.possible || [];
        l3Oxidation.innerHTML = 
          common.map(ox => `<div class="ox-pill common">${ox}</div>`).join("") +
          possible.map(ox => `<div class="ox-pill possible">${ox}</div>`).join("");
      }

      // Level 4 (Red)
      const l4Year = document.getElementById("ion-l4-year");
      const l4Uses = document.getElementById("ion-l4-uses");
      const l4Hazards = document.getElementById("ion-l4-hazards");

      if (l4Year) l4Year.textContent = elemData.discovery || "--";
      if (l4Uses) l4Uses.textContent = elemData.uses || "--";
      if (l4Hazards) l4Hazards.textContent = elemData.hazards || "--";
    }
  } else {
    // Reset to default for non-monatomic ions
    const resetIds = [
      "ion-l2-mass",
      "ion-l2-protons",
      "ion-l2-electrons",
      "ion-l3-config",
      "ion-l3-en",
      "ion-l3-ion",
      "ion-l4-year",
      "ion-l4-uses",
      "ion-l4-hazards",
    ];
    resetIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = "--";
    });
    const l2Isotopes = document.getElementById("ion-l2-isotopes");
    if (l2Isotopes)
      l2Isotopes.innerHTML =
        `<div class="ion-item" style="justify-content: center; opacity: 0.5; font-style: italic;"><span>${t("ionModal.comingSoon")}</span></div>`;
    const l3Oxidation = document.getElementById("ion-l3-oxidation");
    if (l3Oxidation)
      l3Oxidation.innerHTML =
        '<div class="ox-pill possible">--</div>';
  }

  // Show modal
  modal.classList.add("active");
  document.title = `Zperiod - ${localizedIon.name}`;

  // Re-apply fitText after modal is active to ensure clientWidth is correct
  setTimeout(() => {
    if (localizedIon.customData) {
      fitTextToWidth(document.getElementById("ion-type"));
      fitTextToWidth(document.getElementById("ion-category"));
      fitTextToWidth(document.getElementById("ion-phase"));
      fitTextToWidth(document.getElementById("ion-charge-value"));
      const statusEl = document.getElementById("h-plus-water-state");
      if (statusEl) fitTextToWidth(statusEl);

      const descA = document.querySelector(
        "#litmus-visual-card .visual-card-desc",
      );
      const descB = document.querySelector(
        "#reactivity-visual-card .visual-card-desc",
      );
      if (descA) fitTextToWidth(descA);
      if (descB) fitTextToWidth(descB);
    }
  }, 50);

  initIonSlider();

  // Hide nav
  document.body.classList.add("hide-nav");

  // Close handlers
  const closeBtn = document.getElementById("ion-modal-close");
  if (closeBtn) {
    closeBtn.onclick = () => {
      modal.classList.remove("active");
      document.body.classList.remove("hide-nav");
      document.title = "Zperiod";

      // Reset headline layout for element modal?
      // No, this is #ion-modal, distinct from #element-modal.
      // So hiding elements inside it is permanent until re-opened?
      // Re-opening calls this function again, which re-hides.
      // So it's safe.
    };
  }

  modal.onclick = (e) => {
    if (window._zperiodIsDragging) return;
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.classList.remove("hide-nav");
      document.title = "Zperiod";
    }
  };
}
