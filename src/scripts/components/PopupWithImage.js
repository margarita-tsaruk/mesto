import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupImageCaption = this._popup.querySelector('.popup__caption');
  }

  //Объявление публичного метода: вставить в модальное окно картинку с src изображения и подписью к картинке
  open(title, link) {
    this._popupImage.src = link;
    this._popupImage.alt = title;
    this._popupImageCaption.textContent = title;
    super.open();
  }
}
