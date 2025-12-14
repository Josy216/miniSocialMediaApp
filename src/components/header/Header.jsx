import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const getAvatarUrl = (avatar) => {
    if (!avatar) return null;
    return avatar.startsWith("http")
      ? avatar
      : `http://localhost:3000${avatar}`;
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          MySocial
        </Link>

        <nav className="desktop-nav">
          <Link to="/">Home</Link>
          <Link to="/my-memes">My Post</Link>
        </nav>

        <div className="user-section">
          {user && user.username ? (
            <div className="user-information">
              {getAvatarUrl(user.avatar) ? (
                <img src={getAvatarUrl(user.avatar)} alt={user.username} />
              ) : (
                <div className="avatar-placeholder">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              )}
              <span>{user.username}</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Link to="/login">
              <button className="login-btn">Sign In</button>
            </Link>
          )}
        </div>

        <button
          className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
        <nav>
          <Link to="/" onClick={closeMobileMenu}>
            Home
          </Link>
          <Link to="/my-memes" onClick={closeMobileMenu}>
            My Post
          </Link>
        </nav>
        <div className="mobile-auth">
          {user && user.username ? (
            <>
              <div className="user-details">
                {getAvatarUrl(user.avatar) ? (
                  <img src={getAvatarUrl(user.avatar)} alt={user.username} />
                ) : (
                  <div className="mobile-avatar-placeholder">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                )}
                <span>{user.username}</span>
              </div>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={closeMobileMenu}>
              <button className="login-btn">Sign In</button>
            </Link>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="overlay" onClick={closeMobileMenu}></div>
      )}
    </header>
  );
}

export default Header;
