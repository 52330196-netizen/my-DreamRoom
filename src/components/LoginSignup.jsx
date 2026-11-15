import { useState } from "react";
import "./LoginSignup.css";

function LoginSignup() {
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [loginMessage, setLoginMessage] = useState("");
  const [signupMessage, setSignupMessage] = useState("");

  function handleLoginSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("login-email") || "").trim();
    const password = String(formData.get("login-password") || "");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setLoginMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setLoginMessage("Password must contain at least 8 characters.");
      return;
    }

    setLoginMessage("Demo form validated. Authentication is not connected.");
  }

  function handleSignupSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get("signup-name") || "").trim();
    const email = String(formData.get("signup-email") || "").trim();
    const password = String(formData.get("signup-password") || "");

    if (!fullName) {
      setSignupMessage("Please enter your full name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSignupMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setSignupMessage("Use at least 8 characters for your password.");
      return;
    }

    setSignupMessage("Demo form validated. No account or password has been stored.");
  }

  return (
    <div className="login-page">
      <div className="login-layout">
        <div className="login-image-card">
          <img src="/images/account-bedroom.jpg" alt="Warm bedroom interior" />
          <div className="login-image-caption">
            <h2>Your space. Your story.</h2>
            <p>
              A few lovely things. A little more you.
              <br />
              Make a home that feels like coming home.
            </p>
          </div>
        </div>

        <div className="login-forms">
          <header className="login-header">
            <h1>Make yourself at home</h1>
            <p>
              A place for your favourite pieces, and your next little inspiration.
            </p>
          </header>

          <div className="login-columns">
            <form className="auth-card" onSubmit={handleLoginSubmit}>
              <h2>Welcome back</h2>
              <p>Log in to your Dream Room account.</p>

              <label>
                Email address
                <input
                  type="email"
                  name="login-email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </label>

              <label>
                Password
                <div className="password-wrap">
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    name="login-password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    minLength="8"
                    required
                  />
                  <button
                    type="button"
                    className="show-hide-button"
                    onClick={() => setShowLoginPassword((value) => !value)}
                  >
                    {showLoginPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </label>

              <div className="remember-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                  />
                  Remember me
                </label>

                <button
                  type="button"
                  className="text-button"
                  onClick={() =>
                    setLoginMessage(
                      "Password reset is not connected in this demo."
                    )
                  }
                >
                  Forgot password?
                </button>
              </div>

              <button type="submit" className="primary-submit-button">
                Log In
              </button>

              {loginMessage && <p className="message-box">{loginMessage}</p>}

              <p className="login-footnote">Your cozy corner is just one step away.</p>
            </form>

            <form className="auth-card signup-card" onSubmit={handleSignupSubmit}>
              <h2>New here?</h2>
              <p>Create an account and settle in.</p>

              <label>
                Full name
                <input
                  type="text"
                  name="signup-name"
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
              </label>

              <label>
                Email address
                <input
                  type="email"
                  name="signup-email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </label>

              <label>
                Password
                <div className="password-wrap">
                  <input
                    type={showSignupPassword ? "text" : "password"}
                    name="signup-password"
                    placeholder="Create a password"
                    autoComplete="new-password"
                    minLength="8"
                    required
                  />
                  <button
                    type="button"
                    className="show-hide-button"
                    onClick={() => setShowSignupPassword((value) => !value)}
                  >
                    {showSignupPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <small>Use at least 8 characters.</small>
              </label>

              <button type="submit" className="primary-submit-button">
                Create Account
              </button>

              {signupMessage && <p className="message-box">{signupMessage}</p>}

              <p className="signup-footnote">
                By joining, you agree to our Terms &amp; Privacy Policy.
              </p>
            </form>
          </div>

          <p className="demo-warning">
            Frontend demonstration only. Don’t enter a real password.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;