import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

export default function ClothesSection({onCardClick , clothingItems}) {
  return (
    <div className="cloths-section">
      <div className="cloths-section__header">
        <p className="cloths-section__header_title">Your Items</p>
        <button className="cloths-section__header_button">+ Add new</button>
      </div>
      <ul className="cloths-section__cloths_list">
        {/* filtering item by type */}
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}
