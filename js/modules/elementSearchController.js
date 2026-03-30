// =============================================================================
// Element Search Controller - Navbar element search with autocomplete
// =============================================================================

import { elements } from "../data/elementsData.js";
import { showModal } from "./uiController.js";
import {
  t,
  getLang,
  elementLocales,
  fetchElementLocale,
  onLangChange,
} from "./langController.js";

// Category → [background, text] color map (matches periodic table grid.css)
const CATEGORY_COLORS = {
  "alkali metal":          ["#ffcccc", "#5d2e2e"],
  "alkaline earth metal":  ["#ffe5cc", "#5d402e"],
  "transition metal":      ["#fff2cc", "#5d522e"],
  "post-transition metal": ["#d9e2f3", "#2e3a5d"],
  "metalloid":             ["#d1e7dd", "#2e5d4b"],
  "other nonmetal":        ["#e2f0d9", "#3a5d2e"],
  "nonmetal":              ["#e2f0d9", "#3a5d2e"],
  "halogen":               ["#ffffcc", "#5d5d2e"],
  "noble gas":             ["#e0ccff", "#4b2e5d"],
  "lanthanide":            ["#fce4d6", "#5d3a2e"],
  "actinide":              ["#fddddd", "#5d2e2e"],
};

function getCategoryColors(category) {
  if (!category) return ["#e0e0e0", "#666"];
  return CATEGORY_COLORS[category.toLowerCase()] || ["#e0e0e0", "#666"];
}

function normalizeSearchText(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getLocalizedElementName(element) {
  const lang = getLang();
  if (lang === "en") return element.name;
  return elementLocales[lang]?.[element.number]?.name || element.name;
}

export function initElementSearch({ showPage, updateGlobalNavActive } = {}) {
  const input = document.getElementById("element-search-input");
  const resultsPanel = document.getElementById("element-search-results");
  const wrapper = document.getElementById("element-search-wrapper");
  if (!input || !resultsPanel) return;

  let searchIndex = [];

  let activeIndex = -1;
  let currentResults = [];

  function rebuildSearchIndex() {
    searchIndex = elements
      .filter((el) => typeof el.number === "number")
      .map((el) => {
        const localizedName = getLocalizedElementName(el);
        const searchableTerms = [
          el.symbol,
          String(el.number),
          el.name,
          localizedName,
        ]
          .filter(Boolean)
          .map((term) => String(term).trim())
          .filter((term, index, arr) => arr.indexOf(term) === index);

        return {
          element: el,
          number: el.number,
          symbol: el.symbol,
          displayName: localizedName,
          englishName: el.name,
          symbolLower: normalizeSearchText(el.symbol),
          searchableTerms,
          searchableTermsLower: searchableTerms.map(normalizeSearchText),
        };
      });
  }

  function search(query) {
    const q = normalizeSearchText(query);
    if (!q) return [];

    const scored = [];
    for (const entry of searchIndex) {
      let score = 0;
      if (entry.symbolLower === q) {
        score = 100; // exact symbol match
      } else if (entry.symbolLower.startsWith(q)) {
        score = 80; // symbol prefix
      } else if (String(entry.number) === q) {
        score = 90; // exact atomic number match
      } else if (String(entry.number).startsWith(q)) {
        score = 50; // atomic number prefix
      } else {
        for (const term of entry.searchableTermsLower) {
          if (term === q) {
            score = Math.max(score, 70); // exact name match
          } else if (term.startsWith(q)) {
            score = Math.max(score, 60); // name prefix
          } else if (term.includes(q)) {
            score = Math.max(score, 40); // name contains
          }
        }
      }

      if (score > 0) {
        scored.push({ ...entry, score });
      }
    }

    scored.sort((a, b) => b.score - a.score || a.number - b.number);
    return scored.slice(0, 8);
  }

  function highlightMatch(text, query) {
    const q = query.trim();
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
      text.slice(0, idx) +
      `<mark>${text.slice(idx, idx + q.length)}</mark>` +
      text.slice(idx + q.length)
    );
  }

  function render(results, query) {
    currentResults = results;
    activeIndex = -1;

    if (results.length === 0 && query.trim()) {
      resultsPanel.innerHTML = `<div class="element-search-empty">${t("search.noResults")}</div>`;
      resultsPanel.classList.add("visible");
      return;
    }

    if (results.length === 0) {
      hide();
      return;
    }

    resultsPanel.innerHTML = results
      .map((r, i) => {
        const [bg, fg] = getCategoryColors(r.element.category);
        return `
      <div class="element-search-item" data-index="${i}">
        <div class="element-search-item-symbol" style="background:${bg};color:${fg}">
          <span class="element-search-item-number">${r.number}</span>
          ${r.symbol}
        </div>
        <div class="element-search-item-info">
          <div class="element-search-item-name">${highlightMatch(r.displayName, query)}</div>
          <div class="element-search-item-detail">${r.element.category || "Unknown"}</div>
        </div>
      </div>`;
      })
      .join("");

    resultsPanel.classList.add("visible");
  }

  function hide() {
    resultsPanel.classList.remove("visible");
    activeIndex = -1;
    currentResults = [];
  }

  function selectResult(index) {
    const result = currentResults[index];
    if (!result) return;

    // Navigate to table page if not already there
    if (showPage && updateGlobalNavActive) {
      showPage("table");
      updateGlobalNavActive("table");
    }

    showModal(result.element);
    input.value = "";
    hide();
    input.blur();
  }

  function setActiveItem(index) {
    const items = resultsPanel.querySelectorAll(".element-search-item");
    items.forEach((el) => el.classList.remove("active"));
    if (index >= 0 && index < items.length) {
      activeIndex = index;
      items[index].classList.add("active");
      items[index].scrollIntoView({ block: "nearest" });
    }
  }

  // --- Event listeners ---

  input.addEventListener("input", () => {
    const results = search(input.value);
    render(results, input.value);
  });

  input.addEventListener("keydown", (e) => {
    if (!resultsPanel.classList.contains("visible")) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = activeIndex < currentResults.length - 1 ? activeIndex + 1 : 0;
      setActiveItem(next);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = activeIndex > 0 ? activeIndex - 1 : currentResults.length - 1;
      setActiveItem(prev);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0) {
        selectResult(activeIndex);
      } else if (currentResults.length > 0) {
        selectResult(0);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      hide();
      input.blur();
    }
  });

  resultsPanel.addEventListener("click", (e) => {
    const item = e.target.closest(".element-search-item");
    if (!item) return;
    const index = parseInt(item.dataset.index, 10);
    selectResult(index);
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (wrapper && !wrapper.contains(e.target)) {
      hide();
    }
  });

  fetchElementLocale(getLang()).finally(() => {
    rebuildSearchIndex();
    if (input.value.trim()) {
      render(search(input.value), input.value);
    }
  });

  onLangChange(() => {
    rebuildSearchIndex();
    if (input.value.trim()) {
      render(search(input.value), input.value);
    } else {
      hide();
    }
  });
}
