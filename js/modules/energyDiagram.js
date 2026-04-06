// =============================================================================
// Energy Level Diagram Renderer
// Renders stacked orbital box-and-arrow diagrams for any element
// =============================================================================

import { finallyData } from "../data/elementsData.js";
import { exceptionsData } from "../data/exceptionsData.js";

// Noble gas cores — config strings to abbreviate
const NOBLE_GAS_CORES = [
  { z: 86, symbol: "Rn", config: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶" },
  { z: 54, symbol: "Xe", config: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶" },
  { z: 36, symbol: "Kr", config: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶" },
  { z: 18, symbol: "Ar", config: "1s² 2s² 2p⁶ 3s² 3p⁶" },
  { z: 10, symbol: "Ne", config: "1s² 2s² 2p⁶" },
  { z: 2,  symbol: "He", config: "1s²" },
];

// Parse superscript digits
const SUP_MAP = { '⁰':0,'¹':1,'²':2,'³':3,'⁴':4,'⁵':5,'⁶':6,'⁷':7,'⁸':8,'⁹':9 };

function parseSuperscript(str) {
  let n = 0;
  for (const ch of str) {
    if (SUP_MAP[ch] !== undefined) n = n * 10 + SUP_MAP[ch];
  }
  return n;
}

// Expand noble gas shorthand and parse into orbital list
// Returns { orbitals: [...], coreSymbol: "Ar"|null }
function parseConfig(configStr) {
  if (!configStr) return { orbitals: [], coreSymbol: null };

  const cores = {
    '[He]': 'He', '[Ne]': 'Ne', '[Ar]': 'Ar',
    '[Kr]': 'Kr', '[Xe]': 'Xe', '[Rn]': 'Rn', '[Og]': 'Og',
  };
  const coreExpansions = {
    'He': '1s²',
    'Ne': '1s² 2s² 2p⁶',
    'Ar': '1s² 2s² 2p⁶ 3s² 3p⁶',
    'Kr': '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶',
    'Xe': '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶',
    'Rn': '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶',
  };

  let coreSymbol = null;
  let expanded = configStr;
  for (const [bracket, sym] of Object.entries(cores)) {
    if (expanded.includes(bracket)) {
      coreSymbol = sym;
      expanded = expanded.replace(bracket, coreExpansions[sym]);
      break;
    }
  }

  const orbitals = [];
  const regex = /(\d)([spdf])([\u2070\u00b9\u00b2\u00b3\u2074\u2075\u2076\u2077\u2078\u2079]+)/g;
  let match;
  while ((match = regex.exec(expanded)) !== null) {
    orbitals.push({
      n: parseInt(match[1]),
      type: match[2],
      electrons: parseSuperscript(match[3]),
    });
  }
  return { orbitals, coreSymbol };
}

// Max electrons per orbital type
const MAX_ELECTRONS = { s: 2, p: 6, d: 10, f: 14 };
const NUM_ORBITALS  = { s: 1, p: 3, d: 5,  f: 7 };

// Energy ordering for sorting (Aufbau-based, n+l rule with known exceptions)
// Lower value = lower energy = rendered at bottom
function energyOrder(n, type) {
  const lMap = { s: 0, p: 1, d: 2, f: 3 };
  const l = lMap[type];
  // n+l rule, then by n for same n+l
  return (n + l) * 100 + n;
}

// Determine which orbitals belong to core vs valence
function splitCoreValence(orbitals, coreSymbol) {
  if (!coreSymbol) return { core: [], valence: orbitals };

  const coreZ = { He: 2, Ne: 10, Ar: 18, Kr: 36, Xe: 54, Rn: 86 };
  const coreElectrons = coreZ[coreSymbol] || 0;

  let count = 0;
  let splitIdx = 0;
  for (let i = 0; i < orbitals.length; i++) {
    count += orbitals[i].electrons;
    if (count >= coreElectrons) {
      splitIdx = i + 1;
      break;
    }
  }
  return {
    core: orbitals.slice(0, splitIdx),
    valence: orbitals.slice(splitIdx),
  };
}

// Build HTML for a single orbital box with arrows
function renderOrbitalBox(electrons, type) {
  // electrons = 0, 1, or 2 for this specific box
  const filled = electrons > 0 ? ' filled' : '';
  let arrows = '';
  if (electrons >= 1) arrows += `<span class="arrow-up type-${type}">↑</span>`;
  if (electrons >= 2) arrows += `<span class="arrow-down type-${type}">↑</span>`;
  return `<div class="orbital-box type-${type}${filled}">${arrows}</div>`;
}

// Distribute electrons across boxes following Hund's rule
function distributeElectrons(totalElectrons, numBoxes) {
  const boxes = new Array(numBoxes).fill(0);
  let remaining = totalElectrons;
  // First pass: one electron per box (Hund's rule)
  for (let i = 0; i < numBoxes && remaining > 0; i++) {
    boxes[i] = 1;
    remaining--;
  }
  // Second pass: pair up
  for (let i = 0; i < numBoxes && remaining > 0; i++) {
    boxes[i] = 2;
    remaining--;
  }
  return boxes;
}

// Build the full energy level diagram HTML
export function renderEnergyDiagram(element) {
  const container = document.getElementById('energy-diagram-container');
  if (!container) return;

  const data = finallyData?.[element.number];
  const configStr = data?.level3_properties?.electronic?.configuration;
  if (!configStr) {
    container.innerHTML = '<div class="energy-diagram-title">No configuration data</div>';
    return;
  }

  const { orbitals, coreSymbol } = parseConfig(configStr);
  if (orbitals.length === 0) {
    container.innerHTML = '<div class="energy-diagram-title">No configuration data</div>';
    return;
  }

  const { core, valence } = splitCoreValence(orbitals, coreSymbol);

  // Sort valence by energy (ascending = bottom to top)
  const sortedValence = [...valence].sort((a, b) => energyOrder(a.n, a.type) - energyOrder(b.n, b.type));

  // Check for exceptions
  const exc = exceptionsData[element.number];
  const hasConfigException = exc?.config;

  // Build HTML
  let html = '';
  html += `<div class="energy-diagram-title">Energy Level Diagram</div>`;
  html += `<div class="energy-diagram-config">${configStr}</div>`;

  // Exception callout — placed at top so it's always visible
  if (hasConfigException) {
    html += `<div style="margin:0 auto 14px;padding:10px 14px;background:rgba(255,171,0,0.08);border:1px solid rgba(255,171,0,0.2);border-radius:10px;max-width:400px;">`;
    html += `<div style="font-size:12px;font-weight:700;color:#d49a00;margin-bottom:4px;">⚠ ${exc.config.title}</div>`;
    if (exc.config.predicted && exc.config.actual) {
      html += `<div style="font-size:11px;color:#666;margin-bottom:2px;"><span style="text-decoration:line-through;opacity:0.5;">Predicted: ${exc.config.predicted}</span></div>`;
      html += `<div style="font-size:11px;color:#333;font-weight:600;margin-bottom:4px;">Actual: ${exc.config.actual}</div>`;
    }
    html += `<div style="font-size:11px;color:#555;line-height:1.5;">${exc.config.detail}</div>`;
    html += '</div>';
  }

  html += '<div class="energy-diagram">';

  // Energy axis
  html += '<div class="energy-axis-arrow"></div>';
  html += '<div class="energy-axis-label">ENERGY</div>';

  // Valence rows (reversed so highest energy is at top)
  const valenceReversed = [...sortedValence].reverse();
  for (const orb of valenceReversed) {
    const numBoxes = NUM_ORBITALS[orb.type];
    const boxes = distributeElectrons(orb.electrons, numBoxes);
    const maxE = MAX_ELECTRONS[orb.type];
    const isFull = orb.electrons === maxE;
    const isHalf = orb.electrons === maxE / 2;

    // Is this the subshell involved in the exception?
    const isExcRow = hasConfigException && (
      orb.type === 'd' || orb.type === 'f' ||
      (orb.type === 's' && orb.electrons === 1 && hasConfigException)
    );

    html += `<div class="energy-row${isExcRow ? ' exception' : ''}">`;
    html += `<span class="energy-row-label type-${orb.type}">${orb.n}${orb.type}</span>`;
    html += '<div class="orbital-boxes">';
    for (const boxE of boxes) {
      html += renderOrbitalBox(boxE, orb.type);
    }
    html += '</div>';
    html += `<span class="energy-row-count">${orb.electrons}/${maxE}`;
    if (isHalf) html += ' <em style="color:#d49a00;font-style:normal">½</em>';
    if (isFull) html += ' <em style="color:#2E7D32;font-style:normal">✓</em>';
    html += '</span>';
    if (isExcRow) html += '<span class="exc-row-badge">⚠</span>';
    html += '</div>';
  }

  // Core divider + label
  if (coreSymbol && core.length > 0) {
    html += '<hr class="energy-core-divider">';
    html += `<div class="energy-core-label">[${coreSymbol}] core — ${core.reduce((s, o) => s + o.electrons, 0)} electrons</div>`;

    // Show core rows collapsed (smaller)
    const coreReversed = [...core].sort((a, b) => energyOrder(a.n, a.type) - energyOrder(b.n, b.type)).reverse();
    for (const orb of coreReversed) {
      const numBoxes = NUM_ORBITALS[orb.type];
      const boxes = distributeElectrons(orb.electrons, numBoxes);
      html += `<div class="energy-row" style="opacity:0.4;transform:scale(0.85);transform-origin:left center;">`;
      html += `<span class="energy-row-label type-${orb.type}">${orb.n}${orb.type}</span>`;
      html += '<div class="orbital-boxes">';
      for (const boxE of boxes) {
        html += renderOrbitalBox(boxE, orb.type);
      }
      html += '</div>';
      html += `<span class="energy-row-count">${orb.electrons}/${MAX_ELECTRONS[orb.type]}</span>`;
      html += '</div>';
    }
  }

  html += '</div>'; // .energy-diagram



  container.innerHTML = html;
}

// Toggle between Bohr and Energy Level views
export function initViewToggle(element) {
  const toggle = document.getElementById('atom-view-toggle');
  const atomContainer = document.getElementById('atom-container');
  const energyContainer = document.getElementById('energy-diagram-container');
  if (!toggle || !atomContainer || !energyContainer) return;

  toggle.style.display = 'flex';

  // Reset to Bohr
  const btns = toggle.querySelectorAll('.atom-view-btn');
  btns.forEach(b => b.classList.toggle('active', b.dataset.mode === 'bohr'));
  atomContainer.style.display = '';
  atomContainer.style.opacity = '1';
  energyContainer.classList.remove('active');

  // Clone buttons to remove old listeners
  btns.forEach(btn => {
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
  });

  const freshBtns = toggle.querySelectorAll('.atom-view-btn');
  freshBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      freshBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (mode === 'energy') {
        atomContainer.style.opacity = '0';
        setTimeout(() => { atomContainer.style.display = 'none'; }, 350);
        renderEnergyDiagram(element);
        energyContainer.classList.add('active');
      } else {
        energyContainer.classList.remove('active');
        atomContainer.style.display = '';
        requestAnimationFrame(() => { atomContainer.style.opacity = '1'; });
      }
    });
  });
}

// Cleanup on modal close
export function cleanupViewToggle() {
  const toggle = document.getElementById('atom-view-toggle');
  if (toggle) toggle.style.display = 'none';

  const energyContainer = document.getElementById('energy-diagram-container');
  if (energyContainer) {
    energyContainer.classList.remove('active');
    energyContainer.innerHTML = '';
  }

  const atomContainer = document.getElementById('atom-container');
  if (atomContainer) {
    atomContainer.style.display = '';
    atomContainer.style.opacity = '1';
  }
}
