import { useEffect, useState } from 'react';

export default function App() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editImage, setEditImage] = useState('');
  const [tags, setTags] = useState('');
  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product
  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          price: Number(price),
          image,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to add product');
      }

      setName('');
      setPrice('');
      setImage('');

      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Start editing
  const startEdit = (product) => {
    setEditingId(product._id);
    setEditName(product.name);
    setEditPrice(product.price);
    setEditImage(product.image);
  };

  // Update product
  const updateProduct = async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editName,
          price: Number(editPrice),
          image: editImage,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update product');
      }

      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="container">
      <h1>Products</h1>

      {/* Add Product Form */}
      <form onSubmit={addProduct} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
/>
        <button type="submit">Add Product</button>
      </form>

      {/* Product List */}
      <div className="grid">
        {products.map((product) => (
          <article key={product._id} className="card">
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
              }}
            />

            {editingId === product._id ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />

                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                />

                <input
                  type="text"
                  value={editImage}
                  onChange={(e) => setEditImage(e.target.value)}
                />

                <button
                  onClick={() => updateProduct(product._id)}
                  style={{ marginRight: '8px' }}
                >
                  Save
                </button>

                <button onClick={() => setEditingId(null)}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h2>{product.name}</h2>

                <p>
                  <strong>₹{product.price}</strong>
                </p>

                <button
                  onClick={() => startEdit(product)}
                  style={{
                    marginRight: '8px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteProduct(product._id)}
                  style={{
                    padding: '8px 12px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}