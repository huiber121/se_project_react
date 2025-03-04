import "./ItemModal.css";
import closeBtn from "../../assets/close_white.png";

function ItemModal({ activeModal, card, handleCloseModal }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button type="button" className="modal_close modal_close_preview">
          <img
            src={closeBtn}
            alt="close button"
            className="modal_close-btn_image"
            onClick={handleCloseModal}
          />
        </button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
