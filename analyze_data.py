import json
import re

# We need to parse elementsData.js. It's a JS file exporting a dict.
with open('js/data/elementsData.js', 'r') as f:
    content = f.read()

# Extract the JSON object.
match = re.search(r'export const finallyData = ({.*});?', content, re.DOTALL)
if not match:
    print("Could not parse data.")
    exit(1)

# Clean up JS specific things if any (trailing commas, etc.)
# Actually, since it's well-formatted JS object, we might need a safer parse or just regex extraction per element.
# Let's extract using regex per property to be safe since it might not be pure JSON.

properties = {
    "firstIonization": [],
    "electronAffinity": [],
    "electronegativity": [],
    "density": [],
    "meltingPoint": [],
    "boilingPoint": [],
    "atomicRadius": [],
    "specificHeat": []
}

elements = {}

current_element = None
lines = content.split('\n')
for line in lines:
    sym_match = re.search(r'"symbol":\s*"([^"]+)"', line)
    if sym_match:
        current_element = sym_match.group(1)
        elements[current_element] = {}
        continue
    
    for prop in properties.keys():
        prop_match = re.search(fr'"{prop}":\s*([^,]+)', line)
        if prop_match and current_element:
            val_str = prop_match.group(1).strip().strip('"')
            elements[current_element][prop] = val_str

def parse_val(s, prop):
    if s == 'N/A' or s == 'null' or s == '—' or 'Sublimes' in s or 'Pressurized' in s or 'Unknown' in s:
        return None
    s = s.replace('−', '-').replace(',', '')
    s = re.sub(r'\(pred\)', '', s, flags=re.IGNORECASE)
    s = re.sub(r'g/cm³|kg/m³|g/L|kJ/mol|eV|°C|pm|J/\(g·°C\)', '', s).strip()
    match = re.search(r'-?\d+\.?\d*', s)
    if match:
        return float(match.group(0))
    return None

missing = {p: [] for p in properties.keys()}
extremes = {p: {'min': float('inf'), 'max': float('-inf'), 'min_el': [], 'max_el': []} for p in properties.keys()}

for el, props in elements.items():
    for p in properties.keys():
        val_str = props.get(p, "N/A")
        val = parse_val(val_str, p)
        if val is None:
            missing[p].append(el)
        else:
            if val < extremes[p]['min']:
                extremes[p]['min'] = val
                extremes[p]['min_el'] = [el]
            elif val == extremes[p]['min']:
                extremes[p]['min_el'].append(el)
                
            if val > extremes[p]['max']:
                extremes[p]['max'] = val
                extremes[p]['max_el'] = [el]
            elif val == extremes[p]['max']:
                extremes[p]['max_el'].append(el)

print("=== EXTREMES (MAX/MIN SUFFIXES) ===")
for p, data in extremes.items():
    print(f"{p}:")
    print(f"  MAX: {data['max']} -> {', '.join(data['max_el'])}")
    print(f"  MIN: {data['min']} -> {', '.join(data['min_el'])}")

print("\n=== MISSING OR N/A ===")
for p, els in missing.items():
    print(f"{p}: {len(els)} elements (e.g. {', '.join(els[:5])}...)")

