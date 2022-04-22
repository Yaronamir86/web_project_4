/////////////////////////////////////////////////////////////////////////
///////////////////////DECLARATIONS////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

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
////profile-modal/////////////////////////////////

const ProfileModal = document.querySelector(".modal_type_edit-profile");
const profileForm = document.querySelector(".form_type_profile");
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileAddBtn = document.querySelector(".profile__add-btn");
const profileInputName = document.querySelector(".form__text_type_name");
const profileInputAboutMe = document.querySelector(".form__text_type_about-me");
const profileCloseBtn = document.querySelector(
  ".modal__close-btn_type_profile"
);
const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__about-me");
const inputName = document.querySelector(".form__text_type_name");
const inputTitle = document.querySelector(".form__text_type_about-me");

///////add-place-modal declares///////////////////////////////////

const placeModal = document.querySelector(".modal_type_place ");
const placeCloseBtn = document.querySelector(".modal__close-btn_type_place");
const placeForm = document.querySelector(".form_type_place");
const placeTitle = document.querySelector(".modal__title_type_place");
const placeImage = document.querySelector(".modal__image_type_place");
const createBtn = document.querySelector(".modal__create-btn");
const placeInputTitle = document.querySelector(".form__text_type_title");
const placeInputlink = document.querySelector(".form__text_type_image-link");

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

function openModal(Modal) {
  Modal.classList.add("modal_opened");
}

function closeModal(Modal) {
  Modal.classList.remove("modal_opened");
}

function ProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileAboutMe.textContent = inputTitle.value;
  closeModal(ProfileModal);
}

function autoFillFormProfile() {
  inputName.value = profileName.textContent;
  inputTitle.value = profileAboutMe.textContent;
}

///////////preview-modal-function///////////

function openPreviewModal(card) {
  previewImage.src = card.link;
  previewTitle.textContent = card.name;
  openModal(previewModal);
  previewModal.classList.add("modal_opened");
}

function closePreviewModal() {
  previewModal.classList.remove("modal_opened");
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
  openModal(ProfileModal);
});

profileForm.addEventListener("submit", ProfileFormSubmit);

profileCloseBtn.addEventListener("click", () => {
  closeModal(ProfileModal);
});

placeForm.addEventListener("submit", addCard);
