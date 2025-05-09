import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

export default function AddItemModal({
  handleCloseModal,
  isOpen,
  onAddItemModalSubmit,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  useEffect(() => {
    setName("");
    setImageUrl("");
    setWeather("");
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({ name, imageUrl: imageUrl, weather });
  };

  const isAddItemFormValid = () => {
    return name.length > 0 && imageUrl.length > 0 && weather;
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      handleCloseModal={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isAddItemValid={isAddItemFormValid()}
    >
      <label htmlFor="name-add-garment" className="modal__label">
        Name{""}
        <input
          type="text"
          className="modal__input"
          id="name-add-garment"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={(e) => handleNameChange(e)}
          value={name}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{""}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          required
          onChange={(e) => handleImageUrlChange(e)}
          value={imageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio_input"
            name="weather"
            value="hot"
            onChange={(e) => handleWeatherChange(e)}
            checked={weather === "hot"}
          />
          <span className="modal__radio_ball" />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio_input"
            name="weather"
            value="warm"
            onChange={(e) => handleWeatherChange(e)}
            checked={weather === "warm"}
          />
          <span className="modal__radio_ball" />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio_input"
            name="weather"
            value="cold"
            onChange={(e) => handleWeatherChange(e)}
            checked={weather === "cold"}
          />
          <span className="modal__radio_ball" />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
