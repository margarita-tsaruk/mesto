export default class Api {
  constructor(url) {
    this._url = url;
    this._headers = {
      authorization: 'c58c165d-e00a-4a60-96d3-a5875c524d78',
      'Content-Type': 'application/json'
    }
  }

  //Объявление приватного метода: получение ответа от сервера
  _getServerResponse(res) {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  //Объявление публичного метода: отправить запрос серверу - загрузить карточки
  getInitialCards() {
    return fetch (`${this._url}/cards`, {
     method: 'GET',
     headers: this._headers
    })
     .then((res) => {
      return this._getServerResponse(res)
    })
  }

  //Объявление публичного метода: отправить запрос серверу - загрузить информацию о пользователе
  getUserInfo() {
    return fetch (`${this._url}/users/me`, {
      headers: this._headers
     })
    .then((res) => {
      return this._getServerResponse(res)
    })
  }

  //Объявление публичного метода: отправить запрос серверу на обновление данных профиля пользователя
  editUserInfo(name, about) {
    return fetch (`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify ({
        name: name,
        about: about
      })
    })
    .then((res) => {
      return this._getServerResponse(res)
    })
  }

  //Объявление публичного метода: отправить запрос серверу на добавление новой карточки
  addCard(cardData) {
    return fetch (`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify ({
       name: cardData.name,
       link: cardData.link
       })
    })
    .then((res) => {
      return this._getServerResponse(res)
    })
  }

  //Объявление публичного метода: отправить запрос серверу на удаление своей карточки
  deleteCard(_id) {
    return fetch (`${this._url}/cards/${_id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then((res) => {
      return this._getServerResponse(res)
    })
  }

  //Объявление публичного метода: отправить запрос серверу - поставить лайк карточки
  setCardLike(data) {
    return fetch (`${this._url}/cards/${data._id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then((res) => {
      return this._getServerResponse(res)
    })
  }

  //Объявление публичного метода: отправить запрос серверу - удалить лайк карточки
  removeCardLike(data) {
    return fetch (`${this._url}/cards/${data._id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then((res) => {
      return this._getServerResponse(res)
    })
  }

  //Объявление публичного метода: отправить запрос - обновить аватар
  changeAvatar(link) {
    return fetch (`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify ({
        avatar: link,
      })
    })
    .then((res) => {
      return this._getServerResponse(res)
    })
  }
}
