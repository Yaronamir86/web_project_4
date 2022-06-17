import "./index.css";

import { PopupWithImage } from "../components/PopupWithImage";
import { PopupWithForm } from "../components/PopupWithForm";
import { UserInfo } from "../components/UserInfo";
import { Section } from "../components/Section";
import { Card } from "../components/Card";

import { FormValidator } from "../components/FormValidator.js";
import {
  profileForm,
  editProfileButton,
  addProfileButton,
  inputName,
  inputTitle,
  placeForm,
  initialCards,
  cardTemplateSelector,
  settings,
} from "../utils/constants.js";

//////validation ///////////////

const editFormValidator = new FormValidator(settings, profileForm);
export const addCardFormValidator = new FormValidator(settings, placeForm);

addCardFormValidator.enableValidation();
editFormValidator.enableValidation();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__about",
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