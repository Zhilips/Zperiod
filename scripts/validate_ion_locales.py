#!/usr/bin/env python3

from __future__ import annotations

import json
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
LOCALES_DIR = ROOT / "js" / "data" / "locales" / "ions"

LOCALES = {
    "zh": ("zh.js", "zh_ions"),
    "zh-Hant": ("zhHant.js", "zh_hant_ions"),
    "fr": ("fr.js", "fr_ions"),
    "ru": ("ru.js", "ru_ions"),
    "fa": ("fa.js", "fa_ions"),
    "ur": ("ur.js", "ur_ions"),
    "tl": ("tl.js", "tl_ions"),
}


def load_json_module(path: Path, export_name: str) -> dict:
    text = path.read_text(encoding="utf-8")
    prefix = f"export const {export_name} = "
    idx = text.find(prefix)
    if idx == -1:
        raise ValueError(f"Could not find export {export_name} in {path}")
    payload = text[idx + len(prefix):].rstrip().rstrip(";")
    return json.loads(payload)


def load_source() -> dict[str, dict]:
    command = [
        "node",
        "-e",
        """
import('./js/data/ionsData.js').then(({ ionsData }) => {
  console.log(JSON.stringify(Object.fromEntries(ionsData.map((ion) => [ion.id, ion]))));
});
        """,
    ]
    raw = subprocess.check_output(command, cwd=ROOT, text=True)
    return json.loads(raw)


def main() -> None:
    source = load_source()

    for lang, (filename, export_name) in LOCALES.items():
        path = LOCALES_DIR / filename
        if not path.exists():
            print(f"{lang}: FAIL")
            print(f"  - missing locale file {filename}")
            continue

        payload = load_json_module(path, export_name)
        issues: list[str] = []

        if len(payload) != len(source):
            issues.append(f"expected {len(source)} ions, found {len(payload)}")

        for ion_id, source_entry in source.items():
            locale_entry = payload.get(ion_id)
            if not locale_entry:
                issues.append(f"missing {ion_id}")
                continue

            if not locale_entry.get("name"):
                issues.append(f"{ion_id}: missing name")

            custom = locale_entry.get("customData", {})
            for level in ["level1", "level2", "level3", "level4"]:
                if level not in custom:
                    issues.append(f"{ion_id}: missing customData.{level}")

            level1 = custom.get("level1", {})
            for key in ["type", "source", "phase", "valence", "keyCompounds"]:
                if key not in level1:
                    issues.append(f"{ion_id}: missing level1.{key}")

            if len(level1.get("keyCompounds", [])) != len(source_entry["customData"]["level1"]["keyCompounds"].split(", ")):
                issues.append(f"{ion_id}: keyCompounds length mismatch")

            level2 = custom.get("level2", {})
            for key in ["molarMass", "subatomic", "statusBanner", "slotA", "slotB"]:
                if key not in level2:
                    issues.append(f"{ion_id}: missing level2.{key}")
            for slot_key in ["slotA", "slotB"]:
                slot = level2.get(slot_key, {})
                for key in ["label", "result", "desc"]:
                    if key not in slot:
                        issues.append(f"{ion_id}: missing level2.{slot_key}.{key}")

            level3 = custom.get("level3", {})
            for key in ["config", "oxidation", "ionicRadius", "hydrationEnthalpy", "coordination"]:
                if key not in level3:
                    issues.append(f"{ion_id}: missing level3.{key}")

            level4 = custom.get("level4", {})
            for key in ["discoveryYear", "discoveredBy", "namedBy", "stse", "commonUses", "hazards"]:
                if key not in level4:
                    issues.append(f"{ion_id}: missing level4.{key}")

            for list_key in ["stse", "commonUses", "hazards"]:
                if not isinstance(level4.get(list_key), list):
                    issues.append(f"{ion_id}: level4.{list_key} should be a list")

        if issues:
            print(f"{lang}: FAIL")
            for issue in issues[:20]:
                print(f"  - {issue}")
        else:
            print(f"{lang}: OK")


if __name__ == "__main__":
    main()
