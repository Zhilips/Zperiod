let lockedSlideIndex = null;
const finallyData = {
    "H": {
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
            { name: "H-3", neutron: "2n", percent: "Radioactive" }
        ]
    },
    "He": {
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
            { name: "He-4", neutron: "2n", percent: "Stable" }
        ]
    },
    "Li": {
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
            { name: "Li-7", neutron: "4n", percent: "Stable" }
        ]
    },
    "Be": {
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
        isotopes: [
            { name: "Be-9", neutron: "5n", percent: "Stable" }
        ]
    },
    "B": {
        discovery: "1808",
        avgAtomicMass: "10.81",
        discoveredBy: "Gay-Lussac & Thénard (and Davy)",
        namedBy: "Derived from \"Borax\"",
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
            { name: "B-11", neutron: "6n", percent: "Stable" }
        ]
    },
    "C": {
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
            { name: "C-14", neutron: "8n", percent: "Radioactive" }
        ]
    },
    "N": {
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
            { name: "N-15", neutron: "8n", percent: "Stable" }
        ]
    },
    "O": {
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
            { name: "O-18", neutron: "10n", percent: "Stable" }
        ]
    },
    "F": {
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
        isotopes: [
            { name: "F-19", neutron: "10n", percent: "Stable" }
        ]
    },
    "Ne": {
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
            { name: "Ne-22", neutron: "12n", percent: "Stable" }
        ]
    },
    "Na": {
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
        isotopes: [
            { name: "Na-23", neutron: "12n", percent: "Stable" }
        ]
    },
    "Mg": {
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
            { name: "Mg-26", neutron: "14n", percent: "Stable" }
        ]
    },
    "Al": {
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
        isotopes: [
            { name: "Al-27", neutron: "14n", percent: "Stable" }
        ]
    },
    "Si": {
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
            { name: "Si-30", neutron: "16n", percent: "Stable" }
        ]
    },
    "P": {
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
        isotopes: [
            { name: "P-31", neutron: "16n", percent: "Stable" }
        ]
    },
    "S": {
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
            { name: "S-36", neutron: "20n", percent: "Stable" }
        ]
    },
    "Cl": {
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
            { name: "Cl-37", neutron: "20n", percent: "Stable" }
        ]
    },
    "Ar": {
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
            { name: "Ar-40", neutron: "22n", percent: "Stable" }
        ]
    },
    "K": {
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
            { name: "K-41", neutron: "22n", percent: "Stable" }
        ]
    },
    "Ca": {
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
            { name: "Ca-48", neutron: "28n", percent: "Stable" }
        ]
    },
    "Sc": {
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
        isotopes: [
            { name: "Sc-45", neutron: "24n", percent: "Stable" }
        ]
    },
    "Ti": {
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
            { name: "Ti-50", neutron: "28n", percent: "Stable" }
        ]
    },
    "V": {
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
            { name: "V-51", neutron: "28n", percent: "Stable" }
        ]
    },
    "Cr": {
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
            { name: "Cr-54", neutron: "30n", percent: "Stable" }
        ]
    },
    "Mn": {
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
        isotopes: [
            { name: "Mn-55", neutron: "30n", percent: "Stable" }
        ]
    },
    "Fe": {
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
            { name: "Fe-58", neutron: "32n", percent: "Stable" }
        ]
    },
    "Co": {
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
        isotopes: [
            { name: "Co-59", neutron: "32n", percent: "Stable" }
        ]
    },
    "Ni": {
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
            { name: "Ni-64", neutron: "36n", percent: "Stable" }
        ]
    },
    "Cu": {
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
            { name: "Cu-65", neutron: "36n", percent: "Stable" }
        ]
    },
    "Zn": {
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
            { name: "Zn-70", neutron: "40n", percent: "Stable" }
        ]
    },
    "Ga": {
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
            { name: "Ga-71", neutron: "40n", percent: "Stable" }
        ]
    },
    "Ge": {
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
            { name: "Ge-74", neutron: "42n", percent: "Stable" }
        ]
    },
    "As": {
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
        isotopes: [
            { name: "As-75", neutron: "42n", percent: "Stable" }
        ]
    },
    "Se": {
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
            { name: "Se-82", neutron: "48n", percent: "Stable" }
        ]
    },
    "Br": {
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
            { name: "Br-81", neutron: "46n", percent: "Stable" }
        ]
    },
    "Kr": {
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
            { name: "Kr-86", neutron: "50n", percent: "Stable" }
        ]
    },
    "Rb": {
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
            { name: "Rb-87", neutron: "50n", percent: "Radioactive" }
        ]
    },
    "Sr": {
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
            { name: "Sr-88", neutron: "50n", percent: "Stable" }
        ]
    },
    "Y": {
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
        isotopes: [
            { name: "Y-89", neutron: "50n", percent: "Stable" }
        ]
    },
    "Zr": {
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
            { name: "Zr-94", neutron: "54n", percent: "Stable" }
        ]
    },
    "Nb": {
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
        isotopes: [
            { name: "Nb-93", neutron: "52n", percent: "Stable" }
        ]
    },
    "Mo": {
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
            { name: "Mo-100", neutron: "58n", percent: "Stable" }
        ]
    },
    "Tc": {
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
        isotopes: [
            { name: "Tc-99", neutron: "56n", percent: "Radioactive" }
        ]
    },
    "Ru": {
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
            { name: "Ru-104", neutron: "60n", percent: "Stable" }
        ]
    },
    "Rh": {
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
        isotopes: [
            { name: "Rh-103", neutron: "58n", percent: "Stable" }
        ]
    },
    "Pd": {
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
            { name: "Pd-110", neutron: "64n", percent: "Stable" }
        ]
    },
    "Ag": {
        discovery: "Prehistoric (~3000 BCE)",
        avgAtomicMass: "107.87",
        discoveredBy: "Ancient Civilizations",
        namedBy: "Anglo-Saxon seolfor (Symbol Ag from Latin argentum)",
        stse: "Medicine (Antibacterial properties); Photography (Traditional film chemistry).",
        uses: "Jewelry, Electronics (Best conductor), Mirrors, Solar panels.",
        hazards: "Argyria (skin turns blue from chronic exposure); toxic to aquatic life.",
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
            { name: "Ag-109", neutron: "62n", percent: "Stable" }
        ]
    },
    "Cd": {
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
            { name: "Cd-116", neutron: "68n", percent: "Stable" }
        ]
    },
    "In": {
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
            { name: "In-115", neutron: "66n", percent: "Radioactive" }
        ]
    },
    "Sn": {
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
            { name: "Sn-124", neutron: "74n", percent: "Stable" }
        ]
    },
    "Sb": {
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
            { name: "Sb-123", neutron: "72n", percent: "Stable" }
        ]
    },
    "Te": {
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
            { name: "Te-130", neutron: "78n", percent: "Radioactive" }
        ]
    },
    "I": {
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
        isotopes: [
            { name: "I-127", neutron: "74n", percent: "Stable" }
        ]
    },
    "Xe": {
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
            { name: "Xe-136", neutron: "82n", percent: "Stable" }
        ]
    },
    "Cs": {
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
        isotopes: [
            { name: "Cs-133", neutron: "78n", percent: "Stable" }
        ]
    },
    "Ba": {
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
            { name: "Ba-138", neutron: "82n", percent: "Stable" }
        ]
    },
    "La": {
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
            { name: "La-139", neutron: "82n", percent: "Stable" }
        ]
    },
    "Ce": {
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
            { name: "Ce-142", neutron: "84n", percent: "Stable" }
        ]
    },
    "Pr": {
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
        isotopes: [
            { name: "Pr-141", neutron: "82n", percent: "Stable" }
        ]
    },
    "Nd": {
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
            { name: "Nd-148", neutron: "88n", percent: "Stable" }
        ]
    },
    "Pm": {
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
        isotopes: [
            { name: "Pm-145", neutron: "84n", percent: "Radioactive" }
        ]
    },
    "Sm": {
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
            { name: "Sm-154", neutron: "92n", percent: "Stable" }
        ]
    },
    "Eu": {
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
            { name: "Eu-153", neutron: "90n", percent: "Stable" }
        ]
    },
    "Gd": {
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
            { name: "Gd-160", neutron: "96n", percent: "Stable" }
        ]
    },
    "Tb": {
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
        isotopes: [
            { name: "Tb-159", neutron: "94n", percent: "Stable" }
        ]
    },
    "Dy": {
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
            { name: "Dy-164", neutron: "98n", percent: "Stable" }
        ]
    },
    "Ho": {
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
        isotopes: [
            { name: "Ho-165", neutron: "98n", percent: "Stable" }
        ]
    },
    "Er": {
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
            { name: "Er-170", neutron: "102n", percent: "Stable" }
        ]
    },
    "Tm": {
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
        isotopes: [
            { name: "Tm-169", neutron: "100n", percent: "Stable" }
        ]
    },
    "Yb": {
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
            { name: "Yb-176", neutron: "106n", percent: "Stable" }
        ]
    },
    "Lu": {
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
            { name: "Lu-176", neutron: "105n", percent: "Radioactive" }
        ]
    },
    "Hf": {
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
            { name: "Hf-180", neutron: "108n", percent: "Stable" }
        ]
    },
    "Ta": {
        discovery: "1802",
        avgAtomicMass: "180.95",
        discoveredBy: "Anders Gustaf Ekeberg",
        namedBy: "From Tantalus (Greek mythology)",
        stse: "Electronics Supply Chain (\"Conflict mineral\").",
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
            { name: "Ta-181", neutron: "108n", percent: "Stable" }
        ]
    },
    "W": {
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
            { name: "W-186", neutron: "112n", percent: "Stable" }
        ]
    },
    "Re": {
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
            { name: "Re-187", neutron: "112n", percent: "Radioactive" }
        ]
    },
    "Os": {
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
            { name: "Os-192", neutron: "116n", percent: "Stable" }
        ]
    },
    "Ir": {
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
            { name: "Ir-193", neutron: "116n", percent: "Stable" }
        ]
    },
    "Pt": {
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
            { name: "Pt-198", neutron: "120n", percent: "Stable" }
        ]
    },
    "Au": {
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
        isotopes: [
            { name: "Au-197", neutron: "118n", percent: "Stable" }
        ]
    },
    "Hg": {
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
            { name: "Hg-204", neutron: "124n", percent: "Stable" }
        ]
    },
    "Tl": {
        discovery: "1861",
        avgAtomicMass: "204.38",
        discoveredBy: "William Crookes",
        namedBy: "From Greek thallos (green twig)",
        stse: "Forensic Science (\"The Poisoner's Poison\").",
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
            { name: "Tl-205", neutron: "124n", percent: "Stable" }
        ]
    },
    "Pb": {
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
            { name: "Pb-208", neutron: "126n", percent: "Stable" }
        ]
    },
    "Bi": {
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
        isotopes: [
            { name: "Bi-209", neutron: "126n", percent: "Stable" }
        ]
    },
    "Po": {
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
            { name: "Po-210", neutron: "126n", percent: "Radioactive" }
        ]
    },
    "At": {
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
            { name: "At-211", neutron: "126n", percent: "Radioactive" }
        ]
    },
    "Rn": {
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
            { name: "Rn-222", neutron: "136n", percent: "Radioactive" }
        ]
    },
    "Fr": {
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
        isotopes: [
            { name: "Fr-223", neutron: "136n", percent: "Radioactive" }
        ]
    },
    "Ra": {
        discovery: "1898",
        avgAtomicMass: "[226] (Radioactive)",
        discoveredBy: "Marie & Pierre Curie",
        namedBy: "Latin radius (ray)",
        stse: "Labor Rights (\"Radium Girls\" poisoning cases); History of Oncology.",
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
            { name: "Ra-228", neutron: "140n", percent: "Radioactive" }
        ]
    },
    "Ac": {
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
        isotopes: [
            { name: "Ac-227", neutron: "138n", percent: "Radioactive" }
        ]
    },
    "Th": {
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
        isotopes: [
            { name: "Th-232", neutron: "142n", percent: "Radioactive" }
        ]
    },
    "Pa": {
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
        isotopes: [
            { name: "Pa-231", neutron: "140n", percent: "Radioactive" }
        ]
    },
    "U": {
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
            { name: "U-238", neutron: "146n", percent: "Radioactive" }
        ]
    },
    "Np": {
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
        isotopes: [
            { name: "Np-237", neutron: "144n", percent: "Radioactive" }
        ]
    },
    "Pu": {
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
            { name: "Pu-244", neutron: "150n", percent: "Radioactive" }
        ]
    },
    "Am": {
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
            { name: "Am-243", neutron: "148n", percent: "Radioactive" }
        ]
    },
    "Cm": {
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
            { name: "Cm-247", neutron: "151n", percent: "Radioactive" }
        ]
    },
    "Bk": {
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
        isotopes: [
            { name: "Bk-247", neutron: "150n", percent: "Radioactive" }
        ]
    },
    "Cf": {
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
            { name: "Cf-252", neutron: "154n", percent: "Radioactive" }
        ]
    },
    "Es": {
        discovery: "1952",
        avgAtomicMass: "252",
        discoveredBy: "Albert Ghiorso et al.",
        namedBy: "Albert Einstein",
        stse: "Cold War Science (Discovered in \"Ivy Mike\" H-bomb debris).",
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
            { name: "Es-253", neutron: "154n", percent: "Radioactive" }
        ]
    },
    "Fm": {
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
        isotopes: [
            { name: "Fm-257", neutron: "157n", percent: "Radioactive" }
        ]
    },
    "Md": {
        discovery: "1955",
        avgAtomicMass: "258",
        discoveredBy: "Ghiorso, Harvey, Choppin, Thompson, Seaborg",
        namedBy: "Dmitri Mendeleev",
        stse: "\"Atom-at-a-time\" synthesis (First element made this way).",
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
        isotopes: [
            { name: "Md-258", neutron: "157n", percent: "Radioactive" }
        ]
    },
    "No": {
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
        isotopes: [
            { name: "No-259", neutron: "157n", percent: "Radioactive" }
        ]
    },
    "Lr": {
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
            { name: "Lr-266", neutron: "163n", percent: "Radioactive" }
        ]
    },
    "Rf": {
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
        isotopes: [
            { name: "Rf-267", neutron: "163n", percent: "Radioactive" }
        ]
    },
    "Db": {
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
        isotopes: [
            { name: "Db-268", neutron: "163n", percent: "Radioactive" }
        ]
    },
    "Sg": {
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
        isotopes: [
            { name: "Sg-271", neutron: "165n", percent: "Radioactive" }
        ]
    },
    "Bh": {
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
        isotopes: [
            { name: "Bh-272", neutron: "165n", percent: "Radioactive" }
        ]
    },
    "Hs": {
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
        isotopes: [
            { name: "Hs-277", neutron: "169n", percent: "Radioactive" }
        ]
    },
    "Mt": {
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
        isotopes: [
            { name: "Mt-278", neutron: "169n", percent: "Radioactive" }
        ]
    },
    "Ds": {
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
        isotopes: [
            { name: "Ds-281", neutron: "171n", percent: "Radioactive" }
        ]
    },
    "Rg": {
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
        isotopes: [
            { name: "Rg-282", neutron: "171n", percent: "Radioactive" }
        ]
    },
    "Cn": {
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
        isotopes: [
            { name: "Cn-285", neutron: "173n", percent: "Radioactive" }
        ]
    },
    "Nh": {
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
        isotopes: [
            { name: "Nh-286", neutron: "173n", percent: "Radioactive" }
        ]
    },
    "Fl": {
        discovery: "1998",
        avgAtomicMass: "289",
        discoveredBy: "JINR (Russia)",
        namedBy: "Flerov Laboratory",
        stse: "\"Island of Stability\" research.",
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
        isotopes: [
            { name: "Fl-289", neutron: "175n", percent: "Radioactive" }
        ]
    },
    "Mc": {
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
        isotopes: [
            { name: "Mc-290", neutron: "175n", percent: "Radioactive" }
        ]
    },
    "Lv": {
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
        isotopes: [
            { name: "Lv-293", neutron: "177n", percent: "Radioactive" }
        ]
    },
    "Ts": {
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
        isotopes: [
            { name: "Ts-294", neutron: "177n", percent: "Radioactive" }
        ]
    },
    "Og": {
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
        isotopes: [
            { name: "Og-294", neutron: "176n", percent: "Radioactive" }
        ]
    }
};
const elements = [
    { number: 1, symbol: "H", name: "Hydrogen", row: 1, column: 1, category: "Non-metal" },
    { number: 2, symbol: "He", name: "Helium", row: 1, column: 18, category: "Noble Gas" },
    { number: 3, symbol: "Li", name: "Lithium", row: 2, column: 1, category: "Alkali Metal" },
    { number: 4, symbol: "Be", name: "Beryllium", row: 2, column: 2, category: "Alkaline Earth Metal" },
    { number: 5, symbol: "B", name: "Boron", row: 2, column: 13, category: "Metalloid" },
    { number: 6, symbol: "C", name: "Carbon", row: 2, column: 14, category: "Non-metal" },
    { number: 7, symbol: "N", name: "Nitrogen", row: 2, column: 15, category: "Non-metal" },
    { number: 8, symbol: "O", name: "Oxygen", row: 2, column: 16, category: "Non-metal" },
    { number: 9, symbol: "F", name: "Fluorine", row: 2, column: 17, category: "Halogen" },
    { number: 10, symbol: "Ne", name: "Neon", row: 2, column: 18, category: "Noble Gas" },
    { number: 11, symbol: "Na", name: "Sodium", row: 3, column: 1, category: "Alkali Metal" },
    { number: 12, symbol: "Mg", name: "Magnesium", row: 3, column: 2, category: "Alkaline Earth Metal" },
    { number: 13, symbol: "Al", name: "Aluminum", row: 3, column: 13, category: "Post-transition Metal" },
    { number: 14, symbol: "Si", name: "Silicon", row: 3, column: 14, category: "Metalloid" },
    { number: 15, symbol: "P", name: "Phosphorus", row: 3, column: 15, category: "Non-metal" },
    { number: 16, symbol: "S", name: "Sulfur", row: 3, column: 16, category: "Non-metal" },
    { number: 17, symbol: "Cl", name: "Chlorine", row: 3, column: 17, category: "Halogen" },
    { number: 18, symbol: "Ar", name: "Argon", row: 3, column: 18, category: "Noble Gas" },
    { number: 19, symbol: "K", name: "Potassium", row: 4, column: 1, category: "Alkali Metal" },
    { number: 20, symbol: "Ca", name: "Calcium", row: 4, column: 2, category: "Alkaline Earth Metal" },
    { number: 21, symbol: "Sc", name: "Scandium", row: 4, column: 3, category: "Transition Metal" },
    { number: 22, symbol: "Ti", name: "Titanium", row: 4, column: 4, category: "Transition Metal" },
    { number: 23, symbol: "V", name: "Vanadium", row: 4, column: 5, category: "Transition Metal" },
    { number: 24, symbol: "Cr", name: "Chromium", row: 4, column: 6, category: "Transition Metal" },
    { number: 25, symbol: "Mn", name: "Manganese", row: 4, column: 7, category: "Transition Metal" },
    { number: 26, symbol: "Fe", name: "Iron", row: 4, column: 8, category: "Transition Metal" },
    { number: 27, symbol: "Co", name: "Cobalt", row: 4, column: 9, category: "Transition Metal" },
    { number: 28, symbol: "Ni", name: "Nickel", row: 4, column: 10, category: "Transition Metal" },
    { number: 29, symbol: "Cu", name: "Copper", row: 4, column: 11, category: "Transition Metal" },
    { number: 30, symbol: "Zn", name: "Zinc", row: 4, column: 12, category: "Transition Metal" },
    { number: 31, symbol: "Ga", name: "Gallium", row: 4, column: 13, category: "Post-transition Metal" },
    { number: 32, symbol: "Ge", name: "Germanium", row: 4, column: 14, category: "Metalloid" },
    { number: 33, symbol: "As", name: "Arsenic", row: 4, column: 15, category: "Metalloid" },
    { number: 34, symbol: "Se", name: "Selenium", row: 4, column: 16, category: "Non-metal" },
    { number: 35, symbol: "Br", name: "Bromine", row: 4, column: 17, category: "Halogen" },
    { number: 36, symbol: "Kr", name: "Krypton", row: 4, column: 18, category: "Noble Gas" },
    { number: 37, symbol: "Rb", name: "Rubidium", row: 5, column: 1, category: "Alkali Metal" },
    { number: 38, symbol: "Sr", name: "Strontium", row: 5, column: 2, category: "Alkaline Earth Metal" },
    { number: 39, symbol: "Y", name: "Yttrium", row: 5, column: 3, category: "Transition Metal" },
    { number: 40, symbol: "Zr", name: "Zirconium", row: 5, column: 4, category: "Transition Metal" },
    { number: 41, symbol: "Nb", name: "Niobium", row: 5, column: 5, category: "Transition Metal" },
    { number: 42, symbol: "Mo", name: "Molybdenum", row: 5, column: 6, category: "Transition Metal" },
    { number: 43, symbol: "Tc", name: "Technetium", row: 5, column: 7, category: "Transition Metal" },
    { number: 44, symbol: "Ru", name: "Ruthenium", row: 5, column: 8, category: "Transition Metal" },
    { number: 45, symbol: "Rh", name: "Rhodium", row: 5, column: 9, category: "Transition Metal" },
    { number: 46, symbol: "Pd", name: "Palladium", row: 5, column: 10, category: "Transition Metal" },
    { number: 47, symbol: "Ag", name: "Silver", row: 5, column: 11, category: "Transition Metal" },
    { number: 48, symbol: "Cd", name: "Cadmium", row: 5, column: 12, category: "Transition Metal" },
    { number: 49, symbol: "In", name: "Indium", row: 5, column: 13, category: "Post-transition Metal" },
    { number: 50, symbol: "Sn", name: "Tin", row: 5, column: 14, category: "Post-transition Metal" },
    { number: 51, symbol: "Sb", name: "Antimony", row: 5, column: 15, category: "Metalloid" },
    { number: 52, symbol: "Te", name: "Tellurium", row: 5, column: 16, category: "Metalloid" },
    { number: 53, symbol: "I", name: "Iodine", row: 5, column: 17, category: "Halogen" },
    { number: 54, symbol: "Xe", name: "Xenon", row: 5, column: 18, category: "Noble Gas" },
    { number: 55, symbol: "Cs", name: "Cesium", row: 6, column: 1, category: "Alkali Metal" },
    { number: 56, symbol: "Ba", name: "Barium", row: 6, column: 2, category: "Alkaline Earth Metal" },
    { number: 57, symbol: "La", name: "Lanthanum", row: 6, column: 3, category: "Lanthanide", series: "lanthanide" },
    { number: 72, symbol: "Hf", name: "Hafnium", row: 6, column: 4, category: "Transition Metal" },
    { number: 73, symbol: "Ta", name: "Tantalum", row: 6, column: 5, category: "Transition Metal" },
    { number: 74, symbol: "W", name: "Tungsten", row: 6, column: 6, category: "Transition Metal" },
    { number: 75, symbol: "Re", name: "Rhenium", row: 6, column: 7, category: "Transition Metal" },
    { number: 76, symbol: "Os", name: "Osmium", row: 6, column: 8, category: "Transition Metal" },
    { number: 77, symbol: "Ir", name: "Iridium", row: 6, column: 9, category: "Transition Metal" },
    { number: 78, symbol: "Pt", name: "Platinum", row: 6, column: 10, category: "Transition Metal" },
    { number: 79, symbol: "Au", name: "Gold", row: 6, column: 11, category: "Transition Metal" },
    { number: 80, symbol: "Hg", name: "Mercury", row: 6, column: 12, category: "Transition Metal" },
    { number: 81, symbol: "Tl", name: "Thallium", row: 6, column: 13, category: "Post-transition Metal" },
    { number: 82, symbol: "Pb", name: "Lead", row: 6, column: 14, category: "Post-transition Metal" },
    { number: 83, symbol: "Bi", name: "Bismuth", row: 6, column: 15, category: "Post-transition Metal" },
    { number: 84, symbol: "Po", name: "Polonium", row: 6, column: 16, category: "Post-transition Metal" },
    { number: 85, symbol: "At", name: "Astatine", row: 6, column: 17, category: "Halogen" },
    { number: 86, symbol: "Rn", name: "Radon", row: 6, column: 18, category: "Noble Gas" },
    { number: 87, symbol: "Fr", name: "Francium", row: 7, column: 1, category: "Alkali Metal" },
    { number: 88, symbol: "Ra", name: "Radium", row: 7, column: 2, category: "Alkaline Earth Metal" },
    { number: 89, symbol: "Ac", name: "Actinium", row: 7, column: 3, category: "Actinide", series: "actinide" },
    { number: 104, symbol: "Rf", name: "Rutherfordium", row: 7, column: 4, category: "Transition Metal" },
    { number: 105, symbol: "Db", name: "Dubnium", row: 7, column: 5, category: "Transition Metal" },
    { number: 106, symbol: "Sg", name: "Seaborgium", row: 7, column: 6, category: "Transition Metal" },
    { number: 107, symbol: "Bh", name: "Bohrium", row: 7, column: 7, category: "Transition Metal" },
    { number: 108, symbol: "Hs", name: "Hassium", row: 7, column: 8, category: "Transition Metal" },
    { number: 109, symbol: "Mt", name: "Meitnerium", row: 7, column: 9, category: "Transition Metal" },
    { number: 110, symbol: "Ds", name: "Darmstadtium", row: 7, column: 10, category: "Transition Metal" },
    { number: 111, symbol: "Rg", name: "Roentgenium", row: 7, column: 11, category: "Transition Metal" },
    { number: 112, symbol: "Cn", name: "Copernicium", row: 7, column: 12, category: "Transition Metal" },
    { number: 113, symbol: "Nh", name: "Nihonium", row: 7, column: 13, category: "Post-transition Metal" },
    { number: 114, symbol: "Fl", name: "Flerovium", row: 7, column: 14, category: "Post-transition Metal" },
    { number: 115, symbol: "Mc", name: "Moscovium", row: 7, column: 15, category: "Post-transition Metal" },
    { number: 116, symbol: "Lv", name: "Livermorium", row: 7, column: 16, category: "Post-transition Metal" },
    { number: 117, symbol: "Ts", name: "Tennessine", row: 7, column: 17, category: "Halogen" },
    { number: 118, symbol: "Og", name: "Oganesson", row: 7, column: 18, category: "Noble Gas" },
    { number: 58, symbol: "Ce", name: "Cerium", row: 9, column: 4, category: "Lanthanide", series: "lanthanide" },
    { number: 59, symbol: "Pr", name: "Praseodymium", row: 9, column: 5, category: "Lanthanide", series: "lanthanide" },
    { number: 60, symbol: "Nd", name: "Neodymium", row: 9, column: 6, category: "Lanthanide", series: "lanthanide" },
    { number: 61, symbol: "Pm", name: "Promethium", row: 9, column: 7, category: "Lanthanide", series: "lanthanide" },
    { number: 62, symbol: "Sm", name: "Samarium", row: 9, column: 8, category: "Lanthanide", series: "lanthanide" },
    { number: 63, symbol: "Eu", name: "Europium", row: 9, column: 9, category: "Lanthanide", series: "lanthanide" },
    { number: 64, symbol: "Gd", name: "Gadolinium", row: 9, column: 10, category: "Lanthanide", series: "lanthanide" },
    { number: 65, symbol: "Tb", name: "Terbium", row: 9, column: 11, category: "Lanthanide", series: "lanthanide" },
    { number: 66, symbol: "Dy", name: "Dysprosium", row: 9, column: 12, category: "Lanthanide", series: "lanthanide" },
    { number: 67, symbol: "Ho", name: "Holmium", row: 9, column: 13, category: "Lanthanide", series: "lanthanide" },
    { number: 68, symbol: "Er", name: "Erbium", row: 9, column: 14, category: "Lanthanide", series: "lanthanide" },
    { number: 69, symbol: "Tm", name: "Thulium", row: 9, column: 15, category: "Lanthanide", series: "lanthanide" },
    { number: 70, symbol: "Yb", name: "Ytterbium", row: 9, column: 16, category: "Lanthanide", series: "lanthanide" },
    { number: 71, symbol: "Lu", name: "Lutetium", row: 9, column: 17, category: "Lanthanide", series: "lanthanide" },
    { number: 90, symbol: "Th", name: "Thorium", row: 10, column: 4, category: "Actinide", series: "actinide" },
    { number: 91, symbol: "Pa", name: "Protactinium", row: 10, column: 5, category: "Actinide", series: "actinide" },
    { number: 92, symbol: "U", name: "Uranium", row: 10, column: 6, category: "Actinide", series: "actinide" },
    { number: 93, symbol: "Np", name: "Neptunium", row: 10, column: 7, category: "Actinide", series: "actinide" },
    { number: 94, symbol: "Pu", name: "Plutonium", row: 10, column: 8, category: "Actinide", series: "actinide" },
    { number: 95, symbol: "Am", name: "Americium", row: 10, column: 9, category: "Actinide", series: "actinide" },
    { number: 96, symbol: "Cm", name: "Curium", row: 10, column: 10, category: "Actinide", series: "actinide" },
    { number: 97, symbol: "Bk", name: "Berkelium", row: 10, column: 11, category: "Actinide", series: "actinide" },
    { number: 98, symbol: "Cf", name: "Californium", row: 10, column: 12, category: "Actinide", series: "actinide" },
    { number: 99, symbol: "Es", name: "Einsteinium", row: 10, column: 13, category: "Actinide", series: "actinide" },
    { number: 100, symbol: "Fm", name: "Fermium", row: 10, column: 14, category: "Actinide", series: "actinide" },
    { number: 101, symbol: "Md", name: "Mendelevium", row: 10, column: 15, category: "Actinide", series: "actinide" },
    { number: 102, symbol: "No", name: "Nobelium", row: 10, column: 16, category: "Actinide", series: "actinide" },
    { number: 103, symbol: "Lr", name: "Lawrencium", row: 10, column: 17, category: "Actinide", series: "actinide" }
];
document.addEventListener('DOMContentLoaded', () => {
    const tableContainer = document.getElementById('periodic-table');
    const grid = {};
    if (typeof elements !== 'undefined') {
        elements.forEach(element => {
            if (element.row && element.column) {
                grid[`${element.row}-${element.column}`] = element;
            }
        });
        for (let r = 1; r <= 7; r++) {
            for (let c = 1; c <= 18; c++) {
                const element = grid[`${r}-${c}`];
                const cell = document.createElement('div');
                if (element) {
                    cell.classList.add('element');
                    if (element.category) {
                        const catClass = element.category.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
                        cell.classList.add(catClass);
                    }
                    cell.innerHTML = `
                        <span class="number">${element.number}</span>
                        <span class="symbol">${element.symbol}</span>
                        <span class="name">${element.name}</span>
                    `;
                    cell.addEventListener('click', () => showModal(element));
                } else {
                    cell.classList.add('empty');
                }
                cell.style.gridRow = r;
                cell.style.gridColumn = c;
                tableContainer.appendChild(cell);
            }
        }
        createLegend(tableContainer);
        const lanthanides = elements.filter(e => e.series === 'lanthanide').sort((a, b) => a.number - b.number);
        const actinides = elements.filter(e => e.series === 'actinide').sort((a, b) => a.number - b.number);
        lanthanides.forEach((element, index) => {
            const cell = document.createElement('div');
            cell.classList.add('element', 'lanthanide');
            if (element.category) {
                const catClass = element.category.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
                cell.classList.add(catClass);
            }
            cell.innerHTML = `
                <span class="number">${element.number}</span>
                <span class="symbol">${element.symbol}</span>
                <span class="name">${element.name}</span>
            `;
            cell.addEventListener('click', () => showModal(element));
            cell.style.gridRow = 9;
            cell.style.gridColumn = 4 + index;
            tableContainer.appendChild(cell);
        });
        actinides.forEach((element, index) => {
            const cell = document.createElement('div');
            cell.classList.add('element', 'actinide');
            if (element.category) {
                const catClass = element.category.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
                cell.classList.add(catClass);
            }
            cell.innerHTML = `
                <span class="number">${element.number}</span>
                <span class="symbol">${element.symbol}</span>
                <span class="name">${element.name}</span>
            `;
            cell.addEventListener('click', () => showModal(element));
            cell.style.gridRow = 10;
            cell.style.gridColumn = 4 + index;
            tableContainer.appendChild(cell);
        });
        const hash = window.location.hash.toLowerCase();
        if (hash === '#pb' || hash === '#lead') {
            const leadElement = elements.find(el => el.symbol === 'Pb');
            if (leadElement) {
                setTimeout(() => showModal(leadElement), 500);
            }
        }
    }
    const modal = document.getElementById('element-modal');
    const modalClose = document.getElementById('modal-close');
    const modalSymbol = document.getElementById('modal-symbol');
    const modalName = document.getElementById('modal-name');
    const modalNumber = document.getElementById('modal-number');
    const modalCategory = document.getElementById('modal-category');
    const modalPhase = document.getElementById('modal-phase');
    const modalCategoryDisplay = document.getElementById('modal-category-display');
    const modalConfigLarge = document.getElementById('modal-config-large');
    const modalDiscovery = document.getElementById('modal-discovery');
    const modalEtymology = document.getElementById('modal-etymology');
    const modalDescription = document.getElementById('modal-description');
    const modalDensity = document.getElementById('modal-density');
    const modalMelt = document.getElementById('modal-melt');
    const modalBoil = document.getElementById('modal-boil');
    const modalNegativity = document.getElementById('modal-electronegativity');
    const modalRadius = document.getElementById('modal-radius');
    const modalIonization = document.getElementById('modal-ionization');
    const modalWatermark = document.getElementById('modal-watermark');
    const atomContainer = document.getElementById('atom-container');
    const modalCharge = document.getElementById('modal-charge');
    const modalP = document.getElementById('modal-p');
    const modalE = document.getElementById('modal-e');
    const modalN = document.getElementById('modal-n');
    const modalPeriod = document.getElementById('modal-period');
    const modalGroup = document.getElementById('modal-group');
    const modalCompounds = document.getElementById('modal-compounds');
    const modalUses = document.getElementById('modal-uses');
    const modalHazards = document.getElementById('modal-hazards');
    const modalShells = document.getElementById('modal-shells');
    const eduNames = document.getElementById('edu-names');
    const eduIsotopes = document.getElementById('edu-isotopes');
    const eduCardsContainer = document.getElementById('edu-cards-container');
    let scene, camera, renderer, atomGroup, animationId;
    let electrons = [];
    let introStartTime = 0;
    let isIntroAnimating = false;
    let initialCameraZ = 16;
    let targetCameraZ = 16;
    function init3DScene() {
        if (renderer) {
            if (atomContainer && renderer.domElement && !atomContainer.contains(renderer.domElement)) {
                atomContainer.appendChild(renderer.domElement);
                if (atomContainer.clientWidth > 0 && atomContainer.clientHeight > 0) {
                    renderer.setSize(atomContainer.clientWidth, atomContainer.clientHeight);
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
                    failIfMajorPerformanceCaveat: false
                });
            } catch (e1) {
                try {
                    renderer = new THREE.WebGLRenderer({
                        antialias: false,
                        alpha: true,
                        powerPreference: "low-power"
                    });
                } catch (e2) {
                    const msg = document.createElement('div');
                    msg.style.cssText = 'color:#333;display:flex;justify-content:center;align-items:center;height:100%;flex-direction:column;text-align:center;padding:20px;';
                    msg.innerHTML = '<div style="font-size:1.2rem;margin-bottom:10px;">3D View Unavailable</div><div style="font-size:0.8rem;opacity:0.7;">请在Chrome地址栏输入 chrome://settings/system<br>确保"使用硬件加速"已开启，然后刷新页面</div>';
                    atomContainer.appendChild(msg);
                    return;
                }
            }
            renderer.setSize(width, height);
            renderer.setPixelRatio(window.devicePixelRatio);
            atomContainer.appendChild(renderer.domElement);
            const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.0);
            scene.add(ambientLight);
            const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.4);
            directionalLight.position.set(10, 10, 10);
            scene.add(directionalLight);
            atomGroup = new THREE.Group();
            scene.add(atomGroup);
            atomGroup.rotation.set(0, 0, 0);
            let isDragging = false;
            let previousMousePosition = { x: 0, y: 0 };
            const container = renderer.domElement;
            container.addEventListener('mousedown', (e) => {
                isDragging = true;
                isIntroAnimating = false;
                previousMousePosition = { x: e.offsetX, y: e.offsetY };
                container.style.cursor = 'grabbing';
            });
            container.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                const deltaMove = {
                    x: e.offsetX - previousMousePosition.x,
                    y: e.offsetY - previousMousePosition.y
                };
                const rotateSpeed = 0.005;
                atomGroup.rotation.y += deltaMove.x * rotateSpeed;
                atomGroup.rotation.x += deltaMove.y * rotateSpeed;
                previousMousePosition = { x: e.offsetX, y: e.offsetY };
            });
            window.addEventListener('mouseup', () => {
                isDragging = false;
                container.style.cursor = 'grab';
            });
            container.addEventListener('touchstart', (e) => {
                if (e.touches.length === 1) {
                    isDragging = true;
                    isIntroAnimating = false;
                    previousMousePosition = { x: e.touches[0].pageX, y: e.touches[0].pageY };
                }
            }, { passive: false });
            container.addEventListener('touchmove', (e) => {
                if (!isDragging || e.touches.length !== 1) return;
                e.preventDefault();
                const deltaMove = {
                    x: e.touches[0].pageX - previousMousePosition.x,
                    y: e.touches[0].pageY - previousMousePosition.y
                };
                const rotateSpeed = 0.005;
                atomGroup.rotation.y += deltaMove.x * rotateSpeed;
                atomGroup.rotation.x += deltaMove.y * rotateSpeed;
                previousMousePosition = { x: e.touches[0].pageX, y: e.touches[0].pageY };
            }, { passive: false });
            window.addEventListener('touchend', () => {
                isDragging = false;
            });
            container.addEventListener('wheel', (e) => {
                e.preventDefault();
                const zoomSpeed = 0.02;
                camera.position.z += e.deltaY * zoomSpeed;
                camera.position.z = Math.max(4, Math.min(60, camera.position.z));
            }, { passive: false });
            container.style.cursor = 'grab';
            window.addEventListener('resize', onWindowResize, false);
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
            color: 0xFF2222,
            roughness: 0.25,
            metalness: 0.4,
            emissive: 0xFF0000,
            emissiveIntensity: 1.5
        });
        const neutronGeo = new THREE.SphereGeometry(particleRadius, 32, 32);
        const neutronMat = new THREE.MeshStandardMaterial({
            color: 0x999999,
            roughness: 0.15,
            metalness: 0.5,
            emissive: 0x333333,
            emissiveIntensity: 0.6
        });
        const particles = [];
        for (let i = 0; i < atomicNumber; i++) particles.push({ type: 'proton' });
        for (let i = 0; i < neutronCount; i++) particles.push({ type: 'neutron' });
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
            p.pos = new THREE.Vector3(x * clusterScale, y * clusterScale, z * clusterScale);
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
                            vDiff.normalize().multiplyScalar((repulsionDist - dist) * kRepulse);
                            vForce.add(vDiff);
                        }
                    });
                    p1.pos.add(vForce);
                });
            }
        }
        if (atomicNumber > 1) {
            const centerLight = new THREE.PointLight(0xFF0000, 2.0, 15);
            nucleusGroup.add(centerLight);
        }
        particles.forEach(p => {
            const mesh = new THREE.Mesh(
                p.type === 'proton' ? protonGeo : neutronGeo,
                p.type === 'proton' ? protonMat : neutronMat
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
            const radius = 4.5 + (s * 2.5);
            const orbitGeo = new THREE.TorusGeometry(radius, 0.04, 64, 100);
            const orbitMat = new THREE.MeshBasicMaterial({ color: 0x8D7F71, transparent: true, opacity: 0.3 });
            const orbit = new THREE.Mesh(orbitGeo, orbitMat);
            orbit.rotation.x = Math.PI / 2;
            wobbleGroup.add(orbit);
            const elGeo = new THREE.SphereGeometry(0.3, 32, 32);
            const elMat = new THREE.MeshStandardMaterial({ color: 0x0000FF, roughness: 0.4, metalness: 0.6 });
            const trailGeos = [];
            const TRAIL_LENGTH = 10;
            for (let t = 0; t < TRAIL_LENGTH; t++) {
                trailGeos.push(new THREE.SphereGeometry(0.2 - (t * 0.015), 8, 8));
            }
            for (let e = 0; e < count; e++) {
                const elMesh = new THREE.Mesh(elGeo, elMat);
                const angleOffset = (e / count) * Math.PI * 2;
                elMesh.userData = {
                    radius: radius,
                    angle: angleOffset,
                    speed: 0.02 - (s * 0.002),
                    trails: []
                };
                elMesh.position.x = radius * Math.cos(angleOffset);
                elMesh.position.z = radius * Math.sin(angleOffset);
                for (let t = 0; t < TRAIL_LENGTH; t++) {
                    const tGeo = trailGeos[t];
                    const tMat = new THREE.MeshBasicMaterial({
                        color: 0x0000FF,
                        transparent: true,
                        opacity: 0.3 - (t * 0.03)
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
            actualMaxRadius = 4.5 + ((shellsUsed - 1) * 2.5);
        }
        atomGroup.userData.maxRadius = actualMaxRadius;
        atomGroup.userData.popStartTime = Date.now();
        atomGroup.scale.set(0.1, 0.1, 0.1);
    }
    function onWindowResize() {
        if (!camera || !renderer) return;
        if (atomContainer.clientHeight === 0) {
            const visualPane = document.querySelector('.modal-visual-pane');
            if (visualPane) atomContainer.style.height = visualPane.clientHeight + 'px';
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
            if (nucleusGroup && nucleusGroup.userData.physicsIterationsRemaining > 0) {
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
                                vDiff.normalize().multiplyScalar((repulsionDist - dist) * kRepulse);
                                vForce.add(vDiff);
                            }
                        });
                        p1.pos.add(vForce);
                    });
                }
                particles.forEach(p => {
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
        } else {
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
        if (wobbleGroup) {
            wobbleGroup.rotation.y += 0.002;
            wobbleGroup.rotation.z = Math.sin(time * 0.5) * 0.2;
            wobbleGroup.rotation.x = Math.cos(time * 0.3) * 0.1;
        }
        const nucleusGroup = atomGroup.getObjectByName("nucleusGroup");
        if (nucleusGroup) {
            nucleusGroup.rotation.y -= 0.005;
            nucleusGroup.rotation.x = Math.sin(time * 0.2) * 0.1;
        }
        electrons.forEach(el => {
            el.userData.angle += el.userData.speed;
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
    function cleanup3D() {
        if (animationId) cancelAnimationFrame(animationId);
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
            const map = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
            return num.toString().split('').map(d => map[d] || d).join('');
        };
        const setText = (selector, text) => {
            const el = document.querySelector(selector);
            if (el) el.textContent = text;
        };
        const setStyle = (el, styles) => {
            if (el) Object.assign(el.style, styles);
        };
        const findContentDiv = (cell, colorFilter) => {
            const divs = cell?.querySelectorAll('div[style*="font-size: 0.95rem"]') || [];
            for (const div of divs) {
                const style = div.getAttribute('style') || '';
                if (!colorFilter || (colorFilter === 'stse' && style.includes('color: #064E3B')) ||
                    (colorFilter === 'hazards' && style.includes('color: #991B1B')) ||
                    (colorFilter === 'uses' && !style.includes('color: #064E3B') && !style.includes('color: #991B1B'))) {
                    return div;
                }
            }
            return divs[0] || null;
        };
        const formatTemp = (temp) => {
            if (!temp || typeof temp !== 'string') return "N/A";
            if (temp.includes('—') || temp.includes('Pressurized') || temp === "N/A" || temp.includes('Unknown')) return "N/A";
            return temp.replace(' °C', '').replace('°C', '').trim();
        };
        const formatDensity = (density) => {
            if (!density || density === "N/A" || density === "Unknown") return { value: "N/A", unit: "" };
            const parts = density.split(' ');
            return { value: parts[0], unit: parts.slice(1).join(' ') };
        };
        const formatElectronegativity = (en) => {
            if (en === null || en === undefined) return "N/A";
            if (typeof en === 'string') {
                if (en.includes('—') || en.trim() === '') return "N/A";
                const num = en.match(/[\d.]+/);
                return num ? parseFloat(num[0]).toFixed(2) : "N/A";
            }
            return en.toFixed(2);
        };
        const formatIonization = (ie) => {
            if (!ie) return "N/A";
            if (typeof ie === 'string' && ie.includes('kJ/mol')) return ie.replace(' kJ/mol', '').trim();
            if (typeof ie === 'string' && ie.includes('eV')) {
                const ev = parseFloat(ie);
                return !isNaN(ev) ? Math.round(ev * 96.485).toString() : "N/A";
            }
            return ie;
        };
        const formatSTSE = (content, symbol) => {
            if (symbol === "H") return `Energy transition (Fuel Cells)<br>Hydrogen as energy carrier<br><span style="opacity: 0.8; font-weight: 500; font-size: 0.85rem;">Heavy Water (D₂O) • CANDU</span>`;
            if (symbol === "He") return `Cryogenics (MRI supermagnets)<br>Non-renewable resource conservation.`;
            const sentences = content.split(/[;。]\s*/).filter(s => s.trim());
            return sentences.map((s, i) => s.trim() + (i < sentences.length - 1 ? '<br>' : '')).join('');
        };
        const greenCard = document.querySelector('.green-rectangle .card-info-container');
        if (greenCard) {
            setText('.green-rectangle .info-row:nth-child(1) .info-value', element.category || "Unknown");
            setText('.green-rectangle .info-row:nth-child(2) .info-value', `${element.column || "-"} / ${element.row || "-"}`);
            setText('.green-rectangle .info-row:nth-child(3) .info-value', element.phase || "Unknown");
            const valenceRow = greenCard.querySelector('.info-row:nth-child(4) .info-value');
            if (valenceRow) {
                if (finallyElementData.valenceElectrons !== undefined) {
                    const valence = finallyElementData.valenceElectrons;
                    const valenceStr = typeof valence === 'string' ? valence : valence.toString();
                    valenceRow.textContent = valenceStr;
                    valenceRow.classList.toggle('long-text', typeof valence === 'string' &&
                        (valence.includes('Variable') || valence.includes('(') || valence.length > 5));
                } else {
                    let valence = element.number === 1 ? 1 : element.number === 2 ? 2 :
                        element.column <= 2 ? element.column : element.column <= 12 ? element.column :
                            element.column <= 18 ? element.column - 10 : 0;
                    valenceRow.textContent = valence.toString();
                }
            }
            const ionsSection = greenCard.querySelector('.ions-section');
            if (ionsSection) {
                ionsSection.querySelectorAll('.ion-item').forEach(item => item.remove());
                const commonIonsText = finallyElementData.commonIons || "";
                const hasNoIons = !commonIonsText || /none|n\/a|inert/i.test(commonIonsText) || !commonIonsText.trim();
                const createIonItem = (symbol, name) => {
                    const item = document.createElement('div');
                    item.className = 'ion-item';
                    item.innerHTML = `<span class="ion-symbol">${symbol}</span><span class="ion-arrow">→</span><span class="ion-name">${name}</span>`;
                    return item;
                };
                if (hasNoIons) {
                    ionsSection.appendChild(createIonItem(element.symbol, "No common ions"));
                } else if (eduData.stockNames?.length > 0) {
                    eduData.stockNames.forEach(ion => {
                        ionsSection.appendChild(createIonItem(`${element.symbol}<sup>${ion.charge}</sup>`, ion.name));
                    });
                } else if (commonIonsText) {
                    const parseIon = (ionText) => {
                        const match = ionText.match(/([A-Za-z]+[⁺⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)\s*(?:\(([^)]+)\))?/);
                        return match ? { symbol: match[1], name: match[2] || `${element.name} ion` } :
                            { symbol: element.symbol, name: ionText };
                    };
                    if (commonIonsText.includes(',')) {
                        commonIonsText.split(',').map(s => s.trim()).forEach(ionText => {
                            const { symbol, name } = parseIon(ionText);
                            ionsSection.appendChild(createIonItem(symbol, name));
                        });
                    } else {
                        const { symbol, name } = parseIon(commonIonsText);
                        ionsSection.appendChild(createIonItem(symbol, name));
                    }
                } else {
                    const charge = element.column === 1 && element.number !== 1 ? '+' : element.column === 2 ? '2+' : '';
                    ionsSection.appendChild(createIonItem(charge ? `${element.symbol}<sup>${charge}</sup>` : element.symbol,
                        charge ? `${element.name} ion` : "No common ions"));
                }
            }
        }
        const yellowCard = document.querySelector('.yellow-rectangle .card-info-container');
        if (yellowCard) {
            const avgMass = finallyElementData.avgAtomicMass || (element.weight ? element.weight.toFixed(4) : "N/A");
            setText('.yellow-rectangle .info-row:nth-child(1) .info-value', avgMass);
            setText('.yellow-rectangle .info-row:nth-child(2) .info-value', element.number.toString());
            setText('.yellow-rectangle .info-row:nth-child(3) .info-value', element.number.toString());
            const isotopesSection = yellowCard.querySelector('.ions-section');
            if (isotopesSection) {
                isotopesSection.querySelectorAll('.ion-item').forEach(item => item.remove());
                const isotopesToDisplay = (finallyElementData.isotopes?.length > 0 ? finallyElementData.isotopes :
                    eduData.isotopesOverride?.length > 0 ? eduData.isotopesOverride : []);
                isotopesToDisplay.forEach(iso => {
                    const parseMassNumber = () => {
                        if (iso.name?.includes('-')) return iso.name.split('-')[1];
                        if (iso.symbol) {
                            const match = iso.symbol.match(/[¹²³⁴⁵⁶⁷⁸⁹⁰]+/);
                            if (match) {
                                const supToNum = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' };
                                return match[0].split('').map(c => supToNum[c] || c).join('');
                            }
                        }
                        return iso.name?.match(/\d+/)?.[0] || '';
                    };
                    const massNumber = parseMassNumber();
                    if (!massNumber) return;
                    const percent = (iso.percent || '').toLowerCase();
                    const isStable = percent && !percent.includes('trace') && !percent.includes('radioactive');
                    const neutronNumber = iso.neutron?.replace('n', '').replace('⁰', '0') || '';
                    const isoItem = document.createElement('div');
                    isoItem.className = 'ion-item';
                    isoItem.innerHTML = `
                        <span class="ion-symbol">${numberToSuperscript(massNumber)}${element.symbol}</span>
                        <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end;">
                            <span style="font-weight: 600; font-size: 0.95rem;">${neutronNumber} n⁰</span>
                            <span style="font-size: 0.7rem; text-transform: uppercase; opacity: 0.6; font-weight: 700; letter-spacing: 0.5px; ${isStable ? '' : 'color: #B91C1C;'}">${isStable ? 'Stable' : 'Radioactive'}</span>
                        </div>
                    `;
                    isotopesSection.appendChild(isoItem);
                });
            }
        }
        const blueCard = document.querySelector('.blue-rectangle .card-info-container');
        if (blueCard) {
            const configHero = blueCard.querySelector('.config-hero');
            if (configHero) {
                const config = finallyElementData.electronConfig || element.electronConfig || "N/A";
                const supMap = {
                    '¹': '<sup>1</sup>', '²': '<sup>2</sup>', '³': '<sup>3</sup>', '⁴': '<sup>4</sup>',
                    '⁵': '<sup>5</sup>', '⁶': '<sup>6</sup>', '⁷': '<sup>7</sup>', '⁸': '<sup>8</sup>',
                    '⁹': '<sup>9</sup>', '⁰': '<sup>0</sup>'
                };
                configHero.innerHTML = Object.entries(supMap).reduce((html, [u, h]) => html.replace(new RegExp(u, 'g'), h), config);
            }
            const oxidationContainer = blueCard.querySelector('.oxidation-container');
            if (oxidationContainer) {
                oxidationContainer.innerHTML = '';
                const states = finallyElementData.oxidationStates || [];
                if (states.length > 0) {
                    const mainPill = document.createElement('div');
                    mainPill.className = 'ox-pill';
                    mainPill.innerHTML = `<label>Common</label>${states[0]}`;
                    oxidationContainer.appendChild(mainPill);
                    states.slice(1).forEach(state => {
                        const pill = document.createElement('div');
                        pill.className = 'ox-pill faded';
                        pill.innerHTML = `<label>Poss.</label>${state}`;
                        oxidationContainer.appendChild(pill);
                    });
                    const pills = oxidationContainer.querySelectorAll('.ox-pill');
                    if (states.length > 6) {
                        oxidationContainer.style.gap = '3px';
                        pills.forEach(p => {
                            p.style.fontSize = '0.7rem';
                            p.style.padding = '2px 5px';
                            const label = p.querySelector('label');
                            if (label) {
                                label.style.fontSize = '0.5rem';
                                label.style.marginRight = '2px';
                            }
                        });
                    } else if (states.length > 4) {
                        oxidationContainer.style.gap = '5px';
                        pills.forEach(p => {
                            p.style.fontSize = '0.8rem';
                            p.style.padding = '3px 7px';
                            const label = p.querySelector('label');
                            if (label) label.style.fontSize = '0.55rem';
                        });
                    } else {
                        oxidationContainer.style.gap = '8px';
                        pills.forEach(p => {
                            p.style.fontSize = '';
                            p.style.padding = '';
                            const label = p.querySelector('label');
                            if (label) {
                                label.style.fontSize = '';
                                label.style.marginRight = '';
                            }
                        });
                    }
                }
            }
            setText('.blue-rectangle .l3-stat-item:nth-child(1) .l3-stat-value',
                formatElectronegativity(finallyElementData.electronegativity ?? element.electronegativity));
            setText('.blue-rectangle .l3-stat-item:nth-child(2) .l3-stat-value',
                formatIonization(finallyElementData.ionization || element.ionization));
            const densityData = formatDensity(finallyElementData.density || element.density);
            setText('.blue-rectangle .l3-stat-item:nth-child(3) .l3-stat-value', densityData.value);
            const densityUnit = blueCard.querySelector('.l3-stat-item:nth-child(3) .l3-stat-unit');
            if (densityUnit) densityUnit.textContent = densityData.unit;
            setText('.blue-rectangle .l3-stat-item:nth-child(4) .l3-stat-value', formatTemp(finallyElementData.melt || element.melt));
            setText('.blue-rectangle .l3-stat-item:nth-child(5) .l3-stat-value', formatTemp(finallyElementData.boil || element.boil));
        }
        const redCard = document.querySelector('.red-rectangle .card-info-container');
        if (redCard) {
            setStyle(redCard, { width: '100%', maxWidth: '100%', overflowX: 'hidden', boxSizing: 'border-box' });
            const commonCellStyles = { width: '100%', maxWidth: '100%', boxSizing: 'border-box', overflow: 'hidden' };
            const commonContentStyles = {
                width: '100%', maxWidth: '100%', boxSizing: 'border-box',
                wordWrap: 'break-word', overflowWrap: 'break-word', wordBreak: 'break-word', overflow: 'hidden'
            };
            redCard.querySelectorAll('.info-row').forEach(row => {
                setStyle(row, {
                    width: '100%', maxWidth: '100%', boxSizing: 'border-box', display: 'flex',
                    justifyContent: 'space-between', gap: '10px'
                });
                setStyle(row.querySelector('.info-label'), { flexShrink: '0', minWidth: 'fit-content', whiteSpace: 'nowrap' });
                setStyle(row.querySelector('.info-value'), {
                    flex: '1 1 auto', minWidth: '0', maxWidth: '100%',
                    wordWrap: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal',
                    textAlign: 'right', overflow: 'visible'
                });
            });
            const year = finallyElementData.discovery || element.discovery || "Unknown";
            setText('.red-rectangle .info-row:nth-child(2) .info-value', typeof year === 'string' ? year.split(' ')[0] : year);
            setText('.red-rectangle .info-row:nth-child(3) .info-value', finallyElementData.discoveredBy || "Unknown");
            setText('.red-rectangle .info-row:nth-child(4) .info-value', finallyElementData.namedBy || "Unknown");
            const propGridSection = redCard.querySelector('.prop-grid-section');
            if (propGridSection) {
                setStyle(propGridSection, { width: '100%', maxWidth: '100%', boxSizing: 'border-box', minWidth: '0' });
                const stseCell = propGridSection.querySelector('.prop-cell:nth-child(1)');
                if (stseCell) {
                    setStyle(stseCell, commonCellStyles);
                    const stseContent = findContentDiv(stseCell, 'stse');
                    if (stseContent && (finallyElementData.stse || eduData.stse)) {
                        setStyle(stseContent, commonContentStyles);
                        stseContent.innerHTML = formatSTSE(finallyElementData.stse || eduData.stse?.content || "", element.symbol);
                    } else {
                        stseCell.style.display = 'none';
                    }
                }
                const usesCell = propGridSection.querySelector('.prop-cell:nth-child(2)');
                if (usesCell) {
                    setStyle(usesCell, commonCellStyles);
                    const usesContent = findContentDiv(usesCell, 'uses');
                    if (usesContent) {
                        setStyle(usesContent, commonContentStyles);
                        usesContent.textContent = finallyElementData.uses || element.uses || "Research and industrial applications";
                    }
                }
                const hazardsCell = propGridSection.querySelector('.prop-cell:nth-child(3)');
                if (hazardsCell) {
                    setStyle(hazardsCell, commonCellStyles);
                    const hazardsContent = findContentDiv(hazardsCell, 'hazards');
                    if (hazardsContent) {
                        setStyle(hazardsContent, commonContentStyles);
                        hazardsContent.textContent = finallyElementData.hazards || element.hazards || "Follow safety guidelines";
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
        element.electronConfig = element.electronConfig || finallyElementData.electronConfig || "N/A";
        element.discovery = element.discovery || finallyElementData.discovery || "Unknown";
        element.etymology = element.etymology || finallyElementData.namedBy || "N/A";
        element.description = element.description || finallyElementData.stse || "";
        initializeLevelSystem(element);
        const isSimplifiedView = element.number <= 118;
        const elementContent = document.querySelector('.element-content');
        const simplifiedBox = document.querySelector('.simplified-element-box');
        const modalInfoPane = document.querySelector('.modal-info-pane');
        if (elementContent && simplifiedBox && modalInfoPane) {
            if (isSimplifiedView) {
                elementContent.style.display = 'none';
                simplifiedBox.style.display = 'flex';
                modalInfoPane.classList.add('no-scroll');
                populateSimplifiedView(element);
            } else {
                elementContent.style.display = 'flex';
                simplifiedBox.style.display = 'none';
                modalInfoPane.classList.remove('no-scroll');
            }
        }
        const eduData = element.educational;
        const headlineAtomicNumbers = [
            1, 4, 7, 9, 11, 12, 14, 16, 19, 20, 23, 24, 27, 28, 31, 32, 35, 40, 39, 40,
            45, 48, 51, 52, 55, 56, 59, 59, 64, 65, 70, 73, 75, 79, 80, 84, 85, 88, 89, 91,
            93, 96, 98, 101, 103, 106, 47, 112, 115, 119, 122, 128, 127, 131, 133, 137, 139, 140, 141, 144,
            145, 150, 152, 157, 159, 163, 165, 167, 169, 173, 175, 178, 181, 184, 186, 190, 192, 195, 197, 201,
            204, 207, 209, 209, 210, 222, 223, 226, 227, 232, 231, 238, 237, 244, 243, 247, 247, 251, 252, 257,
            258, 259, 266, 267, 268, 269, 269, 278, 281, 282, 285, 286, 289, 290, 293, 294, 294, 108
        ];
        const massNumbers = [
            1, 4, 7, 9, 11, 12, 14, 16, 19, 20, 23, 24, 27, 28, 31, 32, 35, 40, 39, 40,
            45, 48, 51, 52, 55, 56, 59, 59, 64, 65, 70, 73, 75, 79, 80, 84, 85, 88, 89, 91,
            93, 96, 98, 101, 103, 106, 108, 112, 115, 119, 122, 128, 127, 131, 133, 137, 139, 140, 141, 144,
            145, 150, 152, 157, 159, 163, 165, 167, 169, 173, 175, 178, 181, 184, 186, 190, 192, 195, 197, 201,
            204, 207, 209, 209, 210, 222, 223, 226, 227, 232, 231, 238, 237, 244, 243, 247, 247, 251, 252, 257,
            258, 259, 266, 267, 268, 269, 269, 278, 281, 282, 285, 286, 289, 290, 293, 294, 294, 108
        ];
        const headlineMass = document.getElementById('headline-mass');
        const headlineAtomic = document.getElementById('headline-atomic');
        const headlineSymbol = document.getElementById('headline-symbol');
        if (headlineMass) {
            const massNumber = (element.number >= 1 && element.number <= 118)
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
        const headlineName = document.getElementById('headline-name');
        if (headlineName) {
            headlineName.textContent = element.name;
            const resizeFont = () => {
                const container = headlineName.parentElement;
                const leftGroup = container.querySelector('.headline-left-group');
                if (!container || !leftGroup) return;
                const containerWidth = container.offsetWidth;
                const leftGroupWidth = leftGroup.offsetWidth;
                let margins = 80;
                let fontSize = 2.5;
                headlineName.style.marginLeft = '40px';
                headlineName.style.marginRight = '40px';
                headlineName.style.fontSize = fontSize + 'rem';
                let availableWidth = containerWidth - leftGroupWidth - margins;
                while (headlineName.scrollWidth > availableWidth && fontSize > 1.0) {
                    fontSize -= 0.1;
                    headlineName.style.fontSize = fontSize + 'rem';
                }
                if (fontSize < 1.8) {
                    margins = 40;
                    headlineName.style.marginLeft = '20px';
                    headlineName.style.marginRight = '20px';
                    availableWidth = containerWidth - leftGroupWidth - margins;
                    fontSize = Math.min(2.5, fontSize + 0.3);
                    headlineName.style.fontSize = fontSize + 'rem';
                    while (headlineName.scrollWidth > availableWidth && fontSize > 1.0) {
                        fontSize -= 0.1;
                        headlineName.style.fontSize = fontSize + 'rem';
                    }
                }
            };
            setTimeout(resizeFont, 0);
            window.addEventListener('resize', resizeFont);
        }
        const elementText = document.querySelector('.element-text');
        const elementName = document.querySelector('.element-name');
        if (elementText && elementName) {
            const nameLength = element.name.length;
            let lengthCategory;
            if (nameLength <= 4) {
                lengthCategory = 'very-short';
            } else if (nameLength <= 6) {
                lengthCategory = 'short';
            } else if (nameLength <= 10) {
                lengthCategory = 'medium';
            } else {
                lengthCategory = 'long';
            }
            elementText.setAttribute('data-name-length', lengthCategory);
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
        if (modalNegativity) modalNegativity.textContent = element.electronegativity || "-";
        if (modalRadius) modalRadius.textContent = element.radius || "-";
        if (modalIonization) {
            let ie = element.ionization || "-";
            if (typeof ie === 'string' && ie.includes('eV')) {
                const ev = parseFloat(ie);
                if (!isNaN(ev)) ie = `${(ev * 96.485).toFixed(1)} kJ/mol`;
            }
            modalIonization.textContent = ie;
        }
        const grp = element.column;
        if (eduNames && modalCharge) {
            if (eduData && eduData.stockNames) {
                modalCharge.style.display = 'none';
                eduNames.style.display = 'block';
                eduNames.innerHTML = eduData.stockNames.map(n =>
                    `<div class="stock-name-item"><span class="stock-ion">${element.symbol}<sup>${n.charge}</sup></span> <span class="stock-text">= ${n.name}</span></div>`
                ).join('');
            } else {
                modalCharge.style.display = 'block';
                eduNames.style.display = 'none';
                const commonOxidationStates = {
                    "H": ["+1", "-1"], "He": ["0"],
                    "Li": ["+1"], "Be": ["+2"], "B": ["+3"], "C": ["+4", "-4", "+2"], "N": ["-3", "+5", "+3", "+4", "+2"], "O": ["-2"], "F": ["-1"], "Ne": ["0"],
                    "Na": ["+1"], "Mg": ["+2"], "Al": ["+3"], "Si": ["+4", "-4"], "P": ["-3", "+5", "+3"], "S": ["-2", "+6", "+4"], "Cl": ["-1", "+1", "+3", "+5", "+7"], "Ar": ["0"],
                    "K": ["+1"], "Ca": ["+2"], "Sc": ["+3"], "Ti": ["+4", "+3"], "V": ["+5", "+4", "+3", "+2"], "Cr": ["+3", "+6", "+2"], "Mn": ["+2", "+4", "+7"], "Fe": ["+3", "+2"], "Co": ["+2", "+3"], "Ni": ["+2"], "Cu": ["+2", "+1"], "Zn": ["+2"], "Ga": ["+3"], "Ge": ["+4", "+2"], "As": ["-3", "+5", "+3"], "Se": ["-2", "+4", "+6"], "Br": ["-1", "+1", "+5"], "Kr": ["0"],
                    "Rb": ["+1"], "Sr": ["+2"], "Y": ["+3"], "Zr": ["+4"], "Nb": ["+5", "+3"], "Mo": ["+6", "+4"], "Tc": ["+7", "+4"], "Ru": ["+3", "+4"], "Rh": ["+3"], "Pd": ["+2", "+4"], "Ag": ["+1"], "Cd": ["+2"], "In": ["+3"], "Sn": ["+4", "+2"], "Sb": ["+3", "+5", "-3"], "Te": ["-2", "+4", "+6"], "I": ["-1", "+1", "+5", "+7"], "Xe": ["0", "+2", "+4", "+6"],
                    "Cs": ["+1"], "Ba": ["+2"], "La": ["+3"], "Ce": ["+3", "+4"], "Pr": ["+3"], "Nd": ["+3"], "Pm": ["+3"], "Sm": ["+3", "+2"], "Eu": ["+3", "+2"], "Gd": ["+3"], "Tb": ["+3", "+4"], "Dy": ["+3"], "Ho": ["+3"], "Er": ["+3"], "Tm": ["+3", "+2"], "Yb": ["+3", "+2"], "Lu": ["+3"],
                    "Hf": ["+4"], "Ta": ["+5"], "W": ["+6", "+4"], "Re": ["+7", "+4"], "Os": ["+4"], "Ir": ["+4", "+3"], "Pt": ["+2", "+4"], "Au": ["+3", "+1"], "Hg": ["+2", "+1"], "Tl": ["+1", "+3"], "Pb": ["+2", "+4"], "Bi": ["+3"], "Po": ["+2", "+4"], "At": ["-1", "+1"], "Rn": ["0"],
                    "Fr": ["+1"], "Ra": ["+2"], "Ac": ["+3"], "Th": ["+4"], "Pa": ["+5", "+4"], "U": ["+6", "+4"], "Np": ["+5"], "Pu": ["+4"], "Am": ["+3"],
                };
                const states = commonOxidationStates[element.symbol];
                if (states && states.length > 0) {
                    let html = `<span class="charge-main">${states[0]}</span>`;
                    if (states.length > 1) {
                        states.slice(1).forEach(s => {
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
        const neutrons = (eduData && eduData.neutronOverride)
            ? eduData.neutronOverride
            : (mass - atomicNum);
        if (modalP) modalP.textContent = atomicNum;
        if (modalE) modalE.textContent = atomicNum;
        if (modalN) modalN.textContent = neutrons > 0 ? neutrons : 0;
        if (modalPeriod) modalPeriod.textContent = element.row || "-";
        if (modalGroup) modalGroup.textContent = grp || "-";
        const amphotericCard = document.getElementById('amphoteric-card');
        if (amphotericCard) {
            if (eduData && eduData.amphoteric) {
                amphotericCard.style.display = 'flex';
            } else {
                amphotericCard.style.display = 'none';
            }
        }
        if (eduNames) {
            if (eduData && eduData.stockNames) {
                eduNames.style.display = 'block';
                eduNames.innerHTML = eduData.stockNames.map(n =>
                    `<div class="stock-name-item"><span class="stock-ion">${element.symbol}<sup>${n.charge}</sup></span> <span class="stock-text">= ${n.name}</span></div>`
                ).join('');
            } else {
                eduNames.style.display = 'none';
            }
        }
        if (eduIsotopes) {
            if (eduData && eduData.isotopesOverride) {
                eduIsotopes.style.display = 'block';
                eduIsotopes.innerHTML = `
                    <div class="iso-title">Natural Isotopes</div>
                    <table class="iso-table">
                        ${eduData.isotopesOverride.map(iso => `
                            <tr>
                                <td class="iso-name">${iso.name}</td>
                                <td class="iso-detail"><span class="n-badge">${iso.neutron}n</span></td>
                                <td class="iso-percent">${iso.percent}</td>
                            </tr>
                        `).join('')}
                    </table>
                    <div class="iso-note">Average Mass: ${element.weight}</div>
                `;
            } else {
                eduIsotopes.style.display = 'none';
            }
        }
        if (eduCardsContainer) {
            eduCardsContainer.style.display = 'none';
            eduCardsContainer.innerHTML = '';
            eduCardsContainer.className = 'edu-cards-grid';
            let advancedHtml = '';
            const hasAdvanced = eduData && (eduData.equilibriums || eduData.electrochemistry || eduData.thermodynamics);
            if (hasAdvanced) {
                eduCardsContainer.className = 'advanced-data-container';
                eduCardsContainer.style.display = 'flex';
                eduCardsContainer.style.flexDirection = 'column';
                eduCardsContainer.style.gap = '24px';
                if (eduData.equilibriums) {
                    advancedHtml += `
                        <div class="data-section">
                            <div class="data-title">Solubility Equilibrium (25°C)</div>
                            <table class="data-table">
                                <thead><tr><th>Reaction</th><th>K<sub>sp</sub></th></tr></thead>
                                <tbody>
                                    ${eduData.equilibriums.map(e => `
                                        <tr>
                                            <td class="formula">${e.reaction}</td>
                                            <td class="value">${e.value}</td>
                                        </tr>
                                    `).join('')}
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
                                    ${eduData.electrochemistry.map(e => `
                                        <tr>
                                            <td class="formula">${e.reaction}</td>
                                            <td class="meta">${e.type}</td>
                                            <td class="value ${e.potential.includes('+') ? 'pos' : 'neg'}">${e.potential}</td>
                                        </tr>
                                    `).join('')}
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
                                    ${eduData.thermodynamics.map(e => `
                                        <tr>
                                            <td class="formula">${e.compound}</td>
                                            <td class="value">${e.value}</td>
                                            <td class="value">${e.entropy || "-"}</td>
                                        </tr>
                                    `).join('')}
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
                                ${eduData.stse.tags.map(t => `<span class="stse-tag">${t}</span>`).join('')}
                            </div>
                        </div>
                    `;
                }
                eduCardsContainer.innerHTML = advancedHtml;
            } else if (eduData && (eduData.solubility || eduData.safety)) {
                eduCardsContainer.style.display = 'grid';
                let html = '';
                if (eduData.solubility) {
                    const sol = eduData.solubility;
                    html += `<div class="edu-card edu-solubility" style="grid-column: 1 / -1; width: 100%;">
                                <h4 class="edu-title">Reaction Prediction</h4>`;
                    if (sol.insoluble) {
                        html += `<div class="sol-group"><span class="sol-label bad">Precipitates (Insoluble):</span>` +
                            sol.insoluble.map(i => `<div class="sol-item">• ${i.ion} → ${i.result}</div>`).join('') + `</div>`;
                    }
                    if (sol.soluble) {
                        html += `<div class="sol-group"><span class="sol-label good">Soluble:</span>` +
                            sol.soluble.map(i => `<div class="sol-item">• ${i.ion}</div>`).join('') + `</div>`;
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
                modalUses.textContent = "Batteries, Radiation Shielding (X-Ray), Construction";
            } else {
                modalUses.textContent = "Used in research and industry.";
            }
        }
        if (modalHazards) {
            if (element.hazards) {
                modalHazards.textContent = element.hazards;
            } else if (element.symbol === "Pb") {
                modalHazards.textContent = "Neurotoxin (Brain/Nerve damage), Bioaccumulation";
            } else {
                modalHazards.textContent = "Follow safety guidelines";
            }
        }
        if (modalShells) {
            modalShells.textContent = calculateShells(element);
        }
        const modalIsotopes = document.getElementById('modal-isotopes');
        if (modalIsotopes) {
            modalIsotopes.innerHTML = '';
            if (element.isotopes && element.isotopes.length > 0) {
                element.isotopes.forEach(iso => {
                    const row = document.createElement('div');
                    row.classList.add('isotope-row');
                    const info = document.createElement('div');
                    info.classList.add('iso-info');
                    const sym = document.createElement('span');
                    sym.classList.add('iso-symbol');
                    sym.textContent = iso.symbol;
                    const isoName = document.createElement('span');
                    isoName.classList.add('iso-name');
                    isoName.textContent = iso.name || "";
                    const abundance = document.createElement('span');
                    abundance.classList.add('iso-abundance');
                    abundance.textContent = iso.abundance || "";
                    info.appendChild(sym);
                    info.appendChild(isoName);
                    info.appendChild(abundance);
                    const tag = document.createElement('span');
                    tag.classList.add('iso-tag');
                    const isStable = (iso.stability || "").toLowerCase().includes("stable");
                    tag.classList.add(isStable ? 'stable' : 'radioactive');
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
            category = element.series.charAt(0).toUpperCase() + element.series.slice(1);
        } else if (element.row === 7 && element.column === 18) {
            category = "Noble Gas";
        }
        if (element.isLanthanide) category = "Lanthanide";
        if (element.isActinide) category = "Actinide";
        if (modalCategory) {
            modalCategory.textContent = category;
        }
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.setAttribute('data-element-name', `${element.symbol} - ${element.name}`);
        }
        modal.classList.add('active');
        if (isSimplifiedView) {
            const slider = document.querySelector('.cards-slider');
            if (slider) {
                slider.style.visibility = 'hidden';
            }
            requestAnimationFrame(() => {
                initSwipeSlider();
                if (slider) {
                    slider.style.visibility = 'visible';
                }
            });
        }
        if (element.number <= 118) {
            atomContainer.classList.add('visible');
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
                if (typeof THREE === 'undefined') return;
                try {
                    const contentHeight = modal.querySelector('.modal-content').clientHeight;
                    if (atomContainer.clientHeight === 0) {
                        const visualPane = atomContainer.parentElement;
                        if (visualPane.clientHeight === 0) {
                            visualPane.style.height = '100%';
                            if (visualPane.clientHeight === 0) {
                                atomContainer.style.height = (contentHeight) + 'px';
                            }
                        } else {
                            atomContainer.style.height = visualPane.clientHeight + 'px';
                        }
                    }
                    init3DScene();
                    updateAtomStructure(element);
                    onWindowResize();
                    if (typeof reset3DView === 'function') {
                        reset3DView();
                    }
                    cleanup3D();
                    animateAtom();
                    requestAnimationFrame(() => {
                        atomContainer.style.opacity = '1';
                    });
                } catch (e) {
                    console.error("Three.js error:", e);
                }
            }, 100);
        } else {
            atomContainer.classList.remove('visible');
            cleanup3D();
        }
    }
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        cleanup3D();
        atomContainer.classList.remove('visible');
        const slider = document.querySelector('.cards-slider');
        const dots = document.querySelectorAll('.slider-dots .dot');
        if (slider) {
            slider.scrollTo({ left: 0 });
            if (dots.length > 0) {
                dots.forEach(d => d.classList.remove('active'));
                dots[0].classList.add('active');
            }
        }
        const levelBtns = document.querySelectorAll('.level-btn');
        const levelContents = document.querySelectorAll('.level-content');
        levelBtns.forEach(btn => btn.classList.remove('active'));
        levelContents.forEach(content => content.style.display = 'none');
        const level1Btn = document.querySelector('.level-btn[data-level="1"]');
        const level1Content = document.getElementById('level-1');
        if (level1Btn) level1Btn.classList.add('active');
        if (level1Content) level1Content.style.display = 'block';
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            cleanup3D();
            atomContainer.classList.remove('visible');
            const slider = document.querySelector('.cards-slider');
            const dots = document.querySelectorAll('.slider-dots .dot');
            if (slider) {
                slider.scrollTo({ left: 0 });
                if (dots.length > 0) {
                    dots.forEach(d => d.classList.remove('active'));
                    dots[0].classList.add('active');
                }
            }
            const levelBtns = document.querySelectorAll('.level-btn');
            const levelContents = document.querySelectorAll('.level-content');
            levelBtns.forEach(btn => btn.classList.remove('active'));
            levelContents.forEach(content => content.style.display = 'none');
            const level1Btn = document.querySelector('.level-btn[data-level="1"]');
            const level1Content = document.getElementById('level-1');
            if (level1Btn) level1Btn.classList.add('active');
            if (level1Content) level1Content.style.display = 'block';
        }
    });
    let currentPrimaryElement = null;
    tableContainer.addEventListener('click', (e) => {
        const cell = e.target.closest('.element');
        if (cell && !cell.classList.contains('empty')) {
            const number = parseInt(cell.querySelector('.number').textContent);
            const element = elements.find(el => el.number === number);
            if (element) {
                currentPrimaryElement = element;
                showModal(element);
            }
        }
    });
    window.lockedLevelIndex = window.lockedLevelIndex ?? 0;
    window.isLevelLocked = window.isLevelLocked ?? false;
    function initializeLevelSystem(element) {
        const levelBtns = document.querySelectorAll('.level-btn');
        const levelContents = document.querySelectorAll('.level-content');
        levelBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetLevel = btn.dataset.level;
                switchToLevel(targetLevel, element);
                levelBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
        const startLevel = window.isLevelLocked ? String(window.lockedLevelIndex + 1) : '1';
        switchToLevel(startLevel, element);
        levelBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.level === startLevel);
        });
    }
    function switchToLevel(level, element) {
        const levelContents = document.querySelectorAll('.level-content');
        levelContents.forEach(content => {
            content.style.display = 'none';
        });
        const targetContent = document.getElementById(`level-${level}`);
        if (targetContent) {
            targetContent.style.display = 'block';
            populateLevelContent(level, element);
        }
    }
    function populateLevelContent(level, element) {
        const eduData = element.educational;
        if (level === '1') {
            populateLevel1(element, eduData);
        } else if (level === '2') {
            populateLevel2(element, eduData);
        } else if (level === '3') {
            populateLevel3(element, eduData);
        }
    }
    function populateLevel1(element, eduData) {
        const level1Protons = document.getElementById('level1-protons');
        const level1Electrons = document.getElementById('level1-electrons');
        const level1Neutrons = document.getElementById('level1-neutrons');
        const level1Mass = document.getElementById('level1-mass');
        const level1Density = document.getElementById('level1-density');
        const level1Melt = document.getElementById('level1-melt');
        if (level1Protons) level1Protons.textContent = element.number;
        if (level1Electrons) level1Electrons.textContent = element.number;
        if (level1Neutrons) {
            const neutrons = (eduData && eduData.neutronOverride)
                ? eduData.neutronOverride
                : (Math.round(element.weight) - element.number);
            if (element.symbol === 'Pb') {
                level1Neutrons.textContent = `${neutrons} (in Pb-208)`;
            } else {
                level1Neutrons.textContent = neutrons;
            }
        }
        if (level1Mass) level1Mass.textContent = element.weight;
        if (level1Density) {
            if (element.symbol === 'Pb') {
                level1Density.textContent = "11.34 g/cm³ (Heavy!)";
            } else {
                level1Density.textContent = element.density || "N/A";
            }
        }
        if (level1Melt) {
            if (element.symbol === 'Pb') {
                level1Melt.textContent = "327.5 °C (Easily melted)";
            } else {
                level1Melt.textContent = element.melt || "N/A";
            }
        }
        const modalCategoryDisplay = document.getElementById('modal-category-display');
        const modalPhase = document.getElementById('modal-phase');
        const modalGroup = document.getElementById('modal-group');
        const amphotericCard = document.getElementById('amphoteric-card');
        if (modalCategoryDisplay) modalCategoryDisplay.textContent = element.category || "Unknown";
        if (modalPhase) modalPhase.textContent = element.phase || "Unknown";
        if (modalGroup) modalGroup.textContent = element.column || "-";
        if (amphotericCard) {
            if (eduData && eduData.amphoteric) {
                amphotericCard.style.display = 'flex';
            } else {
                amphotericCard.style.display = 'none';
            }
        }
    }
    function populateLevel2(element, eduData) {
    }
    function populateLevel3(element, eduData) {
    }
    function initSwipeSlider() {
        const slider = document.querySelector('.cards-slider');
        const dots = document.querySelectorAll('.slider-dots .dot');
        const slides = document.querySelectorAll('.card-slide');
        const lockBtn = document.getElementById('level-lock-btn');

        if (!slider || slides.length < 2) return;

        let currentIndex = window.isLevelLocked ? window.lockedLevelIndex : 0;
        const gap = 20;
        let isDragging = false;
        let startX = 0;
        let startScrollLeft = 0;

        // Lock button setup
        if (lockBtn) {
            lockBtn.style.display = 'flex';
            const newLockBtn = lockBtn.cloneNode(true);
            lockBtn.parentNode.replaceChild(newLockBtn, lockBtn);
            newLockBtn.classList.toggle('locked', window.isLevelLocked);
            newLockBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                window.isLevelLocked = !window.isLevelLocked;
                window.lockedLevelIndex = currentIndex;
                newLockBtn.classList.toggle('locked', window.isLevelLocked);
                updateDots();
            });
        }

        function getSlideWidth() {
            return slider.clientWidth + gap;
        }

        function updateDots() {
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
                dot.classList.toggle('locked', window.isLevelLocked && i === window.lockedLevelIndex);
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
                    slide.style.opacity = '0';
                }
            });
        }

        function snapToSlide(index, animated = true) {
            index = Math.max(0, Math.min(index, slides.length - 1));
            currentIndex = index;
            const target = index * getSlideWidth();

            if (animated) {
                slider.style.scrollBehavior = 'smooth';
                slider.scrollLeft = target;
                setTimeout(() => { slider.style.scrollBehavior = 'auto'; }, 400);
            } else {
                slider.scrollLeft = target;
            }

            updateDots();

            // Update content
            const el = window.currentAtomElement;
            if (el) switchToLevel(String(index + 1), el);
        }

        // Touch/Mouse Events
        function getX(e) {
            return e.touches ? e.touches[0].clientX : e.pageX;
        }

        slider.addEventListener('mousedown', startDrag);
        slider.addEventListener('touchstart', startDrag, { passive: true });

        function startDrag(e) {
            isDragging = true;
            startX = getX(e);
            startScrollLeft = slider.scrollLeft;
            slider.style.scrollBehavior = 'auto';
            slider.style.cursor = 'grabbing';
        }

        document.addEventListener('mousemove', moveDrag);
        document.addEventListener('touchmove', moveDrag, { passive: true });

        function moveDrag(e) {
            if (!isDragging) return;
            const x = getX(e);
            const diff = startX - x;
            slider.scrollLeft = startScrollLeft + diff;
            update3DEffect();
        }

        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchend', endDrag);

        function endDrag() {
            if (!isDragging) return;
            isDragging = false;
            slider.style.cursor = 'grab';

            // Determine which slide to snap to
            const slideWidth = getSlideWidth();
            const scrollPos = slider.scrollLeft;
            const nearestIndex = Math.round(scrollPos / slideWidth);
            snapToSlide(nearestIndex);
        }

        // Dot clicks
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => snapToSlide(index));
        });

        // Scroll event for live updates
        slider.addEventListener('scroll', () => {
            if (!isDragging) {
                update3DEffect();
                const realIndex = Math.round(slider.scrollLeft / getSlideWidth());
                dots.forEach((dot, i) => dot.classList.toggle('active', i === realIndex));
            }
        });

        // Initialize
        snapToSlide(currentIndex, false);
        update3DEffect();
    }
});
let activeLegendCategory = null;
function highlightCategory(container, catClass) {
    container.classList.add('highlighting');
    const elements = container.querySelectorAll('.element');
    elements.forEach(el => {
        if (el.classList.contains(catClass)) {
            el.classList.add('highlighted');
        } else {
            el.classList.remove('highlighted');
        }
    });
}
function clearHighlights(container) {
    container.classList.remove('highlighting');
    const highlighted = container.querySelectorAll('.element.highlighted');
    highlighted.forEach(el => el.classList.remove('highlighted'));
}
function createLegend(container) {
    const legendContainer = document.createElement('div');
    legendContainer.id = 'table-legend';
    const categories = [
        { name: "Alkali Metal", class: "alkali-metal" },
        { name: "Alkaline Earth", class: "alkaline-earth" },
        { name: "Transition Metal", class: "transition-metal" },
        { name: "Post-Transition", class: "post-transition-metal" },
        { name: "Metalloid", class: "metalloid" },
        { name: "Non-metal", class: "non-metal" },
        { name: "Halogen", class: "halogen" },
        { name: "Noble Gas", class: "noble-gas" },
        { name: "Lanthanide", class: "lanthanide" },
        { name: "Actinide", class: "actinide" }
    ];
    categories.forEach(cat => {
        const item = document.createElement('div');
        item.className = 'legend-item';
        item.setAttribute('data-category', cat.class);
        const swatch = document.createElement('div');
        swatch.className = `legend-swatch ${cat.class}`;
        swatch.style.pointerEvents = 'none';
        const label = document.createElement('span');
        label.textContent = cat.name;
        label.style.pointerEvents = 'none';
        item.appendChild(swatch);
        item.appendChild(label);
        item.addEventListener('mouseenter', () => {
            if (activeLegendCategory) return;
            highlightCategory(container, cat.class);
        });
        item.addEventListener('mouseleave', () => {
            if (activeLegendCategory) return;
            clearHighlights(container);
        });
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            if (activeLegendCategory === cat.class) {
                activeLegendCategory = null;
                item.classList.remove('active');
                clearHighlights(container);
            } else {
                container.querySelectorAll('.legend-item.active').forEach(el => el.classList.remove('active'));
                activeLegendCategory = cat.class;
                item.classList.add('active');
                highlightCategory(container, cat.class);
            }
        });
        legendContainer.appendChild(item);
    });
    container.appendChild(legendContainer);
}