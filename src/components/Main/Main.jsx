import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import { useContext } from "react";
// props-weatherData for filering card content
function Main({ weatherData, handlePreview, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <main>
      <WeatherCard weatherData={weatherData}/>
      <section className="cards">
        <p className="card__text">
          Today is {weatherData.temp[currentTemperatureUnit]}&deg; {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {/* filtering item by type */}
          {clothingItems
            .filter((item) => {
              if (weatherData.type) {
                return item.weather === weatherData.type;
              } else {
                return true;
              }
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handlePreview}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
