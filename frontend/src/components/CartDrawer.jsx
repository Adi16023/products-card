export default function CartDrawer({ open, items, onClose, onRemove, total }) {
  return (
    <>
      <div className={`cart-backdrop ${open ? 'open' : ''}`} onClick={onClose} role="presentation" />
      <aside className={`cart-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="cart-header">
          <h2>Your cart</h2>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close cart">
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty</p>
            <span>Add items to get started.</span>
          </div>
        ) : (
          <>
            <ul className="cart-items">
              {items.map((item) => (
                <li key={item._id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <strong>{item.name}</strong>
                    <span>${item.displayPrice.toFixed(2)}</span>
                  </div>
                  <button type="button" onClick={() => onRemove(item._id)} aria-label={`Remove ${item.name}`}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Subtotal</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
              <button type="button" className="btn btn-primary btn-lg" disabled>
                Checkout (demo)
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
