export class Card {
  constructor(data, templateSelector, handleOpenPopupImage) {
    this._title = data.title;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleOpenPopupImage = handleOpenPopupImage;
  }

  //Объявление приватного метода: подготовить темплейт карточки (новое место)
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);

    return cardElement;
  }

  //Объявление приватного метода: добавить слушателей событий для карточки (новое место)
  _setEventListeners() {
    this._buttonLike = this._element.querySelector('.card__like-button');

    this._buttonLike.addEventListener('click', () => {
      this._handleLikeCard();
    });

    this._element.querySelector('.card__trash-button').addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleOpenPopupImage(this._title, this._link)
    });
  }

  //Объявление приватного метода: лайкнуть карточку (новое место)
  _handleLikeCard() {
    this._buttonLike.classList.toggle('card__like-button_active');
  }

  //Объявление приватного метода: удалить карточку (новое место)
  _handleDeleteCard() {
    this._element.remove();
  }

  //Объявление публичного метода: вернуть готовую разметку со слушателями событий
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');

    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._title;
    this._cardTitle.alt = this._title;

    this._setEventListeners();

    return this._element;
  }
}


