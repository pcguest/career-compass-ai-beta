# CareerCompassAI Backend

This directory contains the backend application for CareerCompassAI, built with FastAPI and Python.

## Tech Stack

- **FastAPI** - Web framework
- **SQLAlchemy** - ORM for database operations
- **Pydantic** - Data validation
- **Alembic** - Database migrations
- **pytest** - Testing framework
- **Supabase** - Database and authentication
- **OpenAI** - AI/ML integrations for resume and job analysis

## Directory Structure

```
app/
├── api/              # API routes
│   ├── endpoints/    # API endpoint modules
│   └── deps.py       # Dependency injection
├── core/             # Core application modules
│   ├── config.py     # Configuration settings
│   ├── security.py   # Security utilities (JWT, auth)
│   └── logging.py    # Logging configuration
├── db/               # Database
│   ├── base.py       # Base database model
│   ├── session.py    # Database session
│   └── init_db.py    # Database initialization
├── models/           # SQLAlchemy models
├── schemas/          # Pydantic schemas for validation
├── services/         # Business logic services
│   ├── ai/           # AI service integrations
│   └── user/         # User-related services
├── utils/            # Utility functions
│   └── helpers.py    # Helper functions
└── main.py           # FastAPI application entry point

tests/               # Test directory
├── conftest.py      # Test configuration
├── api/             # API tests
└── services/        # Service tests

alembic/             # Database migrations
├── versions/        # Migration versions
└── env.py           # Alembic environment

.env                 # Environment variables (not committed)
.env.example         # Example environment variables
requirements.txt     # Python dependencies
```

## Getting Started

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` file with your environment variables:
   ```
   DATABASE_URL=postgresql://user:password@localhost/dbname
   SUPABASE_URL=your-supabase-url
   SUPABASE_KEY=your-supabase-service-key
   OPENAI_API_KEY=your-openai-api-key
   SECRET_KEY=your-secret-key-for-jwt
   ```

4. Run the development server:
   ```bash
   uvicorn app.main:app --reload
   ```

5. Run tests:
   ```bash
   pytest
   ```

## API Documentation

When the server is running, API documentation is available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Database Migrations

To create a new migration after model changes:

```bash
alembic revision --autogenerate -m "Description of changes"
```

To apply migrations:

```bash
alembic upgrade head
```