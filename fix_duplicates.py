
import re

script_path = "/Users/zhilips/Desktop/_Projects/Zperiod local 没有混淆/script.js"

with open(script_path, 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')
func_pattern = re.compile(r'^function\s+([a-zA-Z0-9_]+)\s*\(')

func_lines = {} # name -> [line_indices]

for i, line in enumerate(lines):
    match = func_pattern.search(line)
    if match:
        name = match.group(1)
        if name not in func_lines:
            func_lines[name] = []
        func_lines[name].append(i)

duplicates = {k: v for k, v in func_lines.items() if len(v) > 1}

print("Found duplicates:", duplicates.keys())

# Strategy: Keep the FIRST occurrence (The New Logic Block is inserted BEFORE the Backup Tail).
# The New Logic Block (from Current) is around line 6900.
# The Backup Tail (Parts 2 & 3) starts around 7964.
# So the first occurrence is the NEW (Correct) one. The second is the OLD (Backup) one.

# We need to remove the blocks of code for the second occurrences.
# A function block ends when the brace count returns to zero? Or just next function?
# Simple parser to find end of function.

def find_end_brace(start_line_idx, all_lines):
    brace_count = 0
    started = False
    for i in range(start_line_idx, len(all_lines)):
        line = all_lines[i]
        brace_count += line.count('{')
        brace_count -= line.count('}')
        if brace_count > 0:
            started = True
        if started and brace_count == 0:
            return i
    return -1

lines_to_remove = set()

for idx_list in duplicates.values():
    # Remove all but the first (index 0)
    for start_idx in idx_list[1:]:
        end_idx = find_end_brace(start_idx, lines)
        if end_idx != -1:
            for k in range(start_idx, end_idx + 1):
                lines_to_remove.add(k)
        else:
            print(f"Could not find end for function at line {start_idx}")

new_lines = [line for i, line in enumerate(lines) if i not in lines_to_remove]

with open(script_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(new_lines))

print(f"Removed {len(lines_to_remove)} lines of duplicate code.")
