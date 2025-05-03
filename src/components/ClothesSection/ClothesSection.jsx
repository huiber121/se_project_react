import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

export default function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  handleCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="cloths-section">
      <div className="cloths-section__header">
        <p className="cloths-section__header_title">Your Items</p>
        <button
          className="cloths-section__header_button"
          onClick={handleAddClick}
        >
          + Add new
        </button>
      </div>
      <ul className="cloths-section__cloths_list">
        {/* filtering item by type */}
        {clothingItems.map((item) => {
          if (item.owner !== currentUser.id) {
            return null;
          } else {
            return (
              <ItemCard key={item._id} item={item} onCardClick={onCardClick} handleCardLike={handleCardLike} />
            );
          }
        })}
      </ul>
    </div>
  );
}
