import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor ( popupSelector, { handleFormSubmit } ) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._button  = this._popup.querySelector('.popup__button');
  }

  setConfirmation() {

  }

  //Объявление публичного метода: добавить слушателей событий
  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._setConfirmation());
      this.close();
    });
  }

  //Объявление публичного метода: закрыть все модальные окна с формой
  close() {
    super.close();
  }
}
