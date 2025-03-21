import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/user_avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <Link to="/se_project_react/">
        <img className="header__logo" src={logo} alt="app logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>
      <Link to="/se_project_react/profile" className="header__user">
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="default user" className="header__avatar" />
        </div>
      </Link>
    </header>
  );
}

export default Header;
