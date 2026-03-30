import re

with open("js/data/translations.js", "r", encoding="utf-8") as f:
    content = f.read()

# Fix unescaped quotes from previous patch for zeroInSubscript
content = content.replace(' in "{formula}"?', ' in \\"{formula}\\"?')
content = content.replace(' "{formula}" 里', ' \\"{formula}\\" 里')
content = content.replace(' dans "{formula}" ?', ' dans \\"{formula}\\" ?')
content = content.replace(' в "{formula}"?', ' в \\"{formula}\\"?')
content = content.replace(' در "{formula}" ', ' در \\"{formula}\\" ')
content = content.replace(' میں "{formula}" ', ' میں \\"{formula}\\" ')
content = content.replace(' sa "{formula}"?', ' sa \\"{formula}\\"?')

# Wait, let's just blindly replace any remaining "{formula}" inside a string unless it's already escaped.
# Actually, the string starts with `zeroInSubscript: "`, so any ` "{formula}" ` is unescaped.
content = re.sub(r'(?<!\\)"{formula}(?<!\\)"', r'\"{formula}\"', content)


with open("js/data/translations.js", "w", encoding="utf-8") as f:
    f.write(content)
