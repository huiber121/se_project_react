import "./WeatherCard.css";
import {
  weatherConditions,
  weatherDefaultConditions,
} from "../../utils/constants/";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import { useContext } from "react";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const weatherCondtion = weatherConditions.filter((condition) => {
    return (
      condition.day === weatherData.isDay &&
      condition.condition === weatherData.condition
    );
  });
  //putting a question mark ? chain will prevent unexpected error
  const filteredCondition =
    weatherCondtion[0] ||
    weatherDefaultConditions.filter((condition) => {
      return condition.day === weatherData.isDay;
    })[0];

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]}&deg; {currentTemperatureUnit}
      </p>
      <img
        src={filteredCondition?.url}
        alt={`Currently at ${filteredCondition?.day ? "day" : "night"} with ${
          filteredCondition?.condition || weatherData.condition
        } weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
