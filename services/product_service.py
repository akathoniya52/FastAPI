"""Product service - business logic for product operations."""
from sqlalchemy.orm import Session

import database_models
from models import Product, ProductCreate


def get_all(db: Session) -> list[database_models.Product]:
    """Return all products."""
    return db.query(database_models.Product).all()


def get_by_id(db: Session, product_id: int) -> database_models.Product | None:
    """Return a product by ID."""
    return (
        db.query(database_models.Product)
        .filter(database_models.Product.id == product_id)
        .first()
    )


def create(db: Session, product: ProductCreate) -> database_models.Product:
    """Create a new product."""
    db_product = database_models.Product(**product.model_dump())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


def update(db: Session, product: Product) -> database_models.Product | None:
    """Update a product by ID."""
    db_product = get_by_id(db, product.id)
    if not db_product:
        return None
    db_product.name = product.name
    db_product.description = product.description
    db_product.price = product.price
    db_product.quantity = product.quantity
    db.commit()
    db.refresh(db_product)
    return db_product


def delete(db: Session, product_id: int) -> database_models.Product | None:
    """Delete a product by ID."""
    db_product = get_by_id(db, product_id)
    if not db_product:
        return None
    db.delete(db_product)
    db.commit()
    return db_product


def delete_all(db: Session) -> None:
    """Delete all products."""
    db.query(database_models.Product).delete()
    db.commit()
