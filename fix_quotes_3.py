import re

with open("js/data/translations.js", "r", encoding="utf-8") as f:
    content = f.read()

content = re.sub(r'(?<!\\)"{suggestion}(?<!\\)"', r'\"{suggestion}\"', content)

with open("js/data/translations.js", "w", encoding="utf-8") as f:
    f.write(content)
