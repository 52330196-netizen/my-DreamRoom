import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-promise-strip">
        <span>Free shipping on orders over $50</span>
        <span className="promise-dot" />
        <span>Thoughtfully chosen materials</span>
        <span className="promise-dot" />
        <span>A little comfort, every day</span>
      </div>

      <div className="footer-grid">
        <div className="footer-brand">
          <Link to="/" className="footer-brand-logo">
            <img
              src="/images/dream-room-logo.png"
              alt="Dream Room Logo"
              className="footer-logo"
            />
          </Link>

          <p>Make room for a slower, softer life.</p>
        </div>

        <div className="footer-column">
          <h3>Explore</h3>
          <ul>
            <li>
              <Link to="/shop">Shop the collection</Link>
            </li>
            <li>
              <Link to="/about">About us</Link>
            </li>
            <li>
              <Link to="/shop">New arrivals</Link>
            </li>
            <li>
              <Link to="/about">Our materials</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Here to help</h3>
          <ul>
            <li>
              <Link to="/about">Shipping & returns</Link>
            </li>
            <li>
              <Link to="/about">Contact us</Link>
            </li>
            <li>
              <Link to="/about">Care guide</Link>
            </li>
            <li>
              <Link to="/account">My account</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="site-footer-bottom">
        <p>© 2026 Dream Room. All rights reserved.</p>
        <div className="site-footer-links">
          <Link to="/about">Privacy policy</Link>
          <Link to="/about">Terms of service</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;