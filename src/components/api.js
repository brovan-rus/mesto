function handleResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка ${res}`);
  } else {
    return res.json();
  }
}

export default class Api {
  constructor(url, groupId, token) {
    this._url = url;
    this._token = token;
    this._groupId = groupId;
  }
  getInitialCards() {
    return fetch(`${this._url}/v1/cohort-${this._groupId}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then(handleResponse);
  }

  getCurrentUser() {
    return fetch(`${this._url}/v1/cohort-${this._groupId}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then(handleResponse);
  }

  setCurrentUser(userData) {
    return fetch(`${this._url}/v1/cohort-${this._groupId}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userData.userName,
        about: userData.userJob,
      }),
    }).then(handleResponse);
  }

  addNewCard(cardData) {
    return fetch(`${this._url}/v1/cohort-${this._groupId}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    }).then(handleResponse);
  }

  setCardLike(cardID) {
    return fetch(
      `${this._url}/v1/cohort-${this._groupId}/cards/likes/${cardID}`,
      {
        method: "PUT",
        headers: {
          authorization: this._token,
          "Content-Type": "application/json",
        },
      }
    ).then(handleResponse);
  }

  removeCardLike(cardID) {
    return fetch(
      `${this._url}/v1/cohort-${this._groupId}/cards/likes/${cardID}`,
      {
        method: "DELETE",
        headers: {
          authorization: this._token,
          "Content-Type": "application/json",
        },
      }
    ).then(handleResponse);
  }

  removeCard(cardID) {
    return fetch(`${this._url}/v1/cohort-${this._groupId}/cards/${cardID}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(handleResponse);
  }

  avatarChange(link) {
    return fetch(`${this._url}/v1/cohort-${this._groupId}/users/me/avatar/`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(handleResponse);
  }
}
