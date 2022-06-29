import { Popup } from "./Popup";

export class PopupWithButton extends Popup {
  setAction(action) {
    this._submitHandler = action;
  }

  setEventListeners() {
    this._popupElement.addEventListener("submit", (e) => {
        e.preventDefault()
       this._submitHandler();
    })
   super.setEventListeners;
  }
 
}
