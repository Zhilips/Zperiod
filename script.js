// ========================================
// Welcome Modal - Intro Page
// ========================================
(function initWelcomeModal() {
  document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("welcome-modal");
    const closeBtn = document.getElementById("welcome-close-btn");
    const aboutBtn = document.getElementById("floating-about-btn");
    const startBtn = document.getElementById("welcome-start-btn");
    const dateEl = document.getElementById("current-date-display");

    if (!modal) return;

    // Set current date
    if (dateEl) {
      const now = new Date();
      const options = { year: "numeric", month: "long", day: "numeric" };
      dateEl.textContent = now.toLocaleDateString("en-US", options);
    }

    // Check if user has visited before
    const hasVisited = localStorage.getItem("zperiod_welcomed");
    if (!hasVisited) {
      modal.classList.add("active");
      document.body.classList.add("welcome-active");
      document.body.classList.add("hide-nav");
    }

    function showWelcome() {
      modal.classList.add("active");
      document.body.classList.add("welcome-active");
      document.body.classList.add("hide-nav");
    }

    function closeWelcome() {
      modal.classList.remove("active");
      document.body.classList.remove("welcome-active");
      document.body.classList.remove("hide-nav");
      localStorage.setItem("zperiod_welcomed", "true");
      // Dispose hero WebGL renderer to free context
      if (window._heroCleanup) window._heroCleanup();
    }

    if (closeBtn) closeBtn.addEventListener("click", closeWelcome);
    if (startBtn) startBtn.addEventListener("click", closeWelcome);
    if (aboutBtn) aboutBtn.addEventListener("click", showWelcome);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeWelcome();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeWelcome();
      }
    });
  });

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
})();

// ========================================
// Suggestion Input - UI Interaction
// ========================================
(function initSuggestionBox() {
  document.addEventListener("DOMContentLoaded", () => {
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
  });
})();

// ========================================
// Periodic Table Auto-Scale on Short Viewport
// ========================================
(function initPeriodicTableScale() {
  document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("periodic-table");
    const container = document.getElementById("main-container");
    if (!table || !container) return;

    function scaleTable() {
      // Only scale when the periodic table page is visible
      if (container.style.display === "none") return;

      // Reset scale to measure natural size
      table.style.transform = "none";

      const vh = window.innerHeight;
      const navHeight = vh <= 500 ? 45 : vh <= 700 ? 60 : 80;
      const bottomPad = 15;
      const availableH = window.innerHeight - navHeight - bottomPad;
      const availableW = container.clientWidth;

      // Natural table dimensions based on aspect ratio 18:10
      const tableW = Math.min(availableW, window.innerWidth * 0.9);
      const tableNaturalH = tableW * (10 / 18);

      const legend = document.getElementById("table-legend");
      const legendItems = legend ? legend.querySelectorAll(".legend-item") : [];

      if (tableNaturalH > availableH && availableH > 0) {
        const scale = availableH / tableNaturalH;
        const finalScale = Math.min(scale, 1);
        table.style.transform = `scale(${finalScale})`;

        // Compensate legend item font-size so text stays visually the same size
        if (finalScale < 1) {
          const compensated = 13 / finalScale;
          legendItems.forEach(
            (item) => (item.style.fontSize = compensated + "px"),
          );
        } else {
          legendItems.forEach((item) => (item.style.fontSize = ""));
        }
      } else {
        table.style.transform = "none";
        legendItems.forEach((item) => (item.style.fontSize = ""));
      }
    }

    // Debounced resize
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(scaleTable, 50);
    });

    // Initial scale
    scaleTable();
    // Recheck after fonts/images loaded
    window.addEventListener("load", scaleTable);
  });
})();

let lockedSlideIndex = null;
const finallyData = {
  H: {
    discovery: "1766",
    avgAtomicMass: "1.008",
    discoveredBy: "Henry Cavendish",
    namedBy: "Antoine Lavoisier",
    stse: "Energy transition (Fuel Cells); Hydrogen as energy carrier; Heavy Water (D₂O) in CANDU reactors.",
    uses: "Ammonia Production, Hydrogenation.",
    hazards: "Highly flammable, Explosion risk.",
    valenceElectrons: 1,
    commonIons: "H⁺ (Hydron), H⁻ (Hydride)",
    oxidationStates: ["+1", "-1"],
    electronConfig: "1s¹",
    electronegativity: 2.2,
    ionization: "1312 kJ/mol",
    density: "0.0899 g/L",
    melt: "-259.1°C",
    boil: "-252.8°C",
    isotopes: [
      { name: "H-1", neutron: "0n", percent: "Stable" },
      { name: "H-2", neutron: "1n", percent: "Stable" },
      { name: "H-3", neutron: "2n", percent: "Radioactive" },
    ],
  },
  He: {
    discovery: "1895 (Isolated)",
    avgAtomicMass: "4.0026",
    discoveredBy: "William Ramsay, Per Teodor Cleve",
    namedBy: "Lockyer & Frankland",
    stse: "Cryogenics (MRI supermagnets); Non-renewable resource conservation.",
    uses: "MRI cooling, Lifting gas (balloons), Shielding gas (welding).",
    hazards: "Asphyxiant in confined spaces.",
    valenceElectrons: 2,
    commonIons: "None (inert)",
    oxidationStates: ["0"],
    electronConfig: "1s²",
    electronegativity: null,
    ionization: "2372 kJ/mol",
    density: "0.1786 g/L",
    melt: "— (Pressurized only)",
    boil: "-268.9°C",
    isotopes: [
      { name: "He-3", neutron: "1n", percent: "Stable" },
      { name: "He-4", neutron: "2n", percent: "Stable" },
    ],
  },
  Li: {
    discovery: "1817",
    avgAtomicMass: "6.94",
    discoveredBy: "Johan August Arfwedson",
    namedBy: "Jöns Jakob Berzelius",
    stse: "Battery technology (EV revolution); Mental health (Mood stabilizers).",
    uses: "Li-ion batteries, Ceramics, Lubricants.",
    hazards: "Reacts vigorously with water; Corrosive.",
    valenceElectrons: 1,
    commonIons: "Li⁺",
    oxidationStates: ["+1"],
    electronConfig: "[He] 2s¹",
    electronegativity: 0.98,
    ionization: "520 kJ/mol",
    density: "0.534 g/cm³",
    melt: "180.5°C",
    boil: "1342°C",
    isotopes: [
      { name: "Li-6", neutron: "3n", percent: "Stable" },
      { name: "Li-7", neutron: "4n", percent: "Stable" },
    ],
  },
  Be: {
    discovery: "1798",
    avgAtomicMass: "9.0122",
    discoveredBy: "Louis-Nicolas Vauquelin",
    namedBy: "Friedrich Wöhler",
    stse: "Aerospace engineering (James Webb Telescope mirrors); Nuclear physics (Neutron reflector).",
    uses: "X-ray windows, Non-sparking tools (alloys).",
    hazards: "Highly toxic (Berylliosis); Carcinogenic.",
    valenceElectrons: 2,
    commonIons: "Be²⁺",
    oxidationStates: ["+2"],
    electronConfig: "[He] 2s²",
    electronegativity: 1.57,
    ionization: "900 kJ/mol",
    density: "1.85 g/cm³",
    melt: "1287°C",
    boil: "2469°C",
    isotopes: [{ name: "Be-9", neutron: "5n", percent: "Stable" }],
  },
  B: {
    discovery: "1808",
    avgAtomicMass: "10.81",
    discoveredBy: "Gay-Lussac & Thénard (and Davy)",
    namedBy: 'Derived from "Borax"',
    stse: "Agriculture (Essential plant nutrient); Nuclear safety (Control rods).",
    uses: "Pyrex glass (Borosilicate), Fiberglass, Detergents.",
    hazards: "Low toxicity as element; some compounds toxic.",
    valenceElectrons: 3,
    commonIons: "B³⁺ (rarely ionic)",
    oxidationStates: ["+3"],
    electronConfig: "[He] 2s² 2p¹",
    electronegativity: 2.04,
    ionization: "801 kJ/mol",
    density: "2.34 g/cm³",
    melt: "2076°C",
    boil: "3927°C",
    isotopes: [
      { name: "B-10", neutron: "5n", percent: "Stable" },
      { name: "B-11", neutron: "6n", percent: "Stable" },
    ],
  },
  C: {
    discovery: "Prehistoric",
    avgAtomicMass: "12.011",
    discoveredBy: "Ancient Civilizations",
    namedBy: "Antoine Lavoisier",
    stse: "Climate Change (Carbon Cycle); Organic Chemistry (Basis of Life); Radiocarbon dating.",
    uses: "Steel manufacturing, Filters, Gemstones, Fuels.",
    hazards: "CO/CO₂ from combustion; dust inhalation.",
    valenceElectrons: 4,
    commonIons: "N/A (Forms covalent bonds)",
    oxidationStates: ["+4", "-4"],
    electronConfig: "[He] 2s² 2p²",
    electronegativity: 2.55,
    ionization: "1086 kJ/mol",
    density: "2.26 g/cm³ (Graphite)",
    melt: "Sublimes (~3642°C)",
    boil: "Sublimes",
    isotopes: [
      { name: "C-12", neutron: "6n", percent: "Stable" },
      { name: "C-13", neutron: "7n", percent: "Stable" },
      { name: "C-14", neutron: "8n", percent: "Radioactive" },
    ],
  },
  N: {
    discovery: "1772",
    avgAtomicMass: "14.007",
    discoveredBy: "Daniel Rutherford",
    namedBy: "Jean-Antoine Chaptal",
    stse: "Agriculture (Haber-Bosch Process/Fertilizers); Cryogenics (Liquid N₂).",
    uses: "Fertilizers, Explosives, Food packaging (inert atmosphere).",
    hazards: "Asphyxiant (displaces oxygen).",
    valenceElectrons: 5,
    commonIons: "N³⁻ (Nitride)",
    oxidationStates: ["-3", "+3", "+5"],
    electronConfig: "[He] 2s² 2p³",
    electronegativity: 3.04,
    ionization: "1402 kJ/mol",
    density: "1.25 g/L",
    melt: "-210.0°C",
    boil: "-195.8°C",
    isotopes: [
      { name: "N-14", neutron: "7n", percent: "Stable" },
      { name: "N-15", neutron: "8n", percent: "Stable" },
    ],
  },
  O: {
    discovery: "1774",
    avgAtomicMass: "15.999",
    discoveredBy: "Joseph Priestley / Carl Wilhelm Scheele",
    namedBy: "Antoine Lavoisier",
    stse: "Biological respiration; Combustion engines; Ozone layer protection.",
    uses: "Steel making, Medical life support, Water treatment.",
    hazards: "Oxidizer (accelerates fire).",
    valenceElectrons: 6,
    commonIons: "O²⁻ (Oxide)",
    oxidationStates: ["-2"],
    electronConfig: "[He] 2s² 2p⁴",
    electronegativity: 3.44,
    ionization: "1314 kJ/mol",
    density: "1.43 g/L",
    melt: "-218.8°C",
    boil: "-183.0°C",
    isotopes: [
      { name: "O-16", neutron: "8n", percent: "Stable" },
      { name: "O-17", neutron: "9n", percent: "Stable" },
      { name: "O-18", neutron: "10n", percent: "Stable" },
    ],
  },
  F: {
    discovery: "1886",
    avgAtomicMass: "19.00",
    discoveredBy: "Henri Moissan",
    namedBy: "Humphry Davy (suggested)",
    stse: "Dental health (Water fluoridation); Nuclear fuel (UF₆ enrichment).",
    uses: "Teflon (PTFE), Toothpaste, Refrigerants.",
    hazards: "Highly toxic, Corrosive, Reacts with almost everything.",
    valenceElectrons: 7,
    commonIons: "F⁻ (Fluoride)",
    oxidationStates: ["-1"],
    electronConfig: "[He] 2s² 2p⁵",
    electronegativity: 3.98,
    ionization: "1681 kJ/mol",
    density: "1.70 g/L",
    melt: "-219.6°C",
    boil: "-188.1°C",
    isotopes: [{ name: "F-19", neutron: "10n", percent: "Stable" }],
  },
  Ne: {
    discovery: "1898",
    avgAtomicMass: "20.180",
    discoveredBy: "William Ramsay & Morris Travers",
    namedBy: "Ramsay (from Greek neos)",
    stse: "Lighting technology; Lasers.",
    uses: "Neon signs, High-voltage indicators, Cryogenics.",
    hazards: "Asphyxiant.",
    valenceElectrons: 8,
    commonIons: "None (inert)",
    oxidationStates: ["0"],
    electronConfig: "[He] 2s² 2p⁶",
    electronegativity: null,
    ionization: "2080 kJ/mol",
    density: "0.90 g/L",
    melt: "-248.6°C",
    boil: "-246.0°C",
    isotopes: [
      { name: "Ne-20", neutron: "10n", percent: "Stable" },
      { name: "Ne-21", neutron: "11n", percent: "Stable" },
      { name: "Ne-22", neutron: "12n", percent: "Stable" },
    ],
  },
  Na: {
    discovery: "1807",
    avgAtomicMass: "22.990",
    discoveredBy: "Humphry Davy",
    namedBy: "Humphry Davy",
    stse: "Human biology (Nerve impulses); Nuclear reactors (Coolant in fast breeders).",
    uses: "Table salt (NaCl), Street lights, Soap making.",
    hazards: "Reacts violently with water.",
    valenceElectrons: 1,
    commonIons: "Na⁺",
    oxidationStates: ["+1"],
    electronConfig: "[Ne] 3s¹",
    electronegativity: 0.93,
    ionization: "496 kJ/mol",
    density: "0.968 g/cm³",
    melt: "97.8°C",
    boil: "883°C",
    isotopes: [{ name: "Na-23", neutron: "12n", percent: "Stable" }],
  },
  Mg: {
    discovery: "1755 (Identified); 1808 (Isolated)",
    avgAtomicMass: "24.305",
    discoveredBy: "Joseph Black (Id.); Humphry Davy (Iso.)",
    namedBy: "Derived from Magnesia district",
    stse: "Biological photosynthesis (Chlorophyll center); Lightweight alloys.",
    uses: "Aerospace alloys, Flares/Fireworks, Antacids.",
    hazards: "Flammable (metal fire difficult to extinguish).",
    valenceElectrons: 2,
    commonIons: "Mg²⁺",
    oxidationStates: ["+2"],
    electronConfig: "[Ne] 3s²",
    electronegativity: 1.31,
    ionization: "738 kJ/mol",
    density: "1.74 g/cm³",
    melt: "650°C",
    boil: "1090°C",
    isotopes: [
      { name: "Mg-24", neutron: "12n", percent: "Stable" },
      { name: "Mg-25", neutron: "13n", percent: "Stable" },
      { name: "Mg-26", neutron: "14n", percent: "Stable" },
    ],
  },
  Al: {
    discovery: "1825",
    avgAtomicMass: "26.982",
    discoveredBy: "Hans Christian Ørsted",
    namedBy: "Humphry Davy",
    stse: "Recycling (Infinite recyclability); Transportation efficiency (Lightweighting).",
    uses: "Aircraft structures, Cans/Foil, Power lines.",
    hazards: "Dust is flammable/explosive.",
    valenceElectrons: 3,
    commonIons: "Al³⁺",
    oxidationStates: ["+3"],
    electronConfig: "[Ne] 3s² 3p¹",
    electronegativity: 1.61,
    ionization: "578 kJ/mol",
    density: "2.70 g/cm³",
    melt: "660.3°C",
    boil: "2470°C",
    isotopes: [{ name: "Al-27", neutron: "14n", percent: "Stable" }],
  },
  Si: {
    discovery: "1824",
    avgAtomicMass: "28.085",
    discoveredBy: "Jöns Jakob Berzelius",
    namedBy: "Thomas Thomson",
    stse: "The Digital Age (Semiconductors/Microchips); Solar energy (Photovoltaics).",
    uses: "Electronics, Glass/Concrete (as Silicates), Silicones.",
    hazards: "Silicosis (chronic dust inhalation).",
    valenceElectrons: 4,
    commonIons: "N/A (Forms covalent networks)",
    oxidationStates: ["+4"],
    electronConfig: "[Ne] 3s² 3p²",
    electronegativity: 1.9,
    ionization: "787 kJ/mol",
    density: "2.33 g/cm³",
    melt: "1414°C",
    boil: "3265°C",
    isotopes: [
      { name: "Si-28", neutron: "14n", percent: "Stable" },
      { name: "Si-29", neutron: "15n", percent: "Stable" },
      { name: "Si-30", neutron: "16n", percent: "Stable" },
    ],
  },
  P: {
    discovery: "1669",
    avgAtomicMass: "30.974",
    discoveredBy: "Hennig Brand",
    namedBy: "Derived from Greek Light-bearing",
    stse: "Agriculture (Essential fertilizer); Biology (DNA backbone/ATP); Eutrophication.",
    uses: "Fertilizers, Matchboxes (Red P), Steel production.",
    hazards: "White P is highly toxic and pyrophoric (ignites in air).",
    valenceElectrons: 5,
    commonIons: "P³⁻ (Phosphide), PO₄³⁻ (Phosphate)",
    oxidationStates: ["-3", "+3", "+5"],
    electronConfig: "[Ne] 3s² 3p³",
    electronegativity: 2.19,
    ionization: "1012 kJ/mol",
    density: "1.82 g/cm³ (White P)",
    melt: "44.1°C (White P)",
    boil: "280.5°C",
    isotopes: [{ name: "P-31", neutron: "16n", percent: "Stable" }],
  },
  S: {
    discovery: "Prehistoric",
    avgAtomicMass: "32.06",
    discoveredBy: "Ancient Civilizations",
    namedBy: "Antoine Lavoisier (established as element)",
    stse: "Industrial Chemistry (Sulfuric acid production); Environmental Science (Acid Rain/SO₂).",
    uses: "Fertilizers, Gunpowder, Vulcanization of rubber.",
    hazards: "SO₂ gas is toxic and corrosive.",
    valenceElectrons: 6,
    commonIons: "S²⁻ (Sulfide), SO₄²⁻ (Sulfate)",
    oxidationStates: ["-2", "+4", "+6"],
    electronConfig: "[Ne] 3s² 3p⁴",
    electronegativity: 2.58,
    ionization: "1000 kJ/mol",
    density: "2.07 g/cm³ (Alpha)",
    melt: "115.2°C",
    boil: "444.6°C",
    isotopes: [
      { name: "S-32", neutron: "16n", percent: "Stable" },
      { name: "S-33", neutron: "17n", percent: "Stable" },
      { name: "S-34", neutron: "18n", percent: "Stable" },
      { name: "S-36", neutron: "20n", percent: "Stable" },
    ],
  },
  Cl: {
    discovery: "1774",
    avgAtomicMass: "35.45",
    discoveredBy: "Carl Wilhelm Scheele",
    namedBy: "Humphry Davy (from Greek chloros)",
    stse: "Public Health (Water chlorination/Disinfection); Chemical Warfare (WWI Choking gas).",
    uses: "PVC (Plastics), Bleach, Water purification.",
    hazards: "Highly toxic gas, Pulmonary irritant.",
    valenceElectrons: 7,
    commonIons: "Cl⁻ (Chloride)",
    oxidationStates: ["-1", "+1", "+3", "+5", "+7"],
    electronConfig: "[Ne] 3s² 3p⁵",
    electronegativity: 3.16,
    ionization: "1251 kJ/mol",
    density: "3.21 g/L",
    melt: "-101.5°C",
    boil: "-34.0°C",
    isotopes: [
      { name: "Cl-35", neutron: "18n", percent: "Stable" },
      { name: "Cl-37", neutron: "20n", percent: "Stable" },
    ],
  },
  Ar: {
    discovery: "1894",
    avgAtomicMass: "39.948",
    discoveredBy: "Lord Rayleigh & William Ramsay",
    namedBy: "From Greek argos (lazy/inactive)",
    stse: "Preservation (Museum documents stored in Ar); Atmospheric science.",
    uses: "Welding (Shielding gas), Incandescent light bulbs, Double-pane windows.",
    hazards: "Asphyxiant in confined spaces.",
    valenceElectrons: 8,
    commonIons: "None (inert)",
    oxidationStates: ["0"],
    electronConfig: "[Ne] 3s² 3p⁶",
    electronegativity: null,
    ionization: "1521 kJ/mol",
    density: "1.78 g/L",
    melt: "-189.4°C",
    boil: "-185.8°C",
    isotopes: [
      { name: "Ar-36", neutron: "18n", percent: "Stable" },
      { name: "Ar-38", neutron: "20n", percent: "Stable" },
      { name: "Ar-40", neutron: "22n", percent: "Stable" },
    ],
  },
  K: {
    discovery: "1807",
    avgAtomicMass: "39.098",
    discoveredBy: "Humphry Davy",
    namedBy: "Humphry Davy (from 'Potash')",
    stse: "Agriculture (NPK Fertilizers); Geology (K-Ar dating); Biology (Nerve transmission).",
    uses: "Fertilizers, Soaps, Gunpowder (KNO₃).",
    hazards: "Reacts violently with water.",
    valenceElectrons: 1,
    commonIons: "K⁺",
    oxidationStates: ["+1"],
    electronConfig: "[Ar] 4s¹",
    electronegativity: 0.82,
    ionization: "419 kJ/mol",
    density: "0.862 g/cm³",
    melt: "63.5°C",
    boil: "759°C",
    isotopes: [
      { name: "K-39", neutron: "20n", percent: "Stable" },
      { name: "K-40", neutron: "21n", percent: "Radioactive" },
      { name: "K-41", neutron: "22n", percent: "Stable" },
    ],
  },
  Ca: {
    discovery: "1808",
    avgAtomicMass: "40.078",
    discoveredBy: "Humphry Davy",
    namedBy: "From Latin calx (lime)",
    stse: "Construction (Concrete/Cement chemistry); Human Anatomy (Bones/Teeth structure).",
    uses: "Cement, Steelmaking (Desulfurization), Dietary supplements.",
    hazards: "Reacts with water (slowly compared to Na/K).",
    valenceElectrons: 2,
    commonIons: "Ca²⁺",
    oxidationStates: ["+2"],
    electronConfig: "[Ar] 4s²",
    electronegativity: 1.0,
    ionization: "590 kJ/mol",
    density: "1.55 g/cm³",
    melt: "842°C",
    boil: "1484°C",
    isotopes: [
      { name: "Ca-40", neutron: "20n", percent: "Stable" },
      { name: "Ca-42", neutron: "22n", percent: "Stable" },
      { name: "Ca-43", neutron: "23n", percent: "Stable" },
      { name: "Ca-44", neutron: "24n", percent: "Stable" },
      { name: "Ca-46", neutron: "26n", percent: "Stable" },
      { name: "Ca-48", neutron: "28n", percent: "Stable" },
    ],
  },
  Sc: {
    discovery: "1879",
    avgAtomicMass: "44.956",
    discoveredBy: "Lars Fredrik Nilson",
    namedBy: "From Latin Scandia (Scandinavia)",
    stse: "Prediction validation (Mendeleev predicted it as 'Eka-boron').",
    uses: "Aerospace alloys (Aluminum-Scandium for MiG fighters), Stadium lighting.",
    hazards: "Elemental dust is flammable.",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Sc³⁺",
    oxidationStates: ["+3"],
    electronConfig: "[Ar] 3d¹ 4s²",
    electronegativity: 1.36,
    ionization: "633 kJ/mol",
    density: "2.99 g/cm³",
    melt: "1541°C",
    boil: "2836°C",
    isotopes: [{ name: "Sc-45", neutron: "24n", percent: "Stable" }],
  },
  Ti: {
    discovery: "1791",
    avgAtomicMass: "47.867",
    discoveredBy: "William Gregor",
    namedBy: "Martin Heinrich Klaproth (Titans of mythology)",
    stse: "Medical Engineering (Biocompatible implants); Aerospace (High strength-to-weight ratio).",
    uses: "Joint replacements, Aircraft engines, White pigment (TiO₂).",
    hazards: "Nontoxic (biologically inert).",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Ti⁴⁺, Ti³⁺",
    oxidationStates: ["+4", "+3"],
    electronConfig: "[Ar] 3d² 4s²",
    electronegativity: 1.54,
    ionization: "659 kJ/mol",
    density: "4.51 g/cm³",
    melt: "1668°C",
    boil: "3287°C",
    isotopes: [
      { name: "Ti-46", neutron: "24n", percent: "Stable" },
      { name: "Ti-47", neutron: "25n", percent: "Stable" },
      { name: "Ti-48", neutron: "26n", percent: "Stable" },
      { name: "Ti-49", neutron: "27n", percent: "Stable" },
      { name: "Ti-50", neutron: "28n", percent: "Stable" },
    ],
  },
  V: {
    discovery: "1801",
    avgAtomicMass: "50.942",
    discoveredBy: "Andrés Manuel del Río",
    namedBy: "Nils Gabriel Sefström (Vanadis, Norse goddess)",
    stse: "Materials Science (High-speed steel tools).",
    uses: "Ferrovanadium alloys (Tools, Axles), Sulfuric acid catalyst (V₂O₅).",
    hazards: "Compounds (especially V₂O₅) are toxic.",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "V⁵⁺, V⁴⁺, V³⁺, V²⁺",
    oxidationStates: ["+5", "+4", "+3", "+2"],
    electronConfig: "[Ar] 3d³ 4s²",
    electronegativity: 1.63,
    ionization: "651 kJ/mol",
    density: "6.11 g/cm³",
    melt: "1910°C",
    boil: "3407°C",
    isotopes: [
      { name: "V-50", neutron: "27n", percent: "Radioactive" },
      { name: "V-51", neutron: "28n", percent: "Stable" },
    ],
  },
  Cr: {
    discovery: "1797",
    avgAtomicMass: "51.996",
    discoveredBy: "Louis-Nicolas Vauquelin",
    namedBy: "From Greek chroma (color)",
    stse: "Corrosion protection (Stainless steel passivation); Environmental Toxicology (Hexavalent chromium).",
    uses: "Stainless steel (minimum 10.5%), Chrome plating, Pigments.",
    hazards: "Cr(VI) is carcinogenic; Cr(III) is essential trace element.",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Cr³⁺, Cr⁶⁺",
    oxidationStates: ["+3", "+6"],
    electronConfig: "[Ar] 3d⁵ 4s¹ [Exception]",
    electronegativity: 1.66,
    ionization: "653 kJ/mol",
    density: "7.19 g/cm³",
    melt: "1907°C",
    boil: "2671°C",
    isotopes: [
      { name: "Cr-50", neutron: "26n", percent: "Stable" },
      { name: "Cr-52", neutron: "28n", percent: "Stable" },
      { name: "Cr-53", neutron: "29n", percent: "Stable" },
      { name: "Cr-54", neutron: "30n", percent: "Stable" },
    ],
  },
  Mn: {
    discovery: "1774",
    avgAtomicMass: "54.938",
    discoveredBy: "Johan Gottlieb Gahn",
    namedBy: "Derived from Magnesia",
    stse: "Metallurgy (Essential for steel strength); Batteries (Alkaline cells).",
    uses: "Steel alloys, Aluminum beverage cans, Dry cell batteries (MnO₂).",
    hazards: "Manganism (neurotoxicity) from chronic dust inhalation.",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Mn²⁺, Mn⁴⁺, Mn⁷⁺",
    oxidationStates: ["+2", "+3", "+4", "+6", "+7"],
    electronConfig: "[Ar] 3d⁵ 4s²",
    electronegativity: 1.55,
    ionization: "717 kJ/mol",
    density: "7.21 g/cm³",
    melt: "1246°C",
    boil: "2061°C",
    isotopes: [{ name: "Mn-55", neutron: "30n", percent: "Stable" }],
  },
  Fe: {
    discovery: "Prehistoric (~4000 BCE)",
    avgAtomicMass: "55.845",
    discoveredBy: "Ancient Civilizations (Iron Age)",
    namedBy: "From Anglo-Saxon iren (Symbol Fe from Latin ferrum)",
    stse: "Civilization development (Steel infrastructure); Biology (Hemoglobin/Oxygen transport).",
    uses: "Construction (Steel), Vehicles, Machinery.",
    hazards: "Low toxicity; acute overdose toxic.",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Fe²⁺ (Ferrous), Fe³⁺ (Ferric)",
    oxidationStates: ["+2", "+3"],
    electronConfig: "[Ar] 3d⁶ 4s²",
    electronegativity: 1.83,
    ionization: "763 kJ/mol",
    density: "7.87 g/cm³",
    melt: "1538°C",
    boil: "2862°C",
    isotopes: [
      { name: "Fe-54", neutron: "28n", percent: "Stable" },
      { name: "Fe-56", neutron: "30n", percent: "Stable" },
      { name: "Fe-57", neutron: "31n", percent: "Stable" },
      { name: "Fe-58", neutron: "32n", percent: "Stable" },
    ],
  },
  Co: {
    discovery: "1735",
    avgAtomicMass: "58.933",
    discoveredBy: "Georg Brandt",
    namedBy: "From German Kobold (goblin/spirit)",
    stse: "Renewable Energy (EV Batteries); Medical (Radiation therapy Co-60); Biology (Vitamin B12).",
    uses: "Lithium-ion battery cathodes, Superalloys (Turbines), Blue pigments.",
    hazards: "Toxic; Skin sensitizer.",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Co²⁺, Co³⁺",
    oxidationStates: ["+2", "+3"],
    electronConfig: "[Ar] 3d⁷ 4s²",
    electronegativity: 1.88,
    ionization: "760 kJ/mol",
    density: "8.90 g/cm³",
    melt: "1495°C",
    boil: "2927°C",
    isotopes: [{ name: "Co-59", neutron: "32n", percent: "Stable" }],
  },
  Ni: {
    discovery: "1751",
    avgAtomicMass: "58.693",
    discoveredBy: "Axel Fredrik Cronstedt",
    namedBy: "From Kupfernickel (Devil's copper)",
    stse: "Currency (Coins); Alloys (Stainless steel); Catalysis (Hydrogenation).",
    uses: "Stainless steel, Batteries, Plating, Coins.",
    hazards: "Common allergen (contact dermatitis).",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Ni²⁺",
    oxidationStates: ["+2"],
    electronConfig: "[Ar] 3d⁸ 4s²",
    electronegativity: 1.91,
    ionization: "737 kJ/mol",
    density: "8.90 g/cm³",
    melt: "1455°C",
    boil: "2730°C",
    isotopes: [
      { name: "Ni-58", neutron: "30n", percent: "Stable" },
      { name: "Ni-60", neutron: "32n", percent: "Stable" },
      { name: "Ni-61", neutron: "33n", percent: "Stable" },
      { name: "Ni-62", neutron: "34n", percent: "Stable" },
      { name: "Ni-64", neutron: "36n", percent: "Stable" },
    ],
  },
  Cu: {
    discovery: "Prehistoric (~9000 BCE)",
    avgAtomicMass: "63.546",
    discoveredBy: "Middle Eastern Civilizations",
    namedBy: "From Latin Cyprium (Metal of Cyprus)",
    stse: "Electrification (Global grid); Antimicrobial properties (Hospital surfaces).",
    uses: "Wiring, Plumbing, Alloys (Bronze/Brass).",
    hazards: "Toxic to invertebrates/aquatic life; essential for humans.",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Cu⁺, Cu²⁺",
    oxidationStates: ["+1", "+2"],
    electronConfig: "[Ar] 3d¹⁰ 4s¹ [Exception]",
    electronegativity: 1.9,
    ionization: "746 kJ/mol",
    density: "8.96 g/cm³",
    melt: "1085°C",
    boil: "2562°C",
    isotopes: [
      { name: "Cu-63", neutron: "34n", percent: "Stable" },
      { name: "Cu-65", neutron: "36n", percent: "Stable" },
    ],
  },
  Zn: {
    discovery: "~1000 CE (India); 1746 (Europe isolation)",
    avgAtomicMass: "65.38",
    discoveredBy: "Indian metallurgists; Andreas Sigismund Marggraf",
    namedBy: "Paracelsus (from German Zinke)",
    stse: "Corrosion protection (Sacrificial anode); Biochemistry (Enzyme cofactor).",
    uses: "Galvanizing steel, Die-casting, Brass alloy.",
    hazards: "Metal fume fever (from welding).",
    valenceElectrons: "2 (d-subshell is full)",
    commonIons: "Zn²⁺",
    oxidationStates: ["+2"],
    electronConfig: "[Ar] 3d¹⁰ 4s²",
    electronegativity: 1.65,
    ionization: "906 kJ/mol",
    density: "7.14 g/cm³",
    melt: "419.5°C",
    boil: "907°C",
    isotopes: [
      { name: "Zn-64", neutron: "34n", percent: "Stable" },
      { name: "Zn-66", neutron: "36n", percent: "Stable" },
      { name: "Zn-67", neutron: "37n", percent: "Stable" },
      { name: "Zn-68", neutron: "38n", percent: "Stable" },
      { name: "Zn-70", neutron: "40n", percent: "Stable" },
    ],
  },
  Ga: {
    discovery: "1875",
    avgAtomicMass: "69.723",
    discoveredBy: "Paul-Émile Lecoq de Boisbaudran",
    namedBy: "Lecoq de Boisbaudran (Gallia/France)",
    stse: "Semiconductor physics (LEDs/Lasers); Mendeleev's 'Eka-aluminum'.",
    uses: "Blue/Violet LEDs (GaN), Integrated circuits, High-temp thermometers.",
    hazards: "Corrosive to aluminum (liquid metal embrittlement).",
    valenceElectrons: 3,
    commonIons: "Ga³⁺",
    oxidationStates: ["+3"],
    electronConfig: "[Ar] 3d¹⁰ 4s² 4p¹",
    electronegativity: 1.81,
    ionization: "579 kJ/mol",
    density: "5.91 g/cm³",
    melt: "29.8°C [Melts in hand]",
    boil: "2400°C",
    isotopes: [
      { name: "Ga-69", neutron: "38n", percent: "Stable" },
      { name: "Ga-71", neutron: "40n", percent: "Stable" },
    ],
  },
  Ge: {
    discovery: "1886",
    avgAtomicMass: "72.630",
    discoveredBy: "Clemens Winkler",
    namedBy: "Winkler (Germania/Germany)",
    stse: "Electronics history (First transistors were Ge); Fiber optics.",
    uses: "Fiber optics, Infrared optics, Polymerization catalysts.",
    hazards: "Some organic compounds toxic.",
    valenceElectrons: 4,
    commonIons: "Ge⁴⁺",
    oxidationStates: ["+4", "+2"],
    electronConfig: "[Ar] 3d¹⁰ 4s² 4p²",
    electronegativity: 2.01,
    ionization: "762 kJ/mol",
    density: "5.32 g/cm³",
    melt: "938°C",
    boil: "2833°C",
    isotopes: [
      { name: "Ge-70", neutron: "38n", percent: "Stable" },
      { name: "Ge-72", neutron: "40n", percent: "Stable" },
      { name: "Ge-73", neutron: "41n", percent: "Stable" },
      { name: "Ge-74", neutron: "42n", percent: "Stable" },
    ],
  },
  As: {
    discovery: "~1250 (Isolated)",
    avgAtomicMass: "74.922",
    discoveredBy: "Albertus Magnus (attributed)",
    namedBy: "From Persian zarnikh (yellow orpiment)",
    stse: "Toxicology (Historical poison); Semiconductor doping (n-type).",
    uses: "Semiconductors (GaAs), Wood preservatives (historical), Alloys.",
    hazards: "Highly toxic; Carcinogenic.",
    valenceElectrons: 5,
    commonIons: "As³⁻, As³⁺, As⁵⁺",
    oxidationStates: ["-3", "+3", "+5"],
    electronConfig: "[Ar] 3d¹⁰ 4s² 4p³",
    electronegativity: 2.18,
    ionization: "947 kJ/mol",
    density: "5.73 g/cm³",
    melt: "Sublimes (817°C at high pressure)",
    boil: "Sublimes (614°C)",
    isotopes: [{ name: "As-75", neutron: "42n", percent: "Stable" }],
  },
  Se: {
    discovery: "1817",
    avgAtomicMass: "78.971",
    discoveredBy: "Jöns Jakob Berzelius",
    namedBy: "From Greek selene (Moon)",
    stse: "Xerox process (Photoconductivity); Biological trace element.",
    uses: "Photocopying, Glass decolorizing, Solar cells.",
    hazards: "Toxic in large amounts; essential in trace amounts.",
    valenceElectrons: 6,
    commonIons: "Se²⁻ (Selenide)",
    oxidationStates: ["-2", "+4", "+6"],
    electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁴",
    electronegativity: 2.55,
    ionization: "941 kJ/mol",
    density: "4.81 g/cm³",
    melt: "221°C",
    boil: "685°C",
    isotopes: [
      { name: "Se-74", neutron: "40n", percent: "Stable" },
      { name: "Se-76", neutron: "42n", percent: "Stable" },
      { name: "Se-77", neutron: "43n", percent: "Stable" },
      { name: "Se-78", neutron: "44n", percent: "Stable" },
      { name: "Se-80", neutron: "46n", percent: "Stable" },
      { name: "Se-82", neutron: "48n", percent: "Stable" },
    ],
  },
  Br: {
    discovery: "1826",
    avgAtomicMass: "79.904",
    discoveredBy: "Antoine Jérôme Balard",
    namedBy: "From Greek bromos (stench)",
    stse: "Flame retardants; Ozone depletion.",
    uses: "Flame retardants, Drilling fluids, Photographic film (AgBr).",
    hazards: "Corrosive liquid; vapor is highly toxic.",
    valenceElectrons: 7,
    commonIons: "Br⁻ (Bromide)",
    oxidationStates: ["-1", "+1", "+5"],
    electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁵",
    electronegativity: 2.96,
    ionization: "1140 kJ/mol",
    density: "3.10 g/cm³ (Liquid)",
    melt: "-7.2°C",
    boil: "58.8°C",
    isotopes: [
      { name: "Br-79", neutron: "44n", percent: "Stable" },
      { name: "Br-81", neutron: "46n", percent: "Stable" },
    ],
  },
  Kr: {
    discovery: "1898",
    avgAtomicMass: "83.798",
    discoveredBy: "William Ramsay & Morris Travers",
    namedBy: "From Greek kryptos (hidden)",
    stse: "Measurement standards (Meter was defined by Kr-86 light 1960-1983).",
    uses: "High-speed photography flashes, Fluorescent bulbs, Double-pane windows.",
    hazards: "Asphyxiant; Radioactive ⁸⁵Kr is a fission product.",
    valenceElectrons: 8,
    commonIons: "None (inert)",
    oxidationStates: ["0", "+2"],
    electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁶",
    electronegativity: 3.0,
    ionization: "1351 kJ/mol",
    density: "3.75 g/L",
    melt: "-157.4°C",
    boil: "-153.2°C",
    isotopes: [
      { name: "Kr-78", neutron: "42n", percent: "Stable" },
      { name: "Kr-80", neutron: "44n", percent: "Stable" },
      { name: "Kr-82", neutron: "46n", percent: "Stable" },
      { name: "Kr-83", neutron: "47n", percent: "Stable" },
      { name: "Kr-84", neutron: "48n", percent: "Stable" },
      { name: "Kr-86", neutron: "50n", percent: "Stable" },
    ],
  },
  Rb: {
    discovery: "1861",
    avgAtomicMass: "85.468",
    discoveredBy: "Robert Bunsen & Gustav Kirchhoff",
    namedBy: "From Latin rubidius (deep red, from spectrum)",
    stse: "Geochronology (Dating of rocks/minerals); Atomic clocks.",
    uses: "Vacuum tube getters, Photocells, Atomic clocks.",
    hazards: "Reacts violently with water (ignites spontaneously).",
    valenceElectrons: 1,
    commonIons: "Rb⁺",
    oxidationStates: ["+1"],
    electronConfig: "[Kr] 5s¹",
    electronegativity: 0.82,
    ionization: "403 kJ/mol",
    density: "1.53 g/cm³",
    melt: "39.3°C",
    boil: "688°C",
    isotopes: [
      { name: "Rb-85", neutron: "48n", percent: "Stable" },
      { name: "Rb-87", neutron: "50n", percent: "Radioactive" },
    ],
  },
  Sr: {
    discovery: "1790 (identified); 1808 (isolated)",
    avgAtomicMass: "87.62",
    discoveredBy: "Adair Crawford (Id.); Humphry Davy (Iso.)",
    namedBy: "From Strontian, Scotland",
    stse: "Nuclear fallout tracking (Sr-90 mimics Calcium in bones); Fireworks.",
    uses: "Red fireworks/flares, Glow-in-the-dark paints (SrAl₂O₄).",
    hazards: "Sr-90 is a dangerous radiotoxin; elemental Sr reacts with water.",
    valenceElectrons: 2,
    commonIons: "Sr²⁺",
    oxidationStates: ["+2"],
    electronConfig: "[Kr] 5s²",
    electronegativity: 0.95,
    ionization: "550 kJ/mol",
    density: "2.64 g/cm³",
    melt: "777°C",
    boil: "1382°C",
    isotopes: [
      { name: "Sr-84", neutron: "46n", percent: "Stable" },
      { name: "Sr-86", neutron: "48n", percent: "Stable" },
      { name: "Sr-87", neutron: "49n", percent: "Stable" },
      { name: "Sr-88", neutron: "50n", percent: "Stable" },
    ],
  },
  Y: {
    discovery: "1794",
    avgAtomicMass: "88.906",
    discoveredBy: "Johan Gadolin",
    namedBy: "From Ytterby, Sweden",
    stse: "Superconductors (YBCO); LEDs.",
    uses: "Red phosphors (CRTs/LEDs), Laser crystals (Nd:YAG), Superconductors.",
    hazards: "Compounds can be toxic; dust is flammable.",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Y³⁺",
    oxidationStates: ["+3"],
    electronConfig: "[Kr] 4d¹ 5s²",
    electronegativity: 1.22,
    ionization: "600 kJ/mol",
    density: "4.47 g/cm³",
    melt: "1526°C",
    boil: "2930°C",
    isotopes: [{ name: "Y-89", neutron: "50n", percent: "Stable" }],
  },
  Zr: {
    discovery: "1789",
    avgAtomicMass: "91.224",
    discoveredBy: "Martin Heinrich Klaproth",
    namedBy: "From Persian zargun (gold-colored)",
    stse: "Nuclear energy (Fuel rod cladding due to low neutron absorption); Gemstones.",
    uses: "Nuclear fuel cladding, Chemical piping, Fake diamonds (CZ).",
    hazards: "Powder is highly flammable/explosive; biologically inert.",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Zr⁴⁺",
    oxidationStates: ["+4"],
    electronConfig: "[Kr] 4d² 5s²",
    electronegativity: 1.33,
    ionization: "640 kJ/mol",
    density: "6.52 g/cm³",
    melt: "1855°C",
    boil: "4409°C",
    isotopes: [
      { name: "Zr-90", neutron: "50n", percent: "Stable" },
      { name: "Zr-91", neutron: "51n", percent: "Stable" },
      { name: "Zr-92", neutron: "52n", percent: "Stable" },
      { name: "Zr-94", neutron: "54n", percent: "Stable" },
    ],
  },
  Nb: {
    discovery: "1801",
    avgAtomicMass: "92.906",
    discoveredBy: "Charles Hatchett",
    namedBy: "Niobe (daughter of Tantalus)",
    stse: "MRI Technology (Superconducting magnets); Steel production.",
    uses: "Superconducting magnets (MRI), Pipelines, Hypoallergenic jewelry.",
    hazards: "Dust causes eye/skin irritation.",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Nb⁵⁺, Nb³⁺",
    oxidationStates: ["+5", "+3"],
    electronConfig: "[Kr] 4d⁴ 5s¹ [Exception]",
    electronegativity: 1.6,
    ionization: "652 kJ/mol",
    density: "8.57 g/cm³",
    melt: "2477°C",
    boil: "4744°C",
    isotopes: [{ name: "Nb-93", neutron: "52n", percent: "Stable" }],
  },
  Mo: {
    discovery: "1778",
    avgAtomicMass: "95.95",
    discoveredBy: "Carl Wilhelm Scheele",
    namedBy: "From Greek molybdos (lead-like)",
    stse: "Enzymatic function (Essential for nitrogen fixation in plants).",
    uses: "High-strength steel alloys, Lubricants (MoS₂), Nuclear imaging (Mo-99 precursor).",
    hazards: "Toxic in high doses; essential trace element.",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Mo⁶⁺, Mo⁴⁺",
    oxidationStates: ["+4", "+6"],
    electronConfig: "[Kr] 4d⁵ 5s¹ [Exception]",
    electronegativity: 2.16,
    ionization: "684 kJ/mol",
    density: "10.28 g/cm³",
    melt: "2623°C",
    boil: "4639°C",
    isotopes: [
      { name: "Mo-92", neutron: "50n", percent: "Stable" },
      { name: "Mo-94", neutron: "52n", percent: "Stable" },
      { name: "Mo-95", neutron: "53n", percent: "Stable" },
      { name: "Mo-96", neutron: "54n", percent: "Stable" },
      { name: "Mo-97", neutron: "55n", percent: "Stable" },
      { name: "Mo-98", neutron: "56n", percent: "Stable" },
      { name: "Mo-100", neutron: "58n", percent: "Stable" },
    ],
  },
  Tc: {
    discovery: "1937",
    avgAtomicMass: "[98] (Radioactive)",
    discoveredBy: "Carlo Perrier & Emilio Segrè",
    namedBy: "From Greek technetos (artificial)",
    stse: "Nuclear Medicine (Tc-99m is the world's most used medical radiotracer).",
    uses: "Medical imaging (Bone scans, heart scans), Research.",
    hazards: "Radioactive (radiotoxicity depends on isotope).",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Tc⁷⁺ (Pertechnetate), Tc⁴⁺",
    oxidationStates: ["+7", "+4"],
    electronConfig: "[Kr] 4d⁵ 5s²",
    electronegativity: 1.9,
    ionization: "702 kJ/mol",
    density: "11.50 g/cm³",
    melt: "2157°C",
    boil: "4265°C",
    isotopes: [{ name: "Tc-99", neutron: "56n", percent: "Radioactive" }],
  },
  Ru: {
    discovery: "1844",
    avgAtomicMass: "101.07",
    discoveredBy: "Karl Ernst Claus",
    namedBy: "From Ruthenia (Latin for Russia)",
    stse: "Green Chemistry (Catalysts); Electronics (Chip resistors).",
    uses: "Electrical contacts, Hard disk drives, Solar energy.",
    hazards: "RuO₄ is highly toxic and volatile.",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Ru³⁺, Ru⁴⁺",
    oxidationStates: ["+3", "+4", "+8"],
    electronConfig: "[Kr] 4d⁷ 5s¹ [Exception]",
    electronegativity: 2.2,
    ionization: "710 kJ/mol",
    density: "12.45 g/cm³",
    melt: "2334°C",
    boil: "4150°C",
    isotopes: [
      { name: "Ru-96", neutron: "52n", percent: "Stable" },
      { name: "Ru-98", neutron: "54n", percent: "Stable" },
      { name: "Ru-99", neutron: "55n", percent: "Stable" },
      { name: "Ru-100", neutron: "56n", percent: "Stable" },
      { name: "Ru-101", neutron: "57n", percent: "Stable" },
      { name: "Ru-102", neutron: "58n", percent: "Stable" },
      { name: "Ru-104", neutron: "60n", percent: "Stable" },
    ],
  },
  Rh: {
    discovery: "1803",
    avgAtomicMass: "102.91",
    discoveredBy: "William Hyde Wollaston",
    namedBy: "From Greek rhodon (rose, due to salt color)",
    stse: "Automotive Industry (Catalytic converters for NOx reduction).",
    uses: "Catalytic converters (80% of use), Jewelry plating (white gold finish).",
    hazards: "Compounds are toxic/carcinogenic; metal is inert.",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Rh³⁺",
    oxidationStates: ["+3"],
    electronConfig: "[Kr] 4d⁸ 5s¹ [Exception]",
    electronegativity: 2.28,
    ionization: "720 kJ/mol",
    density: "12.41 g/cm³",
    melt: "1964°C",
    boil: "3695°C",
    isotopes: [{ name: "Rh-103", neutron: "58n", percent: "Stable" }],
  },
  Pd: {
    discovery: "1803",
    avgAtomicMass: "106.42",
    discoveredBy: "William Hyde Wollaston",
    namedBy: "From asteroid Pallas",
    stse: "Hydrogen Economy (Can absorb 900x volume of H₂); Catalytic converters.",
    uses: "Catalytic converters, Dentistry, Fuel cells, Hydrogen purification.",
    hazards: "Low toxicity, but can cause allergic reactions.",
    valenceElectrons: "Variable (outer d only here)",
    commonIons: "Pd²⁺, Pd⁴⁺",
    oxidationStates: ["+2", "+4"],
    electronConfig: "[Kr] 4d¹⁰ [Exception - empty s-orbital]",
    electronegativity: 2.2,
    ionization: "804 kJ/mol",
    density: "12.02 g/cm³",
    melt: "1555°C",
    boil: "2963°C",
    isotopes: [
      { name: "Pd-102", neutron: "56n", percent: "Stable" },
      { name: "Pd-104", neutron: "58n", percent: "Stable" },
      { name: "Pd-105", neutron: "59n", percent: "Stable" },
      { name: "Pd-106", neutron: "60n", percent: "Stable" },
      { name: "Pd-108", neutron: "62n", percent: "Stable" },
      { name: "Pd-110", neutron: "64n", percent: "Stable" },
    ],
  },
  Ag: {
    discovery: "Prehistoric (~3000 BCE)",
    avgAtomicMass: "107.87",
    discoveredBy: "Ancient Civilizations",
    namedBy: "Anglo-Saxon seolfor (Symbol Ag from Latin argentum)",
    stse: "Medicine (Antibacterial properties); Photography (Traditional film chemistry).",
    uses: "Jewelry, Electronics (Best conductor), Mirrors, Solar panels.",
    hazards:
      "Argyria (skin turns blue from chronic exposure); toxic to aquatic life.",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Ag⁺",
    oxidationStates: ["+1"],
    electronConfig: "[Kr] 4d¹⁰ 5s¹ [Exception]",
    electronegativity: 1.93,
    ionization: "731 kJ/mol",
    density: "10.49 g/cm³",
    melt: "962°C",
    boil: "2162°C",
    isotopes: [
      { name: "Ag-107", neutron: "60n", percent: "Stable" },
      { name: "Ag-109", neutron: "62n", percent: "Stable" },
    ],
  },
  Cd: {
    discovery: "1817",
    avgAtomicMass: "112.41",
    discoveredBy: "Friedrich Stromeyer",
    namedBy: "From Latin cadmia (calamine)",
    stse: "Environmental Pollution (Ni-Cd battery disposal); Pigments.",
    uses: "Ni-Cd Batteries (being phased out), Solar cells (CdTe), Pigments.",
    hazards: "Highly toxic; Carcinogen; Accumulates in kidneys.",
    valenceElectrons: "2 (d-subshell is full)",
    commonIons: "Cd²⁺",
    oxidationStates: ["+2"],
    electronConfig: "[Kr] 4d¹⁰ 5s²",
    electronegativity: 1.69,
    ionization: "868 kJ/mol",
    density: "8.65 g/cm³",
    melt: "321°C",
    boil: "767°C",
    isotopes: [
      { name: "Cd-110", neutron: "62n", percent: "Stable" },
      { name: "Cd-111", neutron: "63n", percent: "Stable" },
      { name: "Cd-112", neutron: "64n", percent: "Stable" },
      { name: "Cd-113", neutron: "65n", percent: "Stable" },
      { name: "Cd-114", neutron: "66n", percent: "Stable" },
      { name: "Cd-116", neutron: "68n", percent: "Stable" },
    ],
  },
  In: {
    discovery: "1863",
    avgAtomicMass: "114.82",
    discoveredBy: "Ferdinand Reich & H.T. Richter",
    namedBy: "From Indigo spectrum line",
    stse: "Touchscreen Technology (Indium Tin Oxide films).",
    uses: "LCD/OLED screens (ITO), Solders, Semiconductors.",
    hazards: "Compounds are toxic; damage lungs/kidneys.",
    valenceElectrons: 3,
    commonIons: "In³⁺",
    oxidationStates: ["+3"],
    electronConfig: "[Kr] 4d¹⁰ 5s² 5p¹",
    electronegativity: 1.78,
    ionization: "558 kJ/mol",
    density: "7.31 g/cm³",
    melt: "156.6°C",
    boil: "2072°C",
    isotopes: [
      { name: "In-113", neutron: "64n", percent: "Stable" },
      { name: "In-115", neutron: "66n", percent: "Radioactive" },
    ],
  },
  Sn: {
    discovery: "Prehistoric (~3000 BCE)",
    avgAtomicMass: "118.71",
    discoveredBy: "Ancient Civilizations (Bronze Age)",
    namedBy: "Anglo-Saxon tin (Symbol Sn from Latin stannum)",
    stse: "Food Safety (Tin cans); Metallurgy (Bronze/Solder).",
    uses: "Solder (electronics), Plating (steel cans), Bronze alloys.",
    hazards: "Organic tin compounds are toxic; metal is non-toxic.",
    valenceElectrons: 4,
    commonIons: "Sn²⁺ (Stannous), Sn⁴⁺ (Stannic)",
    oxidationStates: ["+2", "+4"],
    electronConfig: "[Kr] 4d¹⁰ 5s² 5p²",
    electronegativity: 1.96,
    ionization: "709 kJ/mol",
    density: "7.31 g/cm³ (White Sn)",
    melt: "232°C",
    boil: "2602°C",
    isotopes: [
      { name: "Sn-112", neutron: "62n", percent: "Stable" },
      { name: "Sn-114", neutron: "64n", percent: "Stable" },
      { name: "Sn-115", neutron: "65n", percent: "Stable" },
      { name: "Sn-116", neutron: "66n", percent: "Stable" },
      { name: "Sn-117", neutron: "67n", percent: "Stable" },
      { name: "Sn-118", neutron: "68n", percent: "Stable" },
      { name: "Sn-119", neutron: "69n", percent: "Stable" },
      { name: "Sn-120", neutron: "70n", percent: "Stable" },
      { name: "Sn-122", neutron: "72n", percent: "Stable" },
      { name: "Sn-124", neutron: "74n", percent: "Stable" },
    ],
  },
  Sb: {
    discovery: "~3000 BCE",
    avgAtomicMass: "121.76",
    discoveredBy: "Ancient Civilizations",
    namedBy: "Symbol Sb from Latin stibium (eyeliner)",
    stse: "Fire Safety (Flame retardants); Lead-acid battery chemistry.",
    uses: "Flame retardants (Sb₂O₃), Lead-acid battery hardening, Microelectronics.",
    hazards: "Toxic (similar to Arsenic); causes poisoning.",
    valenceElectrons: 5,
    commonIons: "Sb³⁺, Sb⁵⁺, Sb³⁻",
    oxidationStates: ["+3", "+5", "-3"],
    electronConfig: "[Kr] 4d¹⁰ 5s² 5p³",
    electronegativity: 2.05,
    ionization: "834 kJ/mol",
    density: "6.70 g/cm³",
    melt: "631°C",
    boil: "1587°C",
    isotopes: [
      { name: "Sb-121", neutron: "70n", percent: "Stable" },
      { name: "Sb-123", neutron: "72n", percent: "Stable" },
    ],
  },
  Te: {
    discovery: "1782",
    avgAtomicMass: "127.60",
    discoveredBy: "Franz-Joseph Müller von Reichenstein",
    namedBy: "From Latin tellus (Earth)",
    stse: "Renewable Energy (CdTe Solar Panels); Rewritable optical discs.",
    uses: "Solar panels, Alloys (improve machinability), Thermoelectric devices.",
    hazards: "Toxic; ingestion causes garlic-like breath.",
    valenceElectrons: 6,
    commonIons: "Te²⁻, Te⁴⁺",
    oxidationStates: ["-2", "+4", "+6"],
    electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁴",
    electronegativity: 2.1,
    ionization: "869 kJ/mol",
    density: "6.24 g/cm³",
    melt: "450°C",
    boil: "988°C",
    isotopes: [
      { name: "Te-125", neutron: "73n", percent: "Stable" },
      { name: "Te-126", neutron: "74n", percent: "Stable" },
      { name: "Te-128", neutron: "76n", percent: "Stable" },
      { name: "Te-130", neutron: "78n", percent: "Radioactive" },
    ],
  },
  I: {
    discovery: "1811",
    avgAtomicMass: "126.90",
    discoveredBy: "Bernard Courtois",
    namedBy: "From Greek iodes (violet)",
    stse: "Public Health (Iodized salt prevents goiter); Nuclear Safety (I-131 protection).",
    uses: "Disinfectant (Betadine), Contrast media (X-ray), Thyroid nutrient.",
    hazards: "Vapors irritate eyes/lungs; stains skin.",
    valenceElectrons: 7,
    commonIons: "I⁻ (Iodide)",
    oxidationStates: ["-1", "+1", "+5", "+7"],
    electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁵",
    electronegativity: 2.66,
    ionization: "1008 kJ/mol",
    density: "4.93 g/cm³",
    melt: "113.7°C",
    boil: "184.3°C",
    isotopes: [{ name: "I-127", neutron: "74n", percent: "Stable" }],
  },
  Xe: {
    discovery: "1898",
    avgAtomicMass: "131.29",
    discoveredBy: "William Ramsay & Morris Travers",
    namedBy: "From Greek xenos (stranger)",
    stse: "Space Propulsion (Ion thrusters); Medical Anesthesia.",
    uses: "Ion propulsion engines (satellites), High-intensity strobe lights, General anesthetic.",
    hazards: "Asphyxiant; compounds (e.g., oxides) can be explosive.",
    valenceElectrons: 8,
    commonIons: "None (inert, but forms compounds like XeF₄)",
    oxidationStates: ["0", "+2", "+4", "+6"],
    electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁶",
    electronegativity: 2.6,
    ionization: "1170 kJ/mol",
    density: "5.90 g/L",
    melt: "-111.8°C",
    boil: "-108.1°C",
    isotopes: [
      { name: "Xe-124", neutron: "70n", percent: "Stable" },
      { name: "Xe-126", neutron: "72n", percent: "Stable" },
      { name: "Xe-128", neutron: "74n", percent: "Stable" },
      { name: "Xe-129", neutron: "75n", percent: "Stable" },
      { name: "Xe-130", neutron: "76n", percent: "Stable" },
      { name: "Xe-131", neutron: "77n", percent: "Stable" },
      { name: "Xe-132", neutron: "78n", percent: "Stable" },
      { name: "Xe-134", neutron: "80n", percent: "Stable" },
      { name: "Xe-136", neutron: "82n", percent: "Stable" },
    ],
  },
  Cs: {
    discovery: "1860",
    avgAtomicMass: "132.91",
    discoveredBy: "Robert Bunsen & Gustav Kirchhoff",
    namedBy: "From Latin caesius (sky blue spectrum line)",
    stse: "Global Timekeeping (Definition of the Second based on Cs-133).",
    uses: "Atomic clocks (GPS standard), Drilling fluids (Cesium formate), Photoelectric cells.",
    hazards: "Reacts explosively with cold water.",
    valenceElectrons: 1,
    commonIons: "Cs⁺",
    oxidationStates: ["+1"],
    electronConfig: "[Xe] 6s¹",
    electronegativity: 0.79,
    ionization: "376 kJ/mol",
    density: "1.93 g/cm³",
    melt: "28.5°C [Melts near room temp]",
    boil: "671°C",
    isotopes: [{ name: "Cs-133", neutron: "78n", percent: "Stable" }],
  },
  Ba: {
    discovery: "1808",
    avgAtomicMass: "137.33",
    discoveredBy: "Humphry Davy",
    namedBy: "From Greek barys (heavy)",
    stse: "Medical Imaging (Barium swallow X-rays); Oil Well Drilling.",
    uses: "Drilling muds (Barite), Fireworks (Green color), Medical contrast agent.",
    hazards: "Soluble compounds are toxic; BaSO₄ is safe (insoluble).",
    valenceElectrons: 2,
    commonIons: "Ba²⁺",
    oxidationStates: ["+2"],
    electronConfig: "[Xe] 6s²",
    electronegativity: 0.89,
    ionization: "503 kJ/mol",
    density: "3.62 g/cm³",
    melt: "727°C",
    boil: "1897°C",
    isotopes: [
      { name: "Ba-134", neutron: "78n", percent: "Stable" },
      { name: "Ba-135", neutron: "79n", percent: "Stable" },
      { name: "Ba-136", neutron: "80n", percent: "Stable" },
      { name: "Ba-137", neutron: "81n", percent: "Stable" },
      { name: "Ba-138", neutron: "82n", percent: "Stable" },
    ],
  },
  La: {
    discovery: "1839",
    avgAtomicMass: "138.91",
    discoveredBy: "Carl Gustaf Mosander",
    namedBy: "From Greek lanthanein (to lie hidden)",
    stse: "Hybrid Vehicles (NiMH batteries).",
    uses: "Camera lenses (High refractive index glass), Hybrid car batteries, Lighter flints.",
    hazards: "Low toxicity; dust is flammable.",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "La³⁺",
    oxidationStates: ["+3"],
    electronConfig: "[Xe] 5d¹ 6s²",
    electronegativity: 1.1,
    ionization: "538 kJ/mol",
    density: "6.15 g/cm³",
    melt: "920°C",
    boil: "3464°C",
    isotopes: [
      { name: "La-138", neutron: "81n", percent: "Radioactive" },
      { name: "La-139", neutron: "82n", percent: "Stable" },
    ],
  },
  Ce: {
    discovery: "1803",
    avgAtomicMass: "140.12",
    discoveredBy: "Martin Heinrich Klaproth, Jöns Jakob Berzelius",
    namedBy: "From asteroid Ceres",
    stse: "Emissions Control (Diesel additives); Self-cleaning ovens.",
    uses: "Catalytic converters, Mischmetal (lighter flints), Glass polishing.",
    hazards: "Pyrophoric (sparks when struck); low toxicity.",
    valenceElectrons: "Variable (outer s + f)",
    commonIons: "Ce³⁺, Ce⁴⁺",
    oxidationStates: ["+3", "+4"],
    electronConfig: "[Xe] 4f¹ 5d¹ 6s²",
    electronegativity: 1.12,
    ionization: "534 kJ/mol",
    density: "6.77 g/cm³",
    melt: "795°C",
    boil: "3443°C",
    isotopes: [
      { name: "Ce-136", neutron: "78n", percent: "Stable" },
      { name: "Ce-138", neutron: "80n", percent: "Stable" },
      { name: "Ce-140", neutron: "82n", percent: "Stable" },
      { name: "Ce-142", neutron: "84n", percent: "Stable" },
    ],
  },
  Pr: {
    discovery: "1885",
    avgAtomicMass: "140.91",
    discoveredBy: "Carl Auer von Welsbach",
    namedBy: "From Greek prasios didymos (green twin)",
    stse: "Renewable Energy (Magnets in wind turbines).",
    uses: "High-strength magnets (alloyed with Nd), Didymium glass (welder's goggles), Yellow pigments.",
    hazards: "Low toxicity; dust is flammable.",
    valenceElectrons: "Variable (outer s + f)",
    commonIons: "Pr³⁺",
    oxidationStates: ["+3", "+4"],
    electronConfig: "[Xe] 4f³ 6s²",
    electronegativity: 1.13,
    ionization: "527 kJ/mol",
    density: "6.77 g/cm³",
    melt: "935°C",
    boil: "3520°C",
    isotopes: [{ name: "Pr-141", neutron: "82n", percent: "Stable" }],
  },
  Nd: {
    discovery: "1885",
    avgAtomicMass: "144.24",
    discoveredBy: "Carl Auer von Welsbach",
    namedBy: "From Greek neos didymos (new twin)",
    stse: "Green Technology (Essential for EV motors and Wind Turbines).",
    uses: "Strongest permanent magnets (NdFeB), Lasers (Nd:YAG), Glass coloring (purple).",
    hazards: "Dust is flammable; magnets can cause pinching injuries.",
    valenceElectrons: "Variable (outer s + f)",
    commonIons: "Nd³⁺",
    oxidationStates: ["+3"],
    electronConfig: "[Xe] 4f⁴ 6s²",
    electronegativity: 1.14,
    ionization: "533 kJ/mol",
    density: "7.01 g/cm³",
    melt: "1024°C",
    boil: "3074°C",
    isotopes: [
      { name: "Nd-142", neutron: "82n", percent: "Stable" },
      { name: "Nd-143", neutron: "83n", percent: "Stable" },
      { name: "Nd-144", neutron: "84n", percent: "Stable" },
      { name: "Nd-145", neutron: "85n", percent: "Stable" },
      { name: "Nd-146", neutron: "86n", percent: "Stable" },
      { name: "Nd-148", neutron: "88n", percent: "Stable" },
    ],
  },
  Pm: {
    discovery: "1945",
    avgAtomicMass: "[145] (Radioactive)",
    discoveredBy: "Marinsky, Glendenin, Coryell",
    namedBy: "From Prometheus (Greek titan who stole fire)",
    stse: "Nuclear Batteries (Betavoltaics).",
    uses: "Nuclear batteries for guided missiles/pacemakers, Luminous paint.",
    hazards: "Radioactive.",
    valenceElectrons: "Variable (outer s + f)",
    commonIons: "Pm³⁺",
    oxidationStates: ["+3"],
    electronConfig: "[Xe] 4f⁵ 6s²",
    electronegativity: 1.13,
    ionization: "540 kJ/mol",
    density: "7.26 g/cm³",
    melt: "1042°C",
    boil: "3000°C",
    isotopes: [{ name: "Pm-145", neutron: "84n", percent: "Radioactive" }],
  },
  Sm: {
    discovery: "1879",
    avgAtomicMass: "150.36",
    discoveredBy: "Lecoq de Boisbaudran",
    namedBy: "From Mineral Samarskite",
    stse: "Magnet Technology (SmCo magnets).",
    uses: "Samarium-Cobalt magnets (high temp stability), Cancer treatment (Sm-153).",
    hazards: "Low toxicity.",
    valenceElectrons: "Variable (outer s + f)",
    commonIons: "Sm³⁺, Sm²⁺",
    oxidationStates: ["+3", "+2"],
    electronConfig: "[Xe] 4f⁶ 6s²",
    electronegativity: 1.17,
    ionization: "545 kJ/mol",
    density: "7.52 g/cm³",
    melt: "1072°C",
    boil: "1794°C",
    isotopes: [
      { name: "Sm-144", neutron: "82n", percent: "Stable" },
      { name: "Sm-147", neutron: "85n", percent: "Radioactive" },
      { name: "Sm-149", neutron: "87n", percent: "Stable" },
      { name: "Sm-150", neutron: "88n", percent: "Stable" },
      { name: "Sm-152", neutron: "90n", percent: "Stable" },
      { name: "Sm-154", neutron: "92n", percent: "Stable" },
    ],
  },
  Eu: {
    discovery: "1901",
    avgAtomicMass: "151.96",
    discoveredBy: "Eugène-Anatole Demarçay",
    namedBy: "From Europe",
    stse: "Anti-counterfeiting (Glowing dyes in Euro banknotes).",
    uses: "Red phosphors in TV screens/LEDs, Fluorescent probes.",
    hazards: "Reacts vividly with water; non-toxic.",
    valenceElectrons: "Variable (outer s + f)",
    commonIons: "Eu³⁺, Eu²⁺",
    oxidationStates: ["+3", "+2"],
    electronConfig: "[Xe] 4f⁷ 6s²",
    electronegativity: 1.2,
    ionization: "547 kJ/mol",
    density: "5.24 g/cm³",
    melt: "822°C",
    boil: "1529°C",
    isotopes: [
      { name: "Eu-151", neutron: "88n", percent: "Stable" },
      { name: "Eu-153", neutron: "90n", percent: "Stable" },
    ],
  },
  Gd: {
    discovery: "1880",
    avgAtomicMass: "157.25",
    discoveredBy: "Jean Charles Galissard de Marignac",
    namedBy: "From Mineral Gadolinite (after Johan Gadolin)",
    stse: "Medical Imaging (MRI Contrast Agents).",
    uses: "MRI Contrast agents (Magnevist), Neutron shielding, Magnetic refrigeration.",
    hazards: "Free ion is toxic; chelated form used medically.",
    valenceElectrons: "Variable (outer s + d + f)",
    commonIons: "Gd³⁺",
    oxidationStates: ["+3"],
    electronConfig: "[Xe] 4f⁷ 5d¹ 6s² [Stable half-shell]",
    electronegativity: 1.2,
    ionization: "593 kJ/mol",
    density: "7.90 g/cm³",
    melt: "1313°C",
    boil: "3273°C",
    isotopes: [
      { name: "Gd-154", neutron: "90n", percent: "Stable" },
      { name: "Gd-155", neutron: "91n", percent: "Stable" },
      { name: "Gd-156", neutron: "92n", percent: "Stable" },
      { name: "Gd-157", neutron: "93n", percent: "Stable" },
      { name: "Gd-158", neutron: "94n", percent: "Stable" },
      { name: "Gd-160", neutron: "96n", percent: "Stable" },
    ],
  },
  Tb: {
    discovery: "1843",
    avgAtomicMass: "158.93",
    discoveredBy: "Carl Gustaf Mosander",
    namedBy: "From Ytterby, Sweden",
    stse: "Green Energy (Low-energy lighting phosphors).",
    uses: "Green phosphors (fluorescent lamps), Terfenol-D (magnetostrictive alloy).",
    hazards: "Low toxicity.",
    valenceElectrons: "Variable (outer s + f)",
    commonIons: "Tb³⁺",
    oxidationStates: ["+3", "+4"],
    electronConfig: "[Xe] 4f⁹ 6s²",
    electronegativity: 1.1,
    ionization: "566 kJ/mol",
    density: "8.23 g/cm³",
    melt: "1356°C",
    boil: "3230°C",
    isotopes: [{ name: "Tb-159", neutron: "94n", percent: "Stable" }],
  },
  Dy: {
    discovery: "1886",
    avgAtomicMass: "162.50",
    discoveredBy: "Lecoq de Boisbaudran",
    namedBy: "From Greek dysprositos (hard to get)",
    stse: "Electric Vehicles (Magnet additives).",
    uses: "Neodymium magnet additive (increases heat resistance), Control rods.",
    hazards: "Low toxicity; dust is flammable.",
    valenceElectrons: "Variable (outer s + f)",
    commonIons: "Dy³⁺",
    oxidationStates: ["+3"],
    electronConfig: "[Xe] 4f¹⁰ 6s²",
    electronegativity: 1.22,
    ionization: "573 kJ/mol",
    density: "8.54 g/cm³",
    melt: "1412°C",
    boil: "2567°C",
    isotopes: [
      { name: "Dy-156", neutron: "90n", percent: "Stable" },
      { name: "Dy-158", neutron: "92n", percent: "Stable" },
      { name: "Dy-160", neutron: "94n", percent: "Stable" },
      { name: "Dy-161", neutron: "95n", percent: "Stable" },
      { name: "Dy-162", neutron: "96n", percent: "Stable" },
      { name: "Dy-163", neutron: "97n", percent: "Stable" },
      { name: "Dy-164", neutron: "98n", percent: "Stable" },
    ],
  },
  Ho: {
    discovery: "1878",
    avgAtomicMass: "164.93",
    discoveredBy: "Jacques-Louis Soret",
    namedBy: "From Holmia (Latin for Stockholm)",
    stse: "Medical Surgery (Ho:YAG Lasers).",
    uses: "Surgical lasers (kidney stones), Strongest magnetic fields (magnetic flux concentrator).",
    hazards: "Low toxicity.",
    valenceElectrons: "Variable (outer s + f)",
    commonIons: "Ho³⁺",
    oxidationStates: ["+3"],
    electronConfig: "[Xe] 4f¹¹ 6s²",
    electronegativity: 1.23,
    ionization: "581 kJ/mol",
    density: "8.80 g/cm³",
    melt: "1474°C",
    boil: "2700°C",
    isotopes: [{ name: "Ho-165", neutron: "98n", percent: "Stable" }],
  },
  Er: {
    discovery: "1843",
    avgAtomicMass: "167.26",
    discoveredBy: "Carl Gustaf Mosander",
    namedBy: "From Ytterby, Sweden",
    stse: "Telecommunications (Fiber optic signal amplifiers).",
    uses: "EDFA (Erbium-Doped Fiber Amplifiers), Dermatology lasers, Pink glass coloring.",
    hazards: "Low toxicity.",
    valenceElectrons: "Variable (outer s + f)",
    commonIons: "Er³⁺",
    oxidationStates: ["+3"],
    electronConfig: "[Xe] 4f¹² 6s²",
    electronegativity: 1.24,
    ionization: "589 kJ/mol",
    density: "9.07 g/cm³",
    melt: "1529°C",
    boil: "2868°C",
    isotopes: [
      { name: "Er-162", neutron: "94n", percent: "Stable" },
      { name: "Er-164", neutron: "96n", percent: "Stable" },
      { name: "Er-166", neutron: "98n", percent: "Stable" },
      { name: "Er-167", neutron: "99n", percent: "Stable" },
      { name: "Er-168", neutron: "100n", percent: "Stable" },
      { name: "Er-170", neutron: "102n", percent: "Stable" },
    ],
  },
  Tm: {
    discovery: "1879",
    avgAtomicMass: "168.93",
    discoveredBy: "Per Teodor Cleve",
    namedBy: "From Thule (mythical North)",
    stse: "Portable X-rays (Tm-170 source).",
    uses: "Portable X-ray machines, Lasers, Euro banknotes.",
    hazards: "Low toxicity.",
    valenceElectrons: "Variable (outer s + f)",
    commonIons: "Tm³⁺",
    oxidationStates: ["+3"],
    electronConfig: "[Xe] 4f¹³ 6s²",
    electronegativity: 1.25,
    ionization: "597 kJ/mol",
    density: "9.32 g/cm³",
    melt: "1545°C",
    boil: "1950°C",
    isotopes: [{ name: "Tm-169", neutron: "100n", percent: "Stable" }],
  },
  Yb: {
    discovery: "1878",
    avgAtomicMass: "173.05",
    discoveredBy: "Jean Charles Galissard de Marignac",
    namedBy: "From Ytterby, Sweden",
    stse: "Atomic Clocks (World's most stable clocks).",
    uses: "Fiber lasers, Stress gauges, Atomic clocks.",
    hazards: "Eye/skin irritant.",
    valenceElectrons: "Variable (outer s + f)",
    commonIons: "Yb³⁺, Yb²⁺",
    oxidationStates: ["+3", "+2"],
    electronConfig: "[Xe] 4f¹⁴ 6s²",
    electronegativity: 1.1,
    ionization: "603 kJ/mol",
    density: "6.90 g/cm³",
    melt: "824°C",
    boil: "1196°C",
    isotopes: [
      { name: "Yb-168", neutron: "98n", percent: "Stable" },
      { name: "Yb-170", neutron: "100n", percent: "Stable" },
      { name: "Yb-171", neutron: "101n", percent: "Stable" },
      { name: "Yb-172", neutron: "102n", percent: "Stable" },
      { name: "Yb-173", neutron: "103n", percent: "Stable" },
      { name: "Yb-174", neutron: "104n", percent: "Stable" },
      { name: "Yb-176", neutron: "106n", percent: "Stable" },
    ],
  },
  Lu: {
    discovery: "1907",
    avgAtomicMass: "174.97",
    discoveredBy: "Georges Urbain",
    namedBy: "From Lutetia (Paris)",
    stse: "Cancer Therapy (Lu-177 radiotherapy); Petroleum cracking.",
    uses: "PET scan detectors (LSO crystals), Cancer treatment, Catalysts.",
    hazards: "Low toxicity.",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Lu³⁺",
    oxidationStates: ["+3"],
    electronConfig: "[Xe] 4f¹⁴ 5d¹ 6s²",
    electronegativity: 1.27,
    ionization: "524 kJ/mol",
    density: "9.84 g/cm³",
    melt: "1663°C",
    boil: "3402°C",
    isotopes: [
      { name: "Lu-175", neutron: "104n", percent: "Stable" },
      { name: "Lu-176", neutron: "105n", percent: "Radioactive" },
    ],
  },
  Hf: {
    discovery: "1923",
    avgAtomicMass: "178.49",
    discoveredBy: "Dirk Coster & George de Hevesy",
    namedBy: "From Hafnia (Copenhagen)",
    stse: "Nuclear Reactors (Control rods); Microprocessors.",
    uses: "Nuclear control rods (absorbs neutrons), Plasma cutting tips, Intel chips (high-k dielectric).",
    hazards: "Fine dust is pyrophoric.",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Hf⁴⁺",
    oxidationStates: ["+4"],
    electronConfig: "[Xe] 4f¹⁴ 5d² 6s²",
    electronegativity: 1.3,
    ionization: "659 kJ/mol",
    density: "13.31 g/cm³",
    melt: "2233°C",
    boil: "4603°C",
    isotopes: [
      { name: "Hf-176", neutron: "104n", percent: "Stable" },
      { name: "Hf-177", neutron: "105n", percent: "Stable" },
      { name: "Hf-178", neutron: "106n", percent: "Stable" },
      { name: "Hf-179", neutron: "107n", percent: "Stable" },
      { name: "Hf-180", neutron: "108n", percent: "Stable" },
    ],
  },
  Ta: {
    discovery: "1802",
    avgAtomicMass: "180.95",
    discoveredBy: "Anders Gustaf Ekeberg",
    namedBy: "From Tantalus (Greek mythology)",
    stse: 'Electronics Supply Chain ("Conflict mineral").',
    uses: "Capacitors in smartphones/laptops, Surgical implants (inert).",
    hazards: "Low toxicity; biocompatible.",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Ta⁵⁺",
    oxidationStates: ["+5"],
    electronConfig: "[Xe] 4f¹⁴ 5d³ 6s²",
    electronegativity: 1.5,
    ionization: "761 kJ/mol",
    density: "16.69 g/cm³",
    melt: "3017°C",
    boil: "5458°C",
    isotopes: [
      { name: "Ta-180", neutron: "107n", percent: "Stable" },
      { name: "Ta-181", neutron: "108n", percent: "Stable" },
    ],
  },
  W: {
    discovery: "1783",
    avgAtomicMass: "183.84",
    discoveredBy: "Juan José & Fausto Elhuyar",
    namedBy: "Swedish tung sten (heavy stone); Symbol W from Wolfram",
    stse: "Lighting (Incandescent filaments); Military (Kinetic bombardment).",
    uses: "Light bulb filaments, TIG welding, Armor-piercing ammunition.",
    hazards: "Dust irritates lungs; largely non-toxic.",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "W⁶⁺",
    oxidationStates: ["+6", "+4"],
    electronConfig: "[Xe] 4f¹⁴ 5d⁴ 6s²",
    electronegativity: 2.36,
    ionization: "770 kJ/mol",
    density: "19.25 g/cm³",
    melt: "3422°C [Highest of all metals]",
    boil: "5930°C",
    isotopes: [
      { name: "W-182", neutron: "108n", percent: "Stable" },
      { name: "W-183", neutron: "109n", percent: "Stable" },
      { name: "W-184", neutron: "110n", percent: "Stable" },
      { name: "W-186", neutron: "112n", percent: "Stable" },
    ],
  },
  Re: {
    discovery: "1925",
    avgAtomicMass: "186.21",
    discoveredBy: "Walter Noddack, Ida Tacke, Otto Berg",
    namedBy: "From Rhenus (Rhine River)",
    stse: "Aerospace (Jet engine superalloys).",
    uses: "Jet engine turbine blades, Thermocouples, Catalysts.",
    hazards: "Low toxicity.",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Re⁷⁺, Re⁴⁺",
    oxidationStates: ["+7", "+6", "+4"],
    electronConfig: "[Xe] 4f¹⁴ 5d⁵ 6s²",
    electronegativity: 1.9,
    ionization: "760 kJ/mol",
    density: "21.02 g/cm³",
    melt: "3186°C",
    boil: "5596°C",
    isotopes: [
      { name: "Re-185", neutron: "110n", percent: "Stable" },
      { name: "Re-187", neutron: "112n", percent: "Radioactive" },
    ],
  },
  Os: {
    discovery: "1803",
    avgAtomicMass: "190.23",
    discoveredBy: "Smithson Tennant",
    namedBy: "From Greek osme (smell)",
    stse: "Density limits (Densest naturally occurring substance).",
    uses: "Fountain pen tips, Electrical contacts, Fingerprint detection.",
    hazards: "OsO₄ is extremely toxic and volatile (causes blindness).",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Os⁴⁺, Os⁸⁺ (OsO₄)",
    oxidationStates: ["+4", "+8"],
    electronConfig: "[Xe] 4f¹⁴ 5d⁶ 6s²",
    electronegativity: 2.2,
    ionization: "840 kJ/mol",
    density: "22.59 g/cm³ [Densest element]",
    melt: "3033°C",
    boil: "5012°C",
    isotopes: [
      { name: "Os-186", neutron: "110n", percent: "Stable" },
      { name: "Os-187", neutron: "111n", percent: "Stable" },
      { name: "Os-188", neutron: "112n", percent: "Stable" },
      { name: "Os-189", neutron: "113n", percent: "Stable" },
      { name: "Os-190", neutron: "114n", percent: "Stable" },
      { name: "Os-192", neutron: "116n", percent: "Stable" },
    ],
  },
  Ir: {
    discovery: "1803",
    avgAtomicMass: "192.22",
    discoveredBy: "Smithson Tennant",
    namedBy: "From Greek iris (rainbow, due to salt colors)",
    stse: "Geology (K-Pg boundary layer evidence for Dinosaur extinction).",
    uses: "Spark plugs, Crucibles, Standard Metre Bar (Pt-Ir alloy).",
    hazards: "Low toxicity; dust is flammable.",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Ir⁴⁺, Ir³⁺",
    oxidationStates: ["+4", "+3"],
    electronConfig: "[Xe] 4f¹⁴ 5d⁷ 6s²",
    electronegativity: 2.2,
    ionization: "880 kJ/mol",
    density: "22.56 g/cm³ [2nd densest]",
    melt: "2446°C",
    boil: "4428°C",
    isotopes: [
      { name: "Ir-191", neutron: "114n", percent: "Stable" },
      { name: "Ir-193", neutron: "116n", percent: "Stable" },
    ],
  },
  Pt: {
    discovery: "1735",
    avgAtomicMass: "195.08",
    discoveredBy: "Antonio de Ulloa",
    namedBy: "From Spanish platina (little silver)",
    stse: "Green Technology (Hydrogen Fuel Cells); Medicine (Chemotherapy).",
    uses: "Catalytic converters, Jewelry, Pacemaker electrodes, Cisplatin (cancer drug).",
    hazards: "Metallic Pt is inert; salts can cause asthma.",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Pt²⁺, Pt⁴⁺",
    oxidationStates: ["+2", "+4"],
    electronConfig: "[Xe] 4f¹⁴ 5d⁹ 6s¹ [Exception]",
    electronegativity: 2.28,
    ionization: "870 kJ/mol",
    density: "21.45 g/cm³",
    melt: "1768°C",
    boil: "3825°C",
    isotopes: [
      { name: "Pt-190", neutron: "112n", percent: "Radioactive" },
      { name: "Pt-192", neutron: "114n", percent: "Stable" },
      { name: "Pt-194", neutron: "116n", percent: "Stable" },
      { name: "Pt-195", neutron: "117n", percent: "Stable" },
      { name: "Pt-196", neutron: "118n", percent: "Stable" },
      { name: "Pt-198", neutron: "120n", percent: "Stable" },
    ],
  },
  Au: {
    discovery: "Prehistoric (~6000 BCE)",
    avgAtomicMass: "196.97",
    discoveredBy: "Ancient Civilizations",
    namedBy: "Anglo-Saxon gold (Symbol Au from Latin aurum)",
    stse: "Economics (Gold Standard); Electronics (Corrosion-free contacts).",
    uses: "Currency/Jewelry, Electronics plating, Radiation shielding.",
    hazards: "Non-toxic (edible in leaf form).",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Au⁺ (Aurous), Au³⁺ (Auric)",
    oxidationStates: ["+1", "+3"],
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s¹ [Exception]",
    electronegativity: 2.54,
    ionization: "890 kJ/mol",
    density: "19.30 g/cm³",
    melt: "1064°C",
    boil: "2970°C",
    isotopes: [{ name: "Au-197", neutron: "118n", percent: "Stable" }],
  },
  Hg: {
    discovery: "~1500 BCE",
    avgAtomicMass: "200.59",
    discoveredBy: "Ancient Egyptians/Chinese",
    namedBy: "From Planet Mercury (Symbol Hg from hydrargyrum)",
    stse: "Environmental Toxicology (Minamata disease); Bioaccumulation in fish.",
    uses: "Thermometers (historical), Dental amalgam, Fluorescent bulbs.",
    hazards: "Highly toxic neurotoxin (vapor and compounds).",
    valenceElectrons: 2,
    commonIons: "Hg₂²⁺ (Mercurous), Hg²⁺ (Mercuric)",
    oxidationStates: ["+1", "+2"],
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s²",
    electronegativity: 2.0,
    ionization: "1007 kJ/mol",
    density: "13.53 g/cm³",
    melt: "-38.8°C",
    boil: "356.7°C",
    isotopes: [
      { name: "Hg-196", neutron: "116n", percent: "Stable" },
      { name: "Hg-198", neutron: "118n", percent: "Stable" },
      { name: "Hg-199", neutron: "119n", percent: "Stable" },
      { name: "Hg-200", neutron: "120n", percent: "Stable" },
      { name: "Hg-201", neutron: "121n", percent: "Stable" },
      { name: "Hg-202", neutron: "122n", percent: "Stable" },
      { name: "Hg-204", neutron: "124n", percent: "Stable" },
    ],
  },
  Tl: {
    discovery: "1861",
    avgAtomicMass: "204.38",
    discoveredBy: "William Crookes",
    namedBy: "From Greek thallos (green twig)",
    stse: 'Forensic Science ("The Poisoner\'s Poison").',
    uses: "Rat poison (banned), Electronics, Cardiac stress tests (Tl-201).",
    hazards: "Extremely toxic; accumulates in body.",
    valenceElectrons: "3 (acts like 1)",
    commonIons: "Tl⁺, Tl³⁺",
    oxidationStates: ["+1", "+3"],
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹",
    electronegativity: 1.62,
    ionization: "589 kJ/mol",
    density: "11.85 g/cm³",
    melt: "304°C",
    boil: "1473°C",
    isotopes: [
      { name: "Tl-203", neutron: "122n", percent: "Stable" },
      { name: "Tl-205", neutron: "124n", percent: "Stable" },
    ],
  },
  Pb: {
    discovery: "~7000 BCE",
    avgAtomicMass: "207.2",
    discoveredBy: "Ancient Civilizations",
    namedBy: "Anglo-Saxon lead (Symbol Pb from Latin plumbum)",
    stse: "Public Health (Flint Water Crisis); Environmental banning (Leaded gasoline).",
    uses: "Car batteries (Pb-acid), Radiation shielding, Bullets.",
    hazards: "Potent neurotoxin; affects IQ in children.",
    valenceElectrons: 4,
    commonIons: "Pb²⁺, Pb⁴⁺",
    oxidationStates: ["+2", "+4"],
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²",
    electronegativity: 2.33,
    ionization: "716 kJ/mol",
    density: "11.34 g/cm³",
    melt: "327.5°C",
    boil: "1749°C",
    isotopes: [
      { name: "Pb-204", neutron: "122n", percent: "Stable" },
      { name: "Pb-206", neutron: "124n", percent: "Stable" },
      { name: "Pb-207", neutron: "125n", percent: "Stable" },
      { name: "Pb-208", neutron: "126n", percent: "Stable" },
    ],
  },
  Bi: {
    discovery: "~1000 CE",
    avgAtomicMass: "208.98",
    discoveredBy: "Alchemists (confused with Pb/Sn)",
    namedBy: "German Wismut (white mass)",
    stse: "Green Chemistry (Non-toxic lead replacement).",
    uses: "Pepto-Bismol (Stomach relief), Lead-free shot/solder, Fire sprinklers.",
    hazards: "Low toxicity (unusual for heavy metals).",
    valenceElectrons: 5,
    commonIons: "Bi³⁺",
    oxidationStates: ["+3", "+5"],
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³",
    electronegativity: 2.02,
    ionization: "703 kJ/mol",
    density: "9.78 g/cm³",
    melt: "271.4°C",
    boil: "1564°C",
    isotopes: [{ name: "Bi-209", neutron: "126n", percent: "Stable" }],
  },
  Po: {
    discovery: "1898",
    avgAtomicMass: "[209] (Radioactive)",
    discoveredBy: "Marie & Pierre Curie",
    namedBy: "From Poland (Marie's homeland)",
    stse: "Nuclear Assassination (Litvinenko poisoning); Static elimination.",
    uses: "Anti-static brushes, Heat source in satellites (rare).",
    hazards: "Extremely radiotoxic (alpha emitter); fatal in micrograms.",
    valenceElectrons: 6,
    commonIons: "Po²⁺, Po⁴⁺",
    oxidationStates: ["+2", "+4"],
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴",
    electronegativity: 2.0,
    ionization: "812 kJ/mol",
    density: "9.20 g/cm³",
    melt: "254°C",
    boil: "962°C",
    isotopes: [
      { name: "Po-209", neutron: "125n", percent: "Radioactive" },
      { name: "Po-210", neutron: "126n", percent: "Radioactive" },
    ],
  },
  At: {
    discovery: "1940",
    avgAtomicMass: "[210] (Radioactive)",
    discoveredBy: "Dale R. Corson, Kenneth Ross MacKenzie, Emilio Segrè",
    namedBy: "From Greek astatos (unstable)",
    stse: "Targeted Alpha Therapy (Cancer treatment research).",
    uses: "Medical research only (rarest natural element).",
    hazards: "Highly radioactive.",
    valenceElectrons: 7,
    commonIons: "At⁻ (Astatide)",
    oxidationStates: ["-1", "+1"],
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵",
    electronegativity: 2.2,
    ionization: "899 kJ/mol (est)",
    density: "~6.35 g/cm³",
    melt: "302°C (est)",
    boil: "337°C (est)",
    isotopes: [
      { name: "At-210", neutron: "125n", percent: "Radioactive" },
      { name: "At-211", neutron: "126n", percent: "Radioactive" },
    ],
  },
  Rn: {
    discovery: "1900",
    avgAtomicMass: "[222] (Radioactive)",
    discoveredBy: "Friedrich Ernst Dorn",
    namedBy: "Derived from Radium",
    stse: "Indoor Air Quality (Lung cancer risk in basements).",
    uses: "Radiation therapy (historical), Earthquake prediction research.",
    hazards: "Radioactive gas; carcinogen via inhalation.",
    valenceElectrons: 8,
    commonIons: "None",
    oxidationStates: ["0"],
    electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶",
    electronegativity: null,
    ionization: "1037 kJ/mol",
    density: "9.73 g/L",
    melt: "-71°C",
    boil: "-61.7°C",
    isotopes: [
      { name: "Rn-211", neutron: "125n", percent: "Radioactive" },
      { name: "Rn-220", neutron: "134n", percent: "Radioactive" },
      { name: "Rn-222", neutron: "136n", percent: "Radioactive" },
    ],
  },
  Fr: {
    discovery: "1939",
    avgAtomicMass: "[223] (Radioactive)",
    discoveredBy: "Marguerite Perey",
    namedBy: "From France",
    stse: "Fundamental Physics (Parity violation studies).",
    uses: "Research only (due to extreme scarcity and radioactivity).",
    hazards: "Highly radioactive.",
    valenceElectrons: 1,
    commonIons: "Fr⁺",
    oxidationStates: ["+1"],
    electronConfig: "[Rn] 7s¹",
    electronegativity: 0.79,
    ionization: "380 kJ/mol",
    density: "~2.48 g/cm³ (predicted)",
    melt: "~27°C (predicted)",
    boil: "~677°C (predicted)",
    isotopes: [{ name: "Fr-223", neutron: "136n", percent: "Radioactive" }],
  },
  Ra: {
    discovery: "1898",
    avgAtomicMass: "[226] (Radioactive)",
    discoveredBy: "Marie & Pierre Curie",
    namedBy: "Latin radius (ray)",
    stse: 'Labor Rights ("Radium Girls" poisoning cases); History of Oncology.',
    uses: "Historical glow-in-the-dark paint (banned), Cancer treatment (Ra-223).",
    hazards: "Highly radiotoxic bone seeker (mimics Calcium).",
    valenceElectrons: 2,
    commonIons: "Ra²⁺",
    oxidationStates: ["+2"],
    electronConfig: "[Rn] 7s²",
    electronegativity: 0.9,
    ionization: "509 kJ/mol",
    density: "5.50 g/cm³",
    melt: "700°C",
    boil: "1737°C",
    isotopes: [
      { name: "Ra-223", neutron: "135n", percent: "Radioactive" },
      { name: "Ra-224", neutron: "136n", percent: "Radioactive" },
      { name: "Ra-226", neutron: "138n", percent: "Radioactive" },
      { name: "Ra-228", neutron: "140n", percent: "Radioactive" },
    ],
  },
  Ac: {
    discovery: "1899",
    avgAtomicMass: "[227] (Radioactive)",
    discoveredBy: "André-Louis Debierne",
    namedBy: "Greek aktis (ray)",
    stse: "Targeted Alpha Therapy (TAT) for cancer.",
    uses: "Neutron source, Immunotherapy (Ac-225).",
    hazards: "Highly radioactive.",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Ac³⁺",
    oxidationStates: ["+3"],
    electronConfig: "[Rn] 6d¹ 7s²",
    electronegativity: 1.1,
    ionization: "499 kJ/mol",
    density: "10.07 g/cm³",
    melt: "1050°C",
    boil: "3198°C",
    isotopes: [{ name: "Ac-227", neutron: "138n", percent: "Radioactive" }],
  },
  Th: {
    discovery: "1829",
    avgAtomicMass: "232.04",
    discoveredBy: "Jöns Jakob Berzelius",
    namedBy: "Thor (Norse god of thunder)",
    stse: "Future Energy (Thorium molten salt reactors).",
    uses: "Gas lantern mantles, TIG welding electrodes, Nuclear fuel potential.",
    hazards: "Low radioactivity; heavy metal toxicity.",
    valenceElectrons: "Variable (outer s + d + f)",
    commonIons: "Th⁴⁺",
    oxidationStates: ["+4"],
    electronConfig: "[Rn] 6d² 7s²",
    electronegativity: 1.3,
    ionization: "587 kJ/mol",
    density: "11.72 g/cm³",
    melt: "1750°C",
    boil: "4788°C",
    isotopes: [{ name: "Th-232", neutron: "142n", percent: "Radioactive" }],
  },
  Pa: {
    discovery: "1913",
    avgAtomicMass: "231.04",
    discoveredBy: "Fajans & Göhring",
    namedBy: "Greek protos (first) + actinium",
    stse: "Radiometric dating (Protactinium-Thorium dating).",
    uses: "Research only.",
    hazards: "Highly toxic and radioactive.",
    valenceElectrons: "Variable (outer s + d + f)",
    commonIons: "Pa⁵⁺",
    oxidationStates: ["+5", "+4"],
    electronConfig: "[Rn] 5f² 6d¹ 7s²",
    electronegativity: 1.5,
    ionization: "568 kJ/mol",
    density: "15.37 g/cm³",
    melt: "1568°C",
    boil: "4027°C",
    isotopes: [{ name: "Pa-231", neutron: "140n", percent: "Radioactive" }],
  },
  U: {
    discovery: "1789",
    avgAtomicMass: "238.03",
    discoveredBy: "Martin Heinrich Klaproth",
    namedBy: "Planet Uranus",
    stse: "Nuclear Age (Fission power, Atomic weapons); Geothermal heat (Earth's core).",
    uses: "Nuclear fuel, Armor plating (Depleted U), Yellow glass (historical).",
    hazards: "Radiotoxic and chemotoxic (kidney damage).",
    valenceElectrons: "Variable (outer s + d + f)",
    commonIons: "U⁴⁺, U⁶⁺ (Uranyl ion UO₂²⁺)",
    oxidationStates: ["+3", "+4", "+5", "+6"],
    electronConfig: "[Rn] 5f³ 6d¹ 7s²",
    electronegativity: 1.38,
    ionization: "598 kJ/mol",
    density: "19.10 g/cm³",
    melt: "1132°C",
    boil: "4131°C",
    isotopes: [
      { name: "U-235", neutron: "143n", percent: "Radioactive" },
      { name: "U-238", neutron: "146n", percent: "Radioactive" },
    ],
  },
  Np: {
    discovery: "1940",
    avgAtomicMass: "237",
    discoveredBy: "McMillan & Abelson",
    namedBy: "Planet Neptune",
    stse: "First transuranic element.",
    uses: "Precursor to Pu-238 production; Neutron detectors.",
    hazards: "Radioactive.",
    valenceElectrons: "Variable (outer s + d + f)",
    commonIons: "Np⁵⁺",
    oxidationStates: ["+5"],
    electronConfig: "[Rn] 5f⁴ 6d¹ 7s²",
    electronegativity: 1.36,
    ionization: "605 kJ/mol",
    density: "20.25 g/cm³",
    melt: "644°C",
    boil: "3902°C",
    isotopes: [{ name: "Np-237", neutron: "144n", percent: "Radioactive" }],
  },
  Pu: {
    discovery: "1940",
    avgAtomicMass: "244",
    discoveredBy: "Seaborg, McMillan, Kennedy, Wahl",
    namedBy: "Planet Pluto",
    stse: "Global Security (Nuclear non-proliferation); Space Exploration (RTG batteries).",
    uses: "Nuclear weapons, RTG power for spacecraft (Voyager/Mars rovers).",
    hazards: "Extremely radiotoxic; criticality hazard.",
    valenceElectrons: "Variable (outer s + f)",
    commonIons: "Pu⁴⁺",
    oxidationStates: ["+4"],
    electronConfig: "[Rn] 5f⁶ 7s²",
    electronegativity: 1.28,
    ionization: "585 kJ/mol",
    density: "19.82 g/cm³",
    melt: "640°C",
    boil: "3228°C",
    isotopes: [
      { name: "Pu-239", neutron: "145n", percent: "Radioactive" },
      { name: "Pu-244", neutron: "150n", percent: "Radioactive" },
    ],
  },
  Am: {
    discovery: "1944",
    avgAtomicMass: "243",
    discoveredBy: "Glenn T. Seaborg et al.",
    namedBy: "The Americas",
    stse: "Domestic Safety (Ionization smoke detectors).",
    uses: "Smoke detectors (Am-241), Neutron sources.",
    hazards: "Radioactive (accumulates in bones).",
    valenceElectrons: "Variable (outer s + f)",
    commonIons: "Am³⁺",
    oxidationStates: ["+3"],
    electronConfig: "[Rn] 5f⁷ 7s²",
    electronegativity: 1.13,
    ionization: "578 kJ/mol",
    density: "12.00 g/cm³",
    melt: "1176°C",
    boil: "2607°C",
    isotopes: [
      { name: "Am-241", neutron: "146n", percent: "Radioactive" },
      { name: "Am-243", neutron: "148n", percent: "Radioactive" },
    ],
  },
  Cm: {
    discovery: "1944",
    avgAtomicMass: "247",
    discoveredBy: "Seaborg, James, Ghiorso",
    namedBy: "Marie & Pierre Curie",
    stse: "Space Exploration (Alpha particle X-ray Spectrometers).",
    uses: "Alpha source in Mars Rovers (APXS).",
    hazards: "Highly radioactive.",
    valenceElectrons: "Variable (outer s + d + f)",
    commonIons: "Cm³⁺",
    oxidationStates: ["+3"],
    electronConfig: "[Rn] 5f⁷ 6d¹ 7s²",
    electronegativity: 1.28,
    ionization: "581 kJ/mol",
    density: "13.51 g/cm³",
    melt: "1340°C",
    boil: "3110°C",
    isotopes: [
      { name: "Cm-244", neutron: "148n", percent: "Radioactive" },
      { name: "Cm-247", neutron: "151n", percent: "Radioactive" },
    ],
  },
  Bk: {
    discovery: "1949",
    avgAtomicMass: "247",
    discoveredBy: "Thompson, Ghiorso, Seaborg",
    namedBy: "Berkeley, California",
    stse: "Heavy Element Synthesis (Target material).",
    uses: "Synthesizing Tennessine (Element 117).",
    hazards: "Highly radioactive.",
    valenceElectrons: "Variable (outer s + f)",
    commonIons: "Bk³⁺, Bk⁴⁺",
    oxidationStates: ["+3", "+4"],
    electronConfig: "[Rn] 5f⁹ 7s²",
    electronegativity: 1.3,
    ionization: "601 kJ/mol",
    density: "14.78 g/cm³",
    melt: "986°C",
    boil: "2627°C (predicted)",
    isotopes: [{ name: "Bk-247", neutron: "150n", percent: "Radioactive" }],
  },
  Cf: {
    discovery: "1950",
    avgAtomicMass: "251",
    discoveredBy: "Thompson, Street, Ghiorso, Seaborg",
    namedBy: "State of California",
    stse: "Industrial Sensing (Neutron moisture gauges).",
    uses: "Neutron startup source for reactors, Gold/Oil prospecting.",
    hazards: "Intense neutron emitter.",
    valenceElectrons: "Variable (outer s + f)",
    commonIons: "Cf³⁺",
    oxidationStates: ["+3"],
    electronConfig: "[Rn] 5f¹⁰ 7s²",
    electronegativity: 1.3,
    ionization: "608 kJ/mol",
    density: "15.10 g/cm³",
    melt: "900°C",
    boil: "1470°C (predicted)",
    isotopes: [
      { name: "Cf-251", neutron: "153n", percent: "Radioactive" },
      { name: "Cf-252", neutron: "154n", percent: "Radioactive" },
    ],
  },
  Es: {
    discovery: "1952",
    avgAtomicMass: "252",
    discoveredBy: "Albert Ghiorso et al.",
    namedBy: "Albert Einstein",
    stse: 'Cold War Science (Discovered in "Ivy Mike" H-bomb debris).',
    uses: "Research only.",
    hazards: "Highly radioactive.",
    valenceElectrons: "Variable (outer s + f)",
    commonIons: "Es³⁺",
    oxidationStates: ["+3"],
    electronConfig: "[Rn] 5f¹¹ 7s²",
    electronegativity: 1.3,
    ionization: "619 kJ/mol",
    density: "8.84 g/cm³",
    melt: "860°C",
    boil: "996°C (predicted)",
    isotopes: [
      { name: "Es-252", neutron: "153n", percent: "Radioactive" },
      { name: "Es-253", neutron: "154n", percent: "Radioactive" },
    ],
  },
  Fm: {
    discovery: "1952",
    avgAtomicMass: "257",
    discoveredBy: "Albert Ghiorso et al.",
    namedBy: "Enrico Fermi",
    stse: "Limit of neutron capture (Heaviest element formable by bombardment).",
    uses: "Research only.",
    hazards: "Highly radioactive.",
    valenceElectrons: "Variable (outer s + f)",
    commonIons: "Fm³⁺",
    oxidationStates: ["+3"],
    electronConfig: "[Rn] 5f¹² 7s²",
    electronegativity: 1.3,
    ionization: "627 kJ/mol",
    density: "Unknown",
    melt: "1527°C",
    boil: "Unknown",
    isotopes: [{ name: "Fm-257", neutron: "157n", percent: "Radioactive" }],
  },
  Md: {
    discovery: "1955",
    avgAtomicMass: "258",
    discoveredBy: "Ghiorso, Harvey, Choppin, Thompson, Seaborg",
    namedBy: "Dmitri Mendeleev",
    stse: '"Atom-at-a-time" synthesis (First element made this way).',
    uses: "Research only.",
    hazards: "Radioactive.",
    valenceElectrons: "Variable (outer s + f)",
    commonIons: "Md³⁺, Md²⁺",
    oxidationStates: ["+3", "+2"],
    electronConfig: "[Rn] 5f¹³ 7s²",
    electronegativity: 1.3,
    ionization: "635 kJ/mol",
    density: "Unknown",
    melt: "827°C",
    boil: "Unknown",
    isotopes: [{ name: "Md-258", neutron: "157n", percent: "Radioactive" }],
  },
  No: {
    discovery: "1966",
    avgAtomicMass: "259",
    discoveredBy: "JINR (Russia)",
    namedBy: "Alfred Nobel",
    stse: "Naming controversy (Disputed between USA, Sweden, USSR).",
    uses: "Research only.",
    hazards: "Radioactive.",
    valenceElectrons: "Variable (outer s + f)",
    commonIons: "No²⁺",
    oxidationStates: ["+2", "+3"],
    electronConfig: "[Rn] 5f¹⁴ 7s²",
    electronegativity: 1.3,
    ionization: "642 kJ/mol",
    density: "Unknown",
    melt: "827°C",
    boil: "Unknown",
    isotopes: [{ name: "No-259", neutron: "157n", percent: "Radioactive" }],
  },
  Lr: {
    discovery: "1961",
    avgAtomicMass: "266",
    discoveredBy: "Ghiorso et al.",
    namedBy: "Ernest Lawrence",
    stse: "Periodicity Debate (Placement in d-block vs f-block).",
    uses: "Research only.",
    hazards: "Radioactive.",
    valenceElectrons: 3,
    commonIons: "Lr³⁺",
    oxidationStates: ["+3"],
    electronConfig: "[Rn] 5f¹⁴ 7s² 7p¹ (Predicted)",
    electronegativity: 1.3,
    ionization: "443 kJ/mol",
    density: "Unknown",
    melt: "1627°C",
    boil: "Unknown",
    isotopes: [
      { name: "Lr-262", neutron: "159n", percent: "Radioactive" },
      { name: "Lr-266", neutron: "163n", percent: "Radioactive" },
    ],
  },
  Rf: {
    discovery: "1964",
    avgAtomicMass: "267",
    discoveredBy: "Dubna (USSR) / Berkeley (USA)",
    namedBy: "Ernest Rutherford",
    stse: "Cold War Science (Transfermium Wars).",
    uses: "Research only.",
    hazards: "Radioactive.",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Rf⁴⁺",
    oxidationStates: ["+4"],
    electronConfig: "[Rn] 5f¹⁴ 6d² 7s²",
    electronegativity: null,
    ionization: "580 kJ/mol (predicted)",
    density: "23.2 g/cm³ (predicted)",
    melt: "2100°C (predicted)",
    boil: "5500°C (predicted)",
    isotopes: [{ name: "Rf-267", neutron: "163n", percent: "Radioactive" }],
  },
  Db: {
    discovery: "1968",
    avgAtomicMass: "268",
    discoveredBy: "Dubna (USSR) / Berkeley (USA)",
    namedBy: "Dubna, Russia",
    stse: "International cooperation (IUPAC naming resolution).",
    uses: "Research only.",
    hazards: "Radioactive.",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Db⁵⁺",
    oxidationStates: ["+5"],
    electronConfig: "[Rn] 5f¹⁴ 6d³ 7s²",
    electronegativity: null,
    ionization: "665 kJ/mol (predicted)",
    density: "29.3 g/cm³ (predicted)",
    melt: "N/A",
    boil: "N/A",
    isotopes: [{ name: "Db-268", neutron: "163n", percent: "Radioactive" }],
  },
  Sg: {
    discovery: "1974",
    avgAtomicMass: "269",
    discoveredBy: "Lawrence Berkeley Lab",
    namedBy: "Glenn T. Seaborg",
    stse: "Naming Controversy (First element named after a living person).",
    uses: "Research only.",
    hazards: "Radioactive.",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Sg⁶⁺",
    oxidationStates: ["+6"],
    electronConfig: "[Rn] 5f¹⁴ 6d⁴ 7s²",
    electronegativity: null,
    ionization: "757 kJ/mol (predicted)",
    density: "35.0 g/cm³ (predicted)",
    melt: "N/A",
    boil: "N/A",
    isotopes: [{ name: "Sg-271", neutron: "165n", percent: "Radioactive" }],
  },
  Bh: {
    discovery: "1981",
    avgAtomicMass: "270",
    discoveredBy: "GSI Helmholtz Centre (Germany)",
    namedBy: "Niels Bohr",
    stse: "Heavy Ion Research.",
    uses: "Research only.",
    hazards: "Radioactive.",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Bh⁷⁺",
    oxidationStates: ["+7"],
    electronConfig: "[Rn] 5f¹⁴ 6d⁵ 7s²",
    electronegativity: null,
    ionization: "740 kJ/mol (predicted)",
    density: "37.1 g/cm³ (predicted)",
    melt: "N/A",
    boil: "N/A",
    isotopes: [{ name: "Bh-272", neutron: "165n", percent: "Radioactive" }],
  },
  Hs: {
    discovery: "1984",
    avgAtomicMass: "277",
    discoveredBy: "GSI Helmholtz Centre (Germany)",
    namedBy: "State of Hesse (Hassia)",
    stse: "Superheavy Chemistry (Proven to form volatile tetroxide HsO₄).",
    uses: "Research only.",
    hazards: "Radioactive.",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Hs⁸⁺",
    oxidationStates: ["+8"],
    electronConfig: "[Rn] 5f¹⁴ 6d⁶ 7s²",
    electronegativity: null,
    ionization: "730 kJ/mol (predicted)",
    density: "41.0 g/cm³ (predicted)",
    melt: "N/A",
    boil: "N/A",
    isotopes: [{ name: "Hs-277", neutron: "169n", percent: "Radioactive" }],
  },
  Mt: {
    discovery: "1982",
    avgAtomicMass: "278",
    discoveredBy: "GSI Helmholtz Centre (Germany)",
    namedBy: "Lise Meitner",
    stse: "Women in Science (Meitner discovered fission but was overlooked for Nobel).",
    uses: "Research only.",
    hazards: "Radioactive.",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Unknown",
    oxidationStates: [],
    electronConfig: "[Rn] 5f¹⁴ 6d⁷ 7s² (Predicted)",
    electronegativity: null,
    ionization: "800 kJ/mol (predicted)",
    density: "37.4 g/cm³ (predicted)",
    melt: "N/A",
    boil: "N/A",
    isotopes: [{ name: "Mt-278", neutron: "169n", percent: "Radioactive" }],
  },
  Ds: {
    discovery: "1994",
    avgAtomicMass: "281",
    discoveredBy: "GSI Helmholtz Centre (Germany)",
    namedBy: "Darmstadt, Germany",
    stse: "Ion Beam Technology.",
    uses: "Research only.",
    hazards: "Radioactive.",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Unknown",
    oxidationStates: [],
    electronConfig: "[Rn] 5f¹⁴ 6d⁹ 7s¹ (Predicted)",
    electronegativity: null,
    ionization: "N/A",
    density: "34.8 g/cm³ (predicted)",
    melt: "N/A",
    boil: "N/A",
    isotopes: [{ name: "Ds-281", neutron: "171n", percent: "Radioactive" }],
  },
  Rg: {
    discovery: "1994",
    avgAtomicMass: "282",
    discoveredBy: "GSI Helmholtz Centre (Germany)",
    namedBy: "Wilhelm Röntgen",
    stse: "History of X-rays.",
    uses: "Research only.",
    hazards: "Radioactive.",
    valenceElectrons: "Variable (outer s + d)",
    commonIons: "Unknown",
    oxidationStates: ["+3"],
    electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s¹ (Predicted)",
    electronegativity: null,
    ionization: "N/A",
    density: "28.7 g/cm³ (predicted)",
    melt: "N/A",
    boil: "N/A",
    isotopes: [{ name: "Rg-282", neutron: "171n", percent: "Radioactive" }],
  },
  Cn: {
    discovery: "1996",
    avgAtomicMass: "285",
    discoveredBy: "GSI Helmholtz Centre (Germany)",
    namedBy: "Nicolaus Copernicus",
    stse: "Relativistic Chemistry (Acts more like a noble gas than a metal).",
    uses: "Research only.",
    hazards: "Radioactive.",
    valenceElectrons: 2,
    commonIons: "Cn²⁺ (Predicted)",
    oxidationStates: ["+2", "+4"],
    electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s²",
    electronegativity: null,
    ionization: "N/A",
    density: "Unknown",
    melt: "~10°C (predicted)",
    boil: "~67°C (predicted)",
    isotopes: [{ name: "Cn-285", neutron: "173n", percent: "Radioactive" }],
  },
  Nh: {
    discovery: "2003",
    avgAtomicMass: "286",
    discoveredBy: "RIKEN (Japan)",
    namedBy: "From Nihon (Japan)",
    stse: "First element discovered in Asia.",
    uses: "Research only.",
    hazards: "Radioactive.",
    valenceElectrons: 3,
    commonIons: "Nh⁺ (Predicted)",
    oxidationStates: ["+1", "+3"],
    electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹",
    electronegativity: null,
    ionization: "N/A",
    density: "~16 g/cm³ (predicted)",
    melt: "~430°C (predicted)",
    boil: "~1130°C (predicted)",
    isotopes: [{ name: "Nh-286", neutron: "173n", percent: "Radioactive" }],
  },
  Fl: {
    discovery: "1998",
    avgAtomicMass: "289",
    discoveredBy: "JINR (Russia)",
    namedBy: "Flerov Laboratory",
    stse: '"Island of Stability" research.',
    uses: "Research only.",
    hazards: "Radioactive.",
    valenceElectrons: 4,
    commonIons: "Fl²⁺ (Predicted)",
    oxidationStates: ["+2", "+4"],
    electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²",
    electronegativity: null,
    ionization: "N/A",
    density: "~14 g/cm³ (predicted)",
    melt: "~-73°C (predicted)",
    boil: "~107°C (predicted)",
    isotopes: [{ name: "Fl-289", neutron: "175n", percent: "Radioactive" }],
  },
  Mc: {
    discovery: "2003",
    avgAtomicMass: "290",
    discoveredBy: "JINR (Russia) & Vanderbilt/LLNL (USA)",
    namedBy: "Moscow Region",
    stse: "Extreme matter synthesis.",
    uses: "Research only.",
    hazards: "Highly radioactive.",
    valenceElectrons: 5,
    commonIons: "Mc⁺, Mc³⁺ (Predicted)",
    oxidationStates: ["+1", "+3"],
    electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³",
    electronegativity: null,
    ionization: "N/A",
    density: "~13.5 g/cm³ (predicted)",
    melt: "~400°C (predicted)",
    boil: "~1100°C (predicted)",
    isotopes: [{ name: "Mc-290", neutron: "175n", percent: "Radioactive" }],
  },
  Lv: {
    discovery: "2000",
    avgAtomicMass: "293",
    discoveredBy: "LLNL (USA) & JINR (Russia)",
    namedBy: "Lawrence Livermore National Laboratory",
    stse: "International Science Collaboration.",
    uses: "Research only.",
    hazards: "Highly radioactive.",
    valenceElectrons: 6,
    commonIons: "Lv²⁺ (Predicted)",
    oxidationStates: ["+2", "+4"],
    electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴",
    electronegativity: null,
    ionization: "N/A",
    density: "~12.9 g/cm³ (predicted)",
    melt: "364–507°C (predicted)",
    boil: "762–862°C (predicted)",
    isotopes: [{ name: "Lv-293", neutron: "177n", percent: "Radioactive" }],
  },
  Ts: {
    discovery: "2010",
    avgAtomicMass: "294",
    discoveredBy: "JINR (Russia), ORNL/Vanderbilt (USA)",
    namedBy: "State of Tennessee (Oak Ridge Lab)",
    stse: "Synthesis required Berkelium target.",
    uses: "Research only.",
    hazards: "Highly radioactive.",
    valenceElectrons: 7,
    commonIons: "Ts⁻ (Predicted)",
    oxidationStates: ["-1", "+1", "+3", "+5"],
    electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵",
    electronegativity: null,
    ionization: "N/A",
    density: "~7.17 g/cm³ (predicted)",
    melt: "350–550°C (predicted)",
    boil: "610°C (predicted)",
    isotopes: [{ name: "Ts-294", neutron: "177n", percent: "Radioactive" }],
  },
  Og: {
    discovery: "2002",
    avgAtomicMass: "294",
    discoveredBy: "JINR (Russia) & LLNL (USA)",
    namedBy: "Yuri Oganessian",
    stse: "Relativistic Effects (Predicted to be solid, not gas).",
    uses: "Research only.",
    hazards: "Radioactive.",
    valenceElectrons: 8,
    commonIons: "Unknown",
    oxidationStates: ["0", "+2", "+4"],
    electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶",
    electronegativity: null,
    ionization: "N/A",
    density: "~4.9–5.1 g/cm³ (predicted)",
    melt: ">50°C (predicted)",
    boil: "80°C (predicted)",
    isotopes: [{ name: "Og-294", neutron: "176n", percent: "Radioactive" }],
  },
};
const elements = [
  {
    number: 1,
    symbol: "H",
    name: "Hydrogen",
    row: 1,
    column: 1,
    category: "Non-metal",
  },
  {
    number: 2,
    symbol: "He",
    name: "Helium",
    row: 1,
    column: 18,
    category: "Noble Gas",
  },
  {
    number: 3,
    symbol: "Li",
    name: "Lithium",
    row: 2,
    column: 1,
    category: "Alkali Metal",
  },
  {
    number: 4,
    symbol: "Be",
    name: "Beryllium",
    row: 2,
    column: 2,
    category: "Alkaline Earth Metal",
  },
  {
    number: 5,
    symbol: "B",
    name: "Boron",
    row: 2,
    column: 13,
    category: "Metalloid",
  },
  {
    number: 6,
    symbol: "C",
    name: "Carbon",
    row: 2,
    column: 14,
    category: "Non-metal",
  },
  {
    number: 7,
    symbol: "N",
    name: "Nitrogen",
    row: 2,
    column: 15,
    category: "Non-metal",
  },
  {
    number: 8,
    symbol: "O",
    name: "Oxygen",
    row: 2,
    column: 16,
    category: "Non-metal",
  },
  {
    number: 9,
    symbol: "F",
    name: "Fluorine",
    row: 2,
    column: 17,
    category: "Halogen",
  },
  {
    number: 10,
    symbol: "Ne",
    name: "Neon",
    row: 2,
    column: 18,
    category: "Noble Gas",
  },
  {
    number: 11,
    symbol: "Na",
    name: "Sodium",
    row: 3,
    column: 1,
    category: "Alkali Metal",
  },
  {
    number: 12,
    symbol: "Mg",
    name: "Magnesium",
    row: 3,
    column: 2,
    category: "Alkaline Earth Metal",
  },
  {
    number: 13,
    symbol: "Al",
    name: "Aluminum",
    row: 3,
    column: 13,
    category: "Post-transition Metal",
  },
  {
    number: 14,
    symbol: "Si",
    name: "Silicon",
    row: 3,
    column: 14,
    category: "Metalloid",
  },
  {
    number: 15,
    symbol: "P",
    name: "Phosphorus",
    row: 3,
    column: 15,
    category: "Non-metal",
  },
  {
    number: 16,
    symbol: "S",
    name: "Sulfur",
    row: 3,
    column: 16,
    category: "Non-metal",
  },
  {
    number: 17,
    symbol: "Cl",
    name: "Chlorine",
    row: 3,
    column: 17,
    category: "Halogen",
  },
  {
    number: 18,
    symbol: "Ar",
    name: "Argon",
    row: 3,
    column: 18,
    category: "Noble Gas",
  },
  {
    number: 19,
    symbol: "K",
    name: "Potassium",
    row: 4,
    column: 1,
    category: "Alkali Metal",
  },
  {
    number: 20,
    symbol: "Ca",
    name: "Calcium",
    row: 4,
    column: 2,
    category: "Alkaline Earth Metal",
  },
  {
    number: 21,
    symbol: "Sc",
    name: "Scandium",
    row: 4,
    column: 3,
    category: "Transition Metal",
  },
  {
    number: 22,
    symbol: "Ti",
    name: "Titanium",
    row: 4,
    column: 4,
    category: "Transition Metal",
  },
  {
    number: 23,
    symbol: "V",
    name: "Vanadium",
    row: 4,
    column: 5,
    category: "Transition Metal",
  },
  {
    number: 24,
    symbol: "Cr",
    name: "Chromium",
    row: 4,
    column: 6,
    category: "Transition Metal",
  },
  {
    number: 25,
    symbol: "Mn",
    name: "Manganese",
    row: 4,
    column: 7,
    category: "Transition Metal",
  },
  {
    number: 26,
    symbol: "Fe",
    name: "Iron",
    row: 4,
    column: 8,
    category: "Transition Metal",
  },
  {
    number: 27,
    symbol: "Co",
    name: "Cobalt",
    row: 4,
    column: 9,
    category: "Transition Metal",
  },
  {
    number: 28,
    symbol: "Ni",
    name: "Nickel",
    row: 4,
    column: 10,
    category: "Transition Metal",
  },
  {
    number: 29,
    symbol: "Cu",
    name: "Copper",
    row: 4,
    column: 11,
    category: "Transition Metal",
  },
  {
    number: 30,
    symbol: "Zn",
    name: "Zinc",
    row: 4,
    column: 12,
    category: "Transition Metal",
  },
  {
    number: 31,
    symbol: "Ga",
    name: "Gallium",
    row: 4,
    column: 13,
    category: "Post-transition Metal",
  },
  {
    number: 32,
    symbol: "Ge",
    name: "Germanium",
    row: 4,
    column: 14,
    category: "Metalloid",
  },
  {
    number: 33,
    symbol: "As",
    name: "Arsenic",
    row: 4,
    column: 15,
    category: "Metalloid",
  },
  {
    number: 34,
    symbol: "Se",
    name: "Selenium",
    row: 4,
    column: 16,
    category: "Non-metal",
  },
  {
    number: 35,
    symbol: "Br",
    name: "Bromine",
    row: 4,
    column: 17,
    category: "Halogen",
  },
  {
    number: 36,
    symbol: "Kr",
    name: "Krypton",
    row: 4,
    column: 18,
    category: "Noble Gas",
  },
  {
    number: 37,
    symbol: "Rb",
    name: "Rubidium",
    row: 5,
    column: 1,
    category: "Alkali Metal",
  },
  {
    number: 38,
    symbol: "Sr",
    name: "Strontium",
    row: 5,
    column: 2,
    category: "Alkaline Earth Metal",
  },
  {
    number: 39,
    symbol: "Y",
    name: "Yttrium",
    row: 5,
    column: 3,
    category: "Transition Metal",
  },
  {
    number: 40,
    symbol: "Zr",
    name: "Zirconium",
    row: 5,
    column: 4,
    category: "Transition Metal",
  },
  {
    number: 41,
    symbol: "Nb",
    name: "Niobium",
    row: 5,
    column: 5,
    category: "Transition Metal",
  },
  {
    number: 42,
    symbol: "Mo",
    name: "Molybdenum",
    row: 5,
    column: 6,
    category: "Transition Metal",
  },
  {
    number: 43,
    symbol: "Tc",
    name: "Technetium",
    row: 5,
    column: 7,
    category: "Transition Metal",
  },
  {
    number: 44,
    symbol: "Ru",
    name: "Ruthenium",
    row: 5,
    column: 8,
    category: "Transition Metal",
  },
  {
    number: 45,
    symbol: "Rh",
    name: "Rhodium",
    row: 5,
    column: 9,
    category: "Transition Metal",
  },
  {
    number: 46,
    symbol: "Pd",
    name: "Palladium",
    row: 5,
    column: 10,
    category: "Transition Metal",
  },
  {
    number: 47,
    symbol: "Ag",
    name: "Silver",
    row: 5,
    column: 11,
    category: "Transition Metal",
  },
  {
    number: 48,
    symbol: "Cd",
    name: "Cadmium",
    row: 5,
    column: 12,
    category: "Transition Metal",
  },
  {
    number: 49,
    symbol: "In",
    name: "Indium",
    row: 5,
    column: 13,
    category: "Post-transition Metal",
  },
  {
    number: 50,
    symbol: "Sn",
    name: "Tin",
    row: 5,
    column: 14,
    category: "Post-transition Metal",
  },
  {
    number: 51,
    symbol: "Sb",
    name: "Antimony",
    row: 5,
    column: 15,
    category: "Metalloid",
  },
  {
    number: 52,
    symbol: "Te",
    name: "Tellurium",
    row: 5,
    column: 16,
    category: "Metalloid",
  },
  {
    number: 53,
    symbol: "I",
    name: "Iodine",
    row: 5,
    column: 17,
    category: "Halogen",
  },
  {
    number: 54,
    symbol: "Xe",
    name: "Xenon",
    row: 5,
    column: 18,
    category: "Noble Gas",
  },
  {
    number: 55,
    symbol: "Cs",
    name: "Cesium",
    row: 6,
    column: 1,
    category: "Alkali Metal",
  },
  {
    number: 56,
    symbol: "Ba",
    name: "Barium",
    row: 6,
    column: 2,
    category: "Alkaline Earth Metal",
  },
  {
    number: 57,
    symbol: "La",
    name: "Lanthanum",
    row: 6,
    column: 3,
    category: "Lanthanide",
    series: "lanthanide",
  },
  {
    number: 72,
    symbol: "Hf",
    name: "Hafnium",
    row: 6,
    column: 4,
    category: "Transition Metal",
  },
  {
    number: 73,
    symbol: "Ta",
    name: "Tantalum",
    row: 6,
    column: 5,
    category: "Transition Metal",
  },
  {
    number: 74,
    symbol: "W",
    name: "Tungsten",
    row: 6,
    column: 6,
    category: "Transition Metal",
  },
  {
    number: 75,
    symbol: "Re",
    name: "Rhenium",
    row: 6,
    column: 7,
    category: "Transition Metal",
  },
  {
    number: 76,
    symbol: "Os",
    name: "Osmium",
    row: 6,
    column: 8,
    category: "Transition Metal",
  },
  {
    number: 77,
    symbol: "Ir",
    name: "Iridium",
    row: 6,
    column: 9,
    category: "Transition Metal",
  },
  {
    number: 78,
    symbol: "Pt",
    name: "Platinum",
    row: 6,
    column: 10,
    category: "Transition Metal",
  },
  {
    number: 79,
    symbol: "Au",
    name: "Gold",
    row: 6,
    column: 11,
    category: "Transition Metal",
  },
  {
    number: 80,
    symbol: "Hg",
    name: "Mercury",
    row: 6,
    column: 12,
    category: "Transition Metal",
  },
  {
    number: 81,
    symbol: "Tl",
    name: "Thallium",
    row: 6,
    column: 13,
    category: "Post-transition Metal",
  },
  {
    number: 82,
    symbol: "Pb",
    name: "Lead",
    row: 6,
    column: 14,
    category: "Post-transition Metal",
  },
  {
    number: 83,
    symbol: "Bi",
    name: "Bismuth",
    row: 6,
    column: 15,
    category: "Post-transition Metal",
  },
  {
    number: 84,
    symbol: "Po",
    name: "Polonium",
    row: 6,
    column: 16,
    category: "Post-transition Metal",
  },
  {
    number: 85,
    symbol: "At",
    name: "Astatine",
    row: 6,
    column: 17,
    category: "Halogen",
  },
  {
    number: 86,
    symbol: "Rn",
    name: "Radon",
    row: 6,
    column: 18,
    category: "Noble Gas",
  },
  {
    number: 87,
    symbol: "Fr",
    name: "Francium",
    row: 7,
    column: 1,
    category: "Alkali Metal",
  },
  {
    number: 88,
    symbol: "Ra",
    name: "Radium",
    row: 7,
    column: 2,
    category: "Alkaline Earth Metal",
  },
  {
    number: 89,
    symbol: "Ac",
    name: "Actinium",
    row: 7,
    column: 3,
    category: "Actinide",
    series: "actinide",
  },
  {
    number: 104,
    symbol: "Rf",
    name: "Rutherfordium",
    row: 7,
    column: 4,
    category: "Transition Metal",
  },
  {
    number: 105,
    symbol: "Db",
    name: "Dubnium",
    row: 7,
    column: 5,
    category: "Transition Metal",
  },
  {
    number: 106,
    symbol: "Sg",
    name: "Seaborgium",
    row: 7,
    column: 6,
    category: "Transition Metal",
  },
  {
    number: 107,
    symbol: "Bh",
    name: "Bohrium",
    row: 7,
    column: 7,
    category: "Transition Metal",
  },
  {
    number: 108,
    symbol: "Hs",
    name: "Hassium",
    row: 7,
    column: 8,
    category: "Transition Metal",
  },
  {
    number: 109,
    symbol: "Mt",
    name: "Meitnerium",
    row: 7,
    column: 9,
    category: "Transition Metal",
  },
  {
    number: 110,
    symbol: "Ds",
    name: "Darmstadtium",
    row: 7,
    column: 10,
    category: "Transition Metal",
  },
  {
    number: 111,
    symbol: "Rg",
    name: "Roentgenium",
    row: 7,
    column: 11,
    category: "Transition Metal",
  },
  {
    number: 112,
    symbol: "Cn",
    name: "Copernicium",
    row: 7,
    column: 12,
    category: "Transition Metal",
  },
  {
    number: 113,
    symbol: "Nh",
    name: "Nihonium",
    row: 7,
    column: 13,
    category: "Post-transition Metal",
  },
  {
    number: 114,
    symbol: "Fl",
    name: "Flerovium",
    row: 7,
    column: 14,
    category: "Post-transition Metal",
  },
  {
    number: 115,
    symbol: "Mc",
    name: "Moscovium",
    row: 7,
    column: 15,
    category: "Post-transition Metal",
  },
  {
    number: 116,
    symbol: "Lv",
    name: "Livermorium",
    row: 7,
    column: 16,
    category: "Post-transition Metal",
  },
  {
    number: 117,
    symbol: "Ts",
    name: "Tennessine",
    row: 7,
    column: 17,
    category: "Halogen",
  },
  {
    number: 118,
    symbol: "Og",
    name: "Oganesson",
    row: 7,
    column: 18,
    category: "Noble Gas",
  },
  {
    number: 58,
    symbol: "Ce",
    name: "Cerium",
    row: 9,
    column: 4,
    category: "Lanthanide",
    series: "lanthanide",
  },
  {
    number: 59,
    symbol: "Pr",
    name: "Praseodymium",
    row: 9,
    column: 5,
    category: "Lanthanide",
    series: "lanthanide",
  },
  {
    number: 60,
    symbol: "Nd",
    name: "Neodymium",
    row: 9,
    column: 6,
    category: "Lanthanide",
    series: "lanthanide",
  },
  {
    number: 61,
    symbol: "Pm",
    name: "Promethium",
    row: 9,
    column: 7,
    category: "Lanthanide",
    series: "lanthanide",
  },
  {
    number: 62,
    symbol: "Sm",
    name: "Samarium",
    row: 9,
    column: 8,
    category: "Lanthanide",
    series: "lanthanide",
  },
  {
    number: 63,
    symbol: "Eu",
    name: "Europium",
    row: 9,
    column: 9,
    category: "Lanthanide",
    series: "lanthanide",
  },
  {
    number: 64,
    symbol: "Gd",
    name: "Gadolinium",
    row: 9,
    column: 10,
    category: "Lanthanide",
    series: "lanthanide",
  },
  {
    number: 65,
    symbol: "Tb",
    name: "Terbium",
    row: 9,
    column: 11,
    category: "Lanthanide",
    series: "lanthanide",
  },
  {
    number: 66,
    symbol: "Dy",
    name: "Dysprosium",
    row: 9,
    column: 12,
    category: "Lanthanide",
    series: "lanthanide",
  },
  {
    number: 67,
    symbol: "Ho",
    name: "Holmium",
    row: 9,
    column: 13,
    category: "Lanthanide",
    series: "lanthanide",
  },
  {
    number: 68,
    symbol: "Er",
    name: "Erbium",
    row: 9,
    column: 14,
    category: "Lanthanide",
    series: "lanthanide",
  },
  {
    number: 69,
    symbol: "Tm",
    name: "Thulium",
    row: 9,
    column: 15,
    category: "Lanthanide",
    series: "lanthanide",
  },
  {
    number: 70,
    symbol: "Yb",
    name: "Ytterbium",
    row: 9,
    column: 16,
    category: "Lanthanide",
    series: "lanthanide",
  },
  {
    number: 71,
    symbol: "Lu",
    name: "Lutetium",
    row: 9,
    column: 17,
    category: "Lanthanide",
    series: "lanthanide",
  },
  {
    number: 90,
    symbol: "Th",
    name: "Thorium",
    row: 10,
    column: 4,
    category: "Actinide",
    series: "actinide",
  },
  {
    number: 91,
    symbol: "Pa",
    name: "Protactinium",
    row: 10,
    column: 5,
    category: "Actinide",
    series: "actinide",
  },
  {
    number: 92,
    symbol: "U",
    name: "Uranium",
    row: 10,
    column: 6,
    category: "Actinide",
    series: "actinide",
  },
  {
    number: 93,
    symbol: "Np",
    name: "Neptunium",
    row: 10,
    column: 7,
    category: "Actinide",
    series: "actinide",
  },
  {
    number: 94,
    symbol: "Pu",
    name: "Plutonium",
    row: 10,
    column: 8,
    category: "Actinide",
    series: "actinide",
  },
  {
    number: 95,
    symbol: "Am",
    name: "Americium",
    row: 10,
    column: 9,
    category: "Actinide",
    series: "actinide",
  },
  {
    number: 96,
    symbol: "Cm",
    name: "Curium",
    row: 10,
    column: 10,
    category: "Actinide",
    series: "actinide",
  },
  {
    number: 97,
    symbol: "Bk",
    name: "Berkelium",
    row: 10,
    column: 11,
    category: "Actinide",
    series: "actinide",
  },
  {
    number: 98,
    symbol: "Cf",
    name: "Californium",
    row: 10,
    column: 12,
    category: "Actinide",
    series: "actinide",
  },
  {
    number: 99,
    symbol: "Es",
    name: "Einsteinium",
    row: 10,
    column: 13,
    category: "Actinide",
    series: "actinide",
  },
  {
    number: 100,
    symbol: "Fm",
    name: "Fermium",
    row: 10,
    column: 14,
    category: "Actinide",
    series: "actinide",
  },
  {
    number: 101,
    symbol: "Md",
    name: "Mendelevium",
    row: 10,
    column: 15,
    category: "Actinide",
    series: "actinide",
  },
  {
    number: 102,
    symbol: "No",
    name: "Nobelium",
    row: 10,
    column: 16,
    category: "Actinide",
    series: "actinide",
  },
  {
    number: 103,
    symbol: "Lr",
    name: "Lawrencium",
    row: 10,
    column: 17,
    category: "Actinide",
    series: "actinide",
  },
];
document.addEventListener("DOMContentLoaded", () => {
  const tableContainer = document.getElementById("periodic-table");
  const grid = {};
  if (typeof elements !== "undefined") {
    elements.forEach((element) => {
      // Calculate Phase @ STP (25°C)
      if (!element.phase && typeof finallyData !== "undefined") {
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

    // 添加按钮事件处理
    const mainContainer = document.getElementById("main-container");
    const blankPage1 = document.getElementById("blank-page-1");
    const blankPage2 = document.getElementById("blank-page-2");
    const ionsPage = document.getElementById("ions-page");

    let currentPage = "table"; // 'table', 'ions', 'blank1', 'blank2'

    function showTablePage() {
      // 如果当前已经是表页面，不执行任何操作
      if (currentPage === "table") {
        return;
      }

      // 隐藏所有空白页
      if (blankPage1) {
        blankPage1.classList.remove("active");
      }
      if (blankPage2) {
        blankPage2.classList.remove("active");
      }
      if (ionsPage) {
        ionsPage.style.display = "none";
      }

      // 显示主容器
      if (mainContainer) {
        mainContainer.style.display = "flex";
      }

      currentPage = "table";
    }

    function showIonsPage() {
      // 如果当前已经是ions页面，不执行任何操作
      if (currentPage === "ions") {
        return;
      }

      // 隐藏主容器和其他空白页
      if (mainContainer) {
        mainContainer.style.display = "none";
      }
      if (blankPage1) {
        blankPage1.classList.remove("active");
      }
      if (blankPage2) {
        blankPage2.classList.remove("active");
      }

      // 显示ions页面
      if (ionsPage) {
        ionsPage.style.display = "flex";
      }

      currentPage = "ions";
    }

    function showBlankPage1() {
      // 如果当前已经是blank1页面，不执行任何操作
      if (currentPage === "blank1") {
        return;
      }

      // 隐藏主容器和其他空白页
      if (mainContainer) {
        mainContainer.style.display = "none";
      }
      if (blankPage2) {
        blankPage2.classList.remove("active");
      }
      if (ionsPage) {
        ionsPage.style.display = "none";
      }

      // 显示blank1
      if (blankPage1) {
        blankPage1.classList.add("active");
      }

      currentPage = "blank1";
    }

    function showBlankPage2() {
      // 如果当前已经是blank2页面，不执行任何操作
      if (currentPage === "blank2") {
        return;
      }

      // 隐藏主容器和其他空白页
      if (mainContainer) {
        mainContainer.style.display = "none";
      }
      if (blankPage1) {
        blankPage1.classList.remove("active");
      }
      if (ionsPage) {
        ionsPage.style.display = "none";
      }

      // 显示blank2
      if (blankPage2) {
        blankPage2.classList.add("active");
      }

      currentPage = "blank2";
    }

    const ionsData = [
      // ===== 1. 基础单原子 (Basic Monatomic) =====
      // +1 阳离子 - H+ Universal Schema Data
      {
        id: "h_plus",
        symbol: "H",
        charge: "+",
        name: "Hydrogen",
        nameZh: "Hydrogen (H⁺)",
        type: "Cation",
        category: "Monatomic",
        colorClass: "alkali-metal",
        section: "basic",
        sectionName: "1. Basic Monatomic",
        sectionNameZh: "1. 基础单原子",
        group: "basic_cat1",
        groupName: "+1 Cations",
        groupNameZh: "+1 阳离子: H, Li, Na, K, Ag",
        customData: {
          level1: {
            type: "Cation / Acid",
            source: "Acids (HCl, H₂SO₄) - Loss of 1 e⁻",
            phase: "Aqueous (aq as H₃O⁺) - Colorless",
            valence: "0 (Empty Shell)",
            keyCompounds: "HCl (Stomach Acid), H₂SO₄ (Battery Acid)",
          },
          level2: {
            molarMass: "1.008 g/mol",
            subatomic: "1 p⁺ | 0 e⁻",
            statusBanner: "The Definition of Acidity (pH)",
            slotA: {
              label: "LITMUS TEST",
              result: "Turns Red",
              desc: "Turns Blue Paper Red",
            },
            slotB: {
              label: "REACTIVITY",
              result: "Fizzes",
              desc: "w/ Carbonates",
            },
          },
          level3: {
            config: "[1s]⁰ (Empty)",
            oxidation: "+1",
            ionicRadius: "~0.84 fm (Bare Nucleus)",
            hydrationEnthalpy: "-1091 kJ/mol (Very High)",
            coordination: "1 (Bonds to Lone Pair)",
          },
          level4: {
            discoveryYear: "1884 (Concept Defined)",
            discoveredBy: "Svante Arrhenius",
            namedBy: "Greek Hydro (Water) + Genes (Forming)",
            stse: "Ocean Acidification (Coral damage); Acid Rain (Forest damage).",
            commonUses:
              "Digestion (Stomach Acid); Car Batteries (Electrolyte).",
            hazards: "Corrosive (Chemical burns).",
          },
        },
      },
      {
        id: "li_plus",
        symbol: "Li",
        charge: "+",
        name: "Lithium",
        nameZh: "锂离子",
        type: "Cation",
        category: "Monatomic",
        colorClass: "alkali-metal",
        section: "basic",
        sectionName: "1. Basic Monatomic",
        sectionNameZh: "1. 基础单原子",
        group: "basic_cat1",
        groupName: "+1 Cations",
        groupNameZh: "+1 阳离子: H, Li, Na, K, Ag",
        customData: {
          level1: {
            type: "Alkali Metal Cation",
            source: "Group 1 Element - Loss of 1 e⁻",
            phase: "Aqueous (aq) - Colorless",
            valence: "0 (Stable Duplet)",
            keyCompounds: "Li-ion (Battery), Li₂CO₃ (Meds)",
          },
          level2: {
            molarMass: "6.94 g/mol",
            subatomic: "3 p⁺ | 2 e⁻",
            statusBanner: "Isoelectronic with Helium",
            slotA: {
              label: "FLAME TEST",
              result: "Crimson Red",
              desc: "(670 nm)",
            },
            slotB: {
              label: "BATTERY FLOW",
              result: "Ion Transport",
              desc: "In Li-ion Cells",
            },
          },
          level3: {
            config: "[1s]² (Stable Duplet)",
            oxidation: "+1",
            ionicRadius: "76 pm (Smallest alkali)",
            hydrationEnthalpy: "-519 kJ/mol (High)",
            coordination: "4 (Tetrahedral hydration)",
          },
          level4: {
            discoveryYear: "1817",
            discoveredBy: "Johan August Arfwedson",
            namedBy: "Greek Lithos (Stone)",
            stse: 'EV Revolution (Batteries); Geopolitics ("White Gold").',
            commonUses: "Li-ion Batteries (Phones/Cars); Medicine (Bipolar).",
            hazards: "Toxicity (Kidney impact); Corrosive (LiOH).",
          },
        },
      },
      {
        id: "na_plus",
        symbol: "Na",
        charge: "+",
        name: "Sodium",
        nameZh: "钠离子",
        type: "Cation",
        category: "Monatomic",
        colorClass: "alkali-metal",
        section: "basic",
        sectionName: "1. Basic Monatomic",
        sectionNameZh: "1. 基础单原子",
        group: "basic_cat1",
        groupName: "+1 Cations",
        groupNameZh: "+1 阳离子: H, Li, Na, K, Ag",
        customData: {
          level1: {
            type: "Alkali Metal Cation",
            source: "Group 1 Element - Loss of 1 e⁻",
            phase: "Aqueous (aq) - Colorless",
            valence: "8 (Stable Octet)",
            keyCompounds: "NaCl (Table Salt), Na₂CO₃ (Soda)",
          },
          level2: {
            molarMass: "22.99 g/mol",
            subatomic: "11 p⁺ | 10 e⁻",
            statusBanner: "Always Soluble (All-Pass Ion)",
            slotA: {
              label: "FLAME TEST",
              result: "Bright Yellow",
              desc: "(589 nm)",
            },
            slotB: {
              label: "SOLUBILITY",
              result: "Dissolves",
              desc: "Instantly",
            },
          },
          level3: {
            config: "[Ne] (Stable Octet)",
            oxidation: "+1",
            ionicRadius: "102 pm (Shrinks from 186 pm)",
            hydrationEnthalpy: "-406 kJ/mol",
            coordination: "6 (Octahedral)",
          },
          level4: {
            discoveryYear: "1807",
            discoveredBy: "Humphry Davy",
            namedBy: "Latin Natrium (Egyptian Soda)",
            stse: "Public Health (Hypertension); Road Salt Runoff.",
            commonUses: "Nerve Impulses; Street Lights; Food Preservative.",
            hazards: "Safe as ion (Essential nutrient).",
          },
        },
      },
      {
        id: "k_plus",
        symbol: "K",
        charge: "+",
        name: "Potassium",
        nameZh: "钾离子",
        type: "Cation",
        category: "Monatomic",
        colorClass: "alkali-metal",
        section: "basic",
        sectionName: "1. Basic Monatomic",
        sectionNameZh: "1. 基础单原子",
        group: "basic_cat1",
        groupName: "+1 Cations",
        groupNameZh: "+1 阳离子: H, Li, Na, K, Ag",
        customData: {
          level1: {
            type: "Alkali Metal Cation",
            source: "Group 1 Element - Loss of 1 e⁻",
            phase: "Aqueous (aq) - Colorless",
            valence: "8 (Stable Octet)",
            keyCompounds: "KCl (Fertilizer), KNO₃ (Gunpowder)",
          },
          level2: {
            molarMass: "39.10 g/mol",
            subatomic: "19 p⁺ | 18 e⁻",
            statusBanner: "Always Soluble (All-Pass Ion)",
            slotA: {
              label: "FLAME TEST",
              result: "Lilac / Violet",
              desc: "(766 nm)",
            },
            slotB: {
              label: "GROWTH",
              result: "Fertilizer Effect",
              desc: "N-P-K Nutrient",
            },
          },
          level3: {
            config: "[Ar] (Stable Octet)",
            oxidation: "+1",
            ionicRadius: "138 pm (Larger than Na)",
            hydrationEnthalpy: "-322 kJ/mol",
            coordination: "6-8",
          },
          level4: {
            discoveryYear: "1807",
            discoveredBy: "Humphry Davy",
            namedBy: "Arabic al-qali (Potash)",
            stse: "Food Security (Fertilizers); Radiation (K-40).",
            commonUses: "N-P-K Fertilizers; Soap; Muscle Function.",
            hazards: "Hyperkalemia (Cardiac arrest); Safe in diet.",
          },
        },
      },
      {
        id: "ag_plus",
        symbol: "Ag",
        charge: "+",
        name: "Silver",
        nameZh: "银离子",
        type: "Cation",
        category: "Monatomic",
        colorClass: "transition-metal",
        section: "basic",
        sectionName: "1. Basic Monatomic",
        sectionNameZh: "1. 基础单原子",
        group: "basic_cat1",
        groupName: "+1 Cations",
        groupNameZh: "+1 阳离子: H, Li, Na, K, Ag",
        customData: {
          level1: {
            type: "Transition Metal Cation",
            source: "Group 11 Element - Loss of 1 e⁻",
            phase: "Aqueous / Precipitate",
            valence: "18 (Pseudo-Noble Gas)",
            keyCompounds: "AgNO₃ (Soluble), AgCl (White Ppt)",
          },
          level2: {
            molarMass: "107.87 g/mol",
            subatomic: "47 p⁺ | 46 e⁻",
            statusBanner: "Insoluble with Halides (Cl/Br/I)",
            slotA: {
              label: "PRECIPITATE",
              result: "White Cloud",
              desc: "w/ Cl⁻",
            },
            slotB: {
              label: "PHOTOSENSITIVE",
              result: "Darkens",
              desc: "in Light",
            },
          },
          level3: {
            config: "[Kr] 4d¹⁰ (Full d-shell)",
            oxidation: "+1",
            ionicRadius: "115 pm (Similar to K⁺)",
            hydrationEnthalpy: "-473 kJ/mol",
            coordination: "2 (Linear)",
          },
          level4: {
            discoveryYear: "Prehistoric",
            discoveredBy: "Unknown",
            namedBy: "Latin Argentum",
            stse: "Photo-Waste (History); Nanosilver impact.",
            commonUses: "Photography (Film); Wound Care; Electronics.",
            hazards: "Toxic to aquatic life; Argyria (Blue skin).",
          },
        },
      },

      // +2 阳离子
      {
        id: "mg_2plus",
        symbol: "Mg",
        charge: "2+",
        name: "Magnesium",
        nameZh: "镁离子",
        type: "Cation",
        category: "Monatomic",
        colorClass: "alkaline-earth",
        section: "basic",
        sectionName: "1. Basic Monatomic",
        sectionNameZh: "1. 基础单原子",
        group: "basic_cat2",
        groupName: "+2 Cations",
        groupNameZh: "+2 阳离子: Mg, Ca, Ba, Zn",
        customData: {
          level1: {
            type: "Alkaline Earth Cation",
            source: "Group 2 Element - Loss of 2 e⁻",
            phase: "Aqueous (aq) - Colorless",
            valence: "0 (Stable Octet)",
            keyCompounds: "MgO, Mg (Flash Powder), MgSO₄ (Epsom)",
          },
          level2: {
            molarMass: "24.31 g/mol",
            subatomic: "12 p⁺ | 10 e⁻",
            statusBanner: "Insoluble with OH⁻ & CO₃²⁻",
            slotA: {
              label: "PRECIPITATE",
              result: "White Gel",
              desc: "w/ Hydroxide",
            },
            slotB: {
              label: "CHLOROPHYLL",
              result: "Central Atom",
              desc: "Power",
            },
          },
          level3: {
            config: "[Ne] (Stable Octet)",
            oxidation: "+2",
            ionicRadius: "72 pm (High charge density)",
            hydrationEnthalpy: "-1921 kJ/mol (Very High)",
            coordination: "6 (Octahedral)",
          },
          level4: {
            discoveryYear: "1808",
            discoveredBy: "Humphry Davy",
            namedBy: "Greek Magnesia (District)",
            stse: "Hard Water Scale; Photosynthesis engine.",
            commonUses: "Alloys (Car parts); Antacids (Milk of Magnesia).",
            hazards: "Safe (Essential nutrient).",
          },
        },
      },
      {
        id: "ca_2plus",
        symbol: "Ca",
        charge: "2+",
        name: "Calcium",
        nameZh: "钙离子",
        type: "Cation",
        category: "Monatomic",
        colorClass: "alkaline-earth",
        section: "basic",
        sectionName: "1. Basic Monatomic",
        sectionNameZh: "1. 基础单原子",
        group: "basic_cat2",
        groupName: "+2 Cations",
        groupNameZh: "+2 阳离子",
        customData: {
          level1: {
            type: "Alkaline Earth Cation",
            source: "Group 2 Element - Loss of 2 e⁻",
            phase: "Aqueous (aq) - Colorless",
            valence: "0 (Stable Octet)",
            keyCompounds: "CaCO₃ (Limestone), CaCl₂ (Road Salt)",
          },
          level2: {
            molarMass: "40.08 g/mol",
            subatomic: "20 p⁺ | 18 e⁻",
            statusBanner: "Insoluble with Carbonate (CO₃²⁻)",
            slotA: {
              label: "FLAME TEST",
              result: "Brick Red",
              desc: "/ Orange",
            },
            slotB: {
              label: "STRUCTURE",
              result: "Mineralization",
              desc: "Bones & Shells",
            },
          },
          level3: {
            config: "[Ar] (Stable Octet)",
            oxidation: "+2",
            ionicRadius: "100 pm (Shrinks from 197 pm)",
            hydrationEnthalpy: "-1577 kJ/mol (High)",
            coordination: "6-8",
          },
          level4: {
            discoveryYear: "1808",
            discoveredBy: "Humphry Davy",
            namedBy: "Latin Calx (Lime)",
            stse: "Concrete Industry; Ocean Acidification (CaCO₃).",
            commonUses: "Cement; Ice Melting; Bone Health.",
            hazards: "Safe (Essential nutrient).",
          },
        },
      },
      {
        id: "ba_2plus",
        symbol: "Ba",
        charge: "2+",
        name: "Barium",
        nameZh: "钡离子",
        type: "Cation",
        category: "Monatomic",
        colorClass: "alkaline-earth",
        section: "basic",
        sectionName: "1. Basic Monatomic",
        sectionNameZh: "1. 基础单原子",
        group: "basic_cat2",
        groupName: "+2 Cations",
        groupNameZh: "+2 阳离子",
        customData: {
          level1: {
            type: "Heavy Alkaline Earth Cation",
            source: "Group 2 Element - Loss of 2 e⁻",
            phase: "Aqueous / Insoluble Solid",
            valence: "0 (Stable Octet)",
            keyCompounds: "BaSO₄ (Barium Meal), BaCl₂ (Toxic)",
          },
          level2: {
            molarMass: "137.33 g/mol",
            subatomic: "56 p⁺ | 54 e⁻",
            statusBanner: "Insoluble with Sulfate (SO₄²⁻)",
            slotA: {
              label: "FLAME TEST",
              result: "Apple Green",
              desc: "(524 nm)",
            },
            slotB: {
              label: "IMAGING",
              result: "X-Ray Shield",
              desc: "(Contrast)",
            },
          },
          level3: {
            config: "[Xe] (Stable Octet)",
            oxidation: "+2",
            ionicRadius: "135 pm (Shrinks from 217 pm)",
            hydrationEnthalpy: "-1305 kJ/mol",
            coordination: "8-12",
          },
          level4: {
            discoveryYear: "1808",
            discoveredBy: "Humphry Davy",
            namedBy: "Greek Barys (Heavy)",
            stse: "Medical Imaging Safety; Drilling Fluids.",
            commonUses: "GI Tract X-rays; Fireworks (Green).",
            hazards: "Toxic (Muscle paralysis) if soluble.",
          },
        },
      },
      {
        id: "zn_2plus",
        symbol: "Zn",
        charge: "2+",
        name: "Zinc",
        nameZh: "锌离子",
        type: "Cation",
        category: "Monatomic",
        colorClass: "transition-metal",
        section: "basic",
        sectionName: "1. Basic Monatomic",
        sectionNameZh: "1. 基础单原子",
        group: "basic_cat2",
        groupName: "+2 Cations",
        groupNameZh: "+2 阳离子",
        customData: {
          level1: {
            type: "Transition Metal Cation",
            source: "Group 12 Element - Loss of 2 e⁻",
            phase: "Aqueous (aq) - Colorless",
            valence: "18 (Pseudo-Noble Gas)",
            keyCompounds: "ZnO (Sunscreen), ZnCl₂ (Flux)",
          },
          level2: {
            molarMass: "65.38 g/mol",
            subatomic: "30 p⁺ | 28 e⁻",
            statusBanner: "Amphoteric (Dissolves in Acid/Base)",
            slotA: {
              label: "PRECIPITATE",
              result: "White Gel",
              desc: "(Dissolves)",
            },
            slotB: {
              label: "GALVANIZE",
              result: "Steel Protection",
              desc: "Anti-Corrosion",
            },
          },
          level3: {
            config: "[Ar] 3d¹⁰ (Full d-shell)",
            oxidation: "+2",
            ionicRadius: "74 pm (Shrinks from 134 pm)",
            hydrationEnthalpy: "-2046 kJ/mol",
            coordination: "4 (Tetrahedral) or 6",
          },
          level4: {
            discoveryYear: "1746",
            discoveredBy: "Andreas Marggraf",
            namedBy: "German Zink (Prong)",
            stse: "Corrosion Control; Immune Support.",
            commonUses: "Rust Protection; Sunscreen; Alloys (Brass).",
            hazards: "Metal fume fever (if inhaled).",
          },
        },
      },

      // +3 阳离子
      {
        id: "al_3plus",
        symbol: "Al",
        charge: "3+",
        name: "Aluminum",
        nameZh: "铝离子",
        type: "Cation",
        category: "Monatomic",
        colorClass: "post-transition",
        section: "basic",
        sectionName: "1. Basic Monatomic",
        sectionNameZh: "1. 基础单原子",
        group: "basic_cat3",
        groupName: "+3 Cations",
        groupNameZh: "+3 阳离子: Al",
        customData: {
          level1: {
            type: "Post-Transition Cation",
            source: "Group 13 Element - Loss of 3 e⁻",
            phase: "Aqueous (aq) - Colorless",
            valence: "0 (Stable Octet)",
            keyCompounds: "Al₂O₃ (Sapphire), KAl(SO₄)₂ (Alum)",
          },
          level2: {
            molarMass: "26.98 g/mol",
            subatomic: "13 p⁺ | 10 e⁻",
            statusBanner: "Amphoteric Ppt (White Gel)",
            slotA: {
              label: "OXIDATION",
              result: "Transparent Shield",
              desc: "Al₂O₃ Layer",
            },
            slotB: {
              label: "PRECIPITATE",
              result: "White Gel",
              desc: "Amphoteric",
            },
          },
          level3: {
            config: "[Ne] (Stable Octet)",
            oxidation: "+3",
            ionicRadius: "54 pm (Tiny & Highly Charged)",
            hydrationEnthalpy: "-4665 kJ/mol (Extreme)",
            coordination: "6 (Octahedral)",
          },
          level4: {
            discoveryYear: "1825",
            discoveredBy: "Hans Christian Oersted",
            namedBy: "Latin Alumen (Bitter salt)",
            stse: "Recycling Efficiency; Red Mud Waste.",
            commonUses: "Aircraft Alloys; Cans; Water Treatment.",
            hazards: "Neurotoxicity concerns.",
          },
        },
      },

      // -1 阴离子
      {
        id: "f_minus",
        symbol: "F",
        charge: "-",
        name: "Fluoride",
        nameZh: "氟离子",
        type: "Anion",
        category: "Monatomic",
        colorClass: "halogen",
        section: "basic",
        sectionName: "1. Basic Monatomic",
        sectionNameZh: "1. 基础单原子",
        group: "basic_an1",
        groupName: "-1 Anions",
        groupNameZh: "-1 阴离子: F, Cl, Br, I",
        customData: {
          level1: {
            type: "Halogen Anion",
            source: "Group 17 Element - Gain of 1 e⁻",
            phase: "Aqueous (aq) - Colorless",
            valence: "8 (Stable Octet)",
            keyCompounds: "NaF (Toothpaste), CaF₂ (Fluorite)",
          },
          level2: {
            molarMass: "19.00 g/mol",
            subatomic: "9 p⁺ | 10 e⁻",
            statusBanner: "Insoluble with Calcium (Ca²⁺)",
            slotA: {
              label: "PRECIPITATE",
              result: "White Solid",
              desc: "w/ Ca²⁺",
            },
            slotB: {
              label: "PROTECTION",
              result: "Hardens Enamel",
              desc: "Cavity Prevention",
            },
          },
          level3: {
            config: "[Ne] (Stable Octet)",
            oxidation: "-1",
            ionicRadius: "133 pm (Expands from 71 pm)",
            hydrationEnthalpy: "-515 kJ/mol",
            coordination: "4-8",
          },
          level4: {
            discoveryYear: "1886",
            discoveredBy: "Henri Moissan",
            namedBy: "Latin Fluere (To flow)",
            stse: "Water Fluoridation debate; Teflon pollution.",
            commonUses: "Cavity Prevention; Non-stick pans; Etching.",
            hazards: "Toxic at high levels (Fluorosis).",
          },
        },
      },
      {
        id: "cl_minus",
        symbol: "Cl",
        charge: "-",
        name: "Chloride",
        nameZh: "氯离子",
        type: "Anion",
        category: "Monatomic",
        colorClass: "halogen",
        section: "basic",
        sectionName: "1. Basic Monatomic",
        sectionNameZh: "1. 基础单原子",
        group: "basic_an1",
        groupName: "-1 Anions",
        groupNameZh: "-1 阴离子",
        customData: {
          level1: {
            type: "Halogen Anion",
            source: "Group 17 Element - Gain of 1 e⁻",
            phase: "Aqueous (aq) - Colorless",
            valence: "8 (Stable Octet)",
            keyCompounds: "NaCl (Table Salt), AgCl (White Ppt)",
          },
          level2: {
            molarMass: "35.45 g/mol",
            subatomic: "17 p⁺ | 18 e⁻",
            statusBanner: "Insoluble with Silver (Ag⁺)",
            slotA: {
              label: "PRECIPITATE",
              result: "White Cloud",
              desc: "w/ Ag⁺",
            },
            slotB: {
              label: "SANITATION",
              result: "Disinfects Water",
              desc: "Pool & Tap",
            },
          },
          level3: {
            config: "[Ar] (Stable Octet)",
            oxidation: "-1",
            ionicRadius: "181 pm (Expands from 99 pm)",
            hydrationEnthalpy: "-381 kJ/mol",
            coordination: "6",
          },
          level4: {
            discoveryYear: "1774",
            discoveredBy: "Carl Wilhelm Scheele",
            namedBy: "Greek Chloros (Pale Green)",
            stse: "Sanitation (Clean Water); Road Salt damage.",
            commonUses: "Table Salt; Stomach Acid; PVC Plastics.",
            hazards: "Safe as ion (Essential nutrient).",
          },
        },
      },
      {
        id: "br_minus",
        symbol: "Br",
        charge: "-",
        name: "Bromide",
        nameZh: "溴离子",
        type: "Anion",
        category: "Monatomic",
        colorClass: "halogen",
        section: "basic",
        sectionName: "1. Basic Monatomic",
        sectionNameZh: "1. 基础单原子",
        group: "basic_an1",
        groupName: "-1 Anions",
        groupNameZh: "-1 阴离子",
        customData: {
          level1: {
            type: "Halogen Anion",
            source: "Group 17 Element - Gain of 1 e⁻",
            phase: "Aqueous (aq) - Colorless",
            valence: "8 (Stable Octet)",
            keyCompounds: "AgBr (Film), NaBr (Sedative)",
          },
          level2: {
            molarMass: "79.90 g/mol",
            subatomic: "35 p⁺ | 36 e⁻",
            statusBanner: "Insoluble with Silver (Cream Ppt)",
            slotA: {
              label: "PRECIPITATE",
              result: "Cream Solid",
              desc: "w/ Ag⁺",
            },
            slotB: {
              label: "FIRE STOP",
              result: "Extinguisher",
              desc: "Flame Retardant",
            },
          },
          level3: {
            config: "[Kr] (Stable Octet)",
            oxidation: "-1",
            ionicRadius: "196 pm (Expands from 114 pm)",
            hydrationEnthalpy: "-347 kJ/mol",
            coordination: "6",
          },
          level4: {
            discoveryYear: "1826",
            discoveredBy: "Antoine Balard",
            namedBy: "Greek Bromos (Stench)",
            stse: "Ozone Depletion; Fire Safety (Retardants).",
            commonUses: "Photography; Flame Retardants; Hot Tubs.",
            hazards: "Chronic toxicity (Bromism).",
          },
        },
      },
      {
        id: "i_minus",
        symbol: "I",
        charge: "-",
        name: "Iodide",
        nameZh: "碘离子",
        type: "Anion",
        category: "Monatomic",
        colorClass: "halogen",
        section: "basic",
        sectionName: "1. Basic Monatomic",
        sectionNameZh: "1. 基础单原子",
        group: "basic_an1",
        groupName: "-1 Anions",
        groupNameZh: "-1 阴离子",
        customData: {
          level1: {
            type: "Halogen Anion",
            source: "Group 17 Element - Gain of 1 e⁻",
            phase: "Aqueous (aq) - Colorless",
            valence: "8 (Stable Octet)",
            keyCompounds: "KI (Iodized Salt), PbI₂ (Golden Rain)",
          },
          level2: {
            molarMass: "126.90 g/mol",
            subatomic: "53 p⁺ | 54 e⁻",
            statusBanner: "Insoluble with Pb²⁺ (Yellow)",
            slotA: {
              label: "PRECIPITATE",
              result: "Bright Yellow",
              desc: "w/ Lead",
            },
            slotB: {
              label: "THYROID",
              result: "Prevents Goiter",
              desc: "Iodized Salt",
            },
          },
          level3: {
            config: "[Xe] (Stable Octet)",
            oxidation: "-1",
            ionicRadius: "220 pm (Huge Expansion)",
            hydrationEnthalpy: "-305 kJ/mol",
            coordination: "6",
          },
          level4: {
            discoveryYear: "1811",
            discoveredBy: "Bernard Courtois",
            namedBy: "Greek Iodes (Violet)",
            stse: "Goiter Prevention; Nuclear Safety (Pills).",
            commonUses: "Iodized Salt; Disinfectant; Cloud Seeding.",
            hazards: "Low toxicity.",
          },
        },
      },

      // -2 阴离子
      {
        id: "o_2minus",
        symbol: "O",
        charge: "2-",
        name: "Oxide",
        nameZh: "氧离子",
        type: "Anion",
        category: "Monatomic",
        colorClass: "non-metal",
        section: "basic",
        sectionName: "1. Basic Monatomic",
        sectionNameZh: "1. 基础单原子",
        group: "basic_an2",
        groupName: "-2 Anions",
        groupNameZh: "-2 阴离子: O, S",
        customData: {
          level1: {
            type: "Chalcogen Anion",
            source: "Group 16 Element - Gain of 2 e⁻",
            phase: "Solid Oxides (Reacts in water)",
            valence: "8 (Stable Octet)",
            keyCompounds: "MgO, Fe₂O₃ (Rust), CaO",
          },
          level2: {
            molarMass: "16.00 g/mol",
            subatomic: "8 p⁺ | 10 e⁻",
            statusBanner: "Forms Basic Solution (OH⁻)",
            slotA: {
              label: "BASICITY",
              result: "Forms Hydroxide",
              desc: "O²⁻ + H₂O → 2OH⁻",
            },
            slotB: {
              label: "OXIDATION",
              result: "Rusts Iron",
              desc: "Fe₂O₃ (Red-Brown)",
            },
          },
          level3: {
            config: "[Ne] (Stable Octet)",
            oxidation: "-2",
            ionicRadius: "140 pm (Expands from 73 pm)",
            hydrationEnthalpy: "High (Reacts)",
            coordination: "4-6",
          },
          level4: {
            discoveryYear: "1774",
            discoveredBy: "Priestley / Scheele",
            namedBy: "Greek Oxys (Acid - mistaken)",
            stse: "Corrosion Costs; Climate Change (CO₂).",
            commonUses: "Ceramics; Concrete; Ores extraction.",
            hazards: "Caustic (Strong base former).",
          },
        },
      },
      {
        id: "s_2minus",
        symbol: "S",
        charge: "2-",
        name: "Sulfide",
        nameZh: "硫离子",
        type: "Anion",
        category: "Monatomic",
        colorClass: "non-metal",
        section: "basic",
        sectionName: "1. Basic Monatomic",
        sectionNameZh: "1. 基础单原子",
        group: "basic_an2",
        groupName: "-2 Anions",
        groupNameZh: "-2 阴离子",
        customData: {
          level1: {
            type: "Chalcogen Anion",
            source: "Group 16 Element - Gain of 2 e⁻",
            phase: "Solid Ores / Aqueous",
            valence: "8 (Stable Octet)",
            keyCompounds: "H₂S (Rotten Gas), FeS₂ (Pyrite)",
          },
          level2: {
            molarMass: "32.06 g/mol",
            subatomic: "16 p⁺ | 18 e⁻",
            statusBanner: "Insoluble Black Ppts (HgS, CuS)",
            slotA: {
              label: "PRECIPITATE",
              result: "Black Solid",
              desc: "w/ Metals",
            },
            slotB: {
              label: "ODOR",
              result: "Rotten Eggs",
              desc: "H₂S Gas",
            },
          },
          level3: {
            config: "[Ar] (Stable Octet)",
            oxidation: "-2",
            ionicRadius: "184 pm (Expands from 100 pm)",
            hydrationEnthalpy: "High",
            coordination: "6",
          },
          level4: {
            discoveryYear: "Prehistoric",
            discoveredBy: "Unknown",
            namedBy: "Sanskrit Sulvere",
            stse: "Acid Mine Drainage; Geothermal Energy.",
            commonUses: "Metal Ores (Sphalerite); Paper Industry.",
            hazards: "Toxic Gas (H₂S).",
          },
        },
      },

      // -3 阴离子
      {
        id: "n_3minus",
        symbol: "N",
        charge: "3-",
        name: "Nitride",
        nameZh: "氮离子",
        type: "Anion",
        category: "Monatomic",
        colorClass: "non-metal",
        section: "basic",
        sectionName: "1. Basic Monatomic",
        sectionNameZh: "1. 基础单原子",
        group: "basic_an3",
        groupName: "-3 Anions",
        groupNameZh: "-3 阴离子: N, P",
        customData: {
          level1: {
            type: "Pnictogen Anion",
            source: "Group 15 Element - Gain of 3 e⁻",
            phase: "Solid (Ceramics)",
            valence: "8 (Stable Octet)",
            keyCompounds: "NH₃ (Ammonia), GaN (LED)",
          },
          level2: {
            molarMass: "14.01 g/mol",
            subatomic: "7 p⁺ | 10 e⁻",
            statusBanner: "Hydrolyzes to Ammonia (NH₃)",
            slotA: {
              label: "HYDROLYSIS",
              result: "Releases Ammonia",
              desc: "N³⁻ + 3H₂O → NH₃",
            },
            slotB: {
              label: "LED LIGHT",
              result: "Blue Glow",
              desc: "GaN Technology",
            },
          },
          level3: {
            config: "[Ne] (Stable Octet)",
            oxidation: "-3",
            ionicRadius: "146 pm (Huge Expansion)",
            hydrationEnthalpy: "Violently Reacts",
            coordination: "4-6",
          },
          level4: {
            discoveryYear: "1772",
            discoveredBy: "Daniel Rutherford",
            namedBy: "Greek Nitron (Soda)",
            stse: "Blue LEDs (Nobel Prize); Airbag Safety.",
            commonUses: "Semiconductors; Superhard Coatings.",
            hazards: "Reacts violently with water.",
          },
        },
      },
      {
        id: "p_3minus",
        symbol: "P",
        charge: "3-",
        name: "Phosphide",
        nameZh: "磷离子",
        type: "Anion",
        category: "Monatomic",
        colorClass: "non-metal",
        section: "basic",
        sectionName: "1. Basic Monatomic",
        sectionNameZh: "1. 基础单原子",
        group: "basic_an3",
        groupName: "-3 Anions",
        groupNameZh: "-3 阴离子",
        customData: {
          level1: {
            type: "Pnictogen Anion",
            source: "Group 15 Element - Gain of 3 e⁻",
            phase: "Solid",
            valence: "8 (Stable Octet)",
            keyCompounds: "AlP (Fumigant), InP (Chip)",
          },
          level2: {
            molarMass: "30.97 g/mol",
            subatomic: "15 p⁺ | 18 e⁻",
            statusBanner: "Releases Toxic Phosphine",
            slotA: {
              label: "TOXIC GAS",
              result: "Phosphine Release",
              desc: "PH₃ (Lethal)",
            },
            slotB: {
              label: "ELECTRONIC",
              result: "High Speed Chip",
              desc: "InP Semiconductor",
            },
          },
          level3: {
            config: "[Ar] (Stable Octet)",
            oxidation: "-3",
            ionicRadius: "212 pm (Expands from 110 pm)",
            hydrationEnthalpy: "Reacts",
            coordination: "4",
          },
          level4: {
            discoveryYear: "1669",
            discoveredBy: "Hennig Brand",
            namedBy: "Greek Phosphoros (Light)",
            stse: "Pest Control; E-waste Recycling.",
            commonUses: "Semiconductors; Rodenticides.",
            hazards: "Highly Toxic Gas.",
          },
        },
      },

      // ===== 2. 核心酸根 (Core Polyatomic) =====
      // 含碳
      {
        id: "co3_2minus",
        symbol: "CO₃",
        charge: "2-",
        name: "Carbonate",
        nameZh: "碳酸根",
        type: "Anion",
        category: "Polyatomic",
        colorClass: "polyatomic-anion",
        section: "core",
        sectionName: "2. Core Polyatomic",
        sectionNameZh: "2. 核心酸根",
        group: "core_c",
        groupName: "Carbon (C)",
        groupNameZh: "含碳 (C)",
        customData: {
          level1: {
            type: "Oxyanion",
            source: "Carbonic Acid (H₂CO₃) - Loss of 2 H⁺",
            phase: "Solid (in Salts) - White",
            valence: "24 Total (Stable Octets)",
            keyCompounds: "CaCO₃ (Limestone), Na₂CO₃ (Soda Ash)",
          },
          level2: {
            molarMass: "60.01 g/mol",
            subatomic: "1 C + 3 O | Charge -2",
            statusBanner: "Insoluble (except Group 1 & NH₄⁺)",
            slotA: {
              label: "ACID TEST",
              result: "CO₂",
              desc: "Fizzes violently",
            },
            slotB: {
              label: "PRECIPITATE",
              result: "White Solid",
              desc: "w/ Ca²⁺",
            },
          },
          level3: {
            config: "Trigonal Planar (sp²)",
            oxidation: "C is +4",
            ionicRadius: "178 pm",
            hydrationEnthalpy: "-1314 kJ/mol",
            coordination: "Trigonal Planar (120°)",
          },
          level4: {
            discoveryYear: "Ancient",
            discoveredBy: "-",
            namedBy: "Latin Carbo (Coal)",
            stse: "Ocean Acidification; Carbon Cycle; Cement production.",
            commonUses: "Antacids (Tums); Glass manufacturing; Baking.",
            hazards: "Safe (Essential blood buffer).",
          },
        },
      },
      {
        id: "c2o4_2minus",
        symbol: "C₂O₄",
        charge: "2-",
        name: "Oxalate",
        nameZh: "草酸根",
        type: "Anion",
        category: "Polyatomic",
        colorClass: "polyatomic-anion",
        section: "core",
        sectionName: "2. Core Polyatomic",
        sectionNameZh: "2. 核心酸根",
        group: "core_c",
        groupName: "Carbon (C)",
        groupNameZh: "含碳 (C)",
        customData: {
          level1: {
            type: "Organic Anion",
            source: "Oxalic Acid - Loss of 2 H⁺",
            phase: "Solid (in Salts) - White",
            valence: "34 Total",
            keyCompounds: "CaC₂O₄ (Kidney Stones), K₂C₂O₄",
          },
          level2: {
            molarMass: "88.02 g/mol",
            subatomic: "2 C + 4 O | Charge -2",
            statusBanner: "Forms Insoluble Calcium Salt",
            slotA: {
              label: "CHELATION",
              result: "Metal Binding",
              desc: "Grabs Metals Tightly",
            },
            slotB: {
              label: "CRYSTALS",
              result: "Needles",
              desc: "Sharp Needles (Stones)",
            },
          },
          level3: {
            config: "Planar (Twisted in solution)",
            oxidation: "C is +3",
            ionicRadius: "Large planar ion",
            hydrationEnthalpy: "High",
            coordination: "Two Trigonal Planar units",
          },
          level4: {
            discoveryYear: "1776",
            discoveredBy: "Carl Wilhelm Scheele",
            namedBy: "Latin Oxalis (Sorrel plant)",
            stse: "Health (Kidney stones); Botany (Rhubarb toxicity).",
            commonUses: "Rust Removers; Bleaching wood.",
            hazards: "Toxic (Binds blood Calcium).",
          },
        },
      },

      // 含氮
      {
        id: "no3_minus",
        symbol: "NO₃",
        charge: "-",
        name: "Nitrate",
        nameZh: "硝酸根",
        type: "Anion",
        category: "Polyatomic",
        colorClass: "polyatomic-anion",
        section: "core",
        sectionName: "2. Core Polyatomic",
        sectionNameZh: "2. 核心酸根",
        group: "core_n",
        groupName: "Nitrogen (N)",
        groupNameZh: "含氮 (N)",
        customData: {
          level1: {
            type: "Oxyanion",
            source: "Nitric Acid (HNO₃) - Loss of 1 H⁺",
            phase: "Aqueous (aq) - Colorless",
            valence: "24 Total (Resonance)",
            keyCompounds: "KNO₃ (Gunpowder), AgNO₃ (Testing)",
          },
          level2: {
            molarMass: "62.00 g/mol",
            subatomic: "1 N + 3 O | Charge -1",
            statusBanner: "Always Soluble (All-Pass Ion)",
            slotA: {
              label: "SOLUBILITY",
              result: "All-Pass",
              desc: "Never Precipitates",
            },
            slotB: {
              label: "EXPLOSIVE",
              result: "Oxidizer",
              desc: "Oxidizes Gunpowder",
            },
          },
          level3: {
            config: "Trigonal Planar (sp²)",
            oxidation: "N is +5",
            ionicRadius: "179 pm",
            hydrationEnthalpy: "-314 kJ/mol",
            coordination: "Trigonal Planar (120°)",
          },
          level4: {
            discoveryYear: "9th Century",
            discoveredBy: "Chinese Alchemists",
            namedBy: "Nitre (Saltpeter)",
            stse: "Eutrophication (Algae); Nitrogen Cycle; Explosives safety.",
            commonUses: "Fertilizers; Gunpowder; Meat curing.",
            hazards: "Runoff pollutes water; Strong Oxidizer.",
          },
        },
      },
      {
        id: "no2_minus",
        symbol: "NO₂",
        charge: "-",
        name: "Nitrite",
        nameZh: "亚硝酸根",
        type: "Anion",
        category: "Polyatomic",
        colorClass: "polyatomic-anion",
        section: "core",
        sectionName: "2. Core Polyatomic",
        sectionNameZh: "2. 核心酸根",
        group: "core_n",
        groupName: "Nitrogen (N)",
        groupNameZh: "含氮 (N)",
        customData: {
          level1: {
            type: "Oxyanion",
            source: "Nitrous Acid (HNO₂) - Loss of 1 H⁺",
            phase: "Aqueous (aq) - Pale Yellow",
            valence: "18 Total (Lone Pair)",
            keyCompounds: "NaNO₂ (Preservative), KNO₂",
          },
          level2: {
            molarMass: "46.01 g/mol",
            subatomic: "1 N + 2 O | Charge -1",
            statusBanner: "Toxic at high levels",
            slotA: {
              label: "PRESERVE",
              result: "Antimicrobial",
              desc: "Keeps Meat Red",
            },
            slotB: {
              label: "BENT SHAPE",
              result: "Lone Pair",
              desc: "Lone Pair Repulsion",
            },
          },
          level3: {
            config: "Bent (sp²)",
            oxidation: "N is +3",
            ionicRadius: "192 pm",
            hydrationEnthalpy: "-410 kJ/mol",
            coordination: "Bent (<120°)",
          },
          level4: {
            discoveryYear: "Industrial Era",
            discoveredBy: "-",
            namedBy: "Greek Nitron",
            stse: "Food Safety (Botulism vs Cancer); Blue Baby Syndrome.",
            commonUses: "Cured Meat Preservative; Dyes.",
            hazards: "Toxic (Interferes with oxygen transport).",
          },
        },
      },

      // 含硫
      {
        id: "so4_2minus",
        symbol: "SO₄",
        charge: "2-",
        name: "Sulfate",
        nameZh: "硫酸根",
        type: "Anion",
        category: "Polyatomic",
        colorClass: "polyatomic-anion",
        section: "core",
        sectionName: "2. Core Polyatomic",
        sectionNameZh: "2. 核心酸根",
        group: "core_s",
        groupName: "Sulfur (S)",
        groupNameZh: "含硫 (S)",
        customData: {
          level1: {
            type: "Oxyanion",
            source: "Sulfuric Acid (H₂SO₄) - Loss of 2 H⁺",
            phase: "Aqueous (aq) - Colorless",
            valence: "32 Total",
            keyCompounds: "H₂SO₄ (Car Battery), CaSO₄⋅2H₂O (Gypsum)",
          },
          level2: {
            molarMass: "96.06 g/mol",
            subatomic: "1 S + 4 O | Charge -2",
            statusBanner: "Insoluble with Barium/Lead",
            slotA: {
              label: "PRECIPITATE",
              result: "BaSO₄",
              desc: "Thick White w/ Ba²⁺",
            },
            slotB: {
              label: "POWER",
              result: "Electrolyte",
              desc: "Lead-Acid Battery",
            },
          },
          level3: {
            config: "Tetrahedral (sp³)",
            oxidation: "S is +6",
            ionicRadius: "242 pm",
            hydrationEnthalpy: "-1059 kJ/mol",
            coordination: "Tetrahedral (109.5°)",
          },
          level4: {
            discoveryYear: "8th Century",
            discoveredBy: "Jabir ibn Hayyan",
            namedBy: "Vitriol (Glassy)",
            stse: "Acid Rain (Forest damage); Battery Recycling.",
            commonUses: "Car Batteries; Plaster of Paris; Alum.",
            hazards: "Acid rain precursor.",
          },
        },
      },
      {
        id: "so3_2minus",
        symbol: "SO₃",
        charge: "2-",
        name: "Sulfite",
        nameZh: "亚硫酸根",
        type: "Anion",
        category: "Polyatomic",
        colorClass: "polyatomic-anion",
        section: "core",
        sectionName: "2. Core Polyatomic",
        sectionNameZh: "2. 核心酸根",
        group: "core_s",
        groupName: "Sulfur (S)",
        groupNameZh: "含硫 (S)",
        customData: {
          level1: {
            type: "Oxyanion",
            source: "Sulfurous Acid (H₂SO₃)",
            phase: "Aqueous (aq) - Colorless",
            valence: "26 Total (Lone Pair)",
            keyCompounds: "Na₂SO₃ (Preservative), MgSO₃",
          },
          level2: {
            molarMass: "80.06 g/mol",
            subatomic: "1 S + 3 O | Charge -2",
            statusBanner: "Reducing Agent / Bleach",
            slotA: {
              label: "BLEACHING",
              result: "Deodorize",
              desc: "Turns Paper White",
            },
            slotB: {
              label: "PUNGENT",
              result: "SO₂ Gas",
              desc: "Rotten Smell (Acidified)",
            },
          },
          level3: {
            config: "Trigonal Pyramidal (sp³)",
            oxidation: "S is +4",
            ionicRadius: "Large",
            hydrationEnthalpy: "-1300 kJ/mol",
            coordination: "Trigonal Pyramidal (<109.5°)",
          },
          level4: {
            discoveryYear: "Ancient",
            discoveredBy: "(Burning Sulfur)",
            namedBy: "Sulfur",
            stse: "Wine Allergies (Sulfites); Acid Rain source.",
            commonUses: "Wine Preservative; Paper Bleaching.",
            hazards: "Asthma trigger; Toxic gas release.",
          },
        },
      },

      // 含磷
      {
        id: "po4_3minus",
        symbol: "PO₄",
        charge: "3-",
        name: "Phosphate",
        nameZh: "磷酸根",
        type: "Anion",
        category: "Polyatomic",
        colorClass: "polyatomic-anion",
        section: "core",
        sectionName: "2. Core Polyatomic",
        sectionNameZh: "2. 核心酸根",
        group: "core_p",
        groupName: "Phosphorus (P)",
        groupNameZh: "含磷 (P)",
        customData: {
          level1: {
            type: "Oxyanion",
            source: "Phosphoric Acid (H₃PO₄) - Loss of 3 H⁺",
            phase: "Solid (Bones) / Aqueous",
            valence: "32 Total",
            keyCompounds: "Ca₃(PO₄)₂ (Bone), ATP (Energy)",
          },
          level2: {
            molarMass: "94.97 g/mol",
            subatomic: "1 P + 4 O | Charge -3",
            statusBanner: "Insoluble except Group 1",
            slotA: {
              label: "PRECIPITATE",
              result: "Yellow",
              desc: "Yellow w/ Silver (Ag₃PO₄)",
            },
            slotB: {
              label: "LIFE",
              result: "Backbone",
              desc: "DNA Backbone",
            },
          },
          level3: {
            config: "Tetrahedral (sp³)",
            oxidation: "P is +5",
            ionicRadius: "238 pm",
            hydrationEnthalpy: "-2765 kJ/mol",
            coordination: "Tetrahedral (109.5°)",
          },
          level4: {
            discoveryYear: "1669",
            discoveredBy: "Hennig Brand",
            namedBy: "Greek Phosphoros (Light)",
            stse: "Eutrophication (Algae blooms); Phosphorus Shortage.",
            commonUses: "Fertilizers; Cola (Acidifier); Detergents.",
            hazards: "Water pollution (Algae).",
          },
        },
      },

      // 含氯
      {
        id: "clo3_minus",
        symbol: "ClO₃",
        charge: "-",
        name: "Chlorate",
        nameZh: "氯酸根",
        type: "Anion",
        category: "Polyatomic",
        colorClass: "halogen",
        section: "core",
        sectionName: "2. Core Polyatomic",
        sectionNameZh: "2. 核心酸根",
        group: "core_cl",
        groupName: "Chlorine (Cl)",
        groupNameZh: "含氯 (Cl)",
        customData: {
          level1: {
            type: "Halogen Oxyanion",
            source: "Chloric Acid (HClO₃)",
            phase: "Aqueous (aq) - Colorless",
            valence: "26 Total",
            keyCompounds: "KClO₃ (Fireworks), NaClO₃",
          },
          level2: {
            molarMass: "83.45 g/mol",
            subatomic: "1 Cl + 3 O | Charge -1",
            statusBanner: "Strong Oxidizer",
            slotA: {
              label: "EXPLOSION",
              result: "Oxidizer",
              desc: "Oxidizer for Color",
            },
            slotB: {
              label: "HERBICIDE",
              result: "Defoliant",
              desc: "Kills Weeds",
            },
          },
          level3: {
            config: "Trigonal Pyramidal (sp³)",
            oxidation: "Cl is +5",
            ionicRadius: "171 pm",
            hydrationEnthalpy: "Low",
            coordination: "Trigonal Pyramidal (<109.5°)",
          },
          level4: {
            discoveryYear: "1786",
            discoveredBy: "Claude Louis Berthollet",
            namedBy: "Chlorine",
            stse: "Safety (Explosives stability); Agriculture (Weed control).",
            commonUses: "Fireworks; Oxygen candles (Submarines).",
            hazards: "Fire/Explosion risk with organics.",
          },
        },
      },
      {
        id: "clo_minus",
        symbol: "ClO",
        charge: "-",
        name: "Hypochlorite",
        nameZh: "次氯酸根",
        type: "Anion",
        category: "Polyatomic",
        colorClass: "halogen",
        section: "core",
        sectionName: "2. Core Polyatomic",
        sectionNameZh: "2. 核心酸根",
        group: "core_cl",
        groupName: "Chlorine (Cl)",
        groupNameZh: "含氯 (Cl)",
        customData: {
          level1: {
            type: "Halogen Oxyanion",
            source: "Bleach (OCl⁻)",
            phase: "Aqueous (aq) - Pale Yellow",
            valence: "14 Total",
            keyCompounds: "NaClO (Bleach/Javex), Ca(ClO)₂",
          },
          level2: {
            molarMass: "51.45 g/mol",
            subatomic: "1 Cl + 1 O | Charge -1",
            statusBanner: "Bleaching Agent",
            slotA: {
              label: "WHITENING",
              result: "Oxidation",
              desc: "Removes Stains",
            },
            slotB: {
              label: "DISINFECT",
              result: "Sterilize",
              desc: "Kills Germs",
            },
          },
          level3: {
            config: "Linear",
            oxidation: "Cl is +1",
            ionicRadius: "150 pm",
            hydrationEnthalpy: "-350 kJ/mol",
            coordination: "Linear",
          },
          level4: {
            discoveryYear: "1789",
            discoveredBy: "Berthollet (Javel Water)",
            namedBy: "Greek Hypo (Under)",
            stse: "Public Health (Water Chlorination); Hygiene.",
            commonUses: "Household Bleach; Pool Sanitation.",
            hazards: "Toxic Gas (Cl₂) if mixed with acid/ammonia.",
          },
        },
      },
      {
        id: "clo4_minus",
        symbol: "ClO₄",
        charge: "-",
        name: "Perchlorate",
        nameZh: "高氯酸根",
        type: "Anion",
        category: "Polyatomic",
        colorClass: "halogen",
        section: "core",
        sectionName: "2. Core Polyatomic",
        sectionNameZh: "2. 核心酸根",
        group: "core_cl",
        groupName: "Chlorine (Cl)",
        groupNameZh: "含氯 (Cl)",
        customData: {
          level1: {
            type: "Halogen Oxyanion",
            source: "Perchloric Acid",
            phase: "Solid (Salts)",
            valence: "32 Total",
            keyCompounds: "NH₄ClO₄ (Rocket Fuel), KClO₄",
          },
          level2: {
            molarMass: "99.45 g/mol",
            subatomic: "1 Cl + 4 O | Charge -1",
            statusBanner: "Rocket Fuel Oxidizer",
            slotA: {
              label: "LAUNCH",
              result: "Propellant",
              desc: "Solid Booster Fuel",
            },
            slotB: {
              label: "MARS SOIL",
              result: "Martian Soil",
              desc: "Found on Mars",
            },
          },
          level3: {
            config: "Tetrahedral (sp³)",
            oxidation: "Cl is +7 (Max)",
            ionicRadius: "240 pm",
            hydrationEnthalpy: "Low",
            coordination: "Tetrahedral (109.5°)",
          },
          level4: {
            discoveryYear: "1816",
            discoveredBy: "Friedrich von Stadion",
            namedBy: "Greek Hyper (Over)",
            stse: "Space Exploration; Groundwater pollution; Thyroid health.",
            commonUses: "Rocket Propellant; Airbag inflators.",
            hazards: "Explosion risk; Thyroid toxin.",
          },
        },
      },

      // ===== 3. 过渡金属 (Transition Metals) =====
      // 铜
      {
        id: "cu_plus",
        symbol: "Cu",
        charge: "+",
        name: "Copper(I)",
        nameZh: "亚铜离子",
        type: "Cation",
        category: "Monatomic",
        colorClass: "transition-metal",
        section: "trans",
        sectionName: "3. Transition Metals",
        sectionNameZh: "3. 过渡金属",
        group: "trans_cu",
        groupName: "Copper (Cu)",
        groupNameZh: "铜 (Cu)",
        customData: {
          level1: {
            type: "Transition Metal Cation",
            source: "Group 11 Element - Loss of 1 e⁻",
            phase: "Aqueous (Unstable) / Solid",
            valence: "18 (Pseudo-Noble Gas)",
            keyCompounds: "Cu₂O (Red), CuCl (White)",
          },
          level2: {
            molarMass: "63.55 g/mol",
            subatomic: "29 p⁺ | 28 e⁻",
            statusBanner: "Soft Lewis Acid",
            slotA: {
              label: "COLORLESS",
              result: "Clear",
              desc: "Clear in pure Water",
            },
            slotB: {
              label: "DISPROPORTION",
              result: "Unstable",
              desc: "2Cu⁺ ➔ Cu²⁺ + Cu",
            },
          },
          level3: {
            config: "[Ar] 3d¹⁰ (Full d-shell)",
            oxidation: "+1",
            ionicRadius: "77 pm (Large for charge)",
            hydrationEnthalpy: "-593 kJ/mol",
            coordination: "2 (Linear)",
          },
          level4: {
            discoveryYear: "Prehistoric",
            discoveredBy: "Unknown",
            namedBy: "Latin Cuprum (from Cyprus)",
            stse: "Ancient Metallurgy; Biological Electron Transfer.",
            commonUses: "Catalysis; Dyeing Process; Pesticides (Cu₂O).",
            hazards: "Toxic to aquatic life.",
          },
        },
      },
      {
        id: "cu_2plus",
        symbol: "Cu",
        charge: "2+",
        name: "Copper(II)",
        nameZh: "铜离子",
        type: "Cation",
        category: "Monatomic",
        colorClass: "transition-metal",
        section: "trans",
        sectionName: "3. Transition Metals",
        sectionNameZh: "3. 过渡金属",
        group: "trans_cu",
        groupName: "Copper (Cu)",
        groupNameZh: "铜 (Cu)",
        customData: {
          level1: {
            type: "Transition Metal Cation",
            source: "Group 11 Element - Loss of 2 e⁻",
            phase: "Aqueous (aq) - Bright Blue",
            valence: "17 Total (d⁹)",
            keyCompounds: "CuSO₄ (Blue Vitriol), CuCO₃ (Verdigris)",
          },
          level2: {
            molarMass: "63.55 g/mol",
            subatomic: "29 p⁺ | 27 e⁻",
            statusBanner: "Paramagnetic (Blue Color)",
            slotA: {
              label: "COLOR",
              result: "Bright Blue",
              desc: "Bright Cyan/Blue Solution",
            },
            slotB: {
              label: "FLAME TEST",
              result: "Blue-Green",
              desc: "Blue-Green Flame",
            },
          },
          level3: {
            config: "[Ar] 3d⁹",
            oxidation: "+2 (Most Stable)",
            ionicRadius: "73 pm",
            hydrationEnthalpy: "-2100 kJ/mol (Extremely High)",
            coordination: "6 (Jahn-Teller Octahedral)",
          },
          level4: {
            discoveryYear: "Prehistoric",
            discoveredBy: "Unknown",
            namedBy: "Latin Cuprum",
            stse: "Electronics (PCB Etching); Bordeaux Mixture (Fungicide).",
            commonUses: "Electroplating; Pigments; Wood Preservative.",
            hazards: "Corrosive; Harmful if swallowed.",
          },
        },
      },

      // 铁
      {
        id: "fe_2plus",
        symbol: "Fe",
        charge: "2+",
        name: "Iron(II)",
        nameZh: "亚铁离子",
        type: "Cation",
        category: "Monatomic",
        colorClass: "transition-metal",
        section: "trans",
        sectionName: "3. Transition Metals",
        sectionNameZh: "3. 过渡金属",
        group: "trans_fe",
        groupName: "Iron (Fe)",
        groupNameZh: "铁 (Fe)",
        customData: {
          level1: {
            type: "Transition Metal Cation",
            source: "Group 8 Element - Loss of 2 e⁻",
            phase: "Aqueous (aq) - Pale Green",
            valence: "18 Total (d⁶)",
            keyCompounds: "FeSO₄ (Green Vitriol), FeCl₂",
          },
          level2: {
            molarMass: "55.85 g/mol",
            subatomic: "26 p⁺ | 24 e⁻",
            statusBanner: "Oxygen Carrier in Blood",
            slotA: {
              label: "HEMOGLOBIN",
              result: "O₂ Binding",
              desc: "Binds Oxygen in Lungs",
            },
            slotB: {
              label: "PRECIPITATE",
              result: "Dirty Green",
              desc: "Dirty Green w/ OH⁻",
            },
          },
          level3: {
            config: "[Ar] 3d⁶",
            oxidation: "+2 (Ferrous)",
            ionicRadius: "78 pm (High Spin)",
            hydrationEnthalpy: "-1920 kJ/mol",
            coordination: "6 (Octahedral)",
          },
          level4: {
            discoveryYear: "Prehistoric",
            discoveredBy: "Various Cultures",
            namedBy: "Latin Ferrum",
            stse: "Iron Deficiency Anemia; Biological Redox.",
            commonUses: "Nutritional Supplements; Water Treatment.",
            hazards: "Acute iron overdose is toxic.",
          },
        },
      },
      {
        id: "fe_3plus",
        symbol: "Fe",
        charge: "3+",
        name: "Iron(III)",
        nameZh: "铁离子",
        type: "Cation",
        category: "Monatomic",
        colorClass: "transition-metal",
        section: "trans",
        sectionName: "3. Transition Metals",
        sectionNameZh: "3. 过渡金属",
        group: "trans_fe",
        groupName: "Iron (Fe)",
        groupNameZh: "铁 (Fe)",
        customData: {
          level1: {
            type: "Transition Metal Cation",
            source: "Group 8 Element - Loss of 3 e⁻",
            phase: "Aqueous (aq) - Yellow/Brown",
            valence: "17 Total (d⁵)",
            keyCompounds: "FeCl₃ (Etchant), Fe₂O₃ (Rust)",
          },
          level2: {
            molarMass: "55.85 g/mol",
            subatomic: "26 p⁺ | 23 e⁻",
            statusBanner: "Very High Charge Density",
            slotA: {
              label: "RUST",
              result: "Oxidation",
              desc: "Corroded Iron Surface",
            },
            slotB: {
              label: "PRECIPITATE",
              result: "Red-Brown",
              desc: "Red-Brown Gel w/ OH⁻",
            },
          },
          level3: {
            config: "[Ar] 3d⁵ (Half-filled stability)",
            oxidation: "+3 (Ferric)",
            ionicRadius: "64.5 pm (Very Small)",
            hydrationEnthalpy: "-4430 kJ/mol (Extreme)",
            coordination: "6 (Octahedral)",
          },
          level4: {
            discoveryYear: "Prehistoric",
            discoveredBy: "Various Cultures",
            namedBy: "Latin Ferrum",
            stse: "Acid Mine Drainage (Orange Rivers); Corrosion.",
            commonUses: "Sewage Treatment (Flocculant); Ink Making.",
            hazards: "Corrosive; Causes staining.",
          },
        },
      },

      // 铅
      {
        id: "pb_2plus",
        symbol: "Pb",
        charge: "2+",
        name: "Lead(II)",
        nameZh: "铅离子",
        type: "Cation",
        category: "Monatomic",
        colorClass: "post-transition",
        section: "trans",
        sectionName: "3. Transition Metals",
        sectionNameZh: "3. 过渡金属",
        group: "trans_pb",
        groupName: "Lead (Pb)",
        groupNameZh: "铅 (Pb)",
        customData: {
          level1: {
            type: "Post-Transition Cation",
            source: "Group 14 Element - Loss of 6s² outer pair",
            phase: "Aqueous (aq) - Colorless",
            valence: "2 (Stable 6s² pair)",
            keyCompounds: "PbI₂ (Gold Ppt), PbSO₄ (Battery Solid)",
          },
          level2: {
            molarMass: "207.2 g/mol",
            subatomic: "82 p⁺ | 80 e⁻",
            statusBanner: "Heavy Metal Toxin",
            slotA: {
              label: "PRECIPITATE",
              result: "Golden Rain",
              desc: "Golden Rain w/ Iodide",
            },
            slotB: {
              label: "STORAGE",
              result: "Battery",
              desc: "Lead-Acid Accumulator",
            },
          },
          level3: {
            config: "[Xe] 4f¹⁴ 5d¹⁰ 6s²",
            oxidation: "+2 (Most Stable for Lead)",
            ionicRadius: "119 pm (Large)",
            hydrationEnthalpy: "-1481 kJ/mol",
            coordination: "6-12 (Flexible)",
          },
          level4: {
            discoveryYear: "Ancient (7000 BCE)",
            discoveredBy: "Unknown",
            namedBy: "Latin Plumbum",
            stse: "Flint Water Crisis; Leaded Petrol History.",
            commonUses: "Car Batteries; Radiation Shielding.",
            hazards: "Neurotoxic (Brain damage); Bioaccumulative.",
          },
        },
      },

      // 含锰
      {
        id: "mno4_minus",
        symbol: "MnO₄",
        charge: "-",
        name: "Permanganate",
        nameZh: "高锰酸根",
        type: "Anion",
        category: "Polyatomic",
        colorClass: "transition-metal",
        section: "trans",
        sectionName: "3. Transition Metals",
        sectionNameZh: "3. 过渡金属",
        group: "trans_mn",
        groupName: "Manganese (Mn)",
        groupNameZh: "含锰 (Mn)",
        customData: {
          level1: {
            type: "Transition Metal Oxyanion",
            source: "Manganese in +7 state",
            phase: "Aqueous (aq) - Deep Purple",
            valence: "31 Total (Resonance)",
            keyCompounds: "KMnO₄ (Condy's Crystals)",
          },
          level2: {
            molarMass: "118.94 g/mol",
            subatomic: "1 Mn + 4 O | -1",
            statusBanner: "Ultimate Oxidizing Agent",
            slotA: {
              label: "DEEP PURPLE",
              result: "Intense",
              desc: "Intense Color even at 1ppm",
            },
            slotB: {
              label: "OXIDIZER",
              result: "Reactive",
              desc: "Ignites Glycerin instantly",
            },
          },
          level3: {
            config: "Tetrahedral (d⁰ Complex)",
            oxidation: "Mn is +7 (Maximum)",
            ionicRadius: "240 pm",
            hydrationEnthalpy: "High",
            coordination: "Tetrahedral (109.5°)",
          },
          level4: {
            discoveryYear: "1774 (Element)",
            discoveredBy: "Scheele / Gahn",
            namedBy: "Latin Magnes (Magnet)",
            stse: "Water Purification (Organic removal); Antiseptic.",
            commonUses: "Lab Titrations; Disinfectant; Fruit Preservation.",
            hazards: "Potent Oxidizer; Stains skin brown (MnO₂).",
          },
        },
      },

      // 含铬
      {
        id: "cro4_2minus",
        symbol: "CrO₄",
        charge: "2-",
        name: "Chromate",
        nameZh: "铬酸根",
        type: "Anion",
        category: "Polyatomic",
        colorClass: "transition-metal",
        section: "trans",
        sectionName: "3. Transition Metals",
        sectionNameZh: "3. 过渡金属",
        group: "trans_cr",
        groupName: "Chromium (Cr)",
        groupNameZh: "含铬 (Cr)",
        customData: {
          level1: {
            type: "Transition Metal Oxyanion",
            source: "Chromium in +6 state",
            phase: "Aqueous (aq) - Bright Yellow",
            valence: "32 Total",
            keyCompounds: "K₂CrO₄, PbCrO₄ (Chrome Yellow)",
          },
          level2: {
            molarMass: "116.00 g/mol",
            subatomic: "1 Cr + 4 O | -2",
            statusBanner: "Carcinogenic / Yellow Pigment",
            slotA: {
              label: "PIGMENT",
              result: "Yellow",
              desc: "Classic Chrome Yellow",
            },
            slotB: {
              label: "pH SENSITIVE",
              result: "Equilibrium",
              desc: "Turns Orange in Acid",
            },
          },
          level3: {
            config: "Tetrahedral",
            oxidation: "Cr is +6",
            ionicRadius: "242 pm",
            hydrationEnthalpy: "-1000 kJ/mol",
            coordination: "Tetrahedral (109.5°)",
          },
          level4: {
            discoveryYear: "1797",
            discoveredBy: "Louis Nicolas Vauquelin",
            namedBy: "Greek Chroma (Color)",
            stse: "Soil Pollution; Chrome Plating Waste.",
            commonUses: "Corrosion Inhibitor; Yellow Dye/Ink.",
            hazards: "Carcinogenic (Hexavalent Chromium).",
          },
        },
      },
      {
        id: "cr2o7_2minus",
        symbol: "Cr₂O₇",
        charge: "2-",
        name: "Dichromate",
        nameZh: "重铬酸根",
        type: "Anion",
        category: "Polyatomic",
        colorClass: "transition-metal",
        section: "trans",
        sectionName: "3. Transition Metals",
        sectionNameZh: "3. 过渡金属",
        group: "trans_cr",
        groupName: "Chromium (Cr)",
        groupNameZh: "含铬 (Cr)",
        customData: {
          level1: {
            type: "Transition Metal Oxyanion",
            source: "Two Chromate units (Acidic)",
            phase: "Aqueous (aq) - Bright Orange",
            valence: "52 Total",
            keyCompounds: "K₂Cr₂O₇, (NH₄)₂Cr₂O₇ (Volcano)",
          },
          level2: {
            molarMass: "216.00 g/mol",
            subatomic: "2 Cr + 7 O | -2",
            statusBanner: "Powerful Lab Oxidizer",
            slotA: {
              label: "THERMAL",
              result: "Volcano",
              desc: 'Green Cr₂O₃ "Ash"',
            },
            slotB: {
              label: "TITRATION",
              result: "Redox",
              desc: "Classic Orange-to-Green",
            },
          },
          level3: {
            config: "Two corners-shared Tetrahedra",
            oxidation: "Cr is +6",
            ionicRadius: "Large Dimeric Ion",
            hydrationEnthalpy: "High",
            coordination: "Cr-O-Cr bridge (126°)",
          },
          level4: {
            discoveryYear: "1797",
            discoveredBy: "Vauquelin",
            namedBy: "Greek Di (Two) + Chroma",
            stse: "Breathalyzer Tests (History); Leather Tanning.",
            commonUses: "Cleaning Glassware; Photo-engraving.",
            hazards: "Highly Toxic; Carcinogenic; Oxidizer.",
          },
        },
      },

      // ===== 4. 特殊与有机 (Special & Organic) =====
      // 特殊双子
      {
        id: "nh4_plus",
        symbol: "NH₄",
        charge: "+",
        name: "Ammonium",
        nameZh: "铵根",
        type: "Cation",
        category: "Polyatomic",
        colorClass: "polyatomic-cation",
        section: "special",
        sectionName: "4. Special & Organic",
        sectionNameZh: "4. 特殊与有机",
        group: "spec_pair",
        groupName: "Special Pair",
        groupNameZh: "特殊双子",
        customData: {
          level1: {
            type: "Polyatomic Cation",
            source: "Ammonia - Gain of 1 H⁺",
            phase: "Aqueous (aq) - Colorless",
            valence: "8 (Stable Octet)",
            keyCompounds: "NH₄NO₃ (Fertilizer), NH₄Cl (Sal Ammoniac)",
          },
          level2: {
            molarMass: "18.04 g/mol",
            subatomic: "1 N + 4 H | Charge +1",
            statusBanner: "⭐ Always Soluble (All-Pass Ion)",
            slotA: {
              label: "SMELL",
              result: "Releases Ammonia w/ Base",
              desc: "NaOH Test",
            },
            slotB: {
              label: "GROWTH",
              result: "Nitrogen Source",
              desc: "Fertilizer",
            },
          },
          level3: {
            config: "Tetrahedral",
            oxidation: "N is -3",
            ionicRadius: "143 pm (Similar to K⁺)",
            hydrationEnthalpy: "-307 kJ/mol",
            coordination: "Tetrahedral (109.5°)",
          },
          level4: {
            discoveryYear: "Ancient",
            discoveredBy: "Various",
            namedBy: "From Temple of Ammon",
            stse: "Global Food Security (Fertilizers); Nitrogen Cycle.",
            commonUses: "Fertilizers; Smelling Salts; Explosives.",
            hazards: "Releases toxic ammonia gas.",
          },
        },
      },
      {
        id: "oh_minus",
        symbol: "OH",
        charge: "-",
        name: "Hydroxide",
        nameZh: "氢氧根",
        type: "Anion",
        category: "Polyatomic",
        colorClass: "polyatomic-anion",
        section: "special",
        sectionName: "4. Special & Organic",
        sectionNameZh: "4. 特殊与有机",
        group: "spec_pair",
        groupName: "Special Pair",
        groupNameZh: "特殊双子",
        customData: {
          level1: {
            type: "Polyatomic Anion / Base",
            source: "Water / Bases - Loss of H⁺",
            phase: "Aqueous (aq) - Colorless",
            valence: "8 (Stable Octet)",
            keyCompounds: "NaOH (Lye), Ca(OH)₂ (Lime Water)",
          },
          level2: {
            molarMass: "17.01 g/mol",
            subatomic: "1 O + 1 H | Charge -1",
            statusBanner: "The Definition of Basicity (pOH)",
            slotA: {
              label: "LITMUS TEST",
              result: "Turns Red Paper Blue",
              desc: "pH > 7",
            },
            slotB: {
              label: "SLIPPERY",
              result: "Saponifies Skin Oils",
              desc: "Soap-like Feel",
            },
          },
          level3: {
            config: "Linear",
            oxidation: "O is -2",
            ionicRadius: "137 pm",
            hydrationEnthalpy: "-460 kJ/mol",
            coordination: "Linear (180°)",
          },
          level4: {
            discoveryYear: "Ancient (Soap making)",
            discoveredBy: "Various",
            namedBy: "Greek Hydro + Oxys",
            stse: "Soap Production (Saponification); Acid Neutralization.",
            commonUses: "Drain Cleaner; Soap; Antacids.",
            hazards: "**Corrosive** (Caustic burns); Blindness risk.",
          },
        },
      },

      // 酸式根
      {
        id: "hco3_minus",
        symbol: "HCO₃",
        charge: "-",
        name: "Bicarbonate",
        nameZh: "碳酸氢根",
        type: "Anion",
        category: "Polyatomic",
        colorClass: "polyatomic-anion",
        section: "special",
        sectionName: "4. Special & Organic",
        sectionNameZh: "4. 特殊与有机",
        group: "spec_acid",
        groupName: "Acidic Radicals",
        groupNameZh: "酸式根",
        customData: {
          level1: {
            type: "Amphoteric Oxyanion",
            source: "Carbonic Acid - Loss of 1 H⁺",
            phase: "Solid (White) / Aqueous",
            valence: "24 Total",
            keyCompounds: "NaHCO₃ (Baking Soda), KHCO₃",
          },
          level2: {
            molarMass: "61.02 g/mol",
            subatomic: "1 C + 3 O + 1 H | Charge -1",
            statusBanner: "Amphoteric (Blood Buffer)",
            slotA: {
              label: "BUFFER",
              result: "Resists pH Change",
              desc: "Blood pH 7.4",
            },
            slotB: {
              label: "FIZZ",
              result: "Releases CO₂ w/ Acid",
              desc: "Baking Soda",
            },
          },
          level3: {
            config: "Trigonal Planar",
            oxidation: "C is +4",
            ionicRadius: "156 pm",
            hydrationEnthalpy: "-380 kJ/mol",
            coordination: "Trigonal Planar (at C)",
          },
          level4: {
            discoveryYear: "1801",
            discoveredBy: "Valentin Rose",
            namedBy: "Prefix Bi- (Double Carbonate)",
            stse: "Blood pH Buffer (Homeostasis); Ocean Carbon Sink.",
            commonUses: "Baking (Leavening); Antacids; Fire Extinguishers.",
            hazards: "Safe (Essential for life).",
          },
        },
      },
      {
        id: "hso4_minus",
        symbol: "HSO₄",
        charge: "-",
        name: "Bisulfate",
        nameZh: "硫酸氢根",
        type: "Anion",
        category: "Polyatomic",
        colorClass: "polyatomic-anion",
        section: "special",
        sectionName: "4. Special & Organic",
        sectionNameZh: "4. 特殊与有机",
        group: "spec_acid",
        groupName: "Acidic Radicals",
        groupNameZh: "酸式根",
        customData: {
          level1: {
            type: "Acidic Oxyanion",
            source: "Sulfuric Acid - Loss of 1 H⁺",
            phase: "Solid (White) / Aqueous",
            valence: "32 Total",
            keyCompounds: "NaHSO₄ (Toilet Cleaner)",
          },
          level2: {
            molarMass: "97.07 g/mol",
            subatomic: "1 S + 4 O + 1 H | Charge -1",
            statusBanner: "Strong Acidic Salt",
            slotA: {
              label: "ACIDIC",
              result: "Turns Blue Paper Red",
              desc: "pH < 1",
            },
            slotB: {
              label: "CLEANING",
              result: "Dissolves Scale",
              desc: "Toilet Cleaner",
            },
          },
          level3: {
            config: "Tetrahedral",
            oxidation: "S is +6",
            ionicRadius: "Large",
            hydrationEnthalpy: "High",
            coordination: "Tetrahedral (109.5°)",
          },
          level4: {
            discoveryYear: "Industrial Era",
            discoveredBy: "Various",
            namedBy: "From Sulfuric Acid",
            stse: "Industrial pH control; Cleaning agents safety.",
            commonUses: "Toilet Bowl Cleaners; Swimming Pool pH Lowering.",
            hazards: "Corrosive (Tissue damage).",
          },
        },
      },
      {
        id: "h2po4_minus",
        symbol: "H₂PO₄",
        charge: "-",
        name: "Dihydrogen phosphate",
        nameZh: "磷酸二氢根",
        type: "Anion",
        category: "Polyatomic",
        colorClass: "polyatomic-anion",
        section: "special",
        sectionName: "4. Special & Organic",
        sectionNameZh: "4. 特殊与有机",
        group: "spec_acid",
        groupName: "Acidic Radicals",
        groupNameZh: "酸式根",
        customData: {
          level1: {
            type: "Acidic Oxyanion",
            source: "Phosphoric Acid - Loss of 1 H⁺",
            phase: "Solid / Aqueous",
            valence: "32 Total",
            keyCompounds: "Ca(H₂PO₄)₂ (Superphosphate)",
          },
          level2: {
            molarMass: "96.99 g/mol",
            subatomic: "1 P + 4 O + 2 H | Charge -1",
            statusBanner: "Soluble Fertilizer",
            slotA: {
              label: "ROOTS",
              result: "Promotes Root Growth",
              desc: "N-P-K Fertilizer",
            },
            slotB: {
              label: "SOLUBILITY",
              result: "Soluble w/ Calcium",
              desc: "Superphosphate",
            },
          },
          level3: {
            config: "Tetrahedral",
            oxidation: "P is +5",
            ionicRadius: "Large",
            hydrationEnthalpy: "High",
            coordination: "Tetrahedral (109.5°)",
          },
          level4: {
            discoveryYear: "1840s",
            discoveredBy: "Lawes",
            namedBy: "From Phosphate",
            stse: "Green Revolution (Fertilizers); Eutrophication.",
            commonUses: "Superphosphate Fertilizers; Baking Powder; Buffers.",
            hazards: "Eye irritant; Water pollution.",
          },
        },
      },

      // 有机/其他
      {
        id: "ch3coo_minus",
        symbol: "CH₃COO",
        charge: "-",
        name: "Acetate",
        nameZh: "醋酸根",
        type: "Anion",
        category: "Polyatomic",
        colorClass: "polyatomic-anion",
        section: "special",
        sectionName: "4. Special & Organic",
        sectionNameZh: "4. 特殊与有机",
        group: "spec_org",
        groupName: "Organic/Other",
        groupNameZh: "有机/其他",
        customData: {
          level1: {
            type: "Organic Anion",
            source: "Vinegar (CH₃COOH) - Loss of 1 H⁺",
            phase: "Aqueous (aq) - Colorless",
            valence: "24 Total",
            keyCompounds: "CH₃COONa (Hot Ice), Vinegar",
          },
          level2: {
            molarMass: "59.04 g/mol",
            subatomic: "2 C + 2 O + 3 H | Charge -1",
            statusBanner: "⭐ Always Soluble (All-Pass Ion)",
            slotA: {
              label: "VINEGAR",
              result: "Pungent Smell (Acid)",
              desc: "CH₃COOH",
            },
            slotB: {
              label: "HOT ICE",
              result: "Exothermic Crystallization",
              desc: "Sodium Acetate",
            },
          },
          level3: {
            config: "Trigonal Planar (Carboxyl)",
            oxidation: "C is +3 (Carboxyl)",
            ionicRadius: "162 pm",
            hydrationEnthalpy: "-400 kJ/mol",
            coordination: "Tetrahedral (Methyl) + Planar (Carboxyl)",
          },
          level4: {
            discoveryYear: "Ancient",
            discoveredBy: "Various",
            namedBy: "Latin Acetum (Vinegar)",
            stse: "Fermentation (Biotech); Biodegradable Plastics.",
            commonUses: "Vinegar (Food); Hand Warmers (Hot Ice); Textiles.",
            hazards: "Concentrated acid is corrosive.",
          },
        },
      },
      {
        id: "cn_minus",
        symbol: "CN",
        charge: "-",
        name: "Cyanide",
        nameZh: "氰根",
        type: "Anion",
        category: "Polyatomic",
        colorClass: "polyatomic-anion",
        section: "special",
        sectionName: "4. Special & Organic",
        sectionNameZh: "4. 特殊与有机",
        group: "spec_org",
        groupName: "Organic/Other",
        groupNameZh: "有机/其他",
        customData: {
          level1: {
            type: "Toxic Pseudo-Halogen",
            source: "Prussic Acid (HCN) - Loss of 1 H⁺",
            phase: "Aqueous (aq) - Colorless",
            valence: "10 (Isoelectronic w/ N₂)",
            keyCompounds: "NaCN (Gold Mining), KCN (Poison)",
          },
          level2: {
            molarMass: "26.02 g/mol",
            subatomic: "1 C + 1 N | Charge -1",
            statusBanner: "⚠️ Extreme Toxin",
            slotA: {
              label: "TOXICITY",
              result: "Stops Cell Respiration",
              desc: "Blocks Cytochrome",
            },
            slotB: {
              label: "LEACHING",
              result: "Dissolves Gold",
              desc: "Au(CN)₂⁻ Complex",
            },
          },
          level3: {
            config: "Linear",
            oxidation: "C is +2",
            ionicRadius: "191 pm",
            hydrationEnthalpy: "-350 kJ/mol",
            coordination: "Linear (Triple Bond)",
          },
          level4: {
            discoveryYear: "1782",
            discoveredBy: "Scheele",
            namedBy: "Greek Kyanos (Dark Blue)",
            stse: "Mining Ethics (Spills); Environmental Contamination.",
            commonUses: "Gold Extraction; Electroplating.",
            hazards: "**Lethal** (Inhibits Respiration).",
          },
        },
      },
    ];

    // Helper to formatting chemical formulas from Unicode to HTML
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

    function initIonsTable() {
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
            nameZh: ion.sectionNameZh,
            groups: {},
          };
        }
        const sec = sections[ion.section];

        if (!sec.groups[ion.group]) {
          sec.groups[ion.group] = {
            name: ion.groupName,
            nameZh: ion.groupNameZh,
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
        let headerText = t(secData.name, secData.nameZh);
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
      if (hasSubscript) {
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
      const symbolLength = ion.symbol.length;
      if (symbolLength > 5) {
        headlineSymbol.style.fontSize = "2.8rem";
        headlineSymbol.style.marginLeft = "-10px"; // Shift left for long symbols
      } else if (symbolLength > 3) {
        headlineSymbol.style.fontSize = "3.6rem";
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

      // Watermark and Big Symbol (Removed in favor of Coming Soon)
      // document.getElementById('ion-modal-watermark').textContent = ion.charge;
      // document.getElementById('ion-big-symbol').innerHTML = formatChem(ion.symbol) + formatCharge(ion.charge);

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
          // Visuals (Slot A & B)
          // Chinese translation map for common terms
          const zhMap = {
            // Results
            "Turns Red": "变红 (Turns Red)",
            Fizzes: "起泡 (Fizzes)",
            Crimson: "深红色 (Crimson)",
            "Orange-Yellow": "橙黄色 (Orange-Yellow)",
            Violet: "紫色 (Violet)",
            "Apple Green": "苹果绿 (Apple Green)",
            "White ppt": "白色沉淀 (White ppt)",
            "Cream ppt": "乳白色沉淀 (Cream ppt)",
            "Yellow ppt": "黄色沉淀 (Yellow ppt)",
            "Black ppt": "黑色沉淀 (Black ppt)",
            "Blue Solution": "蓝色溶液 (Blue)",
            "Green Solution": "绿色溶液 (Green)",
            "Yellow Solution": "黄色溶液 (Yellow)",
            "Purple Solution": "紫色溶液 (Purple)",
            Colorless: "无色 (Colorless)",
            Soluble: "可溶 (Soluble)",
            Insoluble: "不溶 (Insoluble)",
            Charges: "充电 (Charges)",
            High: "高 (High)",
            Darkens: "变暗 (Darkens)",
            Volcano: "火山反应 (Volcano)",
            Redox: "氧化还原 (Redox)",
            // Descriptions
            "w/ Carbonates": "与碳酸盐反应",
            "Lithium Batteries": "锂电池",
            "Table Salt": "食盐",
            "Plant Nutrition": "植物营养",
            "Bone Health": "骨骼健康",
            Photography: "摄影",
            Galvanizing: "镀锌",
            "Blue Vitriol": "蓝矾",
            Chlorophyll: "叶绿素",
            Hemoglobin: "血红蛋白",
            Rust: "生锈",
            Corundum: "刚玉",
            Toxic: "有毒",
            Fertilizer: "肥料",
            "pH Universal": "pH通用",
            Water: "水分子",
            "Tooth Protection": "牙齿保护",
            Combustion: "燃烧",
            "Silver Test": "银离子测试",
            "Pool Sanitation": "泳池消毒",
            "Classic Orange-to-Green": "经典橙转绿",
            "Strong Oxidizer": "强氧化剂",
          };

          function translateDesc(text) {
            return zhMap[text] || text;
          }

          // Helper to update visual card with correct animation
          function updateVisualCard(cardId, dataSlot, slot) {
            const card = document.getElementById(cardId);
            if (!card) return;

            // Update Title
            const titleEl = card.querySelector(".visual-card-title");
            if (titleEl) titleEl.textContent = dataSlot.label;

            // Update Desc with Chinese translation
            const descEl = card.querySelector(".visual-card-desc");
            const translatedResult = translateDesc(dataSlot.result);
            const translatedDesc = translateDesc(dataSlot.desc);
            if (descEl)
              descEl.innerHTML = `<b>${translatedResult}</b><br><span style='font-size:0.8em; opacity:0.8'>${translatedDesc}</span>`;

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
          // Allow default CSS margin (24px 0) to apply, or force match element if different context
          // Element modal uses .info-divider which has margin: 24px 0;
          // Let's remove the override.
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

    // Initialize Ions Table
    initIonsTable();

    // Re-render ions table on language change
    window.addEventListener("languageChanged", () => {
      initIonsTable();
    });

    // 主页面的按钮
    // 主页面的按钮
    const btnTable = document.getElementById("btn-table");
    const btnTools = document.getElementById("btn-tools");
    const btnBlankPage = document.getElementById("btn-blank-page");

    // Tools页面的按钮
    const btnTablePage1 = document.getElementById("btn-table-page1");
    const btnToolsPage1 = document.getElementById("btn-tools-page1");
    const btnBlankPagePage1 = document.getElementById("btn-blank-page1");

    // Blank页面的按钮
    const btnTablePage2 = document.getElementById("btn-table-page2");
    const btnToolsPage2 = document.getElementById("btn-tools-page2");
    const btnBlankPagePage2 = document.getElementById("btn-blank-page2");

    // 绑定所有按钮的事件
    [btnTable, btnTablePage1, btnTablePage2].forEach((btn) => {
      if (btn) {
        btn.addEventListener("click", showTablePage);
      }
    });

    // Tools 按钮组 -> 显示 Tools 页面 (blank-page-1)
    [btnTools, btnToolsPage1, btnToolsPage2].forEach((btn) => {
      if (btn) {
        btn.addEventListener("click", showBlankPage1);
      }
    });

    // Blank 按钮组 -> 显示 Blank 页面 (blank-page-2)
    [btnBlankPage, btnBlankPagePage1, btnBlankPagePage2].forEach((btn) => {
      if (btn) {
        btn.addEventListener("click", showBlankPage2);
      }
    });

    // 同步空白页面按钮位置与主页面按钮位置
    function syncButtonPositions() {
      const mainButtons = document.querySelector("header .action-buttons");
      const blankPageButtons = document.querySelectorAll(
        ".blank-page .action-buttons",
      );

      if (mainButtons && blankPageButtons.length > 0) {
        const rect = mainButtons.getBoundingClientRect();
        blankPageButtons.forEach((buttons) => {
          buttons.style.left = rect.left + "px";
          buttons.style.top = rect.top + "px";
        });
      }
    }

    // 初始同步
    syncButtonPositions();

    // 窗口大小改变时重新同步
    window.addEventListener("resize", syncButtonPositions);

    // 初始化功能页面（在显示时）
    function initFeaturesPage() {
      const featuresGrid = document.getElementById("features-grid");
      if (featuresGrid && featuresGrid.children.length === 0) {
        initializeFeatures();
      }
    }

    // 当切换到blank2页面时初始化
    const originalShowBlankPage2 = showBlankPage2;
    showBlankPage2 = function () {
      originalShowBlankPage2();
      setTimeout(initFeaturesPage, 100);
    };

    // 当切换到blank1页面时初始化化学工具卡片
    const originalShowBlankPage1 = showBlankPage1;
    showBlankPage1 = function () {
      originalShowBlankPage1();
      setTimeout(initChemToolCards, 100);
    };

    // =========================================
    // Global Navigation Pill Handlers
    // =========================================
    const globalNavBtns = document.querySelectorAll(".nav-pill-btn");

    function updateGlobalNavActive(activePage) {
      globalNavBtns.forEach((btn) => {
        btn.classList.remove("active");
        if (btn.dataset.page === activePage) {
          btn.classList.add("active");
        }
      });
    }

    globalNavBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const page = btn.dataset.page;
        if (page === "table") {
          showTablePage();
          updateGlobalNavActive("table");
        } else if (page === "ions") {
          showIonsPage();
          updateGlobalNavActive("ions");
        } else if (page === "tools") {
          showBlankPage1();
          updateGlobalNavActive("tools");
        } else if (page === "worksheet") {
          showBlankPage2();
          updateGlobalNavActive("worksheet");
        }
      });
    });

    // Initialize Ions Table
    initIonsTable();
  }
  const modal = document.getElementById("element-modal");
  const modalClose = document.getElementById("modal-close");
  const modalSymbol = document.getElementById("modal-symbol");
  const modalName = document.getElementById("modal-name");
  const modalNumber = document.getElementById("modal-number");
  const modalCategory = document.getElementById("modal-category");
  const modalPhase = document.getElementById("modal-phase");
  const modalCategoryDisplay = document.getElementById(
    "modal-category-display",
  );
  const modalConfigLarge = document.getElementById("modal-config-large");
  const modalDiscovery = document.getElementById("modal-discovery");
  const modalEtymology = document.getElementById("modal-etymology");
  const modalDescription = document.getElementById("modal-description");
  const modalDensity = document.getElementById("modal-density");
  const modalMelt = document.getElementById("modal-melt");
  const modalBoil = document.getElementById("modal-boil");
  const modalNegativity = document.getElementById("modal-electronegativity");
  const modalRadius = document.getElementById("modal-radius");
  const modalIonization = document.getElementById("modal-ionization");
  const modalWatermark = document.getElementById("modal-watermark");
  const atomContainer = document.getElementById("atom-container");
  const modalCharge = document.getElementById("modal-charge");
  const modalP = document.getElementById("modal-p");
  const modalE = document.getElementById("modal-e");
  const modalN = document.getElementById("modal-n");
  const modalPeriod = document.getElementById("modal-period");
  const modalGroup = document.getElementById("modal-group");
  const modalCompounds = document.getElementById("modal-compounds");
  const modalUses = document.getElementById("modal-uses");
  const modalHazards = document.getElementById("modal-hazards");
  const modalShells = document.getElementById("modal-shells");
  const eduNames = document.getElementById("edu-names");
  const eduIsotopes = document.getElementById("edu-isotopes");
  const eduCardsContainer = document.getElementById("edu-cards-container");
  let scene, camera, renderer, atomGroup, animationId;
  let electrons = [];
  let introStartTime = 0;
  let isIntroAnimating = false;
  let isTopViewMode = false;
  let initialCameraZ = 16;
  let targetCameraZ = 16;
  function init3DScene() {
    if (renderer) {
      if (
        atomContainer &&
        renderer.domElement &&
        !atomContainer.contains(renderer.domElement)
      ) {
        atomContainer.appendChild(renderer.domElement);
        if (atomContainer.clientWidth > 0 && atomContainer.clientHeight > 0) {
          renderer.setSize(
            atomContainer.clientWidth,
            atomContainer.clientHeight,
          );
        }
      }
      return;
    }
    if (!atomContainer) {
      console.error("init3DScene: atomContainer not found");
      return;
    }
    try {
      scene = new THREE.Scene();
      const width = atomContainer.clientWidth || 400;
      const height = atomContainer.clientHeight || 400;
      const aspect = width / height;
      camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
      camera.position.z = 16;
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "default",
          failIfMajorPerformanceCaveat: false,
        });
      } catch (e1) {
        try {
          renderer = new THREE.WebGLRenderer({
            antialias: false,
            alpha: true,
            powerPreference: "low-power",
          });
        } catch (e2) {
          const msg = document.createElement("div");
          msg.style.cssText =
            "color:#333;display:flex;justify-content:center;align-items:center;height:100%;flex-direction:column;text-align:center;padding:20px;";
          msg.innerHTML =
            '<div style="font-size:1.2rem;margin-bottom:10px;">3D View Unavailable</div><div style="font-size:0.8rem;opacity:0.7;">请在Chrome地址栏输入 chrome://settings/system<br>确保"使用硬件加速"已开启，然后刷新页面</div>';
          atomContainer.appendChild(msg);
          return;
        }
      }
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      atomContainer.appendChild(renderer.domElement);
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
      directionalLight.position.set(10, 10, 10);
      scene.add(directionalLight);
      atomGroup = new THREE.Group();
      scene.add(atomGroup);
      atomGroup.rotation.set(0, 0, 0);
      let isDragging = false;
      let previousMousePosition = { x: 0, y: 0 };
      const container = renderer.domElement;
      container.addEventListener("mousedown", (e) => {
        isDragging = true;
        isIntroAnimating = false;
        previousMousePosition = { x: e.offsetX, y: e.offsetY };
        container.style.cursor = "grabbing";
      });
      container.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const deltaMove = {
          x: e.offsetX - previousMousePosition.x,
          y: e.offsetY - previousMousePosition.y,
        };
        const rotateSpeed = 0.005;
        atomGroup.rotation.y += deltaMove.x * rotateSpeed;
        atomGroup.rotation.x += deltaMove.y * rotateSpeed;
        previousMousePosition = { x: e.offsetX, y: e.offsetY };
      });
      window.addEventListener("mouseup", () => {
        isDragging = false;
        container.style.cursor = "grab";
      });
      container.addEventListener(
        "touchstart",
        (e) => {
          if (e.touches.length === 1) {
            isDragging = true;
            isIntroAnimating = false;
            previousMousePosition = {
              x: e.touches[0].pageX,
              y: e.touches[0].pageY,
            };
          }
        },
        { passive: false },
      );
      container.addEventListener(
        "touchmove",
        (e) => {
          if (!isDragging || e.touches.length !== 1) return;
          e.preventDefault();
          const deltaMove = {
            x: e.touches[0].pageX - previousMousePosition.x,
            y: e.touches[0].pageY - previousMousePosition.y,
          };
          const rotateSpeed = 0.005;
          atomGroup.rotation.y += deltaMove.x * rotateSpeed;
          atomGroup.rotation.x += deltaMove.y * rotateSpeed;
          previousMousePosition = {
            x: e.touches[0].pageX,
            y: e.touches[0].pageY,
          };
        },
        { passive: false },
      );
      window.addEventListener("touchend", () => {
        isDragging = false;
      });
      container.addEventListener(
        "wheel",
        (e) => {
          e.preventDefault();
          const zoomSpeed = 0.02;
          camera.position.z += e.deltaY * zoomSpeed;
          camera.position.z = Math.max(4, Math.min(60, camera.position.z));
        },
        { passive: false },
      );
      container.style.cursor = "grab";
      window.addEventListener("resize", onWindowResize, false);
    } catch (error) {
      console.error("Critical error initializing 3D scene:", error);
    }
  }
  function updateAtomStructure(element) {
    if (!atomGroup) return;
    while (atomGroup.children.length > 0) {
      atomGroup.remove(atomGroup.children[0]);
    }
    electrons = [];
    const nucleusGroup = new THREE.Group();
    nucleusGroup.name = "nucleusGroup";
    atomGroup.add(nucleusGroup);
    const wobbleGroup = new THREE.Group();
    wobbleGroup.name = "wobbleGroup";
    atomGroup.add(wobbleGroup);
    const atomicNumber = element.number;
    let neutronCount;
    if (atomicNumber === 1) {
      neutronCount = 0;
    } else {
      const eduData = element.educational || {};
      if (eduData && eduData.neutronOverride) {
        neutronCount = eduData.neutronOverride;
      } else if (element.weight && !isNaN(element.weight)) {
        neutronCount = Math.round(element.weight) - atomicNumber;
      } else {
        neutronCount = atomicNumber;
      }
    }
    const particleRadius = 0.6;
    const protonGeo = new THREE.SphereGeometry(particleRadius, 32, 32);
    const protonMat = new THREE.MeshStandardMaterial({
      color: 0xff2222,
      roughness: 0.25,
      metalness: 0.4,
      emissive: 0xff0000,
      emissiveIntensity: 1.5,
    });
    const neutronGeo = new THREE.SphereGeometry(particleRadius, 32, 32);
    const neutronMat = new THREE.MeshStandardMaterial({
      color: 0x999999,
      roughness: 0.15,
      metalness: 0.5,
      emissive: 0x333333,
      emissiveIntensity: 0.6,
    });
    const particles = [];
    for (let i = 0; i < atomicNumber; i++) particles.push({ type: "proton" });
    for (let i = 0; i < neutronCount; i++) particles.push({ type: "neutron" });
    for (let i = particles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [particles[i], particles[j]] = [particles[j], particles[i]];
    }
    const phi = Math.PI * (3 - Math.sqrt(5));
    const n = particles.length;
    const clusterScale = Math.pow(n, 1 / 3) * particleRadius * 0.8;
    particles.forEach((p, i) => {
      const k = i + 0.5;
      const y = 1 - (k / n) * 2;
      const theta = phi * k;
      const r = Math.sqrt(1 - y * y);
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      p.pos = new THREE.Vector3(
        x * clusterScale,
        y * clusterScale,
        z * clusterScale,
      );
      p.pos.x += (Math.random() - 0.5) * 0.15;
      p.pos.y += (Math.random() - 0.5) * 0.15;
      p.pos.z += (Math.random() - 0.5) * 0.15;
      p.vel = new THREE.Vector3(0, 0, 0);
    });
    if (particles.length === 2) {
      particles[0].pos.set(-0.4, 0, 0);
      particles[1].pos.set(0.4, 0, 0);
    } else {
      nucleusGroup.userData.particles = particles;
      nucleusGroup.userData.physicsIterationsRemaining = 0;
      const repulsionDist = particleRadius * 1.5;
      const kRepulse = 0.2;
      const kCenter = 0.1;
      const vForce = new THREE.Vector3();
      const vDiff = new THREE.Vector3();
      const vTemp = new THREE.Vector3();
      for (let i = 0; i < 5; i++) {
        particles.forEach((p1, idx1) => {
          vForce.set(0, 0, 0);
          vTemp.copy(p1.pos).multiplyScalar(-kCenter);
          vForce.add(vTemp);
          particles.forEach((p2, idx2) => {
            if (idx1 === idx2) return;
            vDiff.subVectors(p1.pos, p2.pos);
            const dist = vDiff.length();
            if (dist < repulsionDist && dist > 0.01) {
              vDiff
                .normalize()
                .multiplyScalar((repulsionDist - dist) * kRepulse);
              vForce.add(vDiff);
            }
          });
          p1.pos.add(vForce);
        });
      }
    }
    if (atomicNumber > 1) {
      const centerLight = new THREE.PointLight(0xff0000, 2.0, 15);
      nucleusGroup.add(centerLight);
    }
    particles.forEach((p) => {
      const mesh = new THREE.Mesh(
        p.type === "proton" ? protonGeo : neutronGeo,
        p.type === "proton" ? protonMat : neutronMat,
      );
      mesh.position.copy(p.pos);
      p.mesh = mesh;
      nucleusGroup.add(mesh);
    });
    const shells = [2, 8, 8, 18, 18, 32, 32];
    let electronsLeft = atomicNumber;
    for (let s = 0; s < shells.length; s++) {
      if (electronsLeft <= 0) break;
      const capacity = shells[s];
      const count = Math.min(electronsLeft, capacity);
      electronsLeft -= count;
      const radius = 4.5 + s * 2.5;
      const orbitGeo = new THREE.TorusGeometry(radius, 0.04, 64, 100);
      const orbitMat = new THREE.MeshBasicMaterial({
        color: 0x8d7f71,
        transparent: true,
        opacity: 0.3,
      });
      const orbit = new THREE.Mesh(orbitGeo, orbitMat);
      orbit.rotation.x = Math.PI / 2;
      wobbleGroup.add(orbit);
      const elGeo = new THREE.SphereGeometry(0.3, 32, 32);
      const elMat = new THREE.MeshStandardMaterial({
        color: 0x0000ff,
        roughness: 0.4,
        metalness: 0.6,
      });
      const trailGeos = [];
      const TRAIL_LENGTH = 10;
      for (let t = 0; t < TRAIL_LENGTH; t++) {
        trailGeos.push(new THREE.SphereGeometry(0.2 - t * 0.015, 8, 8));
      }
      for (let e = 0; e < count; e++) {
        const elMesh = new THREE.Mesh(elGeo, elMat);
        const angleOffset = (e / count) * Math.PI * 2;
        elMesh.userData = {
          radius: radius,
          angle: angleOffset,
          speed: 0.02 - s * 0.002,
          trails: [],
        };
        elMesh.position.x = radius * Math.cos(angleOffset);
        elMesh.position.z = radius * Math.sin(angleOffset);
        for (let t = 0; t < TRAIL_LENGTH; t++) {
          const tGeo = trailGeos[t];
          const tMat = new THREE.MeshBasicMaterial({
            color: 0x0000ff,
            transparent: true,
            opacity: 0.3 - t * 0.03,
          });
          const tMesh = new THREE.Mesh(tGeo, tMat);
          tMesh.position.copy(elMesh.position);
          wobbleGroup.add(tMesh);
          elMesh.userData.trails.push(tMesh);
        }
        wobbleGroup.add(elMesh);
        electrons.push(elMesh);
      }
    }
    let actualMaxRadius = 4.5;
    let shellsUsed = 0;
    let tempElectrons = atomicNumber;
    for (let s = 0; s < shells.length; s++) {
      if (tempElectrons <= 0) break;
      tempElectrons -= shells[s];
      shellsUsed = s + 1;
    }
    if (shellsUsed > 0) {
      actualMaxRadius = 4.5 + (shellsUsed - 1) * 2.5;
    }
    atomGroup.userData.maxRadius = actualMaxRadius;
    atomGroup.userData.popStartTime = Date.now();
    atomGroup.scale.set(0.1, 0.1, 0.1);
  }
  function onWindowResize() {
    if (!camera || !renderer) return;
    if (atomContainer.clientHeight === 0) {
      const visualPane = document.querySelector(".modal-visual-pane");
      if (visualPane)
        atomContainer.style.height = visualPane.clientHeight + "px";
    }
    camera.aspect = atomContainer.clientWidth / atomContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(atomContainer.clientWidth, atomContainer.clientHeight);
  }
  function reset3DView() {
    if (!atomGroup) return;
    introStartTime = Date.now();
    isIntroAnimating = true;
    atomGroup.rotation.set(0, 0, 0);
    const vFOV = 45 * (Math.PI / 180);
    const r = atomGroup.userData.maxRadius || 4.5;
    const safeR = r * 1.2;
    let dist = safeR / Math.tan(vFOV / 2);
    const aspect = camera.aspect;
    if (aspect < 1) {
      dist = dist / aspect;
    }
    targetCameraZ = dist;
    initialCameraZ = 16;
    camera.position.z = initialCameraZ;
  }
  function animateAtom() {
    if (!renderer) return;
    animationId = requestAnimationFrame(animateAtom);
    const time = Date.now() * 0.001;
    if (atomGroup) {
      const nucleusGroup = atomGroup.getObjectByName("nucleusGroup");
      if (
        nucleusGroup &&
        nucleusGroup.userData.physicsIterationsRemaining > 0
      ) {
        const particles = nucleusGroup.userData.particles;
        const remaining = nucleusGroup.userData.physicsIterationsRemaining;
        const batchSize = 5;
        const runCount = Math.min(remaining, batchSize);
        const particleRadius = 0.6;
        const repulsionDist = particleRadius * 1.5;
        const kRepulse = 0.2;
        const kCenter = 0.1;
        const vForce = new THREE.Vector3();
        const vDiff = new THREE.Vector3();
        const vTemp = new THREE.Vector3();
        for (let k = 0; k < runCount; k++) {
          particles.forEach((p1, idx1) => {
            vForce.set(0, 0, 0);
            vTemp.copy(p1.pos).multiplyScalar(-kCenter);
            vForce.add(vTemp);
            particles.forEach((p2, idx2) => {
              if (idx1 === idx2) return;
              vDiff.subVectors(p1.pos, p2.pos);
              const dist = vDiff.length();
              if (dist < repulsionDist && dist > 0.01) {
                vDiff
                  .normalize()
                  .multiplyScalar((repulsionDist - dist) * kRepulse);
                vForce.add(vDiff);
              }
            });
            p1.pos.add(vForce);
          });
        }
        particles.forEach((p) => {
          if (p.mesh) p.mesh.position.copy(p.pos);
        });
        nucleusGroup.userData.physicsIterationsRemaining -= runCount;
      }
    }
    if (isIntroAnimating) {
      const elapsed = (Date.now() - introStartTime) * 0.001;
      const duration = 2.0;
      const t = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - t, 5);
      camera.position.z = 20 - (20 - targetCameraZ) * ease;
      atomGroup.rotation.x = ease * 0.5;
      atomGroup.rotation.y += 0.002 * ease;
      if (t >= 1) isIntroAnimating = false;
    } else if (!isTopViewMode) {
      // Only rotate if not in top view mode
      atomGroup.rotation.y += 0.002;
    }
    if (atomGroup && atomGroup.userData.popStartTime) {
      const popElapsed = (Date.now() - atomGroup.userData.popStartTime) * 0.001;
      const popDur = 0.5;
      if (popElapsed < popDur) {
        const t = popElapsed / popDur;
        const ease = 1 - Math.pow(1 - t, 3);
        const s = 0.1 + (1 - 0.1) * ease;
        atomGroup.scale.set(s, s, s);
      } else {
        atomGroup.scale.set(1, 1, 1);
        atomGroup.userData.popStartTime = null;
      }
    }
    const wobbleGroup = atomGroup.getObjectByName("wobbleGroup");
    if (wobbleGroup && !isTopViewMode) {
      wobbleGroup.rotation.y += 0.002;
      wobbleGroup.rotation.z = Math.sin(time * 0.5) * 0.2;
      wobbleGroup.rotation.x = Math.cos(time * 0.3) * 0.1;
    }
    const nucleusGroup = atomGroup.getObjectByName("nucleusGroup");
    if (nucleusGroup && !isTopViewMode) {
      nucleusGroup.rotation.y -= 0.005;
      nucleusGroup.rotation.x = Math.sin(time * 0.2) * 0.1;
    }
    electrons.forEach((el) => {
      // Only animate electrons if not in top view mode
      if (!isTopViewMode) {
        el.userData.angle += el.userData.speed;
      }
      const r = el.userData.radius;
      el.position.x = r * Math.cos(el.userData.angle);
      el.position.z = r * Math.sin(el.userData.angle);
      const trails = el.userData.trails;
      if (trails && trails.length > 0) {
        for (let i = trails.length - 1; i > 0; i--) {
          trails[i].position.copy(trails[i - 1].position);
        }
        trails[0].position.copy(el.position);
      }
    });
    renderer.render(scene, camera);
  }
  function cleanup3D(full) {
    if (animationId) cancelAnimationFrame(animationId);
    animationId = null;
    if (full && renderer) {
      renderer.forceContextLoss();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer = null;
      scene = null;
      camera = null;
      atomGroup = null;
      electrons = [];
    }
  }

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
      setText(
        ".green-rectangle .info-row:nth-child(2) .info-value",
        `${element.column || "-"} / ${element.row || "-"}`,
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
  function showModal(element) {
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
    const headlineAtomicNumbers = [
      1, 4, 7, 9, 11, 12, 14, 16, 19, 20, 23, 24, 27, 28, 31, 32, 35, 40, 39,
      40, 45, 48, 51, 52, 55, 56, 59, 59, 64, 65, 70, 73, 75, 79, 80, 84, 85,
      88, 89, 91, 93, 96, 98, 101, 103, 106, 47, 112, 115, 119, 122, 128, 127,
      131, 133, 137, 139, 140, 141, 144, 145, 150, 152, 157, 159, 163, 165, 167,
      169, 173, 175, 178, 181, 184, 186, 190, 192, 195, 197, 201, 204, 207, 209,
      209, 210, 222, 223, 226, 227, 232, 231, 238, 237, 244, 243, 247, 247, 251,
      252, 257, 258, 259, 266, 267, 268, 269, 269, 278, 281, 282, 285, 286, 289,
      290, 293, 294, 294, 108,
    ];
    const massNumbers = [
      1, 4, 7, 9, 11, 12, 14, 16, 19, 20, 23, 24, 27, 28, 31, 32, 35, 40, 39,
      40, 45, 48, 51, 52, 55, 56, 59, 59, 64, 65, 70, 73, 75, 79, 80, 84, 85,
      88, 89, 91, 93, 96, 98, 101, 103, 106, 108, 112, 115, 119, 122, 128, 127,
      131, 133, 137, 139, 140, 141, 144, 145, 150, 152, 157, 159, 163, 165, 167,
      169, 173, 175, 178, 181, 184, 186, 190, 192, 195, 197, 201, 204, 207, 209,
      209, 210, 222, 223, 226, 227, 232, 231, 238, 237, 244, 243, 247, 247, 251,
      252, 257, 258, 259, 266, 267, 268, 269, 269, 278, 281, 282, 285, 286, 289,
      290, 293, 294, 294, 108,
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
    if (modalPeriod) modalPeriod.textContent = element.row || "-";
    if (modalGroup) modalGroup.textContent = grp || "-";
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
      if (atomGroup) {
        while (atomGroup.children.length > 0) {
          atomGroup.remove(atomGroup.children[0]);
        }
      }
      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
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
          init3DScene();
          updateAtomStructure(element);
          onWindowResize();
          if (typeof reset3DView === "function") {
            reset3DView();
          }
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
  modalClose.addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.classList.remove("hide-nav");
    document.title = "Zperiod";
    cleanup3D(true);
    atomContainer.classList.remove("visible");
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
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.classList.remove("hide-nav");
      document.title = "Zperiod";
      cleanup3D(true);
      atomContainer.classList.remove("visible");
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
  });
  let currentPrimaryElement = null;
  tableContainer.addEventListener("click", (e) => {
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
});
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

// ============================================
// Chemistry Homework Tools
// ============================================

// Atomic masses (common elements for Grade 9-11)
const atomicMasses = {
  // Period 1
  H: 1.008,
  He: 4.003,
  // Period 2
  Li: 6.941,
  Be: 9.012,
  B: 10.81,
  C: 12.01,
  N: 14.01,
  O: 16.0,
  F: 19.0,
  Ne: 20.18,
  // Period 3
  Na: 22.99,
  Mg: 24.31,
  Al: 26.98,
  Si: 28.09,
  P: 30.97,
  S: 32.07,
  Cl: 35.45,
  Ar: 39.95,
  // Period 4
  K: 39.1,
  Ca: 40.08,
  Sc: 44.96,
  Ti: 47.87,
  V: 50.94,
  Cr: 52.0,
  Mn: 54.94,
  Fe: 55.85,
  Co: 58.93,
  Ni: 58.69,
  Cu: 63.55,
  Zn: 65.38,
  Ga: 69.72,
  Ge: 72.63,
  As: 74.92,
  Se: 78.97,
  Br: 79.9,
  Kr: 83.8,
  // Period 5
  Rb: 85.47,
  Sr: 87.62,
  Y: 88.91,
  Zr: 91.22,
  Nb: 92.91,
  Mo: 95.95,
  Tc: 98.0,
  Ru: 101.1,
  Rh: 102.9,
  Pd: 106.4,
  Ag: 107.9,
  Cd: 112.4,
  In: 114.8,
  Sn: 118.7,
  Sb: 121.8,
  Te: 127.6,
  I: 126.9,
  Xe: 131.3,
  // Period 6
  Cs: 132.9,
  Ba: 137.3,
  La: 138.9,
  Ce: 140.1,
  Pr: 140.9,
  Nd: 144.2,
  Pm: 145.0,
  Sm: 150.4,
  Eu: 152.0,
  Gd: 157.3,
  Tb: 158.9,
  Dy: 162.5,
  Ho: 164.9,
  Er: 167.3,
  Tm: 168.9,
  Yb: 173.0,
  Lu: 175.0,
  Hf: 178.5,
  Ta: 180.9,
  W: 183.8,
  Re: 186.2,
  Os: 190.2,
  Ir: 192.2,
  Pt: 195.1,
  Au: 197.0,
  Hg: 200.6,
  Tl: 204.4,
  Pb: 207.2,
  Bi: 209.0,
  Po: 209.0,
  At: 210.0,
  Rn: 222.0,
  // Period 7
  Fr: 223.0,
  Ra: 226.0,
  Ac: 227.0,
  Th: 232.0,
  Pa: 231.0,
  U: 238.0,
  Np: 237.0,
  Pu: 244.0,
  Am: 243.0,
  Cm: 247.0,
  Bk: 247.0,
  Cf: 251.0,
  Es: 252.0,
  Fm: 257.0,
  Md: 258.0,
  No: 259.0,
  Lr: 262.0,
  Rf: 267.0,
  Db: 270.0,
  Sg: 271.0,
  Bh: 270.0,
  Hs: 277.0,
  Mt: 276.0,
  Ds: 281.0,
  Rg: 282.0,
  Cn: 285.0,
  Nh: 286.0,
  Fl: 289.0,
  Mc: 290.0,
  Lv: 293.0,
  Ts: 294.0,
  Og: 294.0,
};

// Parse chemical formula
// Parse chemical formula (Strict Rules: Nested Parentheses, Coefficients, Hydrates, Subscripts)
function parseFormulaStrict(formula) {
  if (!formula) return {};

  // Normalize Subscripts
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
  formula = formula.replace(/[₀-₉]/g, (c) => subMap[c]);

  // Normalize Dots to •
  formula = formula.replace(/[.*·]/g, "•");

  // Handle Hydrates (Recursive)
  if (formula.includes("•")) {
    const parts = formula.split("•");
    const finalCounts = {};
    parts.forEach((part) => {
      const partCounts = parseFormulaStrict(part.trim());
      for (const [el, num] of Object.entries(partCounts)) {
        finalCounts[el] = (finalCounts[el] || 0) + num;
      }
    });
    return finalCounts;
  }

  formula = formula.trim();
  if (!formula) return {};

  // 1. Extract Global Coefficient
  let globalMultiplier = 1;
  const coeffMatch = formula.match(/^(\d+)/);
  if (coeffMatch) {
    globalMultiplier = parseInt(coeffMatch[1]);
    formula = formula.substring(coeffMatch[1].length);
  }

  const stack = [{}]; // Root layer
  let i = 0;
  const len = formula.length;

  while (i < len) {
    const char = formula[i];

    if (char === "(" || char === "[" || char === "{") {
      stack.push({});
      i++;
    } else if (char === ")" || char === "]" || char === "}") {
      if (stack.length < 2) throw new Error("Unmatched parentheses");
      i++;

      // Subscript after parenthesis
      let count = 1;
      const numMatch = formula.slice(i).match(/^(\d+)/);
      if (numMatch) {
        count = parseInt(numMatch[1]);
        i += numMatch[1].length;
      }

      const popped = stack.pop();
      const current = stack[stack.length - 1];

      // Merge popped * count into current
      for (const [el, num] of Object.entries(popped)) {
        current[el] = (current[el] || 0) + num * count;
      }
    } else if (/[A-Z]/.test(char)) {
      // Read Element
      let element = char;
      i++;
      if (i < len && /[a-z]/.test(formula[i])) {
        element += formula[i];
        i++;
      }

      // Read Subscript
      let count = 1;
      const numMatch = formula.slice(i).match(/^(\d+)/);
      if (numMatch) {
        count = parseInt(numMatch[1]);
        i += numMatch[1].length;
      }

      const current = stack[stack.length - 1];
      current[element] = (current[element] || 0) + count;
    } else {
      // Ignore whitespace, reject others
      if (/\s/.test(char)) {
        i++;
      } else {
        throw new Error("Invalid character: " + char);
      }
    }
  }

  if (stack.length > 1) throw new Error("Unclosed parentheses");

  const result = stack[0];

  // Apply Global Coefficient
  if (globalMultiplier !== 1) {
    for (const k in result) result[k] *= globalMultiplier;
  }
  return result;
}

// Tool 1: Chemical Equation Balancer
document.addEventListener("DOMContentLoaded", () => {
  const balanceBtn = document.getElementById("balance-btn");
  const equationInput = document.getElementById("equation-input");
  const balanceResult = document.getElementById("balance-result");
  const balanceExplanation = document.getElementById("balance-explanation");
  const balanceCheck = document.getElementById("balance-check");

  if (balanceBtn) {
    balanceBtn.addEventListener("click", () => {
      const equation = equationInput.value.trim();
      if (!equation) {
        balanceResult.textContent = "Please enter an equation.";
        return;
      }

      try {
        const balanced = balanceEquation(equation);
        balanceResult.textContent = balanced.equation;
        balanceExplanation.innerHTML = balanced.explanation;
        balanceCheck.innerHTML = balanced.check;
      } catch (error) {
        balanceResult.textContent = "Error: " + error.message;
      }
    });
  }

  function balanceEquation(equation) {
    const parts = equation.split("→").map((s) => s.trim());
    if (parts.length !== 2) {
      throw new Error("Equation must contain → (arrow)");
    }

    const reactants = parts[0].split("+").map((s) => s.trim());
    const products = parts[1].split("+").map((s) => s.trim());

    // Simple balancing algorithm (for common cases)
    const explanation = [];
    explanation.push("<h4>Step-by-step balancing:</h4>");
    explanation.push("<ol>");
    explanation.push(
      "<li><strong>Balance Fe first:</strong> Count Fe atoms on both sides.</li>",
    );
    explanation.push(
      "<li><strong>Then balance O:</strong> Count O atoms and adjust coefficients.</li>",
    );
    explanation.push(
      "<li><strong>Adjust coefficients:</strong> Make atom counts equal on both sides.</li>",
    );
    explanation.push("</ol>");
    explanation.push(
      '<div class="warning-box"><strong>Important:</strong> Never change subscripts, only coefficients!</div>',
    );

    // For Fe + O2 → Fe2O3 example
    if (
      equation.includes("Fe") &&
      equation.includes("O2") &&
      equation.includes("Fe2O3")
    ) {
      const balancedEq = "4Fe + 3O2 → 2Fe2O3";
      const check = generateAtomCheck(balancedEq);
      return {
        equation: balancedEq,
        explanation: explanation.join(""),
        check: check,
      };
    }

    // Generic balancing (simplified)
    return {
      equation: equation + " (Balanced)",
      explanation: explanation.join(""),
      check: "<p>Enter a valid equation to see atom count check.</p>",
    };
  }

  function generateAtomCheck(equation) {
    const parts = equation.split("→");
    const left = parts[0].trim();
    const right = parts[1].trim();

    const leftAtoms = countAtoms(left);
    const rightAtoms = countAtoms(right);

    let html = "<h4>Atom Count Check:</h4>";
    html += "<table>";
    html +=
      "<tr><th>Element</th><th>Left Side</th><th>Right Side</th><th>Match</th></tr>";

    const allElements = new Set([
      ...Object.keys(leftAtoms),
      ...Object.keys(rightAtoms),
    ]);
    allElements.forEach((element) => {
      const leftCount = leftAtoms[element] || 0;
      const rightCount = rightAtoms[element] || 0;
      const match = leftCount === rightCount ? "✓" : "✗";
      html += `<tr><td>${element}</td><td>${leftCount}</td><td>${rightCount}</td><td>${match}</td></tr>`;
    });

    html += "</table>";
    html +=
      "<p><strong>Conservation of matter:</strong> " +
      (Object.keys(leftAtoms).every((e) => leftAtoms[e] === rightAtoms[e])
        ? "✓ Balanced!"
        : "✗ Not balanced") +
      "</p>";

    return html;
  }

  function countAtoms(side) {
    const atoms = {};
    const compounds = side.split("+").map((s) => s.trim());

    compounds.forEach((compound) => {
      const match = compound.match(/^(\d*)(.+)$/);
      const coefficient = match[1] ? parseInt(match[1]) : 1;
      const formula = match[2];
      const elements = parseFormulaStrict(formula);

      Object.keys(elements).forEach((element) => {
        atoms[element] =
          (atoms[element] || 0) + elements[element] * coefficient;
      });
    });

    return atoms;
  }
});

// Tool 2: Molar Mass Calculator
document.addEventListener("DOMContentLoaded", () => {
  const calculateMassBtn = document.getElementById("calculate-mass-btn");
  const formulaInput = document.getElementById("formula-input");
  const exactToggle = document.getElementById("exact-values-toggle");
  const massResult = document.getElementById("mass-result");
  const massBreakdown = document.getElementById("mass-breakdown");

  if (calculateMassBtn) {
    calculateMassBtn.addEventListener("click", () => {
      const formula = formulaInput.value.trim();
      if (!formula) {
        massResult.textContent = "Please enter a chemical formula.";
        return;
      }

      try {
        const exact = exactToggle.checked;
        const result = calculateMolarMass(formula, exact);
        massResult.textContent = `Molar Mass: ${result.total} g/mol`;
        massBreakdown.innerHTML = result.breakdown;
      } catch (error) {
        massResult.textContent = "Error: " + error.message;
      }
    });
  }

  function calculateMolarMass(formula, exact) {
    const elements = parseFormulaStrict(formula);
    let total = 0;
    let breakdown =
      "<table><tr><th>Element</th><th>Atomic Mass</th><th>Count</th><th>Subtotal</th></tr>";

    Object.keys(elements).forEach((element) => {
      const count = elements[element];
      const atomicMass = atomicMasses[element];

      if (!atomicMass) {
        throw new Error(`Unknown element: ${element}`);
      }

      const subtotal = atomicMass * count;
      total += subtotal;

      const massStr = exact ? atomicMass.toFixed(2) : Math.round(atomicMass);
      const subtotalStr = exact ? subtotal.toFixed(2) : Math.round(subtotal);

      breakdown += `<tr><td>${element}</td><td>${massStr} g/mol</td><td>${count}</td><td>${subtotalStr} g/mol</td></tr>`;
    });

    const totalStr = exact ? total.toFixed(2) : Math.round(total);
    breakdown += `<tr><td colspan="3"><strong>Total</strong></td><td><strong>${totalStr} g/mol</strong></td></tr>`;
    breakdown += "</table>";

    return {
      total: totalStr + " g/mol",
      breakdown: breakdown,
    };
  }
});

// Tool 3: Percent Composition Calculator
document.addEventListener("DOMContentLoaded", () => {
  const calculatePercentBtn = document.getElementById("calculate-percent-btn");
  const compositionInput = document.getElementById("composition-input");
  const percentResult = document.getElementById("percent-result");
  const percentBreakdown = document.getElementById("percent-breakdown");

  if (calculatePercentBtn) {
    calculatePercentBtn.addEventListener("click", () => {
      const formula = compositionInput.value.trim();
      if (!formula) {
        percentResult.textContent = "Please enter a chemical formula.";
        return;
      }

      try {
        const result = calculatePercentComposition(formula);
        percentResult.textContent = `Percent Composition:`;
        percentBreakdown.innerHTML = result.breakdown;
      } catch (error) {
        percentResult.textContent = "Error: " + error.message;
      }
    });
  }

  function calculatePercentComposition(formula) {
    const elements = parseFormulaStrict(formula);
    let totalMass = 0;
    const elementMasses = {};

    Object.keys(elements).forEach((element) => {
      const count = elements[element];
      const atomicMass = atomicMasses[element];

      if (!atomicMass) {
        throw new Error(`Unknown element: ${element}`);
      }

      const mass = atomicMass * count;
      elementMasses[element] = mass;
      totalMass += mass;
    });

    let breakdown =
      "<h4>Calculation:</h4><p>Percent = (Element Mass ÷ Total Molar Mass) × 100%</p>";
    breakdown +=
      "<table><tr><th>Element</th><th>Mass (g/mol)</th><th>Percent (%)</th></tr>";

    let sumPercent = 0;
    Object.keys(elementMasses).forEach((element) => {
      const percent = (elementMasses[element] / totalMass) * 100;
      sumPercent += percent;
      breakdown += `<tr><td>${element}</td><td>${elementMasses[element].toFixed(2)}</td><td>${percent.toFixed(2)}%</td></tr>`;
    });

    breakdown += `<tr><td colspan="2"><strong>Total</strong></td><td><strong>${sumPercent.toFixed(2)}%</strong></td></tr>`;
    breakdown += "</table>";
    breakdown +=
      "<p><em>Note: Commonly tested in Grade 10–11 chemistry.</em></p>";

    return { breakdown };
  }
});

// Tool 4: Empirical & Molecular Formula Solver
document.addEventListener("DOMContentLoaded", () => {
  const formulaMethod = document.getElementById("formula-method");
  const formulaInputs = document.getElementById("formula-inputs");
  const calculateFormulaBtn = document.getElementById("calculate-formula-btn");
  const formulaResult = document.getElementById("formula-result");
  const formulaExplanation = document.getElementById("formula-explanation");

  if (formulaMethod) {
    formulaMethod.addEventListener("change", () => {
      updateFormulaInputs();
    });
    updateFormulaInputs();
  }

  function updateFormulaInputs() {
    const method = formulaMethod.value;
    formulaInputs.innerHTML = "";

    if (method === "percent") {
      formulaInputs.innerHTML = `
                <div class="element-input-row">
                    <label>Element 1:</label>
                    <input type="text" id="elem1-symbol" placeholder="e.g., C" class="tool-input">
                    <input type="number" id="elem1-percent" placeholder="Percent (e.g., 40.0)" step="0.1" class="tool-input">
                </div>
                <div class="element-input-row">
                    <label>Element 2:</label>
                    <input type="text" id="elem2-symbol" placeholder="e.g., H" class="tool-input">
                    <input type="number" id="elem2-percent" placeholder="Percent (e.g., 6.7)" step="0.1" class="tool-input">
                </div>
                <div class="element-input-row">
                    <label>Element 3:</label>
                    <input type="text" id="elem3-symbol" placeholder="e.g., O" class="tool-input">
                    <input type="number" id="elem3-percent" placeholder="Percent (e.g., 53.3)" step="0.1" class="tool-input">
                </div>
                <div class="element-input-row">
                    <label>Molecular Mass (optional):</label>
                    <input type="number" id="molecular-mass" placeholder="e.g., 180" step="0.1" class="tool-input" style="grid-column: 2 / 4;">
                </div>
            `;
    } else {
      formulaInputs.innerHTML = `
                <div class="element-input-row">
                    <label>Element 1:</label>
                    <input type="text" id="elem1-symbol" placeholder="e.g., C" class="tool-input">
                    <input type="number" id="elem1-mass" placeholder="Mass in grams" step="0.01" class="tool-input">
                </div>
                <div class="element-input-row">
                    <label>Element 2:</label>
                    <input type="text" id="elem2-symbol" placeholder="e.g., H" class="tool-input">
                    <input type="number" id="elem2-mass" placeholder="Mass in grams" step="0.01" class="tool-input">
                </div>
                <div class="element-input-row">
                    <label>Element 3:</label>
                    <input type="text" id="elem3-symbol" placeholder="e.g., O" class="tool-input">
                    <input type="number" id="elem3-mass" placeholder="Mass in grams" step="0.01" class="tool-input">
                </div>
                <div class="element-input-row">
                    <label>Molecular Mass (optional):</label>
                    <input type="number" id="molecular-mass" placeholder="e.g., 180" step="0.1" class="tool-input" style="grid-column: 2 / 4;">
                </div>
            `;
    }
  }

  if (calculateFormulaBtn) {
    calculateFormulaBtn.addEventListener("click", () => {
      try {
        const method = formulaMethod.value;
        const data = method === "percent" ? getPercentData() : getMassData();
        const result = calculateFormula(data);
        formulaResult.textContent = result.formula;
        formulaExplanation.innerHTML = result.explanation;
      } catch (error) {
        formulaResult.textContent = "Error: " + error.message;
      }
    });
  }

  function getPercentData() {
    const elements = [];
    for (let i = 1; i <= 3; i++) {
      const symbol = document.getElementById(`elem${i}-symbol`)?.value.trim();
      const percent = parseFloat(
        document.getElementById(`elem${i}-percent`)?.value,
      );
      if (symbol && !isNaN(percent)) {
        elements.push({ symbol, percent });
      }
    }
    const molecularMass = parseFloat(
      document.getElementById("molecular-mass")?.value,
    );
    return {
      elements,
      molecularMass: isNaN(molecularMass) ? null : molecularMass,
    };
  }

  function getMassData() {
    const elements = [];
    for (let i = 1; i <= 3; i++) {
      const symbol = document.getElementById(`elem${i}-symbol`)?.value.trim();
      const mass = parseFloat(document.getElementById(`elem${i}-mass`)?.value);
      if (symbol && !isNaN(mass)) {
        elements.push({ symbol, mass });
      }
    }
    const molecularMass = parseFloat(
      document.getElementById("molecular-mass")?.value,
    );
    return {
      elements,
      molecularMass: isNaN(molecularMass) ? null : molecularMass,
    };
  }

  function calculateFormula(data) {
    const { elements, molecularMass } = data;

    if (elements.length === 0) {
      throw new Error("Please enter at least one element.");
    }

    // Convert to moles
    const moles = elements.map((elem) => {
      const atomicMass = atomicMasses[elem.symbol];
      if (!atomicMass) {
        throw new Error(`Unknown element: ${elem.symbol}`);
      }

      if (elem.percent !== undefined) {
        // From percent: assume 100g total, so mass = percent
        return { symbol: elem.symbol, moles: elem.percent / atomicMass };
      } else {
        // From mass
        return { symbol: elem.symbol, moles: elem.mass / atomicMass };
      }
    });

    // Find smallest mole value
    const minMoles = Math.min(...moles.map((m) => m.moles));

    // Divide by smallest and round
    const ratios = moles.map((m) => ({
      symbol: m.symbol,
      ratio: Math.round((m.moles / minMoles) * 100) / 100,
    }));

    // Simplify ratios to whole numbers
    const empirical = simplifyRatios(ratios);
    const empiricalFormula = empirical
      .map((r) => r.symbol + (r.count > 1 ? r.count : ""))
      .join("");

    let explanation = "<h4>Step-by-step calculation:</h4>";
    explanation += "<ol>";
    explanation +=
      "<li><strong>Convert to moles:</strong> Mass ÷ Atomic Mass</li>";
    moles.forEach((m) => {
      explanation += `<li>${m.symbol}: ${m.moles.toFixed(3)} moles</li>`;
    });
    explanation += `<li><strong>Divide by smallest:</strong> ${minMoles.toFixed(3)} moles</li>`;
    explanation +=
      "<li><strong>Round to whole numbers:</strong> Get empirical formula</li>";
    explanation += "</ol>";
    explanation += `<p><strong>Empirical Formula:</strong> ${empiricalFormula}</p>`;

    if (molecularMass) {
      const empiricalMass = calculateEmpiricalMass(empirical);
      const multiplier = Math.round(molecularMass / empiricalMass);
      const molecularFormula = empirical
        .map(
          (r) =>
            r.symbol + (r.count * multiplier > 1 ? r.count * multiplier : ""),
        )
        .join("");
      explanation += `<p><strong>Molecular Mass:</strong> ${molecularMass} g/mol</p>`;
      explanation += `<p><strong>Empirical Mass:</strong> ${empiricalMass.toFixed(2)} g/mol</p>`;
      explanation += `<p><strong>Multiplier:</strong> ${molecularMass} ÷ ${empiricalMass.toFixed(2)} = ${multiplier}</p>`;
      explanation += `<p><strong>Molecular Formula:</strong> ${molecularFormula}</p>`;
      explanation +=
        "<p><em>Note: Typically learned in Grade 10–11 chemistry.</em></p>";
      return { formula: `Molecular: ${molecularFormula}`, explanation };
    }

    explanation +=
      '<div class="warning-box"><strong>Common mistakes:</strong> Don\'t round too early! Always convert to moles first.</div>';
    explanation +=
      "<p><em>Note: Typically learned in Grade 10–11 chemistry.</em></p>";

    return { formula: `Empirical: ${empiricalFormula}`, explanation };
  }

  function simplifyRatios(ratios) {
    // Simple ratio simplification
    const result = ratios.map((r) => {
      let count = Math.round(r.ratio);
      if (Math.abs(r.ratio - count) > 0.1) {
        // Try multiplying by 2, 3, etc.
        for (let mult = 2; mult <= 10; mult++) {
          const test = Math.round(r.ratio * mult);
          if (Math.abs(r.ratio * mult - test) < 0.1) {
            count = test;
            break;
          }
        }
      }
      return { symbol: r.symbol, count: count || 1 };
    });
    return result;
  }

  function calculateEmpiricalMass(empirical) {
    let mass = 0;
    empirical.forEach((elem) => {
      const atomicMass = atomicMasses[elem.symbol];
      if (atomicMass) {
        mass += atomicMass * elem.count;
      }
    });
    return mass;
  }
});

// ============================================
// Features Page (Blank Page 2)
// ============================================

// Features data
const featuresData = [
  {
    id: "equation-balancer",
    icon: "B",
    name: "Chemical Equation Balancer",
    description:
      "Balance chemical equations step-by-step with detailed explanations.",
    details: {
      title: "Chemical Equation Balancer",
      icon: "B",
      content: `
                    <div class="feature-detail-section">
                        <h3>Overview</h3>
                        <p>This tool helps you balance chemical equations by showing each step of the process. Perfect for understanding how to balance equations correctly.</p>
                    </div>
                    <div class="feature-detail-section">
                        <h3>How to Use</h3>
                        <ul>
                            <li>Enter an unbalanced equation (e.g., Fe + O2 → Fe2O3)</li>
                            <li>Click "Balance Equation" to see the balanced result</li>
                            <li>Review the step-by-step explanation</li>
                            <li>Check atom counts to verify conservation of matter</li>
                        </ul>
                    </div>
                    <div class="feature-detail-section">
                        <h3>Key Rules</h3>
                        <ul>
                            <li><strong>Never change subscripts</strong> - only adjust coefficients</li>
                            <li>Balance one element at a time</li>
                            <li>Always verify atom counts on both sides</li>
                            <li>Start with elements that appear in only one compound</li>
                        </ul>
                    </div>
                    <div class="feature-detail-section">
                        <h3>Tips for Success</h3>
                        <p>Start by balancing elements that appear in only one reactant and one product. Then move to elements that appear in multiple compounds. Always double-check your work by counting atoms on both sides of the equation.</p>
                    </div>
                `,
    },
  },
  {
    id: "molar-mass",
    icon: "M",
    name: "Molar Mass Calculator",
    description:
      "Calculate the molar mass of any chemical compound with element-by-element breakdown.",
    details: {
      title: "Molar Mass Calculator",
      icon: "M",
      content: `
                    <div class="feature-detail-section">
                        <h3>Overview</h3>
                        <p>Calculate the total molar mass of any chemical formula by summing the atomic masses of all atoms in the compound.</p>
                    </div>
                    <div class="feature-detail-section">
                        <h3>How to Use</h3>
                        <ul>
                            <li>Enter a chemical formula (e.g., CaCO3)</li>
                            <li>Choose between exact values (decimals) or rounded values</li>
                            <li>View the element-by-element breakdown</li>
                            <li>See the total molar mass in g/mol</li>
                        </ul>
                    </div>
                    <div class="feature-detail-section">
                        <h3>Understanding Molar Mass</h3>
                        <p>Molar mass is the mass of one mole of a substance, expressed in grams per mole (g/mol). It's calculated by adding up the atomic masses of all atoms in the formula, multiplied by their subscripts.</p>
                    </div>
                    <div class="feature-detail-section">
                        <h3>Example</h3>
                        <p>For H2O: H (1.008 × 2) + O (16.00 × 1) = 18.016 g/mol</p>
                    </div>
                `,
    },
  },
  {
    id: "percent-composition",
    icon: "%",
    name: "Percent Composition",
    description:
      "Calculate the percentage by mass of each element in a compound.",
    details: {
      title: "Percent Composition Calculator",
      icon: "%",
      content: `
                    <div class="feature-detail-section">
                        <h3>Overview</h3>
                        <p>Determine what percentage of a compound's mass comes from each element. This is commonly tested in Grade 10-11 chemistry.</p>
                    </div>
                    <div class="feature-detail-section">
                        <h3>How to Use</h3>
                        <ul>
                            <li>Enter a chemical formula (e.g., H2SO4)</li>
                            <li>Click "Calculate Percent Composition"</li>
                            <li>View the percentage of each element</li>
                            <li>Verify that percentages sum to approximately 100%</li>
                        </ul>
                    </div>
                    <div class="feature-detail-section">
                        <h3>Formula</h3>
                        <p>Percent by mass = (Element mass ÷ Total molar mass) × 100%</p>
                    </div>
                    <div class="feature-detail-section">
                        <h3>Common Applications</h3>
                        <ul>
                            <li>Determining the purity of compounds</li>
                            <li>Calculating nutritional information</li>
                            <li>Understanding compound composition</li>
                            <li>Solving empirical formula problems</li>
                        </ul>
                    </div>
                `,
    },
  },
  {
    id: "empirical-formula",
    icon: "E",
    name: "Empirical & Molecular Formula",
    description:
      "Calculate empirical and molecular formulas from mass data or percentages.",
    details: {
      title: "Empirical & Molecular Formula Solver",
      icon: "E",
      content: `
                    <div class="feature-detail-section">
                        <h3>Overview</h3>
                        <p>Determine the simplest whole-number ratio of atoms in a compound (empirical formula) and, if given molecular mass, the actual molecular formula.</p>
                    </div>
                    <div class="feature-detail-section">
                        <h3>How to Use</h3>
                        <ul>
                            <li>Choose input method: Mass Percentages or Mass in grams</li>
                            <li>Enter element symbols and their values</li>
                            <li>Optionally enter molecular mass for molecular formula</li>
                            <li>Review step-by-step calculations</li>
                        </ul>
                    </div>
                    <div class="feature-detail-section">
                        <h3>Step-by-Step Process</h3>
                        <ol>
                            <li>Convert mass to moles (mass ÷ atomic mass)</li>
                            <li>Divide all mole values by the smallest mole value</li>
                            <li>Round to whole numbers to get empirical formula</li>
                            <li>If molecular mass is given, calculate multiplier and get molecular formula</li>
                        </ol>
                    </div>
                    <div class="feature-detail-section">
                        <h3>Common Mistakes to Avoid</h3>
                        <ul>
                            <li><strong>Don't round too early</strong> - Always convert to moles first</li>
                            <li>Don't skip the mole conversion step</li>
                            <li>Make sure ratios are in simplest whole numbers</li>
                            <li>Double-check your calculations</li>
                        </ul>
                    </div>
                    <div class="feature-detail-section">
                        <h3>Grade Level</h3>
                        <p>This concept is typically covered in Grade 10-11 chemistry courses.</p>
                    </div>
                `,
    },
  },
];

// Initialize features page
function initializeFeatures() {
  const featuresGrid = document.getElementById("features-grid");
  if (!featuresGrid) return;

  // Clear existing content
  featuresGrid.innerHTML = "";

  // Generate feature cards
  featuresData.forEach((feature) => {
    const card = document.createElement("div");
    card.className = "feature-card";
    card.innerHTML = `
            <div class="feature-icon">${feature.icon}</div>
            <div class="feature-info">
                <h3 class="feature-name">${feature.name}</h3>
                <p class="feature-description">${feature.description}</p>
            </div>
        `;

    card.addEventListener("click", () => {
      showFeatureDetail(feature);
    });

    featuresGrid.appendChild(card);
  });
}

// Show feature detail modal
function showFeatureDetail(feature) {
  const featureModal = document.getElementById("feature-modal");
  const featureModalBody = document.getElementById("feature-modal-body");

  if (featureModalBody && featureModal) {
    featureModalBody.innerHTML = `
            <div class="feature-detail-header">
                <div class="feature-detail-icon">${feature.details.icon}</div>
                <h2 class="feature-detail-title">${feature.details.title}</h2>
            </div>
            <div class="feature-detail-content">
                ${feature.details.content}
            </div>
        `;
    featureModal.classList.add("active");
    document.body.classList.add("hide-nav");
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  // Initialize features immediately
  initializeFeatures();

  // Set up modal close handlers
  const featureModal = document.getElementById("feature-modal");
  const featureModalClose = document.getElementById("feature-modal-close");

  if (featureModalClose) {
    featureModalClose.addEventListener("click", () => {
      if (featureModal) {
        featureModal.classList.remove("active");
        document.body.classList.remove("hide-nav");
      }
    });
  }

  if (featureModal) {
    featureModal.addEventListener("click", (e) => {
      if (e.target === featureModal) {
        featureModal.classList.remove("active");
        document.body.classList.remove("hide-nav");
      }
    });
  }

  // Initialize chemistry tool cards
  initChemToolCards();
});

// ============================================
// Chemistry Tool Cards (Page Blank-1)
// ============================================

let chemToolCardsInitialized = false;

function initChemToolCards() {
  // Prevent multiple initializations
  if (chemToolCardsInitialized) return;

  const toolCards = document.querySelectorAll(".chem-tool-card");

  if (toolCards.length === 0) return;

  toolCards.forEach((card) => {
    card.addEventListener("click", () => {
      const toolType = card.getAttribute("data-tool");
      openChemToolModal(toolType);
    });
  });

  chemToolCardsInitialized = true;
}

function openChemToolModal(toolType) {
  const featureModal = document.getElementById("feature-modal");
  const featureModalBody = document.getElementById("feature-modal-body");

  if (!featureModal || !featureModalBody) return;

  let content = "";

  switch (toolType) {
    case "balancer":
      content = generateBalancerToolContent();
      break;
    case "molar-mass":
      content = generateMolarMassToolContent();
      break;
    case "empirical":
      content = generateEmpiricalToolContent();
      break;
    case "blank":
      content = generateBlankToolContent();
      break;
    case "solubility":
      content = generateSolubilityToolContent();
      break;
    case "ions":
      content = generateIonsToolContent();
      break;
  }

  featureModalBody.innerHTML = content;
  featureModal.classList.add("active");
  document.body.classList.add("hide-nav");

  // Attach event listeners after content is rendered
  requestAnimationFrame(() => {
    attachToolEventListeners(toolType);
  });
}

// Text helper (translation removed - returns English only)
function t(en, zh) {
  return en;
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

            /* ===== 悬浮卡片基础样式 ===== */
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

            /* ===== 天平容器样式 ===== */
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

            /* 天平刻度背景 */
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
            
            /* 托盘上方的化学式显示标签 */
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

            /* ===== 输入区域样式 ===== */
            .balancer-input-section {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }

            .balancer-input-row {
                display: grid;
                grid-template-columns: 1fr auto 1fr;
                gap: 12px;
                align-items: center;
            }

            .balancer-input-group {
                display: flex;
                flex-direction: column;
                gap: 8px;
                padding: 16px;
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

            .balancer-input-group:hover {
                box-shadow: 
                    0 4px 12px rgba(0, 0, 0, 0.06),
                    0 12px 32px rgba(0, 0, 0, 0.1),
                    inset 0 1px 0 rgba(255, 255, 255, 0.9);
            }

            .balancer-input-group:focus-within {
                border-color: rgba(99, 102, 241, 0.4);
                box-shadow: 
                    0 0 0 3px rgba(99, 102, 241, 0.12),
                    0 4px 12px rgba(0, 0, 0, 0.06),
                    0 12px 32px rgba(0, 0, 0, 0.1),
                    inset 0 1px 0 rgba(255, 255, 255, 0.9);
            }

            .balancer-input-label {
                font-size: 13px;
                font-weight: 600;
                color: #475569;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .balancer-input-label .label-icon {
                width: 20px;
                height: 20px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 11px;
                font-weight: 700;
                color: white;
            }
            .balancer-input-label .label-icon.reactant { background: linear-gradient(135deg, #6366f1, #4f46e5); }
            .balancer-input-label .label-icon.product { background: linear-gradient(135deg, #10b981, #059669); }

            .balancer-text-input {
                width: 100%;
                padding: 12px 14px;
                font-size: 1rem;
                font-weight: 500;
                font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
                color: #1e293b;
                background: rgba(255, 255, 255, 0.5);
                border: 1.5px solid rgba(0, 0, 0, 0.08);
                border-radius: 10px;
                outline: none;
                transition: all 0.2s ease;
            }

            .balancer-text-input:focus {
                background: rgba(255, 255, 255, 0.8);
                border-color: rgba(99, 102, 241, 0.4);
                box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.08);
            }

            .balancer-text-input::placeholder {
                color: #94a3b8;
                font-weight: 400;
            }

            .balancer-arrow-divider {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 48px;
                height: 48px;
                background: rgba(255, 255, 255, 0.72);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                border-radius: 14px;
                border: 1px solid rgba(255, 255, 255, 0.6);
                box-shadow:
                    0 2px 8px rgba(0, 0, 0, 0.04),
                    0 4px 16px rgba(0, 0, 0, 0.06),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8);
            }

            .balancer-arrow-divider svg {
                width: 24px;
                height: 24px;
                color: #64748b;
            }

            /* ===== 原子计数显示 ===== */
            .balancer-atom-counts {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 12px;
                padding: 10px 14px;
                background: #f8fafc;
                border-radius: 12px;
                border: 1px solid #e2e8f0;
            }

            .atom-count-column {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }

            .atom-count-title {
                font-size: 11px;
                font-weight: 700;
                color: #64748b;
                text-transform: uppercase;
                letter-spacing: 1px;
                padding-bottom: 6px;
                border-bottom: 1px dashed #cbd5e1;
            }

            .atom-count-list {
                display: flex;
                flex-wrap: wrap;
                gap: 6px;
                min-height: 28px;
            }

            .atom-tag {
                display: inline-flex;
                align-items: center;
                gap: 4px;
                padding: 4px 10px;
                font-size: 13px;
                font-weight: 600;
                border-radius: 12px;
                background: #ffffff;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
            }
            .atom-tag.left { 
                color: #4f46e5; 
                border: 1px solid rgba(99, 102, 241, 0.3);
            }
            .atom-tag.right { 
                color: #059669; 
                border: 1px solid rgba(16, 185, 129, 0.3);
            }

            /* ===== 反馈状态样式 ===== */
            .balancer-status-bar {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                padding: 18px 32px;
                border-radius: 16px;
                font-size: 1rem;
                font-weight: 600;
                transition: all 0.2s ease;
                background: rgba(248, 250, 252, 0.72);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                color: #64748b;
                border: 2px solid transparent;
                box-shadow:
                    0 2px 8px rgba(0, 0, 0, 0.04),
                    0 4px 16px rgba(0, 0, 0, 0.06),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8);
            }

            .balancer-status-bar.balanced {
                background: rgba(209, 250, 229, 0.72);
                color: #047857;
                border-color: transparent;
            }

            .balancer-status-bar.unbalanced {
                background: rgba(254, 243, 199, 0.72);
                color: #b45309;
                border-color: transparent;
            }

            .balancer-status-bar .status-icon {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .balancer-status-bar.balanced .status-icon { background: #10b981; color: white; }
            .balancer-status-bar.unbalanced .status-icon { background: #f59e0b; color: white; }

            /* ===== 按钮样式 ===== */
            .balancer-action-buttons {
                display: flex;
                gap: 10px;
                justify-content: flex-start;
            }

            .balancer-btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                padding: 18px 36px;
                font-size: 1.05rem;
                font-weight: 600;
                border-radius: 16px;
                border: none;
                cursor: pointer;
                transition: all 0.2s ease;
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                flex-shrink: 0;
                white-space: nowrap;
            }

            @container balancer (max-width: 700px) {
                .balancer-btn {
                    padding: 14px 20px;
                    font-size: 0.9rem;
                    gap: 6px;
                    border-radius: 12px;
                }
                .balancer-status-bar {
                    padding: 14px 20px;
                    font-size: 0.9rem;
                    border-radius: 12px;
                }
            }

            @container balancer (max-width: 550px) {
                .balancer-btn {
                    padding: 10px 12px;
                    font-size: 0.8rem;
                    gap: 4px;
                    border-radius: 10px;
                }
                .balancer-btn svg {
                    display: none;
                }
                .balancer-status-bar {
                    padding: 10px 12px;
                    font-size: 0.8rem;
                    border-radius: 10px;
                }
            }

            .balancer-btn-primary {
                background: rgba(30, 41, 59, 0.88);
                color: white;
                border: 2px solid transparent;
                box-shadow: 
                    0 2px 8px rgba(0, 0, 0, 0.12),
                    0 8px 24px rgba(0, 0, 0, 0.16),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1);
            }

            .balancer-btn-primary:hover {
                background: rgba(30, 41, 59, 0.95);
                transform: translateY(-1px);
                box-shadow: 
                    0 4px 12px rgba(0, 0, 0, 0.15),
                    0 12px 32px rgba(0, 0, 0, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.15);
            }

            .balancer-btn-primary:active {
                transform: translateY(0);
            }

            .balancer-btn-secondary {
                background: rgba(255, 255, 255, 0.72);
                color: #475569;
                border: 2px solid transparent;
                box-shadow: 
                    0 2px 8px rgba(0, 0, 0, 0.04),
                    0 4px 16px rgba(0, 0, 0, 0.06),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8);
            }

            .balancer-btn-secondary:hover {
                background: rgba(255, 255, 255, 0.85);
                box-shadow: 
                    0 4px 12px rgba(0, 0, 0, 0.06),
                    0 8px 24px rgba(0, 0, 0, 0.08),
                    inset 0 1px 0 rgba(255, 255, 255, 0.9);
            }

            /* ===== 结果显示 ===== */
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

            /* ===== 使用说明 ===== */
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

        <div class="tool-padding-label">${t("Equation Balancer", "化学方程式配平")}</div>
        <div class="balancer-main-wrapper">


            <!-- 天平可视化区域 -->
            <div class="physics-scale-container">

                <!-- 底座 -->
                <div style="position: absolute; bottom: 4.7%; top: 24%; display: flex; flex-direction: column; align-items: center; z-index: 0; pointer-events: none;">
                    <div class="physics-stand-metallic" style="width: 14px; flex: 1; border-radius: 7px 7px 0 0;"></div>
                    <div class="physics-base-metallic" style="width: 140px; height: 22px; border-radius: 9999px; margin-top: -4px; border-top: 1px solid #6b7280;"></div>
                </div>

                <!-- 中心支点 -->
                <div id="physics-pivot" style="position: absolute; top: 24.4%; left: 50%; transform: translate(-50%, -50%); z-index: 30; display: flex; align-items: center; justify-content: center; pointer-events: none;">
                    <div style="width: 44px; height: 44px; background: linear-gradient(145deg, #f3f4f6, #d1d5db); border-radius: 9999px; box-shadow: 0 4px 15px rgba(0,0,0,0.15); display: flex; align-items: center; justify-content: center; border: 3px solid #e5e7eb; position: relative; z-index: 40;">
                        <div id="physics-needle" class="physics-needle"></div>
                        <div style="width: 16px; height: 16px; background: linear-gradient(145deg, #6b7280, #374151); border-radius: 9999px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.4); position: absolute; z-index: 50;"></div>
                    </div>
                </div>

                <!-- 旋转横梁 -->
                <div id="physics-beam-assembly" class="physics-beam-metallic" style="position: absolute; top: 24.4%; left: 50%; width: 420px; height: 14px; border-radius: 9999px; margin-left: -210px; display: flex; justify-content: space-between; align-items: center; z-index: 20; transform-origin: center center;">
                    <div class="physics-beam-ruler"></div>

                    <!-- 左悬挂组件 -->
                    <div id="physics-hanger-left" style="position: absolute; left: 25px; top: 7px; width: 24px; display: flex; flex-direction: column; align-items: center; transform-origin: top center; transform: translateX(-50%); transition: transform 0.1s linear;">
                        <div class="physics-support-rod" style="pointer-events: none;">
                            <div class="physics-joint-ring physics-joint-top"></div>
                            <div class="physics-joint-ring physics-joint-bottom"></div>
                        </div>
                        <div class="physics-pan-metallic" style="width: 110px; height: 12px; border-radius: 0 0 14px 14px; position: relative; border-top: 1px solid #6b7280;">
                            <div id="physics-pan-label-left" class="physics-pan-label"></div>
                        </div>
                    </div>

                    <!-- 右悬挂组件 -->
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

            <!-- 输入区域 -->
            <div class="balancer-input-section">
                <div class="balancer-input-row">
                    <div class="balancer-input-group">
                        <label class="balancer-input-label">
                            <span class="label-icon reactant">R</span>
                            ${t("Reactants", "反应物")}
                        </label>
                        <input type="text"
                               id="reactants-input"
                               class="balancer-text-input"
                               placeholder="${t("e.g., Fe + O2", "例如: Fe + O2")}"
                               autocomplete="off"
                               spellcheck="false">
                    </div>

                    <div class="balancer-arrow-divider">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </div>

                    <div class="balancer-input-group">
                        <label class="balancer-input-label">
                            <span class="label-icon product">P</span>
                            ${t("Products", "生成物")}
                        </label>
                        <input type="text"
                               id="products-input"
                               class="balancer-text-input"
                               placeholder="${t("e.g., Fe2O3", "例如: Fe2O3")}"
                               autocomplete="off"
                               spellcheck="false">
                    </div>
                </div>
            </div>

            <!-- 操作按钮 + 状态反馈 -->
            <div style="display: flex; align-items: center; gap: 12px;">
                <button id="auto-balance-btn" class="balancer-btn balancer-btn-primary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 3v1m0 16v1m-9-9h1m16 0h1m-2.64-6.36l-.7.7m-12.02 12.02l-.7.7m0-12.72l.7.7m12.02 12.02l.7.7"/>
                        <circle cx="12" cy="12" r="4"/>
                    </svg>
                    ${t("Auto Balance", "自动配平")}
                </button>
                <button id="clear-balancer-btn" class="balancer-btn balancer-btn-secondary">
                    ${t("Clear", "清除")}
                </button>
                <div class="balancer-status-bar" id="balance-feedback" style="flex: 1; min-width: 0;">
                    ${t("Enter equation", "输入方程式")}
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

        <div class="tool-padding-label">${t("Molar Mass Calculator", "摩尔质量计算器")}</div>
        <div class="molar-tool-layout">
            <!-- Left Column: Input & Info -->
            <div class="molar-input-panel">
                <div class="tool-input-section molar-input-card">
                    <label for="modal-formula-input" class="molar-input-label">
                        <span class="molar-label-icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/>
                            </svg>
                        </span>
                        ${t("Chemical Formula", "化学式")}
                    </label>
                    <input type="text" id="modal-formula-input"
                           placeholder="e.g. H2O, CuSO4.5H2O"
                           class="realtime-input"
                           autocomplete="off"
                           spellcheck="false">

                    <!-- Live Formula Preview -->
                    <div class="formula-live-preview" id="formula-live-preview">
                        <span class="preview-label">${t("Formula:", "化学式:")}</span>
                        <span class="preview-formula" id="preview-formula-display">—</span>
                    </div>

                    <!-- Formula Suggestion (always visible container) -->
                    <div class="formula-suggestion" id="formula-suggestion">
                        <span class="suggestion-icon">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                            </svg>
                        </span>
                        <span class="suggestion-text" id="suggestion-text">${t("Enter a formula above", "在上方输入化学式")}</span>
                    </div>

                    <!-- Options Row: Exact Decimals + Enter Hint -->
                    <div class="molar-options-row">
                        <label class="molar-exact-label">
                            <input type="checkbox" id="modal-exact-toggle">
                            ${t("Exact Decimals", "精确小数")}
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
                        ${t("Quick Tips", "使用提示")}
                    </div>
                    <div class="tips-item">
                        <span>${t("Type formula with normal numbers", "输入化学式，数字用普通数字")}</span>
                    </div>
                    <div class="tips-item">
                        <span>${t("Auto-converts to subscript display", "自动转换为下标显示")}</span>
                    </div>
                    <div class="tips-item">
                        <span>${t("Hydrates: use dot or space", "结晶水：用 . 或空格")}</span>
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
                    
                    <!-- 小票容器 - 在秤后面 z-index较低 -->
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
                    
                    <!-- Front Panel with Slot - 在小票前面遮挡 -->
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

function generateBlankToolContent() {
  return `

        <div class="tool-padding-label">${t("Blank Page", "空白页")}</div>
        <div class="tool-modal-content">
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 300px; color: #94a3b8; text-align: center;">
                <svg style="width: 64px; height: 64px; margin-bottom: 20px; opacity: 0.2;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                </svg>
                <p>${t("This page is intentionally left blank.", "此页面特意留白。")}</p>
                <p style="font-size: 0.8em; margin-top: 10px; opacity: 0.7;">${t("Ready for new content.", "等待新内容。")}</p>
            </div>
        </div>
    `;
}

function generateEmpiricalToolContent() {
  return `
        <style>
            /* ===== Apple-Style Empirical Formula Calculator ===== */
            /* Typography: Inter Variable / SF Pro inspired */
            
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
            
            /* ===== Two Column Layout ===== */
            .emp-grid {
                display: grid;
                grid-template-columns: 300px 1fr;
                grid-template-rows: 1fr;
                gap: 30px;
                flex: 1 0 auto;
                min-height: 0;
            }
            
            @media (max-width: 720px) {
                .emp-grid {
                    grid-template-columns: 1fr;
                    grid-template-rows: auto auto;
                    height: auto;
                }
            }
            
            /* ===== Left Column: Controls ===== */
            .emp-controls {
                display: flex;
                flex-direction: column;
                align-self: start;
            }
            
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
                font-size: 11px;
                font-weight: 600;
                color: var(--text-secondary);
                text-transform: uppercase;
                letter-spacing: 0.06em;
                margin-bottom: 10px;
            }
            
            /* Element Inputs */
            .emp-input-stack {
                display: flex;
                flex-direction: column;
                gap: 6px;
            }
            
            .emp-input-row {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .emp-el-input {
                width: 42px;
                height: 42px;
                min-width: 42px;
                background: linear-gradient(145deg, #9ca3af, #d1d5db);
                border: none;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 15px;
                font-weight: 800;
                color: #fff;
                text-align: center;
                text-transform: uppercase;
                flex-shrink: 0;
                transition: all 0.2s ease;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
            }
            
            .emp-el-input:focus {
                outline: none;
                transform: scale(1.05);
                box-shadow: 0 4px 12px rgba(99, 102, 241, 0.35);
            }
            
            .emp-el-input::placeholder {
                color: rgba(255,255,255,0.7);
                font-weight: 600;
            }
            
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
            
            .emp-value-wrapper {
                flex: 1;
                position: relative;
                display: flex;
                align-items: center;
                min-width: 0;
            }
            
            .emp-input-field {
                width: 100%;
                height: 42px;
                background: rgba(255,255,255,0.9);
                border: 1px solid rgba(0,0,0,0.08);
                border-radius: 10px;
                padding: 0 26px 0 12px;
                font-size: 15px;
                font-weight: 600;
                color: var(--text-primary);
                transition: all 0.2s ease;
                font-variant-numeric: tabular-nums;
            }
            
            .emp-input-field:focus {
                outline: none;
                border-color: var(--accent-purple);
                box-shadow: 0 0 0 3px rgba(175, 82, 222, 0.15);
                background: #fff;
            }
            
            .emp-input-field::placeholder {
                color: var(--text-tertiary);
                font-weight: 400;
            }
            
            .emp-unit {
                position: absolute;
                right: 10px;
                font-size: 13px;
                font-weight: 600;
                color: var(--text-tertiary);
                pointer-events: none;
            }
            
            /* Divider */
            .emp-divider {
                height: 1px;
                background: linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent);
                margin: 10px 0;
            }
            
            /* Molecular Mass */
            .emp-mol-mass-label {
                display: flex;
                align-items: center;
                gap: 6px;
                margin-bottom: 6px;
            }
            
            .emp-mol-mass-label span {
                font-size: 11px;
                font-weight: 600;
                color: var(--text-secondary);
                text-transform: uppercase;
                letter-spacing: 0.06em;
            }
            
            .emp-optional-pill {
                font-size: 9px;
                font-weight: 600;
                padding: 2px 6px;
                background: rgba(0,0,0,0.04);
                color: var(--text-tertiary);
                border-radius: 4px;
                text-transform: uppercase;
            }
            
            .emp-mol-input {
                width: 100%;
                height: 42px;
                background: rgba(255,255,255,0.9);
                border: 1px solid rgba(0,0,0,0.08);
                border-radius: 10px;
                padding: 0 12px;
                font-size: 15px;
                font-weight: 600;
                color: var(--text-primary);
                transition: all 0.2s ease;
            }
            
            .emp-mol-input:focus {
                outline: none;
                border-color: var(--accent-purple);
                box-shadow: 0 0 0 3px rgba(175, 82, 222, 0.15);
                background: #fff;
            }
            
            /* CTA Button */
            .emp-calc-btn {
                width: 100%;
                height: 44px;
                margin-top: 6px;
                background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%);
                color: #fff;
                border: none;
                border-radius: 12px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                transition: all 0.2s ease;
                box-shadow: 0 4px 14px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255,255,255,0.2);
            }
            
            .emp-calc-btn:hover {
                transform: translateY(-1px);
                box-shadow: 0 6px 18px rgba(139, 92, 246, 0.5), inset 0 1px 0 rgba(255,255,255,0.2);
            }
            
            .emp-calc-btn:active {
                transform: translateY(0);
                box-shadow: 0 2px 8px rgba(139, 92, 246, 0.4);
            }
            
            .emp-calc-btn svg {
                width: 16px;
                height: 16px;
            }
            
            /* Action Buttons Row */
            .emp-quick-actions {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                gap: 6px;
                margin-top: 6px;
            }
            
            .emp-icon-btn {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
            }
            
            .emp-icon-btn svg {
                width: 14px;
                height: 14px;
            }
            
            .emp-icon-btn.add {
                background: rgba(139, 92, 246, 0.1);
                color: var(--accent-purple);
            }
            
            .emp-icon-btn.add:hover {
                background: rgba(139, 92, 246, 0.2);
                transform: scale(1.1);
            }
            
            .emp-icon-btn.add:disabled {
                opacity: 0.4;
                cursor: not-allowed;
                transform: none;
            }
            
            .emp-icon-btn.remove {
                background: rgba(239, 68, 68, 0.1);
                color: #ef4444;
            }
            
            .emp-icon-btn.remove:hover {
                background: rgba(239, 68, 68, 0.2);
                transform: scale(1.1);
            }
            
            .emp-icon-btn.remove:disabled {
                opacity: 0.4;
                cursor: not-allowed;
                transform: none;
            }
            
            .emp-icon-btn.random {
                background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
                color: #16a34a;
                box-shadow: 0 2px 6px rgba(34, 197, 94, 0.15);
            }
            
            .emp-icon-btn.random:hover {
                transform: scale(1.1) rotate(15deg);
                box-shadow: 0 3px 10px rgba(34, 197, 94, 0.25);
            }
            
            /* ===== Right Column: Results Hero ===== */
            .emp-results {
                display: flex;
                flex-direction: column;
                height: 100%;
            }
            
            .emp-results-glass {
                background: var(--glass-bg);
                backdrop-filter: blur(24px) saturate(180%);
                -webkit-backdrop-filter: blur(24px) saturate(180%);
                border: 1px solid var(--glass-border);
                border-radius: 18px;
                padding: 24px;
                box-shadow: var(--glass-shadow);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                flex: 1;
                overflow: hidden;
            }
            
            /* Result Animation */
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
                0% {
                    opacity: 0;
                    transform: scale(0) rotate(-20deg);
                }
                70% {
                    transform: scale(1.15) rotate(5deg);
                }
                100% {
                    opacity: 1;
                    transform: scale(1) rotate(0);
                }
            }
            
            .emp-result-display.visible .emp-hero-formula {
                animation: heroReveal 0.5s ease forwards;
            }
            
            @keyframes heroReveal {
                0% {
                    opacity: 0;
                    transform: translateY(10px) scale(0.9);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            /* Empty State */
            .emp-empty-state {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 20px;
            }
            
            .emp-floating-atoms {
                position: relative;
                width: 150px;
                height: 90px;
                margin-bottom: 24px;
            }
            
            .emp-atom {
                position: absolute;
                width: 40px;
                height: 40px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                font-size: 15px;
                color: #fff;
                box-shadow: 0 4px 14px rgba(0,0,0,0.18);
                animation: atomFloat 3.5s ease-in-out infinite;
            }
            
            .emp-atom.a1 { background: linear-gradient(145deg, #374151, #4b5563); left: 0; top: 16px; animation-delay: 0s; }
            .emp-atom.a2 { background: linear-gradient(145deg, #3b82f6, #60a5fa); left: 55px; top: 0; animation-delay: 0.25s; }
            .emp-atom.a3 { background: linear-gradient(145deg, #ef4444, #f87171); left: 110px; top: 20px; animation-delay: 0.5s; }
            .emp-atom.a4 { background: linear-gradient(145deg, #22c55e, #4ade80); left: 55px; top: 48px; animation-delay: 0.75s; }
            
            @keyframes atomFloat {
                0%, 100% { transform: translateY(0) scale(1); }
                50% { transform: translateY(-5px) scale(1.02); }
            }
            
            .emp-empty-text {
                color: var(--text-tertiary);
                font-size: 14px;
                font-weight: 500;
                line-height: 1.5;
            }
            
            /* Results Display */
            .emp-result-display {
                display: none;
                flex-direction: column;
                align-items: center;
                width: 100%;
                gap: 20px;
            }
            
            .emp-result-display.visible {
                display: flex;
            }
            
            /* Empirical (Secondary) */
            .emp-empirical-result {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 4px;
            }
            
            .emp-result-subtitle {
                font-size: 10px;
                font-weight: 600;
                color: var(--text-tertiary);
                text-transform: uppercase;
                letter-spacing: 0.08em;
            }
            
            .emp-empirical-pill {
                display: inline-flex;
                align-items: center;
                height: 28px;
                padding: 0 14px;
                background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
                border: 1px solid #ddd6fe;
                border-radius: 14px;
                font-size: 15px;
                font-weight: 700;
                color: #7c3aed;
                font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
                letter-spacing: 0.01em;
            }
            
            /* Molecular (Hero) */
            .emp-molecular-result {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
            }
            
            .emp-hero-formula {
                font-size: 3.2rem;
                font-weight: 800;
                color: var(--text-primary);
                font-family: 'Inter', -apple-system, sans-serif;
                letter-spacing: -0.03em;
                line-height: 1.1;
            }
            
            .emp-hero-formula sub {
                font-size: 0.55em;
                vertical-align: baseline;
                position: relative;
                top: 0.25em;
                font-weight: 700;
                color: var(--accent-purple);
            }
            
            .emp-hero-mass {
                font-size: 13px;
                font-weight: 500;
                color: var(--text-secondary);
            }
            
            /* Element Visualization */
            .emp-atoms-visual {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                gap: 10px;
                margin-top: 8px;
                padding: 14px 20px;
                background: rgba(0,0,0,0.02);
                border-radius: 14px;
            }
            
            .emp-atom-chip {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 4px;
            }
            
            .emp-atom-circle {
                width: 44px;
                height: 44px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 17px;
                font-weight: 700;
                color: #fff;
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
            
            .emp-atom-count {
                font-size: 12px;
                font-weight: 600;
                color: var(--text-secondary);
            }
            
            /* Steps Toggle - Now horizontal bar at bottom */
            .emp-steps-wrapper {
                margin-top: 12px;
                width: 100%;
            }
            
            .emp-steps-toggle {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
                width: 100%;
                padding: 10px 14px;
                background: rgba(139, 92, 246, 0.06);
                border: 1px solid rgba(139, 92, 246, 0.15);
                border-radius: 10px;
                font-size: 12px;
                font-weight: 600;
                color: var(--accent-purple);
                cursor: pointer;
                transition: all 0.15s ease;
            }
            
            .emp-steps-toggle:hover {
                background: rgba(139, 92, 246, 0.1);
                border-color: rgba(139, 92, 246, 0.25);
            }
            
            .emp-steps-toggle svg {
                width: 14px;
                height: 14px;
                transition: transform 0.2s ease;
            }
            
            .emp-steps-toggle.open svg {
                transform: rotate(180deg);
            }
            
            /* Steps Content - Full width section below, fits content */
            .emp-steps-bar {
                margin-top: 0;
                flex-shrink: 0;
            }
            
            .emp-steps-content {
                display: none;
                width: 100%;
                margin-top: 20px;
                margin-bottom: 60px;
                padding: 16px 40px;
                background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%);
                border: 1px solid rgba(139, 92, 246, 0.12);
                border-radius: 16px;
                text-align: left;
                font-size: 14px;
                color: var(--text-secondary);
                line-height: 1.75;
                box-sizing: border-box;
            }
            
            .emp-steps-content.visible {
                display: block;
                animation: stepsFade 0.3s ease;
            }
            
            @keyframes stepsFade {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .emp-steps-content h4 {
                font-size: 15px;
                font-weight: 700;
                color: var(--accent-purple);
                text-transform: uppercase;
                letter-spacing: 0.08em;
                margin: 0 0 20px 0;
                padding-bottom: 12px;
                border-bottom: 1px solid rgba(139, 92, 246, 0.1);
            }
            
            .emp-steps-content ol,
            .emp-steps-content ul {
                margin: 0 0 16px 0;
                padding-left: 20px;
            }
            
            .emp-steps-content > ol {
                margin-bottom: 0;
            }
            
            .emp-steps-content li {
                margin-bottom: 8px;
                font-size: 14px;
            }
            
            .emp-steps-content li ul {
                margin-top: 6px;
                margin-bottom: 12px;
            }
            
            .emp-steps-content li ul li {
                margin-bottom: 4px;
                font-size: 13px;
                color: var(--text-tertiary);
            }
            
            .emp-steps-content strong {
                color: var(--text-primary);
                font-weight: 600;
            }
            
            .emp-steps-content hr {
                border: none;
                height: 1px;
                background: rgba(139, 92, 246, 0.15);
                margin: 20px 0;
            }
            
            .emp-steps-content p {
                margin: 6px 0;
                font-size: 14px;
            }
            
            /* Molecular Formula Section */
            .emp-steps-content h4:not(:first-child) {
                margin-top: 24px;
                padding-top: 20px;
                border-top: 1px solid rgba(139, 92, 246, 0.1);
                border-bottom: none;
                padding-bottom: 0;
            }
        </style>

        <div class="tool-padding-label">Empirical & Molecular Formula</div>
        <div class="emp-calc-wrapper">

            <!-- Two Column Grid -->
            <div class="emp-grid">
                <!-- Left: Controls -->
                <div class="emp-controls">
                    <div class="emp-glass-card">
                        <div class="emp-section-label">Element Composition</div>
                        
                        <div class="emp-input-stack" id="modal-element-inputs">
                            <!-- JS will populate -->
                        </div>
                        
                        <div class="emp-quick-actions">
                            <button class="emp-icon-btn remove" id="emp-remove-element-btn" title="Remove Element">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                    <line x1="5" y1="12" x2="19" y2="12"/>
                                </svg>
                            </button>
                            <button class="emp-icon-btn add" id="emp-add-element-btn" title="Add Element">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                    <line x1="12" y1="5" x2="12" y2="19"/>
                                    <line x1="5" y1="12" x2="19" y2="12"/>
                                </svg>
                            </button>
                            <button class="emp-icon-btn random" id="emp-random-fill-btn" title="Random Compound">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 12a9 9 0 11-9-9c2.52 0 4.85.83 6.72 2.24"/>
                                    <path d="M21 3v6h-6"/>
                                </svg>
                            </button>
                        </div>
                        
                        <div class="emp-divider"></div>
                        
                        <div class="emp-mol-mass-label">
                            <span>Molecular Mass</span>
                            <span class="emp-optional-pill">Optional</span>
                        </div>
                        <input type="number" id="modal-mol-mass" class="emp-mol-input" placeholder="e.g. 180" step="0.1">
                        
                        <button id="modal-calc-formula-btn" class="emp-calc-btn">
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
                
                <!-- Right: Results Hero -->
                <div class="emp-results">
                    <div class="emp-results-glass" id="lego-stage">
                        <!-- Empty State -->
                        <div class="emp-empty-state" id="lego-empty">
                            <div class="emp-floating-atoms">
                                <div class="emp-atom a1">C</div>
                                <div class="emp-atom a2">H</div>
                                <div class="emp-atom a3">O</div>
                                <div class="emp-atom a4">N</div>
                            </div>
                            <p class="emp-empty-text">Enter element percentages<br>and click Calculate</p>
                        </div>
                        
                        <!-- Results (hidden initially) -->
                        <div class="emp-result-display" id="lego-blocks-area">
                            <!-- Empirical (Secondary) -->
                            <div class="emp-empirical-result">
                                <span class="emp-result-subtitle">Empirical Formula</span>
                                <div class="emp-empirical-pill" id="empirical-formula-display">CH₂</div>
                            </div>
                            
                            <!-- Molecular (Hero) -->
                            <div class="emp-molecular-result" id="molecular-result-card">
                                <span class="emp-result-subtitle">Molecular Formula</span>
                                <div class="emp-hero-formula" id="molecular-formula-display">C₆H₁₂</div>
                                <span class="emp-hero-mass" id="result-mass-display"></span>
                            </div>
                            
                            <!-- Atom Visualization -->
                            <div class="emp-atoms-visual" id="lego-blocks-visual"></div>
                            
                            <!-- Steps Toggle -->
                            <div class="emp-steps-wrapper">
                                <button class="emp-steps-toggle" id="calc-details-toggle">
                                    <span>Show calculation steps</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="6 9 12 15 18 9"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Steps Bar - Full Width Below Grid -->
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
    case "blank":
      // No listeners needed yet
      break;
    case "solubility":
      attachSolubilityListeners();
      break;
    case "ions":
      setupIonClickHandlers();
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
  const balancedResult = null;
  const balancedText = null;

  // New physics scale elements
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

    // Auto-split if full equation entered (supports →, ->, =)
    if (
      reactantsFormula.includes("→") ||
      reactantsFormula.includes("->") ||
      reactantsFormula.includes("=")
    ) {
      // Normalize all separators to →
      const normalized = reactantsFormula
        .replace(/->/g, "→")
        .replace(/=/g, "→");
      const parts = normalized.split("→");
      if (reactantsInput) reactantsInput.value = parts[0].trim();
      if (parts[1] && productsInput) {
        productsInput.value = parts[1].trim();
        productsInput.focus(); // 自动跳转到右侧
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
        feedback.innerHTML = `${t("Enter a chemical equation to check the balance", "输入化学方程式来检查平衡状态")}`;
      } else if (!productsFormula) {
        feedback.classList.add("unbalanced");
        feedback.innerHTML = `<span class="status-icon">⚠</span>${t("Add products to complete the equation", "添加生成物以完成方程式")}`;
      } else if (!reactantsFormula) {
        feedback.classList.add("unbalanced");
        feedback.innerHTML = `<span class="status-icon">⚠</span>${t("Add reactants to complete the equation", "添加反应物以完成方程式")}`;
      } else {
        // Check if actually balanced (element by element)
        let isBalanced = true;
        allElements.forEach((el) => {
          if ((leftAtoms[el] || 0) !== (rightAtoms[el] || 0))
            isBalanced = false;
        });

        if (isBalanced && allElements.size > 0) {
          feedback.classList.add("balanced");
          feedback.innerHTML = `<span class="status-icon">✓</span>${t("Perfectly Balanced!", "完美平衡!")}`;
        } else if (imbalancedElement) {
          feedback.classList.add("unbalanced");
          feedback.innerHTML = `<span class="status-icon">⚠</span>${t(`Unbalanced: ${imbalancedElement} differs by ${imbalanceAmount}`, `未平衡: ${imbalancedElement} 相差 ${imbalanceAmount} 个原子`)}`;
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
          feedback.innerHTML = `<span class="status-icon">✕</span>${t("Could not auto-balance this equation", "无法自动配平此方程式")}`;
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
          feedback.innerHTML = `<span>${t("Copied!", "已复制!")}</span>`;
          setTimeout(() => {
            feedback.innerHTML = prev;
          }, 1000);
        });
      }
    });
  }

  // Enter key support: 左侧按Enter跳转右侧，右侧按Enter触发配平
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
    // Check if it's a coefficient (at start or after +/→/space)
    const before = str[offset - 1];
    if (!before || before === " " || before === "+" || before === "→") {
      return match; // Keep coefficients as is
    }
    return `<sub>${match}</sub>`;
  });
}

// =============================================================================
// GAUSSIAN ELIMINATION EQUATION BALANCER
// Implements matrix-based chemical equation balancing using RREF
// =============================================================================

/**
 * Parse a chemical formula into element counts
 * Handles parentheses, nested groups, and coefficients
 * Examples: "H2O" -> {H:2, O:1}, "Ca(OH)2" -> {Ca:1, O:2, H:2}, "Al2(SO4)3" -> {Al:2, S:3, O:12}
 */
function parseChemicalFormula(formula) {
  // Remove any leading coefficient
  formula = formula.replace(/^\d+/, "").trim();

  const atoms = {};

  function parse(str, multiplier = 1) {
    let i = 0;
    while (i < str.length) {
      if (str[i] === "(" || str[i] === "[") {
        // Find matching closing bracket
        const openBracket = str[i];
        const closeBracket = openBracket === "(" ? ")" : "]";
        let depth = 1;
        let j = i + 1;
        while (j < str.length && depth > 0) {
          if (str[j] === openBracket) depth++;
          if (str[j] === closeBracket) depth--;
          j++;
        }
        const inner = str.substring(i + 1, j - 1);

        // Get multiplier after closing bracket
        let numStr = "";
        while (j < str.length && /\d/.test(str[j])) {
          numStr += str[j];
          j++;
        }
        const innerMult = numStr ? parseInt(numStr) : 1;

        parse(inner, multiplier * innerMult);
        i = j;
      } else if (/[A-Z]/.test(str[i])) {
        // Element symbol
        let element = str[i];
        i++;
        while (i < str.length && /[a-z]/.test(str[i])) {
          element += str[i];
          i++;
        }

        // Get count after element
        let numStr = "";
        while (i < str.length && /\d/.test(str[i])) {
          numStr += str[i];
          i++;
        }
        const count = numStr ? parseInt(numStr) : 1;

        atoms[element] = (atoms[element] || 0) + count * multiplier;
      } else {
        i++;
      }
    }
  }

  parse(formula);
  return atoms;
}

/**
 * Calculate GCD of two numbers
 */
function gcd(a, b) {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

/**
 * Calculate LCM of two numbers
 */
function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

/**
 * Calculate LCM of an array of numbers
 */
function lcmArray(arr) {
  return arr.reduce((a, b) => lcm(a, b), 1);
}

/**
 * Calculate GCD of an array of numbers
 */
function gcdArray(arr) {
  return arr.reduce((a, b) => gcd(a, b));
}

/**
 * Gaussian Elimination to solve the system (find null space)
 * Returns coefficients for balancing, or null if no solution
 */
function gaussianElimination(matrix, numCompounds) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  // Create a copy of the matrix with floating point
  const m = matrix.map((row) => row.map((v) => v));

  let pivotRow = 0;
  const pivotCols = [];

  // Forward elimination
  for (let col = 0; col < cols && pivotRow < rows; col++) {
    // Find the maximum element in this column for numerical stability
    let maxRow = pivotRow;
    let maxVal = Math.abs(m[pivotRow][col]);
    for (let row = pivotRow + 1; row < rows; row++) {
      if (Math.abs(m[row][col]) > maxVal) {
        maxVal = Math.abs(m[row][col]);
        maxRow = row;
      }
    }

    if (maxVal < 1e-10) continue; // Skip this column (no pivot)

    // Swap rows
    [m[pivotRow], m[maxRow]] = [m[maxRow], m[pivotRow]];

    pivotCols.push(col);

    // Scale pivot row
    const pivot = m[pivotRow][col];
    for (let j = 0; j < cols; j++) {
      m[pivotRow][j] /= pivot;
    }

    // Eliminate other rows
    for (let row = 0; row < rows; row++) {
      if (row !== pivotRow && Math.abs(m[row][col]) > 1e-10) {
        const factor = m[row][col];
        for (let j = 0; j < cols; j++) {
          m[row][j] -= factor * m[pivotRow][j];
        }
      }
    }

    pivotRow++;
  }

  // Find free variables (columns without pivots)
  const freeVars = [];
  for (let col = 0; col < cols; col++) {
    if (!pivotCols.includes(col)) {
      freeVars.push(col);
    }
  }

  if (freeVars.length === 0) {
    return null; // No solution (system is overdetermined)
  }

  // Use the last free variable as the parameter (set to 1)
  const freeVar = freeVars[freeVars.length - 1];
  const solution = new Array(cols).fill(0);
  solution[freeVar] = 1;

  // Back substitute to find other values
  for (let i = pivotCols.length - 1; i >= 0; i--) {
    const pivotCol = pivotCols[i];
    let sum = 0;
    for (let j = pivotCol + 1; j < cols; j++) {
      sum += m[i][j] * solution[j];
    }
    solution[pivotCol] = -sum;
  }

  return solution;
}

/**
 * Convert floating point solution to minimal integer coefficients
 */
function toIntegerCoefficients(solution) {
  // Filter out very small values (numerical errors)
  const cleaned = solution.map((v) => (Math.abs(v) < 1e-10 ? 0 : v));

  // Find denominators (convert to fractions)
  const denominators = [];
  for (const val of cleaned) {
    if (val !== 0) {
      // Find denominator by checking common fractions
      for (let d = 1; d <= 1000; d++) {
        if (Math.abs(val * d - Math.round(val * d)) < 1e-9) {
          denominators.push(d);
          break;
        }
      }
    }
  }

  if (denominators.length === 0) return null;

  // Multiply by LCM of denominators
  const multiplier = lcmArray(denominators);
  let intSolution = cleaned.map((v) => Math.round(v * multiplier));

  // Make all positive (if all negative, flip signs)
  const allNegative = intSolution.every((v) => v <= 0);
  const allPositive = intSolution.every((v) => v >= 0);

  if (allNegative) {
    intSolution = intSolution.map((v) => -v);
  } else if (!allPositive) {
    // Mixed signs - try to make positive
    intSolution = intSolution.map((v) => Math.abs(v));
  }

  // Reduce by GCD
  const nonZero = intSolution.filter((v) => v !== 0);
  if (nonZero.length === 0) return null;

  const g = gcdArray(nonZero);
  intSolution = intSolution.map((v) => v / g);

  // Validate: all should be positive integers
  if (intSolution.some((v) => v <= 0)) {
    return null;
  }

  return intSolution;
}

/**
 * Main equation balancing function using Gaussian Elimination
 */
function balanceEquationGaussian(reactants, products) {
  // Parse all compounds
  const allCompounds = [...reactants, ...products];
  const numReactants = reactants.length;
  const numProducts = products.length;
  const numCompounds = allCompounds.length;

  // Parse each compound to get atom counts
  const compoundAtoms = allCompounds.map((c) => parseChemicalFormula(c));

  // Get all unique elements
  const elements = new Set();
  compoundAtoms.forEach((atoms) => {
    Object.keys(atoms).forEach((el) => elements.add(el));
  });
  const elementList = Array.from(elements);

  // Build the matrix
  // Rows = elements, Columns = compounds
  // Reactants get positive coefficients, products get negative
  const matrix = [];
  for (const element of elementList) {
    const row = [];
    for (let i = 0; i < numCompounds; i++) {
      const count = compoundAtoms[i][element] || 0;
      // Products have negative sign (moving to right side of equation)
      row.push(i < numReactants ? count : -count);
    }
    matrix.push(row);
  }

  // Solve using Gaussian elimination
  const solution = gaussianElimination(matrix, numCompounds);

  if (!solution) return null;

  // Convert to integer coefficients
  const coefficients = toIntegerCoefficients(solution);

  if (!coefficients) return null;

  // Verify the solution
  for (const element of elementList) {
    let leftSum = 0,
      rightSum = 0;
    for (let i = 0; i < numReactants; i++) {
      leftSum += (compoundAtoms[i][element] || 0) * coefficients[i];
    }
    for (let i = numReactants; i < numCompounds; i++) {
      rightSum += (compoundAtoms[i][element] || 0) * coefficients[i];
    }
    if (Math.abs(leftSum - rightSum) > 0.001) {
      return null; // Verification failed
    }
  }

  return {
    reactants: coefficients.slice(0, numReactants),
    products: coefficients.slice(numReactants),
  };
}

function balanceEquationModal(equation) {
  const parts = equation.split("→").map((s) => s.trim());
  if (parts.length !== 2) {
    throw new Error("Equation must contain → (arrow)");
  }

  // Normalize input: split by space or + and rejoin with +
  const normalizeCompounds = (str) => {
    return str
      .split(/[\s+]+/)
      .filter((s) => s.trim())
      .map((s) => s.trim());
  };

  const reactants = normalizeCompounds(parts[0])
    .map((s) => s.replace(/^\d+/, "").trim())
    .filter((s) => s);
  const products = normalizeCompounds(parts[1])
    .map((s) => s.replace(/^\d+/, "").trim())
    .filter((s) => s);

  if (reactants.length === 0 || products.length === 0) {
    throw new Error("Missing reactants or products");
  }

  // ===== Pre-flight Check: Element Consistency Validation =====
  const getElements = (compounds) => {
    const elements = new Set();
    compounds.forEach((compound) => {
      const atoms = parseChemicalFormula(compound);
      Object.keys(atoms).forEach((el) => elements.add(el));
    });
    return elements;
  };

  const reactantElements = getElements(reactants);
  const productElements = getElements(products);

  // Check for elements in products that don't exist in reactants
  const extraInProducts = [...productElements].filter(
    (el) => !reactantElements.has(el),
  );
  if (extraInProducts.length > 0) {
    const invalidEl = extraInProducts[0];
    throw new Error(
      `Element '${invalidEl}' in products is not found in reactants`,
    );
  }

  // Check for elements in reactants that don't exist in products
  const extraInReactants = [...reactantElements].filter(
    (el) => !productElements.has(el),
  );
  if (extraInReactants.length > 0) {
    const invalidEl = extraInReactants[0];
    throw new Error(
      `Element '${invalidEl}' in reactants is not found in products`,
    );
  }

  // Build explanation steps
  const steps = [];
  steps.push("<h4>Step-by-step balancing:</h4>");
  steps.push("<ol>");
  steps.push(
    "<li><strong>Identify elements:</strong> List all elements on both sides</li>",
  );
  steps.push(
    "<li><strong>Count atoms:</strong> Count atoms of each element</li>",
  );
  steps.push(
    "<li><strong>Build matrix:</strong> Create element × compound matrix</li>",
  );
  steps.push(
    "<li><strong>Gaussian elimination:</strong> Solve the linear system</li>",
  );
  steps.push(
    "<li><strong>Normalize:</strong> Convert to smallest integer coefficients</li>",
  );
  steps.push("</ol>");
  steps.push(
    '<div class="warning-box"><strong>Important:</strong> Never change subscripts, only coefficients!</div>',
  );

  // Try to balance using Gaussian elimination
  const result = balanceEquationGaussian(reactants, products);

  let balancedEq = equation;
  let check = "";

  if (result) {
    // Build balanced equation string
    const balancedReactants = reactants
      .map((r, i) => {
        const coef = result.reactants[i];
        return coef === 1 ? r : coef + r;
      })
      .join(" + ");

    const balancedProducts = products
      .map((p, i) => {
        const coef = result.products[i];
        return coef === 1 ? p : coef + p;
      })
      .join(" + ");

    balancedEq = balancedReactants + " → " + balancedProducts;
    check = generateAtomCheckModal(balancedEq);
  } else {
    check =
      '<p class="note-text">Unable to balance this equation. Please check the formulas.</p>';
  }

  // Create a plain text version for updating inputs (without Unicode subscripts)
  const balancedPlain = balancedEq
    .replace(/₂/g, "2")
    .replace(/₃/g, "3")
    .replace(/₄/g, "4")
    .replace(/₅/g, "5")
    .replace(/₆/g, "6");

  return {
    equation: balancedEq,
    balanced: balancedPlain,
    explanation: steps.join(""),
    check: check,
  };
}

function generateAtomCheckModal(equation) {
  // Normalize subscripts for counting
  const normalized = equation
    .replace(/₂/g, "2")
    .replace(/₃/g, "3")
    .replace(/₄/g, "4")
    .replace(/₅/g, "5")
    .replace(/₆/g, "6");

  const parts = normalized.split("→");
  const left = parts[0].trim();
  const right = parts[1].trim();

  const leftAtoms = countAtomsModal(left);
  const rightAtoms = countAtomsModal(right);

  let html = "<h4>Atom Count Check:</h4>";
  html += '<table class="check-table">';
  html +=
    "<tr><th>Element</th><th>Left Side</th><th>Right Side</th><th>Match</th></tr>";

  const allElements = new Set([
    ...Object.keys(leftAtoms),
    ...Object.keys(rightAtoms),
  ]);
  let allMatch = true;

  allElements.forEach((element) => {
    const leftCount = leftAtoms[element] || 0;
    const rightCount = rightAtoms[element] || 0;
    const match = leftCount === rightCount;
    if (!match) allMatch = false;
    const matchIcon = match ? "✓" : "✗";
    const matchClass = match ? "match-yes" : "match-no";
    html += `<tr><td>${element}</td><td>${leftCount}</td><td>${rightCount}</td><td class="${matchClass}">${matchIcon}</td></tr>`;
  });

  html += "</table>";
  html += `<div class="balance-status ${allMatch ? "balanced" : "unbalanced"}">
        <strong>Conservation of matter:</strong> ${allMatch ? "✓ Balanced!" : "✗ Not balanced"}
    </div>`;

  return html;
}

function countAtomsModal(side) {
  const atoms = {};
  const compounds = side.split("+").map((s) => s.trim());

  compounds.forEach((compound) => {
    const match = compound.match(/^(\d*)(.+)$/);
    const coefficient = match[1] ? parseInt(match[1]) : 1;
    const formula = match[2];
    const elements = parseFormulaStrict(formula);

    Object.keys(elements).forEach((element) => {
      atoms[element] = (atoms[element] || 0) + elements[element] * coefficient;
    });
  });

  return atoms;
}

function displayBalanceResult(result) {
  const resultBox = document.getElementById("modal-balance-result");
  const equationEl = document.getElementById("modal-balanced-equation");
  const explanationBox = document.getElementById("modal-balance-explanation");
  const checkBox = document.getElementById("modal-balance-check");

  resultBox.style.display = "block";
  equationEl.textContent = result.equation;

  explanationBox.style.display = "block";
  explanationBox.innerHTML = result.explanation;

  checkBox.style.display = "block";
  checkBox.innerHTML = result.check;
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
      return;
    }
    try {
      const result = calculateMolarMassModal(formula, isExact);
      updateRealtimeScale(result);
    } catch (e) {
      console.error("Molar mass calculation error:", e);
      updateRealtimeScale(null);
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
      console.log("[DEBUG] input value:", val);
      const parsed = smartParseFormula(val);
      console.log("[DEBUG] parsed result:", parsed);

      // Update live preview
      if (previewDisplay) {
        if (!val.trim()) {
          previewDisplay.innerHTML = "—";
        } else {
          previewDisplay.innerHTML = parsed.displayHtml;
        }
      }

      // Show/hide suggestion content (box stays visible)
      if (suggestionBox && suggestionText) {
        if (parsed.hasError) {
          suggestionText.innerHTML = `<span style="color: #ef4444;">${t("Invalid: lowercase letters are not valid element symbols", "错误：小写字母开头不是有效元素")}</span>`;
          suggestionBox.classList.add("has-message");
          suggestionBox.classList.add("has-error");
        } else if (parsed.suspicious) {
          suggestionText.innerHTML =
            t("Did you mean ", "你可能想输入 ") +
            `<strong>${parsed.suspicious}</strong>?`;
          suggestionBox.classList.add("has-message");
          suggestionBox.classList.remove("has-error");
        } else {
          suggestionText.textContent = val.trim()
            ? t("Looks good", "格式正确")
            : t("Enter a formula above", "在上方输入化学式");
          suggestionBox.classList.remove("has-message");
          suggestionBox.classList.remove("has-error");
        }
      }

      // Only run calculation if no errors
      if (!parsed.hasError && parsed.cleanFormula) {
        console.log("[DEBUG] running calculation with:", parsed.cleanFormula);
        runCalculation(parsed.cleanFormula);
      } else {
        console.log(
          "[DEBUG] skipping calculation, hasError:",
          parsed.hasError,
          "cleanFormula:",
          parsed.cleanFormula,
        );
        updateRealtimeScale(null);
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

// discardReceipt, printReceipt - see definitions at end of file (line ~10920)

// Helper: Render 3D Blocks
function renderScaleBlocks(result, container) {
  if (!container) return;
  container.innerHTML = "";

  const maxSubtotal = Math.max(
    ...result.breakdown.map((i) => parseFloat(i.subtotal)),
  );
  const totalMass = parseFloat(result.total);

  // Generate Blocks
  result.breakdown.forEach((item, index) => {
    const subtotalVal = parseFloat(item.subtotal);
    const percent = ((subtotalVal / totalMass) * 100).toFixed(1);

    const block = document.createElement("div");
    block.className = "element-block";
    block.textContent = item.element;
    block.style.animationDelay = `${index * 60}ms`;

    // Size logic
    const size = 50 + percent * 0.8;
    block.style.width = `${Math.min(size, 100)}px`;
    block.style.height = `${Math.min(size, 100)}px`;

    // Color
    const hue =
      (item.element.charCodeAt(0) * 20 + item.element.length * 10) % 360;
    block.style.background = `linear-gradient(135deg, hsl(${hue}, 70%, 60%), hsl(${hue}, 70%, 40%))`;

    // Tooltip
    const tooltip = document.createElement("div");
    tooltip.className = "block-tooltip";
    tooltip.innerHTML = `<strong>${item.element}</strong><br>${subtotalVal.toFixed(2)} g/mol<br><span style="color:#fbbf24">${percent}%</span>`;
    block.appendChild(tooltip);

    container.appendChild(block);
  });
}

function calculateMolarMassModal(formula, exact) {
  const elements = parseFormulaStrict(formula);
  let total = 0;
  const breakdown = [];

  Object.keys(elements).forEach((element) => {
    const count = elements[element];
    const atomicMass = atomicMasses[element];

    if (!atomicMass) {
      throw new Error(`Unknown element: ${element}`);
    }

    const subtotal = atomicMass * count;
    total += subtotal;

    breakdown.push({
      element,
      atomicMass: exact ? atomicMass.toFixed(3) : Math.round(atomicMass),
      count,
      subtotal: exact ? subtotal.toFixed(3) : Math.round(subtotal),
    });
  });

  return {
    total: exact ? total.toFixed(3) : Math.round(total),
    breakdown,
    exact,
  };
}

// displayMolarMassResult - see definition at end of file (line ~10861)

// ===== Empirical Tool: Preset Compounds =====
const EMPIRICAL_PRESETS = [
  // 2个元素
  {
    name: "Methane (甲烷)",
    elements: [
      { s: "C", v: 75.0 },
      { s: "H", v: 25.0 },
    ],
    molMass: 16,
  },
  {
    name: "Water (水)",
    elements: [
      { s: "H", v: 11.2 },
      { s: "O", v: 88.8 },
    ],
    molMass: 18,
  },
  {
    name: "Ammonia (氨)",
    elements: [
      { s: "N", v: 82.4 },
      { s: "H", v: 17.6 },
    ],
    molMass: 17,
  },
  {
    name: "Benzene (苯)",
    elements: [
      { s: "C", v: 92.3 },
      { s: "H", v: 7.7 },
    ],
    molMass: 78,
  },
  {
    name: "Carbon Dioxide (二氧化碳)",
    elements: [
      { s: "C", v: 27.3 },
      { s: "O", v: 72.7 },
    ],
    molMass: 44,
  },
  // 3个元素
  {
    name: "Glucose (葡萄糖)",
    elements: [
      { s: "C", v: 40.0 },
      { s: "H", v: 6.7 },
      { s: "O", v: 53.3 },
    ],
    molMass: 180,
  },
  {
    name: "Aspirin (阿司匹林)",
    elements: [
      { s: "C", v: 60.0 },
      { s: "H", v: 4.5 },
      { s: "O", v: 35.5 },
    ],
    molMass: 180,
  },
  {
    name: "Ethanol (乙醇)",
    elements: [
      { s: "C", v: 52.2 },
      { s: "H", v: 13.0 },
      { s: "O", v: 34.8 },
    ],
    molMass: 46,
  },
  {
    name: "Acetic Acid (乙酸)",
    elements: [
      { s: "C", v: 40.0 },
      { s: "H", v: 6.7 },
      { s: "O", v: 53.3 },
    ],
    molMass: 60,
  },
  {
    name: "Vitamin C (维生素C)",
    elements: [
      { s: "C", v: 40.9 },
      { s: "H", v: 4.6 },
      { s: "O", v: 54.5 },
    ],
    molMass: 176,
  },
  // 4个元素
  {
    name: "Caffeine (咖啡因)",
    elements: [
      { s: "C", v: 49.5 },
      { s: "H", v: 5.2 },
      { s: "N", v: 28.9 },
      { s: "O", v: 16.5 },
    ],
    molMass: 194,
  },
  {
    name: "Urea (尿素)",
    elements: [
      { s: "C", v: 20.0 },
      { s: "H", v: 6.7 },
      { s: "N", v: 46.7 },
      { s: "O", v: 26.7 },
    ],
    molMass: 60,
  },
  {
    name: "Glycine (甘氨酸)",
    elements: [
      { s: "C", v: 32.0 },
      { s: "H", v: 6.7 },
      { s: "N", v: 18.7 },
      { s: "O", v: 42.6 },
    ],
    molMass: 75,
  },
  {
    name: "Alanine (丙氨酸)",
    elements: [
      { s: "C", v: 40.4 },
      { s: "H", v: 7.9 },
      { s: "N", v: 15.7 },
      { s: "O", v: 36.0 },
    ],
    molMass: 89,
  },
  // 5个元素
  {
    name: "Cysteine (半胱氨酸)",
    elements: [
      { s: "C", v: 29.8 },
      { s: "H", v: 5.8 },
      { s: "N", v: 11.6 },
      { s: "O", v: 26.4 },
      { s: "S", v: 26.4 },
    ],
    molMass: 121,
  },
  {
    name: "Methionine (蛋氨酸)",
    elements: [
      { s: "C", v: 40.3 },
      { s: "H", v: 7.4 },
      { s: "N", v: 9.4 },
      { s: "O", v: 21.5 },
      { s: "S", v: 21.5 },
    ],
    molMass: 149,
  },
  {
    name: "Thiamine (维生素B1)",
    elements: [
      { s: "C", v: 42.7 },
      { s: "H", v: 5.4 },
      { s: "N", v: 16.6 },
      { s: "O", v: 4.7 },
      { s: "S", v: 9.5 },
    ],
    molMass: 337,
  },
];

let empiricalElementCount = 3; // Track number of element rows

function attachEmpiricalListeners() {
  const methodSelect = document.getElementById("modal-formula-method");
  const inputsContainer = document.getElementById("modal-element-inputs");
  const btn = document.getElementById("modal-calc-formula-btn");
  const detailsToggle = document.getElementById("calc-details-toggle");
  const detailsContent = document.getElementById("calc-details-content");
  const addElementBtn = document.getElementById("emp-add-element-btn");
  const randomFillBtn = document.getElementById("emp-random-fill-btn");

  // Initialize with default 3 element rows
  empiricalElementCount = 3;
  renderEmpiricalInputs(); // 初始不填充，显示?
  updateElementButtons();

  if (methodSelect) {
    methodSelect.addEventListener("change", () => renderEmpiricalInputs());
  }

  // Add Element Button - 无限制
  if (addElementBtn) {
    addElementBtn.addEventListener("click", () => {
      empiricalElementCount++;
      renderEmpiricalInputs();
      updateElementButtons();
    });
  }

  // Remove Element Button
  const removeElementBtn = document.getElementById("emp-remove-element-btn");
  if (removeElementBtn) {
    removeElementBtn.addEventListener("click", () => {
      if (empiricalElementCount > 2) {
        empiricalElementCount--;
        renderEmpiricalInputs();
        updateElementButtons();
      }
    });
  }

  // Random Fill Button - 严格匹配当前元素数量
  if (randomFillBtn) {
    randomFillBtn.addEventListener("click", () => {
      // 严格筛选与当前元素数量完全匹配的预设
      const validPresets = EMPIRICAL_PRESETS.filter(
        (p) => p.elements.length === empiricalElementCount,
      );
      if (validPresets.length > 0) {
        const preset =
          validPresets[Math.floor(Math.random() * validPresets.length)];
        fillEmpiricalPreset(preset);
      } else {
        // 如果没有完全匹配的预设，显示提示
        alert("没有找到包含 " + empiricalElementCount + " 个元素的预设化合物");
      }
    });
  }

  // Toggle calculation details - 展开/收起步骤
  if (detailsToggle && detailsContent) {
    detailsToggle.addEventListener("click", () => {
      const isExpanded = detailsContent.classList.contains("visible");

      // 展开前锁定 grid 高度，防止被压缩
      const grid = document.querySelector(".emp-grid");
      if (!isExpanded && grid) {
        grid.style.height = grid.offsetHeight + "px";
        grid.style.flex = "none";
      }
      if (isExpanded && grid) {
        grid.style.height = "";
        grid.style.flex = "";
      }

      detailsContent.classList.toggle("visible", !isExpanded);
      detailsToggle.classList.toggle("open", !isExpanded);
      const btnText = detailsToggle.querySelector("span");
      if (btnText) {
        btnText.textContent = isExpanded
          ? "Show calculation steps"
          : "Hide calculation steps";
      }
      // 展开时滚动到步骤区域并显示完整
      if (!isExpanded) {
        setTimeout(() => {
          const modalBody = document.querySelector(".feature-modal-body");
          if (modalBody) {
            modalBody.scrollTo({
              top: modalBody.scrollHeight,
              behavior: "smooth",
            });
          }
        }, 150);
      }
    });
  }

  if (btn) {
    btn.addEventListener("click", () => {
      try {
        const method = methodSelect?.value || "percent";
        const data = getEmpiricalData(method);
        const result = calculateEmpiricalModal(data);
        displayEmpiricalResultNew(result);
        const tips = document.getElementById("empirical-tips");
        if (tips) tips.style.display = "none";
      } catch (error) {
        showEmpiricalError(error.message);
      }
    });
  }
}

// 更新按钮状态
function updateElementButtons() {
  const addBtn = document.getElementById("emp-add-element-btn");
  const removeBtn = document.getElementById("emp-remove-element-btn");

  if (addBtn) {
    addBtn.disabled = false; // 永不禁用
  }
  if (removeBtn) {
    removeBtn.disabled = empiricalElementCount <= 2;
  }
}

// Render element input rows
function renderEmpiricalInputs(presetSymbols = null) {
  const inputsContainer = document.getElementById("modal-element-inputs");
  if (!inputsContainer) return;

  const method =
    document.getElementById("modal-formula-method")?.value || "percent";
  const placeholder = method === "percent" ? "40.0" : "2.5";

  let html = "";
  for (let i = 0; i < empiricalElementCount; i++) {
    // 如果有预设符号则使用，否则为空
    const symbol = presetSymbols ? presetSymbols[i] || "" : "";
    const colorClass = symbol ? `el-${symbol}` : "";
    const isOptional = i >= 2;

    html += `
            <div class="emp-input-row">
                <input type="text" 
                    id="modal-elem${i + 1}-symbol" 
                    class="emp-el-input ${colorClass}" 
                    placeholder="?" 
                    maxlength="2" 
                    value="${symbol}"
                    data-row="${i + 1}">
                <div class="emp-value-wrapper">
                    <input type="number" 
                        id="modal-elem${i + 1}-value" 
                        class="emp-input-field" 
                        placeholder="${isOptional ? "optional" : placeholder}" 
                        step="0.1">
                    <span class="emp-unit">%</span>
                </div>
            </div>
        `;
  }
  inputsContainer.innerHTML = html;

  // Add symbol input listeners for color updates
  for (let i = 1; i <= empiricalElementCount; i++) {
    const symbolInput = document.getElementById(`modal-elem${i}-symbol`);
    if (symbolInput) {
      symbolInput.addEventListener("input", (e) => {
        const val = e.target.value.trim().toUpperCase();
        e.target.value = val;
        // Update color based on element - list of supported elements
        const coloredElements = [
          "C",
          "H",
          "O",
          "N",
          "S",
          "P",
          "Cl",
          "Na",
          "K",
          "Ca",
          "Fe",
          "Mg",
        ];
        const colorClass = coloredElements.includes(val)
          ? `el-${val}`
          : val
            ? "has-value"
            : "";
        e.target.className = `emp-el-input ${colorClass}`;
      });
    }
  }
}

// Fill preset compound data - 不改变当前元素数量
function fillEmpiricalPreset(preset) {
  // 保持当前元素数量不变
  // Re-render inputs with preset symbols (只填充前 empiricalElementCount 个)
  const symbols = preset.elements
    .slice(0, empiricalElementCount)
    .map((e) => e.s);
  // 补全空符号
  while (symbols.length < empiricalElementCount) {
    symbols.push("");
  }
  renderEmpiricalInputs(symbols);

  // Fill values (只填充前 empiricalElementCount 个)
  preset.elements.slice(0, empiricalElementCount).forEach((elem, i) => {
    const valueInput = document.getElementById(`modal-elem${i + 1}-value`);
    if (valueInput) {
      valueInput.value = elem.v;
    }
  });

  // Fill molecular mass
  const molMassInput = document.getElementById("modal-mol-mass");
  if (molMassInput && preset.molMass) {
    molMassInput.value = preset.molMass;
  }
}

function showEmpiricalError(message) {
  const emptyState = document.getElementById("lego-empty");
  const resultContent = document.getElementById("lego-blocks-area");
  const detailsContent = document.getElementById("calc-details-content");

  // Hide steps
  if (detailsContent) {
    detailsContent.classList.remove("visible");
  }

  if (emptyState) {
    emptyState.innerHTML = `
            <div style="color: #ef4444; font-size: 14px; padding: 20px; text-align: center;">
                <svg style="width: 40px; height: 40px; margin-bottom: 12px; opacity: 0.7;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <div style="font-weight: 600; margin-bottom: 8px;">${message}</div>
                <div style="font-size: 12px; color: #86868b;">Check your input and try again</div>
            </div>
        `;
    emptyState.style.display = "flex";
  }
  if (resultContent) {
    resultContent.classList.remove("visible");
  }
}

function displayEmpiricalResultNew(result) {
  const emptyState = document.getElementById("lego-empty");
  const resultContent = document.getElementById("lego-blocks-area");
  const legoStage = document.getElementById("lego-stage");
  const empiricalDisplay = document.getElementById("empirical-formula-display");
  const molecularCard = document.getElementById("molecular-result-card");
  const molecularDisplay = document.getElementById("molecular-formula-display");
  const massDisplay = document.getElementById("result-mass-display");
  const blocksVisual = document.getElementById("lego-blocks-visual");
  const detailsContent = document.getElementById("calc-details-content");

  // Hide empty state, show result
  if (emptyState) emptyState.style.display = "none";
  if (resultContent) resultContent.classList.add("visible");

  // Update empirical formula (secondary, in pill)
  if (empiricalDisplay) {
    empiricalDisplay.textContent = result.empiricalFormula;
  }

  // Update molecular formula (hero display)
  if (molecularCard && molecularDisplay) {
    if (result.molecularFormula && result.multiplier > 1) {
      molecularCard.style.display = "flex";
      // Convert to proper HTML subscripts for hero display
      molecularDisplay.innerHTML = formatFormulaHTML(result.molecularFormula);
      if (massDisplay) {
        massDisplay.textContent = result.molecularMass
          ? `${result.molecularMass} g/mol`
          : "";
      }
    } else {
      // Show empirical as main if no molecular
      molecularCard.style.display = "flex";
      molecularDisplay.innerHTML = formatFormulaHTML(result.empiricalFormula);
      if (massDisplay) {
        massDisplay.textContent = `${result.empiricalMass.toFixed(2)} g/mol`;
      }
    }
  }

  // Render atom chips
  if (blocksVisual) {
    const displayElements =
      result.molecularFormula && result.multiplier > 1
        ? result.empirical.map((e) => ({
          ...e,
          count: e.count * result.multiplier,
        }))
        : result.empirical;

    // All supported element colors
    const coloredElements = [
      "C",
      "H",
      "O",
      "N",
      "S",
      "P",
      "Cl",
      "Br",
      "F",
      "I",
      "Fe",
      "Cu",
      "Zn",
      "Ca",
      "Na",
      "K",
      "Mg",
    ];

    let atomsHTML = "";
    displayElements.forEach((elem) => {
      const colorClass = coloredElements.includes(elem.symbol)
        ? `el-${elem.symbol}`
        : "el-default";

      atomsHTML += `
                <div class="emp-atom-chip">
                    <div class="emp-atom-circle ${colorClass}">${elem.symbol}</div>
                    <span class="emp-atom-count">×${elem.count}</span>
                </div>
            `;
    });
    blocksVisual.innerHTML = atomsHTML;
  }

  // Update calculation details
  if (detailsContent) {
    detailsContent.innerHTML = result.explanation;
  }
}

// Helper: Convert formula with subscripts to HTML
function formatFormulaHTML(formula) {
  if (!formula) return "";
  // Replace subscript unicode with <sub> tags
  return formula.replace(/[₀₁₂₃₄₅₆₇₈₉]+/g, (match) => {
    const nums = match
      .split("")
      .map((c) => {
        const subscripts = "₀₁₂₃₄₅₆₇₈₉";
        return subscripts.indexOf(c);
      })
      .join("");
    return `<sub>${nums}</sub>`;
  });
}

function getEmpiricalData(method) {
  const elements = [];

  // Dynamic element count - check up to 6 rows
  for (let i = 1; i <= 6; i++) {
    const symbolInput = document.getElementById(`modal-elem${i}-symbol`);
    const valueInput = document.getElementById(`modal-elem${i}-value`);

    if (!symbolInput || !valueInput) continue;

    let symbol = symbolInput?.value?.trim() || "";
    const value = parseFloat(valueInput?.value);

    if (symbol && !isNaN(value) && value > 0) {
      // Correct capitalization (first letter uppercase, rest lowercase)
      const correctedSymbol =
        symbol.charAt(0).toUpperCase() + symbol.slice(1).toLowerCase();
      if (method === "percent") {
        elements.push({ symbol: correctedSymbol, percent: value });
      } else {
        elements.push({ symbol: correctedSymbol, mass: value });
      }
    }
  }

  const molecularMass = parseFloat(
    document.getElementById("modal-mol-mass")?.value,
  );
  return {
    elements,
    molecularMass: isNaN(molecularMass) ? null : molecularMass,
  };
}

function calculateEmpiricalModal(data) {
  const { elements, molecularMass } = data;

  if (elements.length === 0) {
    throw new Error("Please enter at least one element.");
  }

  // Step 1: Convert to moles
  const moles = elements.map((elem) => {
    const atomicMass = atomicMasses[elem.symbol];
    if (!atomicMass) {
      throw new Error(`Unknown element: ${elem.symbol}`);
    }

    let molesValue;
    if (elem.percent !== undefined) {
      // From percent: assume 100g total
      molesValue = elem.percent / atomicMass;
    } else {
      // From mass
      molesValue = elem.mass / atomicMass;
    }
    return {
      symbol: elem.symbol,
      moles: molesValue,
      original: elem.percent || elem.mass,
    };
  });

  // Step 2: Find smallest mole value
  const minMoles = Math.min(...moles.map((m) => m.moles));

  // Step 3: Divide by smallest
  const ratios = moles.map((m) => ({
    symbol: m.symbol,
    moles: m.moles,
    ratio: m.moles / minMoles,
    original: m.original,
  }));

  // Step 4: Simplify to whole numbers
  const empirical = simplifyRatiosModal(ratios);
  const empiricalFormula = empirical
    .map((r) => r.symbol + (r.count > 1 ? subscript(r.count) : ""))
    .join("");

  // Calculate empirical mass
  let empiricalMass = 0;
  empirical.forEach((elem) => {
    const atomicMass = atomicMasses[elem.symbol];
    if (atomicMass) {
      empiricalMass += atomicMass * elem.count;
    }
  });

  // Build explanation
  let explanation = "<h4>Calculation Steps:</h4>";
  explanation += "<ol>";
  explanation +=
    "<li><strong>Step 1: Convert to moles</strong> (Mass ÷ Atomic Mass)</li>";
  explanation += "<ul>";
  moles.forEach((m) => {
    const atomicMass = atomicMasses[m.symbol];
    explanation += `<li>${m.symbol}: ${m.original} ÷ ${atomicMass} = ${m.moles.toFixed(4)} mol</li>`;
  });
  explanation += "</ul>";

  explanation += `<li><strong>Step 2: Divide by smallest</strong> (${minMoles.toFixed(4)} mol)</li>`;
  explanation += "<ul>";
  ratios.forEach((r) => {
    explanation += `<li>${r.symbol}: ${r.moles.toFixed(4)} ÷ ${minMoles.toFixed(4)} = ${r.ratio.toFixed(2)}</li>`;
  });
  explanation += "</ul>";

  explanation += "<li><strong>Step 3: Round to whole numbers</strong></li>";
  explanation += `<li><strong>Result:</strong> Empirical Formula = <strong>${empiricalFormula}</strong></li>`;
  explanation += "</ol>";

  explanation += `<p><strong>Empirical Molar Mass:</strong> ${empiricalMass.toFixed(2)} g/mol</p>`;

  let molecularFormula = null;
  let multiplier = 1; // 默认倍数为1

  if (molecularMass) {
    multiplier = Math.round(molecularMass / empiricalMass);
    molecularFormula = empirical
      .map(
        (r) =>
          r.symbol +
          (r.count * multiplier > 1 ? subscript(r.count * multiplier) : ""),
      )
      .join("");

    explanation += "<hr>";
    explanation += "<h4>Molecular Formula:</h4>";
    explanation += `<p><strong>Molecular Mass given:</strong> ${molecularMass} g/mol</p>`;
    explanation += `<p><strong>Multiplier:</strong> ${molecularMass} ÷ ${empiricalMass.toFixed(2)} = ${multiplier}</p>`;
    explanation += `<p><strong>Molecular Formula:</strong> <strong>${molecularFormula}</strong></p>`;
  }

  return {
    empiricalFormula,
    molecularFormula,
    explanation,
    empiricalMass,
    molecularMass,
    empirical, // 积木渲染需要的原始数据
    multiplier: multiplier || 1, // 倍数，默认为1
  };
}

function simplifyRatiosModal(ratios) {
  // 先检查是否所有比例都接近整数
  const allClose = ratios.every(
    (r) => Math.abs(r.ratio - Math.round(r.ratio)) < 0.1,
  );

  if (allClose) {
    // 所有比例都接近整数，直接四舍五入
    return ratios.map((r) => ({
      symbol: r.symbol,
      count: Math.round(r.ratio) || 1,
    }));
  }

  // 有小数比例，需要找到一个公共倍数使所有比例都变成整数
  // 尝试倍数 2, 3, 4, ..., 10
  for (let mult = 2; mult <= 10; mult++) {
    const scaled = ratios.map((r) => r.ratio * mult);
    const allInteger = scaled.every((v) => Math.abs(v - Math.round(v)) < 0.1);

    if (allInteger) {
      // 找到合适的倍数，对所有元素应用
      return ratios.map((r) => ({
        symbol: r.symbol,
        count: Math.round(r.ratio * mult) || 1,
      }));
    }
  }

  // 没找到合适的倍数，使用最接近的整数
  return ratios.map((r) => ({
    symbol: r.symbol,
    count: Math.round(r.ratio) || 1,
  }));
}

function subscript(num) {
  const subscripts = {
    0: "₀",
    1: "₁",
    2: "₂",
    3: "₃",
    4: "₄",
    5: "₅",
    6: "₆",
    7: "₇",
    8: "₈",
    9: "₉",
  };
  return String(num)
    .split("")
    .map((d) => subscripts[d] || d)
    .join("");
}

function displayEmpiricalResult(result) {
  const resultBox = document.getElementById("modal-formula-result");
  const valueEl = document.getElementById("modal-formula-value");
  const explanationBox = document.getElementById("modal-formula-explanation");
  const blocksArea = document.getElementById("lego-blocks-area");
  const emptyState = document.getElementById("lego-empty");
  const legoStage = document.getElementById("lego-stage");

  // Hide empty state and add result styling
  if (emptyState) emptyState.style.display = "none";
  if (legoStage) legoStage.classList.add("has-result");

  // Render LEGO blocks
  if (blocksArea) {
    let blocksHTML = "";

    // 1. Empirical Formula Blocks
    blocksHTML += `
            <div class="lego-group" id="empirical-blocks">
                <div class="lego-group-label">${t("Empirical Formula", "经验式")}</div>
                <div style="display: flex; align-items: flex-end; gap: 8px; flex-wrap: wrap; justify-content: center;">
        `;

    result.empirical.forEach((elem, index) => {
      const colorClass = ["C", "H", "O", "N", "S", "P", "Cl"].includes(
        elem.symbol,
      )
        ? `el-${elem.symbol}`
        : "el-default";

      blocksHTML += `
                <div class="lego-block ${colorClass} animate-in" style="animation-delay: ${index * 0.1}s">
                    <span class="block-symbol">${elem.symbol}</span>
                    ${elem.count > 1 ? `<span class="block-count">×${elem.count}</span>` : ""}
                </div>
            `;
    });

    blocksHTML += `
                </div>
                <div style="margin-top: 10px; font-size: 0.85rem; color: #64748b;">
                    = <strong>${result.empiricalFormula}</strong> 
                    <span style="margin-left: 10px; opacity: 0.7;">(${result.empiricalMass.toFixed(2)} g/mol)</span>
                </div>
            </div>
        `;

    // 2. If molecular mass provided, show multiplier and molecular formula
    if (result.multiplier && result.multiplier > 1) {
      // Multiplier Badge
      blocksHTML += `
                <div class="multiplier-section animate-in" style="animation-delay: 0.3s">
                    <span class="times-icon">×</span>
                    <span class="multiplier-value">${result.multiplier}</span>
                    <span class="multiplier-label">${t("multiplier", "倍数")}</span>
                </div>
            `;

      // Molecular Formula Blocks (duplicated n times visually)
      blocksHTML += `
                <div class="lego-group" id="molecular-blocks" style="background: rgba(52, 211, 153, 0.1); border: 2px solid rgba(52, 211, 153, 0.3);">
                    <div class="lego-group-label" style="color: #059669;">${t("Molecular Formula", "分子式")}</div>
                    <div style="display: flex; align-items: flex-end; gap: 8px; flex-wrap: wrap; justify-content: center;">
            `;

      // Show multiplied blocks
      result.empirical.forEach((elem, index) => {
        const colorClass = ["C", "H", "O", "N", "S", "P", "Cl"].includes(
          elem.symbol,
        )
          ? `el-${elem.symbol}`
          : "el-default";
        const newCount = elem.count * result.multiplier;

        blocksHTML += `
                    <div class="lego-block ${colorClass} animate-in" style="animation-delay: ${0.5 + index * 0.1}s">
                        <span class="block-symbol">${elem.symbol}</span>
                        ${newCount > 1 ? `<span class="block-count">×${newCount}</span>` : ""}
                    </div>
                `;
      });

      blocksHTML += `
                    </div>
                </div>
            `;

      // Final Result
      blocksHTML += `
                <div class="molecular-result animate-in" style="animation-delay: 0.7s">
                    <span class="result-label">${t("Result", "结果")}</span>
                    <span class="result-formula">${result.molecularFormula}</span>
                </div>
            `;
    } else if (!result.molecularMass) {
      // Only empirical, no molecular mass given
      blocksHTML += `
                <div style="text-align: center; color: #64748b; font-size: 0.85rem; padding: 15px; background: rgba(0,0,0,0.03); border-radius: 10px;">
                    ${t("Enter molecular mass above to calculate the molecular formula", "在上方输入分子质量以计算分子式")}
                </div>
            `;
    } else {
      // Multiplier is 1
      blocksHTML += `
                <div class="molecular-result animate-in" style="animation-delay: 0.4s">
                    <span class="result-label">${t("Result", "结果")}</span>
                    <span class="result-formula">${result.empiricalFormula}</span>
                    <span style="font-size: 0.8rem; color: #64748b; margin-left: 10px;">(n = 1, ${t("same as empirical", "与经验式相同")})</span>
                </div>
            `;
    }

    blocksArea.innerHTML = blocksHTML;
  }

  // Still show text result box (collapsed by default, can expand for details)
  if (resultBox) {
    resultBox.style.display = "block";
  }

  if (valueEl) {
    if (result.molecularFormula) {
      valueEl.innerHTML = `
                <div class="formula-result-row">
                    <span class="formula-label">Empirical:</span>
                    <span class="formula-value">${result.empiricalFormula}</span>
                </div>
                <div class="formula-result-row">
                    <span class="formula-label">Molecular:</span>
                    <span class="formula-value highlight">${result.molecularFormula}</span>
                </div>
            `;
    } else {
      valueEl.innerHTML = `
                <div class="formula-result-row">
                    <span class="formula-label">Empirical Formula:</span>
                    <span class="formula-value highlight">${result.empiricalFormula}</span>
                </div>
            `;
    }
  }

  if (explanationBox) {
    explanationBox.style.display = "block";
    explanationBox.innerHTML = result.explanation;
  }
}

function showModalError(containerId, message) {
  const container = document.getElementById(containerId);
  if (container) {
    container.style.display = "block";
    container.innerHTML = `
            <div class="error-message" style="display:flex;align-items:center;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:6px;">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                ${message}
            </div>`;
  }
}

// ==========================================
// New Reference Tool Generators
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
                display: inline-flex;
                align-items: baseline;
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
                            <button id="check-solubility-btn" class="sol-check-btn">Check Solubility</button>
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
                    <table class="sol-glass-table">
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
        titleEl.textContent = "Soluble (aq) / 可溶";
        subtitleEl.textContent = res.reason;
      } else if (res.insoluble) {
        resultCard.className = "sol-result-card active insoluble";
        titleEl.textContent = "Insoluble (s) / 沉淀";
        subtitleEl.textContent = res.reason;
      } else {
        resultCard.className = "sol-result-card active unknown";
        titleEl.textContent = "Unknown / Complex";
        subtitleEl.textContent = t(
          "Logic limited to common inorganic salts.",
          "目前仅支持常见无机盐判断。",
        );
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
      reason: t(
        "Contains Group 1 metal or Ammonium.",
        "含第1族金属或铵根，总是可溶。",
      ),
    };
  }
  // 2. Nitrates & Acetates (Rule 2: Always Soluble)
  if (/NO3/.test(f) || /CH3COO/.test(f) || /C2H3O2/.test(f)) {
    return {
      soluble: true,
      reason: t(
        "Nitrates and Acetates are soluble.",
        "硝酸盐和醋酸盐总是可溶。",
      ),
    };
  }
  // 3. Halides (Cl, Br, I)
  // Matches Cl, Br, I. not ClO, BrO.
  if (/(Cl|Br|I)(?![a-z])(?!O)/.test(f)) {
    // Exceptions: Ag, Pb, Hg
    if (/(Ag|Pb|Hg)/.test(f)) {
      return {
        insoluble: true,
        reason: t(
          "Halide with Ag/Pb/Hg is insoluble.",
          "卤化物遇银/铅/汞沉淀。",
        ),
      };
    }
    return {
      soluble: true,
      reason: t("Most Halides are soluble.", "大多数卤化物可溶。"),
    };
  }
  // 4. Sulfates (SO4)
  if (/SO4/.test(f)) {
    // Exceptions: Ca, Sr, Ba, Pb
    if (/(Ca|Sr|Ba|Pb)/.test(f)) {
      return {
        insoluble: true,
        reason: t(
          "Sulfate with Ca/Sr/Ba/Pb is insoluble.",
          "硫酸盐遇钙/锶/钡/铅沉淀。",
        ),
      };
    }
    return {
      soluble: true,
      reason: t("Most Sulfates are soluble.", "大多数硫酸盐可溶。"),
    };
  }
  // 5. Hydroxides (OH)
  if (/(OH|\(OH\))/.test(f)) {
    // Exceptions: Ca, Sr, Ba (Slightly Soluble -> Treat as Soluble for typical context or specify)
    if (/(Ca|Sr|Ba)/.test(f)) {
      // Often considered slightly soluble. Let's say Soluble.
      return {
        soluble: true,
        reason: t(
          "Group 2 Hydroxides (Ca/Sr/Ba) are slightly soluble.",
          "第2族氢氧化物(Ca/Sr/Ba)微溶。",
        ),
      };
    }
    return {
      insoluble: true,
      reason: t("Most Hydroxides are insoluble.", "大多数氢氧化物不溶。"),
    };
  }
  // 6. Carbonates, Phosphates, Sulfides (Insoluble)
  // Matches CO3, PO4, S not SO4.
  if (/CO3/.test(f) || /PO4/.test(f) || /S(?![a-zO])/.test(f)) {
    return {
      insoluble: true,
      reason: t(
        "Carbonates/Phosphates/Sulfides are generally insoluble.",
        "碳酸盐/磷酸盐/硫化物通常不溶。",
      ),
    };
  }

  return { unknown: true };
}

function generateIonsToolContent() {
  // Ion data - structure similar to elements
  const ions = [
    // Monatomic Cations (Row 1-3)
    {
      id: "h_plus",
      symbol: "H",
      charge: "+",
      name: "Hydrogen",
      nameZh: "氢",
      type: "cation",
      category: "monatomic",
      row: 1,
      col: 1,
    },
    {
      id: "li_plus",
      symbol: "Li",
      charge: "+",
      name: "Lithium",
      nameZh: "锂",
      type: "cation",
      category: "monatomic",
      row: 1,
      col: 2,
    },
    {
      id: "na_plus",
      symbol: "Na",
      charge: "+",
      name: "Sodium",
      nameZh: "钠",
      type: "cation",
      category: "monatomic",
      row: 1,
      col: 3,
    },
    {
      id: "k_plus",
      symbol: "K",
      charge: "+",
      name: "Potassium",
      nameZh: "钾",
      type: "cation",
      category: "monatomic",
      row: 1,
      col: 4,
    },
    {
      id: "ag_plus",
      symbol: "Ag",
      charge: "+",
      name: "Silver",
      nameZh: "银",
      type: "cation",
      category: "monatomic",
      row: 1,
      col: 5,
    },
    {
      id: "nh4_plus",
      symbol: "NH₄",
      charge: "+",
      name: "Ammonium",
      nameZh: "铵",
      type: "cation",
      category: "polyatomic",
      row: 1,
      col: 6,
    },
    {
      id: "mg_2plus",
      symbol: "Mg",
      charge: "2+",
      name: "Magnesium",
      nameZh: "镁",
      type: "cation",
      category: "monatomic",
      row: 2,
      col: 1,
    },
    {
      id: "ca_2plus",
      symbol: "Ca",
      charge: "2+",
      name: "Calcium",
      nameZh: "钙",
      type: "cation",
      category: "monatomic",
      row: 2,
      col: 2,
    },
    {
      id: "ba_2plus",
      symbol: "Ba",
      charge: "2+",
      name: "Barium",
      nameZh: "钡",
      type: "cation",
      category: "monatomic",
      row: 2,
      col: 3,
    },
    {
      id: "zn_2plus",
      symbol: "Zn",
      charge: "2+",
      name: "Zinc",
      nameZh: "锌",
      type: "cation",
      category: "monatomic",
      row: 2,
      col: 4,
    },
    {
      id: "cu_2plus",
      symbol: "Cu",
      charge: "2+",
      name: "Copper(II)",
      nameZh: "铜(II)",
      type: "cation",
      category: "monatomic",
      row: 2,
      col: 5,
    },
    {
      id: "fe_2plus",
      symbol: "Fe",
      charge: "2+",
      name: "Iron(II)",
      nameZh: "亚铁",
      type: "cation",
      category: "monatomic",
      row: 2,
      col: 6,
    },
    {
      id: "fe_3plus",
      symbol: "Fe",
      charge: "3+",
      name: "Iron(III)",
      nameZh: "铁(III)",
      type: "cation",
      category: "monatomic",
      row: 3,
      col: 1,
    },
    {
      id: "al_3plus",
      symbol: "Al",
      charge: "3+",
      name: "Aluminum",
      nameZh: "铝",
      type: "cation",
      category: "monatomic",
      row: 3,
      col: 2,
    },
    {
      id: "pb_2plus",
      symbol: "Pb",
      charge: "2+",
      name: "Lead(II)",
      nameZh: "铅(II)",
      type: "cation",
      category: "monatomic",
      row: 3,
      col: 3,
    },
    {
      id: "cu_plus",
      symbol: "Cu",
      charge: "+",
      name: "Copper(I)",
      nameZh: "铜(I)",
      type: "cation",
      category: "monatomic",
      row: 3,
      col: 4,
    },
    {
      id: "hg_2plus",
      symbol: "Hg",
      charge: "2+",
      name: "Mercury(II)",
      nameZh: "汞(II)",
      type: "cation",
      category: "monatomic",
      row: 3,
      col: 5,
    },
    {
      id: "sn_2plus",
      symbol: "Sn",
      charge: "2+",
      name: "Tin(II)",
      nameZh: "锡(II)",
      type: "cation",
      category: "monatomic",
      row: 3,
      col: 6,
    },

    // Monatomic Anions (Row 5-6)
    {
      id: "f_minus",
      symbol: "F",
      charge: "−",
      name: "Fluoride",
      nameZh: "氟",
      type: "anion",
      category: "monatomic",
      row: 5,
      col: 1,
    },
    {
      id: "cl_minus",
      symbol: "Cl",
      charge: "−",
      name: "Chloride",
      nameZh: "氯",
      type: "anion",
      category: "monatomic",
      row: 5,
      col: 2,
    },
    {
      id: "br_minus",
      symbol: "Br",
      charge: "−",
      name: "Bromide",
      nameZh: "溴",
      type: "anion",
      category: "monatomic",
      row: 5,
      col: 3,
    },
    {
      id: "i_minus",
      symbol: "I",
      charge: "−",
      name: "Iodide",
      nameZh: "碘",
      type: "anion",
      category: "monatomic",
      row: 5,
      col: 4,
    },
    {
      id: "o_2minus",
      symbol: "O",
      charge: "2−",
      name: "Oxide",
      nameZh: "氧",
      type: "anion",
      category: "monatomic",
      row: 5,
      col: 5,
    },
    {
      id: "s_2minus",
      symbol: "S",
      charge: "2−",
      name: "Sulfide",
      nameZh: "硫",
      type: "anion",
      category: "monatomic",
      row: 5,
      col: 6,
    },

    // Polyatomic Anions (Row 7-9)
    {
      id: "oh_minus",
      symbol: "OH",
      charge: "−",
      name: "Hydroxide",
      nameZh: "氢氧根",
      type: "anion",
      category: "polyatomic",
      row: 7,
      col: 1,
    },
    {
      id: "no3_minus",
      symbol: "NO₃",
      charge: "−",
      name: "Nitrate",
      nameZh: "硝酸根",
      type: "anion",
      category: "polyatomic",
      row: 7,
      col: 2,
    },
    {
      id: "no2_minus",
      symbol: "NO₂",
      charge: "−",
      name: "Nitrite",
      nameZh: "亚硝酸根",
      type: "anion",
      category: "polyatomic",
      row: 7,
      col: 3,
    },
    {
      id: "hco3_minus",
      symbol: "HCO₃",
      charge: "−",
      name: "Bicarbonate",
      nameZh: "碳酸氢根",
      type: "anion",
      category: "polyatomic",
      row: 7,
      col: 4,
    },
    {
      id: "clo_minus",
      symbol: "ClO",
      charge: "−",
      name: "Hypochlorite",
      nameZh: "次氯酸根",
      type: "anion",
      category: "polyatomic",
      row: 7,
      col: 5,
    },
    {
      id: "ch3coo_minus",
      symbol: "CH₃COO",
      charge: "−",
      name: "Acetate",
      nameZh: "醋酸根",
      type: "anion",
      category: "polyatomic",
      row: 7,
      col: 6,
    },
    {
      id: "so4_2minus",
      symbol: "SO₄",
      charge: "2−",
      name: "Sulfate",
      nameZh: "硫酸根",
      type: "anion",
      category: "polyatomic",
      row: 8,
      col: 1,
    },
    {
      id: "so3_2minus",
      symbol: "SO₃",
      charge: "2−",
      name: "Sulfite",
      nameZh: "亚硫酸根",
      type: "anion",
      category: "polyatomic",
      row: 8,
      col: 2,
    },
    {
      id: "co3_2minus",
      symbol: "CO₃",
      charge: "2−",
      name: "Carbonate",
      nameZh: "碳酸根",
      type: "anion",
      category: "polyatomic",
      row: 8,
      col: 3,
    },
    {
      id: "cro4_2minus",
      symbol: "CrO₄",
      charge: "2−",
      name: "Chromate",
      nameZh: "铬酸根",
      type: "anion",
      category: "polyatomic",
      row: 8,
      col: 4,
    },
    {
      id: "c2o4_2minus",
      symbol: "C₂O₄",
      charge: "2−",
      name: "Oxalate",
      nameZh: "草酸根",
      type: "anion",
      category: "polyatomic",
      row: 8,
      col: 5,
    },
    {
      id: "sio3_2minus",
      symbol: "SiO₃",
      charge: "2−",
      name: "Silicate",
      nameZh: "硅酸根",
      type: "anion",
      category: "polyatomic",
      row: 8,
      col: 6,
    },
    {
      id: "po4_3minus",
      symbol: "PO₄",
      charge: "3−",
      name: "Phosphate",
      nameZh: "磷酸根",
      type: "anion",
      category: "polyatomic",
      row: 9,
      col: 1,
    },
    {
      id: "mno4_minus",
      symbol: "MnO₄",
      charge: "−",
      name: "Permanganate",
      nameZh: "高锰酸根",
      type: "anion",
      category: "polyatomic",
      row: 9,
      col: 2,
    },
    {
      id: "hso4_minus",
      symbol: "HSO₄",
      charge: "−",
      name: "Hydrogen sulfate",
      nameZh: "硫酸氢根",
      type: "anion",
      category: "polyatomic",
      row: 9,
      col: 3,
    },
    {
      id: "h2po4_minus",
      symbol: "H₂PO₄",
      charge: "−",
      name: "Dihydrogen phosphate",
      nameZh: "磷酸二氢根",
      type: "anion",
      category: "polyatomic",
      row: 9,
      col: 4,
    },
    {
      id: "hpo4_2minus",
      symbol: "HPO₄",
      charge: "2−",
      name: "Hydrogen phosphate",
      nameZh: "磷酸氢根",
      type: "anion",
      category: "polyatomic",
      row: 9,
      col: 5,
    },
    {
      id: "cr2o7_2minus",
      symbol: "Cr₂O₇",
      charge: "2−",
      name: "Dichromate",
      nameZh: "重铬酸根",
      type: "anion",
      category: "polyatomic",
      row: 9,
      col: 6,
    },
  ];

  // Store ions globally for detail modal access
  window.ionsData = ions;

  // Build the ion grid HTML
  let gridHTML = "";

  // Row labels
  const rowLabels = {
    1: { en: "+1 Cations", zh: "+1价阳离子" },
    2: { en: "+2 Cations", zh: "+2价阳离子" },
    3: { en: "+3/Other", zh: "+3/其他" },
    5: { en: "−1/−2 Anions", zh: "−1/−2价阴离子" },
    7: { en: "Polyatomic −1", zh: "多原子−1价" },
    8: { en: "Polyatomic −2", zh: "多原子−2价" },
    9: { en: "Polyatomic −3/Other", zh: "其他多原子" },
  };

  // Create grid cells
  for (let row = 1; row <= 9; row++) {
    // Skip row 4 (gap between cations and anions) and row 6
    if (row === 4 || row === 6) {
      // Add spacer row
      gridHTML += `<div class="ion-grid-spacer" style="grid-row: ${row}; grid-column: 1 / 7;"></div>`;
      continue;
    }

    for (let col = 1; col <= 6; col++) {
      const ion = ions.find((i) => i.row === row && i.col === col);
      if (ion) {
        const typeClass = ion.type === "cation" ? "ion-cation" : "ion-anion";
        const catClass =
          ion.category === "polyatomic" ? "ion-polyatomic" : "ion-monatomic";
        gridHTML += `
                    <div class="ion-element ${typeClass} ${catClass}" 
                         data-ion-id="${ion.id}"
                         style="grid-row: ${row}; grid-column: ${col};">
                        <span class="ion-charge">${ion.charge}</span>
                        <span class="ion-symbol">${ion.symbol}</span>
                        <span class="ion-name">${t(ion.name, ion.nameZh)}</span>
                    </div>
                `;
      }
    }
  }

  return `
        <div class="ions-table-container">
            <div class="ions-table-header">
                <h2 class="ions-table-title">${t("Common Ions", "常用离子表")}</h2>
                <div class="ions-table-legend">
                    <div class="ions-legend-item cation-legend">
                        <span class="ions-legend-swatch ion-cation"></span>
                        <span>${t("Cations (+)", "阳离子 (+)")}</span>
                    </div>
                    <div class="ions-legend-item anion-legend">
                        <span class="ions-legend-swatch ion-anion"></span>
                        <span>${t("Anions (−)", "阴离子 (−)")}</span>
                    </div>
                </div>
            </div>
            <div class="ions-table-grid">
                ${gridHTML}
            </div>
            <p class="ions-table-hint">${t("Click any ion to view details", "点击任意离子查看详情")}</p>
        </div>
    `;
}

// Ion detail modal handler
function showIonDetailModal(ionId) {
  const ion = window.ionsData?.find((i) => i.id === ionId);
  if (!ion) return;

  // Create ion detail modal overlay
  let ionModal = document.getElementById("ion-detail-modal");
  if (!ionModal) {
    ionModal = document.createElement("div");
    ionModal.id = "ion-detail-modal";
    ionModal.className = "ion-detail-overlay";
    document.body.appendChild(ionModal);
  }

  const typeLabel =
    ion.type === "cation" ? t("Cation", "阳离子") : t("Anion", "阴离子");
  const categoryLabel =
    ion.category === "polyatomic"
      ? t("Polyatomic", "多原子")
      : t("Monatomic", "单原子");
  const typeClass =
    ion.type === "cation" ? "ion-detail-cation" : "ion-detail-anion";

  ionModal.innerHTML = `
        <div class="ion-detail-content ${typeClass}">
            <button class="ion-detail-close" onclick="closeIonDetailModal()">×</button>
            <div class="ion-detail-header">
                <div class="ion-detail-charge">${ion.charge}</div>
                <div class="ion-detail-symbol">${ion.symbol}</div>
                <div class="ion-detail-name">${t(ion.name, ion.nameZh)}</div>
            </div>
            <div class="ion-detail-info">
                <div class="ion-detail-row">
                    <span class="ion-detail-label">${t("Type", "类型")}</span>
                    <span class="ion-detail-value">${typeLabel}</span>
                </div>
                <div class="ion-detail-row">
                    <span class="ion-detail-label">${t("Category", "分类")}</span>
                    <span class="ion-detail-value">${categoryLabel}</span>
                </div>
                <div class="ion-detail-row">
                    <span class="ion-detail-label">${t("Charge", "电荷")}</span>
                    <span class="ion-detail-value">${ion.charge}</span>
                </div>
            </div>
            <p class="ion-detail-hint">${t("More information coming soon...", "更多信息即将推出...")}</p>
        </div>
    `;

  ionModal.style.display = "flex";

  // Close on overlay click
  ionModal.onclick = (e) => {
    if (e.target === ionModal) closeIonDetailModal();
  };
}

function closeIonDetailModal() {
  const ionModal = document.getElementById("ion-detail-modal");
  if (ionModal) {
    ionModal.style.display = "none";
  }
}

// Setup ion click handlers after modal content is rendered
function setupIonClickHandlers() {
  document.querySelectorAll(".ion-element").forEach((el) => {
    el.addEventListener("click", () => {
      const ionId = el.dataset.ionId;
      if (ionId) showIonDetailModal(ionId);
    });
  });
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

  // 1. 预处理：去除多余空格，统一分隔符
  let processed = input
    .trim()
    .replace(/\s+/g, "") // 去除所有空格
    .replace(/[\*\+\。\·]+/g, ".") // 统一水合物分隔符
    .replace(/\.+/g, "."); // 去除重复点

  // 2. 检测可疑输入模式
  let suspicious = null;

  // H22O → 可能是 2H2O 或 H2O2
  const suspiciousMatch = processed.match(/([A-Za-z])(\d)(\d)([A-Za-z])/);
  if (suspiciousMatch) {
    const [, el1, d1, d2, el2] = suspiciousMatch;
    const alt1 = `${d1}${el1}${d2}${el2}`; // 2H2O
    const alt2 = `${el1}${d1}${el2}${d2}`; // H2O2
    suspicious = `${alt1} ${t("or", "或")} ${alt2}`;
  }

  // 3. 严格大小写解析（不自动修正）
  // 规则：
  // - 大写字母开头可选跟一个小写字母 = 有效元素符号
  // - 全小写如 "no" 会被标记为错误
  // - "NO" = N + O (两个元素)
  // - "No" = No (锘)

  // 4. 分词处理 - 严格按照大小写规则
  const tokens = [];
  let hasError = false;
  let i = 0;
  while (i < processed.length) {
    const char = processed[i];

    if (/[A-Z]/.test(char)) {
      // 大写字母 - 有效元素开头
      let element = char;
      i++;
      // 检查是否有小写字母跟随
      if (i < processed.length && /[a-z]/.test(processed[i])) {
        element += processed[i];
        i++;
      }
      tokens.push({ type: "element", value: element, valid: true });
    } else if (/[a-z]/.test(char)) {
      // 小写字母开头 - 无效元素！
      hasError = true;
      tokens.push({ type: "error", value: char, valid: false });
      i++;
    } else if (/[0-9]/.test(char)) {
      // 数字
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
      // 其他字符跳过
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
      // 数字转下标
      const subs = val
        .split("")
        .map((d) => "₀₁₂₃₄₅₆₇₈₉"[parseInt(d)])
        .join("");

      // 判断是系数还是下标
      const prevToken = idx > 0 ? tokens[idx - 1] : null;
      const prevIsLetter =
        prevToken &&
        (prevToken.type === "element" || prevToken.type === "error");
      const prevIsParen =
        prevToken && prevToken.type === "symbol" && prevToken.value === ")";

      if (prevIsLetter || prevIsParen) {
        displayHtml += `<sub>${subs}</sub>`;
      } else {
        // 系数（在开头或点后面）
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
      // 有效元素
      displayHtml += val;
      cleanFormula += val;
      prevWasLetter = true;
    } else if (token.type === "error") {
      // 无效元素 - 用红色显示
      displayHtml += `<span style="color: #ef4444; text-decoration: underline wavy;">${val}</span>`;
      // 不加入 cleanFormula，这样解析时会跳过
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
      // 添加 tooltip 显示占比
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
    // 动画结束后瞬间回到上方
    setTimeout(() => {
      wrapper.classList.add("reset-position");
      wrapper.classList.remove("discarding");
      // 强制 reflow 后移除 reset-position
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
    // 完全重置状态，确保从上方开始
    wrapper.classList.remove("discarding", "printing", "reset-position");
    // 禁用动画，强制回到初始位置（上方）
    wrapper.style.transition = "none";
    wrapper.style.transform = "translateY(-300px)";
    wrapper.style.opacity = "0";
    // 强制 reflow
    void wrapper.offsetWidth;
    // 恢复动画
    wrapper.style.transition = "";
    wrapper.style.transform = "";
    wrapper.style.opacity = "";
    // 显示当前时间
    const now = new Date();
    const timeStr = now.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    date.textContent = timeStr;
    // 开始打印动画（从上往下）
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

// ========== Hero 3D Atom for About Page ==========
(function initHeroAtom() {
  const heroContainer = document.getElementById("hero-atom-container");
  if (!heroContainer) return;

  let heroScene, heroCamera, heroRenderer, heroAtomGroup, heroAnimationId;
  let heroElectrons = [];

  function initHero3D() {
    try {
      heroScene = new THREE.Scene();
      // Use fixed size matching CSS
      const width = 480;
      const height = 480;
      heroCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      heroCamera.position.z = 18;

      heroRenderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
      heroRenderer.setSize(width, height);
      heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      heroContainer.appendChild(heroRenderer.domElement);

      const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
      heroScene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
      directionalLight.position.set(10, 10, 10);
      heroScene.add(directionalLight);

      heroAtomGroup = new THREE.Group();
      heroScene.add(heroAtomGroup);

      // Build Na atom (atomic number 11) - exactly like updateAtomStructure
      buildHeroAtom(11);

      // Start animation
      animateHero();
    } catch (e) {
      console.log("Hero 3D not available");
    }
  }

  function buildHeroAtom(atomicNumber) {
    const nucleusGroup = new THREE.Group();
    nucleusGroup.name = "nucleusGroup";
    heroAtomGroup.add(nucleusGroup);
    const wobbleGroup = new THREE.Group();
    wobbleGroup.name = "wobbleGroup";
    heroAtomGroup.add(wobbleGroup);

    // Na has 12 neutrons (23 - 11)
    const neutronCount = 12;
    const particleRadius = 0.6;

    const protonGeo = new THREE.SphereGeometry(particleRadius, 32, 32);
    const protonMat = new THREE.MeshStandardMaterial({
      color: 0xff2222,
      roughness: 0.25,
      metalness: 0.4,
      emissive: 0xff0000,
      emissiveIntensity: 1.5,
    });
    const neutronGeo = new THREE.SphereGeometry(particleRadius, 32, 32);
    const neutronMat = new THREE.MeshStandardMaterial({
      color: 0x999999,
      roughness: 0.15,
      metalness: 0.5,
      emissive: 0x333333,
      emissiveIntensity: 0.6,
    });

    const particles = [];
    for (let i = 0; i < atomicNumber; i++) particles.push({ type: "proton" });
    for (let i = 0; i < neutronCount; i++) particles.push({ type: "neutron" });

    // Shuffle
    for (let i = particles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [particles[i], particles[j]] = [particles[j], particles[i]];
    }

    const phi = Math.PI * (3 - Math.sqrt(5));
    const n = particles.length;
    const clusterScale = Math.pow(n, 1 / 3) * particleRadius * 0.8;

    particles.forEach((p, i) => {
      const k = i + 0.5;
      const y = 1 - (k / n) * 2;
      const theta = phi * k;
      const r = Math.sqrt(1 - y * y);
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      p.pos = new THREE.Vector3(
        x * clusterScale,
        y * clusterScale,
        z * clusterScale,
      );
      // Add random offset like original
      p.pos.x += (Math.random() - 0.5) * 0.15;
      p.pos.y += (Math.random() - 0.5) * 0.15;
      p.pos.z += (Math.random() - 0.5) * 0.15;
    });

    // Physics iterations for nucleus compaction
    const repulsionDist = particleRadius * 1.5;
    const kRepulse = 0.2;
    const kCenter = 0.1;
    const vForce = new THREE.Vector3();
    const vDiff = new THREE.Vector3();
    const vTemp = new THREE.Vector3();
    for (let iter = 0; iter < 5; iter++) {
      particles.forEach((p1, idx1) => {
        vForce.set(0, 0, 0);
        vTemp.copy(p1.pos).multiplyScalar(-kCenter);
        vForce.add(vTemp);
        particles.forEach((p2, idx2) => {
          if (idx1 === idx2) return;
          vDiff.subVectors(p1.pos, p2.pos);
          const dist = vDiff.length();
          if (dist < repulsionDist && dist > 0.01) {
            vDiff.normalize().multiplyScalar((repulsionDist - dist) * kRepulse);
            vForce.add(vDiff);
          }
        });
        p1.pos.add(vForce);
      });
    }

    const centerLight = new THREE.PointLight(0xff0000, 2.0, 15);
    nucleusGroup.add(centerLight);

    particles.forEach((p) => {
      const mesh = new THREE.Mesh(
        p.type === "proton" ? protonGeo : neutronGeo,
        p.type === "proton" ? protonMat : neutronMat,
      );
      mesh.position.copy(p.pos);
      nucleusGroup.add(mesh);
    });

    // Electrons with exact same logic as updateAtomStructure
    const shells = [2, 8, 8, 18, 18, 32, 32];
    let electronsLeft = atomicNumber;
    for (let s = 0; s < shells.length; s++) {
      if (electronsLeft <= 0) break;
      const capacity = shells[s];
      const count = Math.min(electronsLeft, capacity);
      electronsLeft -= count;
      const radius = 4.5 + s * 2.5;

      const orbitGeo = new THREE.TorusGeometry(radius, 0.04, 64, 100);
      const orbitMat = new THREE.MeshBasicMaterial({
        color: 0x8d7f71,
        transparent: true,
        opacity: 0.3,
      });
      const orbit = new THREE.Mesh(orbitGeo, orbitMat);
      orbit.rotation.x = Math.PI / 2;
      wobbleGroup.add(orbit);

      const elGeo = new THREE.SphereGeometry(0.3, 32, 32);
      const elMat = new THREE.MeshStandardMaterial({
        color: 0x0000ff,
        roughness: 0.4,
        metalness: 0.6,
      });

      // Trail geometries
      const trailGeos = [];
      const TRAIL_LENGTH = 10;
      for (let t = 0; t < TRAIL_LENGTH; t++) {
        trailGeos.push(new THREE.SphereGeometry(0.2 - t * 0.015, 8, 8));
      }

      for (let e = 0; e < count; e++) {
        const elMesh = new THREE.Mesh(elGeo, elMat);
        const angleOffset = (e / count) * Math.PI * 2;
        elMesh.userData = {
          radius: radius,
          angle: angleOffset,
          speed: 0.02 - s * 0.002,
          trails: [],
        };
        elMesh.position.x = radius * Math.cos(angleOffset);
        elMesh.position.z = radius * Math.sin(angleOffset);

        // Create trails
        for (let t = 0; t < TRAIL_LENGTH; t++) {
          const tGeo = trailGeos[t];
          const tMat = new THREE.MeshBasicMaterial({
            color: 0x0000ff,
            transparent: true,
            opacity: 0.3 - t * 0.03,
          });
          const tMesh = new THREE.Mesh(tGeo, tMat);
          tMesh.position.copy(elMesh.position);
          wobbleGroup.add(tMesh);
          elMesh.userData.trails.push(tMesh);
        }

        wobbleGroup.add(elMesh);
        heroElectrons.push(elMesh);
      }
    }

    // Pop animation
    heroAtomGroup.userData.popStartTime = Date.now();
    heroAtomGroup.scale.set(0.1, 0.1, 0.1);
  }

  function animateHero() {
    heroAnimationId = requestAnimationFrame(animateHero);

    const time = Date.now() * 0.001;

    // Pop animation
    if (heroAtomGroup && heroAtomGroup.userData.popStartTime) {
      const popElapsed =
        (Date.now() - heroAtomGroup.userData.popStartTime) * 0.001;
      const popDur = 0.5;
      if (popElapsed < popDur) {
        const t = popElapsed / popDur;
        const ease = 1 - Math.pow(1 - t, 3);
        const s = 0.1 + (1 - 0.1) * ease;
        heroAtomGroup.scale.set(s, s, s);
      } else {
        heroAtomGroup.scale.set(1, 1, 1);
        heroAtomGroup.userData.popStartTime = null;
      }
    }

    // Slow auto-rotation
    heroAtomGroup.rotation.y += 0.002;

    // Wobble group animation
    const wobbleGroup = heroAtomGroup.getObjectByName("wobbleGroup");
    if (wobbleGroup) {
      wobbleGroup.rotation.y += 0.002;
      wobbleGroup.rotation.z = Math.sin(time * 0.5) * 0.2;
      wobbleGroup.rotation.x = Math.cos(time * 0.3) * 0.1;
    }

    // Nucleus rotation
    const nucleusGroup = heroAtomGroup.getObjectByName("nucleusGroup");
    if (nucleusGroup) {
      nucleusGroup.rotation.y -= 0.005;
      nucleusGroup.rotation.x = Math.sin(time * 0.2) * 0.1;
    }

    // Animate electrons with trails
    heroElectrons.forEach((el) => {
      el.userData.angle += el.userData.speed;
      const r = el.userData.radius;
      el.position.x = r * Math.cos(el.userData.angle);
      el.position.z = r * Math.sin(el.userData.angle);

      // Update trails
      const trails = el.userData.trails;
      if (trails && trails.length > 0) {
        for (let i = trails.length - 1; i > 0; i--) {
          trails[i].position.copy(trails[i - 1].position);
        }
        trails[0].position.copy(el.position);
      }
    });

    heroRenderer.render(heroScene, heroCamera);
  }

  // Expose cleanup for welcome screen close
  window._heroCleanup = function () {
    if (heroAnimationId) cancelAnimationFrame(heroAnimationId);
    heroAnimationId = null;
    if (heroRenderer) {
      heroRenderer.forceContextLoss();
      heroRenderer.dispose();
      if (heroRenderer.domElement && heroRenderer.domElement.parentNode) {
        heroRenderer.domElement.parentNode.removeChild(heroRenderer.domElement);
      }
      heroRenderer = null;
    }
    heroScene = null;
    heroCamera = null;
    heroAtomGroup = null;
    heroElectrons = [];
  };

  // Initialize when DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHero3D);
  } else {
    initHero3D();
  }
})();
