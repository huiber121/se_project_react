import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick =() =>{
    onCardClick(item);
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
    </div>
  );
}

export default ItemCard;
