# SkillPath AI

SkillPath AI is an intelligent, modern web application that helps users discover their ideal career path using Machine Learning (XGBoost) and Generative AI (Cloudflare Workers AI LLaMA 3.1).

This project uses a monorepo structure with an Express.js backend for authentication and API routing, a Flask microservice for ML predictions, and a React frontend for an interactive, visually stunning user experience.

## ✨ Key Features

- **AI-Powered Career Prediction**: Discover roles built for your unique skill set using a custom-trained XGBoost model with 94.9% accuracy.
- **Generative AI Action Plans**: Integration with Cloudflare Workers AI (LLaMA 3.1) to generate personalized, deeply contextual roadmaps based on your skill gaps.
- **Detailed Assessment**: Comprehensive 0-10 sliders to rate soft skills (Leadership, Teamwork) and domain-specific technical skills (e.g., Python, C++, AutoCAD).
- **Assessment History**: Track your progress over time with a historical dashboard storing all your previous assessments in MongoDB.
- **Modern UI/UX**: A highly responsive, premium interface built with Tailwind CSS, glassmorphism aesthetics, dynamic themes, and Framer Motion for smooth micro-animations.
- **User Authentication**: Secure user registration and login functionality using JSON Web Tokens (JWT) and bcrypt.

## 🚀 Tech Stack

### Frontend
- **React.js** (via Vite)
- **Tailwind CSS** (for styling and modern aesthetics)
- **Framer Motion** (for animations and transitions)
- **Lucide React** (for crisp iconography)

### Backend (Node.js)
- **Node.js & Express.js**
- **MongoDB & Mongoose** (Database)
- **JWT & bcryptjs** (Authentication and Security)
- **Cloudflare Workers AI API** (Generative summaries)

### Machine Learning Service (Python)
- **Flask** (Microservice API)
- **Pandas & Scikit-learn** (Data preprocessing)
- **XGBoost** (Core classification model)

## 📁 Project Structure

This project uses **npm workspaces** to manage the frontend and backend in a single repository, alongside a dedicated Python ML service.

```
skillpath-ai/
├── backend/          # Node.js/Express.js REST API & MongoDB connection
├── frontend/         # React application (Vite)
├── ml_service/       # Python Flask ML prediction microservice
└── package.json      # Root package.json managing npm workspaces
```

## 🛠️ Getting Started

Follow these steps to run the application locally on your machine.

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [Python 3.8+](https://www.python.org/) installed
- [MongoDB](https://www.mongodb.com/) installed and running locally (`mongodb://127.0.0.1:27017`)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ayush0201-web/skillpath-ai.git
   cd skillpath-ai
   ```

2. Install Node.js dependencies for the entire workspace:
   ```bash
   npm install
   ```

3. Set up the Python ML Service:
   ```bash
   cd ml_service
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On Mac/Linux:
   source venv/bin/activate
   pip install -r requirements.txt
   cd ..
   ```

### Running the App Locally

You will need two terminal windows to run both the full-stack app and the ML service.

**Terminal 1: Start the Python ML Service**
```bash
cd ml_service
# Activate venv if not already active
venv\Scripts\activate
python app.py
```
*(Runs on port 5001)*

**Terminal 2: Start the Web App**
```bash
# In the root skillpath-ai directory
npm run dev
```
- The **frontend** will be available at `http://localhost:5173`
- The **Node backend** API will be running on `http://localhost:5000`

## 📝 License

This project is open-source and available under the ISC License.
