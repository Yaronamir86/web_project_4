/////////////////////
////declatrations////
////////////////////

////profile popup/////////////////////////////////

const popUpOpen = document.querySelector(".popup");

const popUpForm = document.querySelector(".popup__form");

const editBtn = document.querySelector(".profile__edit-btn");

const addBtn = document.querySelector(".profile__add-btn");

const inputName = document.querySelector(".popup__text_type_name");

const inputAboutMe = document.querySelector(".popup__text_type_about-me");

const saveBtn = document.querySelector(".popup__save-btn");

const popupCloseBtn = document.querySelector(".popup__close-btn");

//////card declares/////////////////////////////////

const list = document.querySelector(".element__list");

const listItem = document.querySelector(".element__list-item");

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

////////profile declares////////////////////////////////////

const profileName = document.querySelector(".profile__name");

const profileAboutMe = document.querySelector(".profile__about-me");

///////place-modal declares///////////////////////////////////

const placeModalOpen = document.querySelector(".place-modal");

const placeCloseBtn = document.querySelector(".place-modal__close-btn");

const placeForm = document.querySelector(".place-modal__form");

const placeTitle = document.querySelector(".place-modal__title");

const placeImage = document.querySelector(".place-modal__image");

const createBtn = document.querySelector(".place-modal__create-btn");

const placeInputTitle = document.querySelector("place-modal__text_type_title");

const placeInputlink = document.querySelector(
  "place-modal__text_type_image-link"
);

///////preview-modal declares//////////////////////////////////////

const previewModalOpen = document.querySelector(".preview-modal");

const previewCloseBtn = document.querySelector(".preview-modal__close-btn");

const previewImage = document.querySelector(".preview-modal__image");

//////////wrappers////
const placesList = document.querySelector(".element__list");
////////////////////

////////////////////////////
//////////FUNCTIONS/////////
////////////////////////////

/////////cards functions//////////

function createCard(card) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".element__list-item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".element__photo");
  const cardTitle = cardElement.querySelector(".element__title");
  const deleteBtn = cardElement.querySelector(".element__trash-btn");
  //likeBtn.addEventListener("click", () => toggleclass(likeBtn, "element__like-btn_active"));
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

//////////popup-functions////////////////////////

function openPopup() {
  popUpOpen.classList.add("popup_opened");
  inputName.value = profileName.textContent;
  inputAboutMe.value = profileAboutMe.textContent;
}

function closePopup() {
  popUpOpen.classList.remove("popup_opened");
}

function formsubmit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileAboutMe.textContent = inputAboutMe.value;

  closePopup();
}

////////////place-modal-functions//////////////////////

function openPlaceModal() {
  placeModalOpen.classList.add("place-modal_opened");
}

function closePlaceModal() {
  placeModalOpen.classList.remove("place-modal_opened");
}

///////////preview-modal-function///////////

function openPreviewModal(card) {
  previewImage.src = card.link;
  previewModalOpen.classList.add("preview-modal_opened");
}

function closePreviewModal() {
  previewModalOpen.classList.remove("preview-modal_opened");
}

function addCard(event) {
  event.preventDefault();
  renderCard({ name: placeInputTitle.value, link: placeInputlink.value }, list);
  closePlaceModal(placeModalOpen);
  placeForm.reset();
}

//////////eventlisteners/////////

addBtn.addEventListener("click", openPlaceModal);

placeCloseBtn.addEventListener("click", closePlaceModal);

previewCloseBtn.addEventListener("click", closePreviewModal);

popUpForm.addEventListener("submit", formsubmit);

popupCloseBtn.addEventListener("click", closePopup);

editBtn.addEventListener("click", openPopup);

placeForm.addEventListener("submit", addCard);
