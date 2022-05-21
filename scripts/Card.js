export class Card {
  constructor(data, templateSelector, handleOpenPopupImage) {
    this._title = data.title;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleOpenPopupImage = handleOpenPopupImage;
    this._cardImage = document.querySelector('.card__image');

  }

  //Объявление публичного метода: вернуть готовую разметку со слушателями событий
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__heading').textContent = this._title;
    this._element.querySelector('.card__heading').alt = this._title;
    this._element.querySelector('.card__image').src = this._link;

    return this._element;
  }

  //Объявление приватного метода: подготовить темплейт карточки (новое место)
  _getTemplate() {
    const cardElement = this._templateSelector
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
      this._handleOpenPopupImage(this._title, this._link)
    });
  }

  //Объявление приватного метода: лайкнуть карточку (новое место)
  _handleLikeCard() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }

  //Объявление приватного метода: удалить карточку (новое место)
  _handleDeleteCard() {
    this._element.remove();
  }
}



