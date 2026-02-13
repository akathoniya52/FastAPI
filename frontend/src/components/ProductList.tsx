import type { Product } from '../types/product';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  isLoading: boolean;
}

export function ProductList({
  products,
  onEdit,
  onDelete,
  isLoading,
}: ProductListProps) {
  if (isLoading) {
    return (
      <div className="product-list-loading">
        Loading products...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="product-list-empty">
        No products yet. Add one to get started.
      </div>
    );
  }

  return (
    <div className="product-list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>₹{p.price.toLocaleString()}</td>
              <td>{p.quantity}</td>
              <td>
                <button
                  type="button"
                  className="btn-edit"
                  onClick={() => onEdit(p)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn-delete"
                  onClick={() => onDelete(p)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
