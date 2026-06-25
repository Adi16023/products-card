import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';

export default function EditProductModal({
  open,
  onClose,
  products= [],
  onSave,
}) {
  const [selectedId, setSelectedId] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [inStock, setInStock] = useState(true);

  useEffect(() => {
    if (open && products.length > 0) {
      const firstProduct = products[0];

      setSelectedId(firstProduct._id);
      setProductName(firstProduct.name || '');
      setPrice(firstProduct.price || '');
      setImageUrl(firstProduct.image || '');
      setTags(
        Array.isArray(firstProduct.tags)
          ? firstProduct.tags.join(', ')
          : ''
      );
      setDescription(firstProduct.description || '');
      setInStock(firstProduct.inStock ?? true);
    }
  }, [open, products]);

  const handleProductChange = (id) => {
    const selectedProduct = products.find(
      (product) => product._id === id
    );

    if (!selectedProduct) return;

    setSelectedId(selectedProduct._id);
    setProductName(selectedProduct.name || '');
    setPrice(selectedProduct.price || '');
    setImageUrl(selectedProduct.image || '');
    setTags(
      Array.isArray(selectedProduct.tags)
        ? selectedProduct.tags.join(', ')
        : ''
    );
    setDescription(selectedProduct.description || '');
    setInStock(selectedProduct.inStock ?? true);
  };

  if (!open || products.length === 0) return null;

  return (
    <>
      <div
        className="modal-overlay"
        onClick={onClose}
      />

      <div
        className="modal-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          type="button"
          onClick={onClose}
        >
          ×
        </button>

        <div className="modal-content">
          <h2>Edit Product</h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              marginTop: '20px',
            }}
          >
            <select
              value={selectedId}
              onChange={(e) =>
                handleProductChange(e.target.value)
              }
              style={{
                padding: '14px',
                borderRadius: '10px',
                border: '1px solid #ddd',
                fontSize: '16px',
              }}
            >
              {products.map((product) => (
                <option
                  key={product._id}
                  value={product._id}
                >
                  {product.name}
                </option>
              ))}
            </select>

            <TextField
              label="Product Name"
              variant="outlined"
              fullWidth
              value={productName}
              onChange={(e) =>
                setProductName(e.target.value)
              }
            />

            <TextField
              label="Price"
              variant="outlined"
              type="number"
              fullWidth
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
            />

            <TextField
              label="Image URL"
              variant="outlined"
              fullWidth
              value={imageUrl}
              onChange={(e) =>
                setImageUrl(e.target.value)
              }
            />

            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                style={{
                  width: '100%',
                  maxHeight: '250px',
                  objectFit: 'contain',
                  border: '1px solid #ddd',
                  borderRadius: '12px',
                  padding: '10px',
                  background: '#fff',
                }}
              />
            )}

            <TextField
              label="Tags"
              variant="outlined"
              fullWidth
              value={tags}
              onChange={(e) =>
                setTags(e.target.value)
              }
            />

            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />

            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '14px',
                color: '#333',
              }}
            >
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
              />
              In Stock
            </label>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '24px',
            }}
          >
            <button
              className="btn btn-primary"
              type="button"
              onClick={() =>
                onSave(selectedId, {
                  name: productName,
                  price: Number(price),
                  image: imageUrl,
                  tags: tags
                    .split(',')
                    .map((tag) => tag.trim())
                    .filter(Boolean),
                  description,
                  inStock,
                })
              }
            >
              Update Product
            </button>

            <button
              className="btn btn-ghost"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}