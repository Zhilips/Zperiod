#!/usr/bin/env python3

from __future__ import annotations

import argparse
import json
import re
import signal
import subprocess
import time
from pathlib import Path

from deep_translator import GoogleTranslator
from requests.exceptions import RequestException


ROOT = Path(__file__).resolve().parents[1]
EN_SOURCE_PATH = ROOT / "en_source.json"
OUT_DIR = ROOT / "js" / "data" / "locales"

LANG_CONFIG = {
    "fr": {"module": "fr.js", "export": "fr_elements", "target": "fr"},
    "ru": {"module": "ru.js", "export": "ru_elements", "target": "ru"},
    "fa": {"module": "fa.js", "export": "fa_elements", "target": "fa"},
    "ur": {"module": "ur.js", "export": "ur_elements", "target": "ur"},
    "tl": {"module": "tl.js", "export": "tl_elements", "target": "tl"},
}


class TranslateTimeoutError(TimeoutError):
    pass


def _alarm_handler(signum, frame):
    raise TranslateTimeoutError("Translation request timed out.")


signal.signal(signal.SIGALRM, _alarm_handler)

HISTORY_NAME_RE = re.compile(
    r"\b(?:[A-Z][A-Za-z.'-]*)(?:\s+(?:[A-Z][A-Za-z.'-]*|&))+"
)
NAME_LEAD_BLACKLIST = {
    "From",
    "Derived",
    "State",
    "Planet",
    "The",
    "Latin",
    "Greek",
    "German",
    "Ancient",
}
ACRONYM_RE = re.compile(r"\b[A-Z]{2,}(?:/[A-Z]{2,})*\b")
ISOTOPE_TOKEN_RE = re.compile(r"\b[A-Z][a-z]?-\d+\b")
CHARGED_ION_RE = re.compile(r"[A-Z][a-z]?(?:[0-9₀₁₂₃₄₅₆₇₈₉]+)?[⁰¹²³⁴⁵⁶⁷⁸⁹]*[⁺⁻]")
FORMULA_RE = re.compile(r"\b(?:[A-Z][a-z]?(?:[0-9₀₁₂₃₄₅₆₇₈₉]+)?){2,}\b")
YEAR_BCE_RE = re.compile(r"^~?(\d+)\s+BCE$")
YEAR_CE_RE = re.compile(r"^~?(\d+)\s+CE$")
PREHISTORIC_YEAR_RE = re.compile(r"^Prehistoric\s+\((~?\d+\s+BCE)\)$")
SIMPLE_ION_NAME_RE = re.compile(r"^([^()]+)\(([^()]+)\)$")

NAME_ORIGIN_MARKERS = (
    "from ",
    "derived",
    "greek",
    "latin",
    "planet",
    "state",
    "district",
    "poland",
    "france",
    "radium",
    "hassia",
    "nihon",
    "americas",
    "california",
    "berkeley",
    "dubna",
    "germany",
    "japan",
    "russia",
    "moscow",
    "tennessee",
    "thor",
    "pluto",
    "neptune",
    "uranus",
    "aktis",
    "protos",
    "first",
    "thunder",
    "ray",
    "green twig",
    "unstable",
    "light-bearing",
    "mass",
    "plumbum",
    "hydrargyrum",
    "borax",
    "magnesia",
)

DISCOVERY_YEAR_TERMS = {
    "fr": {
        "prehistory": "Préhistoire",
        "bce": "av. J.-C.",
        "ce": "apr. J.-C.",
    },
    "ru": {
        "prehistory": "Доисторический период",
        "bce": "до н. э.",
        "ce": "н. э.",
    },
    "fa": {
        "prehistory": "پیشاتاریخ",
        "bce": "پیش از میلاد",
        "ce": "میلادی",
    },
    "ur": {
        "prehistory": "قبل از تاریخ",
        "bce": "قبل مسیح",
        "ce": "عیسوی",
    },
    "tl": {
        "prehistory": "Panahong prehistoriko",
        "bce": "BCE",
        "ce": "CE",
    },
}

STRING_REPLACEMENTS = {
    "fr": {
        "WWI": "Première Guerre mondiale",
        "LEDs": "DEL",
        "CRTs/LEDs": "CRT/DEL",
        "TV/LEDs": "TV/DEL",
        "MRI": "IRM",
        "EV révolution": "révolution des VE",
        "Cl⁻ (Chlore)": "Cl⁻ (Chlorure)",
    },
    "ru": {
        "WWI": "Первая мировая война",
        "LEDs": "светодиоды",
        "CRTs/LEDs": "ЭЛТ/светодиоды",
        "TV/LEDs": "ТВ/светодиоды",
        "MRI": "МРТ",
    },
    "fa": {
        "WWI": "جنگ جهانی اول",
        "LEDs": "ال‌ای‌دی‌ها",
        "CRTs/LEDs": "CRT/ال‌ای‌دی‌ها",
        "TV/LEDs": "تلویزیون/ال‌ای‌دی‌ها",
        "MRI": "ام‌آر‌آی",
    },
    "ur": {
        "WWI": "پہلی عالمی جنگ",
        "LEDs": "ایل ای ڈی",
        "CRTs/LEDs": "CRT/ایل ای ڈی",
        "TV/LEDs": "ٹی وی/ایل ای ڈی",
        "MRI": "ایم آر آئی",
        "Cryogenics": "کریوجینکس",
        "corrosive": "خورندہ",
    },
    "tl": {
        "WWI": "Unang Digmaang Pandaigdig",
        "Hydrogen ion": "ion ng hydrogen",
        "Hydride": "haydrayd",
        "Nitride": "nitrido",
        "Oxide": "oksido",
        "Cloride": "klorido",
        "Fluoride": "pluorido",
        "Broide": "bromido",
        "Iodide": "iodido",
        "Sulfide": "sulfido",
        "Phosphide": "pospido",
        "Cryogenics": "Kriyohenika",
        "Hydrogenation": "Haydrogenasyon",
        "Non-renewable resource conservation": "Konserbasyon ng di-nababagong yaman",
        "Electronics": "Elektronika",
        "Fiber optics": "Optikong hibla",
        "Radiation shielding": "Panangga sa radyasyon",
        "Radioactive gas": "Radyoaktibong gas",
        "Radioactive": "Radyoaktibo",
        "Carcinogenic": "Nakakanser",
        "Asphyxiant": "Nakakasakal",
        "Pulmonary irritant": "iritant sa baga",
        "Static elimination": "pag-aalis ng static",
        "Nuclear Assassination": "asasinasyong nuklear",
        "Relativistic Effects": "mga epektong relatibistiko",
        "Water chlorination/Disinfection": "pagklorina/pagdidisimpekta ng tubig",
        "Water fluoridation": "fluoridasyon ng tubig",
        "carrier ng enerhiya": "tagapagdala ng enerhiya",
        "Superconductor": "mga superkonduktor",
        "Litvinenko poisoning": "pagkalason kay Litvinenko",
        "Static na pag-aalis": "pag-aalis ng static",
        "anti-static": "antistatic",
        "Green Technology": "Berdeng teknolohiya",
        "Hydrogen Economy": "Ekonomiyang hydrogen",
        "Heavy Ion Research": "Pananaliksik sa mabibigat na ion",
        "solid, hindi gas": "solid at hindi gas",
        "supermagnets": "mga supermagnet",
        "reactor": "reaktor",
        "satellite": "satelayt",
        "micrograms": "mga mikrogramo",
        "alpha emitter": "naglalabas ng alpha",
        "CRTs/LEDs": "CRT/mga LED",
        "TV/LEDs": "TV/mga LED",
        "LEDs": "mga LED",
    },
}


def load_element_names() -> dict[str, str]:
    command = [
        "node",
        "-e",
        (
            "import('./js/data/elementsData.js').then(({ elements }) => "
            "console.log(JSON.stringify(elements.map(({ number, name }) => [String(number), name]))));"
        ),
    ]
    raw = subprocess.check_output(command, cwd=ROOT, text=True)
    return dict(json.loads(raw))


def load_source() -> dict[str, dict]:
    with EN_SOURCE_PATH.open(encoding="utf-8") as handle:
        return json.load(handle)


def protect_tokens(text: str, protect_names: bool = False) -> tuple[str, dict[str, str]]:
    placeholders: dict[str, str] = {}

    def reserve(match: re.Match[str]) -> str:
        token = match.group(0)
        key = f"§{len(placeholders)}§"
        placeholders[key] = token
        return key

    def reserve_history_name(match: re.Match[str]) -> str:
        token = match.group(0)
        lead = token.split(" ", 1)[0]
        if lead in NAME_LEAD_BLACKLIST:
            return token
        return reserve(match)

    protected = text
    if protect_names:
        protected = HISTORY_NAME_RE.sub(reserve_history_name, protected)
    protected = ACRONYM_RE.sub(reserve, protected)
    protected = ISOTOPE_TOKEN_RE.sub(reserve, protected)
    protected = CHARGED_ION_RE.sub(reserve, protected)
    protected = FORMULA_RE.sub(reserve, protected)
    return protected, placeholders


def restore_tokens(text: str, placeholders: dict[str, str]) -> str:
    restored = text
    for key, value in placeholders.items():
        restored = restored.replace(key, value)
    return restored


def is_name_only_source(text: str) -> bool:
    lowered = text.lower()
    return not any(marker in lowered for marker in NAME_ORIGIN_MARKERS)


def localize_discovery_year(lang_code: str, source_text: str, translated_text: str) -> str:
    terms = DISCOVERY_YEAR_TERMS.get(lang_code)
    if not terms:
        return translated_text

    if source_text == "Prehistoric":
        return terms["prehistory"]

    match = PREHISTORIC_YEAR_RE.match(source_text)
    if match:
        return f'{terms["prehistory"]} ({match.group(1)})'

    match = YEAR_BCE_RE.match(source_text)
    if match:
        prefix = "~" if source_text.startswith("~") else ""
        return f'{prefix}{match.group(1)} {terms["bce"]}'

    match = YEAR_CE_RE.match(source_text)
    if match:
        prefix = "~" if source_text.startswith("~") else ""
        return f'{prefix}{match.group(1)} {terms["ce"]}'

    return translated_text


def normalize_text(lang_code: str, text: str) -> str:
    normalized = text
    for source, target in STRING_REPLACEMENTS.get(lang_code, {}).items():
        normalized = normalized.replace(source, target)
    normalized = normalized.replace(" ; ", "; ").replace(" , ", ", ")
    normalized = re.sub(r"\s{2,}", " ", normalized).strip()
    return normalized


def localize_simple_ion_label(
    source_text: str, translated_text: str, source_element_name: str, localized_name: str
) -> str:
    source_match = SIMPLE_ION_NAME_RE.match(source_text)
    translated_match = SIMPLE_ION_NAME_RE.match(translated_text)
    if not source_match or not translated_match:
        return translated_text
    source_label = source_match.group(2).strip()
    translated_prefix = translated_match.group(1).strip()
    if source_label == source_element_name:
        return f"{translated_prefix} ({localized_name})"
    return translated_text


def postprocess_value(lang_code: str, field: str, source_text: str, translated_text: str) -> str:
    value = translated_text

    if field == "history.discoveredBy":
        value = source_text
    elif field == "history.namedBy" and is_name_only_source(source_text):
        value = source_text
    elif field == "history.discoveryYear":
        value = localize_discovery_year(lang_code, source_text, translated_text)

    value = normalize_text(lang_code, value)
    return value


def batch_translate(
    texts: list[str], translator: GoogleTranslator, protect_names: bool = False
) -> dict[str, str]:
    results: dict[str, str] = {}
    if not texts:
        return results

    protected_map: dict[str, tuple[str, dict[str, str]]] = {}
    deduped: list[str] = []
    for text in texts:
        if text in protected_map:
            continue
        protected_map[text] = protect_tokens(text, protect_names=protect_names)
        deduped.append(text)

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
            except (RequestException, TranslateTimeoutError):
                signal.alarm(0)
                if attempt == 2:
                    translated_chunk = []
                    for item in protected_chunk:
                        signal.alarm(20)
                        translated_chunk.append(translator.translate(item))
                        signal.alarm(0)
                    break
                time.sleep(1.0 * (attempt + 1))
        if len(translated_chunk) != len(chunk):
            raise RuntimeError("Batch translation returned an unexpected size.")
        for source_text, translated_text in zip(chunk, translated_chunk):
            _, placeholders = protected_map[source_text]
            results[source_text] = restore_tokens(translated_text, placeholders)
        time.sleep(0.15)

    return results


def generate_locale(lang_code: str, target_code: str, element_names: dict[str, str], source: dict[str, dict]) -> dict[str, dict]:
    translator = GoogleTranslator(source="en", target=target_code)

    name_texts = [element_names[str(number)] for number in range(1, 119)]
    ions_texts = [source[str(number)]["ions"] for number in range(1, 119)]
    discovery_year_texts = [source[str(number)]["history"]["discoveryYear"] for number in range(1, 119)]
    discovered_by_texts = [source[str(number)]["history"]["discoveredBy"] for number in range(1, 119)]
    named_by_texts = [source[str(number)]["history"]["namedBy"] for number in range(1, 119)]
    stse_texts = [item for number in range(1, 119) for item in source[str(number)]["stse"]]
    uses_texts = [item for number in range(1, 119) for item in source[str(number)]["uses"]]
    hazards_texts = [item for number in range(1, 119) for item in source[str(number)]["hazards"]]

    print(f"[{lang_code}] names", flush=True)
    translated_names = batch_translate(name_texts, translator)
    print(f"[{lang_code}] ions", flush=True)
    translated_ions = batch_translate(ions_texts, translator)
    print(f"[{lang_code}] discovery years", flush=True)
    translated_years = batch_translate(discovery_year_texts, translator)
    print(f"[{lang_code}] discovered by", flush=True)
    translated_discovered = batch_translate(discovered_by_texts, translator, protect_names=True)
    print(f"[{lang_code}] named by", flush=True)
    translated_named = batch_translate(named_by_texts, translator, protect_names=True)
    print(f"[{lang_code}] stse", flush=True)
    translated_stse = batch_translate(stse_texts, translator)
    print(f"[{lang_code}] uses", flush=True)
    translated_uses = batch_translate(uses_texts, translator)
    print(f"[{lang_code}] hazards", flush=True)
    translated_hazards = batch_translate(hazards_texts, translator)

    locale: dict[str, dict] = {}
    for number in range(1, 119):
        key = str(number)
        entry = source[key]
        localized_name = postprocess_value(
            lang_code,
            "name",
            element_names[key],
            translated_names[element_names[key]],
        )
        localized_ions = postprocess_value(
            lang_code,
            "ions",
            entry["ions"],
            translated_ions[entry["ions"]],
        )
        localized_ions = localize_simple_ion_label(
            entry["ions"], localized_ions, element_names[key], localized_name
        )
        locale[key] = {
            "name": localized_name,
            "ions": localized_ions,
            "history": {
                "discoveryYear": postprocess_value(
                    lang_code,
                    "history.discoveryYear",
                    entry["history"]["discoveryYear"],
                    translated_years[entry["history"]["discoveryYear"]],
                ),
                "discoveredBy": postprocess_value(
                    lang_code,
                    "history.discoveredBy",
                    entry["history"]["discoveredBy"],
                    translated_discovered[entry["history"]["discoveredBy"]],
                ),
                "namedBy": postprocess_value(
                    lang_code,
                    "history.namedBy",
                    entry["history"]["namedBy"],
                    translated_named[entry["history"]["namedBy"]],
                ),
            },
            "stse": [
                postprocess_value(lang_code, "stse", item, translated_stse[item])
                for item in entry["stse"]
            ],
            "uses": [
                postprocess_value(lang_code, "uses", item, translated_uses[item])
                for item in entry["uses"]
            ],
            "hazards": [
                postprocess_value(lang_code, "hazards", item, translated_hazards[item])
                for item in entry["hazards"]
            ],
        }
    return locale


def write_locale(module_path: Path, export_name: str, payload: dict[str, dict]) -> None:
    js = f"export const {export_name} = " + json.dumps(
        payload, ensure_ascii=False, indent=2
    ) + ";\n"
    module_path.write_text(js, encoding="utf-8")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--langs",
        nargs="+",
        choices=sorted(LANG_CONFIG.keys()),
        default=sorted(LANG_CONFIG.keys()),
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    source = load_source()
    element_names = load_element_names()
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    for lang_code in args.langs:
        config = LANG_CONFIG[lang_code]
        print(f"Generating locale for {lang_code}...", flush=True)
        payload = generate_locale(lang_code, config["target"], element_names, source)
        write_locale(OUT_DIR / config["module"], config["export"], payload)
        print(f"Wrote {config['module']}", flush=True)


if __name__ == "__main__":
    main()
