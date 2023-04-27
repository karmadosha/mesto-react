import React from 'react';

function Card(props) {
  function handleCardClick() {
    props.onCardClick(props.card)
  }
  return(
    <div className="element" key={props.card._id}>
      <img
       className="element__picture"
       src={props.card.link} 
       alt={props.card.name} 
       onClick={handleCardClick} />
      <button 
        className="element__remove" 
        type="button" 
        aria-label="удалить карточку" />
      
      <div className="element__info">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-group">
          <button
           className="element__like" 
           type="button" 
           aria-label="поставить лайк"
          />
          <p className="element__like-count">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}
export default Card;