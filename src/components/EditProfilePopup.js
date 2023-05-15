import PopupWithForm from "./PopupWithForm";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen])

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleAboutChange(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      isOpen={props.isOpen}
      onClose={props.onClose}
      submitText='Сохранить'
      onSubmit={handleSubmit}
    >
      <input
        className="form__item form__item_user_name" 
        type="text" 
        id="name" 
        name="name" 
        placeholder="Имя" 
        minLength="2" 
        maxLength="40" 
        required={true}
        value={name || ''}
        onChange={handleNameChange} />
      <span className="form__error" id="name-error"></span>
              
      <input
        className="form__item form__item_user_about" 
        type="text" 
        id="about" 
        name="about" 
        placeholder="О себе" 
        minLength="2" 
        maxLength="200" 
        required={true}
        value={description || ''}
        onChange={handleAboutChange} />
      <span className="form__error" id="about-error" />
            
    </PopupWithForm>
  )
}

export default EditProfilePopup;

