function ImagePopup(props) {
  return (
    <div className={`popup popup_type_big-picture ${props.isOpen ? 'popup_opened' : ''}`}>
      <figure className="popup__image-block">
        <img 
          className="popup__image" 
          src={props.card?.link}
          alt={props.card?.name} />
        <figcaption className="popup__image-title">
          {props.card?.name}
        </figcaption>
        <button 
          className="popup__close-btn popup__close-btn_type_big-picture" 
          type="button" 
          aria-label="закрыть окно" 
          onClick={props.onClose}>
      </button>
      </figure>
    </div>
  )
}

export default ImagePopup;