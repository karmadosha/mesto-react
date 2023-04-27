import React, { useState, useEffect } from "react";
import Card from "./Card";
import api from "../utils/Api";

function Main(props) {
  const [userAvatar, setUserAvatar] = useState('');
  const [userName, setUserName] = useState('');
  const [userAbout, setUserAbout] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards()
    ])
      .then(([userData, cardsData]) => {
        setUserAvatar(userData.avatar);
        setUserName(userData.name);
        setUserAbout(userData.about);
        setCards(cardsData);
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__personal">
          <button
           className="profile__edit-avatar-btn" 
           onClick={props.onEditAvatar}>
            <img
              className="profile__avatar" 
              src={userAvatar} 
              alt="аватар пользователя" />
          </button>
          <div className="profile__info">
            <div className="profile__info-group">
              <h1 className="profile__name">{userName}</h1>
              <button
               className="profile__edit-btn" 
               type="button" 
               aria-label="редактировать профиль" 
               onClick={props.onEditProfile} />
            </div>
            <p className="profile__about">{userAbout}</p>
          </div>
        </div>
        <button
         className="profile__add-btn"
         type="button" 
         aria-label="добавить место" 
         onClick={props.onAddNewCard} />
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card 
            card={card}
            key={card._id}
            onCardClick={props.onCardClick}
          />            
        ))}          
      </section>
    </main>   
  )
}
export default Main;