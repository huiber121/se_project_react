import "./Login.css";
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function LoginModal({
  isOpen,
  handleCloseModal,
  handleRegisterModal,
  handleLogin,
  loginError,
}) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const switchToRegister = () => {
    handleCloseModal();
    // Logic to open the register modal
    // This could be a function passed down as a prop or a context update
    // For example: openRegisterModal();
    handleRegisterModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data)
  };

  const isLoginFormValid = () => {
    const { email, password } = data;
    return email.length > 0 && password.length > 0;
  };

  return (
    <ModalWithForm
      title="Login"
      buttonText="Login"
      handleCloseModal={handleCloseModal}
      isOpen={isOpen}
      switchToRegister={switchToRegister}
      onSubmit={handleSubmit}
      isLoginValid={isLoginFormValid()}
    >
      <label htmlFor="email-login" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="email-login"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={data.email}
          required
        />
      </label>
      <label htmlFor="password" className="modal__label">
        {loginError? (
          <span className="modal__login_error">Incorrect password</span>
        ) : (
          "Password"
        )}
        <input
          type="password"
          className="modal__input"
          id="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={data.password}
          required
          minLength="2"
          maxLength="30"
        />
      </label>
    </ModalWithForm>
  );
}
