"""Database initialization and seed data."""
from sqlalchemy import text

import database_models
from database import engine, session
from models import Product

SEED_PRODUCTS = [
    Product(id=1, name="Laptop", description="A laptop computer", price=100, quantity=10),
    Product(id=2, name="Smartphone", description="A smartphone", price=200, quantity=20),
    Product(id=3, name="Tablet", description="A tablet computer", price=34550, quantity=350),
    Product(id=4, name="Smartwatch", description="A smartwatch", price=450, quantity=40),
    Product(id=5, name="Headphones", description="A pair of headphones", price=50, quantity=50),
    Product(id=6, name="Keyboard", description="A keyboard", price=60, quantity=60),
    Product(id=7, name="Mouse", description="A mouse", price=70, quantity=70),
    Product(id=8, name="Speaker", description="A speaker", price=80, quantity=80),
    Product(id=9, name="Monitor", description="A monitor", price=90, quantity=90),
    Product(id=10, name="Printer", description="A printer", price=100, quantity=100),
]


def init_database():
    """Initialize database with seed data if empty."""
    db = session()
    try:
        count = db.query(database_models.Product).count()
        if count > 0:
            print("Database already initialized.")
            return

        for product in SEED_PRODUCTS:
            db.add(database_models.Product(**product.model_dump()))
        db.commit()
        db.execute(
            text(
                "SELECT setval(pg_get_serial_sequence('products', 'id'), "
                "(SELECT COALESCE(MAX(id), 0) FROM products))"
            )
        )
        db.commit()
        print("Database initialized successfully.")
    finally:
        db.close()
