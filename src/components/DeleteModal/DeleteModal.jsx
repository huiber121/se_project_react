import "./DeleteModal.css";
import closeBtn from "../../assets/modal_close_grey.png";

export default function DeleteModal({
  isOpen,
  handleCloseModal,
  handleDelete,
}) {
  return (
    <div className={`modal ${isOpen && "modal__opened"}`}>
      <div className="modal__content modal__content_delete">
        <button type="button" className="modal__close modal__close_delete">
          <img
            src={closeBtn}
            alt="close button"
            className="modal__close-btn_image"
            onClick={handleCloseModal}
          />
        </button>
        <p className="modal__text_delete">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <button
          type="button"
          className="modal__button modal__button_delete"
          onClick={handleDelete}
        >
          Yes, delete item
        </button>
        <button
          type="button"
          className="modal__button modal__button_cancel"
          onClick={handleCloseModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
