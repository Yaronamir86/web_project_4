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
    console.log("this._userId", this._userId);
    this._ownerId = data.owner._id;
    this._likes = data.likes;
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

  _setLikes() {
    const likeAmount = this._likes.length;
    this._element.querySelector(".element__like-count").textContent =
      likeAmount;
  }
  isliked() {
    return this._likes.some((person) => person.id === this.userId);
  }

  dislikeCard(newLikes) {
    this._likes = newLikes;
    this._element.querySelector(".element__like-count").textContent =
      this._likes.length;

    this._element
      .querySelector(".element__like-btn")
      .classList.remove("element__like-btn_active");
  }

  likeCard(newLikes) {
    this._likes = newLikes;
    this._element.querySelector(".element__like-count").textContent =
      this._likes.length;

    this._element
      .querySelector(".element__like-btn")
      .classList.add("element__like-btn_active");
  }


  generateCard() {
    this._element = this._getTemplateClone();
    this._image = this._element.querySelector(".element__photo");
    this._image.src = this._link;
    this._image.alt = `A beautiful scene in ${this._text}`;
    this._deleteButton = this._element.querySelector(".element__trash-btn");
    this._likeButton = this._element.querySelector(".element__like-btn");
    this._likeCount = this._element.querySelector(".element__like-count");

    if (this.isliked) {
      this.likeCard(this._likes);
    }
    this._element.querySelector(".element__title").textContent = this._text;
    this._ownerId !== this._userId &&
      (this._deleteButton.style.display = "none");

    this._setLikes;

    this._setEventListeners();

    return this._element;
  }
}
