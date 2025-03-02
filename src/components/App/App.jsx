import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";

function App() {
  //this hook filters the item content in the web. It will pass it to main section
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
    condition: "",
  });
  //this hook handles open/close for all modals.
  const [activeModal, setActiveModal] = useState("");
  //this hook passes card info for preview modal
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleClose = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);
  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        {/* pass the userState/weatherData to the main for filtering */}
        {/* it depends how many props go in there. The parameter will be in the destructrued format at the component*/}
        <Main weatherData={weatherData} handlePreview={handleCardClick} />
        <Footer />
        {/* generates add item modal */}
        <ModalWithForm
          title="New garment"
          buttonText="Add garment"
          activeModal={activeModal}
          handleCloseModal={handleClose}
        >
          <label htmlFor="name" className="modal__label">
            Name{""}
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
            />
          </label>
          <label htmlFor="imageUrl" className="modal__label">
            Image{""}
            <input
              type="link"
              className="modal__input"
              id="imageUrl"
              placeholder="Image URL"
            />
          </label>
          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the weather type:</legend>
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="hot"
                type="radio"
                className="modal__radio_input"
                name="weather"
              />
              <span className="modal__radio_ball" />
              {"Hot"}
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="warm"
                type="radio"
                className="modal__radio_input"
                name="weather"
              />
              <span className="modal__radio_ball" />
              Warm
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="cold"
                type="radio"
                className="modal__radio_input"
                name="weather"
              />
              <span className="modal__radio_ball" />
              Cold
            </label>
          </fieldset>
        </ModalWithForm>
        {/* generates card preivew modal */}
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          handleCloseModal={handleClose}
        />
      </div>
    </div>
  );
}

export default App;
