import re

with open("js/data/translations.js", "r", encoding="utf-8") as f:
    content = f.read()

# Fix unescaped quotes from previous patch
content = content.replace('""{formula}"', '"\\"{formula}\\"')
content = content.replace('"{suggestion}"."', '\\"{suggestion}\\"."')
content = content.replace('"{suggestion}"。"', '\\"{suggestion}\\"。"')
content = content.replace('"{suggestion}"？"', '\\"{suggestion}\\"？"')
content = content.replace('"{suggestion}"?"', '\\"{suggestion}\\"?"')

# bareCoefficient
content = content.replace('"H2O"."', '\\"H2O\\"."')
content = content.replace('"H2O"。"', '\\"H2O\\"。"')

with open("js/data/translations.js", "w", encoding="utf-8") as f:
    f.write(content)
