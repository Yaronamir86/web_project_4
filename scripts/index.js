let popUpContainer = document.querySelector(".popup__container");

let editBtn = document.querySelector(".profile__edit-btn");

let addBtn = document.querySelector(".profile__add-btn");

let likeBtn = document.querySelector(".element__like-btn");

let profileName = document.querySelector(".profile__name");

let profileAboutMe = document.querySelector(".profile__about-me");

let saveBtn = document.querySelector(".popup__save-btn");

let closeBtn = document.querySelector(".popup__close-btn");

editBtn.onclick = function openPopup() {
  popUpContainer.style.display = "block";
};

openPopup();

closeBtn.onclick = function closePopup() {
  popUpContainer.style.display = "none";
};

closePopup();

editBtn.addEventListener("click", openPopup);

closeBtn.addEventListener("click", closePopup);

function addNameAboutMe() {
  popUpContainer.insertAdjacentHTML(
    "beforeend",
    `
    <div class="profile__info">
    <p class="profile__name">${profileName.value}</p>
    <button class="profile__edit-btn" ><img class="profile__edit-img" src="../web_project_4/images/Edit Button.svg"></button>
    <p class="profile__about-me">${profileAboutMe.value}</p>
</div> 


    `
  );
  profileName.value = "";
  profileAboutMe.value = "";
}

addNameAboutMe();

saveBtn.addEventListener("click", addNameAboutMe);
