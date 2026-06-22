import { useState } from 'react';

export default function ProductForm({
  product,
  onSave,
  onClose,
}) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || '',
    price: product?.price || '',
    image: product?.image || '',
    description: product?.description || '',
    tags: product?.tags?.join(', ') || '',
    inStock: product?.inStock ?? true,
    isFeatured: product?.isFeatured ?? false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSave({
      ...formData,
      price: Number(formData.price),
      tags: formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    });
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="modal-content">
          <h2>
            {product ? 'Edit Product' : 'Add Product'}
          </h2>

          <form onSubmit={handleSubmit} className="product-form">

            <label>
              Product Name
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>

            <label>
              Category
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </label>

            <label>
              Price
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </label>

            <label>
              Image URL
              <input
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
            </label>

            <label>
              Description
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
              />
            </label>

            <label>
              Tags
              <input
                name="tags"
                placeholder="audio, wireless, bluetooth"
                value={formData.tags}
                onChange={handleChange}
              />
            </label>

            <label>
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleChange}
              />
              In Stock
            </label>

            <label>
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
              />
              Featured
            </label>

            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
              >
                {product ? 'Save Changes' : 'Add Product'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}