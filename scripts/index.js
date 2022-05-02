import { toggleButton, configurations } from "./validate.js";
/////////////////////////////////////////////////////////////////////////
///////////////////////DECLARATIONS////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

//////card declares/////////////////////////////////

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
////profile-modal/////////////////////////////////

const profileModal = document.querySelector(".modal_type_edit-profile");
const profileForm = document.querySelector(".form_type_profile");
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileAddBtn = document.querySelector(".profile__add-btn");
const profileCloseBtn = document.querySelector(
  ".modal__close-btn_type_profile"
);
const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__about-me");
const inputName = document.querySelector(".form__input_type_name");
const inputTitle = document.querySelector(".form__input_type_about-me");

///////add-place-modal declares///////////////////////////////////

const placeModal = document.querySelector(".modal_type_place ");
const placeCloseBtn = document.querySelector(".modal__close-btn_type_place");
const placeForm = document.querySelector(".form_type_place");
const placeInputTitle = document.querySelector(".form__input_type_title");
const placeInputlink = document.querySelector(".form__input_type_image-link");

///////preview-modal declares//////////////////////////////////////

const previewModal = document.querySelector(".modal_type_preview");
const previewCloseBtn = document.querySelector(
  ".modal__close-btn_type_preview"
);
const previewTitle = document.querySelector(".modal__title_type_preview");
const previewImage = document.querySelector(".modal__image_type_preview");

//////////wrappers////
const placesList = document.querySelector(".element__list");
////////////////////

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////FUNCTIONS///////////////////////////////
/////////////////////////////////////////////////////////////////////////

/////////create-cards-functions and handlers//////////

function toggleClass(component, cl) {
  component.classList.toggle(cl);
}

function createCard(card) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".element__list-item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".element__photo");
  const cardTitle = cardElement.querySelector(".element__title");
  const deleteBtn = cardElement.querySelector(".element__trash-btn");
  const likeBtn = cardElement.querySelector(".element__like-btn");
  likeBtn.addEventListener("click", () =>
    toggleClass(likeBtn, "element__like-btn_active")
  );
  deleteBtn.addEventListener("click", () => cardElement.remove());
  cardImage.src = card.link;
  cardImage.alt = `a beautiful place in ${card.name}`;
  cardTitle.textContent = card.name;
  cardImage.addEventListener("click", () => openPreviewModal(card));

  return cardElement;
}

function renderCard(card, list) {
  list.prepend(createCard(card));
}

initialCards.forEach((card) => renderCard(card, placesList));

//////////profile-modal-functions////////////////////////
function isNotPreviewModal(modal) {
  return !modal.classList.contains("modal_type_preview") ? true : false;
}

function checkEditAndAddModals(modal) {
  if (isNotPreviewModal(modal)) {
    const inputList = [...modal.querySelectorAll(configurations.inputSelector)];
    const button = modal.querySelector(configurations.submitButtonSelector);
    toggleButton(inputList, button, configurations);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  //adding eventListeners after opening modal to configure closing with mouse/clicking outside the container
  document.addEventListener("keydown", closeModalOnEscape);
  document.addEventListener("mousedown", closeModalRemoteClick);
  checkEditAndAddModals(modal);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalOnEscape);
  document.removeEventListener("mousedown", closeModalRemoteClick);
}

function profileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileAboutMe.textContent = inputTitle.value;
  closeModal(profileModal);
}

function autoFillFormProfile() {
  inputName.value = profileName.textContent;
  inputTitle.value = profileAboutMe.textContent;
}

///////////preview-modal-function///////////

function openPreviewModal(card) {
  previewImage.src = card.link;
  previewImage.alt = card.alt;
  previewTitle.textContent = card.name;
  openModal(previewModal);
}

/////////add-card-function////////////////////////////////
function addCard(event) {
  event.preventDefault();
  renderCard(
    { name: placeInputTitle.value, link: placeInputlink.value },
    placesList
  );
  closeModal(placeModal);
  placeForm.reset();
}

function closeModalOnEscape(evt) {
  const currentModal = document.querySelector(".modal_opened");
  if (evt.key === "Escape") {
    closeModal(currentModal);
  }
}

function closeModalRemoteClick(evt) {
  const currentModal = document.querySelector(".modal_opened");
  if (evt.target.classList.contains("modal")) {
    closeModal(currentModal);
  }
}

/////////////////////////////////////////////////////////////////////////
////////////////////////EVENTLISTENERS///////////////////////////////////
/////////////////////////////////////////////////////////////////////////
profileAddBtn.addEventListener("click", () => {
  openModal(placeModal);
});

placeCloseBtn.addEventListener("click", () => {
  closeModal(placeModal);
});

previewCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

profileEditBtn.addEventListener("click", () => {
  autoFillFormProfile();
  openModal(profileModal);
});

profileForm.addEventListener("submit", profileFormSubmit);

profileCloseBtn.addEventListener("click", () => {
  closeModal(profileModal);
});

placeForm.addEventListener("submit", addCard);
