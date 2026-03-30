// Electron affinity added for educational display.
// Source strategy: broad table values from PeriodicTable.com / Wolfram ElementData; missing values kept as N/A.

export const finallyData = {
  "1": {
    "id": 1,
    "symbol": "H",
    "name": "Hydrogen",
    "level1_basic": {
      "type": "Other nonmetal",
      "group": 1,
      "period": "1",
      "phaseAtSTP": "Gas",
      "valenceElectrons": "1",
      "commonIons": "H⁺ (Hydrogen ion), H⁻ (Hydride)"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "1.008",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 1,
      "electronsNeutral": 1,
      "naturalIsotopes": [
        {
          "name": "H-1",
          "neutron": "0n",
          "percent": "Stable (99.98%)"
        },
        {
          "name": "H-2",
          "neutron": "1n",
          "percent": "Stable (0.02%)"
        },
        {
          "name": "H-3",
          "neutron": "2n",
          "percent": "Radioactive (trace)"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "1s¹",
        "oxidationStates": {
          "common": [
            "+1",
            "-1"
          ],
          "possible": [
            "0"
          ]
        }
      },
      "physical": {
        "electronegativity": 2.2,
        "firstIonization": "1312 kJ/mol",
        "density": "0.08988 g/L",
        "meltingPoint": "-259.16°C",
        "boilingPoint": "-252.87°C",
        "electronAffinity": "72.8 kJ/mol",
        "atomicRadius": "53 pm",
        "specificHeat": "14.3000 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1766",
        "discoveredBy": "Henry Cavendish",
        "namedBy": "Antoine Lavoisier"
      },
      "stseContext": [
        "Energy transition (Fuel Cells)",
        "Hydrogen as energy carrier",
        "Heavy Water (D₂O) in CANDU reactors"
      ],
      "commonUses": [
        "Ammonia Production",
        "Hydrogenation"
      ],
      "hazards": [
        "Highly flammable",
        "Explosion risk"
      ]
    }
  },
  "2": {
    "id": 2,
    "symbol": "He",
    "name": "Helium",
    "level1_basic": {
      "type": "Noble Gas",
      "group": 18,
      "period": "1",
      "phaseAtSTP": "Gas",
      "valenceElectrons": "2",
      "commonIons": "No common ions",
      "commonOxidationStates": "0"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "4.0026",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 2,
      "electronsNeutral": 2,
      "naturalIsotopes": [
        {
          "name": "He-3",
          "neutron": "1n",
          "percent": "Stable (0.0001%)"
        },
        {
          "name": "He-4",
          "neutron": "2n",
          "percent": "Stable (99.9999%)"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "1s²",
        "oxidationStates": {
          "common": [
            "0"
          ],
          "possible": []
        }
      },
      "physical": {
        "electronegativity": null,
        "firstIonization": "2372 kJ/mol",
        "density": "0.1786 g/L",
        "meltingPoint": "0.95 K (at 2.5 MPa)",
        "boilingPoint": "-268.93°C",
        "electronAffinity": "N/A",
        "atomicRadius": "31 pm",
        "specificHeat": "5.1931 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1868 (spectral); 1895 (isolated)",
        "discoveredBy": "William Ramsay, Per Teodor Cleve",
        "namedBy": "Lockyer & Frankland"
      },
      "stseContext": [
        "Cryogenics (MRI supermagnets)",
        "Non-renewable resource conservation"
      ],
      "commonUses": [
        "MRI cooling",
        "Lifting gas (balloons)",
        "Shielding gas (welding)"
      ],
      "hazards": [
        "Asphyxiant in confined spaces"
      ]
    }
  },
  "3": {
    "id": 3,
    "symbol": "Li",
    "name": "Lithium",
    "level1_basic": {
      "type": "Alkali Metal",
      "group": 1,
      "period": "2",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "1",
      "commonIons": "Li⁺ (Lithium)"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "6.941",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 3,
      "electronsNeutral": 3,
      "naturalIsotopes": [
        {
          "name": "Li-6",
          "neutron": "3n",
          "percent": "Stable (7.6%)"
        },
        {
          "name": "Li-7",
          "neutron": "4n",
          "percent": "Stable (92.4%)"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[He] 2s¹",
        "oxidationStates": {
          "common": [
            "+1"
          ],
          "possible": []
        }
      },
      "physical": {
        "electronegativity": 0.98,
        "firstIonization": "520 kJ/mol",
        "density": "0.534 g/cm³",
        "meltingPoint": "180.5°C",
        "boilingPoint": "1342°C",
        "electronAffinity": "59.6 kJ/mol",
        "atomicRadius": "167 pm",
        "specificHeat": "3.5700 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1817",
        "discoveredBy": "Johan August Arfwedson",
        "namedBy": "Jöns Jakob Berzelius"
      },
      "stseContext": [
        "Battery technology (EV revolution)",
        "Mental health (Mood stabilizers)"
      ],
      "commonUses": [
        "Li-ion batteries",
        "Ceramics",
        "Lubricants"
      ],
      "hazards": [
        "Reacts vigorously with water",
        "Corrosive"
      ]
    }
  },
  "4": {
    "id": 4,
    "symbol": "Be",
    "name": "Beryllium",
    "level1_basic": {
      "type": "Alkaline Earth Metal",
      "group": 2,
      "period": "2",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "2",
      "commonIons": "Be²⁺ (Beryllium)"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "9.0122",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 4,
      "electronsNeutral": 4,
      "naturalIsotopes": [
        {
          "name": "Be-9",
          "neutron": "5n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[He] 2s²",
        "oxidationStates": {
          "common": [
            "+2"
          ],
          "possible": []
        }
      },
      "physical": {
        "electronegativity": 1.57,
        "firstIonization": "900 kJ/mol",
        "density": "1.85 g/cm³",
        "meltingPoint": "1287°C",
        "boilingPoint": "2469°C",
        "electronAffinity": "N/A",
        "atomicRadius": "112 pm",
        "specificHeat": "1.8200 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1798",
        "discoveredBy": "Louis-Nicolas Vauquelin",
        "namedBy": "Friedrich Wöhler"
      },
      "stseContext": [
        "Aerospace engineering (James Webb Telescope mirrors)",
        "Nuclear physics (Neutron reflector)"
      ],
      "commonUses": [
        "X-ray windows",
        "Non-sparking tools (alloys)"
      ],
      "hazards": [
        "Highly toxic (Berylliosis)",
        "Carcinogenic"
      ]
    }
  },
  "5": {
    "id": 5,
    "symbol": "B",
    "name": "Boron",
    "level1_basic": {
      "type": "Metalloid",
      "group": 13,
      "period": "2",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "3",
      "commonIons": "No common ions",
      "commonOxidationStates": "+3"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "10.81",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 5,
      "electronsNeutral": 5,
      "naturalIsotopes": [
        {
          "name": "B-10",
          "neutron": "5n",
          "percent": "Stable (19.9%)"
        },
        {
          "name": "B-11",
          "neutron": "6n",
          "percent": "Stable (80.1%)"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[He] 2s² 2p¹",
        "oxidationStates": {
          "common": [
            "+3"
          ],
          "possible": [
            "+1",
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 2.04,
        "firstIonization": "801 kJ/mol",
        "density": "2.34 g/cm³",
        "meltingPoint": "2076°C",
        "boilingPoint": "3927°C",
        "electronAffinity": "26.7 kJ/mol",
        "atomicRadius": "87 pm",
        "specificHeat": "1.0300 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1808",
        "discoveredBy": "Gay-Lussac & Thénard (and Davy)",
        "namedBy": "Derived from \"Borax\""
      },
      "stseContext": [
        "Agriculture (Essential plant nutrient)",
        "Nuclear safety (Control rods)"
      ],
      "commonUses": [
        "Pyrex glass (Borosilicate)",
        "Fiberglass",
        "Detergents"
      ],
      "hazards": [
        "Low toxicity as element",
        "some compounds toxic"
      ]
    },
    "chemistryNotes": "Boron does not form a simple B³⁺ ion in solution. Its chemistry is dominated by covalent bonding, particularly in borates (BO₃³⁻, B₄O₇²⁻) and boron hydrides."
  },
  "6": {
    "id": 6,
    "symbol": "C",
    "name": "Carbon",
    "level1_basic": {
      "type": "Other nonmetal",
      "group": 14,
      "period": "2",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "4",
      "commonIons": "No common ions",
      "commonOxidationStates": "-4, +4"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "12.011",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 6,
      "electronsNeutral": 6,
      "naturalIsotopes": [
        {
          "name": "C-12",
          "neutron": "6n",
          "percent": "Stable (98.9%)"
        },
        {
          "name": "C-13",
          "neutron": "7n",
          "percent": "Stable (1.1%)"
        },
        {
          "name": "C-14",
          "neutron": "8n",
          "percent": "Radioactive (trace)"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[He] 2s² 2p²",
        "oxidationStates": {
          "common": [
            "-4",
            "+4"
          ],
          "possible": [
            "-3",
            "-2",
            "-1",
            "+1",
            "+2",
            "+3"
          ]
        }
      },
      "physical": {
        "electronegativity": 2.55,
        "firstIonization": "1086 kJ/mol",
        "density": "2.26 g/cm³ (graphite)",
        "meltingPoint": "~3642°C (sublimes)",
        "boilingPoint": "N/A",
        "electronAffinity": "153.9 kJ/mol",
        "atomicRadius": "67 pm",
        "specificHeat": "0.7100 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "Prehistoric",
        "discoveredBy": "Ancient Civilizations",
        "namedBy": "Antoine Lavoisier"
      },
      "stseContext": [
        "Climate Change (Carbon Cycle)",
        "Organic Chemistry (Basis of Life)",
        "Radiocarbon dating"
      ],
      "commonUses": [
        "Steel manufacturing",
        "Filters",
        "Gemstones",
        "Fuels"
      ],
      "hazards": [
        "CO/CO₂ from combustion",
        "dust inhalation"
      ]
    },
    "chemistryNotes": "Carbon does not form simple monatomic ions. C⁴⁻ (methanide) occurs only in a few ionic carbides (e.g., Al₄C₃). Carbon chemistry is overwhelmingly covalent."
  },
  "7": {
    "id": 7,
    "symbol": "N",
    "name": "Nitrogen",
    "level1_basic": {
      "type": "Other nonmetal",
      "group": 15,
      "period": "2",
      "phaseAtSTP": "Gas",
      "valenceElectrons": "5",
      "commonIons": "N³⁻ (Nitride)"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "14.007",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 7,
      "electronsNeutral": 7,
      "naturalIsotopes": [
        {
          "name": "N-14",
          "neutron": "7n",
          "percent": "Stable"
        },
        {
          "name": "N-15",
          "neutron": "8n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[He] 2s² 2p³",
        "oxidationStates": {
          "common": [
            "-3",
            "+3",
            "+5"
          ],
          "possible": [
            "+1",
            "+2",
            "+4"
          ]
        }
      },
      "physical": {
        "electronegativity": 3.04,
        "firstIonization": "1402 kJ/mol",
        "density": "1.251 g/L",
        "meltingPoint": "-210.0°C",
        "boilingPoint": "-195.79°C",
        "electronAffinity": "7 kJ/mol",
        "atomicRadius": "56 pm",
        "specificHeat": "1.0400 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1772",
        "discoveredBy": "Daniel Rutherford",
        "namedBy": "Jean-Antoine Chaptal"
      },
      "stseContext": [
        "Agriculture (Haber-Bosch Process/Fertilizers)",
        "Cryogenics (Liquid N₂)"
      ],
      "commonUses": [
        "Fertilizers",
        "Explosives",
        "Food packaging (inert atmosphere)"
      ],
      "hazards": [
        "Asphyxiant (displaces oxygen)"
      ]
    }
  },
  "8": {
    "id": 8,
    "symbol": "O",
    "name": "Oxygen",
    "level1_basic": {
      "type": "Other nonmetal",
      "group": 16,
      "period": "2",
      "phaseAtSTP": "Gas",
      "valenceElectrons": "6",
      "commonIons": "O²⁻ (Oxide)"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "15.999",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 8,
      "electronsNeutral": 8,
      "naturalIsotopes": [
        {
          "name": "O-16",
          "neutron": "8n",
          "percent": "Stable (99.76%)"
        },
        {
          "name": "O-17",
          "neutron": "9n",
          "percent": "Stable (0.04%)"
        },
        {
          "name": "O-18",
          "neutron": "10n",
          "percent": "Stable (0.20%)"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[He] 2s² 2p⁴",
        "oxidationStates": {
          "common": [
            "-2"
          ],
          "possible": [
            "-1",
            "0",
            "+1",
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 3.44,
        "firstIonization": "1314 kJ/mol",
        "density": "1.429 g/L",
        "meltingPoint": "-218.79°C",
        "boilingPoint": "-182.96°C",
        "electronAffinity": "141 kJ/mol",
        "atomicRadius": "48 pm",
        "specificHeat": "0.9190 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1774",
        "discoveredBy": "Joseph Priestley / Carl Wilhelm Scheele",
        "namedBy": "Antoine Lavoisier"
      },
      "stseContext": [
        "Biological respiration",
        "Combustion engines",
        "Ozone layer protection"
      ],
      "commonUses": [
        "Steel making",
        "Medical life support",
        "Water treatment"
      ],
      "hazards": [
        "Oxidizer (accelerates fire)"
      ]
    }
  },
  "9": {
    "id": 9,
    "symbol": "F",
    "name": "Fluorine",
    "level1_basic": {
      "type": "Halogen",
      "group": 17,
      "period": "2",
      "phaseAtSTP": "Gas",
      "valenceElectrons": "7",
      "commonIons": "F⁻ (Fluoride)"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "18.998",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 9,
      "electronsNeutral": 9,
      "naturalIsotopes": [
        {
          "name": "F-19",
          "neutron": "10n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[He] 2s² 2p⁵",
        "oxidationStates": {
          "common": [
            "-1"
          ],
          "possible": []
        }
      },
      "physical": {
        "electronegativity": 3.98,
        "firstIonization": "1681 kJ/mol",
        "density": "1.696 g/L",
        "meltingPoint": "-219.67°C",
        "boilingPoint": "-188.11°C",
        "electronAffinity": "328 kJ/mol",
        "atomicRadius": "42 pm",
        "specificHeat": "N/A"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1886",
        "discoveredBy": "Henri Moissan",
        "namedBy": "Humphry Davy (suggested)"
      },
      "stseContext": [
        "Dental health (Water fluoridation)",
        "Nuclear fuel (UF₆ enrichment)"
      ],
      "commonUses": [
        "Teflon (PTFE)",
        "Toothpaste",
        "Refrigerants"
      ],
      "hazards": [
        "Highly toxic",
        "Corrosive",
        "Reacts with almost everything"
      ]
    }
  },
  "10": {
    "id": 10,
    "symbol": "Ne",
    "name": "Neon",
    "level1_basic": {
      "type": "Noble Gas",
      "group": 18,
      "period": "2",
      "phaseAtSTP": "Gas",
      "valenceElectrons": "8",
      "commonIons": "No common ions",
      "commonOxidationStates": "0"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "20.180",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 10,
      "electronsNeutral": 10,
      "naturalIsotopes": [
        {
          "name": "Ne-20",
          "neutron": "10n",
          "percent": "Stable (90.5%)"
        },
        {
          "name": "Ne-21",
          "neutron": "11n",
          "percent": "Stable (0.27%)"
        },
        {
          "name": "Ne-22",
          "neutron": "12n",
          "percent": "Stable (9.25%)"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[He] 2s² 2p⁶",
        "oxidationStates": {
          "common": [
            "0"
          ],
          "possible": []
        }
      },
      "physical": {
        "electronegativity": null,
        "firstIonization": "2080 kJ/mol",
        "density": "0.9002 g/L",
        "meltingPoint": "-248.59°C",
        "boilingPoint": "-246.05°C",
        "electronAffinity": "N/A",
        "atomicRadius": "38 pm",
        "specificHeat": "1.0300 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1898",
        "discoveredBy": "William Ramsay & Morris Travers",
        "namedBy": "Ramsay (from Greek neos)"
      },
      "stseContext": [
        "Lighting technology",
        "Lasers"
      ],
      "commonUses": [
        "Neon signs",
        "High-voltage indicators",
        "Cryogenics"
      ],
      "hazards": [
        "Asphyxiant"
      ]
    }
  },
  "11": {
    "id": 11,
    "symbol": "Na",
    "name": "Sodium",
    "level1_basic": {
      "type": "Alkali Metal",
      "group": 1,
      "period": "3",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "1",
      "commonIons": "Na⁺ (Sodium)"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "22.990",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 11,
      "electronsNeutral": 11,
      "naturalIsotopes": [
        {
          "name": "Na-23",
          "neutron": "12n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Ne] 3s¹",
        "oxidationStates": {
          "common": [
            "+1"
          ],
          "possible": []
        }
      },
      "physical": {
        "electronegativity": 0.93,
        "firstIonization": "496 kJ/mol",
        "density": "0.968 g/cm³",
        "meltingPoint": "97.79°C",
        "boilingPoint": "883°C",
        "electronAffinity": "52.8 kJ/mol",
        "atomicRadius": "190 pm",
        "specificHeat": "1.2300 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1807",
        "discoveredBy": "Humphry Davy",
        "namedBy": "Humphry Davy"
      },
      "stseContext": [
        "Human biology (Nerve impulses)",
        "Nuclear reactors (Coolant in fast breeders)"
      ],
      "commonUses": [
        "Table salt (NaCl)",
        "Street lights",
        "Soap making"
      ],
      "hazards": [
        "Reacts violently with water"
      ]
    }
  },
  "12": {
    "id": 12,
    "symbol": "Mg",
    "name": "Magnesium",
    "level1_basic": {
      "type": "Alkaline Earth Metal",
      "group": 2,
      "period": "3",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "2",
      "commonIons": "Mg²⁺ (Magnesium)"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "24.305",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 12,
      "electronsNeutral": 12,
      "naturalIsotopes": [
        {
          "name": "Mg-24",
          "neutron": "12n",
          "percent": "Stable (78.99%)"
        },
        {
          "name": "Mg-25",
          "neutron": "13n",
          "percent": "Stable (10.00%)"
        },
        {
          "name": "Mg-26",
          "neutron": "14n",
          "percent": "Stable (11.01%)"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Ne] 3s²",
        "oxidationStates": {
          "common": [
            "+2"
          ],
          "possible": []
        }
      },
      "physical": {
        "electronegativity": 1.31,
        "firstIonization": "738 kJ/mol",
        "density": "1.74 g/cm³",
        "meltingPoint": "650°C",
        "boilingPoint": "1090°C",
        "electronAffinity": "N/A",
        "atomicRadius": "145 pm",
        "specificHeat": "1.0200 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1755 (Identified); 1808 (Isolated)",
        "discoveredBy": "Joseph Black (Id.); Humphry Davy (Iso.)",
        "namedBy": "Derived from Magnesia district"
      },
      "stseContext": [
        "Biological photosynthesis (Chlorophyll center)",
        "Lightweight alloys"
      ],
      "commonUses": [
        "Aerospace alloys",
        "Flares/Fireworks",
        "Antacids"
      ],
      "hazards": [
        "Flammable (metal fire difficult to extinguish)"
      ]
    }
  },
  "13": {
    "id": 13,
    "symbol": "Al",
    "name": "Aluminum",
    "level1_basic": {
      "type": "Post-transition Metal",
      "group": 13,
      "period": "3",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "3",
      "commonIons": "Al³⁺ (Aluminum)"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "26.982",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 13,
      "electronsNeutral": 13,
      "naturalIsotopes": [
        {
          "name": "Al-27",
          "neutron": "14n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Ne] 3s² 3p¹",
        "oxidationStates": {
          "common": [
            "+3"
          ],
          "possible": [
            "+1"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.61,
        "firstIonization": "578 kJ/mol",
        "density": "2.70 g/cm³",
        "meltingPoint": "660.3°C",
        "boilingPoint": "2519°C",
        "electronAffinity": "42.5 kJ/mol",
        "atomicRadius": "118 pm",
        "specificHeat": "0.8970 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1825",
        "discoveredBy": "Hans Christian Ørsted",
        "namedBy": "Humphry Davy"
      },
      "stseContext": [
        "Recycling (Infinite recyclability)",
        "Transportation efficiency (Lightweighting)"
      ],
      "commonUses": [
        "Aircraft structures",
        "Cans/Foil",
        "Power lines"
      ],
      "hazards": [
        "Dust is flammable/explosive"
      ]
    }
  },
  "14": {
    "id": 14,
    "symbol": "Si",
    "name": "Silicon",
    "level1_basic": {
      "type": "Metalloid",
      "group": 14,
      "period": "3",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "4",
      "commonIons": "No common ions",
      "commonOxidationStates": "-4, +4"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "28.085",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 14,
      "electronsNeutral": 14,
      "naturalIsotopes": [
        {
          "name": "Si-28",
          "neutron": "14n",
          "percent": "Stable"
        },
        {
          "name": "Si-29",
          "neutron": "15n",
          "percent": "Stable"
        },
        {
          "name": "Si-30",
          "neutron": "16n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Ne] 3s² 3p²",
        "oxidationStates": {
          "common": [
            "-4",
            "+4"
          ],
          "possible": [
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.9,
        "firstIonization": "787 kJ/mol",
        "density": "2.33 g/cm³",
        "meltingPoint": "1414°C",
        "boilingPoint": "3265°C",
        "electronAffinity": "133.6 kJ/mol",
        "atomicRadius": "111 pm",
        "specificHeat": "0.7050 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1824",
        "discoveredBy": "Jöns Jakob Berzelius",
        "namedBy": "Thomas Thomson"
      },
      "stseContext": [
        "The Digital Age (Semiconductors/Microchips)",
        "Solar energy (Photovoltaics)"
      ],
      "commonUses": [
        "Electronics",
        "Glass/Concrete (as Silicates)",
        "Silicones"
      ],
      "hazards": [
        "Silicosis (chronic dust inhalation)"
      ]
    },
    "chemistryNotes": "Silicon does not form simple Si⁴⁻ or Si⁴⁺ ions. Its chemistry is dominated by covalent bonds, especially in silicates (SiO₄⁴⁻) and silicones."
  },
  "15": {
    "id": 15,
    "symbol": "P",
    "name": "Phosphorus",
    "level1_basic": {
      "type": "Other nonmetal",
      "group": 15,
      "period": "3",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "5",
      "commonIons": "P³⁻ (Phosphide)"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "30.974",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 15,
      "electronsNeutral": 15,
      "naturalIsotopes": [
        {
          "name": "P-31",
          "neutron": "16n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Ne] 3s² 3p³",
        "oxidationStates": {
          "common": [
            "-3",
            "+3",
            "+5"
          ],
          "possible": []
        }
      },
      "physical": {
        "electronegativity": 2.19,
        "firstIonization": "1012 kJ/mol",
        "density": "1.82 g/cm³ (phosphorus)",
        "meltingPoint": "44.15°C (phosphorus)",
        "boilingPoint": "280.5°C (phosphorus)",
        "electronAffinity": "71 kJ/mol",
        "atomicRadius": "98 pm",
        "specificHeat": "0.7690 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1669",
        "discoveredBy": "Hennig Brand",
        "namedBy": "Derived from Greek Light-bearing"
      },
      "stseContext": [
        "Agriculture (Essential fertilizer)",
        "Biology (DNA backbone/ATP)",
        "Eutrophication"
      ],
      "commonUses": [
        "Fertilizers",
        "Matchboxes (Red P)",
        "Steel production"
      ],
      "hazards": [
        "P allotrope is highly toxic and pyrophoric (ignites in air)"
      ]
    }
  },
  "16": {
    "id": 16,
    "symbol": "S",
    "name": "Sulfur",
    "level1_basic": {
      "type": "Other nonmetal",
      "group": 16,
      "period": "3",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "6",
      "commonIons": "S²⁻ (Sulfide)"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "32.06",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 16,
      "electronsNeutral": 16,
      "naturalIsotopes": [
        {
          "name": "S-32",
          "neutron": "16n",
          "percent": "Stable"
        },
        {
          "name": "S-33",
          "neutron": "17n",
          "percent": "Stable"
        },
        {
          "name": "S-34",
          "neutron": "18n",
          "percent": "Stable"
        },
        {
          "name": "S-36",
          "neutron": "20n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Ne] 3s² 3p⁴",
        "oxidationStates": {
          "common": [
            "-2",
            "+4",
            "+6"
          ],
          "possible": [
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 2.58,
        "firstIonization": "1000 kJ/mol",
        "density": "2.07 g/cm³",
        "meltingPoint": "115.2°C",
        "boilingPoint": "444.6°C",
        "electronAffinity": "200 kJ/mol",
        "atomicRadius": "88 pm",
        "specificHeat": "0.7050 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "Prehistoric",
        "discoveredBy": "Ancient Civilizations",
        "namedBy": "Antoine Lavoisier (established as element)"
      },
      "stseContext": [
        "Industrial Chemistry (Sulfuric acid production)",
        "Environmental Science (Acid Rain/SO₂)"
      ],
      "commonUses": [
        "Fertilizers",
        "Gunpowder",
        "Vulcanization of rubber"
      ],
      "hazards": [
        "SO₂ gas is toxic and corrosive"
      ]
    }
  },
  "17": {
    "id": 17,
    "symbol": "Cl",
    "name": "Chlorine",
    "level1_basic": {
      "type": "Halogen",
      "group": 17,
      "period": "3",
      "phaseAtSTP": "Gas",
      "valenceElectrons": "7",
      "commonIons": "Cl⁻ (Chloride)"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "35.45",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 17,
      "electronsNeutral": 17,
      "naturalIsotopes": [
        {
          "name": "Cl-35",
          "neutron": "18n",
          "percent": "Stable (75.8%)"
        },
        {
          "name": "Cl-37",
          "neutron": "20n",
          "percent": "Stable (24.2%)"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Ne] 3s² 3p⁵",
        "oxidationStates": {
          "common": [
            "-1",
            "+1",
            "+5",
            "+7"
          ],
          "possible": [
            "+3"
          ]
        }
      },
      "physical": {
        "electronegativity": 3.16,
        "firstIonization": "1251 kJ/mol",
        "density": "3.21 g/L",
        "meltingPoint": "-101.5°C",
        "boilingPoint": "-34.0°C",
        "electronAffinity": "349 kJ/mol",
        "atomicRadius": "79 pm",
        "specificHeat": "0.4782 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1774",
        "discoveredBy": "Carl Wilhelm Scheele",
        "namedBy": "Humphry Davy (from Greek chloros)"
      },
      "stseContext": [
        "Public Health (Water chlorination/Disinfection)",
        "Chemical Warfare (WWI Choking gas)"
      ],
      "commonUses": [
        "PVC (Plastics)",
        "Bleach",
        "Water purification"
      ],
      "hazards": [
        "Highly toxic gas",
        "Pulmonary irritant"
      ]
    }
  },
  "18": {
    "id": 18,
    "symbol": "Ar",
    "name": "Argon",
    "level1_basic": {
      "type": "Noble Gas",
      "group": 18,
      "period": "3",
      "phaseAtSTP": "Gas",
      "valenceElectrons": "8",
      "commonIons": "No common ions",
      "commonOxidationStates": "0"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "39.948",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 18,
      "electronsNeutral": 18,
      "naturalIsotopes": [
        {
          "name": "Ar-36",
          "neutron": "18n",
          "percent": "Stable (0.334%)"
        },
        {
          "name": "Ar-38",
          "neutron": "20n",
          "percent": "Stable (0.063%)"
        },
        {
          "name": "Ar-40",
          "neutron": "22n",
          "percent": "Stable (99.60%)"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Ne] 3s² 3p⁶",
        "oxidationStates": {
          "common": [
            "0"
          ],
          "possible": []
        }
      },
      "physical": {
        "electronegativity": null,
        "firstIonization": "1521 kJ/mol",
        "density": "1.78 g/L",
        "meltingPoint": "-189.4°C",
        "boilingPoint": "-185.8°C",
        "electronAffinity": "N/A",
        "atomicRadius": "71 pm",
        "specificHeat": "0.5203 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1894",
        "discoveredBy": "Lord Rayleigh & William Ramsay",
        "namedBy": "From Greek argos (lazy/inactive)"
      },
      "stseContext": [
        "Preservation (Museum documents stored in Ar)",
        "Atmospheric science"
      ],
      "commonUses": [
        "Welding (Shielding gas)",
        "Incandescent light bulbs",
        "Double-pane windows"
      ],
      "hazards": [
        "Asphyxiant in confined spaces"
      ]
    }
  },
  "19": {
    "id": 19,
    "symbol": "K",
    "name": "Potassium",
    "level1_basic": {
      "type": "Alkali Metal",
      "group": 1,
      "period": "4",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "1",
      "commonIons": "K⁺ (Potassium)"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "39.098",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 19,
      "electronsNeutral": 19,
      "naturalIsotopes": [
        {
          "name": "K-39",
          "neutron": "20n",
          "percent": "Stable (93.26%)"
        },
        {
          "name": "K-40",
          "neutron": "21n",
          "percent": "Radioactive (0.012%)"
        },
        {
          "name": "K-41",
          "neutron": "22n",
          "percent": "Stable (6.73%)"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Ar] 4s¹",
        "oxidationStates": {
          "common": [
            "+1"
          ],
          "possible": []
        }
      },
      "physical": {
        "electronegativity": 0.82,
        "firstIonization": "419 kJ/mol",
        "density": "0.862 g/cm³",
        "meltingPoint": "63.5°C",
        "boilingPoint": "759°C",
        "electronAffinity": "48.4 kJ/mol",
        "atomicRadius": "243 pm",
        "specificHeat": "0.7570 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1807",
        "discoveredBy": "Humphry Davy",
        "namedBy": "Humphry Davy (from 'Potash')"
      },
      "stseContext": [
        "Agriculture (NPK Fertilizers)",
        "Geology (K-Ar dating)",
        "Biology (Nerve transmission)"
      ],
      "commonUses": [
        "Fertilizers",
        "Soaps",
        "Gunpowder (KNO₃)"
      ],
      "hazards": [
        "Reacts violently with water"
      ]
    }
  },
  "20": {
    "id": 20,
    "symbol": "Ca",
    "name": "Calcium",
    "level1_basic": {
      "type": "Alkaline Earth Metal",
      "group": 2,
      "period": "4",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "2",
      "commonIons": "Ca²⁺ (Calcium)"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "40.078",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 20,
      "electronsNeutral": 20,
      "naturalIsotopes": [
        {
          "name": "Ca-40",
          "neutron": "20n",
          "percent": "Stable (96.94%)"
        },
        {
          "name": "Ca-42",
          "neutron": "22n",
          "percent": "Stable (0.647%)"
        },
        {
          "name": "Ca-43",
          "neutron": "23n",
          "percent": "Stable (0.135%)"
        },
        {
          "name": "Ca-44",
          "neutron": "24n",
          "percent": "Stable (2.086%)"
        },
        {
          "name": "Ca-48",
          "neutron": "28n",
          "percent": "Radioactive (0.187%)"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Ar] 4s²",
        "oxidationStates": {
          "common": [
            "+2"
          ],
          "possible": []
        }
      },
      "physical": {
        "electronegativity": 1,
        "firstIonization": "590 kJ/mol",
        "density": "1.55 g/cm³",
        "meltingPoint": "842°C",
        "boilingPoint": "1484°C",
        "electronAffinity": "2.37 kJ/mol",
        "atomicRadius": "194 pm",
        "specificHeat": "0.6310 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1808",
        "discoveredBy": "Humphry Davy",
        "namedBy": "From Latin calx (lime)"
      },
      "stseContext": [
        "Construction (Concrete/Cement chemistry)",
        "Human Anatomy (Bones/Teeth structure)"
      ],
      "commonUses": [
        "Cement",
        "Steelmaking (Desulfurization)",
        "Dietary supplements"
      ],
      "hazards": [
        "Reacts with water (slowly compared to Na/K)"
      ]
    }
  },
  "21": {
    "id": 21,
    "symbol": "Sc",
    "name": "Scandium",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 3,
      "period": "4",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "Sc³⁺ (Scandium)"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "44.956",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 21,
      "electronsNeutral": 21,
      "naturalIsotopes": [
        {
          "name": "Sc-45",
          "neutron": "24n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Ar] 3d¹ 4s²",
        "oxidationStates": {
          "common": [
            "+3"
          ],
          "possible": [
            "+2",
            "+1"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.36,
        "firstIonization": "633 kJ/mol",
        "density": "2.985 g/cm³",
        "meltingPoint": "1541°C",
        "boilingPoint": "2836°C",
        "electronAffinity": "18.1 kJ/mol",
        "atomicRadius": "184 pm",
        "specificHeat": "0.5670 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1879",
        "discoveredBy": "Lars Fredrik Nilson",
        "namedBy": "From Latin Scandia (Scandinavia)"
      },
      "stseContext": [
        "Prediction validation (Mendeleev predicted it as 'Eka-boron')"
      ],
      "commonUses": [
        "Aerospace alloys (Aluminum-Scandium for MiG fighters)",
        "Stadium lighting"
      ],
      "hazards": [
        "Elemental dust is flammable"
      ]
    }
  },
  "22": {
    "id": 22,
    "symbol": "Ti",
    "name": "Titanium",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 4,
      "period": "4",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "Ti³⁺ (Titanium(III)), Ti⁴⁺ (Titanium(IV))"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "47.867",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 22,
      "electronsNeutral": 22,
      "naturalIsotopes": [
        {
          "name": "Ti-46",
          "neutron": "24n",
          "percent": "Stable"
        },
        {
          "name": "Ti-47",
          "neutron": "25n",
          "percent": "Stable"
        },
        {
          "name": "Ti-48",
          "neutron": "26n",
          "percent": "Stable"
        },
        {
          "name": "Ti-49",
          "neutron": "27n",
          "percent": "Stable"
        },
        {
          "name": "Ti-50",
          "neutron": "28n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Ar] 3d² 4s²",
        "oxidationStates": {
          "common": [
            "+4"
          ],
          "possible": [
            "+3",
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.54,
        "firstIonization": "659 kJ/mol",
        "density": "4.507 g/cm³",
        "meltingPoint": "1668°C",
        "boilingPoint": "3287°C",
        "electronAffinity": "7.6 kJ/mol",
        "atomicRadius": "176 pm",
        "specificHeat": "0.5200 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1791",
        "discoveredBy": "William Gregor",
        "namedBy": "Martin Heinrich Klaproth (Titans of mythology)"
      },
      "stseContext": [
        "Medical Engineering (Biocompatible implants)",
        "Aerospace (High strength-to-weight ratio)"
      ],
      "commonUses": [
        "Joint replacements",
        "Aircraft engines",
        "Pigment (TiO₂)"
      ],
      "hazards": [
        "Nontoxic (biologically inert)"
      ]
    }
  },
  "23": {
    "id": 23,
    "symbol": "V",
    "name": "Vanadium",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 5,
      "period": "4",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "V²⁺ (Vanadium(II)), V³⁺ (Vanadium(III))"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "50.942",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 23,
      "electronsNeutral": 23,
      "naturalIsotopes": [
        {
          "name": "V-50",
          "neutron": "27n",
          "percent": "Radioactive"
        },
        {
          "name": "V-51",
          "neutron": "28n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Ar] 3d³ 4s²",
        "oxidationStates": {
          "common": [
            "+5",
            "+4",
            "+3"
          ],
          "possible": [
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.63,
        "firstIonization": "651 kJ/mol",
        "density": "6.11 g/cm³",
        "meltingPoint": "1910°C",
        "boilingPoint": "3407°C",
        "electronAffinity": "50.6 kJ/mol",
        "atomicRadius": "171 pm",
        "specificHeat": "0.4890 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1801",
        "discoveredBy": "Andrés Manuel del Río",
        "namedBy": "Nils Gabriel Sefström (Vanadis, Norse goddess)"
      },
      "stseContext": [
        "Materials Science (High-speed steel tools)"
      ],
      "commonUses": [
        "Ferrovanadium alloys (Tools, Axles)",
        "Sulfuric acid catalyst (V₂O₅)"
      ],
      "hazards": [
        "Compounds (especially V₂O₅) are toxic"
      ]
    }
  },
  "24": {
    "id": 24,
    "symbol": "Cr",
    "name": "Chromium",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 6,
      "period": "4",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "Cr²⁺ (Chromium(II)), Cr³⁺ (Chromium(III))"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "51.996",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 24,
      "electronsNeutral": 24,
      "naturalIsotopes": [
        {
          "name": "Cr-50",
          "neutron": "26n",
          "percent": "Stable"
        },
        {
          "name": "Cr-52",
          "neutron": "28n",
          "percent": "Stable"
        },
        {
          "name": "Cr-53",
          "neutron": "29n",
          "percent": "Stable"
        },
        {
          "name": "Cr-54",
          "neutron": "30n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Ar] 3d⁵ 4s¹",
        "oxidationStates": {
          "common": [
            "+3",
            "+6"
          ],
          "possible": [
            "+1",
            "+2",
            "+4",
            "+5"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.66,
        "firstIonization": "653 kJ/mol",
        "density": "7.19 g/cm³",
        "meltingPoint": "1907°C",
        "boilingPoint": "2671°C",
        "electronAffinity": "64.3 kJ/mol",
        "atomicRadius": "166 pm",
        "specificHeat": "0.4480 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1797",
        "discoveredBy": "Louis-Nicolas Vauquelin",
        "namedBy": "From Greek chroma (color)"
      },
      "stseContext": [
        "Corrosion protection (Stainless steel passivation)",
        "Environmental Toxicology (Hexavalent chromium)"
      ],
      "commonUses": [
        "Stainless steel (minimum 10.5%)",
        "Chrome plating",
        "Pigments"
      ],
      "hazards": [
        "Cr(VI) is carcinogenic and highly toxic",
        "Cr(III) essentiality debated in modern literature"
      ]
    },
    "biologicalRole": "Cr(III) was traditionally considered an essential trace element, but modern reviews (EFSA 2014, NAS 2001) have questioned this; no clear biochemical function has been established.",
    "chemistryNotes": "Cr(VI) compounds (chromates, dichromates) are strong oxidizers and known human carcinogens. Cr(III) is much less toxic."
  },
  "25": {
    "id": 25,
    "symbol": "Mn",
    "name": "Manganese",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 7,
      "period": "4",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "Mn²⁺ (Manganese(II)), Mn³⁺ (Manganese(III))"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "54.938",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 25,
      "electronsNeutral": 25,
      "naturalIsotopes": [
        {
          "name": "Mn-55",
          "neutron": "30n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Ar] 3d⁵ 4s²",
        "oxidationStates": {
          "common": [
            "+2",
            "+4",
            "+7"
          ],
          "possible": [
            "+1",
            "+3",
            "+5",
            "+6"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.55,
        "firstIonization": "717 kJ/mol",
        "density": "7.21 g/cm³",
        "meltingPoint": "1246°C",
        "boilingPoint": "2061°C",
        "electronAffinity": "N/A",
        "atomicRadius": "161 pm",
        "specificHeat": "0.4790 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1774",
        "discoveredBy": "Johan Gottlieb Gahn",
        "namedBy": "Derived from Magnesia"
      },
      "stseContext": [
        "Metallurgy (Essential for steel strength)",
        "Batteries (Alkaline cells)"
      ],
      "commonUses": [
        "Steel alloys",
        "Aluminum beverage cans",
        "Dry cell batteries (MnO₂)"
      ],
      "hazards": [
        "Manganism (neurotoxicity) from chronic dust inhalation"
      ]
    }
  },
  "26": {
    "id": 26,
    "symbol": "Fe",
    "name": "Iron",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 8,
      "period": "4",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "Fe²⁺ (Iron(II)), Fe³⁺ (Iron(III))"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "55.845",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 26,
      "electronsNeutral": 26,
      "naturalIsotopes": [
        {
          "name": "Fe-54",
          "neutron": "28n",
          "percent": "Stable"
        },
        {
          "name": "Fe-56",
          "neutron": "30n",
          "percent": "Stable"
        },
        {
          "name": "Fe-57",
          "neutron": "31n",
          "percent": "Stable"
        },
        {
          "name": "Fe-58",
          "neutron": "32n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Ar] 3d⁶ 4s²",
        "oxidationStates": {
          "common": [
            "+2",
            "+3"
          ],
          "possible": [
            "+6"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.83,
        "firstIonization": "763 kJ/mol",
        "density": "7.874 g/cm³",
        "meltingPoint": "1538°C",
        "boilingPoint": "2862°C",
        "electronAffinity": "15.7 kJ/mol",
        "atomicRadius": "156 pm",
        "specificHeat": "0.4490 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "Prehistoric (~4000 BCE)",
        "discoveredBy": "Ancient Civilizations (Iron Age)",
        "namedBy": "From Anglo-Saxon iren (Symbol Fe from Latin ferrum)"
      },
      "stseContext": [
        "Civilization development (Steel infrastructure)",
        "Biology (Hemoglobin/Oxygen transport)"
      ],
      "commonUses": [
        "Construction (Steel)",
        "Vehicles",
        "Machinery"
      ],
      "hazards": [
        "Low toxicity",
        "acute overdose toxic"
      ]
    }
  },
  "27": {
    "id": 27,
    "symbol": "Co",
    "name": "Cobalt",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 9,
      "period": "4",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "Co²⁺ (Cobalt(II)), Co³⁺ (Cobalt(III))"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "58.933",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 27,
      "electronsNeutral": 27,
      "naturalIsotopes": [
        {
          "name": "Co-59",
          "neutron": "32n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Ar] 3d⁷ 4s²",
        "oxidationStates": {
          "common": [
            "+2",
            "+3"
          ],
          "possible": [
            "+1",
            "+4"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.88,
        "firstIonization": "760 kJ/mol",
        "density": "8.90 g/cm³",
        "meltingPoint": "1495°C",
        "boilingPoint": "2927°C",
        "electronAffinity": "63.7 kJ/mol",
        "atomicRadius": "152 pm",
        "specificHeat": "0.4210 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1735",
        "discoveredBy": "Georg Brandt",
        "namedBy": "From German Kobold (goblin/spirit)"
      },
      "stseContext": [
        "Renewable Energy (EV Batteries)",
        "Medical (Radiation therapy Co-60)",
        "Biology (Vitamin B12)"
      ],
      "commonUses": [
        "Lithium-ion battery cathodes",
        "Superalloys (Turbines)",
        "Blue pigments"
      ],
      "hazards": [
        "Toxic",
        "Skin sensitizer"
      ]
    }
  },
  "28": {
    "id": 28,
    "symbol": "Ni",
    "name": "Nickel",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 10,
      "period": "4",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "Ni²⁺ (Nickel(II)), Ni³⁺ (Nickel(III))"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "58.693",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 28,
      "electronsNeutral": 28,
      "naturalIsotopes": [
        {
          "name": "Ni-58",
          "neutron": "30n",
          "percent": "Stable"
        },
        {
          "name": "Ni-60",
          "neutron": "32n",
          "percent": "Stable"
        },
        {
          "name": "Ni-61",
          "neutron": "33n",
          "percent": "Stable"
        },
        {
          "name": "Ni-62",
          "neutron": "34n",
          "percent": "Stable"
        },
        {
          "name": "Ni-64",
          "neutron": "36n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Ar] 3d⁸ 4s²",
        "oxidationStates": {
          "common": [
            "+2"
          ],
          "possible": [
            "+1",
            "+3"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.91,
        "firstIonization": "737 kJ/mol",
        "density": "8.908 g/cm³",
        "meltingPoint": "1455°C",
        "boilingPoint": "2913°C",
        "electronAffinity": "112 kJ/mol",
        "atomicRadius": "149 pm",
        "specificHeat": "0.4450 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1751",
        "discoveredBy": "Axel Fredrik Cronstedt",
        "namedBy": "From Kupfernickel (Devil's copper)"
      },
      "stseContext": [
        "Currency (Coins)",
        "Alloys (Stainless steel)",
        "Catalysis (Hydrogenation)"
      ],
      "commonUses": [
        "Stainless steel",
        "Batteries",
        "Plating",
        "Coins"
      ],
      "hazards": [
        "Common allergen (contact dermatitis)"
      ]
    }
  },
  "29": {
    "id": 29,
    "symbol": "Cu",
    "name": "Copper",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 11,
      "period": "4",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "Cu⁺ (Copper(I)), Cu²⁺ (Copper(II))"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "63.546",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 29,
      "electronsNeutral": 29,
      "naturalIsotopes": [
        {
          "name": "Cu-63",
          "neutron": "34n",
          "percent": "Stable"
        },
        {
          "name": "Cu-65",
          "neutron": "36n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Ar] 3d¹⁰ 4s¹",
        "oxidationStates": {
          "common": [
            "+1",
            "+2"
          ],
          "possible": [
            "+3"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.9,
        "firstIonization": "746 kJ/mol",
        "density": "8.96 g/cm³",
        "meltingPoint": "1084.6°C",
        "boilingPoint": "2562°C",
        "electronAffinity": "118.4 kJ/mol",
        "atomicRadius": "145 pm",
        "specificHeat": "0.3844 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "Prehistoric (~9000 BCE)",
        "discoveredBy": "Middle Eastern Civilizations",
        "namedBy": "From Latin Cyprium (Metal of Cyprus)"
      },
      "stseContext": [
        "Electrification (Global grid)",
        "Antimicrobial properties (Hospital surfaces)"
      ],
      "commonUses": [
        "Wiring",
        "Plumbing",
        "Alloys (Bronze/Brass)"
      ],
      "hazards": [
        "Toxic to invertebrates/aquatic life",
        "essential for humans"
      ]
    }
  },
  "30": {
    "id": 30,
    "symbol": "Zn",
    "name": "Zinc",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 12,
      "period": "4",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "2 (d-subshell is full)",
      "commonIons": "Zn²⁺ (Zinc)"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "65.38",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 30,
      "electronsNeutral": 30,
      "naturalIsotopes": [
        {
          "name": "Zn-64",
          "neutron": "34n",
          "percent": "Stable"
        },
        {
          "name": "Zn-66",
          "neutron": "36n",
          "percent": "Stable"
        },
        {
          "name": "Zn-67",
          "neutron": "37n",
          "percent": "Stable"
        },
        {
          "name": "Zn-68",
          "neutron": "38n",
          "percent": "Stable"
        },
        {
          "name": "Zn-70",
          "neutron": "40n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Ar] 3d¹⁰ 4s²",
        "oxidationStates": {
          "common": [
            "+2"
          ],
          "possible": [
            "+1"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.65,
        "firstIonization": "906 kJ/mol",
        "density": "7.14 g/cm³",
        "meltingPoint": "419.5°C",
        "boilingPoint": "907°C",
        "electronAffinity": "N/A",
        "atomicRadius": "142 pm",
        "specificHeat": "0.3880 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "~1000 CE (India); 1746 (Europe isolation)",
        "discoveredBy": "Indian metallurgists; Andreas Sigismund Marggraf",
        "namedBy": "Paracelsus (from German Zinke)"
      },
      "stseContext": [
        "Corrosion protection (Sacrificial anode)",
        "Biochemistry (Enzyme cofactor)"
      ],
      "commonUses": [
        "Galvanizing steel",
        "Die-casting",
        "Brass alloy"
      ],
      "hazards": [
        "Metal fume fever (from welding)"
      ]
    }
  },
  "31": {
    "id": 31,
    "symbol": "Ga",
    "name": "Gallium",
    "level1_basic": {
      "type": "Post-transition Metal",
      "group": 13,
      "period": "4",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "3",
      "commonIons": "Ga³⁺ (Gallium)"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "69.723",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 31,
      "electronsNeutral": 31,
      "naturalIsotopes": [
        {
          "name": "Ga-69",
          "neutron": "38n",
          "percent": "Stable"
        },
        {
          "name": "Ga-71",
          "neutron": "40n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Ar] 3d¹⁰ 4s² 4p¹",
        "oxidationStates": {
          "common": [
            "+3"
          ],
          "possible": [
            "+1",
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.81,
        "firstIonization": "579 kJ/mol",
        "density": "5.91 g/cm³",
        "meltingPoint": "29.76°C",
        "boilingPoint": "2204°C",
        "electronAffinity": "28.9 kJ/mol",
        "atomicRadius": "136 pm",
        "specificHeat": "0.3710 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1875",
        "discoveredBy": "Paul-Émile Lecoq de Boisbaudran",
        "namedBy": "Lecoq de Boisbaudran (Gallia/France)"
      },
      "stseContext": [
        "Semiconductor physics (LEDs/Lasers)",
        "Mendeleev's 'Eka-aluminum'"
      ],
      "commonUses": [
        "Blue/Violet LEDs (GaN)",
        "Integrated circuits",
        "High-temp thermometers"
      ],
      "hazards": [
        "Corrosive to aluminum (liquid metal embrittlement)"
      ]
    }
  },
  "32": {
    "id": 32,
    "symbol": "Ge",
    "name": "Germanium",
    "level1_basic": {
      "type": "Metalloid",
      "group": 14,
      "period": "4",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "4",
      "commonIons": "No common ions",
      "commonOxidationStates": "+4, +2"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "72.630",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 32,
      "electronsNeutral": 32,
      "naturalIsotopes": [
        {
          "name": "Ge-70",
          "neutron": "38n",
          "percent": "Stable"
        },
        {
          "name": "Ge-72",
          "neutron": "40n",
          "percent": "Stable"
        },
        {
          "name": "Ge-73",
          "neutron": "41n",
          "percent": "Stable"
        },
        {
          "name": "Ge-74",
          "neutron": "42n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Ar] 3d¹⁰ 4s² 4p²",
        "oxidationStates": {
          "common": [
            "+4",
            "+2"
          ],
          "possible": [
            "-4"
          ]
        }
      },
      "physical": {
        "electronegativity": 2.01,
        "firstIonization": "762 kJ/mol",
        "density": "5.323 g/cm³",
        "meltingPoint": "938.3°C",
        "boilingPoint": "2833°C",
        "electronAffinity": "119 kJ/mol",
        "atomicRadius": "125 pm",
        "specificHeat": "0.3214 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1886",
        "discoveredBy": "Clemens Winkler",
        "namedBy": "Winkler (Germania/Germany)"
      },
      "stseContext": [
        "Electronics history (First transistors were Ge)",
        "Fiber optics"
      ],
      "commonUses": [
        "Fiber optics",
        "Infrared optics",
        "Polymerization catalysts"
      ],
      "hazards": [
        "Some organic compounds toxic"
      ]
    }
  },
  "33": {
    "id": 33,
    "symbol": "As",
    "name": "Arsenic",
    "level1_basic": {
      "type": "Metalloid",
      "group": 15,
      "period": "4",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "5",
      "commonIons": "No common ions",
      "commonOxidationStates": "-3, +3, +5"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "74.922",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 33,
      "electronsNeutral": 33,
      "naturalIsotopes": [
        {
          "name": "As-75",
          "neutron": "42n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Ar] 3d¹⁰ 4s² 4p³",
        "oxidationStates": {
          "common": [
            "-3",
            "+3",
            "+5"
          ],
          "possible": [
            "+1"
          ]
        }
      },
      "physical": {
        "electronegativity": 2.18,
        "firstIonization": "947 kJ/mol",
        "density": "5.727 g/cm³",
        "meltingPoint": "616°C (sublimes)",
        "boilingPoint": "N/A",
        "electronAffinity": "78 kJ/mol",
        "atomicRadius": "114 pm",
        "specificHeat": "0.3280 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "~1250 (Isolated)",
        "discoveredBy": "Albertus Magnus (attributed)",
        "namedBy": "From Persian zarnikh (yellow orpiment)"
      },
      "stseContext": [
        "Toxicology (Historical poison)",
        "Semiconductor doping (n-type)"
      ],
      "commonUses": [
        "Semiconductors (GaAs)",
        "Wood preservatives (historical)",
        "Alloys"
      ],
      "hazards": [
        "Highly toxic",
        "Carcinogenic"
      ]
    }
  },
  "34": {
    "id": 34,
    "symbol": "Se",
    "name": "Selenium",
    "level1_basic": {
      "type": "Other nonmetal",
      "group": 16,
      "period": "4",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "6",
      "commonIons": "No common ions",
      "commonOxidationStates": "-2, +4, +6"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "78.971",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 34,
      "electronsNeutral": 34,
      "naturalIsotopes": [
        {
          "name": "Se-74",
          "neutron": "40n",
          "percent": "Stable"
        },
        {
          "name": "Se-76",
          "neutron": "42n",
          "percent": "Stable"
        },
        {
          "name": "Se-77",
          "neutron": "43n",
          "percent": "Stable"
        },
        {
          "name": "Se-78",
          "neutron": "44n",
          "percent": "Stable"
        },
        {
          "name": "Se-80",
          "neutron": "46n",
          "percent": "Stable"
        },
        {
          "name": "Se-82",
          "neutron": "48n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Ar] 3d¹⁰ 4s² 4p⁴",
        "oxidationStates": {
          "common": [
            "-2",
            "+4",
            "+6"
          ],
          "possible": [
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 2.55,
        "firstIonization": "941 kJ/mol",
        "density": "4.81 g/cm³ (gray)",
        "meltingPoint": "220.8°C",
        "boilingPoint": "685°C",
        "electronAffinity": "195 kJ/mol",
        "atomicRadius": "103 pm",
        "specificHeat": "0.3212 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1817",
        "discoveredBy": "Jöns Jakob Berzelius",
        "namedBy": "From Greek selene (Moon)"
      },
      "stseContext": [
        "Xerox process (Photoconductivity)",
        "Biological trace element"
      ],
      "commonUses": [
        "Photocopying",
        "Glass decolorizing",
        "Solar cells"
      ],
      "hazards": [
        "Toxic in large amounts",
        "essential in trace amounts"
      ]
    }
  },
  "35": {
    "id": 35,
    "symbol": "Br",
    "name": "Bromine",
    "level1_basic": {
      "type": "Halogen",
      "group": 17,
      "period": "4",
      "phaseAtSTP": "Liquid",
      "valenceElectrons": "7",
      "commonIons": "Br⁻ (Bromide)"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "79.904",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 35,
      "electronsNeutral": 35,
      "naturalIsotopes": [
        {
          "name": "Br-79",
          "neutron": "44n",
          "percent": "Stable"
        },
        {
          "name": "Br-81",
          "neutron": "46n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Ar] 3d¹⁰ 4s² 4p⁵",
        "oxidationStates": {
          "common": [
            "-1",
            "+1",
            "+5",
            "+7"
          ],
          "possible": [
            "+3"
          ]
        }
      },
      "physical": {
        "electronegativity": 2.96,
        "firstIonization": "1140 kJ/mol",
        "density": "3.1028 g/cm³ (liquid)",
        "meltingPoint": "-7.2°C",
        "boilingPoint": "58.8°C",
        "electronAffinity": "324.6 kJ/mol",
        "atomicRadius": "94 pm",
        "specificHeat": "0.9473 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1826",
        "discoveredBy": "Antoine Jérôme Balard",
        "namedBy": "From Greek bromos (stench)"
      },
      "stseContext": [
        "Flame retardants",
        "Ozone depletion"
      ],
      "commonUses": [
        "Flame retardants",
        "Drilling fluids",
        "Photographic film (AgBr)"
      ],
      "hazards": [
        "Corrosive liquid",
        "vapor is highly toxic"
      ]
    }
  },
  "36": {
    "id": 36,
    "symbol": "Kr",
    "name": "Krypton",
    "level1_basic": {
      "type": "Noble Gas",
      "group": 18,
      "period": "4",
      "phaseAtSTP": "Gas",
      "valenceElectrons": "8",
      "commonIons": "No common ions",
      "commonOxidationStates": "0"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "83.798",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 36,
      "electronsNeutral": 36,
      "naturalIsotopes": [
        {
          "name": "Kr-78",
          "neutron": "42n",
          "percent": "Stable"
        },
        {
          "name": "Kr-80",
          "neutron": "44n",
          "percent": "Stable"
        },
        {
          "name": "Kr-82",
          "neutron": "46n",
          "percent": "Stable"
        },
        {
          "name": "Kr-83",
          "neutron": "47n",
          "percent": "Stable"
        },
        {
          "name": "Kr-84",
          "neutron": "48n",
          "percent": "Stable"
        },
        {
          "name": "Kr-86",
          "neutron": "50n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Ar] 3d¹⁰ 4s² 4p⁶",
        "oxidationStates": {
          "common": [
            "0"
          ],
          "possible": [
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 3,
        "firstIonization": "1351 kJ/mol",
        "density": "3.749 g/L",
        "meltingPoint": "-157.37°C",
        "boilingPoint": "-153.42°C",
        "electronAffinity": "N/A",
        "atomicRadius": "88 pm",
        "specificHeat": "0.2481 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1898",
        "discoveredBy": "William Ramsay & Morris Travers",
        "namedBy": "From Greek kryptos (hidden)"
      },
      "stseContext": [
        "Measurement standards (Meter was defined by Kr-86 light 1960-1983)"
      ],
      "commonUses": [
        "High-speed photography flashes",
        "Fluorescent bulbs",
        "Double-pane windows"
      ],
      "hazards": [
        "Asphyxiant",
        "Radioactive ⁸⁵Kr is a fission product"
      ]
    }
  },
  "37": {
    "id": 37,
    "symbol": "Rb",
    "name": "Rubidium",
    "level1_basic": {
      "type": "Alkali Metal",
      "group": 1,
      "period": "5",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "1",
      "commonIons": "Rb⁺ (Rubidium)"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "85.468",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 37,
      "electronsNeutral": 37,
      "naturalIsotopes": [
        {
          "name": "Rb-85",
          "neutron": "48n",
          "percent": "Stable"
        },
        {
          "name": "Rb-87",
          "neutron": "50n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Kr] 5s¹",
        "oxidationStates": {
          "common": [
            "+1"
          ],
          "possible": []
        }
      },
      "physical": {
        "electronegativity": 0.82,
        "firstIonization": "403 kJ/mol",
        "density": "1.532 g/cm³",
        "meltingPoint": "39.3°C",
        "boilingPoint": "688°C",
        "electronAffinity": "46.9 kJ/mol",
        "atomicRadius": "265 pm",
        "specificHeat": "0.3640 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1861",
        "discoveredBy": "Robert Bunsen & Gustav Kirchhoff",
        "namedBy": "From Latin rubidius (deep red, from spectrum)"
      },
      "stseContext": [
        "Geochronology (Dating of rocks/minerals)",
        "Atomic clocks"
      ],
      "commonUses": [
        "Vacuum tube getters",
        "Photocells",
        "Atomic clocks"
      ],
      "hazards": [
        "Reacts violently with water (ignites spontaneously)"
      ]
    }
  },
  "38": {
    "id": 38,
    "symbol": "Sr",
    "name": "Strontium",
    "level1_basic": {
      "type": "Alkaline Earth Metal",
      "group": 2,
      "period": "5",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "2",
      "commonIons": "Sr²⁺ (Strontium)"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "87.62",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 38,
      "electronsNeutral": 38,
      "naturalIsotopes": [
        {
          "name": "Sr-84",
          "neutron": "46n",
          "percent": "Stable"
        },
        {
          "name": "Sr-86",
          "neutron": "48n",
          "percent": "Stable"
        },
        {
          "name": "Sr-87",
          "neutron": "49n",
          "percent": "Stable"
        },
        {
          "name": "Sr-88",
          "neutron": "50n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Kr] 5s²",
        "oxidationStates": {
          "common": [
            "+2"
          ],
          "possible": []
        }
      },
      "physical": {
        "electronegativity": 0.95,
        "firstIonization": "550 kJ/mol",
        "density": "2.64 g/cm³",
        "meltingPoint": "777°C",
        "boilingPoint": "1377°C",
        "electronAffinity": "5.03 kJ/mol",
        "atomicRadius": "219 pm",
        "specificHeat": "0.3000 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1790 (identified); 1808 (isolated)",
        "discoveredBy": "Adair Crawford (Id.); Humphry Davy (Iso.)",
        "namedBy": "From Strontian, Scotland"
      },
      "stseContext": [
        "Nuclear fallout tracking (Sr-90 mimics Calcium in bones)",
        "Fireworks"
      ],
      "commonUses": [
        "Red fireworks/flares",
        "Glow-in-the-dark paints (SrAl₂O₄)"
      ],
      "hazards": [
        "Sr-90 is a dangerous radiotoxin",
        "elemental Sr reacts with water"
      ]
    }
  },
  "39": {
    "id": 39,
    "symbol": "Y",
    "name": "Yttrium",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 3,
      "period": "5",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "Y³⁺ (Yttrium)"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "88.906",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 39,
      "electronsNeutral": 39,
      "naturalIsotopes": [
        {
          "name": "Y-89",
          "neutron": "50n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Kr] 4d¹ 5s²",
        "oxidationStates": {
          "common": [
            "+3"
          ],
          "possible": [
            "+2",
            "+1"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.22,
        "firstIonization": "600 kJ/mol",
        "density": "4.472 g/cm³",
        "meltingPoint": "1526°C",
        "boilingPoint": "3345°C",
        "electronAffinity": "29.6 kJ/mol",
        "atomicRadius": "212 pm",
        "specificHeat": "0.2980 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1794",
        "discoveredBy": "Johan Gadolin",
        "namedBy": "From Ytterby, Sweden"
      },
      "stseContext": [
        "Superconductors (YBCO)",
        "LEDs"
      ],
      "commonUses": [
        "Red phosphors (CRTs/LEDs)",
        "Laser crystals (Nd:YAG)",
        "Superconductors"
      ],
      "hazards": [
        "Compounds can be toxic",
        "dust is flammable"
      ]
    }
  },
  "40": {
    "id": 40,
    "symbol": "Zr",
    "name": "Zirconium",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 4,
      "period": "5",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+4"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "91.224",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 40,
      "electronsNeutral": 40,
      "naturalIsotopes": [
        {
          "name": "Zr-90",
          "neutron": "50n",
          "percent": "Stable"
        },
        {
          "name": "Zr-91",
          "neutron": "51n",
          "percent": "Stable"
        },
        {
          "name": "Zr-92",
          "neutron": "52n",
          "percent": "Stable"
        },
        {
          "name": "Zr-94",
          "neutron": "54n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Kr] 4d² 5s²",
        "oxidationStates": {
          "common": [
            "+4"
          ],
          "possible": [
            "+3",
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.33,
        "firstIonization": "640 kJ/mol",
        "density": "6.52 g/cm³",
        "meltingPoint": "1855°C",
        "boilingPoint": "4377°C",
        "electronAffinity": "41.1 kJ/mol",
        "atomicRadius": "206 pm",
        "specificHeat": "0.2780 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1789",
        "discoveredBy": "Martin Heinrich Klaproth",
        "namedBy": "From Persian zargun (gold-colored)"
      },
      "stseContext": [
        "Nuclear energy (Fuel rod cladding due to low neutron absorption)",
        "Gemstones"
      ],
      "commonUses": [
        "Nuclear fuel cladding",
        "Chemical piping",
        "Fake diamonds (CZ)"
      ],
      "hazards": [
        "Powder is highly flammable/explosive",
        "biologically inert"
      ]
    }
  },
  "41": {
    "id": 41,
    "symbol": "Nb",
    "name": "Niobium",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 5,
      "period": "5",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+5"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "92.906",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 41,
      "electronsNeutral": 41,
      "naturalIsotopes": [
        {
          "name": "Nb-93",
          "neutron": "52n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Kr] 4d⁴ 5s¹",
        "oxidationStates": {
          "common": [
            "+5"
          ],
          "possible": [
            "+4",
            "+3",
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.6,
        "firstIonization": "652 kJ/mol",
        "density": "8.57 g/cm³",
        "meltingPoint": "2477°C",
        "boilingPoint": "4744°C",
        "electronAffinity": "86.1 kJ/mol",
        "atomicRadius": "198 pm",
        "specificHeat": "0.2650 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1801",
        "discoveredBy": "Charles Hatchett",
        "namedBy": "Niobe (daughter of Tantalus)"
      },
      "stseContext": [
        "MRI Technology (Superconducting magnets)",
        "Steel production"
      ],
      "commonUses": [
        "Superconducting magnets (MRI)",
        "Pipelines",
        "Hypoallergenic jewelry"
      ],
      "hazards": [
        "Dust causes eye/skin irritation"
      ]
    }
  },
  "42": {
    "id": 42,
    "symbol": "Mo",
    "name": "Molybdenum",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 6,
      "period": "5",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+6"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "95.95",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 42,
      "electronsNeutral": 42,
      "naturalIsotopes": [
        {
          "name": "Mo-92",
          "neutron": "50n",
          "percent": "Stable"
        },
        {
          "name": "Mo-94",
          "neutron": "52n",
          "percent": "Stable"
        },
        {
          "name": "Mo-95",
          "neutron": "53n",
          "percent": "Stable"
        },
        {
          "name": "Mo-96",
          "neutron": "54n",
          "percent": "Stable"
        },
        {
          "name": "Mo-97",
          "neutron": "55n",
          "percent": "Stable"
        },
        {
          "name": "Mo-98",
          "neutron": "56n",
          "percent": "Stable"
        },
        {
          "name": "Mo-100",
          "neutron": "58n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Kr] 4d⁵ 5s¹",
        "oxidationStates": {
          "common": [
            "+6"
          ],
          "possible": [
            "+4",
            "+5",
            "+3",
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 2.16,
        "firstIonization": "684 kJ/mol",
        "density": "10.28 g/cm³",
        "meltingPoint": "2623°C",
        "boilingPoint": "4639°C",
        "electronAffinity": "71.9 kJ/mol",
        "atomicRadius": "190 pm",
        "specificHeat": "0.2510 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1778",
        "discoveredBy": "Carl Wilhelm Scheele",
        "namedBy": "From Greek molybdos (lead-like)"
      },
      "stseContext": [
        "Enzymatic function (Essential for nitrogen fixation in plants)"
      ],
      "commonUses": [
        "High-strength steel alloys",
        "Lubricants (MoS₂)",
        "Nuclear imaging (Mo-99 precursor)"
      ],
      "hazards": [
        "Toxic in high doses",
        "essential trace element"
      ]
    }
  },
  "43": {
    "id": 43,
    "symbol": "Tc",
    "name": "Technetium",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 7,
      "period": "5",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+7"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "[98] (Radioactive)",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 43,
      "electronsNeutral": 43,
      "longestLivedIsotopes": [
        {
          "name": "Tc-97",
          "neutron": "54n",
          "percent": "Radioactive"
        },
        {
          "name": "Tc-98",
          "neutron": "55n",
          "percent": "Radioactive"
        },
        {
          "name": "Tc-99",
          "neutron": "56n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Kr] 4d⁵ 5s²",
        "oxidationStates": {
          "common": [
            "+7"
          ],
          "possible": [
            "+4",
            "+6",
            "+5"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.9,
        "firstIonization": "702 kJ/mol",
        "density": "11.0 g/cm³",
        "meltingPoint": "2157°C",
        "boilingPoint": "4265°C",
        "electronAffinity": "53 kJ/mol",
        "atomicRadius": "183 pm",
        "specificHeat": "0.0630 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1937",
        "discoveredBy": "Carlo Perrier & Emilio Segrè",
        "namedBy": "From Greek technetos (artificial)"
      },
      "stseContext": [
        "Nuclear Medicine (Tc-99m is the world's most used medical radiotracer)"
      ],
      "commonUses": [
        "Medical imaging (Bone scans, heart scans)",
        "Research"
      ],
      "hazards": [
        "Radioactive (radiotoxicity depends on isotope)"
      ]
    },
    "isotopeNotes": "Tc-97, Tc-98, and Tc-99 are the longest-lived. Tc-99m is widely used in medical imaging."
  },
  "44": {
    "id": 44,
    "symbol": "Ru",
    "name": "Ruthenium",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 8,
      "period": "5",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+3, +4"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "101.07",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 44,
      "electronsNeutral": 44,
      "naturalIsotopes": [
        {
          "name": "Ru-96",
          "neutron": "52n",
          "percent": "Stable"
        },
        {
          "name": "Ru-98",
          "neutron": "54n",
          "percent": "Stable"
        },
        {
          "name": "Ru-99",
          "neutron": "55n",
          "percent": "Stable"
        },
        {
          "name": "Ru-100",
          "neutron": "56n",
          "percent": "Stable"
        },
        {
          "name": "Ru-101",
          "neutron": "57n",
          "percent": "Stable"
        },
        {
          "name": "Ru-102",
          "neutron": "58n",
          "percent": "Stable"
        },
        {
          "name": "Ru-104",
          "neutron": "60n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Kr] 4d⁷ 5s¹ [exc]",
        "oxidationStates": {
          "common": [
            "+3",
            "+4"
          ],
          "possible": [
            "+2",
            "+6",
            "+7",
            "+8"
          ]
        }
      },
      "physical": {
        "electronegativity": 2.2,
        "firstIonization": "710 kJ/mol",
        "density": "12.45 g/cm³",
        "meltingPoint": "2334°C",
        "boilingPoint": "4150°C",
        "electronAffinity": "101.3 kJ/mol",
        "atomicRadius": "178 pm",
        "specificHeat": "0.2380 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1844",
        "discoveredBy": "Karl Ernst Claus",
        "namedBy": "From Ruthenia (Latin for Russia)"
      },
      "stseContext": [
        "Green Chemistry (Catalysts)",
        "Electronics (Chip resistors)"
      ],
      "commonUses": [
        "Electrical contacts",
        "Hard disk drives",
        "Solar energy"
      ],
      "hazards": [
        "RuO₄ is highly toxic and volatile"
      ]
    }
  },
  "45": {
    "id": 45,
    "symbol": "Rh",
    "name": "Rhodium",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 9,
      "period": "5",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+3"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "102.91",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 45,
      "electronsNeutral": 45,
      "naturalIsotopes": [
        {
          "name": "Rh-103",
          "neutron": "58n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Kr] 4d⁸ 5s¹",
        "configurationNote": "Observed anomalous ground-state configuration.",
        "oxidationStates": {
          "common": [
            "+3"
          ],
          "possible": [
            "+1",
            "+2",
            "+4",
            "+5"
          ]
        }
      },
      "physical": {
        "electronegativity": 2.28,
        "firstIonization": "720 kJ/mol",
        "density": "12.41 g/cm³",
        "meltingPoint": "1963°C",
        "boilingPoint": "3695°C",
        "electronAffinity": "109.7 kJ/mol",
        "atomicRadius": "173 pm",
        "specificHeat": "0.2400 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1803",
        "discoveredBy": "William Hyde Wollaston",
        "namedBy": "From Greek rhodon (rose, due to salt color)"
      },
      "stseContext": [
        "Automotive Industry (Catalytic converters for NOx reduction)"
      ],
      "commonUses": [
        "Catalytic converters (80% of use)",
        "Jewelry plating (gold finish)"
      ],
      "hazards": [
        "Compounds are toxic/carcinogenic",
        "metal is inert"
      ]
    }
  },
  "46": {
    "id": 46,
    "symbol": "Pd",
    "name": "Palladium",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 10,
      "period": "5",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer d only here)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+2"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "106.42",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 46,
      "electronsNeutral": 46,
      "naturalIsotopes": [
        {
          "name": "Pd-102",
          "neutron": "56n",
          "percent": "Stable"
        },
        {
          "name": "Pd-104",
          "neutron": "58n",
          "percent": "Stable"
        },
        {
          "name": "Pd-105",
          "neutron": "59n",
          "percent": "Stable"
        },
        {
          "name": "Pd-106",
          "neutron": "60n",
          "percent": "Stable"
        },
        {
          "name": "Pd-108",
          "neutron": "62n",
          "percent": "Stable"
        },
        {
          "name": "Pd-110",
          "neutron": "64n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Kr] 4d¹⁰",
        "oxidationStates": {
          "common": [
            "+2"
          ],
          "possible": [
            "0",
            "+1",
            "+3",
            "+4"
          ]
        }
      },
      "physical": {
        "electronegativity": 2.2,
        "firstIonization": "804 kJ/mol",
        "density": "12.023 g/cm³",
        "meltingPoint": "1554.9°C",
        "boilingPoint": "2963°C",
        "electronAffinity": "53.7 kJ/mol",
        "atomicRadius": "169 pm",
        "specificHeat": "0.2400 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1803",
        "discoveredBy": "William Hyde Wollaston",
        "namedBy": "From asteroid Pallas"
      },
      "stseContext": [
        "Hydrogen Economy (Can absorb 900x volume of H₂)",
        "Catalytic converters"
      ],
      "commonUses": [
        "Catalytic converters",
        "Dentistry",
        "Fuel cells",
        "Hydrogen purification"
      ],
      "hazards": [
        "Low toxicity",
        "but can cause allergic reactions"
      ]
    }
  },
  "47": {
    "id": 47,
    "symbol": "Ag",
    "name": "Silver",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 11,
      "period": "5",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "Ag⁺ (Silver)"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "107.87",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 47,
      "electronsNeutral": 47,
      "naturalIsotopes": [
        {
          "name": "Ag-107",
          "neutron": "60n",
          "percent": "Stable"
        },
        {
          "name": "Ag-109",
          "neutron": "62n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Kr] 4d¹⁰ 5s¹",
        "oxidationStates": {
          "common": [
            "+1"
          ],
          "possible": [
            "+2",
            "+3"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.93,
        "firstIonization": "731 kJ/mol",
        "density": "10.49 g/cm³",
        "meltingPoint": "961.8°C",
        "boilingPoint": "2162°C",
        "electronAffinity": "125.6 kJ/mol",
        "atomicRadius": "165 pm",
        "specificHeat": "0.2350 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "Prehistoric (~3000 BCE)",
        "discoveredBy": "Ancient Civilizations",
        "namedBy": "Anglo-Saxon seolfor (Symbol Ag from Latin argentum)"
      },
      "stseContext": [
        "Medicine (Antibacterial properties)",
        "Photography (Traditional film chemistry)"
      ],
      "commonUses": [
        "Jewelry",
        "Electronics (Best conductor)",
        "Mirrors",
        "Solar panels"
      ],
      "hazards": [
        "Argyria (skin turns blue from chronic exposure)",
        "toxic to aquatic life"
      ]
    }
  },
  "48": {
    "id": 48,
    "symbol": "Cd",
    "name": "Cadmium",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 12,
      "period": "5",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "2 (d-subshell is full)",
      "commonIons": "Cd²⁺ (Cadmium)"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "112.41",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 48,
      "electronsNeutral": 48,
      "naturalIsotopes": [
        {
          "name": "Cd-110",
          "neutron": "62n",
          "percent": "Stable"
        },
        {
          "name": "Cd-111",
          "neutron": "63n",
          "percent": "Stable"
        },
        {
          "name": "Cd-112",
          "neutron": "64n",
          "percent": "Stable"
        },
        {
          "name": "Cd-113",
          "neutron": "65n",
          "percent": "Stable"
        },
        {
          "name": "Cd-114",
          "neutron": "66n",
          "percent": "Stable"
        },
        {
          "name": "Cd-116",
          "neutron": "68n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Kr] 4d¹⁰ 5s²",
        "oxidationStates": {
          "common": [
            "+2"
          ],
          "possible": [
            "+1"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.69,
        "firstIonization": "868 kJ/mol",
        "density": "8.65 g/cm³",
        "meltingPoint": "321.1°C",
        "boilingPoint": "767°C",
        "electronAffinity": "N/A",
        "atomicRadius": "161 pm",
        "specificHeat": "0.2300 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1817",
        "discoveredBy": "Friedrich Stromeyer",
        "namedBy": "From Latin cadmia (calamine)"
      },
      "stseContext": [
        "Environmental Pollution (Ni-Cd battery disposal)",
        "Pigments"
      ],
      "commonUses": [
        "Ni-Cd Batteries (being phased out)",
        "Solar cells (CdTe)",
        "Pigments"
      ],
      "hazards": [
        "Highly toxic",
        "Carcinogen",
        "Accumulates in kidneys"
      ]
    }
  },
  "49": {
    "id": 49,
    "symbol": "In",
    "name": "Indium",
    "level1_basic": {
      "type": "Post-transition Metal",
      "group": 13,
      "period": "5",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "3",
      "commonIons": "In³⁺ (Indium)"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "114.82",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 49,
      "electronsNeutral": 49,
      "naturalIsotopes": [
        {
          "name": "In-113",
          "neutron": "64n",
          "percent": "Stable"
        },
        {
          "name": "In-115",
          "neutron": "66n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Kr] 4d¹⁰ 5s² 5p¹",
        "oxidationStates": {
          "common": [
            "+3"
          ],
          "possible": [
            "+1",
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.78,
        "firstIonization": "558 kJ/mol",
        "density": "7.31 g/cm³",
        "meltingPoint": "156.6°C",
        "boilingPoint": "2072°C",
        "electronAffinity": "28.9 kJ/mol",
        "atomicRadius": "156 pm",
        "specificHeat": "0.2330 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1863",
        "discoveredBy": "Ferdinand Reich & H.T. Richter",
        "namedBy": "From Indigo spectrum line"
      },
      "stseContext": [
        "Touchscreen Technology (Indium Tin Oxide films)"
      ],
      "commonUses": [
        "LCD/OLED screens (ITO)",
        "Solders",
        "Semiconductors"
      ],
      "hazards": [
        "Compounds are toxic",
        "damage lungs/kidneys"
      ]
    }
  },
  "50": {
    "id": 50,
    "symbol": "Sn",
    "name": "Tin",
    "level1_basic": {
      "type": "Post-transition Metal",
      "group": 14,
      "period": "5",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "4",
      "commonIons": "Sn²⁺ (Tin(II)), Sn⁴⁺ (Tin(IV))"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "118.71",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 50,
      "electronsNeutral": 50,
      "naturalIsotopes": [
        {
          "name": "Sn-112",
          "neutron": "62n",
          "percent": "Stable"
        },
        {
          "name": "Sn-114",
          "neutron": "64n",
          "percent": "Stable"
        },
        {
          "name": "Sn-115",
          "neutron": "65n",
          "percent": "Stable"
        },
        {
          "name": "Sn-116",
          "neutron": "66n",
          "percent": "Stable"
        },
        {
          "name": "Sn-117",
          "neutron": "67n",
          "percent": "Stable"
        },
        {
          "name": "Sn-118",
          "neutron": "68n",
          "percent": "Stable"
        },
        {
          "name": "Sn-119",
          "neutron": "69n",
          "percent": "Stable"
        },
        {
          "name": "Sn-120",
          "neutron": "70n",
          "percent": "Stable"
        },
        {
          "name": "Sn-122",
          "neutron": "72n",
          "percent": "Stable"
        },
        {
          "name": "Sn-124",
          "neutron": "74n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Kr] 4d¹⁰ 5s² 5p²",
        "oxidationStates": {
          "common": [
            "+2",
            "+4"
          ],
          "possible": [
            "-4"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.96,
        "firstIonization": "709 kJ/mol",
        "density": "7.265 g/cm³ (tin)",
        "meltingPoint": "231.9°C",
        "boilingPoint": "2602°C",
        "electronAffinity": "107.3 kJ/mol",
        "atomicRadius": "145 pm",
        "specificHeat": "0.2170 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "Prehistoric (~3000 BCE)",
        "discoveredBy": "Ancient Civilizations (Bronze Age)",
        "namedBy": "Anglo-Saxon tin (Symbol Sn from Latin stannum)"
      },
      "stseContext": [
        "Food Safety (Tin cans)",
        "Metallurgy (Bronze/Solder)"
      ],
      "commonUses": [
        "Solder (electronics)",
        "Plating (steel cans)",
        "Bronze alloys"
      ],
      "hazards": [
        "Organic tin compounds are toxic",
        "metal is non-toxic"
      ]
    }
  },
  "51": {
    "id": 51,
    "symbol": "Sb",
    "name": "Antimony",
    "level1_basic": {
      "type": "Metalloid",
      "group": 15,
      "period": "5",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "5",
      "commonIons": "Sb³⁻ (Antimonide), Sb³⁺ (Antimony(III))"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "121.76",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 51,
      "electronsNeutral": 51,
      "naturalIsotopes": [
        {
          "name": "Sb-121",
          "neutron": "70n",
          "percent": "Stable"
        },
        {
          "name": "Sb-123",
          "neutron": "72n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Kr] 4d¹⁰ 5s² 5p³",
        "oxidationStates": {
          "common": [
            "-3",
            "+3",
            "+5"
          ],
          "possible": [
            "+1"
          ]
        }
      },
      "physical": {
        "electronegativity": 2.05,
        "firstIonization": "834 kJ/mol",
        "density": "6.697 g/cm³",
        "meltingPoint": "630.6°C",
        "boilingPoint": "1587°C",
        "electronAffinity": "103.2 kJ/mol",
        "atomicRadius": "145 pm",
        "specificHeat": "0.2070 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "~3000 BCE",
        "discoveredBy": "Ancient Civilizations",
        "namedBy": "Symbol Sb from Latin stibium (eyeliner)"
      },
      "stseContext": [
        "Fire Safety (Flame retardants)",
        "Lead-acid battery chemistry"
      ],
      "commonUses": [
        "Flame retardants (Sb₂O₃)",
        "Lead-acid battery hardening",
        "Microelectronics"
      ],
      "hazards": [
        "Toxic (similar to Arsenic)",
        "causes poisoning"
      ]
    }
  },
  "52": {
    "id": 52,
    "symbol": "Te",
    "name": "Tellurium",
    "level1_basic": {
      "type": "Metalloid",
      "group": 16,
      "period": "5",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "6",
      "commonIons": "Te²⁻ (Telluride)"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "127.60",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 52,
      "electronsNeutral": 52,
      "naturalIsotopes": [
        {
          "name": "Te-125",
          "neutron": "73n",
          "percent": "Stable"
        },
        {
          "name": "Te-126",
          "neutron": "74n",
          "percent": "Stable"
        },
        {
          "name": "Te-128",
          "neutron": "76n",
          "percent": "Stable"
        },
        {
          "name": "Te-130",
          "neutron": "78n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Kr] 4d¹⁰ 5s² 5p⁴",
        "oxidationStates": {
          "common": [
            "-2",
            "+4",
            "+6"
          ],
          "possible": [
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 2.1,
        "firstIonization": "869 kJ/mol",
        "density": "6.24 g/cm³",
        "meltingPoint": "449.5°C",
        "boilingPoint": "988°C",
        "electronAffinity": "190.2 kJ/mol",
        "atomicRadius": "140 pm",
        "specificHeat": "0.2010 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1782",
        "discoveredBy": "Franz-Joseph Müller von Reichenstein",
        "namedBy": "From Latin tellus (Earth)"
      },
      "stseContext": [
        "Renewable Energy (CdTe Solar Panels)",
        "Rewritable optical discs"
      ],
      "commonUses": [
        "Solar panels",
        "Alloys (improve machinability)",
        "Thermoelectric devices"
      ],
      "hazards": [
        "Toxic",
        "ingestion causes garlic-like breath"
      ]
    }
  },
  "53": {
    "id": 53,
    "symbol": "I",
    "name": "Iodine",
    "level1_basic": {
      "type": "Halogen",
      "group": 17,
      "period": "5",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "7",
      "commonIons": "I⁻ (Iodide)"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "126.90",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 53,
      "electronsNeutral": 53,
      "naturalIsotopes": [
        {
          "name": "I-127",
          "neutron": "74n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Kr] 4d¹⁰ 5s² 5p⁵",
        "oxidationStates": {
          "common": [
            "-1",
            "+1",
            "+5",
            "+7"
          ],
          "possible": [
            "+3"
          ]
        }
      },
      "physical": {
        "electronegativity": 2.66,
        "firstIonization": "1008 kJ/mol",
        "density": "4.933 g/cm³",
        "meltingPoint": "113.7°C",
        "boilingPoint": "184.3°C",
        "electronAffinity": "295.2 kJ/mol",
        "atomicRadius": "140 pm",
        "specificHeat": "0.4290 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1811",
        "discoveredBy": "Bernard Courtois",
        "namedBy": "From Greek iodes (violet)"
      },
      "stseContext": [
        "Public Health (Iodized salt prevents goiter)",
        "Nuclear Safety (I-131 protection)"
      ],
      "commonUses": [
        "Disinfectant (Betadine)",
        "Contrast media (X-ray)",
        "Thyroid nutrient"
      ],
      "hazards": [
        "Vapors irritate eyes/lungs",
        "stains skin"
      ]
    }
  },
  "54": {
    "id": 54,
    "symbol": "Xe",
    "name": "Xenon",
    "level1_basic": {
      "type": "Noble Gas",
      "group": 18,
      "period": "5",
      "phaseAtSTP": "Gas",
      "valenceElectrons": "8",
      "commonIons": "No common ions",
      "commonOxidationStates": "0"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "131.29",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 54,
      "electronsNeutral": 54,
      "naturalIsotopes": [
        {
          "name": "Xe-124",
          "neutron": "70n",
          "percent": "Stable"
        },
        {
          "name": "Xe-126",
          "neutron": "72n",
          "percent": "Stable"
        },
        {
          "name": "Xe-128",
          "neutron": "74n",
          "percent": "Stable"
        },
        {
          "name": "Xe-129",
          "neutron": "75n",
          "percent": "Stable"
        },
        {
          "name": "Xe-130",
          "neutron": "76n",
          "percent": "Stable"
        },
        {
          "name": "Xe-131",
          "neutron": "77n",
          "percent": "Stable"
        },
        {
          "name": "Xe-132",
          "neutron": "78n",
          "percent": "Stable"
        },
        {
          "name": "Xe-134",
          "neutron": "80n",
          "percent": "Stable"
        },
        {
          "name": "Xe-136",
          "neutron": "82n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Kr] 4d¹⁰ 5s² 5p⁶",
        "oxidationStates": {
          "common": [
            "0"
          ],
          "possible": [
            "+2",
            "+4",
            "+6",
            "+8"
          ]
        }
      },
      "physical": {
        "electronegativity": 2.6,
        "firstIonization": "1170 kJ/mol",
        "density": "5.894 g/L",
        "meltingPoint": "-111.75°C",
        "boilingPoint": "-108.1°C",
        "electronAffinity": "N/A",
        "atomicRadius": "N/A",
        "specificHeat": "0.1583 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1898",
        "discoveredBy": "William Ramsay & Morris Travers",
        "namedBy": "From Greek xenos (stranger)"
      },
      "stseContext": [
        "Space Propulsion (Ion thrusters)",
        "Medical Anesthesia"
      ],
      "commonUses": [
        "Ion propulsion engines (satellites)",
        "High-intensity strobe lights",
        "General anesthetic"
      ],
      "hazards": [
        "Asphyxiant",
        "compounds (e.g., oxides) can be explosive"
      ]
    }
  },
  "55": {
    "id": 55,
    "symbol": "Cs",
    "name": "Cesium",
    "level1_basic": {
      "type": "Alkali Metal",
      "group": 1,
      "period": "6",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "1",
      "commonIons": "Cs⁺ (Cesium)"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "132.91",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 55,
      "electronsNeutral": 55,
      "naturalIsotopes": [
        {
          "name": "Cs-133",
          "neutron": "78n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 6s¹",
        "oxidationStates": {
          "common": [
            "+1"
          ],
          "possible": []
        }
      },
      "physical": {
        "electronegativity": 0.79,
        "firstIonization": "376 kJ/mol",
        "density": "1.93 g/cm³",
        "meltingPoint": "28.44°C",
        "boilingPoint": "671°C",
        "electronAffinity": "45.5 kJ/mol",
        "atomicRadius": "260 pm",
        "specificHeat": "0.2420 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1860",
        "discoveredBy": "Robert Bunsen & Gustav Kirchhoff",
        "namedBy": "From Latin caesius (sky blue spectrum line)"
      },
      "stseContext": [
        "Global Timekeeping (Definition of the Second based on Cs-133)"
      ],
      "commonUses": [
        "Atomic clocks (GPS standard)",
        "Drilling fluids (Cesium formate)",
        "Photoelectric cells"
      ],
      "hazards": [
        "Reacts explosively with cold water"
      ]
    }
  },
  "56": {
    "id": 56,
    "symbol": "Ba",
    "name": "Barium",
    "level1_basic": {
      "type": "Alkaline Earth Metal",
      "group": 2,
      "period": "6",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "2",
      "commonIons": "Ba²⁺ (Barium)"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "137.33",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 56,
      "electronsNeutral": 56,
      "naturalIsotopes": [
        {
          "name": "Ba-134",
          "neutron": "78n",
          "percent": "Stable"
        },
        {
          "name": "Ba-135",
          "neutron": "79n",
          "percent": "Stable"
        },
        {
          "name": "Ba-136",
          "neutron": "80n",
          "percent": "Stable"
        },
        {
          "name": "Ba-137",
          "neutron": "81n",
          "percent": "Stable"
        },
        {
          "name": "Ba-138",
          "neutron": "82n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 6s²",
        "oxidationStates": {
          "common": [
            "+2"
          ],
          "possible": []
        }
      },
      "physical": {
        "electronegativity": 0.89,
        "firstIonization": "503 kJ/mol",
        "density": "3.51 g/cm³",
        "meltingPoint": "727°C",
        "boilingPoint": "1845°C",
        "electronAffinity": "13.95 kJ/mol",
        "atomicRadius": "215 pm",
        "specificHeat": "0.2050 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1808",
        "discoveredBy": "Humphry Davy",
        "namedBy": "From Greek barys (heavy)"
      },
      "stseContext": [
        "Medical Imaging (Barium swallow X-rays)",
        "Oil Well Drilling"
      ],
      "commonUses": [
        "Drilling muds (Barite)",
        "Fireworks (Green color)",
        "Medical contrast agent"
      ],
      "hazards": [
        "Soluble compounds are toxic",
        "BaSO₄ is safe (insoluble)"
      ]
    }
  },
  "57": {
    "id": 57,
    "symbol": "La",
    "name": "Lanthanum",
    "level1_basic": {
      "type": "Lanthanide",
      "group": null,
      "period": "6",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "La³⁺ (Lanthanum)",
      "block": "f",
      "series": "Lanthanide"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "138.91",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 57,
      "electronsNeutral": 57,
      "naturalIsotopes": [
        {
          "name": "La-138",
          "neutron": "81n",
          "percent": "Radioactive"
        },
        {
          "name": "La-139",
          "neutron": "82n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 5d¹ 6s²",
        "oxidationStates": {
          "common": [
            "+3"
          ],
          "possible": [
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.1,
        "firstIonization": "538 kJ/mol",
        "density": "6.162 g/cm³",
        "meltingPoint": "920°C",
        "boilingPoint": "3464°C",
        "electronAffinity": "48 kJ/mol",
        "atomicRadius": "195 pm",
        "specificHeat": "0.1950 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1839",
        "discoveredBy": "Carl Gustaf Mosander",
        "namedBy": "From Greek lanthanein (to lie hidden)"
      },
      "stseContext": [
        "Hybrid Vehicles (NiMH batteries)"
      ],
      "commonUses": [
        "Camera lenses (High refractive index glass)",
        "Hybrid car batteries",
        "Lighter flints"
      ],
      "hazards": [
        "Low toxicity",
        "dust is flammable"
      ]
    },
    "uiLayout": {
      "fallbackDisplayRow": "6",
      "fallbackDisplayColumn": 3
    },
    "dataQualityNotes": [
      "Group is null because f-block elements are typically separated from the 1-18 group numbering system."
    ]
  },
  "58": {
    "id": 58,
    "symbol": "Ce",
    "name": "Cerium",
    "level1_basic": {
      "type": "Lanthanide",
      "group": null,
      "period": "6",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + f)",
      "commonIons": "Ce³⁺ (Cerium(III)), Ce⁴⁺ (Cerium(IV))",
      "block": "f",
      "series": "Lanthanide"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "140.12",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 58,
      "electronsNeutral": 58,
      "naturalIsotopes": [
        {
          "name": "Ce-136",
          "neutron": "78n",
          "percent": "Stable"
        },
        {
          "name": "Ce-138",
          "neutron": "80n",
          "percent": "Stable"
        },
        {
          "name": "Ce-140",
          "neutron": "82n",
          "percent": "Stable"
        },
        {
          "name": "Ce-142",
          "neutron": "84n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 4f¹ 5d¹ 6s²",
        "oxidationStates": {
          "common": [
            "+3",
            "+4"
          ],
          "possible": [
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.12,
        "firstIonization": "534 kJ/mol",
        "density": "6.770 g/cm³",
        "meltingPoint": "799°C",
        "boilingPoint": "3443°C",
        "electronAffinity": "50 kJ/mol",
        "atomicRadius": "185 pm",
        "specificHeat": "0.1920 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1803",
        "discoveredBy": "Martin Heinrich Klaproth, Jöns Jakob Berzelius",
        "namedBy": "From asteroid Ceres"
      },
      "stseContext": [
        "Emissions Control (Diesel additives)",
        "Self-cleaning ovens"
      ],
      "commonUses": [
        "Catalytic converters",
        "Mischmetal (lighter flints)",
        "Glass polishing"
      ],
      "hazards": [
        "Pyrophoric (sparks when struck)",
        "low toxicity"
      ]
    },
    "uiLayout": {
      "fallbackDisplayRow": "9",
      "fallbackDisplayColumn": 4
    },
    "dataQualityNotes": [
      "Group is null because f-block elements are typically separated from the 1-18 group numbering system."
    ]
  },
  "59": {
    "id": 59,
    "symbol": "Pr",
    "name": "Praseodymium",
    "level1_basic": {
      "type": "Lanthanide",
      "group": null,
      "period": "6",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + f)",
      "commonIons": "Pr³⁺ (Praseodymium(III))",
      "block": "f",
      "series": "Lanthanide"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "140.91",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 59,
      "electronsNeutral": 59,
      "naturalIsotopes": [
        {
          "name": "Pr-141",
          "neutron": "82n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 4f³ 6s²",
        "oxidationStates": {
          "common": [
            "+3"
          ],
          "possible": [
            "+4",
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.13,
        "firstIonization": "527 kJ/mol",
        "density": "6.77 g/cm³",
        "meltingPoint": "931°C",
        "boilingPoint": "3520°C",
        "electronAffinity": "50 kJ/mol",
        "atomicRadius": "185 pm",
        "specificHeat": "0.1930 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1885",
        "discoveredBy": "Carl Auer von Welsbach",
        "namedBy": "From Greek prasios didymos (green twin)"
      },
      "stseContext": [
        "Renewable Energy (Magnets in wind turbines)"
      ],
      "commonUses": [
        "High-strength magnets (alloyed with Nd)",
        "Didymium glass (welder's goggles)",
        "Yellow pigments"
      ],
      "hazards": [
        "Low toxicity",
        "dust is flammable"
      ]
    },
    "uiLayout": {
      "fallbackDisplayRow": "9",
      "fallbackDisplayColumn": 5
    },
    "dataQualityNotes": [
      "Group is null because f-block elements are typically separated from the 1-18 group numbering system."
    ]
  },
  "60": {
    "id": 60,
    "symbol": "Nd",
    "name": "Neodymium",
    "level1_basic": {
      "type": "Lanthanide",
      "group": null,
      "period": "6",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + f)",
      "commonIons": "Nd³⁺ (Neodymium(III))",
      "block": "f",
      "series": "Lanthanide"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "144.24",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 60,
      "electronsNeutral": 60,
      "naturalIsotopes": [
        {
          "name": "Nd-142",
          "neutron": "82n",
          "percent": "Stable"
        },
        {
          "name": "Nd-143",
          "neutron": "83n",
          "percent": "Stable"
        },
        {
          "name": "Nd-144",
          "neutron": "84n",
          "percent": "Stable"
        },
        {
          "name": "Nd-145",
          "neutron": "85n",
          "percent": "Stable"
        },
        {
          "name": "Nd-146",
          "neutron": "86n",
          "percent": "Stable"
        },
        {
          "name": "Nd-148",
          "neutron": "88n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 4f⁴ 6s²",
        "oxidationStates": {
          "common": [
            "+3"
          ],
          "possible": [
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.14,
        "firstIonization": "533 kJ/mol",
        "density": "7.01 g/cm³",
        "meltingPoint": "1016°C",
        "boilingPoint": "3074°C",
        "electronAffinity": "50 kJ/mol",
        "atomicRadius": "185 pm",
        "specificHeat": "0.1900 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1885",
        "discoveredBy": "Carl Auer von Welsbach",
        "namedBy": "From Greek neos didymos (new twin)"
      },
      "stseContext": [
        "Green Technology (Essential for EV motors and Wind Turbines)"
      ],
      "commonUses": [
        "Strongest permanent magnets (NdFeB)",
        "Lasers (Nd:YAG)",
        "Glass coloring (purple)"
      ],
      "hazards": [
        "Dust is flammable",
        "magnets can cause pinching injuries"
      ]
    },
    "uiLayout": {
      "fallbackDisplayRow": "9",
      "fallbackDisplayColumn": 6
    },
    "dataQualityNotes": [
      "Group is null because f-block elements are typically separated from the 1-18 group numbering system."
    ]
  },
  "61": {
    "id": 61,
    "symbol": "Pm",
    "name": "Promethium",
    "level1_basic": {
      "type": "Lanthanide",
      "group": null,
      "period": "6",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + f)",
      "commonIons": "Pm³⁺ (Promethium(III))",
      "block": "f",
      "series": "Lanthanide"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "[145] (Radioactive)",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 61,
      "electronsNeutral": 61,
      "longestLivedIsotopes": [
        {
          "name": "Pm-145",
          "neutron": "84n",
          "percent": "Radioactive"
        },
        {
          "name": "Pm-147",
          "neutron": "86n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 4f⁵ 6s²",
        "oxidationStates": {
          "common": [
            "+3"
          ],
          "possible": [
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.13,
        "firstIonization": "540 kJ/mol",
        "density": "7.26 g/cm³",
        "meltingPoint": "1042°C",
        "boilingPoint": "3000°C",
        "electronAffinity": "50 kJ/mol",
        "atomicRadius": "185 pm",
        "specificHeat": "N/A"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1945",
        "discoveredBy": "Marinsky, Glendenin, Coryell",
        "namedBy": "From Prometheus (Greek titan who stole fire)"
      },
      "stseContext": [
        "Nuclear Batteries (Betavoltaics)"
      ],
      "commonUses": [
        "Nuclear batteries for guided missiles/pacemakers",
        "Luminous paint"
      ],
      "hazards": [
        "Radioactive"
      ]
    },
    "isotopeNotes": "Pm-145 (t½ 17.7 y) and Pm-147 (t½ 2.62 y) are the longest-lived.",
    "uiLayout": {
      "fallbackDisplayRow": "9",
      "fallbackDisplayColumn": 7
    },
    "dataQualityNotes": [
      "Group is null because f-block elements are typically separated from the 1-18 group numbering system."
    ]
  },
  "62": {
    "id": 62,
    "symbol": "Sm",
    "name": "Samarium",
    "level1_basic": {
      "type": "Lanthanide",
      "group": null,
      "period": "6",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + f)",
      "commonIons": "Sm²⁺ (Samarium(II)), Sm³⁺ (Samarium(III))",
      "block": "f",
      "series": "Lanthanide"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "150.36",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 62,
      "electronsNeutral": 62,
      "naturalIsotopes": [
        {
          "name": "Sm-144",
          "neutron": "82n",
          "percent": "Stable"
        },
        {
          "name": "Sm-147",
          "neutron": "85n",
          "percent": "Radioactive"
        },
        {
          "name": "Sm-149",
          "neutron": "87n",
          "percent": "Stable"
        },
        {
          "name": "Sm-150",
          "neutron": "88n",
          "percent": "Stable"
        },
        {
          "name": "Sm-152",
          "neutron": "90n",
          "percent": "Stable"
        },
        {
          "name": "Sm-154",
          "neutron": "92n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 4f⁶ 6s²",
        "oxidationStates": {
          "common": [
            "+3"
          ],
          "possible": [
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.17,
        "firstIonization": "545 kJ/mol",
        "density": "7.52 g/cm³",
        "meltingPoint": "1072°C",
        "boilingPoint": "1794°C",
        "electronAffinity": "50 kJ/mol",
        "atomicRadius": "185 pm",
        "specificHeat": "0.1960 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1879",
        "discoveredBy": "Lecoq de Boisbaudran",
        "namedBy": "From Mineral Samarskite"
      },
      "stseContext": [
        "Magnet Technology (SmCo magnets)"
      ],
      "commonUses": [
        "Samarium-Cobalt magnets (high temp stability)",
        "Cancer treatment (Sm-153)"
      ],
      "hazards": [
        "Low toxicity"
      ]
    },
    "uiLayout": {
      "fallbackDisplayRow": "9",
      "fallbackDisplayColumn": 8
    },
    "dataQualityNotes": [
      "Group is null because f-block elements are typically separated from the 1-18 group numbering system."
    ]
  },
  "63": {
    "id": 63,
    "symbol": "Eu",
    "name": "Europium",
    "level1_basic": {
      "type": "Lanthanide",
      "group": null,
      "period": "6",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + f)",
      "commonIons": "Eu²⁺ (Europium(II)), Eu³⁺ (Europium(III))",
      "block": "f",
      "series": "Lanthanide"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "151.96",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 63,
      "electronsNeutral": 63,
      "naturalIsotopes": [
        {
          "name": "Eu-151",
          "neutron": "88n",
          "percent": "Stable"
        },
        {
          "name": "Eu-153",
          "neutron": "90n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 4f⁷ 6s²",
        "oxidationStates": {
          "common": [
            "+2",
            "+3"
          ],
          "possible": []
        }
      },
      "physical": {
        "electronegativity": 1.2,
        "firstIonization": "547 kJ/mol",
        "density": "5.244 g/cm³",
        "meltingPoint": "826°C",
        "boilingPoint": "1529°C",
        "electronAffinity": "50 kJ/mol",
        "atomicRadius": "185 pm",
        "specificHeat": "0.1820 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1901",
        "discoveredBy": "Eugène-Anatole Demarçay",
        "namedBy": "From Europe"
      },
      "stseContext": [
        "Anti-counterfeiting (Glowing dyes in Euro banknotes)"
      ],
      "commonUses": [
        "Red phosphors in TV screens/LEDs",
        "Fluorescent probes"
      ],
      "hazards": [
        "Reacts vividly with water",
        "non-toxic"
      ]
    },
    "uiLayout": {
      "fallbackDisplayRow": "9",
      "fallbackDisplayColumn": 9
    },
    "dataQualityNotes": [
      "Group is null because f-block elements are typically separated from the 1-18 group numbering system."
    ]
  },
  "64": {
    "id": 64,
    "symbol": "Gd",
    "name": "Gadolinium",
    "level1_basic": {
      "type": "Lanthanide",
      "group": null,
      "period": "6",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d + f)",
      "commonIons": "Gd³⁺ (Gadolinium(III))",
      "block": "f",
      "series": "Lanthanide"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "157.25",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 64,
      "electronsNeutral": 64,
      "naturalIsotopes": [
        {
          "name": "Gd-154",
          "neutron": "90n",
          "percent": "Stable"
        },
        {
          "name": "Gd-155",
          "neutron": "91n",
          "percent": "Stable"
        },
        {
          "name": "Gd-156",
          "neutron": "92n",
          "percent": "Stable"
        },
        {
          "name": "Gd-157",
          "neutron": "93n",
          "percent": "Stable"
        },
        {
          "name": "Gd-158",
          "neutron": "94n",
          "percent": "Stable"
        },
        {
          "name": "Gd-160",
          "neutron": "96n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 4f⁷ 5d¹ 6s²",
        "configurationNote": "Anomalous configuration associated with extra stability of the half-filled 4f subshell.",
        "oxidationStates": {
          "common": [
            "+3"
          ],
          "possible": [
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.2,
        "firstIonization": "593 kJ/mol",
        "density": "7.90 g/cm³",
        "meltingPoint": "1313°C",
        "boilingPoint": "3273°C",
        "electronAffinity": "50 kJ/mol",
        "atomicRadius": "180 pm",
        "specificHeat": "0.2400 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1880",
        "discoveredBy": "Jean Charles Galissard de Marignac",
        "namedBy": "From Mineral Gadolinite (after Johan Gadolin)"
      },
      "stseContext": [
        "Medical Imaging (MRI Contrast Agents)"
      ],
      "commonUses": [
        "MRI Contrast agents (Magnevist)",
        "Neutron shielding",
        "Magnetic refrigeration"
      ],
      "hazards": [
        "Free ion is toxic",
        "chelated form used medically"
      ]
    },
    "uiLayout": {
      "fallbackDisplayRow": "9",
      "fallbackDisplayColumn": 10
    },
    "dataQualityNotes": [
      "Group is null because f-block elements are typically separated from the 1-18 group numbering system."
    ]
  },
  "65": {
    "id": 65,
    "symbol": "Tb",
    "name": "Terbium",
    "level1_basic": {
      "type": "Lanthanide",
      "group": null,
      "period": "6",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + f)",
      "commonIons": "Tb³⁺ (Terbium(III))",
      "block": "f",
      "series": "Lanthanide"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "158.93",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 65,
      "electronsNeutral": 65,
      "naturalIsotopes": [
        {
          "name": "Tb-159",
          "neutron": "94n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 4f⁹ 6s²",
        "oxidationStates": {
          "common": [
            "+3"
          ],
          "possible": [
            "+4",
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.1,
        "firstIonization": "566 kJ/mol",
        "density": "8.23 g/cm³",
        "meltingPoint": "1356°C",
        "boilingPoint": "3230°C",
        "electronAffinity": "50 kJ/mol",
        "atomicRadius": "175 pm",
        "specificHeat": "0.1820 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1843",
        "discoveredBy": "Carl Gustaf Mosander",
        "namedBy": "From Ytterby, Sweden"
      },
      "stseContext": [
        "Green Energy (Low-energy lighting phosphors)"
      ],
      "commonUses": [
        "Green phosphors (fluorescent lamps)",
        "Terfenol-D (magnetostrictive alloy)"
      ],
      "hazards": [
        "Low toxicity"
      ]
    },
    "uiLayout": {
      "fallbackDisplayRow": "9",
      "fallbackDisplayColumn": 11
    },
    "dataQualityNotes": [
      "Group is null because f-block elements are typically separated from the 1-18 group numbering system."
    ]
  },
  "66": {
    "id": 66,
    "symbol": "Dy",
    "name": "Dysprosium",
    "level1_basic": {
      "type": "Lanthanide",
      "group": null,
      "period": "6",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + f)",
      "commonIons": "Dy³⁺ (Dysprosium(III))",
      "block": "f",
      "series": "Lanthanide"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "162.50",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 66,
      "electronsNeutral": 66,
      "naturalIsotopes": [
        {
          "name": "Dy-156",
          "neutron": "90n",
          "percent": "Stable"
        },
        {
          "name": "Dy-158",
          "neutron": "92n",
          "percent": "Stable"
        },
        {
          "name": "Dy-160",
          "neutron": "94n",
          "percent": "Stable"
        },
        {
          "name": "Dy-161",
          "neutron": "95n",
          "percent": "Stable"
        },
        {
          "name": "Dy-162",
          "neutron": "96n",
          "percent": "Stable"
        },
        {
          "name": "Dy-163",
          "neutron": "97n",
          "percent": "Stable"
        },
        {
          "name": "Dy-164",
          "neutron": "98n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 4f¹⁰ 6s²",
        "oxidationStates": {
          "common": [
            "+3"
          ],
          "possible": [
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.22,
        "firstIonization": "573 kJ/mol",
        "density": "8.540 g/cm³",
        "meltingPoint": "1412°C",
        "boilingPoint": "2567°C",
        "electronAffinity": "50 kJ/mol",
        "atomicRadius": "175 pm",
        "specificHeat": "0.1670 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1886",
        "discoveredBy": "Lecoq de Boisbaudran",
        "namedBy": "From Greek dysprositos (hard to get)"
      },
      "stseContext": [
        "Electric Vehicles (Magnet additives)"
      ],
      "commonUses": [
        "Neodymium magnet additive (increases heat resistance)",
        "Control rods"
      ],
      "hazards": [
        "Low toxicity",
        "dust is flammable"
      ]
    },
    "uiLayout": {
      "fallbackDisplayRow": "9",
      "fallbackDisplayColumn": 12
    },
    "dataQualityNotes": [
      "Group is null because f-block elements are typically separated from the 1-18 group numbering system."
    ]
  },
  "67": {
    "id": 67,
    "symbol": "Ho",
    "name": "Holmium",
    "level1_basic": {
      "type": "Lanthanide",
      "group": null,
      "period": "6",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + f)",
      "commonIons": "Ho³⁺ (Holmium(III))",
      "block": "f",
      "series": "Lanthanide"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "164.93",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 67,
      "electronsNeutral": 67,
      "naturalIsotopes": [
        {
          "name": "Ho-165",
          "neutron": "98n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 4f¹¹ 6s²",
        "oxidationStates": {
          "common": [
            "+3"
          ],
          "possible": [
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.23,
        "firstIonization": "581 kJ/mol",
        "density": "8.795 g/cm³",
        "meltingPoint": "1474°C",
        "boilingPoint": "2700°C",
        "electronAffinity": "50 kJ/mol",
        "atomicRadius": "175 pm",
        "specificHeat": "0.1650 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1878",
        "discoveredBy": "Jacques-Louis Soret",
        "namedBy": "From Holmia (Latin for Stockholm)"
      },
      "stseContext": [
        "Medical Surgery (Ho:YAG Lasers)"
      ],
      "commonUses": [
        "Surgical lasers (kidney stones)",
        "Strongest magnetic fields (magnetic flux concentrator)"
      ],
      "hazards": [
        "Low toxicity"
      ]
    },
    "uiLayout": {
      "fallbackDisplayRow": "9",
      "fallbackDisplayColumn": 13
    },
    "dataQualityNotes": [
      "Group is null because f-block elements are typically separated from the 1-18 group numbering system."
    ]
  },
  "68": {
    "id": 68,
    "symbol": "Er",
    "name": "Erbium",
    "level1_basic": {
      "type": "Lanthanide",
      "group": null,
      "period": "6",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + f)",
      "commonIons": "Er³⁺ (Erbium(III))",
      "block": "f",
      "series": "Lanthanide"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "167.26",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 68,
      "electronsNeutral": 68,
      "naturalIsotopes": [
        {
          "name": "Er-162",
          "neutron": "94n",
          "percent": "Stable"
        },
        {
          "name": "Er-164",
          "neutron": "96n",
          "percent": "Stable"
        },
        {
          "name": "Er-166",
          "neutron": "98n",
          "percent": "Stable"
        },
        {
          "name": "Er-167",
          "neutron": "99n",
          "percent": "Stable"
        },
        {
          "name": "Er-168",
          "neutron": "100n",
          "percent": "Stable"
        },
        {
          "name": "Er-170",
          "neutron": "102n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 4f¹² 6s²",
        "oxidationStates": {
          "common": [
            "+3"
          ],
          "possible": [
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.24,
        "firstIonization": "589 kJ/mol",
        "density": "9.066 g/cm³",
        "meltingPoint": "1529°C",
        "boilingPoint": "2868°C",
        "electronAffinity": "50 kJ/mol",
        "atomicRadius": "175 pm",
        "specificHeat": "0.1680 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1843",
        "discoveredBy": "Carl Gustaf Mosander",
        "namedBy": "From Ytterby, Sweden"
      },
      "stseContext": [
        "Telecommunications (Fiber optic signal amplifiers)"
      ],
      "commonUses": [
        "EDFA (Erbium-Doped Fiber Amplifiers)",
        "Dermatology lasers",
        "Pink glass coloring"
      ],
      "hazards": [
        "Low toxicity"
      ]
    },
    "uiLayout": {
      "fallbackDisplayRow": "9",
      "fallbackDisplayColumn": 14
    },
    "dataQualityNotes": [
      "Group is null because f-block elements are typically separated from the 1-18 group numbering system."
    ]
  },
  "69": {
    "id": 69,
    "symbol": "Tm",
    "name": "Thulium",
    "level1_basic": {
      "type": "Lanthanide",
      "group": null,
      "period": "6",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + f)",
      "commonIons": "Tm³⁺ (Thulium(III))",
      "block": "f",
      "series": "Lanthanide"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "168.93",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 69,
      "electronsNeutral": 69,
      "naturalIsotopes": [
        {
          "name": "Tm-169",
          "neutron": "100n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 4f¹³ 6s²",
        "oxidationStates": {
          "common": [
            "+3"
          ],
          "possible": [
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.25,
        "firstIonization": "597 kJ/mol",
        "density": "9.32 g/cm³",
        "meltingPoint": "1545°C",
        "boilingPoint": "1950°C",
        "electronAffinity": "50 kJ/mol",
        "atomicRadius": "175 pm",
        "specificHeat": "0.1600 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1879",
        "discoveredBy": "Per Teodor Cleve",
        "namedBy": "From Thule (mythical North)"
      },
      "stseContext": [
        "Portable X-rays (Tm-170 source)"
      ],
      "commonUses": [
        "Portable X-ray machines",
        "Lasers",
        "Euro banknotes"
      ],
      "hazards": [
        "Low toxicity"
      ]
    },
    "uiLayout": {
      "fallbackDisplayRow": "9",
      "fallbackDisplayColumn": 15
    },
    "dataQualityNotes": [
      "Group is null because f-block elements are typically separated from the 1-18 group numbering system."
    ]
  },
  "70": {
    "id": 70,
    "symbol": "Yb",
    "name": "Ytterbium",
    "level1_basic": {
      "type": "Lanthanide",
      "group": null,
      "period": "6",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + f)",
      "commonIons": "Yb²⁺ (Ytterbium(II)), Yb³⁺ (Ytterbium(III))",
      "block": "f",
      "series": "Lanthanide"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "173.05",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 70,
      "electronsNeutral": 70,
      "naturalIsotopes": [
        {
          "name": "Yb-168",
          "neutron": "98n",
          "percent": "Stable"
        },
        {
          "name": "Yb-170",
          "neutron": "100n",
          "percent": "Stable"
        },
        {
          "name": "Yb-171",
          "neutron": "101n",
          "percent": "Stable"
        },
        {
          "name": "Yb-172",
          "neutron": "102n",
          "percent": "Stable"
        },
        {
          "name": "Yb-173",
          "neutron": "103n",
          "percent": "Stable"
        },
        {
          "name": "Yb-174",
          "neutron": "104n",
          "percent": "Stable"
        },
        {
          "name": "Yb-176",
          "neutron": "106n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 4f¹⁴ 6s²",
        "oxidationStates": {
          "common": [
            "+2",
            "+3"
          ],
          "possible": []
        }
      },
      "physical": {
        "electronegativity": 1.1,
        "firstIonization": "603 kJ/mol",
        "density": "6.90 g/cm³",
        "meltingPoint": "824°C",
        "boilingPoint": "1196°C",
        "electronAffinity": "N/A",
        "atomicRadius": "175 pm",
        "specificHeat": "0.1540 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1878",
        "discoveredBy": "Jean Charles Galissard de Marignac",
        "namedBy": "From Ytterby, Sweden"
      },
      "stseContext": [
        "Atomic Clocks (World's most stable clocks)"
      ],
      "commonUses": [
        "Fiber lasers",
        "Stress gauges",
        "Atomic clocks"
      ],
      "hazards": [
        "Eye/skin irritant"
      ]
    },
    "uiLayout": {
      "fallbackDisplayRow": "9",
      "fallbackDisplayColumn": 16
    },
    "dataQualityNotes": [
      "Group is null because f-block elements are typically separated from the 1-18 group numbering system."
    ]
  },
  "71": {
    "id": 71,
    "symbol": "Lu",
    "name": "Lutetium",
    "level1_basic": {
      "type": "Lanthanide",
      "group": null,
      "period": "6",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "Lu³⁺ (Lutetium)",
      "block": "f",
      "series": "Lanthanide"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "174.97",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 71,
      "electronsNeutral": 71,
      "naturalIsotopes": [
        {
          "name": "Lu-175",
          "neutron": "104n",
          "percent": "Stable"
        },
        {
          "name": "Lu-176",
          "neutron": "105n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 4f¹⁴ 5d¹ 6s²",
        "oxidationStates": {
          "common": [
            "+3"
          ],
          "possible": [
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.27,
        "firstIonization": "524 kJ/mol",
        "density": "9.841 g/cm³",
        "meltingPoint": "1663°C",
        "boilingPoint": "3402°C",
        "electronAffinity": "31 kJ/mol",
        "atomicRadius": "175 pm",
        "specificHeat": "0.1540 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1907",
        "discoveredBy": "Georges Urbain",
        "namedBy": "From Lutetia (Paris)"
      },
      "stseContext": [
        "Cancer Therapy (Lu-177 radiotherapy)",
        "Petroleum cracking"
      ],
      "commonUses": [
        "PET scan detectors (LSO crystals)",
        "Cancer treatment",
        "Catalysts"
      ],
      "hazards": [
        "Low toxicity"
      ]
    },
    "uiLayout": {
      "fallbackDisplayRow": "9",
      "fallbackDisplayColumn": 17
    },
    "dataQualityNotes": [
      "Group is null because f-block elements are typically separated from the 1-18 group numbering system."
    ]
  },
  "72": {
    "id": 72,
    "symbol": "Hf",
    "name": "Hafnium",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 4,
      "period": "6",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+4"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "178.49",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 72,
      "electronsNeutral": 72,
      "naturalIsotopes": [
        {
          "name": "Hf-176",
          "neutron": "104n",
          "percent": "Stable"
        },
        {
          "name": "Hf-177",
          "neutron": "105n",
          "percent": "Stable"
        },
        {
          "name": "Hf-178",
          "neutron": "106n",
          "percent": "Stable"
        },
        {
          "name": "Hf-179",
          "neutron": "107n",
          "percent": "Stable"
        },
        {
          "name": "Hf-180",
          "neutron": "108n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 4f¹⁴ 5d² 6s²",
        "oxidationStates": {
          "common": [
            "+4"
          ],
          "possible": [
            "+3",
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.3,
        "firstIonization": "659 kJ/mol",
        "density": "13.31 g/cm³",
        "meltingPoint": "2233°C",
        "boilingPoint": "4603°C",
        "electronAffinity": "78.6 kJ/mol",
        "atomicRadius": "155 pm",
        "specificHeat": "0.1440 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1923",
        "discoveredBy": "Dirk Coster & George de Hevesy",
        "namedBy": "From Hafnia (Copenhagen)"
      },
      "stseContext": [
        "Nuclear Reactors (Control rods)",
        "Microprocessors"
      ],
      "commonUses": [
        "Nuclear control rods (absorbs neutrons)",
        "Plasma cutting tips",
        "Intel chips (high-k dielectric)"
      ],
      "hazards": [
        "Fine dust is pyrophoric"
      ]
    }
  },
  "73": {
    "id": 73,
    "symbol": "Ta",
    "name": "Tantalum",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 5,
      "period": "6",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+5"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "180.95",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 73,
      "electronsNeutral": 73,
      "naturalIsotopes": [
        {
          "name": "Ta-180m",
          "neutron": "107n",
          "percent": "Stable (metastable isomer, 0.012%)"
        },
        {
          "name": "Ta-181",
          "neutron": "108n",
          "percent": "Stable (99.988%)"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 4f¹⁴ 5d³ 6s²",
        "oxidationStates": {
          "common": [
            "+5"
          ],
          "possible": [
            "+4",
            "+3",
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.5,
        "firstIonization": "761 kJ/mol",
        "density": "16.69 g/cm³",
        "meltingPoint": "3017°C",
        "boilingPoint": "5458°C",
        "electronAffinity": "14.5 kJ/mol",
        "atomicRadius": "145 pm",
        "specificHeat": "0.1400 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1802",
        "discoveredBy": "Anders Gustaf Ekeberg",
        "namedBy": "From Tantalus (Greek mythology)"
      },
      "stseContext": [
        "Electronics Supply Chain (\"Conflict mineral\")"
      ],
      "commonUses": [
        "Capacitors in smartphones/laptops",
        "Surgical implants (inert)"
      ],
      "hazards": [
        "Low toxicity",
        "biocompatible"
      ]
    },
    "isotopeNotes": "Naturally occurring ¹⁸⁰ᵐTa is a metastable nuclear isomer — the only naturally occurring metastable isomer. The ground state ¹⁸⁰Ta (t½ ~8 h) has never been observed in nature. ¹⁸⁰ᵐTa is observationally stable (t½ > 1.2×10¹⁵ y).",
    "chemistryNotes": "Tantalum most commonly exhibits +5 oxidation state in compounds such as Ta₂O₅. The earlier listing of 'None' for common ions was incorrect. Tantalum exhibits the +5 oxidation state but does not form simple Ta⁵⁺ aqueous ions."
  },
  "74": {
    "id": 74,
    "symbol": "W",
    "name": "Tungsten",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 6,
      "period": "6",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+6, +5, +4"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "183.84",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 74,
      "electronsNeutral": 74,
      "naturalIsotopes": [
        {
          "name": "W-180",
          "neutron": "106n",
          "percent": "Radioactive (0.12%, α-decay, t½ ~1.8×10¹⁸ y)"
        },
        {
          "name": "W-182",
          "neutron": "108n",
          "percent": "Stable (26.50%)"
        },
        {
          "name": "W-183",
          "neutron": "109n",
          "percent": "Stable (14.31%)"
        },
        {
          "name": "W-184",
          "neutron": "110n",
          "percent": "Stable (30.64%)"
        },
        {
          "name": "W-186",
          "neutron": "112n",
          "percent": "Radioactive (28.43%, t½ ~4.1×10¹⁸ y, α)"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 4f¹⁴ 5d⁴ 6s²",
        "oxidationStates": {
          "common": [
            "+6"
          ],
          "possible": [
            "+5",
            "+4",
            "+3",
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 2.36,
        "firstIonization": "770 kJ/mol",
        "density": "19.25 g/cm³",
        "meltingPoint": "3422°C",
        "boilingPoint": "5555°C",
        "electronAffinity": "106.1 kJ/mol",
        "atomicRadius": "135 pm",
        "specificHeat": "0.1320 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1783",
        "discoveredBy": "Juan José & Fausto Elhuyar",
        "namedBy": "Swedish tung sten (heavy stone); Symbol W from Wolfram"
      },
      "stseContext": [
        "Lighting (Incandescent filaments)",
        "Military (Kinetic bombardment)"
      ],
      "commonUses": [
        "Light bulb filaments",
        "TIG welding",
        "Armor-piercing ammunition"
      ],
      "hazards": [
        "Dust irritates lungs",
        "largely non-toxic"
      ]
    },
    "isotopeNotes": "Natural tungsten has five isotopes. ¹⁸⁰W and ¹⁸⁶W are very mildly radioactive (α-emitters with extremely long half-lives). ¹⁸²W, ¹⁸³W, and ¹⁸⁴W are observationally stable.",
    "chemistryNotes": "The +6 oxidation state is most common (WO₃, WO₄²⁻, WF₆). The older boiling point value of 5930°C found in some references is now considered outdated; modern consensus favors ~5555°C (CRC, RSC). Tungsten does not form a simple W⁶⁺ monatomic ion."
  },
  "75": {
    "id": 75,
    "symbol": "Re",
    "name": "Rhenium",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 7,
      "period": "6",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+7"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "186.21",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 75,
      "electronsNeutral": 75,
      "naturalIsotopes": [
        {
          "name": "Re-185",
          "neutron": "110n",
          "percent": "Stable"
        },
        {
          "name": "Re-187",
          "neutron": "112n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 4f¹⁴ 5d⁵ 6s²",
        "oxidationStates": {
          "common": [
            "+7"
          ],
          "possible": [
            "+6",
            "+5",
            "+4",
            "+3",
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.9,
        "firstIonization": "760 kJ/mol",
        "density": "21.02 g/cm³",
        "meltingPoint": "3186°C",
        "boilingPoint": "5596°C",
        "electronAffinity": "151 kJ/mol",
        "atomicRadius": "135 pm",
        "specificHeat": "0.1370 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1925",
        "discoveredBy": "Walter Noddack, Ida Tacke, Otto Berg",
        "namedBy": "From Rhenus (Rhine River)"
      },
      "stseContext": [
        "Aerospace (Jet engine superalloys)"
      ],
      "commonUses": [
        "Jet engine turbine blades",
        "Thermocouples",
        "Catalysts"
      ],
      "hazards": [
        "Low toxicity"
      ]
    }
  },
  "76": {
    "id": 76,
    "symbol": "Os",
    "name": "Osmium",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 8,
      "period": "6",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+4, +8"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "190.23",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 76,
      "electronsNeutral": 76,
      "naturalIsotopes": [
        {
          "name": "Os-186",
          "neutron": "110n",
          "percent": "Stable"
        },
        {
          "name": "Os-187",
          "neutron": "111n",
          "percent": "Stable"
        },
        {
          "name": "Os-188",
          "neutron": "112n",
          "percent": "Stable"
        },
        {
          "name": "Os-189",
          "neutron": "113n",
          "percent": "Stable"
        },
        {
          "name": "Os-190",
          "neutron": "114n",
          "percent": "Stable"
        },
        {
          "name": "Os-192",
          "neutron": "116n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 4f¹⁴ 5d⁶ 6s²",
        "oxidationStates": {
          "common": [
            "+4",
            "+8"
          ],
          "possible": [
            "+2",
            "+3",
            "+6",
            "+7"
          ]
        }
      },
      "physical": {
        "electronegativity": 2.2,
        "firstIonization": "840 kJ/mol",
        "density": "22.59 g/cm³",
        "meltingPoint": "3033°C",
        "boilingPoint": "5012°C",
        "electronAffinity": "205.3 kJ/mol",
        "atomicRadius": "130 pm",
        "specificHeat": "0.1300 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1803",
        "discoveredBy": "Smithson Tennant",
        "namedBy": "From Greek osme (smell)"
      },
      "stseContext": [
        "Density limits (Densest naturally occurring substance)"
      ],
      "commonUses": [
        "Fountain pen tips",
        "Electrical contacts",
        "Fingerprint detection"
      ],
      "hazards": [
        "OsO₄ is extremely toxic and volatile (causes blindness)"
      ]
    }
  },
  "77": {
    "id": 77,
    "symbol": "Ir",
    "name": "Iridium",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 9,
      "period": "6",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+3, +4"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "192.22",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 77,
      "electronsNeutral": 77,
      "naturalIsotopes": [
        {
          "name": "Ir-191",
          "neutron": "114n",
          "percent": "Stable"
        },
        {
          "name": "Ir-193",
          "neutron": "116n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 4f¹⁴ 5d⁷ 6s²",
        "oxidationStates": {
          "common": [
            "+3",
            "+4"
          ],
          "possible": [
            "+1",
            "+2",
            "+5",
            "+6"
          ]
        }
      },
      "physical": {
        "electronegativity": 2.2,
        "firstIonization": "880 kJ/mol",
        "density": "22.56 g/cm³",
        "meltingPoint": "2466°C",
        "boilingPoint": "4428°C",
        "electronAffinity": "222.8 kJ/mol",
        "atomicRadius": "135 pm",
        "specificHeat": "0.1310 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1803",
        "discoveredBy": "Smithson Tennant",
        "namedBy": "From Greek iris (rainbow, due to salt colors)"
      },
      "stseContext": [
        "Geology (K-Pg boundary layer evidence for Dinosaur extinction)"
      ],
      "commonUses": [
        "Spark plugs",
        "Crucibles",
        "Standard Metre Bar (Pt-Ir alloy)"
      ],
      "hazards": [
        "Low toxicity",
        "dust is flammable"
      ]
    }
  },
  "78": {
    "id": 78,
    "symbol": "Pt",
    "name": "Platinum",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 10,
      "period": "6",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+2, +4"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "195.08",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 78,
      "electronsNeutral": 78,
      "naturalIsotopes": [
        {
          "name": "Pt-190",
          "neutron": "112n",
          "percent": "Radioactive"
        },
        {
          "name": "Pt-192",
          "neutron": "114n",
          "percent": "Stable"
        },
        {
          "name": "Pt-194",
          "neutron": "116n",
          "percent": "Stable"
        },
        {
          "name": "Pt-195",
          "neutron": "117n",
          "percent": "Stable"
        },
        {
          "name": "Pt-196",
          "neutron": "118n",
          "percent": "Stable"
        },
        {
          "name": "Pt-198",
          "neutron": "120n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 4f¹⁴ 5d⁹ 6s¹",
        "oxidationStates": {
          "common": [
            "+2",
            "+4"
          ],
          "possible": [
            "0",
            "+1",
            "+3",
            "+6"
          ]
        }
      },
      "physical": {
        "electronegativity": 2.28,
        "firstIonization": "870 kJ/mol",
        "density": "21.45 g/cm³",
        "meltingPoint": "1768.3°C",
        "boilingPoint": "3825°C",
        "electronAffinity": "N/A",
        "atomicRadius": "135 pm",
        "specificHeat": "0.1330 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1735",
        "discoveredBy": "Antonio de Ulloa",
        "namedBy": "From Spanish platina (little silver)"
      },
      "stseContext": [
        "Green Technology (Hydrogen Fuel Cells)",
        "Medicine (Chemotherapy)"
      ],
      "commonUses": [
        "Catalytic converters",
        "Jewelry",
        "Pacemaker electrodes",
        "Cisplatin (cancer drug)"
      ],
      "hazards": [
        "Metallic Pt is inert",
        "salts can cause asthma"
      ]
    }
  },
  "79": {
    "id": 79,
    "symbol": "Au",
    "name": "Gold",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 11,
      "period": "6",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "Au⁺ (Gold(I)), Au³⁺ (Gold(III))"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "196.97",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 79,
      "electronsNeutral": 79,
      "naturalIsotopes": [
        {
          "name": "Au-197",
          "neutron": "118n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 4f¹⁴ 5d¹⁰ 6s¹",
        "oxidationStates": {
          "common": [
            "+1",
            "+3"
          ],
          "possible": [
            "+2",
            "+5"
          ]
        }
      },
      "physical": {
        "electronegativity": 2.54,
        "firstIonization": "890 kJ/mol",
        "density": "19.30 g/cm³",
        "meltingPoint": "1064.2°C",
        "boilingPoint": "2856°C",
        "electronAffinity": "19.2 kJ/mol",
        "atomicRadius": "135 pm",
        "specificHeat": "0.1291 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "Prehistoric (~6000 BCE)",
        "discoveredBy": "Ancient Civilizations",
        "namedBy": "Anglo-Saxon gold (Symbol Au from Latin aurum)"
      },
      "stseContext": [
        "Economics (Gold Standard)",
        "Electronics (Corrosion-free contacts)"
      ],
      "commonUses": [
        "Currency/Jewelry",
        "Electronics plating",
        "Radiation shielding"
      ],
      "hazards": [
        "Non-toxic (edible in leaf form)"
      ]
    }
  },
  "80": {
    "id": 80,
    "symbol": "Hg",
    "name": "Mercury",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 12,
      "period": "6",
      "phaseAtSTP": "Liquid",
      "valenceElectrons": "2",
      "commonIons": "Hg₂²⁺ (Mercury(I)), Hg²⁺ (Mercury(II))"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "200.59",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 80,
      "electronsNeutral": 80,
      "naturalIsotopes": [
        {
          "name": "Hg-196",
          "neutron": "116n",
          "percent": "Stable"
        },
        {
          "name": "Hg-198",
          "neutron": "118n",
          "percent": "Stable"
        },
        {
          "name": "Hg-199",
          "neutron": "119n",
          "percent": "Stable"
        },
        {
          "name": "Hg-200",
          "neutron": "120n",
          "percent": "Stable"
        },
        {
          "name": "Hg-201",
          "neutron": "121n",
          "percent": "Stable"
        },
        {
          "name": "Hg-202",
          "neutron": "122n",
          "percent": "Stable"
        },
        {
          "name": "Hg-204",
          "neutron": "124n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 4f¹⁴ 5d¹⁰ 6s²",
        "oxidationStates": {
          "common": [
            "+1",
            "+2"
          ],
          "possible": []
        }
      },
      "physical": {
        "electronegativity": 2,
        "firstIonization": "1007 kJ/mol",
        "density": "13.534 g/cm³",
        "meltingPoint": "-38.83°C",
        "boilingPoint": "356.7°C",
        "electronAffinity": "35.1 kJ/mol",
        "atomicRadius": "150 pm",
        "specificHeat": "0.1395 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "~1500 BCE",
        "discoveredBy": "Ancient Egyptians/Chinese",
        "namedBy": "From Planet Mercury (Symbol Hg from hydrargyrum)"
      },
      "stseContext": [
        "Environmental Toxicology (Minamata disease)",
        "Bioaccumulation in fish"
      ],
      "commonUses": [
        "Thermometers (historical)",
        "Dental amalgam",
        "Fluorescent bulbs"
      ],
      "hazards": [
        "Highly toxic neurotoxin (vapor and compounds)"
      ]
    }
  },
  "81": {
    "id": 81,
    "symbol": "Tl",
    "name": "Thallium",
    "level1_basic": {
      "type": "Post-transition Metal",
      "group": 13,
      "period": "6",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "3 (acts like 1)",
      "commonIons": "Tl⁺ (Thallium(I)), Tl³⁺ (Thallium(III))"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "204.38",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 81,
      "electronsNeutral": 81,
      "naturalIsotopes": [
        {
          "name": "Tl-203",
          "neutron": "122n",
          "percent": "Stable"
        },
        {
          "name": "Tl-205",
          "neutron": "124n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹",
        "oxidationStates": {
          "common": [
            "+1",
            "+3"
          ],
          "possible": []
        }
      },
      "physical": {
        "electronegativity": 1.62,
        "firstIonization": "589 kJ/mol",
        "density": "11.85 g/cm³",
        "meltingPoint": "304°C",
        "boilingPoint": "1473°C",
        "electronAffinity": "91.2 kJ/mol",
        "atomicRadius": "190 pm",
        "specificHeat": "0.1290 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1861",
        "discoveredBy": "William Crookes",
        "namedBy": "From Greek thallos (green twig)"
      },
      "stseContext": [
        "Forensic Science (\"The Poisoner's Poison\")"
      ],
      "commonUses": [
        "Rat poison (banned)",
        "Electronics",
        "Cardiac stress tests (Tl-201)"
      ],
      "hazards": [
        "Extremely toxic",
        "accumulates in body"
      ]
    }
  },
  "82": {
    "id": 82,
    "symbol": "Pb",
    "name": "Lead",
    "level1_basic": {
      "type": "Post-transition Metal",
      "group": 14,
      "period": "6",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "4",
      "commonIons": "Pb²⁺ (Lead(II)), Pb⁴⁺ (Lead(IV))"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "207.2",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 82,
      "electronsNeutral": 82,
      "naturalIsotopes": [
        {
          "name": "Pb-204",
          "neutron": "122n",
          "percent": "Stable"
        },
        {
          "name": "Pb-206",
          "neutron": "124n",
          "percent": "Stable"
        },
        {
          "name": "Pb-207",
          "neutron": "125n",
          "percent": "Stable"
        },
        {
          "name": "Pb-208",
          "neutron": "126n",
          "percent": "Stable"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²",
        "oxidationStates": {
          "common": [
            "+2",
            "+4"
          ],
          "possible": []
        }
      },
      "physical": {
        "electronegativity": 2.33,
        "firstIonization": "716 kJ/mol",
        "density": "11.34 g/cm³",
        "meltingPoint": "327.5°C",
        "boilingPoint": "1749°C",
        "electronAffinity": "183.3 kJ/mol",
        "atomicRadius": "180 pm",
        "specificHeat": "0.1270 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "~7000 BCE",
        "discoveredBy": "Ancient Civilizations",
        "namedBy": "Anglo-Saxon lead (Symbol Pb from Latin plumbum)"
      },
      "stseContext": [
        "Public Health (Flint Water Crisis)",
        "Environmental banning (Leaded gasoline)"
      ],
      "commonUses": [
        "Car batteries (Pb-acid)",
        "Radiation shielding",
        "Bullets"
      ],
      "hazards": [
        "Potent neurotoxin",
        "affects IQ in children"
      ]
    }
  },
  "83": {
    "id": 83,
    "symbol": "Bi",
    "name": "Bismuth",
    "level1_basic": {
      "type": "Post-transition Metal",
      "group": 15,
      "period": "6",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "5",
      "commonIons": "Bi³⁺ (Bismuth(III))"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "208.98",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 83,
      "electronsNeutral": 83,
      "naturalIsotopes": [
        {
          "name": "Bi-209",
          "neutron": "126n",
          "percent": "Radioactive (100%, α, t½ ~2.01×10¹⁹ y)"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³",
        "oxidationStates": {
          "common": [
            "+3",
            "+5"
          ],
          "possible": []
        }
      },
      "physical": {
        "electronegativity": 2.02,
        "firstIonization": "703 kJ/mol",
        "density": "9.78 g/cm³",
        "meltingPoint": "271.4°C",
        "boilingPoint": "1564°C",
        "electronAffinity": "270.1 kJ/mol",
        "atomicRadius": "160 pm",
        "specificHeat": "0.1220 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "~1000 CE",
        "discoveredBy": "Alchemists (confused with Pb/Sn)",
        "namedBy": "German Wismut (mass)"
      },
      "stseContext": [
        "Green Chemistry (Non-toxic lead replacement)"
      ],
      "commonUses": [
        "Pepto-Bismol (Stomach relief)",
        "Lead-free shot/solder",
        "Fire sprinklers"
      ],
      "hazards": [
        "Low toxicity (unusual for heavy metals)"
      ]
    },
    "isotopeNotes": "²⁰⁹Bi was long considered the heaviest stable isotope. In 2003 it was shown to be α-radioactive with an extraordinarily long half-life of ~2.01×10¹⁹ years."
  },
  "84": {
    "id": 84,
    "symbol": "Po",
    "name": "Polonium",
    "level1_basic": {
      "type": "Post-transition Metal",
      "group": 16,
      "period": "6",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "6",
      "commonIons": "Po²⁺ (Polonium(II)), Po⁴⁺ (Polonium(IV))"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "[209] (Radioactive)",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 84,
      "electronsNeutral": 84,
      "naturallyOccurringRadioisotopes": [
        {
          "name": "Po-209",
          "neutron": "125n",
          "percent": "Radioactive"
        },
        {
          "name": "Po-210",
          "neutron": "126n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴",
        "oxidationStates": {
          "common": [
            "-2",
            "+4"
          ],
          "possible": [
            "+2",
            "+6"
          ]
        }
      },
      "physical": {
        "electronegativity": 2,
        "firstIonization": "812 kJ/mol",
        "density": "9.196 g/cm³",
        "meltingPoint": "254°C",
        "boilingPoint": "962°C",
        "electronAffinity": "N/A",
        "atomicRadius": "190 pm",
        "specificHeat": "N/A"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1898",
        "discoveredBy": "Marie & Pierre Curie",
        "namedBy": "From Poland (Marie's homeland)"
      },
      "stseContext": [
        "Nuclear Assassination (Litvinenko poisoning)",
        "Static elimination"
      ],
      "commonUses": [
        "Anti-static brushes",
        "Heat source in satellites (rare)"
      ],
      "hazards": [
        "Extremely radiotoxic (alpha emitter)",
        "fatal in micrograms"
      ]
    }
  },
  "85": {
    "id": 85,
    "symbol": "At",
    "name": "Astatine",
    "level1_basic": {
      "type": "Halogen",
      "group": 17,
      "period": "6",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "7",
      "commonIons": "At⁻ (Astatide, predicted)"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "[210] (Radioactive)",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 85,
      "electronsNeutral": 85,
      "naturallyOccurringRadioisotopes": [
        {
          "name": "At-218",
          "neutron": "133n",
          "percent": "Radioactive (trace, from ²³⁸U chain)"
        },
        {
          "name": "At-219",
          "neutron": "134n",
          "percent": "Radioactive (trace, from ²³⁵U chain)"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵",
        "oxidationStates": {
          "common": [
            "-1"
          ],
          "possible": [
            "+1",
            "+3",
            "+5",
            "+7"
          ]
        }
      },
      "physical": {
        "electronegativity": 2.2,
        "firstIonization": "899 kJ/mol (est)",
        "density": "~6.2–6.5 g/cm³ (est)",
        "meltingPoint": "~302°C (est)",
        "boilingPoint": "~337°C (est)",
        "electronAffinity": "N/A",
        "atomicRadius": "N/A",
        "specificHeat": "N/A"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1940",
        "discoveredBy": "Dale R. Corson, Kenneth Ross MacKenzie, Emilio Segrè",
        "namedBy": "From Greek astatos (unstable)"
      },
      "stseContext": [
        "Targeted Alpha Therapy (Cancer treatment research)"
      ],
      "commonUses": [
        "Medical research only (rarest natural element)"
      ],
      "hazards": [
        "Highly radioactive"
      ]
    },
    "isotopeNotes": "At-218 and At-219 occur in trace amounts in natural uranium decay chains. At-210 and At-211 are synthetic only. At-211 (t½ 7.2 h) is of interest for targeted alpha therapy.",
    "dataQualityNotes": [
      "Density is estimated from periodic trends; bulk astatine has never been observed. Melting and boiling points are extrapolated and carry large uncertainty."
    ]
  },
  "86": {
    "id": 86,
    "symbol": "Rn",
    "name": "Radon",
    "level1_basic": {
      "type": "Noble Gas",
      "group": 18,
      "period": "6",
      "phaseAtSTP": "Gas",
      "valenceElectrons": "8",
      "commonIons": "No common ions",
      "commonOxidationStates": "0"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "[222] (Radioactive)",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 86,
      "electronsNeutral": 86,
      "naturallyOccurringRadioisotopes": [
        {
          "name": "Rn-219",
          "neutron": "133n",
          "percent": "Radioactive (from ²³⁵U chain, t½ 3.96 s)"
        },
        {
          "name": "Rn-220",
          "neutron": "134n",
          "percent": "Radioactive (from ²³²Th chain, t½ 55.6 s)"
        },
        {
          "name": "Rn-222",
          "neutron": "136n",
          "percent": "Radioactive (from ²³⁸U chain, t½ 3.82 d)"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶",
        "oxidationStates": {
          "common": [
            "0"
          ],
          "possible": [
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": null,
        "firstIonization": "1037 kJ/mol",
        "density": "9.73 g/L",
        "meltingPoint": "-71°C",
        "boilingPoint": "-61.7°C",
        "electronAffinity": "N/A",
        "atomicRadius": "N/A",
        "specificHeat": "0.0937 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1900",
        "discoveredBy": "Friedrich Ernst Dorn",
        "namedBy": "Derived from Radium"
      },
      "stseContext": [
        "Indoor Air Quality (Lung cancer risk in basements)"
      ],
      "commonUses": [
        "Radiation therapy (historical)",
        "Earthquake prediction research"
      ],
      "hazards": [
        "Radioactive gas",
        "carcinogen via inhalation"
      ]
    },
    "isotopeNotes": "Rn-211 was erroneously listed previously. The three naturally occurring radon isotopes are ²¹⁹Rn (actinon), ²²⁰Rn (thoron), and ²²²Rn (radon proper), each produced in a different natural decay chain. ²²²Rn is the most significant for health/environment."
  },
  "87": {
    "id": 87,
    "symbol": "Fr",
    "name": "Francium",
    "level1_basic": {
      "type": "Alkali Metal",
      "group": 1,
      "period": "7",
      "phaseAtSTP": "Liquid (predicted)",
      "valenceElectrons": "1",
      "commonIons": "Fr⁺ (Francium)"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "[223] (Radioactive)",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 87,
      "electronsNeutral": 87,
      "naturallyOccurringRadioisotopes": [
        {
          "name": "Fr-223",
          "neutron": "136n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 7s¹",
        "oxidationStates": {
          "common": [
            "+1"
          ],
          "possible": []
        }
      },
      "physical": {
        "electronegativity": 0.79,
        "firstIonization": "380 kJ/mol",
        "density": "~2.48 g/cm³ (pred)",
        "meltingPoint": "~21°C (pred)",
        "boilingPoint": "~677°C (pred)",
        "electronAffinity": "N/A",
        "atomicRadius": "N/A",
        "specificHeat": "N/A"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1939",
        "discoveredBy": "Marguerite Perey",
        "namedBy": "From France"
      },
      "stseContext": [
        "Fundamental Physics (Parity violation studies)"
      ],
      "commonUses": [
        "Research only (due to extreme scarcity and radioactivity)"
      ],
      "hazards": [
        "Highly radioactive"
      ]
    },
    "dataQualityNotes": [
      "All physical properties are predicted. Francium has never been obtained in weighable quantities."
    ]
  },
  "88": {
    "id": 88,
    "symbol": "Ra",
    "name": "Radium",
    "level1_basic": {
      "type": "Alkaline Earth Metal",
      "group": 2,
      "period": "7",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "2",
      "commonIons": "Ra²⁺ (Radium)"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "[226] (Radioactive)",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 88,
      "electronsNeutral": 88,
      "naturallyOccurringRadioisotopes": [
        {
          "name": "Ra-223",
          "neutron": "135n",
          "percent": "Radioactive"
        },
        {
          "name": "Ra-224",
          "neutron": "136n",
          "percent": "Radioactive"
        },
        {
          "name": "Ra-226",
          "neutron": "138n",
          "percent": "Radioactive"
        },
        {
          "name": "Ra-228",
          "neutron": "140n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 7s²",
        "oxidationStates": {
          "common": [
            "+2"
          ],
          "possible": []
        }
      },
      "physical": {
        "electronegativity": 0.9,
        "firstIonization": "509 kJ/mol",
        "density": "5.5 g/cm³",
        "meltingPoint": "696°C",
        "boilingPoint": "1737°C",
        "electronAffinity": "N/A",
        "atomicRadius": "215 pm",
        "specificHeat": "0.0920 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1898",
        "discoveredBy": "Marie & Pierre Curie",
        "namedBy": "Latin radius (ray)"
      },
      "stseContext": [
        "Labor Rights (\"Radium Girls\" poisoning cases)",
        "History of Oncology"
      ],
      "commonUses": [
        "Historical glow-in-the-dark paint (banned)",
        "Cancer treatment (Ra-223)"
      ],
      "hazards": [
        "Highly radiotoxic bone seeker (mimics Calcium)"
      ]
    }
  },
  "89": {
    "id": 89,
    "symbol": "Ac",
    "name": "Actinium",
    "level1_basic": {
      "type": "Actinide",
      "group": null,
      "period": "7",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "Ac³⁺ (Actinium)",
      "block": "f",
      "series": "Actinide"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "[227] (Radioactive)",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 89,
      "electronsNeutral": 89,
      "naturallyOccurringRadioisotopes": [
        {
          "name": "Ac-227",
          "neutron": "138n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 6d¹ 7s²",
        "oxidationStates": {
          "common": [
            "+3"
          ],
          "possible": []
        }
      },
      "physical": {
        "electronegativity": 1.1,
        "firstIonization": "499 kJ/mol",
        "density": "10.07 g/cm³",
        "meltingPoint": "1050°C",
        "boilingPoint": "3198°C",
        "electronAffinity": "N/A",
        "atomicRadius": "195 pm",
        "specificHeat": "0.1200 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1899",
        "discoveredBy": "André-Louis Debierne",
        "namedBy": "Greek aktis (ray)"
      },
      "stseContext": [
        "Targeted Alpha Therapy (TAT) for cancer"
      ],
      "commonUses": [
        "Neutron source",
        "Immunotherapy (Ac-225)"
      ],
      "hazards": [
        "Highly radioactive"
      ]
    },
    "dataQualityNotes": [
      "Some physical properties carry uncertainty due to limited experimental data.",
      "Group is null because f-block elements are typically separated from the 1-18 group numbering system."
    ],
    "uiLayout": {
      "fallbackDisplayRow": "7",
      "fallbackDisplayColumn": 3
    }
  },
  "90": {
    "id": 90,
    "symbol": "Th",
    "name": "Thorium",
    "level1_basic": {
      "type": "Actinide",
      "group": null,
      "period": "7",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d + f)",
      "commonIons": "Th⁴⁺ (Thorium(IV))",
      "block": "f",
      "series": "Actinide"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "232.04",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 90,
      "electronsNeutral": 90,
      "naturallyOccurringRadioisotopes": [
        {
          "name": "Th-232",
          "neutron": "142n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 6d² 7s²",
        "oxidationStates": {
          "common": [
            "+4"
          ],
          "possible": [
            "+3"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.3,
        "firstIonization": "587 kJ/mol",
        "density": "11.72 g/cm³",
        "meltingPoint": "1750°C",
        "boilingPoint": "4788°C",
        "electronAffinity": "N/A",
        "atomicRadius": "180 pm",
        "specificHeat": "0.1180 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1829",
        "discoveredBy": "Jöns Jakob Berzelius",
        "namedBy": "Thor (Norse god of thunder)"
      },
      "stseContext": [
        "Future Energy (Thorium molten salt reactors)"
      ],
      "commonUses": [
        "Gas lantern mantles",
        "TIG welding electrodes",
        "Nuclear fuel potential"
      ],
      "hazards": [
        "Low radioactivity",
        "heavy metal toxicity"
      ]
    },
    "uiLayout": {
      "fallbackDisplayRow": "10",
      "fallbackDisplayColumn": 4
    },
    "dataQualityNotes": [
      "Group is null because f-block elements are typically separated from the 1-18 group numbering system."
    ]
  },
  "91": {
    "id": 91,
    "symbol": "Pa",
    "name": "Protactinium",
    "level1_basic": {
      "type": "Actinide",
      "group": null,
      "period": "7",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d + f)",
      "commonIons": "Pa⁴⁺ (Protactinium(IV))",
      "block": "f",
      "series": "Actinide"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "231.04",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 91,
      "electronsNeutral": 91,
      "naturallyOccurringRadioisotopes": [
        {
          "name": "Pa-231",
          "neutron": "140n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 5f² 6d¹ 7s²",
        "oxidationStates": {
          "common": [
            "+5"
          ],
          "possible": [
            "+4",
            "+3"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.5,
        "firstIonization": "568 kJ/mol",
        "density": "15.37 g/cm³",
        "meltingPoint": "1572°C",
        "boilingPoint": "4027°C (est)",
        "electronAffinity": "N/A",
        "atomicRadius": "180 pm",
        "specificHeat": "0.0991 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1913",
        "discoveredBy": "Fajans & Göhring",
        "namedBy": "Greek protos (first) + actinium"
      },
      "stseContext": [
        "Radiometric dating (Protactinium-Thorium dating)"
      ],
      "commonUses": [
        "Research only"
      ],
      "hazards": [
        "Highly toxic and radioactive"
      ]
    },
    "uiLayout": {
      "fallbackDisplayRow": "10",
      "fallbackDisplayColumn": 5
    },
    "dataQualityNotes": [
      "Group is null because f-block elements are typically separated from the 1-18 group numbering system."
    ]
  },
  "92": {
    "id": 92,
    "symbol": "U",
    "name": "Uranium",
    "level1_basic": {
      "type": "Actinide",
      "group": null,
      "period": "7",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d + f)",
      "commonIons": "U³⁺ (Uranium(III)), U⁴⁺ (Uranium(IV))",
      "block": "f",
      "series": "Actinide"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "238.03",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 92,
      "electronsNeutral": 92,
      "naturallyOccurringRadioisotopes": [
        {
          "name": "U-235",
          "neutron": "143n",
          "percent": "Radioactive"
        },
        {
          "name": "U-238",
          "neutron": "146n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 5f³ 6d¹ 7s²",
        "oxidationStates": {
          "common": [
            "+6",
            "+4"
          ],
          "possible": [
            "+5",
            "+3"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.38,
        "firstIonization": "598 kJ/mol",
        "density": "19.1 g/cm³",
        "meltingPoint": "1132.2°C",
        "boilingPoint": "4131°C",
        "electronAffinity": "N/A",
        "atomicRadius": "175 pm",
        "specificHeat": "0.1160 J/(g·°C)"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1789",
        "discoveredBy": "Martin Heinrich Klaproth",
        "namedBy": "Planet Uranus"
      },
      "stseContext": [
        "Nuclear Age (Fission power, Atomic weapons)",
        "Geothermal heat (Earth's core)"
      ],
      "commonUses": [
        "Nuclear fuel",
        "Armor plating (Depleted U)",
        "Yellow glass (historical)"
      ],
      "hazards": [
        "Radiotoxic and chemotoxic (kidney damage)"
      ]
    },
    "uiLayout": {
      "fallbackDisplayRow": "10",
      "fallbackDisplayColumn": 6
    },
    "dataQualityNotes": [
      "Group is null because f-block elements are typically separated from the 1-18 group numbering system."
    ]
  },
  "93": {
    "id": 93,
    "symbol": "Np",
    "name": "Neptunium",
    "level1_basic": {
      "type": "Actinide",
      "group": null,
      "period": "7",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d + f)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+5",
      "block": "f",
      "series": "Actinide"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "237",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 93,
      "electronsNeutral": 93,
      "longestLivedIsotopes": [
        {
          "name": "Np-237",
          "neutron": "144n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 5f⁴ 6d¹ 7s²",
        "oxidationStates": {
          "common": [
            "+5"
          ],
          "possible": [
            "+3",
            "+4",
            "+6",
            "+7"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.36,
        "firstIonization": "605 kJ/mol",
        "density": "20.45 g/cm³",
        "meltingPoint": "644°C",
        "boilingPoint": "3902°C (est)",
        "electronAffinity": "N/A",
        "atomicRadius": "175 pm",
        "specificHeat": "N/A"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1940",
        "discoveredBy": "McMillan & Abelson",
        "namedBy": "Planet Neptune"
      },
      "stseContext": [
        "First transuranic element"
      ],
      "commonUses": [
        "Precursor to Pu-238 production; Neutron detectors"
      ],
      "hazards": [
        "Radioactive"
      ]
    },
    "isotopeNotes": "Neptunium is primarily synthetic. Np-237 (t½ 2.14×10⁶ y) is the longest-lived isotope. Trace Np-237 and Np-239 occur naturally from neutron reactions on uranium.",
    "uiLayout": {
      "fallbackDisplayRow": "10",
      "fallbackDisplayColumn": 7
    },
    "dataQualityNotes": [
      "Group is null because f-block elements are typically separated from the 1-18 group numbering system."
    ]
  },
  "94": {
    "id": 94,
    "symbol": "Pu",
    "name": "Plutonium",
    "level1_basic": {
      "type": "Actinide",
      "group": null,
      "period": "7",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + f)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+4",
      "block": "f",
      "series": "Actinide"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "244",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 94,
      "electronsNeutral": 94,
      "longestLivedIsotopes": [
        {
          "name": "Pu-239",
          "neutron": "145n",
          "percent": "Radioactive"
        },
        {
          "name": "Pu-244",
          "neutron": "150n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 5f⁶ 7s²",
        "oxidationStates": {
          "common": [
            "+4"
          ],
          "possible": [
            "+3",
            "+5",
            "+6",
            "+7"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.28,
        "firstIonization": "585 kJ/mol",
        "density": "19.816 g/cm³",
        "meltingPoint": "640°C",
        "boilingPoint": "3228°C",
        "electronAffinity": "N/A",
        "atomicRadius": "175 pm",
        "specificHeat": "N/A"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1940",
        "discoveredBy": "Seaborg, McMillan, Kennedy, Wahl",
        "namedBy": "Planet Pluto"
      },
      "stseContext": [
        "Global Security (Nuclear non-proliferation)",
        "Space Exploration (RTG batteries)"
      ],
      "commonUses": [
        "Nuclear weapons",
        "RTG power for spacecraft (Voyager/Mars rovers)"
      ],
      "hazards": [
        "Extremely radiotoxic",
        "criticality hazard"
      ]
    },
    "isotopeNotes": "Plutonium is primarily synthetic. Pu-244 (t½ 8.0×10⁷ y) is the longest-lived. Pu-239 (t½ 24,110 y) is the most significant for nuclear applications. Trace Pu-244 and Pu-239 exist naturally.",
    "uiLayout": {
      "fallbackDisplayRow": "10",
      "fallbackDisplayColumn": 8
    },
    "dataQualityNotes": [
      "Group is null because f-block elements are typically separated from the 1-18 group numbering system."
    ]
  },
  "95": {
    "id": 95,
    "symbol": "Am",
    "name": "Americium",
    "level1_basic": {
      "type": "Actinide",
      "group": null,
      "period": "7",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + f)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+3",
      "block": "f",
      "series": "Actinide"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "243",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 95,
      "electronsNeutral": 95,
      "longestLivedIsotopes": [
        {
          "name": "Am-241",
          "neutron": "146n",
          "percent": "Radioactive"
        },
        {
          "name": "Am-243",
          "neutron": "148n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 5f⁷ 7s²",
        "oxidationStates": {
          "common": [
            "+3"
          ],
          "possible": [
            "+2",
            "+4",
            "+5",
            "+6"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.13,
        "firstIonization": "578 kJ/mol",
        "density": "12.0 g/cm³",
        "meltingPoint": "1176°C",
        "boilingPoint": "2607°C (est)",
        "electronAffinity": "N/A",
        "atomicRadius": "175 pm",
        "specificHeat": "N/A"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1944",
        "discoveredBy": "Glenn T. Seaborg et al.",
        "namedBy": "The Americas"
      },
      "stseContext": [
        "Domestic Safety (Ionization smoke detectors)"
      ],
      "commonUses": [
        "Smoke detectors (Am-241)",
        "Neutron sources"
      ],
      "hazards": [
        "Radioactive (accumulates in bones)"
      ]
    },
    "isotopeNotes": "Synthetic element. Am-243 (t½ 7,370 y) is the longest-lived. Am-241 (t½ 432.2 y) is used in smoke detectors.",
    "uiLayout": {
      "fallbackDisplayRow": "10",
      "fallbackDisplayColumn": 9
    },
    "dataQualityNotes": [
      "Group is null because f-block elements are typically separated from the 1-18 group numbering system."
    ]
  },
  "96": {
    "id": 96,
    "symbol": "Cm",
    "name": "Curium",
    "level1_basic": {
      "type": "Actinide",
      "group": null,
      "period": "7",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + d + f)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+3",
      "block": "f",
      "series": "Actinide"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "247",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 96,
      "electronsNeutral": 96,
      "longestLivedIsotopes": [
        {
          "name": "Cm-247",
          "neutron": "151n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 5f⁷ 6d¹ 7s²",
        "oxidationStates": {
          "common": [
            "+3"
          ],
          "possible": [
            "+2",
            "+4"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.28,
        "firstIonization": "581 kJ/mol",
        "density": "13.51 g/cm³",
        "meltingPoint": "1345°C",
        "boilingPoint": "3110°C (est)",
        "electronAffinity": "N/A",
        "atomicRadius": "N/A",
        "specificHeat": "N/A"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1944",
        "discoveredBy": "Seaborg, James, Ghiorso",
        "namedBy": "Marie & Pierre Curie"
      },
      "stseContext": [
        "Space Exploration (Alpha particle X-ray Spectrometers)"
      ],
      "commonUses": [
        "Alpha source in Mars Rovers (APXS)"
      ],
      "hazards": [
        "Highly radioactive"
      ]
    },
    "isotopeNotes": "Synthetic element. Cm-247 (t½ 1.56×10⁷ y) is the longest-lived isotope.",
    "uiLayout": {
      "fallbackDisplayRow": "10",
      "fallbackDisplayColumn": 10
    },
    "dataQualityNotes": [
      "Group is null because f-block elements are typically separated from the 1-18 group numbering system."
    ]
  },
  "97": {
    "id": 97,
    "symbol": "Bk",
    "name": "Berkelium",
    "level1_basic": {
      "type": "Actinide",
      "group": null,
      "period": "7",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + f)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+3",
      "block": "f",
      "series": "Actinide"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "247",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 97,
      "electronsNeutral": 97,
      "longestLivedIsotopes": [
        {
          "name": "Bk-247",
          "neutron": "150n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 5f⁹ 7s²",
        "oxidationStates": {
          "common": [
            "+3"
          ],
          "possible": [
            "+2",
            "+4"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.3,
        "firstIonization": "601 kJ/mol",
        "density": "14.78 g/cm³",
        "meltingPoint": "986°C",
        "boilingPoint": "2627°C (est)",
        "electronAffinity": "N/A",
        "atomicRadius": "N/A",
        "specificHeat": "N/A"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1949",
        "discoveredBy": "Thompson, Ghiorso, Seaborg",
        "namedBy": "Berkeley, California"
      },
      "stseContext": [
        "Heavy Element Synthesis (Target material)"
      ],
      "commonUses": [
        "Synthesizing Tennessine (Element 117)"
      ],
      "hazards": [
        "Highly radioactive"
      ]
    },
    "isotopeNotes": "Synthetic element. Bk-247 (t½ 1,380 y) is the longest-lived isotope.",
    "uiLayout": {
      "fallbackDisplayRow": "10",
      "fallbackDisplayColumn": 11
    },
    "dataQualityNotes": [
      "Group is null because f-block elements are typically separated from the 1-18 group numbering system."
    ]
  },
  "98": {
    "id": 98,
    "symbol": "Cf",
    "name": "Californium",
    "level1_basic": {
      "type": "Actinide",
      "group": null,
      "period": "7",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + f)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+3",
      "block": "f",
      "series": "Actinide"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "251",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 98,
      "electronsNeutral": 98,
      "longestLivedIsotopes": [
        {
          "name": "Cf-251",
          "neutron": "153n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 5f¹⁰ 7s²",
        "oxidationStates": {
          "common": [
            "+3"
          ],
          "possible": [
            "+2",
            "+4"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.3,
        "firstIonization": "608 kJ/mol",
        "density": "15.1 g/cm³",
        "meltingPoint": "900°C",
        "boilingPoint": "N/A (est)",
        "electronAffinity": "N/A",
        "atomicRadius": "N/A",
        "specificHeat": "N/A"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1950",
        "discoveredBy": "Thompson, Street, Ghiorso, Seaborg",
        "namedBy": "State of California"
      },
      "stseContext": [
        "Industrial Sensing (Neutron moisture gauges)"
      ],
      "commonUses": [
        "Neutron startup source for reactors",
        "Gold/Oil prospecting"
      ],
      "hazards": [
        "Intense neutron emitter"
      ]
    },
    "isotopeNotes": "Synthetic element. Cf-251 (t½ 898 y) is the longest-lived isotope. Cf-252 is a strong neutron source used industrially.",
    "uiLayout": {
      "fallbackDisplayRow": "10",
      "fallbackDisplayColumn": 12
    },
    "dataQualityNotes": [
      "Group is null because f-block elements are typically separated from the 1-18 group numbering system."
    ]
  },
  "99": {
    "id": 99,
    "symbol": "Es",
    "name": "Einsteinium",
    "level1_basic": {
      "type": "Actinide",
      "group": null,
      "period": "7",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + f)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+3",
      "block": "f",
      "series": "Actinide"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "252",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 99,
      "electronsNeutral": 99,
      "longestLivedIsotopes": [
        {
          "name": "Es-252",
          "neutron": "153n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 5f¹¹ 7s²",
        "oxidationStates": {
          "common": [
            "+3"
          ],
          "possible": [
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.3,
        "firstIonization": "619 kJ/mol",
        "density": "8.84 g/cm³ (est)",
        "meltingPoint": "860°C (est)",
        "boilingPoint": "N/A",
        "electronAffinity": "N/A",
        "atomicRadius": "N/A",
        "specificHeat": "N/A"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1952",
        "discoveredBy": "Albert Ghiorso et al.",
        "namedBy": "Albert Einstein"
      },
      "stseContext": [
        "Cold War Science (Discovered in \"Ivy Mike\" H-bomb debris)"
      ],
      "commonUses": [
        "Research only"
      ],
      "hazards": [
        "Highly radioactive"
      ]
    },
    "isotopeNotes": "Synthetic element. Es-252 (t½ 471.7 d) is the longest-lived isotope amenable to study. Es-254 has t½ 275.7 d.",
    "uiLayout": {
      "fallbackDisplayRow": "10",
      "fallbackDisplayColumn": 13
    },
    "dataQualityNotes": [
      "Group is null because f-block elements are typically separated from the 1-18 group numbering system."
    ]
  },
  "100": {
    "id": 100,
    "symbol": "Fm",
    "name": "Fermium",
    "level1_basic": {
      "type": "Actinide",
      "group": null,
      "period": "7",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + f)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+3",
      "block": "f",
      "series": "Actinide"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "257",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 100,
      "electronsNeutral": 100,
      "longestLivedIsotopes": [
        {
          "name": "Fm-257",
          "neutron": "157n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 5f¹² 7s²",
        "oxidationStates": {
          "common": [
            "+3"
          ],
          "possible": [
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.3,
        "firstIonization": "627 kJ/mol",
        "density": "N/A",
        "meltingPoint": "1527°C (est)",
        "boilingPoint": "N/A",
        "electronAffinity": "N/A",
        "atomicRadius": "N/A",
        "specificHeat": "N/A"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1952",
        "discoveredBy": "Albert Ghiorso et al.",
        "namedBy": "Enrico Fermi"
      },
      "stseContext": [
        "Limit of neutron capture (Heaviest element formable by bombardment)"
      ],
      "commonUses": [
        "Research only"
      ],
      "hazards": [
        "Highly radioactive"
      ]
    },
    "isotopeNotes": "Synthetic element. Fm-257 (t½ 100.5 d) is the longest-lived isotope.",
    "uiLayout": {
      "fallbackDisplayRow": "10",
      "fallbackDisplayColumn": 14
    },
    "dataQualityNotes": [
      "Group is null because f-block elements are typically separated from the 1-18 group numbering system."
    ]
  },
  "101": {
    "id": 101,
    "symbol": "Md",
    "name": "Mendelevium",
    "level1_basic": {
      "type": "Actinide",
      "group": null,
      "period": "7",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + f)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+3",
      "block": "f",
      "series": "Actinide"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "258",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 101,
      "electronsNeutral": 101,
      "longestLivedIsotopes": [
        {
          "name": "Md-258",
          "neutron": "157n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 5f¹³ 7s²",
        "oxidationStates": {
          "common": [
            "+3"
          ],
          "possible": [
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.3,
        "firstIonization": "635 kJ/mol",
        "density": "N/A",
        "meltingPoint": "827°C (est)",
        "boilingPoint": "N/A",
        "electronAffinity": "N/A",
        "atomicRadius": "N/A",
        "specificHeat": "N/A"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1955",
        "discoveredBy": "Ghiorso, Harvey, Choppin, Thompson, Seaborg",
        "namedBy": "Dmitri Mendeleev"
      },
      "stseContext": [
        "\"Atom-at-a-time\" synthesis (First element made this way)"
      ],
      "commonUses": [
        "Research only"
      ],
      "hazards": [
        "Radioactive"
      ]
    },
    "isotopeNotes": "Synthetic element. Md-258 (t½ 51.5 d) is the longest-lived isotope.",
    "uiLayout": {
      "fallbackDisplayRow": "10",
      "fallbackDisplayColumn": 15
    },
    "dataQualityNotes": [
      "Group is null because f-block elements are typically separated from the 1-18 group numbering system."
    ]
  },
  "102": {
    "id": 102,
    "symbol": "No",
    "name": "Nobelium",
    "level1_basic": {
      "type": "Actinide",
      "group": null,
      "period": "7",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "Variable (outer s + f)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+2",
      "block": "f",
      "series": "Actinide"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "259",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 102,
      "electronsNeutral": 102,
      "longestLivedIsotopes": [
        {
          "name": "No-259",
          "neutron": "157n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 5f¹⁴ 7s²",
        "oxidationStates": {
          "common": [
            "+2"
          ],
          "possible": [
            "+3"
          ]
        }
      },
      "physical": {
        "electronegativity": 1.3,
        "firstIonization": "642 kJ/mol",
        "density": "N/A",
        "meltingPoint": "827°C (est)",
        "boilingPoint": "N/A",
        "electronAffinity": "N/A",
        "atomicRadius": "N/A",
        "specificHeat": "N/A"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1966",
        "discoveredBy": "JINR (Russia)",
        "namedBy": "Alfred Nobel"
      },
      "stseContext": [
        "Naming controversy (Disputed between USA, Sweden, USSR)"
      ],
      "commonUses": [
        "Research only"
      ],
      "hazards": [
        "Radioactive"
      ]
    },
    "isotopeNotes": "Synthetic element. No-259 (t½ 58 min) is the longest-lived isotope.",
    "uiLayout": {
      "fallbackDisplayRow": "10",
      "fallbackDisplayColumn": 16
    },
    "dataQualityNotes": [
      "Group is null because f-block elements are typically separated from the 1-18 group numbering system."
    ]
  },
  "103": {
    "id": 103,
    "symbol": "Lr",
    "name": "Lawrencium",
    "level1_basic": {
      "type": "Actinide",
      "group": null,
      "period": "7",
      "phaseAtSTP": "Solid",
      "valenceElectrons": "3",
      "commonIons": "No common ions",
      "commonOxidationStates": "+3",
      "block": "f",
      "series": "Actinide"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "266",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 103,
      "electronsNeutral": 103,
      "longestLivedIsotopes": [
        {
          "name": "Lr-266",
          "neutron": "163n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 5f¹⁴ 7s² 7p¹",
        "configurationNote": "Predicted ground-state configuration.",
        "oxidationStates": {
          "common": [
            "+3"
          ],
          "possible": []
        }
      },
      "physical": {
        "electronegativity": 1.3,
        "firstIonization": "443 kJ/mol",
        "density": "N/A",
        "meltingPoint": "1627°C (pred)",
        "boilingPoint": "N/A",
        "electronAffinity": "N/A",
        "atomicRadius": "N/A",
        "specificHeat": "N/A"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1961",
        "discoveredBy": "Ghiorso et al.",
        "namedBy": "Ernest Lawrence"
      },
      "stseContext": [
        "Periodicity Debate (Placement in d-block vs f-block)"
      ],
      "commonUses": [
        "Research only"
      ],
      "hazards": [
        "Radioactive"
      ]
    },
    "isotopeNotes": "Synthetic element. Lr-266 (t½ ~11 h) is the longest-lived isotope.",
    "uiLayout": {
      "fallbackDisplayRow": "10",
      "fallbackDisplayColumn": 17
    },
    "dataQualityNotes": [
      "Group is null because f-block elements are typically separated from the 1-18 group numbering system."
    ]
  },
  "104": {
    "id": 104,
    "symbol": "Rf",
    "name": "Rutherfordium",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 4,
      "period": "7",
      "phaseAtSTP": "Unknown",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+4"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "267",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 104,
      "electronsNeutral": 104,
      "longestLivedIsotopes": [
        {
          "name": "Rf-267",
          "neutron": "163n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 5f¹⁴ 6d² 7s²",
        "oxidationStates": {
          "common": [
            "+4"
          ],
          "possible": [
            "+3",
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": null,
        "firstIonization": "580 kJ/mol (pred)",
        "density": "23.2 g/cm³ (pred)",
        "meltingPoint": "N/A",
        "boilingPoint": "N/A",
        "electronAffinity": "N/A",
        "atomicRadius": "N/A",
        "specificHeat": "N/A"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1964",
        "discoveredBy": "Dubna (USSR) / Berkeley (USA)",
        "namedBy": "Ernest Rutherford"
      },
      "stseContext": [
        "Cold War Science (Transfermium Wars)"
      ],
      "commonUses": [
        "Research only"
      ],
      "hazards": [
        "Radioactive"
      ]
    },
    "isotopeNotes": "Synthetic element. Rf-267 (t½ ~1.3 h) is the longest-lived known isotope."
  },
  "105": {
    "id": 105,
    "symbol": "Db",
    "name": "Dubnium",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 5,
      "period": "7",
      "phaseAtSTP": "Unknown",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+5"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "268",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 105,
      "electronsNeutral": 105,
      "longestLivedIsotopes": [
        {
          "name": "Db-268",
          "neutron": "163n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 5f¹⁴ 6d³ 7s²",
        "oxidationStates": {
          "common": [
            "+5"
          ],
          "possible": [
            "+4",
            "+3"
          ]
        }
      },
      "physical": {
        "electronegativity": null,
        "firstIonization": "665 kJ/mol (pred)",
        "density": "29.3 g/cm³ (pred)",
        "meltingPoint": "N/A",
        "boilingPoint": "N/A",
        "electronAffinity": "N/A",
        "atomicRadius": "N/A",
        "specificHeat": "N/A"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1968",
        "discoveredBy": "Dubna (USSR) / Berkeley (USA)",
        "namedBy": "Dubna, Russia"
      },
      "stseContext": [
        "International cooperation (IUPAC naming resolution)"
      ],
      "commonUses": [
        "Research only"
      ],
      "hazards": [
        "Radioactive"
      ]
    },
    "isotopeNotes": "Synthetic element. Db-268 (t½ ~16 h) is the longest-lived known isotope."
  },
  "106": {
    "id": 106,
    "symbol": "Sg",
    "name": "Seaborgium",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 6,
      "period": "7",
      "phaseAtSTP": "Unknown",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+6"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "269",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 106,
      "electronsNeutral": 106,
      "longestLivedIsotopes": [
        {
          "name": "Sg-269",
          "neutron": "163n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 5f¹⁴ 6d⁴ 7s²",
        "oxidationStates": {
          "common": [
            "+6"
          ],
          "possible": [
            "+5",
            "+4"
          ]
        }
      },
      "physical": {
        "electronegativity": null,
        "firstIonization": "757 kJ/mol (pred)",
        "density": "35.0 g/cm³ (pred)",
        "meltingPoint": "N/A",
        "boilingPoint": "N/A",
        "electronAffinity": "N/A",
        "atomicRadius": "N/A",
        "specificHeat": "N/A"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1974",
        "discoveredBy": "Lawrence Berkeley Lab",
        "namedBy": "Glenn T. Seaborg"
      },
      "stseContext": [
        "Naming Controversy (First element named after a living person)"
      ],
      "commonUses": [
        "Research only"
      ],
      "hazards": [
        "Radioactive"
      ]
    },
    "isotopeNotes": "Synthetic element. Sg-269 (t½ ~14 min) is the longest-lived confirmed isotope."
  },
  "107": {
    "id": 107,
    "symbol": "Bh",
    "name": "Bohrium",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 7,
      "period": "7",
      "phaseAtSTP": "Unknown",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+7"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "270",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 107,
      "electronsNeutral": 107,
      "longestLivedIsotopes": [
        {
          "name": "Bh-270",
          "neutron": "163n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 5f¹⁴ 6d⁵ 7s²",
        "oxidationStates": {
          "common": [
            "+7"
          ],
          "possible": [
            "+5",
            "+4",
            "+3"
          ]
        }
      },
      "physical": {
        "electronegativity": null,
        "firstIonization": "740 kJ/mol (pred)",
        "density": "37.1 g/cm³ (pred)",
        "meltingPoint": "N/A",
        "boilingPoint": "N/A",
        "electronAffinity": "N/A",
        "atomicRadius": "N/A",
        "specificHeat": "N/A"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1981",
        "discoveredBy": "GSI Helmholtz Centre (Germany)",
        "namedBy": "Niels Bohr"
      },
      "stseContext": [
        "Heavy Ion Research"
      ],
      "commonUses": [
        "Research only"
      ],
      "hazards": [
        "Radioactive"
      ]
    },
    "isotopeNotes": "Synthetic element. Bh-270 (t½ ~2.4 min) is the longest-lived known isotope."
  },
  "108": {
    "id": 108,
    "symbol": "Hs",
    "name": "Hassium",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 8,
      "period": "7",
      "phaseAtSTP": "Unknown",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+8"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "277",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 108,
      "electronsNeutral": 108,
      "longestLivedIsotopes": [
        {
          "name": "Hs-269",
          "neutron": "161n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 5f¹⁴ 6d⁶ 7s²",
        "oxidationStates": {
          "common": [
            "+8"
          ],
          "possible": [
            "+6",
            "+4",
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": null,
        "firstIonization": "730 kJ/mol (pred)",
        "density": "40.7 g/cm³ (pred)",
        "meltingPoint": "N/A",
        "boilingPoint": "N/A",
        "electronAffinity": "N/A",
        "atomicRadius": "N/A",
        "specificHeat": "N/A"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1984",
        "discoveredBy": "GSI Helmholtz Centre (Germany)",
        "namedBy": "State of Hesse (Hassia)"
      },
      "stseContext": [
        "Superheavy Chemistry (Proven to form volatile tetroxide HsO₄)"
      ],
      "commonUses": [
        "Research only"
      ],
      "hazards": [
        "Radioactive"
      ]
    },
    "isotopeNotes": "Synthetic element. Hs-269 (t½ ~16 s) is among the longest-lived. Chemical studies confirmed Hs forms volatile HsO₄ like osmium."
  },
  "109": {
    "id": 109,
    "symbol": "Mt",
    "name": "Meitnerium",
    "level1_basic": {
      "type": "Unknown",
      "group": 9,
      "period": "7",
      "phaseAtSTP": "Unknown",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+3"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "278",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 109,
      "electronsNeutral": 109,
      "longestLivedIsotopes": [
        {
          "name": "Mt-278",
          "neutron": "169n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 5f¹⁴ 6d⁷ 7s²",
        "configurationNote": "Predicted ground-state configuration.",
        "oxidationStates": {
          "common": [
            "+3"
          ],
          "possible": [
            "+2",
            "+4",
            "+6"
          ]
        }
      },
      "physical": {
        "electronegativity": null,
        "firstIonization": "800 kJ/mol (pred)",
        "density": "37.4 g/cm³ (pred)",
        "meltingPoint": "N/A",
        "boilingPoint": "N/A",
        "electronAffinity": "N/A",
        "atomicRadius": "N/A",
        "specificHeat": "N/A"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1982",
        "discoveredBy": "GSI Helmholtz Centre (Germany)",
        "namedBy": "Lise Meitner"
      },
      "stseContext": [
        "Women in Science (Meitner discovered fission but was overlooked for Nobel)"
      ],
      "commonUses": [
        "Research only"
      ],
      "hazards": [
        "Radioactive"
      ]
    },
    "isotopeNotes": "Synthetic element. Mt-278 (t½ ~4.5 s) is the longest-lived known isotope. No chemical properties have been experimentally verified."
  },
  "110": {
    "id": 110,
    "symbol": "Ds",
    "name": "Darmstadtium",
    "level1_basic": {
      "type": "Unknown",
      "group": 10,
      "period": "7",
      "phaseAtSTP": "Unknown",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+2"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "281",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 110,
      "electronsNeutral": 110,
      "longestLivedIsotopes": [
        {
          "name": "Ds-281",
          "neutron": "171n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 5f¹⁴ 6d⁹ 7s¹",
        "configurationNote": "Predicted ground-state configuration.",
        "oxidationStates": {
          "common": [
            "+2"
          ],
          "possible": [
            "+4"
          ]
        }
      },
      "physical": {
        "electronegativity": null,
        "firstIonization": "N/A",
        "density": "34.8 g/cm³ (pred)",
        "meltingPoint": "N/A",
        "boilingPoint": "N/A",
        "electronAffinity": "N/A",
        "atomicRadius": "N/A",
        "specificHeat": "N/A"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1994",
        "discoveredBy": "GSI Helmholtz Centre (Germany)",
        "namedBy": "Darmstadt, Germany"
      },
      "stseContext": [
        "Ion Beam Technology"
      ],
      "commonUses": [
        "Research only"
      ],
      "hazards": [
        "Radioactive"
      ]
    },
    "isotopeNotes": "Synthetic element. Ds-281 (t½ ~12.7 s) is the longest-lived known isotope."
  },
  "111": {
    "id": 111,
    "symbol": "Rg",
    "name": "Roentgenium",
    "level1_basic": {
      "type": "Unknown",
      "group": 11,
      "period": "7",
      "phaseAtSTP": "Unknown",
      "valenceElectrons": "Variable (outer s + d)",
      "commonIons": "No common ions",
      "commonOxidationStates": "+1"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "282",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 111,
      "electronsNeutral": 111,
      "longestLivedIsotopes": [
        {
          "name": "Rg-282",
          "neutron": "171n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 5f¹⁴ 6d¹⁰ 7s¹",
        "configurationNote": "Predicted ground-state configuration.",
        "oxidationStates": {
          "common": [
            "+1"
          ],
          "possible": [
            "+3"
          ]
        }
      },
      "physical": {
        "electronegativity": null,
        "firstIonization": "N/A",
        "density": "28.7 g/cm³ (pred)",
        "meltingPoint": "N/A",
        "boilingPoint": "N/A",
        "electronAffinity": "N/A",
        "atomicRadius": "N/A",
        "specificHeat": "N/A"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1994",
        "discoveredBy": "GSI Helmholtz Centre (Germany)",
        "namedBy": "Wilhelm Röntgen"
      },
      "stseContext": [
        "History of X-rays"
      ],
      "commonUses": [
        "Research only"
      ],
      "hazards": [
        "Radioactive"
      ]
    },
    "isotopeNotes": "Synthetic element. Rg-282 (t½ ~0.5 min) is the longest-lived known isotope."
  },
  "112": {
    "id": 112,
    "symbol": "Cn",
    "name": "Copernicium",
    "level1_basic": {
      "type": "Transition Metal",
      "group": 12,
      "period": "7",
      "phaseAtSTP": "Unknown",
      "valenceElectrons": "2",
      "commonIons": "No common ions",
      "commonOxidationStates": "+2"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "285",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 112,
      "electronsNeutral": 112,
      "longestLivedIsotopes": [
        {
          "name": "Cn-285",
          "neutron": "173n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 5f¹⁴ 6d¹⁰ 7s²",
        "oxidationStates": {
          "common": [
            "+2"
          ],
          "possible": [
            "+1",
            "+4"
          ]
        }
      },
      "physical": {
        "electronegativity": null,
        "firstIonization": "N/A",
        "density": "Unknown",
        "meltingPoint": "~10°C (pred)",
        "boilingPoint": "~67°C (pred)",
        "electronAffinity": "N/A",
        "atomicRadius": "N/A",
        "specificHeat": "N/A"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1996",
        "discoveredBy": "GSI Helmholtz Centre (Germany)",
        "namedBy": "Nicolaus Copernicus"
      },
      "stseContext": [
        "Relativistic Chemistry (Acts more like a noble gas than a metal)"
      ],
      "commonUses": [
        "Research only"
      ],
      "hazards": [
        "Radioactive"
      ]
    },
    "isotopeNotes": "Synthetic element. Cn-285 (t½ ~28 s) is the longest-lived known isotope. Chemical experiments suggest high volatility, possibly liquid or gaseous at STP."
  },
  "113": {
    "id": 113,
    "symbol": "Nh",
    "name": "Nihonium",
    "level1_basic": {
      "type": "Post-transition Metal",
      "group": 13,
      "period": "7",
      "phaseAtSTP": "Unknown",
      "valenceElectrons": "3",
      "commonIons": "No common ions",
      "commonOxidationStates": "+1"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "286",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 113,
      "electronsNeutral": 113,
      "longestLivedIsotopes": [
        {
          "name": "Nh-286",
          "neutron": "173n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹",
        "oxidationStates": {
          "common": [
            "+1"
          ],
          "possible": [
            "+3"
          ]
        }
      },
      "physical": {
        "electronegativity": null,
        "firstIonization": "N/A",
        "density": "~16 g/cm³ (pred)",
        "meltingPoint": "~430°C (pred)",
        "boilingPoint": "~1130°C (pred)",
        "electronAffinity": "N/A",
        "atomicRadius": "N/A",
        "specificHeat": "N/A"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "2003",
        "discoveredBy": "RIKEN (Japan)",
        "namedBy": "From Nihon (Japan)"
      },
      "stseContext": [
        "First element discovered in Asia"
      ],
      "commonUses": [
        "Research only"
      ],
      "hazards": [
        "Radioactive"
      ]
    },
    "isotopeNotes": "Synthetic element. Nh-286 (t½ ~8 s) is the longest-lived known isotope."
  },
  "114": {
    "id": 114,
    "symbol": "Fl",
    "name": "Flerovium",
    "level1_basic": {
      "type": "Post-transition Metal",
      "group": 14,
      "period": "7",
      "phaseAtSTP": "Unknown",
      "valenceElectrons": "4",
      "commonIons": "No common ions",
      "commonOxidationStates": "+2"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "289",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 114,
      "electronsNeutral": 114,
      "longestLivedIsotopes": [
        {
          "name": "Fl-289",
          "neutron": "175n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²",
        "oxidationStates": {
          "common": [
            "+2"
          ],
          "possible": [
            "+4"
          ]
        }
      },
      "physical": {
        "electronegativity": null,
        "firstIonization": "N/A",
        "density": "~14 g/cm³ (pred)",
        "meltingPoint": "~-73°C (pred)",
        "boilingPoint": "~107°C (pred)",
        "electronAffinity": "N/A",
        "atomicRadius": "N/A",
        "specificHeat": "N/A"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1998",
        "discoveredBy": "JINR (Russia)",
        "namedBy": "Flerov Laboratory"
      },
      "stseContext": [
        "\"Island of Stability\" research"
      ],
      "commonUses": [
        "Research only"
      ],
      "hazards": [
        "Radioactive"
      ]
    },
    "isotopeNotes": "Synthetic element. Fl-289 (t½ ~1.9 s) is the longest-lived known isotope. Predicted to be near the island of stability."
  },
  "115": {
    "id": 115,
    "symbol": "Mc",
    "name": "Moscovium",
    "level1_basic": {
      "type": "Unknown",
      "group": 15,
      "period": "7",
      "phaseAtSTP": "Unknown",
      "valenceElectrons": "5",
      "commonIons": "No common ions",
      "commonOxidationStates": "+1"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "290",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 115,
      "electronsNeutral": 115,
      "longestLivedIsotopes": [
        {
          "name": "Mc-290",
          "neutron": "175n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³",
        "oxidationStates": {
          "common": [
            "+1"
          ],
          "possible": [
            "+3",
            "+5"
          ]
        }
      },
      "physical": {
        "electronegativity": null,
        "firstIonization": "N/A",
        "density": "~13.5 g/cm³ (pred)",
        "meltingPoint": "~400°C (pred)",
        "boilingPoint": "~1100°C (pred)",
        "electronAffinity": "N/A",
        "atomicRadius": "N/A",
        "specificHeat": "N/A"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "2003",
        "discoveredBy": "JINR (Russia) & Vanderbilt/LLNL (USA)",
        "namedBy": "Moscow Region"
      },
      "stseContext": [
        "Extreme matter synthesis"
      ],
      "commonUses": [
        "Research only"
      ],
      "hazards": [
        "Highly radioactive"
      ]
    },
    "isotopeNotes": "Synthetic element. Mc-290 (t½ ~0.65 s) is the longest-lived known isotope."
  },
  "116": {
    "id": 116,
    "symbol": "Lv",
    "name": "Livermorium",
    "level1_basic": {
      "type": "Unknown",
      "group": 16,
      "period": "7",
      "phaseAtSTP": "Unknown",
      "valenceElectrons": "6",
      "commonIons": "No common ions",
      "commonOxidationStates": "+2"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "293",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 116,
      "electronsNeutral": 116,
      "longestLivedIsotopes": [
        {
          "name": "Lv-293",
          "neutron": "177n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴",
        "oxidationStates": {
          "common": [
            "+2"
          ],
          "possible": [
            "+4",
            "+6"
          ]
        }
      },
      "physical": {
        "electronegativity": null,
        "firstIonization": "N/A",
        "density": "~12.9 g/cm³ (pred)",
        "meltingPoint": "364–507°C (pred)",
        "boilingPoint": "762–862°C (pred)",
        "electronAffinity": "N/A",
        "atomicRadius": "N/A",
        "specificHeat": "N/A"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "2000",
        "discoveredBy": "LLNL (USA) & JINR (Russia)",
        "namedBy": "Lawrence Livermore National Laboratory"
      },
      "stseContext": [
        "International Science Collaboration"
      ],
      "commonUses": [
        "Research only"
      ],
      "hazards": [
        "Highly radioactive"
      ]
    },
    "isotopeNotes": "Synthetic element. Lv-293 (t½ ~53 ms) is the longest-lived known isotope."
  },
  "117": {
    "id": 117,
    "symbol": "Ts",
    "name": "Tennessine",
    "level1_basic": {
      "type": "Unknown",
      "group": 17,
      "period": "7",
      "phaseAtSTP": "Unknown",
      "valenceElectrons": "7",
      "commonIons": "No common ions",
      "commonOxidationStates": "-1"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "294",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 117,
      "electronsNeutral": 117,
      "longestLivedIsotopes": [
        {
          "name": "Ts-294",
          "neutron": "177n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵",
        "oxidationStates": {
          "common": [
            "-1"
          ],
          "possible": [
            "+1",
            "+3",
            "+5",
            "+7"
          ]
        }
      },
      "physical": {
        "electronegativity": null,
        "firstIonization": "N/A",
        "density": "~7.17 g/cm³ (pred)",
        "meltingPoint": "350–550°C (pred)",
        "boilingPoint": "610°C (pred)",
        "electronAffinity": "N/A",
        "atomicRadius": "N/A",
        "specificHeat": "N/A"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "2010",
        "discoveredBy": "JINR (Russia), ORNL/Vanderbilt (USA)",
        "namedBy": "State of Tennessee (Oak Ridge Lab)"
      },
      "stseContext": [
        "Synthesis required Berkelium target"
      ],
      "commonUses": [
        "Research only"
      ],
      "hazards": [
        "Highly radioactive"
      ]
    },
    "isotopeNotes": "Synthetic element. Ts-294 (t½ ~51 ms) is the longest-lived known isotope."
  },
  "118": {
    "id": 118,
    "symbol": "Og",
    "name": "Oganesson",
    "level1_basic": {
      "type": "Unknown",
      "group": 18,
      "period": "7",
      "phaseAtSTP": "Unknown",
      "valenceElectrons": "8",
      "commonIons": "No common ions",
      "commonOxidationStates": "0"
    },
    "level2_atomic": {
      "mass": {
        "highSchool": "294",
        "universityConventional": null,
        "universityInterval": null
      },
      "protons": 118,
      "electronsNeutral": 118,
      "longestLivedIsotopes": [
        {
          "name": "Og-294",
          "neutron": "176n",
          "percent": "Radioactive"
        }
      ]
    },
    "level3_properties": {
      "electronic": {
        "configuration": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶",
        "oxidationStates": {
          "common": [
            "0"
          ],
          "possible": [
            "+2"
          ]
        }
      },
      "physical": {
        "electronegativity": null,
        "firstIonization": "N/A",
        "density": "~4.9–5.1 g/cm³ (pred)",
        "meltingPoint": "~50°C (pred)",
        "boilingPoint": "~80°C (pred)",
        "electronAffinity": "N/A",
        "atomicRadius": "N/A",
        "specificHeat": "N/A"
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "2002",
        "discoveredBy": "JINR (Russia) & LLNL (USA)",
        "namedBy": "Yuri Oganessian"
      },
      "stseContext": [
        "Relativistic Effects (Predicted to be solid, not gas)"
      ],
      "commonUses": [
        "Research only"
      ],
      "hazards": [
        "Radioactive"
      ]
    },
    "isotopeNotes": "Synthetic element. Og-294 (t½ ~0.69 ms) is the only confirmed isotope. Relativistic effects predict it may be a solid or a semiconductor rather than a noble gas."
  }
};

export const elements = [
  {
    "number": 1,
    "symbol": "H",
    "name": "Hydrogen",
    "row": 1,
    "column": 1,
    "category": "Other nonmetal"
  },
  {
    "number": 2,
    "symbol": "He",
    "name": "Helium",
    "row": 1,
    "column": 18,
    "category": "Noble Gas"
  },
  {
    "number": 3,
    "symbol": "Li",
    "name": "Lithium",
    "row": 2,
    "column": 1,
    "category": "Alkali Metal"
  },
  {
    "number": 4,
    "symbol": "Be",
    "name": "Beryllium",
    "row": 2,
    "column": 2,
    "category": "Alkaline Earth Metal"
  },
  {
    "number": 5,
    "symbol": "B",
    "name": "Boron",
    "row": 2,
    "column": 13,
    "category": "Metalloid"
  },
  {
    "number": 6,
    "symbol": "C",
    "name": "Carbon",
    "row": 2,
    "column": 14,
    "category": "Other nonmetal"
  },
  {
    "number": 7,
    "symbol": "N",
    "name": "Nitrogen",
    "row": 2,
    "column": 15,
    "category": "Other nonmetal"
  },
  {
    "number": 8,
    "symbol": "O",
    "name": "Oxygen",
    "row": 2,
    "column": 16,
    "category": "Other nonmetal"
  },
  {
    "number": 9,
    "symbol": "F",
    "name": "Fluorine",
    "row": 2,
    "column": 17,
    "category": "Halogen"
  },
  {
    "number": 10,
    "symbol": "Ne",
    "name": "Neon",
    "row": 2,
    "column": 18,
    "category": "Noble Gas"
  },
  {
    "number": 11,
    "symbol": "Na",
    "name": "Sodium",
    "row": 3,
    "column": 1,
    "category": "Alkali Metal"
  },
  {
    "number": 12,
    "symbol": "Mg",
    "name": "Magnesium",
    "row": 3,
    "column": 2,
    "category": "Alkaline Earth Metal"
  },
  {
    "number": 13,
    "symbol": "Al",
    "name": "Aluminum",
    "row": 3,
    "column": 13,
    "category": "Post-transition Metal"
  },
  {
    "number": 14,
    "symbol": "Si",
    "name": "Silicon",
    "row": 3,
    "column": 14,
    "category": "Metalloid"
  },
  {
    "number": 15,
    "symbol": "P",
    "name": "Phosphorus",
    "row": 3,
    "column": 15,
    "category": "Other nonmetal"
  },
  {
    "number": 16,
    "symbol": "S",
    "name": "Sulfur",
    "row": 3,
    "column": 16,
    "category": "Other nonmetal"
  },
  {
    "number": 17,
    "symbol": "Cl",
    "name": "Chlorine",
    "row": 3,
    "column": 17,
    "category": "Halogen"
  },
  {
    "number": 18,
    "symbol": "Ar",
    "name": "Argon",
    "row": 3,
    "column": 18,
    "category": "Noble Gas"
  },
  {
    "number": 19,
    "symbol": "K",
    "name": "Potassium",
    "row": 4,
    "column": 1,
    "category": "Alkali Metal"
  },
  {
    "number": 20,
    "symbol": "Ca",
    "name": "Calcium",
    "row": 4,
    "column": 2,
    "category": "Alkaline Earth Metal"
  },
  {
    "number": 21,
    "symbol": "Sc",
    "name": "Scandium",
    "row": 4,
    "column": 3,
    "category": "Transition Metal"
  },
  {
    "number": 22,
    "symbol": "Ti",
    "name": "Titanium",
    "row": 4,
    "column": 4,
    "category": "Transition Metal"
  },
  {
    "number": 23,
    "symbol": "V",
    "name": "Vanadium",
    "row": 4,
    "column": 5,
    "category": "Transition Metal"
  },
  {
    "number": 24,
    "symbol": "Cr",
    "name": "Chromium",
    "row": 4,
    "column": 6,
    "category": "Transition Metal"
  },
  {
    "number": 25,
    "symbol": "Mn",
    "name": "Manganese",
    "row": 4,
    "column": 7,
    "category": "Transition Metal"
  },
  {
    "number": 26,
    "symbol": "Fe",
    "name": "Iron",
    "row": 4,
    "column": 8,
    "category": "Transition Metal"
  },
  {
    "number": 27,
    "symbol": "Co",
    "name": "Cobalt",
    "row": 4,
    "column": 9,
    "category": "Transition Metal"
  },
  {
    "number": 28,
    "symbol": "Ni",
    "name": "Nickel",
    "row": 4,
    "column": 10,
    "category": "Transition Metal"
  },
  {
    "number": 29,
    "symbol": "Cu",
    "name": "Copper",
    "row": 4,
    "column": 11,
    "category": "Transition Metal"
  },
  {
    "number": 30,
    "symbol": "Zn",
    "name": "Zinc",
    "row": 4,
    "column": 12,
    "category": "Transition Metal"
  },
  {
    "number": 31,
    "symbol": "Ga",
    "name": "Gallium",
    "row": 4,
    "column": 13,
    "category": "Post-transition Metal"
  },
  {
    "number": 32,
    "symbol": "Ge",
    "name": "Germanium",
    "row": 4,
    "column": 14,
    "category": "Metalloid"
  },
  {
    "number": 33,
    "symbol": "As",
    "name": "Arsenic",
    "row": 4,
    "column": 15,
    "category": "Metalloid"
  },
  {
    "number": 34,
    "symbol": "Se",
    "name": "Selenium",
    "row": 4,
    "column": 16,
    "category": "Other nonmetal"
  },
  {
    "number": 35,
    "symbol": "Br",
    "name": "Bromine",
    "row": 4,
    "column": 17,
    "category": "Halogen"
  },
  {
    "number": 36,
    "symbol": "Kr",
    "name": "Krypton",
    "row": 4,
    "column": 18,
    "category": "Noble Gas"
  },
  {
    "number": 37,
    "symbol": "Rb",
    "name": "Rubidium",
    "row": 5,
    "column": 1,
    "category": "Alkali Metal"
  },
  {
    "number": 38,
    "symbol": "Sr",
    "name": "Strontium",
    "row": 5,
    "column": 2,
    "category": "Alkaline Earth Metal"
  },
  {
    "number": 39,
    "symbol": "Y",
    "name": "Yttrium",
    "row": 5,
    "column": 3,
    "category": "Transition Metal"
  },
  {
    "number": 40,
    "symbol": "Zr",
    "name": "Zirconium",
    "row": 5,
    "column": 4,
    "category": "Transition Metal"
  },
  {
    "number": 41,
    "symbol": "Nb",
    "name": "Niobium",
    "row": 5,
    "column": 5,
    "category": "Transition Metal"
  },
  {
    "number": 42,
    "symbol": "Mo",
    "name": "Molybdenum",
    "row": 5,
    "column": 6,
    "category": "Transition Metal"
  },
  {
    "number": 43,
    "symbol": "Tc",
    "name": "Technetium",
    "row": 5,
    "column": 7,
    "category": "Transition Metal"
  },
  {
    "number": 44,
    "symbol": "Ru",
    "name": "Ruthenium",
    "row": 5,
    "column": 8,
    "category": "Transition Metal"
  },
  {
    "number": 45,
    "symbol": "Rh",
    "name": "Rhodium",
    "row": 5,
    "column": 9,
    "category": "Transition Metal"
  },
  {
    "number": 46,
    "symbol": "Pd",
    "name": "Palladium",
    "row": 5,
    "column": 10,
    "category": "Transition Metal"
  },
  {
    "number": 47,
    "symbol": "Ag",
    "name": "Silver",
    "row": 5,
    "column": 11,
    "category": "Transition Metal"
  },
  {
    "number": 48,
    "symbol": "Cd",
    "name": "Cadmium",
    "row": 5,
    "column": 12,
    "category": "Transition Metal"
  },
  {
    "number": 49,
    "symbol": "In",
    "name": "Indium",
    "row": 5,
    "column": 13,
    "category": "Post-transition Metal"
  },
  {
    "number": 50,
    "symbol": "Sn",
    "name": "Tin",
    "row": 5,
    "column": 14,
    "category": "Post-transition Metal"
  },
  {
    "number": 51,
    "symbol": "Sb",
    "name": "Antimony",
    "row": 5,
    "column": 15,
    "category": "Metalloid"
  },
  {
    "number": 52,
    "symbol": "Te",
    "name": "Tellurium",
    "row": 5,
    "column": 16,
    "category": "Metalloid"
  },
  {
    "number": 53,
    "symbol": "I",
    "name": "Iodine",
    "row": 5,
    "column": 17,
    "category": "Halogen"
  },
  {
    "number": 54,
    "symbol": "Xe",
    "name": "Xenon",
    "row": 5,
    "column": 18,
    "category": "Noble Gas"
  },
  {
    "number": 55,
    "symbol": "Cs",
    "name": "Cesium",
    "row": 6,
    "column": 1,
    "category": "Alkali Metal"
  },
  {
    "number": 56,
    "symbol": "Ba",
    "name": "Barium",
    "row": 6,
    "column": 2,
    "category": "Alkaline Earth Metal"
  },
  {
    "number": "57-71",
    "symbol": "La-Lu",
    "name": "Lanthanides",
    "row": 6,
    "column": 3,
    "category": "Lanthanide",
    "series": "lanthanide"
  },
  {
    "number": 72,
    "symbol": "Hf",
    "name": "Hafnium",
    "row": 6,
    "column": 4,
    "category": "Transition Metal"
  },
  {
    "number": 73,
    "symbol": "Ta",
    "name": "Tantalum",
    "row": 6,
    "column": 5,
    "category": "Transition Metal"
  },
  {
    "number": 74,
    "symbol": "W",
    "name": "Tungsten",
    "row": 6,
    "column": 6,
    "category": "Transition Metal"
  },
  {
    "number": 75,
    "symbol": "Re",
    "name": "Rhenium",
    "row": 6,
    "column": 7,
    "category": "Transition Metal"
  },
  {
    "number": 76,
    "symbol": "Os",
    "name": "Osmium",
    "row": 6,
    "column": 8,
    "category": "Transition Metal"
  },
  {
    "number": 77,
    "symbol": "Ir",
    "name": "Iridium",
    "row": 6,
    "column": 9,
    "category": "Transition Metal"
  },
  {
    "number": 78,
    "symbol": "Pt",
    "name": "Platinum",
    "row": 6,
    "column": 10,
    "category": "Transition Metal"
  },
  {
    "number": 79,
    "symbol": "Au",
    "name": "Gold",
    "row": 6,
    "column": 11,
    "category": "Transition Metal"
  },
  {
    "number": 80,
    "symbol": "Hg",
    "name": "Mercury",
    "row": 6,
    "column": 12,
    "category": "Transition Metal"
  },
  {
    "number": 81,
    "symbol": "Tl",
    "name": "Thallium",
    "row": 6,
    "column": 13,
    "category": "Post-transition Metal"
  },
  {
    "number": 82,
    "symbol": "Pb",
    "name": "Lead",
    "row": 6,
    "column": 14,
    "category": "Post-transition Metal"
  },
  {
    "number": 83,
    "symbol": "Bi",
    "name": "Bismuth",
    "row": 6,
    "column": 15,
    "category": "Post-transition Metal"
  },
  {
    "number": 84,
    "symbol": "Po",
    "name": "Polonium",
    "row": 6,
    "column": 16,
    "category": "Post-transition Metal"
  },
  {
    "number": 85,
    "symbol": "At",
    "name": "Astatine",
    "row": 6,
    "column": 17,
    "category": "Halogen"
  },
  {
    "number": 86,
    "symbol": "Rn",
    "name": "Radon",
    "row": 6,
    "column": 18,
    "category": "Noble Gas"
  },
  {
    "number": 87,
    "symbol": "Fr",
    "name": "Francium",
    "row": 7,
    "column": 1,
    "category": "Alkali Metal"
  },
  {
    "number": 88,
    "symbol": "Ra",
    "name": "Radium",
    "row": 7,
    "column": 2,
    "category": "Alkaline Earth Metal"
  },
  {
    "number": "89-103",
    "symbol": "Ac-Lr",
    "name": "Actinides",
    "row": 7,
    "column": 3,
    "category": "Actinide",
    "series": "actinide"
  },
  {
    "number": 104,
    "symbol": "Rf",
    "name": "Rutherfordium",
    "row": 7,
    "column": 4,
    "category": "Transition Metal"
  },
  {
    "number": 105,
    "symbol": "Db",
    "name": "Dubnium",
    "row": 7,
    "column": 5,
    "category": "Transition Metal"
  },
  {
    "number": 106,
    "symbol": "Sg",
    "name": "Seaborgium",
    "row": 7,
    "column": 6,
    "category": "Transition Metal"
  },
  {
    "number": 107,
    "symbol": "Bh",
    "name": "Bohrium",
    "row": 7,
    "column": 7,
    "category": "Transition Metal"
  },
  {
    "number": 108,
    "symbol": "Hs",
    "name": "Hassium",
    "row": 7,
    "column": 8,
    "category": "Transition Metal"
  },
  {
    "number": 109,
    "symbol": "Mt",
    "name": "Meitnerium",
    "row": 7,
    "column": 9,
    "category": "Unknown"
  },
  {
    "number": 110,
    "symbol": "Ds",
    "name": "Darmstadtium",
    "row": 7,
    "column": 10,
    "category": "Unknown"
  },
  {
    "number": 111,
    "symbol": "Rg",
    "name": "Roentgenium",
    "row": 7,
    "column": 11,
    "category": "Unknown"
  },
  {
    "number": 112,
    "symbol": "Cn",
    "name": "Copernicium",
    "row": 7,
    "column": 12,
    "category": "Transition Metal"
  },
  {
    "number": 113,
    "symbol": "Nh",
    "name": "Nihonium",
    "row": 7,
    "column": 13,
    "category": "Post-transition Metal"
  },
  {
    "number": 114,
    "symbol": "Fl",
    "name": "Flerovium",
    "row": 7,
    "column": 14,
    "category": "Post-transition Metal"
  },
  {
    "number": 115,
    "symbol": "Mc",
    "name": "Moscovium",
    "row": 7,
    "column": 15,
    "category": "Unknown"
  },
  {
    "number": 116,
    "symbol": "Lv",
    "name": "Livermorium",
    "row": 7,
    "column": 16,
    "category": "Unknown"
  },
  {
    "number": 117,
    "symbol": "Ts",
    "name": "Tennessine",
    "row": 7,
    "column": 17,
    "category": "Unknown"
  },
  {
    "number": 118,
    "symbol": "Og",
    "name": "Oganesson",
    "row": 7,
    "column": 18,
    "category": "Unknown"
  },
  {
    "number": 57,
    "symbol": "La",
    "name": "Lanthanum",
    "row": 9,
    "column": 3,
    "category": "Lanthanide",
    "series": "lanthanide"
  },
  {
    "number": 58,
    "symbol": "Ce",
    "name": "Cerium",
    "row": 9,
    "column": 4,
    "category": "Lanthanide",
    "series": "lanthanide"
  },
  {
    "number": 59,
    "symbol": "Pr",
    "name": "Praseodymium",
    "row": 9,
    "column": 5,
    "category": "Lanthanide",
    "series": "lanthanide"
  },
  {
    "number": 60,
    "symbol": "Nd",
    "name": "Neodymium",
    "row": 9,
    "column": 6,
    "category": "Lanthanide",
    "series": "lanthanide"
  },
  {
    "number": 61,
    "symbol": "Pm",
    "name": "Promethium",
    "row": 9,
    "column": 7,
    "category": "Lanthanide",
    "series": "lanthanide"
  },
  {
    "number": 62,
    "symbol": "Sm",
    "name": "Samarium",
    "row": 9,
    "column": 8,
    "category": "Lanthanide",
    "series": "lanthanide"
  },
  {
    "number": 63,
    "symbol": "Eu",
    "name": "Europium",
    "row": 9,
    "column": 9,
    "category": "Lanthanide",
    "series": "lanthanide"
  },
  {
    "number": 64,
    "symbol": "Gd",
    "name": "Gadolinium",
    "row": 9,
    "column": 10,
    "category": "Lanthanide",
    "series": "lanthanide"
  },
  {
    "number": 65,
    "symbol": "Tb",
    "name": "Terbium",
    "row": 9,
    "column": 11,
    "category": "Lanthanide",
    "series": "lanthanide"
  },
  {
    "number": 66,
    "symbol": "Dy",
    "name": "Dysprosium",
    "row": 9,
    "column": 12,
    "category": "Lanthanide",
    "series": "lanthanide"
  },
  {
    "number": 67,
    "symbol": "Ho",
    "name": "Holmium",
    "row": 9,
    "column": 13,
    "category": "Lanthanide",
    "series": "lanthanide"
  },
  {
    "number": 68,
    "symbol": "Er",
    "name": "Erbium",
    "row": 9,
    "column": 14,
    "category": "Lanthanide",
    "series": "lanthanide"
  },
  {
    "number": 69,
    "symbol": "Tm",
    "name": "Thulium",
    "row": 9,
    "column": 15,
    "category": "Lanthanide",
    "series": "lanthanide"
  },
  {
    "number": 70,
    "symbol": "Yb",
    "name": "Ytterbium",
    "row": 9,
    "column": 16,
    "category": "Lanthanide",
    "series": "lanthanide"
  },
  {
    "number": 71,
    "symbol": "Lu",
    "name": "Lutetium",
    "row": 9,
    "column": 17,
    "category": "Lanthanide",
    "series": "lanthanide"
  },
  {
    "number": 89,
    "symbol": "Ac",
    "name": "Actinium",
    "row": 10,
    "column": 3,
    "category": "Actinide",
    "series": "actinide"
  },
  {
    "number": 90,
    "symbol": "Th",
    "name": "Thorium",
    "row": 10,
    "column": 4,
    "category": "Actinide",
    "series": "actinide"
  },
  {
    "number": 91,
    "symbol": "Pa",
    "name": "Protactinium",
    "row": 10,
    "column": 5,
    "category": "Actinide",
    "series": "actinide"
  },
  {
    "number": 92,
    "symbol": "U",
    "name": "Uranium",
    "row": 10,
    "column": 6,
    "category": "Actinide",
    "series": "actinide"
  },
  {
    "number": 93,
    "symbol": "Np",
    "name": "Neptunium",
    "row": 10,
    "column": 7,
    "category": "Actinide",
    "series": "actinide"
  },
  {
    "number": 94,
    "symbol": "Pu",
    "name": "Plutonium",
    "row": 10,
    "column": 8,
    "category": "Actinide",
    "series": "actinide"
  },
  {
    "number": 95,
    "symbol": "Am",
    "name": "Americium",
    "row": 10,
    "column": 9,
    "category": "Actinide",
    "series": "actinide"
  },
  {
    "number": 96,
    "symbol": "Cm",
    "name": "Curium",
    "row": 10,
    "column": 10,
    "category": "Actinide",
    "series": "actinide"
  },
  {
    "number": 97,
    "symbol": "Bk",
    "name": "Berkelium",
    "row": 10,
    "column": 11,
    "category": "Actinide",
    "series": "actinide"
  },
  {
    "number": 98,
    "symbol": "Cf",
    "name": "Californium",
    "row": 10,
    "column": 12,
    "category": "Actinide",
    "series": "actinide"
  },
  {
    "number": 99,
    "symbol": "Es",
    "name": "Einsteinium",
    "row": 10,
    "column": 13,
    "category": "Actinide",
    "series": "actinide"
  },
  {
    "number": 100,
    "symbol": "Fm",
    "name": "Fermium",
    "row": 10,
    "column": 14,
    "category": "Actinide",
    "series": "actinide"
  },
  {
    "number": 101,
    "symbol": "Md",
    "name": "Mendelevium",
    "row": 10,
    "column": 15,
    "category": "Actinide",
    "series": "actinide"
  },
  {
    "number": 102,
    "symbol": "No",
    "name": "Nobelium",
    "row": 10,
    "column": 16,
    "category": "Actinide",
    "series": "actinide"
  },
  {
    "number": 103,
    "symbol": "Lr",
    "name": "Lawrencium",
    "row": 10,
    "column": 17,
    "category": "Actinide",
    "series": "actinide"
  }
];
