import "./Header.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import logo from "../../assets/Logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import ProtectedRoute from "../../utils/ProtectedRoute";

function Header({
  handleAddClick,
  weatherData,
  handleRegisterModal,
  handleLoginModal,
  isLoggedIn,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const currentUser = useContext(CurrentUserContext);
  const [imageError, setImageError] = useState(false);
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="app logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {isLoggedIn ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__user">
            <div className="header__user-container">
              <p className="header__username">{currentUser.username}</p>
              {currentUser.avatar && !imageError ? (
                <img
                  src={currentUser.avatar}
                  alt="User Avatar"
                  className="header__avatar-img"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="header__avatar-fallback">
                  {currentUser.username
                    ? currentUser.username.charAt(0).toUpperCase()
                    : "?"}
                </div>
              )}
            </div>
          </Link>
        </>
      ) : (
        <div>
          <button
            onClick={handleRegisterModal}
            type="button"
            className="header__register-btn"
          >
            Sign Up
          </button>
          <button
            onClick={handleLoginModal}
            type="button"
            className="header__login-btn"
          >
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
