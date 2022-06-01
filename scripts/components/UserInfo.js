export default class UserInfo {
  constructor( {nameSelector, personalInfoSelector} ) {
    this._userName = document.querySelector(nameSelector);
    this._userPersonalInfo = document.querySelector(personalInfoSelector);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userPersonalInfo: this._userPersonalInfo.textContent
    };
  }

  setUserInfo(userName, userPersonalInfo) {
    this._userName.textContent = userName;
    this._userPersonalInfo.textContent = userPersonalInfo;
  }
}
