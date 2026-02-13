const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function fetchApi<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export const api = {
  getGreeting: () => fetchApi<{ message: string }>('/'),
  getProducts: () => fetchApi<import('../types/product').Product[]>('/products'),
  getProduct: (id: number) =>
    fetchApi<import('../types/product').Product>(`/products/${id}`),
  createProduct: (data: import('../types/product').ProductCreate) =>
    fetchApi<import('../types/product').Product>('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateProduct: (data: import('../types/product').Product) =>
    fetchApi<import('../types/product').Product>('/products', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  deleteProduct: (id: number) =>
    fetchApi<import('../types/product').Product | null>(`/products/${id}`, {
      method: 'DELETE',
    }),
  deleteAllProducts: () =>
    fetchApi<null>('/products', { method: 'DELETE' }),
};
