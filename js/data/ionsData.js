// =============================================================================
// Ions Data - Cleaned & Final
// Pure static data: ionsData array with all ion definitions
// All text pre-cleaned, no runtime transformation needed
// =============================================================================

export const ionsData = [
  {
    id: "h_plus",
    symbol: "H",
    charge: "+",
    name: "Hydrogen",
    type: "Cation",
    category: "Monatomic",
    colorClass: "alkali-metal",
    section: "basic",
    sectionName: "1. Basic Monatomic",
    group: "basic_cat1",
    groupName: "+1 Cations",
    customData: {
      level1: {
        type: "Cation / Acid",
        source: "Acid in water, proton donor",
        phase: "Aqueous, colorless",
        valence: "No bound electrons",
        keyCompounds: "HCl, H₂SO₄"
      },
      level2: {
        molarMass: "1.008 g/mol",
        subatomic: "1 p⁺ | 0 e⁻",
        statusBanner: "Defines acidity",
        slotA: {
          label: "LITMUS TEST",
          result: "Turns Red",
          desc: "Turns blue paper red"
        },
        slotB: {
          label: "REACTIVITY",
          result: "Fizzes",
          desc: "Reacts with carbonates"
        }
      },
      level3: {
        config: "No electron shell",
        oxidation: "+1 only",
        ionicRadius: "Bare proton",
        hydrationEnthalpy: "-1091 kJ/mol",
        coordination: "Usually as H₃O⁺ in water"
      },
      level4: {
        discoveryYear: "1884",
        discoveredBy: "Svante Arrhenius",
        namedBy: "Arrhenius acid concept",
        stse: "Acid rain · ocean acidification",
        commonUses: "Acids · batteries",
        hazards: "Strongly corrosive"
      }
    }
  },
  {
    id: "li_plus",
    symbol: "Li",
    charge: "+",
    name: "Lithium",
    type: "Cation",
    category: "Monatomic",
    colorClass: "alkali-metal",
    section: "basic",
    sectionName: "1. Basic Monatomic",
    group: "basic_cat1",
    groupName: "+1 Cations",
    customData: {
      level1: {
        type: "Alkali Metal Cation",
        source: "Group 1 atom, loses 1 e⁻",
        phase: "Aqueous, colorless",
        valence: "[He]",
        keyCompounds: "Li-ion, Li₂CO₃"
      },
      level2: {
        molarMass: "6.94 g/mol",
        subatomic: "3 p⁺ | 2 e⁻",
        statusBanner: "Isoelectronic with Helium",
        slotA: {
          label: "FLAME TEST",
          result: "Crimson Red",
          desc: "670 nm"
        },
        slotB: {
          label: "BATTERY FLOW",
          result: "Ion Transport",
          desc: "In lithium-ion cells"
        }
      },
      level3: {
        config: "[1s]²",
        oxidation: "+1",
        ionicRadius: "76 pm",
        hydrationEnthalpy: "-519 kJ/mol",
        coordination: "4"
      },
      level4: {
        discoveryYear: "1817",
        discoveredBy: "Johan August Arfwedson",
        namedBy: "Greek Lithos",
        stse: "EV Revolution · Geopolitics",
        commonUses: "Li-ion Batteries · Medicine",
        hazards: "Toxicity · Corrosive"
      }
    }
  },
  {
    id: "na_plus",
    symbol: "Na",
    charge: "+",
    name: "Sodium",
    type: "Cation",
    category: "Monatomic",
    colorClass: "alkali-metal",
    section: "basic",
    sectionName: "1. Basic Monatomic",
    group: "basic_cat1",
    groupName: "+1 Cations",
    customData: {
      level1: {
        type: "Alkali Metal Cation",
        source: "Group 1 atom, loses 1 e⁻",
        phase: "Aqueous, colorless",
        valence: "[Ne]",
        keyCompounds: "NaCl, Na₂CO₃"
      },
      level2: {
        molarMass: "22.99 g/mol",
        subatomic: "11 p⁺ | 10 e⁻",
        statusBanner: "Always Soluble",
        slotA: {
          label: "FLAME TEST",
          result: "Bright Yellow",
          desc: "589 nm"
        },
        slotB: {
          label: "SOLUBILITY",
          result: "Dissolves",
          desc: "Instantly"
        }
      },
      level3: {
        config: "[Ne]",
        oxidation: "+1",
        ionicRadius: "102 pm",
        hydrationEnthalpy: "-406 kJ/mol",
        coordination: "6"
      },
      level4: {
        discoveryYear: "1807",
        discoveredBy: "Humphry Davy",
        namedBy: "Latin Natrium",
        stse: "Public Health · Road Salt Runoff",
        commonUses: "Nerve Impulses · Street Lights · Food Preservative",
        hazards: "Safe as ion"
      }
    }
  },
  {
    id: "k_plus",
    symbol: "K",
    charge: "+",
    name: "Potassium",
    type: "Cation",
    category: "Monatomic",
    colorClass: "alkali-metal",
    section: "basic",
    sectionName: "1. Basic Monatomic",
    group: "basic_cat1",
    groupName: "+1 Cations",
    customData: {
      level1: {
        type: "Alkali Metal Cation",
        source: "Group 1 atom, loses 1 e⁻",
        phase: "Aqueous, colorless",
        valence: "[Ar]",
        keyCompounds: "KCl, KNO₃"
      },
      level2: {
        molarMass: "39.10 g/mol",
        subatomic: "19 p⁺ | 18 e⁻",
        statusBanner: "Always Soluble",
        slotA: {
          label: "FLAME TEST",
          result: "Lilac / Violet",
          desc: "766 nm"
        },
        slotB: {
          label: "GROWTH",
          result: "Fertilizer Effect",
          desc: "N-P-K Nutrient"
        }
      },
      level3: {
        config: "[Ar]",
        oxidation: "+1",
        ionicRadius: "138 pm",
        hydrationEnthalpy: "-322 kJ/mol",
        coordination: "6-8"
      },
      level4: {
        discoveryYear: "1807",
        discoveredBy: "Humphry Davy",
        namedBy: "Arabic al-qali",
        stse: "Food Security · Radiation",
        commonUses: "N-P-K Fertilizers · Soap · Muscle Function",
        hazards: "Hyperkalemia · Safe in diet"
      }
    }
  },
  {
    id: "ag_plus",
    symbol: "Ag",
    charge: "+",
    name: "Silver",
    type: "Cation",
    category: "Monatomic",
    colorClass: "transition-metal",
    section: "basic",
    sectionName: "1. Basic Monatomic",
    group: "basic_cat1",
    groupName: "+1 Cations",
    customData: {
      level1: {
        type: "Transition Metal Cation",
        source: "Group 11 atom, loses 1 e⁻",
        phase: "Aqueous or precipitate",
        valence: "Filled d shell",
        keyCompounds: "AgNO₃, AgCl"
      },
      level2: {
        molarMass: "107.87 g/mol",
        subatomic: "47 p⁺ | 46 e⁻",
        statusBanner: "Insoluble with Halides",
        slotA: {
          label: "PRECIPITATE",
          result: "White Cloud",
          desc: "w / Cl⁻"
        },
        slotB: {
          label: "PHOTOSENSITIVE",
          result: "Darkens",
          desc: "in Light"
        }
      },
      level3: {
        config: "[Kr] 4d¹⁰",
        oxidation: "+1",
        ionicRadius: "115 pm",
        hydrationEnthalpy: "-473 kJ/mol",
        coordination: "2"
      },
      level4: {
        discoveryYear: "Prehistoric",
        discoveredBy: "Unknown",
        namedBy: "Latin Argentum",
        stse: "Photo-Waste · Nanosilver impact",
        commonUses: "Photography · Wound Care · Electronics",
        hazards: "Toxic to aquatic life · Argyria"
      }
    }
  },
  {
    id: "mg_2plus",
    symbol: "Mg",
    charge: "2+",
    name: "Magnesium",
    type: "Cation",
    category: "Monatomic",
    colorClass: "alkaline-earth",
    section: "basic",
    sectionName: "1. Basic Monatomic",
    group: "basic_cat2",
    groupName: "+2 Cations",
    customData: {
      level1: {
        type: "Alkaline Earth Cation",
        source: "Group 2 atom, loses 2 e⁻",
        phase: "Aqueous, colorless",
        valence: "[Ne]",
        keyCompounds: "MgO, Mg, MgSO₄"
      },
      level2: {
        molarMass: "24.31 g/mol",
        subatomic: "12 p⁺ | 10 e⁻",
        statusBanner: "Insoluble with OH⁻ & CO₃²⁻",
        slotA: {
          label: "PRECIPITATE",
          result: "White Gel",
          desc: "w / Hydroxide"
        },
        slotB: {
          label: "CHLOROPHYLL",
          result: "Central Atom",
          desc: "Power"
        }
      },
      level3: {
        config: "[Ne]",
        oxidation: "+2",
        ionicRadius: "72 pm",
        hydrationEnthalpy: "-1921 kJ/mol",
        coordination: "6"
      },
      level4: {
        discoveryYear: "1808",
        discoveredBy: "Humphry Davy",
        namedBy: "Greek Magnesia",
        stse: "Hard Water Scale · Photosynthesis engine",
        commonUses: "Alloys · Antacids",
        hazards: "Safe"
      }
    }
  },
  {
    id: "ca_2plus",
    symbol: "Ca",
    charge: "2+",
    name: "Calcium",
    type: "Cation",
    category: "Monatomic",
    colorClass: "alkaline-earth",
    section: "basic",
    sectionName: "1. Basic Monatomic",
    group: "basic_cat2",
    groupName: "+2 Cations",
    customData: {
      level1: {
        type: "Alkaline Earth Cation",
        source: "Group 2 atom, loses 2 e⁻",
        phase: "Aqueous, colorless",
        valence: "[Ar]",
        keyCompounds: "CaCO₃, CaCl₂"
      },
      level2: {
        molarMass: "40.08 g/mol",
        subatomic: "20 p⁺ | 18 e⁻",
        statusBanner: "Insoluble with Carbonate",
        slotA: {
          label: "FLAME TEST",
          result: "Brick Red",
          desc: "Orange-red"
        },
        slotB: {
          label: "BIOLOGICAL ROLE",
          result: "Mineralization",
          desc: "Bones and shells"
        }
      },
      level3: {
        config: "[Ar]",
        oxidation: "+2",
        ionicRadius: "100 pm",
        hydrationEnthalpy: "-1577 kJ/mol",
        coordination: "6-8"
      },
      level4: {
        discoveryYear: "1808",
        discoveredBy: "Humphry Davy",
        namedBy: "Latin Calx",
        stse: "Concrete Industry · Ocean Acidification",
        commonUses: "Cement · Ice Melting · Bone Health",
        hazards: "Safe"
      }
    }
  },
  {
    id: "ba_2plus",
    symbol: "Ba",
    charge: "2+",
    name: "Barium",
    type: "Cation",
    category: "Monatomic",
    colorClass: "alkaline-earth",
    section: "basic",
    sectionName: "1. Basic Monatomic",
    group: "basic_cat2",
    groupName: "+2 Cations",
    customData: {
      level1: {
        type: "Heavy Alkaline Earth Cation",
        source: "Group 2 atom, loses 2 e⁻",
        phase: "Aqueous or insoluble solid",
        valence: "[Xe]",
        keyCompounds: "BaSO₄, BaCl₂"
      },
      level2: {
        molarMass: "137.33 g/mol",
        subatomic: "56 p⁺ | 54 e⁻",
        statusBanner: "Insoluble with Sulfate",
        slotA: {
          label: "FLAME TEST",
          result: "Apple Green",
          desc: "524 nm"
        },
        slotB: {
          label: "IMAGING",
          result: "X-Ray Shield",
          desc: "X-ray contrast use"
        }
      },
      level3: {
        config: "[Xe]",
        oxidation: "+2",
        ionicRadius: "135 pm",
        hydrationEnthalpy: "-1305 kJ/mol",
        coordination: "8-12"
      },
      level4: {
        discoveryYear: "1808",
        discoveredBy: "Humphry Davy",
        namedBy: "Greek Barys",
        stse: "Medical Imaging Safety · Drilling Fluids",
        commonUses: "GI Tract X-rays · Fireworks",
        hazards: "Toxic if soluble"
      }
    }
  },
  {
    id: "zn_2plus",
    symbol: "Zn",
    charge: "2+",
    name: "Zinc",
    type: "Cation",
    category: "Monatomic",
    colorClass: "transition-metal",
    section: "basic",
    sectionName: "1. Basic Monatomic",
    group: "basic_cat2",
    groupName: "+2 Cations",
    customData: {
      level1: {
        type: "Transition Metal Cation",
        source: "Group 12 atom, loses 2 e⁻",
        phase: "Aqueous, colorless",
        valence: "Filled d shell",
        keyCompounds: "ZnO, ZnCl₂"
      },
      level2: {
        molarMass: "65.38 g/mol",
        subatomic: "30 p⁺ | 28 e⁻",
        statusBanner: "Amphoteric",
        slotA: {
          label: "PRECIPITATE",
          result: "White Gel",
          desc: ""
        },
        slotB: {
          label: "GALVANIZE",
          result: "Steel Protection",
          desc: "Anti-Corrosion"
        }
      },
      level3: {
        config: "[Ar] 3d¹⁰",
        oxidation: "+2",
        ionicRadius: "74 pm",
        hydrationEnthalpy: "-2046 kJ/mol",
        coordination: "4 or 6"
      },
      level4: {
        discoveryYear: "1746",
        discoveredBy: "Andreas Marggraf",
        namedBy: "German Zink",
        stse: "Corrosion Control · Immune Support",
        commonUses: "Rust Protection · Sunscreen · Alloys",
        hazards: "Metal fume fever"
      }
    }
  },
  {
    id: "al_3plus",
    symbol: "Al",
    charge: "3+",
    name: "Aluminum",
    type: "Cation",
    category: "Monatomic",
    colorClass: "post-transition",
    section: "basic",
    sectionName: "1. Basic Monatomic",
    group: "basic_cat3",
    groupName: "+3 Cations",
    customData: {
      level1: {
        type: "Post-Transition Cation",
        source: "Group 13 atom, loses 3 e⁻",
        phase: "Aqueous, colorless",
        valence: "[Ne]",
        keyCompounds: "Al₂O₃, KAl₂"
      },
      level2: {
        molarMass: "26.98 g/mol",
        subatomic: "13 p⁺ | 10 e⁻",
        statusBanner: "Amphoteric Ppt",
        slotA: {
          label: "OXIDATION",
          result: "Transparent Shield",
          desc: "Al₂O₃ Layer"
        },
        slotB: {
          label: "PRECIPITATE",
          result: "White Gel",
          desc: "Amphoteric"
        }
      },
      level3: {
        config: "[Ne]",
        oxidation: "+3",
        ionicRadius: "54 pm",
        hydrationEnthalpy: "-4665 kJ/mol",
        coordination: "6"
      },
      level4: {
        discoveryYear: "1825",
        discoveredBy: "Hans Christian Oersted",
        namedBy: "Latin Alumen",
        stse: "Recycling Efficiency · Red Mud Waste",
        commonUses: "Aircraft Alloys · Cans · Water Treatment",
        hazards: "Neurotoxicity concerns"
      }
    }
  },
  {
    id: "f_minus",
    symbol: "F",
    charge: "-",
    name: "Fluoride",
    type: "Anion",
    category: "Monatomic",
    colorClass: "halogen",
    section: "basic",
    sectionName: "1. Basic Monatomic",
    group: "basic_an1",
    groupName: "-1 Anions",
    customData: {
      level1: {
        type: "Halogen Anion",
        source: "Group 17 atom, gains 1 e⁻",
        phase: "Aqueous, colorless",
        valence: "[Ne]",
        keyCompounds: "NaF, CaF₂"
      },
      level2: {
        molarMass: "19.00 g/mol",
        subatomic: "9 p⁺ | 10 e⁻",
        statusBanner: "Insoluble with Calcium",
        slotA: {
          label: "PRECIPITATE",
          result: "White Solid",
          desc: "w / Ca²⁺"
        },
        slotB: {
          label: "PROTECTION",
          result: "Hardens Enamel",
          desc: "Cavity Prevention"
        }
      },
      level3: {
        config: "[Ne]",
        oxidation: "-1",
        ionicRadius: "133 pm",
        hydrationEnthalpy: "-515 kJ/mol",
        coordination: "4-8"
      },
      level4: {
        discoveryYear: "1886",
        discoveredBy: "Henri Moissan",
        namedBy: "Latin Fluere",
        stse: "Water Fluoridation debate · Teflon pollution",
        commonUses: "Cavity Prevention · Non-stick pans · Etching",
        hazards: "Toxic at high levels"
      }
    }
  },
  {
    id: "cl_minus",
    symbol: "Cl",
    charge: "-",
    name: "Chloride",
    type: "Anion",
    category: "Monatomic",
    colorClass: "halogen",
    section: "basic",
    sectionName: "1. Basic Monatomic",
    group: "basic_an1",
    groupName: "-1 Anions",
    customData: {
      level1: {
        type: "Halogen Anion",
        source: "Group 17 atom, gains 1 e⁻",
        phase: "Aqueous, colorless",
        valence: "[Ar]",
        keyCompounds: "NaCl, AgCl"
      },
      level2: {
        molarMass: "35.45 g/mol",
        subatomic: "17 p⁺ | 18 e⁻",
        statusBanner: "Insoluble with Silver",
        slotA: {
          label: "PRECIPITATE",
          result: "White Cloud",
          desc: "w / Ag⁺"
        },
        slotB: {
          label: "SANITATION",
          result: "Disinfects Water",
          desc: "Pool & Tap"
        }
      },
      level3: {
        config: "[Ar]",
        oxidation: "-1",
        ionicRadius: "181 pm",
        hydrationEnthalpy: "-381 kJ/mol",
        coordination: "6"
      },
      level4: {
        discoveryYear: "1774",
        discoveredBy: "Carl Wilhelm Scheele",
        namedBy: "Greek Chloros",
        stse: "Sanitation · Road Salt damage",
        commonUses: "Table Salt · Stomach Acid · PVC Plastics",
        hazards: "Safe as ion"
      }
    }
  },
  {
    id: "br_minus",
    symbol: "Br",
    charge: "-",
    name: "Bromide",
    type: "Anion",
    category: "Monatomic",
    colorClass: "halogen",
    section: "basic",
    sectionName: "1. Basic Monatomic",
    group: "basic_an1",
    groupName: "-1 Anions",
    customData: {
      level1: {
        type: "Halogen Anion",
        source: "Group 17 atom, gains 1 e⁻",
        phase: "Aqueous, colorless",
        valence: "[Kr]",
        keyCompounds: "AgBr, NaBr"
      },
      level2: {
        molarMass: "79.90 g/mol",
        subatomic: "35 p⁺ | 36 e⁻",
        statusBanner: "Insoluble with Silver",
        slotA: {
          label: "PRECIPITATE",
          result: "Cream Solid",
          desc: "w / Ag⁺"
        },
        slotB: {
          label: "FIRE STOP",
          result: "Extinguisher",
          desc: "Flame Retardant"
        }
      },
      level3: {
        config: "[Kr]",
        oxidation: "-1",
        ionicRadius: "196 pm",
        hydrationEnthalpy: "-347 kJ/mol",
        coordination: "6"
      },
      level4: {
        discoveryYear: "1826",
        discoveredBy: "Antoine Balard",
        namedBy: "Greek Bromos",
        stse: "Ozone Depletion · Fire Safety",
        commonUses: "Photography · Flame Retardants · Hot Tubs",
        hazards: "Chronic toxicity"
      }
    }
  },
  {
    id: "i_minus",
    symbol: "I",
    charge: "-",
    name: "Iodide",
    type: "Anion",
    category: "Monatomic",
    colorClass: "halogen",
    section: "basic",
    sectionName: "1. Basic Monatomic",
    group: "basic_an1",
    groupName: "-1 Anions",
    customData: {
      level1: {
        type: "Halogen Anion",
        source: "Group 17 atom, gains 1 e⁻",
        phase: "Aqueous, colorless",
        valence: "[Xe]",
        keyCompounds: "KI, PbI₂"
      },
      level2: {
        molarMass: "126.90 g/mol",
        subatomic: "53 p⁺ | 54 e⁻",
        statusBanner: "Insoluble with Pb²⁺",
        slotA: {
          label: "PRECIPITATE",
          result: "Bright Yellow",
          desc: "w / Lead"
        },
        slotB: {
          label: "THYROID",
          result: "Prevents Goiter",
          desc: "Iodized Salt"
        }
      },
      level3: {
        config: "[Xe]",
        oxidation: "-1",
        ionicRadius: "220 pm",
        hydrationEnthalpy: "-305 kJ/mol",
        coordination: "6"
      },
      level4: {
        discoveryYear: "1811",
        discoveredBy: "Bernard Courtois",
        namedBy: "Greek Iodes",
        stse: "Goiter Prevention · Nuclear Safety",
        commonUses: "Iodized Salt · Disinfectant · Cloud Seeding",
        hazards: "Low toxicity"
      }
    }
  },
  {
    id: "o_2minus",
    symbol: "O",
    charge: "2-",
    name: "Oxide",
    type: "Anion",
    category: "Monatomic",
    colorClass: "other-nonmetal",
    section: "basic",
    sectionName: "1. Basic Monatomic",
    group: "basic_an2",
    groupName: "-2 Anions",
    customData: {
      level1: {
        type: "Chalcogen Anion",
        source: "Group 16 atom, gains 2 e⁻",
        phase: "Usually in solid oxides",
        valence: "[Ne]",
        keyCompounds: "MgO, Fe₂O₃, CaO"
      },
      level2: {
        molarMass: "16.00 g/mol",
        subatomic: "8 p⁺ | 10 e⁻",
        statusBanner: "Forms Basic Solution",
        slotA: {
          label: "BASICITY",
          result: "Forms Hydroxide",
          desc: "O²⁻ + H₂O → 2OH⁻"
        },
        slotB: {
          label: "OXIDATION",
          result: "Rusts Iron",
          desc: "Fe₂O₃"
        }
      },
      level3: {
        config: "[Ne]",
        oxidation: "-2",
        ionicRadius: "140 pm",
        hydrationEnthalpy: "Reactive in water",
        coordination: "4-6"
      },
      level4: {
        discoveryYear: "1774",
        discoveredBy: "Priestley / Scheele",
        namedBy: "Greek Oxys",
        stse: "Corrosion Costs · Climate Change",
        commonUses: "Ceramics · Concrete · Ores extraction",
        hazards: "Caustic"
      }
    }
  },
  {
    id: "s_2minus",
    symbol: "S",
    charge: "2-",
    name: "Sulfide",
    type: "Anion",
    category: "Monatomic",
    colorClass: "other-nonmetal",
    section: "basic",
    sectionName: "1. Basic Monatomic",
    group: "basic_an2",
    groupName: "-2 Anions",
    customData: {
      level1: {
        type: "Chalcogen Anion",
        source: "Group 16 atom, gains 2 e⁻",
        phase: "Solid Ores / Aqueous",
        valence: "[Ar]",
        keyCompounds: "H₂S, FeS₂"
      },
      level2: {
        molarMass: "32.06 g/mol",
        subatomic: "16 p⁺ | 18 e⁻",
        statusBanner: "Insoluble Black Ppts",
        slotA: {
          label: "PRECIPITATE",
          result: "Black Solid",
          desc: "w / Metals"
        },
        slotB: {
          label: "ODOR",
          result: "Rotten Eggs",
          desc: "H₂S Gas"
        }
      },
      level3: {
        config: "[Ar]",
        oxidation: "-2",
        ionicRadius: "184 pm",
        hydrationEnthalpy: "High",
        coordination: "6"
      },
      level4: {
        discoveryYear: "Prehistoric",
        discoveredBy: "Unknown",
        namedBy: "Sanskrit Sulvere",
        stse: "Acid Mine Drainage · Geothermal Energy",
        commonUses: "Metal Ores · Paper Industry",
        hazards: "Toxic Gas"
      }
    }
  },
  {
    id: "n_3minus",
    symbol: "N",
    charge: "3-",
    name: "Nitride",
    type: "Anion",
    category: "Monatomic",
    colorClass: "other-nonmetal",
    section: "basic",
    sectionName: "1. Basic Monatomic",
    group: "basic_an3",
    groupName: "-3 Anions",
    customData: {
      level1: {
        type: "Pnictogen Anion",
        source: "Group 15 atom, gains 3 e⁻",
        phase: "Solid",
        valence: "[Ne]",
        keyCompounds: "NH₃, GaN"
      },
      level2: {
        molarMass: "14.01 g/mol",
        subatomic: "7 p⁺ | 10 e⁻",
        statusBanner: "Hydrolyzes to Ammonia",
        slotA: {
          label: "HYDROLYSIS",
          result: "Releases Ammonia",
          desc: "N³⁻ + 3H₂O → NH₃"
        },
        slotB: {
          label: "LED LIGHT",
          result: "Blue Glow",
          desc: "GaN Technology"
        }
      },
      level3: {
        config: "[Ne]",
        oxidation: "-3",
        ionicRadius: "146 pm",
        hydrationEnthalpy: "Reactive in water",
        coordination: "4-6"
      },
      level4: {
        discoveryYear: "1772",
        discoveredBy: "Daniel Rutherford",
        namedBy: "Greek Nitron",
        stse: "Blue LEDs · Airbag Safety",
        commonUses: "Semiconductors · Superhard Coatings",
        hazards: "Reacts violently with water"
      }
    }
  },
  {
    id: "p_3minus",
    symbol: "P",
    charge: "3-",
    name: "Phosphide",
    type: "Anion",
    category: "Monatomic",
    colorClass: "other-nonmetal",
    section: "basic",
    sectionName: "1. Basic Monatomic",
    group: "basic_an3",
    groupName: "-3 Anions",
    customData: {
      level1: {
        type: "Pnictogen Anion",
        source: "Group 15 atom, gains 3 e⁻",
        phase: "Solid",
        valence: "[Ar]",
        keyCompounds: "AlP, InP"
      },
      level2: {
        molarMass: "30.97 g/mol",
        subatomic: "15 p⁺ | 18 e⁻",
        statusBanner: "Releases Toxic Phosphine",
        slotA: {
          label: "TOXIC GAS",
          result: "Phosphine Release",
          desc: "PH₃"
        },
        slotB: {
          label: "ELECTRONIC",
          result: "High Speed Chip",
          desc: "InP Semiconductor"
        }
      },
      level3: {
        config: "[Ar]",
        oxidation: "-3",
        ionicRadius: "212 pm",
        hydrationEnthalpy: "Reactive in water",
        coordination: "4"
      },
      level4: {
        discoveryYear: "1669",
        discoveredBy: "Hennig Brand",
        namedBy: "Greek Phosphoros",
        stse: "Pest Control · E-waste Recycling",
        commonUses: "Semiconductors · Rodenticides",
        hazards: "Highly Toxic Gas"
      }
    }
  },
  {
    id: "co3_2minus",
    symbol: "CO₃",
    charge: "2-",
    name: "Carbonate",
    type: "Anion",
    category: "Polyatomic",
    colorClass: "polyatomic-anion",
    section: "core",
    sectionName: "2. Core Polyatomic",
    group: "core_c",
    groupName: "Carbon (C)",
    customData: {
      level1: {
        type: "Oxyanion",
        source: "Carbonic Acid, Loss of 2 H⁺",
        phase: "Usually solid in salts",
        valence: "Resonance-stabilized",
        keyCompounds: "CaCO₃, Na₂CO₃"
      },
      level2: {
        molarMass: "60.01 g/mol",
        subatomic: "1 C + 3 O | Charge -2",
        statusBanner: "Insoluble",
        slotA: {
          label: "ACID TEST",
          result: "CO₂",
          desc: "Fizzes violently"
        },
        slotB: {
          label: "PRECIPITATE",
          result: "White Solid",
          desc: "w / Ca²⁺"
        }
      },
      level3: {
        config: "Trigonal Planar",
        oxidation: "C is +4",
        ionicRadius: "178 pm",
        hydrationEnthalpy: "-1314 kJ/mol",
        coordination: "Trigonal Planar"
      },
      level4: {
        discoveryYear: "Ancient",
        discoveredBy: "-",
        namedBy: "Latin Carbo",
        stse: "Ocean Acidification · Carbon Cycle · Cement production",
        commonUses: "Antacids · Glass manufacturing · Baking",
        hazards: "Safe"
      }
    }
  },
  {
    id: "c2o4_2minus",
    symbol: "C₂O₄",
    charge: "2-",
    name: "Oxalate",
    type: "Anion",
    category: "Polyatomic",
    colorClass: "polyatomic-anion",
    section: "core",
    sectionName: "2. Core Polyatomic",
    group: "core_c",
    groupName: "Carbon (C)",
    customData: {
      level1: {
        type: "Organic Anion",
        source: "Oxalic Acid, Loss of 2 H⁺",
        phase: "Usually solid in salts",
        valence: "Dicarboxylate ion",
        keyCompounds: "CaC₂O₄, K₂C₂O₄"
      },
      level2: {
        molarMass: "88.02 g/mol",
        subatomic: "2 C + 4 O | Charge -2",
        statusBanner: "Forms Insoluble Calcium Salt",
        slotA: {
          label: "CHELATION",
          result: "Metal Binding",
          desc: "Grabs Metals Tightly"
        },
        slotB: {
          label: "CRYSTALS",
          result: "Needles",
          desc: "Sharp Needles"
        }
      },
      level3: {
        config: "Planar",
        oxidation: "C is +3",
        ionicRadius: "Large planar ion",
        hydrationEnthalpy: "High",
        coordination: "Two Trigonal Planar units"
      },
      level4: {
        discoveryYear: "1776",
        discoveredBy: "Carl Wilhelm Scheele",
        namedBy: "Latin Oxalis",
        stse: "Health · Botany",
        commonUses: "Rust Removers · Bleaching wood",
        hazards: "Toxic"
      }
    }
  },
  {
    id: "no3_minus",
    symbol: "NO₃",
    charge: "-",
    name: "Nitrate",
    type: "Anion",
    category: "Polyatomic",
    colorClass: "polyatomic-anion",
    section: "core",
    sectionName: "2. Core Polyatomic",
    group: "core_n",
    groupName: "Nitrogen (N)",
    customData: {
      level1: {
        type: "Oxyanion",
        source: "Nitric Acid, Loss of 1 H⁺",
        phase: "Aqueous, colorless",
        valence: "Resonance-stabilized",
        keyCompounds: "KNO₃, AgNO₃"
      },
      level2: {
        molarMass: "62.00 g/mol",
        subatomic: "1 N + 3 O | Charge -1",
        statusBanner: "Always Soluble",
        slotA: {
          label: "SOLUBILITY",
          result: "All-Pass",
          desc: "Never Precipitates"
        },
        slotB: {
          label: "EXPLOSIVE",
          result: "Oxidizer",
          desc: "Oxidizes Gunpowder"
        }
      },
      level3: {
        config: "Trigonal Planar",
        oxidation: "N is +5",
        ionicRadius: "179 pm",
        hydrationEnthalpy: "-314 kJ/mol",
        coordination: "Trigonal Planar"
      },
      level4: {
        discoveryYear: "9th Century",
        discoveredBy: "Chinese Alchemists",
        namedBy: "Nitre",
        stse: "Eutrophication · Nitrogen Cycle · Explosives safety",
        commonUses: "Fertilizers · Gunpowder · Meat curing",
        hazards: "Runoff pollutes water · Strong Oxidizer"
      }
    }
  },
  {
    id: "no2_minus",
    symbol: "NO₂",
    charge: "-",
    name: "Nitrite",
    type: "Anion",
    category: "Polyatomic",
    colorClass: "polyatomic-anion",
    section: "core",
    sectionName: "2. Core Polyatomic",
    group: "core_n",
    groupName: "Nitrogen (N)",
    customData: {
      level1: {
        type: "Oxyanion",
        source: "Nitrous Acid, Loss of 1 H⁺",
        phase: "Aqueous, pale yellow",
        valence: "Lone-pair oxyanion",
        keyCompounds: "NaNO₂, KNO₂"
      },
      level2: {
        molarMass: "46.01 g/mol",
        subatomic: "1 N + 2 O | Charge -1",
        statusBanner: "Toxic at high levels",
        slotA: {
          label: "PRESERVE",
          result: "Antimicrobial",
          desc: "Keeps Meat Red"
        },
        slotB: {
          label: "BENT SHAPE",
          result: "Lone Pair",
          desc: "Lone Pair Repulsion"
        }
      },
      level3: {
        config: "Bent",
        oxidation: "N is +3",
        ionicRadius: "192 pm",
        hydrationEnthalpy: "-410 kJ/mol",
        coordination: "Bent"
      },
      level4: {
        discoveryYear: "Industrial Era",
        discoveredBy: "-",
        namedBy: "Greek Nitron",
        stse: "Food Safety · Blue Baby Syndrome",
        commonUses: "Cured Meat Preservative · Dyes",
        hazards: "Toxic"
      }
    }
  },
  {
    id: "so4_2minus",
    symbol: "SO₄",
    charge: "2-",
    name: "Sulfate",
    type: "Anion",
    category: "Polyatomic",
    colorClass: "polyatomic-anion",
    section: "core",
    sectionName: "2. Core Polyatomic",
    group: "core_s",
    groupName: "Sulfur (S)",
    customData: {
      level1: {
        type: "Oxyanion",
        source: "Sulfuric Acid, Loss of 2 H⁺",
        phase: "Aqueous, colorless",
        valence: "Resonance-stabilized",
        keyCompounds: "H₂SO₄, CaSO₄⋅2H₂O"
      },
      level2: {
        molarMass: "96.06 g/mol",
        subatomic: "1 S + 4 O | Charge -2",
        statusBanner: "Insoluble with Barium / Lead",
        slotA: {
          label: "PRECIPITATE",
          result: "BaSO₄",
          desc: "Thick White w / Ba²⁺"
        },
        slotB: {
          label: "POWER",
          result: "Electrolyte",
          desc: "Lead-Acid Battery"
        }
      },
      level3: {
        config: "Tetrahedral",
        oxidation: "S is +6",
        ionicRadius: "242 pm",
        hydrationEnthalpy: "-1059 kJ/mol",
        coordination: "Tetrahedral"
      },
      level4: {
        discoveryYear: "8th Century",
        discoveredBy: "Jabir ibn Hayyan",
        namedBy: "Vitriol",
        stse: "Acid Rain · Battery Recycling",
        commonUses: "Car Batteries · Plaster of Paris · Alum",
        hazards: "Acid rain precursor"
      }
    }
  },
  {
    id: "so3_2minus",
    symbol: "SO₃",
    charge: "2-",
    name: "Sulfite",
    type: "Anion",
    category: "Polyatomic",
    colorClass: "polyatomic-anion",
    section: "core",
    sectionName: "2. Core Polyatomic",
    group: "core_s",
    groupName: "Sulfur (S)",
    customData: {
      level1: {
        type: "Oxyanion",
        source: "Sulfurous Acid",
        phase: "Aqueous, colorless",
        valence: "Lone-pair oxyanion",
        keyCompounds: "Na₂SO₃, MgSO₃"
      },
      level2: {
        molarMass: "80.06 g/mol",
        subatomic: "1 S + 3 O | Charge -2",
        statusBanner: "Reducing Agent / Bleach",
        slotA: {
          label: "BLEACHING",
          result: "Deodorize",
          desc: "Turns Paper White"
        },
        slotB: {
          label: "PUNGENT",
          result: "SO₂ Gas",
          desc: "Rotten Smell"
        }
      },
      level3: {
        config: "Trigonal Pyramidal",
        oxidation: "S is +4",
        ionicRadius: "Large",
        hydrationEnthalpy: "-1300 kJ/mol",
        coordination: "Trigonal Pyramidal"
      },
      level4: {
        discoveryYear: "Ancient",
        discoveredBy: "",
        namedBy: "Sulfur",
        stse: "Wine Allergies · Acid Rain source",
        commonUses: "Wine Preservative · Paper Bleaching",
        hazards: "Asthma trigger · Toxic gas release"
      }
    }
  },
  {
    id: "po4_3minus",
    symbol: "PO₄",
    charge: "3-",
    name: "Phosphate",
    type: "Anion",
    category: "Polyatomic",
    colorClass: "polyatomic-anion",
    section: "core",
    sectionName: "2. Core Polyatomic",
    group: "core_p",
    groupName: "Phosphorus (P)",
    customData: {
      level1: {
        type: "Oxyanion",
        source: "Phosphoric Acid, Loss of 3 H⁺",
        phase: "Solid / Aqueous",
        valence: "Resonance-stabilized",
        keyCompounds: "Ca₃₂, ATP"
      },
      level2: {
        molarMass: "94.97 g/mol",
        subatomic: "1 P + 4 O | Charge -3",
        statusBanner: "Insoluble except Group 1",
        slotA: {
          label: "PRECIPITATE",
          result: "Yellow",
          desc: "Yellow w / Silver"
        },
        slotB: {
          label: "LIFE",
          result: "Backbone",
          desc: "DNA Backbone"
        }
      },
      level3: {
        config: "Tetrahedral",
        oxidation: "P is +5",
        ionicRadius: "238 pm",
        hydrationEnthalpy: "-2765 kJ/mol",
        coordination: "Tetrahedral"
      },
      level4: {
        discoveryYear: "1669",
        discoveredBy: "Hennig Brand",
        namedBy: "Greek Phosphoros",
        stse: "Eutrophication · Phosphorus Shortage",
        commonUses: "Fertilizers · Cola · Detergents",
        hazards: "Water pollution"
      }
    }
  },
  {
    id: "clo3_minus",
    symbol: "ClO₃",
    charge: "-",
    name: "Chlorate",
    type: "Anion",
    category: "Polyatomic",
    colorClass: "halogen",
    section: "core",
    sectionName: "2. Core Polyatomic",
    group: "core_cl",
    groupName: "Chlorine (Cl)",
    customData: {
      level1: {
        type: "Halogen Oxyanion",
        source: "Chloric Acid",
        phase: "Aqueous, colorless",
        valence: "Lone-pair oxyanion",
        keyCompounds: "KClO₃, NaClO₃"
      },
      level2: {
        molarMass: "83.45 g/mol",
        subatomic: "1 Cl + 3 O | Charge -1",
        statusBanner: "Strong Oxidizer",
        slotA: {
          label: "EXPLOSION",
          result: "Oxidizer",
          desc: "Oxidizer for Color"
        },
        slotB: {
          label: "HERBICIDE",
          result: "Defoliant",
          desc: "Kills Weeds"
        }
      },
      level3: {
        config: "Trigonal Pyramidal",
        oxidation: "Cl is +5",
        ionicRadius: "171 pm",
        hydrationEnthalpy: "Low",
        coordination: "Trigonal Pyramidal"
      },
      level4: {
        discoveryYear: "1786",
        discoveredBy: "Claude Louis Berthollet",
        namedBy: "Chlorine",
        stse: "Safety · Agriculture",
        commonUses: "Fireworks · Oxygen candles",
        hazards: "Fire / Explosion risk with organics"
      }
    }
  },
  {
    id: "clo_minus",
    symbol: "ClO",
    charge: "-",
    name: "Hypochlorite",
    type: "Anion",
    category: "Polyatomic",
    colorClass: "halogen",
    section: "core",
    sectionName: "2. Core Polyatomic",
    group: "core_cl",
    groupName: "Chlorine (Cl)",
    customData: {
      level1: {
        type: "Halogen Oxyanion",
        source: "Bleach",
        phase: "Aqueous, pale yellow",
        valence: "Hypohalite ion",
        keyCompounds: "NaClO, Ca₂"
      },
      level2: {
        molarMass: "51.45 g/mol",
        subatomic: "1 Cl + 1 O | Charge -1",
        statusBanner: "Bleaching Agent",
        slotA: {
          label: "WHITENING",
          result: "Oxidation",
          desc: "Removes Stains"
        },
        slotB: {
          label: "DISINFECT",
          result: "Sterilize",
          desc: "Kills Germs"
        }
      },
      level3: {
        config: "Linear",
        oxidation: "Cl is +1",
        ionicRadius: "150 pm",
        hydrationEnthalpy: "-350 kJ/mol",
        coordination: "Linear"
      },
      level4: {
        discoveryYear: "1789",
        discoveredBy: "Berthollet",
        namedBy: "Greek Hypo",
        stse: "Public Health · Hygiene",
        commonUses: "Household Bleach · Pool Sanitation",
        hazards: "Toxic Gas if mixed with acid / ammonia"
      }
    }
  },
  {
    id: "clo4_minus",
    symbol: "ClO₄",
    charge: "-",
    name: "Perchlorate",
    type: "Anion",
    category: "Polyatomic",
    colorClass: "halogen",
    section: "core",
    sectionName: "2. Core Polyatomic",
    group: "core_cl",
    groupName: "Chlorine (Cl)",
    customData: {
      level1: {
        type: "Halogen Oxyanion",
        source: "Perchloric Acid",
        phase: "Solid",
        valence: "Resonance-stabilized",
        keyCompounds: "NH₄ClO₄, KClO₄"
      },
      level2: {
        molarMass: "99.45 g/mol",
        subatomic: "1 Cl + 4 O | Charge -1",
        statusBanner: "Rocket Fuel Oxidizer",
        slotA: {
          label: "LAUNCH",
          result: "Propellant",
          desc: "Solid Booster Fuel"
        },
        slotB: {
          label: "MARS SOIL",
          result: "Martian Soil",
          desc: "Found on Mars"
        }
      },
      level3: {
        config: "Tetrahedral",
        oxidation: "Cl is +7",
        ionicRadius: "240 pm",
        hydrationEnthalpy: "Low",
        coordination: "Tetrahedral"
      },
      level4: {
        discoveryYear: "1816",
        discoveredBy: "Friedrich von Stadion",
        namedBy: "Greek Hyper",
        stse: "Space Exploration · Groundwater pollution · Thyroid health",
        commonUses: "Rocket Propellant · Airbag inflators",
        hazards: "Explosion risk · Thyroid toxin"
      }
    }
  },
  {
    id: "cu_plus",
    symbol: "Cu",
    charge: "+",
    name: "Copper(I)",
    type: "Cation",
    category: "Monatomic",
    colorClass: "transition-metal",
    section: "trans",
    sectionName: "3. Transition Metals",
    group: "trans_cu",
    groupName: "Copper (Cu)",
    customData: {
      level1: {
        type: "Transition Metal Cation",
        source: "Group 11 atom, loses 1 e⁻",
        phase: "Usually unstable in water",
        valence: "Filled d shell",
        keyCompounds: "Cu₂O, CuCl"
      },
      level2: {
        molarMass: "63.55 g/mol",
        subatomic: "29 p⁺ | 28 e⁻",
        statusBanner: "Soft Lewis Acid",
        slotA: {
          label: "COLORLESS",
          result: "Clear",
          desc: "Clear in pure Water"
        },
        slotB: {
          label: "DISPROPORTION",
          result: "Unstable",
          desc: "2Cu⁺ ➔ Cu²⁺ + Cu"
        }
      },
      level3: {
        config: "[Ar] 3d¹⁰",
        oxidation: "+1",
        ionicRadius: "77 pm",
        hydrationEnthalpy: "-593 kJ/mol",
        coordination: "2"
      },
      level4: {
        discoveryYear: "Prehistoric",
        discoveredBy: "Unknown",
        namedBy: "Latin Cuprum",
        stse: "Ancient Metallurgy · Biological Electron Transfer",
        commonUses: "Catalysis · Dyeing Process · Pesticides",
        hazards: "Toxic to aquatic life"
      }
    }
  },
  {
    id: "cu_2plus",
    symbol: "Cu",
    charge: "2+",
    name: "Copper(II)",
    type: "Cation",
    category: "Monatomic",
    colorClass: "transition-metal",
    section: "trans",
    sectionName: "3. Transition Metals",
    group: "trans_cu",
    groupName: "Copper (Cu)",
    customData: {
      level1: {
        type: "Transition Metal Cation",
        source: "Group 11 Element, Loss of 2 e⁻",
        phase: "Aqueous, bright blue",
        valence: "d⁹ state",
        keyCompounds: "CuSO₄, CuCO₃"
      },
      level2: {
        molarMass: "63.55 g/mol",
        subatomic: "29 p⁺ | 27 e⁻",
        statusBanner: "Paramagnetic",
        slotA: {
          label: "COLOR",
          result: "Bright Blue",
          desc: "Bright Cyan / Blue Solution"
        },
        slotB: {
          label: "FLAME TEST",
          result: "Blue-Green",
          desc: "Blue-Green Flame"
        }
      },
      level3: {
        config: "[Ar] 3d⁹",
        oxidation: "+2",
        ionicRadius: "73 pm",
        hydrationEnthalpy: "-2100 kJ/mol",
        coordination: "6"
      },
      level4: {
        discoveryYear: "Prehistoric",
        discoveredBy: "Unknown",
        namedBy: "Latin Cuprum",
        stse: "Electronics · Bordeaux Mixture",
        commonUses: "Electroplating · Pigments · Wood Preservative",
        hazards: "Corrosive · Harmful if swallowed"
      }
    }
  },
  {
    id: "fe_2plus",
    symbol: "Fe",
    charge: "2+",
    name: "Iron(II)",
    type: "Cation",
    category: "Monatomic",
    colorClass: "transition-metal",
    section: "trans",
    sectionName: "3. Transition Metals",
    group: "trans_fe",
    groupName: "Iron (Fe)",
    customData: {
      level1: {
        type: "Transition Metal Cation",
        source: "Group 8 Element, Loss of 2 e⁻",
        phase: "Aqueous, pale green",
        valence: "d⁶ state",
        keyCompounds: "FeSO₄, FeCl₂"
      },
      level2: {
        molarMass: "55.85 g/mol",
        subatomic: "26 p⁺ | 24 e⁻",
        statusBanner: "Oxygen Carrier in Blood",
        slotA: {
          label: "HEMOGLOBIN",
          result: "O₂ Binding",
          desc: "Binds Oxygen in Lungs"
        },
        slotB: {
          label: "PRECIPITATE",
          result: "Dirty Green",
          desc: "Dirty Green w / OH⁻"
        }
      },
      level3: {
        config: "[Ar] 3d⁶",
        oxidation: "+2",
        ionicRadius: "78 pm",
        hydrationEnthalpy: "-1920 kJ/mol",
        coordination: "6"
      },
      level4: {
        discoveryYear: "Prehistoric",
        discoveredBy: "Various Cultures",
        namedBy: "Latin Ferrum",
        stse: "Iron Deficiency Anemia · Biological Redox",
        commonUses: "Nutritional Supplements · Water Treatment",
        hazards: "Acute iron overdose is toxic"
      }
    }
  },
  {
    id: "fe_3plus",
    symbol: "Fe",
    charge: "3+",
    name: "Iron(III)",
    type: "Cation",
    category: "Monatomic",
    colorClass: "transition-metal",
    section: "trans",
    sectionName: "3. Transition Metals",
    group: "trans_fe",
    groupName: "Iron (Fe)",
    customData: {
      level1: {
        type: "Transition Metal Cation",
        source: "Group 8 Element, Loss of 3 e⁻",
        phase: "Aqueous, Yellow / Brown",
        valence: "d⁵ state",
        keyCompounds: "FeCl₃, Fe₂O₃"
      },
      level2: {
        molarMass: "55.85 g/mol",
        subatomic: "26 p⁺ | 23 e⁻",
        statusBanner: "Very High Charge Density",
        slotA: {
          label: "RUST",
          result: "Oxidation",
          desc: "Corroded Iron Surface"
        },
        slotB: {
          label: "PRECIPITATE",
          result: "Red-Brown",
          desc: "Red-Brown Gel w / OH⁻"
        }
      },
      level3: {
        config: "[Ar] 3d⁵",
        oxidation: "+3",
        ionicRadius: "64.5 pm",
        hydrationEnthalpy: "-4430 kJ/mol",
        coordination: "6"
      },
      level4: {
        discoveryYear: "Prehistoric",
        discoveredBy: "Various Cultures",
        namedBy: "Latin Ferrum",
        stse: "Acid Mine Drainage · Corrosion",
        commonUses: "Sewage Treatment · Ink Making",
        hazards: "Corrosive · Causes staining"
      }
    }
  },
  {
    id: "pb_2plus",
    symbol: "Pb",
    charge: "2+",
    name: "Lead(II)",
    type: "Cation",
    category: "Monatomic",
    colorClass: "post-transition",
    section: "trans",
    sectionName: "3. Transition Metals",
    group: "trans_pb",
    groupName: "Lead (Pb)",
    customData: {
      level1: {
        type: "Post-Transition Cation",
        source: "Group 14 Element, Loss of 6s² outer pair",
        phase: "Aqueous, colorless",
        valence: "Inert-pair cation",
        keyCompounds: "PbI₂, PbSO₄"
      },
      level2: {
        molarMass: "207.2 g/mol",
        subatomic: "82 p⁺ | 80 e⁻",
        statusBanner: "Heavy Metal Toxin",
        slotA: {
          label: "PRECIPITATE",
          result: "Golden Rain",
          desc: "Golden Rain w / Iodide"
        },
        slotB: {
          label: "STORAGE",
          result: "Battery",
          desc: "Lead-Acid Accumulator"
        }
      },
      level3: {
        config: "[Xe] 4f¹⁴ 5d¹⁰ 6s²",
        oxidation: "+2",
        ionicRadius: "119 pm",
        hydrationEnthalpy: "-1481 kJ/mol",
        coordination: "6-12"
      },
      level4: {
        discoveryYear: "Ancient",
        discoveredBy: "Unknown",
        namedBy: "Latin Plumbum",
        stse: "Flint Water Crisis · Leaded Petrol History",
        commonUses: "Car Batteries · Radiation Shielding",
        hazards: "Neurotoxic · Bioaccumulative"
      }
    }
  },
  {
    id: "mno4_minus",
    symbol: "MnO₄",
    charge: "-",
    name: "Permanganate",
    type: "Anion",
    category: "Polyatomic",
    colorClass: "transition-metal",
    section: "trans",
    sectionName: "3. Transition Metals",
    group: "trans_mn",
    groupName: "Manganese (Mn)",
    customData: {
      level1: {
        type: "Transition Metal Oxyanion",
        source: "Manganese in +7 state",
        phase: "Aqueous, Deep Purple",
        valence: "Strong oxidizer",
        keyCompounds: "KMnO₄"
      },
      level2: {
        molarMass: "118.94 g/mol",
        subatomic: "1 Mn + 4 O | -1",
        statusBanner: "Ultimate Oxidizing Agent",
        slotA: {
          label: "DEEP PURPLE",
          result: "Intense",
          desc: "Intense Color even at 1ppm"
        },
        slotB: {
          label: "OXIDIZER",
          result: "Reactive",
          desc: "Ignites Glycerin instantly"
        }
      },
      level3: {
        config: "Tetrahedral",
        oxidation: "Mn is +7",
        ionicRadius: "240 pm",
        hydrationEnthalpy: "High",
        coordination: "Tetrahedral"
      },
      level4: {
        discoveryYear: "1774",
        discoveredBy: "Scheele / Gahn",
        namedBy: "Latin Magnes",
        stse: "Water Purification · Antiseptic",
        commonUses: "Lab Titrations · Disinfectant · Fruit Preservation",
        hazards: "Potent Oxidizer · Stains skin brown"
      }
    }
  },
  {
    id: "cro4_2minus",
    symbol: "CrO₄",
    charge: "2-",
    name: "Chromate",
    type: "Anion",
    category: "Polyatomic",
    colorClass: "transition-metal",
    section: "trans",
    sectionName: "3. Transition Metals",
    group: "trans_cr",
    groupName: "Chromium (Cr)",
    customData: {
      level1: {
        type: "Transition Metal Oxyanion",
        source: "Chromium in +6 state",
        phase: "Aqueous, bright yellow",
        valence: "Resonance-stabilized",
        keyCompounds: "K₂CrO₄, PbCrO₄"
      },
      level2: {
        molarMass: "116.00 g/mol",
        subatomic: "1 Cr + 4 O | -2",
        statusBanner: "Carcinogenic / Yellow Pigment",
        slotA: {
          label: "PIGMENT",
          result: "Yellow",
          desc: "Classic Chrome Yellow"
        },
        slotB: {
          label: "pH SENSITIVE",
          result: "Equilibrium",
          desc: "Turns Orange in Acid"
        }
      },
      level3: {
        config: "Tetrahedral",
        oxidation: "Cr is +6",
        ionicRadius: "242 pm",
        hydrationEnthalpy: "-1000 kJ/mol",
        coordination: "Tetrahedral"
      },
      level4: {
        discoveryYear: "1797",
        discoveredBy: "Louis Nicolas Vauquelin",
        namedBy: "Greek Chroma",
        stse: "Soil Pollution · Chrome Plating Waste",
        commonUses: "Corrosion Inhibitor · Yellow Dye / Ink",
        hazards: "Carcinogenic"
      }
    }
  },
  {
    id: "cr2o7_2minus",
    symbol: "Cr₂O₇",
    charge: "2-",
    name: "Dichromate",
    type: "Anion",
    category: "Polyatomic",
    colorClass: "transition-metal",
    section: "trans",
    sectionName: "3. Transition Metals",
    group: "trans_cr",
    groupName: "Chromium (Cr)",
    customData: {
      level1: {
        type: "Transition Metal Oxyanion",
        source: "Two Chromate units",
        phase: "Aqueous, bright orange",
        valence: "Bridged oxyanion",
        keyCompounds: "K₂Cr₂O₇, ₂Cr₂O₇"
      },
      level2: {
        molarMass: "216.00 g/mol",
        subatomic: "2 Cr + 7 O | -2",
        statusBanner: "Powerful Lab Oxidizer",
        slotA: {
          label: "THERMAL",
          result: "Volcano",
          desc: "Green Cr₂O₃ \"Ash\""
        },
        slotB: {
          label: "TITRATION",
          result: "Redox",
          desc: "Classic Orange-to-Green"
        }
      },
      level3: {
        config: "Two corners-shared Tetrahedra",
        oxidation: "Cr is +6",
        ionicRadius: "Large Dimeric Ion",
        hydrationEnthalpy: "High",
        coordination: "Cr-O-Cr bridge"
      },
      level4: {
        discoveryYear: "1797",
        discoveredBy: "Vauquelin",
        namedBy: "Greek Di + Chroma",
        stse: "Breathalyzer Tests · Leather Tanning",
        commonUses: "Cleaning Glassware · Photo-engraving",
        hazards: "Highly Toxic · Carcinogenic · Oxidizer"
      }
    }
  },
  {
    id: "nh4_plus",
    symbol: "NH₄",
    charge: "+",
    name: "Ammonium",
    type: "Cation",
    category: "Polyatomic",
    colorClass: "polyatomic-cation",
    section: "special",
    sectionName: "4. Special & Organic",
    group: "spec_pair",
    groupName: "Special Pair",
    customData: {
      level1: {
        type: "Polyatomic Cation",
        source: "Ammonia, Gain of 1 H⁺",
        phase: "Aqueous, colorless",
        valence: "Tetrahedral ion",
        keyCompounds: "NH₄NO₃, NH₄Cl"
      },
      level2: {
        molarMass: "18.04 g/mol",
        subatomic: "1 N + 4 H | Charge +1",
        statusBanner: "Always soluble",
        slotA: {
          label: "SMELL",
          result: "Releases Ammonia w / Base",
          desc: "NaOH Test"
        },
        slotB: {
          label: "GROWTH",
          result: "Nitrogen Source",
          desc: "Fertilizer"
        }
      },
      level3: {
        config: "Tetrahedral",
        oxidation: "N is -3",
        ionicRadius: "143 pm",
        hydrationEnthalpy: "-307 kJ/mol",
        coordination: "109.5°"
      },
      level4: {
        discoveryYear: "Ancient",
        discoveredBy: "Various",
        namedBy: "From Temple of Ammon",
        stse: "Global Food Security · Nitrogen Cycle",
        commonUses: "Fertilizers · Smelling Salts · Explosives",
        hazards: "Releases toxic ammonia gas"
      }
    }
  },
  {
    id: "oh_minus",
    symbol: "OH",
    charge: "-",
    name: "Hydroxide",
    type: "Anion",
    category: "Polyatomic",
    colorClass: "polyatomic-anion",
    section: "special",
    sectionName: "4. Special & Organic",
    group: "spec_pair",
    groupName: "Special Pair",
    customData: {
      level1: {
        type: "Polyatomic Anion / Base",
        source: "Water or bases, loses H⁺",
        phase: "Aqueous, colorless",
        valence: "Linear ion",
        keyCompounds: "NaOH, Ca₂"
      },
      level2: {
        molarMass: "17.01 g/mol",
        subatomic: "1 O + 1 H | Charge -1",
        statusBanner: "The Definition of Basicity",
        slotA: {
          label: "LITMUS TEST",
          result: "Turns Red Paper Blue",
          desc: "pH > 7"
        },
        slotB: {
          label: "SLIPPERY",
          result: "Saponifies Skin Oils",
          desc: "Soap-like Feel"
        }
      },
      level3: {
        config: "Linear",
        oxidation: "O is -2",
        ionicRadius: "137 pm",
        hydrationEnthalpy: "-460 kJ/mol",
        coordination: "180°"
      },
      level4: {
        discoveryYear: "Ancient",
        discoveredBy: "Various",
        namedBy: "Greek Hydro + Oxys",
        stse: "Soap Production · Acid Neutralization",
        commonUses: "Drain Cleaner · Soap · Antacids",
        hazards: "**Corrosive** · Blindness risk"
      }
    }
  },
  {
    id: "hco3_minus",
    symbol: "HCO₃",
    charge: "-",
    name: "Bicarbonate",
    type: "Anion",
    category: "Polyatomic",
    colorClass: "polyatomic-anion",
    section: "special",
    sectionName: "4. Special & Organic",
    group: "spec_acid",
    groupName: "Acidic Radicals",
    customData: {
      level1: {
        type: "Amphoteric Oxyanion",
        source: "Carbonic Acid, Loss of 1 H⁺",
        phase: "Solid or aqueous",
        valence: "Amphoteric buffer ion",
        keyCompounds: "NaHCO₃, KHCO₃"
      },
      level2: {
        molarMass: "61.02 g/mol",
        subatomic: "1 C + 3 O + 1 H | Charge -1",
        statusBanner: "Amphoteric",
        slotA: {
          label: "BUFFER",
          result: "Resists pH Change",
          desc: "Blood pH 7.4"
        },
        slotB: {
          label: "FIZZ",
          result: "Releases CO₂ w / Acid",
          desc: "Baking Soda"
        }
      },
      level3: {
        config: "Trigonal planar at carbon",
        oxidation: "C is +4",
        ionicRadius: "156 pm",
        hydrationEnthalpy: "-380 kJ/mol",
        coordination: "Planar at carbon"
      },
      level4: {
        discoveryYear: "1801",
        discoveredBy: "Valentin Rose",
        namedBy: "Prefix Bi-",
        stse: "Blood pH Buffer · Ocean Carbon Sink",
        commonUses: "Baking · Antacids · Fire Extinguishers",
        hazards: "Safe"
      }
    }
  },
  {
    id: "hso4_minus",
    symbol: "HSO₄",
    charge: "-",
    name: "Bisulfate",
    type: "Anion",
    category: "Polyatomic",
    colorClass: "polyatomic-anion",
    section: "special",
    sectionName: "4. Special & Organic",
    group: "spec_acid",
    groupName: "Acidic Radicals",
    customData: {
      level1: {
        type: "Acidic Oxyanion",
        source: "Sulfuric Acid, Loss of 1 H⁺",
        phase: "Solid or aqueous",
        valence: "Acidic sulfate ion",
        keyCompounds: "NaHSO₄"
      },
      level2: {
        molarMass: "97.07 g/mol",
        subatomic: "1 S + 4 O + 1 H | Charge -1",
        statusBanner: "Strong Acidic Salt",
        slotA: {
          label: "ACIDIC",
          result: "Turns Blue Paper Red",
          desc: "pH < 1"
        },
        slotB: {
          label: "CLEANING",
          result: "Dissolves Scale",
          desc: "Toilet Cleaner"
        }
      },
      level3: {
        config: "Tetrahedral",
        oxidation: "S is +6",
        ionicRadius: "Large oxyanion",
        hydrationEnthalpy: "High",
        coordination: "109.5°"
      },
      level4: {
        discoveryYear: "Industrial Era",
        discoveredBy: "Various",
        namedBy: "From Sulfuric Acid",
        stse: "Industrial pH control · Cleaning agents safety",
        commonUses: "Toilet Bowl Cleaners · Swimming Pool pH Lowering",
        hazards: "Corrosive"
      }
    }
  },
  {
    id: "h2po4_minus",
    symbol: "H₂PO₄",
    charge: "-",
    name: "Dihydrogen phosphate",
    type: "Anion",
    category: "Polyatomic",
    colorClass: "polyatomic-anion",
    section: "special",
    sectionName: "4. Special & Organic",
    group: "spec_acid",
    groupName: "Acidic Radicals",
    customData: {
      level1: {
        type: "Acidic Oxyanion",
        source: "Phosphoric Acid, Loss of 1 H⁺",
        phase: "Solid / Aqueous",
        valence: "Acidic phosphate ion",
        keyCompounds: "Ca₂"
      },
      level2: {
        molarMass: "96.99 g/mol",
        subatomic: "1 P + 4 O + 2 H | Charge -1",
        statusBanner: "Soluble Fertilizer",
        slotA: {
          label: "ROOTS",
          result: "Promotes Root Growth",
          desc: "N-P-K Fertilizer"
        },
        slotB: {
          label: "SOLUBILITY",
          result: "Soluble w / Calcium",
          desc: "Superphosphate"
        }
      },
      level3: {
        config: "Tetrahedral",
        oxidation: "P is +5",
        ionicRadius: "Large oxyanion",
        hydrationEnthalpy: "High",
        coordination: "109.5°"
      },
      level4: {
        discoveryYear: "1840s",
        discoveredBy: "Lawes",
        namedBy: "From Phosphate",
        stse: "Green Revolution · Eutrophication",
        commonUses: "Superphosphate Fertilizers · Baking Powder · Buffers",
        hazards: "Eye irritant · Water pollution"
      }
    }
  },
  {
    id: "ch3coo_minus",
    symbol: "CH₃COO",
    charge: "-",
    name: "Acetate",
    type: "Anion",
    category: "Polyatomic",
    colorClass: "polyatomic-anion",
    section: "special",
    sectionName: "4. Special & Organic",
    group: "spec_org",
    groupName: "Organic/Other",
    customData: {
      level1: {
        type: "Organic Anion",
        source: "Vinegar, Loss of 1 H⁺",
        phase: "Aqueous, colorless",
        valence: "Resonance-stabilized",
        keyCompounds: "CH₃COONa, Vinegar"
      },
      level2: {
        molarMass: "59.04 g/mol",
        subatomic: "2 C + 2 O + 3 H | Charge -1",
        statusBanner: "Always soluble",
        slotA: {
          label: "VINEGAR",
          result: "Pungent Smell",
          desc: "CH₃COOH"
        },
        slotB: {
          label: "HOT ICE",
          result: "Exothermic Crystallization",
          desc: "Sodium Acetate"
        }
      },
      level3: {
        config: "Planar carboxylate",
        oxidation: "Carboxyl carbon is +3",
        ionicRadius: "162 pm",
        hydrationEnthalpy: "-400 kJ/mol",
        coordination: "Planar carboxylate"
      },
      level4: {
        discoveryYear: "Ancient",
        discoveredBy: "Various",
        namedBy: "Latin Acetum",
        stse: "Fermentation · Biodegradable Plastics",
        commonUses: "Vinegar · Hand Warmers · Textiles",
        hazards: "Concentrated acid is corrosive"
      }
    }
  },
  {
    id: "cn_minus",
    symbol: "CN",
    charge: "-",
    name: "Cyanide",
    type: "Anion",
    category: "Polyatomic",
    colorClass: "polyatomic-anion",
    section: "special",
    sectionName: "4. Special & Organic",
    group: "spec_org",
    groupName: "Organic/Other",
    customData: {
      level1: {
        type: "Toxic Pseudo-Halogen",
        source: "Prussic Acid, Loss of 1 H⁺",
        phase: "Aqueous, colorless",
        valence: "Linear pseudo-halide",
        keyCompounds: "NaCN, KCN"
      },
      level2: {
        molarMass: "26.02 g/mol",
        subatomic: "1 C + 1 N | Charge -1",
        statusBanner: "Extreme Toxin",
        slotA: {
          label: "TOXICITY",
          result: "Stops Cell Respiration",
          desc: "Blocks Cytochrome"
        },
        slotB: {
          label: "LEACHING",
          result: "Dissolves Gold",
          desc: "Au₂⁻ Complex"
        }
      },
      level3: {
        config: "Linear",
        oxidation: "C is +2",
        ionicRadius: "191 pm",
        hydrationEnthalpy: "-350 kJ/mol",
        coordination: "Triple bond, linear"
      },
      level4: {
        discoveryYear: "1782",
        discoveredBy: "Scheele",
        namedBy: "Greek Kyanos",
        stse: "Mining Ethics · Environmental Contamination",
        commonUses: "Gold Extraction · Electroplating",
        hazards: "**Lethal**"
      }
    }
  }
];
