import { useState } from "react";
import { Link } from "react-router-dom";
import "./ShoppingCart.css";

function QuantitySelector({ quantity, setQuantity }) {
  return (
    <div className="cart-qty-selector">
      <button
        type="button"
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span>{quantity}</span>
      <button
        type="button"
        onClick={() => setQuantity(quantity + 1)}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

function ShoppingCart({ products, cart, setCart, removeFromCart, updateCartQuantity }) {
  const cartItems = cart
    .map((item) => ({
      ...item,
      product: products.find((product) => product.id === item.id),
    }))
    .filter((item) => item.product);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoMessage, setPromoMessage] = useState("");

  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal - discount >= 50 || subtotal === 0 ? 0 : 6;
  const total = subtotal - discount + shipping;

  function applyPromo() {
    if (promoCode.trim().toUpperCase() === "HOME10") {
      setPromoApplied(true);
      setPromoMessage("HOME10 applied — 10% off your order.");
      return;
    }

    setPromoApplied(false);
    setPromoMessage("That code didn’t work. Try HOME10.");
  }

  function changeQuantity(productId, nextQuantity) {
    updateCartQuantity(productId, nextQuantity);
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-page">
        <div className="cart-empty-box">
          <h1>Your shopping bag is empty.</h1>
          <Link to="/shop" className="cart-empty-button">
            Explore collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="shopping-cart-page">
      <div className="shopping-cart-inner">
        <p className="cart-breadcrumbs">
          <Link to="/">Home</Link> / Shopping cart
        </p>

        <header className="cart-header">
          <h1>A little closer to cozy</h1>
          <div className="cart-header-meta">
            <span>{cartItems.length} lovely finds</span>
            <span>·</span>
            <span>{totalItems} pieces for your home</span>
          </div>
        </header>

        <div className="cart-content">
          <section className="cart-table">
            <div className="cart-table-head">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>

            {cartItems.map(({ product, quantity }) => (
              <article key={product.id} className="cart-row">
                <div className="cart-product-cell">
                  <Link to={`/product/${product.slug}`}>
                    <img src={product.image} alt={product.name} />
                  </Link>

                  <div className="cart-product-info">
                    <Link
                      to={`/product/${product.slug}`}
                      className="cart-product-name"
                    >
                      {product.name}
                    </Link>
                    <p className="cart-product-detail">{product.detail}</p>
                    <button
                      type="button"
                      className="cart-remove-link"
                      onClick={() => removeFromCart(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="cart-price">${product.price}</div>

                <div className="cart-quantity-cell">
                  <QuantitySelector
                    quantity={quantity}
                    setQuantity={(newQty) => changeQuantity(product.id, newQty)}
                  />
                </div>

                <div className="cart-line-total">${product.price * quantity}</div>
              </article>
            ))}

            <p className="cart-note">Carefully packed, with a little extra love.</p>
          </section>

          <aside className="cart-summary">
            <h2>Order summary</h2>

            <div className="summary-row">
              <span>Subtotal ({totalItems} pieces)</span>
              <span>${subtotal}</span>
            </div>

            {promoApplied && (
              <div className="summary-row">
                <span>Discount</span>
                <span>−${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
            </div>

            <p className="summary-hint">
              {subtotal - discount >= 50
                ? "Your order qualifies for free shipping."
                : `Add $${Math.max(0, 50 - (subtotal - discount)).toFixed(0)} for free shipping.`}
            </p>

            <div className="summary-total">
              <span>Estimated total</span>
              <strong>${total}</strong>
            </div>

            <p className="summary-tax">Taxes calculated at checkout.</p>

            <div className="promo-box">
              <input
                type="text"
                value={promoCode}
                onChange={(event) => setPromoCode(event.target.value)}
                placeholder="Promo code"
                aria-label="Promo code"
              />
              <button type="button" onClick={applyPromo}>
                Apply
              </button>
            </div>

            {promoMessage && (
              <p className="promo-message" role="status">
                {promoMessage}
              </p>
            )}

            <button
              type="button"
              className="cart-primary-button"
              onClick={() =>
                window.alert("Frontend demo checkout only. No payment has been taken.")
              }
            >
              Proceed to Checkout →
            </button>

            <p className="secure-note">Secure checkout · Easy 30-day returns</p>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;