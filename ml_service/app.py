from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
import xgboost as xgb
import os

app = Flask(__name__)
CORS(app)

# Load artifacts
artifacts_dir = "artifacts"
feature_names = None
preprocessor = None
label_encoder = None
model = None

def load_artifacts():
    global feature_names, preprocessor, label_encoder, model
    try:
        feature_names = joblib.load(os.path.join(artifacts_dir, 'feature_names.pkl'))
        preprocessor = joblib.load(os.path.join(artifacts_dir, 'preprocessor.pkl'))
        label_encoder = joblib.load(os.path.join(artifacts_dir, 'label_encoder.pkl'))
        
        model = xgb.XGBClassifier()
        model.load_model(os.path.join(artifacts_dir, 'xgboost_model.json'))
        print("Model and artifacts loaded successfully!")
    except Exception as e:
        print(f"Error loading artifacts (did you run train_model.py?): {e}")

@app.before_request
def before_first_request():
    if model is None:
        load_artifacts()

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Construct flat dictionary matching the feature_names
        input_dict = {feat: 0 for feat in feature_names}
        
        # Map frontend data to input_dict
        input_dict['domain'] = data.get('domain', 'CS/IT')
        input_dict['gender'] = data.get('gender', 'Prefer not to say')
        input_dict['age'] = float(data.get('age', 22))
        input_dict['10th_marks'] = float(data.get('marks10', 0))
        input_dict['12th_marks'] = float(data.get('marks12', 0))
        input_dict['graduation_marks'] = float(data.get('grad', 0))
        input_dict['backlogs'] = int(data.get('backlogs', 0))
        input_dict['internship_done'] = 1 if data.get('internship') else 0
        input_dict['projects_count'] = int(data.get('projects', 0))
        input_dict['certifications_count'] = int(data.get('certifications', 0))
        input_dict['interest_area'] = data.get('interest', 'Unknown')
        
        # Soft skills
        soft_skills = data.get('softSkills', {})
        input_dict['communication_skills'] = int(soft_skills.get('communication', 0))
        input_dict['leadership_skills'] = int(soft_skills.get('leadership', 0))
        input_dict['teamwork_skills'] = int(soft_skills.get('teamwork', 0))
        input_dict['problem_solving_skills'] = int(soft_skills.get('problemSolving', 0))
        
        # Technical skills (frontend sends an object with keys like "Python", "C++", "Data Structures")
        tech_skills = data.get('skills', {})
        for skill_key, score in tech_skills.items():
            # Format skill_key to match dataset column names
            formatted_key = skill_key.lower()
            formatted_key = formatted_key.replace('c++', 'cpp')
            formatted_key = formatted_key.replace('/', '_')
            formatted_key = formatted_key.replace('& ', '')
            formatted_key = formatted_key.replace(' ', '_')
            
            # Special edge case for Robotics & Automation -> robotics_automation
            formatted_key = formatted_key.replace('__', '_') 
            
            # The soft skill "Communication" in Commerce becomes communication_score
            # But "Communication" in softSkills becomes communication_skills.
            # We already handled communication_skills above.
            
            if not formatted_key.endswith('_score'):
                formatted_key += '_score'
                
            if formatted_key in input_dict:
                input_dict[formatted_key] = int(score)

        # Create DataFrame
        input_df = pd.DataFrame([input_dict])
        
        # Ensure columns are exactly in the order of feature_names
        input_df = input_df[feature_names]
        
        # Preprocess
        X_transformed = preprocessor.transform(input_df)
        
        # Predict Probabilities
        probas = model.predict_proba(X_transformed)[0]
        
        # Get top 3 indices
        top3_idx = np.argsort(probas)[::-1][:3]
        
        # Map back to classes
        top3_classes = label_encoder.inverse_transform(top3_idx)
        top3_probs = probas[top3_idx]
        
        # Format response
        predictions = []
        for i in range(3):
            predictions.append({
                "rank": i + 1,
                "career": top3_classes[i],
                "confidence": round(float(top3_probs[i]) * 100, 1),
                "reason": "Based on your technical scores and overall profile, our ML model strongly recommends this path.",
                "strongSkills": [k.replace('_score', '').replace('_', ' ').title() for k,v in tech_skills.items() if int(v) >= 7][:2],
                "skillGaps": [k.replace('_score', '').replace('_', ' ').title() for k,v in tech_skills.items() if int(v) <= 4][:2]
            })
            
        return jsonify({
            "predictions": predictions,
            "overallProfile": "Your profile has been successfully evaluated by our XGBoost algorithm."
        })
        
    except Exception as e:
        print("Prediction error:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)
