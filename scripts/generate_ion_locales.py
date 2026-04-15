#!/usr/bin/env python3

from __future__ import annotations

import argparse
import json
import re
import signal
import subprocess
import time
from pathlib import Path
from typing import Any

from deep_translator import GoogleTranslator
from deep_translator.exceptions import TranslationNotFound
from opencc import OpenCC
from requests.exceptions import RequestException


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "js" / "data" / "locales" / "ions"

LANG_CONFIG = {
    "zh": {"module": "zh.js", "export": "zh_ions", "target": "zh-CN"},
    "fr": {"module": "fr.js", "export": "fr_ions", "target": "fr"},
    "ru": {"module": "ru.js", "export": "ru_ions", "target": "ru"},
    "fa": {"module": "fa.js", "export": "fa_ions", "target": "fa"},
    "ur": {"module": "ur.js", "export": "ur_ions", "target": "ur"},
    "tl": {"module": "tl.js", "export": "tl_ions", "target": "tl"},
    "sq": {"module": "sq.js", "export": "sq_ions", "target": "sq"},
}

ZH_NAME_OVERRIDES = {
    "h_plus": "氢",
    "li_plus": "锂",
    "na_plus": "钠",
    "k_plus": "钾",
    "ag_plus": "银",
    "mg_2plus": "镁",
    "ca_2plus": "钙",
    "ba_2plus": "钡",
    "zn_2plus": "锌",
    "al_3plus": "铝",
    "f_minus": "氟离子",
    "cl_minus": "氯离子",
    "br_minus": "溴离子",
    "i_minus": "碘离子",
    "o_2minus": "氧离子",
    "s_2minus": "硫离子",
    "n_3minus": "氮离子",
    "p_3minus": "磷离子",
    "co3_2minus": "碳酸根",
    "c2o4_2minus": "草酸根",
    "no3_minus": "硝酸根",
    "no2_minus": "亚硝酸根",
    "so4_2minus": "硫酸根",
    "so3_2minus": "亚硫酸根",
    "po4_3minus": "磷酸根",
    "clo3_minus": "氯酸根",
    "clo_minus": "次氯酸根",
    "clo4_minus": "高氯酸根",
    "cu_plus": "铜(I)",
    "cu_2plus": "铜(II)",
    "fe_2plus": "铁(II)",
    "fe_3plus": "铁(III)",
    "pb_2plus": "铅(II)",
    "mno4_minus": "高锰酸根",
    "cro4_2minus": "铬酸根",
    "cr2o7_2minus": "重铬酸根",
    "nh4_plus": "铵",
    "oh_minus": "氢氧根",
    "hco3_minus": "碳酸氢根",
    "hso4_minus": "硫酸氢根",
    "h2po4_minus": "磷酸二氢根",
    "ch3coo_minus": "乙酸根",
    "cn_minus": "氰根",
}

PLACEHOLDER_PATTERNS = [
    re.compile(r"\[[A-Z][a-z]?\]"),
    re.compile(r"[A-Z][a-z]?(?:[0-9₀₁₂₃₄₅₆₇₈₉]+)?(?:[A-Z][a-z]?(?:[0-9₀₁₂₃₄₅₆₇₈₉]+)?)+"),
    re.compile(r"[A-Z][a-z]?[0-9₀₁₂₃₄₅₆₇₈₉]*[⁰¹²³⁴⁵⁶⁷⁸⁹]*[⁺⁻]"),
    re.compile(r"\b\d+\s*[pe][⁺⁻+-]\b"),
    re.compile(r"\b(?:aq|s|l|g)\b"),
    re.compile(r"\b(?:STP|MRI|EV|N-P-K|pH|Li-ion|CO₂)\b"),
    re.compile(r"\b(?:kJ/mol|g/mol|pm|fm|nm|mol|°C|°F|K)\b"),
]

DISCOVERED_NAME_RE = re.compile(r"\b(?:[A-Z][A-Za-z.'-]*)(?:\s+(?:[A-Z][A-Za-z.'-]*|&))+")
OXIDATION_NAME_RE = re.compile(r"^(?P<base>.+)\((?P<ox>[IVX]+)\)$")
YEAR_ONLY_RE = re.compile(r"^~?\d{3,4}$")

SLOT_LABEL_CANONICAL = {
    "LITMUS TEST": "Litmus test",
    "REACTIVITY": "Reactivity",
    "FLAME TEST": "Flame test",
    "BATTERY FLOW": "Battery flow",
    "SOLUBILITY": "Solubility",
    "GROWTH": "Growth",
    "PRECIPITATE": "Precipitate",
    "PHOTOSENSITIVE": "Photosensitive",
    "ACID TEST": "Acid test",
    "SANITATION": "Sanitation",
    "ROOTS": "Roots",
    "COLOR": "Color",
    "SLIPPERY": "Slippery",
}

SQ_REPLACEMENTS = [
    (r"\bGreek\b", "Greqisht"),
    (r"\bw/\s*", "me "),
    (r"\bPrecipitate\b", "precipitat"),
    (r"\bKation / Acid\b", "Kation / acid"),
    (r"\bAcid/Bazë\b", "acid/bazë"),
    (r"\bFrom Sulfuric Acid\b", "Nga acidi sulfurik"),
    (r"\bBëhet e Kuqe\b", "Bëhet e kuqe"),
    (r"\bDark Blue\b", "Blu e errët"),
]

opencc = OpenCC("s2tw")


class TranslateTimeoutError(TimeoutError):
    pass


def _alarm_handler(signum, frame):
    raise TranslateTimeoutError("Translation request timed out.")


signal.signal(signal.SIGALRM, _alarm_handler)


def load_ion_source() -> dict[str, dict]:
    command = [
        "node",
        "-e",
        """
import('./js/data/ionsData.js').then(({ ionsData }) => {
  const splitList = (value) => value
    .split(';')
    .map((item) => item.trim())
    .filter(Boolean);

  const parseKeyCompounds = (value) => value
    .split(', ')
    .map((item) => {
      const match = item.match(/^(.+) \\((.+)\\)$/);
      if (match) {
        return { formula: match[1], name: match[2] };
      }
      return { formula: item, name: '' };
    });

  const payload = Object.fromEntries(
    ionsData.map((ion) => [
      ion.id,
      {
        id: ion.id,
        symbol: ion.symbol,
        charge: ion.charge,
        name: ion.name,
        type: ion.type,
        category: ion.category,
        customData: {
          level1: {
            ...ion.customData.level1,
            keyCompounds: parseKeyCompounds(ion.customData.level1.keyCompounds),
          },
          level2: ion.customData.level2,
          level3: ion.customData.level3,
          level4: {
            ...ion.customData.level4,
            stse: splitList(ion.customData.level4.stse),
            commonUses: splitList(ion.customData.level4.commonUses),
            hazards: splitList(ion.customData.level4.hazards),
          },
        },
      },
    ]),
  );
  console.log(JSON.stringify(payload));
});
        """,
    ]
    raw = subprocess.check_output(command, cwd=ROOT, text=True)
    return json.loads(raw)


def load_element_rows() -> list[dict[str, Any]]:
    command = [
        "node",
        "-e",
        """
import('./js/data/elementsData.js').then(({ elements }) => {
  console.log(JSON.stringify(
    elements
      .filter(({ number }) => Number.isInteger(number))
      .map(({ number, symbol, name }) => ({ number, symbol, name }))
  ));
});
        """,
    ]
    raw = subprocess.check_output(command, cwd=ROOT, text=True)
    return json.loads(raw)


def load_json_module(path: Path, export_name: str) -> dict:
    text = path.read_text(encoding="utf-8")
    prefix = f"export const {export_name} = "
    idx = text.find(prefix)
    if idx == -1:
        raise ValueError(f"Could not find export {export_name} in {path}")
    payload = text[idx + len(prefix):].rstrip().rstrip(";")
    return json.loads(payload)


def load_element_names_by_symbol(lang_code: str, rows: list[dict[str, str]]) -> dict[str, str]:
    if lang_code == "en":
        return {row["symbol"]: row["name"] for row in rows}

    locale_map = {
        "zh": ("js/data/locales/zh.js", "zh_elements"),
        "zh-Hant": ("js/data/locales/zhHant.js", "zh_hant_elements"),
        "fr": ("js/data/locales/fr.js", "fr_elements"),
        "ru": ("js/data/locales/ru.js", "ru_elements"),
        "fa": ("js/data/locales/fa.js", "fa_elements"),
        "ur": ("js/data/locales/ur.js", "ur_elements"),
        "tl": ("js/data/locales/tl.js", "tl_elements"),
        "sq": ("js/data/locales/sq.js", "sq_elements"),
    }
    filename, export_name = locale_map[lang_code]
    payload = load_json_module(ROOT / filename, export_name)
    result = {}
    for row in rows:
        localized = payload[str(row["number"])]["name"]
        result[row["symbol"]] = localized
    return result


def protect_tokens(text: str, *, protect_names: bool = False) -> tuple[str, dict[str, str]]:
    placeholders: dict[str, str] = {}

    def reserve(token: str) -> str:
        key = f"§{len(placeholders)}§"
        placeholders[key] = token
        return key

    protected = text
    if protect_names:
        for match in sorted(DISCOVERED_NAME_RE.finditer(protected), key=lambda m: m.start(), reverse=True):
            token = match.group(0)
            protected = protected[: match.start()] + reserve(token) + protected[match.end() :]

    for pattern in PLACEHOLDER_PATTERNS:
        for match in sorted(pattern.finditer(protected), key=lambda m: m.start(), reverse=True):
            token = match.group(0)
            protected = protected[: match.start()] + reserve(token) + protected[match.end() :]

    return protected, placeholders


def restore_tokens(text: str, placeholders: dict[str, str]) -> str:
    restored = text
    for key, value in placeholders.items():
        restored = restored.replace(key, value)
    return restored


def batch_translate(texts: list[str], translator: GoogleTranslator, *, protect_names: bool = False) -> dict[str, str]:
    if not texts:
        return {}

    deduped: list[str] = []
    protected_map: dict[str, tuple[str, dict[str, str]]] = {}
    for text in texts:
        if text in protected_map:
            continue
        protected_map[text] = protect_tokens(text, protect_names=protect_names)
        deduped.append(text)

    results: dict[str, str] = {}
    chunk_size = 40
    for index in range(0, len(deduped), chunk_size):
        chunk = deduped[index : index + chunk_size]
        protected_chunk = [protected_map[text][0] for text in chunk]
        translated_chunk = None
        for attempt in range(3):
            try:
                signal.alarm(45)
                translated_chunk = translator.translate_batch(protected_chunk)
                signal.alarm(0)
                break
            except (RequestException, TranslateTimeoutError, TranslationNotFound):
                signal.alarm(0)
                if attempt == 2:
                    translated_chunk = []
                    for item in protected_chunk:
                        try:
                            signal.alarm(20)
                            translated_value = translator.translate(item)
                            signal.alarm(0)
                        except (RequestException, TranslateTimeoutError, TranslationNotFound):
                            signal.alarm(0)
                            translated_value = item
                        translated_chunk.append(translated_value)
                    break
                time.sleep(1.0 * (attempt + 1))
        if len(translated_chunk) != len(chunk):
            raise RuntimeError("Batch translation returned an unexpected size.")
        for source_text, translated_text in zip(chunk, translated_chunk):
            _, placeholders = protected_map[source_text]
            results[source_text] = restore_tokens(translated_text, placeholders)
        time.sleep(0.15)
    return results


def normalize_text(lang_code: str, text: str) -> str:
    if text is None:
        return ""
    normalized = text.replace(" ; ", "; ").replace(" , ", ", ")
    normalized = normalized.replace("（ ", "（").replace(" ）", "）")
    normalized = re.sub(r"\s{2,}", " ", normalized).strip()
    if lang_code in {"zh", "zh-Hant"}:
        normalized = normalized.replace(" / ", "/")
        normalized = normalized.replace("；", "; ")
    if lang_code == "sq":
        for pattern, replacement in SQ_REPLACEMENTS:
            normalized = re.sub(pattern, replacement, normalized)
    return normalized


def normalize_slot_label_source(text: str) -> str:
    return SLOT_LABEL_CANONICAL.get(text, text.title())


def localize_discovery_year(source_text: str, translated_text: str) -> str:
    if YEAR_ONLY_RE.match(source_text):
        return source_text
    return translated_text


def localize_discovered_by(source_text: str, translated_text: str) -> str:
    if source_text in {"Unknown", "Various", "-"}:
        return translated_text
    return source_text


def format_oxidation_name(localized_element_name: str, source_name: str) -> str:
    match = OXIDATION_NAME_RE.match(source_name)
    if not match:
        return localized_element_name
    return f"{localized_element_name}({match.group('ox')})"


def localize_ion_name(
    lang_code: str,
    ion: dict,
    translated_name: str,
    localized_element_names: dict[str, str],
) -> str:
    if lang_code == "zh":
        return ZH_NAME_OVERRIDES.get(ion["id"], translated_name)

    if ion["category"] == "Monatomic" and ion["type"] == "Cation":
        localized_element_name = localized_element_names.get(ion["symbol"])
        if localized_element_name:
            return normalize_text(
                lang_code,
                format_oxidation_name(localized_element_name, ion["name"]),
            )

    return normalize_text(lang_code, translated_name)


def build_locale(
    lang_code: str,
    target_code: str,
    source: dict[str, dict],
    localized_element_names: dict[str, str],
) -> dict[str, dict]:
    translator = GoogleTranslator(source="en", target=target_code)

    name_texts = [entry["name"] for entry in source.values()]
    level1_type_texts = [entry["customData"]["level1"]["type"] for entry in source.values()]
    level1_source_texts = [entry["customData"]["level1"]["source"] for entry in source.values()]
    level1_phase_texts = [entry["customData"]["level1"]["phase"] for entry in source.values()]
    level1_valence_texts = [entry["customData"]["level1"]["valence"] for entry in source.values()]
    compound_name_texts = [
        item["name"]
        for entry in source.values()
        for item in entry["customData"]["level1"]["keyCompounds"]
        if item["name"]
    ]
    level2_status_texts = [entry["customData"]["level2"]["statusBanner"] for entry in source.values()]
    level2_subatomic_texts = [entry["customData"]["level2"]["subatomic"] for entry in source.values()]
    slot_label_texts = [
        normalize_slot_label_source(entry["customData"]["level2"]["slotA"]["label"])
        for entry in source.values()
    ] + [
        normalize_slot_label_source(entry["customData"]["level2"]["slotB"]["label"])
        for entry in source.values()
    ]
    slot_result_texts = [
        entry["customData"]["level2"]["slotA"]["result"]
        for entry in source.values()
    ] + [
        entry["customData"]["level2"]["slotB"]["result"]
        for entry in source.values()
    ]
    slot_desc_texts = [
        entry["customData"]["level2"]["slotA"]["desc"]
        for entry in source.values()
    ] + [
        entry["customData"]["level2"]["slotB"]["desc"]
        for entry in source.values()
    ]
    level3_config_texts = [entry["customData"]["level3"]["config"] for entry in source.values()]
    level3_oxidation_texts = [entry["customData"]["level3"]["oxidation"] for entry in source.values()]
    level3_radius_texts = [entry["customData"]["level3"]["ionicRadius"] for entry in source.values()]
    level3_hydration_texts = [entry["customData"]["level3"]["hydrationEnthalpy"] for entry in source.values()]
    level3_coordination_texts = [entry["customData"]["level3"]["coordination"] for entry in source.values()]
    level4_discovery_year_texts = [entry["customData"]["level4"]["discoveryYear"] for entry in source.values()]
    level4_discovered_by_texts = [entry["customData"]["level4"]["discoveredBy"] for entry in source.values()]
    level4_named_by_texts = [entry["customData"]["level4"]["namedBy"] for entry in source.values()]
    stse_texts = [item for entry in source.values() for item in entry["customData"]["level4"]["stse"]]
    common_uses_texts = [item for entry in source.values() for item in entry["customData"]["level4"]["commonUses"]]
    hazards_texts = [item for entry in source.values() for item in entry["customData"]["level4"]["hazards"]]

    print(f"[{lang_code}] names", flush=True)
    translated_names = batch_translate(name_texts, translator)
    print(f"[{lang_code}] level1", flush=True)
    translated_level1_type = batch_translate(level1_type_texts, translator)
    translated_level1_source = batch_translate(level1_source_texts, translator)
    translated_level1_phase = batch_translate(level1_phase_texts, translator)
    translated_level1_valence = batch_translate(level1_valence_texts, translator)
    translated_compound_names = batch_translate(compound_name_texts, translator)
    print(f"[{lang_code}] level2", flush=True)
    translated_level2_status = batch_translate(level2_status_texts, translator)
    translated_level2_subatomic = batch_translate(level2_subatomic_texts, translator)
    translated_slot_labels = batch_translate(slot_label_texts, translator)
    translated_slot_results = batch_translate(slot_result_texts, translator)
    translated_slot_descs = batch_translate(slot_desc_texts, translator)
    print(f"[{lang_code}] level3", flush=True)
    translated_level3_config = batch_translate(level3_config_texts, translator)
    translated_level3_oxidation = batch_translate(level3_oxidation_texts, translator)
    translated_level3_radius = batch_translate(level3_radius_texts, translator)
    translated_level3_hydration = batch_translate(level3_hydration_texts, translator)
    translated_level3_coordination = batch_translate(level3_coordination_texts, translator)
    print(f"[{lang_code}] level4", flush=True)
    translated_level4_discovery_year = batch_translate(level4_discovery_year_texts, translator)
    translated_level4_discovered_by = batch_translate(
        level4_discovered_by_texts, translator, protect_names=True
    )
    translated_level4_named_by = batch_translate(level4_named_by_texts, translator, protect_names=True)
    translated_stse = batch_translate(stse_texts, translator)
    translated_common_uses = batch_translate(common_uses_texts, translator)
    translated_hazards = batch_translate(hazards_texts, translator)

    locale: dict[str, dict] = {}
    for ion_id, entry in source.items():
        custom = entry["customData"]
        translated_name = localize_ion_name(
            lang_code,
            entry,
            translated_names[entry["name"]],
            localized_element_names,
        )
        locale[ion_id] = {
            "name": translated_name,
            "customData": {
                "level1": {
                    "type": normalize_text(lang_code, translated_level1_type[custom["level1"]["type"]]),
                    "source": normalize_text(lang_code, translated_level1_source[custom["level1"]["source"]]),
                    "phase": normalize_text(lang_code, translated_level1_phase[custom["level1"]["phase"]]),
                    "valence": normalize_text(lang_code, translated_level1_valence[custom["level1"]["valence"]]),
                    "keyCompounds": [
                        {
                            "formula": item["formula"],
                            "name": normalize_text(
                                lang_code,
                                translated_compound_names[item["name"]],
                            ) if item["name"] else "",
                        }
                        for item in custom["level1"]["keyCompounds"]
                    ],
                },
                "level2": {
                    "molarMass": custom["level2"]["molarMass"],
                    "subatomic": normalize_text(
                        lang_code,
                        translated_level2_subatomic[custom["level2"]["subatomic"]],
                    ),
                    "statusBanner": normalize_text(
                        lang_code,
                        translated_level2_status[custom["level2"]["statusBanner"]],
                    ),
                    "slotA": {
                        "label": normalize_text(
                            lang_code,
                            translated_slot_labels[
                                normalize_slot_label_source(custom["level2"]["slotA"]["label"])
                            ],
                        ),
                        "result": normalize_text(
                            lang_code,
                            translated_slot_results[custom["level2"]["slotA"]["result"]],
                        ),
                        "desc": normalize_text(
                            lang_code,
                            translated_slot_descs[custom["level2"]["slotA"]["desc"]],
                        ),
                    },
                    "slotB": {
                        "label": normalize_text(
                            lang_code,
                            translated_slot_labels[
                                normalize_slot_label_source(custom["level2"]["slotB"]["label"])
                            ],
                        ),
                        "result": normalize_text(
                            lang_code,
                            translated_slot_results[custom["level2"]["slotB"]["result"]],
                        ),
                        "desc": normalize_text(
                            lang_code,
                            translated_slot_descs[custom["level2"]["slotB"]["desc"]],
                        ),
                    },
                },
                "level3": {
                    "config": normalize_text(
                        lang_code,
                        translated_level3_config[custom["level3"]["config"]],
                    ),
                    "oxidation": normalize_text(
                        lang_code,
                        translated_level3_oxidation[custom["level3"]["oxidation"]],
                    ),
                    "ionicRadius": normalize_text(
                        lang_code,
                        translated_level3_radius[custom["level3"]["ionicRadius"]],
                    ),
                    "hydrationEnthalpy": normalize_text(
                        lang_code,
                        translated_level3_hydration[custom["level3"]["hydrationEnthalpy"]],
                    ),
                    "coordination": normalize_text(
                        lang_code,
                        translated_level3_coordination[custom["level3"]["coordination"]],
                    ),
                },
                "level4": {
                    "discoveryYear": normalize_text(
                        lang_code,
                        localize_discovery_year(
                            custom["level4"]["discoveryYear"],
                            translated_level4_discovery_year[custom["level4"]["discoveryYear"]],
                        ),
                    ),
                    "discoveredBy": normalize_text(
                        lang_code,
                        localize_discovered_by(
                            custom["level4"]["discoveredBy"],
                            translated_level4_discovered_by[custom["level4"]["discoveredBy"]],
                        ),
                    ),
                    "namedBy": normalize_text(
                        lang_code,
                        translated_level4_named_by[custom["level4"]["namedBy"]],
                    ),
                    "stse": [
                        normalize_text(lang_code, translated_stse[item])
                        for item in custom["level4"]["stse"]
                    ],
                    "commonUses": [
                        normalize_text(lang_code, translated_common_uses[item])
                        for item in custom["level4"]["commonUses"]
                    ],
                    "hazards": [
                        normalize_text(lang_code, translated_hazards[item])
                        for item in custom["level4"]["hazards"]
                    ],
                },
            },
        }
    return locale


def convert_to_traditional(payload):
    if isinstance(payload, dict):
        return {key: convert_to_traditional(value) for key, value in payload.items()}
    if isinstance(payload, list):
        return [convert_to_traditional(item) for item in payload]
    if isinstance(payload, str):
        return opencc.convert(payload)
    return payload


def write_locale(module_path: Path, export_name: str, payload: dict[str, dict], comment: str) -> None:
    js = f"// {comment}\nexport const {export_name} = " + json.dumps(
        payload,
        ensure_ascii=False,
        indent=2,
    ) + ";\n"
    module_path.write_text(js, encoding="utf-8")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--langs",
        nargs="+",
        choices=sorted(list(LANG_CONFIG.keys()) + ["zh-Hant"]),
        default=["zh", "zh-Hant", "fr", "ru", "fa", "ur", "tl", "sq"],
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    source = load_ion_source()
    rows = load_element_rows()
    generated = {}

    for lang_code in args.langs:
        if lang_code == "zh-Hant":
            continue
        config = LANG_CONFIG[lang_code]
        print(f"Generating ion locale for {lang_code}...", flush=True)
        localized_element_names = load_element_names_by_symbol(
            "zh" if lang_code == "zh" else lang_code,
            rows,
        )
        payload = build_locale(
            lang_code,
            config["target"],
            source,
            localized_element_names,
        )
        generated[lang_code] = payload
        write_locale(
            OUT_DIR / config["module"],
            config["export"],
            payload,
            f"{lang_code} ion locale data (generated from ionsData.js)",
        )
        print(f"Wrote {config['module']}", flush=True)

    if "zh-Hant" in args.langs:
        if "zh" not in generated:
            generated["zh"] = load_json_module(OUT_DIR / "zh.js", "zh_ions")
        payload = convert_to_traditional(generated["zh"])
        write_locale(
            OUT_DIR / "zhHant.js",
            "zh_hant_ions",
            payload,
            "Traditional Chinese ion locale data (generated from zh.js with OpenCC s2tw)",
        )
        print("Wrote zhHant.js", flush=True)


if __name__ == "__main__":
    main()
