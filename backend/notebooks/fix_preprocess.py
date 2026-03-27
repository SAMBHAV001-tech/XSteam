import json

with open('02_Preprocessing.ipynb', 'r', encoding='utf-8') as f:
    nb = json.load(f)

for cell in nb['cells']:
    if cell['cell_type'] == 'code':
        source = cell['source']
        for i, line in enumerate(source):
            line = line.replace("'review'", "'review_text'")
            source[i] = line

with open('02_Preprocessing.ipynb', 'w', encoding='utf-8') as f:
    json.dump(nb, f, indent=1)
print("02_Preprocessing notebook patched.")
