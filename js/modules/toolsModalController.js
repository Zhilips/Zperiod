// =============================================================================
// Tools Modal Controller - Feature modal and chemistry tool card wiring
// =============================================================================

import { onLangChange, t } from "./langController.js";

function getToolHelpMarkup(toolType) {
  if (toolType === "balancer") {
    return `
      <h3>${t("toolModal.balancerHelpTitle")}</h3>
      <p>${t("toolModal.balancerHelpIntro")}</p>
      <ul>
        <li>${t("toolModal.balancerHelpRule1")}</li>
        <li>${t("toolModal.balancerHelpRule2")}</li>
        <li>${t("toolModal.balancerHelpRule3")}</li>
      </ul>
      <p>${t("toolModal.balancerHelpExample")}</p>
    `;
  }

  return `
    <h3>${t("toolModal.helpTitle")}</h3>
    <p>${t("toolModal.helpBody")}</p>
  `;
}

export function createToolsModalController(options = {}) {
  const { getToolContent, attachToolEventListeners } = options;

  let modalHandlersInitialized = false;
  const toolContentCache = new Map();
  let openRequestToken = 0;
  let activeToolType = null;

  function getModalElements() {
    return {
      modal: document.getElementById("feature-modal"),
      closeButton: document.getElementById("feature-modal-close"),
      helpButton: document.getElementById("feature-modal-help"),
      helpOverlay: document.getElementById("feature-help-overlay"),
      helpCloseButton: document.getElementById("feature-help-close"),
      helpContent: document.querySelector("#feature-help-overlay .help-content"),
      body: document.getElementById("feature-modal-body"),
    };
  }

  function setToolHelpContent(toolType) {
    const { helpContent } = getModalElements();
    if (!helpContent) return;
    helpContent.innerHTML = getToolHelpMarkup(toolType);
  }

  async function getCachedToolContent(toolType) {
    if (!toolType || typeof getToolContent !== "function") return "";
    if (!toolContentCache.has(toolType)) {
      const contentPromise = Promise.resolve(getToolContent(toolType))
        .then((content) => content || "")
        .catch((error) => {
          toolContentCache.delete(toolType);
          throw error;
        });

      toolContentCache.set(toolType, contentPromise);
    }

    return toolContentCache.get(toolType);
  }

  function closeToolModal() {
    const { modal, helpOverlay } = getModalElements();
    if (!modal) return;
    openRequestToken += 1;
    activeToolType = null;
    modal.classList.remove("active");
    document.body.classList.remove("hide-nav");
    if (helpOverlay) helpOverlay.style.display = "none";
  }

  function clearToolContentCache() {
    toolContentCache.clear();
  }

  function initFeatureModalHandlers() {
    if (modalHandlersInitialized) return;

    const {
      modal,
      closeButton,
      helpButton,
      helpOverlay,
      helpCloseButton,
    } = getModalElements();

    if (closeButton) {
      closeButton.addEventListener("click", closeToolModal);
    }

    // Help button (?) toggle
    if (helpButton && helpOverlay) {
      helpButton.addEventListener("click", () => {
        if (activeToolType === "balancer") {
          const predictorPanel = document.getElementById("predictor-panel");
          if (predictorPanel && predictorPanel.classList.contains("active")) {
            import("./tutorialController.js").then((m) => m.initPredictorTutorial(true));
          } else {
            import("./tutorialController.js").then((m) => m.initBalancerTutorial(true));
          }
        } else if (activeToolType === "molar-mass") {
          import("./tutorialController.js").then((m) => m.initMolarMassTutorial(true));
        } else if (activeToolType === "solubility") {
          import("./tutorialController.js").then((m) => m.initSolubilityTutorial(true));
        } else {
          helpOverlay.style.display = helpOverlay.style.display === "none" ? "flex" : "none";
        }
      });
    }
    if (helpCloseButton && helpOverlay) {
      helpCloseButton.addEventListener("click", () => {
        helpOverlay.style.display = "none";
      });
    }

    if (modal) {
      modal.addEventListener("click", (e) => {
        if (window._zperiodIsDragging) return;
        if (e.target === modal) closeToolModal();
      });
    }

    modalHandlersInitialized = true;
  }

  async function openToolModal(toolType) {
    const { modal, body, helpOverlay } = getModalElements();
    if (!modal || !body) {
      return;
    }

    activeToolType = toolType;
    modal.classList.add("active");
    document.body.classList.add("hide-nav");
    if (helpOverlay) helpOverlay.style.display = "none";
    setToolHelpContent(toolType);
    body.innerHTML = `<div class="tool-modal-loading">${t("toolModal.loading")}</div>`;

    const requestToken = ++openRequestToken;

    try {
      const content = await getCachedToolContent(toolType);
      if (!content || requestToken !== openRequestToken) return;

      body.innerHTML = content;

      if (typeof attachToolEventListeners === "function") {
        requestAnimationFrame(() => {
          attachToolEventListeners(toolType);
          
          if (toolType === "balancer") {
            import("./tutorialController.js").then((m) => m.initBalancerTutorial(false));
          } else if (toolType === "molar-mass") {
            import("./tutorialController.js").then((m) => m.initMolarMassTutorial(false));
          } else if (toolType === "solubility") {
            import("./tutorialController.js").then((m) => m.initSolubilityTutorial(false));
          }
        });
      }
    } catch (error) {
      if (requestToken !== openRequestToken) return;

      body.innerHTML = `
        <div class="tool-modal-loading tool-modal-loading-error">
          <strong>${t("toolModal.errorTitle")}</strong>
          <span>${t("toolModal.errorMsg")}</span>
        </div>
      `;
      console.error("Tool modal load error:", error);
    }
  }

  function activateToolCard(card) {
    const toolType = card?.dataset.tool;
    if (!toolType) return;
    openToolModal(toolType);
  }

  function bindToolCard(card) {
    if (!card || card.dataset.toolBound === "true") return;

    const handleActivate = () => activateToolCard(card);

    card.addEventListener("click", handleActivate);
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      handleActivate();
    });

    if (!card.hasAttribute("tabindex")) {
      card.tabIndex = 0;
    }
    card.setAttribute("role", "button");
    card.dataset.toolBound = "true";
  }

  function initChemToolCards() {
    const toolsGrid = document.querySelector(".chem-tools-grid");
    if (!toolsGrid) return;

    toolsGrid
      .querySelectorAll(".chem-tool-card[data-tool]")
      .forEach(bindToolCard);

  }

  function init() {
    initFeatureModalHandlers();
    initChemToolCards();
    onLangChange(() => {
      const { modal } = getModalElements();
      if (modal?.classList.contains("active") && activeToolType) {
        openToolModal(activeToolType);
      } else {
        setToolHelpContent(activeToolType);
      }
    });
  }

  return {
    init,
    initChemToolCards,
    openToolModal,
    closeToolModal,
    clearToolContentCache,
  };
}
