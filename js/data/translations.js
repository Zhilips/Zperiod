// =============================================================================
// Translations Module — Aggregator
// =============================================================================

import { enUI } from "./locales/ui/en.js";
import { zhUI } from "./locales/ui/zh.js";
import { zhHantUI } from "./locales/ui/zh-Hant.js";
import { frUI } from "./locales/ui/fr.js";
import { ruUI } from "./locales/ui/ru.js";
import { faUI } from "./locales/ui/fa.js";
import { urUI } from "./locales/ui/ur.js";
import { tlUI } from "./locales/ui/tl.js";
import { ukUI } from "./locales/ui/uk.js";

/**
 * All UI translations organized by language code.
 * Element and Ion data are loaded dynamically via langController.js.
 */
export const translations = {
  "en": enUI,
  "zh": zhUI,
  "zh-Hant": zhHantUI,
  "fr": frUI,
  "ru": ruUI,
  "fa": faUI,
  "ur": urUI,
  "tl": tlUI,
  "uk": ukUI
};
