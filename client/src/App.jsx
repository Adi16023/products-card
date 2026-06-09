import { useEffect, useState } from 'react';

export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  return (
    <main className="container">
      <h1>Products</h1>
      <div className="grid">
        {products.map((product) => (
          <article key={product._id} className="card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>${product.price.toFixed(2)}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
