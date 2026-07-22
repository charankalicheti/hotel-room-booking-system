"""
=========================================================
OPTIMIZED Database Configuration
Replace current database.py with this for better performance
=========================================================
"""

from sqlalchemy import create_engine, event
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config import settings
import logging

logger = logging.getLogger(__name__)

# ==========================================================
# Create Engine with Optimized Settings
# ==========================================================
engine = create_engine(
    settings.DATABASE_URL,
    # Connection pooling optimizations
    pool_size=20,                    # Max connections in pool
    max_overflow=10,                 # Additional connections when needed
    pool_pre_ping=True,              # Test connections before use
    pool_recycle=3600,               # Recycle connections every hour
    
    # Connection timeout
    connect_args={
        "connect_timeout": 10,       # 10 second connection timeout
        "options": "-c statement_timeout=30000"  # 30 second query timeout
    },
    
    # Performance settings
    execution_options={
        "isolation_level": "READ_COMMITTED",  # Better for concurrent access
    },
    
    # Logging (disable in production for performance)
    echo=False,
    echo_pool=False,
)

# ==========================================================
# Log Connection Pool Events
# ==========================================================
@event.listens_for(engine, "connect")
def receive_connect(dbapi_conn, connection_record):
    logger.debug("Database connection established")

@event.listens_for(engine, "close")
def receive_close(dbapi_conn, connection_record):
    logger.debug("Database connection closed")

@event.listens_for(engine, "detach")
def receive_detach(dbapi_conn, connection_record):
    logger.debug("Database connection detached")

# ==========================================================
# Session Factory
# ==========================================================
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    expire_on_commit=False,  # Better for API responses
)

# ==========================================================
# Declarative Base
# ==========================================================
Base = declarative_base()

# ==========================================================
# Dependency Injection
# ==========================================================
def get_db():
    """
    FastAPI dependency for database session.
    Yields a database session and ensures cleanup.
    """
    db = SessionLocal()
    try:
        yield db
    except Exception as e:
        db.rollback()
        logger.error(f"Database session error: {str(e)}")
        raise
    finally:
        db.close()

# ==========================================================
# Database Health Check
# ==========================================================
def check_database_connection():
    """
    Check if database is accessible.
    Returns True if connection successful, False otherwise.
    """
    try:
        db = SessionLocal()
        db.execute("SELECT 1")
        db.close()
        logger.info("✅ Database connection successful")
        return True
    except Exception as e:
        logger.error(f"❌ Database connection failed: {str(e)}")
        return False

# ==========================================================
# Database Initialization
# ==========================================================
def init_db():
    """
    Initialize database tables.
    Should be called once at startup.
    """
    try:
        Base.metadata.create_all(bind=engine)
        logger.info("✅ Database tables initialized")
    except Exception as e:
        logger.error(f"❌ Failed to initialize database: {str(e)}")
        raise
