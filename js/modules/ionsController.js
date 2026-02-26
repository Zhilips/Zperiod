// =============================================================================
// Ions Controller - Ions Page Table & Modal
// Extracted from script.js: formatChem, formatCharge, initIonsTable
// =============================================================================

import { ionsData } from "../data/ionsData.js";


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

// Ion element sizing is now handled by CSS (5vw width + cqi units)

export function initIonsTable() {
  const container = document.getElementById("ions-table");
  if (!container) return;

  container.innerHTML = "";

  // Main container styles
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "clamp(8px, 2vh, 20px)";

  // Padding for internal spacing
  container.style.padding = "10px 20px";

  // Full width, centered
  container.style.width = "100%";
  container.style.maxWidth = "1400px";
  container.style.margin = "0 auto";

  // Override .periodic-table's min-width: 860px which prevents wrapping
  container.style.minWidth = "0";
  container.style.height = "auto";
  container.style.overflow = "visible";
  container.style.boxSizing = "border-box";

  // Define Structure Order
  const sectionOrder = ["basic", "core", "trans", "special"];
  const groupsBySection = {
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

  // Render Sections
  sectionOrder.forEach((secId) => {
    const secData = sections[secId];
    if (!secData) return;

    const sectionDiv = document.createElement("div");
    sectionDiv.className = "ion-section";
    sectionDiv.style.marginBottom = "clamp(8px, 2vh, 20px)";
    sectionDiv.style.width = "100%";
    sectionDiv.style.minWidth = "0";

    // Section Header
    const secHeader = document.createElement("h3");
    let headerText = secData.name;
    secHeader.textContent = headerText.replace(/^\d+\.\s*/, "");
    secHeader.style.cssText = `
                font-size: clamp(1rem, 2vh, 1.25rem);
                font-weight: 800;
                color: #222;
                margin-bottom: clamp(6px, 1vh, 12px);
                border-bottom: 2px solid #ddd;
                padding-bottom: clamp(4px, 0.6vh, 6px);
                padding-top: 8px;
            `;
    sectionDiv.appendChild(secHeader);

    // Single container for ALL ions in this section (Flattened)
    const sectionIonsContainer = document.createElement("div");
    sectionIonsContainer.style.cssText = `
                display: flex;
                flex-wrap: wrap;
                gap: clamp(4px, 1vh, 8px);
                align-content: flex-start;
                width: 100%;
                min-width: 0;
            `;

    // Define Group Colors (Distinct colors for each subgroup)
    const groupColors = {
      // 1. Basic Monatomic
      basic_cat1: "#FFCDD2", // Red 100 (+1)
      basic_cat2: "#FFCC80", // Orange 200 (+2)
      basic_cat3: "#FFF59D", // Yellow 200 (+3)
      basic_an1: "#B2EBF2", // Cyan 100 (-1)
      basic_an2: "#BBDEFB", // Blue 100 (-2)
      basic_an3: "#E1BEE7", // Purple 100 (-3)

      // 2. Core Polyatomic
      core_c: "#CFD8DC", // Blue Grey 100 (Carbon)
      core_n: "#F8BBD0", // Pink 100 (Nitrogen)
      core_s: "#DCEDC8", // Light Green 100 (Sulfur)
      core_p: "#D1C4E9", // Deep Purple 100 (Phosphorus)
      core_cl: "#B9F6CA", // Green Accent 100 (Chlorine)

      // 3. Transition Metals
      trans_cu: "#FFAB91", // Deep Orange 200 (Copper)
      trans_fe: "#BCAAA4", // Brown 200 (Iron)
      trans_pb: "#EEEEEE", // Grey 200 (Lead)
      trans_mn: "#E1BEE7", // Purple 100 (Manganate)
      trans_cr: "#FFE082", // Amber 200 (Chromate)

      // 4. Special & Organic
      spec_pair: "#B2DFDB", // Teal 100 (Special Pair)
      spec_acid: "#F0F4C3", // Lime 100 (Acidic)
      spec_org: "#D7CCC8", // Brown 100 (Organic)
    };

    // Iterate through groups but render ions into the SAME container
    const groupList = groupsBySection[secId] || [];
    groupList.forEach((groupId) => {
      const groupData = secData.groups[groupId];
      if (!groupData) return;

      groupData.ions.forEach((ion) => {
        const cell = document.createElement("div");
        cell.className = "element";

        // apply Group-Specific Color (Overriding class-based colors)
        const bgColor = groupColors[groupId] || "#f0f0f0";
        cell.style.backgroundColor = bgColor;
        cell.style.borderColor = "rgba(0,0,0,0.1)";

        // Card layout - size handled by CSS .ions-table-page .element
        cell.style.cssText += `
                        flex-shrink: 0;
                        position: relative;
                        cursor: pointer;
                    `;

        // Special Layout Adjustments for long ion names (no font-size overrides - CSS handles via cqi)
        let nameExtraStyle = "";

        // Long formulas get a CSS class for smaller symbol text
        if (ion.id === "ch3coo_minus") {
          cell.classList.add("ion-long-formula");
        }

        // Fix: Dihydrogen phosphate name wrapping
        if (ion.id === "h2po4_minus") {
          nameExtraStyle =
            "white-space: normal; line-height: 1.1; text-align: center; width: 100%;";
        }

        // Fix: Hydrogen phosphate name wrapping
        if (ion.id === "hpo4_2minus") {
          nameExtraStyle =
            "white-space: normal; line-height: 1.1; text-align: center; width: 100%;";
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

        cell.innerHTML = `
                        <span class="symbol">${symbolContent}</span>
                        <span class="name" style="${nameExtraStyle}">${ion.name}</span>
                    `;

        cell.addEventListener("click", () => openIonModal(ion));

        // Add hover effect via JS since inline style overrides CSS hover
        cell.addEventListener("mouseenter", () => {
          cell.style.filter = "brightness(0.95)";
          cell.style.transform = "scale(1.05)";
        });
        cell.addEventListener("mouseleave", () => {
          cell.style.filter = "none";
          cell.style.transform = "none";
        });

        sectionIonsContainer.appendChild(cell);
      });
    });

    sectionDiv.appendChild(sectionIonsContainer);
    container.appendChild(sectionDiv);
  });
}

// Ion slider shares the same global lock state as element slider for sync
// Uses: window.isLevelLocked, window.lockedLevelIndex (defined in element slider section)

function initIonSlider() {
  // Abort all previous listeners to prevent stacking
  if (window._ionSliderAbort) window._ionSliderAbort.abort();
  const ac = new AbortController();
  window._ionSliderAbort = ac;
  const sig = { signal: ac.signal };

  const slider = document.getElementById("ion-cards-slider");
  const dots = document.querySelectorAll("#ion-slider-dots .dot");
  const slides = slider.querySelectorAll(".card-slide");
  const lockBtn = document.getElementById("ion-level-lock-btn");

  if (!slider || slides.length < 2) return;

  const MAX_INDEX = Math.min(slides.length - 1, 3); // Hard limit: 4 pages max (index 0-3)
  let currentIndex = window.isLevelLocked ? Math.min(window.lockedLevelIndex, MAX_INDEX) : 0;
  const gap = 20;
  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;

  // Lock button setup - clone to avoid duplicate event listeners
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
    if (slider.clientWidth === 0) return;
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
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
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
    const ionModal = document.getElementById("ion-modal");
    if (!ionModal || !ionModal.classList.contains("active")) return;
    if (e.key === "ArrowRight" || e.key === " ") {
      e.preventDefault();
      if (currentIndex < MAX_INDEX) snapToSlide(currentIndex + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (currentIndex > 0) snapToSlide(currentIndex - 1);
    }
  }, sig);

  // Initialize
  snapToSlide(currentIndex, false);
  update3DEffect();
}

function openIonModal(ion) {
  const modal = document.getElementById("ion-modal");
  if (!modal) return;

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
  // Avoid duplicate "ion" suffix if name already ends with "ion" or "Ion"
  const nameEndsWithIon = ion.name.toLowerCase().endsWith("ion");
  const fullName = ion.name + (nameEndsWithIon ? "" : " ion");

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
    ion.type === "Cation" ? "Cation" : "Anion";
  document.getElementById("ion-category").textContent =
    ion.category === "Monatomic" ? "Monatomic" : "Polyatomic";
  document.getElementById("ion-charge-value").textContent = ion.charge;

  // Populate Additional Info
  const fromEl = document.getElementById("ion-from-element");
  if (fromEl) fromEl.textContent = ion.fromElement || "-";

  const formText = document.getElementById("ion-formation");
  if (formText) formText.innerHTML = formatChem(ion.formationEq) || "-";

  function fitText(el) {
    if (!el) return;
    el.style.whiteSpace = "nowrap";
    el.style.overflow = "hidden";
    let size = 1.6; // Start larger (was default 1.1-1.6?) - default styles say usually 1.5rem for values?
    // Visual check: value text is usually large. Let's assume standard is around 1.3rem.
    // Let's read computed style or just start at 1.4rem and shrink.

    // Reset to standard font size first
    el.style.fontSize = "";
    // Wait for render? No, synchronous.

    // Let's implement a loop.
    let currentSize = parseFloat(window.getComputedStyle(el).fontSize);
    if (!currentSize) currentSize = 24; // fallback 1.5rem

    while (el.scrollWidth > el.clientWidth && currentSize > 12) {
      currentSize -= 1;
      el.style.fontSize = currentSize + "px";
    }
  }

  // ===== Custom Data Handling (H+, Li+, Na+, K+, Ag+, etc.) =====
  if (ion.customData) {
    const cd = ion.customData;

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
      fitText(typeEl);
      fitText(catEl);
      fitText(phaseEl);
      fitText(chargeEl);
    }, 0);

    // Key Compounds - Refactor to "Common Ions" style pills
    const formText = document.getElementById("ion-formation");
    if (formText) {
      const roleLabel = formText.parentElement.querySelector(".info-label");
      if (roleLabel) roleLabel.textContent = "Key Compounds";

      // Clear previous content
      formText.innerHTML = "";
      formText.style.background = "transparent";
      formText.style.padding = "0";
      formText.style.display = "flex";
      formText.style.flexDirection = "column";
      formText.style.gap = "8px";

      // Parse string: "HCl (Stomach Acid), H2SO4 (Battery Acid)"
      const compounds = cd.level1.keyCompounds.split(", ");
      compounds.forEach((comp) => {
        // Regex to extract formula and name in parens
        const match = comp.match(/^(.+) \((.+)\)$/);
        let formula = comp;
        let name = "";

        if (match) {
          formula = match[1];
          name = match[2];
        }

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
      if (waterStateLabel) waterStateLabel.textContent = "Status";
      if (document.getElementById("h-plus-water-state")) {
        const statusEl = document.getElementById("h-plus-water-state");
        statusEl.textContent = cd.level2.statusBanner;
        statusEl.style.color = "#B45309";
        statusEl.style.fontWeight = "700";
        // Auto-fit status text to prevent overflow
        setTimeout(() => fitText(statusEl), 0);
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
      if (descA) setTimeout(() => fitText(descA), 50);
      if (descB) setTimeout(() => fitText(descB), 50);
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
      if (label) label.textContent = "Ionic Radius";
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
      if (label) label.textContent = "Hydration Enthalpy";
      l3Ion.textContent = cd.level3.hydrationEnthalpy;
    }

    // Oxidation State
    const l3Ox = document.getElementById("ion-l3-oxidation");
    if (l3Ox) {
      l3Ox.innerHTML = `<div class="ox-pill">${cd.level3.oxidation}</div>`;
    }

    // Level 4 (Red Card) - History & STSE - Match Element Layout
    const l4Container = document.getElementById("ion-l4-container");
    const l4YearLabel = document.getElementById("ion-l4-year-label");
    const l4Year = document.getElementById("ion-l4-year");
    const l4Grid = document.getElementById("ion-l4-grid");
    const l4Uses = document.getElementById("ion-l4-uses");
    const l4Hazards = document.getElementById("ion-l4-hazards");

    // 1. History Section Top (Year, Discovery, Named By)
    if (l4YearLabel) l4YearLabel.textContent = "Discovery Year";
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
                    <span class="info-label">Discovered By</span>
                    <span class="info-value" style="font-size: 0.95rem;">${cd.level4.discoveredBy}</span>
                `;
      l4Year.parentElement.after(discoveredRow);

      // Create Named By Row
      const namedRow = document.createElement("div");
      namedRow.className = "info-row h-plus-named-row";
      namedRow.style.marginBottom = "0";
      namedRow.innerHTML = `
                    <span class="info-label">Named By</span>
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

      const stseLines = cd.level4.stse
        .split(";")
        .map((s) => s.trim())
        .filter((s) => s);
      const stseHtml = stseLines
        .map((line) => `<div>${line}</div>`)
        .join("");

      stseCard.innerHTML = `
                    <span class="prop-cell-label" style="color: #047857; margin: 0;">STSE & Environment</span>
                    <div class="stse-content" style="font-size: 0.9rem; font-weight: 600; line-height: 1.4; color: #064E3B; display: flex; flex-direction: column; gap: 2px;">
                        ${stseHtml}
                    </div>`;
      l4Grid.prepend(stseCard);
    }

    // 3. Uses & Hazards
    if (l4Uses) {
      // Use <br> for separation to match element style better than bullet points sometimes
      l4Uses.innerHTML = cd.level4.commonUses.replace(/; /g, " • ");
      l4Uses.style.fontSize = "0.95rem";
      l4Uses.style.fontWeight = "600";
      l4Uses.parentElement.style.alignItems = "flex-start";
      l4Uses.parentElement.style.flexDirection = "column";
    }

    if (l4Hazards) {
      l4Hazards.innerHTML = cd.level4.hazards;
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
                            <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end;">
                                <span style="font-weight: 600; font-size: 0.95rem;">${iso.neutron.replace("n", " n⁰")}</span>
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
        l3Oxidation.innerHTML = elemData.oxidationStates
          .map(
            (ox, i) =>
              `<div class="ox-pill ${i > 0 ? "faded" : ""}"><label>${i === 0 ? "Common" : "Poss."}</label>${ox}</div>`,
          )
          .join("");
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
        '<div class="ion-item" style="justify-content: center; opacity: 0.5; font-style: italic;"><span>Coming Soon...</span></div>';
    const l3Oxidation = document.getElementById("ion-l3-oxidation");
    if (l3Oxidation)
      l3Oxidation.innerHTML =
        '<div class="ox-pill faded"><label>Possible</label>--</div>';
  }

  // Show modal
  modal.classList.add("active");
  document.title = `Zperiod - ${ion.name}`;

  // Re-apply fitText after modal is active to ensure clientWidth is correct
  setTimeout(() => {
    if (ion.customData) {
      fitText(document.getElementById("ion-type"));
      fitText(document.getElementById("ion-category"));
      fitText(document.getElementById("ion-phase"));
      fitText(document.getElementById("ion-charge-value"));
      const statusEl = document.getElementById("h-plus-water-state");
      if (statusEl) fitText(statusEl);

      const descA = document.querySelector(
        "#litmus-visual-card .visual-card-desc",
      );
      const descB = document.querySelector(
        "#reactivity-visual-card .visual-card-desc",
      );
      if (descA) fitText(descA);
      if (descB) fitText(descB);
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
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.classList.remove("hide-nav");
      document.title = "Zperiod";
    }
  };
}
