import { formValidator } from "./formValidator.js";
import {
  openModal,
  profileForm,
  profileModal,
  editProfilebutton,
  addProfileButton,
  profileCloseBtn,
  profileName,
  profileAboutMe,
  inputName,
  inputTitle,
  placeModal,
  placeCloseBtn,
  placeForm,
  previewModal,
  previewCloseBtn,
  placesList,
  renderCard,
  closeModal,
  addCard,
} from "./utils.js";

const settings = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

//////validation ///////////////

const editFormValidator = new formValidator(settings, profileForm);
export const addCardFormValidator = new formValidator(settings, placeForm);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

editFormValidator.resetValidation();
addCardFormValidator.resetValidation();

////profile-modal/////////////////////////////////

initialCards.forEach((card) => renderCard(card, placesList));

const profileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAboutMe.textContent = inputTitle.value;
  closeModal(profileModal);
};

const autoFillFormProfile = () => {
  inputName.value = profileName.textContent;
  inputTitle.value = profileAboutMe.textContent;
};

const resetPlaceForm = () => {
  placeForm.reset();
  addCardFormValidator.disableButton();
}



/////////////////////////////////////////////////////////
/////////////////////Event Listeners
/////////////////////////////////////////////////////////

addProfileButton.addEventListener("click", () => {
  resetPlaceForm();
  openModal(placeModal);
  });

placeCloseBtn.addEventListener("click", () => closeModal(placeModal));

previewCloseBtn.addEventListener("click", () => closeModal(previewModal));

editProfilebutton.addEventListener("click", () => {
  editFormValidator.resetValidation();
  autoFillFormProfile();
  editFormValidator.enableValidation();
  openModal(profileModal);
});
profileForm.addEventListener("submit", profileFormSubmit);
profileCloseBtn.addEventListener("click", () => closeModal(profileModal));
placeForm.addEventListener("submit", addCard);
