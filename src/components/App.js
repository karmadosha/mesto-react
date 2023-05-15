import { useEffect, useState } from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import api from '../utils/Api';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const[isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const[isAddNewcardPopupOpen, setNewcardPopupOpen] = useState(false);
  const[isAvatarEditPopupOPen, setAvatarEditPopupOpen] = useState(false);
  const[selectedCard, setSelectedCard] = useState(null);
  const[isImagePopupOpen, setImagePopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards()
    ])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => console.log(err))
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      return setCards(cards.filter((c) => c._id !== card._id));
    })
    .catch((err) => console.log(err));
  }

  function handleUpdateUser(data) {
    api.editProfile(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api.editAvatar(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(newCard) {
    api.addNewCard(newCard)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  function handleEditAvatarClick() {
    setAvatarEditPopupOpen(true);
    }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddNewCardClick() {
    setNewcardPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }
  

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setNewcardPopupOpen(false);
    setAvatarEditPopupOpen(false);
    setImagePopupOpen(false);
  }  

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">      
        <Header />
        <Main
          cards={cards}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddNewCard={handleAddNewCardClick}
          onCardClick={handleCardClick}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
        />  
        <Footer />
        <EditProfilePopup
         isOpen={isEditProfilePopupOpen} 
         onClose={closeAllPopups} 
         onUpdateUser={handleUpdateUser}
         />
        <AddPlacePopup 
          isOpen={isAddNewcardPopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} />

        <EditAvatarPopup
          isOpen={isAvatarEditPopupOPen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />      

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}        
        />
      </div>
    </CurrentUserContext.Provider>
    )
  }   

export default App;