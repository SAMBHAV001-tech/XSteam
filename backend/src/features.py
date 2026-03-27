import pandas as pd
import numpy as np

def engineer_features(df):
    """
    Adds engineered features to the dataframe.
    """
    df_engineered = df.copy()
    
    # review_length - character count of raw review
    df_engineered['review_length'] = df_engineered['review_text'].apply(lambda x: len(str(x)) if pd.notnull(x) else 0)
    
    # word_count - word count of raw review
    df_engineered['word_count'] = df_engineered['review_text'].apply(lambda x: len(str(x).split()) if pd.notnull(x) else 0)
    
    # playtime_hours - author.playtime_forever / 60
    # Assuming the column may be nested in a dictionary or just standard flat column 'author.playtime_forever'
    if 'author.playtime_forever' in df_engineered.columns:
        df_engineered['playtime_hours'] = df_engineered['author.playtime_forever'] / 60.0
    else:
        df_engineered['playtime_hours'] = 0.0 # Default if missing
        
    # is_early_access - boolean flag from written_during_early_access column
    if 'written_during_early_access' in df_engineered.columns:
        df_engineered['is_early_access'] = df_engineered['written_during_early_access'].astype(int)
    else:
        df_engineered['is_early_access'] = 0
        
    # helpfulness_label - 1 if votes_helpful > 0 else 0
    if 'review_votes' in df_engineered.columns:
        df_engineered['helpfulness_label'] = (df_engineered['review_votes'] > 0).astype(int)
    else:
        df_engineered['helpfulness_label'] = 0
        
    # sentiment_label - 1 if recommended == True else 0
    if 'review_score' in df_engineered.columns:
        df_engineered['sentiment_label'] = (df_engineered['review_score'] == 1).astype(int)
    else:
        df_engineered['sentiment_label'] = 0
        
    return df_engineered
