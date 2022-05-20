import {openPopup, closePopup} from './utils.js'

//Данные модального окна "Открыть изображение"
const popupOpenImage = document.querySelector('.popup_open_image');
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');

export class Card {
  constructor(data, template) {
    this._title = data.title;
    this._link = data.link;
    this._template = template;
  }

  //Объявление публичного метода: вернуть готовую разметку со слушателями событий
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__heading').textContent = this._title;
    this._element.querySelector('.card__image').src = this._link;

    return this._element;
  }

  //Объявление приватного метода: подготовить темплейт карточки (новое место)
  _getTemplate() {
    const cardElement = this._template
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }

  //Объявление приватного метода: добавить слушателей событий для карточки (новое место)
  _setEventListeners() {
    this._element.querySelector('.card__like-button').addEventListener('click', () => {
      this._handleLikeCard();
    });

    this._element.querySelector('.card__trash-button').addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleOpenPopup()
    });
  }

  //Объявление приватного метода: открыть модальное окно с изображением
  _handleOpenPopup() {
    popupImage.src = this._link;
    popupImage.alt = this._title;
    popupImageCaption.textContent = this._title;

    openPopup(popupOpenImage);
  }

  //Объявление приватного метода: лайкнуть карточку (новое место)
  _handleLikeCard() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }

  //Объявление приватного метода: удалить карточку (новое место)
  _handleDeleteCard() {
    this._element.remove();
  }

  //Объявление приватного метода: закрыть модальное окно с изображением
  _handleClosePopup() {
    popupImage.src = '';
    popupImage.alt = '';
    popupImageCaption.textContent = '';

    closePopup(popupOpenImage);
  }
}



