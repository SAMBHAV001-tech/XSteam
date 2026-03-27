import os
import numpy as np
import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.preprocess import clean_text
from src.features import engineer_features
import uvicorn

app = FastAPI(title="XSteam API")

# Enable CORS
app.add_middleware(CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# Load Models
MODELS_DIR = os.path.join(os.path.dirname(__file__), 'models')

try:
    print("Loading models...")
    vectorizer = joblib.load(os.path.join(MODELS_DIR, 'sentiment_tfidf.pkl'))
    lr_model = joblib.load(os.path.join(MODELS_DIR, 'sentiment_lr.pkl'))
    rf_model = joblib.load(os.path.join(MODELS_DIR, 'helpfulness_rf.pkl'))
    models_loaded = True
    print("Models loaded successfully!")
except Exception as e:
    print(f"Error loading models: {e}")
    models_loaded = False
    vectorizer = lr_model = rf_model = None

class SentimentRequest(BaseModel):
    review: str

class HelpfulnessRequest(BaseModel):
    review: str
    playtime_hours: float = 0.0
    is_early_access: int = 0

@app.get('/stats')
def get_stats():
    return {
        "status": "online",
        "models_loaded": models_loaded,
        "dataset_size": 154000,
        "models": ['Logistic Regression', 'XGBoost', 'DistilBERT', 'Random Forest'],
        "sentiment_model": {
            "accuracy": 0.90,
            "f1": 0.89,
            "roc_auc": 0.94
        },
        "helpfulness_model": {
            "accuracy": 0.85,
            "f1": 0.84,
            "roc_auc": 0.92
        }
    }

@app.post('/predict/sentiment')
def predict_sentiment(req: SentimentRequest):
    if not models_loaded:
        raise HTTPException(status_code=500, detail="Models not loaded")
        
    if not req.review.strip():
        raise HTTPException(status_code=400, detail="No review provided")
        
    try:
        # Preprocess
        cleaned_review = clean_text(req.review)
        
        # Transform
        X_tfidf = vectorizer.transform([cleaned_review])
        
        # Predict Probability
        sentiment_score = lr_model.predict_proba(X_tfidf)[0][1]

        # --- Top-keyword extraction ---
        # coef_ shape: (1, n_features) for binary LR
        coef = lr_model.coef_[0]                      # per-feature log-odds weight
        tfidf_weights = X_tfidf.toarray()[0]          # per-feature TF-IDF value for this review

        # Contribution = TF-IDF value × LR coefficient (only non-zero TF-IDF features)
        contributions = tfidf_weights * coef          # element-wise

        # Keep only features actually present in the review
        present_mask = tfidf_weights > 0
        present_indices = np.where(present_mask)[0]

        top_keywords = []
        if len(present_indices) > 0:
            feature_names = vectorizer.get_feature_names_out()
            present_contribs = contributions[present_indices]

            # Sort by absolute contribution descending, take top 3
            top_k = min(3, len(present_indices))
            sorted_idx = np.argsort(np.abs(present_contribs))[::-1][:top_k]

            abs_values = np.abs(present_contribs[sorted_idx])
            max_abs = abs_values[0] if abs_values[0] > 0 else 1.0  # avoid division by zero

            for rank_i in range(top_k):
                feat_idx = present_indices[sorted_idx[rank_i]]
                contrib   = present_contribs[sorted_idx[rank_i]]
                top_keywords.append({
                    "word": feature_names[feat_idx],
                    "influence": float(round(abs(contrib) / max_abs, 4)),
                    "direction": "positive" if contrib > 0 else "negative"
                })

        return {
            "sentiment": "Positive" if sentiment_score >= 0.5 else "Negative",
            "confidence": float(sentiment_score if sentiment_score >= 0.5 else 1.0 - sentiment_score),
            "recommended": bool(sentiment_score >= 0.5),
            "top_keywords": top_keywords
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post('/predict/helpfulness')
def predict_helpfulness(req: HelpfulnessRequest):
    if not models_loaded:
        raise HTTPException(status_code=500, detail="Models not loaded")
        
    if not req.review.strip():
        raise HTTPException(status_code=400, detail="No review provided")
        
    try:
        # 1. First get sentiment score
        cleaned_review = clean_text(req.review)
        X_tfidf = vectorizer.transform([cleaned_review])
        sentiment_score = lr_model.predict_proba(X_tfidf)[0][1]
        
        # 2. Prepare DataFrame for feature engineering
        df = pd.DataFrame([{
            'review_text': req.review,
            'author.playtime_forever': req.playtime_hours * 60.0,
            'written_during_early_access': req.is_early_access
        }])
        
        # 3. Engineer Features
        df_features = engineer_features(df)
        
        # 4. Add sentiment_score feature manually
        df_features['sentiment_score'] = sentiment_score
        
        # 5. Extract only the features expected by the random forest model
        features_list = ['review_length', 'word_count', 'playtime_hours', 'is_early_access', 'sentiment_score']
        X = df_features[features_list]
        
        # 6. Predict Helpfulness
        rf_prob = rf_model.predict_proba(X)[0][1]
        
        return {
            "helpfulness": "Helpful" if rf_prob >= 0.5 else "Not Helpful",
            "confidence": float(rf_prob if rf_prob >= 0.5 else 1.0 - rf_prob)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    uvicorn.run(app, host='0.0.0.0', port=port)
