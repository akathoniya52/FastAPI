"""Database module."""
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from dotenv import load_dotenv
import os

load_dotenv()  # Loads .env file

"""constant database url."""
DB_URL = os.getenv('DB_URL')

"""Engine class."""
engine = create_engine(DB_URL)

"""SessionLocal class."""
session = sessionmaker(autocommit=False, autoflush=False, bind=engine);


