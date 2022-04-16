/////////////////////////////////////////////////////////////////////////
///////////////////////DECLARATIONS////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

////profile-modal/////////////////////////////////

const ProfileModal = document.querySelector(".profile-modal");

const profileForm = document.querySelector(".profile-modal__form");

const profileEditBtn = document.querySelector(".profile__edit-btn");

const profileAddBtn = document.querySelector(".profile__add-btn");

const profileInputName = document.querySelector(".profile-modal__text_type_name");

const profileInputAboutMe = document.querySelector(".profile-modal__text_type_about-me");

const profileCloseBtn = document.querySelector(".profile-modal__close-btn");

const profileName = document.querySelector(".profile__name");

const profileAboutMe = document.querySelector(".profile__about-me");

//////card declares/////////////////////////////////


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


///////place-modal declares///////////////////////////////////

const placeModal = document.querySelector(".place-modal");

const placeCloseBtn = document.querySelector(".place-modal__close-btn");

const placeForm = document.querySelector(".place-modal__form");

const placeTitle = document.querySelector(".place-modal__title");

const placeImage = document.querySelector(".place-modal__image");

const createBtn = document.querySelector(".place-modal__create-btn");

const placeInputTitle = document.querySelector(".place-modal__text_type_title");

const placeInputlink = document.querySelector(
  ".place-modal__text_type_image-link"
);

///////preview-modal declares//////////////////////////////////////

const previewModal = document.querySelector(".preview-modal");

const previewCloseBtn = document.querySelector(".preview-modal__close-btn");

const previewTitle = document.querySelector(".preview-modal__title");

const previewImage = document.querySelector(".preview-modal__image");

//////////wrappers////
const placesList = document.querySelector(".element__list");
////////////////////

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////FUNCTIONS///////////////////////////////
/////////////////////////////////////////////////////////////////////////

/////////cards-functions//////////

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

function openProfileModal() {
  ProfileModal.classList.add("profile-modal_opened");
  profileInputName.value = profileName.textContent;
  profileInputAboutMe.value = profileAboutMe.textContent;
}

function closeProfileModal() {
  ProfileModal.classList.remove("profile-modal_opened");
}

function Profileformsubmit(event) {
  event.preventDefault();
  profileName.textContent = profileInputName.value;
  profileAboutMe.textContent = profileInputAboutMe.value;

  closeProfileModal();
}

////////////place-modal-functions//////////////////////

function openPlaceModal() {
  placeModal.classList.add("place-modal_opened");
}

function closePlaceModal() {
  placeModal.classList.remove("place-modal_opened");
}

///////////preview-modal-function///////////

function openPreviewModal(card) {
  previewImage.src = card.link;
  previewTitle.textContent = card.name;
  previewModal.classList.add("preview-modal_opened");
}

function closePreviewModal() {
  previewModal.classList.remove("preview-modal_opened");
}

/////////add-card-function////////////////////////////////
function addCard(event) {
  event.preventDefault();
  renderCard({ name: placeInputTitle.value, link: placeInputlink.value }, placesList);
  closePlaceModal(placeModal);
  placeForm.reset();
}
/////////////////////////////////////////////////////////////////////////
////////////////////////EVENTLISTENERS///////////////////////////////////
/////////////////////////////////////////////////////////////////////////
profileAddBtn.addEventListener("click", openPlaceModal);

placeCloseBtn.addEventListener("click", closePlaceModal);

previewCloseBtn.addEventListener("click", closePreviewModal);

profileForm.addEventListener("submit", Profileformsubmit);

profileCloseBtn.addEventListener("click", closeProfileModal);

profileEditBtn.addEventListener("click", openProfileModal);

placeForm.addEventListener("submit", addCard);
