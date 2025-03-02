import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
// props-weatherData for filering card content
function Main({ weatherData, handlePreview }) {
  return (
    <main>
      <WeatherCard weatherData={weatherData}/>
      <section className="cards">
        <p className="card__text">
          Today is {weatherData.temp.F}&deg; F / You may want to wear:
        </p>
        <ul className="cards__list">
          {/* filtering item by type */}
          {defaultClothingItems
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
