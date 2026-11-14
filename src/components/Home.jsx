import { Link } from "react-router-dom";
import "./Home.css";

function ProductCard({ product, wishlist, toggleWishlist, addToCart }) {
  const saved = wishlist.includes(product.id);

  return (
    <article className="home-product-card">
      <div className="home-product-image-wrap">
        <Link to={`/product/${product.slug}`} aria-label={`View ${product.name}`}>
          <img src={product.image} alt={product.name} />
        </Link>

        <button
          type="button"
          className={`home-wishlist-button ${saved ? "saved" : ""}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
        >
          {saved ? "♥" : "♡"}
        </button>
      </div>

      <div className="home-product-body">
        <div className="home-product-title-row">
          <Link to={`/product/${product.slug}`} className="home-product-name">
            {product.name}
          </Link>
          <span className="home-product-price">${product.price}</span>
        </div>

        <p className="home-product-meta">
          {product.category} · {product.detail}
        </p>

        <button
          type="button"
          className="home-add-button"
          onClick={() => addToCart(product.id, 1)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

function Home({ products, wishlist, toggleWishlist, addToCart }) {
  const favorites = products.filter((product) => product.featured).slice(0, 4);

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="home-eyebrow">A SOFTER KIND OF HOME</p>

          <h1>
            Cozy home decor
            <br />
            for rooms you love
          </h1>

          <p className="home-hero-text">
            Discover thoughtfully curated candles, cushions,
            lamps, and plants to create your calm, cozy space.
          </p>

          <Link to="/shop" className="home-primary-button">
            Explore the collection
          </Link>
        </div>
      </section>

      <section className="home-favorites">
        <div className="home-section-heading">
          <h2>Shop Our Favorites</h2>
        </div>

        <div className="home-product-grid">
          {favorites.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
            />
          ))}
        </div>

        <div className="home-view-more">
          <Link to="/shop">Continue exploring the collection →</Link>
        </div>
      </section>

      <div className="home-soft-banner">
        <span>A home you love, one thoughtful piece at a time.</span>
        <Link to="/shop">Continue exploring the collection →</Link>
      </div>
    </div>
  );
}

export default Home;