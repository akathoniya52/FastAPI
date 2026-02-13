"""Product routes."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from dependencies import get_db
from models import Product, ProductCreate
from services import product_service

router = APIRouter(prefix="/products", tags=["products"])


@router.get("")
def get_all_products(db: Session = Depends(get_db)):
    """Return all products."""
    return product_service.get_all(db)


@router.get("/{product_id}")
def get_product(product_id: int, db: Session = Depends(get_db)):
    """Return a product by ID."""
    db_product = product_service.get_by_id(db, product_id)
    if db_product:
        return db_product
    return None


@router.post("")
def add_product(product: ProductCreate, db: Session = Depends(get_db)):
    """Add a new product in the database."""
    return product_service.create(db, product)


@router.put("")
def update_product(product: Product, db: Session = Depends(get_db)):
    """Update a product."""
    return product_service.update(db, product)


@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    """Delete a product."""
    return product_service.delete(db, product_id)


@router.delete("")
def delete_all_products(db: Session = Depends(get_db)):
    """Delete all products."""
    product_service.delete_all(db)
    return None
