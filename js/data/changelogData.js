// =============================================================================
// Changelog Data — Zperiod version history
// =============================================================================

export const changelogData = [
  {
    version: "2.0.0",
    date: "2026-03-22",
    changes: [
      "New: Element Information Toggle (EIT) adds full-table property visualization with Color and Filter modes",
      "Redesign: Chemistry Tools homepage rebuilt with cleaner cards, clearer hierarchy, and faster navigation",
      "Localization: Major multilingual expansion across UI, ions, worksheet, settings, and search",
      "Data: Added richer element detail, improved historical notes, and more complete information layers",
      "Search: Added a dedicated search button and improved localized element-name search",
      "Polish: Fixed a wide range of layout, translation, and interaction bugs across the site",
    ],
  },
  {
    version: "1.3.0",
    date: "2026-03-07",
    changes: [
      "New: Element Information Toggle (EIT) — visualize any numeric property across the entire periodic table with Color or Filter mode",
      "New: Click property values in the element modal to toggle between different units (e.g. °C ↔ °F ↔ K)",
      "Data: Comprehensive element data audit & corrections for accuracy",
      "Performance: 3D atom renderer optimized — nucleus interior culling, geometry caching, reusable vector pool",
      "Performance: EIT slider uses fast-path DOM updates for jank-free interaction",
      "UI: Orbit hover highlighting in 3D atom view",
      "Cleanup: Removed 1.16 MB of redundant files, streamlined codebase",
    ],
  },
  {
    version: "1.2.0",
    date: "2026-03-01",
    changes: [
      "New Settings page with animation speed control & pause",
      "Simplified navbar — links moved to modular Settings cards",
      "Suggestion box with prompt chips for quick feedback",
      "Fixed panel drag/close interaction bugs",
      "Improved mobile device detection accuracy",
      "Mobile landing page UX polish & scroll guidance",
    ],
  },
  {
    version: "1.1.0",
    date: "2026-02-26",
    changes: [
      "Modular CSS/JS refactor for maintainability",
      "Mobile landing page with feature showcase",
      "Accurate mobile vs. desktop device detection",
      "Responsive worksheet breakpoint tuned to 840px",
      "Valence electron font size made adaptive",
      "Ion formula display fix (CH₃COO⁻) & styling",
      "Unified tools modal styling with element/ion modals",
    ],
  },
  {
    version: "1.0.0",
    date: "2026-02-07",
    changes: [
      "Official v1.0 release — Zperiod goes public",
      "118 elements with full chemical data",
      "3D atom models with interactive electron orbits",
      "Ion engine with 50+ common ions",
      "Chemistry Tools: Equation Balancer, Molar Mass, Empirical Formula, Solubility Table",
      "Worksheet Generator with PDF export",
      "Google Analytics & Microsoft Clarity integration",
      "Custom domain (zperiod.app) configured",
    ],
  },
  {
    version: "0.5.0",
    date: "2026-01-14",
    changes: [
      "Ions Table quick access & solubility checker",
      "Major UI improvements across the board",
      "Comprehensive README documentation",
    ],
  },
  {
    version: "0.1.0",
    date: "2025-12-29",
    changes: [
      "Initial commit — Interactive Periodic Table prototype",
      "WebGL compatibility fix for cross-device rendering",
      "Swipe/drag navigation for page switching",
      "Asset minification & obfuscation pipeline",
    ],
  },
];
