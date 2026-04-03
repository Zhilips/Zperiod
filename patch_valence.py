import re

with open('js/modules/uiController.js', 'r', encoding='utf-8') as f:
    content = f.read()

# The string to insert
new_langs = """
  if (lang === "ur") {
    return String(val)
      .replace(/Variable \\(outer s \\+ d \\+ f\\)/i, "متغیر (بیرونی s + d + f)")
      .replace(/Variable \\(outer s \\+ d\\)/i, "متغیر (بیرونی s + d)")
      .replace(/Variable \\(outer s \\+ f\\)/i, "متغیر (بیرونی s + f)")
      .replace(/Variable \\(outer d only here\\)/i, "متغیر (یہاں صرف بیرونی d)")
      .replace(/Variable/i, "متغیر")
      .replace(/\\(d-subshell is full\\)/gi, "(d-سب شیل بھرا ہوا ہے)")
      .replace(/\\(s-subshell only\\)/gi, "(صرف s-سب شیل)")
      .replace(/\\(f-subshell filling\\)/gi, "(f-سب شیل بھر رہا ہے)")
      .replace(/\\(acts like 1\\)/gi, "(1 کی طرح کام کرتا ہے)")
      .replace(/subshell/gi, "سب شیل")
      .replace(/outer/gi, "بیرونی");
  }
  if (lang === "fa") {
    return String(val)
      .replace(/Variable \\(outer s \\+ d \\+ f\\)/i, "متغیر (خارجی s + d + f)")
      .replace(/Variable \\(outer s \\+ d\\)/i, "متغیر (خارجی s + d)")
      .replace(/Variable \\(outer s \\+ f\\)/i, "متغیر (خارجی s + f)")
      .replace(/Variable \\(outer d only here\\)/i, "متغیر (فقط خارجی d اینجا)")
      .replace(/Variable/i, "متغیر")
      .replace(/\\(d-subshell is full\\)/gi, "(زیرلایه d پر است)")
      .replace(/\\(s-subshell only\\)/gi, "(فقط زیرلایه s)")
      .replace(/\\(f-subshell filling\\)/gi, "(در حال پر شدن زیرلایه f)")
      .replace(/\\(acts like 1\\)/gi, "(مانند 1 عمل می کند)")
      .replace(/subshell/gi, "زیرلایه")
      .replace(/outer/gi, "خارجی");
  }
  if (lang === "fr") {
    return String(val)
      .replace(/Variable \\(outer s \\+ d \\+ f\\)/i, "Variable (s + d + f externes)")
      .replace(/Variable \\(outer s \\+ d\\)/i, "Variable (s + d externes)")
      .replace(/Variable \\(outer s \\+ f\\)/i, "Variable (s + f externes)")
      .replace(/Variable \\(outer d only here\\)/i, "Variable (seulement d externe ici)")
      .replace(/Variable/i, "Variable")
      .replace(/\\(d-subshell is full\\)/gi, "(la sous-couche d est pleine)")
      .replace(/\\(acts like 1\\)/gi, "(agit comme 1)")
      .replace(/subshell/gi, "sous-couche")
      .replace(/outer/gi, "externe");
  }
  if (lang === "tl") {
    return String(val)
      .replace(/Variable \\(outer s \\+ d \\+ f\\)/i, "Nagbabago (panlabas na s + d + f)")
      .replace(/Variable \\(outer s \\+ d\\)/i, "Nagbabago (panlabas na s + d)")
      .replace(/Variable \\(outer s \\+ f\\)/i, "Nagbabago (panlabas na s + f)")
      .replace(/Variable \\(outer d only here\\)/i, "Nagbabago (d lang panlabas dito)")
      .replace(/Variable/i, "Nagbabago")
      .replace(/\\(d-subshell is full\\)/gi, "(puno na ang d-subshell)")
      .replace(/\\(acts like 1\\)/gi, "(kumikilos bilang 1)")
      .replace(/subshell/gi, "subshell")
      .replace(/outer/gi, "panlabas");
  }
"""

if "if (lang === \"ur\") {" not in content:
    # insert before `return val;`
    content = content.replace("  return val;\n}\n\nfunction localizeNA() {", new_langs + "  return val;\n}\n\nfunction localizeNA() {")

with open('js/modules/uiController.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")