import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(image, caption) {
    const imageElemant = this._popupElement.querySelector(
      ".modal__image_type_preview"
    );
    const imageCaption = this._popupElement.querySelector(
      ".modal__title_type_preview"
    );

    imageElemant.src = image;
    imageElemant.alt = `A beautiful view of ${caption}`;
    imageCaption.textContent = caption;
    super.open();
  }
}
