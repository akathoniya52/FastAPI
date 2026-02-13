import type { Product } from '../types/product';

interface DeleteConfirmModalProps {
  product: Product | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmModal({
  product,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Delete Product</h3>
        <p>
          Are you sure you want to delete <strong>{product.name}</strong>?
        </p>
        <div className="modal-actions">
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="btn-delete-confirm" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
