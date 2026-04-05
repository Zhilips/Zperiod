// =============================================================================
// Language Controller — global i18n for EN / ZH / ZH-HANT / FR / RU / FA / UR / TL
// =============================================================================

import { translations } from "../data/translations.js";

const STORAGE_KEY = "zperiod_lang";
const SUPPORTED = ["en", "zh", "zh-Hant", "fr", "ru", "fa", "ur", "tl", "es"];
const DEFAULT = "en";

let lang = DEFAULT;
let callbacks = [];
let cacheCleanupFns = [];

export const elementLocales = {};
export const ionLocales = {};

const ELEMENT_LOCALE_LOADERS = {
  zh: async () => {
    const module = await import("../data/locales/zh.js");
    return module.zh_elements;
  },
  "zh-Hant": async () => {
    const module = await import("../data/locales/zhHant.js");
    return module.zh_hant_elements;
  },
  fr: async () => {
    const module = await import("../data/locales/fr.js");
    return module.fr_elements;
  },
  ru: async () => {
    const module = await import("../data/locales/ru.js");
    return module.ru_elements;
  },
  fa: async () => {
    const module = await import("../data/locales/fa.js");
    return module.fa_elements;
  },
  ur: async () => {
    const module = await import("../data/locales/ur.js");
    return module.ur_elements;
  },
  tl: async () => {
    const module = await import("../data/locales/tl.js");
    return module.tl_elements;
  },
  es: async () => {
    const module = await import("../data/locales/es.js");
    return module.es_elements;
  },
};

const ION_LOCALE_LOADERS = {
  zh: async () => {
    const module = await import("../data/locales/ions/zh.js");
    return module.zh_ions;
  },
  "zh-Hant": async () => {
    const module = await import("../data/locales/ions/zhHant.js");
    return module.zh_hant_ions;
  },
  fr: async () => {
    const module = await import("../data/locales/ions/fr.js");
    return module.fr_ions;
  },
  ru: async () => {
    const module = await import("../data/locales/ions/ru.js");
    return module.ru_ions;
  },
  fa: async () => {
    const module = await import("../data/locales/ions/fa.js");
    return module.fa_ions;
  },
  ur: async () => {
    const module = await import("../data/locales/ions/ur.js");
    return module.ur_ions;
  },
  tl: async () => {
    const module = await import("../data/locales/ions/tl.js");
    return module.tl_ions;
  },
  es: async () => {
    const module = await import("../data/locales/ions/es.js");
    return module.es_ions;
  },
};

export async function fetchElementLocale(langCode) {
  if (langCode === "en") return;
  // If we already loaded it, skip
  if (elementLocales[langCode]) return;

  const loader = ELEMENT_LOCALE_LOADERS[langCode];
  if (!loader) return;

  try {
    elementLocales[langCode] = await loader();
  } catch (e) {
    console.warn("Could not load element locale for", langCode, e);
  }
}

export async function fetchIonLocale(langCode) {
  if (langCode === "en") return;
  if (ionLocales[langCode]) return;

  const loader = ION_LOCALE_LOADERS[langCode];
  if (!loader) return;

  try {
    ionLocales[langCode] = await loader();
  } catch (e) {
    console.warn("Could not load ion locale for", langCode, e);
  }
}

function invalidateLocalizedCaches() {
  import("./chemToolContent.js")
    .then((module) => {
      module.invalidateChemToolContentCache?.();
    })
    .catch(() => {
      // Cache invalidation is best-effort and should never block language switching.
    });

  // Call all registered cache cleanup functions
  cacheCleanupFns.forEach(fn => {
    try {
      fn();
    } catch (e) {
      console.warn('Cache cleanup function failed:', e);
    }
  });
}

// ── Public API ──

/** Lookup a translated string by dot-path key, e.g. t("nav.table", "Fallback") */
export function t(key, fallback, targetLang) {
  const parts = key.split(".");
  const useLang = targetLang || lang;
  let val = translations[useLang];
  for (const p of parts) {
    if (val == null) break;
    val = val[p];
  }
  if (val != null) return val;

  let fb = translations[DEFAULT];
  for (const p of parts) {
    if (fb == null) return fallback !== undefined ? fallback : key;
    fb = fb[p];
  }
  return fb != null ? fb : (fallback !== undefined ? fallback : key);
}
export function getLang() {
  return lang;
}

export function setLang(code) {
  if (code === "faUr") code = "fa";
  if (!SUPPORTED.includes(code) || code === lang) return;
  
  localStorage.setItem(STORAGE_KEY, code);
  sessionStorage.setItem("zperiod_lang_transition", "true");

  // Create an overlay to hide the page before reload
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.backgroundColor = getComputedStyle(document.body).backgroundColor || "#f8f9fa";
  overlay.style.zIndex = "999999";
  overlay.style.opacity = "0";
  overlay.style.transition = "opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1)";
  // Pointer-events none just in case, but we want to block interactions
  document.body.appendChild(overlay);
  
  // Trigger layout to ensure transition works
  requestAnimationFrame(() => {
    overlay.style.opacity = "1";
    setTimeout(() => {
      window.location.reload();
    }, 280);
  });
}

export function onLangChange(cb) {
  callbacks.push(cb);
}

export function registerCacheCleanup(fn) {
  cacheCleanupFns.push(fn);
}

// ── DOM translation ──

export function applyStaticTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
    el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria-label")));
  });
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    el.setAttribute("title", t(el.getAttribute("data-i18n-title")));
  });
}

// ── Dropdown visual state ──

function updateDropdown() {
  document.querySelectorAll(".lang-option").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

// ── Init ──

export function initLangController() {
  let saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "faUr") {
    saved = "fa";
    localStorage.setItem(STORAGE_KEY, saved);
  }
  if (saved && SUPPORTED.includes(saved)) {
    lang = saved;
  }
  document.documentElement.lang = lang;

  if (sessionStorage.getItem("zperiod_lang_transition") === "true") {
    sessionStorage.removeItem("zperiod_lang_transition");
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = getComputedStyle(document.body).backgroundColor || "#f8f9fa";
    overlay.style.zIndex = "999999";
    overlay.style.opacity = "1";
    overlay.style.pointerEvents = "none";
    overlay.style.transition = "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    document.body.appendChild(overlay);
    
    requestAnimationFrame(() => {
      setTimeout(() => {
        overlay.style.opacity = "0";
        setTimeout(() => overlay.remove(), 450);
      }, 50);
    });
  }

  // Toggle open/close
  const toggle = document.getElementById("lang-dropdown-toggle");
  const dropdown = document.getElementById("lang-dropdown");
  const menu = document.getElementById("lang-dropdown-menu");

  if (toggle && dropdown) {
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle("open");
      document.body.classList.toggle("lang-menu-blur", isOpen);
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        if (dropdown.classList.contains("open")) {
          dropdown.classList.remove("open");
          document.body.classList.remove("lang-menu-blur");
        }
      }
    });
  }

  // Language option clicks
  if (menu) {
    menu.addEventListener("click", (e) => {
      const addBtn = e.target.closest("#lang-add-btn");
      if (addBtn) {
        if (dropdown) dropdown.classList.remove("open");
        const settingsNav = document.querySelector('.nav-pill-btn[data-page="settings"]');
        if (settingsNav) settingsNav.click();
        
        setTimeout(() => {
          const suggestBox = document.getElementById("settings-suggestion-input");
          if (suggestBox) {
            suggestBox.scrollIntoView({ behavior: "smooth", block: "center" });
            suggestBox.focus();
            suggestBox.style.transition = "box-shadow 0.3s ease, background-color 0.3s ease";
            suggestBox.style.boxShadow = "0 0 0 4px rgba(250, 204, 21, 0.4)";
            suggestBox.style.backgroundColor = "rgba(254, 243, 199, 0.5)";
            
            setTimeout(() => {
              suggestBox.style.boxShadow = "";
              suggestBox.style.backgroundColor = "";
            }, 800);
          }
        }, 300);
        return;
      }

      const btn = e.target.closest(".lang-option");
      if (!btn) return;
      const code = btn.dataset.lang;
      if (dropdown) dropdown.classList.remove("open");
      setLang(code);
    });
  }

  Promise.all([fetchElementLocale(lang), fetchIonLocale(lang)]).then(() => {
    applyStaticTranslations();
    updateDropdown();
    callbacks.forEach((cb) => cb(lang));
  });
}
