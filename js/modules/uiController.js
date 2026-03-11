// =============================================================================
// UI Controller - Periodic Table Grid & Element Modal
// Extracted from script.js: grid generation, modal population, level system
// =============================================================================

import { finallyData, elements } from "../data/elementsData.js";
import {
  ensureThreeLibLoaded,
  init3DScene,
  updateAtomStructure,
  onWindowResize,
  reset3DView,
  animateAtom,
  cleanup3D,
  clearCurrentAtom,
  renderScene,
} from "./threeRenderer.js";

// v2 dataset stub — file removed; branches gated by zperiodVersion === 'new' are inert.
const elementsData_v2 = [];

// ===== Legend & Category Highlighting =====
let activeLegendCategory = null;
let headlineResizeHandler = null;

function clearHeadlineResizeHandler() {
  if (!headlineResizeHandler) return;
  window.removeEventListener("resize", headlineResizeHandler);
  headlineResizeHandler = null;
}

function bindKeyboardActivation(el, onActivate) {
  el.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    onActivate();
  });
}

function clearLegendSelection(container) {
  container.querySelectorAll(".legend-item.active").forEach((el) => {
    el.classList.remove("active");
    el.setAttribute("aria-pressed", "false");
  });
}

function setLegendSelection(container, catClass) {
  const legendItem = container.querySelector(
    `.legend-item[data-category="${catClass}"]`,
  );
  if (!legendItem) return;
  legendItem.classList.add("active");
  legendItem.setAttribute("aria-pressed", "true");
}

function normalizeCategoryClass(catClass) {
  const aliasMap = {
    "non-metal": "other-nonmetal",
  };
  return aliasMap[catClass] || catClass;
}
function highlightCategory(container, catClass) {
  const normalized = normalizeCategoryClass(catClass);
  container.classList.add("highlighting");
  const elements = container.querySelectorAll(".element");
  elements.forEach((el) => {
    if (el.classList.contains(catClass) || el.classList.contains(normalized)) {
      el.classList.add("highlighted");
    } else {
      el.classList.remove("highlighted");
    }
  });
}
function clearHighlights(container) {
  container.classList.remove("highlighting");
  const highlighted = container.querySelectorAll(".element.highlighted");
  highlighted.forEach((el) => el.classList.remove("highlighted"));
}

const EIT_PROPERTY_CONFIG = [
  { key: "category", label: "Category", type: "category" },
  {
    key: "meltingPoint",
    label: "Melting Point",
    type: "numeric",
    unit: "°C",
    digits: 0,
    source: "meltingPoint",
    units: [
      { unit: "°C", digits: 0, convert: (v) => v },
      { unit: "°F", digits: 0, convert: (v) => v * 9 / 5 + 32 },
      { unit: "K", digits: 0, convert: (v) => v + 273.15 },
    ],
  },
  {
    key: "density",
    label: "Density",
    type: "numeric",
    unit: "g/cm³",
    digits: 2,
    source: "density",
    units: [
      { unit: "g/cm³", digits: 2, convert: (v) => v },
      { unit: "kg/m³", digits: 0, convert: (v) => v * 1000 },
      { unit: "lb/ft³", digits: 2, convert: (v) => v * 62.42796 },
    ],
  },
  {
    key: "boilingPoint",
    label: "Boiling Point",
    type: "numeric",
    unit: "°C",
    digits: 0,
    source: "boilingPoint",
    units: [
      { unit: "°C", digits: 0, convert: (v) => v },
      { unit: "°F", digits: 0, convert: (v) => v * 9 / 5 + 32 },
      { unit: "K", digits: 0, convert: (v) => v + 273.15 },
    ],
  },
  {
    key: "electronegativity",
    label: "Electronegativity",
    type: "numeric",
    unit: "",
    digits: 2,
    source: "electronegativity",
  },
  {
    key: "firstIonization",
    label: "1st Ionization",
    type: "numeric",
    unit: "kJ/mol",
    digits: 0,
    source: "firstIonization",
    units: [
      { unit: "kJ/mol", digits: 0, convert: (v) => v },
      { unit: "eV", digits: 2, convert: (v) => v / 96.485 },
    ],
  },
  {
    key: "electronAffinity",
    label: "Electron Affinity",
    type: "numeric",
    unit: "kJ/mol",
    digits: 1,
    source: "electronAffinity",
    units: [
      { unit: "kJ/mol", digits: 1, convert: (v) => v },
      { unit: "eV", digits: 2, convert: (v) => v / 96.485 },
    ],
  },
];
const EIT_PROPERTY_MAP = new Map(EIT_PROPERTY_CONFIG.map((cfg) => [cfg.key, cfg]));
let eitRegistry = [];
let eitUI = null;
let eitState = {
  property: "category",
  mode: "color",
  numericRanges: new Map(),
  unitIndex: new Map(),   // tracks which unit is active per property key
};

/** Get the active unit config for a property (with conversion function) */
function getActiveUnit(config) {
  if (!config?.units || !config.units.length) return null;
  const idx = eitState.unitIndex.get(config.key) || 0;
  return config.units[idx];
}

/** Cycle to the next unit for this property and return the new unit config */
function cycleUnit(config) {
  if (!config?.units || config.units.length <= 1) return null;
  const currentIdx = eitState.unitIndex.get(config.key) || 0;
  const nextIdx = (currentIdx + 1) % config.units.length;
  eitState.unitIndex.set(config.key, nextIdx);
  // Clear stored range so slider resets to new unit bounds
  eitState.numericRanges.delete(config.key);
  return config.units[nextIdx];
}

/** Get the effective unit string for display */
function getEffectiveUnit(config) {
  const alt = getActiveUnit(config);
  return alt ? alt.unit : (config?.unit || "");
}

/** Get the effective digits for display */
function getEffectiveDigits(config) {
  const alt = getActiveUnit(config);
  return alt ? alt.digits : (config?.digits ?? 2);
}

/** Convert a raw value (always stored in base unit like °C) to the active display unit */
function convertToActiveUnit(value, config) {
  if (!Number.isFinite(value)) return value;
  const alt = getActiveUnit(config);
  return alt ? alt.convert(value) : value;
}
let lockLegendInteractions = false;
let eitPanelOpen = false;

function normalizeCategoryLabel(category) {
  return normalizeCategoryClass(String(category || "Unknown")
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, ""));
}

/**
 * Parse a raw metric string into an interval object.
 * Returns { min, max, predicted, approximate, suffix } or null.
 * For EIT slider/filter, use min/max for overlap checking.
 * For color gradient, use midpoint (min+max)/2.
 */
function parseNumericMetric(rawValue, metricKey) {
  if (rawValue === null || rawValue === undefined) return null;
  if (typeof rawValue === "number") {
    return Number.isFinite(rawValue)
      ? { min: rawValue, max: rawValue, predicted: false, approximate: false, suffix: "" }
      : null;
  }
  const text = String(rawValue).trim();
  if (!text) return null;
  if (text === "N/A" || text === "Unknown" || text === "—") return null;
  // em-dash "—" means no data, but en-dash "–" is a range separator
  if (text.includes("—")) return null;

  const predicted = /\(pred\)/i.test(text);
  const approximate = /^~/.test(text) || /~/.test(text);
  const normalized = text.replace(/−/g, "-").replace(/,/g, "");

  // Build suffix string for display
  let suffix = "";
  if (approximate) suffix += "~";
  if (predicted) suffix += suffix ? " (pred)" : "(pred)";

  // Try range pattern first: e.g. "364–507°C (pred)" or "350–550°C (pred)"
  const rangeMatch = normalized.match(/(-?\d+(?:\.\d+)?)\s*[–\-]\s*(-?\d+(?:\.\d+)?)/);
  if (rangeMatch) {
    const lo = Number.parseFloat(rangeMatch[1]);
    const hi = Number.parseFloat(rangeMatch[2]);
    if (Number.isFinite(lo) && Number.isFinite(hi)) {
      if (metricKey === "firstIonization" && /ev/i.test(normalized)) {
        return { min: lo * 96.485, max: hi * 96.485, predicted, approximate, suffix };
      }
      return { min: Math.min(lo, hi), max: Math.max(lo, hi), predicted, approximate, suffix };
    }
  }

  // Single value
  const match = normalized.match(/-?\d+(?:\.\d+)?/);
  if (!match) return null;
  const value = Number.parseFloat(match[0]);
  if (!Number.isFinite(value)) return null;

  if (metricKey === "firstIonization" && /ev/i.test(normalized)) {
    const converted = value * 96.485;
    return { min: converted, max: converted, predicted, approximate, suffix };
  }
  return { min: value, max: value, predicted, approximate, suffix };
}

function getMetricValue(elementNumber, metricKey) {
  const physical = finallyData[elementNumber]?.level3_properties?.physical || {};
  return parseNumericMetric(physical[metricKey], metricKey);
}

function registerEITElementCell(cell, element) {
  if (!cell || !element || typeof element.number !== "number") return;
  const metrics = {};
  EIT_PROPERTY_CONFIG.forEach((config) => {
    if (config.type !== "numeric") return;
    metrics[config.key] = getMetricValue(element.number, config.source);
  });
  eitRegistry.push({
    cell,
    number: element.number,
    categoryLabel: element.category || "Unknown",
    categoryClass: normalizeCategoryLabel(element.category),
    metrics,
  });
}

function resetEITState() {
  eitState = {
    property: "category",
    mode: "color",
    numericRanges: new Map(),
    unitIndex: new Map(),
  };
  eitPanelOpen = false;
}

function resetEITRegistry() {
  eitRegistry = [];
}

function formatEITValue(value, config, withUnit = false) {
  if (!Number.isFinite(value)) return "N/A";
  const displayValue = convertToActiveUnit(value, config);
  const digits = getEffectiveDigits(config);
  const valueText = displayValue.toFixed(digits);
  if (!withUnit) return valueText;
  const unit = getEffectiveUnit(config);
  return unit ? `${valueText} ${unit}` : valueText;
}

/** Get the midpoint value from an interval metric for gradient coloring */
function getMetricMidpoint(metric) {
  if (!metric) return null;
  // Legacy: plain number (shouldn't happen after refactor but be safe)
  if (typeof metric === "number") return Number.isFinite(metric) ? metric : null;
  if (!Number.isFinite(metric.min) || !Number.isFinite(metric.max)) return null;
  return (metric.min + metric.max) / 2;
}

/** Check if an interval metric overlaps with a selected range */
function metricOverlapsRange(metric, selMin, selMax) {
  if (!metric) return false;
  if (typeof metric === "number") return Number.isFinite(metric) && metric >= selMin && metric <= selMax;
  if (!Number.isFinite(metric.min) || !Number.isFinite(metric.max)) return false;
  // Interval overlap: element.max >= selectedMin && element.min <= selectedMax
  return metric.max >= selMin && metric.min <= selMax;
}

/** Check if an interval metric has valid data */
function metricHasData(metric) {
  if (!metric) return false;
  if (typeof metric === "number") return Number.isFinite(metric);
  return Number.isFinite(metric.min) && Number.isFinite(metric.max);
}

function getColorForRatio(ratio) {
  const bounded = Math.max(0, Math.min(1, ratio));
  const hue = 210 - bounded * 200;
  const saturation = 82;
  const lightness = 78 - bounded * 22;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function getNumericRatio(value, min, max) {
  if (!Number.isFinite(value) || !Number.isFinite(min) || !Number.isFinite(max)) {
    return null;
  }
  if (Math.abs(max - min) < 1e-9) return 0.5;
  return (value - min) / (max - min);
}

function clearEITCellStyles() {
  eitRegistry.forEach(({ cell }) => {
    cell.classList.remove(
      "eit-colored",
      "eit-dimmed",
      "eit-focus",
      "eit-no-data",
      "eit-out-range",
    );
    cell.style.removeProperty("--eit-cell-color");
  });
}

function updateEITLegend({
  visible,
  title = "",
  note = "",
  min = null,
  max = null,
  mid = null,
}) {
  if (!eitUI) return;
  // Legend elements may not exist in inline layout
  if (!eitUI.legend) return;
  eitUI.legend.hidden = !visible;
  if (!visible) return;

  if (eitUI.legendTitle) eitUI.legendTitle.textContent = title;
  if (eitUI.legendNote) eitUI.legendNote.textContent = note;
  if (eitUI.legendMin) eitUI.legendMin.textContent = min ?? "N/A";
  if (eitUI.legendMid) eitUI.legendMid.textContent = mid ?? "N/A";
  if (eitUI.legendMax) eitUI.legendMax.textContent = max ?? "N/A";
  if (eitUI.legendBar) {
    eitUI.legendBar.style.background =
      `linear-gradient(90deg, ${getColorForRatio(0)} 0%, ${getColorForRatio(0.5)} 50%, ${getColorForRatio(1)} 100%)`;
  }
}

function getStoredNumericRange(propertyKey, minBound, maxBound) {
  const stored = eitState.numericRanges.get(propertyKey);
  if (!stored) return { min: minBound, max: maxBound };
  const min = Math.max(minBound, Math.min(stored.min, maxBound));
  const max = Math.max(minBound, Math.min(stored.max, maxBound));
  if (min > max) return { min: minBound, max: maxBound };
  return { min, max };
}

function setPropertyNote(message) {
  if (!eitUI?.propertyNote) return;
  eitUI.propertyNote.textContent = message || "";
}

function syncSliderVisuals(bounds, selected) {
  if (!eitUI || !bounds || !selected) return;
  const range = Math.max(bounds.max - bounds.min, 1e-9);
  const minPct = ((selected.min - bounds.min) / range) * 100;
  const maxPct = ((selected.max - bounds.min) / range) * 100;
  eitUI.sliderFill.style.left = `${Math.max(0, Math.min(100, minPct))}%`;
  eitUI.sliderFill.style.width =
    `${Math.max(0, Math.min(100, maxPct) - Math.max(0, Math.min(100, minPct)))}%`;

  // Fix overlapping thumbs: bring the correct thumb to the front
  if (selected.min === selected.max) {
    if (minPct > 50) {
      eitUI.rangeMinInput.style.zIndex = "10";
      eitUI.rangeMaxInput.style.zIndex = "5";
    } else {
      eitUI.rangeMinInput.style.zIndex = "5";
      eitUI.rangeMaxInput.style.zIndex = "10";
    }
  } else {
    eitUI.rangeMinInput.style.zIndex = "5";
    eitUI.rangeMaxInput.style.zIndex = "5";
  }
}

function syncNumericSlider(config, bounds, selected) {
  if (!eitUI) return;
  if (!bounds || !Number.isFinite(bounds.min) || !Number.isFinite(bounds.max)) {
    eitUI.sliderSection.hidden = true;
    return;
  }

  eitUI.sliderSection.hidden = false;
  eitUI.sliderBounds = bounds;
  const rangeSpan = bounds.max - bounds.min;
  if (Math.abs(rangeSpan) < 1e-9) {
    eitUI.selectedMin.textContent = formatEITValue(bounds.min, config, true);
    eitUI.selectedMax.textContent = formatEITValue(bounds.max, config, true);
    eitUI.rangeMinInput.disabled = true;
    eitUI.rangeMaxInput.disabled = true;
    eitUI.sliderFill.style.left = "0%";
    eitUI.sliderFill.style.width = "100%";
    return;
  }
  eitUI.rangeMinInput.disabled = false;
  eitUI.rangeMaxInput.disabled = false;

  let step = config.digits === 0 ? 1 : 1 / Math.pow(10, Math.min(config.digits || 2, 3));
  if (rangeSpan > 0 && rangeSpan < step) {
    step = Math.max(rangeSpan / 200, 1e-4);
  }

  const minInput = eitUI.rangeMinInput;
  const maxInput = eitUI.rangeMaxInput;
  minInput.min = String(bounds.min);
  minInput.max = String(bounds.max);
  minInput.step = String(step);
  maxInput.min = String(bounds.min);
  maxInput.max = String(bounds.max);
  maxInput.step = String(step);
  minInput.value = String(selected.min);
  maxInput.value = String(selected.max);

  eitUI.selectedMin.textContent = formatEITValue(selected.min, config, true);
  eitUI.selectedMax.textContent = formatEITValue(selected.max, config, true);
  syncSliderVisuals(bounds, selected);
}

function setEITPanelOpen(open) {
  if (!eitUI) return;
  eitPanelOpen = Boolean(open);
  eitUI.propertyTrigger.setAttribute("aria-expanded", eitPanelOpen ? "true" : "false");
  if (eitPanelOpen) {
    eitUI.propertyPanel.classList.add("eit-panel-visible");
  } else {
    eitUI.propertyPanel.classList.remove("eit-panel-visible");
  }
}

function syncEITControls(config) {
  if (!eitUI) return;
  // Update trigger label with current unit
  if (eitUI.currentProperty && config) {
    const unit = getEffectiveUnit(config);
    eitUI.currentProperty.textContent = unit
      ? `${config.label} ${unit}`
      : config.label;
  }
  // Sync chips — update unit display on each chip
  if (eitUI.chips) {
    eitUI.chips.forEach((chip) => {
      const isActive = chip.dataset.property === eitState.property;
      chip.classList.toggle("active", isActive);
      // Update chip unit text if this chip has units
      const chipConfig = EIT_PROPERTY_MAP.get(chip.dataset.property);
      if (chipConfig?.units && chipConfig.units.length > 1) {
        const unitSpan = chip.querySelector(".eit-chip-unit");
        if (unitSpan) {
          const currentUnit = getEffectiveUnit(chipConfig);
          unitSpan.textContent = currentUnit;
        }
      }
    });
  }
  // Sync mode buttons
  eitUI.modeButtons.forEach((btn) => {
    const isActive = btn.dataset.mode === eitState.mode;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
  // Sync mode slider position
  syncModeSlider();
}

function syncModeSlider() {
  if (!eitUI || !eitUI.modeSlider) return;
  const activeBtn = eitUI.modeButtons.find((btn) => btn.classList.contains("active"));
  if (!activeBtn) return;
  const group = activeBtn.parentElement;
  if (!group) return;
  const groupRect = group.getBoundingClientRect();
  const btnRect = activeBtn.getBoundingClientRect();
  const offsetX = btnRect.left - groupRect.left - 3; // 3px = padding
  eitUI.modeSlider.style.width = `${btnRect.width}px`;
  eitUI.modeSlider.style.transform = `translateX(${offsetX}px)`;
}

function applyCategoryEIT(config) {
  if (!eitUI) return;
  eitUI.sliderSection.hidden = true;
  setPropertyNote("Category is discrete. Use legend chips below for category-only focus.");
  updateEITLegend({ visible: false });
}

function applyNumericEIT(config) {
  if (!eitUI) return;

  const rows = eitRegistry.map((entry) => ({
    entry,
    metric: entry.metrics[config.key],  // interval object or null
  }));

  // Collect all boundary values for computing global min/max
  const allValues = [];
  rows.forEach(({ metric }) => {
    if (!metricHasData(metric)) return;
    allValues.push(metric.min, metric.max);
  });
  allValues.sort((a, b) => a - b);
  const numericCount = rows.filter(({ metric }) => metricHasData(metric)).length;

  if (!allValues.length) {
    rows.forEach(({ entry }) => {
      entry.cell.classList.add("eit-no-data", "eit-dimmed");
    });
    eitUI.sliderSection.hidden = true;
    setPropertyNote("No usable numeric data for this property in current dataset.");
    updateEITLegend({
      visible: true,
      title: `${config.label} Range`,
      note: "No usable data in current dataset",
      min: "N/A",
      mid: "N/A",
      max: "N/A",
    });
    return;
  }

  const min = allValues[0];
  const max = allValues[allValues.length - 1];
  const selected = getStoredNumericRange(config.key, min, max);
  eitState.numericRanges.set(config.key, selected);
  syncNumericSlider(config, { min, max }, selected);
  setPropertyNote(
    `Selected window: ${formatEITValue(selected.min, config, true)} → ${formatEITValue(selected.max, config, true)}`,
  );
  let inRangeCount = 0;
  const isFilter = eitState.mode === "filter";

  // Single pass: compute and apply state for each cell using toggle
  // Uses interval overlap: element.max >= selectedMin && element.min <= selectedMax
  rows.forEach(({ entry, metric }) => {
    const cl = entry.cell.classList;
    const hasData = metricHasData(metric);
    const inRange = hasData && metricOverlapsRange(metric, selected.min, selected.max);

    if (hasData) {
      // Use midpoint for gradient coloring
      const midpoint = getMetricMidpoint(metric);
      const ratio = getNumericRatio(midpoint, min, max);
      entry.cell.style.setProperty("--eit-cell-color", getColorForRatio(ratio));
    }

    if (inRange) inRangeCount += 1;

    // Toggle classes in one batch — no clear required
    cl.toggle("eit-colored", hasData);
    cl.toggle("eit-no-data", !hasData);
    cl.toggle("eit-dimmed", !hasData || (isFilter && !inRange));
    cl.toggle("eit-focus", inRange);
    cl.toggle("eit-out-range", hasData && !inRange && !isFilter);
  });

  updateEITLegend({
    visible: true,
    title: config.label,
    note: `${inRangeCount}/${numericCount} in selected range`,
    min: formatEITValue(selected.min, config, true),
    mid: "Selected",
    max: formatEITValue(selected.max, config, true),
  });
}

function applyEIT(tableContainer) {
  if (!tableContainer) return;
  const config = EIT_PROPERTY_MAP.get(eitState.property) || EIT_PROPERTY_CONFIG[0];
  if (!config) return;

  if (config.type === "category" && eitState.mode === "filter") {
    eitState.mode = "color";
  }

  syncEITControls(config);

  lockLegendInteractions = config.type !== "category";
  tableContainer.classList.toggle("eit-active", lockLegendInteractions);

  if (lockLegendInteractions) {
    activeLegendCategory = null;
    clearLegendSelection(tableContainer);
    clearHighlights(tableContainer);
  }

  if (config.type === "category") {
    // Clear numeric-specific styles/classes only when resetting to Category
    clearEITCellStyles();
    applyCategoryEIT(config);
  } else {
    // DO NOT invoke clearEITCellStyles() here to prevent extreme layout thrashing and 
    // forced recalculation of 118 cell transitions. applyNumericEIT inherently toggles 
    // all classes and overwrites strictly what's necessary, resulting in butter-smooth FPS.
    applyNumericEIT(config);
  }
}

function ensureEITController(tableContainer) {
  if (!tableContainer) return;

  let root = document.getElementById("eit-controller");
  if (!root) {
    root = document.createElement("section");
    root.id = "eit-controller";
    root.className = "eit-controller";
    root.setAttribute("aria-label", "Element Information Toggle");

    // Build property chips HTML
    const chipsHTML = EIT_PROPERTY_CONFIG.map((config) => {
      const hasMultiUnits = config.units && config.units.length > 1;
      const displayUnit = getEffectiveUnit(config);
      const unitSpan = displayUnit
        ? `<span class="eit-chip-unit">${displayUnit}</span>`
        : "";
      const label = `${config.label}${unitSpan}`;
      const extraAttrs = hasMultiUnits ? ` data-has-units="true" title="Click again to change unit"` : "";
      return `<button type="button" class="eit-chip${config.key === "category" ? " active" : ""}" data-property="${config.key}"${extraAttrs}>${label}</button>`;
    }).join("");

    root.innerHTML = `
      <button type="button" class="eit-property-trigger" id="eit-property-trigger" aria-controls="eit-property-panel" aria-expanded="false">
        <span class="eit-current-property" id="eit-current-property">Category</span>
        <span class="eit-trigger-caret" aria-hidden="true">▾</span>
      </button>
      <div class="eit-slider-section" id="eit-slider-section" hidden>
        <span id="eit-selected-min"></span>
        <div class="eit-dual-slider" id="eit-dual-slider">
          <div class="eit-slider-track"></div>
          <div class="eit-slider-fill" id="eit-slider-fill"></div>
          <input type="range" id="eit-range-min" class="eit-range-input eit-range-input-min" />
          <input type="range" id="eit-range-max" class="eit-range-input eit-range-input-max" />
        </div>
        <span id="eit-selected-max"></span>
      </div>
      <div class="eit-mode-group" role="group" aria-label="Visualization mode">
        <div class="eit-mode-slider" id="eit-mode-slider"></div>
        <button type="button" class="eit-mode-btn active" data-mode="color" aria-pressed="true">Color</button>
        <button type="button" class="eit-mode-btn" data-mode="filter" aria-pressed="false">Filter</button>
      </div>
      <button type="button" class="eit-reset-btn" id="eit-reset-btn">Reset</button>
      <div class="eit-property-panel" id="eit-property-panel">
        <div class="eit-property-chips" id="eit-property-chips">
          ${chipsHTML}
        </div>
      </div>
      <div class="eit-property-note" id="eit-property-note" style="display:none"></div>
    `;

    // Hidden select for backwards compat
    const hiddenSelect = document.createElement("select");
    hiddenSelect.id = "eit-property-select";
    hiddenSelect.style.display = "none";
    root.appendChild(hiddenSelect);
  }

  if (root.parentElement !== tableContainer) {
    tableContainer.appendChild(root);
  }
  tableContainer.classList.add("has-eit");

  eitUI = {
    root,
    propertyTrigger: root.querySelector("#eit-property-trigger"),
    propertyPanel: root.querySelector("#eit-property-panel"),
    currentProperty: root.querySelector("#eit-current-property"),
    tip: null,
    propertySelect: root.querySelector("#eit-property-select"),
    chips: Array.from(root.querySelectorAll(".eit-chip")),
    sliderSection: root.querySelector("#eit-slider-section"),
    selectedMin: root.querySelector("#eit-selected-min"),
    selectedMax: root.querySelector("#eit-selected-max"),
    sliderFill: root.querySelector("#eit-slider-fill"),
    rangeMinInput: root.querySelector("#eit-range-min"),
    rangeMaxInput: root.querySelector("#eit-range-max"),
    propertyNote: root.querySelector("#eit-property-note"),
    modeButtons: Array.from(root.querySelectorAll(".eit-mode-btn")),
    modeSlider: root.querySelector("#eit-mode-slider"),
    resetButton: root.querySelector("#eit-reset-btn"),
    closeButton: root.querySelector("#eit-panel-close"),
    legend: root.querySelector("#eit-legend"),
    legendTitle: root.querySelector("#eit-legend-title"),
    legendNote: root.querySelector("#eit-legend-note"),
    legendBar: root.querySelector("#eit-legend-bar"),
    legendMin: root.querySelector("#eit-legend-min"),
    legendMid: root.querySelector("#eit-legend-mid"),
    legendMax: root.querySelector("#eit-legend-max"),
  };

  // Populate hidden select (backwards compat)
  eitUI.propertySelect.innerHTML = "";
  EIT_PROPERTY_CONFIG.forEach((config) => {
    const option = document.createElement("option");
    option.value = config.key;
    option.textContent = config.unit ? `${config.label} (${config.unit})` : config.label;
    eitUI.propertySelect.appendChild(option);
  });

  if (!root.dataset.bound) {
    // Trigger toggles dropdown
    eitUI.propertyTrigger.addEventListener("click", (event) => {
      event.stopPropagation();
      setEITPanelOpen(!eitPanelOpen);
    });
    // Prevent clicks inside panel from closing it
    eitUI.propertyPanel.addEventListener("click", (event) => {
      event.stopPropagation();
    });
    // Property chips — click active chip to cycle unit, click inactive to switch property
    eitUI.chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const clickedProperty = chip.dataset.property;
        if (clickedProperty === eitState.property) {
          // Re-clicking active property → cycle unit
          const config = EIT_PROPERTY_MAP.get(clickedProperty);
          if (config?.units && config.units.length > 1) {
            cycleUnit(config);
            applyEIT(tableContainer);
          }
          // Don't close the panel so user can keep cycling
          return;
        }
        eitState.property = clickedProperty;
        applyEIT(tableContainer);
        setEITPanelOpen(false);
      });
    });
    // Range sliders — FAST PATH using requestAnimationFrame
    // Instead of calling applyEIT (which syncs controls, clears classes,
    // recomputes colors, updates legend), we use a dedicated function that
    // ONLY toggles the 3 range-dependent classes on each cell.
    let eitSliderRafId = null;
    let eitSliderPending = null; // { min, max, config }

    function updateCellRangeClasses(selMin, selMax, config) {
      const isFilter = eitState.mode === "filter";
      let inRangeCount = 0;
      const numericCount = eitRegistry.reduce((n, e) => n + (metricHasData(e.metrics[config.key]) ? 1 : 0), 0);

      for (let i = 0, len = eitRegistry.length; i < len; i++) {
        const entry = eitRegistry[i];
        const metric = entry.metrics[config.key];
        if (!metricHasData(metric)) continue;
        // Interval overlap check
        const inRange = metricOverlapsRange(metric, selMin, selMax);
        if (inRange) inRangeCount++;
        const cl = entry.cell.classList;
        cl.toggle("eit-dimmed", isFilter && !inRange);
        cl.toggle("eit-focus", inRange);
        cl.toggle("eit-out-range", !inRange && !isFilter);
      }

      setPropertyNote(
        `Selected window: ${formatEITValue(selMin, config, true)} → ${formatEITValue(selMax, config, true)}`,
      );
      updateEITLegend({
        visible: true,
        title: config.label,
        note: `${inRangeCount}/${numericCount} in selected range`,
        min: formatEITValue(selMin, config, true),
        mid: "Selected",
        max: formatEITValue(selMax, config, true),
      });
    }

    const scheduleRangeUpdate = () => {
      if (eitSliderRafId) return;
      eitSliderRafId = requestAnimationFrame(() => {
        eitSliderRafId = null;
        if (eitSliderPending) {
          updateCellRangeClasses(eitSliderPending.min, eitSliderPending.max, eitSliderPending.config);
          eitSliderPending = null;
        }
      });
    };

    eitUI.rangeMinInput.addEventListener("input", () => {
      const config = EIT_PROPERTY_MAP.get(eitState.property);
      if (!config || config.type !== "numeric") return;
      let minValue = Number.parseFloat(eitUI.rangeMinInput.value);
      let maxValue = Number.parseFloat(eitUI.rangeMaxInput.value);
      if (minValue > maxValue) {
        minValue = maxValue;
        eitUI.rangeMinInput.value = String(minValue);
      }
      eitState.numericRanges.set(config.key, { min: minValue, max: maxValue });
      // Immediate lightweight visual sync
      syncSliderVisuals(eitUI.sliderBounds, { min: minValue, max: maxValue });
      eitUI.selectedMin.textContent = formatEITValue(minValue, config, true);
      // Schedule fast cell class updates
      eitSliderPending = { min: minValue, max: maxValue, config };
      scheduleRangeUpdate();
    });
    eitUI.rangeMaxInput.addEventListener("input", () => {
      const config = EIT_PROPERTY_MAP.get(eitState.property);
      if (!config || config.type !== "numeric") return;
      let minValue = Number.parseFloat(eitUI.rangeMinInput.value);
      let maxValue = Number.parseFloat(eitUI.rangeMaxInput.value);
      if (maxValue < minValue) {
        maxValue = minValue;
        eitUI.rangeMaxInput.value = String(maxValue);
      }
      eitState.numericRanges.set(config.key, { min: minValue, max: maxValue });
      // Immediate lightweight visual sync
      syncSliderVisuals(eitUI.sliderBounds, { min: minValue, max: maxValue });
      eitUI.selectedMax.textContent = formatEITValue(maxValue, config, true);
      // Schedule fast cell class updates
      eitSliderPending = { min: minValue, max: maxValue, config };
      scheduleRangeUpdate();
    });
    // Mode buttons
    eitUI.modeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        eitState.mode = button.dataset.mode === "filter" ? "filter" : "color";
        applyEIT(tableContainer);
      });
    });
    // Reset
    eitUI.resetButton.addEventListener("click", () => {
      resetEITState();
      applyEIT(tableContainer);
    });
    // Close on outside click
    document.addEventListener("click", (event) => {
      if (!eitUI || !eitUI.root.contains(event.target)) {
        setEITPanelOpen(false);
      }
    });
    root.dataset.bound = "true";
  }

  applyEIT(tableContainer);
  if (typeof window._scalePeriodicTable === "function") {
    requestAnimationFrame(() => {
      window._scalePeriodicTable();
    });
  }
}

function createLegend(container) {
  const legendContainer = document.createElement("div");
  legendContainer.id = "table-legend";
  const categories = [
    // Row 1 (4 items)
    { name: "Alkali Metal", class: "alkali-metal" },
    { name: "Alkaline Earth", class: "alkaline-earth-metal" },
    { name: "Transition Metal", class: "transition-metal" },
    { name: "Metalloid", class: "metalloid" },
    // Row 2 (4 items)
    { name: "Halogen", class: "halogen" },
    { name: "Noble Gas", class: "noble-gas" },
    { name: "Lanthanide", class: "lanthanide" },
    { name: "Actinide", class: "actinide" },
    // Row 3 (2 wider items)
    {
      name: "Other nonmetal",
      class: "other-nonmetal",
      layoutClass: "legend-wide-left",
    },
    {
      name: "Post-Transition",
      class: "post-transition-metal",
      layoutClass: "legend-wide-right",
    },
  ];
  categories.forEach((cat) => {
    const item = document.createElement("div");
    item.classList.add("legend-item");
    if (cat.layoutClass) item.classList.add(cat.layoutClass);
    item.setAttribute("data-category", cat.class);
    item.setAttribute("role", "button");
    item.setAttribute("tabindex", "0");
    item.setAttribute("aria-pressed", "false");
    item.setAttribute("aria-label", `Toggle ${cat.name} highlight`);
    const swatch = document.createElement("div");
    swatch.className = `legend-swatch ${cat.class}`;
    swatch.style.pointerEvents = "none";
    const label = document.createElement("span");
    label.textContent = cat.name;
    label.style.pointerEvents = "none";
    item.appendChild(swatch);
    item.appendChild(label);
    item.addEventListener("mouseenter", () => {
      if (lockLegendInteractions) return;
      if (activeLegendCategory) return;
      highlightCategory(container, cat.class);
    });
    item.addEventListener("mouseleave", () => {
      if (lockLegendInteractions) return;
      if (activeLegendCategory) return;
      clearHighlights(container);
    });
    const toggleLegendFilter = () => {
      if (lockLegendInteractions) return;
      if (activeLegendCategory === cat.class) {
        activeLegendCategory = null;
        item.classList.remove("active");
        item.setAttribute("aria-pressed", "false");
        clearHighlights(container);
      } else {
        clearLegendSelection(container);
        activeLegendCategory = cat.class;
        item.classList.add("active");
        item.setAttribute("aria-pressed", "true");
        highlightCategory(container, cat.class);
      }
    };
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleLegendFilter();
    });
    bindKeyboardActivation(item, toggleLegendFilter);
    legendContainer.appendChild(item);
  });
  container.appendChild(legendContainer);
}

// ===== Periodic Table Grid Generation =====
export function buildPeriodicTable(tableContainer) {
  resetEITRegistry();
  resetEITState();
  lockLegendInteractions = false;

  const grid = {};
  elements.forEach((element) => {
    // Range blocks (La-Lu, Ac-Lr) skip phase calculation but still enter grid
    if (typeof element.number !== "string") {
      // Calculate Phase @ STP (25°C)
      if (!element.phase) {
        const data = finallyData[element.number] || {};
        const parseT = (s) => {
          const m = (s || "").match(/-?[\d.]+/);
          return m ? parseFloat(m[0]) : null;
        };
        const m = parseT(data.level3_properties?.physical?.meltingPoint);
        const b = parseT(data.level3_properties?.physical?.boilingPoint);

        if (element.number >= 104) {
          element.phase = "Unknown";
        } else if (b !== null && 25 > b) {
          element.phase = "Gas";
        } else if (m !== null && 25 < m) {
          element.phase = "Solid";
        } else if (m !== null) {
          element.phase = "Liquid";
        } else {
          element.phase = "Unknown";
        }
      }
    }

    if (element.row && element.column) {
      grid[`${element.row}-${element.column}`] = element;
    }
  });
  for (let r = 1; r <= 7; r++) {
    for (let c = 1; c <= 18; c++) {
      const element = grid[`${r}-${c}`];
      const cell = document.createElement("div");
      if (element) {
        cell.classList.add("element");
        cell.setAttribute("role", "button");
        cell.setAttribute("tabindex", "0");
        if (element.category) {
          const catClass = normalizeCategoryClass(element.category
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^a-z0-9-]/g, ""));
          cell.classList.add(catClass);
        }
        cell.innerHTML = `
                      <span class="number">${element.number}</span>
                      <span class="symbol">${element.symbol}</span>
                      <span class="name">${element.name}</span>
                  `;
        // Range blocks (La-Lu, Ac-Lr): toggle category highlight instead of modal
        if (element.symbol === "La-Lu" || element.symbol === "Ac-Lr") {
          cell.classList.add("range-block");
          const catClass = element.symbol === "La-Lu" ? "lanthanide" : "actinide";
          const toggleRangeHighlight = () => {
            if (lockLegendInteractions) return;
            if (activeLegendCategory === catClass) {
              activeLegendCategory = null;
              clearLegendSelection(tableContainer);
              clearHighlights(tableContainer);
            } else {
              clearLegendSelection(tableContainer);
              activeLegendCategory = catClass;
              setLegendSelection(tableContainer, catClass);
              highlightCategory(tableContainer, catClass);
            }
          };
          cell.setAttribute(
            "aria-label",
            element.symbol === "La-Lu"
              ? "Toggle lanthanide highlight"
              : "Toggle actinide highlight",
          );
          cell.addEventListener("click", toggleRangeHighlight);
          bindKeyboardActivation(cell, toggleRangeHighlight);
        } else {
          const openElementModal = () => showModal(element);
          cell.setAttribute(
            "aria-label",
            `${element.name} (${element.symbol}), atomic number ${element.number}`,
          );
          cell.addEventListener("click", openElementModal);
          bindKeyboardActivation(cell, openElementModal);
          registerEITElementCell(cell, element);
        }
      } else {
        cell.classList.add("empty");
      }
      cell.style.gridRow = r;
      cell.style.gridColumn = c;
      tableContainer.appendChild(cell);
    }
  }
  createLegend(tableContainer);
  const lanthanides = elements
    .filter((e) => e.series === "lanthanide" && typeof e.number === "number")
    .sort((a, b) => a.number - b.number);
  const actinides = elements
    .filter((e) => e.series === "actinide" && typeof e.number === "number")
    .sort((a, b) => a.number - b.number);
  lanthanides.forEach((element, index) => {
    const cell = document.createElement("div");
    cell.classList.add("element", "lanthanide");
    cell.setAttribute("role", "button");
    cell.setAttribute("tabindex", "0");
    cell.setAttribute(
      "aria-label",
      `${element.name} (${element.symbol}), atomic number ${element.number}`,
    );
    if (element.category) {
      const catClass = normalizeCategoryClass(element.category
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^a-z0-9-]/g, ""));
      cell.classList.add(catClass);
    }
    cell.innerHTML = `
              <span class="number">${element.number}</span>
              <span class="symbol">${element.symbol}</span>
              <span class="name">${element.name}</span>
          `;
    const openElementModal = () => showModal(element);
    cell.addEventListener("click", openElementModal);
    bindKeyboardActivation(cell, openElementModal);
    registerEITElementCell(cell, element);
    cell.style.gridRow = 9;
    cell.style.gridColumn = 4 + index;
    tableContainer.appendChild(cell);
  });
  actinides.forEach((element, index) => {
    const cell = document.createElement("div");
    cell.classList.add("element", "actinide");
    cell.setAttribute("role", "button");
    cell.setAttribute("tabindex", "0");
    cell.setAttribute(
      "aria-label",
      `${element.name} (${element.symbol}), atomic number ${element.number}`,
    );
    if (element.category) {
      const catClass = normalizeCategoryClass(element.category
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^a-z0-9-]/g, ""));
      cell.classList.add(catClass);
    }
    cell.innerHTML = `
              <span class="number">${element.number}</span>
              <span class="symbol">${element.symbol}</span>
              <span class="name">${element.name}</span>
          `;
    const openElementModal = () => showModal(element);
    cell.addEventListener("click", openElementModal);
    bindKeyboardActivation(cell, openElementModal);
    registerEITElementCell(cell, element);
    cell.style.gridRow = 10;
    cell.style.gridColumn = 4 + index;
    tableContainer.appendChild(cell);
  });
  ensureEITController(tableContainer);
  const hash = window.location.hash.toLowerCase();
  if (hash === "#pb" || hash === "#lead") {
    const leadElement = elements.find((el) => el.symbol === "Pb");
    if (leadElement) {
      setTimeout(() => showModal(leadElement), 500);
    }
  }
}

// ===== Modal DOM References (assigned in initModalUI) =====
let modal, modalClose, modalSymbol, modalName, modalNumber, modalCategory,
  modalPhase, modalCategoryDisplay, modalConfigLarge, modalDiscovery,
  modalEtymology, modalDescription, modalDensity, modalMelt, modalBoil,
  modalNegativity, modalRadius, modalIonization, modalElectronAffinity, modalWatermark,
  atomContainer, modalCharge, modalP, modalE, modalN, modalPeriod,
  modalGroup, modalCompounds, modalUses, modalHazards, modalShells,
  eduNames, eduIsotopes, eduCardsContainer;

// ===== Pure Helpers =====
export function reRenderCurrentAtomModal() {
  if (window.currentAtomElement) {
    let currentLevelIndex = null;
    const activeDot = document.querySelector(".slider-dots .dot.active");
    if (activeDot && activeDot.parentElement) {
      const dots = Array.from(activeDot.parentElement.querySelectorAll(".dot"));
      const idx = dots.indexOf(activeDot);
      if (idx >= 0) currentLevelIndex = idx;
    }
    if (currentLevelIndex === null) {
      const activeLevelBtn = document.querySelector(".level-btn.active[data-level]");
      if (activeLevelBtn) {
        const parsed = Number(activeLevelBtn.dataset.level) - 1;
        if (!Number.isNaN(parsed) && parsed >= 0) currentLevelIndex = parsed;
      }
    }
    if (currentLevelIndex === null) {
      const visibleLevel = Array.from(document.querySelectorAll(".level-content")).find(
        (content) => getComputedStyle(content).display !== "none",
      );
      if (visibleLevel && visibleLevel.id?.startsWith("level-")) {
        const parsed = Number(visibleLevel.id.replace("level-", "")) - 1;
        if (!Number.isNaN(parsed) && parsed >= 0) currentLevelIndex = parsed;
      }
    }
    if (currentLevelIndex !== null) {
      window._pendingLevelIndex = currentLevelIndex;
    }
    showModal(window.currentAtomElement);
  }
}

function getElementCategory(element) {
  if (element.number === 1) return "Other nonmetal";
  const c = element.column;
  const metalloids = [5, 14, 32, 33, 51, 52, 85];
  if (metalloids.includes(element.number)) return "Metalloid";
  if (c === 18) return "Other nonmetal (Noble Gas)";
  if (c === 17) return "Other nonmetal (Halogen)";
  const otherNonmetals = [6, 7, 8, 15, 16, 34];
  if (otherNonmetals.includes(element.number)) return "Other nonmetal";
  return "Metal";
}
function calculateShells(element) {
  const z = element.number;
  let shells = [];
  if (z <= 20) {
    let remaining = z;
    let filled = Math.min(remaining, 2);
    shells.push(filled);
    remaining -= filled;
    if (remaining > 0) {
      filled = Math.min(remaining, 8);
      shells.push(filled);
      remaining -= filled;
    }
    if (remaining > 0) {
      filled = Math.min(remaining, 8);
      shells.push(filled);
      remaining -= filled;
    }
    if (remaining > 0) {
      filled = Math.min(remaining, 2);
      shells.push(filled);
      remaining -= filled;
    }
  } else {
    return `${element.row} shells`;
  }
  return shells.join(", ");
}

// ===== L3 Stat Item: Clickable Unit Conversion =====
// Tracks the current unit index per metric key so cycling persists during a modal session
const l3UnitState = { ie: 0, ea: 0, melt: 0, boil: 0, density: 0 };

const L3_UNIT_CONFIGS = {
  density: {
    units: [
      { unit: "g/cm³", digits: 2 },
      { unit: "kg/m³", digits: 0 },
      { unit: "lb/ft³", digits: 2 },
    ],
    parse(raw) {
      if (!raw || raw === "N/A" || raw === "Unknown") return null;
      const m = String(raw).match(/[\d.]+/);
      return m ? parseFloat(m[0]) : null;
    },
    convert(baseVal, unitIdx) {
      if (!Number.isFinite(baseVal)) return "N/A";
      if (unitIdx === 1) return (baseVal * 1000).toString();
      if (unitIdx === 2) return (baseVal * 62.42796).toFixed(2);
      return baseVal.toFixed(2);
    },
  },
  ie: {
    units: [
      { unit: "kJ/mol", digits: 0 },
      { unit: "eV", digits: 2 },
    ],
    parse(raw) {
      if (!raw || raw === "N/A") return null;
      const s = String(raw).replace(/−/g, "-").replace(/,/g, "");
      if (/ev/i.test(s)) {
        const num = parseFloat(s);
        return Number.isFinite(num) ? num * 96.485 : null; // convert eV → kJ/mol (base)
      }
      const m = s.match(/-?[\d.]+/);
      return m ? parseFloat(m[0]) : null;
    },
    convert(baseVal, unitIdx) {
      if (!Number.isFinite(baseVal)) return "N/A";
      if (unitIdx === 1) return (baseVal / 96.485).toFixed(2);
      return Math.round(baseVal).toString();
    },
  },
  ea: {
    units: [
      { unit: "kJ/mol", digits: 1 },
      { unit: "eV", digits: 2 },
    ],
    parse(raw) {
      if (!raw || raw === "N/A") return null;
      const s = String(raw).replace(/−/g, "-").replace(/,/g, "");
      const m = s.match(/-?[\d.]+/);
      return m ? parseFloat(m[0]) : null;
    },
    convert(baseVal, unitIdx) {
      if (!Number.isFinite(baseVal)) return "N/A";
      if (unitIdx === 1) return (baseVal / 96.485).toFixed(2);
      return baseVal.toFixed(1);
    },
  },
  melt: {
    units: [
      { unit: "°C", digits: 1 },
      { unit: "°F", digits: 1 },
      { unit: "K", digits: 1 },
    ],
    /**
     * Parse raw melt/boil string into { min, max, suffix }.
     * Preserves range info and (pred)/~ annotations.
     * Returns null for N/A values.
     */
    parse(raw) {
      if (!raw || typeof raw !== "string") return null;
      if (raw.includes("\u2014") || raw.includes("Pressurized") || raw === "N/A" || raw.includes("Unknown") || raw.includes("Sublimes")) return null;

      const predicted = /\(pred\)/i.test(raw);
      const approximate = /~/.test(raw);
      let suffix = "";
      if (approximate) suffix += "~";
      if (predicted) suffix += suffix ? " (pred)" : "(pred)";

      const s = raw.replace(/\u2212/g, "-").replace(/,/g, "").replace(/°C/g, "").trim();
      // Try range: "364–507"
      const rangeMatch = s.match(/(-?[\d.]+)\s*[\u2013\-]\s*(-?[\d.]+)/);
      if (rangeMatch) {
        const lo = parseFloat(rangeMatch[1]);
        const hi = parseFloat(rangeMatch[2]);
        if (Number.isFinite(lo) && Number.isFinite(hi)) {
          return { min: Math.min(lo, hi), max: Math.max(lo, hi), suffix, isRange: true };
        }
      }
      const m = s.match(/-?[\d.]+/);
      if (!m) return null;
      const v = parseFloat(m[0]);
      return Number.isFinite(v) ? { min: v, max: v, suffix, isRange: false } : null;
    },
    convert(baseVal, unitIdx) {
      if (!Number.isFinite(baseVal)) return "N/A";
      if (unitIdx === 1) return (baseVal * 9 / 5 + 32).toFixed(1);
      if (unitIdx === 2) return (baseVal + 273.15).toFixed(1);
      return baseVal.toFixed(1);
    },
    /** Format a parsed result (with range + suffix) for a given unit index */
    formatParsed(parsed, unitIdx) {
      if (!parsed || !Number.isFinite(parsed.min)) return "N/A";
      const c = L3_UNIT_CONFIGS.melt.convert;
      if (parsed.isRange) {
        return `${c(parsed.min, unitIdx)}\u2013${c(parsed.max, unitIdx)}`;
      }
      const valText = c(parsed.min, unitIdx);
      return parsed.suffix.startsWith("~") ? `~${valText}` : valText;
    },
    /** Get the suffix part to display after the unit, e.g. " (pred)" */
    getSuffix(parsed) {
      if (!parsed || !parsed.suffix) return "";
      // Remove leading ~ (shown in value), keep (pred)
      const s = parsed.suffix.replace(/^~\s*/, "").trim();
      return s ? ` ${s}` : "";
    },
  },
  boil: {
    // Same conversion logic as melt
    get units() { return L3_UNIT_CONFIGS.melt.units; },
    parse(raw) { return L3_UNIT_CONFIGS.melt.parse(raw); },
    convert(baseVal, unitIdx) { return L3_UNIT_CONFIGS.melt.convert(baseVal, unitIdx); },
    formatParsed(parsed, unitIdx) { return L3_UNIT_CONFIGS.melt.formatParsed(parsed, unitIdx); },
    getSuffix(parsed) { return L3_UNIT_CONFIGS.melt.getSuffix(parsed); },
  },
};

function setupL3UnitConversion(blueCard, rawData) {
  if (!blueCard) return;
  const items = blueCard.querySelectorAll(".l3-stat-item.l3-clickable[data-metric]");
  items.forEach((item) => {
    const metric = item.dataset.metric;
    const cfg = L3_UNIT_CONFIGS[metric];
    if (!cfg) return;
    const parsed = cfg.parse(rawData[metric]);
    // Store parsed data for click handler
    item._l3Parsed = parsed;
    item._l3Metric = metric;
    // For non-temp metrics, also store legacy base value
    item._l3Base = parsed && typeof parsed === "object" ? parsed.min : parsed;
    // Set cursor
    item.style.cursor = "pointer";
    // Remove old listener if any (use clone trick)
    const newItem = item.cloneNode(true);
    newItem._l3Parsed = parsed;
    newItem._l3Metric = metric;
    newItem._l3Base = item._l3Base;
    newItem.style.cursor = "pointer";
    item.parentNode.replaceChild(newItem, item);

    // Helper to update display for melt/boil (range + suffix aware)
    function updateTempDisplay(el, parsedData, unitIdx, unitCfg) {
      const valEl = el.querySelector(".l3-stat-value");
      const unitEl = el.querySelector(".l3-stat-unit");
      if (unitCfg.formatParsed) {
        // Range/suffix aware path
        if (valEl) valEl.textContent = unitCfg.formatParsed(parsedData, unitIdx);
        if (unitEl) {
          const suffixStr = unitCfg.getSuffix ? unitCfg.getSuffix(parsedData) : "";
          unitEl.textContent = unitCfg.units[unitIdx].unit + suffixStr;
        }
      } else {
        // Simple numeric path (ie, ea, density)
        const baseVal = parsedData && typeof parsedData === "object" ? parsedData.min : parsedData;
        if (valEl) valEl.textContent = unitCfg.convert(baseVal, unitIdx);
        if (unitEl) unitEl.textContent = unitCfg.units[unitIdx].unit;
      }
    }

    // Apply current persisted unit state immediately
    const currentIdx = l3UnitState[metric] || 0;
    if (currentIdx > 0) {
      updateTempDisplay(newItem, parsed, currentIdx, cfg);
    } else if (cfg.formatParsed && parsed) {
      // Even at index 0, apply suffix for pred/range values
      updateTempDisplay(newItem, parsed, 0, cfg);
    }

    newItem.addEventListener("click", (e) => {
      e.stopPropagation();
      const m = newItem._l3Metric;
      const c = L3_UNIT_CONFIGS[m];
      if (!c) return;
      // Cycle unit
      l3UnitState[m] = (l3UnitState[m] + 1) % c.units.length;
      const unitIdx = l3UnitState[m];
      updateTempDisplay(newItem, newItem._l3Parsed, unitIdx, c);
      // Micro-animation feedback
      newItem.style.transition = "transform 0.15s ease";
      newItem.style.transform = "scale(0.95)";
      setTimeout(() => { newItem.style.transform = "scale(1)"; }, 150);
    });
  });
}

// ===== Simplified View Population =====
function populateSimplifiedView(element) {
  const finallyElementData = finallyData[element.number] || {};
  const v2Data = elementsData_v2[element.number];
  const eduData = element.educational || {};
  const numberToSuperscript = (num) => {
    const map = {
      0: "⁰",
      1: "¹",
      2: "²",
      3: "³",
      4: "⁴",
      5: "⁵",
      6: "⁶",
      7: "⁷",
      8: "⁸",
      9: "⁹",
    };
    return num
      .toString()
      .split("")
      .map((d) => map[d] || d)
      .join("");
  };
  const setText = (selector, text) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
  };
  const setStyle = (el, styles) => {
    if (el) Object.assign(el.style, styles);
  };
  const findContentDiv = (cell, colorFilter) => {
    const divs =
      cell?.querySelectorAll('div[style*="font-size: 0.95rem"]') || [];
    for (const div of divs) {
      const style = div.getAttribute("style") || "";
      if (
        !colorFilter ||
        (colorFilter === "stse" && style.includes("color: #064E3B")) ||
        (colorFilter === "hazards" && style.includes("color: #991B1B")) ||
        (colorFilter === "uses" &&
          !style.includes("color: #064E3B") &&
          !style.includes("color: #991B1B"))
      ) {
        return div;
      }
    }
    return divs[0] || null;
  };
  const formatTemp = (temp) => {
    if (!temp || typeof temp !== "string") return "N/A";
    if (
      temp.includes("—") ||
      temp.includes("Pressurized") ||
      temp === "N/A" ||
      temp.includes("Unknown")
    )
      return "N/A";
    // Preserve range and annotations - strip only unit, keep ~, (pred), ranges
    let result = temp.replace(/\s*°C\s*/g, "").trim();
    // Remove trailing (pred) from value — it will be shown in the unit span via setupL3UnitConversion
    result = result.replace(/\s*\(pred\)\s*$/i, "").trim();
    return result;
  };
  const formatDensity = (density) => {
    if (!density || density === "N/A" || density === "Unknown")
      return { value: "N/A", unit: "" };
    const parts = density.split(" ");
    return { value: parts[0], unit: parts.slice(1).join(" ") };
  };
  const formatElectronegativity = (en) => {
    if (en === null || en === undefined) return "N/A";
    if (typeof en === "string") {
      if (en.includes("—") || en.trim() === "") return "N/A";
      const num = en.match(/[\d.]+/);
      return num ? parseFloat(num[0]).toFixed(2) : "N/A";
    }
    return en.toFixed(2);
  };
  const formatIonization = (ie) => {
    if (!ie) return "N/A";
    if (typeof ie === "string" && ie.includes("kJ/mol"))
      return ie.replace(" kJ/mol", "").trim();
    if (typeof ie === "string" && ie.includes("eV")) {
      const ev = parseFloat(ie);
      return !isNaN(ev) ? Math.round(ev * 96.485).toString() : "N/A";
    }
    return ie;
  };
  const formatSTSE = (content) => {
    const sentences = content.split(/[;。]\s*/).filter((s) => s.trim());
    return sentences
      .map((s, i) => s.trim() + (i < sentences.length - 1 ? "<br>" : ""))
      .join("");
  };
  const greenCard = document.querySelector(
    ".green-rectangle .card-info-container",
  );
  if (greenCard) {
    let typeDisplay = element.category || "Unknown";
    let phaseDisplay = element.phase || "Unknown";

    if (window.zperiodVersion === 'new' && v2Data) {
      typeDisplay = v2Data.level1_basic.type || typeDisplay;
      phaseDisplay = v2Data.level1_basic.phaseAtSTP || phaseDisplay;
    }

    setText(
      ".green-rectangle .info-row:nth-child(1) .info-value",
      typeDisplay,
    );
    let displayRow = element.row;
    let displayCol = element.column;
    if (element.series === "lanthanide") {
      displayRow = 6;
      displayCol = 3;
    } else if (element.series === "actinide") {
      displayRow = 7;
      displayCol = 3;
    }

    setText(
      ".green-rectangle .info-row:nth-child(2) .info-value",
      `${displayCol || "-"} / ${displayRow || "-"}`,
    );
    setText(
      ".green-rectangle .info-row:nth-child(3) .info-value",
      phaseDisplay,
    );
    const valenceRow = greenCard.querySelector(
      ".info-row:nth-child(4) .info-value",
    );
    if (valenceRow) {
      let valenceStr = "";
      if (window.zperiodVersion === 'new' && v2Data) {
        valenceStr = v2Data.level1_basic.valenceElectrons || "—";
      } else if (finallyElementData.level1_basic?.valenceElectrons !== undefined && finallyElementData.level1_basic?.valenceElectrons !== null) {
        const valence = finallyElementData.level1_basic.valenceElectrons;
        valenceStr = typeof valence === "string" ? valence : valence.toString();
      } else {
        valenceStr = "—";
      }
      valenceRow.textContent = valenceStr;
      // Use nowrap for very long valence strings like "Variable (outer s + d + f)"
      const isExtraLong = typeof valenceStr === "string" && valenceStr.includes("outer s + d + f");
      const isLong = typeof valenceStr === "string" && (valenceStr.includes("Variable") || valenceStr.includes("(") || valenceStr.length > 5);
      valenceRow.classList.remove("long-text", "long-text-nowrap");
      if (isExtraLong) {
        valenceRow.classList.add("long-text-nowrap");
      } else if (isLong) {
        valenceRow.classList.add("long-text");
      }
    }
    const ionsSection = greenCard.querySelector(".ions-section");
    if (ionsSection) {
      ionsSection
        .querySelectorAll(".ion-item")
        .forEach((item) => item.remove());
      let commonIonsText = finallyElementData.level1_basic?.commonIons || "";
      if (window.zperiodVersion === 'new' && v2Data) {
        commonIonsText = v2Data.level1_basic.commonIons || "";
      }

      const hasNoIons =
        !commonIonsText ||
        /none|n\/a|inert|unknown|does not form/i.test(commonIonsText) ||
        !commonIonsText.trim();
      const unicodeToHtml = (text) => {
        const subMap = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9' };
        const supMap = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁺': '+', '⁻': '-' };
        let result = '', i = 0;
        while (i < text.length) {
          if (subMap[text[i]] !== undefined) {
            let sub = '';
            while (i < text.length && subMap[text[i]] !== undefined) { sub += subMap[text[i]]; i++; }
            result += `<sub>${sub}</sub>`;
          } else if (supMap[text[i]] !== undefined) {
            let sup = '';
            while (i < text.length && supMap[text[i]] !== undefined) { sup += supMap[text[i]]; i++; }
            result += `<sup>${sup}</sup>`;
          } else {
            result += text[i]; i++;
          }
        }
        return result;
      };
      const createIonItem = (symbol, name) => {
        const item = document.createElement("div");
        item.className = "ion-item";
        item.innerHTML = `<span class="ion-symbol">${unicodeToHtml(symbol)}</span><span class="ion-arrow">→</span><span class="ion-name">${name}</span>`;
        return item;
      };
      if (hasNoIons) {
        ionsSection.appendChild(
          createIonItem(element.symbol, "No common ions"),
        );
      } else if (commonIonsText) {
        const parseIon = (ionText) => {
          // Match ion symbol (letters + superscript chars, plus optional subscript like Hg₂²⁺)
          const symMatch = ionText.match(
            /([A-Za-z]+[₀₁₂₃₄₅₆₇₈₉]*[⁺⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)/,
          );
          if (!symMatch) return { symbol: element.symbol, name: ionText };
          const symbol = symMatch[1];
          // Find the outermost parentheses content after the symbol
          const afterSymbol = ionText.substring(ionText.indexOf(symbol) + symbol.length).trim();
          if (afterSymbol.startsWith('(')) {
            // Find matching closing paren (handle nesting)
            let depth = 0, end = -1;
            for (let i = 0; i < afterSymbol.length; i++) {
              if (afterSymbol[i] === '(') depth++;
              else if (afterSymbol[i] === ')') { depth--; if (depth === 0) { end = i; break; } }
            }
            const name = end > 0 ? afterSymbol.substring(1, end) : afterSymbol.substring(1);
            return { symbol, name };
          }
          return { symbol, name: `${element.name} ion` };
        };
        if (commonIonsText.includes(",")) {
          commonIonsText
            .split(",")
            .map((s) => s.trim())
            .forEach((ionText) => {
              const { symbol, name } = parseIon(ionText);
              ionsSection.appendChild(createIonItem(symbol, name));
            });
        } else {
          const { symbol, name } = parseIon(commonIonsText);
          ionsSection.appendChild(createIonItem(symbol, name));
        }
      }
    }
  }
  const yellowCard = document.querySelector(
    ".yellow-rectangle .card-info-container",
  );
  if (yellowCard) {
    let avgMass = finallyElementData.level2_atomic?.mass?.highSchool || "—";
    if (window.zperiodVersion === 'new' && v2Data && v2Data.level2_atomic.mass.standard) {
      avgMass = v2Data.level2_atomic.mass.standard;
    }
    setText(".yellow-rectangle .info-row:nth-child(1) .info-value", avgMass);
    setText(
      ".yellow-rectangle .info-row:nth-child(2) .info-value",
      element.number.toString(),
    );
    setText(
      ".yellow-rectangle .info-row:nth-child(3) .info-value",
      element.number.toString(),
    );
    const isotopesSection = yellowCard.querySelector(".ions-section");
    if (isotopesSection) {
      isotopesSection
        .querySelectorAll(".ion-item")
        .forEach((item) => item.remove());
      let isotopesToDisplay =
        finallyElementData.level2_atomic?.naturalIsotopes?.length > 0
          ? finallyElementData.level2_atomic.naturalIsotopes
          : finallyElementData.level2_atomic?.naturallyOccurringRadioisotopes?.length > 0
            ? finallyElementData.level2_atomic.naturallyOccurringRadioisotopes
            : finallyElementData.level2_atomic?.representativeIsotopes?.length > 0
              ? finallyElementData.level2_atomic.representativeIsotopes
              : finallyElementData.level2_atomic?.longestLivedIsotopes?.length > 0
                ? finallyElementData.level2_atomic.longestLivedIsotopes
                : finallyElementData.level2_atomic?.mostStableIsotopes?.length > 0
                  ? finallyElementData.level2_atomic.mostStableIsotopes
                  : [];

      if (window.zperiodVersion === 'new' && v2Data) {
        isotopesToDisplay = v2Data.level2_atomic.naturalIsotopes || [];
      }
      isotopesToDisplay.forEach((iso) => {
        const parseMassNumber = () => {
          if (iso.name?.includes("-")) return iso.name.split("-")[1];
          if (iso.symbol) {
            const match = iso.symbol.match(/[¹²³⁴⁵⁶⁷⁸⁹⁰]+/);
            if (match) {
              const supToNum = {
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
              return match[0]
                .split("")
                .map((c) => supToNum[c] || c)
                .join("");
            }
          }
          return iso.name?.match(/\d+/)?.[0] || "";
        };
        const massNumber = parseMassNumber();
        if (!massNumber) return;
        const percent = (iso.percent || "").toLowerCase();
        const isStable =
          percent &&
          !percent.includes("trace") &&
          !percent.includes("radioactive");
        const neutronNumber =
          iso.neutron?.replace("n", "").replace("⁰", "0") || "";
        const isoItem = document.createElement("div");
        isoItem.className = "ion-item";
        isoItem.innerHTML = `
                      <span class="ion-symbol">${numberToSuperscript(massNumber)}${element.symbol}</span>
                      <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end;">
                          <span style="font-weight: 600; font-size: 0.95rem;">${neutronNumber} n⁰</span>
                          <span style="font-size: 0.7rem; text-transform: uppercase; opacity: 0.6; font-weight: 700; letter-spacing: 0.5px; ${isStable ? "" : "color: #B91C1C;"}">${isStable ? "Stable" : "Radioactive"}</span>
                      </div>
                  `;
        isotopesSection.appendChild(isoItem);
      });
    }
  }
  const blueCard = document.querySelector(
    ".blue-rectangle .card-info-container",
  );
  if (blueCard) {
    const configHero = blueCard.querySelector(".config-hero");
    if (configHero) {
      let config = finallyElementData.level3_properties?.electronic?.configuration || "—";
      if (window.zperiodVersion === 'new' && v2Data && v2Data.level3_properties.electronic.configuration) {
        config = v2Data.level3_properties.electronic.configuration;
      }
      const supMap = {
        "¹": "<sup>1</sup>",
        "²": "<sup>2</sup>",
        "³": "<sup>3</sup>",
        "⁴": "<sup>4</sup>",
        "⁵": "<sup>5</sup>",
        "⁶": "<sup>6</sup>",
        "⁷": "<sup>7</sup>",
        "⁸": "<sup>8</sup>",
        "⁹": "<sup>9</sup>",
        "⁰": "<sup>0</sup>",
      };
      configHero.innerHTML = Object.entries(supMap).reduce(
        (html, [u, h]) => html.replace(new RegExp(u, "g"), h),
        config,
      );
    }
    const oxidationContainer = blueCard.querySelector(".oxidation-container");
    if (oxidationContainer) {
      oxidationContainer.innerHTML = "";
      let statesObj = finallyElementData.level3_properties?.electronic?.oxidationStates || { common: [], possible: [] };
      if (window.zperiodVersion === 'new' && v2Data) {
        const v2Ox = v2Data.level3_properties?.electronic?.oxidationStates;
        if (v2Ox && ((v2Ox.common && v2Ox.common.length > 0) || (v2Ox.possible && v2Ox.possible.length > 0))) {
          statesObj = v2Ox;
        }
      }
      // Support legacy flat array format
      if (Array.isArray(statesObj)) {
        statesObj = { common: statesObj.slice(0, 1), possible: statesObj.slice(1) };
      }
      const common = statesObj.common || [];
      const possible = statesObj.possible || [];
      const total = common.length + possible.length;
      if (total > 0) {
        common.forEach((state) => {
          const pill = document.createElement("div");
          pill.className = "ox-pill common";
          pill.textContent = state;
          oxidationContainer.appendChild(pill);
        });
        possible.forEach((state) => {
          const pill = document.createElement("div");
          pill.className = "ox-pill possible";
          pill.textContent = state;
          oxidationContainer.appendChild(pill);
        });
        const pills = oxidationContainer.querySelectorAll(".ox-pill");
        if (total > 8) {
          oxidationContainer.style.gap = "3px";
          pills.forEach((p) => {
            p.style.fontSize = p.classList.contains("common") ? "0.65rem" : "0.6rem";
            p.style.padding = "2px 5px";
          });
        } else if (total > 5) {
          oxidationContainer.style.gap = "4px";
          pills.forEach((p) => {
            p.style.fontSize = p.classList.contains("common") ? "0.75rem" : "0.68rem";
            p.style.padding = "3px 7px";
          });
        } else {
          oxidationContainer.style.gap = "6px";
          pills.forEach((p) => {
            p.style.fontSize = "";
            p.style.padding = "";
          });
        }
      }
    }
    let en = finallyElementData.level3_properties?.physical?.electronegativity ?? null;
    let ie = finallyElementData.level3_properties?.physical?.firstIonization || "";
    let den = finallyElementData.level3_properties?.physical?.density || "";
    let melt = finallyElementData.level3_properties?.physical?.meltingPoint || "";
    let boil = finallyElementData.level3_properties?.physical?.boilingPoint || "";
    let ea = finallyElementData.level3_properties?.physical?.electronAffinity || "";

    if (window.zperiodVersion === 'new' && v2Data) {
      en = v2Data.level3_properties.physical.electronegativity ?? en;
      ie = v2Data.level3_properties.physical.firstIonization || ie;
      den = v2Data.level3_properties.physical.density || den;
      melt = v2Data.level3_properties.physical.meltingPoint || melt;
      boil = v2Data.level3_properties.physical.boilingPoint || boil;
      ea = v2Data.level3_properties.physical.electronAffinity || ea;
    }

    // New order: Row 1 = IE + EA, Row 2 = EN + Density, Row 3 = Melt + Boil
    setText(".blue-rectangle .l3-stat-item:nth-child(1) .l3-stat-value", formatIonization(ie));

    const eaDisplay = ea && ea !== "N/A" ? ea.replace(" kJ/mol", "").trim() : "N/A";
    setText(".blue-rectangle .l3-stat-item:nth-child(2) .l3-stat-value", eaDisplay);

    setText(".blue-rectangle .l3-stat-item:nth-child(3) .l3-stat-value", formatElectronegativity(en));

    const densityData = formatDensity(den);
    setText(".blue-rectangle .l3-stat-item:nth-child(4) .l3-stat-value", densityData.value);
    const densityUnit = blueCard.querySelector(".l3-stat-item:nth-child(4) .l3-stat-unit");
    if (densityUnit) densityUnit.textContent = densityData.unit;

    setText(".blue-rectangle .l3-stat-item:nth-child(5) .l3-stat-value", formatTemp(melt));
    setText(".blue-rectangle .l3-stat-item:nth-child(6) .l3-stat-value", formatTemp(boil));

    // ---- Clickable unit conversion on L3 stat items ----
    setupL3UnitConversion(blueCard, { ie, ea, melt, boil, density: den });
  }
  const redCard = document.querySelector(
    ".red-rectangle .card-info-container",
  );
  if (redCard) {
    setStyle(redCard, {
      width: "100%",
      maxWidth: "100%",
      overflowX: "hidden",
      boxSizing: "border-box",
    });
    const commonCellStyles = {
      width: "100%",
      maxWidth: "100%",
      boxSizing: "border-box",
      overflow: "hidden",
    };
    const commonContentStyles = {
      width: "100%",
      maxWidth: "100%",
      boxSizing: "border-box",
      wordWrap: "break-word",
      overflowWrap: "break-word",
      wordBreak: "break-word",
      overflow: "hidden",
    };
    redCard.querySelectorAll(".info-row").forEach((row) => {
      setStyle(row, {
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "space-between",
        gap: "10px",
      });
      setStyle(row.querySelector(".info-label"), {
        flexShrink: "0",
        minWidth: "fit-content",
        whiteSpace: "nowrap",
      });
      setStyle(row.querySelector(".info-value"), {
        flex: "1 1 auto",
        minWidth: "0",
        maxWidth: "100%",
        wordWrap: "break-word",
        overflowWrap: "break-word",
        whiteSpace: "normal",
        textAlign: "right",
        overflow: "visible",
      });
    });
    let year = finallyElementData.level4_history_stse?.history?.discoveryYear || "—";
    if (window.zperiodVersion === 'new' && v2Data && v2Data.level4_history_stse.history.discoveryYear) {
      year = v2Data.level4_history_stse.history.discoveryYear;
    }

    setText(
      ".red-rectangle .info-row:nth-child(2) .info-value",
      year,
    );
    let discoveredBy = finallyElementData.level4_history_stse?.history?.discoveredBy || "—";
    let namedBy = finallyElementData.level4_history_stse?.history?.namedBy || "—";

    if (window.zperiodVersion === 'new' && v2Data) {
      discoveredBy = v2Data.level4_history_stse.history.discoveredBy || "—";
      namedBy = v2Data.level4_history_stse.history.namedBy || "—";
    }

    setText(".red-rectangle .info-row:nth-child(3) .info-value", discoveredBy);
    setText(".red-rectangle .info-row:nth-child(4) .info-value", namedBy);

    const propGridSection = redCard.querySelector(".prop-grid-section");
    if (propGridSection) {
      setStyle(propGridSection, {
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        minWidth: "0",
      });
      const stseCell = propGridSection.querySelector(".prop-cell:nth-child(1)");
      if (stseCell) {
        setStyle(stseCell, commonCellStyles);
        const stseContent = findContentDiv(stseCell, "stse");

        let stseVal = (finallyElementData.level4_history_stse?.stseContext || []).join("; ");
        if (window.zperiodVersion === 'new' && v2Data) {
          stseVal = v2Data.level4_history_stse.stseContext && v2Data.level4_history_stse.stseContext.length > 0
            ? v2Data.level4_history_stse.stseContext.join(" • ")
            : "";
        }

        stseCell.style.display = "flex";
        if (stseContent) {
          setStyle(stseContent, commonContentStyles);
          if (stseVal) {
            stseContent.innerHTML = formatSTSE(stseVal);
          } else {
            stseContent.textContent = "—";
          }
        }
      }

      const usesCell = propGridSection.querySelector(".prop-cell:nth-child(2)");
      if (usesCell) {
        setStyle(usesCell, commonCellStyles);
        const usesContent = findContentDiv(usesCell, "uses");

        let usesVal = (finallyElementData.level4_history_stse?.commonUses || []).join(", ") || "—";
        if (window.zperiodVersion === 'new' && v2Data) {
          usesVal = v2Data.level4_history_stse.commonUses && v2Data.level4_history_stse.commonUses.length > 0
            ? v2Data.level4_history_stse.commonUses.join(", ")
            : "—";
        }

        if (usesContent) {
          setStyle(usesContent, commonContentStyles);
          usesContent.textContent = usesVal;
        }
      }

      const hazardsCell = propGridSection.querySelector(".prop-cell:nth-child(3)");
      if (hazardsCell) {
        setStyle(hazardsCell, commonCellStyles);
        const hazardsContent = findContentDiv(hazardsCell, "hazards");

        let hazardsVal = (finallyElementData.level4_history_stse?.hazards || []).join(", ") || "—";
        if (window.zperiodVersion === 'new' && v2Data) {
          hazardsVal = v2Data.level4_history_stse.hazards && v2Data.level4_history_stse.hazards.length > 0
            ? v2Data.level4_history_stse.hazards.join(", ")
            : "—";
        }

        if (hazardsContent) {
          setStyle(hazardsContent, commonContentStyles);
          hazardsContent.textContent = hazardsVal;
        }
      }
    }
  }
}

// ===== Show Modal (main element modal) =====
export function showModal(element) {
  // Blur the focused element cell so that subsequent space presses
  // don't re-trigger bindKeyboardActivation → showModal → 3D refresh
  if (document.activeElement && document.activeElement !== document.body) {
    document.activeElement.blur();
  }
  window.currentAtomElement = element;
  clearHeadlineResizeHandler();
  const finallyElementData = finallyData[element.number] || {};
  element.educational = element.educational || {};
  element.phase = element.phase || finallyElementData.level1_basic?.phaseAtSTP || "";
  element.electronConfig =
    finallyElementData.level3_properties?.electronic?.configuration || "";
  element.discovery =
    finallyElementData.level4_history_stse?.history?.discoveryYear || "";
  element.etymology =
    finallyElementData.level4_history_stse?.history?.namedBy || "";
  element.description = (finallyElementData.level4_history_stse?.stseContext || []).join("; ");
  initializeLevelSystem(element);
  const isSimplifiedView = element.number <= 118;
  const elementContent = document.querySelector(".element-content");
  const simplifiedBox = document.querySelector(".simplified-element-box");
  const modalInfoPane = document.querySelector(".modal-info-pane");
  if (elementContent && simplifiedBox && modalInfoPane) {
    if (isSimplifiedView) {
      elementContent.style.display = "none";
      simplifiedBox.style.display = "flex";
      modalInfoPane.classList.add("no-scroll");
      populateSimplifiedView(element);
    } else {
      elementContent.style.display = "flex";
      simplifiedBox.style.display = "none";
      modalInfoPane.classList.remove("no-scroll");
    }
  }
  const eduData = element.educational;
  const massNumbers = [
    1, 4, 7, 9, 11, 12, 14, 16, 19, 20,
    23, 24, 27, 28, 31, 32, 35, 40, 39, 40,
    45, 48, 51, 52, 55, 56, 59, 59, 64, 65,
    70, 73, 75, 79, 80, 84, 85, 88, 89, 91,
    93, 96, 98, 101, 103, 106, 108, 112, 115, 119,
    122, 128, 127, 131, 133, 137, 139, 140, 141, 144,
    145, 150, 152, 157, 159, 163, 165, 167, 169, 173,
    175, 178, 181, 184, 186, 190, 192, 195, 197, 201,
    204, 207, 209, 209, 210, 222, 223, 226, 227, 232,
    231, 238, 237, 244, 243, 247, 247, 251, 252, 257,
    258, 259, 266, 267, 268, 269, 270, 277, 278, 281,
    282, 285, 286, 289, 290, 293, 294, 294
  ];
  const headlineMass = document.getElementById("headline-mass");
  const headlineAtomic = document.getElementById("headline-atomic");
  const headlineSymbol = document.getElementById("headline-symbol");
  if (headlineMass) {
    const massNumber =
      element.number >= 1 && element.number <= 118
        ? massNumbers[element.number - 1]
        : Math.round(element.weight);
    headlineMass.textContent = massNumber;
  }
  if (headlineAtomic) {
    headlineAtomic.textContent = element.number;
  }
  if (headlineSymbol) {
    headlineSymbol.textContent = element.symbol;
  }
  const headlineName = document.getElementById("headline-name");
  if (headlineName) {
    headlineName.textContent = element.name;
    const resizeFont = () => {
      const container = headlineName.parentElement;
      const leftGroup = container.querySelector(".headline-left-group");
      if (!container || !leftGroup) return;
      const containerWidth = container.offsetWidth;
      const leftGroupWidth = leftGroup.offsetWidth;
      let margins = 80;
      let fontSize = 2.5;
      headlineName.style.marginLeft = "40px";
      headlineName.style.marginRight = "40px";
      headlineName.style.fontSize = fontSize + "rem";
      let availableWidth = containerWidth - leftGroupWidth - margins;
      while (headlineName.scrollWidth > availableWidth && fontSize > 1.0) {
        fontSize -= 0.1;
        headlineName.style.fontSize = fontSize + "rem";
      }
      if (fontSize < 1.8) {
        margins = 40;
        headlineName.style.marginLeft = "20px";
        headlineName.style.marginRight = "20px";
        availableWidth = containerWidth - leftGroupWidth - margins;
        fontSize = Math.min(2.5, fontSize + 0.3);
        headlineName.style.fontSize = fontSize + "rem";
        while (headlineName.scrollWidth > availableWidth && fontSize > 1.0) {
          fontSize -= 0.1;
          headlineName.style.fontSize = fontSize + "rem";
        }
      }
    };
    setTimeout(resizeFont, 0);
    headlineResizeHandler = resizeFont;
    window.addEventListener("resize", headlineResizeHandler);
  }
  const elementText = document.querySelector(".element-text");
  const elementName = document.querySelector(".element-name");
  if (elementText && elementName) {
    const nameLength = element.name.length;
    let lengthCategory;
    if (nameLength <= 4) {
      lengthCategory = "very-short";
    } else if (nameLength <= 6) {
      lengthCategory = "short";
    } else if (nameLength <= 10) {
      lengthCategory = "medium";
    } else {
      lengthCategory = "long";
    }
    elementText.setAttribute("data-name-length", lengthCategory);
  }
  if (modalCategory) {
    let cat = getElementCategory(element);
    if (eduData && eduData.amphoteric) {
      cat += " • Amphoteric";
    }
    modalCategory.textContent = cat;
  }
  if (modalWatermark) {
    modalWatermark.textContent = element.symbol;
  }
  if (modalPhase) modalPhase.textContent = element.phase || "—";
  if (modalCategoryDisplay) {
    modalCategoryDisplay.textContent = element.category || "—";
  }
  if (modalConfigLarge) {
    modalConfigLarge.textContent = element.electronConfig || "—";
  }
  if (modalDiscovery) modalDiscovery.textContent = element.discovery;
  if (modalEtymology) modalEtymology.textContent = element.etymology;
  if (modalDescription) modalDescription.textContent = element.description;
  // Optional helper to set up clickable unit toggling for arbitrary text elements
  function bindModalUnit(el, metricKey, rawVal) {
    if (!el) return;
    const cfg = L3_UNIT_CONFIGS[metricKey];
    if (!cfg || !rawVal || rawVal === "—" || rawVal === "N/A") {
      el.textContent = rawVal;
      el.style.cursor = "default";
      el.removeAttribute("title");
      // Strip old listeners by cloning
      const newEl = el.cloneNode(true);
      el.parentNode.replaceChild(newEl, el);
      // Update our reference
      if (metricKey === "density") modalDensity = newEl;
      if (metricKey === "melt") modalMelt = newEl;
      if (metricKey === "boil") modalBoil = newEl;
      if (metricKey === "ie") modalIonization = newEl;
      if (metricKey === "ea") modalElectronAffinity = newEl;
      return;
    }

    const baseVal = cfg.parse(rawVal);
    if (!Number.isFinite(baseVal)) {
      el.textContent = rawVal;
      return;
    }

    // Determine current index from state
    let unitIdx = l3UnitState[metricKey] || 0;

    // Create new element to flush old listeners
    const newEl = el.cloneNode(true);
    newEl.style.cursor = "pointer";
    newEl.title = "Click to change unit";

    function render() {
      const v = cfg.convert(baseVal, unitIdx);
      const u = cfg.units[unitIdx].unit;
      newEl.textContent = `${v} ${u}`;
    }

    render();

    newEl.addEventListener("click", (e) => {
      e.stopPropagation();
      unitIdx = (unitIdx + 1) % cfg.units.length;
      l3UnitState[metricKey] = unitIdx;
      render();
    });

    el.parentNode.replaceChild(newEl, el);
    // Update references so future calls work
    if (metricKey === "density") modalDensity = newEl;
    if (metricKey === "melt") modalMelt = newEl;
    if (metricKey === "boil") modalBoil = newEl;
    if (metricKey === "ie") modalIonization = newEl;
    if (metricKey === "ea") modalElectronAffinity = newEl;
  }

  if (modalDensity) bindModalUnit(modalDensity, "density", finallyElementData.level3_properties?.physical?.density || "—");
  if (modalMelt) bindModalUnit(modalMelt, "melt", finallyElementData.level3_properties?.physical?.meltingPoint || "—");
  if (modalBoil) bindModalUnit(modalBoil, "boil", finallyElementData.level3_properties?.physical?.boilingPoint || "—");

  if (modalNegativity)
    modalNegativity.textContent = finallyElementData.level3_properties?.physical?.electronegativity ?? "—";
  if (modalRadius) modalRadius.textContent = element.radius || "—";

  if (modalIonization) {
    bindModalUnit(modalIonization, "ie", finallyElementData.level3_properties?.physical?.firstIonization || "—");
  }
  if (modalElectronAffinity) {
    bindModalUnit(modalElectronAffinity, "ea", finallyElementData.level3_properties?.physical?.electronAffinity || "—");
  }
  const grp = element.column;
  if (eduNames && modalCharge) {
    if (eduData && eduData.stockNames) {
      modalCharge.style.display = "none";
      eduNames.style.display = "block";
      eduNames.innerHTML = eduData.stockNames
        .map(
          (n) =>
            `<div class="stock-name-item"><span class="stock-ion">${element.symbol}<sup>${n.charge}</sup></span> <span class="stock-text">= ${n.name}</span></div>`,
        )
        .join("");
    } else {
      modalCharge.style.display = "block";
      eduNames.style.display = "none";
      let statesObj = finallyElementData.level3_properties?.electronic?.oxidationStates || { common: [], possible: [] };
      // Support legacy flat array format
      if (Array.isArray(statesObj)) {
        statesObj = { common: statesObj.slice(0, 1), possible: statesObj.slice(1) };
      }
      const common = statesObj.common || [];
      const possible = statesObj.possible || [];
      if (common.length > 0 || possible.length > 0) {
        let html = common.map(s => `<span class="charge-main">${s}</span>`).join("");
        html += possible.map(s => `<span class="charge-sub">${s}</span>`).join("");
        modalCharge.innerHTML = html;
      } else {
        modalCharge.innerHTML = `<span class="charge-main">—</span>`;
      }
    }
  }
  const atomicNum = element.number;
  if (modalP) modalP.textContent = atomicNum;
  if (modalE) modalE.textContent = atomicNum;
  if (modalN) {
    const massNumbers = [
      1, 4, 7, 9, 11, 12, 14, 16, 19, 20,
      23, 24, 27, 28, 31, 32, 35, 40, 39, 40,
      45, 48, 51, 52, 55, 56, 59, 59, 64, 65,
      70, 73, 75, 79, 80, 84, 85, 88, 89, 91,
      93, 96, 98, 101, 103, 106, 108, 112, 115, 119,
      122, 128, 127, 131, 133, 137, 139, 140, 141, 144,
      145, 150, 152, 157, 159, 163, 165, 167, 169, 173,
      175, 178, 181, 184, 186, 190, 192, 195, 197, 201,
      204, 207, 209, 209, 210, 222, 223, 226, 227, 232,
      231, 238, 237, 244, 243, 247, 247, 251, 252, 257,
      258, 259, 266, 267, 268, 269, 270, 277, 278, 281,
      282, 285, 286, 289, 290, 293, 294, 294
    ];
    const massNumber = (atomicNum >= 1 && atomicNum <= 118)
      ? massNumbers[atomicNum - 1]
      : null;
    modalN.textContent = massNumber !== null ? (massNumber - atomicNum) : "—";
  }

  // Correct display for Lanthanides and Actinides
  let displayPeriod = element.row;
  let displayGroup = grp;
  if (element.series === "lanthanide") {
    displayPeriod = 6;
    displayGroup = 3;
  } else if (element.series === "actinide") {
    displayPeriod = 7;
    displayGroup = 3;
  }

  if (modalPeriod) modalPeriod.textContent = displayPeriod || "—";
  if (modalGroup) modalGroup.textContent = displayGroup || "—";
  const amphotericCard = document.getElementById("amphoteric-card");
  if (amphotericCard) {
    if (eduData && eduData.amphoteric) {
      amphotericCard.style.display = "flex";
    } else {
      amphotericCard.style.display = "none";
    }
  }
  if (eduNames) {
    if (eduData && eduData.stockNames) {
      eduNames.style.display = "block";
      eduNames.innerHTML = eduData.stockNames
        .map(
          (n) =>
            `<div class="stock-name-item"><span class="stock-ion">${element.symbol}<sup>${n.charge}</sup></span> <span class="stock-text">= ${n.name}</span></div>`,
        )
        .join("");
    } else {
      eduNames.style.display = "none";
    }
  }
  if (eduIsotopes) {
    if (eduData && eduData.isotopesOverride) {
      eduIsotopes.style.display = "block";
      eduIsotopes.innerHTML = `
                  <div class="iso-title">Natural Isotopes</div>
                  <table class="iso-table">
                      ${eduData.isotopesOverride
          .map(
            (iso) => `
                          <tr>
                              <td class="iso-name">${iso.name}</td>
                              <td class="iso-detail"><span class="n-badge">${iso.neutron}n</span></td>
                              <td class="iso-percent">${iso.percent}</td>
                          </tr>
                      `,
          )
          .join("")}
                  </table>
                  <div class="iso-note">Average Mass: ${element.weight}</div>
              `;
    } else {
      eduIsotopes.style.display = "none";
    }
  }
  if (eduCardsContainer) {
    eduCardsContainer.style.display = "none";
    eduCardsContainer.innerHTML = "";
    eduCardsContainer.className = "edu-cards-grid";
    let advancedHtml = "";
    const hasAdvanced =
      eduData &&
      (eduData.equilibriums ||
        eduData.electrochemistry ||
        eduData.thermodynamics);
    if (hasAdvanced) {
      eduCardsContainer.className = "advanced-data-container";
      eduCardsContainer.style.display = "flex";
      eduCardsContainer.style.flexDirection = "column";
      eduCardsContainer.style.gap = "24px";
      if (eduData.equilibriums) {
        advancedHtml += `
                      <div class="data-section">
                          <div class="data-title">Solubility Equilibrium (25°C)</div>
                          <table class="data-table">
                              <thead><tr><th>Reaction</th><th>K<sub>sp</sub></th></tr></thead>
                              <tbody>
                                  ${eduData.equilibriums
            .map(
              (e) => `
                                      <tr>
                                          <td class="formula">${e.reaction}</td>
                                          <td class="value">${e.value}</td>
                                      </tr>
                                  `,
            )
            .join("")}
                              </tbody>
                          </table>
                      </div>
                  `;
      }
      if (eduData.electrochemistry) {
        advancedHtml += `
                      <div class="data-section">
                          <div class="data-title">Standard Reduction Potentials</div>
                          <table class="data-table">
                              <thead><tr><th style="text-align:left">Half-Reaction</th><th>Type</th><th>E° (V)</th></tr></thead>
                              <tbody>
                                  ${eduData.electrochemistry
            .map(
              (e) => `
                                      <tr>
                                          <td class="formula">${e.reaction}</td>
                                          <td class="meta">${e.type}</td>
                                          <td class="value ${e.potential.includes("+") ? "pos" : "neg"}">${e.potential}</td>
                                      </tr>
                                  `,
            )
            .join("")}
                              </tbody>
                          </table>
                      </div>
                  `;
      }
      if (eduData.thermodynamics) {
        advancedHtml += `
                      <div class="data-section">
                          <div class="data-title">Standard Enthalpy & Entropy</div>
                          <table class="data-table">
                              <thead><tr><th>Compound</th><th>ΔH<sub>f</sub>° (kJ/mol)</th><th>S° (J/mol·K)</th></tr></thead>
                              <tbody>
                                  ${eduData.thermodynamics
            .map(
              (e) => `
                                      <tr>
                                          <td class="formula">${e.compound}</td>
                                          <td class="value">${e.value}</td>
                                          <td class="value">${e.entropy || "-"}</td>
                                      </tr>
                                  `,
            )
            .join("")}
                              </tbody>
                          </table>
                      </div>
                  `;
      }
      if (eduData.stse) {
        advancedHtml += `
                      <div class="data-section stse-section">
                          <div class="data-title">${eduData.stse.title}</div>
                          <div class="stse-content">
                              ${eduData.stse.content}
                          </div>
                          <div class="stse-tags">
                              ${eduData.stse.tags.map((t) => `<span class="stse-tag">${t}</span>`).join("")}
                          </div>
                      </div>
                  `;
      }
      eduCardsContainer.innerHTML = advancedHtml;
    } else if (eduData && (eduData.solubility || eduData.safety)) {
      eduCardsContainer.style.display = "grid";
      let html = "";
      if (eduData.solubility) {
        const sol = eduData.solubility;
        html += `<div class="edu-card edu-solubility" style="grid-column: 1 / -1; width: 100%;">
                              <h4 class="edu-title">Reaction Prediction</h4>`;
        if (sol.insoluble) {
          html +=
            `<div class="sol-group"><span class="sol-label bad">Precipitates (Insoluble):</span>` +
            sol.insoluble
              .map(
                (i) => `<div class="sol-item">• ${i.ion} → ${i.result}</div>`,
              )
              .join("") +
            `</div>`;
        }
        if (sol.soluble) {
          html +=
            `<div class="sol-group"><span class="sol-label good">Soluble:</span>` +
            sol.soluble
              .map((i) => `<div class="sol-item">• ${i.ion}</div>`)
              .join("") +
            `</div>`;
        }
        html += `</div>`;
      }
      if (eduData.safety) {
        const safe = eduData.safety;
        html += `<div class="edu-card edu-safety" style="width: 100%;">
                              <h4 class="edu-title">Safety</h4>
                              <div class="safe-row"><strong>Toxicity:</strong> ${safe.toxicity}</div>
                              <div class="safe-row"><strong>Env:</strong> ${safe.env}</div>
                            </div>`;
      }
      eduCardsContainer.innerHTML = html;
    }
  }
  let compounds = "—";
  if (modalCompounds) modalCompounds.textContent = compounds;
  if (modalUses) {
    modalUses.textContent = (finallyElementData.level4_history_stse?.commonUses || []).join(", ") || "—";
  }
  if (modalHazards) {
    modalHazards.textContent = (finallyElementData.level4_history_stse?.hazards || []).join(", ") || "—";
  }
  if (modalShells) {
    modalShells.textContent = calculateShells(element);
  }
  const modalIsotopes = document.getElementById("modal-isotopes");
  if (modalIsotopes) {
    modalIsotopes.innerHTML = "";
    if (element.isotopes && element.isotopes.length > 0) {
      element.isotopes.forEach((iso) => {
        const row = document.createElement("div");
        row.classList.add("isotope-row");
        const info = document.createElement("div");
        info.classList.add("iso-info");
        const sym = document.createElement("span");
        sym.classList.add("iso-symbol");
        sym.textContent = iso.symbol;
        const isoName = document.createElement("span");
        isoName.classList.add("iso-name");
        isoName.textContent = iso.name || "";
        const abundance = document.createElement("span");
        abundance.classList.add("iso-abundance");
        abundance.textContent = iso.abundance || "";
        info.appendChild(sym);
        info.appendChild(isoName);
        info.appendChild(abundance);
        const tag = document.createElement("span");
        tag.classList.add("iso-tag");
        const isStable = (iso.stability || "")
          .toLowerCase()
          .includes("stable");
        tag.classList.add(isStable ? "stable" : "radioactive");
        tag.textContent = iso.stability || "Radioactive";
        row.appendChild(info);
        row.appendChild(tag);
        modalIsotopes.appendChild(row);
      });
    } else {
      modalIsotopes.innerHTML = `<div class="isotope-row no-data-message">No key isotope data available.</div>`;
    }
  }
  let category = "Element";
  if (element.series) {
    category =
      element.series.charAt(0).toUpperCase() + element.series.slice(1);
  } else if (element.row === 7 && element.column === 18) {
    category = "Noble Gas";
  }
  if (element.isLanthanide) category = "Lanthanide";
  if (element.isActinide) category = "Actinide";
  if (modalCategory) {
    modalCategory.textContent = category;
  }
  const modalContent = modal.querySelector(".modal-content");
  if (modalContent) {
    modalContent.setAttribute(
      "data-element-name",
      `${element.symbol} - ${element.name}`,
    );
  }
  modal.classList.add("active");
  document.title = `Zperiod - ${element.name}`;
  document.body.classList.add("hide-nav");
  if (isSimplifiedView) {
    const slider = document.querySelector(".cards-slider");
    if (slider) {
      slider.style.visibility = "hidden";
    }
    requestAnimationFrame(() => {
      initSwipeSlider();
      if (slider) {
        slider.style.visibility = "visible";
      }
    });
  }
  if (element.number <= 118) {
    atomContainer.classList.add("visible");
    cleanup3D();
    clearCurrentAtom();
    renderScene();
    void atomContainer.offsetWidth;
    setTimeout(async () => {
      try {
        await ensureThreeLibLoaded();
        const contentHeight =
          modal.querySelector(".modal-content").clientHeight;
        if (atomContainer.clientHeight === 0) {
          const visualPane = atomContainer.parentElement;
          if (visualPane.clientHeight === 0) {
            visualPane.style.height = "100%";
            if (visualPane.clientHeight === 0) {
              atomContainer.style.height = contentHeight + "px";
            }
          } else {
            atomContainer.style.height = visualPane.clientHeight + "px";
          }
        }
        init3DScene(atomContainer);
        updateAtomStructure(element);
        onWindowResize();
        reset3DView();
        animateAtom();
        requestAnimationFrame(() => {
          atomContainer.style.opacity = "1";
        });
      } catch (e) {
        console.error("Three.js error:", e);
      }
    }, 100);
  } else {
    atomContainer.classList.remove("visible");
    cleanup3D();
  }
}

// ===== Level System =====
window.lockedLevelIndex = window.lockedLevelIndex ?? 0;
window.isLevelLocked = window.isLevelLocked ?? false;
function initializeLevelSystem(element) {
  const levelBtns = document.querySelectorAll(".level-btn");
  const levelContents = document.querySelectorAll(".level-content");
  levelBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetLevel = btn.dataset.level;
      switchToLevel(targetLevel, element);
      levelBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
  const pendingLevelIndex = Number.isInteger(window._pendingLevelIndex)
    ? Math.max(0, window._pendingLevelIndex)
    : null;
  const startLevel = pendingLevelIndex !== null
    ? String(pendingLevelIndex + 1)
    : window.isLevelLocked
      ? String(window.lockedLevelIndex + 1)
      : "1";
  switchToLevel(startLevel, element);
  levelBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.level === startLevel);
  });
}
function switchToLevel(level, element) {
  const levelContents = document.querySelectorAll(".level-content");
  levelContents.forEach((content) => {
    content.style.display = "none";
  });
  const targetContent = document.getElementById(`level-${level}`);
  if (targetContent) {
    targetContent.style.display = "block";
    populateLevelContent(level, element);
  }
}
function populateLevelContent(level, element) {
  const eduData = element.educational;
  if (level === "1") {
    populateLevel1(element, eduData);
  } else if (level === "2") {
    populateLevel2(element, eduData);
  } else if (level === "3") {
    populateLevel3(element, eduData);
  }
}
function populateLevel1(element, eduData) {
  const finallyElementData = finallyData[element.number] || {};
  const level1Protons = document.getElementById("level1-protons");
  const level1Electrons = document.getElementById("level1-electrons");
  const level1Neutrons = document.getElementById("level1-neutrons");
  const level1Mass = document.getElementById("level1-mass");
  const level1Density = document.getElementById("level1-density");
  const level1Melt = document.getElementById("level1-melt");
  if (level1Protons) level1Protons.textContent = element.number;
  if (level1Electrons) level1Electrons.textContent = element.number;
  if (level1Neutrons) {
    const massNumbers = [
      1, 4, 7, 9, 11, 12, 14, 16, 19, 20,
      23, 24, 27, 28, 31, 32, 35, 40, 39, 40,
      45, 48, 51, 52, 55, 56, 59, 59, 64, 65,
      70, 73, 75, 79, 80, 84, 85, 88, 89, 91,
      93, 96, 98, 101, 103, 106, 108, 112, 115, 119,
      122, 128, 127, 131, 133, 137, 139, 140, 141, 144,
      145, 150, 152, 157, 159, 163, 165, 167, 169, 173,
      175, 178, 181, 184, 186, 190, 192, 195, 197, 201,
      204, 207, 209, 209, 210, 222, 223, 226, 227, 232,
      231, 238, 237, 244, 243, 247, 247, 251, 252, 257,
      258, 259, 266, 267, 268, 269, 270, 277, 278, 281,
      282, 285, 286, 289, 290, 293, 294, 294
    ];
    const massNumber = (element.number >= 1 && element.number <= 118)
      ? massNumbers[element.number - 1]
      : null;
    level1Neutrons.textContent = massNumber !== null ? (massNumber - element.number) : "—";
  }
  if (level1Mass) level1Mass.textContent = finallyElementData.level2_atomic?.mass?.highSchool || "—";
  if (level1Density) {
    level1Density.textContent = finallyElementData.level3_properties?.physical?.density || "—";
  }
  if (level1Melt) {
    level1Melt.textContent = finallyElementData.level3_properties?.physical?.meltingPoint || "—";
  }
  const modalCategoryDisplay = document.getElementById(
    "modal-category-display",
  );
  const modalPhase = document.getElementById("modal-phase");
  const modalGroup = document.getElementById("modal-group");
  const amphotericCard = document.getElementById("amphoteric-card");
  if (modalCategoryDisplay)
    modalCategoryDisplay.textContent = element.category || "—";
  if (modalPhase) modalPhase.textContent = element.phase || "—";
  if (modalGroup) modalGroup.textContent = element.column || "—";
  if (amphotericCard) {
    if (eduData && eduData.amphoteric) {
      amphotericCard.style.display = "flex";
    } else {
      amphotericCard.style.display = "none";
    }
  }
}
function populateLevel2(element, eduData) { }
function populateLevel3(element, eduData) { }

// ===== Swipe Slider =====
function initSwipeSlider() {
  // Abort all previous listeners to prevent stacking
  if (window._elementSliderAbort) window._elementSliderAbort.abort();
  const ac = new AbortController();
  window._elementSliderAbort = ac;
  const sig = { signal: ac.signal };

  const slider = document.querySelector(".cards-slider");
  const dots = document.querySelectorAll(".slider-dots .dot");
  const slides = document.querySelectorAll(".card-slide");
  const lockBtn = document.getElementById("level-lock-btn");

  if (!slider || slides.length < 2) return;

  const MAX_INDEX = Math.min(slides.length - 1, 3); // Hard limit: 4 pages max (index 0-3)
  const hasPendingLevel = Number.isInteger(window._pendingLevelIndex);
  let currentIndex = hasPendingLevel
    ? Math.min(Math.max(window._pendingLevelIndex, 0), MAX_INDEX)
    : window.isLevelLocked
      ? Math.min(window.lockedLevelIndex, MAX_INDEX)
      : 0;
  window._pendingLevelIndex = null;
  const gap = 20;
  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;

  if (lockBtn) {
    lockBtn.style.display = "flex";
    const newLockBtn = lockBtn.cloneNode(true);
    lockBtn.parentNode.replaceChild(newLockBtn, lockBtn);
    newLockBtn.classList.toggle("locked", window.isLevelLocked);
    newLockBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.isLevelLocked = !window.isLevelLocked;
      window.lockedLevelIndex = currentIndex;
      newLockBtn.classList.toggle("locked", window.isLevelLocked);
      updateDots();
    }, sig);
  }

  function getSlideWidth() { return slider.clientWidth + gap; }

  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
      dot.classList.toggle("locked", window.isLevelLocked && i === window.lockedLevelIndex);
    });
  }

  function update3DEffect() {
    const scrollLeft = slider.scrollLeft;
    const slideWidth = getSlideWidth();
    slides.forEach((slide, index) => {
      const offset = (index * slideWidth - scrollLeft) / slider.clientWidth;
      if (Math.abs(offset) < 2) {
        const rotY = -25 * offset;
        const scale = 1 - 0.12 * Math.abs(offset);
        const opacity = 1 - 0.4 * Math.abs(offset);
        slide.style.transform = `perspective(800px) rotateY(${rotY}deg) scale(${scale})`;
        slide.style.opacity = Math.max(0.3, opacity);
        slide.style.zIndex = 10 - Math.abs(Math.round(offset));
      } else {
        slide.style.opacity = "0";
      }
    });
  }

  function snapToSlide(index, animated = true) {
    index = Math.max(0, Math.min(index, MAX_INDEX));
    currentIndex = index;
    const target = index * getSlideWidth();
    if (animated) {
      const start = slider.scrollLeft;
      const distance = target - start;
      const duration = 200;
      let startTime = null;
      function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        slider.scrollLeft = start + distance * eased;
        update3DEffect();
        if (progress < 1) requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
    } else {
      slider.scrollLeft = target;
    }
    updateDots();
    const el = window.currentAtomElement;
    if (el) switchToLevel(String(index + 1), el);
  }

  function getX(e) { return e.touches ? e.touches[0].clientX : e.pageX; }
  function startDrag(e) { isDragging = true; startX = getX(e); startScrollLeft = slider.scrollLeft; slider.style.cursor = "grabbing"; }
  function moveDrag(e) { if (!isDragging) return; slider.scrollLeft = startScrollLeft + (startX - getX(e)); update3DEffect(); }
  function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    slider.style.cursor = "grab";
    const slideWidth = getSlideWidth();
    const moved = slider.scrollLeft - currentIndex * slideWidth;
    const threshold = slideWidth * 0.15;
    let targetIndex = currentIndex;
    if (moved > threshold) targetIndex = currentIndex + 1;
    else if (moved < -threshold) targetIndex = currentIndex - 1;
    snapToSlide(targetIndex);
  }

  slider.addEventListener("mousedown", startDrag, sig);
  slider.addEventListener("touchstart", startDrag, { passive: true, ...sig });
  document.addEventListener("mousemove", moveDrag, sig);
  document.addEventListener("touchmove", moveDrag, { passive: true, ...sig });
  document.addEventListener("mouseup", endDrag, sig);
  document.addEventListener("touchend", endDrag, sig);

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => snapToSlide(Math.min(index, MAX_INDEX)), sig);
  });

  slider.addEventListener("scroll", () => {
    if (!isDragging) {
      update3DEffect();
      const realIndex = Math.max(0, Math.min(Math.round(slider.scrollLeft / getSlideWidth()), MAX_INDEX));
      dots.forEach((dot, i) => dot.classList.toggle("active", i === realIndex));
    }
  }, sig);

  document.addEventListener("keydown", (e) => {
    const elementModal = document.getElementById("element-modal");
    if (!elementModal || !elementModal.classList.contains("active")) return;
    if (e.key === "ArrowRight" || e.key === " ") {
      e.preventDefault();
      if (currentIndex < MAX_INDEX) snapToSlide(currentIndex + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (currentIndex > 0) snapToSlide(currentIndex - 1);
    }
  }, sig);

  // Trackpad two-finger swipe for Mac
  let wheelTimeout = null;
  slider.addEventListener("wheel", (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 30) {
      e.preventDefault();
      if (wheelTimeout) return;
      wheelTimeout = setTimeout(() => { wheelTimeout = null; }, 300);
      if (e.deltaX > 0 && currentIndex < MAX_INDEX) snapToSlide(currentIndex + 1);
      else if (e.deltaX < 0 && currentIndex > 0) snapToSlide(currentIndex - 1);
    }
  }, { passive: false, ...sig });

  snapToSlide(currentIndex, false);
  update3DEffect();
}

// ===== Initialize Modal UI (call on DOMContentLoaded) =====
export function initModalUI() {
  modal = document.getElementById("element-modal");
  modalClose = document.getElementById("modal-close");
  modalSymbol = document.getElementById("modal-symbol");
  modalName = document.getElementById("modal-name");
  modalNumber = document.getElementById("modal-number");
  modalCategory = document.getElementById("modal-category");
  modalPhase = document.getElementById("modal-phase");
  modalCategoryDisplay = document.getElementById("modal-category-display");
  modalConfigLarge = document.getElementById("modal-config-large");
  modalDiscovery = document.getElementById("modal-discovery");
  modalEtymology = document.getElementById("modal-etymology");
  modalDescription = document.getElementById("modal-description");
  modalDensity = document.getElementById("modal-density");
  modalMelt = document.getElementById("modal-melt");
  modalBoil = document.getElementById("modal-boil");
  modalNegativity = document.getElementById("modal-electronegativity");
  modalRadius = document.getElementById("modal-radius");
  modalIonization = document.getElementById("modal-ionization");
  modalElectronAffinity = document.getElementById("modal-electron-affinity");
  modalWatermark = document.getElementById("modal-watermark");
  atomContainer = document.getElementById("atom-container");
  modalCharge = document.getElementById("modal-charge");
  modalP = document.getElementById("modal-p");
  modalE = document.getElementById("modal-e");
  modalN = document.getElementById("modal-n");
  modalPeriod = document.getElementById("modal-period");
  modalGroup = document.getElementById("modal-group");
  modalCompounds = document.getElementById("modal-compounds");
  modalUses = document.getElementById("modal-uses");
  modalHazards = document.getElementById("modal-hazards");
  modalShells = document.getElementById("modal-shells");
  eduNames = document.getElementById("edu-names");
  eduIsotopes = document.getElementById("edu-isotopes");
  eduCardsContainer = document.getElementById("edu-cards-container");

  // Modal close handler
  function resetModalUI() {
    const slider = document.querySelector(".cards-slider");
    const dots = document.querySelectorAll(".slider-dots .dot");
    if (slider) {
      slider.scrollTo({ left: 0 });
      if (dots.length > 0) {
        dots.forEach((d) => d.classList.remove("active"));
        dots[0].classList.add("active");
      }
    }
    const levelBtns = document.querySelectorAll(".level-btn");
    const levelContents = document.querySelectorAll(".level-content");
    levelBtns.forEach((btn) => btn.classList.remove("active"));
    levelContents.forEach((content) => (content.style.display = "none"));
    const level1Btn = document.querySelector('.level-btn[data-level="1"]');
    const level1Content = document.getElementById("level-1");
    if (level1Btn) level1Btn.classList.add("active");
    if (level1Content) level1Content.style.display = "block";
  }

  function closeElementModal() {
    modal.classList.remove("active");
    document.body.classList.remove("hide-nav");
    document.title = "Zperiod";
    clearHeadlineResizeHandler();
    cleanup3D(true);
    atomContainer.classList.remove("visible");
    resetModalUI();
  }

  modalClose.addEventListener("click", () => {
    closeElementModal();
  });

  modal.addEventListener("click", (e) => {
    if (window._zperiodIsDragging) return;
    if (e.target === modal) {
      closeElementModal();
    }
  });
}

// Global Settings Initializer
// Manages unit preferences from the Settings page
export function initGlobalUnits() {
    // Helper to setup a sv-pill style metric toggle
    function setupUnitSetting(metricKeys, elementId) {
        if (!Array.isArray(metricKeys)) metricKeys = [metricKeys];
        const group = document.getElementById(elementId);
        if (!group) return;
        
        const btns = Array.from(group.querySelectorAll(".sv-pill-btn"));
        
        // Add dynamic slider for beautiful animation
        const slider = document.createElement("div");
        slider.className = "sv-pill-slider";
        group.appendChild(slider);
        
        function moveSliderTo(btn) {
            const groupRect = group.getBoundingClientRect();
            const btnRect = btn.getBoundingClientRect();
            // Only update if visible (width > 0)
            if (btnRect.width > 0) {
                slider.style.width = btnRect.width + "px";
                slider.style.transform = `translateX(${btnRect.left - groupRect.left}px)`;
            }
        }

        // Init layout when element becomes visible (fixes display:none issue)
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const activeIdx = l3UnitState[metricKeys[0]] || 0;
                slider.style.transition = "none";
                moveSliderTo(btns[activeIdx]);
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        slider.style.transition = "";
                    });
                });
            }
        });
        observer.observe(group);

        // Init state
        const activeIdx = l3UnitState[metricKeys[0]] || 0;
        btns.forEach((btn, idx) => {
            if (idx === activeIdx) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
            
            btn.addEventListener("click", () => {
                if (btn.classList.contains("active")) return;
                
                btns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                moveSliderTo(btn);
                
                metricKeys.forEach(key => l3UnitState[key] = idx);
            });
        });
        
        // Handle resize layout shifts
        window.addEventListener("resize", () => {
            const activeBtn = group.querySelector(".sv-pill-btn.active");
            if (activeBtn) {
                slider.style.transition = "none";
                moveSliderTo(activeBtn);
                requestAnimationFrame(() => {
                    slider.style.transition = "";
                });
            }
        });
    }

    setupUnitSetting(["melt", "boil"], "setting-unit-temp");    
    setupUnitSetting(["density"], "setting-unit-density");
    setupUnitSetting(["ie", "ea"], "setting-unit-energy");
}
