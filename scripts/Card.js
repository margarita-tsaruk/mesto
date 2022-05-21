export class Card {
  constructor(data, templateSelector, handleOpenPopupImage) {
    this._title = data.title;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleOpenPopupImage = handleOpenPopupImage;
  }

  //Объявление публичного метода: вернуть готовую разметку со слушателями событий
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image').src = this._link;
    this._cardTitle = this._element.querySelector('.card__title');

    this._cardTitle.textContent = this._title;
    this._cardTitle.alt = this._title;

    this._setEventListeners();
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
    console.log(this._cardImage)
    this._cardImage.addEventListener('click', () => {
      this._handleOpenPopupImage(title, link)
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



