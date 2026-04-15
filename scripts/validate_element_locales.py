#!/usr/bin/env python3

from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
LOCALES_DIR = ROOT / "js" / "data" / "locales"
SOURCE_PATH = ROOT / "en_source.json"

LOCALES = {
    "fr": ("fr.js", "fr_elements"),
    "ru": ("ru.js", "ru_elements"),
    "fa": ("fa.js", "fa_elements"),
    "ur": ("ur.js", "ur_elements"),
    "tl": ("tl.js", "tl_elements"),
    "sq": ("sq.js", "sq_elements"),
    "zh": ("zh.js", "zh_elements"),
    "zh-Hant": ("zhHant.js", "zh_hant_elements"),
}


def load_json_module(path: Path, export_name: str) -> dict:
    text = path.read_text(encoding="utf-8")
    prefix = f"export const {export_name} = "
    idx = text.find(prefix)
    if idx == -1:
        raise ValueError(f"Could not find export {export_name} in {path}")
    payload = text[idx + len(prefix):].rstrip().rstrip(";")
    return json.loads(payload)


def main() -> None:
    with SOURCE_PATH.open(encoding="utf-8") as handle:
        source = json.load(handle)

    for lang, (filename, export_name) in LOCALES.items():
        payload = load_json_module(LOCALES_DIR / filename, export_name)
        issues: list[str] = []

        if len(payload) != 118:
            issues.append(f"expected 118 elements, found {len(payload)}")

        for atomic_number in range(1, 119):
            key = str(atomic_number)
            if key not in payload:
                issues.append(f"missing element {key}")
                continue

            source_entry = source[key]
            locale_entry = payload[key]

            for required_key in ["name", "ions", "history", "stse", "uses", "hazards"]:
                if required_key not in locale_entry:
                    issues.append(f"{key}: missing {required_key}")

            history = locale_entry.get("history", {})
            for history_key in ["discoveryYear", "discoveredBy", "namedBy"]:
                if history_key not in history:
                    issues.append(f"{key}: missing history.{history_key}")

            for list_key in ["stse", "uses", "hazards"]:
                if len(locale_entry.get(list_key, [])) != len(source_entry[list_key]):
                    issues.append(
                        f"{key}: {list_key} length {len(locale_entry.get(list_key, []))} != {len(source_entry[list_key])}"
                    )

        if issues:
            print(f"{lang}: FAIL")
            for issue in issues[:20]:
                print(f"  - {issue}")
        else:
            print(f"{lang}: OK")


if __name__ == "__main__":
    main()
