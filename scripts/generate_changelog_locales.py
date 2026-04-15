#!/usr/bin/env python3

from __future__ import annotations

import json
import signal
import subprocess
import time
from pathlib import Path

from deep_translator import GoogleTranslator
from deep_translator.exceptions import TranslationNotFound
from opencc import OpenCC
from requests.exceptions import RequestException


ROOT = Path(__file__).resolve().parents[1]
OUT_FILE = ROOT / "js" / "data" / "changelogLocales.js"
opencc = OpenCC("s2tw")

LANGS = {
    "zh": "zh-CN",
    "fr": "fr",
    "ru": "ru",
    "fa": "fa",
    "ur": "ur",
    "tl": "tl",
    "sq": "sq",
}


class TranslateTimeoutError(TimeoutError):
    pass


def _alarm_handler(signum, frame):
    raise TranslateTimeoutError("Translation request timed out.")


signal.signal(signal.SIGALRM, _alarm_handler)


def load_changelog_source() -> list[dict]:
    raw = subprocess.check_output(
        [
            "node",
            "-e",
            "import('./js/data/changelogData.js').then(({ changelogData }) => console.log(JSON.stringify(changelogData)))",
        ],
        cwd=ROOT,
        text=True,
    )
    return json.loads(raw)


def batch_translate(texts: list[str], translator: GoogleTranslator) -> dict[str, str]:
    if not texts:
        return {}

    deduped = list(dict.fromkeys(texts))
    results: dict[str, str] = {}

    for index in range(0, len(deduped), 40):
        chunk = deduped[index : index + 40]
        translated_chunk = None
        for attempt in range(3):
            try:
                signal.alarm(45)
                translated_chunk = translator.translate_batch(chunk)
                signal.alarm(0)
                break
            except (RequestException, TranslateTimeoutError, TranslationNotFound):
                signal.alarm(0)
                if attempt == 2:
                    translated_chunk = []
                    for item in chunk:
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

        for source_text, translated_text in zip(chunk, translated_chunk):
            results[source_text] = translated_text or source_text
        time.sleep(0.15)

    return results


def main() -> None:
    source = load_changelog_source()
    change_texts = [change for entry in source for change in entry["changes"]]

    payload = {}
    for lang_code, target_code in LANGS.items():
        translator = GoogleTranslator(source="en", target=target_code)
        translated_changes = batch_translate(change_texts, translator)
        payload[lang_code] = {
            entry["version"]: {
                "date": entry["date"],
                "changes": [translated_changes[change] for change in entry["changes"]],
            }
            for entry in source
        }

    payload["zh-Hant"] = {
        version: {
            "date": entry["date"],
            "changes": [opencc.convert(change) for change in entry["changes"]],
        }
        for version, entry in payload["zh"].items()
    }

    js = "// Localized changelog data for settings page\nexport const changelogLocales = " + json.dumps(
        payload,
        ensure_ascii=False,
        indent=2,
    ) + ";\n"
    OUT_FILE.write_text(js, encoding="utf-8")


if __name__ == "__main__":
    main()
