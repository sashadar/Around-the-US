import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

import {
  validationSettings,
  initialCards,
  userInfoSelectors,
  popupSelectors,
  cardSectionSelector,
  formEditProfile,
  formAddCard,
  formEditProfileInputName,
  formEditProfileInputJob,
} from "../utils/constants.js";

import "./index.css";
import { data } from "autoprefixer";

const profile = document.querySelector(".profile");

const profileEditBtn = profile.querySelector(".profile-info__button-edit");
const profileAddBtn = profile.querySelector(".profile__button-add");

const userInfo = new UserInfo({
  nameSelector: userInfoSelectors.nameselector,
  jobSelector: userInfoSelectors.jobSelector,
});

const popupWithImage = new PopupWithImage(popupSelectors.popupWithImage);

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
    name: cardData.name,
    link: cardData.link,
    id: cardData._id,
    likes: cardData.likes,
    templateSelector: "#template-element",
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    },
  });

  return newCardObject.generateCard();
};

const handleEditProfileFormSubmit = (data) => {
  userInfo.setUserInfo({ name: data.name, job: data.job });
};

const handleAddCardFormSubmit = (data) => {
  const cardData = {
    name: data.title,
    link: data.link,
  };
  const newCard = createCard(cardData);
  cardList.addItem(newCard);
};

const popupEditProfile = new PopupWithForm(
  popupSelectors.popupEditProfile,
  handleEditProfileFormSubmit
);

const popupAddCard = new PopupWithForm(
  popupSelectors.popupAddCard,
  handleAddCardFormSubmit
);

const handleAddCardFormOpen = () => {
  formAddCard.reset();
  formValidators[formAddCard.getAttribute("name")].resetInputValidation();
  popupAddCard.open();
};

const handleEditProfileOpen = () => {
  const info = userInfo.getUserInfo();
  formEditProfileInputName.value = info.name;
  formEditProfileInputJob.value = info.job;
  formValidators[formEditProfile.getAttribute("name")].resetInputValidation();
  popupEditProfile.open();
};

popupWithImage.setEventListeners();

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();

enableValidation(validationSettings);
cardList.renderItems();

profileEditBtn.addEventListener("click", handleEditProfileOpen);
profileAddBtn.addEventListener("click", handleAddCardFormOpen);
