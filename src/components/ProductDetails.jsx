import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ProductDetails.css";

function QuantitySelector({ quantity, setQuantity }) {
  return (
    <div className="qty-selector">
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

function ProductCard({ product, wishlist, toggleWishlist }) {
  const saved = wishlist.includes(product.id);

  return (
    <article className="detail-related-card">
      <div className="detail-related-image-wrap">
        <Link to={`/product/${product.slug}`}>
          <img src={product.image} alt={product.name} />
        </Link>

        <button
          type="button"
          className={`detail-related-heart ${saved ? "saved" : ""}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
        >
          {saved ? "♥" : "♡"}
        </button>
      </div>

      <div className="detail-related-copy">
        <Link to={`/product/${product.slug}`} className="detail-related-name">
          {product.name}
        </Link>
        <p className="detail-related-price">${product.price}</p>
      </div>
    </article>
  );
}

function ProductDetails({ products, wishlist, toggleWishlist, addToCart }) {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <Link to="/shop">Return to shop</Link>
      </div>
    );
  }

  const related = products.filter((item) => item.id !== product.id).slice(0, 4);
  const isSaved = wishlist.includes(product.id);

  function handleAddToCart() {
    addToCart(product.id, quantity);
  }

  return (
    <div className="product-details-page">
      <div className="product-details-inner">
        <p className="details-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {product.category} / {product.name}
        </p>

        <div className="product-details-layout">
          <div className="product-gallery">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="product-main-image"
            />

            {product.images.length > 1 && (
              <div className="product-thumbs">
                {product.images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    className={`thumb-button ${selectedImage === index ? "active" : ""}`}
                    onClick={() => setSelectedImage(index)}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img src={image} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="product-info">
            <p className="details-category">
              {product.category} · {product.material}
            </p>

            <h1>{product.name}</h1>

            <div className="product-rating-block">
              <span className="stars">★★★★★</span>
              <span className="review-text">
                {product.rating} · {product.reviews} reviews
              </span>
            </div>

            <p className="product-price">${product.price}</p>

            <p className="product-description">{product.description}</p>

            <div className="product-finish-row">
              <span>Finish</span>
              <strong>{product.detail}</strong>
            </div>

            <div className="product-qty-row">
              <div className="quantity-block">
                <label>Quantity</label>
                <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
              </div>

              <p className="stock-note">● In stock · ready for your home</p>
            </div>

            <button
              type="button"
              className="primary-cart-button"
              onClick={handleAddToCart}
            >
              Add to Cart — ${product.price * quantity}
            </button>

            <button
              type="button"
              className={`wishlist-button ${isSaved ? "saved" : ""}`}
              onClick={() => toggleWishlist(product.id)}
            >
              {isSaved ? "♥ Saved to Wishlist" : "♡ Add to Wishlist"}
            </button>

            <p className="shipping-line">
              Free shipping · Dispatches in 2–3 business days
            </p>

            <div className="details-box">
              <strong>Details & dimensions</strong>
              <p>
                {product.id === "rattan-table-lamp"
                  ? "32 cm wide × 48 cm high · E27 bulb, sold separately"
                  : `${product.detail} · Thoughtfully made for everyday living`}
              </p>
            </div>
          </div>
        </div>

        <section className="related-section">
          <div className="related-header">
            <h2>You may also love</h2>
            <p>A few finishing touches for a softer space.</p>
          </div>

          <div className="related-grid">
            {related.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProductDetails;