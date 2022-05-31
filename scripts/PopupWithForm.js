import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor ( { popupSelector, handleFormSubmit } ) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form  = document.querySelector('.popup__form');
    this._button = document.querySelector('.popup__close-button');
    this._inputs = Array.from(document.querySelectorAll('.popup__input'));
  }

  _getInputValues() {

    this._inputValues = {};
    this._inputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  //Объявление публичного метода: закрыть все модальные окна (общая функция)
  close() {
    super.close();
    this._form.reset();
 }

 //Объявление публичного метода: добавить слушателей событий
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());

      super.close();
    });
  }
}
