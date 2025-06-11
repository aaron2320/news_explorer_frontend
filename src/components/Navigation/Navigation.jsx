import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import logoutIcon from "../../assets/logout.svg";
import mobileMenuIcon from "../../assets/images/mobile-icon-white.svg";
import mobileMenuIconBlack from "../../assets/images/mobile-icon-black.svg";
import MobileModal from "../MobileMenu/MobileModal";

function Navigation({
  onLoginClick,
  onLogout,
  onRegisterClick,
  currentPath,
  isLoggedIn,
  userName = "Test",
}) {
  // State to track if mobile modal is open
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  // State to track if we're in mobile view
  const [isMobileView, setIsMobileView] = useState(false);

  // Update isMobileView based on window width
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth <= 580);
    };

    // Initial check
    checkScreenSize();

    // Set up event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Clean up
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Function to toggle mobile modal
  const toggleMobileModal = () => {
    setIsMobileModalOpen(!isMobileModalOpen);
  };

  // Function to close mobile modal
  const closeMobileModal = () => {
    setIsMobileModalOpen(false);
  };

  // Determine if we're on the saved articles page
  const isSavedArticlesPage = currentPath === "/saved-news";

  return (
    <nav
      className={`navigation ${
        isSavedArticlesPage ? "navigation--saved-articles" : ""
      } ${isMobileModalOpen && isMobileView ? "navigation--mobile-open" : ""}`}
    >
      <div className="navigation__left">
        <Link to="/" className="navigation__logo">
          NewsExplorer
        </Link>
      </div>

      {/* Mobile menu button - toggles between hamburger and close icons */}
      <button
        className={`navigation__mobile-menu ${
          isMobileModalOpen ? "navigation__mobile-menu--open" : ""
        }`}
        onClick={toggleMobileModal}
      >
        {isMobileModalOpen ? (
          <span className="navigation__close-icon"></span>
        ) : (
          <img
            src={isSavedArticlesPage ? mobileMenuIconBlack : mobileMenuIcon}
            alt="Menu"
          />
        )}
      </button>

      {/* Regular desktop navigation */}
      <div className="navigation__right">
        <div className="navigation__links">
          <Link
            to="/"
            className={`navigation__link ${
              currentPath === "/" ? "navigation__link_active" : ""
            }`}
          >
            Home
          </Link>
          {isLoggedIn && (
            <Link
              to="/saved-news"
              className={`navigation__link navigation__link--saved ${
                currentPath === "/saved-news" ? "navigation__link_active" : ""
              }`}
            >
              Saved articles
            </Link>
          )}
        </div>
        <div className="navigation__buttons">
          {!isLoggedIn ? (
            <button
              className="navigation__button navigation__button_type_login"
              onClick={onLoginClick}
            >
              Sign in
            </button>
          ) : (
            <button
              className="navigation__button navigation__button_type_logout"
              onClick={onLogout}
            >
              <span className="navigation__username">{userName}</span>
              <img
                src={logoutIcon}
                alt="Logout"
                className="navigation__logout-icon"
              />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Modal */}
      <MobileModal
        isOpen={isMobileModalOpen}
        onClose={closeMobileModal}
        onLoginClick={onLoginClick}
        isLoggedIn={isLoggedIn}
        onLogout={onLogout}
        userName={userName}
      />
    </nav>
  );
}

export default Navigation;
