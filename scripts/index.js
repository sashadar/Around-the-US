import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import * as utils from "./utils.js";

const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

const cardContainer = document.querySelector(".elements");
const formEditProfile = document.getElementsByName("form-edit-profile")[0];
const formAddCard = document.getElementsByName("form-add-card")[0];

const editProfileFormValidator = new FormValidator(
  validationSettings,
  formEditProfile
);

const addCardFormValidator = new FormValidator(validationSettings, formAddCard);

const addCard = (cardElement) => {
  cardContainer.prepend(cardElement);
};

const generateCard = (cardData, templateSelector) => {
  const newCardObject = new Card(cardData, templateSelector);
  const newCard = newCardObject.generateCard();
  addCard(newCard);
};

const generateInitialCards = (cardDataArray) => {
  for (let index = 0; index < cardDataArray.length; index++) {
    generateCard(cardDataArray[index], "#template-element");
  }
};

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
generateInitialCards(initialCards);
utils.setEventListeners();

export { editProfileFormValidator, addCardFormValidator, generateCard };
