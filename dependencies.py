"""Application dependencies."""
from database import session
from sqlalchemy.orm import Session


def get_db():
    """Get database session."""
    db = session()
    try:
        yield db
    finally:
        db.close()
