import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(".form");
    this._inputList = [...this._formElement.querySelectorAll(".form__input")];
    this._submitHandler = submitHandler;
  }

  _getInputValues() {
    //collects data from all the input fields and returns that data as an object.
    const inputValues = {};

    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
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
