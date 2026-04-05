export const uk_ions = {
  "h_plus": {
    "name": "Водень",
    "customData": {
      "level1": {
        "type": "Катіон/кислота",
        "source": "Кислоти (HCl, H₂SO₄) - Втрата 1 e⁻",
        "phase": "Водний (aq як H₃O⁺) – безбарвний",
        "valence": "0 (порожня оболонка)",
        "keyCompounds": [
          {
            "formula": "HCl",
            "name": "Шлунковий сік"
          },
          {
            "formula": "H₂SO₄",
            "name": "Акумуляторна кислота"
          }
        ]
      },
      "level2": {
        "molarMass": "1.008 г/моль",
        "subatomic": "1 р⁺ | 0 е⁻",
        "statusBanner": "Визначення кислотності (pH)",
        "slotA": {
          "label": "Лакмусовий папірець",
          "result": "Червоніє",
          "desc": "Перетворює синій папір на червоний"
        },
        "slotB": {
          "label": "Реактивність",
          "result": "Шипіння",
          "desc": "з карбонатами"
        }
      },
      "level3": {
        "config": "[1с]⁰ (Пусто)",
        "oxidation": "+1",
        "ionicRadius": "~0,84 fm (голе ядро)",
        "hydrationEnthalpy": "-1091 kJ/mol (дуже високий)",
        "coordination": "1 (Зв'язок із самотньою парою)"
      },
      "level4": {
        "discoveryYear": "1884 р. (Визначення концепції)",
        "discoveredBy": "Svante Arrhenius",
        "namedBy": "Greek Hydro (Вода) + Гени (Формування)",
        "stse": [
          "Закислення океану (пошкодження коралів)",
          "Кислотний дощ (ушкодження лісу)."
        ],
        "commonUses": [
          "Травлення (шлункова кислота)",
          "Автомобільні акумулятори (електроліт)."
        ],
        "hazards": [
          "Корозійні (хімічні опіки)."
        ]
      }
    }
  },
  "li_plus": {
    "name": "Літій",
    "customData": {
      "level1": {
        "type": "Катіон лужного металу",
        "source": "Елемент групи 1 – втрата 1 e⁻",
        "phase": "Водний (aq) – Безбарвний",
        "valence": "0 (Стабільний дуплет)",
        "keyCompounds": [
          {
            "formula": "Li-ion",
            "name": "Батарея"
          },
          {
            "formula": "Li₂CO₃",
            "name": "Ліки"
          }
        ]
      },
      "level2": {
        "molarMass": "6.94 г/моль",
        "subatomic": "3 п⁺ | 2 е⁻",
        "statusBanner": "Ізоелектроніка з гелієм",
        "slotA": {
          "label": "Випробування полум'я",
          "result": "Багряно-червоний",
          "desc": "(670 nm)"
        },
        "slotB": {
          "label": "Витрата батареї",
          "result": "Іонний транспорт",
          "desc": "У осередках Li-ion"
        }
      },
      "level3": {
        "config": "[1s]² (Стабільний дуплет)",
        "oxidation": "+1",
        "ionicRadius": "76 pm (Найменший луг)",
        "hydrationEnthalpy": "-519 kJ/mol (Високий)",
        "coordination": "4 (Тетраедрична гідратація)"
      },
      "level4": {
        "discoveryYear": "1817",
        "discoveredBy": "Johan August Arfwedson",
        "namedBy": "Greek Lithos (Камінь)",
        "stse": [
          "EV Революція (Батареї)",
          "Геополітика («Біле золото»)."
        ],
        "commonUses": [
          "Li-ion Акумулятори (телефони/автомобілі)",
          "Медицина (біполярна)."
        ],
        "hazards": [
          "Токсичність (вплив на нирки)",
          "Корозійний (LiOH)."
        ]
      }
    }
  },
  "na_plus": {
    "name": "Натрій",
    "customData": {
      "level1": {
        "type": "Катіон лужного металу",
        "source": "Елемент групи 1 – втрата 1 e⁻",
        "phase": "Водний (aq) – Безбарвний",
        "valence": "8 (стабільний октет)",
        "keyCompounds": [
          {
            "formula": "NaCl",
            "name": "Поварена сіль"
          },
          {
            "formula": "Na₂CO₃",
            "name": "Газування"
          }
        ]
      },
      "level2": {
        "molarMass": "22.99 г/моль",
        "subatomic": "11 р⁺ | 10 е⁻",
        "statusBanner": "Завжди розчинний (всепрохідний іон)",
        "slotA": {
          "label": "Випробування полум'я",
          "result": "Яскраво-жовтий",
          "desc": "(589 nm)"
        },
        "slotB": {
          "label": "Розчинність",
          "result": "Розчиняється",
          "desc": "Негайно"
        }
      },
      "level3": {
        "config": "[Ne] (Стабільний октет)",
        "oxidation": "+1",
        "ionicRadius": "102 pm (зменшується зі 186 pm)",
        "hydrationEnthalpy": "-406 kJ/mol",
        "coordination": "6 (октаедричний)"
      },
      "level4": {
        "discoveryYear": "1807",
        "discoveredBy": "Humphry Davy",
        "namedBy": "Latin Natrium (Egyptian Soda)",
        "stse": [
          "Громадська охорона здоров'я (гіпертонія)",
          "Стік дорожньої солі."
        ],
        "commonUses": [
          "Нервові імпульси",
          "Вуличні ліхтарі",
          "Харчовий консервант."
        ],
        "hazards": [
          "Безпечно як іон (необхідна поживна речовина)."
        ]
      }
    }
  },
  "k_plus": {
    "name": "Калій",
    "customData": {
      "level1": {
        "type": "Катіон лужного металу",
        "source": "Елемент групи 1 – втрата 1 e⁻",
        "phase": "Водний (aq) – Безбарвний",
        "valence": "8 (стабільний октет)",
        "keyCompounds": [
          {
            "formula": "KCl",
            "name": "Добрива"
          },
          {
            "formula": "KNO₃",
            "name": "Порох"
          }
        ]
      },
      "level2": {
        "molarMass": "39.10 г/моль",
        "subatomic": "19 р⁺ | 18 е⁻",
        "statusBanner": "Завжди розчинний (всепрохідний іон)",
        "slotA": {
          "label": "Випробування полум'я",
          "result": "Бузковий / Фіолетовий",
          "desc": "(766 nm)"
        },
        "slotB": {
          "label": "Зростання",
          "result": "Ефект добрива",
          "desc": "N-P-K Поживні речовини"
        }
      },
      "level3": {
        "config": "[Ar] (Стабільний октет)",
        "oxidation": "+1",
        "ionicRadius": "138 pm (Більше Na)",
        "hydrationEnthalpy": "-322 kJ/mol",
        "coordination": "6-8"
      },
      "level4": {
        "discoveryYear": "1807",
        "discoveredBy": "Humphry Davy",
        "namedBy": "Арабська аль-калі (калій)",
        "stse": [
          "Продовольча безпека (добрива)",
          "Радіація (K-40)."
        ],
        "commonUses": [
          "N-P-K Добрива",
          "Мило",
          "функція м'язів."
        ],
        "hazards": [
          "Гіперкаліємія (зупинка серця)",
          "Безпечний при дієті."
        ]
      }
    }
  },
  "ag_plus": {
    "name": "Срібло",
    "customData": {
      "level1": {
        "type": "Катіон перехідного металу",
        "source": "Елемент групи 11 – втрата 1 e⁻",
        "phase": "Водний розчин/осад",
        "valence": "18 (Псевдобагородний газ)",
        "keyCompounds": [
          {
            "formula": "AgNO₃",
            "name": "Розчинний"
          },
          {
            "formula": "AgCl",
            "name": "Білий Ппт"
          }
        ]
      },
      "level2": {
        "molarMass": "107.87 г/моль",
        "subatomic": "47 р⁺ | 46 е⁻",
        "statusBanner": "Нерозчинний у галогенідах (Cl/Br/I).",
        "slotA": {
          "label": "Опад",
          "result": "Біла хмара",
          "desc": "з Cl⁻"
        },
        "slotB": {
          "label": "Світлочутливий",
          "result": "Темніє",
          "desc": "у Світлі"
        }
      },
      "level3": {
        "config": "[Kr] 4d¹⁰ (Повна d-оболонка)",
        "oxidation": "+1",
        "ionicRadius": "115 pm (аналогічно K⁺)",
        "hydrationEnthalpy": "-473 kJ/mol",
        "coordination": "2 (лінійний)"
      },
      "level4": {
        "discoveryYear": "доісторичний",
        "discoveredBy": "Невідомий",
        "namedBy": "Latin Argentum",
        "stse": [
          "Фотовідходи (Історія)",
          "Вплив наносрібла."
        ],
        "commonUses": [
          "Світлина (Кіно)",
          "Догляд за ранами",
          "Електроніка"
        ],
        "hazards": [
          "Токсично для водної флори та фауни.",
          "Аргірія (Синя шкіра)."
        ]
      }
    }
  },
  "mg_2plus": {
    "name": "Магній",
    "customData": {
      "level1": {
        "type": "Лужноземельний катіон",
        "source": "Елемент групи 2 – втрата 2 e⁻",
        "phase": "Водний (aq) – Безбарвний",
        "valence": "0 (стабільний октет)",
        "keyCompounds": [
          {
            "formula": "MgO",
            "name": ""
          },
          {
            "formula": "Mg",
            "name": "Флеш-порошок"
          },
          {
            "formula": "MgSO₄",
            "name": "Епсом"
          }
        ]
      },
      "level2": {
        "molarMass": "24.31 г/моль",
        "subatomic": "12 р⁺ | 10 е⁻",
        "statusBanner": "Нерозв'язно з OH⁻ та CO₃²⁻.",
        "slotA": {
          "label": "Опад",
          "result": "Білий гель",
          "desc": "з гідроксидом"
        },
        "slotB": {
          "label": "хлорофіл",
          "result": "Центральний атом",
          "desc": "Влада"
        }
      },
      "level3": {
        "config": "[Ne] (Стабільний октет)",
        "oxidation": "+2",
        "ionicRadius": "72 pm (Висока щільність заряду)",
        "hydrationEnthalpy": "-1921 kJ/mol (дуже високий)",
        "coordination": "6 (октаедричний)"
      },
      "level4": {
        "discoveryYear": "1808",
        "discoveredBy": "Humphry Davy",
        "namedBy": "Greek Magnesia (Район)",
        "stse": [
          "Накип твердої води",
          "Двигун фотосинтезу."
        ],
        "commonUses": [
          "Сплави (автомобільні деталі)",
          "Антациди (молоко магнезії)."
        ],
        "hazards": [
          "Безпечно (необхідна поживна речовина)."
        ]
      }
    }
  },
  "ca_2plus": {
    "name": "Кальцій",
    "customData": {
      "level1": {
        "type": "Лужноземельний катіон",
        "source": "Елемент групи 2 – втрата 2 e⁻",
        "phase": "Водний (aq) – Безбарвний",
        "valence": "0 (стабільний октет)",
        "keyCompounds": [
          {
            "formula": "CaCO₃",
            "name": "Вапняк"
          },
          {
            "formula": "CaCl₂",
            "name": "Дорожня сіль"
          }
        ]
      },
      "level2": {
        "molarMass": "40.08 г/моль",
        "subatomic": "20 р⁺ | 18 е⁻",
        "statusBanner": "Нерозчинний у карбонаті (CO₃²⁻)",
        "slotA": {
          "label": "Випробування полум'я",
          "result": "Цегляно-червоний",
          "desc": "/ Апельсин"
        },
        "slotB": {
          "label": "Структура",
          "result": "Мінералізація",
          "desc": "Кістки та черепашки"
        }
      },
      "level3": {
        "config": "[Ar] (Стабільний октет)",
        "oxidation": "+2",
        "ionicRadius": "100 pm (зменшується зі 197 pm)",
        "hydrationEnthalpy": "-1577 kJ/mol (Високий)",
        "coordination": "6-8"
      },
      "level4": {
        "discoveryYear": "1808",
        "discoveredBy": "Humphry Davy",
        "namedBy": "Latin Calx (Лайм)",
        "stse": [
          "Бетонна промисловість",
          "Закислення океану (CaCO₃)."
        ],
        "commonUses": [
          "Цемент",
          "Танення льоду",
          "Здоров'я кісток."
        ],
        "hazards": [
          "Безпечно (необхідна поживна речовина)."
        ]
      }
    }
  },
  "ba_2plus": {
    "name": "Барій",
    "customData": {
      "level1": {
        "type": "Тяжкий лужноземельний катіон",
        "source": "Елемент групи 2 – втрата 2 e⁻",
        "phase": "Вода/нерозчинна тверда речовина",
        "valence": "0 (стабільний октет)",
        "keyCompounds": [
          {
            "formula": "BaSO₄",
            "name": "Барієве борошно"
          },
          {
            "formula": "BaCl₂",
            "name": "Токсичний"
          }
        ]
      },
      "level2": {
        "molarMass": "137.33 г/моль",
        "subatomic": "56 р⁺ | 54 е⁻",
        "statusBanner": "Нерозчинний у сульфаті (SO₄²⁻).",
        "slotA": {
          "label": "Випробування полум'я",
          "result": "Яблуко Грін",
          "desc": "(524 nm)"
        },
        "slotB": {
          "label": "Візуалізація",
          "result": "Рентгенівський щит",
          "desc": "(Контраст)"
        }
      },
      "level3": {
        "config": "[Xe] (Стабільний октет)",
        "oxidation": "+2",
        "ionicRadius": "135 pm (зменшується з 217 pm)",
        "hydrationEnthalpy": "-1305 kJ/mol",
        "coordination": "8-12"
      },
      "level4": {
        "discoveryYear": "1808",
        "discoveredBy": "Humphry Davy",
        "namedBy": "Greek Barys (Важкий)",
        "stse": [
          "Безпека медичної візуалізації",
          "Бурові розчини."
        ],
        "commonUses": [
          "GI Рентгенографія шляхів",
          "Феєрверк (Зелений)."
        ],
        "hazards": [
          "Токсично (м'язовий параліч), якщо розчинний."
        ]
      }
    }
  },
  "zn_2plus": {
    "name": "Цинк",
    "customData": {
      "level1": {
        "type": "Катіон перехідного металу",
        "source": "Елемент групи 12 – втрата 2 e⁻",
        "phase": "Водний (aq) – Безбарвний",
        "valence": "18 (Псевдобагородний газ)",
        "keyCompounds": [
          {
            "formula": "ZnO",
            "name": "сонцезахисний крем"
          },
          {
            "formula": "ZnCl₂",
            "name": "Потік"
          }
        ]
      },
      "level2": {
        "molarMass": "65.38 г/моль",
        "subatomic": "30 р⁺ | 28 е⁻",
        "statusBanner": "Амфотерний (розчиняється в кислоті/основі)",
        "slotA": {
          "label": "Опад",
          "result": "Білий гель",
          "desc": "(Розчиняється)"
        },
        "slotB": {
          "label": "гальванізувати",
          "result": "Сталевий захист",
          "desc": "Антикорозійний захист"
        }
      },
      "level3": {
        "config": "[Ar] 3d¹⁰ (Повна d-оболонка)",
        "oxidation": "+2",
        "ionicRadius": "74 pm (зменшується зі 134 pm)",
        "hydrationEnthalpy": "-2046 kJ/mol",
        "coordination": "4 (Тетраедричний) або 6"
      },
      "level4": {
        "discoveryYear": "1746",
        "discoveredBy": "Andreas Marggraf",
        "namedBy": "German Zink (Зубець)",
        "stse": [
          "Контроль корозії",
          "Імунна підтримка."
        ],
        "commonUses": [
          "Захист від іржі",
          "сонцезахисний крем",
          "Сплави (латунь)."
        ],
        "hazards": [
          "Гарячка від пар металів (при вдиханні)."
        ]
      }
    }
  },
  "al_3plus": {
    "name": "Алюміній",
    "customData": {
      "level1": {
        "type": "Постперехідний катіон",
        "source": "Елемент групи 13 - Втрата 3 e⁻",
        "phase": "Водний (aq) – Безбарвний",
        "valence": "0 (стабільний октет)",
        "keyCompounds": [
          {
            "formula": "Al₂O₃",
            "name": "Сапфір"
          },
          {
            "formula": "KAl(SO₄)₂",
            "name": "галун"
          }
        ]
      },
      "level2": {
        "molarMass": "26.98 г/моль",
        "subatomic": "13 р⁺ | 10 е⁻",
        "statusBanner": "Амфотерний Ppt (білий гель)",
        "slotA": {
          "label": "Окислення",
          "result": "Прозорий щит",
          "desc": "Al₂O₃ Шар"
        },
        "slotB": {
          "label": "Опад",
          "result": "Білий гель",
          "desc": "Амфотерний"
        }
      },
      "level3": {
        "config": "[Ne] (Стабільний октет)",
        "oxidation": "+3",
        "ionicRadius": "54 pm (Маленький та сильно заряджений)",
        "hydrationEnthalpy": "-4665 kJ/mol (Екстремальний)",
        "coordination": "6 (октаедричний)"
      },
      "level4": {
        "discoveryYear": "1825",
        "discoveredBy": "Hans Christian Oersted",
        "namedBy": "Latin Alumen (Гірка сіль)",
        "stse": [
          "Ефективність переробки",
          "Червоні грязьові відходи."
        ],
        "commonUses": [
          "Авіаційні сплави",
          "Банки",
          "Водні процедури."
        ],
        "hazards": [
          "Проблеми нейротоксичності."
        ]
      }
    }
  },
  "f_minus": {
    "name": "фторид",
    "customData": {
      "level1": {
        "type": "Галоген Аніон",
        "source": "Елемент групи 17 – виграш у 1 e⁻",
        "phase": "Водний (aq) – Безбарвний",
        "valence": "8 (стабільний октет)",
        "keyCompounds": [
          {
            "formula": "NaF",
            "name": "Зубна паста"
          },
          {
            "formula": "CaF₂",
            "name": "Флюорит"
          }
        ]
      },
      "level2": {
        "molarMass": "19.00 г/моль",
        "subatomic": "9 р⁺ | 10 е⁻",
        "statusBanner": "Нерозчинний у кальції (Ca²⁺).",
        "slotA": {
          "label": "Опад",
          "result": "Білий суцільний",
          "desc": "з Ca²⁺"
        },
        "slotB": {
          "label": "Захист",
          "result": "Твердить емаль",
          "desc": "Профілактика карієсу"
        }
      },
      "level3": {
        "config": "[Ne] (Стабільний октет)",
        "oxidation": "-1",
        "ionicRadius": "133 pm (розширюється з 71 pm)",
        "hydrationEnthalpy": "-515 kJ/mol",
        "coordination": "4-8"
      },
      "level4": {
        "discoveryYear": "1886",
        "discoveredBy": "Henri Moissan",
        "namedBy": "Latin Fluere (Для потоку)",
        "stse": [
          "Дебати про фторування води",
          "Забруднення тефлону."
        ],
        "commonUses": [
          "Профілактика карієсу",
          "Сковороди з антипригарним покриттям",
          "Офорт."
        ],
        "hazards": [
          "Токсично у високих концентраціях (флюороз)."
        ]
      }
    }
  },
  "cl_minus": {
    "name": "Хлористий",
    "customData": {
      "level1": {
        "type": "Галоген Аніон",
        "source": "Елемент групи 17 – виграш у 1 e⁻",
        "phase": "Водний (aq) – Безбарвний",
        "valence": "8 (стабільний октет)",
        "keyCompounds": [
          {
            "formula": "NaCl",
            "name": "Поварена сіль"
          },
          {
            "formula": "AgCl",
            "name": "Білий Ппт"
          }
        ]
      },
      "level2": {
        "molarMass": "35.45 г/моль",
        "subatomic": "17 р⁺ | 18 е⁻",
        "statusBanner": "Нерозчинний у сріблі (Ag⁺)",
        "slotA": {
          "label": "Опад",
          "result": "Біла хмара",
          "desc": "з Ag⁺"
        },
        "slotB": {
          "label": "Санітарія",
          "result": "Дезінфікує воду",
          "desc": "Басейн та кран"
        }
      },
      "level3": {
        "config": "[Ar] (Стабільний октет)",
        "oxidation": "-1",
        "ionicRadius": "181 pm (розширюється з 99 pm)",
        "hydrationEnthalpy": "-381 kJ/mol",
        "coordination": "6"
      },
      "level4": {
        "discoveryYear": "1774",
        "discoveredBy": "Carl Wilhelm Scheele",
        "namedBy": "Greek Chloros (Pale Green)",
        "stse": [
          "Санітарія (чиста вода)",
          "Ушкодження від дорожньої солі."
        ],
        "commonUses": [
          "Поварена сіль",
          "Шлунковий сік",
          "PVC Пластмаси."
        ],
        "hazards": [
          "Безпечно як іон (необхідна поживна речовина)."
        ]
      }
    }
  },
  "br_minus": {
    "name": "бромід",
    "customData": {
      "level1": {
        "type": "Галоген Аніон",
        "source": "Елемент групи 17 – виграш у 1 e⁻",
        "phase": "Водний (aq) – Безбарвний",
        "valence": "8 (стабільний октет)",
        "keyCompounds": [
          {
            "formula": "AgBr",
            "name": "Фільм"
          },
          {
            "formula": "NaBr",
            "name": "Седативне"
          }
        ]
      },
      "level2": {
        "molarMass": "79.90 г/моль",
        "subatomic": "35 р⁺ | 36 е⁻",
        "statusBanner": "Нерозчинний у сріблі (кремовий Ppt).",
        "slotA": {
          "label": "Опад",
          "result": "Крем Твердий",
          "desc": "з Ag⁺"
        },
        "slotB": {
          "label": "Пожежна зупинка",
          "result": "Вогнегасник",
          "desc": "Вогнезахисний"
        }
      },
      "level3": {
        "config": "[Kr] (Стабільний октет)",
        "oxidation": "-1",
        "ionicRadius": "196 pm (розширюється зі 114 pm)",
        "hydrationEnthalpy": "-347 kJ/mol",
        "coordination": "6"
      },
      "level4": {
        "discoveryYear": "1826",
        "discoveredBy": "Antoine Balard",
        "namedBy": "Greek Bromos (Сморід)",
        "stse": [
          "Руйнування озону",
          "Пожежна безпека (сповільнювачі)."
        ],
        "commonUses": [
          "Фотографія",
          "Вогнезахисні засоби",
          "Гарячі ванни."
        ],
        "hazards": [
          "Хронічна токсичність (бромізм)."
        ]
      }
    }
  },
  "i_minus": {
    "name": "Йодід",
    "customData": {
      "level1": {
        "type": "Галоген Аніон",
        "source": "Елемент групи 17 – виграш у 1 e⁻",
        "phase": "Водний (aq) – Безбарвний",
        "valence": "8 (стабільний октет)",
        "keyCompounds": [
          {
            "formula": "KI",
            "name": "Йодована сіль"
          },
          {
            "formula": "PbI₂",
            "name": "Золотий дощ"
          }
        ]
      },
      "level2": {
        "molarMass": "126.90 г/моль",
        "subatomic": "53 р⁺ | 54 е⁻",
        "statusBanner": "Нерозв'язний з Pb²⁺ (Жовтий)",
        "slotA": {
          "label": "Опад",
          "result": "Яскраво-жовтий",
          "desc": "зі свинцем"
        },
        "slotB": {
          "label": "Щитовидна залоза",
          "result": "Запобігає зобу",
          "desc": "Йодована сіль"
        }
      },
      "level3": {
        "config": "[Xe] (Стабільний октет)",
        "oxidation": "-1",
        "ionicRadius": "220 pm (Велике розширення)",
        "hydrationEnthalpy": "-305 kJ/mol",
        "coordination": "6"
      },
      "level4": {
        "discoveryYear": "1811",
        "discoveredBy": "Bernard Courtois",
        "namedBy": "Greek Iodes (Фіолетовий)",
        "stse": [
          "Профілактика зобу",
          "Ядерна безпека (таблетки)."
        ],
        "commonUses": [
          "Йодована сіль",
          "Дезінфікуючий засіб",
          "Засів хмар."
        ],
        "hazards": [
          "Низька токсичність."
        ]
      }
    }
  },
  "o_2minus": {
    "name": "Окис",
    "customData": {
      "level1": {
        "type": "Халькоген аніон",
        "source": "Елемент групи 16 – посилення 2 e⁻",
        "phase": "Тверді оксиди (реагує у воді)",
        "valence": "8 (стабільний октет)",
        "keyCompounds": [
          {
            "formula": "MgO",
            "name": ""
          },
          {
            "formula": "Fe₂O₃",
            "name": "Іржа"
          },
          {
            "formula": "CaO",
            "name": ""
          }
        ]
      },
      "level2": {
        "molarMass": "16.00 г/моль",
        "subatomic": "8 р⁺ | 10 е⁻",
        "statusBanner": "Форми базового рішення (OH⁻)",
        "slotA": {
          "label": "Основність",
          "result": "Утворює гідроксид",
          "desc": "O²⁻ + H₂O → 2OH⁻"
        },
        "slotB": {
          "label": "Окислення",
          "result": "Іржавіє залізо",
          "desc": "Fe₂O₃ (червоно-коричневий)"
        }
      },
      "level3": {
        "config": "[Ne] (Стабільний октет)",
        "oxidation": "-2",
        "ionicRadius": "140 pm (розширюється з 73 pm)",
        "hydrationEnthalpy": "Високий (Реагує)",
        "coordination": "4-6"
      },
      "level4": {
        "discoveryYear": "1774",
        "discoveredBy": "Priestley / Scheele",
        "namedBy": "Greek Oxys (Кислота – помилково)",
        "stse": [
          "Витрати на корозію",
          "Зміна клімату (CO₂)."
        ],
        "commonUses": [
          "Кераміка",
          "Конкретний",
          "Видобуток руд."
        ],
        "hazards": [
          "Каустик (сильна основа)."
        ]
      }
    }
  },
  "s_2minus": {
    "name": "Сульфід",
    "customData": {
      "level1": {
        "type": "Халькоген аніон",
        "source": "Елемент групи 16 – посилення 2 e⁻",
        "phase": "Тверді руди/водні",
        "valence": "8 (стабільний октет)",
        "keyCompounds": [
          {
            "formula": "H₂S",
            "name": "Гнилий газ"
          },
          {
            "formula": "FeS₂",
            "name": "Пірит"
          }
        ]
      },
      "level2": {
        "molarMass": "32.06 г/моль",
        "subatomic": "16 р⁺ | 18 е⁻",
        "statusBanner": "Нерозчинні чорні частинки (HgS, CuS)",
        "slotA": {
          "label": "Опад",
          "result": "Чорний суцільний",
          "desc": "з металами"
        },
        "slotB": {
          "label": "Запах",
          "result": "Тухлі яйця",
          "desc": "H₂S Газ"
        }
      },
      "level3": {
        "config": "[Ar] (Стабільний октет)",
        "oxidation": "-2",
        "ionicRadius": "184 pm (розширюється зі 100 pm)",
        "hydrationEnthalpy": "Високий",
        "coordination": "6"
      },
      "level4": {
        "discoveryYear": "доісторичний",
        "discoveredBy": "Невідомий",
        "namedBy": "Sanskrit Sulvere",
        "stse": [
          "Кислотний дренаж шахт",
          "Геотермальна енергія."
        ],
        "commonUses": [
          "Металеві руди (сфалерит)",
          "Паперова промисловість."
        ],
        "hazards": [
          "Токсичний газ (H₂S)."
        ]
      }
    }
  },
  "n_3minus": {
    "name": "Нітрід",
    "customData": {
      "level1": {
        "type": "Пніктоген аніон",
        "source": "Елемент групи 15 – посилення 3 e⁻",
        "phase": "Твердий (Кераміка)",
        "valence": "8 (стабільний октет)",
        "keyCompounds": [
          {
            "formula": "NH₃",
            "name": "Аміак"
          },
          {
            "formula": "GaN",
            "name": "LED"
          }
        ]
      },
      "level2": {
        "molarMass": "14.01 г/моль",
        "subatomic": "7 р⁺ | 10 е⁻",
        "statusBanner": "Гідролізується до аміаку (NH₃)",
        "slotA": {
          "label": "Гідроліз",
          "result": "Вивільняє аміак",
          "desc": "N³⁻ + 3H₂O → NH₃"
        },
        "slotB": {
          "label": "Світлодіодне світло",
          "result": "Синє свічення",
          "desc": "GaN Технологія"
        }
      },
      "level3": {
        "config": "[Ne] (Стабільний октет)",
        "oxidation": "-3",
        "ionicRadius": "146 pm (Велике розширення)",
        "hydrationEnthalpy": "бурхливо реагує",
        "coordination": "4-6"
      },
      "level4": {
        "discoveryYear": "1772",
        "discoveredBy": "Daniel Rutherford",
        "namedBy": "Greek Nitron (Газування)",
        "stse": [
          "Синій LEDs (Нобелівська премія)",
          "Безпека подушок безпеки."
        ],
        "commonUses": [
          "Напівпровідники",
          "Надтверді покриття."
        ],
        "hazards": [
          "Інтенсивно реагує з водою."
        ]
      }
    }
  },
  "p_3minus": {
    "name": "Фосфід",
    "customData": {
      "level1": {
        "type": "Пніктоген аніон",
        "source": "Елемент групи 15 – посилення 3 e⁻",
        "phase": "Твердий",
        "valence": "8 (стабільний октет)",
        "keyCompounds": [
          {
            "formula": "AlP",
            "name": "Фумігант"
          },
          {
            "formula": "InP",
            "name": "Чіп"
          }
        ]
      },
      "level2": {
        "molarMass": "30.97 г/моль",
        "subatomic": "15 р⁺ | 18 е⁻",
        "statusBanner": "Випускає токсичний фосфін",
        "slotA": {
          "label": "Токсичний газ",
          "result": "Вивільнення фосфіну",
          "desc": "PH₃ (Смертельний)"
        },
        "slotB": {
          "label": "Електронний",
          "result": "Високошвидкісний чіп",
          "desc": "InP Напівпровідник"
        }
      },
      "level3": {
        "config": "[Ar] (Стабільний октет)",
        "oxidation": "-3",
        "ionicRadius": "212 pm (розширюється зі 110 pm)",
        "hydrationEnthalpy": "Реагує",
        "coordination": "4"
      },
      "level4": {
        "discoveryYear": "1669",
        "discoveredBy": "Hennig Brand",
        "namedBy": "Greek Phosphoros (Світло)",
        "stse": [
          "Боротьба зі шкідниками",
          "Переробки електронних відходів."
        ],
        "commonUses": [
          "Напівпровідники",
          "Родентициди."
        ],
        "hazards": [
          "Високотоксичний газ."
        ]
      }
    }
  },
  "co3_2minus": {
    "name": "Карбонат",
    "customData": {
      "level1": {
        "type": "оксіаніон",
        "source": "Вугільна кислота (H₂CO₃) – втрата 2 H⁺",
        "phase": "Твердий (в солях) – Білий",
        "valence": "Усього 24 (стабільні октети)",
        "keyCompounds": [
          {
            "formula": "CaCO₃",
            "name": "Вапняк"
          },
          {
            "formula": "Na₂CO₃",
            "name": "кальцинована сода"
          }
        ]
      },
      "level2": {
        "molarMass": "60.01 г/моль",
        "subatomic": "1 C + 3 O | Заряд -2",
        "statusBanner": "Нерозчинні (крім групи 1 та NH₄⁺)",
        "slotA": {
          "label": "Кислотний тест",
          "result": "CO₂",
          "desc": "Сильно шипить"
        },
        "slotB": {
          "label": "Опад",
          "result": "Білий суцільний",
          "desc": "з Ca²⁺"
        }
      },
      "level3": {
        "config": "Тригонально-площинний (sp²)",
        "oxidation": "З +4",
        "ionicRadius": "178 pm",
        "hydrationEnthalpy": "-1314 kJ/mol",
        "coordination": "Тригонально-планарний (120 °)"
      },
      "level4": {
        "discoveryYear": "Стародавній",
        "discoveredBy": "",
        "namedBy": "Latin Carbo (Вугілля)",
        "stse": [
          "Закислення океану",
          "Вуглецевий цикл",
          "Виробництво цементу."
        ],
        "commonUses": [
          "Антациди (Тумс)",
          "Виробництво скла",
          "Випічка."
        ],
        "hazards": [
          "Безпечний (незамінний буфер крові)."
        ]
      }
    }
  },
  "c2o4_2minus": {
    "name": "оксалат",
    "customData": {
      "level1": {
        "type": "Органічний аніон",
        "source": "Щавлева кислота – втрата 2 H⁺",
        "phase": "Твердий (в солях) – Білий",
        "valence": "34 Всього",
        "keyCompounds": [
          {
            "formula": "CaC₂O₄",
            "name": "Камені у нирках"
          },
          {
            "formula": "K₂C₂O₄",
            "name": ""
          }
        ]
      },
      "level2": {
        "molarMass": "88.02 г/моль",
        "subatomic": "2 З + 4 Про | Заряд -2",
        "statusBanner": "Утворює нерозчинну сіль кальцію",
        "slotA": {
          "label": "Хелатування",
          "result": "Металева палітурка",
          "desc": "Міцно захоплює метали"
        },
        "slotB": {
          "label": "Кристали",
          "result": "Голки",
          "desc": "Гострі голки (камені)"
        }
      },
      "level3": {
        "config": "Планарний (скручений у розчині)",
        "oxidation": "З +3",
        "ionicRadius": "Великий плоский іон",
        "hydrationEnthalpy": "Високий",
        "coordination": "Два тригональних плоских блоки"
      },
      "level4": {
        "discoveryYear": "1776",
        "discoveredBy": "Carl Wilhelm Scheele",
        "namedBy": "Latin Oxalis (Щавель)",
        "stse": [
          "Здоров'я (Камінці в нирках)",
          "Ботаніка (токсичність ревеню)."
        ],
        "commonUses": [
          "Засоби для видалення іржі",
          "Вибілювання деревини."
        ],
        "hazards": [
          "Токсично (зв'язує кальцій крові)."
        ]
      }
    }
  },
  "no3_minus": {
    "name": "Нітрат",
    "customData": {
      "level1": {
        "type": "оксіаніон",
        "source": "Азотна кислота (HNO₃) – втрата 1 H⁺",
        "phase": "Водний (aq) – Безбарвний",
        "valence": "24 Усього (Резонанс)",
        "keyCompounds": [
          {
            "formula": "KNO₃",
            "name": "Порох"
          },
          {
            "formula": "AgNO₃",
            "name": "Тестування"
          }
        ]
      },
      "level2": {
        "molarMass": "62.00 г/моль",
        "subatomic": "1 Н + 3 Про | Заряд -1",
        "statusBanner": "Завжди розчинний (всепрохідний іон)",
        "slotA": {
          "label": "Розчинність",
          "result": "All-Pass",
          "desc": "Ніколи не випадає в осад"
        },
        "slotB": {
          "label": "Вибухонебезпечний",
          "result": "Окислювач",
          "desc": "Окислює порох"
        }
      },
      "level3": {
        "config": "Тригонально-площинний (sp²)",
        "oxidation": "Н = +5",
        "ionicRadius": "179 pm",
        "hydrationEnthalpy": "-314 kJ/mol",
        "coordination": "Тригонально-планарний (120 °)"
      },
      "level4": {
        "discoveryYear": "9 століття",
        "discoveredBy": "Chinese Alchemists",
        "namedBy": "Нітра (Селітра)",
        "stse": [
          "Евтрофікація (водорості)",
          "Азотний цикл",
          "Вибухобезпека."
        ],
        "commonUses": [
          "Добрива",
          "Порох",
          "В'ялення м'яса."
        ],
        "hazards": [
          "Стічні води забруднюють воду",
          "Сильний окислювач."
        ]
      }
    }
  },
  "no2_minus": {
    "name": "Нітріт",
    "customData": {
      "level1": {
        "type": "оксіаніон",
        "source": "Азотиста кислота (HNO₂) - Втрата 1 H⁺",
        "phase": "Водний (aq) – блідо-жовтий",
        "valence": "Всього 18 (Самотня пара)",
        "keyCompounds": [
          {
            "formula": "NaNO₂",
            "name": "консервант"
          },
          {
            "formula": "KNO₂",
            "name": ""
          }
        ]
      },
      "level2": {
        "molarMass": "46.01 г/моль",
        "subatomic": "1 Н + 2 Про | Заряд -1",
        "statusBanner": "токсично на високих рівнях",
        "slotA": {
          "label": "Зберігати",
          "result": "протимікробний",
          "desc": "Зберігає м'ясо червоним"
        },
        "slotB": {
          "label": "Вигнута форма",
          "result": "Самотня пара",
          "desc": "Відштовхування одинокої пари"
        }
      },
      "level3": {
        "config": "Бент (sp²)",
        "oxidation": "Н = +3",
        "ionicRadius": "192 pm",
        "hydrationEnthalpy": "-410 kJ/mol",
        "coordination": "Вигнутий (<120°)"
      },
      "level4": {
        "discoveryYear": "Індустріальна епоха",
        "discoveredBy": "",
        "namedBy": "Greek Nitron",
        "stse": [
          "Безпека харчових продуктів (ботулізм проти раку)",
          "Синдром синій дитини."
        ],
        "commonUses": [
          "Консервант для в'яленого м'яса",
          "Барвники."
        ],
        "hazards": [
          "Токсично (порушує транспорт кисню)."
        ]
      }
    }
  },
  "so4_2minus": {
    "name": "Сульфат",
    "customData": {
      "level1": {
        "type": "оксіаніон",
        "source": "Сірчана кислота (H₂SO₄) – втрата 2 H⁺",
        "phase": "Водний (aq) – Безбарвний",
        "valence": "32 Всього",
        "keyCompounds": [
          {
            "formula": "H₂SO₄",
            "name": "Автомобільний акумулятор"
          },
          {
            "formula": "CaSO₄⋅2H₂O",
            "name": "Гіпс"
          }
        ]
      },
      "level2": {
        "molarMass": "96.06 г/моль",
        "subatomic": "1 З + 4 Про | Заряд -2",
        "statusBanner": "Нерозчинний у барії/свинці.",
        "slotA": {
          "label": "Опад",
          "result": "BaSO₄",
          "desc": "Щільний білий з Ba²⁺"
        },
        "slotB": {
          "label": "Влада",
          "result": "Електроліт",
          "desc": "Свинцево-кислотна батарея"
        }
      },
      "level3": {
        "config": "Тетраедричний (sp³)",
        "oxidation": "З = +6",
        "ionicRadius": "242 pm",
        "hydrationEnthalpy": "-1059 kJ/mol",
        "coordination": "Тетраедричний (109,5°)"
      },
      "level4": {
        "discoveryYear": "8 століття",
        "discoveredBy": "Jabir ibn Hayyan",
        "namedBy": "Купорос (скляний)",
        "stse": [
          "Кислотний дощ (ушкодження лісу)",
          "Утилізація акумуляторів."
        ],
        "commonUses": [
          "Автомобільні акумулятори",
          "Гіпс",
          "Квасці."
        ],
        "hazards": [
          "Провісник кислотних дощів."
        ]
      }
    }
  },
  "so3_2minus": {
    "name": "Сульфіт",
    "customData": {
      "level1": {
        "type": "оксіаніон",
        "source": "Сірчиста кислота (H₂SO₃)",
        "phase": "Водний (aq) – Безбарвний",
        "valence": "26 Усього (Самотня пара)",
        "keyCompounds": [
          {
            "formula": "Na₂SO₃",
            "name": "консервант"
          },
          {
            "formula": "MgSO₃",
            "name": ""
          }
        ]
      },
      "level2": {
        "molarMass": "80.06 г/моль",
        "subatomic": "1 З + 3 Про | Заряд -2",
        "statusBanner": "Відновлювач/відбілювач",
        "slotA": {
          "label": "Відбілювання",
          "result": "Дезодорувати",
          "desc": "Робить папір білий"
        },
        "slotB": {
          "label": "гострий",
          "result": "SO₂ Газ",
          "desc": "Гнилий запах (кислий)"
        }
      },
      "level3": {
        "config": "Трикутна піраміда (sp³)",
        "oxidation": "З +4",
        "ionicRadius": "Великий",
        "hydrationEnthalpy": "-1300 kJ/mol",
        "coordination": "Трикутна піраміда (<109,5 °)"
      },
      "level4": {
        "discoveryYear": "Стародавній",
        "discoveredBy": "(Burning Sulfur)",
        "namedBy": "сірка",
        "stse": [
          "Винна алергія (сульфіти)",
          "Джерело кислотних дощів."
        ],
        "commonUses": [
          "Консервант для вина",
          "Вибілювання паперу."
        ],
        "hazards": [
          "Тригер астми",
          "Викид токсичного газу."
        ]
      }
    }
  },
  "po4_3minus": {
    "name": "Фосфат",
    "customData": {
      "level1": {
        "type": "оксіаніон",
        "source": "Фосфорна кислота (H₃PO₄) – втрата 3 H⁺",
        "phase": "Тверде (кістки)/водне",
        "valence": "32 Всього",
        "keyCompounds": [
          {
            "formula": "Ca₃(PO₄)₂",
            "name": "Кістка"
          },
          {
            "formula": "ATP",
            "name": "Енергія"
          }
        ]
      },
      "level2": {
        "molarMass": "94.97 г/моль",
        "subatomic": "1 П + 4 Про | Заряд -3",
        "statusBanner": "Нерозчинний, крім групи 1",
        "slotA": {
          "label": "Опад",
          "result": "Жовтий",
          "desc": "Жовтий зі сріблом (Ag₃PO₄)"
        },
        "slotB": {
          "label": "Життя",
          "result": "Магістраль",
          "desc": "DNA Магістраль"
        }
      },
      "level3": {
        "config": "Тетраедричний (sp³)",
        "oxidation": "П = +5",
        "ionicRadius": "238 pm",
        "hydrationEnthalpy": "-2765 kJ/mol",
        "coordination": "Тетраедричний (109,5°)"
      },
      "level4": {
        "discoveryYear": "1669",
        "discoveredBy": "Hennig Brand",
        "namedBy": "Greek Phosphoros (Світло)",
        "stse": [
          "Евтрофікація (цвітіння водоростей)",
          "Дефіцит фосфору."
        ],
        "commonUses": [
          "Добрива",
          "Кола (підкислювач)",
          "Миючі засоби."
        ],
        "hazards": [
          "Забруднення води (водорості)."
        ]
      }
    }
  },
  "clo3_minus": {
    "name": "хлорат",
    "customData": {
      "level1": {
        "type": "Галоген оксіаніон",
        "source": "Хлорна кислота (HClO₃)",
        "phase": "Водний (aq) – Безбарвний",
        "valence": "26 Всього",
        "keyCompounds": [
          {
            "formula": "KClO₃",
            "name": "Феєрверк"
          },
          {
            "formula": "NaClO₃",
            "name": ""
          }
        ]
      },
      "level2": {
        "molarMass": "83.45 г/моль",
        "subatomic": "1 Cl + 3 Про | Заряд -1",
        "statusBanner": "Сильний окислювач",
        "slotA": {
          "label": "Вибух",
          "result": "Окислювач",
          "desc": "Окислювач для кольору"
        },
        "slotB": {
          "label": "Гербіцид",
          "result": "Дефоліант",
          "desc": "Вбиває бур'яни"
        }
      },
      "level3": {
        "config": "Трикутна піраміда (sp³)",
        "oxidation": "Cl дорівнює +5",
        "ionicRadius": "171 pm",
        "hydrationEnthalpy": "Низький",
        "coordination": "Трикутна піраміда (<109,5 °)"
      },
      "level4": {
        "discoveryYear": "1786",
        "discoveredBy": "Claude Louis Berthollet",
        "namedBy": "хлор",
        "stse": [
          "Безпека (вибухостійкість)",
          "Сільське господарство (боротьба з бур'янами)."
        ],
        "commonUses": [
          "Феєрверк",
          "Кисневі свічки (Підводні човни)."
        ],
        "hazards": [
          "Ризик пожежі/вибуху під час використання органічних речовин."
        ]
      }
    }
  },
  "clo_minus": {
    "name": "Гіпохлорит",
    "customData": {
      "level1": {
        "type": "Галоген оксіаніон",
        "source": "Відбілювач (OCl⁻)",
        "phase": "Водний (aq) – блідо-жовтий",
        "valence": "14 Всього",
        "keyCompounds": [
          {
            "formula": "NaClO",
            "name": "Бліч/Явекс"
          },
          {
            "formula": "Ca(ClO)₂",
            "name": ""
          }
        ]
      },
      "level2": {
        "molarMass": "51.45 г/моль",
        "subatomic": "1 Cl + 1 Про | Заряд -1",
        "statusBanner": "Відбілюючий агент",
        "slotA": {
          "label": "Відбілювання",
          "result": "Окислення",
          "desc": "Видаляє плями"
        },
        "slotB": {
          "label": "Дезінфікувати",
          "result": "Стерилізувати",
          "desc": "Вбиває мікроби"
        }
      },
      "level3": {
        "config": "Лінійний",
        "oxidation": "Cl дорівнює +1",
        "ionicRadius": "150 pm",
        "hydrationEnthalpy": "-350 kJ/mol",
        "coordination": "Лінійний"
      },
      "level4": {
        "discoveryYear": "1789",
        "discoveredBy": "Berthollet (Javel Water)",
        "namedBy": "Greek Hypo (Менше)",
        "stse": [
          "Громадська охорона здоров'я (хлорування води)",
          "Гігієна."
        ],
        "commonUses": [
          "Побутовий відбілювач",
          "Санітарія басейну."
        ],
        "hazards": [
          "Токсичний газ (Cl₂) при змішуванні з кислотою/аміаком."
        ]
      }
    }
  },
  "clo4_minus": {
    "name": "Перхлорат",
    "customData": {
      "level1": {
        "type": "Галоген оксіаніон",
        "source": "хлорна кислота",
        "phase": "Тверді (солі)",
        "valence": "32 Всього",
        "keyCompounds": [
          {
            "formula": "NH₄ClO₄",
            "name": "Ракетне паливо"
          },
          {
            "formula": "KClO₄",
            "name": ""
          }
        ]
      },
      "level2": {
        "molarMass": "99.45 г/моль",
        "subatomic": "1 Cl + 4 Про | Заряд -1",
        "statusBanner": "Окислювач ракетного палива",
        "slotA": {
          "label": "Запуск",
          "result": "Порох",
          "desc": "Тверде допоміжне паливо"
        },
        "slotB": {
          "label": "Марсіанська грунт",
          "result": "Марсіанська грунт",
          "desc": "Знайдено на Марсі"
        }
      },
      "level3": {
        "config": "Тетраедричний (sp³)",
        "oxidation": "Cl дорівнює +7 (Макс.)",
        "ionicRadius": "240 pm",
        "hydrationEnthalpy": "Низький",
        "coordination": "Тетраедричний (109,5°)"
      },
      "level4": {
        "discoveryYear": "1816",
        "discoveredBy": "Friedrich von Stadion",
        "namedBy": "Greek Hyper (Кінець)",
        "stse": [
          "Дослідження космосу",
          "Забруднення підземних вод",
          "Здоров'я щитовидної залози."
        ],
        "commonUses": [
          "Ракетне паливо",
          "Надувники подушок безпеки."
        ],
        "hazards": [
          "Ризик вибуху",
          "Токсини щитовидної залози."
        ]
      }
    }
  },
  "cu_plus": {
    "name": "Мідь(I)",
    "customData": {
      "level1": {
        "type": "Катіон перехідного металу",
        "source": "Елемент групи 11 – втрата 1 e⁻",
        "phase": "Водний (нестабільний)/твердий",
        "valence": "18 (Псевдобагородний газ)",
        "keyCompounds": [
          {
            "formula": "Cu₂O",
            "name": "Червоний"
          },
          {
            "formula": "CuCl",
            "name": "Білий"
          }
        ]
      },
      "level2": {
        "molarMass": "63.55 г/моль",
        "subatomic": "29 р⁺ | 28 е⁻",
        "statusBanner": "М'яка кислота Льюїса",
        "slotA": {
          "label": "Безбарвний",
          "result": "Прозорий",
          "desc": "Прозорий у чистій воді"
        },
        "slotB": {
          "label": "Диспропорція",
          "result": "Нестабільний",
          "desc": "2Cu⁺ ➔ Cu²⁺ + Cu"
        }
      },
      "level3": {
        "config": "[Ar] 3d¹⁰ (Повна d-оболонка)",
        "oxidation": "+1",
        "ionicRadius": "77 pm (Великий за додаткову плату)",
        "hydrationEnthalpy": "-593 kJ/mol",
        "coordination": "2 (лінійний)"
      },
      "level4": {
        "discoveryYear": "доісторичний",
        "discoveredBy": "Невідомий",
        "namedBy": "Latin Cuprum (з Кіпру)",
        "stse": [
          "Давня металургія",
          "Біологічне перенесення електрона."
        ],
        "commonUses": [
          "Каталіз",
          "Процес фарбування",
          "Пестициди (Cu₂O)."
        ],
        "hazards": [
          "Токсичний для водної флори та фауни."
        ]
      }
    }
  },
  "cu_2plus": {
    "name": "Мідь(II)",
    "customData": {
      "level1": {
        "type": "Катіон перехідного металу",
        "source": "Елемент групи 11 - Втрата 2 e⁻",
        "phase": "Водний (aq) - яскраво-синій",
        "valence": "17 Усього (д⁹)",
        "keyCompounds": [
          {
            "formula": "CuSO₄",
            "name": "Мідний купорос"
          },
          {
            "formula": "CuCO₃",
            "name": "Яр-мідянка"
          }
        ]
      },
      "level2": {
        "molarMass": "63.55 г/моль",
        "subatomic": "29 р⁺ | 27 е⁻",
        "statusBanner": "Парамагнетик (синій колір)",
        "slotA": {
          "label": "Колір",
          "result": "Яскраво-синій",
          "desc": "Яскраво-блакитний/синій розчин"
        },
        "slotB": {
          "label": "Випробування полум'я",
          "result": "Синьо-Зелений",
          "desc": "Синьо-Зелене Полум'я"
        }
      },
      "level3": {
        "config": "[Ar] 3d⁹",
        "oxidation": "+2 (найстабільніший)",
        "ionicRadius": "73 pm",
        "hydrationEnthalpy": "-2100 kJ/mol (надзвичайно високий)",
        "coordination": "6 (октаедр Яна-Теллера)"
      },
      "level4": {
        "discoveryYear": "доісторичний",
        "discoveredBy": "Невідомий",
        "namedBy": "Latin Cuprum",
        "stse": [
          "Електроніка (PCB Травлення)",
          "Бордоська суміш (фунгіцид)."
        ],
        "commonUses": [
          "Гальваніка",
          "Пігменти",
          "Консервант для деревини"
        ],
        "hazards": [
          "Корозійний",
          "Шкідливий при ковтанні."
        ]
      }
    }
  },
  "fe_2plus": {
    "name": "Залізо(II)",
    "customData": {
      "level1": {
        "type": "Катіон перехідного металу",
        "source": "Елемент групи 8 - Втрата 2 e⁻",
        "phase": "Водний (aq) – блідо-зелений",
        "valence": "18 Усього (д⁶)",
        "keyCompounds": [
          {
            "formula": "FeSO₄",
            "name": "Зелений купорос"
          },
          {
            "formula": "FeCl₂",
            "name": ""
          }
        ]
      },
      "level2": {
        "molarMass": "55.85 г/моль",
        "subatomic": "26 р⁺ | 24 е⁻",
        "statusBanner": "Переносник кисню у крові",
        "slotA": {
          "label": "Гемоглобін",
          "result": "O₂ Зв'язування",
          "desc": "Зв'язує кисень у легенях"
        },
        "slotB": {
          "label": "Опад",
          "result": "Брудний зелений",
          "desc": "Брудно-зелений з OH⁻"
        }
      },
      "level3": {
        "config": "[Ar] 3d⁶",
        "oxidation": "+2 (Чорне залізо)",
        "ionicRadius": "78 pm (Високе обертання)",
        "hydrationEnthalpy": "-1920 kJ/mol",
        "coordination": "6 (октаедричний)"
      },
      "level4": {
        "discoveryYear": "доісторичний",
        "discoveredBy": "Various Cultures",
        "namedBy": "Latin Ferrum",
        "stse": [
          "Залізодефіцитна анемія",
          "Біологічний окисно-відновний потенціал."
        ],
        "commonUses": [
          "Харчові добавки",
          "Водні процедури."
        ],
        "hazards": [
          "Гостра передозування заліза токсична."
        ]
      }
    }
  },
  "fe_3plus": {
    "name": "Залізо(III)",
    "customData": {
      "level1": {
        "type": "Катіон перехідного металу",
        "source": "Елемент групи 8 - Втрата 3 e⁻",
        "phase": "Водний (aq) – Жовтий/Коричневий",
        "valence": "17 Усього (д⁵)",
        "keyCompounds": [
          {
            "formula": "FeCl₃",
            "name": "Травка"
          },
          {
            "formula": "Fe₂O₃",
            "name": "Іржа"
          }
        ]
      },
      "level2": {
        "molarMass": "55.85 г/моль",
        "subatomic": "26 р⁺ | 23 е⁻",
        "statusBanner": "Дуже висока щільність заряду",
        "slotA": {
          "label": "Іржа",
          "result": "Окислення",
          "desc": "Корродована залізна поверхня"
        },
        "slotB": {
          "label": "Опад",
          "result": "Червоно-коричневий",
          "desc": "Червоно-коричневий гель з OH⁻"
        }
      },
      "level3": {
        "config": "[Ar] 3d⁵ (Напівзаповнена стійкість)",
        "oxidation": "+3 (Феррік)",
        "ionicRadius": "64.5 pm (Дуже малий)",
        "hydrationEnthalpy": "-4430 kJ/mol (Екстремальний)",
        "coordination": "6 (октаедричний)"
      },
      "level4": {
        "discoveryYear": "доісторичний",
        "discoveredBy": "Various Cultures",
        "namedBy": "Latin Ferrum",
        "stse": [
          "Кислотний дренаж шахт (Помаранчеві річки)",
          "Корозія."
        ],
        "commonUses": [
          "Очищення стічних вод (флокулянт)",
          "Виготовлення чорнила."
        ],
        "hazards": [
          "Корозійний",
          "Викликає фарбування."
        ]
      }
    }
  },
  "pb_2plus": {
    "name": "Вести(ІІ)",
    "customData": {
      "level1": {
        "type": "Постперехідний катіон",
        "source": "Елемент групи 14 – втрата зовнішньої пари 6s².",
        "phase": "Водний (aq) – Безбарвний",
        "valence": "2 (стабільна пара 6s²)",
        "keyCompounds": [
          {
            "formula": "PbI₂",
            "name": "Золото Ппт"
          },
          {
            "formula": "PbSO₄",
            "name": "Акумулятор жорсткий"
          }
        ]
      },
      "level2": {
        "molarMass": "207.2 г/моль",
        "subatomic": "82 р⁺ | 80 е⁻",
        "statusBanner": "Токсин важкого металу",
        "slotA": {
          "label": "Опад",
          "result": "Золотий дощ",
          "desc": "Золотий дощ із йодидом"
        },
        "slotB": {
          "label": "Сховище",
          "result": "Батарея",
          "desc": "Свинцево-кислотний акумулятор"
        }
      },
      "level3": {
        "config": "[Xe] 4f¹⁴ 5d¹⁰ 6s²",
        "oxidation": "+2 (Найбільш стабільний для свинцю)",
        "ionicRadius": "119 pm (Великий)",
        "hydrationEnthalpy": "-1481 kJ/mol",
        "coordination": "6–12 (гнучкий)"
      },
      "level4": {
        "discoveryYear": "Стародавній (7000 BCE)",
        "discoveredBy": "Невідомий",
        "namedBy": "Latin Plumbum",
        "stse": [
          "Водна криза Флінта",
          "Історія етилованого бензину."
        ],
        "commonUses": [
          "Автомобільні акумулятори",
          "Радіаційний захист."
        ],
        "hazards": [
          "Нейротоксичність (ушкодження головного мозку)",
          "Біоакумулятивний."
        ]
      }
    }
  },
  "mno4_minus": {
    "name": "Перманганат",
    "customData": {
      "level1": {
        "type": "Оксіаніон перехідного металу",
        "source": "Марганець у стані +7",
        "phase": "Водний (aq) – темно-фіолетовий",
        "valence": "31 Усього (Резонанс)",
        "keyCompounds": [
          {
            "formula": "KMnO₄",
            "name": "Кристали Конді's"
          }
        ]
      },
      "level2": {
        "molarMass": "118.94 г/моль",
        "subatomic": "1 Мн + 4 Про | -1",
        "statusBanner": "Абсолютний окислювач",
        "slotA": {
          "label": "Темно-фіолетовий",
          "result": "Інтенсивний",
          "desc": "Інтенсивний колір навіть при швидкості 1 стор/хв"
        },
        "slotB": {
          "label": "Окислювач",
          "result": "Реактивний",
          "desc": "Миттєво спалахує гліцерин"
        }
      },
      "level3": {
        "config": "Тетраедричний (комплекс d⁰)",
        "oxidation": "Mn +7 (Максимум)",
        "ionicRadius": "240 pm",
        "hydrationEnthalpy": "Високий",
        "coordination": "Тетраедричний (109,5°)"
      },
      "level4": {
        "discoveryYear": "1774 (Елемент)",
        "discoveredBy": "Scheele / Gahn",
        "namedBy": "Latin Magnes (Магніт)",
        "stse": [
          "Очищення води (видалення органічних речовин)",
          "Антисептик."
        ],
        "commonUses": [
          "Лабораторне титрування",
          "Дезінфікуючий засіб",
          "Консервація фруктів."
        ],
        "hazards": [
          "Потужний окислювач",
          "Забарвлює шкіру у коричневий колір (MnO₂)."
        ]
      }
    }
  },
  "cro4_2minus": {
    "name": "Хромат",
    "customData": {
      "level1": {
        "type": "Оксіаніон перехідного металу",
        "source": "Хром у стані +6",
        "phase": "Водний (aq) – яскраво-жовтий",
        "valence": "32 Всього",
        "keyCompounds": [
          {
            "formula": "K₂CrO₄",
            "name": ""
          },
          {
            "formula": "PbCrO₄",
            "name": "Хром Жовтий"
          }
        ]
      },
      "level2": {
        "molarMass": "116.00 г/моль",
        "subatomic": "1 Кр + 4 Про | -2",
        "statusBanner": "Канцерогенний / Жовтий пігмент",
        "slotA": {
          "label": "Пігмент",
          "result": "Жовтий",
          "desc": "Класичний хром жовтий"
        },
        "slotB": {
          "label": "Ph Чутливий",
          "result": "Рівновага",
          "desc": "Стає помаранчевим у кислоті"
        }
      },
      "level3": {
        "config": "Тетраедричний",
        "oxidation": "Кр = +6",
        "ionicRadius": "242 pm",
        "hydrationEnthalpy": "-1000 kJ/mol",
        "coordination": "Тетраедричний (109,5°)"
      },
      "level4": {
        "discoveryYear": "1797",
        "discoveredBy": "Louis Nicolas Vauquelin",
        "namedBy": "Greek Chroma (Колір)",
        "stse": [
          "Забруднення ґрунту",
          "Відходи хромування."
        ],
        "commonUses": [
          "Інгібітор корозії",
          "Жовтий барвник/чорнило."
        ],
        "hazards": [
          "Канцероген (шестивалентний хром)."
        ]
      }
    }
  },
  "cr2o7_2minus": {
    "name": "дихромат",
    "customData": {
      "level1": {
        "type": "Оксіаніон перехідного металу",
        "source": "Два хроматні агрегати (кислотний)",
        "phase": "Водний (aq) – яскраво-жовтогарячий",
        "valence": "52 Всього",
        "keyCompounds": [
          {
            "formula": "K₂Cr₂O₇",
            "name": ""
          },
          {
            "formula": "(NH₄)₂Cr₂O₇",
            "name": "Вулкан"
          }
        ]
      },
      "level2": {
        "molarMass": "216.00 г/моль",
        "subatomic": "2 Кр + 7 Про | -2",
        "statusBanner": "Потужний лабораторний окислювач",
        "slotA": {
          "label": "Термальний",
          "result": "Вулкан",
          "desc": "Зелений Cr₂O₃ «Ясен»"
        },
        "slotB": {
          "label": "Титрування",
          "result": "Редокс",
          "desc": "Класичний оранжево-зелений"
        }
      },
      "level3": {
        "config": "Тетраедри з двома спільними кутами",
        "oxidation": "Кр = +6",
        "ionicRadius": "Великий димерний іон",
        "hydrationEnthalpy": "Високий",
        "coordination": "Міст Cr-O-Cr (126°)"
      },
      "level4": {
        "discoveryYear": "1797",
        "discoveredBy": "Vauquelin",
        "namedBy": "Greek Di (Два) + Кольоровість",
        "stse": [
          "Алкотестерні тести (Історія)",
          "Дубління шкіри."
        ],
        "commonUses": [
          "Чищення скляного посуду",
          "Фотогравірування."
        ],
        "hazards": [
          "Високотоксичний",
          "Канцерогенний",
          "Окислювач."
        ]
      }
    }
  },
  "nh4_plus": {
    "name": "Амоній",
    "customData": {
      "level1": {
        "type": "Багатоатомний катіон",
        "source": "Аміак - Приріст 1 H⁺",
        "phase": "Водний (aq) – Безбарвний",
        "valence": "8 (стабільний октет)",
        "keyCompounds": [
          {
            "formula": "NH₄NO₃",
            "name": "Добрива"
          },
          {
            "formula": "NH₄Cl",
            "name": "Нашатир"
          }
        ]
      },
      "level2": {
        "molarMass": "18.04 г/моль",
        "subatomic": "1 Н+4 Н | Заряд +1",
        "statusBanner": "Завжди розчинний (всепрохідний іон)",
        "slotA": {
          "label": "Запах",
          "result": "Вивільняє аміак із основою",
          "desc": "NaOH Тест"
        },
        "slotB": {
          "label": "Зростання",
          "result": "Джерело азоту",
          "desc": "Добрива"
        }
      },
      "level3": {
        "config": "Тетраедричний",
        "oxidation": "Н дорівнює -3",
        "ionicRadius": "143 pm (Аналогічно K⁺)",
        "hydrationEnthalpy": "-307 kJ/mol",
        "coordination": "Тетраедричний (109,5°)"
      },
      "level4": {
        "discoveryYear": "Стародавній",
        "discoveredBy": "Різний",
        "namedBy": "From Temple Аммона",
        "stse": [
          "Глобальна продовольча безпека (добрива)",
          "Азотний цикл."
        ],
        "commonUses": [
          "Добрива",
          "Нюхальні солі",
          "Вибухівка."
        ],
        "hazards": [
          "Виділяє токсичний газоподібний аміак."
        ]
      }
    }
  },
  "oh_minus": {
    "name": "Гідроксид",
    "customData": {
      "level1": {
        "type": "Багатоатомний аніон/основа",
        "source": "Вода/Бази – втрата H⁺",
        "phase": "Водний (aq) – Безбарвний",
        "valence": "8 (стабільний октет)",
        "keyCompounds": [
          {
            "formula": "NaOH",
            "name": "Луг"
          },
          {
            "formula": "Ca(OH)₂",
            "name": "Вапняна вода"
          }
        ]
      },
      "level2": {
        "molarMass": "17.01 г/моль",
        "subatomic": "1 Про + 1 Н | Заряд -1",
        "statusBanner": "Визначення базисності (pOH)",
        "slotA": {
          "label": "Лакмусовий папірець",
          "result": "Червоний папір стає синім",
          "desc": "pH > 7"
        },
        "slotB": {
          "label": "Слизький",
          "result": "Омиляє шкірні олії",
          "desc": "Відчуття мила"
        }
      },
      "level3": {
        "config": "Лінійний",
        "oxidation": "Про одно -2",
        "ionicRadius": "137 pm",
        "hydrationEnthalpy": "-460 kJ/mol",
        "coordination": "Лінійний (180 °)"
      },
      "level4": {
        "discoveryYear": "Давнє (миловаріння)",
        "discoveredBy": "Різний",
        "namedBy": "Greek Hydro + Оксис",
        "stse": [
          "Виробництво мила (омилення)",
          "нейтралізація кислот."
        ],
        "commonUses": [
          "Очищувач каналізації",
          "Мило",
          "Антациди."
        ],
        "hazards": [
          "**Корозійне** (Їдкі опіки)",
          "Ризик сліпоти."
        ]
      }
    }
  },
  "hco3_minus": {
    "name": "Бікарбонат",
    "customData": {
      "level1": {
        "type": "Амфотерний оксіаніон",
        "source": "Вугільна кислота – втрата 1 H⁺",
        "phase": "Твердий (білий)/водний",
        "valence": "24 Всього",
        "keyCompounds": [
          {
            "formula": "NaHCO₃",
            "name": "Харчова сода"
          },
          {
            "formula": "KHCO₃",
            "name": ""
          }
        ]
      },
      "level2": {
        "molarMass": "61.02 г/моль",
        "subatomic": "1 С + 3 Про + 1 Н | Заряд -1",
        "statusBanner": "Амфотерний (буфер крові)",
        "slotA": {
          "label": "Буфер",
          "result": "Опирається pH змінам",
          "desc": "Кров pH 7.4"
        },
        "slotB": {
          "label": "Фізз",
          "result": "Випускає CO₂ із кислотою",
          "desc": "Харчова сода"
        }
      },
      "level3": {
        "config": "Тригонально-планарний",
        "oxidation": "З +4",
        "ionicRadius": "156 pm",
        "hydrationEnthalpy": "-380 kJ/mol",
        "coordination": "Тригонально-планарний (у точці C)"
      },
      "level4": {
        "discoveryYear": "1801",
        "discoveredBy": "Valentin Rose",
        "namedBy": "Prefix Bi-(Double Carbonate)",
        "stse": [
          "Кров pH Буфер (гомеостаз)",
          "Поглинач вуглецю океану."
        ],
        "commonUses": [
          "Випічка (закваска)",
          "Антациди",
          "Вогнегасники."
        ],
        "hazards": [
          "Безпечно (необхідне життя)."
        ]
      }
    }
  },
  "hso4_minus": {
    "name": "Бісульфат",
    "customData": {
      "level1": {
        "type": "Кислий оксіаніон",
        "source": "Сірчана кислота – втрата 1 H⁺",
        "phase": "Твердий (білий)/водний",
        "valence": "32 Всього",
        "keyCompounds": [
          {
            "formula": "NaHSO₄",
            "name": "Очищувач туалету"
          }
        ]
      },
      "level2": {
        "molarMass": "97.07 г/моль",
        "subatomic": "1 С + 4 Про + 1 Н | Заряд -1",
        "statusBanner": "Сильнокисла сіль",
        "slotA": {
          "label": "Кислий",
          "result": "Перетворює синій папір на червоний",
          "desc": "pH < 1"
        },
        "slotB": {
          "label": "Очищення",
          "result": "Розчиняє луску",
          "desc": "Очищувач туалету"
        }
      },
      "level3": {
        "config": "Тетраедричний",
        "oxidation": "З = +6",
        "ionicRadius": "Великий",
        "hydrationEnthalpy": "Високий",
        "coordination": "Тетраедричний (109,5°)"
      },
      "level4": {
        "discoveryYear": "Індустріальна епоха",
        "discoveredBy": "Різний",
        "namedBy": "From Sulfuric Acid",
        "stse": [
          "Промислове керування pH",
          "Безпека засобів для чищення."
        ],
        "commonUses": [
          "Чистячі засоби для унітазів",
          "Басейн pH Опускання."
        ],
        "hazards": [
          "Роз'їдає (ушкодження тканин)."
        ]
      }
    }
  },
  "h2po4_minus": {
    "name": "Дигідрофосфат",
    "customData": {
      "level1": {
        "type": "Кислий оксіаніон",
        "source": "Фосфорна кислота – втрата 1 H⁺",
        "phase": "Твердий/водний",
        "valence": "32 Всього",
        "keyCompounds": [
          {
            "formula": "Ca(H₂PO₄)₂",
            "name": "Суперфосфат"
          }
        ]
      },
      "level2": {
        "molarMass": "96.99 г/моль",
        "subatomic": "1 П + 4 Про + 2 год | Заряд -1",
        "statusBanner": "Розчинні добрива",
        "slotA": {
          "label": "Коріння",
          "result": "Сприяє зростанню коріння",
          "desc": "N-P-K Добрива"
        },
        "slotB": {
          "label": "Розчинність",
          "result": "Розчинний з кальцієм",
          "desc": "Суперфосфат"
        }
      },
      "level3": {
        "config": "Тетраедричний",
        "oxidation": "П = +5",
        "ionicRadius": "Великий",
        "hydrationEnthalpy": "Високий",
        "coordination": "Тетраедричний (109,5°)"
      },
      "level4": {
        "discoveryYear": "1840-ті роки",
        "discoveredBy": "Lawes",
        "namedBy": "від Phosphate",
        "stse": [
          "Зелена революція (добрива)",
          "Евтрофікація."
        ],
        "commonUses": [
          "Суперфосфатні добрива",
          "Порошок для випічки",
          "Буфери"
        ],
        "hazards": [
          "Подразник очей",
          "Забруднення води."
        ]
      }
    }
  },
  "ch3coo_minus": {
    "name": "Ацетат",
    "customData": {
      "level1": {
        "type": "Органічний аніон",
        "source": "Оцет (CH₃COOH) - Втрата 1 H⁺",
        "phase": "Водний (aq) – Безбарвний",
        "valence": "24 Всього",
        "keyCompounds": [
          {
            "formula": "CH₃COONa",
            "name": "Гарячий лід"
          },
          {
            "formula": "Vinegar",
            "name": ""
          }
        ]
      },
      "level2": {
        "molarMass": "59.04 г/моль",
        "subatomic": "2 С + 2 Про + 3 год | Заряд -1",
        "statusBanner": "Завжди розчинний (всепрохідний іон)",
        "slotA": {
          "label": "Оцет",
          "result": "Різкий запах (кислота)",
          "desc": "CH₃COOH"
        },
        "slotB": {
          "label": "Гарячий лід",
          "result": "Екзотермічна кристалізація",
          "desc": "Ацетат натрію"
        }
      },
      "level3": {
        "config": "Тригонально-площинний (карбоксильний)",
        "oxidation": "C = +3 (карбоксил)",
        "ionicRadius": "162 pm",
        "hydrationEnthalpy": "-400 kJ/mol",
        "coordination": "Тетраедричний (Метил) + Планарний (Карбоксил)"
      },
      "level4": {
        "discoveryYear": "Стародавній",
        "discoveredBy": "Різний",
        "namedBy": "Latin Acetum (Оцет)",
        "stse": [
          "Ферментація (Біотехнологія)",
          "Біорозкладні пластмаси."
        ],
        "commonUses": [
          "Оцет (Харчовий)",
          "Грілки для рук (гарячий лід)",
          "Текстиль."
        ],
        "hazards": [
          "Концентрована кислота викликає корозію."
        ]
      }
    }
  },
  "cn_minus": {
    "name": "Ціанід",
    "customData": {
      "level1": {
        "type": "Токсичний псевдогалоген",
        "source": "Синільна кислота (HCN) – втрата 1 H⁺",
        "phase": "Водний (aq) – Безбарвний",
        "valence": "10 (ізоелектронний з N₂)",
        "keyCompounds": [
          {
            "formula": "NaCN",
            "name": "Видобуток золота"
          },
          {
            "formula": "KCN",
            "name": "Отрута"
          }
        ]
      },
      "level2": {
        "molarMass": "26.02 г/моль",
        "subatomic": "1 З + 1 Н | Заряд -1",
        "statusBanner": "Екстремальний токсин",
        "slotA": {
          "label": "Токсичність",
          "result": "Зупиняє клітинне дихання",
          "desc": "Блокує цитохром"
        },
        "slotB": {
          "label": "вилуговування",
          "result": "Розчиняє золото",
          "desc": "Au(CN)₂⁻ Комплекс"
        }
      },
      "level3": {
        "config": "Лінійний",
        "oxidation": "З = +2",
        "ionicRadius": "191 pm",
        "hydrationEnthalpy": "-350 kJ/mol",
        "coordination": "Лінійний (потрійний зв'язок)"
      },
      "level4": {
        "discoveryYear": "1782",
        "discoveredBy": "Scheele",
        "namedBy": "Greek Kyanos (Dark Blue)",
        "stse": [
          "Етика гірничодобувної промисловості (розливи)",
          "Забруднення довкілля."
        ],
        "commonUses": [
          "Видобуток золота",
          "Гальваніка."
        ],
        "hazards": [
          "**Смертельно** (пригнічує дихання)."
        ]
      }
    }
  }
};