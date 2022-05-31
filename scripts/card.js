import {openModal, previewModal, previewTitle, previewImage} from "./utils.js"

export class card {
    constructor(data, Selector) {
        this._name = data.name;
        this._link = data.link;
        this._Selector = Selector;

        this._cardTamplate = document.querySelector(Selector).content.querySelector(".element__list-item");
    }

    _getCardElement = () => {
        this._cardElement = this._cardTamplate.cloneNode(true);
        this._cardElement.querySelector(".element__title").textContent = this._name;
        this._cardElement.querySelector(".element__photo").src = this._link;
       
        
        return this._cardElement;
      
    } 


    _handleLikeIcon = (evt) => {
        evt.target.classList.toggle("element__like-btn_active")
    };

    _deleteCard = () => this._cardElement.remove()

         

    _handlePreviewModal = () => {
        
        previewImage.src = this._link;
        previewImage.alt = `a beautiful place in ${this._name}`;
        previewTitle.textContent = this._name;
        openModal(previewModal);
    }

  

    _setEventListeners() {
        this._cardElement.querySelector(".element__like-btn").addEventListener("click", this._handleLikeIcon);
        this._cardElement.querySelector(".element__trash-btn").addEventListener("click", this._deleteCard);
        this._cardElement.querySelector(".element__photo").addEventListener("click", this._handlePreviewModal);
    }

       excuteCard(){
       this._element = this._getCardElement();
       this._deleteButton = this._cardElement.querySelector(".element__trash-btn");
       this._likeButton = this._cardElement.querySelector(".element__like-btn");
       this._image = this._cardElement.querySelector(".element__photo");
       this._element.querySelector(".element__title").textContent = this._name;
       this._image.src = this._link;
       this._image.alt = `A beautiful scene in ${this._name}`;

       this._setEventListeners();

        return this._element;
    }

   
}



   
     