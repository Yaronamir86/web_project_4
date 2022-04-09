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

  

  popUpForm.addEventListener("submit", formsubmit);
  popupCloseBtn.addEventListener("click", closePopup);
  editBtn.addEventListener("click", openPopup);
  

  ////////////add-image-functions//////////////////////


  function openPlaceModal() {
    placeModalOpen.classList.add("place-modal_opened");
    inputName.value = profileName.textContent;
    inputAboutMe.value = profileAboutMe.textContent; 
  }
  
  function closePlaceModal() {
    placeModalOpen.classList.remove("place-modal_opened");
  }
  
  function formsubmit(event) {
    event.preventDefault();
    profileName.textContent = inputName.value;
    profileAboutMe.textContent = inputAboutMe.value;
  
    
}


addBtn.addEventListener("click", openPlaceModal);
placeCloseBtn.addEventListener("click",closePlaceModal);

