import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

export default function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  handleEditModal,
  handleCardLike,
  handleLogout,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar handleEditModal={handleEditModal} handleLogout={handleLogout}/>
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          handleCardLike={handleCardLike}
        />
      </section>
    </div>
  );
}
