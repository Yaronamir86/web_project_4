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

//////////edit-profile-functions////////////////////////

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

////////////add-image-functions//////////////////////

function openPlaceModal() {
  placeModalOpen.classList.add("place-modal_opened");
}

function closePlaceModal() {
  placeModalOpen.classList.remove("place-modal_opened");
}

addBtn.addEventListener("click", openPlaceModal);

placeCloseBtn.addEventListener("click", closePlaceModal);

popUpForm.addEventListener("submit", formsubmit);

popupCloseBtn.addEventListener("click", closePopup);

editBtn.addEventListener("click", openPopup);

initialCards.forEach(card => {
  const cardTamplate = document.querySelector("#card-tamplate").content.querySelector(".element__list-item");

  const cardElement = cardTamplate.cloneNode(true);

  const cardImage = document.querySelector(".element__photo");

  const cardtTitle = document.querySelector(".element__title");

  cardImage.src = `url(${card.link})`;
  cardtTitle.textContent = card.name;

  placesList.append(cardElement);
});

//////////eventlisteners/////////
