import json

with open('01_EDA.ipynb', 'r', encoding='utf-8') as f:
    nb = json.load(f)

for cell in nb['cells']:
    if cell['cell_type'] == 'code':
        source = cell['source']
        for i, line in enumerate(source):
            if "df = pd.read_csv(data_path)" in line:
                if not any("df.sample" in s for s in source):
                    source.insert(i+1, "\nif len(df) > 100000:\n    df = df.sample(n=100000, random_state=42)\n    print('Sampled down to 100000 rows')\n")
                break

with open('01_EDA.ipynb', 'w', encoding='utf-8') as f:
    json.dump(nb, f)
print("Notebook patched with sampling.")
