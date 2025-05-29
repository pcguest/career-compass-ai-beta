
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession

from ..core.config import settings

# Create async engine for database operations
engine = create_async_engine(
    str(settings.DATABASE_URI),
    echo=settings.DEBUG,
    future=True,
)

# Create async session factory
AsyncSessionLocal = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

# For backwards compatibility, also create sync session
sync_engine = create_engine(
    str(settings.DATABASE_URI).replace("+asyncpg", ""),
    echo=settings.DEBUG,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=sync_engine)

# Create base class for models
Base = declarative_base()

# Dependency for getting database session
async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
