import { useState, useEffect } from 'react';
import type { Product, ProductCreate } from '../types/product';

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (data: ProductCreate | Product) => void;
  onCancel: () => void;
}

export function ProductForm({
  product,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(String(product.price));
      setQuantity(String(product.quantity));
    } else {
      setName('');
      setDescription('');
      setPrice('');
      setQuantity('');
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numPrice = parseFloat(price);
    const numQty = parseInt(quantity, 10);
    if (isNaN(numPrice) || isNaN(numQty) || !name.trim()) return;
    if (product) {
      onSubmit({ id: product.id, name: name.trim(), description: description.trim(), price: numPrice, quantity: numQty });
    } else {
      onSubmit({ name: name.trim(), description: description.trim(), price: numPrice, quantity: numQty });
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h3>{product ? 'Edit Product' : 'Add Product'}</h3>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Product name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product description"
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          placeholder="0.00"
        />
      </div>
      <div className="form-group">
        <label htmlFor="quantity">Quantity</label>
        <input
          id="quantity"
          type="number"
          min="0"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          placeholder="0"
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn-submit">
          {product ? 'Update' : 'Add'}
        </button>
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
