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
  trashIcon,
} from "../utils/constants.js";
import { PopupWithButton } from "../components/PopupWithButton";
import { api } from "../components/Api";


///////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////modal instantiation///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
const profileModal = new PopupWithForm(".modal_type_edit-profile", (data) => {
  userInfo.setUserInfo(data.name, data["about-me"]);
});
profileModal.setEventListeners();

////////////////////////////place-modal//////////////////////////////////////////////////////////////
const placeModal = new PopupWithForm(".modal_type_place", (data) => {
  api
    //.createCards({ name: data["Title"], link: data["Image link"] })
    .createCards(data)
    .then((res) => {
      generateCard(res)
        //renderCard({ name: data["Title"], link: data["Image link"] });
       // renderCard(res)
       placeModal.close();
        
    });
});
placeModal.setEventListeners();
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////avatar-modal////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
const avatarModal = new PopupWithForm(".modal_type_avatar", (data) => {
  userInfo.setAvatarInfo(data["Image link"]);
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
const deleteModal = new PopupWithButton(".modal_type_delete");
deleteModal.setEventListeners();



/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////card create + api conection/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////


let userId

Promise.all([api.getInitialCards(), api.getUserInfo()])
.then(([cardData, userData]) => {
  userId = userData._id
  console.log('userId', userId)
  previewSection.render(cardData);

  userInfo.setUserInfo(userData.name, userData.about);
})

const previewSection = new Section(
  {
    renderer:  renderCard,
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
        api.deleteCards(id)
        .then(res => {
          console.log('card is deleted', res)
          card.removeCard()
          deleteModal.close()
        })
      })
    },
    (id) => {
      api.likeCard(id)
        .then(res => {
          card.likeCard()
          console.log('res', res);
        });
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

