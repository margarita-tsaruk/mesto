export default class UserInfo {
  constructor( { nameSelector, personalInfoSelector } ) {
    this._userName = document.querySelector(nameSelector);
    this._userPersonalInfo = document.querySelector(personalInfoSelector);
  }

  /**
  //Объявление публичного метода: вернуть объект с данными пользователя
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userPersonalInfo: this._userPersonalInfo.textContent
    };
  }

  //Объявление публичного метода: принять новые данные пользователя и добавить их на страницу
  setUserInfo(userName, userPersonalInfo) {
    this._userName.textContent = userName;
    this._userPersonalInfo.textContent = userPersonalInfo;
  }
}

*/
}
