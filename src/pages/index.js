import "./index.css";

import { PopupWithImage } from "../components/PopupWithImage";
import { PopupWithForm } from "../components/PopupWithForm";
import { UserInfo } from "../components/UserInfo";
import { Section } from "../components/Section";
import { Card } from "../components/Card";

import { FormValidator } from "../components/FormValidator.js";
import {
  avatar,
  profileForm,
  editProfileButton,
  addProfileButton,
  inputName,
  inputTitle,
  placeForm,
  cardTemplateSelector,
  settings,
  avatarForm,
} from "../utils/constants.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation";
import { api } from "../components/Api";

///////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////profile-modal///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

const profileModal = new PopupWithForm(".modal_type_edit-profile", (data) => {
  profileModal.renderLoading(true, "saving...");
  api
    .editProfile(data.user, data["about"])
    .then((res) => {
      userInfo.setUserInfo(res.name, res["about"]);
    })
    .finally(() => profileModal.renderLoading(false));
});
profileModal.setEventListeners();

/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////place-modal//////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

const placeModal = new PopupWithForm(".modal_type_place", (data) => {
  placeModal.renderLoading(true, "Creating...");
  api
    .createCards({ name: data["Title"], link: data["Image link"] })
    .then((res) => {
      generateCard(res);
      renderCard(res);
      placeModal.close();
    })
    .finally(() => placeModal.renderLoading(false));
});

placeModal.setEventListeners();

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////avatar-modal////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

const avatarModal = new PopupWithForm(".modal_type_avatar", (data) => {
  avatarModal.renderLoading(true, "saving...");
  api
    .editAvatar(data["Image link"])
    .then((res) => {
      userInfo.setAvatarInfo(res.avatar);
      avatarModal.close();
    })
    .finally(() => avatarModal.renderLoading(false));
});
avatarModal.setEventListeners();

/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////preview-modal////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

const previewModal = new PopupWithImage(".modal_type_preview");
previewModal.setEventListeners();

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////delete-modal/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

const deleteModal = new PopupWithConfirmation(".modal_type_delete");
deleteModal.setEventListeners();

/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////card create + api connection/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()]).then(
  ([cardData, userData]) => {
    userId = userData._id;

    previewSection.render(cardData);
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setAvatarInfo(userData.avatar);
  }
);

const previewSection = new Section(
  {
    renderer: renderCard,
  },
  ".element__list"
);

function generateCard(data) {
  const card = new Card(
    data,
    cardTemplateSelector,
    () => {
      previewModal.open(data.link, data.name);
    },
    (id) => {
      deleteModal.open();
      deleteModal.setAction(() => {
        api.deleteCards(id).then((res) => {
          card.removeCard();
          deleteModal.close();
        });
      });
    },
    () => {
      if (card.isLiked()) {
        api.removeLike(card.getId()).then((res) => {
          card.setLikes(res.likes);
        });
      } else {
        api.addLike(card.getId()).then((res) => {
          card.setLikes(res.likes);
        });
      }
    },
    userId
  );
  const cardElement = card.generateCard(data);
  return cardElement;
}

function renderCard(data) {
  const element = generateCard(data);
  previewSection.addItem(element);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////validation //////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

const editFormValidator = new FormValidator(settings, profileForm);
export const addCardFormValidator = new FormValidator(settings, placeForm);
const avatarFormValidator = new FormValidator(settings, avatarForm);

addCardFormValidator.enableValidation();
editFormValidator.enableValidation();
avatarFormValidator.enableValidation();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__about",
  avatarSelector: ".profile__avatar",
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////Event Listeners////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

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
