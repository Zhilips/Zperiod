import {
  EMPIRICAL_PRESETS,
  balanceEquationModal,
  calculateMolarMassModal,
  calculateEmpiricalModal,
  validateEmpiricalInputs,
  normalizeSymbol,
  formatFormulaHTML,
  atomicMasses,
} from "./js/modules/chemistryTools.js";
import {
  buildPeriodicTable,
  initModalUI,
  reRenderCurrentAtomModal,
  initGlobalUnits
} from "./js/modules/uiController.js";
import { initPageController } from "./js/modules/pageController.js";
import { createToolsModalController } from "./js/modules/toolsModalController.js";
import { changelogData } from "./js/data/changelogData.js";

// ========================================
// Welcome Modal - Intro Page
// ========================================
// ========================================
// Global Dragging State (used to prevent accidental panel close)
// ========================================
window._zperiodIsDragging = false;
(function initGlobalDragTracking() {
  let pointerDown = false;
  let startX = 0, startY = 0;
  const DRAG_THRESHOLD = 5;
  document.addEventListener('pointerdown', (e) => {
    pointerDown = true;
    startX = e.clientX;
    startY = e.clientY;
  }, true);
  document.addEventListener('pointermove', (e) => {
    if (!pointerDown) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
      window._zperiodIsDragging = true;
    }
  }, true);
  document.addEventListener('pointerup', () => {
    pointerDown = false;
    // Delay clearing drag state so click handlers see it
    setTimeout(() => { window._zperiodIsDragging = false; }, 80);
  }, true);
  document.addEventListener('pointercancel', () => {
    pointerDown = false;
    setTimeout(() => { window._zperiodIsDragging = false; }, 80);
  }, true);
  window.addEventListener('blur', () => {
    pointerDown = false;
    // Don't close panels on blur
  });
})();

// ========================================
// Global Animation Speed State
// ========================================
window._zperiodAnimPaused = localStorage.getItem('zperiod_anim_paused') === 'true';
window._zperiodAnimSpeed = parseFloat(localStorage.getItem('zperiod_anim_speed')) || 0.6;

// ========================================
// Lazy Script/Module Loaders (performance)
// ========================================
const lazyScriptPromises = new Map();
let ionsTableReady = false;
let worksheetReady = false;
let heroAtomModulePromise = null;

function loadClassicScriptOnce(src) {
  if (lazyScriptPromises.has(src)) return lazyScriptPromises.get(src);
  const promise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.lazySrc = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
  lazyScriptPromises.set(src, promise);
  return promise;
}

async function ensureIonsTableReady() {
  if (ionsTableReady) return;
  await loadClassicScriptOnce("js/ion-animations.js");
  const { initIonsTable } = await import("./js/modules/ionsController.js");
  initIonsTable();
  ionsTableReady = true;
}

async function ensureWorksheetReady() {
  if (worksheetReady) return;
  await loadClassicScriptOnce("js/worksheet-generator.js");
  worksheetReady = true;
}

function loadHeroAtomModule() {
  if (heroAtomModulePromise) return heroAtomModulePromise;
  heroAtomModulePromise = import("./js/modules/heroAtomRenderer.js");
  return heroAtomModulePromise;
}

function initWelcomeModal() {
  const welcomeModal = document.getElementById("welcome-modal");
  const closeBtn = document.getElementById("welcome-close-btn");
  const startBtn = document.getElementById("welcome-start-btn");

  const changelogModal = document.getElementById("changelog-modal");
  const changelogCloseBtn = document.getElementById("changelog-close-btn");
  const changelogDismissBtn = document.getElementById("changelog-dismiss-btn");

  // ===== Current version for changelog gating =====
  const CURRENT_VERSION = "1.3.0";

  // ===== Welcome helpers =====
  function openWelcomeModal() {
    if (!welcomeModal) return;
    welcomeModal.classList.add("active");
    document.body.classList.add("welcome-active");
    document.body.classList.add("hide-nav");
    void loadHeroAtomModule()
      .then(({ initHeroAtom }) => initHeroAtom())
      .catch((e) => console.error("Hero 3D init error:", e));
  }

  function closeWelcome() {
    if (!welcomeModal) return;
    welcomeModal.classList.remove("active");
    document.body.classList.remove("welcome-active");
    document.body.classList.remove("hide-nav");
    localStorage.setItem("zperiod_welcomed", "true");
    if (window._heroCleanup) window._heroCleanup();
  }

  // ===== Changelog helpers =====
  function openChangelogModal() {
    if (!changelogModal) return;
    changelogModal.classList.add("active");
    document.body.classList.add("hide-nav");
  }

  function closeChangelog() {
    if (!changelogModal) return;
    changelogModal.classList.remove("active");
    document.body.classList.remove("hide-nav");
    localStorage.setItem("zperiod_changelog_seen", CURRENT_VERSION);
    // Also mark as welcomed so the welcome modal won't pop up after
    localStorage.setItem("zperiod_welcomed", "true");
  }

  // ===== Decide which to show =====
  const seenChangelogVersion = localStorage.getItem("zperiod_changelog_seen");
  const hasVisited = localStorage.getItem("zperiod_welcomed");

  if (seenChangelogVersion !== CURRENT_VERSION) {
    // Changelog takes priority — show to ALL users (new or returning)
    openChangelogModal();
  } else if (!hasVisited) {
    // No pending changelog, but first-time visitor → show welcome
    openWelcomeModal();
  }

  // ===== Global helper to manually trigger welcome =====
  window._showWelcome = function showWelcome() {
    openWelcomeModal();
  };

  // ===== Event bindings: Welcome =====
  if (closeBtn) closeBtn.addEventListener("click", closeWelcome);
  if (startBtn) startBtn.addEventListener("click", closeWelcome);
  if (welcomeModal) {
    welcomeModal.addEventListener("click", (e) => {
      if (window._zperiodIsDragging) return;
      if (e.target === welcomeModal) closeWelcome();
    });
  }

  // ===== Event bindings: Changelog =====
  if (changelogCloseBtn) changelogCloseBtn.addEventListener("click", closeChangelog);
  if (changelogDismissBtn) changelogDismissBtn.addEventListener("click", closeChangelog);

  const showChangelogBtn = document.getElementById("show-changelog-btn");
  if (showChangelogBtn) {
    showChangelogBtn.addEventListener("click", () => {
      // Hide welcome modal and open changelog directly
      if (welcomeModal) welcomeModal.classList.remove("active");
      openChangelogModal();
    });
  }

  if (changelogModal) {
    changelogModal.addEventListener("click", (e) => {
      if (window._zperiodIsDragging) return;
      if (e.target === changelogModal) closeChangelog();
    });
  }

  // ===== Escape key closes whichever is active =====
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (changelogModal && changelogModal.classList.contains("active")) {
      closeChangelog();
    } else if (welcomeModal && welcomeModal.classList.contains("active")) {
      closeWelcome();
    }
  });
}

// Email copy function
window.copyEmail = function (text, btn) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      const copyIcon = btn.querySelector(".icon-copy");
      const checkIcon = btn.querySelector(".icon-check");

      if (copyIcon) copyIcon.style.display = "none";
      if (checkIcon) checkIcon.style.display = "block";

      btn.style.transform = "scale(0.98)";
      setTimeout(() => (btn.style.transform = "scale(1)"), 100);

      setTimeout(() => {
        if (copyIcon) copyIcon.style.display = "block";
        if (checkIcon) checkIcon.style.display = "none";
      }, 2000);
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
};

// ========================================
// Suggestion Input - UI Interaction
// ========================================
function initSuggestionBox() {
  const input = document.getElementById("suggestion-input");
  const sendBtn = document.getElementById("suggestion-send-btn");
  const box = document.getElementById("suggestion-box");
  if (!input || !sendBtn || !box) return;

  const BASE_WIDTH = 140;
  const PADDING_EXTRA = 60; // padding for send button + breathing room
  const sendIconHTML = sendBtn.innerHTML; // save original send icon

  const checkIconHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

  // Measure text width helper
  function measureText(text) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.font = "500 13.6px Inter, sans-serif";
    return ctx.measureText(text).width;
  }

  // Calculate max available width (from box to near center pill)
  function getMaxWidth() {
    const nav = document.getElementById("global-nav");
    const pill = document.querySelector(".global-nav-pill");
    if (!nav || !pill || !box) return 600;
    const pillRect = pill.getBoundingClientRect();
    const boxRight = nav.getBoundingClientRect().right - 60; // GitHub icon space
    const available = boxRight - pillRect.right - 30; // 30px gap from pill
    return Math.max(BASE_WIDTH, Math.min(available, 800));
  }

  // Update box width based on text content
  function updateWidth() {
    const hasText = input.value.trim().length > 0;
    sendBtn.classList.toggle("visible", hasText);

    const textWidth = measureText(input.value);
    const neededWidth = textWidth + PADDING_EXTRA;
    const maxW = getMaxWidth();
    const targetWidth = Math.max(BASE_WIDTH, Math.min(neededWidth, maxW));

    box.style.width = targetWidth + "px";
  }

  input.addEventListener("input", updateWidth);

  // Collapse on blur if empty
  input.addEventListener("blur", () => {
    setTimeout(() => {
      if (!input.value.trim()) {
        box.style.width = BASE_WIDTH + "px";
        sendBtn.classList.remove("visible");
      }
    }, 200);
  });

  // Send button click
  sendBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;

    // Send to Discord webhook
    fetch(
      "https://discord.com/api/webhooks/1470782870527414455/0c9YPJ-nWeAQ3FDyO7xou9TivkdrPWGmtISAS4MRyY9RKldhtsqekHfbPuhuYIMyVduU",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `📬 **New Suggestion from Zperiod**\n> ${text}\n\n_Sent at ${new Date().toLocaleString()}_`,
        }),
      },
    ).catch(() => { }); // silent fail

    // Clear input and collapse
    input.value = "";
    box.style.width = BASE_WIDTH + "px";
    sendBtn.classList.remove("visible");

    // Show green checkmark on button
    sendBtn.innerHTML = checkIconHTML;
    sendBtn.classList.add("sent");

    setTimeout(() => {
      sendBtn.innerHTML = sendIconHTML;
      sendBtn.classList.remove("sent");
    }, 800);
  });

  // Enter key to send
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && input.value.trim()) {
      sendBtn.click();
    }
  });
}

// ========================================
// Periodic Table Auto-Scale on Short Viewport
// ========================================
function initPeriodicTableScale() {
  const table = document.getElementById("periodic-table");
  const container = document.getElementById("main-container");
  if (!table || !container) return;

  const LOGICAL_WIDTH = 1240;
  const MAX_GAP = 96;
  const MIN_GAP = 24;
  let isScaling = false;

  function computeTvmin(tableW) {
    // Scale tvmin with table width to keep text proportional in cells
    const effectiveH = Math.max(window.innerHeight, 500);
    return Math.min(tableW, effectiveH) / 100;
  }

  function measureHeight(gap) {
    table.style.setProperty("--series-gap", `${gap}px`);
    table.style.transition = "none";
    table.style.transform = "none";
    void table.offsetHeight;
    return table.getBoundingClientRect().height;
  }

  function applyLayout(gap, scale, marginTop) {
    table.style.setProperty("--series-gap", `${gap}px`);
    table.style.transformOrigin = "top center";
    table.style.transform = scale < 0.999 ? `scale(${scale})` : "none";
    table.style.marginTop = `${marginTop}px`;

    const legend = document.getElementById("table-legend");
    if (legend) {
      legend.style.transform = "translateY(10px)";
      legend.style.transformOrigin = "top center";
    }
  }

  function scaleTable() {
    if (isScaling) return;
    if (getComputedStyle(container).display === "none") return;
    if (table.children.length === 0) return;

    isScaling = true;
    try {
      // 1. Measure Environment
      const containerStyle = getComputedStyle(container);
      const padT = parseFloat(containerStyle.paddingTop) || 0;
      const padB = parseFloat(containerStyle.paddingBottom) || 0;
      const availH = Math.max(window.innerHeight - padT - padB, 100);

      const MIN_READABLE_SCALE = 0.65;
      const SCROLL_THRESHOLD = 1150; // Below this, always scroll

      // 2. Smart width decision: try fitting at current window width first
      let tableWidth;
      let useScrollMode = false;

      if (window.innerWidth < SCROLL_THRESHOLD) {
        // Very narrow window: always use scroll mode
        useScrollMode = true;
      } else {
        // Try fitting at current window width
        const tryWidth = window.innerWidth - 40;
        const tryTvmin = computeTvmin(tryWidth);
        table.style.setProperty("--tvmin", `${tryTvmin}px`);
        table.style.width = `${tryWidth}px`;
        const tryH = measureHeight(MIN_GAP);
        const tryScale = availH / tryH;

        if (tryScale >= MIN_READABLE_SCALE) {
          // Table fits at this width with acceptable scaling
          tableWidth = tryWidth;
          // Set container min-width to window width (no scroll)
          container.style.minWidth = `${window.innerWidth}px`;
        } else {
          // Scale too small — table would be unreadable. Use scroll mode.
          useScrollMode = true;
        }
      }

      if (useScrollMode) {
        // Scroll mode: use fullscreen-equivalent width
        const fullscreenRef = Math.max(screen.availWidth, 1280);
        tableWidth = Math.max(fullscreenRef - 40, LOGICAL_WIDTH);
        container.style.minWidth = `${tableWidth + 40}px`;
      }

      // 3. Apply width and tvmin
      const tvmin = computeTvmin(tableWidth);
      table.style.setProperty("--tvmin", `${tvmin}px`);
      table.style.width = `${tableWidth}px`;

      // 4. Measure base height with MIN gap
      const hMin = measureHeight(MIN_GAP);

      // 5. Adaptive Gap: expand gap to fill available height, maximizing the table
      let currentGap;
      let height;
      let scale = 1;

      if (hMin > availH) {
        // Even with min gap, too tall → need to scale
        currentGap = MIN_GAP;
        height = hMin;
        scale = Math.max(availH / height, 0.1);
      } else {
        // Table fits. Expand gap to fill remaining space.
        const extraSpace = availH - hMin;
        currentGap = Math.min(MAX_GAP, MIN_GAP + extraSpace);
        height = measureHeight(currentGap);
        // Fine-tune: if somehow still doesn't fit, clamp
        if (height > availH) {
          currentGap = MIN_GAP;
          height = hMin;
        }
      }

      // 6. Vertical Centering
      const scaledHeight = height * scale;
      let marginTop = 0;
      if (scaledHeight < availH) {
        marginTop = (availH - scaledHeight) / 2;
      }

      // 7. Fix scroll mode margins: match container to visual width
      if (useScrollMode && scale < 0.999) {
        const visualWidth = Math.ceil(tableWidth * scale);
        container.style.minWidth = `${visualWidth + 40}px`;
      }

      // 8. Legend layout: switch between 4-col and 2-col based on VISUAL width
      const legend = document.getElementById("table-legend");
      if (legend) {
        // Legend spans grid-column 3/13 = 10 out of 18 columns
        // Use visual width (accounting for scale) to decide layout
        const legendVisualWidth = (10 / 18) * tableWidth * scale;
        // 4 columns need ~560px visual minimum (4 × 140px)
        if (legendVisualWidth < 560) {
          legend.classList.add("legend-compact");
        } else {
          legend.classList.remove("legend-compact");
        }
      }

      applyLayout(currentGap, scale, marginTop);

    } catch (e) {
      console.error("Scale Error:", e);
    } finally {
      isScaling = false;
    }
  }

  window._scalePeriodicTable = scaleTable;
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => requestAnimationFrame(scaleTable), 50);
  });
  window.addEventListener("load", scaleTable);
  // Also run immediately
  requestAnimationFrame(scaleTable);
}

function getChemToolContent(toolType) {
  switch (toolType) {
    case "balancer":
      return generateBalancerToolContent();
    case "molar-mass":
      return generateMolarMassToolContent();
    case "empirical":
      return generateEmpiricalToolContent();
    case "solubility":
      return generateSolubilityToolContent();
    default:
      return "";
  }
}

function initNavResponsive() {
  const nav = document.getElementById("global-nav");
  if (!nav) return;

  const SAFETY_GAP = 32;

  function checkNavCollision() {
    nav.classList.remove("nav-hide-brand");
    void nav.offsetWidth;

    const navInnerWidth = nav.clientWidth - 40;
    const logo = nav.querySelector(".nav-logo-link");
    const brand = nav.querySelector(".nav-brand");
    const pill = nav.querySelector(".global-nav-pill");

    const logoW = logo ? logo.offsetWidth : 0;
    const brandW = brand ? brand.offsetWidth : 0;
    const pillW = pill ? pill.offsetWidth : 0;
    const navGap = 12;
    const brandGap = brand && brandW > 0 ? 10 : 0;

    const totalNeeded = logoW + brandGap + brandW + navGap + pillW + SAFETY_GAP * 2;

    if (totalNeeded > navInnerWidth) {
      nav.classList.add("nav-hide-brand");
    }
  }

  let navResizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(navResizeTimer);
    navResizeTimer = setTimeout(checkNavCollision, 60);
  });
  window.addEventListener("load", checkNavCollision);
  requestAnimationFrame(checkNavCollision);
}

// Global Data Version State
window.zperiodVersion = 'old';

function bootstrapApp() {
  initWelcomeModal();

  // Version Dropdown Logic
  const dropdown = document.getElementById("version-dropdown");
  const toggle = document.getElementById("version-dropdown-toggle");
  const option = document.getElementById("version-dropdown-option");
  const currentLabel = toggle?.querySelector(".version-current-label");

  if (toggle && dropdown) {
    // Toggle dropdown open/close
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("open");
    });

    // Close dropdown on outside click
    document.addEventListener("click", () => {
      dropdown.classList.remove("open");
    });

    // Switch version — Advanced is disabled (not ready)
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'advanced-tooltip';
    // Only "Coming soon"
    tooltip.innerText = 'Coming soon';

    // Opaque Styles
    Object.assign(tooltip.style, {
      position: 'fixed',
      background: '#1a1a1a', // Dark opaque background
      color: '#fff', // White text
      padding: '6px 12px', // Compact padding
      borderRadius: '20px', // Pill shape
      fontSize: '12px',
      fontWeight: '500',
      lineHeight: '1',
      pointerEvents: 'none',
      zIndex: '9999',
      display: 'none',
      whiteSpace: 'nowrap',
      transform: 'translateY(-50%)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', // Softer shadow
      fontFamily: '"Inter", sans-serif',
      textAlign: 'center',
      border: 'none' // Remove border since it's opaque
    });
    document.body.appendChild(tooltip);

    // Hover logic
    if (option) {
      option.addEventListener('mouseenter', () => {
        const rect = option.getBoundingClientRect();
        // Position to the right of the dropdown menu
        tooltip.style.top = (rect.top + rect.height / 2) + 'px';
        tooltip.style.left = (rect.right + 12) + 'px'; // 12px gap
        tooltip.style.display = 'block';

        // Add a subtle fade-in animation
        tooltip.animate([
          { opacity: 0, transform: 'translateY(-50%) translateX(-5px)' },
          { opacity: 1, transform: 'translateY(-50%) translateX(0)' }
        ], { duration: 200, easing: 'ease-out' });
      });
      option.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
      });

      // Keep click disabled
      option.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }
  }
  initPeriodicTableScale();
  initNavResponsive();

  const tableContainer = document.getElementById("periodic-table");
  if (tableContainer) buildPeriodicTable(tableContainer);
  initModalUI();

  const toolsModalController = createToolsModalController({
    getToolContent: getChemToolContent,
    attachToolEventListeners,
  });
  toolsModalController.init();

  const pageCtrl = initPageController({
    onTablePageShown: () => {
      if (window._scalePeriodicTable) window._scalePeriodicTable();
    },
    onIonsPageShown: () => {
      void ensureIonsTableReady().catch((e) =>
        console.error("Ions lazy init error:", e),
      );
    },
    onToolsPageShown: () => {
      setTimeout(() => toolsModalController.initChemToolCards(), 100);
    },
    onWorksheetPageShown: () => {
      void ensureWorksheetReady().catch((e) =>
        console.error("Worksheet lazy init error:", e),
      );
    },
  });

  // Floating about button opens Welcome / Help
  const aboutBtn = document.getElementById("floating-about-btn");
  if (aboutBtn) {
    aboutBtn.addEventListener("click", () => {
      if (window._showWelcome) window._showWelcome();
    });
  }

  requestAnimationFrame(() => {
    if (window._scalePeriodicTable) window._scalePeriodicTable();
  });
  initSettingsPage();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrapApp, { once: true });
} else {
  bootstrapApp();
}

// ========================================
// Settings Page Initialization
// ========================================
function initSettingsPage() {
  initGlobalUnits();

  // --- Changelog (data from external file) ---
  const changelogList = document.getElementById("settings-changelog-list");
  if (changelogList) {
    changelogList.innerHTML = changelogData.map(entry => `
      <div class="changelog-entry">
        <div class="changelog-header">
          <span class="changelog-version">v${entry.version}</span>
          <span class="changelog-date">${entry.date}</span>
        </div>
        <ul class="changelog-items">
          ${entry.changes.map(c => `<li>${c}</li>`).join("")}
        </ul>
      </div>
    `).join("");
  }

  // --- Suggestion (Discord webhook) ---
  const suggInput = document.getElementById("settings-suggestion-input");
  const suggSend = document.getElementById("settings-suggestion-send");
  const suggStatus = document.getElementById("suggest-status");
  const chipContainer = document.getElementById("suggest-chips");

  // Prompt chips — click to pre-fill input
  if (chipContainer && suggInput) {
    let activeChip = null;
    chipContainer.addEventListener("click", (e) => {
      const chip = e.target.closest(".sv-chip");
      if (!chip) return;
      // Toggle active
      if (activeChip) activeChip.classList.remove("active");
      if (activeChip === chip) { activeChip = null; suggInput.value = ""; suggInput.placeholder = "Type your suggestion..."; return; }
      activeChip = chip;
      chip.classList.add("active");
      const prefill = chip.dataset.text || "";
      suggInput.value = prefill;
      suggInput.placeholder = prefill ? "Continue typing..." : "Type your suggestion...";
      suggInput.focus();
    });
  }

  if (suggInput && suggSend) {
    const sendIconHTML = suggSend.innerHTML;
    const checkIconHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

    function sendSuggestion() {
      const text = suggInput.value.trim();
      if (!text) return;
      fetch(
        "https://discord.com/api/webhooks/1470782870527414455/0c9YPJ-nWeAQ3FDyO7xou9TivkdrPWGmtISAS4MRyY9RKldhtsqekHfbPuhuYIMyVduU",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `📬 **New Suggestion from Zperiod**\n> ${text}\n\n_Sent at ${new Date().toLocaleString()}_`,
          }),
        },
      ).catch(() => { });
      suggInput.value = "";
      suggSend.innerHTML = checkIconHTML;
      suggSend.classList.add("sent");
      if (suggStatus) { suggStatus.textContent = "Sent! Thanks for your feedback."; suggStatus.className = "sv-suggest-status success"; }
      // Clear active chip
      if (chipContainer) { const ac = chipContainer.querySelector(".sv-chip.active"); if (ac) ac.classList.remove("active"); }
      setTimeout(() => {
        suggSend.innerHTML = sendIconHTML;
        suggSend.classList.remove("sent");
        if (suggStatus) { suggStatus.textContent = ""; suggStatus.className = "sv-suggest-status"; }
        suggInput.placeholder = "Type your suggestion...";
      }, 2500);
    }

    suggSend.addEventListener("click", sendSuggestion);
    // Auto-resize textarea as user types
    suggInput.addEventListener("input", function () {
      this.style.height = "auto";
      this.style.height = Math.min(this.scrollHeight, 160) + "px";
    });
    // Adjust height when pre-filling from chips
    chipContainer?.addEventListener("click", () => {
      setTimeout(() => {
        suggInput.style.height = "auto";
        suggInput.style.height = Math.min(suggInput.scrollHeight, 160) + "px";
      }, 10);
    });
  }

  // --- Help / Open Welcome ---
  const openWelcomeBtn = document.getElementById("settings-open-welcome");
  if (openWelcomeBtn) {
    openWelcomeBtn.addEventListener("click", () => {
      if (window._showWelcome) window._showWelcome();
    });
  }

  // --- Animation Controls ---
  const playToggle = document.getElementById("anim-play-toggle");
  const speedSlider = document.getElementById("anim-speed-slider");
  const speedLabel = document.getElementById("speed-value-label");

  // Initialize UI from saved state
  if (speedSlider) {
    speedSlider.value = window._zperiodAnimSpeed;
    if (speedLabel) speedLabel.textContent = window._zperiodAnimSpeed.toFixed(1) + "×";
  }
  if (playToggle) {
    updatePlayToggleIcon(playToggle, window._zperiodAnimPaused);
  }

  // Apply initial paused state to CSS animations
  applyAnimationPauseState(window._zperiodAnimPaused);

  if (playToggle) {
    playToggle.addEventListener("click", () => {
      window._zperiodAnimPaused = !window._zperiodAnimPaused;
      localStorage.setItem("zperiod_anim_paused", window._zperiodAnimPaused);
      updatePlayToggleIcon(playToggle, window._zperiodAnimPaused);
      applyAnimationPauseState(window._zperiodAnimPaused);
    });
  }

  if (speedSlider) {
    speedSlider.addEventListener("input", () => {
      const val = parseFloat(speedSlider.value);
      window._zperiodAnimSpeed = val;
      localStorage.setItem("zperiod_anim_speed", val);
      if (speedLabel) speedLabel.textContent = val.toFixed(1) + "×";
    });
  }
}

function updatePlayToggleIcon(btn, isPaused) {
  const pauseIcon = btn.querySelector(".icon-pause");
  const playIcon = btn.querySelector(".icon-play");
  if (isPaused) {
    if (pauseIcon) pauseIcon.style.display = "none";
    if (playIcon) playIcon.style.display = "block";
  } else {
    if (pauseIcon) pauseIcon.style.display = "block";
    if (playIcon) playIcon.style.display = "none";
  }
}

function applyAnimationPauseState(paused) {
  // Toggle CSS animations
  document.documentElement.style.setProperty(
    "--ion-anim-play-state",
    paused ? "paused" : "running"
  );
}


function generateBalancerToolContent() {
  return `
        <style>
            /* ===== Apple Style Floating Cards ===== */
            .balancer-main-wrapper {
                display: flex;
                flex-direction: column;
                gap: 16px;
                flex: 1;
                min-height: 0;
                container-type: inline-size;
                container-name: balancer;
            }

            .balancer-float-card {
                background: rgba(255, 255, 255, 0.72);
                backdrop-filter: blur(20px) saturate(180%);
                -webkit-backdrop-filter: blur(20px) saturate(180%);
                border-radius: 16px;
                border: 1px solid rgba(255, 255, 255, 0.6);
                box-shadow:
                    0 2px 8px rgba(0, 0, 0, 0.04),
                    0 8px 24px rgba(0, 0, 0, 0.08),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8);
                transition: all 0.2s ease;
            }

            .balancer-float-card:hover {
                box-shadow:
                    0 4px 12px rgba(0, 0, 0, 0.06),
                    0 12px 32px rgba(0, 0, 0, 0.1),
                    inset 0 1px 0 rgba(255, 255, 255, 0.9);
            }

            .physics-scale-container {
                perspective: 1000px;
                width: 100%;
                min-width: 460px;
                min-height: 240px;
                max-height: 420px;
                flex: 1;
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: rgba(248, 250, 252, 0.6);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border-radius: 16px;
                overflow: hidden;
                border: 1px solid rgba(255, 255, 255, 0.6);
                box-shadow:
                    0 2px 8px rgba(0, 0, 0, 0.04),
                    0 8px 24px rgba(0, 0, 0, 0.08),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8);
            }

            .physics-scale-container::before {
                content: '';
                position: absolute;
                bottom: 50px;
                left: 50%;
                transform: translateX(-50%);
                width: 120px;
                height: 60px;
                background: radial-gradient(ellipse at center bottom, rgba(99, 102, 241, 0.08) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
            }

            .physics-beam-metallic {
                background: linear-gradient(180deg, #6b7280 0%, #4b5563 30%, #374151 70%, #1f2937 100%);
                box-shadow:
                    0 4px 12px rgba(0,0,0,0.25),
                    inset 0 2px 0 rgba(255,255,255,0.15),
                    inset 0 -1px 0 rgba(0,0,0,0.2);
                transition: transform 0.1s linear;
                transform-origin: center center;
            }

            .physics-beam-ruler {
                background-image: repeating-linear-gradient(
                    90deg,
                    rgba(255,255,255,0.25) 0px,
                    rgba(255,255,255,0.25) 1px,
                    transparent 1px,
                    transparent 15px
                );
                height: 40%;
                width: 85%;
                position: absolute;
                top: 30%;
                left: 7.5%;
                pointer-events: none;
            }

            .physics-pan-metallic {
                background: linear-gradient(180deg, #4b5563 0%, #374151 50%, #1f2937 100%);
                box-shadow:
                    0 8px 25px -4px rgba(0, 0, 0, 0.35),
                    inset 0 2px 0 rgba(255,255,255,0.08),
                    inset 0 -1px 3px rgba(0,0,0,0.2);
            }

            .physics-support-rod {
                width: 3px;
                background: linear-gradient(90deg, #d1d5db 0%, #6b7280 20%, #374151 50%, #6b7280 80%, #d1d5db 100%);
                height: 80px;
                margin: 0 auto;
                position: relative;
                z-index: 5;
                box-shadow: 2px 0 4px rgba(0,0,0,0.2);
            }

            .physics-joint-ring {
                width: 10px;
                height: 10px;
                background: radial-gradient(circle at 30% 30%, #f3f4f6, #9ca3af);
                border: 2px solid #4b5563;
                border-radius: 50%;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                z-index: 6;
            }
            .physics-joint-top { top: -5px; }
            .physics-joint-bottom { bottom: -5px; }

            .physics-stand-metallic {
                background: linear-gradient(90deg, #4b5563 0%, #9ca3af 30%, #6b7280 50%, #9ca3af 70%, #4b5563 100%);
                box-shadow: 2px 0 8px rgba(0,0,0,0.2);
            }

            .physics-base-metallic {
                background: linear-gradient(180deg, #6b7280 0%, #374151 30%, #1f2937 100%);
                box-shadow:
                    0 10px 30px -5px rgba(0, 0, 0, 0.4),
                    inset 0 2px 0 rgba(255,255,255,0.1);
            }

            .physics-needle {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 4px;
                height: 50px;
                background: linear-gradient(180deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%);
                transform-origin: top center;
                transform: translate(-50%, 0);
                z-index: 35;
                border-radius: 0 0 3px 3px;
                box-shadow: 0 3px 8px rgba(239, 68, 68, 0.4);
                pointer-events: none;
            }

            .physics-pan-label {
                position: absolute;
                bottom: 15px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 14px;
                font-weight: 700;
                color: #374151;
                text-align: center;
                white-space: nowrap;
                text-shadow: 0 1px 2px rgba(255,255,255,0.8);
                letter-spacing: 0.5px;
                min-height: 20px;
                z-index: 100;
            }

            .physics-pan-label.has-content {
                padding: 4px 12px;
                background: rgba(255, 255, 255, 0.9);
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }

            

            .balancer-result-box {
                display: none;
                padding: 16px 20px;
                background: rgba(236, 253, 245, 0.72);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                border-radius: 14px;
                border: 1px solid rgba(167, 243, 208, 0.6);
                box-shadow:
                    0 2px 8px rgba(0, 0, 0, 0.04),
                    0 8px 24px rgba(0, 0, 0, 0.08),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8);
            }

            .balancer-result-box.show {
                display: block;
                animation: slideIn 0.3s ease;
            }

            @keyframes slideIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }

            .balancer-result-label {
                font-size: 12px;
                font-weight: 600;
                color: #059669;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 8px;
            }

            .balancer-result-equation {
                font-size: 20px;
                font-weight: 700;
                color: #047857;
                font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
            }

            .balancer-tips-section {
                padding: 14px 16px;
                background: #f8fafc;
                border-radius: 12px;
                border: 1px solid #e2e8f0;
            }

            .balancer-tips-title {
                font-size: 0.8rem;
                font-weight: 700;
                color: #64748b;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                gap: 6px;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }

            .balancer-tips-title svg {
                width: 14px;
                height: 14px;
            }

            .balancer-tips-list {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }

            .balancer-tip-item {
                font-size: 0.8rem;
                color: #64748b;
                padding-left: 16px;
                position: relative;
                line-height: 1.5;
            }

            .balancer-tip-item::before {
                content: '•';
                position: absolute;
                left: 4px;
                color: #94a3b8;
            }

            .balancer-example-box {
                margin-top: 10px;
                padding: 10px 12px;
                background: #ffffff;
                border-radius: 12px;
                font-size: 0.8rem;
                color: #475569;
                border: 1px solid #e2e8f0;
            }

            .balancer-example-box code {
                font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
                background: #f1f5f9;
                padding: 2px 5px;
                border-radius: 3px;
                font-weight: 600;
                color: #1e293b;
            }
        </style>

        <div class="tool-padding-label">${"Equation Balancer"}</div>
        <div class="balancer-main-wrapper">


            <div class="physics-scale-container">

                <div style="position: absolute; bottom: 4.7%; top: 24%; display: flex; flex-direction: column; align-items: center; z-index: 0; pointer-events: none;">
                    <div class="physics-stand-metallic" style="width: 14px; flex: 1; border-radius: 7px 7px 0 0;"></div>
                    <div class="physics-base-metallic" style="width: 140px; height: 22px; border-radius: 9999px; margin-top: -4px; border-top: 1px solid #6b7280;"></div>
                </div>

                <div id="physics-pivot" style="position: absolute; top: 24.4%; left: 50%; transform: translate(-50%, -50%); z-index: 30; display: flex; align-items: center; justify-content: center; pointer-events: none;">
                    <div style="width: 44px; height: 44px; background: linear-gradient(145deg, #f3f4f6, #d1d5db); border-radius: 9999px; box-shadow: 0 4px 15px rgba(0,0,0,0.15); display: flex; align-items: center; justify-content: center; border: 3px solid #e5e7eb; position: relative; z-index: 40;">
                        <div id="physics-needle" class="physics-needle"></div>
                        <div style="width: 16px; height: 16px; background: linear-gradient(145deg, #6b7280, #374151); border-radius: 9999px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.4); position: absolute; z-index: 50;"></div>
                    </div>
                </div>

                <div id="physics-beam-assembly" class="physics-beam-metallic" style="position: absolute; top: 24.4%; left: 50%; width: 420px; height: 14px; border-radius: 9999px; margin-left: -210px; display: flex; justify-content: space-between; align-items: center; z-index: 20; transform-origin: center center;">
                    <div class="physics-beam-ruler"></div>

                    <div id="physics-hanger-left" style="position: absolute; left: 25px; top: 7px; width: 24px; display: flex; flex-direction: column; align-items: center; transform-origin: top center; transform: translateX(-50%); transition: transform 0.1s linear;">
                        <div class="physics-support-rod" style="pointer-events: none;">
                            <div class="physics-joint-ring physics-joint-top"></div>
                            <div class="physics-joint-ring physics-joint-bottom"></div>
                        </div>
                        <div class="physics-pan-metallic" style="width: 110px; height: 12px; border-radius: 0 0 14px 14px; position: relative; border-top: 1px solid #6b7280;">
                            <div id="physics-pan-label-left" class="physics-pan-label"></div>
                        </div>
                    </div>

                    <div id="physics-hanger-right" style="position: absolute; right: 25px; top: 7px; width: 24px; display: flex; flex-direction: column; align-items: center; transform-origin: top center; transform: translateX(50%); transition: transform 0.1s linear;">
                        <div class="physics-support-rod" style="pointer-events: none;">
                            <div class="physics-joint-ring physics-joint-top"></div>
                            <div class="physics-joint-ring physics-joint-bottom"></div>
                        </div>
                        <div class="physics-pan-metallic" style="width: 110px; height: 12px; border-radius: 0 0 14px 14px; position: relative; border-top: 1px solid #6b7280;">
                            <div id="physics-pan-label-right" class="physics-pan-label"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="z-tool-layout" style="gap: 16px;">
                <div style="display: flex; gap: 16px; align-items: flex-end;">
                    <div class="z-tool-input-group" style="flex: 1;">
                        <label class="z-tool-input-label">Reactants</label>
                        <input type="text" id="reactants-input" class="z-tool-input" placeholder="e.g., Fe + O2" autocomplete="off" spellcheck="false">
                    </div>
                    <div class="z-tool-input-group" style="flex: 1;">
                        <label class="z-tool-input-label">Products</label>
                        <input type="text" id="products-input" class="z-tool-input" placeholder="e.g., Fe2O3" autocomplete="off" spellcheck="false">
                    </div>
                </div>
            </div>

            <div style="display: flex; align-items: center; gap: 12px; margin-top: 20px; flex-wrap: wrap;">
                <button id="auto-balance-btn" class="z-tool-btn primary">Auto Balance</button>
                <button id="clear-balancer-btn" class="z-tool-btn secondary">Clear</button>
                <div class="balancer-status-bar" id="balance-feedback" style="flex: 1; min-width: 0;">Enter equation</div>
            </div>

            <div style="display: flex; align-items: center; gap: 12px;">
                <button id="auto-balance-btn" class="balancer-btn balancer-btn-primary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 3v1m0 16v1m-9-9h1m16 0h1m-2.64-6.36l-.7.7m-12.02 12.02l-.7.7m0-12.72l.7.7m12.02 12.02l.7.7"/>
                        <circle cx="12" cy="12" r="4"/>
                    </svg>
                    ${"Auto Balance"}
                </button>
                <button id="clear-balancer-btn" class="balancer-btn balancer-btn-secondary">
                    ${"Clear"}
                </button>
                <div class="balancer-status-bar" id="balance-feedback" style="flex: 1; min-width: 0;">
                    ${"Enter equation"}
                </div>
            </div>
        </div>

        <!-- Hidden elements for compatibility -->
        <div id="physics-card-left" style="display:none;"></div>
        <div id="physics-card-right" style="display:none;"></div>
    `;
}

// Helper to set formula from chips
function setMolarFormula(formula) {
  const input = document.getElementById("modal-formula-input");
  if (input) {
    input.value = formula;
    input.dispatchEvent(new Event("input"));
    input.focus();
  }
}

function generateMolarMassToolContent() {
  return `

        <div class="tool-padding-label">${"Molar Mass Calculator"}</div>
        <div class="z-molar-row">
            <!-- Left Column: Input & Info -->
            <div class="molar-input-panel">
                <div class="z-tool-layout">
                    <label for="modal-formula-input" class="z-tool-input-label">
                        <span class="molar-label-icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/>
                            </svg>
                        </span>
                        ${"Chemical Formula"}
                    </label>
                    <input type="text" id="modal-formula-input"
                           placeholder="e.g. H2O, CuSO4.5H2O"
                           class="z-tool-input realtime-input"
                           autocomplete="off"
                           spellcheck="false">

                    <!-- Live Formula Preview -->
                    <div class="formula-live-preview" id="formula-live-preview">
                        <span class="preview-label">${"Formula:"}</span>
                        <span class="preview-formula" id="preview-formula-display">—</span>
                    </div>

                    <!-- Formula Suggestion (always visible container) -->
                    <div class="formula-suggestion" id="formula-suggestion">
                        <span class="suggestion-icon">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                            </svg>
                        </span>
                        <span class="suggestion-text" id="suggestion-text">${"Enter a formula above"}</span>
                    </div>

                    <!-- Options Row: Exact Decimals + Enter Hint -->
                    <div class="molar-options-row">
                        <label class="molar-exact-label">
                            <input type="checkbox" id="modal-exact-toggle">
                            ${"Exact Decimals"}
                        </label>
                        <div class="enter-hint" style="margin: 0;">
                            <span>Press</span> <kbd class="kbd-key">Enter ↵</kbd> <span>to print ticket</span>
                        </div>
                    </div>
                </div>

                <div class="tool-tips-section molar-tips-apple">
                    <div class="molar-tips-header">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                        </svg>
                        ${"Quick Tips"}
                    </div>
                    <div class="tips-item">
                        <span>${"Type formula with normal numbers"}</span>
                    </div>
                    <div class="tips-item">
                        <span>${"Auto-converts to subscript display"}</span>
                    </div>
                    <div class="tips-item">
                        <span>${"Hydrates: use dot or space"}</span>
                    </div>
                </div>
            </div>

            <!-- Right Column: Visual Stage -->
            <div class="molar-scale-stage">
                <div class="electronic-scale-wrapper">
                    <!-- 3D Blocks -->
                    <div id="scale-blocks-area" class="scale-blocks-area"></div>

                    <!-- Scale Base Top -->
                    <div class="electronic-scale-base">
                        <div class="scale-platform-top"></div>
                        <div class="scale-screen">
                            <span id="scale-display-value">0.00</span>
                            <span style="font-size: 1rem; margin-left: 8px; opacity: 0.7;">g/mol</span>
                        </div>
                    </div>

                    <div class="receipt-anim-container">
                        <div id="receipt-wrapper" class="receipt-wrapper">
                            <div class="receipt-header">Weight Ticket</div>
                            <div class="receipt-barcode">|||||||||||||||||||||||</div>
                            <div class="receipt-date" id="receipt-date"></div>
                            <div id="receipt-items"></div>
                            <div class="receipt-total-row">
                                <span>TOTAL</span>
                                <span id="receipt-total-value"></span>
                            </div>
                            <div class="receipt-footer">
                                Thank you!
                            </div>
                        </div>
                    </div>

                    <div class="scale-front-panel">
                        <div class="receipt-slot"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Hidden legacy containers -->
        <div id="modal-mass-result" style="display:none;"></div>
        <div id="modal-mass-breakdown" style="display:none;"></div>
        <button id="modal-calculate-mass-btn" style="display:none;"></button>
    `;
}


function generateEmpiricalToolContent() {
  return `
        <style>
            /* ===== Apple-Style Empirical Formula Calculator ===== */
            .emp-calc-wrapper {
                --glass-bg: rgba(255, 255, 255, 0.72);
                --glass-border: rgba(255, 255, 255, 0.6);
                --glass-shadow: 0 2px 8px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8);
                --text-primary: #1d1d1f;
                --text-secondary: #86868b;
                --text-tertiary: #aeaeb2;
                --accent-purple: #af52de;
                --accent-green: #30d158;
                --surface-elevated: rgba(255, 255, 255, 0.9);
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
                display: flex;
                flex-direction: column;
                min-height: 100%;
                width: 100%;
                box-sizing: border-box;
            }

            .emp-grid {
                display: grid;
                grid-template-columns: 300px 1fr;
                grid-template-rows: 1fr;
                gap: 30px;
                flex: 1 0 auto;
                min-height: 0;
            }
            @media (max-width: 720px) {
                .emp-grid { grid-template-columns: 1fr; grid-template-rows: auto auto; height: auto; }
            }

            .emp-controls { display: flex; flex-direction: column; align-self: start; }

            .emp-glass-card {
                background: var(--glass-bg);
                backdrop-filter: blur(20px) saturate(180%);
                -webkit-backdrop-filter: blur(20px) saturate(180%);
                border: 1px solid var(--glass-border);
                border-radius: 16px;
                padding: 16px;
                box-shadow: var(--glass-shadow);
            }

            .emp-section-label {
                font-size: 11px; font-weight: 600; color: var(--text-secondary);
                text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 10px;
            }

            .emp-input-stack { display: flex; flex-direction: column; gap: 6px; }

            .emp-input-row {
                display: flex; align-items: flex-start; gap: 8px;
                position: relative;
            }

            .emp-el-input {
                width: 42px; height: 42px; min-width: 42px;
                background: linear-gradient(145deg, #9ca3af, #d1d5db);
                border: 2px solid transparent; border-radius: 10px;
                display: flex; align-items: center; justify-content: center;
                font-size: 15px; font-weight: 800; color: #fff;
                text-align: center; flex-shrink: 0;
                transition: all 0.2s ease;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
            }
            .emp-el-input:focus {
                outline: none; transform: scale(1.05);
                box-shadow: 0 4px 12px rgba(99, 102, 241, 0.35);
            }
            .emp-el-input::placeholder { color: rgba(255,255,255,0.7); font-weight: 600; }
            .emp-el-input.has-value { background: linear-gradient(145deg, #6366f1, #8b5cf6); }
            .emp-el-input.el-C { background: linear-gradient(145deg, #374151, #4b5563); }
            .emp-el-input.el-H { background: linear-gradient(145deg, #3b82f6, #60a5fa); }
            .emp-el-input.el-O { background: linear-gradient(145deg, #ef4444, #f87171); }
            .emp-el-input.el-N { background: linear-gradient(145deg, #8b5cf6, #a78bfa); }
            .emp-el-input.el-S { background: linear-gradient(145deg, #eab308, #facc15); color: #1a1a1a; }
            .emp-el-input.el-P { background: linear-gradient(145deg, #f97316, #fb923c); }
            .emp-el-input.el-Cl { background: linear-gradient(145deg, #10b981, #34d399); }
            .emp-el-input.el-Na { background: linear-gradient(145deg, #6366f1, #818cf8); }
            .emp-el-input.el-K { background: linear-gradient(145deg, #ec4899, #f472b6); }
            .emp-el-input.el-Ca { background: linear-gradient(145deg, #84cc16, #a3e635); }
            .emp-el-input.el-Fe { background: linear-gradient(145deg, #b45309, #d97706); }
            .emp-el-input.el-Mg { background: linear-gradient(145deg, #14b8a6, #2dd4bf); }
            .emp-el-input.emp-invalid { border-color: #ef4444 !important; }

            .emp-value-col {
                flex: 1; display: flex; flex-direction: column; gap: 2px; min-width: 0;
            }

            .emp-value-wrapper {
                flex: 1; position: relative; display: flex; align-items: center; min-width: 0;
            }

            

            .emp-unit {
                position: absolute; right: 10px;
                font-size: 13px; font-weight: 600; color: var(--text-tertiary);
                pointer-events: none;
            }

            /* Inline row error */
            .emp-row-error {
                font-size: 11px; font-weight: 500; color: #ef4444;
                min-height: 14px; line-height: 14px;
                padding-left: 2px;
                opacity: 0; transition: opacity 0.15s ease;
            }
            .emp-row-error.visible { opacity: 1; }

            /* Global error banner */
            .emp-global-error {
                display: none; align-items: center; gap: 8px;
                margin-top: 8px; padding: 10px 14px;
                background: rgba(239, 68, 68, 0.08);
                border: 1px solid rgba(239, 68, 68, 0.2);
                border-radius: 10px;
                font-size: 12px; font-weight: 600; color: #dc2626;
                line-height: 1.4;
            }
            .emp-global-error.visible { display: flex; }
            .emp-global-error svg { flex-shrink: 0; width: 16px; height: 16px; }

            .emp-divider {
                height: 1px;
                background: linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent);
                margin: 10px 0;
            }

            .emp-mol-mass-label {
                display: flex; align-items: center; gap: 6px; margin-bottom: 6px;
            }
            .emp-mol-mass-label span {
                font-size: 11px; font-weight: 600; color: var(--text-secondary);
                text-transform: uppercase; letter-spacing: 0.06em;
            }
            .emp-optional-pill {
                font-size: 9px; font-weight: 600; padding: 2px 6px;
                background: rgba(0,0,0,0.04); color: var(--text-tertiary);
                border-radius: 4px; text-transform: uppercase;
            }
            

            
            .emp-calc-btn svg { width: 16px; height: 16px; }

            .emp-quick-actions { display: flex; align-items: center; justify-content: flex-end; gap: 6px; margin-top: 6px; }

            .emp-icon-btn {
                width: 32px; height: 32px; border-radius: 50%; border: none;
                cursor: pointer; display: flex; align-items: center; justify-content: center;
                transition: all 0.2s ease;
            }
            .emp-icon-btn svg { width: 14px; height: 14px; }
            .emp-icon-btn.add { background: rgba(139, 92, 246, 0.1); color: var(--accent-purple); }
            .emp-icon-btn.add:hover { background: rgba(139, 92, 246, 0.2); transform: scale(1.1); }
            .emp-icon-btn.add:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
            .emp-icon-btn.remove { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
            .emp-icon-btn.remove:hover { background: rgba(239, 68, 68, 0.2); transform: scale(1.1); }
            .emp-icon-btn.remove:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
            .emp-icon-btn.reset { background: rgba(0,0,0,0.04); color: var(--text-tertiary); }
            .emp-icon-btn.reset:hover { background: rgba(0,0,0,0.08); transform: scale(1.1); }
            .emp-icon-btn.random { background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); color: #16a34a; box-shadow: 0 2px 6px rgba(34, 197, 94, 0.15); }
            .emp-icon-btn.random:hover { transform: scale(1.1) rotate(15deg); box-shadow: 0 3px 10px rgba(34, 197, 94, 0.25); }

            /* Row status indicator */
            .emp-row-status {
                width: 20px; height: 42px; display: flex; align-items: center; justify-content: center;
                font-size: 14px; flex-shrink: 0; opacity: 0; transition: opacity 0.15s ease;
            }
            .emp-row-status.visible { opacity: 1; }

            /* ===== Right: Results ===== */
            .emp-results { display: flex; flex-direction: column; height: 100%; }

            .emp-results-glass {
                background: var(--glass-bg);
                backdrop-filter: blur(24px) saturate(180%);
                -webkit-backdrop-filter: blur(24px) saturate(180%);
                border: 1px solid var(--glass-border);
                border-radius: 18px;
                padding: 24px;
                box-shadow: var(--glass-shadow);
                display: flex; flex-direction: column; align-items: center;
                justify-content: center; text-align: center;
                flex: 1; overflow: hidden;
            }

            .emp-result-display.visible .emp-atom-chip {
                animation: atomPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                opacity: 0;
            }
            .emp-result-display.visible .emp-atom-chip:nth-child(1) { animation-delay: 0.1s; }
            .emp-result-display.visible .emp-atom-chip:nth-child(2) { animation-delay: 0.2s; }
            .emp-result-display.visible .emp-atom-chip:nth-child(3) { animation-delay: 0.3s; }
            .emp-result-display.visible .emp-atom-chip:nth-child(4) { animation-delay: 0.4s; }
            .emp-result-display.visible .emp-atom-chip:nth-child(5) { animation-delay: 0.5s; }
            .emp-result-display.visible .emp-atom-chip:nth-child(6) { animation-delay: 0.6s; }

            @keyframes atomPop {
                0% { opacity: 0; transform: scale(0) rotate(-20deg); }
                70% { transform: scale(1.15) rotate(5deg); }
                100% { opacity: 1; transform: scale(1) rotate(0); }
            }
            .emp-result-display.visible .emp-hero-formula {
                animation: heroReveal 0.5s ease forwards;
            }
            @keyframes heroReveal {
                0% { opacity: 0; transform: translateY(10px) scale(0.9); }
                100% { opacity: 1; transform: translateY(0) scale(1); }
            }

            .emp-empty-state { display: flex; flex-direction: column; align-items: center; padding: 20px; }

            .emp-floating-atoms { position: relative; width: 150px; height: 90px; margin-bottom: 24px; }
            .emp-atom {
                position: absolute; width: 40px; height: 40px; border-radius: 10px;
                display: flex; align-items: center; justify-content: center;
                font-weight: 700; font-size: 15px; color: #fff;
                box-shadow: 0 4px 14px rgba(0,0,0,0.18);
                animation: atomFloat 3.5s ease-in-out infinite;
            }
            .emp-atom.a1 { background: linear-gradient(145deg, #374151, #4b5563); left: 0; top: 16px; animation-delay: 0s; }
            .emp-atom.a2 { background: linear-gradient(145deg, #3b82f6, #60a5fa); left: 55px; top: 0; animation-delay: 0.25s; }
            .emp-atom.a3 { background: linear-gradient(145deg, #ef4444, #f87171); left: 110px; top: 20px; animation-delay: 0.5s; }
            .emp-atom.a4 { background: linear-gradient(145deg, #22c55e, #4ade80); left: 55px; top: 48px; animation-delay: 0.75s; }
            @keyframes atomFloat { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-5px) scale(1.02); } }

            .emp-empty-text { color: var(--text-tertiary); font-size: 14px; font-weight: 500; line-height: 1.5; }

            .emp-result-display {
                display: none; flex-direction: column; align-items: center; width: 100%; gap: 20px;
            }
            .emp-result-display.visible { display: flex; }

            .emp-empirical-result { display: flex; flex-direction: column; align-items: center; gap: 4px; }
            .emp-result-subtitle {
                font-size: 10px; font-weight: 600; color: var(--text-tertiary);
                text-transform: uppercase; letter-spacing: 0.08em;
            }
            .emp-empirical-pill {
                display: inline-flex; align-items: center; height: 28px; padding: 0 14px;
                background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
                border: 1px solid #ddd6fe; border-radius: 14px;
                font-size: 15px; font-weight: 700; color: #7c3aed;
                font-family: 'SF Mono', 'Monaco', 'Consolas', monospace; letter-spacing: 0.01em;
            }

            .emp-molecular-result { display: flex; flex-direction: column; align-items: center; gap: 8px; }
            .emp-hero-formula {
                font-size: 3.2rem; font-weight: 800; color: var(--text-primary);
                letter-spacing: -0.03em; line-height: 1.1;
            }
            .emp-hero-formula sub {
                font-size: 0.55em; vertical-align: baseline; position: relative;
                top: 0.25em; font-weight: 700; color: var(--accent-purple);
            }
            .emp-hero-mass { font-size: 13px; font-weight: 500; color: var(--text-secondary); }

            /* Mol mass warning */
            .emp-molmass-warning {
                display: none; font-size: 12px; font-weight: 500; color: #d97706;
                background: rgba(217, 119, 6, 0.08); border: 1px solid rgba(217, 119, 6, 0.18);
                border-radius: 10px; padding: 8px 14px; text-align: center;
                line-height: 1.4; max-width: 360px;
            }
            .emp-molmass-warning.visible { display: block; }

            /* Normalised banner */
            .emp-normalised-tag {
                display: none; font-size: 11px; font-weight: 600; color: #6366f1;
                background: rgba(99, 102, 241, 0.08); border-radius: 8px;
                padding: 4px 12px;
            }
            .emp-normalised-tag.visible { display: inline-block; }

            .emp-atoms-visual {
                display: flex; justify-content: center; flex-wrap: wrap; gap: 10px;
                margin-top: 8px; padding: 14px 20px;
                background: rgba(0,0,0,0.02); border-radius: 14px;
            }
            .emp-atom-chip { display: flex; flex-direction: column; align-items: center; gap: 4px; }
            .emp-atom-circle {
                width: 44px; height: 44px; border-radius: 12px;
                display: flex; align-items: center; justify-content: center;
                font-size: 17px; font-weight: 700; color: #fff;
                box-shadow: 0 3px 10px rgba(0,0,0,0.15);
            }
            .emp-atom-circle.el-C { background: linear-gradient(145deg, #374151, #4b5563); }
            .emp-atom-circle.el-H { background: linear-gradient(145deg, #3b82f6, #60a5fa); }
            .emp-atom-circle.el-O { background: linear-gradient(145deg, #ef4444, #f87171); }
            .emp-atom-circle.el-N { background: linear-gradient(145deg, #8b5cf6, #a78bfa); }
            .emp-atom-circle.el-S { background: linear-gradient(145deg, #eab308, #facc15); color: #1a1a1a; }
            .emp-atom-circle.el-P { background: linear-gradient(145deg, #f97316, #fb923c); }
            .emp-atom-circle.el-Cl { background: linear-gradient(145deg, #10b981, #34d399); }
            .emp-atom-circle.el-Br { background: linear-gradient(145deg, #a3231f, #dc2626); }
            .emp-atom-circle.el-F { background: linear-gradient(145deg, #06b6d4, #22d3ee); }
            .emp-atom-circle.el-I { background: linear-gradient(145deg, #7c3aed, #a855f7); }
            .emp-atom-circle.el-Fe { background: linear-gradient(145deg, #b45309, #d97706); }
            .emp-atom-circle.el-Cu { background: linear-gradient(145deg, #0891b2, #06b6d4); }
            .emp-atom-circle.el-Zn { background: linear-gradient(145deg, #64748b, #94a3b8); }
            .emp-atom-circle.el-Ca { background: linear-gradient(145deg, #84cc16, #a3e635); }
            .emp-atom-circle.el-Na { background: linear-gradient(145deg, #6366f1, #818cf8); }
            .emp-atom-circle.el-K { background: linear-gradient(145deg, #ec4899, #f472b6); }
            .emp-atom-circle.el-Mg { background: linear-gradient(145deg, #14b8a6, #2dd4bf); }
            .emp-atom-circle.el-default { background: linear-gradient(145deg, #6b7280, #9ca3af); }
            .emp-atom-count { font-size: 12px; font-weight: 600; color: var(--text-secondary); }

            .emp-steps-wrapper { margin-top: 12px; width: 100%; }
            .emp-steps-toggle {
                display: flex; align-items: center; justify-content: center; gap: 6px;
                width: 100%; padding: 10px 14px;
                background: rgba(139, 92, 246, 0.06);
                border: 1px solid rgba(139, 92, 246, 0.15); border-radius: 10px;
                font-size: 12px; font-weight: 600; color: var(--accent-purple);
                cursor: pointer; transition: all 0.15s ease;
            }
            .emp-steps-toggle:hover { background: rgba(139, 92, 246, 0.1); border-color: rgba(139, 92, 246, 0.25); }
            .emp-steps-toggle svg { width: 14px; height: 14px; transition: transform 0.2s ease; }
            .emp-steps-toggle.open svg { transform: rotate(180deg); }

            .emp-steps-bar { margin-top: 0; flex-shrink: 0; }
            .emp-steps-content {
                display: none; width: 100%; margin-top: 20px; margin-bottom: 60px;
                padding: 16px 40px;
                background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%);
                border: 1px solid rgba(139, 92, 246, 0.12); border-radius: 16px;
                text-align: left; font-size: 14px; color: var(--text-secondary); line-height: 1.75;
                box-sizing: border-box;
            }
            .emp-steps-content.visible { display: block; animation: stepsFade 0.3s ease; }
            @keyframes stepsFade { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
            .emp-steps-content h4 {
                font-size: 15px; font-weight: 700; color: var(--accent-purple);
                text-transform: uppercase; letter-spacing: 0.08em;
                margin: 0 0 20px 0; padding-bottom: 12px;
                border-bottom: 1px solid rgba(139, 92, 246, 0.1);
            }
            .emp-steps-content ol, .emp-steps-content ul { margin: 0 0 16px 0; padding-left: 20px; }
            .emp-steps-content > ol { margin-bottom: 0; }
            .emp-steps-content li { margin-bottom: 8px; font-size: 14px; }
            .emp-steps-content li ul { margin-top: 6px; margin-bottom: 12px; }
            .emp-steps-content li ul li { margin-bottom: 4px; font-size: 13px; color: var(--text-tertiary); }
            .emp-steps-content strong { color: var(--text-primary); font-weight: 600; }
            .emp-steps-content hr { border: none; height: 1px; background: rgba(139, 92, 246, 0.15); margin: 20px 0; }
            .emp-steps-content p { margin: 6px 0; font-size: 14px; }
            .emp-steps-content h4:not(:first-child) {
                margin-top: 24px; padding-top: 20px;
                border-top: 1px solid rgba(139, 92, 246, 0.1); border-bottom: none; padding-bottom: 0;
            }
        </style>

        <div class="tool-padding-label">Empirical & Molecular Formula</div>
        <div class="emp-calc-wrapper">
            <div class="emp-grid">
                <!-- Left: Controls -->
                <div class="emp-controls">
                    <div class="emp-glass-card">
                        <div class="emp-section-label">Element Composition</div>

                        <div class="emp-input-stack" id="modal-element-inputs"></div>

                        <div class="emp-quick-actions">
                            <button class="z-tool-btn secondary" id="emp-remove-element-btn" title="Remove last element row">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                            </button>
                            <button class="z-tool-btn secondary" id="emp-add-element-btn" title="Add element row">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                            </button>
                            <button class="z-tool-btn secondary" id="emp-reset-btn" title="Reset all fields">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 1 9 9 9.01 9.01 0 0 1-8.7-6.7"/><path d="M3 3v6h6"/></svg>
                            </button>
                            <button class="z-tool-btn primary" id="emp-random-fill-btn" title="Fill with a random compound">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 11-9-9c2.52 0 4.85.83 6.72 2.24"/><path d="M21 3v6h-6"/></svg>
                            </button>
                        </div>

                        <!-- Global error banner -->
                        <div class="emp-global-error" id="emp-global-error">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                            </svg>
                            <span id="emp-global-error-text"></span>
                        </div>

                        <div class="emp-divider"></div>

                        <div class="emp-mol-mass-label">
                            <span>Molecular Mass</span>
                            <span class="emp-optional-pill">Optional</span>
                        </div>
                        <input type="text" inputmode="decimal" id="modal-mol-mass" class="z-tool-input" placeholder="e.g. 180 g/mol">

                        <button id="modal-calc-formula-btn" class="z-tool-btn primary" style="width: 100%; margin-top: 10px;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                                <line x1="12" y1="22.08" x2="12" y2="12"/>
                            </svg>
                            Calculate
                        </button>

                        <input type="hidden" id="modal-formula-method" value="percent">
                    </div>
                </div>

                <!-- Right: Results -->
                <div class="emp-results">
                    <div class="emp-results-glass" id="lego-stage">
                        <div class="emp-empty-state" id="lego-empty">
                            <div class="emp-floating-atoms">
                                <div class="emp-atom a1">C</div>
                                <div class="emp-atom a2">H</div>
                                <div class="emp-atom a3">O</div>
                                <div class="emp-atom a4">N</div>
                            </div>
                            <p class="emp-empty-text">Enter element percentages<br>and click Calculate</p>
                        </div>

                        <div class="emp-result-display" id="lego-blocks-area">
                            <div class="emp-normalised-tag" id="emp-normalised-tag">Values normalised to 100 %</div>

                            <div class="emp-empirical-result">
                                <span class="emp-result-subtitle">Empirical Formula</span>
                                <div class="emp-empirical-pill" id="empirical-formula-display"></div>
                            </div>

                            <div class="emp-molecular-result" id="molecular-result-card" style="display:none;">
                                <span class="emp-result-subtitle">Molecular Formula</span>
                                <div class="emp-hero-formula" id="molecular-formula-display"></div>
                                <span class="emp-hero-mass" id="result-mass-display"></span>
                            </div>

                            <div class="emp-molmass-warning" id="emp-molmass-warning"></div>

                            <div class="emp-atoms-visual" id="lego-blocks-visual"></div>

                            <div class="emp-steps-wrapper">
                                <button class="emp-steps-toggle" id="calc-details-toggle">
                                    <span>Show calculation steps</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="emp-steps-bar">
                <div class="emp-steps-content" id="calc-details-content"></div>
            </div>
        </div>

        <div id="empirical-tips" style="display:none;"></div>
        <div id="modal-formula-result" style="display:none;"></div>
        <div id="modal-formula-explanation" style="display:none;"></div>
    `;
}

function attachToolEventListeners(toolType) {
  switch (toolType) {
    case "balancer":
      attachBalancerListeners();
      break;
    case "molar-mass":
      attachMolarMassListeners();
      break;
    case "empirical":
      attachEmpiricalListeners();
      break;
    case "solubility":
      attachSolubilityListeners();
      break;
  }
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
    const feedback = document.getElementById("balance-feedback");

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
        feedback.innerHTML = `${"Enter a chemical equation to check the balance"}`;
      } else if (!productsFormula) {
        feedback.classList.add("unbalanced");
        feedback.innerHTML = `<span class="status-icon">⚠</span>${"Add products to complete the equation"}`;
      } else if (!reactantsFormula) {
        feedback.classList.add("unbalanced");
        feedback.innerHTML = `<span class="status-icon">⚠</span>${"Add reactants to complete the equation"}`;
      } else {
        // Check if actually balanced (element by element)
        let isBalanced = true;
        allElements.forEach((el) => {
          if ((leftAtoms[el] || 0) !== (rightAtoms[el] || 0))
            isBalanced = false;
        });

        if (isBalanced && allElements.size > 0) {
          feedback.classList.add("balanced");
          feedback.innerHTML = `<span class="status-icon">✓</span>${"Perfectly Balanced!"}`;

          // Auto-run AutoBalance after 1.5 seconds to show the final equation
          setTimeout(() => {
            if (typeof autoBalance === 'function') {
              autoBalance();
            }
          }, 1500);
        } else if (imbalancedElement) {
          feedback.classList.add("unbalanced");
          const leftC = leftAtoms[imbalancedElement] || 0;
          const rightC = rightAtoms[imbalancedElement] || 0;
          const hint = leftC > rightC
            ? `${imbalancedElement}: ${leftC} left vs ${rightC} right`
            : `${imbalancedElement}: ${leftC} left vs ${rightC} right`;
          feedback.innerHTML = `<span class="status-icon">⚠</span>Not balanced — ${hint}`;
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
        feedback.title = "Click to copy";
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
        if (errorMsg.includes("Element")) {
          feedback.innerHTML = `<span class="status-icon">✕</span>${errorMsg}`;
        } else {
          feedback.innerHTML = `<span class="status-icon">✕</span>${"Could not auto-balance this equation"}`;
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
          feedback.innerHTML = `<span>${"Copied!"}</span>`;
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
  const exactToggle = document.getElementById("modal-exact-toggle");

  const runCalculation = (formulaOverride) => {
    const formula = formulaOverride || input.value.trim();
    const isExact = exactToggle ? exactToggle.checked : false;
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
      if (typeof displayMolarMassResult === "function")
        displayMolarMassResult(result);
    } else {
      if (scaleDisplay) scaleDisplay.textContent = "0.00";
      if (blocksArea) blocksArea.innerHTML = "";
      if (platform) platform.classList.remove("has-weight");
    }
  };

  if (exactToggle) {
    exactToggle.addEventListener("change", () => {
      const val = input.value;
      const parsed = smartParseFormula(val);
      if (!parsed.hasError && parsed.cleanFormula) {
        runCalculation(parsed.cleanFormula);
      }
    });
  }

  if (input) {
    input.addEventListener("input", (e) => {
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
          suggestionText.innerHTML = `<span style="color: #ef4444;">${"Invalid element or formula format"}</span>`;
          suggestionBox.classList.add("has-message", "has-error");
        } else if (calcError) {
          suggestionText.innerHTML = `<span style="color: #ef4444;">${calcError}</span>`;
          suggestionBox.classList.add("has-message", "has-error");
        } else if (parsed.suspicious) {
          suggestionText.innerHTML =
            "Did you mean " +
            `<strong>${parsed.suspicious}</strong>?`;
          suggestionBox.classList.add("has-message");
          suggestionBox.classList.remove("has-error");
        } else {
          suggestionText.textContent = val.trim()
            ? "Looks good"
            : "Enter a formula above";
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
            exactToggle ? exactToggle.checked : false,
          );
          if (result) printReceipt(result);
        }
      }
    });
    input.dispatchEvent(new Event("input"));
  }
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
            <div class="emp-atom a1">C</div><div class="emp-atom a2">H</div>
            <div class="emp-atom a3">O</div><div class="emp-atom a4">N</div>
          </div>
          <p class="emp-empty-text">Enter element percentages<br>and click Calculate</p>`;
        emptyState.style.display = 'flex';
      }
      if (resultContent) resultContent.classList.remove('visible');
      if (detailsCont) detailsCont.classList.remove('visible');
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
      if (btnText) btnText.textContent = isExpanded ? 'Show calculation steps' : 'Hide calculation steps';
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
              class="z-tool-input"
              placeholder="${isOptional ? 'optional' : placeholder}"
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
  const detailsContent = document.getElementById('calc-details-content');

  if (detailsContent) detailsContent.classList.remove('visible');

  if (emptyState) {
    emptyState.innerHTML = `
      <div style="color: #ef4444; font-size: 14px; padding: 20px; text-align: center;">
        <svg style="width: 40px; height: 40px; margin-bottom: 12px; opacity: 0.7;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <div style="font-weight: 600; margin-bottom: 8px;">${message}</div>
        <div style="font-size: 12px; color: #86868b;">Check your input and try again</div>
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
  const detailsContent = document.getElementById('calc-details-content');
  const normTag = document.getElementById('emp-normalised-tag');
  const molMassWarn = document.getElementById('emp-molmass-warning');

  // Hide empty state, show result
  if (emptyState) emptyState.style.display = 'none';
  if (resultContent) resultContent.classList.add('visible');

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

  // Calculation details
  if (detailsContent) detailsContent.innerHTML = result.explanation;
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
                            <input type="text" id="solubility-input" class="sol-input-field" placeholder="e.g. NaCl, AgNO3" autocomplete="off">
                            <button id="check-solubility-btn" class="z-tool-btn primary">Check Solubility</button>
                        </div>
                    </div>

                    <div id="solubility-result" class="sol-result-card">
                        <div class="sol-result-title"></div>
                        <div class="sol-result-subtitle"></div>
                    </div>
                </div>

                <!-- Right: Reference Table -->
                <div class="sol-table-panel">
                    <div class="sol-table-title">Solubility Rules Reference</div>
                    <table class="z-data-table">
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
                Analyzing...
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
        subtitleEl.textContent = res.reason;
      } else if (res.insoluble) {
        resultCard.className = "sol-result-card active insoluble";
        subtitleEl.textContent = res.reason;
      } else {
        resultCard.className = "sol-result-card active unknown";
        titleEl.textContent = "Unknown / Complex";
        subtitleEl.textContent = "Logic limited to common inorganic salts.";
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
      reason: "Contains Group 1 metal or Ammonium.",
    };
  }
  // 2. Nitrates & Acetates (Rule 2: Always Soluble)
  if (/NO3/.test(f) || /CH3COO/.test(f) || /C2H3O2/.test(f)) {
    return {
      soluble: true,
      reason: "Nitrates and Acetates are soluble.",
    };
  }
  // 3. Halides (Cl, Br, I)
  // Matches Cl, Br, I. not ClO, BrO.
  if (/(Cl|Br|I)(?![a-z])(?!O)/.test(f)) {
    // Exceptions: Ag, Pb, Hg
    if (/(Ag|Pb|Hg)/.test(f)) {
      return {
        insoluble: true,
        reason: "Halide with Ag/Pb/Hg is insoluble.",
      };
    }
    return {
      soluble: true,
      reason: "Most Halides are soluble.",
    };
  }
  // 4. Sulfates (SO4)
  if (/SO4/.test(f)) {
    // Exceptions: Ca, Sr, Ba, Pb
    if (/(Ca|Sr|Ba|Pb)/.test(f)) {
      return {
        insoluble: true,
        reason: "Sulfate with Ca/Sr/Ba/Pb is insoluble.",
      };
    }
    return {
      soluble: true,
      reason: "Most Sulfates are soluble.",
    };
  }
  // 5. Hydroxides (OH)
  if (/(OH|\(OH\))/.test(f)) {
    // Exceptions: Ca, Sr, Ba (Slightly Soluble -> Treat as Soluble for typical context or specify)
    if (/(Ca|Sr|Ba)/.test(f)) {
      // Often considered slightly soluble. Let's say Soluble.
      return {
        soluble: true,
        reason: "Group 2 Hydroxides (Ca/Sr/Ba) are slightly soluble.",
      };
    }
    return {
      insoluble: true,
      reason: "Most Hydroxides are insoluble.",
    };
  }
  // 6. Carbonates, Phosphates, Sulfides (Insoluble)
  // Matches CO3, PO4, S not SO4.
  if (/CO3/.test(f) || /PO4/.test(f) || /S(?![a-zO])/.test(f)) {
    return {
      insoluble: true,
      reason: "Carbonates/Phosphates/Sulfides are generally insoluble.",
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

  const suspiciousMatch = processed.match(/([A-Za-z])(\d)(\d)([A-Za-z])/);
  if (suspiciousMatch) {
    const [, el1, d1, d2, el2] = suspiciousMatch;
    const alt1 = `${d1}${el1}${d2}${el2}`; // 2H2O
    const alt2 = `${el1}${d1}${el2}${d2}`; // H2O2
    suspicious = `${alt1} ${"or"} ${alt2}`;
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
  let prevWasLetter = false;

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
      prevWasLetter = false;
    } else if (token.type === "symbol") {
      if (val === ".") {
        displayHtml += '<span style="margin: 0 2px;">·</span>';
        cleanFormula += ".";
        prevWasLetter = false;
      } else if (val === "(" || val === "[") {
        displayHtml += val;
        cleanFormula += "(";
        prevWasLetter = false;
      } else if (val === ")" || val === "]") {
        displayHtml += val;
        cleanFormula += ")";
        prevWasLetter = true;
      }
    } else if (token.type === "element") {
      displayHtml += val;
      cleanFormula += val;
      prevWasLetter = true;
    } else if (token.type === "error") {
      displayHtml += `<span style="color: #ef4444; text-decoration: underline wavy;" title="Invalid element">${val}</span>`;
      prevWasLetter = false;
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

function discardReceipt() {
  const wrapper = document.getElementById("receipt-wrapper");
  if (wrapper) {
    wrapper.classList.remove("printing");
    wrapper.classList.add("discarding");
    setTimeout(() => {
      wrapper.classList.add("reset-position");
      wrapper.classList.remove("discarding");
      void wrapper.offsetWidth;
      wrapper.classList.remove("reset-position");
    }, 450);
  }
}

function printReceipt(result) {
  const wrapper = document.getElementById("receipt-wrapper");
  const items = document.getElementById("receipt-items");
  const total = document.getElementById("receipt-total-value");
  const date = document.getElementById("receipt-date");
  if (wrapper && items) {
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
