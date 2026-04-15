// =============================================================================
// Centralized Translations Module
// =============================================================================

import { deepMerge } from "../utils/objects.js"; // We should move deepMerge here

import { enUI } from "./locales/ui/en.js";
import { zhUI } from "./locales/ui/zh.js";
import { frUI } from "./locales/ui/fr.js";
import { zhHantUI } from "./locales/ui/zh-Hant.js";
import { ruUI } from "./locales/ui/ru.js";
import { faUI } from "./locales/ui/fa.js";
import { urUI } from "./locales/ui/ur.js";
import { tlUI } from "./locales/ui/tl.js";
import { sqUI } from "./locales/ui/sq.js";

export const translations = {
  "en": enUI,
  "zh": zhUI,
  "fr": frUI,
  "zh-Hant": zhHantUI,
  "ru": ruUI,
  "fa": faUI,
  "ur": urUI,
  "tl": tlUI,
  "sq": sqUI,
};
