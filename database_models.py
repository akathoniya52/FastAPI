"""importing declarative base."""
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Float
Base = declarative_base()

"""Product model."""
class Product(Base):
    """Product model."""
    __tablename__ = "products"
    """Product model."""
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    price = Column(Float)
    quantity = Column(Integer)
