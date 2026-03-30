/* global console */
import { translations } from "../js/data/translations.js";

function flatten(obj, prefix = "", out = {}) {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return out;
  for (const [key, value] of Object.entries(obj)) {
    const nextKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      flatten(value, nextKey, out);
    } else {
      out[nextKey] = value;
    }
  }
  return out;
}

const INTENTIONAL_SHARED_KEYS = new Set([
  "settings.github",
  "assistant.name",
  "nav.ions",
  "tools.solubilityGrade",
  "worksheet.decomposition",
  "worksheet.combustion",
  "elementL2.stable",
  "ionModal.cation",
  "ionModal.anion",
  "elementModal.stable",
  "molarMass.chipGlucose",
]);

const IGNORED_PREFIXES = [
  "assistant.",
];

const englishFlat = flatten(translations.en);
const languageCodes = Object.keys(translations).filter((lang) => lang !== "en");

for (const lang of languageCodes) {
  const flat = flatten(translations[lang]);
  const suspicious = Object.keys(englishFlat).filter((key) => {
    const englishValue = englishFlat[key];
    return (
      flat[key] === englishValue &&
      typeof englishValue === "string" &&
      /[A-Za-z]{3}/.test(englishValue) &&
      !INTENTIONAL_SHARED_KEYS.has(key) &&
      !IGNORED_PREFIXES.some((prefix) => key.startsWith(prefix))
    );
  });

  console.log(`\n[${lang}] suspicious=${suspicious.length}`);
  suspicious.forEach((key) => console.log(key));
}
