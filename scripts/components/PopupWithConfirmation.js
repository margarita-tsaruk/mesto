import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor ( popupSelector ) {
    super(popupSelector);
    this._form  = this._popup.querySelector('.popup__form');
  }

  //Объявление публичного метода: добавить слушателей событий
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitHandler(event);
    });
  }

  setSubmitAction(submitHandler) {
      this._submitHandler = submitHandler;
  }
}
