import { Popup } from "./popup"

export class PopupWithImage extends Popup { 
    constructor(popupSelector) {
      super(popupSelector);
    }

    open(image, caption) {
        const imageElemant = this._popupElement.querySelector(".modal__image_type_preview");
        const imageCaption = this._popupElement.querySelector(".modal__title_type_preview")

        //this._popupImage = this._popupElement.querySelector(".modal__image");
        imageElemant.src = image;
        imageElemant.alt = `A beautiful view of ${caption}`;
        //this._popupElement.querySelector(".modal__title").textContent = caption;
        imageCaption.textContent = caption
        super.open();
      }
  
    }