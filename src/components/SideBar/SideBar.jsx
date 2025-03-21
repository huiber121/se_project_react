import "./SideBar.css";
import avatar from "../../assets/user_avatar.svg";

export default function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="userName" />
      <p className="sidebar__username">User Name</p>
    </div>
  );
}
