export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  //Объявление публичного метода: открыть все модальные окна (общая функция)
  open() {
    this._popup.classList.add('popup_visible');
    document.addEventListener('keydown', this._handleEscClose);
  }

  //Объявление публичного метода: закрыть все модальные окна (общая функция)
  close() {
    this._popup.classList.remove('popup_visible');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //Объявление приватного метода: закрыть все модальные окна, нажав на клавишу Escape
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  //Объявление публичного метода: добавить слушателей событий для закрытия модальных окон
  setEventListeners() {
    this._closeButton.addEventListener('click', () => this.close());
      this._popup.addEventListener('click', (event) => {
        if (event.target === event.currentTarget) {
          this.close();
        }
      });
  }
}
