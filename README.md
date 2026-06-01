# SkillPath AI

SkillPath AI is an intelligent, modern web application that helps users discover the ideal career path based on their domain and specific skills. 

This project uses a monorepo structure with an Express.js backend for authentication and a React frontend for an interactive, visually stunning user experience.

## ✨ Features

- **AI-Powered Career Prediction**: Discover roles built for your unique skill set.
- **Domain Selection**: Filter skills by specific domains (e.g., Software Engineering, Data Science).
- **User Authentication**: Secure user registration and login functionality using JSON Web Tokens (JWT) and bcrypt.
- **Modern UI**: A responsive, rich interface built with Tailwind CSS, glassmorphism aesthetics, and Framer Motion for micro-animations.

## 🚀 Tech Stack

### Frontend
- **React.js** (via Vite)
- **Tailwind CSS** (for styling and modern aesthetics)
- **Framer Motion** (for smooth animations and transitions)
- **React Router** (for dynamic routing)

### Backend
- **Node.js & Express.js**
- **MongoDB & Mongoose** (Database)
- **JWT & bcryptjs** (Authentication and Security)

## 📁 Project Structure

This project uses **npm workspaces** to manage the frontend and backend in a single repository.

```
skillpath-ai/
├── backend/          # Express.js REST API & MongoDB connection
├── frontend/         # React application (Vite)
└── package.json      # Root package.json managing workspaces
```

## 🛠️ Getting Started

Follow these steps to run the application locally on your machine.

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) installed and running locally on your default port (`mongodb://127.0.0.1:27017`)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ayush0201-web/skillpath-ai.git
   cd skillpath-ai
   ```

2. Install dependencies for the entire workspace:
   ```bash
   npm install
   ```
   *(This will automatically install and link packages for both the `frontend` and `backend` directories).*

### Running the App Locally

To start **both** the frontend development server and the backend API server simultaneously, simply run this command from the root directory:

```bash
npm run dev
```

- The **frontend** will be available at `http://localhost:5173`
- The **backend** API will be running on `http://localhost:5000`

## 📝 License

This project is open-source and available under the ISC License.
