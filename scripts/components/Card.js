export default class Card {
  constructor(data, { handleCardClick, deleteCardHandler }, templateSelector) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._deleteCardHandler = deleteCardHandler;
    this._templateSelector = templateSelector;
  }

  //Объявление приватного метода: подготовить темплейт карточки (новое место)
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);

    return cardElement;
  }

  //Объявление публичного метода: вернуть готовую разметку со слушателями событий
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');

    this._cardImage.src = this._data.link;
    this._cardTitle.textContent = this._data.name;
    this._cardTitle.alt = this._data.name;

    this._setEventListeners();

    return this._element;
  }

  getId() {
    return this._data._id;
  }

  //Объявление приватного метода: удалить карточку (новое место)
  handleDeleteCard() {
      this._element.remove();
  }

  //Объявление приватного метода: добавить слушателей событий для карточки (новое место)
  _setEventListeners() {
    this._buttonLike = this._element.querySelector('.card__like-button');

    this._buttonLike.addEventListener('click', () => {
      this._handleLikeCard();
    });

    this._element.querySelector('.card__trash-button').addEventListener('click', () => {
        this._deleteCardHandler(this._data);
        this._element = null;
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });
  }

  //Объявление приватного метода: лайкнуть карточку (новое место)
  _handleLikeCard() {
    this._buttonLike.classList.toggle('card__like-button_active');
  }
}

