export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelectorAll(popupSelector);
    this._profileEditButton = document.querySelector('.profile__edit-button');
    this._closeButton = document.querySelector('.popup__close-button');
  }

  //Объявление публичного метода: открыть все модальные окна (общая функция)
  open() {
    this._popup.classList.add('popup_visible');
    document.addEventListener('keydown', this.__handleEscClose);
  }

  //Объявление публичного метода: закрыть все модальные окна (общая функция)
  close() {
    this._popup.classList.toggle('popup_visible');
    this.__handleEscClose.remove();
 }

 //Объявление приватного метода: закрыть все модальные окна, нажав на клавишу Escape
 _handleEscClose() {
    if (evt.key === 'Escape') {
      this._popup.close();
    }
  }

 //Объявление публичного метода: добавить слушателей событий для закрытия модальных окон
  setEventListeners() {
    this._profileEditButton.addEventListener('click', () => {
      this._popup.open();
    });;

    this._closeButton.addEventListener('click', () => {
        this._popup.close();
      });


    this._popup.forEach((popup) => {
      popup.addEventListener('mousedown', (evt) => {
        if (evt.target === evt.currentTarget) {
          this._popup.close();
        }
      });
    });
  }

}

