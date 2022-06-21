export default class Card {
  constructor(data, { handleCardClick, handleDeleteCard, handleLikeCard }, templateSelector, userId) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
    this._templateSelector = templateSelector;
    this._userId = userId;
  }

  //Объявление приватного метода: подготовить темплейт карточки (новое место)
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);

    return cardElement;
  }

  //Объявление приватного метода: отобразить кнопку удаления карточки в зависимости от пользователя
  _displayTrashButton() {
    if(this._data.owner._id !== this._userId) {
      this._trashButton.classList.add('card__trash-button_hidden')
    }
  }

  //Объявление приватного метода: сравнить кто поставил лайк по id
  _checkLikeOwner() {
  this._data.likes.forEach((user) => {
      if(user._id === this._userId) {
        this._buttonLike.classList.add('card__like-button_active');
      }
    })
  }

  isLiked() {
    return Boolean(this._data.likes.find((element) => element._id === this._userId))
  }

  //Объявление публичного метода: отобразить лайк и количество лайков
  setLikesAmount(data) {
    this._data.likes = data.likes;
    this._likeQuantity.textContent = data.likes.length;
  }

  //Объявление публичного метода: отобразить количество лайков и убрать лайк
  addLike() {
    this._buttonLike.classList.add('card__like-button_active')
  }

  //Объявление публичного метода: отобразить количество лайков и убрать лайк
  removeLike() {
    this._buttonLike.classList.remove('card__like-button_active')
  }

  //Объявление публичного метода: получить id
  getId() {
    return this._data._id;
  }

  //Объявление приватного метода: удалить карточку (новое место)
  removeCard() {
      this._element.remove();
      this._element = null;
  }

  //Объявление приватного метода: получить данные карточки
  _setCardData() {
    this._cardImage.src = this._data.link;
    this._cardTitle.textContent = this._data.name;
    this._cardTitle.alt = this._data.name;
    this._likeQuantity.textContent = this._data.likes.length;
  }

  //Объявление приватного метода: добавить слушателей событий для карточки (новое место)
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
        this._handleLikeCard(this._data);
});

    this._element.querySelector('.card__trash-button').addEventListener('click', () => {
        this._handleDeleteCard(this);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });
  }

    //Объявление публичного метода: вернуть готовую разметку со слушателями событий
    generateCard() {
      this._element = this._getTemplate();
      this._element.id = this._data._id;
      this._cardImage = this._element.querySelector('.card__image');
      this._cardTitle = this._element.querySelector('.card__title');
      this._buttonLike = this._element.querySelector('.card__like-button');
      this._likeQuantity = this._element.querySelector('.card__like-quantity');
      this._trashButton = this._element.querySelector('.card__trash-button')

      this._displayTrashButton();
      this._setCardData();
      this._setEventListeners();
      this.setLikesAmount(this._data);
      this._checkLikeOwner();
      return this._element;
    }
}



