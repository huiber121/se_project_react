import "./Register.css";
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function RegisterModal({
  handleCloseModal,
  isOpen,
  handleLoginModal,
  handleRegistration,
}) {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const swtchToLogin = () => {
    handleCloseModal();
    handleLoginModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
  };

  const isRegisteredFormValid = () => {
    const { username, email, password, avatar } = data;
    return (
      username.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      avatar.length > 0
    );
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Next"
      handleCloseModal={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      swtchToLogin={swtchToLogin}
      isRegisteredValid={isRegisteredFormValid()}
    >
      <label htmlFor="email-register" className="modal__label">
        Email{"*"}
        <input
          type="email"
          className="modal__input"
          id="email-register"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="password-register" className="modal__label">
        Password{"*"}
        <input
          type="password"
          className="modal__input"
          id="password-register"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          minLength="2"
          maxLength="30"
          required
        />
      </label>
      <label htmlFor="name-register" className="modal__label">
        Name{""}
        <input
          type="text"
          className="modal__input"
          id="name-register"
          name="username"
          placeholder="Name"
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          value={data.username}
        />
      </label>
      <label htmlFor="avatarUrl" className="modal__label">
        Avatar{""}
        <input
          type="url"
          className="modal__input"
          id="avatarUrl"
          name="avatar"
          placeholder="Avatar URL"
          minLength="1"
          maxLength="200"
          onChange={handleChange}
          value={data.avatar}
        />
      </label>
    </ModalWithForm>
  );
}
