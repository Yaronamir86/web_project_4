/////////////////////
////declatrations////
////////////////////
const popUpOpen = document.querySelector(".popup");

const popUpForm = document.querySelector(".popup__form");

const editBtn = document.querySelector(".profile__edit-btn");

const addBtn = document.querySelector(".profile__add-btn");

const inputName = document.querySelector(".popup__text_type_name");

const inputAboutMe = document.querySelector(".popup__text_type_about-me");

const likeBtn = document.querySelector(".element__like-btn");

const profileName = document.querySelector(".profile__name");

const profileAboutMe = document.querySelector(".profile__about-me");

const saveBtn = document.querySelector(".popup__save-btn");

const popupCloseBtn = document.querySelector(".popup__close-btn");

const placeForm = document.querySelector(".place-modal__form");

const previewModalOpen = document.querySelector(".preview-modal");

const previewCloseBtn = document.querySelector(".previw-modal__close-btn");

const placeModalOpen = document.querySelector(".place-modal");

const placeCloseBtn = document.querySelector(".place-modal__close-btn");

const createBtn = document.querySelector(".place-modal__create-btn");

const placeTitle = document.querySelector(".place-modal__title");

const placeImage = document.querySelector(".place-modal__image");

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

//////////wrappers////
const placesList = document.querySelector(".element__list");
////////////////////

////////////////////////////
//////////FUNCTIONS/////////
////////////////////////////



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

function openPreviewModal() {
  previewModalOpen.classList.add("preview-modal_opened");
}

function closePreviewModal() {
  previewModalOpen.classList.remove("preview-modal_opened");
}



/////////cards functions//////////

function createCardElement(card) {
  const cardTemplate = document.querySelector("#card-template").content.querySelector(".element__list-item");

  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".element__photo");

  const cardtTitle = cardElement.querySelector(".element__title");

  cardImage.src = card.link;
  cardtTitle.textContent = card.name;

  cardImage.addEventListener("click", openPreviewModal);
   // handle image click

  //likeBtn.addEventListener("click", () => {

  //}); // handle like button

  return cardElement;
}



function renderCard(card, wrapper) {

wrapper.append(createCardElement(card));
}

initialCards.forEach(card => renderCard(card, placesList));

//////////eventlisteners/////////

addBtn.addEventListener("click", openPlaceModal);

placeCloseBtn.addEventListener("click", closePlaceModal);

popUpForm.addEventListener("submit", formsubmit);

popupCloseBtn.addEventListener("click", closePopup);

editBtn.addEventListener("click", openPopup);



