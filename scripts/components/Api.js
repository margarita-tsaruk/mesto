export default class Api {
  constructor(url) {
    this._url = url;

    this._headers = {
      authorization: 'c58c165d-e00a-4a60-96d3-a5875c524d78',
      'Content-Type': 'application/json'
    }
  }

  createCard() {

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

  setUserInfo() {
    return fetch (`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify ({
        name: 'Marie Skłodowska Curie',
        about: 'Physicist and Chemist'
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
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

  deleteCard(cardId) {
    return fetch (`${this._url}/cards/${cardId}`, {
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