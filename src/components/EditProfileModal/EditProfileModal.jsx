import "./EditProfileModal.css";
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

export default function EditProfileModal({ isOpen, handleCloseModal, handleEdit }) {
  const currentUser = useContext(CurrentUserContext);
  const [data, setData] = useState({
    name: currentUser.username || "",
    avatar: currentUser.avatar || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isEditValid = () => {
    const { name, avatar } = data;
    return name.length > 0 && avatar.length > 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit(data);
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      handleCloseModal={handleCloseModal}
      isOpen={isOpen}
      isEditValid={isEditValid()}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name-edit" className="modal__label">
        Name {"*"}
        <input
          type="text"
          className="modal__input"
          id="name-edit"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={data.name}
          required
          minLength={2}
          maxLength={40}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar {"*"}
        <input
          type="url"
          className="modal__input"
          id="avatar"
          name="avatar"
          placeholder="Avatar URL"
          onChange={handleChange}
          value={data.avatar}
          required
        />
      </label>
    </ModalWithForm>
  );
}
