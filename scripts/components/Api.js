export default class Api {
  constructor(url) {
    this._url = url;
    this._headers = {
      authorization: 'c58c165d-e00a-4a60-96d3-a5875c524d78',
      'Content-Type': 'application/json'
    }
  }

  getUserInfo() {
    return fetch (`${this._url}/users/me`, {
      headers: this._headers
     })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getInitialCards() {
   return fetch (`${this._url}/cards`, {
    method: 'GET',
    headers: this._headers
   })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  editUserInfo(name, about) {
    return fetch (`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify ({
        name: name,
        about: about
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
  }

  addCard(cardData) {
    return fetch (`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify ({
       name: cardData.name,
       link: cardData.link
       })
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  deleteCard(_id) {
    return fetch (`${this._url}/cards/${_id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
     .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  changeAvatar() {
    return fetch (`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify ({
        avatar: 'url',
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    })
  }

  setLikeCard(_id) {
    return fetch (`${this._url}/cards/${_id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
     .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  removeCardLike(_id) {
    return fetch (`${this._url}/cards/${_id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
     .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
}
