import "./index.css";

import { PopupWithImage } from "../components/PopupWithImage";
import { PopupWithForm } from "../components/PopupWithForm";
import { UserInfo } from "../components/UserInfo";
import { Section } from "../components/Section";
import { Card } from "../components/Card";

import { FormValidator } from "../components/FormValidator.js";
import {
  avatar,
  profileImage,
  profileForm,
  editProfileButton,
  addProfileButton,
  inputName,
  inputTitle,
  placeForm,
  initialCards,
  cardTemplateSelector,
  settings,
  avatarForm,
} from "../utils/constants.js";

//////validation ///////////////

const editFormValidator = new FormValidator(settings, profileForm);
export const addCardFormValidator = new FormValidator(settings, placeForm);
const avatarFormValidator = new FormValidator(settings, avatarForm)

addCardFormValidator.enableValidation();
editFormValidator.enableValidation();
avatarFormValidator.enableValidation();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__about",
  avatarSelector: ".profile__avatar"
});

//////modal instantiation//////////

const profileModal = new PopupWithForm(".modal_type_edit-profile", (data) => {
  userInfo.setUserInfo(data.name, data["about-me"]);
});
profileModal.setEventListeners();

const placeModal = new PopupWithForm(".modal_type_place", (data) => {
  renderCard({ name: data["Title"], link: data["Image link"] });
});
placeModal.setEventListeners();

const avatarModal = new PopupWithForm(".modal_type_avatar", (data) => {
userInfo.setAvatarInfo(data["image-link"])
});
avatarModal.setEventListeners();

const previewModal = new PopupWithImage(".modal_type_preview");
previewModal.setEventListeners();

//////////card create//////////////////////////

const previewSection = new Section(
  {
    items: initialCards,
    renderer: (data) => renderCard(data),
  },
  ".element__list"
);

previewSection.render(initialCards);

function generateCard(data) {
  const card = new Card(data, cardTemplateSelector, () => {
    previewModal.open(data.link, data.name);
  });
  const cardElement = card.generateCard(data);
  return cardElement;
}

function renderCard(data) {
  const element = generateCard(data);
  previewSection.addItem(element);
}

/////////////////////////////////////////////////////////
/////////////////////Event Listeners
/////////////////////////////////////////////////////////

editProfileButton.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  inputName.value = info.name;
  inputTitle.value = info.job;
  editFormValidator.enableButton();
  editFormValidator.hideErrors();
  profileModal.open();
});

addProfileButton.addEventListener("click", () => {
  placeModal.open();
  addCardFormValidator.resetValidation();
  addCardFormValidator.hideErrors();
});

avatar.addEventListener("click", () => {
  avatarModal.open();
});
