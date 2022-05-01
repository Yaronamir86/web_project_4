
const showInputError = (formElement, inputElement, configurations) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(configurations.errorClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(configurations.inputErrorClass);
  };
  
  const hideInputError = (formElement, inputElement, configurations) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = "";
  errorElement.classList.remove(configurations.errorClass);
  inputElement.classList.remove(configurations.inputErrorClass);
};
  
  const checkInputValidity = (formElement, inputElement, configurations) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, configurations);
    } else {
      hideInputError(formElement, inputElement, configurations);
    }
  };
  
  const hasInvalidInputs = (inputList) => {
     return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
  const enableButton = (button, configurations) => {
    button.disabled = true;
    button.classList.add(configurations.inactiveButtonClass);
  };
  
  const disableButton = (button, configurations) => {
    button.disabled = false;
    button.classList.remove(configurations.inactiveButtonClass);
  };
  
  const toggleButton = (inputList, button, configurations) => {
    if (hasInvalidInputs(inputList)) {
      enableButton(button, configurations);
    } else {
      disableButton(button, configurations);
    }
  };
  
  const setEventListeners = (formElement, configurations) => {
    const inputList = Array.from(
      formElement.querySelectorAll(configurations.inputSelector)
    );
    const button = formElement.querySelector(configurations.submitButtonSelector);
  
    toggleButton(inputList, button, configurations);
    //add event listeners for each input field
    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        checkInputValidity(formElement, input, configurations);
        toggleButton(inputList, button, configurations);
      });
    });
  };
  
  const enableValidation = (configurations) => {
    const formList = Array.from(
      document.querySelectorAll(configurations.formSelector)
    );
  
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (e) => e.preventDefault());
      setEventListeners(formElement, configurations);
    });
  };
  
  const configurations = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
  };
  
  enableValidation(configurations);
  