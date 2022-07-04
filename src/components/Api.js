

export class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    _customFetch = (url, headers) =>
    fetch(url, headers)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .catch(console.log);
  
    getInitialCards() {
      return this._customFetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      });
    }
  
    getUserInfo() {
      return this._customFetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
      });
    }
  
    editProfile(name, about) {
      return this._customFetch(`${this._baseUrl}/users/me`, {
          headers: this._headers,
          method: "PATCH",
          body: JSON.stringify({
            name,
            about
          })
      });
    }

    editAvatar(url) {
        return this._customFetch(`${this._baseUrl}/users/me/avatar`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify({
              avatar: url,
            })  
        });
    }
  
  
    createCards(data) {
      return this._customFetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
        method: "POST",
        body: JSON.stringify(data),
      });
    }
  
    deleteCards(cardId) {
      return this._customFetch(`${this._baseUrl}/cards/${cardId}`, {
        headers: this._headers,
        method: "DELETE",
      });
    }
  
    addLike(cardId) {
      return this._customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        headers: this._headers,
        method: "PUT",
      });
    }
  
    removeLike(cardId) {
      return this._customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        headers: this._headers,
        method: "DELETE",
      });
    }

  }
  
  export const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
    headers: {
      authorization: "a42b1115-c728-4ed0-ac26-3d3a2cd8e95d",
      "Content-Type": "application/json",
    },
  });
  
 