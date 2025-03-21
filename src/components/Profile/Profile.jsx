import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothsSection from "../ClothsSection/ClothsSection";

export default function Profile({onCardClick}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-items">
        <ClothsSection onCardClick={onCardClick}/>
      </section>
    </div>
  );
}
