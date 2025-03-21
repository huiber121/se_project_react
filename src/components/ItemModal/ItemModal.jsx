import "./ItemModal.css";
import closeBtn from "../../assets/close_white.png";

function ItemModal({ isOpen, card, handleCloseModal, handleDeleteModal }) {
  return (
    <div className={`modal ${isOpen && "modal__opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button type="button" className="modal__close modal__close_preview">
          <img
            src={closeBtn}
            alt="close button"
            className="modal__close-btn_image"
            onClick={handleCloseModal}
          />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <section className="modal__footer_info">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </section>
          <button
            type="button"
            className="modal__delete_button"
            onClick={handleDeleteModal}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
