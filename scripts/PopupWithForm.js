import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor ( { popupSelector, handleFormSubmit } ) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    this._closeButton = document.querySelectorAll('.popup__close-button');
  }

  _getInputValues() {
    this._inputs = Array.from(this._popup.querySelectorAll('.popup_input'));
    this._inputValues = {};
    this._inputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
      this._inputValues[input.link] = input.value;
    });
    return this._inputValues;
  }

  //Объявление публичного метода: открыть все модальные окна (общая функция)
  open() {
    console.log(this._popup)
    this._popup.classList.add('popup_visible');
    document.addEventListener('keydown', this.__handleEscClose);
  }

  //Объявление публичного метода: закрыть все модальные окна (общая функция)
  close() {
    super.close();
    this._form.reset();
 }

 //Объявление приватного метода: закрыть все модальные окна, нажав на клавишу Escape
 _handleEscClose() {
    if (evt.key === 'Escape') {
      this._popup.close();
    }
  }

 //Объявление публичного метода: добавить слушателей событий для закртыия модальных окон
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());

      super.close();
    });
  }
}
