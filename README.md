<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/gamepad-2.svg" alt="XSteam Logo" width="80" height="80">
  <h1 align="center">XSteam</h1>
  <p align="center">
    <strong>Decode Every Review. Powered by AI.</strong>
    <br />
    XSteam uses natural language processing and machine learning to analyze Steam game reviews—predicting sentiment, identifying key influential words, and scoring community helpfulness in milliseconds.
  </p>
</div>

<br />

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## 🚀 Features

- **🧠 Sentiment Analysis:** Instantly detects whether a review is positive or negative. Understands nuanced context using a customized Logistic Regression model with TF-IDF vectorization.
- **✨ Keyword Influence Extraction:** The "Why this prediction?" feature dynamically extracts and highlights the exact words from the review that influenced the AI's decision, complete with confidence scores.
- **📊 Helpfulness Prediction:** A Random Forest model evaluates text features (like length) and contextual metadata (like hours played and early access status) to predict whether the community will find the review helpful.
- **⚡ Blazing Fast API & UI:** Built on FastAPI for high-performance ML inference, paired with a React + Vite frontend that utilizes lazy-loading for near-instant rendering.
- **☁️ Cloud-Ready:** Seamlessly transitions between local development environments and cloud deployments (like Vercel and Hugging Face Spaces) without changing code.

---

## 📂 Architecture

The repository is organized into a full-stack ML application:

```text
XSteam/
├── backend/                        ← Machine Learning and API Layer
│   ├── app.py                      ← FastAPI web server
│   ├── data/                       ← Raw and processed dataset storage
│   ├── models/                     ← Serialized ML models (.pkl files)
│   ├── notebooks/                  ← Jupyter Notebooks (EDA, Training, Validation)
│   ├── outputs/                    ← Training visualizations and reports
│   └── src/                        ← Source code (preprocessing logic, feature engineering)
├── frontend/                       ← React.js Application
│   ├── src/api/                    ← API client configurations
│   ├── src/components/             ← Reusable UI components (Navbar, Logo, etc.)
│   └── src/pages/                  ← Application views (Home, Analyser, Dashboard)
└── requirements.txt                ← Python dependencies
```

---

## 📈 ML Model Performance

The pipelines were evaluated on a dataset of over 100K Steam user reviews. Detailed metrics can be viewed in the `backend/notebooks/05_Results_Summary.ipynb` notebook.

| Task | Deployed Model | Accuracy | F1-Score | ROC-AUC |
| :--- | :--- | :--- | :--- | :--- |
| **Sentiment Classification** | Logistic Regression (TF-IDF) | ~90% | ~0.89 | ~0.94 |
| **Helpfulness Prediction** | Random Forest | ~85% | ~0.84 | ~0.92 |

*Additional experiments were run using XGBoost and DistilBERT (available in the notebooks).*

---

## 💻 Getting Started (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/XSteam.git
cd XSteam
```

### 2. Setup the Backend (FastAPI + ML)
Ensure you have **Python 3.10+** installed.

```bash
# Install required Python packages
pip install -r requirements.txt

# Boot the backend server
cd backend
python app.py
```
*The backend API will run on `http://localhost:5000`.*

### 3. Setup the Frontend (React + Vite)
Open a new terminal window and navigate to the frontend directory. Ensure you have **Node.js** installed.

```bash
cd frontend

# Install the dependencies
npm install

# Start the development server
npm run dev
```
*The frontend application will be hosted gracefully on `http://localhost:5173`.*

---

## 🌍 Deployment

XSteam is explicitly engineered to be cloud-agnostic:

- **Frontend (Vercel)**: Simply connect `frontend/` to Vercel. During `npm run build`, the app dynamically points exactly to your Hugging Face space rather than `localhost`, utilizing environment configuration magic.
- **Backend (Hugging Face Spaces)**: The FastAPI server dynamically binds to the `PORT` environment variable provided by HF Docker instances. Upload the `backend/` directory along with the `requirements.txt` to a blank Hugging Face Docker Space, and it will spin up gracefully.

---

## 🔬 Reproducing the Models

If you'd like to retrain the models from scratch:

1. Download the `steam_reviews.csv` dataset and place it in `backend/data/raw/` (dataset link not included).
2. Start a Jupyter server in the `backend/` directory.
3. Execute the notebooks sequentially:
   - `01_EDA.ipynb`: Initial exploration
   - `02_Preprocessing.ipynb`: Text cleaning
   - `03_Sentiment_Model.ipynb`: TF-IDF and Logistic Regression/XGBoost training
   - `04_Helpfulness_Model.ipynb`: Non-text feature engineering and Random Forest
   - `05_Results_Summary.ipynb`: Performance validation

---

<div align="center">
  <p>Engineered with ❤️ for gamers and data scientists.</p>
</div>
