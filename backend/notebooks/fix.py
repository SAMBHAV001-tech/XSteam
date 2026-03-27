import json

with open('01_EDA.ipynb', 'r', encoding='utf-8') as f:
    nb = json.load(f)

for cell in nb['cells']:
    if cell['cell_type'] == 'code':
        source = cell['source']
        for i, line in enumerate(source):
            line = line.replace("'recommended'", "'review_score'")
            line = line.replace("'review'", "'review_text'")
            line = line.replace("'votes_helpful'", "'review_votes'")
            line = line.replace("df['review_score'] == True", "df['review_score'] == 1")
            line = line.replace("df['review_score'] == False", "df['review_score'] == -1")
            source[i] = line

with open('01_EDA.ipynb', 'w', encoding='utf-8') as f:
    json.dump(nb, f)
print("Fixed notebook.")
