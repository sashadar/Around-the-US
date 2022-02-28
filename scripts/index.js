import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import * as utils from "./utils.js";
import { validationSettings, initialCards } from "./constants.js";

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
