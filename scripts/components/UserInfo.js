export default class UserInfo {
  constructor( { nameSelector, personalInfoSelector, avatarSelector } ) {
    this._userName = document.querySelector(nameSelector);
    this._userPersonalInfo = document.querySelector(personalInfoSelector);
    this._userAvatar =  document.querySelector(avatarSelector);
  }

  //Объявление публичного метода: вернуть объект с данными пользователя
  returnUserInfo() {
    return {
      userName: this._userName.textContent,
      userPersonalInfo: this._userPersonalInfo.textContent,
    };
  }

  //Объявление публичного метода: принять новые данные пользователя и добавить их на страницу
  setUserInfo(userName, userPersonalInfo) {
    this._userName.textContent = userName;
    this._userPersonalInfo.textContent = userPersonalInfo;
  }

  setUserAvatar(userAvatar) {
    this._userAvatar.style.backgroundImage = `url(${userAvatar.avatar})`
  }

  downloadUserInfo(newUserInfo) {
    this._userName.textContent = newUserInfo.name;
    this._userPersonalInfo.textContent = newUserInfo.about;
    this._userAvatar.style.backgroundImage = `url(${newUserInfo.avatar})`;
  }
}
