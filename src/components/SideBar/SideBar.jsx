import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useState, useContext } from "react";

export default function SideBar({ handleEditModal, handleLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const [imageError, setImageError] = useState(false);
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        {currentUser.avatar && !imageError ? (
          <img
            src={currentUser.avatar}
            alt="User Avatar"
            className="sidebar__avatar-img"
            onError={() => setImageError(true)} // if image fails to load
          />
        ) : (
          <div className="sidebar__avatar-fallback">
            {currentUser.username
              ? currentUser.username.charAt(0).toUpperCase()
              : "?"}
          </div>
        )}
        <p className="sidebar__username">{currentUser.username}</p>
      </div>
      <div className="sidebar__buttons">
        <button
          onClick={handleEditModal}
          type="button"
          className="sidebar__edit-profile-button"
        >
          Change profile data
        </button>
        <button onClick={handleLogout} type="button" className="sidebar__logout-button">
          Log out
        </button>
      </div>
    </div>
  );
}
