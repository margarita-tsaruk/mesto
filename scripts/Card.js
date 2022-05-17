import {openPopup, closePopup} from './utils.js'

//Данные карточек, существующих на странице
const items = [
  {
    title: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    title: 'Гора Эльбрус',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Домбай',
    link: 'https://images.unsplash.com/photo-1617911478446-c7f1dd96966e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8JUQwJUI0JUQwJUJFJUQwJUJDJUQwJUIxJUQwJUIwJUQwJUI5fGVufDB8fDB8fA%3D%3D&w=1000&q=80'
  },
  {
    title: 'Осетия',
    link: 'https://images.unsplash.com/photo-1617310188339-0b50f24b29eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8JUQwJUJFJUQxJTgxJUQwJUI1JUQxJTgyJUQwJUI4JUQxJThGfGVufDB8fDB8fA%3D%3D&w=1000&q=80'
  },
  {
    title: 'Джилы-Су',
    link: 'https://images.unsplash.com/photo-1613219281931-34c1ef811769?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fCVEMCVCNCVEMCVCNiVEMCVCOCVEMCVCQiVEMSU4QiUyMCVEMSU4MSVEMSU4M3xlbnwwfHwwfHw%3D&w=1000&q=80'
  },
  {
    title: 'Карачаево-Черкессия',
    link: 'https://images.unsplash.com/photo-1627329904799-607897b1eb60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8JUQwJUJBJUQwJUIwJUQxJTgwJUQwJUIwJUQxJTg3JUQwJUIwJUQwJUI1JUQwJUIyJUQwJUJFJTIwJUQxJTg3JUQwJUI1JUQxJTgwJUQwJUJBJUQwJUI1JUQxJTgxJUQxJTgxJUQwJUI4JUQxJThGfGVufDB8fDB8fA%3D%3D&w=1000&q=80'
  }
];

const popupOpenImage = document.querySelector('.popup_open_image');

const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');


export class Card {
  constructor(data, cardSelector) {
    this._title = data.title;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__heading').textContent = this._title;
    this._element.querySelector('.card__image').src = this._link;

    return this._element;
  }

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

  _handleOpenPopup() {
    popupImage.src = this._link;
    popupImage.alt = this._title;
    popupImageCaption.textContent = this._title;

    openPopup(popupOpenImage);
  }

  _handleLikeCard() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleClosePopup() {
    popupImage.src = '';
    popupImage.alt = '';
    popupImageCaption.textContent = '';

    closePopup(popupOpenImage);
  }
}

items.forEach((item) => {
  const card = new Card(item, '.template-card');
  const cardElement = card.generateCard();

  document.querySelector('.cards__container').append(cardElement);
})

