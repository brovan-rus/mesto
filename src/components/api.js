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

  setCurrentUser(userData) {
    return fetch (`${this._url}/v1/cohort-${this._groupId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userData.userName,
        about: userData.userJob,
      })
    })
      .then((answer) => {if (answer.ok) {return (answer.json())}
      return Promise.reject(`Ошибка ${answer.status}`);
      })
  }

  addNewCard(cardData) {
    return fetch(`${this._url}/v1/cohort-${this._groupId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
        .then((answer) => {if (answer.ok) {return (answer.json())}
        return Promise.reject(`Ошибка ${answer.status}`);
    })
  }

  setCardLike(cardID) {
    return fetch(`${this._url}/v1/cohort-${this._groupId}/cards/likes/${cardID}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      }
    })
      .then((answer) => {if (answer.ok) {return (answer.json())}
      return Promise.reject(`Ошибка ${answer.status}`)});
  }

  // getCardData(cardID) {
  //   return fetch(`${this._url}/v1/cohort-${this._groupId}/cards/${cardID}`, {
  //     headers: {
  //       authorization: this._token
  //     }
  //   })
  //     .then((request) => {
  //       if (request.ok) {
  //         return request.json();
  //       }
  //       return  Promise.reject(`Ошибка ${request.status}`);
  //     });
  // }

  removeCardLike(cardID){
    return fetch(`${this._url}/v1/cohort-${this._groupId}/cards/likes/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      }
    })
      .then((answer) => {if (answer.ok) {return (answer.json())}
        return Promise.reject(`Ошибка ${answer.status}`)});
  }

}
