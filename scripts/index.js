let popUpOpen = document.querySelector(".popup");

let popUpForm = document.querySelector(".popup__form");

let editBtn = document.querySelector(".profile__edit-btn");

let addBtn = document.querySelector(".profile__add-btn");

let inputName = document.querySelector(".popup__text_type_name");

let inputAboutMe = document.querySelector(".popup__text_type_about-me");

let likeBtn = document.querySelector(".element__like-btn");

let profileName = document.querySelector(".profile__name");

let profileAboutMe = document.querySelector(".profile__about-me");

let saveBtn = document.querySelector(".popup__save-btn");

let closeBtn = document.querySelector(".popup__close-btn");

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
closeBtn.addEventListener("click", closePopup);
editBtn.addEventListener("click", openPopup);
