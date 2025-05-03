import "./ModalWithForm.css";
import closeBtn from "../../assets/Union.png";

function ModalWithForm({
  children,
  title,
  buttonText,
  handleCloseModal,
  isOpen,
  onSubmit,
  switchToRegister,
  swtchToLogin,
  isRegisteredValid,
  isLoginValid,
  isAddItemValid,
  isEditValid
}) {
  return (
    <div className={`modal ${isOpen && "modal__opened"}`}>
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
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__buttons-container">
            {buttonText === "Next" ? (
              <button
                type="submit"
                className="modal__submit-btn"
                disabled={!isRegisteredValid}
              >
                {buttonText}
              </button>
            ) : buttonText === "Login" ? (
              <button
                type="submit"
                className="modal__submit-btn modal__submit-btn_login"
                disabled = {!isLoginValid}
              >
                {buttonText}
              </button>
            ) : buttonText === "Add garment" ? (
              <button
                type="submit"
                className="modal__submit-btn modal__submit-btn_add-garment"
                disabled={!isAddItemValid}
              >
                {buttonText}
              </button>
            ) : buttonText === "Save changes" ? (
              <button
                type="submit"
                className="modal__submit-btn modal__submit-btn_save-changes"
                disabled={!isEditValid}
              >
                {buttonText}
              </button>
            ) : null}
            {/* Switch between login and register */}
            {buttonText === "Next" ? (
              <button
                type="button"
                className="modal__login-btn"
                onClick={swtchToLogin}
              >
                or Log in
              </button>
            ) : buttonText === "Login" ? (
              <button
                type="button"
                className="modal__login-btn"
                onClick={switchToRegister}
              >
                or Register
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
