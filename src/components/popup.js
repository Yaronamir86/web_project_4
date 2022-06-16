export class Popup {
  constructor(popupselector) {
    this._popupElement = document.querySelector(popupselector);
    this.close = this.close.bind(this);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("click", this._handleOverlayClose);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("click", this._handleOverlayClose);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    //stores the logic for closing the popup by pressing the Esc key.
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleOverlayClose = (evt) => {
    if (evt.target.classList.contains("modal")) {
      this.close();
    }
  };

  setEventListeners() {
    //adds a click event listener to the close icon of the popup.
    this._popupElement
      .querySelector(".modal__close-btn")
      .addEventListener("click", this.close);
  }
}
