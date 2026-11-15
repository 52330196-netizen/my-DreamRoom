import { Link } from "react-router-dom";
import "./Wishlist.css";

function Wishlist({ products, wishlist, toggleWishlist, addToCart }) {
  const savedProducts = products.filter((product) =>
    wishlist.includes(product.id)
  );

  return (
    <div className="wishlist-page">
      <div className="wishlist-inner">
        <p className="wishlist-breadcrumbs">
          <Link to="/">Home</Link> / Wishlist
        </p>

        <header className="wishlist-header">
          <h1>Your little collection of lovely</h1>
          <p>
            {savedProducts.length} saved{" "}
            {savedProducts.length === 1 ? "piece" : "pieces"}, waiting to make
            themselves at home.
          </p>
        </header>

        {savedProducts.length > 0 ? (
          <div className="wishlist-grid">
            {savedProducts.map((product) => (
              <article key={product.id} className="wishlist-card">
                <Link
                  to={`/product/${product.slug}`}
                  className="wishlist-image-link"
                >
                  <img src={product.image} alt={product.name} />
                </Link>

                <div className="wishlist-card-body">
                  <div className="wishlist-card-header">
                    <Link
                      to={`/product/${product.slug}`}
                      className="wishlist-name"
                    >
                      {product.name}
                    </Link>
                    <span className="wishlist-price">${product.price}</span>
                  </div>

                  <p className="wishlist-detail">{product.detail}</p>
                  <p className="wishlist-stock">● In stock</p>

                  <button
                    type="button"
                    className="wishlist-cart-button"
                    onClick={() => addToCart(product.id, 1)}
                  >
                    Add to Cart
                  </button>

                  <button
                    type="button"
                    className="wishlist-remove-button"
                    onClick={() => toggleWishlist(product.id)}
                  >
                    Remove from wishlist
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="wishlist-empty">
            <p>Your wishlist is waiting for something lovely.</p>
            <Link to="/shop" className="wishlist-empty-button">
              Explore the collection
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;