export default class UserInfo {

  constructor(userNameSelector, userJobSelector, userAvatarSelector) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userJobElement = document.querySelector(userJobSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);
  }

  getUserInfo(serverAnswer) {
    const userData = {
      'userName': `${serverAnswer.name}`,
      'userJob': `${serverAnswer.about}`,
      'userAvatar': `${serverAnswer.avatar}`,
      'userId' : `${serverAnswer._id}`
    };
    return userData;
  }

  setUserInfo({userName, userJob, userAvatar}) {
    this._userNameElement.textContent = userName;
    this._userJobElement.textContent = userJob;
    this._userAvatarElement.style.backgroundImage = `url(${userAvatar})`
  }
}
