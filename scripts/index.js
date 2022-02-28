import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup } from "./utils.js";
import { validationSettings, initialCards } from "./constants.js";

const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile-info__name");
const profileJob = profile.querySelector(".profile-info__job");
const profileEditBtn = profile.querySelector(".profile-info__button-edit");
const profileAddBtn = profile.querySelector(".profile__button-add");

const editProfileContainer = document.querySelector(
  ".popup__container_content_edit-profile"
);
const popupEditProfile = editProfileContainer.closest(".popup");
const formEditProfile = editProfileContainer.querySelector(".form");
const formEditProfileInputName = formEditProfile.querySelector(
  ".form__input_type_name"
);
const formEditProfileInputJob = formEditProfile.querySelector(
  ".form__input_type_job"
);

const addCardContainer = document.querySelector(
  ".popup__container_content_add-card"
);
const popupAddCard = addCardContainer.closest(".popup");
const formAddCard = addCardContainer.querySelector(".form");

const popupCloseButtons = document.querySelectorAll(".popup__button-close");
const popupOverlays = document.querySelectorAll(".popup");

const cardContainer = document.querySelector(".elements");

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

const handleAddCardFormOpen = () => {
  formAddCard.reset();
  formValidators[formAddCard.getAttribute("name")].resetInputValidation();
  openPopup(popupAddCard);
};

const handleEditProfileOpen = () => {
  formEditProfileInputName.value = profileName.textContent;
  formEditProfileInputJob.value = profileJob.textContent;
  formValidators[formEditProfile.getAttribute("name")].resetInputValidation();
  openPopup(popupEditProfile);
};

const handleOverlayClick = (evt) => {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
};

const handlePopupClose = (evt) => {
  closePopup(evt.target.closest(".popup"));
};

const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();
  const cardData = {
    name: evt.target.querySelector(".form__input_type_title").value,
    link: evt.target.querySelector(".form__input_type_link").value,
  };

  generateCard(cardData);
  handlePopupClose(evt);
};

const handleEditProfileFormSubmit = (evt) => {
  evt.preventDefault();

  profileName.textContent = formEditProfileInputName.value;
  profileJob.textContent = formEditProfileInputJob.value;

  handlePopupClose(evt);
};

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

enableValidation(validationSettings);
generateInitialCards(initialCards);

formEditProfile.addEventListener("submit", handleEditProfileFormSubmit);
profileEditBtn.addEventListener("click", handleEditProfileOpen);
formAddCard.addEventListener("submit", handleAddCardFormSubmit);
profileAddBtn.addEventListener("click", handleAddCardFormOpen);
popupCloseButtons.forEach((button) => {
  button.addEventListener("click", handlePopupClose);
});
popupOverlays.forEach((overlay) => {
  overlay.addEventListener("click", handleOverlayClick);
});
