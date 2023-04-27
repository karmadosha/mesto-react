function PopupWithForm(props) {

  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button
         className="popup__close-btn" 
         type="button" 
         aria-label="закрыть окно"
         onClick={props.onClose} />
        <h2 className="popup__title">{props.title}</h2>
        <form
          className={`form form_type_${props.name}`}
          name={props.name}>
            {props.children}
            <button 
              className="form__save-btn" 
              type="submit"
              value={props.submitText}
              aria-label="сохранить данные"
              >
              {props.submitText}
            </button>
        </form>
      </div>
    </section>
  )
}

export default PopupWithForm;