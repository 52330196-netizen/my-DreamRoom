import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar({ cart, wishlist }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  function handleSearch(event) {
    event.preventDefault();

    const value = searchText.trim();
    navigate(`/shop${value ? `?search=${encodeURIComponent(value)}` : ""}`);

    setIsSearchOpen(false);
    setSearchText("");
  }

  return (
    <header className="site-header">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <img
            src="/images/dream-room-logo.png"
            alt="Dream Room Logo"
            className="navbar-logo"
          />
        </Link>

        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/shop">Shop</NavLink>

          <NavLink to="/wishlist" className="wishlist-link">
            <span className="wishlist-symbol">♡</span>
            Wishlist
            {wishlistCount > 0 && (
              <span className="nav-count">{wishlistCount}</span>
            )}
          </NavLink>
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="nav-icon-button"
            aria-label="Search products"
            onClick={() => setIsSearchOpen((value) => !value)}
          >
            ⌕
          </button>

          <Link to="/account" className="nav-icon-button" aria-label="Account">
            ☻
          </Link>

          <Link
            to="/cart"
            className="nav-icon-button nav-cart-button"
            aria-label="Shopping cart"
          >
            ◌
            {cartCount > 0 && <span className="nav-count">{cartCount}</span>}
          </Link>
        </div>
      </div>

      {isSearchOpen && (
        <div className="nav-search-wrap">
          <form onSubmit={handleSearch} className="nav-search-form">
            <input
              type="text"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search the collection"
              aria-label="Search products"
            />
            <button type="submit" className="nav-search-button">
              Search
            </button>
          </form>
        </div>
      )}
    </header>
  );
}

export default Navbar;