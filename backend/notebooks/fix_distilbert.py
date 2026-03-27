import json

with open("03_Sentiment_Model.ipynb", "r", encoding="utf-8") as f:
    nb = json.load(f)

# Remove 'transformers import pipeline' from the first cell
nb["cells"][0]["source"] = [
    line for line in nb["cells"][0]["source"]
    if "from transformers import pipeline" not in line
]

# Remove the DistilBERT cell
nb["cells"] = [
    cell for cell in nb["cells"]
    if not (cell.get("source") and any("Optional: Run DistilBERT" in line for line in cell["source"]))
]

with open("03_Sentiment_Model.ipynb", "w", encoding="utf-8") as f:
    json.dump(nb, f, indent=1)
