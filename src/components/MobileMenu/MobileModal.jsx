import React from "react";
import { Link } from "react-router-dom";
import "./MobileModal.css";

function MobileModal({
  isOpen,
  onClose,
  onLoginClick,
  isLoggedIn,
  onLogout,
  userName,
}) {
  if (!isOpen) return null;

  // Handle clicking on the overlay to close the modal
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("mobile-modal")) {
      onClose();
    }
  };

  // Handle sign in button click
  const handleSignInClick = () => {
    onClose(); // Close the mobile modal
    onLoginClick(); // Show the login modal
  };

  // Handle home link click
  const handleHomeClick = () => {
    onClose(); // Close the mobile modal
  };

  // Handle saved articles link click
  const handleSavedArticlesClick = () => {
    onClose(); // Close the mobile modal
  };

  // Handle logout click
  const handleLogoutClick = () => {
    onClose(); // Close the mobile modal
    onLogout(); // Perform logout
  };

  return (
    <div
      className="mobile-modal mobile-modal_opened"
      onClick={handleOverlayClick}
    >
      {/* The modal content is not darkened - it maintains its solid #1A1B22 color */}
      <div className="mobile-modal__content">
        <Link
          to="/"
          className="mobile-modal__home-link"
          onClick={handleHomeClick}
        >
          Home
        </Link>

        {isLoggedIn && (
          <Link
            to="/saved-news"
            className="mobile-modal__saved-link"
            onClick={handleSavedArticlesClick}
          >
            Saved articles
          </Link>
        )}

        {isLoggedIn ? (
          <button
            className="mobile-modal__logout-button"
            onClick={handleLogoutClick}
          >
            Log out
          </button>
        ) : (
          <button
            className="mobile-modal__signin-button"
            onClick={handleSignInClick}
          >
            Sign in
          </button>
        )}
      </div>
    </div>
  );
}

export default MobileModal;
