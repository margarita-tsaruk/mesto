import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor ( popupSelector, { handleFormSubmit } ) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form  = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  //Объявление публичного метода: добавить слушателей событий
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.close();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  //Объявление публичного метода: закрыть все модальные окна (общая функция)
  close() {
    super.close();
    this._form.reset();
 }
}
