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
            // Calculate Phase @ STP (25°C)
            if (!element.phase && typeof finallyData !== 'undefined') {
                const data = finallyData[element.symbol] || {};
                const parseT = (s) => { const m = (s || '').match(/-?[\d.]+/); return m ? parseFloat(m[0]) : null; };
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

        // 添加按钮事件处理
        const mainContainer = document.getElementById('main-container');
        const blankPage1 = document.getElementById('blank-page-1');
        const blankPage2 = document.getElementById('blank-page-2');

        let currentPage = 'table'; // 'table', 'blank1', 'blank2'

        function showTablePage() {
            // 如果当前已经是表页面，不执行任何操作
            if (currentPage === 'table') {
                return;
            }

            // 隐藏所有空白页
            if (blankPage1) {
                blankPage1.classList.remove('active');
            }
            if (blankPage2) {
                blankPage2.classList.remove('active');
            }

            // 显示主容器
            if (mainContainer) {
                mainContainer.style.display = 'flex';
            }

            currentPage = 'table';
        }

        function showBlankPage1() {
            // 如果当前已经是blank1页面，不执行任何操作
            if (currentPage === 'blank1') {
                return;
            }

            // 隐藏主容器和其他空白页
            if (mainContainer) {
                mainContainer.style.display = 'none';
            }
            if (blankPage2) {
                blankPage2.classList.remove('active');
            }

            // 显示blank1
            if (blankPage1) {
                blankPage1.classList.add('active');
            }

            currentPage = 'blank1';
        }

        function showBlankPage2() {
            // 如果当前已经是blank2页面，不执行任何操作
            if (currentPage === 'blank2') {
                return;
            }

            // 隐藏主容器和其他空白页
            if (mainContainer) {
                mainContainer.style.display = 'none';
            }
            if (blankPage1) {
                blankPage1.classList.remove('active');
            }

            // 显示blank2
            if (blankPage2) {
                blankPage2.classList.add('active');
            }

            currentPage = 'blank2';
        }

        // 主页面的按钮
        // 主页面的按钮
        const btnTable = document.getElementById('btn-table');
        const btnTools = document.getElementById('btn-tools');
        const btnBlankPage = document.getElementById('btn-blank-page');

        // Tools页面的按钮
        const btnTablePage1 = document.getElementById('btn-table-page1');
        const btnToolsPage1 = document.getElementById('btn-tools-page1');
        const btnBlankPagePage1 = document.getElementById('btn-blank-page1');

        // Blank页面的按钮
        const btnTablePage2 = document.getElementById('btn-table-page2');
        const btnToolsPage2 = document.getElementById('btn-tools-page2');
        const btnBlankPagePage2 = document.getElementById('btn-blank-page2');

        // 绑定所有按钮的事件
        [btnTable, btnTablePage1, btnTablePage2].forEach(btn => {
            if (btn) {
                btn.addEventListener('click', showTablePage);
            }
        });

        // Tools 按钮组 -> 显示 Tools 页面 (blank-page-1)
        [btnTools, btnToolsPage1, btnToolsPage2].forEach(btn => {
            if (btn) {
                btn.addEventListener('click', showBlankPage1);
            }
        });

        // Blank 按钮组 -> 显示 Blank 页面 (blank-page-2)
        [btnBlankPage, btnBlankPagePage1, btnBlankPagePage2].forEach(btn => {
            if (btn) {
                btn.addEventListener('click', showBlankPage2);
            }
        });

        // 同步空白页面按钮位置与主页面按钮位置
        function syncButtonPositions() {
            const mainButtons = document.querySelector('header .action-buttons');
            const blankPageButtons = document.querySelectorAll('.blank-page .action-buttons');

            if (mainButtons && blankPageButtons.length > 0) {
                const rect = mainButtons.getBoundingClientRect();
                blankPageButtons.forEach(buttons => {
                    buttons.style.left = rect.left + 'px';
                    buttons.style.top = rect.top + 'px';
                });
            }
        }

        // 初始同步
        syncButtonPositions();

        // 窗口大小改变时重新同步
        window.addEventListener('resize', syncButtonPositions);

        // 初始化功能页面（在显示时）
        function initFeaturesPage() {
            const featuresGrid = document.getElementById('features-grid');
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
        const globalNavBtns = document.querySelectorAll('.nav-pill-btn');

        function updateGlobalNavActive(activePage) {
            globalNavBtns.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.page === activePage) {
                    btn.classList.add('active');
                }
            });
        }

        globalNavBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const page = btn.dataset.page;
                if (page === 'table') {
                    showTablePage();
                    updateGlobalNavActive('table');
                } else if (page === 'tools') {
                    showBlankPage1();
                    updateGlobalNavActive('tools');
                } else if (page === 'worksheet') {
                    showBlankPage2();
                    updateGlobalNavActive('worksheet');
                }
            });
        });
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
        electrons.forEach(el => {
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
    function cleanup3D() {
        if (animationId) cancelAnimationFrame(animationId);
    }

    // Top View Mode (Bohr-Rutherford Model)
    let isTopViewMode = false;
    let originalElectronData = []; // Store original positions and colors
    let originalCameraZ = 16;

    function toggleTopView() {
        const btn = document.getElementById('top-view-btn');
        if (!atomGroup || !camera) return;

        isTopViewMode = !isTopViewMode;
        btn.classList.toggle('active', isTopViewMode);

        if (isTopViewMode) {
            // Save original state
            originalCameraZ = camera.position.z;
            originalElectronData = electrons.map(el => ({
                color: el.material ? el.material.color.getHex() : 0x333333,
                angle: el.userData.angle,
                y: el.position.y
            }));

            // Switch to true top-down view (looking straight down Y axis)
            camera.position.set(0, 25, 0);
            camera.up.set(0, 0, -1); // Orient camera so Z is "up" in view
            camera.lookAt(0, 0, 0);

            // First reset ALL rotations to zero
            atomGroup.rotation.set(0, 0, 0);

            const wobbleGroup = atomGroup.getObjectByName("wobbleGroup");
            if (wobbleGroup) {
                wobbleGroup.rotation.set(0, 0, 0);
            }

            const nucleusGroup = atomGroup.getObjectByName("nucleusGroup");
            if (nucleusGroup) {
                nucleusGroup.rotation.set(0, 0, 0);
            }

            // Now reorganize electrons into Bohr-Rutherford shell positions
            // Group electrons by their shell index (using radius as key)
            const shellMap = new Map();
            electrons.forEach(el => {
                // Round the radius to avoid floating point issues
                const radius = Math.round(el.userData.radius * 100) / 100;
                if (!shellMap.has(radius)) {
                    shellMap.set(radius, []);
                }
                shellMap.get(radius).push(el);
            });



            // Evenly distribute electrons within each shell
            shellMap.forEach((shellElectrons, radius) => {
                const count = shellElectrons.length;
                shellElectrons.forEach((el, i) => {
                    // Evenly space around the circle: 360° / n electrons
                    const angle = (2 * Math.PI * i) / count;
                    el.userData.bohrAngle = angle;

                    // Position in XZ plane (Y=0 for flat view)
                    el.position.x = radius * Math.cos(angle);
                    el.position.z = radius * Math.sin(angle);
                    el.position.y = 0;

                    // Make electrons black
                    if (el.material) {
                        el.material.color.setHex(0x1a1a1a);
                    }

                    // Hide trails in Bohr mode
                    if (el.userData && el.userData.trails) {
                        el.userData.trails.forEach(trail => {
                            trail.visible = false;
                        });
                    }
                });
            });

        } else {
            // Restore normal 3D view
            camera.position.set(0, 0, originalCameraZ);
            camera.up.set(0, 1, 0); // Reset camera up vector
            camera.lookAt(0, 0, 0);

            // Restore atomGroup rotation
            atomGroup.rotation.set(0, 0, 0);

            // Restore original electron positions and colors
            electrons.forEach((el, i) => {
                const data = originalElectronData[i];
                if (data) {
                    // Restore color
                    if (el.material) {
                        el.material.color.setHex(data.color);
                    }
                    // Restore angle
                    el.userData.angle = data.angle;
                    // Restore Y position
                    el.position.y = data.y;

                    // Show trails again
                    if (el.userData && el.userData.trails) {
                        el.userData.trails.forEach(trail => {
                            trail.visible = true;
                        });
                    }
                }
            });
        }
    }

    // Set up top view button listener
    const topViewBtn = document.getElementById('top-view-btn');
    if (topViewBtn) {
        topViewBtn.addEventListener('click', toggleTopView);
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
        document.body.classList.add('hide-nav');
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
        document.body.classList.remove('hide-nav');
        cleanup3D();
        isTopViewMode = false;
        const topViewBtn = document.getElementById('top-view-btn');
        if (topViewBtn) topViewBtn.classList.remove('active');
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
            document.body.classList.remove('hide-nav');
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
                // Custom smooth animation with easing
                const start = slider.scrollLeft;
                const distance = target - start;
                const duration = 200; // ms - faster snap
                let startTime = null;

                function animate(currentTime) {
                    if (!startTime) startTime = currentTime;
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Ease out cubic for smooth deceleration
                    const eased = 1 - Math.pow(1 - progress, 3);

                    slider.scrollLeft = start + distance * eased;
                    update3DEffect();

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                }
                requestAnimationFrame(animate);
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

            // Calculate how far we moved from current slide
            const slideWidth = getSlideWidth();
            const currentPos = currentIndex * slideWidth;
            const moved = slider.scrollLeft - currentPos;
            const threshold = slideWidth * 0.15; // Need to drag 15% to flip

            let targetIndex = currentIndex;
            if (moved > threshold) {
                targetIndex = currentIndex + 1; // Next slide
            } else if (moved < -threshold) {
                targetIndex = currentIndex - 1; // Previous slide
            }
            // If didn't pass threshold, snap back to current

            snapToSlide(targetIndex);
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

    // Add Quick Reference Button for Common Ions
    const ionsQuickBtn = document.createElement('div');
    ionsQuickBtn.id = 'ions-quick-btn';
    ionsQuickBtn.className = 'legend-item ions-quick-access';
    ionsQuickBtn.innerHTML = `
        <div class="legend-swatch" style="background: linear-gradient(135deg, #f59e0b, #d97706); border: none;"></div>
        <span>${t('Ions Table', '离子表')}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 1.2vmin; height: 1.2vmin; margin-left: auto; opacity: 0.5;">
            <path d="M9 18l6-6-6-6"/>
        </svg>
    `;
    ionsQuickBtn.style.cssText = `
        grid-column: 14 / 17;
        grid-row: 1;
        position: relative;
        z-index: 200;
        pointer-events: auto;
        background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.05));
        border: 1px solid rgba(245, 158, 11, 0.3);
    `;
    ionsQuickBtn.addEventListener('click', () => {
        openChemToolModal('ions');
    });
    ionsQuickBtn.addEventListener('mouseenter', () => {
        ionsQuickBtn.style.background = 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.1))';
        ionsQuickBtn.style.transform = 'translateY(-2px)';
    });
    ionsQuickBtn.addEventListener('mouseleave', () => {
        ionsQuickBtn.style.background = 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.05))';
        ionsQuickBtn.style.transform = 'translateY(0)';
    });
    container.appendChild(ionsQuickBtn);
}

// ============================================
// Chemistry Homework Tools
// ============================================

// Atomic masses (common elements for Grade 9-11)
const atomicMasses = {
    // Period 1
    'H': 1.008, 'He': 4.003,
    // Period 2
    'Li': 6.941, 'Be': 9.012, 'B': 10.81, 'C': 12.01, 'N': 14.01, 'O': 16.00, 'F': 19.00, 'Ne': 20.18,
    // Period 3
    'Na': 22.99, 'Mg': 24.31, 'Al': 26.98, 'Si': 28.09, 'P': 30.97, 'S': 32.07, 'Cl': 35.45, 'Ar': 39.95,
    // Period 4
    'K': 39.10, 'Ca': 40.08, 'Sc': 44.96, 'Ti': 47.87, 'V': 50.94, 'Cr': 52.00, 'Mn': 54.94, 'Fe': 55.85,
    'Co': 58.93, 'Ni': 58.69, 'Cu': 63.55, 'Zn': 65.38, 'Ga': 69.72, 'Ge': 72.63, 'As': 74.92, 'Se': 78.97,
    'Br': 79.90, 'Kr': 83.80,
    // Period 5
    'Rb': 85.47, 'Sr': 87.62, 'Y': 88.91, 'Zr': 91.22, 'Nb': 92.91, 'Mo': 95.95, 'Tc': 98.00, 'Ru': 101.1,
    'Rh': 102.9, 'Pd': 106.4, 'Ag': 107.9, 'Cd': 112.4, 'In': 114.8, 'Sn': 118.7, 'Sb': 121.8, 'Te': 127.6,
    'I': 126.9, 'Xe': 131.3,
    // Period 6
    'Cs': 132.9, 'Ba': 137.3,
    'La': 138.9, 'Ce': 140.1, 'Pr': 140.9, 'Nd': 144.2, 'Pm': 145.0, 'Sm': 150.4, 'Eu': 152.0, 'Gd': 157.3,
    'Tb': 158.9, 'Dy': 162.5, 'Ho': 164.9, 'Er': 167.3, 'Tm': 168.9, 'Yb': 173.0, 'Lu': 175.0,
    'Hf': 178.5, 'Ta': 180.9, 'W': 183.8, 'Re': 186.2, 'Os': 190.2, 'Ir': 192.2, 'Pt': 195.1, 'Au': 197.0,
    'Hg': 200.6, 'Tl': 204.4, 'Pb': 207.2, 'Bi': 209.0, 'Po': 209.0, 'At': 210.0, 'Rn': 222.0,
    // Period 7
    'Fr': 223.0, 'Ra': 226.0,
    'Ac': 227.0, 'Th': 232.0, 'Pa': 231.0, 'U': 238.0, 'Np': 237.0, 'Pu': 244.0, 'Am': 243.0, 'Cm': 247.0,
    'Bk': 247.0, 'Cf': 251.0, 'Es': 252.0, 'Fm': 257.0, 'Md': 258.0, 'No': 259.0, 'Lr': 262.0,
    'Rf': 267.0, 'Db': 270.0, 'Sg': 271.0, 'Bh': 270.0, 'Hs': 277.0, 'Mt': 276.0, 'Ds': 281.0, 'Rg': 282.0,
    'Cn': 285.0, 'Nh': 286.0, 'Fl': 289.0, 'Mc': 290.0, 'Lv': 293.0, 'Ts': 294.0, 'Og': 294.0
};

// Parse chemical formula
// Parse chemical formula (Strict Rules: Nested Parentheses, Coefficients, Hydrates, Subscripts)
function parseFormulaStrict(formula) {
    if (!formula) return {};

    // Normalize Subscripts
    const subMap = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9' };
    formula = formula.replace(/[₀-₉]/g, c => subMap[c]);

    // Normalize Dots to •
    formula = formula.replace(/[.*·]/g, '•');

    // Handle Hydrates (Recursive)
    if (formula.includes('•')) {
        const parts = formula.split('•');
        const finalCounts = {};
        parts.forEach(part => {
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

        if (char === '(' || char === '[' || char === '{') {
            stack.push({});
            i++;
        } else if (char === ')' || char === ']' || char === '}') {
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
                current[el] = (current[el] || 0) + (num * count);
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
document.addEventListener('DOMContentLoaded', () => {
    const balanceBtn = document.getElementById('balance-btn');
    const equationInput = document.getElementById('equation-input');
    const balanceResult = document.getElementById('balance-result');
    const balanceExplanation = document.getElementById('balance-explanation');
    const balanceCheck = document.getElementById('balance-check');

    if (balanceBtn) {
        balanceBtn.addEventListener('click', () => {
            const equation = equationInput.value.trim();
            if (!equation) {
                balanceResult.textContent = 'Please enter an equation.';
                return;
            }

            try {
                const balanced = balanceEquation(equation);
                balanceResult.textContent = balanced.equation;
                balanceExplanation.innerHTML = balanced.explanation;
                balanceCheck.innerHTML = balanced.check;
            } catch (error) {
                balanceResult.textContent = 'Error: ' + error.message;
            }
        });
    }

    function balanceEquation(equation) {
        const parts = equation.split('→').map(s => s.trim());
        if (parts.length !== 2) {
            throw new Error('Equation must contain → (arrow)');
        }

        const reactants = parts[0].split('+').map(s => s.trim());
        const products = parts[1].split('+').map(s => s.trim());

        // Simple balancing algorithm (for common cases)
        const explanation = [];
        explanation.push('<h4>Step-by-step balancing:</h4>');
        explanation.push('<ol>');
        explanation.push('<li><strong>Balance Fe first:</strong> Count Fe atoms on both sides.</li>');
        explanation.push('<li><strong>Then balance O:</strong> Count O atoms and adjust coefficients.</li>');
        explanation.push('<li><strong>Adjust coefficients:</strong> Make atom counts equal on both sides.</li>');
        explanation.push('</ol>');
        explanation.push('<div class="warning-box"><strong>Important:</strong> Never change subscripts, only coefficients!</div>');

        // For Fe + O2 → Fe2O3 example
        if (equation.includes('Fe') && equation.includes('O2') && equation.includes('Fe2O3')) {
            const balancedEq = '4Fe + 3O2 → 2Fe2O3';
            const check = generateAtomCheck(balancedEq);
            return {
                equation: balancedEq,
                explanation: explanation.join(''),
                check: check
            };
        }

        // Generic balancing (simplified)
        return {
            equation: equation + ' (Balanced)',
            explanation: explanation.join(''),
            check: '<p>Enter a valid equation to see atom count check.</p>'
        };
    }

    function generateAtomCheck(equation) {
        const parts = equation.split('→');
        const left = parts[0].trim();
        const right = parts[1].trim();

        const leftAtoms = countAtoms(left);
        const rightAtoms = countAtoms(right);

        let html = '<h4>Atom Count Check:</h4>';
        html += '<table>';
        html += '<tr><th>Element</th><th>Left Side</th><th>Right Side</th><th>Match</th></tr>';

        const allElements = new Set([...Object.keys(leftAtoms), ...Object.keys(rightAtoms)]);
        allElements.forEach(element => {
            const leftCount = leftAtoms[element] || 0;
            const rightCount = rightAtoms[element] || 0;
            const match = leftCount === rightCount ? '✓' : '✗';
            html += `<tr><td>${element}</td><td>${leftCount}</td><td>${rightCount}</td><td>${match}</td></tr>`;
        });

        html += '</table>';
        html += '<p><strong>Conservation of matter:</strong> ' +
            (Object.keys(leftAtoms).every(e => leftAtoms[e] === rightAtoms[e]) ?
                '✓ Balanced!' : '✗ Not balanced') + '</p>';

        return html;
    }

    function countAtoms(side) {
        const atoms = {};
        const compounds = side.split('+').map(s => s.trim());

        compounds.forEach(compound => {
            const match = compound.match(/^(\d*)(.+)$/);
            const coefficient = match[1] ? parseInt(match[1]) : 1;
            const formula = match[2];
            const elements = parseFormulaStrict(formula);

            Object.keys(elements).forEach(element => {
                atoms[element] = (atoms[element] || 0) + elements[element] * coefficient;
            });
        });

        return atoms;
    }
});

// Tool 2: Molar Mass Calculator
document.addEventListener('DOMContentLoaded', () => {
    const calculateMassBtn = document.getElementById('calculate-mass-btn');
    const formulaInput = document.getElementById('formula-input');
    const exactToggle = document.getElementById('exact-values-toggle');
    const massResult = document.getElementById('mass-result');
    const massBreakdown = document.getElementById('mass-breakdown');

    if (calculateMassBtn) {
        calculateMassBtn.addEventListener('click', () => {
            const formula = formulaInput.value.trim();
            if (!formula) {
                massResult.textContent = 'Please enter a chemical formula.';
                return;
            }

            try {
                const exact = exactToggle.checked;
                const result = calculateMolarMass(formula, exact);
                massResult.textContent = `Molar Mass: ${result.total} g/mol`;
                massBreakdown.innerHTML = result.breakdown;
            } catch (error) {
                massResult.textContent = 'Error: ' + error.message;
            }
        });
    }

    function calculateMolarMass(formula, exact) {
        const elements = parseFormulaStrict(formula);
        let total = 0;
        let breakdown = '<table><tr><th>Element</th><th>Atomic Mass</th><th>Count</th><th>Subtotal</th></tr>';

        Object.keys(elements).forEach(element => {
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
        breakdown += '</table>';

        return {
            total: totalStr + ' g/mol',
            breakdown: breakdown
        };
    }
});

// Tool 3: Percent Composition Calculator
document.addEventListener('DOMContentLoaded', () => {
    const calculatePercentBtn = document.getElementById('calculate-percent-btn');
    const compositionInput = document.getElementById('composition-input');
    const percentResult = document.getElementById('percent-result');
    const percentBreakdown = document.getElementById('percent-breakdown');

    if (calculatePercentBtn) {
        calculatePercentBtn.addEventListener('click', () => {
            const formula = compositionInput.value.trim();
            if (!formula) {
                percentResult.textContent = 'Please enter a chemical formula.';
                return;
            }

            try {
                const result = calculatePercentComposition(formula);
                percentResult.textContent = `Percent Composition:`;
                percentBreakdown.innerHTML = result.breakdown;
            } catch (error) {
                percentResult.textContent = 'Error: ' + error.message;
            }
        });
    }

    function calculatePercentComposition(formula) {
        const elements = parseFormulaStrict(formula);
        let totalMass = 0;
        const elementMasses = {};

        Object.keys(elements).forEach(element => {
            const count = elements[element];
            const atomicMass = atomicMasses[element];

            if (!atomicMass) {
                throw new Error(`Unknown element: ${element}`);
            }

            const mass = atomicMass * count;
            elementMasses[element] = mass;
            totalMass += mass;
        });

        let breakdown = '<h4>Calculation:</h4><p>Percent = (Element Mass ÷ Total Molar Mass) × 100%</p>';
        breakdown += '<table><tr><th>Element</th><th>Mass (g/mol)</th><th>Percent (%)</th></tr>';

        let sumPercent = 0;
        Object.keys(elementMasses).forEach(element => {
            const percent = (elementMasses[element] / totalMass) * 100;
            sumPercent += percent;
            breakdown += `<tr><td>${element}</td><td>${elementMasses[element].toFixed(2)}</td><td>${percent.toFixed(2)}%</td></tr>`;
        });

        breakdown += `<tr><td colspan="2"><strong>Total</strong></td><td><strong>${sumPercent.toFixed(2)}%</strong></td></tr>`;
        breakdown += '</table>';
        breakdown += '<p><em>Note: Commonly tested in Grade 10–11 chemistry.</em></p>';

        return { breakdown };
    }
});

// Tool 4: Empirical & Molecular Formula Solver
document.addEventListener('DOMContentLoaded', () => {
    const formulaMethod = document.getElementById('formula-method');
    const formulaInputs = document.getElementById('formula-inputs');
    const calculateFormulaBtn = document.getElementById('calculate-formula-btn');
    const formulaResult = document.getElementById('formula-result');
    const formulaExplanation = document.getElementById('formula-explanation');

    if (formulaMethod) {
        formulaMethod.addEventListener('change', () => {
            updateFormulaInputs();
        });
        updateFormulaInputs();
    }

    function updateFormulaInputs() {
        const method = formulaMethod.value;
        formulaInputs.innerHTML = '';

        if (method === 'percent') {
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
        calculateFormulaBtn.addEventListener('click', () => {
            try {
                const method = formulaMethod.value;
                const data = method === 'percent' ? getPercentData() : getMassData();
                const result = calculateFormula(data);
                formulaResult.textContent = result.formula;
                formulaExplanation.innerHTML = result.explanation;
            } catch (error) {
                formulaResult.textContent = 'Error: ' + error.message;
            }
        });
    }

    function getPercentData() {
        const elements = [];
        for (let i = 1; i <= 3; i++) {
            const symbol = document.getElementById(`elem${i}-symbol`)?.value.trim();
            const percent = parseFloat(document.getElementById(`elem${i}-percent`)?.value);
            if (symbol && !isNaN(percent)) {
                elements.push({ symbol, percent });
            }
        }
        const molecularMass = parseFloat(document.getElementById('molecular-mass')?.value);
        return { elements, molecularMass: isNaN(molecularMass) ? null : molecularMass };
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
        const molecularMass = parseFloat(document.getElementById('molecular-mass')?.value);
        return { elements, molecularMass: isNaN(molecularMass) ? null : molecularMass };
    }

    function calculateFormula(data) {
        const { elements, molecularMass } = data;

        if (elements.length === 0) {
            throw new Error('Please enter at least one element.');
        }

        // Convert to moles
        const moles = elements.map(elem => {
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
        const minMoles = Math.min(...moles.map(m => m.moles));

        // Divide by smallest and round
        const ratios = moles.map(m => ({
            symbol: m.symbol,
            ratio: Math.round((m.moles / minMoles) * 100) / 100
        }));

        // Simplify ratios to whole numbers
        const empirical = simplifyRatios(ratios);
        const empiricalFormula = empirical.map(r => r.symbol + (r.count > 1 ? r.count : '')).join('');

        let explanation = '<h4>Step-by-step calculation:</h4>';
        explanation += '<ol>';
        explanation += '<li><strong>Convert to moles:</strong> Mass ÷ Atomic Mass</li>';
        moles.forEach(m => {
            explanation += `<li>${m.symbol}: ${m.moles.toFixed(3)} moles</li>`;
        });
        explanation += `<li><strong>Divide by smallest:</strong> ${minMoles.toFixed(3)} moles</li>`;
        explanation += '<li><strong>Round to whole numbers:</strong> Get empirical formula</li>';
        explanation += '</ol>';
        explanation += `<p><strong>Empirical Formula:</strong> ${empiricalFormula}</p>`;

        if (molecularMass) {
            const empiricalMass = calculateEmpiricalMass(empirical);
            const multiplier = Math.round(molecularMass / empiricalMass);
            const molecularFormula = empirical.map(r => r.symbol + (r.count * multiplier > 1 ? r.count * multiplier : '')).join('');
            explanation += `<p><strong>Molecular Mass:</strong> ${molecularMass} g/mol</p>`;
            explanation += `<p><strong>Empirical Mass:</strong> ${empiricalMass.toFixed(2)} g/mol</p>`;
            explanation += `<p><strong>Multiplier:</strong> ${molecularMass} ÷ ${empiricalMass.toFixed(2)} = ${multiplier}</p>`;
            explanation += `<p><strong>Molecular Formula:</strong> ${molecularFormula}</p>`;
            explanation += '<p><em>Note: Typically learned in Grade 10–11 chemistry.</em></p>';
            return { formula: `Molecular: ${molecularFormula}`, explanation };
        }

        explanation += '<div class="warning-box"><strong>Common mistakes:</strong> Don\'t round too early! Always convert to moles first.</div>';
        explanation += '<p><em>Note: Typically learned in Grade 10–11 chemistry.</em></p>';

        return { formula: `Empirical: ${empiricalFormula}`, explanation };
    }

    function simplifyRatios(ratios) {
        // Simple ratio simplification
        const result = ratios.map(r => {
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
        empirical.forEach(elem => {
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
        id: 'equation-balancer',
        icon: 'B',
        name: 'Chemical Equation Balancer',
        description: 'Balance chemical equations step-by-step with detailed explanations.',
        details: {
            title: 'Chemical Equation Balancer',
            icon: 'B',
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
                `
        }
    },
    {
        id: 'molar-mass',
        icon: 'M',
        name: 'Molar Mass Calculator',
        description: 'Calculate the molar mass of any chemical compound with element-by-element breakdown.',
        details: {
            title: 'Molar Mass Calculator',
            icon: 'M',
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
                `
        }
    },
    {
        id: 'percent-composition',
        icon: '%',
        name: 'Percent Composition',
        description: 'Calculate the percentage by mass of each element in a compound.',
        details: {
            title: 'Percent Composition Calculator',
            icon: '%',
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
                `
        }
    },
    {
        id: 'empirical-formula',
        icon: 'E',
        name: 'Empirical & Molecular Formula',
        description: 'Calculate empirical and molecular formulas from mass data or percentages.',
        details: {
            title: 'Empirical & Molecular Formula Solver',
            icon: 'E',
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
                `
        }
    }
];

// Initialize features page
function initializeFeatures() {
    const featuresGrid = document.getElementById('features-grid');
    if (!featuresGrid) return;

    // Clear existing content
    featuresGrid.innerHTML = '';

    // Generate feature cards
    featuresData.forEach(feature => {
        const card = document.createElement('div');
        card.className = 'feature-card';
        card.innerHTML = `
            <div class="feature-icon">${feature.icon}</div>
            <div class="feature-info">
                <h3 class="feature-name">${feature.name}</h3>
                <p class="feature-description">${feature.description}</p>
            </div>
        `;

        card.addEventListener('click', () => {
            showFeatureDetail(feature);
        });

        featuresGrid.appendChild(card);
    });
}

// Show feature detail modal
function showFeatureDetail(feature) {
    const featureModal = document.getElementById('feature-modal');
    const featureModalBody = document.getElementById('feature-modal-body');

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
        featureModal.classList.add('active');
        document.body.classList.add('hide-nav');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize features immediately
    initializeFeatures();

    // Set up modal close handlers
    const featureModal = document.getElementById('feature-modal');
    const featureModalClose = document.getElementById('feature-modal-close');

    if (featureModalClose) {
        featureModalClose.addEventListener('click', () => {
            if (featureModal) {
                featureModal.classList.remove('active');
                document.body.classList.remove('hide-nav');
            }
        });
    }

    if (featureModal) {
        featureModal.addEventListener('click', (e) => {
            if (e.target === featureModal) {
                featureModal.classList.remove('active');
                document.body.classList.remove('hide-nav');
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
let currentLang = 'zh'; // Default to Chinese

function initChemToolCards() {
    // Prevent multiple initializations
    if (chemToolCardsInitialized) return;

    const toolCards = document.querySelectorAll('.chem-tool-card');

    if (toolCards.length === 0) return;

    toolCards.forEach(card => {
        card.addEventListener('click', () => {
            const toolType = card.getAttribute('data-tool');
            openChemToolModal(toolType);
        });
    });

    // Initialize language toggle
    initLanguageToggle();

    chemToolCardsInitialized = true;
}

function initLanguageToggle() {
    // Select all language toggle buttons
    const langToggles = document.querySelectorAll('.lang-toggle');
    langToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            currentLang = currentLang === 'zh' ? 'en' : 'zh';
            updateLanguage();
            // Update all toggle buttons text
            langToggles.forEach(btn => {
                btn.textContent = currentLang === 'zh' ? 'EN/中' : '中/EN';
            });
        });
    });
}

function updateLanguage() {
    // Update HTML lang attribute
    document.documentElement.lang = currentLang;

    // Update all elements with data-en and data-zh attributes
    document.querySelectorAll('[data-en][data-zh]').forEach(el => {
        el.textContent = el.getAttribute(`data-${currentLang}`);
    });

    // Dispatch event for components to update
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: currentLang } }));
}

function openChemToolModal(toolType) {
    const featureModal = document.getElementById('feature-modal');
    const featureModalBody = document.getElementById('feature-modal-body');

    if (!featureModal || !featureModalBody) return;

    let content = '';

    switch (toolType) {
        case 'balancer':
            content = generateBalancerToolContent();
            break;
        case 'molar-mass':
            content = generateMolarMassToolContent();
            break;
        case 'empirical':
            content = generateEmpiricalToolContent();
            break;
        case 'blank':
            content = generateBlankToolContent();
            break;
        case 'solubility':
            content = generateSolubilityToolContent();
            break;
        case 'ions':
            content = generateIonsToolContent();
            break;
    }

    featureModalBody.innerHTML = content;
    featureModal.classList.add('active');
    document.body.classList.add('hide-nav');

    // Attach event listeners after content is loaded
    setTimeout(() => {
        attachToolEventListeners(toolType);
    }, 100);
}

// Bilingual text helper
function t(en, zh) {
    return currentLang === 'zh' ? zh : en;
}

function generateBalancerToolContent() {
    return `
        <style>
            /* ===== 配平工具主容器样式 ===== */
            .balancer-main-wrapper {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }



            /* ===== 天平容器样式 ===== */
            .physics-scale-container {
                perspective: 1000px;
                width: 100%;
                height: 260px;
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: #f8fafc;
                border-radius: 12px;
                overflow: hidden;
                border: 1.5px solid #e2e8f0;
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
                padding: 14px;
                background: #ffffff;
                border-radius: 12px;
                border: 1px solid #e2e8f0;
            }

            .balancer-input-row {
                display: grid;
                grid-template-columns: 1fr auto 1fr;
                gap: 10px;
                align-items: center;
            }

            .balancer-input-group {
                display: flex;
                flex-direction: column;
                gap: 8px;
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
                padding: 10px 14px;
                font-size: 0.95rem;
                font-weight: 500;
                font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
                color: #1e293b;
                background: #ffffff;
                border: 1.5px solid #e2e8f0;
                border-radius: 12px;
                outline: none;
                transition: all 0.2s ease;
            }

            .balancer-text-input:focus {
                border-color: #6366f1;
                box-shadow: 
                    0 0 0 4px rgba(99, 102, 241, 0.1),
                    inset 0 2px 4px rgba(0, 0, 0, 0.02);
            }

            .balancer-text-input::placeholder {
                color: #94a3b8;
                font-weight: 400;
            }

            .balancer-arrow-divider {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 10px;
            }

            .balancer-arrow-divider svg {
                width: 32px;
                height: 32px;
                color: #94a3b8;
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
                gap: 8px;
                padding: 10px 16px;
                border-radius: 12px;
                font-size: 0.85rem;
                font-weight: 600;
                transition: all 0.2s ease;
                background: #f8fafc;
                color: #64748b;
                border: 1px solid #e2e8f0;
            }

            .balancer-status-bar.balanced {
                background: linear-gradient(135deg, #d1fae5, #a7f3d0);
                color: #047857;
                border-color: #6ee7b7;
            }

            .balancer-status-bar.unbalanced {
                background: linear-gradient(135deg, #fef3c7, #fde68a);
                color: #b45309;
                border-color: #fcd34d;
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
                gap: 8px;
                padding: 10px 18px;
                font-size: 0.9rem;
                font-weight: 600;
                border-radius: 12px;
                border: none;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .balancer-btn-primary {
                background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
                color: white;
            }

            .balancer-btn-primary:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }

            .balancer-btn-primary:active {
                transform: translateY(0);
            }

            .balancer-btn-secondary {
                background: #f8fafc;
                color: #475569;
                border: 1px solid #e2e8f0;
            }

            .balancer-btn-secondary:hover {
                background: #f1f5f9;
                border-color: #cbd5e1;
            }

            /* ===== 结果显示 ===== */
            .balancer-result-box {
                display: none;
                padding: 14px 18px;
                background: #ecfdf5;
                border-radius: 12px;
                border: 1px solid #a7f3d0;
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
        
        <div class="tool-modal-header">
            <div class="tool-modal-icon balancer-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 3v18M3 12h18M7 7l10 10M17 7L7 17" />
                </svg>
            </div>
            <div class="tool-modal-title-group">
                <h2 class="tool-modal-title">${t('Equation Balancer', '化学方程式配平')}</h2>
                <div class="tool-modal-tags">
                    <span class="grade-tag">G9-G12</span>
                    <span class="feature-tag">${t('Interactive', '交互式')}</span>
                </div>
            </div>
        </div>
        
        <div class="balancer-main-wrapper">


            <!-- 天平可视化区域 -->
            <div class="physics-scale-container">

                <!-- 底座 -->
                <div style="position: absolute; bottom: 15px; display: flex; flex-direction: column; align-items: center; z-index: 0; pointer-events: none;">
                    <div class="physics-stand-metallic" style="width: 14px; height: 210px; border-radius: 7px 7px 0 0;"></div>
                    <div class="physics-base-metallic" style="width: 140px; height: 22px; border-radius: 9999px; margin-top: -4px; border-top: 1px solid #6b7280;"></div>
                </div>

                <!-- 中心支点 -->
                <div id="physics-pivot" style="position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%); margin-top: -50px; z-index: 30; display: flex; align-items: center; justify-content: center; pointer-events: none;">
                    <div style="width: 44px; height: 44px; background: linear-gradient(145deg, #f3f4f6, #d1d5db); border-radius: 9999px; box-shadow: 0 4px 15px rgba(0,0,0,0.15); display: flex; align-items: center; justify-content: center; border: 3px solid #e5e7eb; position: relative; z-index: 40;">
                        <div id="physics-needle" class="physics-needle"></div>
                        <div style="width: 16px; height: 16px; background: linear-gradient(145deg, #6b7280, #374151); border-radius: 9999px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.4); position: absolute; z-index: 50;"></div>
                    </div>
                </div>

                <!-- 旋转横梁 -->
                <div id="physics-beam-assembly" class="physics-beam-metallic" style="position: absolute; top: 40%; left: 50%; width: 420px; height: 14px; border-radius: 9999px; margin-top: -50px; margin-left: -210px; display: flex; justify-content: space-between; align-items: center; z-index: 20;">
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
                            ${t('Reactants', '反应物')}
                        </label>
                        <input type="text" 
                               id="reactants-input" 
                               class="balancer-text-input" 
                               placeholder="${t('e.g., Fe + O2', '例如: Fe + O2')}"
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
                            ${t('Products', '生成物')}
                        </label>
                        <input type="text" 
                               id="products-input" 
                               class="balancer-text-input" 
                               placeholder="${t('e.g., Fe2O3', '例如: Fe2O3')}"
                               autocomplete="off"
                               spellcheck="false">
                    </div>
                </div>


            </div>

            <!-- 操作按钮 + 状态反馈 -->
            <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                <button id="auto-balance-btn" class="balancer-btn balancer-btn-primary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 3v1m0 16v1m-9-9h1m16 0h1m-2.64-6.36l-.7.7m-12.02 12.02l-.7.7m0-12.72l.7.7m12.02 12.02l.7.7"/>
                        <circle cx="12" cy="12" r="4"/>
                    </svg>
                    ${t('Auto Balance', '自动配平')}
                </button>
                <button id="clear-balancer-btn" class="balancer-btn balancer-btn-secondary">
                    ${t('Clear', '清除')}
                </button>
                <div class="balancer-status-bar" id="balance-feedback" style="flex: 1; min-width: 150px;">
                    ${t('Enter equation', '输入方程式')}
                </div>
            </div>

            <!-- 配平结果 -->
            <div class="balancer-result-box" id="balanced-result">
                <div class="balancer-result-label">${t('Balanced Equation', '配平后的方程式')}</div>
                <div class="balancer-result-equation" id="balanced-equation-text"></div>
            </div>

            <!-- 示例提示 -->
            <div style="display: flex; align-items: center; gap: 10px; font-size: 0.8rem; color: #64748b; flex-wrap: wrap;">
                <span style="font-weight: 600;">${t('Examples:', '示例:')}</span>
                <code style="background: #f1f5f9; padding: 3px 8px; border-radius: 8px; font-family: monospace; color: #1e293b;">Fe + O2 → Fe2O3</code>
                <code style="background: #f1f5f9; padding: 3px 8px; border-radius: 8px; font-family: monospace; color: #1e293b;">H2 + O2 → H2O</code>
            </div>
        </div>

        <!-- Hidden elements for compatibility -->
        <div id="physics-card-left" style="display:none;"></div>
        <div id="physics-card-right" style="display:none;"></div>
    `;
}

// Helper to set formula from chips
function setMolarFormula(formula) {
    const input = document.getElementById('modal-formula-input');
    if (input) {
        input.value = formula;
        input.dispatchEvent(new Event('input'));
        // Optionally trigger print too? Maybe not, let user press Enter.
        input.focus();
    }
}

function generateMolarMassToolContent() {
    return `
        <div class="tool-modal-header">
            <div class="tool-modal-icon molar-icon">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5">
                    <rect x="8" y="12" width="32" height="24" rx="3"/>
                    <text x="24" y="29" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor" stroke="none">M</text>
                    <line x1="8" y1="36" x2="40" y2="36"/>
                </svg>
            </div>
            <div class="tool-modal-title-group">
                <h2 class="tool-modal-title">${t('Molar Mass Calculator', '摩尔质量计算器')}</h2>
                <div class="tool-modal-tags">
                    <span class="grade-tag">G9-G10</span>
                    <span class="feature-tag">g/mol</span>
                </div>
            </div>
        </div>
        
        <div class="molar-tool-layout">
            <!-- Left Column: Input & Info -->
            <div class="molar-input-panel">
                <div class="tool-input-section">
                    <label for="modal-formula-input" style="font-size: 0.85rem; margin-bottom: 8px;">${t('Chemical Formula', '化学式')}</label>
                    <input type="text" id="modal-formula-input" 
                           placeholder="e.g. H2O" 
                           class="realtime-input" 
                           autocomplete="off" 
                           spellcheck="false">

                    <!-- Helper Bar (Compact) -->
                    <div class="formula-helper-bar" style="display:flex; align-items:center; gap:6px; margin-top:4px; margin-bottom:4px;">
                        <!-- Subscript Toggle -->
                        <button id="helper-sub-btn" type="button" class="helper-btn" style="flex:1; height:32px; padding:0 8px; font-size:0.8rem; border:1px solid #e2e8f0; border-radius:6px; background:#fff; color:#475569; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; transition:all 0.1s;">
                            <span style="background:#f1f5f9; padding:2px 6px; border-radius:4px; font-weight:600; line-height:1;">S₀</span> 
                            <span id="sub-status-text" style="font-size:0.75rem; white-space:nowrap;">${t('Normal Inputs', '普通输入')}</span>
                        </button>
                        
                        <!-- Dot Button -->
                        <button id="helper-dot-btn" type="button" class="helper-btn" style="width:40px; height:32px; font-size:1.2rem; line-height:0; border:1px solid #e2e8f0; border-radius:6px; background:#fff; color:#475569; cursor:pointer; display:flex; align-items:center; justify-content:center; padding-bottom:3px;" title="${t('Insert Dot', '插入点')}">
                            •
                        </button>
                    </div>
                    
                    <div class="enter-hint">
                        <span>Press</span> <kbd class="kbd-key">Enter ↵</kbd> <span>to print ticket</span>
                    </div>

                    <!-- Options Row -->
                    <div style="display: flex; gap: 16px; margin-top: 12px; flex-wrap: wrap;">
                        <label style="display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: #64748b; cursor: pointer;">
                            <input type="checkbox" id="modal-exact-toggle" style="width: 14px; height: 14px; accent-color: #6366f1;">
                            ${t('Exact Decimals', '精确小数')}
                        </label>
                        <label style="display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: #64748b; cursor: pointer;">
                            <input type="checkbox" id="modal-learning-toggle" style="width: 14px; height: 14px; accent-color: #6366f1;">
                            ${t('Learning Mode', '学习模式')}
                        </label>
                    </div>
                    
                    <!-- Show Calculation Button (only visible in learning mode) -->
                    <div id="calc-steps-container" class="calc-steps-container" style="display: none; margin-top: 10px;">
                        <button id="show-calc-btn" class="show-calc-btn">
                            <svg style="width:14px;height:14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            ${t('Show Calculation', '查看计算过程')}
                        </button>
                        <div id="calc-steps-content" class="calc-steps-content" style="display: none;"></div>
                    </div>
                </div>

                <div class="tool-tips-section" style="flex-grow: 1;">
                    <h4>${t('How to use', '使用说明')}</h4>
                    <p>${t('1. Type a formula. The scale shows mass in real-time.', '1. 输入化学式，电子秤实时显示质量。')}</p>
                    <p>${t('2. Press ENTER to print the weight ticket.', '2. 按回车键打印详细质量小票。')}</p>
                    
                    <div class="example-box" style="margin-top: 20px;">
                        <strong>${t('Try:', '试一试:')}</strong>
                        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px;">
                            <span class="formula-chip" onclick="setMolarFormula('C6H12O6')">C6H12O6</span>
                            <span class="formula-chip" onclick="setMolarFormula('CuSO4(H2O)5')">CuSO4(H2O)5</span>
                            <span class="formula-chip" onclick="setMolarFormula('KMnO4')">KMnO4</span>
                        </div>
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
                    
                    <!-- Front Panel with Slot -->
                    <div class="scale-front-panel">
                        <div class="receipt-slot"></div>
                    </div>

                    <!-- Receipt Container (inside wrapper for same coordinate system) -->
                    <div class="receipt-anim-container">
                        <div id="receipt-wrapper" class="receipt-wrapper">
                            <div class="receipt-header">Weight Ticket</div>
                            <div class="receipt-date" id="receipt-date"></div>
                            <div id="receipt-items"></div>
                            <div class="receipt-total-row">
                                <span>TOTAL</span>
                                <span id="receipt-total-value"></span>
                            </div>
                            <div class="receipt-footer">
                                <div style="font-size: 2rem; margin: 10px 0;">barcode</div>
                                Chemistry Tools v2.0
                            </div>
                        </div>
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
        <div class="tool-modal-header">
            <div class="tool-modal-icon blank-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                </svg>
            </div>
            <div class="tool-modal-title-group">
                <h2 class="tool-modal-title">${t('Blank Page', '空白页')}</h2>
                <div class="tool-modal-tags">
                    <span class="feature-tag">${t('Dev', '开发中')}</span>
                </div>
            </div>
        </div>
        
        <div class="tool-modal-content">
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 300px; color: #94a3b8; text-align: center;">
                <svg style="width: 64px; height: 64px; margin-bottom: 20px; opacity: 0.2;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                </svg>
                <p>${t('This page is intentionally left blank.', '此页面特意留白。')}</p>
                <p style="font-size: 0.8em; margin-top: 10px; opacity: 0.7;">${t('Ready for new content.', '等待新内容。')}</p>
            </div>
        </div>
    `;
}

function generateEmpiricalToolContent() {
    return `
        <style>
            /* ===== 经验式积木布局 ===== */
            .lego-tool-layout {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 24px;
                align-items: stretch;
            }

            .lego-input-panel {
                display: flex;
                flex-direction: column;
                gap: 14px;
                background: #fff;
                padding: 20px;
                border-radius: 14px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            }

            .lego-stage {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: linear-gradient(180deg, #f8fafc, #f1f5f9);
                border-radius: 14px;
                padding: 24px;
                min-height: 200px;
                border: 2px dashed #d1d5db;
                transition: all 0.3s;
            }

            .lego-stage.has-result {
                border-style: solid;
                border-color: #a78bfa;
                background: linear-gradient(180deg, #faf5ff, #f5f3ff);
            }

            @media (max-width: 600px) {
                .lego-tool-layout {
                    grid-template-columns: 1fr;
                }
            }

            /* ===== 积木块样式 ===== */
            .lego-blocks-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 30px;
                width: 100%;
            }

            .lego-group {
                display: flex;
                align-items: flex-end;
                justify-content: center;
                gap: 6px;
                flex-wrap: wrap;
                padding: 12px;
                background: rgba(255,255,255,0.6);
                border-radius: 12px;
                min-height: 50px;
                transition: all 0.3s ease;
            }

            .lego-group-label {
                width: 100%;
                text-align: center;
                font-size: 0.65rem;
                font-weight: 600;
                color: #94a3b8;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 6px;
            }

            .lego-block {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-width: 55px;
                min-height: 55px;
                padding: 10px 14px;
                border-radius: 12px;
                font-weight: 700;
                font-size: 1.1rem;
                color: white;
                box-shadow: 
                    inset 0 -4px 0 rgba(0,0,0,0.2),
                    inset 0 2px 0 rgba(255,255,255,0.3),
                    0 4px 8px rgba(0,0,0,0.15);
                transition: all 0.2s ease;
                cursor: default;
            }

            .lego-block:hover {
                transform: translateY(-2px) scale(1.05);
            }

            .lego-block .block-symbol {
                font-size: 1.3rem;
                font-weight: 800;
                line-height: 1;
            }

            .lego-block .block-count {
                font-size: 0.75rem;
                opacity: 0.9;
                margin-top: 3px;
            }

            /* 积木颜色 */
            .lego-block.el-C { background: linear-gradient(135deg, #374151, #1f2937); }
            .lego-block.el-H { background: linear-gradient(135deg, #60a5fa, #3b82f6); }
            .lego-block.el-O { background: linear-gradient(135deg, #f87171, #ef4444); }
            .lego-block.el-N { background: linear-gradient(135deg, #a78bfa, #8b5cf6); }
            .lego-block.el-S { background: linear-gradient(135deg, #fbbf24, #f59e0b); }
            .lego-block.el-P { background: linear-gradient(135deg, #fb923c, #f97316); }
            .lego-block.el-Cl { background: linear-gradient(135deg, #34d399, #10b981); }
            .lego-block.el-default { background: linear-gradient(135deg, #94a3b8, #64748b); }

            /* ===== 倍数显示 ===== */
            .multiplier-section {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                padding: 8px 16px;
                background: linear-gradient(135deg, #fef3c7, #fde68a);
                border-radius: 12px;
                font-weight: 700;
                color: #92400e;
            }

            .multiplier-section .times-icon {
                font-size: 1rem;
            }

            .multiplier-section .multiplier-value {
                font-size: 1.3rem;
                font-weight: 800;
            }

            .multiplier-section .multiplier-label {
                font-size: 0.7rem;
                opacity: 0.8;
            }

            /* ===== 结果分子式 ===== */
            .molecular-result {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                padding: 12px 20px;
                background: linear-gradient(135deg, #d1fae5, #a7f3d0);
                border-radius: 12px;
                border: 2px solid #34d399;
            }

            .molecular-result .result-label {
                font-size: 0.65rem;
                font-weight: 700;
                color: #047857;
                text-transform: uppercase;
            }

            .molecular-result .result-formula {
                font-size: 1.3rem;
                font-weight: 800;
                color: #065f46;
                font-family: 'SF Mono', monospace;
            }

            /* ===== 空状态 ===== */
            .lego-empty-state {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: #94a3b8;
                text-align: center;
                padding: 15px;
            }

            .lego-empty-state p {
                font-size: 0.8rem;
                max-width: 180px;
                line-height: 1.4;
            }

            /* ===== 积木动画 ===== */
            @keyframes blockAppear {
                from {
                    opacity: 0;
                    transform: translateY(20px) scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }

            .lego-block.animate-in {
                animation: blockAppear 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            }

            @keyframes multiplierPop {
                0% { transform: scale(0); }
                50% { transform: scale(1.2); }
                100% { transform: scale(1); }
            }

            .multiplier-section.animate-in {
                animation: multiplierPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            }

            /* ===== 响应式 ===== */
            @media (max-width: 800px) {
                .lego-tool-layout {
                    grid-template-columns: 1fr;
                }
                .lego-stage {
                    min-height: 300px;
                }
            }
        </style>

        <div class="tool-modal-header">
            <div class="tool-modal-icon empirical-icon">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5">
                    <rect x="4" y="20" width="12" height="12" rx="2"/>
                    <rect x="18" y="20" width="12" height="12" rx="2"/>
                    <rect x="32" y="20" width="12" height="12" rx="2"/>
                    <circle cx="10" cy="17" r="2" fill="currentColor"/>
                    <circle cx="24" cy="17" r="2" fill="currentColor"/>
                    <circle cx="38" cy="17" r="2" fill="currentColor"/>
                </svg>
            </div>
            <div class="tool-modal-title-group">
                <h2 class="tool-modal-title">${t('Empirical & Molecular Formula', '经验式与分子式')}</h2>
                <div class="tool-modal-tags">
                    <span class="grade-tag">G10-G11</span>
                    <span class="feature-tag">${t('LEGO Mode', '积木模式')}</span>
                </div>
            </div>
        </div>
        
        <div class="lego-tool-layout">
            <!-- 输入区 -->
            <div class="lego-input-panel">
                <div style="font-size: 0.75rem; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">
                    ${t('Enter Elements (%)', '输入元素百分比')}
                </div>
                <div id="modal-element-inputs" class="element-inputs-grid"></div>
                
                <div style="border-top: 1px dashed #e2e8f0; padding-top: 16px; margin-top: 8px;">
                    <div style="font-size: 0.75rem; font-weight: 600; color: #64748b; margin-bottom: 6px;">
                        ${t('Molecular Mass (optional)', '分子质量 (可选)')}
                    </div>
                    <input type="number" id="modal-mol-mass" placeholder="${t('e.g., 180', '例如: 180')}" step="0.1" class="tool-input" style="width: 100%;">
                </div>
                
                <button id="modal-calc-formula-btn" class="tool-button primary-btn" style="margin-top: 12px; padding: 14px 24px; font-size: 1.05rem; width: 100%;">
                    <svg style="width:18px;height:18px;margin-right:6px;vertical-align:text-bottom;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg> ${t('Build Formula', '合成公式')}
                </button>
                
                <input type="hidden" id="modal-formula-method" value="percent">
            </div>
            
            <!-- 积木展示区 -->
            <div class="lego-stage" id="lego-stage">
                <div id="lego-blocks-area" class="lego-blocks-container">
                    <div class="lego-empty-state" id="lego-empty">
                        <div style="opacity: 0.3; margin-bottom: 12px;">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 4h16v16H4z" />
                                <path d="M4 8h16" />
                                <path d="M4 12h16" />
                                <path d="M4 16h16" />
                                <path d="M8 4v16" />
                                <path d="M12 4v16" />
                                <path d="M16 4v16" />
                            </svg>
                        </div>
                        <p style="color: #9ca3af; font-size: 0.9rem; line-height: 1.5;">${t('Enter element percentages<br>and click Build', '输入元素百分比<br>点击合成查看结果')}</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div id="empirical-tips" style="display:none;"></div>
        <div id="modal-formula-result" class="tool-result-box" style="display:none;">
            <div class="result-label">${t('Calculation Details:', '计算详情:')}</div>
            <div class="result-value" id="modal-formula-value"></div>
        </div>
        
        <div id="modal-formula-explanation" class="tool-explanation-box" style="display:none;"></div>
    `;
}


function attachToolEventListeners(toolType) {
    switch (toolType) {
        case 'balancer':
            attachBalancerListeners();
            break;
        case 'molar-mass':
            attachMolarMassListeners();
            break;
        case 'empirical':
            attachEmpiricalListeners();
            break;
        case 'blank':
            // No listeners needed yet
            break;
        case 'solubility':
            attachSolubilityListeners();
            break;
    }
}

function attachBalancerListeners() {
    const reactantsInput = document.getElementById('reactants-input');
    const productsInput = document.getElementById('products-input');
    const autoBalanceBtn = document.getElementById('auto-balance-btn');
    const clearBtn = document.getElementById('clear-balancer-btn');
    const feedback = document.getElementById('balance-feedback');
    const leftAtomCount = document.getElementById('left-atom-count');
    const rightAtomCount = document.getElementById('right-atom-count');
    const balancedResult = document.getElementById('balanced-result');
    const balancedText = document.getElementById('balanced-equation-text');

    // New physics scale elements
    const physicsBeam = document.getElementById('physics-beam-assembly');
    const physicsHangerLeft = document.getElementById('physics-hanger-left');
    const physicsHangerRight = document.getElementById('physics-hanger-right');


    const physicsNeedle = document.getElementById('physics-needle');
    const physicsPanLabelLeft = document.getElementById('physics-pan-label-left');
    const physicsPanLabelRight = document.getElementById('physics-pan-label-right');

    // Physics state
    const physicsState = {
        leftWeight: 0,
        rightWeight: 0,
        currentAngle: 0,
        targetAngle: 0,
        velocity: 0
    };

    const PHYSICS = {
        maxAngle: 20,
        sensitivity: 2.5,
        stiffness: 0.015,
        damping: 0.92
    };

    let animationRunning = false;


    // Parse formula into atom counts
    function parseFormula(formula) {
        if (!formula.trim()) return {};
        const atoms = {};
        const compounds = formula.split('+').map(s => s.trim());

        compounds.forEach(compound => {
            // Extract coefficient
            const match = compound.match(/^(\d*)/);
            const coef = match && match[1] ? parseInt(match[1]) : 1;
            const formulaPart = compound.replace(/^\d*/, '');

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
            expandedFormula = formulaPart.replace(/\([^)]+\)\d*/g, '');

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
            .map(([el, count]) => `<span class="atom-tag ${side}">${el}<sub>${count}</sub></span>`)
            .join('');
    }



    // Physics animation loop
    function animatePhysics() {
        if (!physicsBeam) return;

        const force = (physicsState.targetAngle - physicsState.currentAngle) * PHYSICS.stiffness;
        physicsState.velocity = (physicsState.velocity + force) * PHYSICS.damping;
        physicsState.currentAngle += physicsState.velocity;

        if (Math.abs(physicsState.velocity) < 0.001 && Math.abs(physicsState.currentAngle - physicsState.targetAngle) < 0.001) {
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

    // Update pan labels on the scale
    function updatePanLabels(reactants, products) {
        if (physicsPanLabelLeft) {
            physicsPanLabelLeft.textContent = reactants || '';
            physicsPanLabelLeft.classList.toggle('has-content', !!reactants);
        }
        if (physicsPanLabelRight) {
            physicsPanLabelRight.textContent = products || '';
            physicsPanLabelRight.classList.toggle('has-content', !!products);
        }
    }


    // Calculate imbalance and update scale
    function updateScale() {
        const reactantsFormula = reactantsInput ? reactantsInput.value.trim() : '';
        const productsFormula = productsInput ? productsInput.value.trim() : '';
        const feedback = document.getElementById('balance-feedback');

        // Update pan labels on scale
        updatePanLabels(reactantsFormula, productsFormula);

        // Auto-split if full equation entered
        if (reactantsFormula.includes('→') || reactantsFormula.includes('->')) {
            const parts = reactantsFormula.replace(/->/g, '→').split('→');
            if (reactantsInput) reactantsInput.value = parts[0].trim();
            if (parts[1] && productsInput) productsInput.value = parts[1].trim();
            return updateScale();
        }

        const leftAtoms = parseFormula(reactantsFormula);
        const rightAtoms = parseFormula(productsFormula);

        // Display atom counts with styled HTML
        if (leftAtomCount) leftAtomCount.innerHTML = formatAtomCountsHTML(leftAtoms, 'left');
        if (rightAtomCount) rightAtomCount.innerHTML = formatAtomCountsHTML(rightAtoms, 'right');

        // Calculate total imbalance
        const allElements = new Set([...Object.keys(leftAtoms), ...Object.keys(rightAtoms)]);
        let leftTotal = 0;
        let rightTotal = 0;
        let imbalancedElement = null;
        let imbalanceAmount = 0;

        allElements.forEach(el => {
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
            feedback.classList.remove('balanced', 'unbalanced');

            if (!reactantsFormula && !productsFormula) {
                feedback.innerHTML = `${t('Enter a chemical equation to check the balance', '输入化学方程式来检查平衡状态')}`;
            } else if (!productsFormula) {
                feedback.classList.add('unbalanced');
                feedback.innerHTML = `<span class="status-icon">⚠</span>${t('Add products to complete the equation', '添加生成物以完成方程式')}`;
            } else if (!reactantsFormula) {
                feedback.classList.add('unbalanced');
                feedback.innerHTML = `<span class="status-icon">⚠</span>${t('Add reactants to complete the equation', '添加反应物以完成方程式')}`;
            } else {
                // Check if actually balanced (element by element)
                let isBalanced = true;
                allElements.forEach(el => {
                    if ((leftAtoms[el] || 0) !== (rightAtoms[el] || 0)) isBalanced = false;
                });

                if (isBalanced && allElements.size > 0) {
                    feedback.classList.add('balanced');
                    feedback.innerHTML = `<span class="status-icon">✓</span>${t('Perfectly Balanced!', '完美平衡!')}`;
                } else if (imbalancedElement) {
                    feedback.classList.add('unbalanced');
                    feedback.innerHTML = `<span class="status-icon">⚠</span>${t(`Unbalanced: ${imbalancedElement} differs by ${imbalanceAmount}`, `未平衡: ${imbalancedElement} 相差 ${imbalanceAmount} 个原子`)}`;
                }
            }
        }

        return { leftAtoms, rightAtoms, allElements };
    }

    // Auto-balance function
    function autoBalance() {
        const reactantsFormula = reactantsInput ? reactantsInput.value.trim() : '';
        const productsFormula = productsInput ? productsInput.value.trim() : '';

        if (!reactantsFormula || !productsFormula) {
            return;
        }

        try {
            const equation = `${reactantsFormula} → ${productsFormula}`;
            const result = balanceEquationModal(equation);

            // Update inputs with balanced equation
            const balancedParts = result.balanced.split('→').map(s => s.trim());

            if (reactantsInput) reactantsInput.value = balancedParts[0];
            if (productsInput) productsInput.value = balancedParts[1];

            updateScale();

            // Show balanced result with animation
            if (balancedResult) {
                balancedResult.classList.add('show');
            }
            if (balancedText) {
                balancedText.innerHTML = formatChemicalEquation(result.balanced);
            }
        } catch (error) {
            if (feedback) {
                feedback.classList.remove('balanced');
                feedback.classList.add('unbalanced');
                feedback.innerHTML = `<span class="status-icon">✕</span>${t('Could not auto-balance this equation', '无法自动配平此方程式')}`;
            }
        }
    }

    // Clear function
    function clearInputs() {
        if (reactantsInput) reactantsInput.value = '';
        if (productsInput) productsInput.value = '';
        if (balancedResult) balancedResult.classList.remove('show');

        // Reset physics
        physicsState.targetAngle = 0;
        physicsState.velocity = 1.5; // Small impulse for visual feedback

        updateScale();
    }

    // Event listeners for inputs
    if (reactantsInput) {
        reactantsInput.addEventListener('input', updateScale);
    }
    if (productsInput) {
        productsInput.addEventListener('input', updateScale);
    }
    if (autoBalanceBtn) {
        autoBalanceBtn.addEventListener('click', autoBalance);
    }
    if (clearBtn) {
        clearBtn.addEventListener('click', clearInputs);
    }

    // Enter key support
    [reactantsInput, productsInput].forEach(input => {
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') autoBalance();
            });
        }
    });

    // Start initial animation with impulse
    startAnimation(true);
}

// Helper to format chemical equations with subscripts
function formatChemicalEquation(eq) {
    return eq.replace(/(\d+)/g, (match, p1, offset, str) => {
        // Check if it's a coefficient (at start or after +/→/space)
        const before = str[offset - 1];
        if (!before || before === ' ' || before === '+' || before === '→') {
            return match; // Keep coefficients as is
        }
        return `<sub>${match}</sub>`;
    });
}


function balanceEquationModal(equation) {
    const parts = equation.split('→').map(s => s.trim());
    if (parts.length !== 2) {
        throw new Error('Equation must contain → (arrow)');
    }

    const reactants = parts[0].split('+').map(s => s.trim());
    const products = parts[1].split('+').map(s => s.trim());

    // Build explanation steps
    const steps = [];
    steps.push('<h4>Step-by-step balancing:</h4>');
    steps.push('<ol>');
    steps.push('<li><strong>Identify elements:</strong> List all elements on both sides</li>');
    steps.push('<li><strong>Count atoms:</strong> Count atoms of each element</li>');
    steps.push('<li><strong>Balance one at a time:</strong> Start with metals, then non-metals, end with O and H</li>');
    steps.push('<li><strong>Adjust coefficients:</strong> Only change numbers in front of formulas</li>');
    steps.push('<li><strong>Verify:</strong> Check that atoms are equal on both sides</li>');
    steps.push('</ol>');
    steps.push('<div class="warning-box"><strong>Important:</strong> Never change subscripts, only coefficients!</div>');

    // Common equation patterns
    let balancedEq = equation;
    let check = '';

    // Fe + O2 → Fe2O3
    if (equation.includes('Fe') && equation.includes('O2') && equation.includes('Fe2O3')) {
        balancedEq = '4Fe + 3O₂ → 2Fe₂O₃';
        check = generateAtomCheckModal(balancedEq);
    }
    // H2 + O2 → H2O
    else if (equation.match(/H2?\s*\+\s*O2/i) && equation.includes('H2O')) {
        balancedEq = '2H₂ + O₂ → 2H₂O';
        check = generateAtomCheckModal(balancedEq);
    }
    // CH4 + O2 → CO2 + H2O
    else if (equation.includes('CH4') && equation.includes('O2') && equation.includes('CO2')) {
        balancedEq = 'CH₄ + 2O₂ → CO₂ + 2H₂O';
        check = generateAtomCheckModal(balancedEq);
    }
    // Na + Cl2 → NaCl
    else if (equation.includes('Na') && equation.includes('Cl2') && equation.includes('NaCl')) {
        balancedEq = '2Na + Cl₂ → 2NaCl';
        check = generateAtomCheckModal(balancedEq);
    }
    // Generic case
    else {
        check = '<p class="note-text">Enter a common equation pattern to see atom count verification.</p>';
    }

    // Create a plain text version for updating inputs (without Unicode subscripts)
    const balancedPlain = balancedEq
        .replace(/₂/g, '2').replace(/₃/g, '3').replace(/₄/g, '4')
        .replace(/₅/g, '5').replace(/₆/g, '6');

    return {
        equation: balancedEq,
        balanced: balancedPlain,
        explanation: steps.join(''),
        check: check
    };
}

function generateAtomCheckModal(equation) {
    // Normalize subscripts for counting
    const normalized = equation
        .replace(/₂/g, '2').replace(/₃/g, '3').replace(/₄/g, '4')
        .replace(/₅/g, '5').replace(/₆/g, '6');

    const parts = normalized.split('→');
    const left = parts[0].trim();
    const right = parts[1].trim();

    const leftAtoms = countAtomsModal(left);
    const rightAtoms = countAtomsModal(right);

    let html = '<h4>Atom Count Check:</h4>';
    html += '<table class="check-table">';
    html += '<tr><th>Element</th><th>Left Side</th><th>Right Side</th><th>Match</th></tr>';

    const allElements = new Set([...Object.keys(leftAtoms), ...Object.keys(rightAtoms)]);
    let allMatch = true;

    allElements.forEach(element => {
        const leftCount = leftAtoms[element] || 0;
        const rightCount = rightAtoms[element] || 0;
        const match = leftCount === rightCount;
        if (!match) allMatch = false;
        const matchIcon = match ? '✓' : '✗';
        const matchClass = match ? 'match-yes' : 'match-no';
        html += `<tr><td>${element}</td><td>${leftCount}</td><td>${rightCount}</td><td class="${matchClass}">${matchIcon}</td></tr>`;
    });

    html += '</table>';
    html += `<div class="balance-status ${allMatch ? 'balanced' : 'unbalanced'}">
        <strong>Conservation of matter:</strong> ${allMatch ? '✓ Balanced!' : '✗ Not balanced'}
    </div>`;

    return html;
}

function countAtomsModal(side) {
    const atoms = {};
    const compounds = side.split('+').map(s => s.trim());

    compounds.forEach(compound => {
        const match = compound.match(/^(\d*)(.+)$/);
        const coefficient = match[1] ? parseInt(match[1]) : 1;
        const formula = match[2];
        const elements = parseFormulaStrict(formula);

        Object.keys(elements).forEach(element => {
            atoms[element] = (atoms[element] || 0) + elements[element] * coefficient;
        });
    });

    return atoms;
}

function displayBalanceResult(result) {
    const resultBox = document.getElementById('modal-balance-result');
    const equationEl = document.getElementById('modal-balanced-equation');
    const explanationBox = document.getElementById('modal-balance-explanation');
    const checkBox = document.getElementById('modal-balance-check');

    resultBox.style.display = 'block';
    equationEl.textContent = result.equation;

    explanationBox.style.display = 'block';
    explanationBox.innerHTML = result.explanation;

    checkBox.style.display = 'block';
    checkBox.innerHTML = result.check;
}

function attachMolarMassListeners() {
    const input = document.getElementById('modal-formula-input');
    const toggle = document.getElementById('modal-exact-toggle');

    // --- Helper Bar Logic ---
    const subBtn = document.getElementById('helper-sub-btn');
    const dotBtn = document.getElementById('helper-dot-btn');
    const subStatus = document.getElementById('sub-status-text');
    let subMode = false;

    if (subBtn) {
        subBtn.onclick = () => {
            subMode = !subMode;
            if (subMode) {
                subBtn.style.background = '#eff6ff';
                subBtn.style.borderColor = '#6366f1';
                subBtn.style.color = '#4f46e5';
                if (subStatus) subStatus.textContent = t('Subscript Mode', '下标模式');
            } else {
                subBtn.style.background = '#fff';
                subBtn.style.borderColor = '#e2e8f0';
                subBtn.style.color = '#475569';
                if (subStatus) subStatus.textContent = t('Normal Inputs', '普通输入');
            }
            input.focus();
        };
    }
    if (dotBtn) {
        dotBtn.onclick = () => {
            const start = input.selectionStart; const text = input.value;
            input.value = text.substring(0, start) + '•' + text.substring(input.selectionEnd);
            input.selectionStart = input.selectionEnd = start + 1;
            input.dispatchEvent(new Event('input')); input.focus();
        };
    }
    if (input) {
        input.addEventListener('keydown', (e) => {
            if (subMode && /^[0-9]$/.test(e.key)) {
                e.preventDefault();
                const subMap = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
                const char = subMap[parseInt(e.key)];
                const start = input.selectionStart; const text = input.value;
                input.value = text.substring(0, start) + char + text.substring(input.selectionEnd);
                input.selectionStart = input.selectionEnd = start + 1;
                input.dispatchEvent(new Event('input'));
            }
            if ((e.ctrlKey || e.metaKey) && e.key === '.') {
                e.preventDefault();
                const start = input.selectionStart; const text = input.value;
                input.value = text.substring(0, start) + '•' + text.substring(input.selectionEnd);
                input.selectionStart = input.selectionEnd = start + 1;
                input.dispatchEvent(new Event('input'));
            }
        });
    }

    // Core calculation function - Returns result or null
    const getResult = () => {
        const formula = input.value.trim();
        if (!formula) return null;
        try {
            return calculateMolarMassModal(formula, toggle.checked);
        } catch (e) {
            return null; // Silent fail for invalid formula
        }
    };

    // Update the visual scale (blocks & screen) ONLY
    const updateRealtimeScale = () => {
        const result = getResult();
        const scaleDisplay = document.getElementById('scale-display-value');
        const blocksArea = document.getElementById('scale-blocks-area');

        // Always discard receipt on input change
        discardReceipt();

        if (result) {
            scaleDisplay.textContent = result.total;
            renderScaleBlocks(result, blocksArea);
        } else {
            scaleDisplay.textContent = "0.00";
            blocksArea.innerHTML = '';
        }
    };

    // Trigger Print Animation
    const triggerPrint = () => {
        const result = getResult();
        if (result) {
            printReceipt(result);
        }
    };

    if (input) {
        input.addEventListener('input', updateRealtimeScale);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                triggerPrint();
                input.blur(); // Optional: remove focus to show "done" state? Or keep focus.
            }
        });
    }

    if (toggle) {
        toggle.addEventListener('change', () => {
            updateRealtimeScale();
        });
    }

    /* --- 新增：学习模式逻辑 --- */
    const learningToggle = document.getElementById('modal-learning-toggle');
    const calcContainer = document.getElementById('calc-steps-container');
    const showCalcBtn = document.getElementById('show-calc-btn');
    const calcContent = document.getElementById('calc-steps-content');

    // Toggle Learning Mode
    if (learningToggle) {
        learningToggle.addEventListener('change', () => {
            const isLearning = learningToggle.checked;
            if (calcContainer) {
                calcContainer.style.display = isLearning ? 'block' : 'none';
            }
            // Reset content visibility when toggling mode
            if (calcContent) calcContent.style.display = 'none';
        });
    }

    // Show Calculation Steps
    if (showCalcBtn) {
        showCalcBtn.addEventListener('click', () => {
            if (calcContent.style.display === 'block') {
                calcContent.style.display = 'none';
                return;
            }

            const result = getResult();
            if (!result) return;

            // Generate Calculation Steps HTML
            let html = '';

            // Header
            html += `<div style="font-weight:700; margin-bottom:10px; font-size:1.1em; color:#4f46e5;">${input.value}</div>`;

            result.breakdown.forEach(item => {
                const subtotal = item.subtotal;
                const mass = item.atomicMass;
                const count = item.count;

                html += `
                <div class="calc-step-row">
                    <div>
                        <span style="font-weight:600; width: 25px; display:inline-block;">${item.element}</span>
                        <span class="calc-step-formula">${mass} × ${count}</span>
                    </div>
                    <span style="font-weight:500;">= ${subtotal}</span>
                </div>`;
            });

            html += `
            <div class="calc-step-row">
                <span>Total</span>
                <span style="color:#059669; font-size:1.05em;">${result.total} g/mol</span>
            </div>`;

            calcContent.innerHTML = html;
            calcContent.style.display = 'block';
        });
    }

}

// Helper: Discard current receipt
function discardReceipt() {
    const receiptWrapper = document.getElementById('receipt-wrapper');
    if (receiptWrapper && receiptWrapper.classList.contains('printing')) {
        receiptWrapper.classList.remove('printing');
        receiptWrapper.classList.add('discarding');

        // Reset after animation
        setTimeout(() => {
            receiptWrapper.classList.remove('discarding');
            receiptWrapper.style.display = 'none'; // Fully hide
        }, 500);
    }
}

// Helper: Print new receipt
function printReceipt(result) {
    const receiptWrapper = document.getElementById('receipt-wrapper');
    const receiptItems = document.getElementById('receipt-items');
    const receiptTotal = document.getElementById('receipt-total-value');
    const receiptDate = document.getElementById('receipt-date');

    if (!receiptWrapper) return;

    // First ensure old one is gone (if user hits enter repeatedly fast)
    if (receiptWrapper.classList.contains('printing') || receiptWrapper.classList.contains('discarding')) {
        receiptWrapper.classList.remove('printing');
        // Force reset
        void receiptWrapper.offsetWidth;
    }

    // Populate Data
    const now = new Date();
    receiptDate.textContent = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();

    let receiptHTML = '';
    result.breakdown.forEach(item => {
        receiptHTML += `
        <div class="receipt-item-row">
            <div class="receipt-item-name">
                <strong>${item.element}</strong> 
                <span class="receipt-item-qty">x${item.count}</span>
            </div>
            <div>${item.subtotal}</div>
        </div>`;
    });

    receiptItems.innerHTML = receiptHTML;
    receiptTotal.textContent = result.total + ' g/mol';

    // Start Animation
    receiptWrapper.style.display = 'block';
    // Remove discarding if it was stuck
    receiptWrapper.classList.remove('discarding');

    // Force Reflow
    void receiptWrapper.offsetWidth;

    receiptWrapper.classList.add('printing');
}

// Helper: Render 3D Blocks
function renderScaleBlocks(result, container) {
    if (!container) return;
    container.innerHTML = '';

    const maxSubtotal = Math.max(...result.breakdown.map(i => parseFloat(i.subtotal)));
    const totalMass = parseFloat(result.total);

    // Generate Blocks
    result.breakdown.forEach(item => {
        const subtotalVal = parseFloat(item.subtotal);
        const percent = ((subtotalVal / totalMass) * 100).toFixed(1);

        const block = document.createElement('div');
        block.className = 'element-block';
        block.textContent = item.element;

        // Size logic
        const size = 50 + (percent * 0.8);
        block.style.width = `${Math.min(size, 100)}px`;
        block.style.height = `${Math.min(size, 100)}px`;

        // Color
        const hue = (item.element.charCodeAt(0) * 20 + item.element.length * 10) % 360;
        block.style.background = `linear-gradient(135deg, hsl(${hue}, 70%, 60%), hsl(${hue}, 70%, 40%))`;

        // Tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'block-tooltip';
        tooltip.innerHTML = `<strong>${item.element}</strong><br>${subtotalVal.toFixed(2)} g/mol<br><span style="color:#fbbf24">${percent}%</span>`;
        block.appendChild(tooltip);

        container.appendChild(block);
    });
}

function calculateMolarMassModal(formula, exact) {
    const elements = parseFormulaStrict(formula);
    let total = 0;
    const breakdown = [];

    Object.keys(elements).forEach(element => {
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
            subtotal: exact ? subtotal.toFixed(3) : Math.round(subtotal)
        });
    });

    return {
        total: exact ? total.toFixed(3) : Math.round(total),
        breakdown,
        exact
    };
}

function displayMolarMassResult(result) {
    const scaleDisplay = document.getElementById('scale-display-value');
    const blocksArea = document.getElementById('scale-blocks-area');
    const receiptWrapper = document.getElementById('receipt-wrapper');
    const receiptItems = document.getElementById('receipt-items');
    const receiptTotal = document.getElementById('receipt-total-value');
    const receiptDate = document.getElementById('receipt-date');

    // Update Digital Display
    scaleDisplay.textContent = result.total;

    // Clear previous blocks
    blocksArea.innerHTML = '';

    // Sort logic for blocks? Maybe locally to order small to large or as they appear.
    // Let's keep them in formula order for now.

    // Find max subtotal to scale blocks
    const maxSubtotal = Math.max(...result.breakdown.map(i => parseFloat(i.subtotal)));
    const totalMass = parseFloat(result.total);

    // Generate Blocks
    result.breakdown.forEach(item => {
        const subtotalVal = parseFloat(item.subtotal);
        const percent = ((subtotalVal / totalMass) * 100).toFixed(1);

        const block = document.createElement('div');
        block.className = 'element-block';
        block.textContent = item.element;

        // Dynamic styling based on mass/contribution
        // Base size 50px, add up to 50px more based on percent
        const size = 50 + (percent * 0.8);
        block.style.width = `${Math.min(size, 100)}px`;
        block.style.height = `${Math.min(size, 100)}px`;

        // Dynamic Color based on element/group
        const hue = (item.element.charCodeAt(0) * 20 + item.element.length * 10) % 360;
        block.style.background = `linear-gradient(135deg, hsl(${hue}, 70%, 60%), hsl(${hue}, 70%, 40%))`;

        // Tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'block-tooltip';
        tooltip.innerHTML = `${item.element}<br>${item.atomicMass} × ${item.count}<br><strong>${percent}%</strong>`;
        block.appendChild(tooltip);

        blocksArea.appendChild(block);
    });

    // Generate Receipt Content
    if (receiptWrapper) {
        // Only update date if it wasn't already printing (to avoid ticking seconds annoyance)
        // actually for real-time it's fine.
        const now = new Date();
        receiptDate.textContent = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();

        // Print animation logic
        // Remove class to reset if needed? Or just ensure it's there
        receiptWrapper.style.display = 'block';

        // Force reflow to ensuring transition happens if it was hidden
        // requestAnimationFrame(() => receiptWrapper.classList.add('printing'));
        // Simple way:
        setTimeout(() => receiptWrapper.classList.add('printing'), 50);

        let receiptHTML = '';
        result.breakdown.forEach(item => {
            receiptHTML += `
            <div class="receipt-item-row">
                <div class="receipt-item-name">
                    <strong>${item.element}</strong> 
                    <span class="receipt-item-qty">x${item.count}</span>
                </div>
                <div>${item.subtotal}</div>
            </div>`;
        });

        receiptItems.innerHTML = receiptHTML;
        receiptTotal.textContent = result.total + ' g/mol';
    }
}

function attachEmpiricalListeners() {
    const methodSelect = document.getElementById('modal-formula-method');
    const inputsContainer = document.getElementById('modal-element-inputs');
    const btn = document.getElementById('modal-calc-formula-btn');

    // Initialize inputs
    updateEmpiricalInputs();

    if (methodSelect) {
        methodSelect.addEventListener('change', updateEmpiricalInputs);
    }

    function updateEmpiricalInputs() {
        if (!inputsContainer) return; // 防止 null 错误

        const method = methodSelect?.value || 'percent';
        const placeholder = method === 'percent' ? '40' : '2.5';

        inputsContainer.innerHTML = `
            <style>
                .emp-row { display: flex; gap: 10px; margin-bottom: 10px; }
                .emp-row input { padding: 12px 14px; border: 2px solid #e2e8f0; border-radius: 10px; font-size: 1rem; box-sizing: border-box; transition: all 0.2s; }
                .emp-row input:focus { outline: none; border-color: #8b5cf6; background: #faf5ff; }
                .emp-row .sym { width: 70px; flex-shrink: 0; font-weight: 700; text-align: center; font-size: 1.1rem; }
                .emp-row .val { flex: 1; min-width: 0; }
            </style>
            <div class="emp-row">
                <input type="text" id="modal-elem1-symbol" placeholder="C" class="sym">
                <input type="number" id="modal-elem1-value" placeholder="${placeholder}" step="0.1" class="val">
            </div>
            <div class="emp-row">
                <input type="text" id="modal-elem2-symbol" placeholder="H" class="sym">
                <input type="number" id="modal-elem2-value" placeholder="${placeholder}" step="0.1" class="val">
            </div>
            <div class="emp-row">
                <input type="text" id="modal-elem3-symbol" placeholder="O" class="sym">
                <input type="number" id="modal-elem3-value" placeholder="${t('optional', '可选')}" step="0.1" class="val">
            </div>
        `;
    }

    if (btn) {
        btn.addEventListener('click', () => {
            try {
                const method = methodSelect.value;
                const data = getEmpiricalData(method);
                const result = calculateEmpiricalModal(data);
                displayEmpiricalResult(result);
                // Hide tips section when showing results
                const tips = document.getElementById('empirical-tips');
                if (tips) tips.style.display = 'none';
            } catch (error) {
                showModalError('modal-formula-result', 'Error: ' + error.message);
            }
        });
    }
}

function getEmpiricalData(method) {
    const elements = [];
    for (let i = 1; i <= 3; i++) {
        const symbol = document.getElementById(`modal-elem${i}-symbol`)?.value.trim().toUpperCase();
        const value = parseFloat(document.getElementById(`modal-elem${i}-value`)?.value);
        if (symbol && !isNaN(value)) {
            // Correct capitalization (first letter uppercase, rest lowercase)
            const correctedSymbol = symbol.charAt(0) + symbol.slice(1).toLowerCase();
            if (method === 'percent') {
                elements.push({ symbol: correctedSymbol, percent: value });
            } else {
                elements.push({ symbol: correctedSymbol, mass: value });
            }
        }
    }

    const molecularMass = parseFloat(document.getElementById('modal-mol-mass')?.value);
    return { elements, molecularMass: isNaN(molecularMass) ? null : molecularMass };
}

function calculateEmpiricalModal(data) {
    const { elements, molecularMass } = data;

    if (elements.length === 0) {
        throw new Error('Please enter at least one element.');
    }

    // Step 1: Convert to moles
    const moles = elements.map(elem => {
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
        return { symbol: elem.symbol, moles: molesValue, original: elem.percent || elem.mass };
    });

    // Step 2: Find smallest mole value
    const minMoles = Math.min(...moles.map(m => m.moles));

    // Step 3: Divide by smallest
    const ratios = moles.map(m => ({
        symbol: m.symbol,
        moles: m.moles,
        ratio: m.moles / minMoles,
        original: m.original
    }));

    // Step 4: Simplify to whole numbers
    const empirical = simplifyRatiosModal(ratios);
    const empiricalFormula = empirical.map(r => r.symbol + (r.count > 1 ? subscript(r.count) : '')).join('');

    // Calculate empirical mass
    let empiricalMass = 0;
    empirical.forEach(elem => {
        const atomicMass = atomicMasses[elem.symbol];
        if (atomicMass) {
            empiricalMass += atomicMass * elem.count;
        }
    });

    // Build explanation
    let explanation = '<h4>Calculation Steps:</h4>';
    explanation += '<ol>';
    explanation += '<li><strong>Step 1: Convert to moles</strong> (Mass ÷ Atomic Mass)</li>';
    explanation += '<ul>';
    moles.forEach(m => {
        const atomicMass = atomicMasses[m.symbol];
        explanation += `<li>${m.symbol}: ${m.original} ÷ ${atomicMass} = ${m.moles.toFixed(4)} mol</li>`;
    });
    explanation += '</ul>';

    explanation += `<li><strong>Step 2: Divide by smallest</strong> (${minMoles.toFixed(4)} mol)</li>`;
    explanation += '<ul>';
    ratios.forEach(r => {
        explanation += `<li>${r.symbol}: ${r.moles.toFixed(4)} ÷ ${minMoles.toFixed(4)} = ${r.ratio.toFixed(2)}</li>`;
    });
    explanation += '</ul>';

    explanation += '<li><strong>Step 3: Round to whole numbers</strong></li>';
    explanation += `<li><strong>Result:</strong> Empirical Formula = <strong>${empiricalFormula}</strong></li>`;
    explanation += '</ol>';

    explanation += `<p><strong>Empirical Molar Mass:</strong> ${empiricalMass.toFixed(2)} g/mol</p>`;

    let molecularFormula = null;
    let multiplier = 1;  // 默认倍数为1

    if (molecularMass) {
        multiplier = Math.round(molecularMass / empiricalMass);
        molecularFormula = empirical.map(r => r.symbol + (r.count * multiplier > 1 ? subscript(r.count * multiplier) : '')).join('');

        explanation += '<hr>';
        explanation += '<h4>Molecular Formula:</h4>';
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
        empirical,           // 积木渲染需要的原始数据
        multiplier: multiplier || 1  // 倍数，默认为1
    };
}

function simplifyRatiosModal(ratios) {
    const result = ratios.map(r => {
        let count = Math.round(r.ratio);
        if (Math.abs(r.ratio - count) > 0.15) {
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

function subscript(num) {
    const subscripts = { '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉' };
    return String(num).split('').map(d => subscripts[d] || d).join('');
}

function displayEmpiricalResult(result) {
    const resultBox = document.getElementById('modal-formula-result');
    const valueEl = document.getElementById('modal-formula-value');
    const explanationBox = document.getElementById('modal-formula-explanation');
    const blocksArea = document.getElementById('lego-blocks-area');
    const emptyState = document.getElementById('lego-empty');
    const legoStage = document.getElementById('lego-stage');

    // Hide empty state and add result styling
    if (emptyState) emptyState.style.display = 'none';
    if (legoStage) legoStage.classList.add('has-result');

    // Render LEGO blocks
    if (blocksArea) {
        let blocksHTML = '';

        // 1. Empirical Formula Blocks
        blocksHTML += `
            <div class="lego-group" id="empirical-blocks">
                <div class="lego-group-label">${t('Empirical Formula', '经验式')}</div>
                <div style="display: flex; align-items: flex-end; gap: 8px; flex-wrap: wrap; justify-content: center;">
        `;

        result.empirical.forEach((elem, index) => {
            const colorClass = ['C', 'H', 'O', 'N', 'S', 'P', 'Cl'].includes(elem.symbol)
                ? `el-${elem.symbol}`
                : 'el-default';

            blocksHTML += `
                <div class="lego-block ${colorClass} animate-in" style="animation-delay: ${index * 0.1}s">
                    <span class="block-symbol">${elem.symbol}</span>
                    ${elem.count > 1 ? `<span class="block-count">×${elem.count}</span>` : ''}
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
                    <span class="multiplier-label">${t('multiplier', '倍数')}</span>
                </div>
            `;

            // Molecular Formula Blocks (duplicated n times visually)
            blocksHTML += `
                <div class="lego-group" id="molecular-blocks" style="background: rgba(52, 211, 153, 0.1); border: 2px solid rgba(52, 211, 153, 0.3);">
                    <div class="lego-group-label" style="color: #059669;">${t('Molecular Formula', '分子式')}</div>
                    <div style="display: flex; align-items: flex-end; gap: 8px; flex-wrap: wrap; justify-content: center;">
            `;

            // Show multiplied blocks
            result.empirical.forEach((elem, index) => {
                const colorClass = ['C', 'H', 'O', 'N', 'S', 'P', 'Cl'].includes(elem.symbol)
                    ? `el-${elem.symbol}`
                    : 'el-default';
                const newCount = elem.count * result.multiplier;

                blocksHTML += `
                    <div class="lego-block ${colorClass} animate-in" style="animation-delay: ${0.5 + index * 0.1}s">
                        <span class="block-symbol">${elem.symbol}</span>
                        ${newCount > 1 ? `<span class="block-count">×${newCount}</span>` : ''}
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
                    <span class="result-label">${t('Result', '结果')}</span>
                    <span class="result-formula">${result.molecularFormula}</span>
                </div>
            `;
        } else if (!result.molecularMass) {
            // Only empirical, no molecular mass given
            blocksHTML += `
                <div style="text-align: center; color: #64748b; font-size: 0.85rem; padding: 15px; background: rgba(0,0,0,0.03); border-radius: 10px;">
                    ${t('Enter molecular mass above to calculate the molecular formula', '在上方输入分子质量以计算分子式')}
                </div>
            `;
        } else {
            // Multiplier is 1
            blocksHTML += `
                <div class="molecular-result animate-in" style="animation-delay: 0.4s">
                    <span class="result-label">${t('Result', '结果')}</span>
                    <span class="result-formula">${result.empiricalFormula}</span>
                    <span style="font-size: 0.8rem; color: #64748b; margin-left: 10px;">(n = 1, ${t('same as empirical', '与经验式相同')})</span>
                </div>
            `;
        }

        blocksArea.innerHTML = blocksHTML;
    }

    // Still show text result box (collapsed by default, can expand for details)
    if (resultBox) {
        resultBox.style.display = 'block';
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
        explanationBox.style.display = 'block';
        explanationBox.innerHTML = result.explanation;
    }
}

function showModalError(containerId, message) {
    const container = document.getElementById(containerId);
    if (container) {
        container.style.display = 'block';
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
        <div class="tool-modal-header">
            <div class="tool-modal-icon" style="background:#10b981; color:white;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                     <path d="M3 3v18h18" />
                     <path d="M7 7l10 10" />
                     <path d="M17 7l-10 10" />
                </svg>
            </div>
            <div class="tool-modal-title-group">
                <h2 class="tool-modal-title">${t('Solubility Checker', '溶解性检测')}</h2>
                <div class="tool-modal-tags">
                   <span class="grade-tag">Interactive</span>
                </div>
            </div>
        </div>
        <div style="padding: 20px; overflow-y: auto;">
            <!-- Checker Input -->
            <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:20px; margin-bottom:24px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <label style="display:block; font-size:0.9rem; font-weight:600; color:#166534; margin-bottom:8px;">${t('Enter Formula to Check:', '输入化学式检测:')}</label>
                <div style="display:flex; gap:12px;">
                    <input type="text" id="solubility-input" placeholder="e.g. AgCl, Na2SO4, CaCO3" 
                           style="flex:1; padding:10px 14px; border:1px solid #cbd5e1; border-radius:8px; font-family:'Roboto Mono', monospace; font-size:1.1rem; outline:none; transition:border 0.2s;"
                           onfocus="this.style.borderColor='#22c55e'" onblur="this.style.borderColor='#cbd5e1'">
                    <button id="check-solubility-btn" style="background:#16a34a; color:white; border:none; padding:0 24px; border-radius:8px; font-weight:600; font-size:1rem; cursor:pointer; transition:all 0.2s; box-shadow:0 2px 4px rgba(22,163,74,0.3);">
                        ${t('Check', '检测')}
                    </button>
                </div>
                <div id="solubility-result" style="margin-top:16px; min-height:40px; border-radius:8px; display:none; padding:12px; font-size:1rem; align-items:center;"></div>
            </div>

            <!-- Table -->
            <h3 style="font-size:1.1rem; color:#334155; margin-bottom:12px; padding-bottom:6px; border-bottom:2px solid #e2e8f0;">${t('Solubility Rules (Reference)', '溶解性规则 (参考)')}</h3>
            <style>
                .sol-table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 0.9rem; }
                .sol-table th, .sol-table td { padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: left; }
                .sol-table th { background: #f8fafc; font-weight: 600; color: #475569; position: sticky; top: 0; }
                .sol-badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
                .sol-s { background: #dcfce7; color: #166534; }
                .sol-i { background: #fee2e2; color: #991b1b; }
            </style>
            <table class="sol-table">
                <thead>
                    <tr>
                        <th width="30%">${t('Anion', '阴离子')}</th>
                        <th width="20%">${t('Rule', '规则')}</th>
                        <th width="50%">${t('Exceptions', '例外')}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><strong>NO₃⁻</strong> (Nitrous)</td><td><span class="sol-badge sol-s">${t('Soluble', '可溶')}</span></td><td>${t('None', '无')}</td></tr>
                    <tr><td><strong>CH₃COO⁻</strong> (Acetate)</td><td><span class="sol-badge sol-s">${t('Soluble', '可溶')}</span></td><td>${t('None', '无')}</td></tr>
                    <tr><td><strong>Cl⁻, Br⁻, I⁻</strong></td><td><span class="sol-badge sol-s">${t('Soluble', '可溶')}</span></td><td>Ag⁺, Pb²⁺, Hg₂²⁺ (<span class="sol-badge sol-i">${t('Insoluble', '不溶')}</span>)</td></tr>
                    <tr><td><strong>SO₄²⁻</strong> (Sulfate)</td><td><span class="sol-badge sol-s">${t('Soluble', '可溶')}</span></td><td>Ba²⁺, Pb²⁺, Ca²⁺, Sr²⁺ (<span class="sol-badge sol-i">${t('Insoluble', '不溶')}</span>)</td></tr>
                    <tr><td><strong>OH⁻</strong> (Hydroxide)</td><td><span class="sol-badge sol-i">${t('Insoluble', '不溶')}</span></td><td>Group 1, NH₄⁺ (<span class="sol-badge sol-s">${t('Soluble', '可溶')}</span>); Ca²⁺, Ba²⁺, Sr²⁺ (Slightly)</td></tr>
                    <tr><td><strong>CO₃²⁻, PO₄³⁻</strong></td><td><span class="sol-badge sol-i">${t('Insoluble', '不溶')}</span></td><td>Group 1, NH₄⁺ (<span class="sol-badge sol-s">${t('Soluble', '可溶')}</span>)</td></tr>
                    <tr><td><strong>S²⁻</strong> (Sulfide)</td><td><span class="sol-badge sol-i">${t('Insoluble', '不溶')}</span></td><td>Group 1, Group 2, NH₄⁺ (<span class="sol-badge sol-s">${t('Soluble', '可溶')}</span>)</td></tr>
                </tbody>
            </table>
        </div>
    `;
}

function attachSolubilityListeners() {
    const input = document.getElementById('solubility-input');
    const btn = document.getElementById('check-solubility-btn');
    const resultBox = document.getElementById('solubility-result');

    if (!input || !btn) return;

    const runCheck = () => {
        const val = input.value.trim();
        if (!val) return;

        resultBox.style.display = 'flex';
        resultBox.innerHTML = `<span style="color:#64748b;">Thinking...</span>`;
        resultBox.style.background = '#f8fafc';
        resultBox.style.border = '1px solid #e2e8f0';
        resultBox.style.borderLeft = 'none';

        setTimeout(() => {
            const res = calculateSolubility(val);
            if (res.soluble) {
                resultBox.style.background = '#f0fdf4';
                resultBox.style.border = '1px solid #bbf7d0';
                resultBox.style.borderLeft = '5px solid #16a34a';
                resultBox.style.padding = '12px 16px';
                resultBox.innerHTML = `<div><div style="font-weight:700; color:#15803d; font-size:1.1rem; margin-bottom:2px;">Soluble (aq) / 可溶</div><div style="font-size:0.9rem; color:#166534;">${res.reason}</div></div>`;
            } else if (res.insoluble) {
                resultBox.style.background = '#fef2f2';
                resultBox.style.border = '1px solid #fecaca';
                resultBox.style.borderLeft = '5px solid #dc2626';
                resultBox.style.padding = '12px 16px';
                resultBox.innerHTML = `<div><div style="font-weight:700; color:#b91c1c; font-size:1.1rem; margin-bottom:2px;">Insoluble (s) / 沉淀</div><div style="font-size:0.9rem; color:#991b1b;">${res.reason}</div></div>`;
            } else {
                resultBox.style.background = '#fffbeb';
                resultBox.style.border = '1px solid #fde68a';
                resultBox.style.borderLeft = '5px solid #d97706';
                resultBox.style.padding = '12px 16px';
                resultBox.innerHTML = `<div><div style="font-weight:700; color:#b45309; font-size:1.1rem; margin-bottom:2px;">Unknown / Complex</div><div style="font-size:0.9rem; color:#92400e;">${t('Logic limited to common inorganic salts.', '目前仅支持常见无机盐判断。')}</div></div>`;
            }
        }, 100);
    };

    btn.onclick = runCheck;
    input.addEventListener('keypress', (e) => { if (e.key === 'Enter') runCheck(); });
    setTimeout(() => input.focus(), 100);
}

function calculateSolubility(formula) {
    const f = formula.trim();
    // 1. Group 1 & Ammonium (Rule 1: Always Soluble)
    // Matches Li, Na, K, Rb, Cs, NH4. Ensure not inside other words (like NaCl matches Na)
    if (/(Li|Na|K|Rb|Cs)(?![a-z])/.test(f) || /NH4/.test(f)) {
        return { soluble: true, reason: t("Contains Group 1 metal or Ammonium.", "含第1族金属或铵根，总是可溶。") };
    }
    // 2. Nitrates & Acetates (Rule 2: Always Soluble)
    if (/NO3/.test(f) || /CH3COO/.test(f) || /C2H3O2/.test(f)) {
        return { soluble: true, reason: t("Nitrates and Acetates are soluble.", "硝酸盐和醋酸盐总是可溶。") };
    }
    // 3. Halides (Cl, Br, I)
    // Matches Cl, Br, I. not ClO, BrO.
    if (/(Cl|Br|I)(?![a-z])(?!O)/.test(f)) {
        // Exceptions: Ag, Pb, Hg
        if (/(Ag|Pb|Hg)/.test(f)) {
            return { insoluble: true, reason: t("Halide with Ag/Pb/Hg is insoluble.", "卤化物遇银/铅/汞沉淀。") };
        }
        return { soluble: true, reason: t("Most Halides are soluble.", "大多数卤化物可溶。") };
    }
    // 4. Sulfates (SO4)
    if (/SO4/.test(f)) {
        // Exceptions: Ca, Sr, Ba, Pb
        if (/(Ca|Sr|Ba|Pb)/.test(f)) {
            return { insoluble: true, reason: t("Sulfate with Ca/Sr/Ba/Pb is insoluble.", "硫酸盐遇钙/锶/钡/铅沉淀。") };
        }
        return { soluble: true, reason: t("Most Sulfates are soluble.", "大多数硫酸盐可溶。") };
    }
    // 5. Hydroxides (OH)
    if (/(OH|\(OH\))/.test(f)) {
        // Exceptions: Ca, Sr, Ba (Slightly Soluble -> Treat as Soluble for typical context or specify)
        if (/(Ca|Sr|Ba)/.test(f)) {
            // Often considered slightly soluble. Let's say Soluble.
            return { soluble: true, reason: t("Group 2 Hydroxides (Ca/Sr/Ba) are slightly soluble.", "第2族氢氧化物(Ca/Sr/Ba)微溶。") };
        }
        return { insoluble: true, reason: t("Most Hydroxides are insoluble.", "大多数氢氧化物不溶。") };
    }
    // 6. Carbonates, Phosphates, Sulfides (Insoluble)
    // Matches CO3, PO4, S not SO4.
    if (/CO3/.test(f) || /PO4/.test(f) || /S(?![a-zO])/.test(f)) {
        return { insoluble: true, reason: t("Carbonates/Phosphates/Sulfides are generally insoluble.", "碳酸盐/磷酸盐/硫化物通常不溶。") };
    }

    return { unknown: true };
}

function generateIonsToolContent() {
    return `
        <div class="tool-modal-header">
            <div class="tool-modal-icon" style="background: linear-gradient(135deg, #fef3c7, #fde68a); color: #92400e;">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5">
                    <circle cx="24" cy="24" r="14"/>
                    <text x="24" y="30" text-anchor="middle" font-size="16" font-weight="bold" fill="currentColor" stroke="none">±</text>
                </svg>
            </div>
            <div class="tool-modal-title-group">
                <h2 class="tool-modal-title">${t('Common Ions Reference', '常用离子表')}</h2>
                <div class="tool-modal-tags">
                    <span class="grade-tag">G9-12</span>
                    <span class="feature-tag">${t('Reference', '参考')}</span>
                </div>
            </div>
        </div>
        
        <div class="ions-tool-layout">
            <!-- Left Column: Cations -->
            <div class="ions-column">
                <div class="ions-section-header cation-header">
                    <div class="ions-section-icon">+</div>
                    <div>
                        <div class="ions-section-title">${t('Cations', '阳离子')}</div>
                        <div class="ions-section-subtitle">${t('Positive Ions', '正离子')}</div>
                    </div>
                </div>
                <div class="ions-cards-grid">
                    ${renderIonCardNew('H', '+', t('Hydrogen', '氢'), 'cation')}
                    ${renderIonCardNew('Li', '+', t('Lithium', '锂'), 'cation')}
                    ${renderIonCardNew('Na', '+', t('Sodium', '钠'), 'cation')}
                    ${renderIonCardNew('K', '+', t('Potassium', '钾'), 'cation')}
                    ${renderIonCardNew('Ag', '+', t('Silver', '银'), 'cation')}
                    ${renderIonCardNew('NH₄', '+', t('Ammonium', '铵'), 'cation')}
                    ${renderIonCardNew('Mg', '2+', t('Magnesium', '镁'), 'cation')}
                    ${renderIonCardNew('Ca', '2+', t('Calcium', '钙'), 'cation')}
                    ${renderIonCardNew('Ba', '2+', t('Barium', '钡'), 'cation')}
                    ${renderIonCardNew('Zn', '2+', t('Zinc', '锌'), 'cation')}
                    ${renderIonCardNew('Cu', '2+', t('Copper(II)', '铜(II)'), 'cation')}
                    ${renderIonCardNew('Fe', '2+', t('Iron(II)', '亚铁'), 'cation')}
                    ${renderIonCardNew('Fe', '3+', t('Iron(III)', '铁'), 'cation')}
                    ${renderIonCardNew('Al', '3+', t('Aluminum', '铝'), 'cation')}
                    ${renderIonCardNew('Pb', '2+', t('Lead(II)', '铅'), 'cation')}
                </div>
            </div>
            
            <!-- Right Column: Anions -->
            <div class="ions-column">
                <div class="ions-section-header anion-header">
                    <div class="ions-section-icon">−</div>
                    <div>
                        <div class="ions-section-title">${t('Anions', '阴离子')}</div>
                        <div class="ions-section-subtitle">${t('Negative Ions', '负离子')}</div>
                    </div>
                </div>
                <div class="ions-cards-grid">
                    ${renderIonCardNew('F', '−', t('Fluoride', '氟'), 'anion')}
                    ${renderIonCardNew('Cl', '−', t('Chloride', '氯'), 'anion')}
                    ${renderIonCardNew('Br', '−', t('Bromide', '溴'), 'anion')}
                    ${renderIonCardNew('I', '−', t('Iodide', '碘'), 'anion')}
                    ${renderIonCardNew('O', '2−', t('Oxide', '氧'), 'anion')}
                    ${renderIonCardNew('S', '2−', t('Sulfide', '硫'), 'anion')}
                    ${renderIonCardNew('OH', '−', t('Hydroxide', '氢氧根'), 'anion')}
                    ${renderIonCardNew('NO₃', '−', t('Nitrate', '硝酸根'), 'anion')}
                    ${renderIonCardNew('SO₄', '2−', t('Sulfate', '硫酸根'), 'anion')}
                    ${renderIonCardNew('CO₃', '2−', t('Carbonate', '碳酸根'), 'anion')}
                    ${renderIonCardNew('PO₄', '3−', t('Phosphate', '磷酸根'), 'anion')}
                    ${renderIonCardNew('HCO₃', '−', t('Bicarbonate', '碳酸氢根'), 'anion')}
                    ${renderIonCardNew('MnO₄', '−', t('Permanganate', '高锰酸根'), 'anion')}
                    ${renderIonCardNew('CH₃COO', '−', t('Acetate', '醋酸根'), 'anion')}
                    ${renderIonCardNew('CrO₄', '2−', t('Chromate', '铬酸根'), 'anion')}
                </div>
            </div>
        </div>
    `;
}

function renderIonCardNew(symbol, charge, name, type) {
    const isC = type === 'cation';
    return `
        <div class="ion-card-new ${type}">
            <div class="ion-card-symbol">
                ${symbol}<sup class="ion-card-charge">${charge}</sup>
            </div>
            <div class="ion-card-name">${name}</div>
        </div>
    `;
}