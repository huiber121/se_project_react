import { useContext, useState } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import "./ToggleSwitch.css";

export default function ToggleSwitch() {
  const { handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  const [isMoving, setIsMoving] = useState(false);

  const handleChange = (e) => {
    setIsMoving(true);
    handleToggleSwitchChange(e);

    // Remove the moving state after animation duration (adjust based on your CSS transition time)
    setTimeout(() => {
      setIsMoving(false);
    }, 300);
  };

  return (
    <label className={`toggle-switch ${isMoving ? "moving" : ""}`}>
      <input
        onChange={handleChange}
        type="checkbox"
        className="toggle-switch__checkbox"
      />
      <span className="toggle-switch__circle"></span>
      <span className="toggle-switch__text toggle-switch__text_F">F</span>
      <span className="toggle-switch__text toggle-switch__text_C">C</span>
    </label>
  );
}
