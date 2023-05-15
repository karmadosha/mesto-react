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
  const[isAvatarEditPopupOpen, setAvatarEditPopupOpen] = useState(false);
  const[selectedCard, setSelectedCard] = useState(null);
  const[isImagePopupOpen, setImagePopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((item) => item._id !== card._id));
    })
    .catch((err) => console.log(err))
    .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.editProfile(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => console.log(err))
    .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api.editAvatar(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => console.log(err))
    .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true);
    api.addNewCard(newCard)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => console.log(err))
    .finally(() => setIsLoading(false));
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

  const isOpen = isAvatarEditPopupOpen || isEditProfilePopupOpen || isAddNewcardPopupOpen || isImagePopupOpen;

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) { 
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
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
          isLoading={isLoading}
          onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup 
            isOpen={isAddNewcardPopupOpen}
            onClose={closeAllPopups}
            isLoading={isLoading}
            onAddPlace={handleAddPlaceSubmit} />

          <EditAvatarPopup
            isOpen={isAvatarEditPopupOpen}
            onClose={closeAllPopups}
            isLoading={isLoading}
            onUpdateAvatar={handleUpdateAvatar}
          />      

          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            isLoading={isLoading}
            onClose={closeAllPopups}        
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
    )
  }   

export default App;