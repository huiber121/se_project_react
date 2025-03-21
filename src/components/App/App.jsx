import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
//import { defaultClothingItems } from "../../utils/constants";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import DeleteModal from "../DeleteModal/DeleteModal";
import { getItems, addItem, deleteItem } from "../../utils/api";

function App() {
  //this hook filters the item content in the web. It will pass it to main section
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
  });
  const [clothingItems, setClothingItems] = useState([]);
  //this hook handles open/close for all modals.
  const [activeModal, setActiveModal] = useState("");
  //this hook passes card info for preview modal
  const [selectedCard, setSelectedCard] = useState({});
  //this hook handles converting temperature units
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleDeleteModal = () => {
    setActiveModal("delete");
  };

  const handleDelete = () => {
    deleteItem(selectedCard._id).then(() => {
      setClothingItems(clothingItems.filter((item) => item._id !== selectedCard._id));
      setSelectedCard({});
      handleClose();
    }
    ).catch
    (console.error);
  };

  const handleClose = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = (newItem) => {
    addItem(newItem).then((data) => {
      setClothingItems([data, ...clothingItems]);
    }).catch(console.error);
    handleClose();
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);
  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          {/* pass the userState/weatherData to the main for filtering */}
          {/* it depends how many props go in there. The parameter will be in the destructrued format at the component*/}
          <Routes>
            <Route
              // If setting a homepage route, look up base from the vite.config.js file, sometimes "/" is not the base
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handlePreview={handleCardClick}
                  clothingItems={[...clothingItems]}
                />
              }
            />
            <Route path="/profile" element={<Profile onCardClick={handleCardClick} clothingItems={[...clothingItems]}/> } />
          </Routes>
          <Footer />
          {/* generates add item modal */}
          <AddItemModal
            onAddItemModalSubmit={handleAddItemModalSubmit}
            handleCloseModal={handleClose}
            isOpen={activeModal === "add-garment"}
          />
          {/* generates card preivew modal */}
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            handleCloseModal={handleClose}
            handleDeleteModal={handleDeleteModal}
          />
          <DeleteModal
            isOpen={activeModal === "delete"}
            handleCloseModal={handleClose}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
