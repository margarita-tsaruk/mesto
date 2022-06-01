export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button');
  }

  //Объявление публичного метода: открыть все модальные окна (общая функция)
  open() {
    this._popup.classList.add('popup_visible');
    document.addEventListener('keydown', (element) => this._handleEscClose(element));
  }

  //Объявление публичного метода: закрыть все модальные окна (общая функция)
  close() {
    this._popup.classList.remove('popup_visible');
    document.removeEventListener('keydown', (element) => this._handleEscClose(element));
 }

  //Объявление приватного метода: закрыть все модальные окна, нажав на клавишу Escape
  _handleEscClose(evt) {
      if (evt.key === 'Escape') {
        const popUp = document.querySelector('.popup_visible');
        this.close(popUp);
      }
  }

 //Объявление публичного метода: добавить слушателей событий для закрытия модальных окон
  setEventListeners() {
      this._closeButton.addEventListener('click', () => this.close());
      this._popup.addEventListener('click', (event) => {
        if (event.target === event.currentTarget) {
          this.close(event.currentTarget);
        }
      });
  }
}

