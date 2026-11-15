import { Link } from "react-router-dom";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="about-page">
      <div className="about-inner">
        <p className="about-breadcrumbs">
          <Link to="/">Home</Link> / About us
        </p>

        <section className="about-story-hero">
          <div className="about-story-copy">
            <p className="about-eyebrow">The Dream Room story</p>
            <h1>
              A calmer home.
              <br />
              A little more soul.
            </h1>

            <p className="about-story-text">
              We believe the loveliest rooms aren’t the most perfect ones.
              They’re the ones that feel like you.
            </p>

            <p className="about-body">
              Dream Room brings together cozy, thoughtfully chosen decor for life’s
              everyday moments. Soft textures, natural materials, and warm light —
              little things that make a space feel like home.
            </p>

            <Link to="/shop" className="about-primary-button">
              Explore the collection →
            </Link>
          </div>

          <img
            src="/images/about-bedroom.jpg"
            alt="Dream Room bedroom styling"
            className="about-hero-image"
          />
        </section>

        <section className="about-values">
          <h2>Good for your space. Gentler on our world.</h2>

          <div className="about-values-grid">
            <article>
              <span>01</span>
              <h3>Natural, by nature</h3>
              <p>
                We favor tactile, natural materials like linen, rattan, and wood —
                for their beauty and the way they age.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Less, but more meaningful</h3>
              <p>
                Considered shapes and timeless colours, chosen to belong in your home
                beyond a passing season.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Comfort in the everyday</h3>
              <p>
                A warm glow. A soft place to land. Simple pieces that make your daily
                rituals feel a little more special.
              </p>
            </article>
          </div>
        </section>

        <section className="about-mission">
          <img
            src="/images/artisan-pottery.jpg"
            alt="Artisan shaping clay on a pottery wheel"
          />

          <div className="about-mission-copy">
            <p className="about-eyebrow">Chosen with care</p>
            <h2>
              Made to be loved,
              <br />
              not just displayed.
            </h2>

            <p>
              Our mission is simple: to make cozy living feel considered and
              accessible. We look for lasting materials, honest textures, and
              pieces you’ll reach for again and again.
            </p>

            <Link to="/shop" className="about-mission-link">
              Find your next forever favorite →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;