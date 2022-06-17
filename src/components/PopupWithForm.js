import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(".form");
    this._submitHandler = submitHandler;
  }

  _getInputValues() {
    //collects data from all the input fields and returns that data as an object.
    this._inputList = [...this._formElement.querySelectorAll(".form__input")];
    const inputValues = {};

    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    //add the submit event handler to the form and the click event listener to the close icon.
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitHandler(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }
  close = () => {
    super.close();
    this._formElement.reset();
  };
}
