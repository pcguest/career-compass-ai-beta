# CareerCompassAI 🧭

> AI-powered career guidance and job application evaluation platform

CareerCompassAI helps job seekers navigate their career journey with confidence by providing AI-powered insights, application analysis, and personalized guidance.

![CareerCompassAI Banner](https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## ✨ Features

- **AI-Powered Analysis**: Get detailed evaluation of your resume and job applications against specific job descriptions
- **Detailed Insights**: Receive actionable feedback on how to improve your applications and highlight relevant skills
- **Interview Preparation**: Generate custom interview questions based on the job and your experience
- **Data Persistence**: Track your job applications and progress over time
- **Modern Technology**: Built with a modern, scalable tech stack

## 🛠️ Technology Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- React Query for data fetching
- React Router for navigation
- Lucide React for icons

### Backend
- FastAPI (Python)
- SQLAlchemy ORM
- Pydantic for data validation
- AI/ML integrations
- JWT authentication

### Database & Infrastructure
- Supabase for database and authentication
- PostgreSQL for structured data
- Vercel for frontend hosting
- Railway for backend hosting

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- Python (v3.9 or higher)
- pip (latest version)
- Git

You will also need:
- Supabase account for database and authentication
- API keys for AI services

## 🚀 Quick Start

### Clone the Repository

```bash
git clone https://github.com/yourusername/career-compass-ai.git
cd career-compass-ai
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend development server will start at `http://localhost:5173`

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with your credentials
cp .env.example .env

# Start development server
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

## 📚 API Documentation

Once the backend server is running, you can access the API documentation at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 📁 Project Structure

```
career-compass-ai/
├── README.md                  # Project documentation
├── .gitignore                 # Git ignore file
├── frontend/                  # Frontend application
│   ├── public/                # Static files
│   ├── src/                   # Source code
│   ├── package.json           # Dependencies and scripts
│   └── README.md              # Frontend documentation
└── backend/                   # Backend application
    ├── app/                   # Application code
    ├── tests/                 # Test suite
    ├── requirements.txt       # Python dependencies
    └── README.md              # Backend documentation
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.