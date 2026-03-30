// ==============================
// ION TEXT REWRITE - FINAL
// Keep your original ionsData above this block
// Then use ionsDataFinal in your UI
// ==============================

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function deepMerge(target, source) {
  for (const key in source) {
    const value = source[key];
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      target[key] &&
      typeof target[key] === "object" &&
      !Array.isArray(target[key])
    ) {
      deepMerge(target[key], value);
    } else {
      target[key] = value;
    }
  }
}

function cleanText(text) {
  if (typeof text !== "string") return text;

  let s = text;

  // keep simple wavelength text before removing brackets
  s = s.replace(/\((\d+\s*nm)\)/g, "$1");

  // source / formation
  s = s.replace(/Group 1 Element - Loss of 1 e⁻/g, "Group 1 atom, loses 1 e⁻");
  s = s.replace(/Group 2 Element - Loss of 2 e⁻/g, "Group 2 atom, loses 2 e⁻");
  s = s.replace(/Group 11 Element - Loss of 1 e⁻/g, "Group 11 atom, loses 1 e⁻");
  s = s.replace(/Group 12 Element - Loss of 2 e⁻/g, "Group 12 atom, loses 2 e⁻");
  s = s.replace(/Group 13 Element - Loss of 3 e⁻/g, "Group 13 atom, loses 3 e⁻");
  s = s.replace(/Group 17 Element - Gain of 1 e⁻/g, "Group 17 atom, gains 1 e⁻");
  s = s.replace(/Group 16 Element - Gain of 2 e⁻/g, "Group 16 atom, gains 2 e⁻");
  s = s.replace(/Group 15 Element - Gain of 3 e⁻/g, "Group 15 atom, gains 3 e⁻");

  // phase cleanup
  s = s.replace(/Aqueous \(aq as H₃O⁺\) - Colorless/g, "Aqueous, colorless");
  s = s.replace(/Aqueous \(aq\) - Colorless/g, "Aqueous, colorless");
  s = s.replace(/Aqueous \(aq\) - Pale Yellow/g, "Aqueous, pale yellow");
  s = s.replace(/Aqueous \(aq\) - Bright Blue/g, "Aqueous, bright blue");
  s = s.replace(/Aqueous \(aq\) - Pale Green/g, "Aqueous, pale green");
  s = s.replace(/Aqueous \(aq\) - Yellow-Brown/g, "Aqueous, yellow-brown");
  s = s.replace(/Aqueous \(aq\) - Bright Purple/g, "Aqueous, bright purple");
  s = s.replace(/Aqueous \(aq\) - Bright Yellow/g, "Aqueous, bright yellow");
  s = s.replace(/Aqueous \(aq\) - Bright Orange/g, "Aqueous, bright orange");
  s = s.replace(/Aqueous \/ Insoluble Solid/g, "Aqueous or insoluble solid");
  s = s.replace(/Aqueous \/ Precipitate/g, "Aqueous or precipitate");
  s = s.replace(/Aqueous \(Unstable\) \/ Solid/g, "Usually unstable in water");
  s = s.replace(/Solid \(White\) \/ Aqueous/g, "Solid or aqueous");
  s = s.replace(/Solid \(in Salts\) - White/g, "Usually solid in salts");
  s = s.replace(/Solid \(in Salts\)/g, "Usually solid in salts");
  s = s.replace(/Solid Oxides \(Reacts in water\)/g, "Usually in solid oxides");

  // simplify old bracket clutter
  s = s.replace(/\(Stable Octet\)/g, "");
  s = s.replace(/\(Stable Duplet\)/g, "");
  s = s.replace(/\(Pseudo-Noble Gas\)/g, "");
  s = s.replace(/\(Full d-shell\)/g, "");
  s = s.replace(/\(Very High\)/g, "");
  s = s.replace(/\(High\)/g, "");
  s = s.replace(/\(Low\)/g, "");
  s = s.replace(/\(Most Stable\)/g, "");
  s = s.replace(/\(Max\)/g, "");
  s = s.replace(/\(Ferrous\)/g, "");
  s = s.replace(/\(Ferric\)/g, "");
  s = s.replace(/\(aq\)/g, "");
  s = s.replace(/\(Ppt\)/g, " precipitate");

  // remove remaining long bracket notes except wavelengths
  s = s.replace(/\((?!\d+\s*nm)[^)]+\)/g, "");

  // punctuation cleanup
  s = s.replace(/\s*;\s*/g, " · ");
  s = s.replace(/ - /g, ", ");
  s = s.replace(/\s*\/\s*/g, " / ");
  s = s.replace(/kJ \/ mol/g, "kJ/mol");
  s = s.replace(/g \/ mol/g, "g/mol");
  s = s.replace(/\s+,/g, ",");
  s = s.replace(/\s{2,}/g, " ");
  s = s.replace(/\s+\./g, ".");
  s = s.trim();
  s = s.replace(/\.$/, "");

  return s;
}

function cleanCustomData(customData) {
  const out = deepClone(customData);

  for (const levelKey of Object.keys(out)) {
    const level = out[levelKey];
    for (const key of Object.keys(level)) {
      if (typeof level[key] === "string") {
        level[key] = cleanText(level[key]);
      } else if (level[key] && typeof level[key] === "object") {
        for (const subKey of Object.keys(level[key])) {
          if (typeof level[key][subKey] === "string") {
            level[key][subKey] = cleanText(level[key][subKey]);
          }
        }
      }
    }
  }

  return out;
}

const ionOverrides = {
  h_plus: {
    customData: {
      level1: {
        source: "Acid in water, proton donor",
        phase: "Aqueous, colorless",
        valence: "No bound electrons",
        keyCompounds: "HCl, H₂SO₄"
      },
      level2: {
        statusBanner: "Defines acidity",
        slotA: {
          desc: "Turns blue paper red"
        },
        slotB: {
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
        namedBy: "Arrhenius acid concept",
        stse: "Acid rain · ocean acidification",
        commonUses: "Acids · batteries",
        hazards: "Strongly corrosive"
      }
    }
  },

  li_plus: {
    customData: {
      level1: {
        valence: "[He]"
      },
      level2: {
        slotA: { desc: "670 nm" },
        slotB: { desc: "In lithium-ion cells" }
      },
      level3: {
        config: "[1s]²",
        oxidation: "+1",
        ionicRadius: "76 pm",
        hydrationEnthalpy: "-519 kJ/mol",
        coordination: "4"
      }
    }
  },

  na_plus: {
    customData: {
      level1: {
        valence: "[Ne]"
      },
      level2: {
        slotA: { desc: "589 nm" }
      },
      level3: {
        config: "[Ne]",
        oxidation: "+1",
        ionicRadius: "102 pm",
        hydrationEnthalpy: "-406 kJ/mol",
        coordination: "6"
      }
    }
  },

  k_plus: {
    customData: {
      level1: {
        valence: "[Ar]"
      },
      level2: {
        slotA: { desc: "766 nm" }
      },
      level3: {
        config: "[Ar]",
        oxidation: "+1",
        ionicRadius: "138 pm",
        hydrationEnthalpy: "-322 kJ/mol",
        coordination: "6-8"
      }
    }
  },

  ag_plus: {
    customData: {
      level1: {
        valence: "Filled d shell"
      },
      level3: {
        config: "[Kr] 4d¹⁰",
        oxidation: "+1",
        ionicRadius: "115 pm",
        hydrationEnthalpy: "-473 kJ/mol",
        coordination: "2"
      }
    }
  },

  mg_2plus: {
    customData: {
      level1: {
        valence: "[Ne]"
      },
      level3: {
        config: "[Ne]",
        oxidation: "+2",
        ionicRadius: "72 pm",
        hydrationEnthalpy: "-1921 kJ/mol",
        coordination: "6"
      }
    }
  },

  ca_2plus: {
    customData: {
      level1: {
        valence: "[Ar]"
      },
      level2: {
        slotA: {
          desc: "Orange-red"
        },
        slotB: {
          label: "BIOLOGICAL ROLE",
          desc: "Bones and shells"
        }
      },
      level3: {
        config: "[Ar]",
        oxidation: "+2",
        ionicRadius: "100 pm",
        hydrationEnthalpy: "-1577 kJ/mol",
        coordination: "6-8"
      }
    }
  },

  ba_2plus: {
    customData: {
      level1: {
        valence: "[Xe]"
      },
      level2: {
        slotA: { desc: "524 nm" },
        slotB: { desc: "X-ray contrast use" }
      },
      level3: {
        config: "[Xe]",
        oxidation: "+2",
        ionicRadius: "135 pm",
        hydrationEnthalpy: "-1305 kJ/mol",
        coordination: "8-12"
      }
    }
  },

  zn_2plus: {
    customData: {
      level1: {
        valence: "Filled d shell"
      },
      level3: {
        config: "[Ar] 3d¹⁰",
        oxidation: "+2",
        ionicRadius: "74 pm",
        hydrationEnthalpy: "-2046 kJ/mol",
        coordination: "4 or 6"
      }
    }
  },

  al_3plus: {
    customData: {
      level1: {
        valence: "[Ne]"
      },
      level3: {
        config: "[Ne]",
        oxidation: "+3",
        ionicRadius: "54 pm",
        hydrationEnthalpy: "-4665 kJ/mol",
        coordination: "6"
      }
    }
  },

  f_minus: {
    customData: {
      level1: {
        valence: "[Ne]"
      },
      level3: {
        config: "[Ne]",
        oxidation: "-1",
        ionicRadius: "133 pm",
        hydrationEnthalpy: "-515 kJ/mol",
        coordination: "4-8"
      }
    }
  },

  cl_minus: {
    customData: {
      level1: {
        valence: "[Ar]"
      },
      level3: {
        config: "[Ar]",
        oxidation: "-1",
        ionicRadius: "181 pm",
        hydrationEnthalpy: "-381 kJ/mol",
        coordination: "6"
      }
    }
  },

  br_minus: {
    customData: {
      level1: {
        valence: "[Kr]"
      },
      level3: {
        config: "[Kr]",
        oxidation: "-1",
        ionicRadius: "196 pm",
        hydrationEnthalpy: "-347 kJ/mol",
        coordination: "6"
      }
    }
  },

  i_minus: {
    customData: {
      level1: {
        valence: "[Xe]"
      },
      level3: {
        config: "[Xe]",
        oxidation: "-1",
        ionicRadius: "220 pm",
        hydrationEnthalpy: "-305 kJ/mol",
        coordination: "6"
      }
    }
  },

  o_2minus: {
    customData: {
      level1: {
        valence: "[Ne]"
      },
      level3: {
        config: "[Ne]",
        oxidation: "-2",
        ionicRadius: "140 pm",
        hydrationEnthalpy: "Reactive in water",
        coordination: "4-6"
      }
    }
  },

  s_2minus: {
    customData: {
      level1: {
        valence: "[Ar]"
      },
      level3: {
        config: "[Ar]",
        oxidation: "-2",
        ionicRadius: "184 pm",
        hydrationEnthalpy: "High",
        coordination: "6"
      }
    }
  },

  n_3minus: {
    customData: {
      level1: {
        valence: "[Ne]"
      },
      level3: {
        config: "[Ne]",
        oxidation: "-3",
        ionicRadius: "146 pm",
        hydrationEnthalpy: "Reactive in water",
        coordination: "4-6"
      }
    }
  },

  p_3minus: {
    customData: {
      level1: {
        valence: "[Ar]"
      },
      level3: {
        config: "[Ar]",
        oxidation: "-3",
        ionicRadius: "212 pm",
        hydrationEnthalpy: "Reactive in water",
        coordination: "4"
      }
    }
  },

  co3_2minus: {
    customData: {
      level1: {
        valence: "Resonance-stabilized"
      }
    }
  },

  c2o4_2minus: {
    customData: {
      level1: {
        valence: "Dicarboxylate ion"
      }
    }
  },

  no3_minus: {
    customData: {
      level1: {
        valence: "Resonance-stabilized"
      }
    }
  },

  no2_minus: {
    customData: {
      level1: {
        valence: "Lone-pair oxyanion"
      }
    }
  },

  so4_2minus: {
    customData: {
      level1: {
        valence: "Resonance-stabilized"
      }
    }
  },

  so3_2minus: {
    customData: {
      level1: {
        valence: "Lone-pair oxyanion"
      }
    }
  },

  po4_3minus: {
    customData: {
      level1: {
        valence: "Resonance-stabilized"
      }
    }
  },

  clo3_minus: {
    customData: {
      level1: {
        valence: "Lone-pair oxyanion"
      }
    }
  },

  clo_minus: {
    customData: {
      level1: {
        valence: "Hypohalite ion"
      }
    }
  },

  clo4_minus: {
    customData: {
      level1: {
        valence: "Resonance-stabilized"
      }
    }
  },

  cu_plus: {
    customData: {
      level1: {
        valence: "Filled d shell"
      },
      level3: {
        config: "[Ar] 3d¹⁰",
        oxidation: "+1",
        ionicRadius: "77 pm",
        hydrationEnthalpy: "-593 kJ/mol",
        coordination: "2"
      }
    }
  },

  cu_2plus: {
    customData: {
      level1: {
        valence: "d⁹ state"
      }
    }
  },

  fe_2plus: {
    customData: {
      level1: {
        valence: "d⁶ state"
      }
    }
  },

  fe_3plus: {
    customData: {
      level1: {
        valence: "d⁵ state"
      }
    }
  },

  pb_2plus: {
    customData: {
      level1: {
        valence: "Inert-pair cation"
      }
    }
  },

  mno4_minus: {
    customData: {
      level1: {
        valence: "Strong oxidizer"
      }
    }
  },

  cro4_2minus: {
    customData: {
      level1: {
        valence: "Resonance-stabilized"
      }
    }
  },

  cr2o7_2minus: {
    customData: {
      level1: {
        valence: "Bridged oxyanion"
      }
    }
  },

  nh4_plus: {
    customData: {
      level1: {
        valence: "Tetrahedral ion"
      },
      level2: {
        statusBanner: "Always soluble"
      },
      level3: {
        config: "Tetrahedral",
        oxidation: "N is -3",
        ionicRadius: "143 pm",
        hydrationEnthalpy: "-307 kJ/mol",
        coordination: "109.5°"
      }
    }
  },

  oh_minus: {
    customData: {
      level1: {
        source: "Water or bases, loses H⁺",
        phase: "Aqueous, colorless",
        valence: "Linear ion"
      },
      level3: {
        config: "Linear",
        oxidation: "O is -2",
        ionicRadius: "137 pm",
        hydrationEnthalpy: "-460 kJ/mol",
        coordination: "180°"
      }
    }
  },

  hco3_minus: {
    customData: {
      level1: {
        valence: "Amphoteric buffer ion"
      },
      level3: {
        config: "Trigonal planar at carbon",
        oxidation: "C is +4",
        ionicRadius: "156 pm",
        hydrationEnthalpy: "-380 kJ/mol",
        coordination: "Planar at carbon"
      }
    }
  },

  hso4_minus: {
    customData: {
      level1: {
        valence: "Acidic sulfate ion"
      },
      level3: {
        config: "Tetrahedral",
        oxidation: "S is +6",
        ionicRadius: "Large oxyanion",
        hydrationEnthalpy: "High",
        coordination: "109.5°"
      }
    }
  },

  h2po4_minus: {
    customData: {
      level1: {
        valence: "Acidic phosphate ion"
      },
      level3: {
        config: "Tetrahedral",
        oxidation: "P is +5",
        ionicRadius: "Large oxyanion",
        hydrationEnthalpy: "High",
        coordination: "109.5°"
      }
    }
  },

  ch3coo_minus: {
    customData: {
      level1: {
        valence: "Resonance-stabilized"
      },
      level2: {
        statusBanner: "Always soluble"
      },
      level3: {
        config: "Planar carboxylate",
        oxidation: "Carboxyl carbon is +3",
        ionicRadius: "162 pm",
        hydrationEnthalpy: "-400 kJ/mol",
        coordination: "Planar carboxylate"
      }
    }
  },

  cn_minus: {
    customData: {
      level1: {
        valence: "Linear pseudo-halide"
      },
      level3: {
        config: "Linear",
        oxidation: "C is +2",
        ionicRadius: "191 pm",
        hydrationEnthalpy: "-350 kJ/mol",
        coordination: "Triple bond, linear"
      }
    }
  }
};

function rewriteIonEntry(ion) {
  const out = deepClone(ion);
  out.customData = cleanCustomData(out.customData);

  if (ionOverrides[out.id]) {
    deepMerge(out, ionOverrides[out.id]);
  }

  if (
    out.customData &&
    out.customData.level2 &&
    out.customData.level2.slotB &&
    out.customData.level2.slotB.label === "STRUCTURE"
  ) {
    out.customData.level2.slotB.label = "BIOLOGICAL ROLE";
  }

  return out;
}

export const ionsDataFinal = ionsData.map(rewriteIonEntry);