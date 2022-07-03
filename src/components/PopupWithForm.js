import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(".form");
    this._inputList = [...this._formElement.querySelectorAll(".form__input")];
    this._submitHandler = submitHandler;
    this._submitButton = this._formElement.querySelector(".form__button");
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    //collects data from all the input fields and returns that data as an object.
    const inputValues = {};

    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
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
