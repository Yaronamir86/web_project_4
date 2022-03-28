let popUpContainer = document.querySelector(".popup__container");

let editBtn = document.querySelector(".profile__edit-btn");

let addBtn = document.querySelector(".profile__add-btn");

let inputName = document.querySelector(".input__text_type_name");

let inputAboutMe = document.querySelector(".input__text_type_about-me");

let likeBtn = document.querySelector(".element__like-btn");

let profileName = document.querySelector(".profile__name");

let profileAboutMe = document.querySelector(".profile__about-me");

let saveBtn = document.querySelector(".popup__save-btn");

let closeBtn = document.querySelector(".popup__close-btn");

function openPopup() {
  popUpContainer.style.display = "block";
  inputName.value = profileName.textContent;
  inputAboutMe.value = profileAboutMe.textContent;
}

function closePopup() {
  popUpContainer.style.display = "none";
}

function formsubmit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileAboutMe.textContent = inputAboutMe.value;
  closePopup();
}

editBtn.addEventListener("click", openPopup);
closeBtn.addEventListener("click", closePopup);
popUpContainer.addEventListener("submit", formsubmit);
