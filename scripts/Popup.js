export default class Popup {
  constructor (popupSelector) {
    console.log(this._popup)
    this._popup = document.querySelectorAll(popupSelector);

    this._closeButton = document.querySelectorAll('.popup__close-button');
  }

  //Объявление публичного метода: открыть все модальные окна (общая функция)
  open() {
    console.log(this._popup)
    this._popup.classList.add('popup_visible');
    document.addEventListener('keydown', this.__handleEscClose);
  }

  //Объявление публичного метода: закрыть все модальные окна (общая функция)
  close() {
    this._popup.classList.toggle('popup_visible');
 }

 //Объявление приватного метода: закрыть все модальные окна, нажав на клавишу Escape
 _handleEscClose() {
    if (evt.key === 'Escape') {
      this._popup.close();
    }
  }

 //Объявление публичного метода: добавить слушателей событий для закртыия модальных окон
  setEventListeners() {
    this._closeButton.forEach((elem) => {
      elem.addEventListener('click', () => {
        this._popup.close();
      });
    });
  }

}

