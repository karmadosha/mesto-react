import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';

function App() {
  const[isProfileEditPopupOpen, setProfileEditPopupOpen] = React.useState(false);
  const[isAddNewcardPopupOpen, setNewcardPopupOpen] = React.useState(false);
  const[isAvatarEditPopupOPen, setAvatarEditPopupOpen] = React.useState(false);
  const[selectedCard, setSelectedCard] = React.useState(null);
  const[isImagePopupOpen, setImagePopupOpen] = React.useState(false);

  function handleEditAvatarClick() {
    setAvatarEditPopupOpen(true);
    }

  function handleEditProfileClick() {
    setProfileEditPopupOpen(true);
  }

  function handleAddNewCardClick() {
    setNewcardPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function closeAllPopups() {
    setProfileEditPopupOpen(false);
    setNewcardPopupOpen(false);
    setAvatarEditPopupOpen(false);
    setImagePopupOpen(false);
  }  

  return (
    <div className="page">      
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddNewCard={handleAddNewCardClick}
        onCardClick={handleCardClick}
      />  
      <Footer />
      <PopupWithForm
        name='profile'
        title='Редактировать профиль'
        isOpen={isProfileEditPopupOpen}
        onClose={closeAllPopups}
        submitText='Сохранить'
        children={
          <>
            <label className="form__field">
              <input
               className="form__item form__item_user_name" 
               type="text" 
               id="name" 
               name="name" 
               placeholder="Имя" 
               minLength="2" 
               maxLength="40" 
               required={true} />
              <span className="form__error" id="name-error"></span>
            </label>
            <label className="form__field">
              <input
               className="form__item form__item_user_about" 
               type="text" 
               id="about" 
               name="about" 
               placeholder="О себе" 
               minLength="2" 
               maxLength="200" 
               required={true} />
              <span className="form__error" id="about-error"></span>
            </label>
          </>
        }
      />
      <PopupWithForm
        name='new-card'
        title='Новое место'
        isOpen={isAddNewcardPopupOpen}
        onClose={closeAllPopups}
        submitText='Создать'
        children={
          <>
            <label className="form__field">
              <input
               className="form__item form__item_card_name" 
               type="text" 
               id="place" 
               name="name" 
               placeholder="Название" 
               minLength="2" 
               maxLength="30" 
               required={true} />
              <span className="form__error form__error_field_place" id="place-error"></span>
            </label>
            <label className="form__field">
              <input
               className="form__item form__item_card_about" 
               type="url" 
               id="link" 
               name="link" 
               placeholder="Ссылка на картинку" 
               minLength="2" 
               required={true} />
              <span className="form__error form__error_field_link" id="link-error"></span>
            </label>
          </>            
        }
      />
      <PopupWithForm
        name='avatar-edit'
        title='Обновить аватар'
        isOpen={isAvatarEditPopupOPen}
        onClose={closeAllPopups}
        submitText='Сохранить'
        children={
          <>
            <input
             className="form__item form__item_avatar-url" 
             type="url" 
             id="avatar" 
             name="link" 
             placeholder="Ссылка на фотографию" 
             required />
            <span className="form__error form__error_field_avatar" id="avatar-error"></span>
          </>
        }      
      />      

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}        
      />
    </div>
  )
}   

export default App;