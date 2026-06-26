import { useState, useEffect } from "react";

export default function DeleteProductModal({
  open,
  onClose,
  products = [],
  onDelete,
}) {
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    if (open && products.length > 0) {
      setSelectedId(products[0]._id);
    }
  }, [open, products]);

  if (!open || products.length === 0) return null;

  const selectedProduct = products.find(
    (product) => product._id === selectedId,
  );

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />

      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-content">
          <h2>Delete Product</h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              marginTop: "20px",
            }}
          >
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              style={{
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #ddd",
              }}
            >
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>

            {selectedProduct && (
              <div>
                <p>
                  <strong>Name:</strong> {selectedProduct.name}
                </p>

                <p>
                  <strong>Price:</strong> ₹{selectedProduct.price}
                </p>

                {selectedProduct.image && (
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    style={{
                      width: "100%",
                      maxHeight: "250px",
                      objectFit: "contain",
                      marginTop: "10px",
                    }}
                  />
                )}
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "24px",
            }}
          >
            <button
              className="admin-btn delete-btn"
              onClick={() => onDelete(selectedId)}
            >
              Delete Product
            </button>

            <button className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
