import { Card } from "./card.js";
import { addCardFormValidator } from "./index.js";

export const profileForm = document.querySelector(".form_type_profile");
export const profileModal = document.querySelector(".modal_type_edit-profile");
export const editProfilebutton = document.querySelector(".profile__edit-btn");
export const addProfileButton = document.querySelector(".profile__add-btn");
export const profileCloseBtn = document.querySelector(
  ".modal__close-btn_type_profile"
);
export const profileName = document.querySelector(".profile__name");
export const profileAboutMe = document.querySelector(".profile__about-me");
export const inputName = document.querySelector(".form__input_type_name");
export const inputTitle = document.querySelector(".form__input_type_about-me");

///////add-place-modal declares///////////////////////////////////

export const placeModal = document.querySelector(".modal_type_place");
export const placeCloseBtn = document.querySelector(
  ".modal__close-btn_type_place"
);
export const placeForm = document.querySelector(".form_type_place");
const placeTitle = document.querySelector(".form__input_type_title");
const placeLink = document.querySelector(".form__input_type_image-link");

///////preview-modal declares//////////////////////////////////////

export const previewModal = document.querySelector(".modal_type_preview");
export const previewCloseBtn = document.querySelector(
  ".modal__close-btn_type_preview"
);
export const previewTitle = document.querySelector(
  ".modal__title_type_preview"
);
export const previewImage = document.querySelector(
  ".modal__image_type_preview"
);

//////////wrappers////
export const placesList = document.querySelector(".element__list");
export const cardTemplateSelector = "#card-template";
/////////////////////

export function closeModalOnEscape(e) {
  const currentModal = document.querySelector(".modal_opened");
  if (e.key === "Escape") {
    closeModal(currentModal);
  }
}

function closeModalRemoteClick(e) {
  const currentModal = document.querySelector(".modal_opened");
  if (e.target.classList.contains("modal")) {
    closeModal(currentModal);
  }
}

export function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalOnEscape);
  document.addEventListener("mousedown", closeModalRemoteClick);
}

export function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalOnEscape);
  document.removeEventListener("mousedown", closeModalRemoteClick);
}

export function renderCard(data, list) {
  const createCard = new Card(data, cardTemplateSelector).excuteCard();
  list.prepend(createCard);
}

export function addCard(e) {
  e.preventDefault();
  renderCard({ name: placeTitle.value, link: placeLink.value }, placesList);
  closeModal(placeModal);
  placeForm.reset();
}
