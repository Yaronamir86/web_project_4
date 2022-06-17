import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElemant = this._popupElement.querySelector(
      ".modal__image_type_preview"
    );
    this._imageCaption = this._popupElement.querySelector(
      ".modal__title_type_preview"
    );
  }

  open(image, caption) {
    this._imageElemant.src = image;
    this._imageElemant.alt = `A beautiful view of ${caption}`;
    this._imageCaption.textContent = caption;
    super.open();
  }
}
