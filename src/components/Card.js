export class Card {
  constructor(
    data,
    selector,
    handleCardClick,
    handleDeleteCard,
    handleLikeIcon,
    userId
  ) {
    this._text = data.name;
    this._link = data.link;

    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeIcon = handleLikeIcon;
    this._id = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
  }

  getId() {
    return this._id;
  }

  _getTemplateClone = () => {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".element__list-item")
      .cloneNode(true);
    return cardElement;
  };

  removeCard() {
    this._element.remove();

    this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () =>
      this._handleLikeIcon(this._id)
    );
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteCard(this._id)
    );
    this._image.addEventListener("click", (data) =>
      this._handleCardClick(data)
    );
  }

  setLikes(newLikes) {
    this._likes = newLikes;

    const likeAmount = this._likes.length;
    this._element.querySelector(".element__like-count").textContent =
      likeAmount;

    const cardIsLikedByCurrentUser = this.isLiked ()

    if(cardIsLikedByCurrentUser) {
      this._element
        .querySelector(".element__like-btn")
        .classList.add("element__like-btn_active");
    }else{
      this._element
        .querySelector(".element__like-btn")
        .classList.remove("element__like-btn_active");
    }
  }

  isLiked () {
    return this._likes.find(
      (user) => user._id === this._userId
    );
  }

  generateCard() {
    this._element = this._getTemplateClone();
    this._image = this._element.querySelector(".element__photo");
    this._image.src = this._link;
    this._image.alt = `A beautiful scene in ${this._text}`;
    this._deleteButton = this._element.querySelector(".element__trash-btn");
    this._likeButton = this._element.querySelector(".element__like-btn");
    this._likeCount = this._element.querySelector(".element__like-count");

    this._element.querySelector(".element__title").textContent = this._text;
    this._ownerId !== this._userId &&
      (this._deleteButton.style.display = "none");

    this.setLikes(this._likes);

    this._setEventListeners();

    return this._element;
  }
}
