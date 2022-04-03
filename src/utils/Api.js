const _processResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Something went wrong: ${res.status}`);
};

class Api {
  constructor({ serverUrl, groupId, token }) {
    this._serverUrl = serverUrl;
    this._groupId = groupId;
    this._token = token;
  }

  setup() {
    this._mainUrl = `${this._serverUrl}/v1/${this._groupId}`;
    this._headers = {
      authorization: this._token,
      "Content-Type": "application/json",
    };
  }

  addNewCard({ name, link }) {
    return fetch(`${this._mainUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => {
        return res.ok
          ? res.json()
          : Promise.reject(`${res.status} ${res.statusText}`);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  getUserData() {
    return fetch(`${this._mainUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)
      )

      .catch((err) => {
        console.log(err);
      });
  }

  removeLike(cardId) {
    return fetch(`${this._mainUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)
    );
  }

  addLike(cardId) {
    return fetch(`${this._mainUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)
    );
  }

  setUserData({ name, about }) {
    return fetch(`${this._mainUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then((res) => {
        return res.ok
          ? res.json()
          : Promise.reject(`${res.status} ${res.statusText}`);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  setUserAvatar(avatarLink) {
    return fetch(`${this._mainUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: avatarLink }),
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)
      )
      .catch((err) => console.log(err));
  }

  removeCard(cardId) {
    return fetch(`${this._mainUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)
    );
  }

  getInitialCardsData() {
    return fetch(`${this._mainUrl}/cards`, { headers: this._headers })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)
      )
      .catch((err) => {
        console.log(err);
      });
  }

  getInitialData() {
    return Promise.all([this.getUserData(), this.getInitialCardsData()]);
  }
}

export default Api;
