import {
  editProfileFormValidator,
  addCardFormValidator,
  generateCard,
} from "./index.js";

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

const openFormPopup = (popupElement, formValidator) => {
  formValidator.resetInputValidation();
  openPopup(popupElement);
};

const handleAddCardFormOpen = () => {
  formAddCard.reset();
  openFormPopup(popupAddCard, addCardFormValidator);
};

const handleEditProfileOpen = () => {
  formEditProfileInputName.value = profileName.textContent;
  formEditProfileInputJob.value = profileJob.textContent;

  openFormPopup(popupEditProfile, editProfileFormValidator);
};

const handleOverlayClick = (evt) => {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
};

const handleKeyPress = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
};

const closePopup = (popupElement) => {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleKeyPress);
};

const openPopup = (popupElement) => {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", handleKeyPress);
};

const handlePopupClose = (evt) => {
  closePopup(evt.target.closest(".popup"));
};

const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();
  const newCard = {
    name: evt.target.querySelector(".form__input_type_title").value,
    link: evt.target.querySelector(".form__input_type_link").value,
  };

  generateCard(newCard, "#template-element");
  handlePopupClose(evt);
};

const handleEditProfileFormSubmit = (evt) => {
  evt.preventDefault();

  profileName.textContent = formEditProfileInputName.value;
  profileJob.textContent = formEditProfileInputJob.value;

  handlePopupClose(evt);
};

const setEventListeners = () => {
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
};

export { openPopup, setEventListeners };
