import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, handleCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwner = item.owner === currentUser.id;
  // Check if the current user is in the likes array
  const isLiked = item.likes.some((id) => id === currentUser.id);
  // Create a variable which you then set in `className` for the like button
  const likeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;
  const handleCardClick = () => {
    onCardClick(item);
  };

  function handleLike() {
    // onCardLike(item, isLiked);
    handleCardLike({
      id: item._id,
      isLiked: isLiked,
    });
  }
  return (
    <div className="card">
      <h2 className="card-name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="card-image"
      />
      {isOwner && (
        <button
          type="button"
          className={likeButtonClassName}
          onClick={handleLike}
        />
      )}
    </div>
  );
}

export default ItemCard;
