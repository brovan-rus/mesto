export default class Api {
  constructor(url, groupId, token) {
    this._url = url;
    this._token = token;
    this._groupId = groupId;
  }

  getInitialCards () {
    return fetch(`${this._url}/v1/cohort-${this._groupId}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then((request) => {
        if (request.ok) {
          return request.json();
        }
         return  Promise.reject(`Ошибка ${request.status}`);
      });
  }

  getCurrentUser() {
    return fetch(`${this._url}/v1/cohort-${this._groupId}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then((request) => {
        if (request.ok) {
          return request.json();
        }
        return  Promise.reject(`Ошибка ${request.status}`);
      });
  }



}
