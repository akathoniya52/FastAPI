from pydantic import BaseModel


class Product(BaseModel):
    id: int
    name: str
    description: str
    price: float
    quantity: int


class ProductCreate(BaseModel):
    """Schema for creating a product; id is auto-generated."""

    name: str
    description: str
    price: float
    quantity: int

