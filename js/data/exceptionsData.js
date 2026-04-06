// =============================================================================
// Periodic Table Exceptions & Anomalies Data
// Hover tooltips for properties that deviate from expected periodic trends
// =============================================================================

// Each entry: element atomic number → { property → exception info }
// Properties: config, ionization, electronAffinity, electronegativity, oxidation, placement, diagonal, inertPair

export const exceptionsData = {

  // ─── Hydrogen: dual character ───
  1: {
    config: null,
    placement: {
      title: "Positional Anomaly",
      detail: "Has 1s¹ like alkali metals (1 valence e⁻, forms H⁺), but also resembles halogens (needs 1 e⁻ for noble gas config, forms H₂). Deserves independent positioning.",
    },
    oxidation: {
      title: "Unusual Oxidation States",
      detail: "Exhibits −1, 0, and +1 oxidation states. Acts as both an electron donor (like metals) and acceptor (like nonmetals).",
    },
  },

  // ─── Helium: s² but noble gas ───
  2: {
    placement: {
      title: "Configuration vs Placement",
      detail: "Has 1s² (like group 2 Be, Mg), but placed in group 18 with noble gases because it has a full valence shell, is chemically inert, and monatomic.",
    },
    electronAffinity: {
      title: "Zero / Positive Electron Affinity",
      detail: "He has a closed-shell 1s² configuration. Adding an electron would require the 2s orbital — a much higher energy level — so EA is essentially zero or positive.",
    },
  },

  // ─── Lithium: diagonal with Mg ───
  3: {
    diagonal: {
      title: "Diagonal Relationship with Mg",
      detail: "Li resembles Mg more than its own group-mate Na. Similar ionic radii, similar oxide/nitride chemistry, and comparable salt behavior despite being in groups 1 and 2.",
    },
  },

  // ─── Beryllium: diagonal with Al ───
  4: {
    diagonal: {
      title: "Diagonal Relationship with Al",
      detail: "Be resembles Al more than Ca. Both form amphoteric oxides, tend toward covalent bonding, and share similar charge density despite being in groups 2 and 13.",
    },
    ionization: {
      title: "IE Anomaly: Be > B",
      detail: "Be (899.5 kJ/mol) has a higher 1st IE than B (800.6 kJ/mol) despite lower Z. Removing B's 2p electron is easier than Be's tightly bound 2s² pair.",
    },
    electronAffinity: {
      title: "Near-Zero Electron Affinity",
      detail: "Be has a filled 2s² subshell. The next electron would enter the higher-energy 2p orbital, so the process is not energetically favorable — EA is near zero or slightly positive.",
    },
  },

  // ─── Boron: diagonal with Si, IE dip ───
  5: {
    diagonal: {
      title: "Diagonal Relationship with Si",
      detail: "B resembles Si more than Al in some ways. Both form acidic oxides and covalent network structures, despite being in groups 13 and 14.",
    },
    ionization: {
      title: "IE Anomaly: B < Be",
      detail: "B (800.6 kJ/mol) has lower 1st IE than Be (899.5 kJ/mol). The 2p electron in B is higher in energy and easier to remove than Be's 2s² electrons.",
    },
  },

  // ─── Nitrogen: IE higher than O, EA anomaly ───
  7: {
    ionization: {
      title: "IE Anomaly: N > O",
      detail: "N (1402 kJ/mol) has higher 1st IE than O (1314 kJ/mol). N's half-filled 2p³ subshell (one e⁻ per orbital) is extra stable. O must pair an electron, increasing repulsion.",
    },
    electronAffinity: {
      title: "Unusually Low Electron Affinity",
      detail: "N has a near-zero or slightly positive first EA. Its half-filled 2p³ configuration is very stable; adding a fourth p electron breaks the symmetry and introduces significant repulsion, making the process energetically unfavorable.",
    },
  },

  // ─── Oxygen: IE dip, EA anomaly ───
  8: {
    ionization: {
      title: "IE Anomaly: O < N",
      detail: "O (1314 kJ/mol) has lower 1st IE than N (1402 kJ/mol), despite higher Z. The paired electron in O's 2p⁴ experiences extra repulsion, making it easier to remove.",
    },
    electronAffinity: {
      title: "EA Anomaly: O < S",
      detail: "O has a less negative EA (−141 kJ/mol) than S (−200 kJ/mol), despite being above S in the group. The compact 2p orbitals of O cause strong electron–electron repulsion for the incoming electron, reducing the energy released compared to S's more diffuse 3p orbitals.",
    },
  },

  // ─── Fluorine: extreme electronegativity, EA anomaly ───
  9: {
    electronegativity: {
      title: "Most Electronegative Element",
      detail: "F (3.98 Pauling) is the most electronegative element. Its tiny atomic radius and high effective nuclear charge create extreme electron-attracting power, exceeding even oxygen.",
    },
    electronAffinity: {
      title: "EA Anomaly: F < Cl",
      detail: "F (−328 kJ/mol) has a less negative EA than Cl (−349 kJ/mol), despite being the most electronegative element. The very compact 2p orbitals cause strong electron–electron repulsion for the added electron, partially offsetting the high nuclear charge. Cl's larger 3p orbitals have less repulsion, so more energy is released.",
    },
  },

  // ─── Neon: noble gas EA ───
  10: {
    electronAffinity: {
      title: "Zero / Positive Electron Affinity",
      detail: "Ne has a closed-shell 2s²2p⁶ configuration. Adding an electron would require the 3s orbital, so EA is essentially zero or positive. This applies to all noble gases.",
    },
  },

  // ─── Magnesium: IE anomaly, EA anomaly ───
  12: {
    ionization: {
      title: "IE Anomaly: Mg > Al",
      detail: "Mg (737.7 kJ/mol) has higher 1st IE than Al (577.5 kJ/mol). Al's 3p electron is easier to remove than Mg's tightly held 3s² pair — same s→p pattern as Be→B.",
    },
    electronAffinity: {
      title: "Near-Zero Electron Affinity",
      detail: "Mg has a filled 3s² subshell. The next electron would enter the higher-energy 3p orbital, making the process energetically unfavorable — EA is near zero or slightly positive, same pattern as Be.",
    },
  },

  // ─── Aluminium: IE dip, diagonal ───
  13: {
    ionization: {
      title: "IE Anomaly: Al < Mg",
      detail: "Al (577.5 kJ/mol) has lower 1st IE than Mg (737.7 kJ/mol) despite higher Z. The 3p electron is in a higher-energy subshell and easier to remove than Mg's 3s².",
    },
    diagonal: {
      title: "Diagonal Relationship with Be",
      detail: "Al resembles Be (group 2) more than expected. Both form amphoteric oxides, prefer covalent bonding, and have similar charge-to-radius ratios.",
    },
  },

  // ─── Silicon: diagonal with B ───
  14: {
    diagonal: {
      title: "Diagonal Relationship with B",
      detail: "Si shares traits with B — both form acidic oxides and network covalent structures, despite being in groups 14 and 13 respectively.",
    },
  },

  // ─── Phosphorus: IE higher than S ───
  15: {
    ionization: {
      title: "IE Anomaly: P > S",
      detail: "P (1011.8 kJ/mol) has higher 1st IE than S (999.6 kJ/mol). P's half-filled 3p³ subshell is extra stable, same pattern as N > O in period 2.",
    },
  },

  // ─── Sulfur: IE dip ───
  16: {
    ionization: {
      title: "IE Anomaly: S < P",
      detail: "S (999.6 kJ/mol) has lower 1st IE than P (1011.8 kJ/mol). The paired electron in S's 3p⁴ experiences repulsion, making it easier to remove than P's half-filled 3p³.",
    },
  },

  // ─── Chlorine: EA larger than F ───
  17: {
    electronAffinity: {
      title: "EA Anomaly: Cl > F",
      detail: "Cl (−349 kJ/mol) has a more negative EA than F (−328 kJ/mol), despite F being above it. The larger 3p orbitals in Cl have less electron–electron repulsion for the incoming electron, so more energy is released when attaching it.",
    },
  },

  // ─── Argon: noble gas EA ───
  18: {
    electronAffinity: {
      title: "Zero / Positive Electron Affinity",
      detail: "Ar has a closed-shell 3s²3p⁶ configuration. Adding an electron would require the 4s orbital, so EA is essentially zero or positive — characteristic of all noble gases.",
    },
  },

  // ─── Gallium: d-block contraction anomalies ───
  31: {
    ionization: {
      title: "IE Anomaly: d-Block Contraction",
      detail: "The sum of the first three IEs of Ga is higher than that of Al, even though IE usually decreases down a group. The filled 3d¹⁰ shell shields the nucleus poorly, increasing effective nuclear charge on the 4s²4p¹ electrons.",
    },
    atomicRadius: {
      title: "Radius Anomaly: Ga ≈ Al",
      detail: "Ga has a similar or slightly smaller atomic/metallic radius than Al, contrary to the expected increase down a group. The poorly shielding 3d¹⁰ electrons increase Z_eff, pulling 4s²4p¹ electrons closer to the nucleus (d-block contraction).",
    },
    electronegativity: {
      title: "EN Anomaly: Ga > Al",
      detail: "Ga has higher electronegativity than Al, despite being below it in group 13. Poor shielding by the filled 3d subshell increases effective nuclear charge, enhancing attraction for bonding electrons.",
    },
  },

  // ─── Germanium: d-block contraction EN anomaly ───
  32: {
    electronegativity: {
      title: "EN Anomaly: Ge > Si",
      detail: "Ge has a slightly higher electronegativity than Si, despite being below it in group 14. The filled 3d¹⁰ subshell shields poorly, increasing Z_eff on the valence electrons (d-block contraction).",
    },
  },

  // ─── Chromium: Aufbau exception ───
  24: {
    config: {
      title: "Aufbau Exception",
      predicted: "[Ar] 3d⁴ 4s²",
      actual: "[Ar] 3d⁵ 4s¹",
      detail: "Cr adopts a half-filled 3d⁵ subshell by moving one 4s electron to 3d. The symmetric half-filled d subshell provides extra exchange energy stabilization.",
    },
  },

  // ─── Manganese: extreme oxidation range ───
  25: {
    oxidation: {
      title: "Extreme Oxidation Range",
      detail: "Mn exhibits oxidation states from −3 to +7. The +7 state (in MnO₄⁻ permanganate) is unusually high, stabilized by strong covalent Mn–O bonds.",
    },
  },

  // ─── Copper: Aufbau exception ───
  29: {
    config: {
      title: "Aufbau Exception",
      predicted: "[Ar] 3d⁹ 4s²",
      actual: "[Ar] 3d¹⁰ 4s¹",
      detail: "Cu achieves a fully filled 3d¹⁰ subshell by shifting one 4s electron. The completely filled d subshell has maximum exchange stabilization energy.",
    },
  },

  // ─── Zirconium: lanthanide contraction radius anomaly ───
  40: {
    atomicRadius: {
      title: "Radius Anomaly: Zr ≈ Hf",
      detail: "Zr and Hf (one period below) have nearly identical atomic and ionic radii, despite the expected increase down a group. The lanthanide contraction — poor shielding by the 4f¹⁴ electrons in Hf — almost exactly cancels the normal size increase from adding a new shell.",
    },
  },

  // ─── Niobium: Aufbau exception ───
  41: {
    config: {
      title: "Aufbau Exception",
      predicted: "[Kr] 4d³ 5s²",
      actual: "[Kr] 4d⁴ 5s¹",
      detail: "Nb shifts one 5s electron to 4d. In the 4d series, the energy gap between 4d and 5s narrows, making d-filling more favorable.",
    },
  },

  // ─── Molybdenum: Aufbau exception ───
  42: {
    config: {
      title: "Aufbau Exception",
      predicted: "[Kr] 4d⁴ 5s²",
      actual: "[Kr] 4d⁵ 5s¹",
      detail: "Mo achieves a half-filled 4d⁵ subshell, mirroring Cr in the 3d series. The extra exchange energy from five unpaired d electrons outweighs the 5s pairing energy.",
    },
  },

  // ─── Ruthenium: Aufbau exception ───
  44: {
    config: {
      title: "Aufbau Exception",
      predicted: "[Kr] 4d⁶ 5s²",
      actual: "[Kr] 4d⁷ 5s¹",
      detail: "Ru shifts one 5s electron to 4d. The 4d and 5s orbitals are close in energy in mid-series, favoring more d occupation.",
    },
  },

  // ─── Rhodium: Aufbau exception ───
  45: {
    config: {
      title: "Aufbau Exception",
      predicted: "[Kr] 4d⁷ 5s²",
      actual: "[Kr] 4d⁸ 5s¹",
      detail: "Rh shifts one 5s electron to 4d. As Z increases across the 4d series, d orbitals become increasingly lower in energy than 5s.",
    },
  },

  // ─── Palladium: Aufbau exception (most dramatic) ───
  46: {
    config: {
      title: "Aufbau Exception — Most Extreme",
      predicted: "[Kr] 4d⁸ 5s²",
      actual: "[Kr] 4d¹⁰",
      detail: "Pd has a completely empty 5s subshell! Both 5s electrons move to 4d, achieving a fully filled 4d¹⁰. This is the most dramatic Aufbau violation in the periodic table.",
    },
  },

  // ─── Silver: Aufbau exception ───
  47: {
    config: {
      title: "Aufbau Exception",
      predicted: "[Kr] 4d⁹ 5s²",
      actual: "[Kr] 4d¹⁰ 5s¹",
      detail: "Ag mirrors Cu — achieves a fully filled 4d¹⁰ subshell by shifting one 5s electron. Same pattern as Cu in the 3d series.",
    },
  },

  // ─── Hafnium: lanthanide contraction radius anomaly ───
  72: {
    atomicRadius: {
      title: "Radius Anomaly: Hf ≈ Zr",
      detail: "Hf has nearly the same atomic radius as Zr (period above), differing by only ~1 pm. The lanthanide contraction — poor shielding by 4f¹⁴ electrons — causes a significant decrease in radius for post-lanthanide 5d elements, almost cancelling the expected size increase.",
    },
  },

  // ─── Lanthanum: f–d anomaly ───
  57: {
    config: {
      title: "f–d Configuration Anomaly",
      predicted: "[Xe] 4f¹ 6s²",
      actual: "[Xe] 5d¹ 6s²",
      detail: "La places its differentiating electron in 5d rather than 4f. At Z=57, the 5d orbital is slightly lower in energy than 4f, so 4f filling doesn't begin until Ce.",
    },
  },

  // ─── Cerium: f–d anomaly ───
  58: {
    config: {
      title: "f–d Configuration Anomaly",
      predicted: "[Xe] 4f² 6s²",
      actual: "[Xe] 4f¹ 5d¹ 6s²",
      detail: "Ce splits its electrons between 4f and 5d. The near-degeneracy of 4f and 5d at this point allows dual occupancy.",
    },
  },

  // ─── Gadolinium: Aufbau exception ───
  64: {
    config: {
      title: "Aufbau Exception — Half-filled 4f",
      predicted: "[Xe] 4f⁸ 6s²",
      actual: "[Xe] 4f⁷ 5d¹ 6s²",
      detail: "Gd achieves a half-filled 4f⁷ subshell by placing one electron in 5d instead. The exchange energy gain from seven unpaired f electrons is substantial.",
    },
  },

  // ─── Platinum: Aufbau exception ───
  78: {
    config: {
      title: "Aufbau Exception",
      predicted: "[Xe] 4f¹⁴ 5d⁸ 6s²",
      actual: "[Xe] 4f¹⁴ 5d⁹ 6s¹",
      detail: "Pt shifts one 6s electron to 5d. Relativistic effects contract 6s and expand 5d, narrowing their energy gap significantly in heavy elements.",
    },
  },

  // ─── Gold: Aufbau exception ───
  79: {
    config: {
      title: "Aufbau Exception",
      predicted: "[Xe] 4f¹⁴ 5d⁹ 6s²",
      actual: "[Xe] 4f¹⁴ 5d¹⁰ 6s¹",
      detail: "Au achieves a fully filled 5d¹⁰, mirroring Cu and Ag. Relativistic contraction of 6s makes this especially favorable, also giving gold its distinctive color.",
    },
  },

  // ─── Thallium: inert pair effect ───
  81: {
    inertPair: {
      title: "Inert Pair Effect",
      detail: "Tl(+1) is more stable than Tl(+3), despite being in group 13. The 6s² electrons are relativistically stabilized and resist participation in bonding.",
    },
  },

  // ─── Lead: inert pair effect, EN anomaly ───
  82: {
    inertPair: {
      title: "Inert Pair Effect",
      detail: "Pb(+2) is far more stable than Pb(+4). The 6s² pair is 'inert' due to poor shielding by 4f¹⁴ and relativistic contraction, unlike lighter C and Si which readily form +4.",
    },

  },

  // ─── Bismuth: inert pair effect ───
  83: {
    inertPair: {
      title: "Inert Pair Effect",
      detail: "Bi(+3) is stable while Bi(+5) is a powerful oxidizer. The 6s² pair resists bonding — in contrast to lighter N and P which commonly show +5.",
    },
  },

  // ─── Actinium: f–d anomaly ───
  89: {
    config: {
      title: "f–d Configuration Anomaly",
      predicted: "[Rn] 5f¹ 7s²",
      actual: "[Rn] 6d¹ 7s²",
      detail: "Ac places its electron in 6d rather than 5f, mirroring La. The 5f orbitals are not yet low enough in energy for occupancy at Z=89.",
    },
  },

  // ─── Thorium: f–d anomaly ───
  90: {
    config: {
      title: "f–d Configuration Anomaly",
      predicted: "[Rn] 5f² 7s²",
      actual: "[Rn] 6d² 7s²",
      detail: "Th still has no 5f electrons — both go to 6d. The 5f orbitals are higher in energy than 6d for the early actinides.",
    },
  },

  // ─── Protactinium: f–d anomaly ───
  91: {
    config: {
      title: "f–d Configuration Anomaly",
      predicted: "[Rn] 5f³ 7s²",
      actual: "[Rn] 5f² 6d¹ 7s²",
      detail: "Pa splits electrons between 5f and 6d. The energy crossover between 5f and 6d occurs in this region of the actinides.",
    },
  },

  // ─── Uranium: f–d anomaly ───
  92: {
    config: {
      title: "f–d Configuration Anomaly",
      predicted: "[Rn] 5f⁴ 7s²",
      actual: "[Rn] 5f³ 6d¹ 7s²",
      detail: "U retains one 6d electron alongside 5f, similar to Pa. The close energy levels of 5f and 6d persist through the early actinides.",
    },
  },

  // ─── Neptunium: f–d anomaly ───
  93: {
    config: {
      title: "f–d Configuration Anomaly",
      predicted: "[Rn] 5f⁵ 7s²",
      actual: "[Rn] 5f⁴ 6d¹ 7s²",
      detail: "Np also retains one electron in 6d. By Pu (Z=94), the 5f orbitals finally become clearly lower in energy and normal filling resumes.",
    },
  },

  // ─── Curium: Aufbau exception ───
  96: {
    config: {
      title: "Aufbau Exception — Half-filled 5f",
      predicted: "[Rn] 5f⁸ 7s²",
      actual: "[Rn] 5f⁷ 6d¹ 7s²",
      detail: "Cm achieves a half-filled 5f⁷ subshell by placing one electron in 6d, mirroring Gd's behavior in the lanthanides.",
    },
  },

  // ─── Lawrencium: Aufbau exception ───
  103: {
    config: {
      title: "Aufbau Exception",
      predicted: "[Rn] 5f¹⁴ 6d¹ 7s²",
      actual: "[Rn] 5f¹⁴ 7s² 7p¹",
      detail: "Lr's last electron goes to 7p instead of 6d. Relativistic effects stabilize 7p₁/₂ below 6d, making this the only element where a p-block config appears in the f-block.",
    },
  },
};

// ─── Ionization Energy Discontinuity Pairs ───
// Maps element Z → the comparison element and direction
export const ieDiscontinuities = {
  4:  { compare: 5,  direction: "higher", label: "Be > B" },
  5:  { compare: 4,  direction: "lower",  label: "B < Be" },
  7:  { compare: 8,  direction: "higher", label: "N > O" },
  8:  { compare: 7,  direction: "lower",  label: "O < N" },
  12: { compare: 13, direction: "higher", label: "Mg > Al" },
  13: { compare: 12, direction: "lower",  label: "Al < Mg" },
  15: { compare: 16, direction: "higher", label: "P > S" },
  16: { compare: 15, direction: "lower",  label: "S < P" },
};
