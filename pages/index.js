import Section from "../scripts/Section.js";
import Popup from "../scripts/Popup.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";
import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
/* import { openPopup, closePopup } from "../scripts/utils.js"; */
import {
  validationSettings,
  initialCards,
  userInfoSelectors,
  popupSelectors,
  cardSectionSelector,
} from "../scripts/constants.js";

const profile = document.querySelector(".profile");
/* const profileName = profile.querySelector(".profile-info__name");
const profileJob = profile.querySelector(".profile-info__job"); */
const profileEditBtn = profile.querySelector(".profile-info__button-edit");
const profileAddBtn = profile.querySelector(".profile__button-add");

/* const editProfileContainer = document.querySelector(
  ".popup__container_content_edit-profile"
);
const popupEditProfile = editProfileContainer.closest(".popup");
const formEditProfile = editProfileContainer.querySelector(".form");
const formEditProfileInputName = formEditProfile.querySelector(
  ".form__input_type_name"
);
const formEditProfileInputJob = formEditProfile.querySelector(
  ".form__input_type_job"
); */

/* const addCardContainer = document.querySelector(
  ".popup__container_content_add-card"
);
const popupAddCard = addCardContainer.closest(".popup");
const formAddCard = addCardContainer.querySelector(".form"); */

const popupCloseButtons = document.querySelectorAll(".popup__button-close");
const popupOverlays = document.querySelectorAll(".popup");

/* const cardContainer = document.querySelector(".elements"); */

const userInfo = new UserInfo({
  nameSelector: userInfoSelectors.nameselector,
  jobSelector: userInfoSelectors.jobSelector,
});

const popupWithImage = new PopupWithImage(popupSelectors.popupWithImage);
popupWithImage.setEventListeners();

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
    },
  },
  cardSectionSelector
);

const formValidators = {};

const enableValidation = (validationSettings) => {
  const formList = Array.from(
    document.querySelectorAll(validationSettings.formSelector)
  );
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationSettings, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

const createCard = (cardData) => {
  const newCardObject = new Card({
    data: cardData,
    templateSelector: "#template-element",
    handleCardClick: (title, link) => {
      popupWithImage.open(title, link);
    },
  });
  return newCardObject.generateCard();
};

/* const renderCard = (cardData) => {
  newCard = createCard(cardData);
  cardList.addItem(newCard);
}; */

/* const generateCard = (cardData) => {
  const newCard = createCard(cardData);
  addCard(newCard);
}; */

const handleEditProfileFormSubmit = (data) => {
  userInfo.setUserInfo(data);

  /*  profileName.textContent = formEditProfileInputName.value;
  profileJob.textContent = formEditProfileInputJob.value; */
};

const handleAddCardFormSubmit = (data) => {
  const cardData = {
    name: evt.target.querySelector(".form__input_type_title").value,
    link: evt.target.querySelector(".form__input_type_link").value,
  };

  generateCard(cardData);
  handlePopupClose(evt);
};

const popupEditProfile = new PopupWithForm(
  popupSelectors.popupEditProfile,
  handleEditProfileFormSubmit
);
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm(
  popupSelectors.popupAddCard,
  handleAddCardFormSubmit
);

const handleAddCardFormOpen = () => {
  formAddCard.reset();
  formValidators[formAddCard.getAttribute("name")].resetInputValidation();
  openPopup(popupAddCard);
};

/* const handleEditProfileOpen = () => {
  formEditProfileInputName.value = profileName.textContent;
  formEditProfileInputJob.value = profileJob.textContent;
  formValidators[formEditProfile.getAttribute("name")].resetInputValidation();
  openPopup(popupEditProfile);
}; */

/* const handleOverlayClick = (evt) => {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
}; */

/* const handlePopupClose = (evt) => {
  closePopup(evt.target.closest(".popup"));
};
 */
/* const addCard = (cardElement) => {
  cardContainer.prepend(cardElement);
}; */

/* const generateInitialCards = (cardDataArray) => {
  cardDataArray.forEach((cardDataItem) => {
    generateCard(cardDataItem);
  });
}; */

enableValidation(validationSettings);
cardList.renderItems();

/* formEditProfile.addEventListener("submit", handleEditProfileFormSubmit);
profileEditBtn.addEventListener("click", handleEditProfileOpen);
formAddCard.addEventListener("submit", handleAddCardFormSubmit);
profileAddBtn.addEventListener("click", handleAddCardFormOpen);
popupCloseButtons.forEach((button) => {
  button.addEventListener("click", handlePopupClose);
});
popupOverlays.forEach((overlay) => {
  overlay.addEventListener("click", handleOverlayClick);
});
 */
