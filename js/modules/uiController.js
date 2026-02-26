// =============================================================================
// UI Controller - Periodic Table Grid & Element Modal
// Extracted from script.js: grid generation, modal population, level system
// =============================================================================

import { finallyData, elements } from "../data/elementsData.js";
import {
  init3DScene,
  updateAtomStructure,
  onWindowResize,
  reset3DView,
  animateAtom,
  cleanup3D,
  clearCurrentAtom,
  renderScene,
} from "./threeRenderer.js";

// ===== Legend & Category Highlighting =====
let activeLegendCategory = null;
function highlightCategory(container, catClass) {
  container.classList.add("highlighting");
  const elements = container.querySelectorAll(".element");
  elements.forEach((el) => {
    if (el.classList.contains(catClass)) {
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
function createLegend(container) {
  const legendContainer = document.createElement("div");
  legendContainer.id = "table-legend";
  const categories = [
    { name: "Alkali Metal", class: "alkali-metal" },
    { name: "Alkaline Earth", class: "alkaline-earth-metal" },
    { name: "Transition Metal", class: "transition-metal" },
    { name: "Post-Transition", class: "post-transition-metal" },
    { name: "Metalloid", class: "metalloid" },
    { name: "Non-metal", class: "non-metal" },
    { name: "Halogen", class: "halogen" },
    { name: "Noble Gas", class: "noble-gas" },
    { name: "Lanthanide", class: "lanthanide" },
    { name: "Actinide", class: "actinide" },
  ];
  categories.forEach((cat) => {
    const item = document.createElement("div");
    item.className = "legend-item";
    item.setAttribute("data-category", cat.class);
    const swatch = document.createElement("div");
    swatch.className = `legend-swatch ${cat.class}`;
    swatch.style.pointerEvents = "none";
    const label = document.createElement("span");
    label.textContent = cat.name;
    label.style.pointerEvents = "none";
    item.appendChild(swatch);
    item.appendChild(label);
    item.addEventListener("mouseenter", () => {
      if (activeLegendCategory) return;
      highlightCategory(container, cat.class);
    });
    item.addEventListener("mouseleave", () => {
      if (activeLegendCategory) return;
      clearHighlights(container);
    });
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      if (activeLegendCategory === cat.class) {
        activeLegendCategory = null;
        item.classList.remove("active");
        clearHighlights(container);
      } else {
        container
          .querySelectorAll(".legend-item.active")
          .forEach((el) => el.classList.remove("active"));
        activeLegendCategory = cat.class;
        item.classList.add("active");
        highlightCategory(container, cat.class);
      }
    });
    legendContainer.appendChild(item);
  });
  container.appendChild(legendContainer);
}

// ===== Periodic Table Grid Generation =====
export function buildPeriodicTable(tableContainer) {
  const grid = {};
  elements.forEach((element) => {
    // Calculate Phase @ STP (25°C)
    if (!element.phase) {
      const data = finallyData[element.symbol] || {};
      const parseT = (s) => {
        const m = (s || "").match(/-?[\d.]+/);
        return m ? parseFloat(m[0]) : null;
      };
      const m = parseT(data.melt);
      const b = parseT(data.boil);

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
        if (element.category) {
          const catClass = element.category
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^a-z0-9-]/g, "");
          cell.classList.add(catClass);
        }
        cell.innerHTML = `
                      <span class="number">${element.number}</span>
                      <span class="symbol">${element.symbol}</span>
                      <span class="name">${element.name}</span>
                  `;
        cell.addEventListener("click", () => showModal(element));
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
    .filter((e) => e.series === "lanthanide")
    .sort((a, b) => a.number - b.number);
  const actinides = elements
    .filter((e) => e.series === "actinide")
    .sort((a, b) => a.number - b.number);
  lanthanides.forEach((element, index) => {
    const cell = document.createElement("div");
    cell.classList.add("element", "lanthanide");
    if (element.category) {
      const catClass = element.category
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^a-z0-9-]/g, "");
      cell.classList.add(catClass);
    }
    cell.innerHTML = `
              <span class="number">${element.number}</span>
              <span class="symbol">${element.symbol}</span>
              <span class="name">${element.name}</span>
          `;
    cell.addEventListener("click", () => showModal(element));
    cell.style.gridRow = 9;
    cell.style.gridColumn = 4 + index;
    tableContainer.appendChild(cell);
  });
  actinides.forEach((element, index) => {
    const cell = document.createElement("div");
    cell.classList.add("element", "actinide");
    if (element.category) {
      const catClass = element.category
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^a-z0-9-]/g, "");
      cell.classList.add(catClass);
    }
    cell.innerHTML = `
              <span class="number">${element.number}</span>
              <span class="symbol">${element.symbol}</span>
              <span class="name">${element.name}</span>
          `;
    cell.addEventListener("click", () => showModal(element));
    cell.style.gridRow = 10;
    cell.style.gridColumn = 4 + index;
    tableContainer.appendChild(cell);
  });
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
  modalNegativity, modalRadius, modalIonization, modalWatermark,
  atomContainer, modalCharge, modalP, modalE, modalN, modalPeriod,
  modalGroup, modalCompounds, modalUses, modalHazards, modalShells,
  eduNames, eduIsotopes, eduCardsContainer;

// ===== Pure Helpers =====
function getElementCategory(element) {
  if (element.number === 1) return "Non-metal";
  const c = element.column;
  const metalloids = [5, 14, 32, 33, 51, 52, 85];
  if (metalloids.includes(element.number)) return "Metalloid";
  if (c === 18) return "Non-metal (Noble Gas)";
  if (c === 17) return "Non-metal (Halogen)";
  const otherNonmetals = [6, 7, 8, 15, 16, 34];
  if (otherNonmetals.includes(element.number)) return "Non-metal";
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

// ===== Simplified View Population =====
function populateSimplifiedView(element) {
  const finallyElementData = finallyData[element.symbol] || {};
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
    return temp.replace(" °C", "").replace("°C", "").trim();
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
  const formatSTSE = (content, symbol) => {
    if (symbol === "H")
      return `Energy transition (Fuel Cells)<br>Hydrogen as energy carrier<br><span style="opacity: 0.8; font-weight: 500; font-size: 0.85rem;">Heavy Water (D₂O) • CANDU</span>`;
    if (symbol === "He")
      return `Cryogenics (MRI supermagnets)<br>Non-renewable resource conservation.`;
    const sentences = content.split(/[;。]\s*/).filter((s) => s.trim());
    return sentences
      .map((s, i) => s.trim() + (i < sentences.length - 1 ? "<br>" : ""))
      .join("");
  };
  const greenCard = document.querySelector(
    ".green-rectangle .card-info-container",
  );
  if (greenCard) {
    setText(
      ".green-rectangle .info-row:nth-child(1) .info-value",
      element.category || "Unknown",
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
      element.phase || "Unknown",
    );
    const valenceRow = greenCard.querySelector(
      ".info-row:nth-child(4) .info-value",
    );
    if (valenceRow) {
      if (finallyElementData.valenceElectrons !== undefined) {
        const valence = finallyElementData.valenceElectrons;
        const valenceStr =
          typeof valence === "string" ? valence : valence.toString();
        valenceRow.textContent = valenceStr;
        valenceRow.classList.toggle(
          "long-text",
          typeof valence === "string" &&
          (valence.includes("Variable") ||
            valence.includes("(") ||
            valence.length > 5),
        );
      } else {
        let valence =
          element.number === 1
            ? 1
            : element.number === 2
              ? 2
              : element.column <= 2
                ? element.column
                : element.column <= 12
                  ? element.column
                  : element.column <= 18
                    ? element.column - 10
                    : 0;
        valenceRow.textContent = valence.toString();
      }
    }
    const ionsSection = greenCard.querySelector(".ions-section");
    if (ionsSection) {
      ionsSection
        .querySelectorAll(".ion-item")
        .forEach((item) => item.remove());
      const commonIonsText = finallyElementData.commonIons || "";
      const hasNoIons =
        !commonIonsText ||
        /none|n\/a|inert/i.test(commonIonsText) ||
        !commonIonsText.trim();
      const createIonItem = (symbol, name) => {
        const item = document.createElement("div");
        item.className = "ion-item";
        item.innerHTML = `<span class="ion-symbol">${symbol}</span><span class="ion-arrow">→</span><span class="ion-name">${name}</span>`;
        return item;
      };
      if (hasNoIons) {
        ionsSection.appendChild(
          createIonItem(element.symbol, "No common ions"),
        );
      } else if (eduData.stockNames?.length > 0) {
        eduData.stockNames.forEach((ion) => {
          ionsSection.appendChild(
            createIonItem(
              `${element.symbol}<sup>${ion.charge}</sup>`,
              ion.name,
            ),
          );
        });
      } else if (commonIonsText) {
        const parseIon = (ionText) => {
          const match = ionText.match(
            /([A-Za-z]+[⁺⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)\s*(?:\(([^)]+)\))?/,
          );
          return match
            ? { symbol: match[1], name: match[2] || `${element.name} ion` }
            : { symbol: element.symbol, name: ionText };
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
      } else {
        const charge =
          element.column === 1 && element.number !== 1
            ? "+"
            : element.column === 2
              ? "2+"
              : "";
        ionsSection.appendChild(
          createIonItem(
            charge ? `${element.symbol}<sup>${charge}</sup>` : element.symbol,
            charge ? `${element.name} ion` : "No common ions",
          ),
        );
      }
    }
  }
  const yellowCard = document.querySelector(
    ".yellow-rectangle .card-info-container",
  );
  if (yellowCard) {
    const avgMass =
      finallyElementData.avgAtomicMass ||
      (element.weight ? element.weight.toFixed(4) : "N/A");
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
      const isotopesToDisplay =
        finallyElementData.isotopes?.length > 0
          ? finallyElementData.isotopes
          : eduData.isotopesOverride?.length > 0
            ? eduData.isotopesOverride
            : [];
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
      const config =
        finallyElementData.electronConfig || element.electronConfig || "N/A";
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
      const states = finallyElementData.oxidationStates || [];
      if (states.length > 0) {
        const mainPill = document.createElement("div");
        mainPill.className = "ox-pill";
        mainPill.innerHTML = `<label>Common</label>${states[0]}`;
        oxidationContainer.appendChild(mainPill);
        states.slice(1).forEach((state) => {
          const pill = document.createElement("div");
          pill.className = "ox-pill faded";
          pill.innerHTML = `<label>Poss.</label>${state}`;
          oxidationContainer.appendChild(pill);
        });
        const pills = oxidationContainer.querySelectorAll(".ox-pill");
        if (states.length > 6) {
          oxidationContainer.style.gap = "3px";
          pills.forEach((p) => {
            p.style.fontSize = "0.7rem";
            p.style.padding = "2px 5px";
            const label = p.querySelector("label");
            if (label) {
              label.style.fontSize = "0.5rem";
              label.style.marginRight = "2px";
            }
          });
        } else if (states.length > 4) {
          oxidationContainer.style.gap = "5px";
          pills.forEach((p) => {
            p.style.fontSize = "0.8rem";
            p.style.padding = "3px 7px";
            const label = p.querySelector("label");
            if (label) label.style.fontSize = "0.55rem";
          });
        } else {
          oxidationContainer.style.gap = "8px";
          pills.forEach((p) => {
            p.style.fontSize = "";
            p.style.padding = "";
            const label = p.querySelector("label");
            if (label) {
              label.style.fontSize = "";
              label.style.marginRight = "";
            }
          });
        }
      }
    }
    setText(
      ".blue-rectangle .l3-stat-item:nth-child(1) .l3-stat-value",
      formatElectronegativity(
        finallyElementData.electronegativity ?? element.electronegativity,
      ),
    );
    setText(
      ".blue-rectangle .l3-stat-item:nth-child(2) .l3-stat-value",
      formatIonization(finallyElementData.ionization || element.ionization),
    );
    const densityData = formatDensity(
      finallyElementData.density || element.density,
    );
    setText(
      ".blue-rectangle .l3-stat-item:nth-child(3) .l3-stat-value",
      densityData.value,
    );
    const densityUnit = blueCard.querySelector(
      ".l3-stat-item:nth-child(3) .l3-stat-unit",
    );
    if (densityUnit) densityUnit.textContent = densityData.unit;
    setText(
      ".blue-rectangle .l3-stat-item:nth-child(4) .l3-stat-value",
      formatTemp(finallyElementData.melt || element.melt),
    );
    setText(
      ".blue-rectangle .l3-stat-item:nth-child(5) .l3-stat-value",
      formatTemp(finallyElementData.boil || element.boil),
    );
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
    const year =
      finallyElementData.discovery || element.discovery || "Unknown";
    setText(
      ".red-rectangle .info-row:nth-child(2) .info-value",
      typeof year === "string" ? year.split(" ")[0] : year,
    );
    setText(
      ".red-rectangle .info-row:nth-child(3) .info-value",
      finallyElementData.discoveredBy || "Unknown",
    );
    setText(
      ".red-rectangle .info-row:nth-child(4) .info-value",
      finallyElementData.namedBy || "Unknown",
    );
    const propGridSection = redCard.querySelector(".prop-grid-section");
    if (propGridSection) {
      setStyle(propGridSection, {
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        minWidth: "0",
      });
      const stseCell = propGridSection.querySelector(
        ".prop-cell:nth-child(1)",
      );
      if (stseCell) {
        setStyle(stseCell, commonCellStyles);
        const stseContent = findContentDiv(stseCell, "stse");
        if (stseContent && (finallyElementData.stse || eduData.stse)) {
          setStyle(stseContent, commonContentStyles);
          stseContent.innerHTML = formatSTSE(
            finallyElementData.stse || eduData.stse?.content || "",
            element.symbol,
          );
        } else {
          stseCell.style.display = "none";
        }
      }
      const usesCell = propGridSection.querySelector(
        ".prop-cell:nth-child(2)",
      );
      if (usesCell) {
        setStyle(usesCell, commonCellStyles);
        const usesContent = findContentDiv(usesCell, "uses");
        if (usesContent) {
          setStyle(usesContent, commonContentStyles);
          usesContent.textContent =
            finallyElementData.uses ||
            element.uses ||
            "Research and industrial applications";
        }
      }
      const hazardsCell = propGridSection.querySelector(
        ".prop-cell:nth-child(3)",
      );
      if (hazardsCell) {
        setStyle(hazardsCell, commonCellStyles);
        const hazardsContent = findContentDiv(hazardsCell, "hazards");
        if (hazardsContent) {
          setStyle(hazardsContent, commonContentStyles);
          hazardsContent.textContent =
            finallyElementData.hazards ||
            element.hazards ||
            "Follow safety guidelines";
        }
      }
    }
  }
}

// ===== Show Modal (main element modal) =====
export function showModal(element) {
  window.currentAtomElement = element;
  const finallyElementData = finallyData[element.symbol] || {};
  element.weight = element.weight || element.number * 2.5;
  element.educational = element.educational || {};
  element.phase = element.phase || "Unknown";
  element.electronConfig =
    element.electronConfig || finallyElementData.electronConfig || "N/A";
  element.discovery =
    element.discovery || finallyElementData.discovery || "Unknown";
  element.etymology =
    element.etymology || finallyElementData.namedBy || "N/A";
  element.description = element.description || finallyElementData.stse || "";
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
    window.addEventListener("resize", resizeFont);
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
  if (modalPhase) modalPhase.textContent = element.phase || "Unknown";
  if (modalCategoryDisplay) {
    modalCategoryDisplay.textContent = element.category || "Unknown";
  }
  if (modalConfigLarge) {
    modalConfigLarge.textContent = element.electronConfig || "N/A";
  }
  if (modalDiscovery) modalDiscovery.textContent = element.discovery;
  if (modalEtymology) modalEtymology.textContent = element.etymology;
  if (modalDescription) modalDescription.textContent = element.description;
  if (modalDensity) modalDensity.textContent = element.density || "-";
  if (modalMelt) modalMelt.textContent = element.melt || "-";
  if (modalBoil) modalBoil.textContent = element.boil || "-";
  if (modalNegativity)
    modalNegativity.textContent = element.electronegativity || "-";
  if (modalRadius) modalRadius.textContent = element.radius || "-";
  if (modalIonization) {
    let ie = element.ionization || "-";
    if (typeof ie === "string" && ie.includes("eV")) {
      const ev = parseFloat(ie);
      if (!isNaN(ev)) ie = `${(ev * 96.485).toFixed(1)} kJ/mol`;
    }
    modalIonization.textContent = ie;
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
      const commonOxidationStates = {
        H: ["+1", "-1"],
        He: ["0"],
        Li: ["+1"],
        Be: ["+2"],
        B: ["+3"],
        C: ["+4", "-4", "+2"],
        N: ["-3", "+5", "+3", "+4", "+2"],
        O: ["-2"],
        F: ["-1"],
        Ne: ["0"],
        Na: ["+1"],
        Mg: ["+2"],
        Al: ["+3"],
        Si: ["+4", "-4"],
        P: ["-3", "+5", "+3"],
        S: ["-2", "+6", "+4"],
        Cl: ["-1", "+1", "+3", "+5", "+7"],
        Ar: ["0"],
        K: ["+1"],
        Ca: ["+2"],
        Sc: ["+3"],
        Ti: ["+4", "+3"],
        V: ["+5", "+4", "+3", "+2"],
        Cr: ["+3", "+6", "+2"],
        Mn: ["+2", "+4", "+7"],
        Fe: ["+3", "+2"],
        Co: ["+2", "+3"],
        Ni: ["+2"],
        Cu: ["+2", "+1"],
        Zn: ["+2"],
        Ga: ["+3"],
        Ge: ["+4", "+2"],
        As: ["-3", "+5", "+3"],
        Se: ["-2", "+4", "+6"],
        Br: ["-1", "+1", "+5"],
        Kr: ["0"],
        Rb: ["+1"],
        Sr: ["+2"],
        Y: ["+3"],
        Zr: ["+4"],
        Nb: ["+5", "+3"],
        Mo: ["+6", "+4"],
        Tc: ["+7", "+4"],
        Ru: ["+3", "+4"],
        Rh: ["+3"],
        Pd: ["+2", "+4"],
        Ag: ["+1"],
        Cd: ["+2"],
        In: ["+3"],
        Sn: ["+4", "+2"],
        Sb: ["+3", "+5", "-3"],
        Te: ["-2", "+4", "+6"],
        I: ["-1", "+1", "+5", "+7"],
        Xe: ["0", "+2", "+4", "+6"],
        Cs: ["+1"],
        Ba: ["+2"],
        La: ["+3"],
        Ce: ["+3", "+4"],
        Pr: ["+3"],
        Nd: ["+3"],
        Pm: ["+3"],
        Sm: ["+3", "+2"],
        Eu: ["+3", "+2"],
        Gd: ["+3"],
        Tb: ["+3", "+4"],
        Dy: ["+3"],
        Ho: ["+3"],
        Er: ["+3"],
        Tm: ["+3", "+2"],
        Yb: ["+3", "+2"],
        Lu: ["+3"],
        Hf: ["+4"],
        Ta: ["+5"],
        W: ["+6", "+4"],
        Re: ["+7", "+4"],
        Os: ["+4"],
        Ir: ["+4", "+3"],
        Pt: ["+2", "+4"],
        Au: ["+3", "+1"],
        Hg: ["+2", "+1"],
        Tl: ["+1", "+3"],
        Pb: ["+2", "+4"],
        Bi: ["+3"],
        Po: ["+2", "+4"],
        At: ["-1", "+1"],
        Rn: ["0"],
        Fr: ["+1"],
        Ra: ["+2"],
        Ac: ["+3"],
        Th: ["+4"],
        Pa: ["+5", "+4"],
        U: ["+6", "+4"],
        Np: ["+5"],
        Pu: ["+4"],
        Am: ["+3"],
      };
      const states = commonOxidationStates[element.symbol];
      if (states && states.length > 0) {
        let html = `<span class="charge-main">${states[0]}</span>`;
        if (states.length > 1) {
          states.slice(1).forEach((s) => {
            html += `<span class="charge-sub">${s}</span>`;
          });
        }
        modalCharge.innerHTML = html;
      } else {
        let charge = "?";
        if (grp === 1) charge = "+1";
        else if (grp === 2) charge = "+2";
        else if (grp === 13) charge = "+3";
        else if (grp === 14) charge = "±4";
        else if (grp === 15) charge = "-3";
        else if (grp === 16) charge = "-2";
        else if (grp === 17) charge = "-1";
        else if (grp === 18) charge = "0";
        modalCharge.innerHTML = `<span class="charge-main">${charge}</span>`;
      }
    }
  }
  const atomicNum = element.number;
  const mass = Math.round(element.weight);
  const neutrons =
    eduData && eduData.neutronOverride
      ? eduData.neutronOverride
      : mass - atomicNum;
  if (modalP) modalP.textContent = atomicNum;
  if (modalE) modalE.textContent = atomicNum;
  if (modalN) modalN.textContent = neutrons > 0 ? neutrons : 0;

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

  if (modalPeriod) modalPeriod.textContent = displayPeriod || "-";
  if (modalGroup) modalGroup.textContent = displayGroup || "-";
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
  let compounds = "N/A";
  if (element.symbol === "H") compounds = "H₂O, CH₄, NH₃";
  else if (element.symbol === "He") compounds = "None (Inert)";
  else if (element.symbol === "Li") compounds = "LiOH, Li₂CO₃";
  else if (element.symbol === "C") compounds = "CO₂, CH₄, C₆H₁₂O₆";
  else if (element.symbol === "O") compounds = "H₂O, CO₂, SiO₂";
  else if (element.symbol === "Na") compounds = "NaCl, NaOH, NaHCO₃";
  else if (grp === 1) compounds = `MCl, M₂O`;
  else if (grp === 17) compounds = `NaF, NaCl, NaBr`;
  else compounds = element.symbol + "Cl₂, " + element.symbol + "O";
  if (modalCompounds) modalCompounds.textContent = compounds;
  if (modalUses) {
    if (element.uses) {
      modalUses.textContent = element.uses;
    } else if (element.symbol === "Pb") {
      modalUses.textContent =
        "Batteries, Radiation Shielding (X-Ray), Construction";
    } else {
      modalUses.textContent = "Used in research and industry.";
    }
  }
  if (modalHazards) {
    if (element.hazards) {
      modalHazards.textContent = element.hazards;
    } else if (element.symbol === "Pb") {
      modalHazards.textContent =
        "Neurotoxin (Brain/Nerve damage), Bioaccumulation";
    } else {
      modalHazards.textContent = "Follow safety guidelines";
    }
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
    setTimeout(() => {
      if (typeof THREE === "undefined") return;
      try {
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
  const startLevel = window.isLevelLocked
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
  const level1Protons = document.getElementById("level1-protons");
  const level1Electrons = document.getElementById("level1-electrons");
  const level1Neutrons = document.getElementById("level1-neutrons");
  const level1Mass = document.getElementById("level1-mass");
  const level1Density = document.getElementById("level1-density");
  const level1Melt = document.getElementById("level1-melt");
  if (level1Protons) level1Protons.textContent = element.number;
  if (level1Electrons) level1Electrons.textContent = element.number;
  if (level1Neutrons) {
    const neutrons =
      eduData && eduData.neutronOverride
        ? eduData.neutronOverride
        : Math.round(element.weight) - element.number;
    if (element.symbol === "Pb") {
      level1Neutrons.textContent = `${neutrons} (in Pb-208)`;
    } else {
      level1Neutrons.textContent = neutrons;
    }
  }
  if (level1Mass) level1Mass.textContent = element.weight;
  if (level1Density) {
    if (element.symbol === "Pb") {
      level1Density.textContent = "11.34 g/cm³ (Heavy!)";
    } else {
      level1Density.textContent = element.density || "N/A";
    }
  }
  if (level1Melt) {
    if (element.symbol === "Pb") {
      level1Melt.textContent = "327.5 °C (Easily melted)";
    } else {
      level1Melt.textContent = element.melt || "N/A";
    }
  }
  const modalCategoryDisplay = document.getElementById(
    "modal-category-display",
  );
  const modalPhase = document.getElementById("modal-phase");
  const modalGroup = document.getElementById("modal-group");
  const amphotericCard = document.getElementById("amphoteric-card");
  if (modalCategoryDisplay)
    modalCategoryDisplay.textContent = element.category || "Unknown";
  if (modalPhase) modalPhase.textContent = element.phase || "Unknown";
  if (modalGroup) modalGroup.textContent = element.column || "-";
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
  let currentIndex = window.isLevelLocked ? Math.min(window.lockedLevelIndex, MAX_INDEX) : 0;
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

  modalClose.addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.classList.remove("hide-nav");
    document.title = "Zperiod";
    cleanup3D(true);
    atomContainer.classList.remove("visible");
    resetModalUI();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.classList.remove("hide-nav");
      document.title = "Zperiod";
      cleanup3D(true);
      atomContainer.classList.remove("visible");
      resetModalUI();
    }
  });

  let currentPrimaryElement = null;
  const tableContainerEl = document.getElementById("periodic-table");
  if (tableContainerEl) {
    tableContainerEl.addEventListener("click", (e) => {
      const cell = e.target.closest(".element");
      if (cell && !cell.classList.contains("empty")) {
        const number = parseInt(cell.querySelector(".number").textContent);
        const element = elements.find((el) => el.number === number);
        if (element) {
          currentPrimaryElement = element;
          showModal(element);
        }
      }
    });
  }
}
