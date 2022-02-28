import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import * as utils from "./utils.js";
import { validationSettings, initialCards } from "./constants.js";

const cardContainer = document.querySelector(".elements");
const formEditProfile = document.querySelector(
  "form[name = 'form-edit-profile']"
);
const formAddCard = document.querySelector("form[name = 'form-add-card']");

const editProfileFormValidator = new FormValidator(
  validationSettings,
  formEditProfile
);

const addCardFormValidator = new FormValidator(validationSettings, formAddCard);

const addCard = (cardElement) => {
  cardContainer.prepend(cardElement);
};

const createCard = (cardData) => {
  const newCardObject = new Card(cardData, "#template-element");
  return newCardObject.generateCard();
};

const generateCard = (cardData) => {
  const newCard = createCard(cardData);
  addCard(newCard);
};

const generateInitialCards = (cardDataArray) => {
  cardDataArray.forEach((cardDataItem) => {
    generateCard(cardDataItem);
  });
};

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
generateInitialCards(initialCards);
utils.setEventListeners();

export { editProfileFormValidator, addCardFormValidator, generateCard };
