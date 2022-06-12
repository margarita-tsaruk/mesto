export default class Api {
  constructor(url, token) {
  }

  getInitialCards() {
   return fetch('https://mesto.nomoreparties.co/v1/cohort-43/cards', {
    headers: {
      authorization: 'c58c165d-e00a-4a60-96d3-a5875c524d78',
      'Content-Type': 'application/json'
    }
   })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}
