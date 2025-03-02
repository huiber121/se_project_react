import "./ModalWithForm.css";
import closeBtn from "../../assets/Union.png";

function ModalWithForm({
  children,
  title,
  buttonText,
  activeModal,
  handleCloseModal,
}) {
  return (
    <div
      className={`modal ${activeModal === "add-garment" && "modal__opened"}`}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button type="button" className="modal__close">
          <img
            src={closeBtn}
            alt="close button"
            className="modal__close-btn_image"
            onClick={handleCloseModal}
          />
        </button>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit-btn" disabled>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
