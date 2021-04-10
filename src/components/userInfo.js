export default class UserInfo {

  constructor(userNameSelector, userJobSelector, userAvatarSelector) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userJobElement = document.querySelector(userJobSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);
  }

  getUserInfo(serverAnswer) {
    return {
      'userName': `${serverAnswer.name}`,
      'userJob': `${serverAnswer.about}`,
      'userAvatar': `${serverAnswer.avatar}`,
      'userID': `${serverAnswer._id}`
    };
  }

  setUserInfo({userName, userJob, userAvatar, userID}) {
    this._userNameElement.textContent = userName;
    this._userJobElement.textContent = userJob;
    this._userAvatarElement.style.backgroundImage = `url(${userAvatar})`
    this._userNameElement.id = userID;
  }
}
