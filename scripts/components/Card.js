export default class Card {
  constructor(data, { handleCardClick, handleDeleteCard, handleLikeCard }, templateSelector, myId) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
    this._templateSelector = templateSelector;
    this._myId = myId;
  }

  //Объявление приватного метода: подготовить темплейт карточки (новое место)
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);

    return cardElement;
  }

  _displayTrashButton() {
    if(this._data.owner._id !== this._myId) {
      this._trashButton.classList.add('card__trash-button_hidden')
    }
  }

  _checkLikeOwner() {
    this._data.likes.forEach((item) => {
      if(item._id === this._myId) {
        this._buttonLike.classList.add('card__like-button_active');
      }
    })
  }

  //Объявление публичного метода: вернуть готовую разметку со слушателями событий
  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');
    this._buttonLike = this._element.querySelector('.card__like-button');
    this._trashButton = this._element.querySelector('.card__trash-button')

    this._cardImage.src = this._data.link;
    this._cardTitle.textContent = this._data.name;
    this._cardTitle.alt = this._data.name;

    this._displayTrashButton();
    this._checkLikeOwner();
    this._setEventListeners();

    return this._element;
  }

  getId() {
    return this._data._id;
  }

  //Объявление приватного метода: удалить карточку (новое место)
  removeCard() {
      this._element.remove();
      this._element = null;
  }

  //Объявление приватного метода: добавить слушателей событий для карточки (новое место)
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      console.log(this._element)
      this._handleLikeCard(this._element);
      this._checkLikeOwner();
    });

    this._element.querySelector('.card__trash-button').addEventListener('click', () => {
        this._handleDeleteCard(this);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });
  }
}

