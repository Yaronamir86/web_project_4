export class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._form = formElement;
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInputs = () =>
    this._inputList.some((inputElement) => !inputElement.validity.valid);

  enableButton = () => {
    this._button.disabled = false;
    this._button.classList.remove(this._inactiveButtonClass);
  };

  _disableButton = () => {
    this._button.disabled = true;
    this._button.classList.add(this._inactiveButtonClass);
  };

  _toggleButton = () => {
    if (this._hasInvalidInputs()) {
      this._disableButton();
    } else {
      this.enableButton();
    }
  };

  _setEventListeners = () => {
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._button = this._form.querySelector(this._submitButtonSelector);

    this._toggleButton();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButton();
      });
    });
  };

  resetValidation() {
    this._disableButton();
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => evt.preventDefault());
    this._setEventListeners();
  }

  hideErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
