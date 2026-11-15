import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./Shop.css";

function ProductCard({ product, wishlist, toggleWishlist }) {
  const saved = wishlist.includes(product.id);

  return (
    <article className="shop-product-card">
      <div className="shop-product-image-wrap">
        <Link to={`/product/${product.slug}`} aria-label={`View ${product.name}`}>
          <img src={product.image} alt={product.name} />
        </Link>

        <button
          type="button"
          className={`shop-heart ${saved ? "saved" : ""}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
        >
          {saved ? "♥" : "♡"}
        </button>
      </div>

      <div className="shop-product-meta">
        <p className="shop-product-category">
          {product.category} · {product.detail}
        </p>
        <Link to={`/product/${product.slug}`} className="shop-product-name">
          {product.name}
        </Link>
        <p className="shop-product-price">${product.price}</p>
      </div>
    </article>
  );
}

function Shop({ products, categories, wishlist, toggleWishlist, addToCart }) {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("search") || "").trim().toLowerCase();

  const [category, setCategory] = useState("All Decor");
  const [priceRange, setPriceRange] = useState("any");
  const [materialFilter, setMaterialFilter] = useState("any");
  const [sortBy, setSortBy] = useState("featured");

  let filteredProducts = products.filter((product) => {
    const matchCategory =
      category === "All Decor" || product.category === category;

    const searchableText =
      `${product.name} ${product.category} ${product.material}`.toLowerCase();

    const matchQuery = !query || searchableText.includes(query);

    const matchPrice =
      priceRange === "any" ||
      (priceRange === "under-30" && product.price < 30) ||
      (priceRange === "30-50" &&
        product.price >= 30 &&
        product.price <= 50) ||
      (priceRange === "over-50" && product.price > 50);

    const matchMaterial =
      materialFilter === "any" ||
      product.material.toLowerCase().includes(materialFilter.toLowerCase());

    return matchCategory && matchQuery && matchPrice && matchMaterial;
  });

  if (sortBy === "low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "name") {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
    );
  }

  return (
    <div className="shop-page">
      <div className="shop-page-inner">
        <p className="shop-breadcrumbs">
          <Link to="/">Home</Link> / Shop
        </p>

        <header className="shop-header">
          <h1>Little things. A warmer home.</h1>
          <p>Thoughtfully curated pieces for your everyday sanctuary.</p>
        </header>

        <div className="shop-filter-row">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={`shop-category-button ${category === item ? "active" : ""}`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="shop-toolbar">
          <p className="shop-result-count">
            {filteredProducts.length} thoughtfully chosen{" "}
            {filteredProducts.length === 1 ? "piece" : "pieces"}
          </p>

          <div className="shop-controls">
            <select
              value={priceRange}
              onChange={(event) => setPriceRange(event.target.value)}
              aria-label="Filter by price"
            >
              <option value="any">Price range</option>
              <option value="under-30">Under $30</option>
              <option value="30-50">$30 - $50</option>
              <option value="over-50">Over $50</option>
            </select>

            <select
              value={materialFilter}
              onChange={(event) => setMaterialFilter(event.target.value)}
              aria-label="Filter by material"
            >
              <option value="any">Material</option>
              <option value="natural">Natural</option>
              <option value="linen">Linen</option>
              <option value="cotton">Cotton</option>
              <option value="stone">Stone</option>
              <option value="soy">Soy wax</option>
              <option value="ceramic">Ceramic</option>
            </select>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              aria-label="Sort products"
            >
              <option value="featured">Sort: Featured</option>
              <option value="low">Price: Low to high</option>
              <option value="high">Price: High to low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="shop-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="shop-empty">
            <p>No pieces match that combination. Try adjusting the filters.</p>
          </div>
        )}

        <p className="shop-footer-note">
          Showing all {filteredProducts.length} pieces, chosen with care.
        </p>
      </div>
    </div>
  );
}

export default Shop;