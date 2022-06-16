export class Card {
  constructor(data, selector, handleCardclick) {
    this._text = data.name;
    this._link = data.link;
    this._selector = selector;
    this._handleCardclick = handleCardclick;
  }

  _getTemplateClone = () => {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".element__list-item")
      .cloneNode(true);
    return cardElement;
  };
  ////////////

  _handleLikeIcon = (evt) => {
    evt.target.classList.toggle("element__like-btn_active");
  };

  _deleteCard = () => this._element.remove();

  _setEventListeners() {
    this._element
      .querySelector(".element__like-btn")
      .addEventListener("click", this._handleLikeIcon);
    this._element
      .querySelector(".element__trash-btn")
      .addEventListener("click", this._deleteCard);
    this._element
      .querySelector(".element__photo")
      .addEventListener("click", (data) => this._handleCardclick(data));
  }

  generateCard() {
    this._element = this._getTemplateClone();
    this._image = this._element.querySelector(".element__photo");
    this._image.src = this._link;
    this._image.alt = `A beautiful scene in ${this._text}`;

    this._deleteButton = this._element.querySelector(".element__trash-btn");
    this._likeButton = this._element.querySelector(".element__like-btn");

    this._element.querySelector(".element__title").textContent = this._text;

    this._setEventListeners();

    return this._element;
  }
}
