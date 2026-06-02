import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, LabelEncoder
from sklearn.compose import ColumnTransformer
from xgboost import XGBClassifier
import joblib
import os

def train():
    print("Loading dataset...")
    dataset_path = os.path.join("..", "backend", "Dataset", "ai_skill_predictor_dataset.csv")
    df = pd.read_csv(dataset_path)

    print("Preprocessing data...")
    # Drop student_id
    if 'student_id' in df.columns:
        df = df.drop(columns=['student_id'])

    # Fill missing skill scores with 0
    # Any column that contains '_score' or '_skills' might have missing values.
    # We will just fill NA for all numerical columns with 0.
    numeric_cols = df.select_dtypes(include=['float64', 'int64']).columns
    df[numeric_cols] = df[numeric_cols].fillna(0)
    
    # Wait, some columns might be completely empty strings that got parsed as object
    for col in df.columns:
        if col not in ['domain', 'gender', 'interest_area', 'recommended_career']:
            df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0)

    # Separate features and target
    X = df.drop(columns=['recommended_career'])
    y = df['recommended_career']

    # Identify categorical columns
    cat_cols = ['domain', 'gender', 'interest_area']

    print("Encoding categorical features...")
    # Preprocessor to one-hot encode categorical features and pass through the rest
    preprocessor = ColumnTransformer(
        transformers=[
            ('cat', OneHotEncoder(handle_unknown='ignore'), cat_cols)
        ],
        remainder='passthrough'
    )

    X_transformed = preprocessor.fit_transform(X)

    print("Encoding target labels...")
    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y)

    # Train-test split (optional, but good for checking basic accuracy)
    X_train, X_test, y_train, y_test = train_test_split(
        X_transformed, y_encoded, test_size=0.2, random_state=42
    )

    print("Training XGBoost Classifier...")
    model = XGBClassifier(
        n_estimators=100,
        max_depth=6,
        learning_rate=0.1,
        random_state=42,
        use_label_encoder=False,
        eval_metric='mlogloss'
    )
    
    model.fit(X_train, y_train)
    
    accuracy = model.score(X_test, y_test)
    print(f"Model trained! Test Accuracy: {accuracy:.4f}")

    print("Saving model and encoders...")
    os.makedirs("artifacts", exist_ok=True)
    
    # We need to save the feature names expected by the model for alignment during inference
    feature_names = X.columns.tolist()
    joblib.dump(feature_names, 'artifacts/feature_names.pkl')
    joblib.dump(preprocessor, 'artifacts/preprocessor.pkl')
    joblib.dump(label_encoder, 'artifacts/label_encoder.pkl')
    
    # Save XGBoost model
    model.save_model('artifacts/xgboost_model.json')
    
    print("Training pipeline complete.")

if __name__ == "__main__":
    train()
