
#!/usr/bin/env bash
set -e

echo "🚀 Starting CareerCompassAI..."

### 1) Install Dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install

echo "📦 Installing backend dependencies..."
cd ../backend
pip install -r requirements.txt

### 2) Start Both Servers
echo "🔧 Starting backend server..."
# Start backend in the background
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload &

echo "🔧 Starting frontend server..."
# Return to frontend and start Vite
cd ../frontend
npm run dev -- --host 0.0.0.0 --port 5000
