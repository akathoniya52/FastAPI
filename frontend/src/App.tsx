import { useState, useEffect } from 'react';
import { api } from './api/client';
import { ProductList } from './components/ProductList';
import { ProductForm } from './components/ProductForm';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import type { Product, ProductCreate } from './types/product';
import './App.css';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [greeting, setGreeting] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      const data = await api.getProducts();
      setProducts(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    api.getGreeting().then((r) => setGreeting(r.message));
    fetchProducts();
  }, []);

  const handleAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleFormSubmit = async (data: ProductCreate | Product) => {
    try {
      if ('id' in data) {
        await api.updateProduct(data);
      } else {
        await api.createProduct(data);
      }
      setShowForm(false);
      setEditingProduct(null);
      await fetchProducts();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save product');
    }
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    try {
      await api.deleteProduct(productToDelete.id);
      setProductToDelete(null);
      await fetchProducts();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to delete product');
      setProductToDelete(null);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Product Manager</h1>
        {greeting && <p className="greeting">{greeting}</p>}
      </header>

      {productToDelete && (
        <DeleteConfirmModal
          product={productToDelete}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setProductToDelete(null)}
        />
      )}

      {error && (
        <div className="error-banner">
          {error}
          <button type="button" onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      <main className="app-main">
        {showForm ? (
          <ProductForm
            product={editingProduct}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
          />
        ) : (
          <>
            <div className="toolbar">
              <button type="button" className="btn-add" onClick={handleAdd}>
                Add Product
              </button>
            </div>
            <ProductList
              products={products}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              isLoading={isLoading}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
