import { changelogData } from "../data/changelogData.js";
import { changelogLocales } from "../data/changelogLocales.js";
import {
  SUCCESS_ICON_SVG,
  flashSentState,
  submitSuggestion,
} from "./feedbackController.js";
import { getLang, onLangChange, t } from "./langController.js";

const ANIMATION_PAUSED_KEY = "zperiod_anim_paused";
const ANIMATION_SPEED_KEY = "zperiod_anim_speed";
const DEFAULT_ANIMATION_SPEED = 0.6;
const SETTINGS_FEEDBACK_DURATION_MS = 2500;
const UNIT_SYNC_RESIZE_DELAY_MS = 80;
const UNIT_SYNC_BOOTSTRAP_DELAYS_MS = [150, 600];
const UNIT_SLIDER_TRANSITION =
  "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease";

export function getSavedAnimationState() {
  const savedSpeed = parseFloat(localStorage.getItem(ANIMATION_SPEED_KEY));

  return {
    paused: localStorage.getItem(ANIMATION_PAUSED_KEY) === "true",
    speed: Number.isFinite(savedSpeed) ? savedSpeed : DEFAULT_ANIMATION_SPEED,
  };
}

export function applyAnimationPauseState(paused) {
  document.documentElement.style.setProperty(
    "--ion-anim-play-state",
    paused ? "paused" : "running",
  );
}

export function initSettingsController(options = {}) {
  const { onOpenWelcome, l3UnitState, setGlobalUnit } = options;

  renderChangelog();
  initSettingsSuggestionForm();
  initWelcomeButton(onOpenWelcome);
  initAnimationControls();
  initPreferencesCard();
  syncCardHeights();
  onLangChange(() => renderChangelog());

  const syncGlobalUnitButtons = initGlobalUnitControls({
    l3UnitState,
    setGlobalUnit,
  });

  window._syncGlobalUnitButtons = syncGlobalUnitButtons;
  UNIT_SYNC_BOOTSTRAP_DELAYS_MS.forEach((delay) => {
    window.setTimeout(() => syncGlobalUnitButtons(true), delay);
  });

  return { syncGlobalUnitButtons };
}

function syncCardHeights() {
  const linksGroup = document.querySelector('.sv-links-group');
  const unitsCard = document.querySelector('.sv-card-units');
  if (!linksGroup || !unitsCard) return;

  const sync = () => {
    unitsCard.style.minHeight = '';
    requestAnimationFrame(() => {
      const linksH = linksGroup.offsetHeight;
      const unitsH = unitsCard.offsetHeight;
      if (linksH > unitsH) {
        unitsCard.style.minHeight = `${linksH}px`;
      }
    });
  };

  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(sync).observe(linksGroup);
  }
  window.addEventListener('resize', sync);
  sync();
}

function renderChangelog() {
  const changelogList = document.getElementById("settings-changelog-list");
  if (!changelogList) return;
  const lang = getLang();

  changelogList.innerHTML = changelogData
    .map(
      (entry) => {
        const localizedEntry = changelogLocales[lang]?.[entry.version];
        const changes = localizedEntry?.changes || entry.changes;
        return `
      <div class="changelog-entry">
        <div class="changelog-header">
          <span class="changelog-version">v${entry.version}</span>
          <span class="changelog-date">${localizedEntry?.date || entry.date}</span>
        </div>
        <ul class="changelog-items">
          ${changes.map((change) => `<li>${change}</li>`).join("")}
        </ul>
      </div>
    `;
      },
    )
    .join("");
}

function initSettingsSuggestionForm() {
  const suggInput = document.getElementById("settings-suggestion-input");
  const suggSend = document.getElementById("settings-suggestion-send");
  const suggStatus = document.getElementById("suggest-status");
  const chipContainer = document.getElementById("suggest-chips");

  if (!suggInput || !suggSend) return;

  initSuggestionChips({ chipContainer, suggInput });

  const originalSendHTML = suggSend.innerHTML;

  const resizeTextarea = () => {
    suggInput.style.height = "auto";
    suggInput.style.height = `${Math.min(suggInput.scrollHeight, 160)}px`;
  };

  const sendSuggestion = async () => {
    const text = suggInput.value.trim();
    if (!text) return;

    await submitSuggestion(text, { source: "Zperiod Settings" });

    suggInput.value = "";
    resizeTextarea();
    clearActiveSuggestionChip(chipContainer);

    if (suggStatus) {
      suggStatus.textContent = t("settingsCtrl.suggSent");
      suggStatus.className = "sv-suggest-status success";
    }

    flashSentState(suggSend, {
      duration: SETTINGS_FEEDBACK_DURATION_MS,
      onReset: () => {
        if (suggStatus) {
          suggStatus.textContent = "";
          suggStatus.className = "sv-suggest-status";
        }
        suggInput.placeholder = t("settingsCtrl.suggPlaceholder");
      },
    });
  };

  suggSend.addEventListener("click", sendSuggestion);
  suggInput.addEventListener("input", resizeTextarea);
}

function initSuggestionChips({ chipContainer, suggInput }) {
  if (!chipContainer || !suggInput) return;

  let activeChip = null;

  const getChipPrefillText = (chip) => {
    if (!chip) return "";
    const prefillKey = chip.dataset.prefillKey;
    if (prefillKey) return t(prefillKey);
    return chip.dataset.text || "";
  };

  const resizeTextarea = () => {
    suggInput.style.height = "auto";
    suggInput.style.height = `${Math.min(suggInput.scrollHeight, 160)}px`;
  };

  onLangChange(() => {
    const prefill = getChipPrefillText(activeChip);
    if (activeChip) {
      suggInput.value = prefill;
    }
    suggInput.placeholder = prefill
      ? t("settingsCtrl.continuePlaceholder")
      : t("settingsCtrl.suggPlaceholder");
    resizeTextarea();
  });

  chipContainer.addEventListener("click", (event) => {
    const chip = event.target.closest(".sv-chip");
    if (!chip) return;

    if (activeChip) activeChip.classList.remove("active");

    if (activeChip === chip) {
      activeChip = null;
      suggInput.value = "";
      suggInput.placeholder = t("settingsCtrl.suggPlaceholder");
      resizeTextarea();
      return;
    }

    activeChip = chip;
    chip.classList.add("active");

    const prefill = getChipPrefillText(chip);
    suggInput.value = prefill;
    suggInput.placeholder = prefill
      ? t("settingsCtrl.continuePlaceholder")
      : t("settingsCtrl.suggPlaceholder");
    resizeTextarea();
    suggInput.focus();
  });
}

function clearActiveSuggestionChip(chipContainer) {
  const activeChip = chipContainer?.querySelector(".sv-chip.active");
  if (activeChip) activeChip.classList.remove("active");
}

function initWelcomeButton(onOpenWelcome) {
  const openWelcomeBtn = document.getElementById("settings-open-welcome");
  if (!openWelcomeBtn || typeof onOpenWelcome !== "function") return;

  openWelcomeBtn.addEventListener("click", () => {
    onOpenWelcome();
  });
}

function initAnimationControls() {
  const playToggle = document.getElementById("anim-play-toggle");
  const speedSlider = document.getElementById("anim-speed-slider");
  const speedLabel = document.getElementById("speed-value-label");

  if (speedSlider) {
    speedSlider.value = window._zperiodAnimSpeed;
    if (speedLabel) {
      speedLabel.textContent = `${window._zperiodAnimSpeed.toFixed(1)}×`;
    }
  }

  if (playToggle) {
    updatePlayToggleIcon(playToggle, window._zperiodAnimPaused);
  }

  applyAnimationPauseState(window._zperiodAnimPaused);

  if (playToggle) {
    playToggle.addEventListener("click", () => {
      window._zperiodAnimPaused = !window._zperiodAnimPaused;
      localStorage.setItem(ANIMATION_PAUSED_KEY, window._zperiodAnimPaused);
      updatePlayToggleIcon(playToggle, window._zperiodAnimPaused);
      applyAnimationPauseState(window._zperiodAnimPaused);
    });
  }

  if (speedSlider) {
    speedSlider.addEventListener("input", () => {
      const value = parseFloat(speedSlider.value);
      window._zperiodAnimSpeed = value;
      localStorage.setItem(ANIMATION_SPEED_KEY, value);
      if (speedLabel) speedLabel.textContent = `${value.toFixed(1)}×`;
    });
  }
}

function updatePlayToggleIcon(button, isPaused) {
  const pauseIcon = button.querySelector(".icon-pause");
  const playIcon = button.querySelector(".icon-play");

  if (isPaused) {
    if (pauseIcon) pauseIcon.style.display = "none";
    if (playIcon) playIcon.style.display = "block";
    return;
  }

  if (pauseIcon) pauseIcon.style.display = "block";
  if (playIcon) playIcon.style.display = "none";
}

function initPreferencesCard() {
  const reduceToggle = document.getElementById("reduce-motion-toggle");
  const clearBtn = document.getElementById("settings-clear-data");

  if (reduceToggle) {
    const isReduced = localStorage.getItem("zperiod_reduce_motion") === "true";
    reduceToggle.checked = isReduced;
    
    reduceToggle.addEventListener("change", (e) => {
      localStorage.setItem("zperiod_reduce_motion", e.target.checked);
      if (e.target.checked) document.body.classList.add("reduce-motion");
      else document.body.classList.remove("reduce-motion");
    });
    
    if (isReduced) document.body.classList.add("reduce-motion");
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      const msg = getLang() === "zh" 
        ? "确定要清除所有本地数据（包括单位、主题、动画偏好）并重新加载吗？"
        : "Are you sure you want to clear all local data (units, preferences) and reload?";
        
      if (confirm(msg)) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
      }
    });
  }
}

function initGlobalUnitControls({ l3UnitState, setGlobalUnit }) {
  const unitButtons = [...document.querySelectorAll(".unit-setting-btn")];
  if (unitButtons.length === 0 || !l3UnitState || typeof setGlobalUnit !== "function") {
    return () => {};
  }

  const syncGlobalUnitButtons = (immediate = false) => {
    ["temp", "density", "energy"].forEach((type) => {
      syncUnitGroup({ type, immediate, l3UnitState, unitButtons });
    });
  };

  const settingsPage = document.getElementById("settings-page");
  let resizeTimer = null;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (!settingsPage?.classList.contains("active")) return;
      requestAnimationFrame(() => syncGlobalUnitButtons(true));
    }, UNIT_SYNC_RESIZE_DELAY_MS);
  });

  unitButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const type = button.dataset.type;
      const idx = Number.parseInt(button.dataset.idx || "0", 10);

      setGlobalUnit(type, idx);
      syncGlobalUnitButtons();
    });
  });

  return syncGlobalUnitButtons;
}

function syncUnitGroup({ type, immediate, l3UnitState, unitButtons }) {
  const currentIndex = getCurrentUnitIndex(type, l3UnitState);

  unitButtons.forEach((button) => {
    if (button.dataset.type !== type) return;

    const isActive = Number.parseInt(button.dataset.idx || "0", 10) === currentIndex;
    button.classList.toggle("active", isActive);

    if (!isActive) return;

    const container = button.closest(".global-nav-pill");
    const slider = container?.querySelector(".sv-nav-pill-slider");
    if (!slider || !container) return;

    const buttonRect = button.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    if (buttonRect.width === 0 && immediate) {
      requestAnimationFrame(() => syncUnitGroup({
        type,
        immediate: true,
        l3UnitState,
        unitButtons,
      }));
      return;
    }

    slider.style.transition = immediate ? "none" : UNIT_SLIDER_TRANSITION;
    slider.style.width = `${buttonRect.width}px`;
    slider.style.transform = `translateX(${buttonRect.left - containerRect.left}px)`;
    slider.style.opacity = "1";

    if (immediate) {
      slider.offsetHeight;
      slider.style.transition = UNIT_SLIDER_TRANSITION;
    }
  });
}

function getCurrentUnitIndex(type, l3UnitState) {
  if (type === "temp") return l3UnitState.melt || 0;
  if (type === "density") return l3UnitState.density || 0;
  if (type === "energy") return l3UnitState.ie || 0;
  return 0;
}
