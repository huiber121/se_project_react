import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import DeleteModal from "../DeleteModal/DeleteModal";
import RegisterModal from "../RegisterModal/Register";
import LoginModal from "../LoginModal/Login";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import * as auth from "../../utils/auth";
import {
  getItems,
  addItem,
  deleteItem,
  getUserInfo,
  updateUserInfo,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { getToken, setToken, removeToken } from "../../utils/token";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    avatar: "",
    id: "",
  });
  //this hook filters the item content in the web. It will pass it to main section
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //this hook handles the weather data. It will pass it to header and main section
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
  });
  const [loginError, setLoginError] = useState(false);
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

  const handleRegisterModal = () => {
    setActiveModal("register");
  };

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const handleEditModal = () => {
    setActiveModal("edit-profile");
  };

  const handleClose = () => {
    setActiveModal("");
  };

  const handleRegisteration = ({ username, email, password, avatar }) => {
    auth
      .register(email, password, username, avatar)
      .then(() => {
        // TODO: handle succesful registration
        handleLogin({ email, password }); // log the user in after registration
        handleClose();
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data) {
          setToken(data.token);
          const jwt = getToken();
          if (!jwt) {
            return;
          }
          // TODO - handle JWT
          getUserInfo(jwt)
            .then((data) => {
              setIsLoggedIn(true);
              setUserData({
                email: data.email,
                username: data.name,
                avatar: data.avatar,
                id: data._id,
              });
            })
            .catch(console.error);
          setIsLoggedIn(true); // log the user in
          const redirectPath = location.state?.from?.pathname || "/";
          navigate(redirectPath);
          handleClose();
        }
      })
      .catch(
        // try parsing the error message
        setLoginError(true)
      );
  };

  const handleLogout = () => {
    removeToken(); // remove the token from local storage
    setIsLoggedIn(false);
    setUserData({ email: "", username: "", avatar: "", id: "" });
    setLoginError(false);
    navigate("/"); // redirect to the home page
  };

  const handleEdit = ({ name, avatar }) => {
    updateUserInfo({ name, avatar })
      .then((data) => {
        setUserData({
          username: data.name,
          avatar: data.avatar,
        });
        handleClose();
      })
      .catch(console.error);
  };

  const handleDelete = () => {
    deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== selectedCard._id)
        );
        setSelectedCard({});
        handleClose();
      })
      .catch(console.error);
  };

  const handleAddItemModalSubmit = (newItem) => {
    addItem(newItem)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        handleClose();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
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
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    // TODO - handle JWT
    getUserInfo(jwt)
      .then(({ email, name, avatar, _id }) => {
        setIsLoggedIn(true);
        setUserData({ email: email, username: name, avatar: avatar, id: _id });
      })
      .catch(console.error);
  }, []);
  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={userData}>
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleRegisterModal={handleRegisterModal}
              handleLoginModal={handleLoginModal}
              isLoggedIn={isLoggedIn}
            />
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
                    handleCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    onCardClick={handleCardClick}
                    clothingItems={[...clothingItems]}
                    handleAddClick={handleAddClick}
                    handleEditModal={handleEditModal}
                    handleCardLike={handleCardLike}
                    handleLogout={handleLogout}
                  />
                }
              />
            </Routes>
            <Footer />
            {/* generates register modal */}
            <RegisterModal
              isOpen={activeModal === "register"}
              handleCloseModal={handleClose}
              handleLoginModal={handleLoginModal}
              handleRegistration={handleRegisteration}
            />
            {/* generates login modal */}
            <LoginModal
              isOpen={activeModal === "login"}
              handleCloseModal={handleClose}
              handleRegisterModal={handleRegisterModal}
              handleLogin={handleLogin}
              loginError={loginError}
            />
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
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              handleEdit={handleEdit}
              handleCloseModal={handleClose}
            />
          </div>
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
