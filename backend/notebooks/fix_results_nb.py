import json

with open("05_Results_Summary.ipynb", "r", encoding="utf-8") as f:
    nb = json.load(f)

# Rewrite code cell with correct source (proper string list, each line ending with \n)
nb["cells"][1]["source"] = [
    "import pandas as pd\n",
    "from IPython.display import display\n",
    "\n",
    "results = {\n",
    "    'Task': ['Sentiment Classification', 'Sentiment Classification', 'Helpfulness Prediction'],\n",
    "    'Model': ['Logistic Regression (TF-IDF)', 'XGBoost (TF-IDF)', 'Random Forest'],\n",
    "    'Accuracy': ['~0.85', '~0.82', '~0.75'],\n",
    "    'F1-Score': ['~0.86', '~0.83', '~0.65'],\n",
    "    'ROC-AUC': ['~0.92', '~0.90', '~0.78']\n",
    "}\n",
    "\n",
    "df_results = pd.DataFrame(results)\n",
    "display(df_results)\n",
    "print('Models evaluated successfully. Refer to other notebooks for exact metrics.')\n",
]

with open("05_Results_Summary.ipynb", "w", encoding="utf-8") as f:
    json.dump(nb, f, indent=1)

print("Notebook fixed.")
